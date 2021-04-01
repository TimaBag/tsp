import { REST_API_URL, STD_HEADERS } from '../constants/constants';
const getCategoriesUrl = REST_API_URL + "category/";
const getProducersUrl = REST_API_URL + "production_place/";
const getResourcesUrl = REST_API_URL + "resource/";
const getMeasureListUrl = REST_API_URL + "metric_units/";
const getExpeditorListUrl = REST_API_URL + "expeditor/";
const getGraphUrl = REST_API_URL + "graph_generator/";
const getGraphSegmentUrl = REST_API_URL + "segmentation_generator/";

export const getResources = (data) => {
  let url = (data === undefined)?getResourcesUrl:
            getResourcesUrl + "?region="+data.region_id+"&type="+data.type
  return fetch(url,
    {
      method: 'GET',
      headers: STD_HEADERS,
    }
  )
};

export const getCategories = () => (
  fetch(
    getCategoriesUrl,
    {
      method: 'GET',
      headers: STD_HEADERS,
    }
  )
);

export const getProducers = () => (
  fetch(
    getProducersUrl,
    {
      method: 'GET',
      headers: STD_HEADERS,
    }
  )
);

export const getMeasureList = (data) => {
  let url = (data === undefined)?getMeasureListUrl:
            getMeasureListUrl + "?region="+data.region_id+"&resource="+data.resource_id+"&type="+data.type
  return fetch(
    url,
    {
      method: 'GET',
      headers: STD_HEADERS,
    }
  )
};

export const getExpeditorList = (token, data) => {
  let url = (data === undefined)?getExpeditorListUrl:
        getExpeditorListUrl + "?region="+data.region_id+"&resource="+data.resource_id+"&metric_unit="+data.metric_unit_id
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

export const getGraph = (resource_id,metric_unit_id) => (
  fetch(
    getGraphUrl+"?resource_id="+resource_id+"&metric_unit_id="+metric_unit_id,
    {
      method: 'GET',
      headers: STD_HEADERS,
    }
  )
);

export const getGraphSegmentation = () => (
  fetch(
    getGraphSegmentUrl,
    {
      method: 'GET',
      headers: STD_HEADERS,
    }
  )
);


export const getGraphDate = (resource_id,metric_unit_id,data) => (
  fetch(
    getGraphUrl+"?start_date="+data.start_date+"&end_date="+data.end_date+"&resource_id="+resource_id+"&metric_unit_id="+metric_unit_id,
    {
      method: 'GET',
      headers: STD_HEADERS,
    }
  )
);

