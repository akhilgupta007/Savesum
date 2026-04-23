import { useQuery } from '@tanstack/react-query'
import { userService } from '../services/user.service'

export const USERS_KEY = ['users']

export const useUsers = (params = {}) =>
  useQuery({
    queryKey: [...USERS_KEY, params],
    queryFn: () => userService.getAll(params).then((r) => r.data),
  })
