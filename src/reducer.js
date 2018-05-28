import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import auth from './reducers/auth';
import common from './reducers/common';
import home from './reducers/home';
import article from './reducers/article';
import articleList from './reducers/articleList';
import settings from './reducers/settings';

export default combineReducers({
  auth,
  article,
  articleList,
  common,
  home,
  settings,
  router: routerReducer
});
