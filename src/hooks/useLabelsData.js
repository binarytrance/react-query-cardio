import { useQuery } from 'react-query';
import fetchWithError from '../helpers/fetchWithError';

export const useLabelsData = () => {
  const labelsQuery = useQuery(['labels'], ({ signal }) =>
    fetchWithError('/api/labels', { signal })
  );
  return labelsQuery;
};
