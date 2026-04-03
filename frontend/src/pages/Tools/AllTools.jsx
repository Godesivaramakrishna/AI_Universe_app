import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ToolCard from '@/components/tools/ToolCard'
import api from '@/lib/api'
import { Search, X, Loader2, Filter } from 'lucide-react'

const CATEGORIES_LIST = [
  'All', 'Chat & Conversational AI', 'Code & Development',
  'Website & App Builders', 'Image Generation', 'Video Generation',
  'Voice & Audio', 'API Keys & Cloud AI',
]

export default function AllTools() {
  const [tools, setTools] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [freeOnly, setFreeOnly] = useState(false)
  const [apiOnly, setApiOnly] = useState(false)
  const [skip, setSkip] = useState(0)
  const LIMIT = 24

  const fetchTools = useCallback(async (reset = false) => {
    setLoading(true)
    try {
      const params = { limit: LIMIT, skip: reset ? 0 : skip }
      if (category !== 'All') params.category = category
      if (search) params.search = search
      if (freeOnly) params.has_free = true
      if (apiOnly)  params.is_api  = true
      const { data } = await api.get('/tools', { params })
      if (reset) { setTools(data.tools); setSkip(0) }
      else setTools((prev) => [...prev, ...data.tools])
      setTotal(data.total)
    } catch (e) { console.error(e) }
    finally { setLoading(false) }
  }, [category, search, freeOnly, apiOnly, skip])

  useEffect(() => { fetchTools(true) }, [category, freeOnly, apiOnly])

  const handleSearch = (e) => { e.preventDefault(); fetchTools(true) }
  const clearSearch = () => { setSearch(''); fetchTools(true) }

  return (
    <div style={{ minHeight:'100vh', background:'hsl(260,87%,3%)' }}>
      <Navbar />
      <div style={{ maxWidth:1200, margin:'0 auto', padding:'100px 24px 64px' }}>
        {/* Header */}
        <div style={{ marginBottom:32 }}>
          <h1 style={{ fontFamily:'General Sans,sans-serif', fontWeight:700, fontSize:36, color:'hsl(40,6%,95%)', letterSpacing:'-0.03em', marginBottom:8 }}>
            All AI Tools
          </h1>
          <p style={{ color:'rgba(245,240,230,0.5)', fontSize:15 }}>
            {loading ? 'Loading...' : `Browsing ${total} AI tools`}
          </p>
        </div>

        {/* Search */}
        <form onSubmit={handleSearch} style={{ position:'relative', marginBottom:20 }}>
          <Search size={16} style={{ position:'absolute', left:14, top:'50%', transform:'translateY(-50%)', color:'rgba(245,240,230,0.4)', pointerEvents:'none' }} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search AI tools, features, providers..."
            className="ai-input"
            style={{ width:'100%', borderRadius:12, padding:'12px 44px', fontSize:14, boxSizing:'border-box' }}
          />
          {search && (
            <button type="button" onClick={clearSearch} style={{ position:'absolute', right:44, top:'50%', transform:'translateY(-50%)', background:'none', border:'none', cursor:'pointer', color:'rgba(245,240,230,0.4)', display:'flex' }}>
              <X size={14} />
            </button>
          )}
          <button type="submit" style={{ position:'absolute', right:12, top:'50%', transform:'translateY(-50%)', background:'none', border:'none', cursor:'pointer', color:'rgba(168,85,247,0.8)', display:'flex' }}>
            <Search size={16} />
          </button>
        </form>

        {/* Filters */}
        <div style={{ display:'flex', flexWrap:'wrap', gap:8, marginBottom:24, alignItems:'center' }}>
          <div style={{ display:'flex', flexWrap:'wrap', gap:6, flex:1 }}>
            {CATEGORIES_LIST.map((cat) => (
              <button key={cat} onClick={() => setCategory(cat)} style={{
                padding:'6px 14px', borderRadius:9999, fontSize:12, fontWeight:500, border:'1px solid',
                background: category === cat ? 'rgba(124,58,237,0.3)' : 'rgba(255,255,255,0.03)',
                borderColor: category === cat ? 'rgba(124,58,237,0.5)' : 'rgba(255,255,255,0.1)',
                color: category === cat ? '#c4b5fd' : 'rgba(245,240,230,0.6)',
                cursor:'pointer', transition:'all 0.15s',
              }}>
                {cat === 'All' ? '🌌 All' : cat}
              </button>
            ))}
          </div>
          <div style={{ display:'flex', gap:8 }}>
            <button onClick={() => setFreeOnly(!freeOnly)} style={{
              padding:'6px 14px', borderRadius:9999, fontSize:12, fontWeight:500, border:'1px solid',
              background: freeOnly ? 'rgba(16,185,129,0.2)' : 'rgba(255,255,255,0.03)',
              borderColor: freeOnly ? 'rgba(16,185,129,0.4)' : 'rgba(255,255,255,0.1)',
              color: freeOnly ? '#34d399' : 'rgba(245,240,230,0.6)',
              cursor:'pointer', transition:'all 0.15s',
            }}>Free tier</button>
            <button onClick={() => setApiOnly(!apiOnly)} style={{
              padding:'6px 14px', borderRadius:9999, fontSize:12, fontWeight:500, border:'1px solid',
              background: apiOnly ? 'rgba(124,58,237,0.2)' : 'rgba(255,255,255,0.03)',
              borderColor: apiOnly ? 'rgba(124,58,237,0.4)' : 'rgba(255,255,255,0.1)',
              color: apiOnly ? '#c4b5fd' : 'rgba(245,240,230,0.6)',
              cursor:'pointer', transition:'all 0.15s',
            }}>API available</button>
          </div>
        </div>

        {/* Grid */}
        {loading && tools.length === 0 ? (
          <div style={{ display:'flex', justifyContent:'center', padding:'80px 0' }}>
            <Loader2 size={32} color="#a855f7" style={{ animation:'spin 1s linear infinite' }} />
          </div>
        ) : (
          <>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(280px,1fr))', gap:16 }}>
              {tools.map((t) => <ToolCard key={t.slug} tool={t} />)}
            </div>
            {tools.length === 0 && (
              <div style={{ textAlign:'center', padding:'80px 20px', color:'rgba(245,240,230,0.4)' }}>
                <Search size={48} style={{ opacity:0.2, marginBottom:16 }} />
                <p style={{ fontSize:16 }}>No tools found. Try a different search or filter.</p>
              </div>
            )}
            {tools.length < total && !loading && (
              <div style={{ textAlign:'center', marginTop:40 }}>
                <button onClick={() => { setSkip(skip + LIMIT); fetchTools(false) }} style={{
                  padding:'12px 32px', borderRadius:9999, border:'1px solid rgba(124,58,237,0.3)',
                  background:'rgba(124,58,237,0.15)', color:'#c4b5fd', cursor:'pointer', fontWeight:600, fontSize:14,
                }}>
                  Load more ({total - tools.length} remaining)
                </button>
              </div>
            )}
          </>
        )}
      </div>
      <Footer />
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}
