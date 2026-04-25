import { useState } from 'react'

export default function WalletSimulator({ balance, launchCost, onLaunch, onBack, compact }) {
  const [connected, setConnected] = useState(false)
  const canLaunch = balance >= launchCost

  if (compact) {
    return (
      <div style={{
        padding: '6px 14px', borderRadius: 8,
        background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
        fontSize: 13, fontWeight: 600
      }}>
        💰 {balance} SOL
      </div>
    )
  }

  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: 36 }}>
        <h2 style={{ fontSize: 32, fontWeight: 900, letterSpacing: '-1px', marginBottom: 8 }}>
          Virtual Wallet 👛
        </h2>
        <p style={{ color: '#666', fontSize: 15 }}>
          Simulate connecting your Solana wallet to launch
        </p>
      </div>

      <div style={{ maxWidth: 480, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 16 }}>

        {/* Wallet card */}
        <div style={{
          background: connected
            ? 'linear-gradient(135deg, rgba(249,115,22,0.15), rgba(239,68,68,0.1))'
            : 'rgba(255,255,255,0.04)',
          border: `1px solid ${connected ? 'rgba(249,115,22,0.4)' : 'rgba(255,255,255,0.1)'}`,
          borderRadius: 20, padding: 28, textAlign: 'center'
        }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>{connected ? '🔓' : '🔒'}</div>
          <div style={{ fontWeight: 800, fontSize: 20, marginBottom: 4 }}>
            {connected ? 'Wallet Connected' : 'Connect Wallet'}
          </div>
          {connected ? (
            <>
              <div style={{ color: '#888', fontSize: 13, marginBottom: 16, fontFamily: 'monospace' }}>
                7xKp...9mRt (simulated)
              </div>
              <div style={{ fontSize: 36, fontWeight: 900, color: '#f97316' }}>
                {balance} SOL
              </div>
              <div style={{ color: '#888', fontSize: 13, marginTop: 4 }}>
                ≈ ${(balance * 185).toFixed(2)} USD
              </div>
            </>
          ) : (
            <div style={{ color: '#666', fontSize: 14, marginBottom: 20 }}>
              Connect your Solana wallet to proceed with launch
            </div>
          )}

          {!connected && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 16 }}>
              {['Phantom', 'Backpack', 'Solflare'].map(w => (
                <button
                  key={w}
                  onClick={() => setConnected(true)}
                  style={{
                    width: '100%', padding: '12px 0', borderRadius: 10,
                    border: '1px solid rgba(255,255,255,0.1)',
                    background: 'rgba(255,255,255,0.05)', color: '#fff',
                    fontWeight: 600, fontSize: 14, cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8
                  }}>
                  <span style={{ fontSize: 20 }}>{w === 'Phantom' ? '👻' : w === 'Backpack' ? '🎒' : '☀️'}</span>
                  {w}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Transaction preview */}
        {connected && (
          <div style={{
            background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 16, padding: 20
          }}>
            <div style={{ fontSize: 12, color: '#555', fontWeight: 700, letterSpacing: 1, marginBottom: 14 }}>
              TRANSACTION PREVIEW
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                <span style={{ color: '#888' }}>Action</span>
                <span style={{ fontWeight: 600 }}>Launch Token on Bags.fm</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                <span style={{ color: '#888' }}>Network Fee</span>
                <span style={{ fontWeight: 600 }}>{launchCost} SOL</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                <span style={{ color: '#888' }}>Current Balance</span>
                <span style={{ fontWeight: 600 }}>{balance} SOL</span>
              </div>
              <div style={{ height: 1, background: 'rgba(255,255,255,0.07)' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 15 }}>
                <span style={{ color: '#888' }}>Balance After</span>
                <span style={{ fontWeight: 700, color: canLaunch ? '#10b981' : '#ef4444' }}>
                  {(balance - launchCost).toFixed(4)} SOL
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Launch button */}
        {connected && (
          <button
            onClick={onLaunch}
            disabled={!canLaunch}
            style={{
              width: '100%', padding: '16px 0', borderRadius: 14, border: 'none',
              background: canLaunch
                ? 'linear-gradient(135deg, #f97316, #ef4444)'
                : 'rgba(255,255,255,0.06)',
              color: canLaunch ? '#fff' : '#555',
              fontWeight: 800, fontSize: 18, cursor: canLaunch ? 'pointer' : 'not-allowed',
              boxShadow: canLaunch ? '0 8px 32px rgba(249,115,22,0.3)' : 'none'
            }}>
            {canLaunch ? '🚀 Confirm & Launch' : '❌ Insufficient Balance'}
          </button>
        )}

        <button onClick={onBack} style={{
          width: '100%', padding: '12px 0', borderRadius: 12,
          border: '1px solid rgba(255,255,255,0.08)',
          background: 'transparent', color: '#666', cursor: 'pointer', fontSize: 14
        }}>
          ← Back to Preview
        </button>
      </div>
    </div>
  )
}
