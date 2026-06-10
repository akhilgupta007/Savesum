export const ENDPOINTS = {
  // Auth
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  LOGOUT: '/auth/logout',
  REFRESH: '/auth/refresh',
  ME: '/auth/me',
  FORGOT_PASSWORD: '/auth/forgot-password',
  VERIFY_OTP: '/auth/verify-otp',
  RESET_PASSWORD: '/auth/reset-password',
  // Users
  USERS: '/users',
  USER_BY_ID: (id) => `/users/${id}`,

  // Settings
  SETTINGS_PRIVACY_POLICY: '/settings/privacy-policy',
  SETTINGS_TERMS: '/settings/terms',

  // Profile
  USER_DETAILS: '/user/user-details',
  CHANGE_PASSWORD: '/user/change-password',
}
