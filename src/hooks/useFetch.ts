import { useCallback, useState } from 'react';
import { fetchServer } from '../utils/fetchServer';

const useFetch = <T>(url: string) => {
  const abortController = new AbortController();
  const [data, setData] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchData = useCallback(
    async (options?: any, queryString: string = ''): Promise<T | null> => {
      // Return null if we are already fetching to avoid duplicate calls
      if (isLoading) return null;

      let parsedData = null;
      setIsLoading(true);

      try {
        parsedData = await fetchServer<T>(`${url}${queryString}`, {
          signal: abortController.signal,
          ...(options || {}),
        });

        setData(parsedData);
      } catch (err: any) {
        if (err.name === 'AbortError') return null;
        throw err;
      } finally {
        setIsLoading(false);
      }

      return parsedData;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isLoading, url],
  );

  return {
    data: data as T,
    fetchData,
    isLoading,
  };
};

export default useFetch;
