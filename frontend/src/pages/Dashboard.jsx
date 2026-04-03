import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { useAuth } from '@/context/AuthContext'
import { useTools } from '@/context/ToolContext'
import api from '@/lib/api'
import { Zap, Star, BarChart, BookOpen, Search, TrendingUp, Bookmark, Loader2 } from 'lucide-react'

export default function Dashboard() {
  const { user } = useAuth()
  const { tools, categories, loading: toolsLoading } = useTools()
  const [activeTab, setActiveTab] = useState('overview')
  const [savedTools, setSavedTools] = useState([])
  const [savedLoading, setSavedLoading] = useState(false)

  const tabs = [
    { id: 'overview',   label: 'Overview',    icon: BarChart },
    { id: 'favorites',  label: 'Saved Tools', icon: Star },
    { id: 'guides',     label: 'API Guides',  icon: BookOpen },
  ]

  useEffect(() => {
    if (activeTab === 'favorites' && user) {
      setSavedLoading(true)
      api.get('/user/saved-tools')
        .then((r) => setSavedTools(r.data))
        .catch(() => {})
        .finally(() => setSavedLoading(false))
    }
  }, [activeTab, user])

  const topTools = tools.filter((t) => t.popularity >= 80).slice(0, 4)
  const apiTools  = tools.filter((t) => t.is_api).length
  const freeTools = tools.filter((t) => t.pricing?.free_tier).length

  return (
    <div style={{ minHeight:'100vh', background:'hsl(260,87%,3%)', display:'flex', flexDirection:'column' }}>
      <Navbar transparent={false} />

      <div style={{ flex:1, maxWidth:1200, margin:'0 auto', width:'100%', padding:'40px 24px' }}>
        {/* Welcome Banner */}
        <div className="glass-card" style={{
          borderRadius:20, padding:'32px 36px',
          background:'linear-gradient(135deg, rgba(124,58,237,0.1), rgba(79,70,229,0.08))',
          border:'1px solid rgba(124,58,237,0.2)',
          marginBottom:32,
          display:'flex', alignItems:'center', justifyContent:'space-between',
          flexWrap:'wrap', gap:20,
        }}>
          <div>
            <h1 style={{ fontFamily:'General Sans,sans-serif', fontSize:28, fontWeight:700, letterSpacing:'-0.03em', color:'hsl(40,6%,95%)', marginBottom:8 }}>
              Welcome back, {user?.name || 'Explorer'} 👋
            </h1>
            <p style={{ color:'rgba(245,240,230,0.55)', fontSize:15 }}>
              Discover AI tools, compare pricing, and find the perfect solution for your needs.
            </p>
          </div>
          <Link to="/chat" style={{
            padding:'12px 24px', borderRadius:12,
            background:'linear-gradient(135deg, #7c3aed, #4f46e5)',
            color:'#fff', textDecoration:'none',
            fontWeight:600, fontSize:14,
            display:'flex', alignItems:'center', gap:8,
          }}>
            <Zap size={16} /> Ask AI Advisor
          </Link>
        </div>

        {/* Stats */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(180px, 1fr))', gap:16, marginBottom:32 }}>
          {[
            { label:'Total AI Tools',   value: tools.length || '30+', icon: Zap,        color:'#a855f7' },
            { label:'Categories',       value: categories.length || 7, icon: BarChart,   color:'#6366f1' },
            { label:'With Free Tier',   value: freeTools || '20+',    icon: TrendingUp, color:'#f59e0b' },
            { label:'API Available',    value: apiTools  || '18+',    icon: BookOpen,   color:'#10b981' },
          ].map((stat) => (
            <div key={stat.label} className="glass-card" style={{ borderRadius:16, padding:'20px 24px' }}>
              <div style={{ width:36, height:36, borderRadius:10, background:`${stat.color}18`, border:`1px solid ${stat.color}30`, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:12 }}>
                <stat.icon size={18} color={stat.color} />
              </div>
              <div style={{ fontFamily:'General Sans,sans-serif', fontSize:28, fontWeight:700, color:'hsl(40,6%,95%)', letterSpacing:'-0.02em' }}>
                {stat.value}
              </div>
              <div style={{ color:'rgba(245,240,230,0.45)', fontSize:13 }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ display:'flex', gap:4, marginBottom:24, background:'rgba(255,255,255,0.04)', borderRadius:12, padding:4, width:'fit-content' }}>
          {tabs.map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
              display:'flex', alignItems:'center', gap:6,
              padding:'8px 18px', borderRadius:10, border:'none',
              background: activeTab === tab.id ? 'rgba(124,58,237,0.3)' : 'transparent',
              color: activeTab === tab.id ? '#c4b5fd' : 'rgba(245,240,230,0.5)',
              cursor:'pointer', fontSize:13, fontWeight:500, transition:'all 0.2s',
            }}>
              <tab.icon size={14} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overview */}
        {activeTab === 'overview' && (
          <div>
            <h2 style={{ fontFamily:'General Sans,sans-serif', fontSize:22, fontWeight:600, color:'hsl(40,6%,95%)', marginBottom:20, display:'flex', alignItems:'center', gap:8 }}>
              <TrendingUp size={18} color="#a855f7" /> Top AI Tools
            </h2>
            {toolsLoading ? (
              <div style={{ display:'flex', justifyContent:'center', padding:'40px 0' }}>
                <Loader2 size={28} color="#a855f7" style={{ animation:'spin 1s linear infinite' }} />
              </div>
            ) : (
              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))', gap:16 }}>
                {topTools.map((tool) => (
                  <Link key={tool.slug} to={`/tools/${tool.slug}`} style={{ textDecoration:'none' }}>
                    <div className="glass-card" style={{ borderRadius:14, padding:20, transition:'all 0.2s' }}
                      onMouseEnter={(e) => { e.currentTarget.style.background='rgba(255,255,255,0.06)'; e.currentTarget.style.transform='translateY(-2px)' }}
                      onMouseLeave={(e) => { e.currentTarget.style.background='rgba(255,255,255,0.03)'; e.currentTarget.style.transform='translateY(0)' }}
                    >
                      <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:10 }}>
                        <div style={{ width:40, height:40, borderRadius:10, background: tool.icon_color || '#6366f1', display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontWeight:700, fontSize:16 }}>
                          {tool.icon || tool.name?.[0]}
                        </div>
                        <div>
                          <div style={{ fontWeight:600, color:'hsl(40,6%,95%)', fontSize:15 }}>{tool.name}</div>
                          <div style={{ fontSize:12, color:'rgba(245,240,230,0.4)' }}>{tool.provider}</div>
                        </div>
                        <div style={{ marginLeft:'auto', display:'flex', alignItems:'center', gap:4 }}>
                          <Star size={12} fill="#fbbf24" color="#fbbf24" />
                          <span style={{ fontSize:12, color:'#fbbf24', fontWeight:600 }}>{tool.rating}</span>
                        </div>
                      </div>
                      <p style={{ fontSize:13, color:'rgba(245,240,230,0.5)', lineHeight:1.5, display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden' }}>
                        {tool.description}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
            <div style={{ marginTop:32, textAlign:'center' }}>
              <Link to="/tools" style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'12px 28px', borderRadius:9999, background:'rgba(124,58,237,0.15)', border:'1px solid rgba(124,58,237,0.3)', color:'#c4b5fd', textDecoration:'none', fontWeight:600, fontSize:14 }}>
                <Search size={15} /> View All {tools.length}+ Tools
              </Link>
            </div>
          </div>
        )}

        {/* Saved Tools */}
        {activeTab === 'favorites' && (
          savedLoading ? (
            <div style={{ display:'flex', justifyContent:'center', padding:'60px 0' }}>
              <Loader2 size={28} color="#a855f7" style={{ animation:'spin 1s linear infinite' }} />
            </div>
          ) : savedTools.length === 0 ? (
            <div style={{ textAlign:'center', padding:'60px 20px' }}>
              <div style={{ fontSize:48, marginBottom:16 }}>⭐</div>
              <h3 style={{ fontFamily:'General Sans,sans-serif', color:'hsl(40,6%,95%)', fontSize:22, marginBottom:12 }}>No Saved Tools Yet</h3>
              <p style={{ color:'rgba(245,240,230,0.45)', marginBottom:24 }}>Browse tools and bookmark your favorites.</p>
              <Link to="/tools" style={{ padding:'12px 24px', borderRadius:9999, background:'linear-gradient(135deg,#7c3aed,#4f46e5)', color:'#fff', textDecoration:'none', fontWeight:600 }}>Browse Tools</Link>
            </div>
          ) : (
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))', gap:16 }}>
              {savedTools.map((tool) => (
                <Link key={tool.slug} to={`/tools/${tool.slug}`} style={{ textDecoration:'none' }}>
                  <div className="glass-card" style={{ borderRadius:14, padding:20 }}>
                    <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:8 }}>
                      <div style={{ width:36, height:36, borderRadius:9, background: tool.icon_color || '#6366f1', display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontWeight:700 }}>
                        {tool.icon || tool.name?.[0]}
                      </div>
                      <div>
                        <div style={{ fontWeight:600, color:'hsl(40,6%,95%)', fontSize:14 }}>{tool.name}</div>
                        <div style={{ fontSize:12, color:'rgba(245,240,230,0.4)' }}>{tool.provider}</div>
                      </div>
                      <Bookmark size={14} fill="#fbbf24" color="#fbbf24" style={{ marginLeft:'auto' }} />
                    </div>
                    <p style={{ fontSize:12, color:'rgba(245,240,230,0.5)', lineHeight:1.5, WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden', display:'-webkit-box' }}>{tool.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          )
        )}

        {/* API Guides */}
        {activeTab === 'guides' && (
          <div>
            <h3 style={{ fontFamily:'General Sans,sans-serif', color:'hsl(40,6%,95%)', fontSize:22, marginBottom:20 }}>Quick API Key Guides</h3>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(220px, 1fr))', gap:16 }}>
              {['OpenAI','Google Cloud','AWS Bedrock','Anthropic','ElevenLabs','Hugging Face'].map((name) => (
                <Link key={name} to="/api-key-guide" className="glass-card" style={{ borderRadius:14, padding:'20px 24px', display:'block', textDecoration:'none', transition:'all 0.2s' }}
                  onMouseEnter={(e) => { e.currentTarget.style.background='rgba(255,255,255,0.06)'; e.currentTarget.style.transform='translateY(-2px)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.background='rgba(255,255,255,0.03)'; e.currentTarget.style.transform='translateY(0)' }}
                >
                  <div style={{ fontSize:24, marginBottom:10 }}>🔑</div>
                  <div style={{ fontWeight:600, color:'hsl(40,6%,95%)', fontSize:15, marginBottom:4 }}>{name}</div>
                  <div style={{ fontSize:12, color:'rgba(245,240,230,0.45)' }}>API Key Guide</div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}
