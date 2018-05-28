import React, { Component } from 'react';
import { connect } from 'react-redux';
import agent from '../../agent';
import Banner from './Banner';
import {
  HOME_PAGE_LOADED,
  HOME_PAGE_UNLOADED
} from '../../constants/actionTypes';

const Promise = global.Promise;

const mapStateToProps = state => ({
  ...state.home,
  appName: state.common.appName,
  token: state.common.token
});

const mapDispatchToProps = dispatch => ({
  onLoad: (tab, pager, payload) =>
    dispatch({ type: HOME_PAGE_LOADED, tab, pager, payload }),
  onUnload: () =>
    dispatch({ type: HOME_PAGE_UNLOADED })
});

class Home extends Component {
  componentWillMount() {
    const tab = this.props.token ? 'feed' : 'all';
    const { Articles: { feed, all } , Tags } = agent;
    const articlesPromise = this.props.token ? feed : all;

    this.props.onLoad(tab, articlesPromise, Promise.all([Tags.getAll(), articlesPromise()]));
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    return (
      <div className='home-page'>
        <Banner token={this.props.token} appName={this.props.appName} />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
