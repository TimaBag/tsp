import { combineReducers } from 'redux';
import * as actionTypes from '../constants/actionTypes';

const offers = (state = [], action) => {
  switch(action.type) {
    case actionTypes.ACTION_GET_OFFERS_SUCCEEDED:
      return action.offers;
    case actionTypes.ACTION_ADD_OFFER_SUCCEEDED:
      return [...state, action.new_offer];
    case actionTypes.ACTION_GET_OFFERS_STARTED:
    case actionTypes.ACTION_GET_OFFERS_FAILED:
      return state;
    default:
      return state;
  }
};

const offersCompany = (state = [], action) => {
  switch(action.type) {
    case actionTypes.ACTION_GET_OFFER_COMPANY_SUCCEEDED:
      return action.offers_company;
    case actionTypes.ACTION_ADD_OFFER_SUCCEEDED:
      return [...state, action.new_offer];
    case actionTypes.ACTION_GET_OFFER_COMPANY_STARTED:
    case actionTypes.ACTION_GET_OFFER_COMPANY_FAILED:
      return state;
    default:
      return state;
  }
};

const offerCreated = (state = false, action) => {
  switch(action.type) {
    case actionTypes.ACTION_ADD_OFFER_SUCCEEDED:
      return true;
    case actionTypes.ACTION_ADD_OFFER_STARTED:
    case actionTypes.ACTION_ADD_OFFER_FAILED:
      return false;
    default:
      return state;
  }
};

const offerReducer = combineReducers({
  offers,
  offerCreated,
  offersCompany
});

export default offerReducer;
