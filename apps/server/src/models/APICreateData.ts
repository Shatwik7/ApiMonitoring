export enum Method {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
  UPDATE = "UPDATE",
  PATCH = "PATCH",
}
export interface APICreateData {
    url: string;
    name?: string;
    description?: string;
    checkInterval: number;
    userId: number;
    method?: Method;
    data?: string;
  }

  