import * as actionTypes from '../constants/actionTypes';
import * as resourceApi from '../api/resourceApi';

import { ERRORS } from '../constants/constants';

export const getCategories = () => (dispatch, getState) => {
  dispatch({
    type: actionTypes.ACTION_GET_CATEGORIES_STARTED
  });

  resourceApi
    .getCategories()
    .then(
      response => {
        if (response.status !== 200) {
          dispatch({
						type: actionTypes.ACTION_GET_CATEGORIES_FAILED,
						errorMessage: ERRORS.NUMBER + response.status,
					})
          if(response.status === 401){
            logout()(dispatch,getState);
          }
        } else {
          response
            .text()
            .then(
              value => {
                const responseObject = JSON.parse(value);
								dispatch({
									type: actionTypes.ACTION_GET_CATEGORIES_SUCCEEDED,
									categoryList: responseObject
								})
              }
            );
        }
      },
      error => {
        dispatch({
					type: actionTypes.ACTION_GET_CATEGORIES_FAILED,
					errorMessage: ERRORS.NO_INTERNET
				})
      },
    );
};

export const getResources = (data) => (dispatch, getState) => {
  dispatch({
    type: actionTypes.ACTION_GET_RESOURCES_STARTED
  });

  resourceApi
    .getResources(data)
    .then(
      response => {
        if (response.status !== 200) {
          dispatch({
						type: actionTypes.ACTION_GET_RESOURCES_FAILED,
						errorMessage: ERRORS.NUMBER + response.status,
					})
          if(response.status === 401){
            logout()(dispatch,getState);
          }
        } else {
          response
            .text()
            .then(
              value => {
                const responseObject = JSON.parse(value);
								dispatch({
									type: actionTypes.ACTION_GET_RESOURCES_SUCCEEDED,
									resourceList: responseObject
								})
              }
            );
        }
      },
      error => {
        dispatch({
					type: actionTypes.ACTION_GET_RESOURCES_FAILED,
					errorMessage: ERRORS.NO_INTERNET
				})
      },
    );
};

export const getProducers = () => (dispatch, getState) => {
  dispatch({
    type: actionTypes.ACTION_GET_PRODUCERS_STARTED
  });

  resourceApi
    .getProducers()
    .then(
      response => {
        if (response.status !== 200) {
          dispatch({
						type: actionTypes.ACTION_GET_PRODUCERS_FAILED,
						errorMessage: ERRORS.NUMBER + response.status,
					})
          if(response.status === 401){
            logout()(dispatch,getState);
          }
        } else {
          response
            .text()
            .then(
              value => {
                const responseObject = JSON.parse(value);
								dispatch({
									type: actionTypes.ACTION_GET_PRODUCERS_SUCCEEDED,
									producerList: responseObject
								})
              }
            );
        }
      },
      error => {
        dispatch({
					type: actionTypes.ACTION_GET_PRODUCERS_FAILED,
					errorMessage: ERRORS.NO_INTERNET
				})
      },
    );
};

export const getMeasureList = (data) => (dispatch, getState) => {
  dispatch({
    type: actionTypes.ACTION_GET_MEASURE_LIST_STARTED
  });

  resourceApi
    .getMeasureList(data)
    .then(
      response => {
        if (response.status !== 200) {
          dispatch({
						type: actionTypes.ACTION_GET_MEASURE_LIST_FAILED,
						errorMessage: ERRORS.NUMBER + response.status,
					})
          if(response.status === 401){
            logout()(dispatch,getState);
          }
        } else {
          response
            .text()
            .then(
              value => {
                const responseObject = JSON.parse(value);
								dispatch({
									type: actionTypes.ACTION_GET_MEASURE_LIST_SUCCEEDED,
									measureList: responseObject
								})
              }
            );
        }
      },
      error => {
        dispatch({
					type: actionTypes.ACTION_GET_MEASURE_LIST_FAILED,
					errorMessage: ERRORS.NO_INTERNET
				})
      },
    );
};

export const getExpeditorList = (data) => (dispatch, getState) => {
  dispatch({
    type: actionTypes.ACTION_GET_EXPEDITOR_LIST_STARTED
  });

  resourceApi
    .getExpeditorList(getState().user.token, data)
    .then(
      response => {
        if (response.status !== 200) {
          dispatch({
            type: actionTypes.ACTION_GET_EXPEDITOR_LIST_FAILED,
            errorMessage: ERRORS.NUMBER + response.status,
          })
          if(response.status === 401){
            logout()(dispatch,getState);
          }
        } else {
          response
            .text()
            .then(
              value => {
                const responseObject = JSON.parse(value);
                dispatch({
                  type: actionTypes.ACTION_GET_EXPEDITOR_LIST_SUCCEEDED,
                  expeditorList: responseObject
                })
              }
            );
        }
      },
      error => {
        dispatch({
          type: actionTypes.ACTION_GET_EXPEDITOR_LIST_FAILED,
          errorMessage: ERRORS.NO_INTERNET
        })
      },
    );
};

export const getGraph = (resourceId,metricUnitId) => (dispatch, getState) => {
  dispatch({
    type: actionTypes.ACTION_GET_GRAPH_STARTED
  });

  resourceApi
    .getGraph(resourceId,metricUnitId)
    .then(
      response => {
        if (response.status !== 200) {
          dispatch({
            type: actionTypes.ACTION_GET_GRAPH_FAILED,
            errorMessage: ERRORS.NUMBER + response.status,
          })
          if(response.status === 401){
            logout()(dispatch,getState);
          }
        } else {
          response
            .text()
            .then(
              value => {
                const responseObject = JSON.parse(value);
                dispatch({
                  type: actionTypes.ACTION_GET_GRAPH_SUCCEEDED,
                  grapData: responseObject,
                  resourceId : 1,
                })
              }
            );
        }
      },
      error => {
        dispatch({
          type: actionTypes.ACTION_GET_GRAPH_FAILED,
          errorMessage: ERRORS.NO_INTERNET
        })
      },
    );
};

export const getGraphSegmentation = () => (dispatch, getState) => {
  dispatch({
    type: actionTypes.ACTION_GET_GRAPH_SEGMENTATION_STARTED
  });

  resourceApi
    .getGraphSegmentation()
    .then(
      response => {
        if (response.status !== 200) {
          dispatch({
            type: actionTypes.ACTION_GET_GRAPH_SEGMENTATION_FAILED,
            errorMessage: ERRORS.NUMBER + response.status,
          })
          if(response.status === 401){
            logout()(dispatch,getState);
          }
        } else {
          response
            .text()
            .then(
              value => {
                const responseObject = JSON.parse(value);
                dispatch({
                  type: actionTypes.ACTION_GET_GRAPH_SEGMENTATION_SUCCEEDED,
                  grapSegmentData: responseObject
                })
              }
            );
        }
      },
      error => {
        dispatch({
          type: actionTypes.ACTION_GET_GRAPH_SEGMENTATION_FAILED,
          errorMessage: ERRORS.NO_INTERNET
        })
      },
    );
};

export const getGraphDate = (resource_id,metricUnitId,data) => (dispatch, getState) => {
  dispatch({
    type: actionTypes.ACTION_GET_GRAPH_DATE_STARTED
  });

  resourceApi
    .getGraphDate(resource_id,metricUnitId,data)
    .then(
      response => {
        if (response.status !== 200) {
          dispatch({
            type: actionTypes.ACTION_GET_GRAPH_DATE_FAILED,
            errorMessage: ERRORS.NUMBER + response.status,
          })
          if(response.status === 401){
            logout()(dispatch,getState);
          }
        } else {
          response
            .text()
            .then(
              value => {
                const responseObject = JSON.parse(value);
                dispatch({
                  type: actionTypes.ACTION_GET_GRAPH_DATE_SUCCEEDED,
                  grapData: responseObject,
                  resourceId : resource_id,
                  graphDate : data,
                })
              }
            );
        }
      },
      error => {
        dispatch({
          type: actionTypes.ACTION_GET_GRAPH_DATE_FAILED,
          errorMessage: ERRORS.NO_INTERNET
        })
      },
    );
};

export const logout = () => (dispatch, getState) => {
  dispatch({
    type: actionTypes.ACTION_LOGGED_OUT,
  });

  localStorage.clear()
}