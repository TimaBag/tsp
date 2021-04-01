import * as actionTypes from '../constants/actionTypes';
import * as aboutApi from '../api/aboutApi';
import { notification } from 'antd';

import { ERRORS } from '../constants/constants'

export const feedback = (data) => (dispatch, getState) => {
  dispatch({
    type: actionTypes.ACTION_SEND_FEEDBACK_STARTED
  });

  aboutApi
    .feedback(data)
    .then(
      response => {
        if (response.status !== 200) {
          dispatch({
						type: actionTypes.ACTION_SEND_FEEDBACK_FAILED,
						errorMessage: ERRORS.NUMBER + response.status,
					})
          if(response.status === 201){
            notification.success({
              message: 'Успешно отправлено',
              description: "Ответ придет на вашу почту",
            });
          }else{
            notification.error({
              message: 'Ошибка',
              description: "Не удалось отправить",
            });
          }
        }
      },
      error => {
        dispatch({
					type: actionTypes.ACTION_SEND_FEEDBACK_FAILED,
					errorMessage: ERRORS.NO_INTERNET
				})
      },
    );
};