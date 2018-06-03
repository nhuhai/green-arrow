import React from 'react';
import { Link } from 'react-router-dom';
import DeleteButton from './DeleteButton';

const Comment = props => {
  const comment = props.comment;
  const { body, author: { username, image }, createdAt, id } = comment;
  const show = props.currentUser && props.currentUser.username === username;

  return (
    <div className='card'>
      <div className='card-block'>
        <p className='card-text'>{body}></p>
      </div>

      <div className='card-footer'>
        <Link
          to={`/@${username}`}
          className='comment-author'>
          <img src={image} className='comment-author-img' alt={username} />
        </Link>
        &nbsp;
        <Link
          to={`/@${username}`}
          className='comment-author'>
          {username}
        </Link>
        <span className='date-posted'>
          {new Date(createdAt).toDateString()}
        </span>
        <DeleteButton show={show} slug={props.slug} comment={id} />
      </div>
    </div>
  );
};

export default Comment;
