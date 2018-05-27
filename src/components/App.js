import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { push } from 'react-router-redux';
import { APP_LOAD, NULLIFY_REDIRECT } from '../constants/actionTypes';
import Header from './Header';
import Login from './Login';
import Register from './Register';
import { store } from '../store';
import agent from '../agent';

const mapStateToProps = state => {
  const { appName, appLoaded, currentUser, redirectTo } = state.common;

  return {
    appName,
    appLoaded,
    currentUser,
    redirectTo
  };
};

const mapDispatchToProps = dispatch => ({
  onLoad: (payload, token) =>
    dispatch({ type: APP_LOAD, payload, token, skipTracking: true }),
  nullifyRedirect: () =>
    dispatch({ type: NULLIFY_REDIRECT })
});

class App extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.redirectTo) {
      store.dispatch(push(nextProps.redirectTo));
      this.props.nullifyRedirect();
    }
  }

  componentWillMount() {
    const token = window.localStorage.getItem('jwt');
    if (token) {
      agent.setToken(token);
    }

    this.props.onLoad(token ? agent.Auth.current() : null, token);
  }

  render() {
    if (this.props.appLoaded) {
      return (
        <div>
          <Header
            appName={this.props.appName}
            currentUser={this.props.currentUser} />

          <Switch>
            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />
          </Switch>
        </div>
      );
    }

    return (
      <div>
        <Header
        appName={this.props.appName}
        currentUser={this.props.currentUser} />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
