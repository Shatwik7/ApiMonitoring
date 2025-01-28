import puppeteer, { Browser } from "puppeteer";
import { PrismaClient, Prisma, Region } from "@prisma/client";
import { Kafka } from "kafkajs";
import { mapRegion } from "./utils/RegionMaper";

const prisma = new PrismaClient();

const REGION = process.env.REGION || "europe";
if (REGION === undefined) {
  console.error("REGION not defined");
  process.exit(1);
}
const kafka = new Kafka({
  clientId: `worker-service-${REGION}`,
  brokers: ["localhost:9093"],
});
const consumer = kafka.consumer({ groupId: `api-monitoring-group-${REGION}` });

interface API {
  id: number;
  url: string;
  checkInterval: number;
  nextCheck: Date | null;
  live: boolean;
  userId: number;
  statusCode: number | null;
  request_timeout: number | null;
  domainExpiration: boolean | null;
  sslExpiration: boolean | null;
}

interface APICheckResult {
  apiId: number;
  dnsLookupTime: number;
  tcpConnectionTime: number;
  tlsHandshakeTime: number;
  statusCode: number;
  totalTime: number;
  live: boolean;
  region: Region;
}
let c = 0;
async function createBrowserInstance(): Promise<Browser> {
  return await puppeteer.launch({ args: ["--ignore-certificate-errors"] });
}

async function capturePerformanceMetrics(
  browser: Browser,
  task: API
): Promise<APICheckResult | null> {
  c++;
  console.log(c);
  const page = await browser.newPage();
  let statusCode = 0;

  try {
    // Navigate to the URL and get the response

    const response = await page.goto(task.url, {
      waitUntil: "load",
      timeout: 30000,
    });
    await page.setCacheEnabled(false);
    if (response) {
      // Capture the status code from the response
      statusCode = response.status();

      // Check if the status code is outside the successful range
      if (statusCode < 200 || statusCode >= 400) {
        console.error(`Error: Status code ${statusCode} for URL: ${task.url}`);
        throw new Error(`HTTP error with status code ${statusCode}`);
      }
    } else {
      console.error(`Error: No response received for the URL: ${task.url}`);
      throw new Error("Failed to fetch the URL.");
    }

    // Evaluate performance timings
    const metrics = await page.evaluate(() => {
      const [navigationEntry] = performance.getEntriesByType(
        "navigation"
      ) as PerformanceNavigationTiming[];
      return {
        dnsLookupTime:
          navigationEntry.domainLookupEnd - navigationEntry.startTime,
        tcpConnectionTime:
          navigationEntry.secureConnectionStart - navigationEntry.startTime,
        tlsHandshakeTime:
          navigationEntry.connectEnd - navigationEntry.startTime,
        totalTime: navigationEntry.loadEventEnd - navigationEntry.startTime,
      };
    });
    await page.close();

    return {
      apiId: task.id,
      dnsLookupTime: metrics.dnsLookupTime,
      tcpConnectionTime: metrics.tcpConnectionTime,
      tlsHandshakeTime: metrics.tlsHandshakeTime,
      statusCode: statusCode,
      totalTime: metrics.totalTime,
      live: statusCode >= 200 && statusCode < 400,
      region: mapRegion(REGION!),
    };
  } catch (error: any) {
    if (error.message.includes("net::ERR_NAME_NOT_RESOLVED")) {
      console.error(`DNS Lookup Error for URL: ${task.url}`);
    } else if (error.message.includes("Timeout")) {
      console.error(
        `Timeout Error: Navigation to ${task.url} exceeded 30 seconds.`
      );
    } else {
      console.error(`General Error for URL: ${task.url} - ${error.message}`);
    }

    await page.close();
    return null;
  }
}

async function run() {
  await consumer.connect();
  await consumer.subscribe({
    topic: "api-monitoring-tasks",
    fromBeginning: false,
  });

  let results: APICheckResult[] = [];
  const browser = await createBrowserInstance();
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log("topic", topic);
      if (message.value) {
        try {
          console.log("Received message", message.value.toString());
          const tasks = JSON.parse(message.value.toString()) as API[];

          const monitorPromises = tasks.map((task) =>
            capturePerformanceMetrics(browser, task)
          );
          const concurrentResults = await Promise.all(monitorPromises);

          // Filter out null results
          const validResults = concurrentResults.filter(
            (result) => result !== null
          ) as APICheckResult[];
          console.log("Valid results:", validResults);
          results.push(...validResults);
          await prisma.$transaction(async (prisma) => {
            for (const result of validResults) {
              await prisma.aPICheck.create({
                data: {
                  apiId: result.apiId,
                  dnsLookupTime: result.dnsLookupTime,
                  tcpConnectionTime: result.tcpConnectionTime,
                  tlsHandshakeTime: result.tlsHandshakeTime,
                  statusCode: result.statusCode,
                  totalTime: result.totalTime,
                  live: result.live,
                  region: result.region,
                },
              });
            }
          });
        } catch (error) {
          console.error("Failed to parse message or process tasks:", error);
        }
      } else {
        console.warn("Received a message with null or undefined value");
      }
    },
  });
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
