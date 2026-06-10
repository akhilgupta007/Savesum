import api from '@/services/api/axios.instance';
import { ENDPOINTS } from '@/constants/api.constants';

export const settingsService = {
  getPrivacyPolicy: () => api.get(ENDPOINTS.SETTINGS_PRIVACY_POLICY),
  updatePrivacyPolicy: (data) => api.put(ENDPOINTS.SETTINGS_PRIVACY_POLICY, data),
  getTerms: () => api.get(ENDPOINTS.SETTINGS_TERMS),
  updateTerms: (data) => api.put(ENDPOINTS.SETTINGS_TERMS, data),
};
