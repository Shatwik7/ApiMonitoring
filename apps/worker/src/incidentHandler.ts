import { incidentService } from './grpcClient';
import * as grpc from "@grpc/grpc-js";
import { Page } from 'puppeteer';
import { ApiError } from '@prisma/client';
import { takeScreenshot } from './imageStore';
import {
  LockOnIncident
} from '@repo/cache';
import { API } from './GetMetric';

/**
 * Generate description and error type for an incident.
 * @param error - The caught error object or message.
 * @param url - The URL of the API being monitored.
 * @returns Object containing the description and ApiError type.
 */
function determineIncidentDetails(error: any, url: string): { description: string; type: ApiError } {
  let type: ApiError;
  let description: string;

  if (error.message.includes('net::ERR_NAME_NOT_RESOLVED')) {
    type = 'DNS';
    description = `DNS lookup failed for URL: ${url}`;
  } else if (error.message.includes('Timeout')) {
    type = 'TIMEOUT';
    description = `Timeout occurred: Navigation to ${url} exceeded the expected limit.`;
  } else if (error.message.includes('HTTP error')) {
    type = 'STATUS';
    description = `HTTP status error detected for URL: ${url} - ${error.message}`;
  } else {
    type = 'STATUS';
    description = `An unexpected error occurred for URL: ${url} - ${error.message}`;
  }

  return { description, type };
}

/**
 * Create an incident for an API when an error occurs.
 * @param apiId - The ID of the API related to the incident.
 * @param page - Puppeteer page instance (used for optional screenshots).
 * @param error - The error that occurred during monitoring.
 * @returns The created incident.
 */
export async function createIncidentHandler(
  apiId: number,
  page: Page | null,
  error: any,
  url: string,
  statusCode:number
): Promise<void> {
  const { description, type } = determineIncidentDetails(error, url);
  if(!(await LockOnIncident(apiId))) return;
  let screenshot;
  if (page) {
    screenshot = await takeScreenshot(page, apiId);
  }

  incidentService.CreateIncident({
    apiId: apiId,
    description: description,
    type: type,
    statusCode: statusCode,
    screenshot: screenshot,
  }, (err: grpc.ServiceError | null, response: any) => {
    if (err) {
      console.error('Error creating incident:', err.message);
      return;
    }
    console.log('Incident created successfully:', response);
  });
  console.log(`Incident created for API ID ${apiId}: ${description}`);
}



/**
 * Create an incident for an API when an error occurs.
 * @param error The error that occurred during monitoring.
 * @param api api data
 * @param statusCode statusCode which was collected during sending the request
 * @returns 
 */
export async function defaultIncidentHandler(error:any,api:API,statusCode:number):Promise<void>{
  const { description, type } = determineIncidentDetails(error, api.url);
  if(!(await LockOnIncident(api.id))) return;
  incidentService.CreateIncident({
    apiId: api.id,
    description: description,
    type: type,
    statusCode: statusCode,
    screenshot: undefined,
  }, (err: grpc.ServiceError | null, response: any) => {
    if (err) {
      console.error('Error creating incident:', err.message);
      return;
    }
    console.log('Incident created successfully:', response);
  });
}