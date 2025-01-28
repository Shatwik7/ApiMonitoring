// src/routes/apiCheckRoutes.ts
import { Router } from 'express';
import * as APICheckController from '../controllers/apiCheckContoller';

const router = Router();

// Define routes
// router.post('/', APICheckController.createAPICheck);
router.get('/:id/last24hours', APICheckController.getAPIChecksLast24Hours);
router.get('/:id/last7days', APICheckController.getAPIChecksLast7Days);
router.get('/:id/last28days', APICheckController.getAPIChecksLast28Days);
router.get('/:id/last3months', APICheckController.getAPIChecksLast3Months);
router.get('/:id/last6months', APICheckController.getAPIChecksLast6Months);
router.get('/:id', APICheckController.getAllAPIChecksForAPI);

export default router;
