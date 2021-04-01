import { combineReducers } from 'redux';
import * as actionTypes from '../constants/actionTypes';

const regions = (state = [], action) => {
  switch(action.type) {
    case actionTypes.ACTION_GET_REGIONS_SUCCEEDED:
      return action.regions;
    case actionTypes.ACTION_GET_REGIONS_STARTED:
    case actionTypes.ACTION_GET_REGIONS_FAILED:
      return [];
    default:
      return state;
  }
};

const roles = (state = [], action) => {
  switch(action.type) {
    case actionTypes.ACTION_GET_ROLES_SUCCEEDED:
      return action.roles;
    case actionTypes.ACTION_GET_ROLES_STARTED:
    case actionTypes.ACTION_GET_ROLES_FAILED:
      return [];
    default:
      return state;
  }
};

const review = (state = [], action) => {
  switch(action.type) {
    case actionTypes.ACTION_GET_PREVIEW_SUCCEEDED:
      return action.review;
    case actionTypes.ACTION_GET_PREVIEW_STARTED:
    case actionTypes.ACTION_GET_PREVIEW_FAILED:
      return [];
    default:
      return state;
  }
};

const companyProfile = (state = null, action) => {
  switch(action.type) {
    case actionTypes.ACTION_GET_PROFILE_SUCCEEDED:
      return (action.company_profile === undefined)?null:action.company_profile;
    case actionTypes.ACTION_GET_PROFILE_STARTED:
    case actionTypes.ACTION_GET_PROFILE_FAILED:
    case actionTypes.ACTION_LOGGED_OUT:
      return null;
    default:
      return state;
  }
};

const profile_file = (state = [], action) => {
  switch(action.type) {
    case actionTypes.ACTION_GET_GALLERY_SUCCESS:
      return action.profile_file;
    case actionTypes.ACTION_GET_GALLERY_STARTED:
    case actionTypes.ACTION_GET_GALLERY_FAILED:
      return [];
    default:
      return state;
  }
};

const payboxUrl = (state = "", action) => {
  switch(action.type) {
    case actionTypes.ACTION_GET_PAYBOX_URL_SUCCEEDED:
      return action.payboxUrl;
    case actionTypes.ACTION_GET_PAYBOX_URL_STARTED:
    case actionTypes.ACTION_GET_PAYBOX_URL_FAILED:
      return "";
    default:
      return state;
  }
};


const profileReducer = combineReducers({
  regions,
  roles,
  companyProfile,
  review,
  profile_file,
  payboxUrl
});

export default profileReducer;
