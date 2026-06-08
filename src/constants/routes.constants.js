export const ROUTES = {
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  DASHBOARD: '/dashboard',
  DEALS: '/deals',
  CREATE_DEAL: '/deals/create',
  ANALYTICS: '/analytics',
  HELP: '/help',
  SETTINGS: '/settings',
  USERS: '/users',
  USER_DETAIL: (id = ':id') => `/users/${id}`,
}
