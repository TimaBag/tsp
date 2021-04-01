import { REST_API_URL } from '../constants/constants';
const demandStorehouseCardUrl = REST_API_URL + "demand_storehouse_card/"
const addTariffUrl = REST_API_URL + "storekeeper_tariff/"

export const addDemandStorehouseCard = (data, token) => (
  fetch(
    demandStorehouseCardUrl,
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

export const getDemandStorehouseCard = (token) => (
  fetch(
    demandStorehouseCardUrl,
    {
      method: 'GET',
      headers: {
        'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
        "Content-Type": "application/json",
        "Authorization": "JWT " + token,
      },
    }
  )
);

export const getTariff = (data, token) => (
  fetch(
    addTariffUrl+"?user="+data,
    {
      method: 'GET',
      headers: {
        'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
        "Content-Type": "application/json",
        "Authorization": "JWT " + token,
      },
    }
  )
);

export const addTariff = (data, token) => (
  fetch(
    addTariffUrl,
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

export const editTariff = (data, token) => (
  fetch(
    addTariffUrl+data.tariff_id+'/',
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

export const deleteTariff = (data, token) => (
  fetch(
    addTariffUrl+data+'/',
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
