import { useState } from 'react';
import IssuesList from '../components/IssuesList';
import LabelList from '../components/LabelList';
export default function Issues() {
  const [activeLabels, setActiveLabels] = useState([]);
  const handleActiveLabels = selectedLabel => {
    const activeLabelsCopy = [...activeLabels];
    console.log(activeLabels);
    if (activeLabelsCopy.indexOf(selectedLabel) > 0) {
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
          <h1>Issues</h1>
          <IssuesList activeLabels={activeLabels} />
        </section>
        <aside>
          <LabelList
            handleActiveLabels={handleActiveLabels}
            activeLabels={activeLabels}
          />
        </aside>
      </main>
    </div>
  );
}
