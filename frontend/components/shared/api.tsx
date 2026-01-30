import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/api';

// Create axios instance
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth service object
export const authService = {
  // Register new user
  register: async (userData: {
    email: string;
    first_name: string;
    last_name: string;
    password: string;
    password2: string;
  }) => {
    const response = await api.post('/register/', userData);
    if (response.status === 201) {
     // Redirect to OTP verification page
      window.location.href = '/verify-otp';
      return response.data;
    }
    throw new Error(response.data.message || 'Registration failed');
  },

  // Login user
  login: async (credentials: { email: string; password: string }) => {
    const response = await api.post('/login/', credentials);
    if (response.data.access_token) {
      localStorage.setItem('access_token', response.data.access_token);
      localStorage.setItem('refresh_token', response.data.refresh_token);
      return response.data;
    }
    throw new Error(response.data.message || 'Login failed');
  },

  // Verify OTP
  verifyOTP: async (otpData: { otp_code: string }) => {
    const response = await api.post('/verify/', otpData);
    return response.data;
  },

  // Logout user
  logout: () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('access_token');
  },

  // Get current auth token
  getToken: () => {
    return localStorage.getItem('access_token');
  }
};

export default api;