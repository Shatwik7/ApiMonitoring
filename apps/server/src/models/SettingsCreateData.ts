export interface SettingsCreateData {
  userId: number;  
  notifyByEmail: boolean; 
  notifyBySMS: boolean;     
  alertThresholdTime: number;
}