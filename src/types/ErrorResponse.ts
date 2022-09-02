export interface ErrorResponse {
  key: string;
  originalResponse: any;
  parsedResponse: any;
  response?: any;
  status: number;
  statusText: string;
}
