import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
});

export const setHeaderToken = (token) => {
  api.defaults.headers.common.Authorization = token;
};

export const requestGet = async (endpoint, params = {}) => {
  const { data } = await api.get(endpoint, { params });
  return data;
};

export const requestPost = async (endpoint, body) => {
  const { data } = await api.post(endpoint, body);
  return data;
};

export default api;
