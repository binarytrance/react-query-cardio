import { useQuery } from 'react-query';
import fetchWithError from '../helpers/fetchWithError';

export const useLabelsData = () => {
  const labelsQuery = useQuery(
    ['labels'],
    () =>
      fetchWithError('/api/labels', { headers: { 'x-error': true } }),
    {
      staleTime: 1000 * 60 * 60
    }
  );
  return labelsQuery;
};
