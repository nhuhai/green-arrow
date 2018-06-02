import {
  APP_LOAD,
  REGISTER,
  REGISTER_PAGE_UNLOADED,
  NULLIFY_REDIRECT,
  LOGOUT,
  LOGIN,
  LOGIN_PAGE_UNLOADED,
  SETTINGS_PAGE_UNLOADED,
  HOME_PAGE_UNLOADED,
  ARTICLE_SUBMITTED,
  DELETE_ARTICLE
} from "../constants/actionTypes";

const defaultState = {
  appName: 'Conduit',
  appLoaded: false,
  currentUser: null,
  redirectTo: null,
  token: null,
  viewChangeCounter: 0
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case APP_LOAD:
      return {
        ...state,
        appLoaded: true,
        token: action.token || null,
        currentUser: action.payload ? action.payload.user : null
      };

    case NULLIFY_REDIRECT:
      return { ...state, redirectTo: null };

    case LOGIN:
    case REGISTER:
      return {
        ...state,
        redirectTo: action.error ? null : '/',
        token: action.error ? null : action.payload.user.token,
        currentUser: action.error ? null : action.payload.user
      };

    case LOGOUT:
      return { ...state, redirectTo: '/', token: null, currentUser: null};

    case ARTICLE_SUBMITTED:
      const redirectUrl = `/article/${action.payload.article.slug}`;
      return { ...state, redirectTo: redirectUrl };

    case DELETE_ARTICLE:
      return { ...state, redirectTo: '/' };

    case LOGIN_PAGE_UNLOADED:
    case SETTINGS_PAGE_UNLOADED:
    case REGISTER_PAGE_UNLOADED:
    case HOME_PAGE_UNLOADED:
      return { ...state, viewChangeCounter: state.viewChangeCounter + 1 };

    default:
      return state;
  }
};
