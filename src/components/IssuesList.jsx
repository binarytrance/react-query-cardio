import { useQuery } from 'react-query';
import { IssueItem } from './IssueItem';

export default function IssuesList({ activeLabels, status }) {
  const issuesQuery = useQuery(
    ['issues', { activeLabels, status }],
    () => {
      const statusString = `&status=${status}`;
      const labelsString = activeLabels
        .map(label => `labels[]=${label}`)
        .join('&'); // turn into query string
      return fetch(`/api/issues?${labelsString}${statusString}`).then(
        res => res.json()
      );
    }
  );
  return (
    <div>
      <h2>Issues List</h2>
      {issuesQuery.isLoading ? (
        <p>Loading ...</p>
      ) : (
        <ul className='issues-list'>
          {issuesQuery.data.map(issue => (
            <IssueItem
              key={issue.id}
              title={issue.title}
              number={issue.number}
              assignee={issue.assignee}
              commentCount={issue.comments.length}
              createdBy={issue.createdBy}
              createdDate={issue.createdDate}
              status={issue.status}
              labels={issue.labels}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
