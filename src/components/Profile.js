import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import agent from '../agent';
import ArticleList from './ArticleList';
import {
  PROFILE_PAGE_LOADED,
  PROFILE_PAGE_UNLOADED,
  FOLLOW_USER,
  UNFOLLOW_USER
} from '../constants/actionTypes';

const Promise = global.Promise;

const EditProfileSettings = props => {
  if (!props.isCurrentUser) {
    return null;
  }

  return (
    <Link
      to="/settings"
      className='btn btn-sm btn-outline-secondary action-btn'>
      <i className='ion-gear-a'></i> Edit Profile Settings
    </Link>
  );
};

const FollowUserButton = props => {
  if (props.isCurrentUser) {
    return null;
  }

  const { user: { following, username }} = props;
  let classes = 'btn btn-sm action-btn';

  if (following) {
    classes += ' btn-secondary';
  } else {
    classes += ' btn-outline-secondary';
  }

  const handleClick = event => {
    event.preventDefault();

    if (following) {
      props.unfollow(username);
    } else {
      props.follow(username);
    }
  };

  return (
    <button
      className={classes}
      onClick={handleClick}>
      <i className={following ? 'ion-checkmark' : 'ion-plus-round'}></i>
      &nbsp;{following ? 'Unfollow' : 'Follow'} {username}
    </button>
  );
};

const mapStateToProps = state => ({
  ...state.articleList,
  currentUser: state.common.currentUser,
  profile: state.profile
});

const mapDispatchToProps = dispatch => ({
  onLoad: payload =>
    dispatch({ type: PROFILE_PAGE_LOADED, payload }),
  onUnload: () =>
    dispatch({ type: PROFILE_PAGE_UNLOADED }),
  onFollow: username =>
    dispatch({ type: FOLLOW_USER, payload: agent.Profile.follow(username) }),
  onUnfollow: username =>
    dispatch({ type: UNFOLLOW_USER, payload: agent.Profile.unfollow(username) })
});

class Profile extends Component {
  componentWillMount() {
    const username = this.props.match.params.username;

    this.props.onLoad(Promise.all([
      agent.Profile.get(username),
      agent.Articles.byAuthor(username)
    ]));
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  renderTabs() {
    const username = this.props.profile.username;

    return (
      <ul className='nav nav-pills outline-active'>
        <li className='nav-item'>
          <Link
            className='nav-link active'
            to={`/@${username}`}>
            My Articles
          </Link>
        </li>

        <li className='nav-item'>
          <Link
            className='nav-link'
            to={`/@${username}/favorites`}>
            Favorited Articles
          </Link>
        </li>
      </ul>
    );
  }

  render() {
    const { profile, pager, articles, articlesCount, currentPage } = this.props;
    const currentUser = this.props.currentUser;
    const { image, username, bio } = profile;

    if (!profile) {
      return null;
    }

    const isCurrentUser = currentUser && currentUser.username === profile.username;

    return (
      <div className='profile-page'>

        <div className='user-info'>
          <div className='container'>
            <div className='row'>
              <div className='col-xs-12 col-md-10 offset-md-1'>

                <img src={image} className='user-img' alt={username} />
                <h4>{username}</h4>
                <p>{bio}</p>

                <EditProfileSettings isCurrentUser={isCurrentUser} />

                <FollowUserButton
                  isCurrentUser={isCurrentUser}
                  user={profile}
                  follow={this.props.onFollow}
                  unfollow={this.props.onUnfollow} />

              </div>
            </div>
          </div>
        </div>

        <div className='container'>
          <div className='row'>
            <div className='col-xs-12 col-md-10 offset-md-1'>

              <div className='articles-toggle'>
                {this.renderTabs()}
              </div>

              <ArticleList
                pager={pager}
                articles={articles}
                articlesCount={articlesCount}
                currentPage={currentPage} />

            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
