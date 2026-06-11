import api from '@/services/api/axios.instance';

/**
 * Fetches all stores
 * @returns {Promise<Object>} The API response containing stores array
 */
export const fetchStores = async () => {
  const response = await api.get('/stores');
  return response.data;
};
