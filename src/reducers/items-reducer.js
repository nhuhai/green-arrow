import _ from 'lodash';
import { FETCH_ITEMS, FETCH_ITEM, DELETE_ITEM } from '../actions';

export default function (state = {}, action) {
  switch (action.type) {
    case FETCH_ITEMS:
      if (action.error) {
        return state;
      }
      return _.mapKeys(action.payload.data.items, '_id');

    case DELETE_ITEM:
      if (action.error) {
        return state;
      }
      return _.omit(state, action.payload);

    case FETCH_ITEM:
      if (action.error) {
        return state;
      }

      const item = action.payload.data.item;

      return { ...state, [item._id]: item };

    default:
      return state;
  }
}
