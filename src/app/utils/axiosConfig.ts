// utils/axiosConfig.ts

import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000', // URL base da sua API
  headers: {
    'Content-Type': 'application/json',
    // Adicione outros headers se necessário
  },
  timeout: 10000, // Timeout opcional, define o tempo máximo para as requisições
});

// Interceptores para tratamento de erros ou adicionar tokens de autenticação, se necessário
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    console.error('Erro na requisição Axios:', error.response || error.message);
    return Promise.reject(error);
  }
);

export default axiosInstance;
