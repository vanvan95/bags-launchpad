import { useState, useEffect } from 'react'

export default function RecentLaunches() {
  const [tokens, setTokens] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/bags-api/api/v1/token-launch/feed', {
      headers: { 'x-api-key': import.meta.env.VITE_BAGS_API_KEY || '' }
    })
      .then(r => r.json())
      .then(d => setTokens((d?.response || d || []).slice(0, 6)))
      .catch(() => setTokens([]))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p style={{ color: '#475569', fontSize: 12 }}>Loading...</p>

  if (!tokens.length) return (
    <p style={{ color: '#475569', fontSize: 12 }}>No recent launches found. Be the first to launch! 🚀</p>
  )

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
      {tokens.map(t => (
        <div
          key={t.tokenMint}
          onClick={() => window.open(`https://bags.fm/t/${t.tokenMint}`, '_blank')}
          style={{
            background: 'rgba(255,255,255,0.03)', borderRadius: 10, padding: '12px 14px',
            border: '1px solid rgba(255,255,255,0.06)', cursor: 'pointer'
          }}
        >
          <div style={{ fontWeight: 700, fontSize: 13, color: '#f1f5f9' }}>{t.name}</div>
          <div style={{ fontSize: 11, color: '#f97316', marginTop: 2 }}>${t.ticker}</div>
          <div style={{ fontSize: 11, color: '#10b981', marginTop: 4 }}>
            {((t.fees || 0) / 1e9).toFixed(4)} SOL fees
          </div>
        </div>
      ))}
    </div>
  )
}