import { combineReducers } from 'redux';
import * as actionTypes from '../constants/actionTypes';

const categoryList = (state = [], action) => {
  switch(action.type) {
    case actionTypes.ACTION_GET_CATEGORIES_SUCCEEDED:
      return action.categoryList;
    case actionTypes.ACTION_GET_CATEGORIES_STARTED:
    case actionTypes.ACTION_GET_CATEGORIES_FAILED:
      return [];
    default:
      return state;
  }
};

const resourceList = (state = [], action) => {
  switch(action.type) {
    case actionTypes.ACTION_GET_RESOURCES_SUCCEEDED:
      return action.resourceList;
    case actionTypes.ACTION_GET_RESOURCES_STARTED:
    case actionTypes.ACTION_GET_RESOURCES_FAILED:
      return [];
    default:
      return state;
  }
};

const measureList = (state = [], action) => {
  switch(action.type) {
    case actionTypes.ACTION_GET_MEASURE_LIST_SUCCEEDED:
      return action.measureList;
    case actionTypes.ACTION_GET_MEASURE_LIST_STARTED:
    case actionTypes.ACTION_GET_MEASURE_LIST_FAILED:
      return [];
    default:
      return state;
  }
};

const producerList = (state = [], action) => {
  switch(action.type) {
    case actionTypes.ACTION_GET_PRODUCERS_SUCCEEDED:
      return action.producerList;
    case actionTypes.ACTION_GET_PRODUCERS_STARTED:
    case actionTypes.ACTION_GET_PRODUCERS_FAILED:
      return [];
    default:
      return state;
  }
};

const expeditorList = (state = [], action) => {
  switch(action.type) {
    case actionTypes.ACTION_GET_EXPEDITOR_LIST_SUCCEEDED:
      return action.expeditorList;
    case actionTypes.ACTION_GET_EXPEDITOR_LIST_STARTED:
    case actionTypes.ACTION_GET_EXPEDITOR_LIST_FAILED:
      return [];
    default:
      return state;
  }
};

const grapData = (state = [], action) => {
  switch(action.type) {
    case actionTypes.ACTION_GET_GRAPH_SUCCEEDED:
    case actionTypes.ACTION_GET_GRAPH_DATE_SUCCEEDED:
      return action.grapData;
    case actionTypes.ACTION_GET_GRAPH_STARTED:
    case actionTypes.ACTION_GET_GRAPH_FAILED:
      return [];
    default:
      return state;
  }
};

const resourceId = (state = [], action) => {
  switch(action.type) {
    case actionTypes.ACTION_GET_GRAPH_SUCCEEDED:
    case actionTypes.ACTION_GET_GRAPH_DATE_SUCCEEDED:
      return action.resourceId;
    case actionTypes.ACTION_GET_GRAPH_STARTED:
    case actionTypes.ACTION_GET_GRAPH_FAILED:
      return [];
    default:
      return state;
  }
};

const graphDate = (state = null, action) => {
  switch(action.type) {
    case actionTypes.ACTION_GET_GRAPH_DATE_SUCCEEDED:
      return action.graphDate;
    case actionTypes.ACTION_GET_GRAPH_STARTED:
    case actionTypes.ACTION_GET_GRAPH_FAILED:
      return null;
    default:
      return state;
  }
};

const grapSegmentData = (state = [], action) => {
  switch(action.type) {
    case actionTypes.ACTION_GET_GRAPH_SEGMENTATION_SUCCEEDED:
      return action.grapSegmentData;
    case actionTypes.ACTION_GET_GRAPH_SEGMENTATION_STARTED:
    case actionTypes.ACTION_GET_GRAPH_SEGMENTATION_FAILED:
      return [];
    default:
      return state;
  }
};

const resourceReducer = combineReducers({
  resourceList,
  categoryList,
  measureList,
  producerList,
  expeditorList,
  grapData,
  grapSegmentData,
  resourceId,
  graphDate
});

export default resourceReducer;
