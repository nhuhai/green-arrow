import _ from 'lodash';
import { FETCH_ITEMS, FETCH_ITEM, DELETE_ITEM } from '../actions';

export default function (state = {}, action) {
  switch (action.type) {
    case FETCH_ITEMS:
      return _.mapKeys(action.payload.data.items, '_id');
    default:
      return state;
  }
}
