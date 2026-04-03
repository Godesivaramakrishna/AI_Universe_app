import { Link } from 'react-router-dom'
import { Zap, Globe, MessageCircle, Send } from 'lucide-react'

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid rgba(255,255,255,0.06)',
      background: 'rgba(8, 4, 20, 0.9)',
      padding: '60px 32px 32px',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 40, marginBottom: 48 }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{
                width: 32, height: 32, borderRadius: 8,
                background: 'linear-gradient(135deg, #7c3aed, #4f46e5)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Zap size={18} color="#fff" />
              </div>
              <span style={{ fontFamily: 'General Sans, sans-serif', fontWeight: 700, fontSize: 16, color: 'hsl(40,6%,95%)' }}>
                AI Universe
              </span>
            </div>
            <p style={{ color: 'rgba(245,240,230,0.5)', fontSize: 14, lineHeight: 1.6, maxWidth: 220 }}>
              The unified intelligence platform for discovering and comparing all AI tools.
            </p>
            <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
              {[Globe, MessageCircle, Send].map((Icon, i) => (
                <button key={i} style={{
                  width: 36, height: 36, borderRadius: 8,
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', color: 'rgba(245,240,230,0.6)',
                  transition: 'all 0.2s',
                }}>
                  <Icon size={16} />
                </button>
              ))}
            </div>
          </div>

          {/* Platform */}
          <div>
            <h4 style={{ color: 'hsl(40,6%,95%)', fontWeight: 600, marginBottom: 16, fontSize: 14 }}>Platform</h4>
            {['All Tools', 'Categories', 'A to Z', 'Compare', 'Website Makers'].map(item => (
              <div key={item} style={{ marginBottom: 10 }}>
                <Link to={`/${item.toLowerCase().replace(/ /g, '-')}`}
                  style={{ color: 'rgba(245,240,230,0.5)', fontSize: 14, textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color = 'rgba(245,240,230,0.9)'}
                  onMouseLeave={e => e.target.style.color = 'rgba(245,240,230,0.5)'}
                >
                  {item}
                </Link>
              </div>
            ))}
          </div>

          {/* Resources */}
          <div>
            <h4 style={{ color: 'hsl(40,6%,95%)', fontWeight: 600, marginBottom: 16, fontSize: 14 }}>Resources</h4>
            {['API Key Guide', 'Chat with AI', 'Documentation', 'Blog'].map(item => (
              <div key={item} style={{ marginBottom: 10 }}>
                <Link to={`/${item.toLowerCase().replace(/ /g, '-')}`}
                  style={{ color: 'rgba(245,240,230,0.5)', fontSize: 14, textDecoration: 'none' }}
                  onMouseEnter={e => e.target.style.color = 'rgba(245,240,230,0.9)'}
                  onMouseLeave={e => e.target.style.color = 'rgba(245,240,230,0.5)'}
                >
                  {item}
                </Link>
              </div>
            ))}
          </div>

          {/* Categories */}
          <div>
            <h4 style={{ color: 'hsl(40,6%,95%)', fontWeight: 600, marginBottom: 16, fontSize: 14 }}>Categories</h4>
            {['Chat & Research', 'Code & Dev', 'Image Generation', 'Video AI', 'Voice & Speech', 'API & Cloud'].map(item => (
              <div key={item} style={{ marginBottom: 10 }}>
                <Link to="/categories"
                  style={{ color: 'rgba(245,240,230,0.5)', fontSize: 14, textDecoration: 'none' }}
                  onMouseEnter={e => e.target.style.color = 'rgba(245,240,230,0.9)'}
                  onMouseLeave={e => e.target.style.color = 'rgba(245,240,230,0.5)'}
                >
                  {item}
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.06)',
          paddingTop: 24,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: 12,
        }}>
          <p style={{ color: 'rgba(245,240,230,0.35)', fontSize: 13 }}>
            © 2025 AI Universe. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: 24 }}>
            {['Privacy Policy', 'Terms of Service', 'Contact'].map(item => (
              <Link key={item} to="/"
                style={{ color: 'rgba(245,240,230,0.35)', fontSize: 13, textDecoration: 'none' }}>
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
