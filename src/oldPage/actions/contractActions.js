import * as actionTypes from '../constants/actionTypes';
import * as contractApi from '../api/contractApi';
import * as tradeApi from '../api/tradeApi';

import { ERRORS } from '../constants/constants';
import { notification } from 'antd';

export const createContract = (data) => (dispatch, getState) => {
  dispatch({
    type: actionTypes.ACTION_CREATE_CONTRACT_STARTED
  });

  contractApi
    .createContract(data, getState().user.token)
    .then(
      response => {
        if (response.status !== 200) {
          dispatch({
						type: actionTypes.ACTION_CREATE_CONTRACT_FAILED,
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
									type: actionTypes.ACTION_CREATE_CONTRACT_SUCCEEDED,
									contract: responseObject
                });
              }
            );
        }
      },
      error => {
        dispatch({
					type: actionTypes.ACTION_CREATE_CONTRACT_FAILED,
					errorMessage: ERRORS.NO_INTERNET
				})
      },
    );
};

export const getContract = (data) => (dispatch, getState) => {
  dispatch({
    type: actionTypes.ACTION_GET_CONTRACT_STARTED
  });

  contractApi
    .getContract(data, getState().user.token)
    .then(
      response => {
        if (response.status !== 200) {
          dispatch({
						type: actionTypes.ACTION_GET_CONTRACT_FAILED,
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
                  type: actionTypes.ACTION_GET_CONTRACT_SUCCEEDED,
                  contract: responseObject
                });
              }
            );
        }
      },
      error => {
        dispatch({
					type: actionTypes.ACTION_GET_CONTRACT_FAILED,
					errorMessage: ERRORS.NO_INTERNET
				})
      },
    );
};

export const approveContract = (data) => (dispatch, getState) => {
  dispatch({
    type: actionTypes.ACTION_APPROVE_CONTRACT_STARTED
  });

  contractApi
    .approveContract(data, getState().user.token)
    .then(
      response => {
        if (response.status !== 200) {
          dispatch({
						type: actionTypes.ACTION_APPROVE_CONTRACT_FAILED,
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
									type: actionTypes.ACTION_APPROVE_CONTRACT_SUCCEEDED,
									contract: responseObject
                });
              }
            );
        }
      },
      error => {
        dispatch({
					type: actionTypes.ACTION_APPROVE_CONTRACT_FAILED,
					errorMessage: ERRORS.NO_INTERNET
				})
      },
    );
};

export const signContract = (data) => (dispatch, getState) => {
  dispatch({
    type: actionTypes.ACTION_SIGN_CONTRACT_STARTED
  });

  contractApi
    .signContract(data, getState().user.token)
    .then(
      response => {
        if (response.status !== 200) {
          dispatch({
						type: actionTypes.ACTION_SIGN_CONTRACT_FAILED,
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
									type: actionTypes.ACTION_SIGN_CONTRACT_SUCCEEDED,
									contract: responseObject
                });
              }
            );
        }
      },
      error => {
        dispatch({
					type: actionTypes.ACTION_SIGN_CONTRACT_FAILED,
					errorMessage: ERRORS.NO_INTERNET
				})
      },
    );
};

export const sendContractDoc = (data) => (dispatch, getState) => {
  dispatch({
    type: actionTypes.ACTION_SENDING_DOC_STARTED
  });

  contractApi
    .sendContractDoc(data, getState().user.token)
    .then(
      response => {
        if (response.status !== 201) {
          dispatch({
						type: actionTypes.ACTION_SENDING_DOC_FAILED,
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
                  type: actionTypes.ACTION_SENDING_DOC_SUCCEEDED,
                  uploadedDocument: responseObject
                });

                let sdata = {
                  contract: responseObject.contract
                };
                getContract(sdata)(dispatch, getState);
              }
            );
        }
      },
      error => {
        dispatch({
					type: actionTypes.ACTION_SENDING_DOC_FAILED,
					errorMessage: ERRORS.NO_INTERNET
				})
      },
    );
};

export const getContractList = (data,page) => (dispatch, getState) => {
  dispatch({
    type: actionTypes.ACTION_GET_CONTRACT_LIST_STARTED
  });
  contractApi
    .getContractList(data,page, getState().user.token)
    .then(
      response => {
        if (response.status !== 200) {
          dispatch({
						type: actionTypes.ACTION_GET_CONTRACT_LIST_FAILED,
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
                  type: actionTypes.ACTION_GET_CONTRACT_LIST_SUCCEEDED,
                  contract_list: responseObject
                });
              }
            );
        }
      },
      error => {
        dispatch({
					type: actionTypes.ACTION_GET_CONTRACT_LIST_FAILED,
					errorMessage: ERRORS.NO_INTERNET
				})
      },
    );
};

export const getContractListFilter = (data,page) => (dispatch, getState) => {
  dispatch({
    type: actionTypes.ACTION_GET_CONTRACT_LIST_FILTER_STARTED
  });
  contractApi
    .getContractListFilter(data,page, getState().user.token)
    .then(
      response => {
        if (response.status !== 200) {
          dispatch({
            type: actionTypes.ACTION_GET_CONTRACT_LIST_FILTER_FAILED,
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
                  type: actionTypes.ACTION_GET_CONTRACT_LIST_FILTER_SUCCEEDED,
                  contract_list: responseObject
                });
              }
            );
        }
      },
      error => {
        dispatch({
          type: actionTypes.ACTION_GET_CONTRACT_LIST_FILTER_FAILED,
          errorMessage: ERRORS.NO_INTERNET
        })
      },
    );
};

export const getContractListFilterTime = (data,page,time) => (dispatch, getState) => {
  dispatch({
    type: actionTypes.ACTION_GET_CONTRACT_LIST_FILTER_TIME_STARTED
  });
  contractApi
    .getContractListFilterTime(data,page,time,getState().user.token)
    .then(
      response => {
        if (response.status !== 200) {
          dispatch({
            type: actionTypes.ACTION_GET_CONTRACT_LIST_FILTER_TIME_FAILED,
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
                  type: actionTypes.ACTION_GET_CONTRACT_LIST_FILTER_TIME_SUCCEEDED,
                  contract_list: responseObject
                });
              }
            );
        }
      },
      error => {
        dispatch({
          type: actionTypes.ACTION_GET_CONTRACT_LIST_FILTER_TIME_FAILED,
          errorMessage: ERRORS.NO_INTERNET
        })
      },
    );
};

export const saveDocInfo = (data) => (dispatch, getState) => {
  dispatch({
    type: actionTypes.ACTION_SAVE_DOC_INFO_STARTED
  });

  contractApi
    .saveDocInfo(data, getState().user.token)
    .then(
      response => {
        if (response.status !== 200) {
          dispatch({
						type: actionTypes.ACTION_SAVE_DOC_INFO_FAILED,
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
                  type: actionTypes.ACTION_SAVE_DOC_INFO_SUCCEEDED,
                  contract: responseObject
                });
              }
            );
        }
      },
      error => {
        dispatch({
					type: actionTypes.ACTION_SAVE_DOC_INFO_FAILED,
					errorMessage: ERRORS.NO_INTERNET
				})
      },
    );
};

export const sendTradeSign = (data) => (dispatch, getState) => {
  dispatch({
    type: actionTypes.ACTION_SEND_SIGN_STARTED
  });
  tradeApi
    .sendTradeSign(data,getState().user.token)
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
                  type: actionTypes.ACTION_SEND_SIGN_FAILED,
                  errorMessage: ERRORS.NUMBER + response.status,
                })
              }
            );
          if(response.status === 401){
            logout()(dispatch,getState);
          }
        }
        else {
          notification.success({
            message: 'Успешно подписан',
          });
        
        }
      },
      error => {
        dispatch({
          type: actionTypes.ACTION_SEND_SIGN_FAILED,
          errorMessage: ERRORS.NO_INTERNET
        })
      },
    );
};

export const sendPreview = (data) => (dispatch, getState) => {
  dispatch({
    type: actionTypes.ACTION_SEND_PREVIEW_STARTED
  });
  contractApi
    .sendPreview(data,getState().user.token)
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
                  description: errorObject,
                });
                dispatch({
                  type: actionTypes.ACTION_SEND_PREVIEW_FAILED,
                  errorMessage: ERRORS.NUMBER + response.status,
                })
              }
            );
          if(response.status === 401){
            logout()(dispatch,getState);
          }
        }
        else {
          notification.success({
            message: 'Успешно сохранен отзыв',
          });
        
        }
      },
      error => {
        dispatch({
          type: actionTypes.ACTION_SEND_PREVIEW_FAILED,
          errorMessage: ERRORS.NO_INTERNET
        })
      },
    );
};

export const changeType = (value,data) => (dispatch, getState) => {
  console.log(data);
  var filterData = [];
  if(value === "none"){
    filterData = data;
  }else{
    filterData = data.filter(item => item.contract_type === value);
  }
  console.log(filterData);
  dispatch({
    type: actionTypes.ACTION_CHANGE_TYPE,
    contract_list: filterData,
    count: filterData.length
  });
};
export const logout = () => (dispatch, getState) => {
  dispatch({
    type: actionTypes.ACTION_LOGGED_OUT,
  });

  localStorage.clear()
}