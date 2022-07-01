import { useQuery } from 'react-query';
import fetchWithError from '../helpers/fetchWithError';

export function useUserData(userId) {
  const userQuery = useQuery(
    ['users', userId],
    ({ signal }) =>
      fetchWithError(`/api/users/${userId}`, { signal }),
    { staleTime: 1000 * 5 }
  );
  return userQuery;
}
