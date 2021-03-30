import { selector } from 'recoil';

import { API_URL } from 'store/server';
import { request } from 'store/axios';

import * as parsers from './parsers';

export const NewsListSelector = selector({
  key: 'NewsListSelector',
  get: async () => {
    const url = `${API_URL}/news/?limit=${4}&offset=${1}`;
    const res = await request.get(url);
    /* error handler */
    // if (res.data.code) {
    //   return 'error';
    // }
    const newsList = await res.data.results.map(parsers.parseNews);
    return newsList;
  },
});

// export const NewsListByDateSelector = selector({
//   key: 'NewsListByDateSelector',
//   get: async () => {
//     const url = `${API_URL}/news/?date_from=${here}&date_to=${here}&limit=${here}&offset=${here}`;
//     const res = await request.get(url);
//     /* error handler */
//     // if (res.data.code) {
//     //   return 'error';
//     // }
//     const fitnesses = await res.data.fitness_centres.map(parsers.parseNews);
//     return fitnesses;
//   },
// });
