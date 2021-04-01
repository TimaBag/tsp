import * as actionTypes from '../constants/actionTypes';
import * as newsApi from '../api/newsApi';

import { ERRORS } from '../constants/constants'

export const getNews = (page) => (dispatch, getState) => {
  dispatch({
    type: actionTypes.ACTION_GET_NEWS_STARTED
  });

  newsApi
    .getNews(getState().user.token,page)
    .then(
      response => {
        if (response.status !== 200) {
          dispatch({
						type: actionTypes.ACTION_GET_NEWS_FAILED,
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
									type: actionTypes.ACTION_GET_NEWS_SUCCEEDED,
									news: responseObject
								})
              }
            );
        }
      },
      error => {
        dispatch({
					type: actionTypes.ACTION_GET_NEWS_FAILED,
					errorMessage: ERRORS.NO_INTERNET
				})
      },
    );
};

export const getNewsByDate = (data) => (dispatch, getState) => {
  dispatch({
    type: actionTypes.ACTION_GET_NEWS_BY_DATE_STARTED
  });

  newsApi
    .getNewsByDate(getState().user.token,data)
    .then(
      response => {
        if (response.status !== 200) {
          dispatch({
            type: actionTypes.ACTION_GET_NEWS_BY_DATE_FAILED,
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
                  type: actionTypes.ACTION_GET_NEWS_BY_DATE_SUCCEEDED,
                  news: responseObject
                })
              }
            );
        }
      },
      error => {
        dispatch({
          type: actionTypes.ACTION_GET_NEWS_BY_DATE_FAILED,
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