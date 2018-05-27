import React, { Component } from 'react';

class ListErrors extends Component {
  render() {
    const errors = this.props.errors;

    if (!errors) {
      return null;
    }

    return (
      <ul className='error-messages'>
        {
          Object.keys(errors).map(key => {
            return (
              <li key={key}>
                {key} {errors[key]}
              </li>
            )
          })
        }
      </ul>
    );
  }
}

export default ListErrors;
