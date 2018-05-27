import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ListErrors from './ListErrors';
import agent from '../agent';
import {
  LOGIN,
  LOGIN_PAGE_UNLOADED,
  UPDATE_FIELD_AUTH
} from '../constants/actionTypes';

const mapStateToProps = state => ({ ...state.auth });

const mapDispatchToProps = dispatch => ({
  onChangeEmail: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'email', value }),
  onChangePassword: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'password', value }),
  onSubmit: (email, password) =>
    dispatch({ type: LOGIN, payload: agent.Auth.login(email, password) }),
  onUnload: () =>
    dispatch({ type: LOGIN_PAGE_UNLOADED })
});

class Login extends Component {
  componentWillUnmount() {
    this.props.onUnload();
  }

  changeEmail(event) {
    this.props.onChangeEmail(event.target.value);
  }

  changePassword(event) {
    this.props.onChangePassword(event.target.value);
  }

  submitForm(event) {
    event.preventDefault();
    const { email, password } = this.props;
    this.props.onSubmit(email, password);
  }

  render() {
    return (
      <div className='auth-page'>
        <div className='container page'>
          <div className='row'>

            <div className='col-md-6 offset-md-3 col-xs-2'>
              <h1 className='text-xs-center'>Sign In</h1>
              <p className='text-xs-center'>
                <Link to='/register'>
                  Need an accounts?
                </Link>
              </p>

              <form onSubmit={this.submitForm.bind(this)}>
                <fieldset>
                  <fieldset className='form-group'>
                    <input
                      className='form-control form-control-lg'
                      type='email'
                      placeholder='Email'
                      value={this.props.email}
                      onChange={this.changeEmail.bind(this)} />
                  </fieldset>

                  <fieldset className='form-group'>
                    <input
                      className='form-control form-control-lg'
                      type='password'
                      placeholder='Password'
                      value={this.props.password}
                      onChange={this.changePassword.bind(this)} />
                  </fieldset>

                  <button
                    className='btn btn-lg btn-primary pull-xs-right'
                    type='submit'
                    disabled={this.props.inProgress}>
                    Sign in
                  </button>
                </fieldset>
              </form>

            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
