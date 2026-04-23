import api from '@/services/api/axios.instance'
import { ENDPOINTS } from '@/constants/api.constants'

export const userService = {
  getAll: (params) => api.get(ENDPOINTS.USERS, { params }),
  getById: (id) => api.get(ENDPOINTS.USER_BY_ID(id)),
  create: (data) => api.post(ENDPOINTS.USERS, data),
  update: (id, data) => api.put(ENDPOINTS.USER_BY_ID(id), data),
  remove: (id) => api.delete(ENDPOINTS.USER_BY_ID(id)),
  updateRole: (id, role) => api.patch(ENDPOINTS.USER_BY_ID(id) + '/role', { role }),
}
