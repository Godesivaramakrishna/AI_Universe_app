import { useState, useMemo } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ToolCard from '@/components/tools/ToolCard'
import { useTools } from '@/context/ToolContext'
import { Loader2 } from 'lucide-react'

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

export default function AtoZ() {
  const { tools, loading } = useTools()
  const [activeLetter, setActiveLetter] = useState('A')

  const grouped = useMemo(() => {
    return ALPHABET.reduce((acc, letter) => {
      const arr = tools.filter((t) => t.name?.toUpperCase().startsWith(letter))
      if (arr.length) acc[letter] = arr
      return acc
    }, {})
  }, [tools])

  const scrollTo = (letter) => {
    setActiveLetter(letter)
    document.getElementById(`letter-${letter}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div style={{ minHeight:'100vh', background:'hsl(260,87%,3%)' }}>
      <Navbar />
      <div style={{ maxWidth:1200, margin:'0 auto', padding:'100px 24px 64px' }}>
        <div style={{ marginBottom:24 }}>
          <h1 style={{ fontFamily:'General Sans,sans-serif', fontWeight:700, fontSize:36, color:'hsl(40,6%,95%)', letterSpacing:'-0.03em', marginBottom:8 }}>
            A–Z AI Tools
          </h1>
          <p style={{ color:'rgba(245,240,230,0.5)' }}>Browse all {tools.length} AI tools alphabetically</p>
        </div>

        {/* Sticky alphabet nav */}
        <div style={{ position:'sticky', top:64, zIndex:20, paddingBlock:12, background:'hsl(260,87%,3%)', borderBottom:'1px solid rgba(255,255,255,0.06)', marginBottom:32 }}>
          <div style={{ display:'flex', flexWrap:'wrap', gap:4 }}>
            {ALPHABET.map((letter) => (
              <button key={letter} onClick={() => scrollTo(letter)} disabled={!grouped[letter]} style={{
                width:32, height:32, borderRadius:8, border:'1px solid',
                background: activeLetter === letter ? 'rgba(124,58,237,0.3)' : 'rgba(255,255,255,0.03)',
                borderColor: activeLetter === letter ? 'rgba(124,58,237,0.5)' : 'rgba(255,255,255,0.08)',
                color: activeLetter === letter ? '#c4b5fd' : grouped[letter] ? 'rgba(245,240,230,0.6)' : 'rgba(245,240,230,0.2)',
                cursor: grouped[letter] ? 'pointer' : 'not-allowed',
                fontSize:13, fontWeight:500, transition:'all 0.15s',
              }}>
                {letter}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div style={{ display:'flex', justifyContent:'center', padding:'80px 0' }}>
            <Loader2 size={32} color="#a855f7" style={{ animation:'spin 1s linear infinite' }} />
          </div>
        ) : (
          <div style={{ display:'flex', flexDirection:'column', gap:40 }}>
            {Object.entries(grouped).map(([letter, ltTools]) => (
              <div key={letter} id={`letter-${letter}`}>
                <div style={{ display:'flex', alignItems:'center', gap:16, marginBottom:20 }}>
                  <div style={{ width:40, height:40, borderRadius:10, background:'rgba(124,58,237,0.2)', border:'1px solid rgba(124,58,237,0.3)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'General Sans,sans-serif', fontWeight:700, fontSize:18, color:'#c4b5fd' }}>
                    {letter}
                  </div>
                  <div style={{ flex:1, height:1, background:'linear-gradient(to right, rgba(124,58,237,0.3), transparent)' }} />
                  <span style={{ fontSize:12, color:'rgba(245,240,230,0.3)' }}>{ltTools.length} tool{ltTools.length > 1 ? 's' : ''}</span>
                </div>
                <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(260px,1fr))', gap:14 }}>
                  {ltTools.map((t) => <ToolCard key={t.slug} tool={t} compact />)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}
