import React, { Component } from 'react';
import { connect } from 'react-redux';
import agent from '../agent';
import {
  LOGOUT,
  SETTINGS_SAVED,
  SETTINGS_PAGE_UNLOADED,
} from '../constants/actionTypes';

const mapStateToProps = state => ({
  ...state.settings,
  currentUser: state.common.currentUser
});

const mapDispatchToProps = dispatch => ({
  onClickLogout: () => dispatch({ type: LOGOUT }),
  onUnload: () => dispatch({ type: SETTINGS_PAGE_UNLOADED })
});

class Settings extends Component {
  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    return (
      <div className='settings-page'>
        <div className='container page'>
          <div className='row'>
            <div className='col-md-6 offset-md-3 col-xs-12'>

              <h1 className='text-xs-center'>Your Settings</h1>

              <hr />

              <button
                className='btn btn-outline-danger'
                onClick={this.props.onClickLogout}>
                Or click here to logout.
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);