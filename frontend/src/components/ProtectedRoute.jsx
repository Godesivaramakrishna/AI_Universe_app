import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'

/**
 * Wrap any route to require authentication.
 * Redirects to /login with the intended path saved in `?from=` so
 * the user is sent back after signing in.
 */
export default function ProtectedRoute({ children }) {
  const { user } = useAuth()
  const location = useLocation()

  // user === undefined means auth is still loading (checking cookie)
  if (user === undefined) {
    return (
      <div style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center',
        justifyContent: 'center', background: 'hsl(260,87%,3%)',
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
          <div style={{
            width: 40, height: 40, borderRadius: '50%',
            border: '3px solid rgba(124,58,237,0.3)',
            borderTopColor: '#a855f7',
            animation: 'spin 0.8s linear infinite',
          }} />
          <span style={{ color: 'rgba(245,240,230,0.4)', fontSize: 14 }}>Loading…</span>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    )
  }

  // Not logged in → redirect to login
  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />
  }

  return children
}
