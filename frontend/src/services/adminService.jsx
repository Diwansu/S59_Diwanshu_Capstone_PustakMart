import axios from 'axios';

const API_URL = '/api/admin'; // Adjust this to your actual API endpoint

const getDashboardStats = async () => {
  const response = await axios.get(`${API_URL}/dashboard-stats`);
  return response.data;
};

const adminService = {
  getDashboardStats,
};

export default adminService;
