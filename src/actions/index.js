import axios from 'axios';

export const FETCH_ITEMS = 'fetch-items';
export const FETCH_ITEM = 'fetch-item';
export const CREATE_ITEM = 'create-item';
export const DELETE_ITEM = 'delete-item';

const ROOT_URL = 'http://localhost:3000/items';

export function fetchItems() {
  const request = axios.get(ROOT_URL);

  return {
    type: FETCH_ITEMS,
    payload: request
  };
}

