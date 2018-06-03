import React from 'react';
import { Link } from 'react-router-dom';
import CommentInput from './CommentInput';
import CommentList from './CommentList';

const CommentContainer = props => {
  if (props.currentUser) {
    return (
      <div className='col-xs-12 col-md-8 offset-md-2'>
        <list-errors errors={props.errors}></list-errors>
        <CommentInput slug={props.slug} currentUser={props.currentUser} />

        <CommentList
          comments={props.comments}
          slug={props.slug}
          currentUser={props.currentUser} />
      </div>
    );
  }

  return (
    <div className='col-xs-12 col-md-8 offset-md-2'>
      <p>
        <Link to='/login'>Sign In</Link>
        &nbsp;or&nbsp;
        <Link to='/register'>Sign Up</Link>
        &nbsp;to add comments on this article.
      </p>

      <CommentList
        comments={props.comments}
        slug={props.slug}
        currentUser={props.currentUser} />
    </div>
  );
};

export default CommentContainer;
