import { REST_API_URL, STD_HEADERS } from '../constants/constants';
const offersUrl = REST_API_URL + "offer_card/";

export const getOffers = (token) => (
  fetch(
    offersUrl,
    {
      method: 'GET',
      headers: STD_HEADERS,
    }
  )
);

export const addOffer = (data, token) => (
  fetch(
    offersUrl,
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

export const editOffer = (data,id, token) => (
  fetch(
    offersUrl+id+'/',
    {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
        "Authorization": "JWT " + token,
      },
      body: data
    }
  )
);

export const deleteOffer = (data, token) => (
  fetch(
    offersUrl+'/'+data+'/',
    {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
        "Content-Type": "application/json",
        "Authorization": "JWT " + token,
      },
    }
  )
);

export const getOffersCompany = (token,data) => (
  fetch(
    offersUrl+'?company='+data+'&show=true',
    {
      method: 'GET',
      headers: STD_HEADERS,
    }
  )
);