import axios from 'axios';

const baseImageUrl = 'https://image.tmdb.org/t/p';

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
});

export const setHeaderToken = (token) => {
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const requestGet = async (endpoint, params = {}) => {
  const { data } = await api.get(endpoint, { params });
  return data;
};

export const getImageUrl = (path, size = 'w300') => {
  if(!path) return 'https://via.placeholder.com/300x450';
  return `${baseImageUrl}/${size}${path}`;
}

export const requestPost = async (endpoint, body) => {
  const { data } = await api.post(endpoint, body);
  return data;
};

export default api;
