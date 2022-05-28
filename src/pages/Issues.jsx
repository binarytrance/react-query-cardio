import { useState } from 'react';
import IssuesList from '../components/IssuesList';
import LabelList from '../components/LabelList';
import { StatusSelect } from './StatusSelect';
export default function Issues() {
  const [activeLabels, setActiveLabels] = useState([]);
  const [status, setStatus] = useState('');

  const handleActiveLabels = selectedLabel => {
    const activeLabelsCopy = [...activeLabels];
    console.log(activeLabels);
    if (activeLabelsCopy.includes(selectedLabel)) {
      activeLabelsCopy.splice(activeLabels.indexOf(selectedLabel), 1);
    } else {
      activeLabelsCopy.push(selectedLabel);
    }
    setActiveLabels(activeLabelsCopy);
    console.log(activeLabelsCopy);
  };
  return (
    <div>
      <main>
        <section>
          <IssuesList activeLabels={activeLabels} status={status} />
        </section>
        <aside>
          <LabelList
            handleActiveLabels={handleActiveLabels}
            activeLabels={activeLabels}
          />
          <StatusSelect
            status={status}
            onChange={e => setStatus(e.target.value)}
          />
        </aside>
      </main>
    </div>
  );
}
