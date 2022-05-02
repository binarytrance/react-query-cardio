import { useQuery } from 'react-query';

export function useUserData(userId) {
  const userQuery = useQuery(['users', userId], () =>
    fetch(`/api/users/${userId}`).then(res => res.json())
  );
  return userQuery;
}
