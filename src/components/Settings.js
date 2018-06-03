import React, { Component } from 'react';
import { connect } from 'react-redux';
import agent from '../agent';
import ListErrors from './ListErrors';
import {
  LOGOUT,
  SETTINGS_SAVED,
  SETTINGS_PAGE_UNLOADED,
} from '../constants/actionTypes';

class SettingsForm extends Component {
  constructor() {
    super();

    this.state = {
      image: '',
      username: '',
      bio: '',
      email: '',
      password: ''
    };
  }

  updateState(field) {
    return (event) => {
      const state = this.state;
      const newState = Object.assign({}, state, { [field]: event.target.value });

      this.setState(newState);
    };
  }

  submitForm(event) {
    event.preventDefault();

    const user = Object.assign({}, this.state);
    if (!user.password) {
      delete user.password
    }

    this.props.onSubmitForm(user);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentUser) {
      const { image, username, bio, email} = nextProps.currentUser;

      this.setState(Object.assign({}, this.state, {
        image, username, bio, email
      }));
    }
  }

  componentWillMount() {
    if (this.props.currentUser) {
      const { image, username, bio, email } = this.props.currentUser;

      this.setState(Object.assign({}, this.state, {
        image, username, bio, email
      }));
    }
  }

  render() {
    return (
      <form onSubmit={this.submitForm.bind(this)}>
        <fieldset>
          <fieldset className='form-group'>
            <input
              className='form-control'
              type='text'
              placeholder='URL of profile picture'
              value={this.state.image || ''}
              onChange={this.updateState('image')} />
          </fieldset>

          <fieldset className='form-group'>
            <input
              className='form-control form-control-lg'
              type='text'
              placeholder='Username'
              value={this.state.username || ''}
              onChange={this.updateState('username')} />
          </fieldset>

          <fieldset className='form-group'>
            <textarea
              className='form-control form-control-lg'
              rows='8'
              placeholder='Short bio about you'
              value={this.state.bio || ''}
              onChange={this.updateState('bio')}>
            </textarea>
          </fieldset>

          <fieldset className='form-group'>
            <input
              className='form-control form-control-lg'
              type='email'
              placeholder='New Password'
              value={this.state.email || ''}
              onChange={this.updateState('email')} />
          </fieldset>

          <fieldset className='form-group'>
            <input
              className='form-control form-control-lg'
              type='password'
              placeholder='New Password'
              value={this.state.password}
              onChange={this.updateState('password')} />
          </fieldset>

          <button
            className='btn btn-lg btn-primary pull-xs-right'
            type='submit'
            disabled={this.state.inProgress}>
            Update Settings
          </button>

        </fieldset>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  ...state.settings,
  currentUser: state.common.currentUser
});

const mapDispatchToProps = dispatch => ({
  onSubmitForm: user =>
    dispatch({ type: SETTINGS_SAVED, payload: agent.Auth.save(user) }),
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

              <ListErrors errors={this.props.errors}></ListErrors>

              <SettingsForm
                currentUser={this.props.currentUser}
                onSubmitForm={this.props.onSubmitForm} />

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
