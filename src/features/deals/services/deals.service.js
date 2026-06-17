import api from '@/services/api/axios.instance';

/**
 * Fetches all deals based on search, filters, sorting, and pagination
 * @param {Object} params 
 * @param {string} params.search - Search string for productName, upcCode, or store
 * @param {Object} params.filters - Filters like status, stores, rewardTypes, dateRange
 * @param {Object} params.sort - Sorting options { field, order }
 * @param {Object} params.pagination - Pagination options { page, limit }
 * @returns {Promise<Object>} The API response containing data and pagination
 */
export const fetchDeals = async ({ search, filters, sort, pagination }) => {
  const response = await api.post('/deals/all-deals', {
    filters,
    sort,
    pagination,
  }, {
    params: search ? { search } : undefined,
  });
  return response.data;
};

/**
 * Fetches a single deal by id
 * @param {string} id - The Deal ID
 * @returns {Promise<Object>} The API response containing the deal details
 */
export const fetchDealById = async (id) => {
  const response = await api.get(`/deals/${id}`);
  return response.data;
};

/**
 * Updates an existing deal (multipart/form-data)
 * @param {string} id - The Deal ID
 * @param {FormData} formData - The formData containing updated fields
 * @returns {Promise<Object>} The API response
 */
export const updateDeal = async (id, formData) => {
  const response = await api.put(`/deals/update-deal/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

/**
 * Creates a new deal (multipart/form-data)
 * @param {FormData} formData - The formData containing deal fields
 * @returns {Promise<Object>} The API response
 */
export const createDeal = async (formData) => {
  const response = await api.post('/deals/create-deal', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

/**
 * Deletes a deal permanently
 * @param {string} id - The Deal ID
 * @returns {Promise<Object>} The API response
 */
export const deleteDeal = async (id) => {
  const response = await api.delete(`/deals/delete-deal/${id}`);
  return response.data;
};
