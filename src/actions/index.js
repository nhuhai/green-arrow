import axios from 'axios';

export const FETCH_ITEMS = 'fetch-items';
export const FETCH_ITEM = 'fetch-item';
export const CREATE_ITEM = 'create-item';
export const DELETE_ITEM = 'delete-item';

const ROOT_URL = 'http://localhost:8443/items';

export function fetchItems() {
  const request = axios.get(ROOT_URL);

  return {
    type: FETCH_ITEMS,
    payload: request
  };
}

export function createItem(values, callback) {
  const request = axios
    .post(ROOT_URL, values)
    .then(callback);

  return {
    type: CREATE_ITEM,
    payload: request
  };
}

export function fetchItem(id) {
  const request = axios.get(`${ROOT_URL}/${id}`);

  return {
    type: FETCH_ITEM,
    payload: request
  };
}

export function deleteItem(id, callback) {
  axios.delete(`${ROOT_URL}/${id}`)
    .then(() => callback());

  return {
    type: DELETE_ITEM,
    payload: id
  };
}
