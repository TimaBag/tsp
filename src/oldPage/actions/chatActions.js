import { notification } from 'antd';

import * as actionTypes from '../constants/actionTypes';
import * as chatApi from '../api/chatApi';

import { ERRORS } from '../constants/constants'

export const getMyChats = () => (dispatch, getState) => {

  dispatch({
    type: actionTypes.ACTION_GET_MY_CHATS_STARTED
  });

  chatApi
    .getMyChats(getState().user.token)
    .then(
      response => {
        if (response.status !== 200) {
          dispatch({
						type: actionTypes.ACTION_GET_MY_CHATS_FAILED,
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
									type: actionTypes.ACTION_GET_MY_CHATS_SUCCEEDED,
									myChatsList: responseObject
								})
              }
            );
        }
      },
      error => {
        dispatch({
					type: actionTypes.ACTION_GET_MY_CHATS_FAILED,
					errorMessage: ERRORS.NO_INTERNET
				})
      },
    );
};

export const getCountChats = () => (dispatch, getState) => {

  dispatch({
    type: actionTypes.ACTION_GET_COUNT_CHATS_STARTED
  });

  chatApi
    .getCountChats(getState().user.token)
    .then(
      response => {
        if (response.status !== 200) {
          dispatch({
            type: actionTypes.ACTION_GET_COUNT_CHATS_FAILED,
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
                  type: actionTypes.ACTION_GET_COUNT_CHATS_SUCCEEDED,
                  countChat: responseObject
                })
              }
            );
        }
      },
      error => {
        dispatch({
          type: actionTypes.ACTION_GET_COUNT_CHATS_FAILED,
          errorMessage: ERRORS.NO_INTERNET
        })
      },
    );
};

export const getChatItem = (params) => (dispatch, getState) => {

  dispatch({
    type: actionTypes.ACTION_GET_CHAT_STARTED
  });

  chatApi
    .getChatItem(getState().user.token, params)
    .then(
      response => {
        if (response.status !== 200) {
          dispatch({
						type: actionTypes.ACTION_GET_CHAT_FAILED,
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
									type: actionTypes.ACTION_GET_CHAT_SUCCEEDED,
									chatItem: responseObject
								})
              }
            );
        }
      },
      error => {
        dispatch({
					type: actionTypes.ACTION_GET_CHAT_FAILED,
					errorMessage: ERRORS.NO_INTERNET
				})
      },
    );
};

export const sendMessage = (data) => (dispatch, getState) => {

  dispatch({
    type: actionTypes.ACTION_SEND_MESSAGE_STARTED
  });

  chatApi
    .sendMessage(getState().user.token, data)
    .then(
      response => {
        if (response.status !== 201) {
          dispatch({
						type: actionTypes.ACTION_SEND_MESSAGE_FAILED,
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
									type: actionTypes.ACTION_SEND_MESSAGE_SUCCEEDED,
									sentMessage: responseObject
								});
                notification.success({
                  message: 'Сообщение успешно отправлено',
                });
                let paramsData = {
                  user_id: data.to_user
                }
                getChatItem(paramsData)(dispatch,getState);
              }
            );
        }
      },
      error => {
        dispatch({
					type: actionTypes.ACTION_SEND_MESSAGE_FAILED,
					errorMessage: ERRORS.NO_INTERNET
				})
      },
    );
};

export const readMessage = (data,is_read) => (dispatch, getState) => {

  dispatch({
    type: actionTypes.ACTION_READ_MESSAGE_STARTED
  });

  chatApi
    .readMessage(getState().user.token, data,is_read)
    .then(
      response => {
        if (response.status !== 201) {
          dispatch({
            type: actionTypes.ACTION_READ_MESSAGE_FAILED,
            errorMessage: ERRORS.NUMBER + response.status,
          })
          if(response.status === 401){
            logout()(dispatch,getState);
          }
        } else {
          dispatch({
            type: actionTypes.ACTION_READ_MESSAGE_SUCCEEDED,
          });
        }
      },
      error => {
        dispatch({
          type: actionTypes.ACTION_READ_MESSAGE_FAILED,
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