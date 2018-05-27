import {
  REGISTER,
  ASYNC_START,
  UPDATE_FIELD_AUTH,
  LOGIN,
  REGISTER_PAGE_UNLOADED
} from '../constants/actionTypes';

const initialState = {
  username: '',
  email: '',
  password: '',
  inProgress: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_FIELD_AUTH:
      return { ...state, [action.key]: action.value };

    case ASYNC_START:
      if (action.subtype === REGISTER) {
        return { ...state, inProgress: true };
      }
      return state;

    case REGISTER:
      return {
        ...state,
        inProgress: false,
        errors: action.error ? action.payload.errors : null
      };

    case REGISTER_PAGE_UNLOADED:
      return initialState;

    default:
      return state;
  }
}
