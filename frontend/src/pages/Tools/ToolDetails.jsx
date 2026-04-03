import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { useAuth } from '@/context/AuthContext'
import api from '@/lib/api'
import { Star, ExternalLink, Key, Check, ArrowLeft, Bookmark, BookmarkCheck, Loader2 } from 'lucide-react'

export default function ToolDetails() {
  const { id: slug } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [tool, setTool] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saved, setSaved] = useState(false)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    setLoading(true)
    api.get(`/tools/${slug}`)
      .then((r) => {
        setTool(r.data)
        setSaved(user?.saved_tools?.includes(slug) || false)
      })
      .catch(() => navigate('/tools'))
      .finally(() => setLoading(false))
  }, [slug])

  const toggleSave = async () => {
    if (!user) { navigate('/login'); return }
    setSaving(true)
    try {
      if (saved) {
        await api.delete(`/tools/${slug}/save`)
        setSaved(false)
      } else {
        await api.post(`/tools/${slug}/save`)
        setSaved(true)
      }
    } catch (e) {}
    finally { setSaving(false) }
  }

  if (loading) return (
    <div style={{ minHeight:'100vh', background:'hsl(260,87%,3%)', display:'flex', alignItems:'center', justifyContent:'center' }}>
      <Loader2 size={36} color="#a855f7" style={{ animation:'spin 1s linear infinite' }} />
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  )
  if (!tool) return null

  return (
    <div style={{ minHeight:'100vh', background:'hsl(260,87%,3%)' }}>
      <Navbar />
      <div style={{ maxWidth:900, margin:'0 auto', padding:'100px 24px 64px' }}>
        {/* Back */}
        <button onClick={() => navigate(-1)} style={{ display:'flex', alignItems:'center', gap:8, background:'none', border:'none', cursor:'pointer', color:'rgba(245,240,230,0.5)', fontSize:14, marginBottom:32, transition:'color 0.2s' }}
          onMouseEnter={(e) => e.currentTarget.style.color='hsl(40,6%,95%)'}
          onMouseLeave={(e) => e.currentTarget.style.color='rgba(245,240,230,0.5)'}
        >
          <ArrowLeft size={16} /> Back
        </button>

        {/* Hero Card */}
        <div className="glass-card" style={{ borderRadius:20, padding:32, marginBottom:20 }}>
          <div style={{ display:'flex', flexWrap:'wrap', gap:20, alignItems:'flex-start' }}>
            <div style={{ width:64, height:64, borderRadius:16, background: tool.icon_color || '#6366f1', display:'flex', alignItems:'center', justifyContent:'center', fontSize:28, fontWeight:700, color:'#fff', flexShrink:0 }}>
              {tool.icon || tool.name?.[0]}
            </div>
            <div style={{ flex:1, minWidth:200 }}>
              <div style={{ display:'flex', flexWrap:'wrap', alignItems:'center', gap:10, marginBottom:6 }}>
                <h1 style={{ fontFamily:'General Sans,sans-serif', fontWeight:700, fontSize:30, color:'hsl(40,6%,95%)', letterSpacing:'-0.02em', margin:0 }}>{tool.name}</h1>
                {tool.is_api && (
                  <span style={{ display:'flex', alignItems:'center', gap:4, padding:'4px 10px', borderRadius:9999, fontSize:11, fontWeight:600, background:'rgba(124,58,237,0.15)', border:'1px solid rgba(124,58,237,0.3)', color:'#c4b5fd' }}>
                    <Key size={10} /> API Available
                  </span>
                )}
                {tool.pricing?.free_tier && (
                  <span style={{ padding:'4px 10px', borderRadius:9999, fontSize:11, fontWeight:600, background:'rgba(16,185,129,0.15)', border:'1px solid rgba(16,185,129,0.3)', color:'#34d399' }}>Free Tier</span>
                )}
              </div>
              <p style={{ color:'rgba(245,240,230,0.5)', fontSize:13, marginBottom:10 }}>
                {tool.provider} · {tool.category} · Since {tool.launch_year}
              </p>
              <p style={{ color:'rgba(245,240,230,0.8)', lineHeight:1.6, fontSize:15 }}>{tool.description}</p>
              <div style={{ display:'flex', gap:20, marginTop:14, flexWrap:'wrap' }}>
                <div style={{ display:'flex', alignItems:'center', gap:6 }}>
                  <Star size={14} fill="#fbbf24" color="#fbbf24" />
                  <span style={{ fontSize:14, fontWeight:600, color:'hsl(40,6%,95%)' }}>{tool.rating}</span>
                  <span style={{ fontSize:12, color:'rgba(245,240,230,0.4)' }}>/5</span>
                </div>
                <span style={{ fontSize:13, color:'rgba(245,240,230,0.5)' }}>Popularity: <strong style={{ color:'hsl(40,6%,95%)' }}>{tool.popularity}%</strong></span>
                <span style={{ fontSize:13, color:'rgba(245,240,230,0.5)' }}>Users: <strong style={{ color:'hsl(40,6%,95%)' }}>{tool.monthly_users}</strong></span>
              </div>
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
              <a href={tool.url} target="_blank" rel="noopener noreferrer" style={{
                display:'flex', alignItems:'center', gap:8, padding:'10px 20px', borderRadius:12,
                background:'linear-gradient(135deg,#7c3aed,#4f46e5)', color:'#fff', textDecoration:'none',
                fontWeight:600, fontSize:14, whiteSpace:'nowrap',
              }}>
                Visit Tool <ExternalLink size={13} />
              </a>
              <button onClick={toggleSave} disabled={saving} style={{
                display:'flex', alignItems:'center', gap:8, padding:'10px 20px', borderRadius:12,
                border:`1px solid ${saved ? 'rgba(251,191,36,0.4)' : 'rgba(255,255,255,0.12)'}`,
                background: saved ? 'rgba(251,191,36,0.1)' : 'rgba(255,255,255,0.04)',
                color: saved ? '#fbbf24' : 'rgba(245,240,230,0.6)',
                cursor: saving ? 'wait' : 'pointer', fontWeight:600, fontSize:14, whiteSpace:'nowrap',
              }}>
                {saved ? <><BookmarkCheck size={14} /> Saved</> : <><Bookmark size={14} /> Save</>}
              </button>
            </div>
          </div>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
          {/* Features */}
          <div className="glass-card" style={{ borderRadius:16, padding:24 }}>
            <h2 style={{ fontFamily:'General Sans,sans-serif', fontWeight:600, fontSize:18, color:'hsl(40,6%,95%)', marginBottom:16 }}>Key Features</h2>
            <ul style={{ listStyle:'none', padding:0, margin:0, display:'flex', flexDirection:'column', gap:10 }}>
              {(tool.features || []).map((f, i) => (
                <li key={i} style={{ display:'flex', alignItems:'flex-start', gap:10, fontSize:13, color:'rgba(245,240,230,0.7)' }}>
                  <Check size={14} color="#a855f7" style={{ flexShrink:0, marginTop:1 }} /> {f}
                </li>
              ))}
            </ul>
          </div>

          {/* Pricing */}
          <div className="glass-card" style={{ borderRadius:16, padding:24 }}>
            <h2 style={{ fontFamily:'General Sans,sans-serif', fontWeight:600, fontSize:18, color:'hsl(40,6%,95%)', marginBottom:16 }}>Pricing</h2>
            {tool.pricing?.free_tier && (
              <div style={{ marginBottom:12, padding:'10px 14px', borderRadius:10, background:'rgba(16,185,129,0.1)', border:'1px solid rgba(16,185,129,0.25)', fontSize:13, color:'#34d399' }}>
                <strong>Free tier:</strong> {tool.pricing.free_details}
              </div>
            )}
            <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
              {(tool.pricing?.paid_plans || []).map((plan, i) => (
                <div key={i} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'10px 14px', borderRadius:10, background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.07)' }}>
                  <span style={{ fontSize:13, fontWeight:500, color:'hsl(40,6%,95%)' }}>{plan.name}</span>
                  <span style={{ fontSize:13, fontWeight:600, color:'#c4b5fd' }}>{plan.price}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* API Guide */}
        {tool.api_available && (
          <div className="glass-card" style={{ borderRadius:16, padding:24, marginTop:16 }}>
            <h2 style={{ fontFamily:'General Sans,sans-serif', fontWeight:600, fontSize:18, color:'hsl(40,6%,95%)', marginBottom:6, display:'flex', alignItems:'center', gap:8 }}>
              <Key size={18} color="#a855f7" /> API Key Guide
            </h2>
            <p style={{ fontSize:13, color:'rgba(245,240,230,0.6)', marginBottom:16 }}>
              <strong style={{ color:'hsl(40,6%,95%)' }}>Pricing:</strong> {tool.api_pricing}
            </p>
            <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
              {[
                `Visit ${tool.api_guide_url}`,
                'Create a free account or sign in',
                'Navigate to API Keys / Settings',
                "Click 'Create new API key'",
                'Copy and store your key securely',
                'Set usage limits to control costs',
              ].map((step, i) => (
                <div key={i} style={{ display:'flex', alignItems:'flex-start', gap:12, fontSize:13, color:'rgba(245,240,230,0.7)' }}>
                  <div style={{ width:22, height:22, borderRadius:'50%', background:'rgba(124,58,237,0.2)', border:'1px solid rgba(124,58,237,0.35)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:11, fontWeight:700, color:'#c4b5fd', flexShrink:0 }}>
                    {i + 1}
                  </div>
                  {i === 0
                    ? <a href={tool.api_guide_url} target="_blank" rel="noopener noreferrer" style={{ color:'#a78bfa', textDecoration:'none' }}>{step}</a>
                    : step
                  }
                </div>
              ))}
            </div>
            <a href={tool.api_guide_url} target="_blank" rel="noopener noreferrer" style={{
              display:'inline-flex', alignItems:'center', gap:8, marginTop:20,
              padding:'10px 20px', borderRadius:10, textDecoration:'none',
              background:'rgba(124,58,237,0.15)', border:'1px solid rgba(124,58,237,0.3)',
              color:'#c4b5fd', fontSize:13, fontWeight:500,
            }}>
              Get API Key <ExternalLink size={13} />
            </a>
          </div>
        )}

        {/* Use Cases + Tags */}
        {(tool.use_cases?.length > 0 || tool.tags?.length > 0) && (
          <div className="glass-card" style={{ borderRadius:16, padding:24, marginTop:16 }}>
            {tool.use_cases?.length > 0 && (
              <div style={{ marginBottom:16 }}>
                <h3 style={{ fontFamily:'General Sans,sans-serif', fontWeight:600, fontSize:15, color:'hsl(40,6%,95%)', marginBottom:12 }}>Use Cases</h3>
                <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
                  {tool.use_cases.map((uc, i) => (
                    <span key={i} style={{ padding:'5px 12px', borderRadius:9999, fontSize:12, background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.1)', color:'rgba(245,240,230,0.7)' }}>{uc}</span>
                  ))}
                </div>
              </div>
            )}
            {tool.tags?.length > 0 && (
              <div>
                <h3 style={{ fontFamily:'General Sans,sans-serif', fontWeight:600, fontSize:15, color:'hsl(40,6%,95%)', marginBottom:12 }}>Tags</h3>
                <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
                  {tool.tags.map((tag, i) => (
                    <span key={i} style={{ padding:'4px 10px', borderRadius:9999, fontSize:11, background:'rgba(124,58,237,0.12)', border:'1px solid rgba(124,58,237,0.25)', color:'#c4b5fd' }}>#{tag}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <Footer />
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}
