import axios from 'axios'

// Use Vite proxy: all /api calls go to localhost:8000 automatically
const api = axios.create({
  baseURL: '/api',
  withCredentials: true, // send cookies (httpOnly JWT)
  headers: { 'Content-Type': 'application/json' },
})

// Auto-refresh if 401 (token expired)
api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const original = err.config
    if (err.response?.status === 401 && !original._retry && !original.url?.includes('/auth/')) {
      original._retry = true
      try {
        await axios.post('/api/auth/refresh', {}, { withCredentials: true })
        return api(original)
      } catch {
        // refresh failed — let caller handle
      }
    }
    return Promise.reject(err)
  }
)

export default api
