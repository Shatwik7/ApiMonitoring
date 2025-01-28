import { PrismaClient, APICheck } from '@prisma/client';
import { APICheckCreateData } from '../models/APICheckCreateData';

const prisma = new PrismaClient();


    // Create a new API check
    async function createAPICheck(apiCheckData: APICheckCreateData): Promise<APICheck> {
      try {
        const newAPICheck = await prisma.aPICheck.create({
          data: apiCheckData,
        });
        return newAPICheck;
      } catch (error) {
        console.error('Error creating API check:', error);
        throw error;
      }
    }
  
    // Get API checks for a specific API in the last 24 hours
    async function getAPIChecksLast24Hours(apiId: number): Promise<APICheck[]> {
      try {
        const date = new Date();
        date.setHours(date.getHours() - 24);
        const apiChecks = await prisma.aPICheck.findMany({
          where: {
            apiId: apiId,
            checkedAt: {
              gte: date,
            },
          },
        });
        return apiChecks;
      } catch (error) {
        console.error('Error fetching API checks for the last 24 hours:', error);
        throw error;
      }
    }
  
    // Get API checks for a specific API in the last 7 days
    async function getAPIChecksLast7Days(apiId: number): Promise<APICheck[]> {
      try {
        const date = new Date();
        date.setDate(date.getDate() - 7);
        const apiChecks = await prisma.aPICheck.findMany({
          where: {
            apiId: apiId,
            checkedAt: {
              gte: date,
            },
          },
        });
        return apiChecks;
      } catch (error) {
        console.error('Error fetching API checks for the last 7 days:', error);
        throw error;
      }
    }
  
    // Get API checks for a specific API in the last 28 days
    async function getAPIChecksLast28Days(apiId: number): Promise<APICheck[]> {
      try {
        const date = new Date();
        date.setDate(date.getDate() - 28);
        const apiChecks = await prisma.aPICheck.findMany({
          where: {
            apiId: apiId,
            checkedAt: {
              gte: date,
            },
          },
        });
        return apiChecks;
      } catch (error) {
        console.error('Error fetching API checks for the last 28 days:', error);
        throw error;
      }
    }
  
    // Get API checks for a specific API in the last 3 months
    async function getAPIChecksLast3Months(apiId: number): Promise<APICheck[]> {
      try {
        const date = new Date();
        date.setMonth(date.getMonth() - 3);
        const apiChecks = await prisma.aPICheck.findMany({
          where: {
            apiId: apiId,
            checkedAt: {
              gte: date,
            },
          },
        });
        return apiChecks;
      } catch (error) {
        console.error('Error fetching API checks for the last 3 months:', error);
        throw error;
      }
    }
  
    // Get API checks for a specific API in the last 6 months
    async function getAPIChecksLast6Months(apiId: number): Promise<APICheck[]> {
      try {
        const date = new Date();
        date.setMonth(date.getMonth() - 6);
        const apiChecks = await prisma.aPICheck.findMany({
          where: {
            apiId: apiId,
            checkedAt: {
              gte: date,
            },
          },
        });
        return apiChecks;
      } catch (error) {
        console.error('Error fetching API checks for the last 6 months:', error);
        throw error;
      }
    }
  
    // Get all API checks for a specific API (forever)
    async function getAllAPIChecksForAPI(apiId: number): Promise<APICheck[]> {
      try {
        const apiChecks = await prisma.aPICheck.findMany({
          where: {
            apiId: apiId,
          },
        });
        return apiChecks;
      } catch (error) {
        console.error('Error fetching all API checks for the API:', error);
        throw error;
      }
    }
  
export { createAPICheck, getAPIChecksLast24Hours, getAPIChecksLast7Days, getAPIChecksLast28Days, getAPIChecksLast3Months, getAPIChecksLast6Months, getAllAPIChecksForAPI };
// const APICheck=new APICheckService();

// async function main() {
    
//     console.log(await APICheck.getAPIChecksLast24Hours(1));
// }

// main().catch((e)=>console.log(e));