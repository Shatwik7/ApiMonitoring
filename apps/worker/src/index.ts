require('dotenv').config();

import puppeteer, { Browser } from "puppeteer";
import { PrismaClient , HttpMethod } from "@prisma/client";
import { Kafka } from "kafkajs";
import { API, APICheckResult, PuppeteerFindMetric } from "./GetMetric";
import { DefaultFindMetric } from "./DefaultMetric";
const prisma = new PrismaClient();

const REGION = process.env.REGION || "europe";



const kafka = new Kafka({
  clientId: `worker-service-${REGION}`,
  brokers: ["localhost:9093"],
});


const consumer = kafka.consumer({ groupId: `api-monitoring-group-${REGION}` });


async function createBrowserInstance(): Promise<Browser> {
  return await puppeteer.launch({ args: ["--ignore-certificate-errors"] });
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

          const monitorPromises = tasks.map((task) =>{
            switch (task.method) {
              case HttpMethod.GET:
                return PuppeteerFindMetric(browser, task);
              default:
                return  DefaultFindMetric(task);
            }
                
            }
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
