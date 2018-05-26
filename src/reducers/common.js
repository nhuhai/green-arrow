import { APP_LOAD } from "../constants/actionTypes";

const defaultState = {
  appName: 'Conduit',
  appLoaded: false,
  currentUser: null,
  token: null,
  viewChangeCounter: 0
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case APP_LOAD:
      return {
        ...state,
        appLoaded: true
      };

    default:
      return state;
  }
};
