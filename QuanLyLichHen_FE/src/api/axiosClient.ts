import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'https://localhost:7157', 
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`; 
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error("Token hết hạn hoặc không hợp lệ!");
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      window.location.href = '/login'; // Chuyển hướng cứng về login
    }
    return Promise.reject(error);
  }
);

export default axiosClient;