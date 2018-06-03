import React, { Component } from 'react';
import { connect } from 'react-redux';
import agent from '../../agent';
import { ADD_COMMENT } from '../../constants/actionTypes';

const mapDispatchToProps = dispatch => ({
  onSubmit: payload =>
    dispatch({ type: ADD_COMMENT, payload })
});

class CommentInput extends Component {
  constructor() {
    super();
    this.state = {
      body: ''
    };
  }

  setBody(event) {
    this.setState({ body: event.target.value });
  }

  createComment(event) {
    event.preventDefault();
    const payload = agent.Comments.create(
      this.props.slug,
      { body: this.state.body }
    );

    this.setState({ body: '' });
    this.props.onSubmit(payload);
  }

  render() {
    return (
      <form className='card comment-form' onSubmit={this.createComment.bind(this)}>
        <div className='card-block'>
          <textarea
            className='form-control'
            placeholder='Write a comment...'
            rows='3'
            value={this.state.body}
            onChange={this.setBody.bind(this)}>
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
