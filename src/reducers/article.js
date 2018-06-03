import {
 ARTICLE_PAGE_LOADED,
 ARTICLE_PAGE_UNLOADED,
 ADD_COMMENT,
 DELETE_COMMENT
} from '../constants/actionTypes';

const initialState = {
  article: null,
  comments: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ARTICLE_PAGE_LOADED:
      return {
        ...state,
        article: action.payload[0].article,
        comments: action.payload[1].comments
      };

    case ADD_COMMENT:
      return {
        ...state,
        commentErrors: action.error ? action.payload.errors : null,
        comments: action.error ?
          null :
          ([action.payload.comment]).concat(state.comments || [])
      };

    case DELETE_COMMENT:
      const commentId = action.commentId;

      return {
        ...state,
        comments: state.comments.filter(comment => comment.id !== commentId)
      };

    case ARTICLE_PAGE_UNLOADED:
      return initialState;

    default:
      return state;
  }
};
