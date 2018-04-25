import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchItems } from '../../actions/';
import './new-transaction.css';

class NewTransaction extends Component {
  constructor() {
    super();

    this.state = {
      selectedItems: []
    };
  }

  componentDidMount() {
    this.props.fetchItems();
  }

  renderItems() {
    return _.map(this.props.items, item => {
      return (
        <li className='list-group-item' key={item._id}
          onClick={this.onSelectItem.bind(this, item)} >
          {item.name}
        </li>
      );
    });
  }

  onSelectItem(item) {
    const current = this.state.selectedItems;
    const newItems = _.uniqBy(current.concat(item), item => item._id);
    this.setState({ selectedItems: newItems });
  }

  renderSelectedItems() {
    return _.map(this.state.selectedItems, item => {
      return (
        <li className='list-group-item' key={item._id}>
          {item.name}
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

        <h3>Select Items</h3>
        <ul className='list-group'>
          {this.renderItems()}
        </ul>

        <br/ >

        <h3>Selected Items</h3>
        <ul className='list-group'>
          {this.renderSelectedItems()}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { items: state.items };
}

export default connect(mapStateToProps, { fetchItems })(NewTransaction);
