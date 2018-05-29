import {
  SET_PAGE,
  HOME_PAGE_LOADED,
  HOME_PAGE_UNLOADED,
  CHANGE_TAB,
  ARTICLE_FAVORITED,
  ARTICLE_UNFAVORITED,
  APPLY_TAG_FILTER
} from '../constants/actionTypes';

const initialState = {
  pager: null,
  articles: null,
  articlesCount: 0,
  currentPage: 0,
  tab: '',
  tag: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case HOME_PAGE_LOADED:
      return {
        ...state,
        pager: action.pager,
        articles: action.payload[1].articles,
        articlesCount: action.payload[1].articlesCount,
        currentPage: 0,
        tab: action.tab
      };

    case CHANGE_TAB:
      return {
        ...state,
        pager: action.pager,
        articles: action.payload.articles,
        articlesCount: action.payload.articlesCount,
        currentPage: 0,
        tab: action.tab,
        tag: null
      };

    case ARTICLE_FAVORITED:
    case ARTICLE_UNFAVORITED:
      return {
        ...state,
        articles: state.articles.map(article => {
          if (article.slug === action.payload.article.slug) {
            return {
              ...article,
              favorited: action.payload.article.favorited,
              favoritesCount: action.payload.article.favoritesCount
            }
          }

          return article;
        })
      };

    case APPLY_TAG_FILTER:
      return {
        ...state,
        pager: action.pager,
        articles: action.payload.articles,
        articlesCount: action.payload.articlesCount,
        tab: null,
        tag: action.tag,
        currentPage: 0
      };

    case SET_PAGE:
      return {
        ...state,
        articles: action.payload.articles,
        articlesCount: action.payload.articlesCount,
        currentPage: action.page
      };

    case HOME_PAGE_UNLOADED:
    default:
      return state;
  }
};
