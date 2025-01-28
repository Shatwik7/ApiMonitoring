import { Request, Response } from 'express';
import * as apiCheckService from '../services/APICheckService';

// Create a new API check
/**
 * 
 * @param req 
 * @param res 
 */
  async function createAPICheck(req: Request, res: Response): Promise<void> {
    try {
      const newAPICheck = await apiCheckService.createAPICheck(req.body);
      res.status(201).json(newAPICheck);
    } catch (error) {
      res.status(500).json({ message: 'Error creating API check', error });
    }
  }

  /**
   * 
   * @param req 
   * @param res 
   */
  // Get API checks for a specific API in the last 24 hours
  async function getAPIChecksLast24Hours(req: Request, res: Response): Promise<void> {
    try {
      const apiChecks = await apiCheckService.getAPIChecksLast24Hours(Number(req.params.id));
      res.json(apiChecks);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching API checks for the last 24 hours', error });
    }
  }

  /**
   * 
   * @param req express request
   * @param res express response
   */
  // Get API checks for a specific API in the last 7 days
  async function getAPIChecksLast7Days(req: Request, res: Response): Promise<void> {
    try {
      const apiChecks = await apiCheckService.getAPIChecksLast7Days(Number(req.params.id));
      res.json(apiChecks);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching API checks for the last 7 days', error });
    }
  }

  /**
   * 
   * @param req express request
   * @param res express response
   */
  // Get API checks for a specific API in the last 28 days
  async function getAPIChecksLast28Days(req: Request, res: Response): Promise<void> {
    try {
      const apiChecks = await apiCheckService.getAPIChecksLast28Days(Number(req.params.id));
      res.json(apiChecks);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching API checks for the last 28 days', error });
    }
  }

  /**
   * 
   * @param req express request
   * @param res express response
   */
  // Get API checks for a specific API in the last 3 months
  async function getAPIChecksLast3Months(req: Request, res: Response): Promise<void> {
    try {
      const apiChecks = await apiCheckService.getAPIChecksLast3Months(Number(req.params.id));
      res.json(apiChecks);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching API checks for the last 3 months', error });
    }
  }
  /**
   * 
   * @param req express request
   * @param res express response
   */
  // Get API checks for a specific API in the last 6 months
  async function getAPIChecksLast6Months(req: Request, res: Response): Promise<void> {
    try {
      const apiChecks = await apiCheckService.getAPIChecksLast6Months(Number(req.params.id));
      res.json(apiChecks);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching API checks for the last 6 months', error });
    }
  }
  /**
   * 
   * @param req express request
   * @param res express response
   */
  // Get all API checks for a specific API (forever)
  async function getAllAPIChecksForAPI(req: Request, res: Response): Promise<void> {
    try {
      const apiChecks = await apiCheckService.getAllAPIChecksForAPI(Number(req.params.id));
      res.json(apiChecks);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching all API checks for the API', error });
    }
  }

export { createAPICheck, getAPIChecksLast24Hours, getAPIChecksLast7Days, getAPIChecksLast28Days, getAPIChecksLast3Months, getAPIChecksLast6Months, getAllAPIChecksForAPI };
