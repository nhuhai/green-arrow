import {
 ARTICLE_PAGE_LOADED,
 ARTICLE_PAGE_UNLOADED,
 ADD_COMMENT,
 DELETE_COMMENT
} from '../constants/actionTypes';

const initialState = {
  article: null,
  comments: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ARTICLE_PAGE_LOADED:
      return {
        ...state,
        article: action.payload[0].article,
        comments: action.payload[1].comments
      };

    case ARTICLE_PAGE_UNLOADED:
    default:
      return initialState;
  }
};
