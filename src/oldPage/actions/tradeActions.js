import { notification } from 'antd';

import * as actionTypes from '../constants/actionTypes';
import * as tradeApi from '../api/tradeApi';
import { ERRORS } from '../constants/constants';

export const sendTradeAuth = (data) => (dispatch, getState) => {
  dispatch({
    type: actionTypes.ACTION_GET_AUTH_KEY_STARTED
  });

  tradeApi
    .sendTradeAuth(data,getState().user.token)
    .then(
      response => {
        if (response.status !== 200) {
          response
            .text()
            .then(
              value => {
                const errorObject = JSON.parse(value);
                notification.error({
                  message: 'Ошибка',
                  description: errorObject,
                });
                dispatch({
                  type: actionTypes.ACTION_GET_AUTH_KEY_FAILED,
                  errorMessage: ERRORS.NUMBER + response.status,
                })
              }
            );
          if(response.status === 401){
            logout()(dispatch,getState)
          }
        } else {
          response
            .text()
            .then(
              value => {
                const responseObject = JSON.parse(value);
                dispatch({
                  type: actionTypes.ACTION_GET_AUTH_KEY_SUCCEEDED,
                  isAuth: responseObject
                })
                notification.success({
                  message: 'Успешно получен ключ',
                });
              }
            );
        }
      },
      error => {
        dispatch({
          type: actionTypes.ACTION_GET_AUTH_KEY_FAILED,
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