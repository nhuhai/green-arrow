import React, { Component } from 'react';
import { connect } from 'react-redux';
import agent from '../../agent';
import ArticleList from '../ArticleList';
import {
  CHANGE_TAB
} from '../../constants/actionTypes';

const YourFeedTab = props => {
  if (!props.token) {
    return null;
  }

  const clickHandler = event => {
    event.preventDefault();
    props.onTabClick(
      'feed',
      agent.Articles.byAuthor,
      agent.Articles.byAuthor(props.currentUser.username, 0)
    );
  };

  return (
    <li className='nav-item'>
      <a href=''
        className={props.tab === 'feed' ? 'nav-link active' : 'nav-link'}
        onClick={clickHandler}>
        Your Feed
      </a>
    </li>
  );
};

class GlobalFeedTab extends Component {
  onTabClick(event) {
    event.preventDefault();
    this.props.onTabClick('all', agent.Articles.all, agent.Articles.all());
  }

  render() {
    return (
      <li className='nav-item'>
        <a
          href=''
          className={this.props.tab === 'all' ? 'nav-link active' : 'nav-link'}
          onClick={this.onTabClick.bind(this)}>
          Global Feed
        </a>
      </li>
    );
  }
}

const TagFilterTab = props => {
  if (!props.tag) {
    return null;
  }

  return (
    <li className='nav-item' onClick={e => e.preventDefault()}>
      <a href='' className='nav-link active'>
        <i className='ion-pound'></i> {props.tag}
      </a>
    </li>
  );
};

const mapStateToProps = state => ({
  ...state.articleList,
  tags: state.home.tags,
  token: state.common.token,
  currentUser: state.common.currentUser
});

const mapDispatchToProps = dispatch => ({
  onTabClick: (tab, pager, payload) => dispatch({ type: CHANGE_TAB, tab, pager, payload })
});

const MainView = props => {
  return (
    <div className='col-md-9'>
      <div className='feed-toggle'>
        <ul className='nav nav-pills outline-active'>
          <YourFeedTab
            token={props.token}
            tab={props.tab}
            currentUser={props.currentUser}
            onTabClick={props.onTabClick} />

          <GlobalFeedTab tab={props.tab} onTabClick={props.onTabClick} />

          <TagFilterTab tag={props.tag} />
        </ul>

        <ArticleList
          pager={props.pager}
          articles={props.articles}
          articlesCount={props.articlesCount}
          currentPage={props.currentPage} />
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(MainView);
