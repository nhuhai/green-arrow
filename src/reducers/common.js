import {
  APP_LOAD,
  REGISTER,
  REGISTER_PAGE_UNLOADED,
  NULLIFY_REDIRECT
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

    case REGISTER:
      return {
        ...state,
        redirectTo: action.error ? null : '/',
        token: action.error ? null : action.payload.user.token,
        currentUser: action.error ? null : action.payload.user
      };

    case REGISTER_PAGE_UNLOADED:
      return { ...state, viewChangeCounter: state.viewChangeCounter + 1 };

    default:
      return state;
  }
};
