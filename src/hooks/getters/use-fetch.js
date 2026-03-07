import { fetcher } from "src/lib/axios";
import useSWR from "swr";

export function useFetch(endpoint) {
  return useSWR(endpoint, fetcher, {
    revalidateIfStale: true,
    revalidateOnFocus: true,
    revalidateOnReconnect: false,
  });
}
