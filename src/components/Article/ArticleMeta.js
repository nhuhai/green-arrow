import React from 'react';
import { Link } from 'react-router-dom';
import ArticleActions from './ArticleActions';

const ArticleMeta = props => {
  const { article, canModify } = props;
  const {
    author: { username, image },
    createdAt
  } = article;

  return (
    <div className='article-meta'>
      <Link to={`/@${username}`}>
        <img src={image} alt={username} />
      </Link>

      <div className='info'>
        <Link to={`/@${username}`} className='author'>{username}</Link>
        <span className='date'>{new Date(createdAt).toDateString()}</span>
      </div>

      <ArticleActions canModify={canModify} article={article} />
    </div>
  );
};

export default ArticleMeta;
