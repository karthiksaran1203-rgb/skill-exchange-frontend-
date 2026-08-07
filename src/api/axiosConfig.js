import axios from 'axios';

const API = axios.create({
  // baseURL: import.meta.env.VITE_API_URL ||"http://localhost:5000/api"});
 baseURL: import.meta.env.VITE_API_URL ||"https://skill-exchange-backend-1-ob1a.onrender.com/api"});
// console.log(baseURL);

// Request interceptor to add token
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default API;