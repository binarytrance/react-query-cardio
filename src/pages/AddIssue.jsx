import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';

const addIssueHandler = async body => {
  console.log({ body });
  return await fetch('api/issues', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body)
  });
};
export default function AddIssue() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const addIssueMutation = useMutation(addIssueHandler, {
    onSuccess: async data => {
      console.log(data);
      const resolvedData = await data.json();
      // invalidate the issues list so that it has the latest added isse
      queryClient.invalidateQueries(['issues'], { exact: true });
      // prime the cache for the newly added issue so that the issue details page loads snappily
      queryClient.setQueryData(
        ['issues', resolvedData.number.toString()],
        resolvedData
      );
      // navigate to the added issue details page
      navigate(`/issue/${resolvedData.number}`);
    }
  });
  return (
    <div className='add-issue'>
      <h2>Add Issue</h2>
      <form
        onSubmit={event => {
          event.preventDefault();
          if (addIssueMutation.isLoading) return;
          addIssueMutation.mutate({
            title: event.target.title.value,
            comment: event.target.comment.value
          });
        }}
      >
        <div>
          <label htmlFor='title'>Title</label>
          <input
            id='title'
            type='text'
            name='title'
            placeholder='Title'
          ></input>
        </div>
        <div>
          <label htmlFor='comment'>Comment</label>
          <textarea
            id='comment'
            placeholder='Comment'
            name='comment'
          ></textarea>
        </div>
        <button type='submit' disable={addIssueMutation.isLoading}>
          {addIssueMutation.isLoading
            ? 'Adding Issue...'
            : 'Add Issue'}
        </button>
      </form>
    </div>
  );
}
