export interface ErrorResponse {
  context: any;
  key: string;
  originalResponse: any;
  parsedResponse: any;
  response?: any;
  status: number;
  statusText: string;
}
