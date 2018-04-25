import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchItems } from '../../actions/';

class ItemsIndex extends Component {
  componentDidMount() {
    this.props.fetchItems();
  }

  renderItems() {
    return _.map(this.props.items, item => {
      return (
        <li className='list-group-item' key={item._id}>
          <Link to={`/items/${item._id}`}>
            {item.name}
          </Link>
        </li>
      );
    });
  }

  render() {
    return (
      <div>
        <div className='text-xs-right'>
          <Link className='btn btn-primary' to='/items/new'>
            Add an item
          </Link>
        </div>

        <h3>Items</h3>

        <ul className='list-group'>
          {this.renderItems()}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { items: state.items };
}

export default connect(mapStateToProps, { fetchItems })(ItemsIndex);
