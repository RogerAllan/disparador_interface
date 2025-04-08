
import axios from 'axios';

const API_BASE_URL =  'http://localhost:8080/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Health Check
export const checkHealth = async () => {
  return api.get('/health');
};

export const getImages = async (level, page = 1, perPage = 12) => {
  return api.get('/images', {
    params: { level, page, per_page: perPage }
  });
};

export const uploadImage = async (formData) => {
  return api.post('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

export const getUsers = async () => {
  return api.get('/users');
};

export const sendBroadcast = async (message, level) => {
  return api.post('/broadcast', { message, level });
};

export const getAllImages = async (formData, level) => {
  return api.get('/images/list', { formData, level });
};
