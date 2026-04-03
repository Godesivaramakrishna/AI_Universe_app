import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { useTools } from '@/context/ToolContext'
import { Loader2 } from 'lucide-react'

const ICON_MAP = {
  'MessageSquare': '💬',
  'Code':          '💻',
  'Globe':         '🌐',
  'Image':         '🎨',
  'Video':         '🎬',
  'Mic':           '🎙️',
  'Key':           '🔑',
}

export default function Categories() {
  const { categories, loading } = useTools()
  const navigate = useNavigate()

  return (
    <div style={{ minHeight:'100vh', background:'hsl(260,87%,3%)' }}>
      <Navbar />
      <div style={{ maxWidth:1200, margin:'0 auto', padding:'100px 24px 64px' }}>
        <div style={{ marginBottom:48, textAlign:'center' }}>
          <h1 style={{ fontFamily:'General Sans,sans-serif', fontWeight:700, fontSize:36, color:'hsl(40,6%,95%)', letterSpacing:'-0.03em', marginBottom:10 }}>
            Browse by Category
          </h1>
          <p style={{ color:'rgba(245,240,230,0.5)', fontSize:15, maxWidth:500, margin:'0 auto' }}>
            Explore AI tools organized by their primary function and use case
          </p>
        </div>

        {loading ? (
          <div style={{ display:'flex', justifyContent:'center', padding:'80px 0' }}>
            <Loader2 size={32} color="#a855f7" style={{ animation:'spin 1s linear infinite' }} />
          </div>
        ) : (
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(260px,1fr))', gap:16 }}>
            {categories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => navigate(`/tools?category=${encodeURIComponent(cat.name)}`)}
                className="glass-card"
                style={{
                  borderRadius:18, padding:24, textAlign:'left', cursor:'pointer', border:'1px solid rgba(255,255,255,0.08)',
                  background:'rgba(255,255,255,0.03)', transition:'all 0.2s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = cat.color + '60'; e.currentTarget.style.background='rgba(255,255,255,0.06)'; e.currentTarget.style.transform='translateY(-2px)' }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor='rgba(255,255,255,0.08)'; e.currentTarget.style.background='rgba(255,255,255,0.03)'; e.currentTarget.style.transform='translateY(0)' }}
              >
                <div style={{
                  width:48, height:48, borderRadius:12, marginBottom:16,
                  background: cat.color + '20', border:`1px solid ${cat.color}30`,
                  display:'flex', alignItems:'center', justifyContent:'center', fontSize:22,
                }}>
                  {ICON_MAP[cat.icon] || '🤖'}
                </div>
                <h3 style={{ fontFamily:'General Sans,sans-serif', fontWeight:600, color:'hsl(40,6%,95%)', fontSize:15, marginBottom:6 }}>{cat.name}</h3>
                <p style={{ fontSize:13, color:'rgba(245,240,230,0.5)', lineHeight:1.5, marginBottom:14 }}>{cat.description}</p>
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                  <span style={{ fontSize:12, color:'rgba(245,240,230,0.35)' }}>{cat.count || 0} tools</span>
                  <div style={{ width:8, height:8, borderRadius:'50%', background: cat.color }} />
                </div>
              </button>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="glass-card" style={{ borderRadius:20, padding:40, textAlign:'center', marginTop:48, border:'1px solid rgba(124,58,237,0.15)' }}>
          <h2 style={{ fontFamily:'General Sans,sans-serif', fontWeight:700, fontSize:24, color:'hsl(40,6%,95%)', marginBottom:10 }}>Can't find the right AI?</h2>
          <p style={{ color:'rgba(245,240,230,0.5)', marginBottom:24, maxWidth:400, margin:'0 auto 24px' }}>
            Our AI assistant can help you find the perfect tool based on your specific requirements and budget.
          </p>
          <button onClick={() => navigate('/chat')} style={{
            padding:'12px 28px', borderRadius:9999, border:'1px solid rgba(124,58,237,0.35)',
            background:'rgba(124,58,237,0.15)', color:'#c4b5fd', cursor:'pointer', fontWeight:600, fontSize:14,
          }}>
            Chat with AI Assistant
          </button>
        </div>
      </div>
      <Footer />
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}
