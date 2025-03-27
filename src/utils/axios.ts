import axios from 'axios';

const api = axios.create({
  baseURL: 'http://100.26.111.172/ilog/',
  withCredentials: true,
});

export default api;