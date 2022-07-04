import { useQuery } from 'react-query';
import { LABELS_INITIAL_DATA } from './placeholderData';
import fetchWithError from '../helpers/fetchWithError';

export const useLabelsData = () => {
  const labelsQuery = useQuery(
    ['labels'],
    ({ signal }) => fetchWithError('/api/labels', { signal }),
    {
      placeholderData: LABELS_INITIAL_DATA
    }
  );
  return labelsQuery;
};
