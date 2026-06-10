import api from '@/services/api/axios.instance';
import { ENDPOINTS } from '@/constants/api.constants';

export const profileService = {
  getUserDetails: () => api.get(ENDPOINTS.USER_DETAILS),
  updateUserDetails: (formData) => {
    return api.put(ENDPOINTS.USER_DETAILS, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  changePassword: (data) => api.put(ENDPOINTS.CHANGE_PASSWORD, data),
};
