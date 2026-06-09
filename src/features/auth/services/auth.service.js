import api from '@/services/api/axios.instance'
import { ENDPOINTS } from '@/constants/api.constants'

export const authService = {
  login:    (data)  => api.post(ENDPOINTS.LOGIN, data),
  register: (data)  => api.post(ENDPOINTS.REGISTER, data),
  logout:   (data)  => api.post(ENDPOINTS.LOGOUT, data), // pass { refreshToken }
  refresh:  (data)  => api.post(ENDPOINTS.REFRESH, data), // { refreshToken }
  getMe:    ()      => api.get(ENDPOINTS.ME),
  forgotPassword: (data) => api.post(ENDPOINTS.FORGOT_PASSWORD, data),
  resetPassword:  (data) => api.post(ENDPOINTS.RESET_PASSWORD, data),
}
