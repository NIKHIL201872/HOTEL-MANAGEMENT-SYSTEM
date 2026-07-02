import axios from 'axios';
import { useAuthStore } from '../store/authStore';

// json-server (optionally with json-server-auth) is assumed to run here.
// Adjust the port/baseURL to match how your teammate has it configured.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001',
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export async function loginRequest({ email, password, role }) {
  const { data } = await api.post('/login', { email, password, role });
  return data;
}

export async function signupRequest({ name, phone, email, password, role }) {
  const { data } = await api.post('/register', {
    name,
    phone,
    email,
    password,
    role,
  });
  return data;
}

export default api;