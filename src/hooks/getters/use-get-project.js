import { useMemo } from "react";
import { fetcher } from "src/lib/axios";
import { endpoints } from "src/lib/endpoints";
import useSWR from "swr";

/**
 * @typedef {Object} Project
 * @property {string} name - Project name
 * @property {string} description - Project description
 * @property {'in_progress'|'upcoming'|'blocked'|'completed'} status - Project status
 * @property {string} start_date - Project start date (ISO string)
 * @property {string} end_date - Project end date (ISO string)
 * @property {string} projectCode - Unique project code
 * @property {User} created_by - User who created the project
 * @property {string} board - board id
 * @property {Task[]} tasks - List of project tasks
 * @property {User[]} assignedUsers - Users assigned to the project
 * @property {Label[]} labels - Project labels
 * @property {string} id - Unique project ID
 * @property {string} created_at - Creation timestamp
 * @property {string} updated_at - Last update timestamp
 */

/**
 * @typedef {Object} GetProjectResponse
 * @property {Project} project
 */

const swrOptions = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};

/**
 * @returns {{
 *   project: Project,
 *   projectLoading: boolean,
 *   projectError: Error,
 *   projectValidating: boolean,
 *   projectEmpty: boolean
 * }}
 */
export function useGetProject(id) {
  const url = endpoints.get.projects.id(id);

  const { data, isLoading, error, isValidating } = useSWR(
    url,
    /** @returns {Promise<GetProjectResponse>} */
    fetcher,
    swrOptions
  );

  const memoizedValue = useMemo(
    () => ({
      project: data || {},
      projectLoading: isLoading,
      projectError: error,
      projectValidating: isValidating,
      projectEmpty: !isLoading && !isValidating && !data,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}
