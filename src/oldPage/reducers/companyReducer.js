import { combineReducers } from 'redux';
import * as actionTypes from '../constants/actionTypes';

const companyList = (state = [], action) => {
  switch(action.type) {
    case actionTypes.ACTION_GET_COMPANIES_SUCCEEDED:
      return action.companyList;
    case actionTypes.ACTION_GET_COMPANIES_STARTED:
    case actionTypes.ACTION_GET_COMPANIES_FAILED:
    case actionTypes.ACTION_LOGGED_OUT:
      return [];
    default:
      return state;
  }
};

const companyAllList = (state = [], action) => {
  switch(action.type) {
    case actionTypes.ACTION_GET_ALL_COMPANIES_SUCCEEDED:
      return action.companyAllList;
    case actionTypes.ACTION_GET_ALL_COMPANIES_STARTED:
    case actionTypes.ACTION_GET_ALL_COMPANIES_FAILED:
    case actionTypes.ACTION_LOGGED_OUT:
      return [];
    default:
      return state;
  }
};

const tradesmanList = (state = [], action) => {
  switch(action.type) {
    case actionTypes.ACTION_GET_TRADESMAN_LIST_SUCCEEDED:
      return action.tradesmanList;
    case actionTypes.ACTION_GET_TRADESMAN_LIST_STARTED:
    case actionTypes.ACTION_GET_TRADESMAN_LIST_FAILED:
    case actionTypes.ACTION_LOGGED_OUT:
      return [];
    default:
      return state;
  }
};

const storehouseList = (state = [], action) => {
  switch(action.type) {
    case actionTypes.ACTION_GET_STOREHOUSE_LIST_SUCCEEDED:
      return action.storehouseList;
    case actionTypes.ACTION_GET_STOREHOUSE_LIST_STARTED:
    case actionTypes.ACTION_GET_STOREHOUSE_LIST_FAILED:
    case actionTypes.ACTION_LOGGED_OUT:
      return [];
    default:
      return state;
  }
};

const storekeeper = (state = [], action) => {
  switch(action.type) {
    case actionTypes.ACTION_GET_STOREKEEPER_SUCCEEDED:
      return action.storekeeper;
    case actionTypes.ACTION_GET_STOREKEEPER_STARTED:
    case actionTypes.ACTION_GET_STOREKEEPER_FAILED:
    case actionTypes.ACTION_LOGGED_OUT:
      return [];
    default:
      return state;
  }
};

const stationList = (state = [], action) => {
  switch(action.type) {
    case actionTypes.ACTION_GET_STATION_LIST_SUCCEEDED:
      return action.stationList;
    case actionTypes.ACTION_GET_STATION_LIST_STARTED:
    case actionTypes.ACTION_GET_STATION_LIST_FAILED:
    default:
      return state;
  }
};

const companyTypes = (state = [], action) => {
  switch(action.type) {
    case actionTypes.ACTION_GET_COMPANY_TYPES_SUCCEEDED:
      return action.companyTypes;
    case actionTypes.ACTION_GET_COMPANY_TYPES_STARTED:
    case actionTypes.ACTION_GET_COMPANY_TYPES_FAILED:
    default:
      return state;
  }
};

const documentTypes = (state = [], action) => {
  switch(action.type) {
    case actionTypes.ACTION_GET_DOCUMENT_TYPES_SUCCEEDED:
      return action.documentTypes;
    case actionTypes.ACTION_GET_DOCUMENT_TYPES_STARTED:
    case actionTypes.ACTION_GET_DOCUMENT_TYPES_FAILED:
    default:
      return state;
  }
};

const tariffs = (state = [], action) => {
  switch(action.type) {
    case actionTypes.ACTION_LOGIN_SUCCESS:
    case actionTypes.ACTION_GET_TARIFF_SUCCEEDED:
      return action.tariffs;
    case actionTypes.ACTION_ADD_TARIFF_SUCCEEDED:
      let isExist = false;
      const updatedItems = state.map(item => {
        if(item.id === action.new_tariff.id){
          isExist = true;
          return { ...item, ...action.new_tariff }
        }
        return item
      })
      if(!isExist) updatedItems.push(action.new_tariff);
      return updatedItems
    case actionTypes.ACTION_LOGGED_OUT:
      return [];
    default:
      return state;
  }
};

const industrySegments = (state = [], action) => {
  switch(action.type) {
    case actionTypes.ACTION_GET_COMPANY_SEGMENT_SUCCEEDED:
      return action.industrySegments;
    case actionTypes.ACTION_GET_COMPANY_SEGMENT_STARTED:
    case actionTypes.ACTION_GET_COMPANY_SEGMENT_FAILED:
    default:
      return state;
  }
};

const bankInfo = (state = [], action) => {
  switch(action.type) {
    case actionTypes.ACTION_GET_BANK_INFO_SUCCEEDED:
      return action.bankInfo;
    case actionTypes.ACTION_GET_BANK_INFO_STARTED:
    case actionTypes.ACTION_GET_BANK_INFO_FAILED:
    default:
      return state;
  }
};

const standardList = (state = [], action) => {
  switch(action.type) {
    case actionTypes.ACTION_GET_STANDART_LIST_SUCCEEDED:
      return action.standardList;
    case actionTypes.ACTION_GET_STANDART_LIST_STARTED:
    case actionTypes.ACTION_GET_STANDART_LIST_FAILED:
    default:
      return state;
  }
};

const deliveryCons = (state = [], action) => {
  switch(action.type) {
    case actionTypes.ACTION_GET_DELIVERY_CONS_SUCCEEDED:
      return action.deliveryCons;
    case actionTypes.ACTION_GET_DELIVERY_CONS_STARTED:
    case actionTypes.ACTION_GET_DELIVERY_CONS_FAILED:
    default:
      return state;
  }
};

const companyReducer = combineReducers({
  companyList,
  companyAllList,
  tradesmanList,
  storehouseList,
  stationList,
  companyTypes,
  industrySegments,
  bankInfo,
  documentTypes,
  tariffs,
  standardList,
  deliveryCons,
  storekeeper
});

export default companyReducer;
