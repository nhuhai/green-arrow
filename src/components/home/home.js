import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './home.css';

class Home extends Component {
  render() {
    return (
      <div className='home'>
        <h2>Nav</h2>
        <ul>
          <li><Link to='/items'>Items</Link></li>
          <li><Link to='/new-transaction'>New Transaction</Link></li>
        </ul>
      </div>
    );
  }
}

export default Home;
