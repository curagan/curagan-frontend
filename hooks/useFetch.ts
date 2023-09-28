import useSWR from 'swr';
import axios from 'axios';

export function useFetch<Data = any, Error = any>(url: string) {
  const fetcher = async (url: string) => {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : JSON.stringify(error),
      );
    }
  };

  const { data, error } = useSWR<Data, Error>(url, fetcher);

  return { data, error };
}
