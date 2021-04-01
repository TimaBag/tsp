import { combineReducers } from 'redux';
import * as actionTypes from '../constants/actionTypes';

const token = (state = '', action) => {
  switch (action.type) {
    case actionTypes.ACTION_LOGIN_SUCCESS:
      return action.token;
    case actionTypes.ACTION_LOGGED_OUT:
      return '';
    default:
      return state;
  }
};

const user = (state = null, action) => {
  switch (action.type) {
    case actionTypes.ACTION_LOGIN_SUCCESS:
      return action.user;
    case actionTypes.ACTION_LOGGED_OUT:
      return null;
    default:
      return state;
  }
};

const userProfile = (state = null, action) => {
  switch (action.type) {
    case actionTypes.ACTION_LOGIN_SUCCESS:
      return action.user.user_json;
    case actionTypes.ACTION_UPDATE_PROFILE_SUCCEEDED:
    case actionTypes.ACTION_ADD_BLACK_LIST_SUCCEEDED:
      return action.profile;
    case actionTypes.ACTION_LOGGED_OUT:
      return null;
    default:
      return state;
  }
};

const userReducer = combineReducers({ token, user, userProfile });

export default userReducer;
