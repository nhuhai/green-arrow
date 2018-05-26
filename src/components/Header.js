import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const LoggedOutView = props => {
  if (!props.currentuser) {
    return (
      <ul className='nav navbar-nav pull-xs-right'>
        <li className='nav-item'>
          <Link to='/' className='nav-link'>
            Home
          </Link>
        </li>

        <li className='nav-item'>
          <Link to='/login' className='nav-link'>
            Sign in
          </Link>
        </li>

        <li className='nav-item'>
          <Link to='/register' className='nav-link'>
            Sign up
          </Link>
        </li>
      </ul>
    );
  }

  return null;
};

class Header extends Component {
  render() {
    return (
      <nav className='navbar navbar-light'>
        <div className='container'>
          <Link to='/' className='navbar-brand'>
            {this.props.appName.toLowerCase()}
          </Link>

          <LoggedOutView currentUser={this.props.currentuser} />
        </div>
      </nav>
    );
  }
}

export default Header;
