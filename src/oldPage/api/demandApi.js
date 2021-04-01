import { REST_API_URL, STD_HEADERS } from '../constants/constants';
const demandsUrl = REST_API_URL + "demand_card/";

export const getDemands = (token) => (
  fetch(
    demandsUrl,
    {
      method: 'GET',
      headers: STD_HEADERS
    }
  )
);

export const addDemand = (data, token) => (
  fetch(
    demandsUrl,
    {
      method: 'POST',
      headers: {
        'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
        "Content-Type": "application/json",
        "Authorization": "JWT " + token,
      },
      body: JSON.stringify(data)
    }
  )
);

export const editDemand = (data, token) => (
  fetch(
    demandsUrl+data.demand_id+'/',
    {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
        "Content-Type": "application/json",
        "Authorization": "JWT " + token,
      },
      body: JSON.stringify(data)
    }
  )
);

export const deleteDemand = (data, token) => (
  fetch(
    demandsUrl+data+'/',
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

export const getDemandsCompany = (token,data) => (
  fetch(
    demandsUrl+'?company='+data+'&show=true',
    {
      method: 'GET',
      headers: STD_HEADERS
    }
  )
);