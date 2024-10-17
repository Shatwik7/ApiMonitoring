import express from 'express';
import UserController from '../controllers/userController';
import { authenticateJWT } from '../middleware/authenticateJWT'; // Assuming the JWT middleware is in middleware/authenticateJWT.ts

const router = express.Router();


router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/me', authenticateJWT, UserController.fetchUserDetails);
router.post('/logout', authenticateJWT, UserController.logout);

export default router;
