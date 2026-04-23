import api from '@/services/api/axios.instance'
import { ENDPOINTS } from '@/constants/api.constants'

export const authService = {
  login:    (data)  => api.post(ENDPOINTS.LOGIN, data),
  register: (data)  => api.post(ENDPOINTS.REGISTER, data),
  logout:   ()      => api.post(ENDPOINTS.LOGOUT),
  refresh:  ()      => api.post(ENDPOINTS.REFRESH),
  getMe:    ()      => api.get(ENDPOINTS.ME),
}
