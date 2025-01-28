export const formatResponse = (data: any) => {
    return { success: true, data };
  };
  
  export const formatErrorResponse = (message: string, error?: any) => {
    return { success: false, message, error: error?.message || error };
  };