import { REST_API_URL } from '../constants/constants';
const getExpeditorUrl = REST_API_URL + "expeditor_tariff/";

export const getExpeditor = (token) => (
  fetch(
    getExpeditorUrl,
    {
      method: 'GET',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": "JWT " + token,
      },
    }
  )
);
export const addExpeditorTariff = (data, token) => (
  fetch(
    getExpeditorUrl,
    {
      method: 'POST',
      headers: {
        'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
        "Authorization": "JWT " + token,
      },
      body: data
    }
  )
);