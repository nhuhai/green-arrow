import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchItem, deleteItem } from "../../actions/index";

class ItemDetail extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchItem(id);
  }

  onDeleteClick() {
    const { id } = this.props.match.params;

    this.props.deleteItem(id, () => {
      this.props.history.push('/items');
    });
  }

  render() {
    const { item } = this.props;

    if (!item) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <Link to='/items'>Back To list of items</Link>
        <button
          className="btn btn-danger pull-xs-right"
          onClick={this.onDeleteClick.bind(this)}
        >
          Delete Item
        </button>
        <h3>{item.name}</h3>
      </div>
    );
  }
}

function mapStateToProps({ items }, ownProps) {
  return {
    item: items[ownProps.match.params.id]
  };
}

export default connect(mapStateToProps, { fetchItem, deleteItem })(ItemDetail);
