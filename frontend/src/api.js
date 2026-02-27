import axios from 'axios';

// Create axios instance with base URL from .env
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export default api;