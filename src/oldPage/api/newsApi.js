import { REST_API_URL, STD_HEADERS } from '../constants/constants';
const getNewsUrl = REST_API_URL + "news/";

export const getNews = (token,page) => (
  fetch(
    getNewsUrl+"?limit=7&offset="+page,
    {
      method: 'GET',
      headers: STD_HEADERS,
    }
  )
);

export const getNewsByDate = (token,data) => (
  fetch(
    getNewsUrl+"?date_from="+data.date_from + "&date_to="+data.date_to+"&limit=7&offset="+data.page,
    {
      method: 'GET',
      headers: STD_HEADERS,
    }
  )
);
