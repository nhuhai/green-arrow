import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { DELETE_ARTICLE } from '../../constants/actionTypes';
import agent from '../../agent';

const mapDispatchToProps = dispatch => ({
  onClickDelete: payload =>
    dispatch({ type: DELETE_ARTICLE, payload })
});

const ArticleActions = props => {
  const { article, canModify } = props;
  const del = () => {

  };

  if (!canModify) {
    return null;
  }

  return (
    <span>
      <Link
        to={`/editor/${article.slug}`}
        className='btn btn-outline-secondary btn-sm'>
        <i className='ion-edit'></i> Edit Article
      </Link>
    </span>
  );
};

export default connect(() => ({}), mapDispatchToProps)(ArticleActions);
