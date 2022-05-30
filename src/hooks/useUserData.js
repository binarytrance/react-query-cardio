import { useQuery } from 'react-query';

export function useUserData(userId) {
  const userQuery = useQuery(
    ['users', userId],
    () => fetch(`/api/users/${userId}`).then(res => res.json()),
    { staleTime: 1000 * 60 * 5 }
  );
  return userQuery;
}
