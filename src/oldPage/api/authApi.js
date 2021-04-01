import { SERVER_URL, STD_HEADERS, REST_API_URL } from '../constants/constants';
// import qs from 'qs'

const loginUrl = SERVER_URL + "api/token-auth/";
const registerUrl = REST_API_URL + "register/";
const forgetUrl = REST_API_URL + "password_reset/send_mail/";
const sendForgetUrl = REST_API_URL + "password_reset/confirm/";

export const login = (data) => (
  fetch(
    loginUrl,
    {
      method: 'POST',
      headers: STD_HEADERS,
      body: JSON.stringify({
        username: data.username,
        password: data.password
      })
    }
  )
)

export const register = (data) => (
  fetch(
    registerUrl,
    {
      method: 'POST',
      headers: {
        'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
      },
      body: data
    }
  )
)

export const forgetPassowrd = (data) => (
  fetch(
    forgetUrl,
    {
      method: 'POST',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    }
  )
)

export const sendForgetPassowrd = (data) => (
  fetch(
    sendForgetUrl,
    {
      method: 'POST',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    }
  )
)

export const createNewPassowrd = (data,token) => (
  fetch(
    sendForgetUrl,
    {
      method: 'POST',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": "JWT " + token
      },
      body: JSON.stringify(data)
    }
  )
)