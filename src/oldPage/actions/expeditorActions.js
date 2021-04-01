import { notification } from 'antd';

import * as actionTypes from '../constants/actionTypes';
import * as expeditorApi from '../api/expeditorApi';

import { ERRORS } from '../constants/constants';

export const getExpeditor = () => (dispatch, getState) => {
  dispatch({
    type: actionTypes.ACTION_GET_EXPEDITOR_STARTED
  });

  expeditorApi
    .getExpeditor(getState().user.token)
    .then(
      response => {
        if (response.status !== 200) {
          dispatch({
						type: actionTypes.ACTION_GET_EXPEDITOR_FAILED,
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
									type: actionTypes.ACTION_GET_EXPEDITOR_SUCCEEDED,
									expeditor_tarif: responseObject
								})
              }
            );
        }
      },
      error => {
        dispatch({
					type: actionTypes.ACTION_GET_EXPEDITOR_FAILED,
					errorMessage: ERRORS.NO_INTERNET
				})
      },
    );
};

export const addExpeditorTariff = (data) => (dispatch, getState) => {
  
  dispatch({
    type: actionTypes.ACTION_ADD_EXPEDITOR_TARIFF_STARTED
  });

  expeditorApi
    .addExpeditorTariff(data, getState().user.token)
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
                  type: actionTypes.ACTION_ADD_EXPEDITOR_TARIFF_FAILED,
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
                  type: actionTypes.ACTION_ADD_EXPEDITOR_TARIFF_SUCCEEDED,
                  newExpediorTarif : responseObject
                })
              }
            );
        }
      },
      error => {
        dispatch({
          type: actionTypes.ACTION_ADD_EXPEDITOR_TARIFF_FAILED,
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