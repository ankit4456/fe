import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const searchItems = async (query) => {
  try {
    const response = await api.get('/search', {
      params: { q: query, limit: 10 },
    });
    return response.data;
  } catch (error) {
    console.error('Search error:', error);
    throw error;
  }
};

export const getItemById = async (id) => {
  try {
    const response = await api.get(`/search/item/${id}`);
    return response.data;
  } catch (error) {
    console.error('Get item error:', error);
    throw error;
  }
};

export default api;

