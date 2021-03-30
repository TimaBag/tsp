import axios from 'axios';

export const request = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});

export const multiPartRequest = axios.create({
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

const accessToken = localStorage.getItem('token');
if (accessToken) {
  request.defaults.headers.Authorization = `Token ${accessToken}`;
  multiPartRequest.defaults.headers.Authorization = `Token ${accessToken}`;
}
