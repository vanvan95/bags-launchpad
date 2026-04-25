export default function TokenPreview({ tokenData, launchCost }) {
  const { name, ticker, description, imageUrl, creatorFee, website, twitter } = tokenData

  const initials = (name || '?').slice(0, 2).toUpperCase()
  const colors = ['#f97316', '#8b5cf6', '#06b6d4', '#10b981', '#ec4899']
  const color = colors[(name?.charCodeAt(0) || 0) % colors.length]

  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: 36 }}>
        <h2 style={{ fontSize: 32, fontWeight: 900, letterSpacing: '-1px', marginBottom: 8 }}>
          Token Preview 👀
        </h2>
        <p style={{ color: '#666', fontSize: 15 }}>
          This is how your token will appear on Bags.fm
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>

        {/* Token card preview */}
        <div style={{
          background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 20, padding: 28
        }}>
          <div style={{ fontSize: 12, color: '#555', fontWeight: 700, letterSpacing: 1, marginBottom: 18 }}>
            TOKEN CARD — BAGS.FM
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
            {imageUrl ? (
              <img src={imageUrl} alt="" style={{ width: 64, height: 64, borderRadius: '50%', objectFit: 'cover' }} />
            ) : (
              <div style={{
                width: 64, height: 64, borderRadius: '50%',
                background: color, display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: 24, fontWeight: 800, color: '#fff'
              }}>{initials}</div>
            )}
            <div>
              <div style={{ fontWeight: 800, fontSize: 22 }}>{name || 'Token Name'}</div>
              <div style={{ color: color, fontWeight: 700, fontSize: 16 }}>${ticker || 'TICKER'}</div>
            </div>
          </div>

          <p style={{ color: '#888', fontSize: 14, lineHeight: 1.6, marginBottom: 20 }}>
            {description || 'Your token description will appear here...'}
          </p>

          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {website && (
              <span style={{
                padding: '4px 12px', borderRadius: 99,
                background: 'rgba(255,255,255,0.06)', fontSize: 12, color: '#888'
              }}>🌐 Website</span>
            )}
            {twitter && (
              <span style={{
                padding: '4px 12px', borderRadius: 99,
                background: 'rgba(255,255,255,0.06)', fontSize: 12, color: '#888'
              }}>𝕏 @{twitter}</span>
            )}
            <span style={{
              padding: '4px 12px', borderRadius: 99,
              background: 'rgba(249,115,22,0.1)', fontSize: 12, color: '#f97316', fontWeight: 600
            }}>💰 {creatorFee}% creator fee</span>
          </div>
        </div>

        {/* Stats panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

          <div style={{
            background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 16, padding: 20
          }}>
            <div style={{ fontSize: 12, color: '#555', fontWeight: 700, letterSpacing: 1, marginBottom: 14 }}>
              TOKEN ECONOMICS
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { label: 'Total Supply', value: '1,000,000,000' },
                { label: 'Initial Price', value: '~0.000001 SOL' },
                { label: 'Initial Market Cap', value: '~$6,900' },
                { label: 'Blockchain', value: 'Solana' },
                { label: 'DEX', value: 'DAMM v2 (Meteora)' },
              ].map(({ label, value }) => (
                <div key={label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                  <span style={{ color: '#666' }}>{label}</span>
                  <span style={{ fontWeight: 600 }}>{value}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{
            background: 'rgba(249,115,22,0.08)', border: '1px solid rgba(249,115,22,0.2)',
            borderRadius: 16, padding: 20
          }}>
            <div style={{ fontSize: 12, color: '#f97316', fontWeight: 700, letterSpacing: 1, marginBottom: 14 }}>
              CREATOR EARNINGS ESTIMATE
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                { vol: '10K', sol: (creatorFee * 0.01 * 10000).toFixed(0) },
                { vol: '100K', sol: (creatorFee * 0.01 * 100000).toFixed(0) },
                { vol: '1M', sol: (creatorFee * 0.01 * 1000000).toFixed(0) },
              ].map(({ vol, sol }) => (
                <div key={vol} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                  <span style={{ color: '#888' }}>{vol} SOL volume</span>
                  <span style={{ color: '#f97316', fontWeight: 700 }}>+{sol} SOL earned</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{
            background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: 16, padding: 20
          }}>
            <div style={{ fontSize: 12, color: '#555', fontWeight: 700, letterSpacing: 1, marginBottom: 14 }}>
              LAUNCH COST
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 15 }}>
              <span style={{ color: '#888' }}>Network fee (est.)</span>
              <span style={{ fontWeight: 700 }}>{launchCost} SOL</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
