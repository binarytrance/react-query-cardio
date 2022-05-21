import { possibleStatus } from '../helpers/defaultData';

export const StatusSelect = ({ status, onChange }) => {
  return (
    <select
      value={status}
      onChange={onChange}
      className='status-select'
    >
      <option value=''>Select a status</option>
      {possibleStatus.map(status => (
        <option value={status.id}>{status.label}</option>
      ))}
    </select>
  );
};
