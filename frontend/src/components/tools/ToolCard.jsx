import { Link } from 'react-router-dom'
import { Star, ExternalLink, Key } from 'lucide-react'

export default function ToolCard({ tool, compact = false }) {
  if (!tool) return null

  return (
    <Link
      to={`/tools/${tool.slug}`}
      style={{ textDecoration: 'none', display: 'block' }}
    >
      <div
        className="glass-card"
        style={{
          borderRadius: 16, padding: compact ? 16 : 20,
          display: 'flex', flexDirection: 'column', gap: compact ? 8 : 12,
          cursor: 'pointer', transition: 'all 0.2s', height: '100%', boxSizing: 'border-box',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'rgba(124,58,237,0.4)'
          e.currentTarget.style.transform = 'translateY(-2px)'
          e.currentTarget.style.boxShadow = '0 0 28px rgba(124,58,237,0.15)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
          e.currentTarget.style.transform = 'translateY(0)'
          e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)'
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1, minWidth: 0 }}>
            {/* Icon */}
            <div style={{
              width: compact ? 32 : 40, height: compact ? 32 : 40,
              borderRadius: compact ? 8 : 10,
              background: tool.icon_color || '#6366f1',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', fontWeight: 700, fontSize: compact ? 13 : 16, flexShrink: 0,
            }}>
              {tool.icon || tool.name?.[0]}
            </div>
            <div style={{ minWidth: 0, flex: 1 }}>
              <h3 style={{
                fontFamily: 'General Sans, sans-serif',
                fontWeight: 600, fontSize: compact ? 13 : 14,
                color: 'hsl(40,6%,95%)',
                margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
              }}>
                {tool.name}
              </h3>
              <p style={{ fontSize: 11, color: 'rgba(245,240,230,0.45)', margin: 0 }}>
                {tool.provider}
              </p>
            </div>
          </div>
          {/* Rating */}
          {tool.rating && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 3, flexShrink: 0 }}>
              <Star size={11} fill="#fbbf24" color="#fbbf24" />
              <span style={{ fontSize: 11, fontWeight: 600, color: 'rgba(245,240,230,0.7)' }}>
                {tool.rating}
              </span>
            </div>
          )}
        </div>

        {/* Description */}
        {!compact && (
          <p style={{
            fontSize: 12, color: 'rgba(245,240,230,0.55)', lineHeight: 1.55, margin: 0,
            display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
          }}>
            {tool.description}
          </p>
        )}

        {/* Badges */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
          {tool.is_api && (
            <span style={{
              display: 'flex', alignItems: 'center', gap: 3,
              padding: '2px 8px', borderRadius: 9999, fontSize: 10, fontWeight: 600,
              background: 'rgba(124,58,237,0.12)', border: '1px solid rgba(124,58,237,0.25)', color: '#c4b5fd',
            }}>
              <Key size={9} /> API
            </span>
          )}
          {tool.pricing?.free_tier && (
            <span style={{
              padding: '2px 8px', borderRadius: 9999, fontSize: 10, fontWeight: 600,
              background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.25)', color: '#34d399',
            }}>
              Free tier
            </span>
          )}
          {(tool.tags || []).slice(0, compact ? 1 : 2).map((tag) => (
            <span key={tag} style={{
              padding: '2px 8px', borderRadius: 9999, fontSize: 10,
              color: 'rgba(245,240,230,0.45)', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)',
            }}>
              {tag}
            </span>
          ))}
        </div>

        {/* Footer */}
        {!compact && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 8, borderTop: '1px solid rgba(255,255,255,0.05)', marginTop: 'auto' }}>
            <span style={{ fontSize: 10, color: 'rgba(245,240,230,0.35)' }}>{tool.category}</span>
            <ExternalLink size={12} style={{ color: 'rgba(245,240,230,0.25)' }} />
          </div>
        )}
      </div>
    </Link>
  )
}
