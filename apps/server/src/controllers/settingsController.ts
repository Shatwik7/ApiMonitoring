import { Request, Response } from 'express';
import * as SettingsService from '../services/SettingsService';


  // Fetch user settings
  /**
   * 
   * @param req express request
   * @param res express response
   */
  async function fetchUserSettings(req: Request, res: Response) {
    try {
      const userId = req.userId; 
      if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const settings = await SettingsService.getSettingsByUserId(userId);
      if (!settings) {
        return res.status(404).json({ message: 'Settings not found' });
      }

      return res.json(settings);
    } catch (error) {
      console.error('Error fetching settings:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  // Update user settings
  /**
   * 
   * @param req express request
   * @param res express response
   */
  async function updateUserSettings(req: Request, res: Response) {
    try {
      const userId = req.userId;
      if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const updatedSettings = await SettingsService.updateSettings(userId, req.body);
      return res.json(updatedSettings);
    } catch (error) {
      console.error('Error updating settings:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  // Create user settings
  async function createUserSettings(req: Request, res: Response) {
    try {
      const userId = req.userId;
      if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const newSettings = await SettingsService.createSettings({ ...req.body, userId });
      return res.status(201).json(newSettings);
    } catch (error) {
      console.error('Error creating settings:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  // Delete user settings
  async function deleteUserSettings(req: Request, res: Response) {
    try {
      const userId = req.userId;
      if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const deletedSettings = await SettingsService.deleteSettings(userId);
      return res.json(deletedSettings);
    } catch (error) {
      console.error('Error deleting settings:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }


export { fetchUserSettings, updateUserSettings, createUserSettings, deleteUserSettings };