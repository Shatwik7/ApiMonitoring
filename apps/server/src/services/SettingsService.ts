import { PrismaClient, Settings } from '@prisma/client';
import { SettingsCreateData } from '../models/SettingsCreateData';

const prisma = new PrismaClient();

class SettingsService {
  // Create new settings
  async createSettings(settingsData: SettingsCreateData): Promise<Settings> {
    try {
      const newSettings = await prisma.settings.create({
        data: settingsData,
      });
      return newSettings;
    } catch (error) {
      console.error('Error creating settings:', error);
      throw error;
    }
  }

  // Get settings by userId
  async getSettingsByUserId(userId: number): Promise<Settings | null> {
    try {
      const settings = await prisma.settings.findUnique({
        where: { userId },
      });
      return settings;
    } catch (error) {
      console.error('Error fetching settings by userId:', error);
      throw error;
    }
  }

  // Update settings by userId
  async updateSettings(userId: number, updateData: Partial<SettingsCreateData>): Promise<Settings> {
    try {
      const updatedSettings = await prisma.settings.update({
        where: { userId },
        data: updateData,
      });
      return updatedSettings;
    } catch (error) {
      console.error('Error updating settings:', error);
      throw error;
    }
  }

  // Delete settings by userId
  async deleteSettings(userId: number): Promise<Settings> {
    try {
      const deletedSettings = await prisma.settings.delete({
        where: { userId },
      });
      return deletedSettings;
    } catch (error) {
      console.error('Error deleting settings:', error);
      throw error;
    }
  }
}

export default new SettingsService();