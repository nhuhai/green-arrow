import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { APP_LOAD } from '../constants/actionTypes';
import Header from './Header';
import Login from './Login';
import Register from './Register';

const mapStateToProps = state => {
  return {
    appName: state.common.appName,
    appLoaded: state.common.appLoaded,
    currentUser: state.common.currentUser
  };
};

const mapDispatchToProps = dispatch => ({
  onLoad: (payload, token) =>
    dispatch({ type: APP_LOAD, payload, token, skipTracking: true })
});

class App extends Component {
  componentWillMount() {
    this.props.onLoad(null, null);
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
