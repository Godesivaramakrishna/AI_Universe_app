import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { useTools } from '@/context/ToolContext'
import api from '@/lib/api'
import { Star, Key, Check, X, Loader2, Search, BarChart3 } from 'lucide-react'

export default function CompareTools() {
  const { tools, loading: toolsLoading } = useTools()
  const navigate = useNavigate()
  const [selected, setSelected] = useState([])
  const [compared, setCompared] = useState([])
  const [comparing, setComparing] = useState(false)
  const [search, setSearch] = useState('')

  const filtered = tools.filter((t) =>
    !search || t.name.toLowerCase().includes(search.toLowerCase()) || t.category?.toLowerCase().includes(search.toLowerCase())
  ).slice(0, 20)

  const toggle = (slug) => {
    if (selected.includes(slug)) {
      setSelected(selected.filter((s) => s !== slug))
    } else if (selected.length < 3) {
      setSelected([...selected, slug])
    }
  }

  const doCompare = async () => {
    if (selected.length < 2) return
    setComparing(true)
    try {
      const { data } = await api.post('/compare', { tool_slugs: selected })
      setCompared(data.tools)
    } catch (e) { console.error(e) }
    finally { setComparing(false) }
  }

  const reset = () => { setSelected([]); setCompared([]) }

  const Row = ({ label, fn }) => (
    <tr style={{ borderBottom:'1px solid rgba(255,255,255,0.05)' }}>
      <td style={{ padding:'12px 16px', fontSize:12, fontWeight:500, color:'rgba(245,240,230,0.5)', whiteSpace:'nowrap' }}>{label}</td>
      {compared.map((t) => (
        <td key={t.slug} style={{ padding:'12px 16px', fontSize:13, color:'hsl(40,6%,95%)', textAlign:'center' }}>
          {fn(t)}
        </td>
      ))}
    </tr>
  )

  return (
    <div style={{ minHeight:'100vh', background:'hsl(260,87%,3%)' }}>
      <Navbar />
      <div style={{ maxWidth:1200, margin:'0 auto', padding:'100px 24px 64px' }}>
        <div style={{ marginBottom:36 }}>
          <h1 style={{ fontFamily:'General Sans,sans-serif', fontWeight:700, fontSize:36, color:'hsl(40,6%,95%)', letterSpacing:'-0.03em', marginBottom:8 }}>
            Compare AI Tools
          </h1>
          <p style={{ color:'rgba(245,240,230,0.5)' }}>Select 2–3 tools to see a detailed side-by-side comparison</p>
        </div>

        {compared.length === 0 ? (
          <>
            {/* Search */}
            <div style={{ position:'relative', marginBottom:20 }}>
              <Search size={14} style={{ position:'absolute', left:12, top:'50%', transform:'translateY(-50%)', color:'rgba(245,240,230,0.4)', pointerEvents:'none' }} />
              <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
                placeholder="Search tools to compare..."
                className="ai-input"
                style={{ width:'100%', borderRadius:10, padding:'10px 10px 10px 36px', fontSize:13, boxSizing:'border-box' }}
              />
            </div>

            {/* Selected chips */}
            {selected.length > 0 && (
              <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:16 }}>
                {selected.map((slug) => {
                  const t = tools.find((x) => x.slug === slug)
                  return (
                    <div key={slug} style={{ display:'flex', alignItems:'center', gap:6, padding:'6px 12px', borderRadius:20, background:'rgba(124,58,237,0.2)', border:'1px solid rgba(124,58,237,0.35)', color:'#c4b5fd', fontSize:12, fontWeight:500 }}>
                      <div style={{ width:16, height:16, borderRadius:4, background: t?.icon_color || '#6366f1', display:'flex', alignItems:'center', justifyContent:'center', fontSize:9, fontWeight:700, color:'#fff' }}>
                        {t?.icon || t?.name?.[0]}
                      </div>
                      {t?.name}
                      <button onClick={() => toggle(slug)} style={{ background:'none', border:'none', cursor:'pointer', color:'rgba(196,181,253,0.6)', display:'flex', padding:0 }}>
                        <X size={12} />
                      </button>
                    </div>
                  )
                })}
                <button onClick={doCompare} disabled={selected.length < 2 || comparing} style={{
                  display:'flex', alignItems:'center', gap:6,
                  padding:'6px 16px', borderRadius:20,
                  background: selected.length >= 2 ? 'linear-gradient(135deg,#7c3aed,#4f46e5)' : 'rgba(255,255,255,0.05)',
                  color: selected.length >= 2 ? '#fff' : 'rgba(245,240,230,0.3)',
                  border:'none', cursor: selected.length >= 2 ? 'pointer' : 'not-allowed', fontSize:12, fontWeight:600,
                }}>
                  {comparing ? <Loader2 size={12} style={{ animation:'spin 1s linear infinite' }} /> : <BarChart3 size={12} />}
                  Compare {selected.length > 0 ? `(${selected.length})` : ''}
                </button>
              </div>
            )}

            {/* Tool grid */}
            {toolsLoading ? (
              <div style={{ display:'flex', justifyContent:'center', padding:'60px 0' }}>
                <Loader2 size={28} color="#a855f7" style={{ animation:'spin 1s linear infinite' }} />
              </div>
            ) : (
              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(240px,1fr))', gap:12 }}>
                {filtered.map((t) => {
                  const isSelected = selected.includes(t.slug)
                  const isDisabled = !isSelected && selected.length >= 3
                  return (
                    <button key={t.slug} onClick={() => toggle(t.slug)} disabled={isDisabled} style={{
                      textAlign:'left', padding:16, borderRadius:14, border:'1px solid',
                      borderColor: isSelected ? 'rgba(124,58,237,0.6)' : 'rgba(255,255,255,0.08)',
                      background: isSelected ? 'rgba(124,58,237,0.15)' : 'rgba(255,255,255,0.03)',
                      cursor: isDisabled ? 'not-allowed' : 'pointer',
                      opacity: isDisabled ? 0.5 : 1,
                      transition:'all 0.15s',
                    }}>
                      <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                        <div style={{ width:36, height:36, borderRadius:9, background: t.icon_color || '#6366f1', display:'flex', alignItems:'center', justifyContent:'center', fontSize:14, fontWeight:700, color:'#fff', flexShrink:0 }}>
                          {t.icon || t.name?.[0]}
                        </div>
                        <div style={{ flex:1, overflow:'hidden' }}>
                          <div style={{ fontWeight:600, color:'hsl(40,6%,95%)', fontSize:13, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{t.name}</div>
                          <div style={{ fontSize:11, color:'rgba(245,240,230,0.4)' }}>{t.category}</div>
                        </div>
                        {isSelected && <Check size={14} color="#a855f7" style={{ flexShrink:0 }} />}
                      </div>
                    </button>
                  )
                })}
              </div>
            )}
          </>
        ) : (
          <>
            {/* Comparison table */}
            <button onClick={reset} style={{ display:'flex', alignItems:'center', gap:8, background:'none', border:'none', cursor:'pointer', color:'rgba(245,240,230,0.5)', fontSize:14, marginBottom:24 }}>
              ← Compare different tools
            </button>
            <div className="glass-card" style={{ borderRadius:16, overflow:'auto' }}>
              <table style={{ width:'100%', borderCollapse:'collapse' }}>
                <thead>
                  <tr style={{ borderBottom:'1px solid rgba(255,255,255,0.1)' }}>
                    <th style={{ padding:'16px', textAlign:'left', fontSize:12, color:'rgba(245,240,230,0.4)', fontWeight:500 }}>Feature</th>
                    {compared.map((t) => (
                      <th key={t.slug} style={{ padding:'16px', textAlign:'center' }}>
                        <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:8 }}>
                          <div style={{ width:44, height:44, borderRadius:12, background: t.icon_color || '#6366f1', display:'flex', alignItems:'center', justifyContent:'center', fontSize:18, fontWeight:700, color:'#fff' }}>
                            {t.icon || t.name?.[0]}
                          </div>
                          <div style={{ fontFamily:'General Sans,sans-serif', fontWeight:600, color:'hsl(40,6%,95%)', fontSize:14 }}>{t.name}</div>
                          <div style={{ fontSize:11, color:'rgba(245,240,230,0.4)' }}>{t.provider}</div>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <Row label="Rating" fn={(t) => <span style={{ display:'flex', alignItems:'center', gap:4, justifyContent:'center' }}><Star size={12} fill="#fbbf24" color="#fbbf24" /> {t.rating}/5</span>} />
                  <Row label="Popularity" fn={(t) => `${t.popularity}%`} />
                  <Row label="Category" fn={(t) => t.category} />
                  <Row label="Monthly Users" fn={(t) => t.monthly_users} />
                  <Row label="Free Tier" fn={(t) => t.pricing?.free_tier ? <span style={{ color:'#34d399' }}>✓ {t.pricing.free_details}</span> : <span style={{ color:'#f87171' }}>✗ No</span>} />
                  <Row label="Paid Plans" fn={(t) => (t.pricing?.paid_plans || []).map((p) => `${p.name}: ${p.price}`).join(', ') || '—'} />
                  <Row label="API Available" fn={(t) => t.api_available
                    ? <span style={{ color:'#a78bfa' }}>✓ {t.api_pricing}</span>
                    : <span style={{ color:'rgba(245,240,230,0.3)' }}>No API</span>
                  } />
                  <Row label="Launch Year" fn={(t) => t.launch_year} />
                  <Row label="Provider" fn={(t) => t.provider} />
                </tbody>
              </table>
            </div>

            {/* Features comparison */}
            <div style={{ marginTop:20, display:'grid', gridTemplateColumns:`repeat(${compared.length}, 1fr)`, gap:16 }}>
              {compared.map((t) => (
                <div key={t.slug} className="glass-card" style={{ borderRadius:14, padding:20 }}>
                  <h3 style={{ fontFamily:'General Sans,sans-serif', fontWeight:600, color:'hsl(40,6%,95%)', fontSize:15, marginBottom:14 }}>{t.name} Features</h3>
                  <ul style={{ listStyle:'none', padding:0, margin:0, display:'flex', flexDirection:'column', gap:8 }}>
                    {(t.features || []).map((f, i) => (
                      <li key={i} style={{ display:'flex', alignItems:'flex-start', gap:8, fontSize:13, color:'rgba(245,240,230,0.7)' }}>
                        <Check size={13} color="#a855f7" style={{ flexShrink:0, marginTop:1 }} /> {f}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      <Footer />
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}
