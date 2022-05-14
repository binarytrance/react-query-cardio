import { useLabelsData } from '../hooks/useLabelsData';

export function Label({ label }) {
  const labels = useLabelsData();
  if (labels.isLoading) return null;
  const labelDetails = labels.data.find(l => {
    return l.id === label;
  });
  return (
    <span
      key={labelDetails.id}
      className={`label ${labelDetails.color}`}
    >
      {labelDetails.name}
    </span>
  );
}
