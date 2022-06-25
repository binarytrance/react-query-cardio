import { useState } from 'react';
import { useQuery } from 'react-query';
import fetchWithError from '../helpers/fetchWithError';
import { IssueItem } from './IssueItem';

export default function IssuesList({ activeLabels, status }) {
  const issuesQuery = useQuery(
    ['issues', { activeLabels, status }],
    () => {
      const statusString = `&status=${status}`;
      const labelsString = activeLabels
        .map(label => `labels[]=${label}`)
        .join('&'); // turn into query string
      return fetchWithError(
        `/api/issues?${labelsString}${statusString}`,
        {
          headers: { 'x-error': true }
        }
      );
    },
    {
      staleTime: 1000 * 60
    }
  );
  const [searchValue, setSearchValue] = useState('');

  const searchQuery = useQuery(
    ['issues', 'search', searchValue],
    () =>
      fetch(`/api/search/issues?q=${searchValue}`).then(res =>
        res.json()
      ),
    {
      enabled: searchValue.length > 0
    }
  );
  console.log(issuesQuery.isError, issuesQuery);
  return (
    <div>
      <form
        onSubmit={event => {
          event.preventDefault();
          setSearchValue(event.target.elements.search.value);
        }}
      >
        <label htmlFor='search'>Search Issues</label>
        <input
          type='search'
          placeholder='Search'
          name='search'
          id='search'
          onChange={event => {
            if (event.target.value.length === 0) {
              setSearchValue('');
            }
          }}
        />
      </form>
      <h2>Issues List</h2>
      {issuesQuery.isLoading ? (
        <p>Loading...</p>
      ) : issuesQuery.isError ? (
        <p>{issuesQuery.error.message}</p>
      ) : searchQuery.fetchStatus === 'idle' &&
        searchQuery.isLoading === true ? (
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
              labels={issue.labels}
              status={issue.status}
            />
          ))}
        </ul>
      ) : (
        <>
          <h2>Search Results</h2>
          {searchQuery.isLoading ? (
            <p>Loading...</p>
          ) : (
            <>
              <p>{searchQuery.data.count} Results</p>
              <ul className='issues-list'>
                {searchQuery.data.items.map(issue => (
                  <IssueItem
                    key={issue.id}
                    title={issue.title}
                    number={issue.number}
                    assignee={issue.assignee}
                    commentCount={issue.comments.length}
                    createdBy={issue.createdBy}
                    createdDate={issue.createdDate}
                    labels={issue.labels}
                    status={issue.status}
                  />
                ))}
              </ul>
            </>
          )}
        </>
      )}
    </div>
  );
}
