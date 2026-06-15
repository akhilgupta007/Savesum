import axios from 'axios'
import { API_URL } from '@/constants/app.constants'
import { store } from '@/store'
import { setCredentials, clearCredentials } from '@/features/auth/store/authSlice'

const api = axios.create({
  baseURL: API_URL,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
})

// Variables for token refresh queuing
let isRefreshing = false
let failedQueue = []

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve(token)
    }
  })
  failedQueue = []
}

// Request Interceptor: Inject the Access Token
api.interceptors.request.use(
  (config) => {
    const state = store.getState()
    const token = state.auth?.accessToken
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response Interceptor: Handle 401 Unauthorized
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // Queue the request while waiting for the token to refresh
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`
            return api(originalRequest)
          })
          .catch((err) => Promise.reject(err))
      }

      originalRequest._retry = true
      isRefreshing = true

      try {
        const refreshToken = localStorage.getItem('refreshToken')
        
        if (!refreshToken) {
          throw new Error('No refresh token available')
        }

        // Call refresh endpoint directly with axios to bypass interceptors
        const refreshResponse = await axios.post(`${API_URL}/auth/refresh`, {
          refreshToken,
        })

        const newAccessToken = refreshResponse.data.data.accessToken
        const newRefreshToken = refreshResponse.data.data.refreshToken

        // Update LocalStorage and Redux
        localStorage.setItem('refreshToken', newRefreshToken)
        
        // We do not have the full user object here, but we can update the tokens.
        // It's better to fetch user info or keep existing user object from Redux state
        const currentUser = store.getState().auth?.user
        store.dispatch(
          setCredentials({
            user: currentUser,
            accessToken: newAccessToken,
          })
        )

        // Process queue and retry the original request
        processQueue(null, newAccessToken)
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
        
        return api(originalRequest)
      } catch (err) {
        processQueue(err, null)

        // Refresh failed — wipe local session.
        // Do NOT navigate here; PrivateRoute reads isAuthenticated from Redux
        // and will redirect to /login automatically on the next render.
        store.dispatch(clearCredentials())
        localStorage.removeItem('refreshToken')

        return Promise.reject(err)
      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(error)
  }
)

export default api
