import React, { Component } from 'react';
import agent from '../../agent';

class Tags extends Component {
  onClickTag(event, tag) {
    event.preventDefault();
    this.props.onClickTag(
      tag,
      page => agent.Articles.byTag(tag, page),
      agent.Articles.byTag(tag)
    );
  }

  render() {
    if (!this.props.tags) {
      return <div>Loading Tags...</div>;
    }

    return (
      <div className='tag-list'>
        {
          this.props.tags.map(tag =>
            <a href=''
              className='tag-default tag-pill'
              key={tag}
              onClick={event => this.onClickTag(event, tag)}>
              {tag}
            </a>
          )
        }
      </div>
    );
  }
};

export default Tags;
