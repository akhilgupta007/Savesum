export const ROUTES = {
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  USERS: '/users',
  USER_DETAIL: (id = ':id') => `/users/${id}`,
}
