import { Request, Response } from 'express';
import * as apiService from '../services/APIService';
import { formatResponse, formatErrorResponse } from '../views/response';


  async function createAPI(req: Request, res: Response): Promise<void> {
    try {
      const body={...req.body,userId:req.userId}
      const newAPI = await apiService.createAPI(body);
      res.status(201).json(formatResponse(newAPI));
    } catch (error) {
      console.error('Error creating API:', error);
      res.status(500).json(formatErrorResponse('Failed to create API', error));
    }
  }

  async function getAllAPIs(req: Request, res: Response): Promise<void> {
    try {
      const apis = await apiService.getAllAPIs();
      res.json(formatResponse(apis));
    } catch (error) {
      res.status(500).json(formatErrorResponse('Failed to fetch APIs', error));
    }
  }

  async function getAPIById(req: Request, res: Response): Promise<void> {
    try {
      const apiId = Number(req.params.id);
      const api = await apiService.getAPIById(apiId);
      if (api) {
        res.json(formatResponse(api));
      } else {
        res.status(404).json(formatErrorResponse('API not found'));
      }
    } catch (error) {
      res.status(500).json(formatErrorResponse('Failed to fetch API', error));
    }
  }

  async function updateAPI(req: Request, res: Response): Promise<void> {
    try {
      const apiId = Number(req.params.id);
      const updatedAPI = await apiService.updateAPI(apiId, req.body);
      res.json(formatResponse(updatedAPI));
    } catch (error) {
      res.status(500).json(formatErrorResponse('Failed to update API', error));
    }
  }

  async function deleteAPI(req: Request, res: Response): Promise<void> {
    try {
      const apiId = Number(req.params.id);
      const result = await apiService.deleteAPI(apiId);
      res.json(formatResponse(result));
    } catch (error) {
      res.status(500).json(formatErrorResponse('Failed to delete API', error));
    }
  }

export { createAPI, getAllAPIs, getAPIById, updateAPI, deleteAPI };
