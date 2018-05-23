import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import auth from './reducers/auth';
import common from './reducers/common';

export default combineReducers({
  auth,
  common,
  router: routerReducer
});

// // import article from './reducers/article';
// // import articleList from './reducers/articleList';
// import auth from './reducers/auth';
// import { combineReducers } from 'redux';
// import common from './reducers/common';
// // import editor from './reducers/editor';
// // import home from './reducers/home';
// // import profile from './reducers/profile';
// // import settings from './reducers/settings';
// import { routerReducer } from 'react-router-redux';

// export default combineReducers({
//   auth,
//   common,
//   router: routerReducer
// });
