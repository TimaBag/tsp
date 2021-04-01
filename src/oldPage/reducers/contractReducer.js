import { combineReducers } from 'redux';
import createHistory from 'history/createBrowserHistory';

import * as actionTypes from '../constants/actionTypes';

const history = createHistory({
  forceRefresh: true
});

const createdContract = (state = null, action) => {
  switch(action.type) {
    case actionTypes.ACTION_CREATE_CONTRACT_SUCCEEDED:
      history.push('/trade/'+action.contract.id);
      return action.contract;
    case actionTypes.ACTION_CREATE_CONTRACT_STARTED:
    case actionTypes.ACTION_CREATE_CONTRACT_FAILED:
    case actionTypes.ACTION_LOGGED_OUT:
      return null;
    default:
      return state;
  }
};

const contract = (state = null, action) => {
  switch(action.type) {
    case actionTypes.ACTION_GET_CONTRACT_SUCCEEDED:
    case actionTypes.ACTION_APPROVE_CONTRACT_SUCCEEDED:
    case actionTypes.ACTION_SAVE_DOC_INFO_SUCCEEDED:
      return action.contract;
    case actionTypes.ACTION_GET_CONTRACT_STARTED:
    case actionTypes.ACTION_GET_CONTRACT_FAILED:
    case actionTypes.ACTION_LOGGED_OUT:
      return null;
    default:
      return state;
  }
};

const contract_list = (state = [], action) => {
  switch(action.type) {
    case actionTypes.ACTION_GET_CONTRACT_LIST_SUCCEEDED:
    case actionTypes.ACTION_GET_CONTRACT_LIST_FILTER_SUCCEEDED:
      return action.contract_list.results;
    case actionTypes.ACTION_GET_CONTRACT_LIST_FILTER_TIME_SUCCEEDED:
      return action.contract_list.results.sort(function(a, b){return new Date(b.datetime) - new Date(a.datetime)});
    case actionTypes.ACTION_GET_CONTRACT_LIST_STARTED:
    case actionTypes.ACTION_GET_CONTRACT_LIST_FAILED:
    case actionTypes.ACTION_GET_CONTRACT_LIST_FILTER_STARTED:
    case actionTypes.ACTION_GET_CONTRACT_LIST_FILTER_FAILED:
    case actionTypes.ACTION_LOGGED_OUT:
      return [];
    default:
      return state;
  }
};

const contractPrevious = (state = [], action) => {
  switch(action.type) {
    case actionTypes.ACTION_GET_CONTRACT_LIST_SUCCEEDED:
    case actionTypes.ACTION_GET_CONTRACT_LIST_FILTER_SUCCEEDED:
      return action.contract_list.previous;
    case actionTypes.ACTION_GET_CONTRACT_LIST_STARTED:
    case actionTypes.ACTION_GET_CONTRACT_LIST_FAILED:
    case actionTypes.ACTION_GET_CONTRACT_LIST_FILTER_STARTED:
    case actionTypes.ACTION_GET_CONTRACT_LIST_FILTER_FAILED:
      return [];
    default:
      return state;
  }
};

const contractNext = (state = [], action) => {
  switch(action.type) {
    case actionTypes.ACTION_GET_CONTRACT_LIST_SUCCEEDED:
    case actionTypes.ACTION_GET_CONTRACT_LIST_FILTER_SUCCEEDED:
      return action.contract_list.next;
    case actionTypes.ACTION_GET_CONTRACT_LIST_STARTED:
    case actionTypes.ACTION_GET_CONTRACT_LIST_FAILED:
    case actionTypes.ACTION_GET_CONTRACT_LIST_FILTER_STARTED:
    case actionTypes.ACTION_GET_CONTRACT_LIST_FILTER_FAILED:
      return [];
    default:
      return state;
  }
};

const contractCount = (state = 0, action) => {
  switch(action.type) {
    case actionTypes.ACTION_GET_CONTRACT_LIST_SUCCEEDED:
    case actionTypes.ACTION_GET_CONTRACT_LIST_FILTER_SUCCEEDED:
      return action.contract_list.count;
    case actionTypes.ACTION_GET_CONTRACT_LIST_STARTED:
    case actionTypes.ACTION_GET_CONTRACT_LIST_FAILED:
    case actionTypes.ACTION_GET_CONTRACT_LIST_FILTER_STARTED:
    case actionTypes.ACTION_GET_CONTRACT_LIST_FILTER_FAILED:
      return 0;
    default:
      return state;
  }
};

const uploadedDocument = (state = null, action) => {
  switch(action.type) {
    case actionTypes.ACTION_SENDING_DOC_SUCCEEDED:
      return action.uploadedDocument;
    case actionTypes.ACTION_SENDING_DOC_STARTED:
    case actionTypes.ACTION_GET_CONTRACT_SUCCEEDED:
    case actionTypes.ACTION_SENDING_DOC_FAILED:
    case actionTypes.ACTION_LOGGED_OUT:
      return null;
    default:
      return state;
  }
};


const laoding = (state = false, action) => {
  switch(action.type) {
    case actionTypes.ACTION_GET_CONTRACT_LIST_STARTED:
    case actionTypes.ACTION_GET_CONTRACT_LIST_FILTER_STARTED:
      return true;
    case actionTypes.ACTION_GET_CONTRACT_LIST_SUCCEEDED:
    case actionTypes.ACTION_GET_CONTRACT_LIST_FAILED:
    case actionTypes.ACTION_GET_CONTRACT_LIST_FILTER_SUCCEEDED:
    case actionTypes.ACTION_GET_CONTRACT_LIST_FILTER_FAILED:
      return false;
    default:
      return state;
  }
};

const contractReducer = combineReducers({
  createdContract,
  contract,
  contract_list,
  uploadedDocument,
  contractNext,
  contractPrevious,
  contractCount,
  laoding
});

export default contractReducer;