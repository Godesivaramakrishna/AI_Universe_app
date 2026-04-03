import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { Eye, EyeOff, Loader2, Sparkles } from 'lucide-react'

export default function Login() {
  const { login, formatError } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const redirectTo = location.state?.from || '/dashboard'

  const [form, setForm] = useState({ email: '', password: '' })
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(form.email, form.password)
      navigate(redirectTo, { replace: true })
    } catch (err) {
      setError(formatError(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'hsl(260,87%,3%)',
        padding: '16px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Glow blobs */}
      <div style={{ position:'absolute', top:'-10%', right:'-10%', width:400, height:400, borderRadius:'50%', background:'radial-gradient(circle, rgba(124,58,237,0.18), transparent)', pointerEvents:'none' }} />
      <div style={{ position:'absolute', bottom:'-10%', left:'-10%', width:400, height:400, borderRadius:'50%', background:'radial-gradient(circle, rgba(79,70,229,0.15), transparent)', pointerEvents:'none' }} />

      <div style={{ width:'100%', maxWidth:400, position:'relative', zIndex:1 }}>
        {/* Logo */}
        <Link to="/" style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:10, textDecoration:'none', marginBottom:32 }}>
          <div style={{ width:36, height:36, borderRadius:10, background:'linear-gradient(135deg,#6366f1,#a855f7,#fcd34d)', display:'flex', alignItems:'center', justifyContent:'center' }}>
            <Sparkles size={18} color="#fff" />
          </div>
          <span style={{ fontFamily:'General Sans,sans-serif', fontWeight:700, fontSize:20, color:'hsl(40,6%,95%)' }}>AI Universe</span>
        </Link>

        <div className="glass-card" style={{ borderRadius:20, padding:'36px 32px' }}>
          <h1 style={{ fontFamily:'General Sans,sans-serif', fontWeight:700, fontSize:26, color:'hsl(40,6%,95%)', marginBottom:6, letterSpacing:'-0.02em' }}>
            Welcome back
          </h1>
          <p style={{ color:'rgba(245,240,230,0.5)', fontSize:14, marginBottom:24 }}>
            Sign in to explore AI Universe
          </p>

          {error && (
            <div style={{ marginBottom:16, padding:'12px 16px', borderRadius:12, background:'rgba(239,68,68,0.1)', border:'1px solid rgba(239,68,68,0.3)', color:'#f87171', fontSize:14 }}>
              {error}
            </div>
          )}

          <form onSubmit={submit} style={{ display:'flex', flexDirection:'column', gap:16 }}>
            <div>
              <label style={{ display:'block', fontSize:12, fontWeight:500, color:'rgba(245,240,230,0.6)', marginBottom:6 }}>Email</label>
              <input
                type="email" required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="you@example.com"
                className="ai-input"
                style={{ width:'100%', borderRadius:10, padding:'12px 14px', fontSize:14, boxSizing:'border-box' }}
              />
            </div>
            <div>
              <label style={{ display:'block', fontSize:12, fontWeight:500, color:'rgba(245,240,230,0.6)', marginBottom:6 }}>Password</label>
              <div style={{ position:'relative' }}>
                <input
                  type={showPw ? 'text' : 'password'} required
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="••••••••"
                  className="ai-input"
                  style={{ width:'100%', borderRadius:10, padding:'12px 40px 12px 14px', fontSize:14, boxSizing:'border-box' }}
                />
                <button type="button" onClick={() => setShowPw(!showPw)}
                  style={{ position:'absolute', right:12, top:'50%', transform:'translateY(-50%)', background:'none', border:'none', cursor:'pointer', color:'rgba(245,240,230,0.4)', display:'flex' }}>
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit" disabled={loading}
              style={{
                width:'100%', padding:'13px', borderRadius:12,
                background: loading ? 'rgba(124,58,237,0.5)' : 'linear-gradient(135deg,#7c3aed,#4f46e5)',
                border:'none', color:'#fff', fontWeight:600, fontSize:15,
                cursor: loading ? 'not-allowed' : 'pointer',
                display:'flex', alignItems:'center', justifyContent:'center', gap:8,
                transition:'all 0.2s',
              }}
            >
              {loading ? <><Loader2 size={16} style={{ animation:'spin 1s linear infinite' }} /> Signing in...</> : 'Sign In'}
            </button>
          </form>

          <p style={{ marginTop:24, textAlign:'center', fontSize:14, color:'rgba(245,240,230,0.5)' }}>
            Don't have an account?{' '}
            <Link to="/signup" style={{ color:'#a78bfa', fontWeight:600, textDecoration:'none' }}>Sign up</Link>
          </p>

          {/* Demo credentials hint */}
          <div style={{ marginTop:20, padding:'10px 14px', borderRadius:10, background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.07)', fontSize:12, color:'rgba(245,240,230,0.4)' }}>
            <strong style={{ color:'rgba(245,240,230,0.6)' }}>Admin:</strong> admin@aiuniverse.com / Admin@123
          </div>
        </div>
      </div>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}
