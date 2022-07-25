import { possibleStatus } from '../helpers/defaultData';

export const StatusSelect = ({ status, onChange, noEmptyOption }) => {
  return (
    <select
      value={status}
      onChange={onChange}
      className='status-select'
    >
      {!noEmptyOption && <option value=''>Select a status</option>}
      {possibleStatus.map(status => (
        <option key={status.id} value={status.id}>
          {status.label}
        </option>
      ))}
    </select>
  );
};
