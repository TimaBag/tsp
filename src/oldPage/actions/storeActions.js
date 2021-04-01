import { notification } from 'antd';

import * as actionTypes from '../constants/actionTypes';
import * as stockApi from '../api/stockApi';

import { ERRORS } from '../constants/constants'

export const addDemandStorehouseCard = (data) => (dispatch, getState) => {
  dispatch({
    type: actionTypes.ACTION_ADD_DEMAND_STOREHOUSE_CARD_STARTED
  });

  stockApi
    .addDemandStorehouseCard(data, getState().user.token)
    .then(
      response => {
        if (response.status !== 201) {
          response
            .text()
            .then(
              value => {
                const errorObject = JSON.parse(value);
                notification.error({
                  message: 'Ошибка при добавлений',
                  description: errorObject[0],
                });
                dispatch({
                  type: actionTypes.ACTION_ADD_DEMAND_STOREHOUSE_CARD_FAILED,
                  errorMessage: ERRORS.NUMBER + response.status
                });
              }
            );
            if(response.status === 401){
              logout()(dispatch,getState);
            }
        } else {
          notification.success({
            message: 'Заявка добавлена'
          });
          dispatch({
            type: actionTypes.ACTION_ADD_DEMAND_STOREHOUSE_CARD_SUCCEEDED,
          })
          getDemandStorehouseCard()(dispatch, getState);
        }
      },
      error => {
        dispatch({
          type: actionTypes.ACTION_ADD_DEMAND_STOREHOUSE_CARD_FAILED,
          errorMessage: ERRORS.NO_INTERNET
        })
      },
    );
};

export const getDemandStorehouseCard = () => (dispatch, getState) => {
  dispatch({
    type: actionTypes.ACTION_GET_DEMAND_STOREHOUSE_CARD_STARTED
  });

  stockApi
    .getDemandStorehouseCard(getState().user.token)
    .then(
      response => {
        if (response.status !== 200) {
          dispatch({
            type: actionTypes.ACTION_GET_DEMAND_STOREHOUSE_CARD_FAILED,
            errorMessage: ERRORS.NUMBER + response.status
          });
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
                  type: actionTypes.ACTION_GET_DEMAND_STOREHOUSE_CARD_SUCCEEDED,
                  storehouse_demands: responseObject
                })
              }
            );
        }
      },
      error => {
        dispatch({
          type: actionTypes.ACTION_GET_DEMAND_STOREHOUSE_CARD_FAILED,
          errorMessage: ERRORS.NO_INTERNET
        })
      },
    );
};

export const getTariff = (data) => (dispatch, getState) => {
  dispatch({
    type: actionTypes.ACTION_GET_TARIFF_STARTED
  });

  stockApi
    .getTariff(data,getState().user.token)
    .then(
      response => {
        if (response.status !== 200) {
          dispatch({
            type: actionTypes.ACTION_GET_TARIFF_FAILED,
            errorMessage: ERRORS.NUMBER + response.status
          });
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
                  type: actionTypes.ACTION_GET_TARIFF_SUCCEEDED,
                  tariffs : responseObject
                })
              }
            );
        }
      },
      error => {
        dispatch({
          type: actionTypes.ACTION_GET_TARIFF_FAILED,
          errorMessage: ERRORS.NO_INTERNET
        })
      },
    );
};

export const addTariff = (data) => (dispatch, getState) => {
  
  dispatch({
    type: actionTypes.ACTION_ADD_TARIFF_STARTED
  });

  stockApi
    .addTariff(data, getState().user.token)
    .then(
      response => {
        if (response.status !== 200) {
          response
            .text()
            .then(
              value => {
                const errorObject = JSON.parse(value);
                notification.error({
                  message: 'Ошибка при добавлений',
                  description: errorObject[0],
                });
                dispatch({
                  type: actionTypes.ACTION_ADD_TARIFF_FAILED,
                  errorMessage: ERRORS.NUMBER + response.status
                });
              }
            );
          if(response.status === 401){
            logout()(dispatch,getState);
          }
        } else {
          response
            .text()
            .then(
              value => {
                const responseObject = JSON.parse(value);
                notification.success({
                  message: 'Тариф добавлен'
                });
								dispatch({
									type: actionTypes.ACTION_ADD_TARIFF_SUCCEEDED,
									new_tariff: responseObject
								})
              }
            );
        }
      },
      error => {
        dispatch({
					type: actionTypes.ACTION_ADD_TARIFF_FAILED,
					errorMessage: ERRORS.NO_INTERNET
				})
      },
    );
};

export const editTariff = (data) => (dispatch, getState) => {
  
  dispatch({
    type: actionTypes.ACTION_EDIT_TARIFF_STARTED
  });

  stockApi
    .editTariff(data, getState().user.token)
    .then(
      response => {
        if (response.status !== 200) {
          response
            .text()
            .then(
              value => {
                const errorObject = JSON.parse(value);
                notification.error({
                  message: 'Ошибка при добавлений',
                  description: errorObject[0],
                });
                dispatch({
                  type: actionTypes.ACTION_EDIT_TARIFF_FAILED,
                  errorMessage: ERRORS.NUMBER + response.status
                });
              }
            );
          if(response.status === 401){
            logout()(dispatch,getState);
          }
        } else {
          response
            .text()
            .then(
              value => {
                // const responseObject = JSON.parse(value);
                notification.success({
                  message: 'Тариф обновлена'
                });
                getTariff(getState().user.user.user)(dispatch,getState);
              }
            );
        }
      },
      error => {
        dispatch({
          type: actionTypes.ACTION_EDIT_TARIFF_FAILED,
          errorMessage: ERRORS.NO_INTERNET
        })
      },
    );
};

export const deleteTariff = (data) => (dispatch, getState) => {
  
  dispatch({
    type: actionTypes.ACTION_DELETE_TARIFF_STARTED
  });

  stockApi
    .deleteTariff(data, getState().user.token)
    .then(
      response => {
        if (response.status !== 201 && response.status !== 204) {
          response
            .text()
            .then(
              value => {
                const errorObject = JSON.parse(value);
                notification.error({
                  message: 'Ошибка при добавлений',
                  description: errorObject[0],
                });
                dispatch({
                  type: actionTypes.ACTION_DELETE_TARIFF_FAILED,
                  errorMessage: ERRORS.NUMBER + response.status
                });
              }
            );
          if(response.status === 401){
            logout()(dispatch,getState);
          }
        }
        if(response.status === 204){
          notification.success({
            message: 'Тариф удалено',
          });
          getTariff(getState().user.user.user)(dispatch,getState);
        }
      },
      error => {
        dispatch({
          type: actionTypes.ACTION_DELETE_TARIFF_FAILED,
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