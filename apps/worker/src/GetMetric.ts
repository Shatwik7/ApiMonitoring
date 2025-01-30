import { Browser } from "puppeteer";
import { createIncidentHandler } from "./incidentHandler";
import { resolveIncidentHandler } from "./resolveIncident";
import { mapRegion } from "./utils/RegionMaper";
import { HttpMethod ,Region} from '@prisma/client';

const REGION=process.env.REGION||"eurpo";
export interface API {
    id: number;
    url: string;
    checkInterval: number;
    nextCheck: Date | null;
    live: boolean;
    userId: number;
    method:HttpMethod;
    statusCode: number | null;
    request_timeout: number | null;
    domainExpiration: boolean | null;
    sslExpiration: boolean | null;
  }
  
 export interface APICheckResult {
    apiId: number;
    dnsLookupTime: number;
    tcpConnectionTime: number;
    tlsHandshakeTime: number;
    statusCode: number;
    totalTime: number;
    live: boolean;
    region: Region;
  }
export async function PuppeteerFindMetric(
    browser: Browser,
    task: API
  ): Promise<APICheckResult | null> {
    const page = await browser.newPage();
    let statusCode = 0;
  
    try {
      const response = await page.goto(task.url, {
        waitUntil: "load",
        timeout: 30000,
      });
      await page.setCacheEnabled(false);
      if (response) {
        statusCode = response.status();
        if (statusCode!==task.statusCode) {
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
      if(!task.live){
        resolveIncidentHandler(task.id);
      }
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
      if(!task.live) return null;
      await createIncidentHandler(task.id,page,error,task.url,statusCode);
      return null;
    }
  }
  