import React, { Component } from 'react';
import { connect } from 'react-redux';
import { APP_LOAD } from '../constants/actionTypes';
import Header from './Header';

const mapStateToProps = state => {
  return {
    appName: state.common.appName,
    appLoaded: state.common.appLoaded
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLoad: (payload, token) =>
      dispatch({ type: APP_LOAD, payload, token, skipTracking: true })
  };
};

class App extends Component {
  componentWillMount() {
    // this.props.onLoad(null, null);
  }

  render() {
    return (
      <div>
        <Header appName={this.props.appName} />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
