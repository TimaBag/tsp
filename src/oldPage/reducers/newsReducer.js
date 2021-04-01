import { combineReducers } from 'redux';
import * as actionTypes from '../constants/actionTypes';

const newsList = (state = [], action) => {
  switch(action.type) {
    case actionTypes.ACTION_GET_NEWS_SUCCEEDED:
    case actionTypes.ACTION_GET_NEWS_BY_DATE_SUCCEEDED:
      return action.news.results;
    case actionTypes.ACTION_GET_NEWS_STARTED:
    case actionTypes.ACTION_GET_NEWS_FAILED:
      return [];
    default:
      return state;
  }
};

const newsPrevious = (state = [], action) => {
  switch(action.type) {
    case actionTypes.ACTION_GET_NEWS_SUCCEEDED:
    case actionTypes.ACTION_GET_NEWS_BY_DATE_SUCCEEDED:
      return action.news.previous;
    case actionTypes.ACTION_GET_NEWS_STARTED:
    case actionTypes.ACTION_GET_NEWS_FAILED:
      return [];
    default:
      return state;
  }
};

const newsNext = (state = [], action) => {
  switch(action.type) {
    case actionTypes.ACTION_GET_NEWS_SUCCEEDED:
    case actionTypes.ACTION_GET_NEWS_BY_DATE_SUCCEEDED:
      return action.news.next;
    case actionTypes.ACTION_GET_NEWS_STARTED:
    case actionTypes.ACTION_GET_NEWS_FAILED:
      return [];
    default:
      return state;
  }
};

const newsCount = (state = [], action) => {
  switch(action.type) {
    case actionTypes.ACTION_GET_NEWS_SUCCEEDED:
    case actionTypes.ACTION_GET_NEWS_BY_DATE_SUCCEEDED:
      return action.news.count;
    case actionTypes.ACTION_GET_NEWS_STARTED:
    case actionTypes.ACTION_GET_NEWS_FAILED:
      return [];
    default:
      return state;
  }
};

const newsReducer = combineReducers({
  newsList,
  newsNext,
  newsPrevious,
  newsCount
});

export default newsReducer;
