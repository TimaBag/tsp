import { notification } from 'antd';

import * as actionTypes from '../constants/actionTypes';
import * as authApi from '../api/authApi';
import * as actions from './profileActions';
import { ERRORS } from '../constants/constants';

export const login = (data) => (dispatch, getState) => {
  if (getState().auth.isLoggingIn) {
    return Promise.resolve();
  }

  dispatch({
    type: actionTypes.ACTION_LOGIN_STARTED
  });

  authApi
    .login(data)
    .then(
      response => {
        if(response.status === 401){
              response
                .text()
                .then(
                  value => {
                    const errorObject = JSON.parse(value);
                    notification.error({
                      message: 'Ошибка',
                      description: errorObject.error[0],
                    });
                    dispatch({
                      type: actionTypes.ACTION_GET_TEMP,
                      temp_id: errorObject.temp_id,
                      errorMessage: ERRORS.NUMBER + response.status
                    });
                    actions.getPayboxIdUrl(errorObject.temp_id)(dispatch,getState);
                  }
                );
            }else{
              if (response.status !== 200) {
                response
                  .text()
                  .then(
                    value => {
                      const errorObject = JSON.parse(value);
                      notification.error({
                        message: 'Ошибка',
                        description: errorObject.error ? errorObject.error[0] : errorObject.non_field_errors,
                      });
                      dispatch({
                        type: actionTypes.ACTION_LOGIN_FAILED,
                        errorMessage: ERRORS.NUMBER + response.status
                      });
                    }
                  );
              } else {
                response
                  .text()
                  .then(
                    value => {
                      const responseObject = JSON.parse(value);
                      dispatch({
                        type: actionTypes.ACTION_LOGIN_SUCCESS,
                        token: responseObject.token,
                        user: responseObject.user_json,
                        tariffs: (responseObject.tariffs !== undefined)?responseObject.tariffs:[]
                      });

                      actions.getPayboxUrl()(dispatch,getState);
                    }
                  );
              }
            }
      },
      error => {
        dispatch({
          type: actionTypes.ACTION_LOGIN_FAILED,
          errorMessage: ERRORS.NO_INTERNET
        })
      }
  );
};

export const register = (data) => (dispatch, getState) => {
  if (getState().auth.isRegistering) {
    return Promise.resolve();
  }

  dispatch({
    type: actionTypes.ACTION_REGISTRATION_STARTED
  });

  authApi
    .register(data)
    .then(
      response => {
        if (response.status !== 201) {
          response
            .text()
            .then(
              value => {
                const errorObject = JSON.parse(value);
                notification.error({
                  message: 'Ошибка',
                  description: errorObject[0],
                });
                dispatch({
                  type: actionTypes.ACTION_REGISTRATION_FAILED,
                  errorMessage: ERRORS.NUMBER + response.status
                });
              }
            );
        } else {
          notification.success({
            message: 'Успешная регистрация',
            description: 'Ваша заявка принята в обработку',
          });
          dispatch({
            type: actionTypes.ACTION_REGISTRATION_SUCCESS,
          });
        }
      },
      error => {
        dispatch({
          type: actionTypes.ACTION_REGISTRATION_FAILED,
          errorMessage: ERRORS.NO_INTERNET
        })
      }
  );
};

export const forgetPassowrd = (data) => (dispatch, getState) => {

  dispatch({
    type: actionTypes.ACTION_FORGET_PASSWORD_STARTED
  });
  authApi
    .forgetPassowrd(data)
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
                  description: errorObject.error[0],
                });
                dispatch({
                  type: actionTypes.ACTION_FORGET_PASSWORD_FAILED,
                  errorMessage: ERRORS.NUMBER + response.status
                });
              }
            );
        } else {
          dispatch({
            type: actionTypes.ACTION_FORGET_PASSWORD_SUCCESS,
          });
        }
      },
      error => {
        dispatch({
          type: actionTypes.ACTION_FORGET_PASSWORD_FAILED,
          errorMessage: ERRORS.NO_INTERNET
        })
      }
  );
};

export const sendForgetPassowrd = (data) => (dispatch, getState) => {

  dispatch({
    type: actionTypes.ACTION_SEND_FORGET_PASSWORD_STARTED
  });
  authApi
    .sendForgetPassowrd(data)
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
                  description: errorObject.error[0],
                });
                dispatch({
                  type: actionTypes.ACTION_SEND_FORGET_PASSWORD_FAILED,
                  errorMessage: ERRORS.NUMBER + response.status
                });
              }
            );
        } else {
          dispatch({
            type: actionTypes.ACTION_SEND_FORGET_PASSWORD_SUCCESS,
          });
        }
      },
      error => {
        dispatch({
          type: actionTypes.ACTION_SEND_FORGET_PASSWORD_FAILED,
          errorMessage: ERRORS.NO_INTERNET
        })
      }
  );
};

export const createNewPassowrd = (data) => (dispatch, getState) => {

  dispatch({
    type: actionTypes.ACTION_CREATE_NEW_PASSWORD_STARTED
  });
  authApi
    .createNewPassowrd(data,getState().user.token)
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
                  description: errorObject.error[0],
                });
                dispatch({
                  type: actionTypes.ACTION_CREATE_NEW_PASSWORD_FAILED,
                  errorMessage: ERRORS.NUMBER + response.status
                });
              }
            );
        } else {
          dispatch({
            type: actionTypes.ACTION_CREATE_NEW_PASSWORD_SUCCESS,
          });
          notification.success({
            message: 'Успешная',
            description: "Пароль успешно изменен",
          });
        }
      },
      error => {
        dispatch({
          type: actionTypes.ACTION_CREATE_NEW_PASSWORD_FAILED,
          errorMessage: ERRORS.NO_INTERNET
        })
      }
  );
};


export const logout = () => (dispatch, getState) => {
  dispatch({
    type: actionTypes.ACTION_LOGGED_OUT,
  });

  localStorage.clear()
}
