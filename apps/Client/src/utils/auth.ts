/**
 * Stores the authentication token in localStorage.
 * @param token - The JWT token to store.
 */
export const storeToken = (token: string): void => {
    localStorage.setItem('authToken', token);
  };
  


  /**
   * Retrieves the authentication token from localStorage.
   * @returns The stored JWT token, or null if not found.
   */
  export const retrieveToken = (): string | null => {
    return localStorage.getItem('authToken');
  };

  


  /**
   * Checks if the user is authenticated.
   * @returns True if a valid token exists, otherwise false.
   */
  export const isAuthenticated = (): boolean => {
    const token = retrieveToken();
    return token !== null;
  };



  /**
   * remove token
   * @returns True , otherwise false.
   */
  export const setLogout=():boolean=>{
    localStorage.removeItem('authToken');
    return true;
  }