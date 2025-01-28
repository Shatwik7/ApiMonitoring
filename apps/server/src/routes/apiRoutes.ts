import { Router } from 'express';
import * as APIController from '../controllers/apiController';
import { authenticateJWT } from '../middleware/authenticateJWT';

const router = Router();

router.post('/', authenticateJWT,APIController.createAPI,);
router.get('/',authenticateJWT, APIController.getAllAPIs);
router.get('/:id', APIController.getAPIById);
router.put('/:id', APIController.updateAPI);
router.delete('/:id', APIController.deleteAPI);

export default router;