import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import auth from './reducers/auth';
import common from './reducers/common';
import home from './reducers/home';
import article from './reducers/article';
import articleList from './reducers/articleList';
import settings from './reducers/settings';
import profile from './reducers/profile';
import editor from './reducers/editor';

export default combineReducers({
  auth,
  article,
  articleList,
  common,
  home,
  settings,
  profile,
  editor,
  router: routerReducer
});
