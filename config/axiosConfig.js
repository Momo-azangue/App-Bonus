import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8080', // URL de votre API backend
});

instance.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;