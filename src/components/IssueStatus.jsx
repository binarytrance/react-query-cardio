import React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { StatusSelect } from '../pages/StatusSelect';

const Issuestatus = ({ status, issueNumber }) => {
  const queryClient = useQueryClient();
  const setStatus = useMutation(
    newStatus => {
      fetch(`/api/issues/${issueNumber}`, {
        method: 'PUT',
        headers: {
          'content-type': 'application/json'
        },

        body: JSON.stringify({ status: newStatus })
      }).then(res => res.json());
    },
    {
      onMutate: newStatus => {
        // get initial cache data
        const oldStatus = queryClient.getQueryData([
          'issues',
          issueNumber
        ]).status;
        console.log(oldStatus);

        queryClient.setQueryData(['issues', issueNumber], data => {
          return { ...data, status: newStatus };
        });

        return () => {
          // rollback changes
          console.log('rollback', oldStatus);

          queryClient.setQueryData(
            ['issues', issueNumber],
            oldData => ({ ...oldData, status: oldStatus })
          );
        };
      },
      onError: (error, variables, restoreCache) => {
        restoreCache();
      },
      onSettled: () => {
        queryClient.invalidateQueries(['issues', issueNumber], {
          exact: true
        });
      }
    }
  );
  return (
    <div className='issue-options'>
      <div>
        <span> Status</span>
        <StatusSelect
          noEmptyOption
          status={status}
          onChange={event => {
            console.log(event.target.value);
            setStatus.mutate(event.target.value);
          }}
        />
      </div>
    </div>
  );
};

export default Issuestatus;
