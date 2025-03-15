import api from './api';

const authService = {
  login: async (credentials) => {
    const response = await api.post('/users/sign-in', credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },

  register: async (userData) => {
    const response = await api.post('/users/sign-up', userData);
    return response.data;
  },

  getUserInfo: async () => {
    const response = await api.get('/users/get-user-information');
    return response.data;
  },

  updateProfile: async (userData) => {
    const response = await api.put('/users/update-address', userData);
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
  }
};

export default authService;
