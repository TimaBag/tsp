import * as actionTypes from '../constants/actionTypes';
import * as companyApi from '../api/companyApi';

import { ERRORS } from '../constants/constants'

export const getCompanies = () => (dispatch, getState) => {
  dispatch({
    type: actionTypes.ACTION_GET_COMPANIES_STARTED
  });

  companyApi
    .getCompanies(getState().user.token)
    .then(
      response => {
        if (response.status !== 200) {
          dispatch({
						type: actionTypes.ACTION_GET_COMPANIES_FAILED,
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
									type: actionTypes.ACTION_GET_COMPANIES_SUCCEEDED,
									companyList: responseObject
								})
              }
            );
        }
      },
      error => {
        dispatch({
					type: actionTypes.ACTION_GET_COMPANIES_FAILED,
					errorMessage: ERRORS.NO_INTERNET
				})
      },
    );
};

export const getTradesmanList = () => (dispatch, getState) => {
  dispatch({
    type: actionTypes.ACTION_GET_TRADESMAN_LIST_STARTED
  });

  companyApi
    .getTradesmanList(getState().user.token)
    .then(
      response => {
        if (response.status !== 200) {
          dispatch({
						type: actionTypes.ACTION_GET_TRADESMAN_LIST_FAILED,
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
									type: actionTypes.ACTION_GET_TRADESMAN_LIST_SUCCEEDED,
									tradesmanList: responseObject
								})
              }
            );
        }
      },
      error => {
        dispatch({
					type: actionTypes.ACTION_GET_TRADESMAN_LIST_FAILED,
					errorMessage: ERRORS.NO_INTERNET
				})
      },
    );
};

export const getStorehouseList = () => (dispatch, getState) => {
  dispatch({
    type: actionTypes.ACTION_GET_STOREHOUSE_LIST_STARTED
  });

  companyApi
    .getStorehouseList(getState().user.token)
    .then(
      response => {
        if (response.status !== 200) {
          dispatch({
						type: actionTypes.ACTION_GET_STOREHOUSE_LIST_FAILED,
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
									type: actionTypes.ACTION_GET_STOREHOUSE_LIST_SUCCEEDED,
									storehouseList: responseObject
								})
              }
            );
        }
      },
      error => {
        dispatch({
					type: actionTypes.ACTION_GET_STOREHOUSE_LIST_FAILED,
					errorMessage: ERRORS.NO_INTERNET
				})
      },
    );
};

export const getStationList = () => (dispatch, getState) => {
  dispatch({
    type: actionTypes.ACTION_GET_STATION_LIST_STARTED
  });

  companyApi
    .getStationList()
    .then(
      response => {
        if (response.status !== 200) {
          dispatch({
						type: actionTypes.ACTION_GET_STATION_LIST_FAILED,
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
									type: actionTypes.ACTION_GET_STATION_LIST_SUCCEEDED,
									stationList: responseObject
								})
              }
            );
        }
      },
      error => {
        dispatch({
					type: actionTypes.ACTION_GET_STATION_LIST_FAILED,
					errorMessage: ERRORS.NO_INTERNET
				})
      },
    );
};

export const getBankInfoByIIK = (data) => (dispatch, getState) => {
  dispatch({
    type: actionTypes.ACTION_GET_BANK_INFO_STARTED
  });

  companyApi
    .getBankInfo(data)
    .then(
      response => {
        if (response.status !== 200) {
          dispatch({
						type: actionTypes.ACTION_GET_BANK_INFO_FAILED,
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
									type: actionTypes.ACTION_GET_BANK_INFO_SUCCEEDED,
									bankInfo: responseObject
								})
              }
            );
        }
      },
      error => {
        dispatch({
					type: actionTypes.ACTION_GET_BANK_INFO_FAILED,
					errorMessage: ERRORS.NO_INTERNET
				})
      },
    );
};

export const getCompanyTypes = () => (dispatch, getState) => {
  dispatch({
    type: actionTypes.ACTION_GET_COMPANY_TYPES_STARTED
  });

  companyApi
    .getCompanyTypes()
    .then(
      response => {
        if (response.status !== 200) {
          dispatch({
						type: actionTypes.ACTION_GET_COMPANY_TYPES_FAILED,
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
									type: actionTypes.ACTION_GET_COMPANY_TYPES_SUCCEEDED,
									companyTypes: responseObject
								})
              }
            );
        }
      },
      error => {
        dispatch({
					type: actionTypes.ACTION_GET_COMPANY_TYPES_FAILED,
					errorMessage: ERRORS.NO_INTERNET
				})
      },
    );
};

export const getCompanySegments = () => (dispatch, getState) => {
  dispatch({
    type: actionTypes.ACTION_GET_COMPANY_SEGMENT_STARTED
  });

  companyApi
    .getCompanySegments()
    .then(
      response => {
        if (response.status !== 200) {
          dispatch({
						type: actionTypes.ACTION_GET_COMPANY_SEGMENT_FAILED,
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
									type: actionTypes.ACTION_GET_COMPANY_SEGMENT_SUCCEEDED,
									industrySegments: responseObject
								})
              }
            );
        }
      },
      error => {
        dispatch({
					type: actionTypes.ACTION_GET_COMPANY_SEGMENT_FAILED,
					errorMessage: ERRORS.NO_INTERNET
				})
      },
    );
};

export const getDocumentTypes = () => (dispatch, getState) => {
  dispatch({
    type: actionTypes.ACTION_GET_DOCUMENT_TYPES_STARTED
  });

  companyApi
    .getDocumentTypes()
    .then(
      response => {
        if (response.status !== 200) {
          dispatch({
						type: actionTypes.ACTION_GET_DOCUMENT_TYPES_FAILED,
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
									type: actionTypes.ACTION_GET_DOCUMENT_TYPES_SUCCEEDED,
									documentTypes: responseObject
								})
              }
            );
        }
      },
      error => {
        dispatch({
					type: actionTypes.ACTION_GET_DOCUMENT_TYPES_FAILED,
					errorMessage: ERRORS.NO_INTERNET
				})
      },
    );
};

export const getStandardList = () => (dispatch, getState) => {
  dispatch({
    type: actionTypes.ACTION_GET_STANDART_LIST_STARTED
  });

  companyApi
    .getStandardList()
    .then(
      response => {
        if (response.status !== 200) {
          dispatch({
						type: actionTypes.ACTION_GET_STANDART_LIST_FAILED,
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
									type: actionTypes.ACTION_GET_STANDART_LIST_SUCCEEDED,
									standardList: responseObject
								})
              }
            );
        }
      },
      error => {
        dispatch({
					type: actionTypes.ACTION_GET_STANDART_LIST_FAILED,
					errorMessage: ERRORS.NO_INTERNET
				})
      },
    );
};

export const getDeliveryCons = () => (dispatch, getState) => {
  dispatch({
    type: actionTypes.ACTION_GET_DELIVERY_CONS_STARTED
  });

  companyApi
    .getDeliveryCons()
    .then(
      response => {
        if (response.status !== 200) {
          dispatch({
						type: actionTypes.ACTION_GET_DELIVERY_CONS_FAILED,
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
									type: actionTypes.ACTION_GET_DELIVERY_CONS_SUCCEEDED,
									deliveryCons: responseObject
								})
              }
            );
        }
      },
      error => {
        dispatch({
					type: actionTypes.ACTION_GET_DELIVERY_CONS_FAILED,
					errorMessage: ERRORS.NO_INTERNET
				})
      },
    );
};

export const getStorekeeper = (data) => (dispatch, getState) => {
  dispatch({
    type: actionTypes.ACTION_GET_STOREKEEPER_STARTED
  });

  companyApi
    .getStorekeeper(getState().user.token, data)
    .then(
      response => {
        if (response.status !== 200) {
          dispatch({
            type: actionTypes.ACTION_GET_STOREKEEPER_FAILED,
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
                  type: actionTypes.ACTION_GET_STOREKEEPER_SUCCEEDED,
                  storekeeper: responseObject
                })
              }
            );
        }
      },
      error => {
        dispatch({
          type: actionTypes.ACTION_GET_STOREKEEPER_FAILED,
          errorMessage: ERRORS.NO_INTERNET
        })
      },
    );
};

export const getAllCompanies = () => (dispatch, getState) => {
  dispatch({
    type: actionTypes.ACTION_GET_ALL_COMPANIES_STARTED
  });

  companyApi
    .getAllCompanies()
    .then(
      response => {
        if (response.status !== 200) {
          dispatch({
            type: actionTypes.ACTION_GET_ALL_COMPANIES_FAILED,
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
                  type: actionTypes.ACTION_GET_ALL_COMPANIES_SUCCEEDED,
                  companyAllList: responseObject
                })
              }
            );
        }
      },
      error => {
        dispatch({
          type: actionTypes.ACTION_GET_ALL_COMPANIES_FAILED,
          errorMessage: ERRORS.NO_INTERNET
        })
      },
    );
};

export const getAllCompaniesByName = (data) => (dispatch, getState) => {
  dispatch({
    type: actionTypes.ACTION_GET_ALL_COMPANIES_STARTED
  });

  companyApi
    .getAllCompaniesByName(data)
    .then(
      response => {
        if (response.status !== 200) {
          dispatch({
            type: actionTypes.ACTION_GET_ALL_COMPANIES_FAILED,
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
                  type: actionTypes.ACTION_GET_ALL_COMPANIES_SUCCEEDED,
                  companyAllList: responseObject
                })
              }
            );
        }
      },
      error => {
        dispatch({
          type: actionTypes.ACTION_GET_ALL_COMPANIES_FAILED,
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