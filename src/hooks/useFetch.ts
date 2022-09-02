import { useCallback, useState } from 'react';
import { FetchResponse, fetchServer } from '../utils/fetchServer';

const useFetch = <T>(url: string) => {
  const abortController = new AbortController();
  const [data, setData] = useState<any>();
  const [statusCode, setStatusCode] = useState<number>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchData = useCallback(
    async (
      options?: any,
      queryString: string = '',
    ): Promise<FetchResponse<T> | null> => {
      // Return null if we are already fetching to avoid duplicate calls
      if (isLoading) return null;

      let fetchResponse = null;
      setIsLoading(true);

      try {
        fetchResponse = await fetchServer<T>(`${url}${queryString}`, {
          signal: abortController.signal,
          ...(options || {}),
        });

        setStatusCode(fetchResponse.status);
        setData(fetchResponse.response);
      } catch (err: any) {
        if (err.name === 'AbortError') return null;
        throw err;
      } finally {
        setIsLoading(false);
      }

      return fetchResponse;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isLoading, url],
  );

  return {
    data: data as T,
    fetchData,
    isLoading,
    statusCode,
  };
};

export default useFetch;
