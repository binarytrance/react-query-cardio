import { useIsFetching } from 'react-query';
import Loader from './Loader';

export default function FetchingIndicator() {
  const isFetching = useIsFetching();
  if (isFetching) {
    return (
      <div class='fetching-indicator'>
        <Loader />
      </div>
    );
  }
  return null;
}
