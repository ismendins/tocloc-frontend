import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8080',
});

apiClient.interceptors.request.use(
  (config) => {
    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);

      if (parsedUser.isAdmin) {
        config.headers['Admin-Access'] = 'true';
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 403) {
      alert('Access denied. Admin privileges are required.');
    } else if (error.response && error.response.status === 401) {
      alert('Authentication required. Please log in.');
    }
    return Promise.reject(error);
  }
);

export default apiClient;
