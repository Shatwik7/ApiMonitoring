export interface APICheckCreateData{
    apiId: number;
    apiUrl: string;
    dnsLookupTime: number;
    tcpConnectionTime: number;
    tlsHandshakeTime: number;
    statusCode: number;
    totalTime: number;
  }