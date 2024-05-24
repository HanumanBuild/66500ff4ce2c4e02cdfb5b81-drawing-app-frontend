import axios from 'axios';

const API_URL = process.env.REACT_APP_DRAWING_APP_BACKEND_URL;

export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/api/auth/login`, { email, password });
  if (response.data.success) {
    localStorage.setItem('token', response.data.data.token);
  }
  return response.data;
};

export const signup = async (name, email, password) => {
  const response = await axios.post(`${API_URL}/api/auth/signup`, { name, email, password });
  if (response.data.success) {
    localStorage.setItem('token', response.data.data.token);
  }
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('token');
};

export const getToken = () => {
  return localStorage.getItem('token');
};