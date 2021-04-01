import { REST_API_URL } from '../constants/constants';
const getCompaniesUrl = REST_API_URL + "users/";
const getTradesmanListUrl = REST_API_URL + "tradesman/";
const getStorehouseListUrl = REST_API_URL + "storehouse/";
const getStorekeeperUrl = REST_API_URL + "storekeeper/";
const getStationListUrl = REST_API_URL + "station/";
const getCompanyTypesUrl = REST_API_URL + "company_type/";
const getDocumentTypesUrl = REST_API_URL + "document_types/";
const getCompanySegmentsUrl = REST_API_URL + "industry_segment/";
const getBankInfoUrl = REST_API_URL + "validators/IIK/";
const getStandardListUrl = REST_API_URL + "quality_standard/";
const getDeliveryUrl = REST_API_URL + "delivery_conditions/";
const getAllCompaniesUrl = REST_API_URL + "register/";

export const getCompanies = (token) => (
  fetch(
    getCompaniesUrl,
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

export const getTradesmanList = (token) => (
  fetch(
    getTradesmanListUrl,
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

export const getStorehouseList = (token) => (
  fetch(
    getStorehouseListUrl,
    {
      method: 'GET',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
    }
  )
);

export const getStationList = () => (
  fetch(
    getStationListUrl,
    {
      method: 'GET',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
    }
  )
);

export const getCompanyTypes = () => (
  fetch(
    getCompanyTypesUrl,
    {
      method: 'GET',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
    }
  )
);

export const getCompanySegments = () => (
  fetch(
    getCompanySegmentsUrl,
    {
      method: 'GET',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
    }
  )
);

export const getBankInfo = (data) => (
  fetch(
    getBankInfoUrl + '?iik=' + data.iik,
    {
      method: 'GET',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
    }
  )
);

export const getDocumentTypes = () => (
  fetch(
    getDocumentTypesUrl,
    {
      method: 'GET',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
    }
  )
);

export const getStandardList = () => (
  fetch(
    getStandardListUrl,
    {
      method: 'GET',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
    }
  )
);

export const getDeliveryCons = () => (
  fetch(
    getDeliveryUrl,
    {
      method: 'GET',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
    }
  )
);

export const getStorekeeper = (token, data) => {
  let url = (data === undefined)?getStorekeeperUrl:
        getStorekeeperUrl + "?region="+data.region_id+"&resource="+data.resource_id+"&metric_unit="+data.metric_unit_id
  return fetch(
    url,
    {
      method: 'GET',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": "JWT " + token,
      },
    }
  )
};

export const getAllCompanies = () => (
  fetch(
    getAllCompaniesUrl,
    {
      method: 'GET',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
    }
  )
);

export const getAllCompaniesByName = (data) => (
  fetch(
    getAllCompaniesUrl+"?company_name__icontains="+data.name,
    {
      method: 'GET',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
    }
  )
);
