import { ErrorResponse } from '../types/ErrorResponse';

export interface FetchResponse<T> {
  response: T;
  status: number;
}

export const fetchServer = async <T>(
  url: string,
  options: any = {},
): Promise<FetchResponse<T>> => {
  const defaultOptions = {
    method: 'get',
    ...options,
    headers: {
      ...(options.headers || {}),
    },
  };

  const rawResponse = await fetch(url, { ...defaultOptions });
  const fetchResponse: Partial<FetchResponse<T>> = {
    status: rawResponse.status,
  };

  // Throw an error with all properties parsed and available
  if (!rawResponse.ok) {
    const errorResponse: Partial<ErrorResponse> = {
      key: 'genericError',
      originalResponse: rawResponse,
      status: rawResponse.status,
      statusText: rawResponse.statusText,
    };

    const errorText: string = await rawResponse.text();
    let errorObj;

    try {
      errorObj = JSON.parse(errorText);
      errorResponse.key = errorObj?.key;
      errorResponse.context = errorObj?.context;
    } catch (err) {
      errorObj = errorText;
    }

    errorResponse.parsedResponse = errorObj;
    throw errorResponse;
  }

  const textResponse: string = await rawResponse.text();

  try {
    fetchResponse.response = JSON.parse(textResponse);
  } catch (err) {
    // JSON.parse error, means received answer is not JSON, is a string
    fetchResponse.response = textResponse as unknown as T;
  }

  return fetchResponse as FetchResponse<T>;
};
