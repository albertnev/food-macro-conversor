interface ErrorResponse {
  originalResponse: any;
  parsedResponse: any;
  response: any;
  status: number;
  statusText: string;
}

export const fetchServer = async <T>(
  url: string,
  options: any = {},
): Promise<T> => {
  const defaultOptions = {
    method: 'get',
    ...options,
    headers: {
      ...(options.headers || {}),
    },
  };

  const rawResponse = await fetch(url, { ...defaultOptions });

  // Throw an error with all properties parsed and available
  if (!rawResponse.ok) {
    const errorResponse: Partial<ErrorResponse> = {
      originalResponse: rawResponse,
      status: rawResponse.status,
      statusText: rawResponse.statusText,
    };

    const errorText: string = await rawResponse.text();
    let errorObj;

    try {
      errorObj = JSON.parse(errorText);
    } catch (err) {
      errorObj = errorText;
    }

    errorResponse.parsedResponse = errorObj;
    throw errorResponse;
  }

  const textResponse: string = await rawResponse.text();
  let parsedResponse;

  try {
    parsedResponse = JSON.parse(textResponse);
  } catch (err) {
    // JSON.parse error, means received answer is not JSON, is a string
    return textResponse as unknown as T;
  }

  return parsedResponse as T;
};
