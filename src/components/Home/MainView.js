import React, { Component } from 'react';
import { connect } from 'react-redux';
import agent from '../../agent';
import ArticleList from '../ArticleList';
import {
  CHANGE_TAB
} from '../../constants/actionTypes';

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
    <li className='nav-item'>
      <a href='' className='nav-link active'>
        <i className='ion-pound'></i> {props.tag}
      </a>
    </li>
  );
};

const mapStateToProps = state => ({
  ...state.articleList,
  tags: state.home.tags,
  token: state.common.token
});

const mapDispatchToProps = dispatch => ({
  onTabClick: (tab, pager, payload) => dispatch({ type: CHANGE_TAB, tab, pager, payload })
});

const MainView = props => {
  return (
    <div className='col-md-9'>
      <div className='feed-toggle'>
        <ul className='nav nav-pills outline-active'>
          <GlobalFeedTab tab={props.tab} onTabClick={props.onTabClick} />

          <TagFilterTab tag={props.tag} />
        </ul>

        <ArticleList
          pager={props.pager}
          articles={props.articles}
          articlesCount={props.articlesCount}
          currentPage={props.currentPage}
          loading={props.loading} />
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(MainView);
