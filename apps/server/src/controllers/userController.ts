
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import UserService from '../services/UserService';

declare module 'express' {
    export interface Request {
        userId?: number;
    }
}

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';
const userService = new UserService();

class UserController {
    // User sign-up (register)
    async register(req: Request, res: Response) {
        const { email, password, name } = req.body;
        console.log({ email, password, name });

        try {
            // Check if the user already exists
            const existingUser = await userService.getUserByEmail(email);

            if (existingUser) {
                return res.status(400).json({ message: 'User already exists' });
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create a new user with UserService
            const newUser = await userService.createUser({
                email,
                password: hashedPassword,
                name,
            });

            // Create JWT token
            const token = jwt.sign(
                { userId: newUser.id },
                JWT_SECRET,
                {
                    expiresIn: '1d', // Token expires in 1 day
                }
            );

            return res.status(201).json({ token, user: newUser });
        } catch (error) {
            console.error('Error registering user:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    // User login
    async login(req: Request, res: Response) {
        const { email, password } = req.body;

        try {
            // Find user by email using UserService
            const user = await userService.getUserByEmail(email);

            if (!user) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }

            // Check if the password is valid
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }

            // Create JWT token
            const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
                expiresIn: '1d',
            });

            return res.json({ token, user });
        } catch (error) {
            console.error('Error logging in:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    // Fetch logged-in user's details
    async fetchUserDetails(req: Request, res: Response) {
        try {
            const userId = req.userId;

            if (!userId) {
                return res.status(401).json({ message: 'Unauthorized' });
            }

            // Fetch user details using UserService
            const user = await userService.getUserById(userId);

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            return res.json(user);
        } catch (error) {
            console.error('Error fetching user details:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    // Logout (for token invalidation, handled at client-side by clearing tokens)
    async logout(req: Request, res: Response) {
        return res.status(200).json({ message: 'Logged out successfully' });
    }
}

export default new UserController();
