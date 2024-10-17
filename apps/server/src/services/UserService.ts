import { PrismaClient, User } from '@prisma/client';
import { UserCreateData } from '../models/UserCreateData';

const prisma = new PrismaClient();

class UserService {
  // Create a new user
  async createUser(userData: UserCreateData): Promise<User> {
    try {
      const newUser = await prisma.user.create({
        data: userData,
      });
      return newUser;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  // Get user by ID
  async getUserById(userId: number): Promise<User | null> {
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        include: {
          apis: true,
          alerts: true,
          notifications: true,
          settings: true,
        },
      });
      return user;
    } catch (error) {
      console.error('Error fetching user by ID:', error);
      throw error;
    }
  }

  // Get user by email
  async getUserByEmail(email: string): Promise<User | null> {
    try {
      const user = await prisma.user.findUnique({
        where: { email: email },
      });
      return user;
    } catch (error) {
      console.error('Error fetching user by email:', error);
      throw error;
    }
  }

  // Update user by ID
  async updateUser(userId: number, updateData: Partial<UserCreateData>): Promise<User> {
    try {
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: updateData,
      });
      return updatedUser;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }

  // Delete user by ID
  async deleteUser(userId: number): Promise<User> {
    try {
      const deletedUser = await prisma.user.delete({
        where: { id: userId },
      });
      return deletedUser;
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  }

  // Get all users
  async getAllUsers(): Promise<User[]> {
    try {
      const users = await prisma.user.findMany({
        include: {
          apis: true,
          alerts: true,
          notifications: true,
          settings: true,
        },
      });
      return users;
    } catch (error) {
      console.error('Error fetching all users:', error);
      throw error;
    }
  }
}

export default UserService;
