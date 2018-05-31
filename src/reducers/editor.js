import {
  EDITOR_PAGE_LOADED,
  EDITOR_PAGE_UNLOADED,
  ARTICLE_SUBMITTED,
  ASYNC_START,
  ADD_TAG,
  REMOVE_TAG,
  UPDATE_FIELD_EDITOR
} from '../constants/actionTypes';

const initialState = {
  articleSlug: '',
  title: '',
  description: '',
  body: '',
  tagInput: '',
  tagList: [],
  inProgress: false,
  errors: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case EDITOR_PAGE_LOADED:
      const { payload } = action;
      const { article } = payload || {};
      const { slug = '', title = '', description = '', body = '', tagList = []} = article || {};

      return {
        ...state,
        articleSlug: slug,
        title,
        description,
        body,
        tagList,
        tagInput: ''
      };

    case ADD_TAG:
      return {
        ...state,
        tagList: state.tagList.concat([state.tagInput]),
        tagInput: ''
      };

    case REMOVE_TAG:
      return {
        ...state,
        tagList: state.tagList.filter(tag => tag !== action.tag)
      }

    case UPDATE_FIELD_EDITOR:
      return { ...state, [action.key]: action.value };

    case ASYNC_START:
      if (action.subtype === ARTICLE_SUBMITTED) {
        return { ...state, inProgress: true };
      }

      return state;

    case ARTICLE_SUBMITTED:
      return {
        ...state,
        inProgress: false,
        errors: action.error ? action.payload.errors : null
      };

    case EDITOR_PAGE_UNLOADED:
    default:
      return initialState;
  }
};
