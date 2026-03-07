import { useMemo } from "react";
import { fetcher } from "src/lib/axios";
import { endpoints } from "src/lib/endpoints";
import useSWR from "swr";

/**
 * @typedef {Object} GetProjectsResponse
 * @property {Project[]} projects
 */

const swrOptions = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};

/**
 * @returns {{
 *   projects: Project[],
 *   projectsLoading: boolean,
 *   projectsError: Error,
 *   projectsValidating: boolean,
 *   projectsEmpty: boolean
 * }}
 */
export function useGetProjects() {
  const url = endpoints.get.projects.root;

  const { data, isLoading, error, isValidating } = useSWR(
    url,
    /** @returns {Promise<GetProjectsResponse>} */
    fetcher,
    swrOptions
  );

  const memoizedValue = useMemo(
    () => ({
      projects: data?.data || [],
      projectsLoading: isLoading,
      projectsError: error,
      projectsValidating: isValidating,
      projectsEmpty: !isLoading && !isValidating && !data?.data.length,
    }),
    [data?.data, error, isLoading, isValidating]
  );

  return memoizedValue;
}
