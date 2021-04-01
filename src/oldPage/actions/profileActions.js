import { notification } from 'antd';

import * as actionTypes from '../constants/actionTypes';
import * as profileApi from '../api/profileApi';

import { ERRORS } from '../constants/constants'

export const getCompanyProfile = (companyID) => (dispatch, getState) => {
  dispatch({
    type: actionTypes.ACTION_GET_PROFILE_STARTED
  });

  profileApi
    .getProfile(companyID, getState().user.token)
    .then(
      response => {
        if (response.status !== 200) {
          dispatch({
						type: actionTypes.ACTION_GET_PROFILE_FAILED,
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
									type: actionTypes.ACTION_GET_PROFILE_SUCCEEDED,
									company_profile: responseObject[0]
								})
              }
            );
        }
      },
      error => {
        dispatch({
					type: actionTypes.ACTION_GET_PROFILE_FAILED,
					errorMessage: ERRORS.NO_INTERNET
				})
      },
    );
};

export const getRegions = () => (dispatch, getState) => {
  dispatch({
    type: actionTypes.ACTION_GET_REGIONS_STARTED
  });

  profileApi
    .getRegions()
    .then(
      response => {
        if (response.status !== 200) {
          dispatch({
						type: actionTypes.ACTION_GET_REGIONS_FAILED,
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
									type: actionTypes.ACTION_GET_REGIONS_SUCCEEDED,
									regions: responseObject
								})
              }
            );
        }
      },
      error => {
        dispatch({
					type: actionTypes.ACTION_GET_REGIONS_FAILED,
					errorMessage: ERRORS.NO_INTERNET
				})
      },
    );
};

export const getRoles = () => (dispatch, getState) => {
  dispatch({
    type: actionTypes.ACTION_GET_ROLES_STARTED
  });

  profileApi
    .getRoles()
    .then(
      response => {
        if (response.status !== 200) {
          dispatch({
						type: actionTypes.ACTION_GET_ROLES_FAILED,
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
									type: actionTypes.ACTION_GET_ROLES_SUCCEEDED,
									roles: responseObject
								})
              }
            );
        }
      },
      error => {
        dispatch({
					type: actionTypes.ACTION_GET_ROLES_FAILED,
					errorMessage: ERRORS.NO_INTERNET
				})
      },
    );
};

export const updateProfile = (data) => (dispatch, getState) => {

  dispatch({
    type: actionTypes.ACTION_UPDATE_PROFILE_STARTED
  });

  profileApi
    .updateProfile(data)
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
                  description: errorObject[0],
                });
                dispatch({
                  type: actionTypes.ACTION_UPDATE_PROFILE_FAILED,
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
                  message: 'Данные успешно обновлены',
                  description: '',
                });
                dispatch({
                  type: actionTypes.ACTION_UPDATE_PROFILE_SUCCEEDED,
                  profile: responseObject
                });
              }
            );
          
        }
      },
      error => {
        dispatch({
          type: actionTypes.ACTION_UPDATE_PROFILE_FAILED,
          errorMessage: ERRORS.NO_INTERNET
        })
      }
  );
};

export const addBlackList = (data) => (dispatch, getState) => {
  dispatch({
    type: actionTypes.ACTION_ADD_BLACK_LIST_STARTED
  });

  profileApi
    .addBlackList(data)
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
                  description: errorObject[0],
                });
                dispatch({
                  type: actionTypes.ACTION_ADD_BLACK_LIST_FAILED,
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
                  message: 'Черный список обновлено',
                  description: '',
                });
                dispatch({
                  type: actionTypes.ACTION_ADD_BLACK_LIST_SUCCEEDED,
                  profile: responseObject
                });
              }
            );
          
        }
      },
      error => {
        dispatch({
          type: actionTypes.ACTION_ADD_BLACK_LIST_FAILED,
          errorMessage: ERRORS.NO_INTERNET
        })
      }
  );
};

export const updateAvatar = (data) => (dispatch, getState) => {

  dispatch({
    type: actionTypes.ACTION_UPDATE_AVATAR_STARTED
  });

  profileApi
    .updateAvatar(data)
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
                  description: errorObject[0],
                });
                dispatch({
                  type: actionTypes.ACTION_UPDATE_AVATAR_FAILED,
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
                  message: 'Данные успешно обновлены',
                  description: '',
                });
                dispatch({
                  type: actionTypes.ACTION_UPDATE_AVATAR_SUCCEEDED,
                  profile: responseObject
                });
              }
            );
          getCompanyProfile(data.profile_id)(dispatch,getState);
        }
      },
      error => {
        dispatch({
          type: actionTypes.ACTION_UPDATE_AVATAR_FAILED,
          errorMessage: ERRORS.NO_INTERNET
        })
      }
  );
};

export const deleteAvatar = (data) => (dispatch, getState) => {

  dispatch({
    type: actionTypes.ACTION_DELETE_AVATAR_STARTED
  });

  profileApi
    .deleteAvatar(data)
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
                  description: errorObject[0],
                });
                dispatch({
                  type: actionTypes.ACTION_DELETE_AVATAR_FAILED,
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
                  message: 'Данные успешно обновлены',
                  description: '',
                });
                dispatch({
                  type: actionTypes.ACTION_DELETE_AVATAR_SUCCEEDED,
                  profile: responseObject
                });
              }
            );
          getCompanyProfile(data.profile_id)(dispatch,getState);
        }
      },
      error => {
        dispatch({
          type: actionTypes.ACTION_DELETE_AVATAR_FAILED,
          errorMessage: ERRORS.NO_INTERNET
        })
      }
  );
};

export const getReview = (companyID) => (dispatch, getState) => {
  dispatch({
    type: actionTypes.ACTION_GET_PREVIEW_STARTED
  });

  profileApi
    .getReview(companyID, getState().user.token)
    .then(
      response => {
        if (response.status !== 200) {
          dispatch({
            type: actionTypes.ACTION_GET_PREVIEW_FAILED,
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
                  type: actionTypes.ACTION_GET_PREVIEW_SUCCEEDED,
                  review: responseObject
                })
              }
            );
        }
      },
      error => {
        dispatch({
          type: actionTypes.ACTION_GET_PREVIEW_FAILED,
          errorMessage: ERRORS.NO_INTERNET
        })
      },
    );
};

export const getGallery = (data) => (dispatch, getState) => {
  dispatch({
    type: actionTypes.ACTION_GET_GALLERY_STARTED
  });

  profileApi
    .getGallery(data, getState().user.token)
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
                  type: actionTypes.ACTION_GET_GALLERY_FAILED,
                  errorMessage: ERRORS.NUMBER + response.status,
                })
              }
            );
          if(response.status === 401){
            logout()(dispatch,getState);
          }
        }else {
          response
            .text()
            .then(
              value => {
                const responseObject = JSON.parse(value);
                dispatch({
                  type: actionTypes.ACTION_GET_GALLERY_SUCCESS,
                  profile_file: responseObject
                });
              }
            );
          
        }
      },
      error => {
        dispatch({
          type: actionTypes.ACTION_GET_GALLERY_FAILED,
          errorMessage: ERRORS.NO_INTERNET
        })
      },
    );
};

export const sendGallery = (data) => (dispatch, getState) => {
  dispatch({
    type: actionTypes.ACTION_SEND_GALLERY_STARTED
  });

  profileApi
    .sendGallery(data, getState().user.token)
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
                  type: actionTypes.ACTION_SEND_GALLERY_FAILED,
                  errorMessage: ERRORS.NUMBER + response.status,
                })
              }
            );
          if(response.status === 401){
            logout()(dispatch,getState);
          }
        }else{
          notification.success({
            message: 'Данные успешно добавлено',
            description: '',
          });
        }
      },
      error => {
        dispatch({
          type: actionTypes.ACTION_SEND_GALLERY_FAILED,
          errorMessage: ERRORS.NO_INTERNET
        })
      },
    );
};

export const getPayboxUrl = () => (dispatch, getState) => {
  dispatch({
    type: actionTypes.ACTION_GET_PAYBOX_URL_STARTED
  });

  profileApi
    .getPayboxUrl(getState().user.token)
    .then(
      response => {
        if (response.status !== 200) {
          dispatch({
            type: actionTypes.ACTION_GET_PAYBOX_URL_FAILED,
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
                  type: actionTypes.ACTION_GET_PAYBOX_URL_SUCCEEDED,
                  payboxUrl: responseObject
                })
              }
            );
        }
      },
      error => {
        dispatch({
          type: actionTypes.ACTION_GET_PAYBOX_URL_FAILED,
          errorMessage: ERRORS.NO_INTERNET
        })
      },
    );
};

export const getPayboxIdUrl = (id) => (dispatch, getState) => {
  dispatch({
    type: actionTypes.ACTION_GET_PAYBOX_URL_STARTED
  });
  console.log(id);
  profileApi
    .getPayboxIdUrl(id)
    .then(
      response => {
        if (response.status !== 200) {
          dispatch({
            type: actionTypes.ACTION_GET_PAYBOX_URL_FAILED,
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
                  type: actionTypes.ACTION_GET_PAYBOX_URL_SUCCEEDED,
                  payboxUrl: responseObject
                })
              }
            );
        }
      },
      error => {
        dispatch({
          type: actionTypes.ACTION_GET_PAYBOX_URL_FAILED,
          errorMessage: ERRORS.NO_INTERNET
        })
      },
    );
};

export const getPaymentReceipt = () => (dispatch, getState) => {
  dispatch({
    type: actionTypes.ACTION_GET_PAYMENT_RECEIPT_STARTED
  });
  profileApi
    .getPaymentReceipt()
    .then(
      response => {
        if (response.status !== 200) {
          dispatch({
            type: actionTypes.ACTION_GET_PAYMENT_RECEIPT_FAILED,
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
                  type: actionTypes.ACTION_GET_PAYMENT_RECEIPT_SUCCEEDED,
                })
              }
            );
        }
      },
      error => {
        dispatch({
          type: actionTypes.ACTION_GET_PAYMENT_RECEIPT_FAILED,
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