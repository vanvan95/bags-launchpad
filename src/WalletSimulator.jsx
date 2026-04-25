import { useState } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'

export default function WalletSimulator({ balance, launchCost, onLaunch, onBack }) {
  const { connected, publicKey, select, wallets, disconnect } = useWallet()
  const [showPicker, setShowPicker] = useState(false)

  function handleSelectWallet(walletName) {
    select(walletName)
    setShowPicker(false)
  }

  return (
    <div style={{ maxWidth: 480, margin: '0 auto', position: 'relative' }}>

      {/* Custom wallet picker modal */}
      {showPicker && (
        <div onClick={() => setShowPicker(false)} style={{
          position: 'fixed', inset: 0, zIndex: 9999,
          background: 'rgba(0,0,0,0.7)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: 24
        }}>
          <div onClick={e => e.stopPropagation()} style={{
            background: '#0d1117', borderRadius: 20,
            border: '1px solid rgba(249,115,22,0.3)',
            padding: 28, width: '100%', maxWidth: 360,
            boxShadow: '0 20px 60px rgba(0,0,0,0.8)'
          }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <div>
                <div style={{ fontSize: 18, fontWeight: 800, color: '#fff' }}>Connect Wallet</div>
                <div style={{ fontSize: 12, color: '#475569', marginTop: 3 }}>
                  Choose your Solana wallet
                </div>
              </div>
              <button onClick={() => setShowPicker(false)} style={{
                width: 32, height: 32, borderRadius: '50%', border: 'none',
                background: 'rgba(255,255,255,0.08)', color: '#888',
                cursor: 'pointer', fontSize: 16, display: 'flex',
                alignItems: 'center', justifyContent: 'center'
              }}>✕</button>
            </div>

            {/* Wallet list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {wallets.length > 0 ? wallets.map(w => (
                <button key={w.adapter.name} onClick={() => handleSelectWallet(w.adapter.name)} style={{
                  display: 'flex', alignItems: 'center', gap: 14,
                  padding: '14px 16px', borderRadius: 12, border: 'none',
                  background: 'rgba(255,255,255,0.05)',
                  cursor: 'pointer', textAlign: 'left', width: '100%',
                  transition: 'all 0.15s'
                }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(249,115,22,0.12)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                >
                  {w.adapter.icon && (
                    <img src={w.adapter.icon} alt="" style={{ width: 32, height: 32, borderRadius: 8 }} />
                  )}
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 15, color: '#fff' }}>{w.adapter.name}</div>
                    <div style={{ fontSize: 11, color: '#475569', marginTop: 2 }}>
                      {w.readyState === 'Installed' ? '✓ Installed' : 'Not installed'}
                    </div>
                  </div>
                </button>
              )) : (
                /* Fallback nếu không detect được wallet */
                ['Phantom', 'Backpack', 'Solflare'].map(name => (
                  <button key={name} onClick={() => handleSelectWallet(name)} style={{
                    display: 'flex', alignItems: 'center', gap: 14,
                    padding: '14px 16px', borderRadius: 12, border: 'none',
                    background: 'rgba(255,255,255,0.05)',
                    cursor: 'pointer', textAlign: 'left', width: '100%'
                  }}>
                    <div style={{
                      width: 32, height: 32, borderRadius: 8,
                      background: 'rgba(249,115,22,0.2)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 16
                    }}>👻</div>
                    <div style={{ fontWeight: 700, fontSize: 15, color: '#fff' }}>{name}</div>
                  </button>
                ))
              )}
            </div>

            <div style={{ marginTop: 16, fontSize: 11, color: '#334155', textAlign: 'center' }}>
              Don't have a wallet? Get Phantom at phantom.app
            </div>
          </div>
        </div>
      )}

      {/* Main content */}
      <div style={{ textAlign: 'center', marginBottom: 28 }}>
        <div style={{ fontSize: 44, marginBottom: 10 }}>💳</div>
        <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 6, color: '#fff' }}>Connect Wallet</h2>
        <p style={{ color: '#475569', fontSize: 13 }}>Connect your Solana wallet to proceed</p>
      </div>

      {!connected ? (
        <button onClick={() => setShowPicker(true)} style={{
          width: '100%', padding: '15px 0', borderRadius: 12, border: 'none',
          background: 'linear-gradient(135deg, #f97316, #ef4444)',
          color: '#fff', fontWeight: 800, fontSize: 16, cursor: 'pointer',
          marginBottom: 12, boxShadow: '0 4px 20px rgba(249,115,22,0.35)'
        }}>
          Select Wallet
        </button>
      ) : (
        <>
          {/* Connected info */}
          <div style={{
            padding: '14px 18px', borderRadius: 12, marginBottom: 18,
            background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.25)',
            display: 'flex', alignItems: 'center', gap: 12
          }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#10b981', flexShrink: 0 }} />
            <div>
              <div style={{ fontWeight: 700, color: '#10b981', fontSize: 14 }}>Wallet Connected</div>
              <div style={{ color: '#475569', fontSize: 12, marginTop: 2 }}>
                {publicKey?.toString().slice(0, 8)}...{publicKey?.toString().slice(-8)}
              </div>
            </div>
            <button onClick={disconnect} style={{
              marginLeft: 'auto', fontSize: 11, color: '#475569',
              background: 'none', border: 'none', cursor: 'pointer'
            }}>Disconnect</button>
          </div>

          {/* Transaction preview */}
          <div style={{
            padding: 18, borderRadius: 12, marginBottom: 20,
            background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)'
          }}>
            <div style={{ fontSize: 11, color: '#475569', fontWeight: 700, letterSpacing: 1, marginBottom: 14 }}>
              TRANSACTION PREVIEW
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                <span style={{ color: '#64748b' }}>Action</span>
                <span style={{ fontWeight: 600, color: '#fff' }}>Launch on Bags.fm</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                <span style={{ color: '#64748b' }}>Network Fee</span>
                <span style={{ fontWeight: 600, color: '#f97316' }}>{launchCost} SOL</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                <span style={{ color: '#64748b' }}>Platform</span>
                <span style={{ fontWeight: 600, color: '#fff' }}>Bags.fm · DAMM v2</span>
              </div>
              <div style={{ height: 1, background: 'rgba(255,255,255,0.06)' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 15 }}>
                <span style={{ color: '#94a3b8', fontWeight: 700 }}>Total</span>
                <span style={{ fontWeight: 800, color: '#f97316' }}>{launchCost} SOL</span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 12 }}>
            <button onClick={onBack} style={{
              flex: 1, padding: '13px 0', borderRadius: 12,
              border: '1px solid rgba(255,255,255,0.1)',
              background: 'rgba(255,255,255,0.04)',
              color: '#64748b', fontWeight: 600, fontSize: 15, cursor: 'pointer'
            }}>← Back</button>
            <button onClick={onLaunch} style={{
              flex: 2, padding: '13px 0', borderRadius: 12, border: 'none', cursor: 'pointer',
              background: 'linear-gradient(135deg, #f97316, #ef4444)',
              color: '#fff', fontWeight: 800, fontSize: 16,
              boxShadow: '0 4px 20px rgba(249,115,22,0.4)'
            }}>🚀 Confirm Launch</button>
          </div>
        </>
      )}

      {!connected && (
        <button onClick={onBack} style={{
          width: '100%', padding: '12px 0', borderRadius: 12, marginTop: 8,
          border: '1px solid rgba(255,255,255,0.08)',
          background: 'transparent', color: '#475569',
          fontWeight: 600, fontSize: 14, cursor: 'pointer'
        }}>← Go Back</button>
      )}
    </div>
  )
}