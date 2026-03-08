import axios from 'axios';

const admin = axios.create({
  baseURL: import.meta.env.VITE_ADMIN_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export default admin;
