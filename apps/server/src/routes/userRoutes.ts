import express from 'express';
import * as UserController from '../controllers/userController';
import { authenticateJWT } from '../middleware/authenticateJWT'; // Assuming the JWT middleware is in middleware/authenticateJWT.ts

const router = express.Router();


router.post('/signup', UserController.register);
router.post('/signin', UserController.login);
router.get('/me', authenticateJWT, UserController.fetchUserDetails);
router.post('/logout', authenticateJWT, UserController.logout);

export default router;
