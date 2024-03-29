import { useLabelsData } from '../hooks/useLabelsData';

export default function LabelList({
  activeLabels,
  handleActiveLabels
}) {
  const labelsQuery = useLabelsData();
  return (
    <div className='labels'>
      <h3>Labels</h3>
      {labelsQuery.isError && <p>{labelsQuery.error.message}</p>}
      {labelsQuery.isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {!labelsQuery.isError &&
            labelsQuery.data.map(label => (
              <li key={label.id}>
                <button
                  className={`${label.color} ${
                    activeLabels.includes(label.id) && 'selected'
                  }`}
                  onClick={() => handleActiveLabels(label.id)}
                >
                  {label.name}
                </button>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}
