import axios from 'axios';

const api = axios.create({
  baseURL: 'bonusapi-production.up.railway.app'  , //'http://localhost:8080', // Remplacez par l'URL de votre API
  headers: {
    'Content-Type': 'application/json',
  },
});

let isRefreshing = false;
let refreshSubscribers = [];

function subscribeTokenRefresh(cb) {
  refreshSubscribers.push(cb);
}

function onRefreshed(token) {
  refreshSubscribers.map(cb => cb(token));
  refreshSubscribers = [];
}

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

api.interceptors.response.use((response) => {
  return response;
}, async (error) => {
  const originalRequest = error.config;
  if (error.response.status === 401 && !originalRequest._retry) {
    if (isRefreshing) {
      return new Promise((resolve) => {
        subscribeTokenRefresh((token) => {
          originalRequest.headers['Authorization'] = 'Bearer ' + token;
          resolve(api(originalRequest));
        });
      });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    const refreshToken = localStorage.getItem('refreshToken');
    try {
      const response = await api.post('/api/auth/refreshToken', { refreshToken });
      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        api.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.token;
        isRefreshing = false;
        onRefreshed(response.data.token);
        return api(originalRequest);
      }
    } catch (err) {
      console.error('Refresh token request failed:', err);
      isRefreshing = false;
      return Promise.reject(error);
    }
  }
  return Promise.reject(error);
});

export default api;
