import { combineReducers } from 'redux';
import * as actionTypes from '../constants/actionTypes';

const isAuth = (state = "", action) => {
  switch(action.type) {
    case actionTypes.ACTION_GET_AUTH_KEY_SUCCEEDED:
      return action.isAuth;
    case actionTypes.ACTION_GET_AUTH_KEY_STARTED:
    case actionTypes.ACTION_GET_AUTH_KEY_FAILED:
    case actionTypes.ACTION_SEND_SIGN_SUCCESS:
      return "";
    default:
      return state;
  }
};

const tradeReducer = combineReducers({
  isAuth
});

export default tradeReducer;