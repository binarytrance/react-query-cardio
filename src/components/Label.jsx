import { useLabelsData } from '../hooks/useLabelsData';

export function Label({ label }) {
  const labels = useLabelsData();
  console.log(labels.data);
  if (labels.isLoading) return null;
  if (labels.isError) return <p>{labels.error.message}</p>;
  const labelDetails = labels.data.find(l => {
    console.log({ id: l.id });
    return l.id === label;
  });
  console.log({ labelDetails, label });
  if (labelDetails) {
    return (
      <span
        key={labelDetails.id}
        className={`label ${labelDetails.color}`}
      >
        {labelDetails.name}
      </span>
    );
  } else return null;
}
