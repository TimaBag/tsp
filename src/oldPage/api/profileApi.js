import { REST_API_URL, STD_HEADERS } from '../constants/constants';
const getProfileUrl = REST_API_URL + "profile/";
const getRegionsUrl = REST_API_URL + "regions/";
const getRolesUrl = REST_API_URL + "roles/";
const updateProfileUrl = REST_API_URL + "register/";
const getReviewUrl = REST_API_URL + "review/";
const sendGalleryUrl = REST_API_URL + "profile_file/";
const getPaymentUrl = REST_API_URL + "paybox/get_payment_url/";
const getPaymentReceiptUrl = REST_API_URL + "get_payment_receipt/"

export const getProfile = (companyID, token) => (
  fetch(
    getProfileUrl + "?user=" + companyID,
    {
      method: 'GET',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": "JWT " + token,
      },
      qs: {user: companyID},
    }
  )
);

export const getRegions = () => (
  fetch(
    getRegionsUrl,
    {
      method: 'GET',
      headers: STD_HEADERS,
    }
  )
);

export const getRoles = () => (
  fetch(
    getRolesUrl,
    {
      method: 'GET',
      headers: STD_HEADERS
    }
  )
);

export const updateProfile = (data) => (
  fetch(
    updateProfileUrl + data.company_id + "/",
    {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
      },
      body: data.profile
    }
  )
)

export const addBlackList = (data) => (
  fetch(
    updateProfileUrl + data.company_id + "/",
    {
      method: 'PATCH',
      headers: STD_HEADERS,
      body: JSON.stringify(data.list)
    }
  )
)

export const updateAvatar = (data) => (
  fetch(
    updateProfileUrl + data.company_id + "/",
    {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
      },
      body: data.avatar
    }
  )
)
export const deleteAvatar = (data) => (
  fetch(
    updateProfileUrl + data.company_id + "/",
    {
      method: 'PATCH',
      headers: STD_HEADERS,
      body: JSON.stringify(data.avatar)
    }
  )
)
export const getReview = (data, token) => (
  fetch(
    getReviewUrl+"?user="+data,
    {
      method: 'GET',
      headers: {
        "Accept": "application/json",
        "Authorization": "JWT " + token,
      },
    }
  )
);

export const getGallery = (data, token) => (
  fetch(
    sendGalleryUrl+"?company="+data,
    {
      method: 'GET',
      headers: {
        "Accept": "application/json",
        "Authorization": "JWT " + token,
      },
    }
  )
);

export const sendGallery = (data, token) => (
  fetch(
    sendGalleryUrl,
    {
      method: 'POST',
      headers: {
        "Accept": "application/json",
        "Authorization": "JWT " + token,
      },
      body: data
    }
  )
);

export const getPayboxUrl = (token) => (
  fetch(
    getPaymentUrl,
    {
      method: 'GET',
      headers: {
        "Accept": "application/json",
        "Authorization": "JWT " + token,
      },
    }
  )
);

export const getPayboxIdUrl = (id) => (
  fetch(
    getPaymentUrl+"?temp_id="+id,
    {
      method: 'GET',
      headers: {
        "Accept": "application/json",
      },
    }
  )
);

export const getPaymentReceipt = () => (
  fetch(
    "http://tradehouse.kz/api/rest-api/get_payment_receipt/",
    {
      method: 'GET',
      headers: {
        "Accept": "application/json",
      },
    }
  )
);