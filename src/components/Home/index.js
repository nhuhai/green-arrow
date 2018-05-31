import React, { Component } from 'react';
import { connect } from 'react-redux';
import agent from '../../agent';
import Banner from './Banner';
import MainView from './MainView';
import Tags from './Tags';
import {
  HOME_PAGE_LOADED,
  HOME_PAGE_UNLOADED,
  APPLY_TAG_FILTER
} from '../../constants/actionTypes';

const Promise = global.Promise;

const mapStateToProps = state => ({
  ...state.home,
  appName: state.common.appName,
  token: state.common.token,
  currentUser: state.common.currentUser
});

const mapDispatchToProps = dispatch => ({
  onLoad: (tab, pager, payload) =>
    dispatch({ type: HOME_PAGE_LOADED, tab, pager, payload }),
  onUnload: () =>
    dispatch({ type: HOME_PAGE_UNLOADED }),
  onClickTag: (tag, pager, payload) =>
    dispatch({ type: APPLY_TAG_FILTER, tag, pager, payload })
});

class Home extends Component {
  componentWillMount() {
    const tab = this.props.token ? 'feed' : 'all';
    const { Articles: { feed, all } , Tags } = agent;
    const articlesPromise = this.props.token ? feed : all;
    const username = this.props.currentUser ? this.props.currentUser.username : '';

    this.props.onLoad(
      tab,
      articlesPromise,
      Promise.all([Tags.getAll(), articlesPromise(username)])
    );
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    return (
      <div className='home-page'>
        <Banner token={this.props.token} appName={this.props.appName} />

        <div className='container page'>
          <div className='row'>
            <MainView />

            <div className='col-md-3'>
              <div className='sidebar'>
                <p>Popular Tags</p>

                <Tags
                  tags={this.props.tags}
                  onClickTag={this.props.onClickTag} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
