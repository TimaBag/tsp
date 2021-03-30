const env = process.env.REACT_APP_ENV;

export const API_URL =
  env === 'production'
    ? // prod
      'http://194.4.58.101/api/rest-api'
    : env === 'development'
    ? // dev
      'http://194.4.58.101/api/rest-api'
    : // local
      'http://194.4.58.101/api/rest-api';
