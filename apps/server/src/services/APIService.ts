import { PrismaClient, API } from '@prisma/client';
import { APICreateData } from '../models/APICreateData';

const prisma = new PrismaClient();

/**
 * Create a new API record.
 * @param apiData - Data for the new API Monitoring.
 * @returns The created API record.
 */
async function createAPI(apiData: APICreateData): Promise<API> {
  try {
    const date = new Date();
    console.log(apiData.checkInterval);
    const nextCheck = new Date(date.getTime() + apiData.checkInterval * 1000);

    const newAPI = await prisma.aPI.create({
      data: {
        url: apiData.url,
        name: apiData.name,
        description: apiData.description || null,
        checkInterval: apiData.checkInterval,
        lastCheck: date,
        nextCheck: nextCheck,
        userId: apiData.userId,
      },
    });

    return newAPI;
  } catch (error) {
    console.error('Error creating API:',error);
    throw new Error('Failed to create API. Please check the input and try again.');
  }
}

/**
 * Fetch all API records.
 * @returns A list of APIs.
 */
async function getAllAPIs(): Promise<API[]> {
  try {
    return await prisma.aPI.findMany();
  } catch (error) {
    console.error('Error fetching APIs:',error);
    throw new Error('Failed to fetch APIs.');
  }
}

/**
 * Fetch an API by ID.
 * @param apiId - The ID of the API.
 * @returns The API record, or null if not found.
 */
async function getAPIById(apiId: number): Promise<API | null> {
  try {
    return await prisma.aPI.findUnique({
      where: { id: apiId },
    });
  } catch (error) {
    console.error('Error fetching API by ID:',error);
    throw new Error(`Failed to fetch API with ID ${apiId}.`);
  }
}

/**
 * Update an API record.
 * @param apiId - The ID of the API.
 * @param updateData - Partial data to update.
 * @returns The updated API record.
 */
async function updateAPI(apiId: number, updateData: Partial<APICreateData>): Promise<API> {
  try {
    return await prisma.aPI.update({
      where: { id: apiId },
      data: updateData,
    });
  } catch (error) {
    console.error('Error updating API:', error);
    throw new Error(`Failed to update API with ID ${apiId}.`);
  }
}

/**
 * Delete an API record.
 * @param apiId - The ID of the API.
 * @returns A success message.
 */
async function deleteAPI(apiId: number): Promise<{ message: string }> {
  try {
    await prisma.aPI.delete({
      where: { id: apiId },
    });
    return { message: 'API deleted successfully' };
  } catch (error) {
    console.error('Error deleting API:',error);
    throw new Error(`Failed to delete API with ID ${apiId}.`);
  }
}

export { createAPI, getAllAPIs, getAPIById, updateAPI, deleteAPI };
