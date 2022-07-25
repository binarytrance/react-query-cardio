import { useQuery } from 'react-query';
import fetchWithError from '../helpers/fetchWithError';

export function useAllUsers() {
  const allUsers = useQuery(['users'], ({ signal }) =>
    fetchWithError('/api/users', { signal })
  );
  console.log({ allUsers });

  return allUsers;
}
