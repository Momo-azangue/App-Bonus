import axios from 'axios';

// Configurez axios pour inclure le token JWT dans chaque requête
const api = axios.create({
  baseURL: 'http://localhost:8080', // Remplacez par l'URL de votre API
  headers: {
    'Content-Type': 'application/json',
  },
});

// Ajouter un intercepteur pour inclure le token JWT dans les en-têtes de toutes les requêtes
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
