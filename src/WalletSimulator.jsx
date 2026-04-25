import { useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'

export default function WalletSimulator({ balance, launchCost, onLaunch, onBack }) {
  const { connected, publicKey, disconnect } = useWallet()

  return (
    <div style={{ maxWidth: 480, margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>💳</div>
        <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 8 }}>Connect Wallet</h2>
        <p style={{ color: '#475569', fontSize: 14 }}>
          Connect your Solana wallet to proceed with launch
        </p>
      </div>

      {/* Wallet connect button */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
        <WalletMultiButton style={{
          background: connected ? 'rgba(16,185,129,0.15)' : 'linear-gradient(135deg, #f97316, #ef4444)',
          border: `1px solid ${connected ? 'rgba(16,185,129,0.4)' : 'transparent'}`,
          borderRadius: 12, fontSize: 15, fontWeight: 700,
          color: '#fff', height: 48, padding: '0 28px',
          fontFamily: '"DM Sans","Segoe UI",sans-serif',
          width: '100%', justifyContent: 'center',
        }} />
      </div>

      {connected && publicKey && (
        <>
          {/* Connected info */}
          <div style={{
            padding: '16px 20px', borderRadius: 12, marginBottom: 20,
            background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.25)',
            display: 'flex', alignItems: 'center', gap: 12
          }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#10b981', flexShrink: 0 }} />
            <div>
              <div style={{ fontWeight: 700, color: '#10b981', fontSize: 14 }}>Wallet Connected</div>
              <div style={{ color: '#475569', fontSize: 12, marginTop: 2 }}>
                {publicKey.toString().slice(0, 8)}...{publicKey.toString().slice(-8)}
              </div>
            </div>
          </div>

          {/* Transaction preview */}
          <div style={{
            padding: '20px', borderRadius: 12, marginBottom: 24,
            background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)'
          }}>
            <div style={{ fontSize: 12, color: '#475569', fontWeight: 700, letterSpacing: 1, marginBottom: 16 }}>
              TRANSACTION PREVIEW
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                <span style={{ color: '#64748b' }}>Action</span>
                <span style={{ fontWeight: 600 }}>Launch Token on Bags.fm</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                <span style={{ color: '#64748b' }}>Network Fee</span>
                <span style={{ fontWeight: 600, color: '#f97316' }}>{launchCost} SOL</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                <span style={{ color: '#64748b' }}>Platform</span>
                <span style={{ fontWeight: 600 }}>Bags.fm · DAMM v2</span>
              </div>
              <div style={{ height: 1, background: 'rgba(255,255,255,0.06)' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 15 }}>
                <span style={{ color: '#94a3b8', fontWeight: 700 }}>Total</span>
                <span style={{ fontWeight: 800, color: '#f97316' }}>{launchCost} SOL</span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
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
          background: 'transparent', color: '#475569', fontWeight: 600, fontSize: 14, cursor: 'pointer'
        }}>← Go Back</button>
      )}
    </div>
  )
}