import { useQuery } from 'react-query';
import fetchWithError from '../helpers/fetchWithError';

export function useUserData(userId) {
  const userQuery = useQuery(
    ['users', userId],
    () =>
      fetchWithError(`/api/users/${userId}`, {
        headers: { 'x-error': true }
      }),
    { staleTime: 1000 * 5 }
  );
  return userQuery;
}
