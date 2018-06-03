import React from 'react';
import { Link } from 'react-router-dom';
import CommentInput from './CommentInput';

const CommentContainer = props => {
  if (props.currentUser) {
    return (
      <div className='col-xs-12 col-md-8 offset-md-2'>
        <list-errors errors={props.errors}></list-errors>
        <CommentInput slug={props.slug} currentUser={props.currentUser} />
      </div>
    );
  }
};

export default CommentContainer;
