import React, { Component } from 'react';
import { connect } from 'react-redux';
import agent from '../../agent';
import { ADD_COMMENT } from '../../constants/actionTypes';

const mapDispatchToProps = dispatch => ({
  onSubmit: payload =>
    dispatch({ type: ADD_COMMENT, payload })
});

class CommentInput extends Component {
  render() {
    return (
      <form className='card comment-form'>
        <div className='card-block'>
          <textarea
            className='form-control'
            placeholder='Write a comment...'
            rows='3'>
          </textarea>
          <div className='card-footer'>
            <img
              src={this.props.currentUser.image}
              className='comment-author-img'
              alt={this.props.currentUser.currentUser} />

            <button
              className='btn btn-sm btn-primary'
              type='submit'>
              Post Comment
            </button>
          </div>
        </div>
      </form>
    )
  }
}

export default connect(() => ({}), mapDispatchToProps)(CommentInput);
