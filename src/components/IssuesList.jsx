import { useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import fetchWithError from '../helpers/fetchWithError';
import { IssueItem } from './IssueItem';
import Loader from './Loader';

export default function IssuesList({ activeLabels, status }) {
  const queryClient = useQueryClient();
  const issuesQuery = useQuery(
    ['issues', { activeLabels, status }],
    async ({ signal }) => {
      const statusString = `&status=${status}`;
      const labelsString = activeLabels
        .map(label => `labels[]=${label}`)
        .join('&'); // turn into query string
      const issues = await fetchWithError(
        `/api/issues?${labelsString}${statusString}`,
        { signal }
      );
      issues &&
        issues.forEach(issue => {
          queryClient.setQueryData(
            // prime the cache for issue details with data from issue list
            ['issues', issue.number.toString()],
            issue
          );
        });
      return issues;
    },
    {
      staleTime: 1000 * 60
    }
  );
  const [searchValue, setSearchValue] = useState('');

  const searchQuery = useQuery(
    ['issues', 'search', searchValue],
    ({ signal }) => {
      console.log(searchValue);
      return fetchWithError(`/api/search/issues?q=${searchValue}`, {
        signal
      }).then(res => res.json());
    },
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
      <h2>
        Issues List {issuesQuery.isFetching ? <Loader /> : null}
      </h2>
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
