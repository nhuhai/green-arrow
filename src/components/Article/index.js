import React, { Component } from 'react';
import { connect } from 'react-redux';
import marked from 'marked';
import CommentContainer from './CommentContainer';
import agent from '../../agent';
import {
  ARTICLE_PAGE_LOADED,
  ARTICLE_PAGE_UNLOADED
} from '../../constants/actionTypes';
import ArticleMeta from './ArticleMeta';

const mapStateToProps = state => ({
  ...state.article,
  currentUser: state.common.currentUser
});

const mapDispatchToProps = dispatch => ({
  onLoad: payload =>
    dispatch({ type: ARTICLE_PAGE_LOADED, payload }),
  onUnload: () =>
    dispatch({ type: ARTICLE_PAGE_UNLOADED })
});

class Article extends Component {
  componentWillMount() {
    this.props.onLoad(Promise.all([
      agent.Articles.get(this.props.match.params.id),
      agent.Comments.forArticle(this.props.match.params.id)
    ]));
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    if (!this.props.article) {
      return null;
    }

    const { article, currentUser} = this.props;
    const { body, title, tagList, description, author } = article;

    const markup = { __html: marked(body, { sanitize: true })};
    const canModify = currentUser && currentUser.username === author.username;

    return (
      <div className='article-page'>
        <div className='banner'>
          <div className='container'>

            <h1>{title}</h1>
            <ArticleMeta
              article={article}
              canModify={canModify} />

          </div>
        </div>

        <div className='container page'>
          <div className='col-xs-12'>
            <div dangerouslySetInnerHTML={markup}></div>

            <ul className='tag-list'>
              {
                this.props.article.tagList.map(tag => {
                  return (
                    <li
                      className='tag-default tag-pill tag-outline'
                      key={tag}>
                      {tag}
                    </li>
                  );
                })
              }
            </ul>
          </div>

          <hr />

          <div className='row'>
            <CommentContainer
              currentUser={currentUser} />
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Article);
