import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080',
});

// Request interceptor to handle admin-only access
apiClient.interceptors.request.use(
  (config) => {
    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);

      // Check if the user is an admin
      if (parsedUser.isAdmin) {
        config.headers['Admin-Access'] = 'true'; // Custom header to mark admin requests
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle admin-specific access denial
    if (error.response && error.response.status === 403) {
      alert('Access denied. Admin privileges are required.');
    } else if (error.response && error.response.status === 401) {
      alert('Authentication required. Please log in.');
    }
    return Promise.reject(error);
  }
);

export default apiClient;
