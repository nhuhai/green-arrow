import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import agent from '../agent';
import {
  ARTICLE_FAVORITED,
  ARTICLE_UNFAVORITED
} from '../constants/actionTypes';

const FAVORITED_CLASS = 'btn btn-sm btn-primary';
const NOT_FAVORITED_CLASS = 'btn btn-sm btn-outline-primary';

const mapStateToProps = state => ({
  currentUser: state.common.currentUser
});

const mapDispatchToProps = dispatch => ({
  favorite: slug =>
    dispatch({ type: ARTICLE_FAVORITED, payload: agent.Articles.favorite(slug) }),
  unfavorite: slug =>
    dispatch({ type: ARTICLE_UNFAVORITED, payload: agent.Articles.unfavorite(slug) })
});

class ArticlePreview extends Component {
  handleClick(event) {
    event.preventDefault();

    const article = this.props.article;

    if (article.favorited) {
      this.props.unfavorite(article.slug);
    } else {
      this.props.favorite(article.slug);
    }
  }

  render() {
    const article = this.props.article;
    const {
      author,
      createdAt,
      favoritesCount,
      slug,
      title,
      description,
      tagList
    } = article;

    const favoriteButtonClass = article.favorited ?
      FAVORITED_CLASS : NOT_FAVORITED_CLASS;

    return (
      <div className='article-preview'>
        <div className='article-meta'>
          <Link to={`/@${author.username}`}>
            <img src={author.image} alt={author.username} />
          </Link>

          <div className='info'>
            <Link className='author' to={`/@${author.username}`}>
              {author.username}
            </Link>
            <span className='date'>
              {new Date(createdAt).toDateString()}
            </span>
          </div>

          {
            this.props.currentUser ? (
              <div className='pull-xs-right'>
                <button className={favoriteButtonClass} onClick={this.handleClick.bind(this)}>
                  <i className='ion-heart'></i> {favoritesCount}
                </button>
              </div>
            ) : null
          }

        </div>

        <Link to={`/article/${slug}`} className='preview-link'>
          <h1>{title}</h1>
          <p>{description}</p>
          <span>Read more...</span>
          <ul className='tag-list'>
            {
              tagList.map(tag => {
                return (
                  <li className='tag-default tag-pill tag-outline' key={tag}>
                    {tag}
                  </li>
                )
              })
            }
          </ul>
        </Link>
      </div>
    );
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticlePreview);
