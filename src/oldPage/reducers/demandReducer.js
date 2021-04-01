import { combineReducers } from 'redux';
import * as actionTypes from '../constants/actionTypes';

const demands = (state = [], action) => {
  switch(action.type) {
    case actionTypes.ACTION_GET_DEMANDS_SUCCEEDED:
      return action.demands;
    case actionTypes.ACTION_ADD_DEMAND_SUCCEEDED:
      return [...state, action.new_demand];
    case actionTypes.ACTION_GET_DEMANDS_STARTED:
    case actionTypes.ACTION_GET_DEMANDS_FAILED:
      return state;
    default:
      return state;
  }
};

const demandsCompany = (state = [], action) => {
  switch(action.type) {
    case actionTypes.ACTION_GET_DEMAND_COMPANY_SUCCEEDED:
      return action.demands_company;
    case actionTypes.ACTION_ADD_DEMAND_SUCCEEDED:
      return [...state, action.new_demand];
    case actionTypes.ACTION_GET_DEMAND_COMPANY_STARTED:
    case actionTypes.ACTION_GET_DEMAND_COMPANY_FAILED:
      return state;
    default:
      return state;
  }
};

const demandCreated = (state = false, action) => {
  switch(action.type) {
    case actionTypes.ACTION_ADD_DEMAND_SUCCEEDED:
      return true;
    case actionTypes.ACTION_ADD_DEMAND_STARTED:
    case actionTypes.ACTION_ADD_DEMAND_FAILED:
      return false;
    default:
      return state;
  }
};

const storehouse_demands = (state = [], action) => {
  switch(action.type) {
    case actionTypes.ACTION_GET_DEMAND_STOREHOUSE_CARD_SUCCEEDED:
      return action.storehouse_demands;
    case actionTypes.ACTION_GET_DEMAND_STOREHOUSE_CARD_STARTED:
    case actionTypes.ACTION_GET_DEMAND_STOREHOUSE_CARD_FAILED:
      return state;
    default:
      return state;
  }
};

const demandReducer = combineReducers({
  demands,
  storehouse_demands,
  demandCreated,
  demandsCompany
});

export default demandReducer;
