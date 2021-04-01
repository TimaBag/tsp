import { notification } from 'antd';

import * as actionTypes from '../constants/actionTypes';
import * as offerApi from '../api/offerApi';
import * as demandApi from '../api/demandApi';

import { ERRORS } from '../constants/constants'

export const getOffers = () => (dispatch, getState) => {
  dispatch({
    type: actionTypes.ACTION_GET_OFFERS_STARTED
  });

  offerApi
    .getOffers(getState().user.token)
    .then(
      response => {
        if (response.status !== 200) {
          dispatch({
						type: actionTypes.ACTION_GET_OFFERS_FAILED,
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
									type: actionTypes.ACTION_GET_OFFERS_SUCCEEDED,
									offers: responseObject
								})
              }
            );
        }
      },
      error => {
        dispatch({
					type: actionTypes.ACTION_GET_OFFERS_FAILED,
					errorMessage: ERRORS.NO_INTERNET
				})
      },
    );
};

export const getDemands = () => (dispatch, getState) => {
  dispatch({
    type: actionTypes.ACTION_GET_DEMANDS_STARTED
  });

  demandApi
    .getDemands(getState().user.token)
    .then(
      response => {
        if (response.status !== 200) {
          dispatch({
						type: actionTypes.ACTION_GET_DEMANDS_FAILED,
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
									type: actionTypes.ACTION_GET_DEMANDS_SUCCEEDED,
									demands: responseObject
								})
              }
            );
        }
      },
      error => {
        dispatch({
					type: actionTypes.ACTION_GET_DEMANDS_FAILED,
					errorMessage: ERRORS.NO_INTERNET
				})
      },
    );
};

export const addDemand = (data) => (dispatch, getState) => {
  dispatch({
    type: actionTypes.ACTION_ADD_DEMAND_STARTED
  });

  demandApi
    .addDemand(data, getState().user.token)
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
                  type: actionTypes.ACTION_ADD_DEMAND_FAILED,
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
                  message: 'Заявка добавлена'
                });
								dispatch({
									type: actionTypes.ACTION_ADD_DEMAND_SUCCEEDED,
									new_demand: responseObject
								})
              }
            );
        }
      },
      error => {
        dispatch({
					type: actionTypes.ACTION_ADD_DEMAND_FAILED,
					errorMessage: ERRORS.NO_INTERNET
				})
      },
    );
};

export const addOffer = (data) => (dispatch, getState) => {

  dispatch({
    type: actionTypes.ACTION_ADD_OFFER_STARTED
  });

  offerApi
    .addOffer(data, getState().user.token)
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
                  type: actionTypes.ACTION_ADD_OFFER_FAILED,
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
                  message: 'Предложение добавлено'
                });
								dispatch({
									type: actionTypes.ACTION_ADD_OFFER_SUCCEEDED,
									new_offer: responseObject
								})
              }
            );
        }
      },
      error => {
        dispatch({
					type: actionTypes.ACTION_ADD_OFFER_FAILED,
					errorMessage: ERRORS.NO_INTERNET
				})
      },
    );
};

export const deleteOffer = (data) => (dispatch, getState) => {

  dispatch({
    type: actionTypes.ACTION_DELETE_OFFER_STARTED
  });

  offerApi
    .deleteOffer(data, getState().user.token)
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
                  type: actionTypes.ACTION_DELETE_OFFER_FAILED,
                  errorMessage: ERRORS.NUMBER + response.status
                });
              }
            );
        }
          if(response.status === 204){
            notification.success({
              message: 'Предложение удалено',
          });
          if(response.status === 401){
            logout()(dispatch,getState);
          }
          getOffersCompany(getState().user.user.user)(dispatch,getState);
        }
      },
      error => {
        dispatch({
          type: actionTypes.ACTION_DELETE_OFFER_FAILED,
          errorMessage: ERRORS.NO_INTERNET
        })
      },
    );
};

export const deleteDemand = (data) => (dispatch, getState) => {

  dispatch({
    type: actionTypes.ACTION_DELETE_DEMAND_STARTED
  });

  demandApi
    .deleteDemand(data, getState().user.token)
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
                  type: actionTypes.ACTION_DELETE_DEMAND_FAILED,
                  errorMessage: ERRORS.NUMBER + response.status
                });
              }
            );
        }
        if(response.status === 204){
          notification.success({
            message: 'Заявка удалено',
          });
          getDemandsCompany(getState().user.user.user)(dispatch,getState);
        }
        if(response.status === 401){
          logout()(dispatch,getState);
        }
      },
      error => {
        dispatch({
          type: actionTypes.ACTION_DELETE_DEMAND_FAILED,
          errorMessage: ERRORS.NO_INTERNET
        })
      },
    );
};

export const editDemand = (data) => (dispatch, getState) => {
  dispatch({
    type: actionTypes.ACTION_EDIT_DEMAND_STARTED
  });

  demandApi
    .editDemand(data, getState().user.token)
    .then(
      response => {
        if (response.status !== 200) {
          response
            .text()
            .then(
              value => {
                const errorObject = JSON.parse(value);
                notification.error({
                  message: 'Ошибка при обновлении заявки',
                  description: errorObject[0],
                });
                dispatch({
                  type: actionTypes.ACTION_EDIT_DEMAND_FAILED,
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
                  message: 'Заявка обновлена'
                });
                getDemandsCompany(getState().user.user.user)(dispatch,getState);
              }
            );
        }
      },
      error => {
        dispatch({
          type: actionTypes.ACTION_EDIT_DEMAND_FAILED,
          errorMessage: ERRORS.NO_INTERNET
        })
      },
    );
};

export const editOffer = (data,id) => (dispatch, getState) => {
  dispatch({
    type: actionTypes.ACTION_EDIT_OFFER_STARTED
  });

  offerApi
    .editOffer(data,id, getState().user.token)
    .then(
      response => {
        if (response.status !== 200) {
          response
            .text()
            .then(
              value => {
                const errorObject = JSON.parse(value);
                notification.error({
                  message: 'Ошибка при обновлении',
                  description: errorObject[0],
                });
                dispatch({
                  type: actionTypes.ACTION_EDIT_OFFER_FAILED,
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
                  message: 'Предложение обновлено'
                });
                getOffersCompany(getState().user.user.user)(dispatch,getState);
              }
            );
        }
      },
      error => {
        dispatch({
          type: actionTypes.ACTION_EDIT_OFFER_FAILED,
          errorMessage: ERRORS.NO_INTERNET
        })
      },
    );
};

export const filterData = () => (dispatch, getState) => {
  dispatch({
    type: actionTypes.ACTION_GET_DEMANDS_STARTED
  });

  demandApi
    .getDemands(getState().user.token)
    .then(
      response => {
        if (response.status !== 200) {
          dispatch({
						type: actionTypes.ACTION_GET_DEMANDS_FAILED,
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
									type: actionTypes.ACTION_GET_DEMANDS_SUCCEEDED,
									demands: responseObject
								})
              }
            );
        }
      },
      error => {
        dispatch({
					type: actionTypes.ACTION_GET_DEMANDS_FAILED,
					errorMessage: ERRORS.NO_INTERNET
				})
      },
    );
};

export const getOffersCompany = (data) => (dispatch, getState) => {
  dispatch({
    type: actionTypes.ACTION_GET_OFFER_COMPANY_STARTED
  });

  offerApi
    .getOffersCompany(getState().user.token,data)
    .then(
      response => {
        if (response.status !== 200) {
          dispatch({
            type: actionTypes.ACTION_GET_OFFER_COMPANY_FAILED,
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
                  type: actionTypes.ACTION_GET_OFFER_COMPANY_SUCCEEDED,
                  offers_company: responseObject
                })
              }
            );
        }
      },
      error => {
        dispatch({
          type: actionTypes.ACTION_GET_OFFER_COMPANY_FAILED,
          errorMessage: ERRORS.NO_INTERNET
        })
      },
    );
};

export const getDemandsCompany = (data) => (dispatch, getState) => {
  dispatch({
    type: actionTypes.ACTION_GET_DEMAND_COMPANY_STARTED
  });

  demandApi
    .getDemandsCompany(getState().user.token,data)
    .then(
      response => {
        if (response.status !== 200) {
          dispatch({
            type: actionTypes.ACTION_GET_DEMAND_COMPANY_FAILED,
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
                  type: actionTypes.ACTION_GET_DEMAND_COMPANY_SUCCEEDED,
                  demands_company: responseObject
                })
              }
            );
        }
      },
      error => {
        dispatch({
          type: actionTypes.ACTION_GET_DEMAND_COMPANY_FAILED,
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