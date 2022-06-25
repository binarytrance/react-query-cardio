import { Link } from 'react-router-dom';
import {
  GoIssueOpened,
  GoIssueClosed,
  GoComment
} from 'react-icons/go';
import { relativeDate } from '../helpers/relativeDate';
import { useUserData } from '../hooks/useUserData';
import { Label } from './Label';

export const IssueItem = ({
  title,
  number,
  assignee,
  commentCount,
  createdBy,
  createdDate,
  status,
  labels
}) => {
  const assigneeUser = useUserData(assignee);
  const createdByUser = useUserData(createdBy);
  if (assigneeUser.isError) {
    return <p>{assigneeUser.error.message}</p>;
  }
  if (createdByUser.isError) {
    return <p>{createdByUser.error.message}</p>;
  }
  return (
    <li>
      <div>
        {status === 'done' || status === 'cancelled' ? (
          <GoIssueClosed style={{ color: 'red' }} />
        ) : (
          <GoIssueOpened style={{ color: 'green' }} />
        )}
      </div>
      <div className='issue-content'>
        <span>
          <Link to={`/issue/${number}`}>{title}</Link>
          {labels.map(label => (
            <Label label={label} key={label} />
          ))}
        </span>
        <small>
          #{number} opened {relativeDate(createdDate)}{' '}
          {createdByUser.isSuccess
            ? `by ${createdByUser.data.name}`
            : ''}
        </small>
      </div>
      {assignee ? (
        <img
          src={
            assigneeUser.isSuccess
              ? assigneeUser.data.profilePictureUrl
              : ''
          }
          className='assigned-to'
          alt={`Assigned to ${
            assigneeUser.isSuccess ? assigneeUser.data.name : 'avatar'
          }`}
        />
      ) : null}
      <span className='comment-count'>
        {commentCount > 0 ? (
          <>
            <GoComment />
            {commentCount}
          </>
        ) : null}
      </span>
    </li>
  );
};
