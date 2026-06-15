import api from '@/services/api/axios.instance';

export const fetchDashboardStats = async () => {
  const response = await api.get('/dashboard/stats');
  return response.data;
};
