import api from '@/services/api/axios.instance';

export const fetchStats = async () => {
  const response = await api.get('/analytics/stats');
  return response.data.data;
};
