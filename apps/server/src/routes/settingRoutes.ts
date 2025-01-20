import express from 'express';
import * as SettingsController from '../controllers/settingsController';
import { authenticateJWT } from '../middleware/authenticateJWT';

const router = express.Router();

router.get('/', authenticateJWT, SettingsController.fetchUserSettings);
router.post('/', authenticateJWT, SettingsController.createUserSettings);
router.put('/', authenticateJWT, SettingsController.updateUserSettings);
router.delete('/', authenticateJWT, SettingsController.deleteUserSettings);

export default router;
