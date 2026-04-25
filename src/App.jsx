import { useState } from 'react'
import LaunchWizard from './LaunchWizard'
import TokenPreview from './TokenPreview'
import WalletSimulator from './WalletSimulator'
import RecentLaunches from './RecentLaunches'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { useWallet } from '@solana/wallet-adapter-react'

const NAV = [
  { id: 'launch', icon: '🚀', label: 'Launch' },
  { id: 'preview', icon: '👁️', label: 'Preview' },
  { id: 'wallet', icon: '💳', label: 'Wallet' },
  { id: 'history', icon: '📋', label: 'History' },
  { id: 'help', icon: '❓', label: 'Help' },
]

const STEPS = ['Setup', 'Preview', 'Wallet', 'Launch']

export default function App() {
  const [step, setStep] = useState(1)
  const [activeNav, setActiveNav] = useState('launch')
  const [mode, setMode] = useState('PAPER')
  const [tokenData, setTokenData] = useState({
    name: '', ticker: '', description: '', image: null, imageUrl: '',
    creatorFee: 1, supply: 1000000000, website: '', twitter: ''
  })
  const [walletBalance, setWalletBalance] = useState(2.5)
  const { connected, publicKey } = useWallet()

  const LAUNCH_COST = 0.02

  function handleFormComplete(data) {
    setTokenData(prev => ({ ...prev, ...data }))
    setStep(2)
    setActiveNav('preview')
  }

  function handleLaunch() {
    setWalletBalance(prev => +(prev - LAUNCH_COST).toFixed(4))
    setStep(4)
  }

  const bagsLaunchUrl = `https://bags.fm/create?name=${encodeURIComponent(tokenData.name)}&ticker=${encodeURIComponent(tokenData.ticker)}`

  const metrics = [
    { label: 'Launch Cost', value: '0.02 SOL', sub: '~$3.20 USD', color: '#f97316' },
    { label: 'Creator Fee', value: `${tokenData.creatorFee}%`, sub: 'per trade earned', color: '#10b981' },
    { label: 'Token Supply', value: '1,000,000,000', sub: 'fixed total supply', color: '#3b82f6' },
    { label: 'Platform', value: 'Bags.fm', sub: 'Solana DAMM v2', color: '#a855f7' },
  ]

  return (
    <div style={{
      display: 'flex', height: '100vh', background: '#080c12',
      fontFamily: '"DM Sans","Segoe UI",sans-serif', color: '#fff', overflow: 'hidden'
    }}>

      {/* Sidebar */}
      <div style={{
        width: 220, background: '#0d1117', borderRight: '1px solid rgba(255,255,255,0.06)',
        display: 'flex', flexDirection: 'column', flexShrink: 0
      }}>
        <div style={{ padding: '20px 20px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 34, height: 34, borderRadius: 9,
              background: 'linear-gradient(135deg, #f97316, #ef4444)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17
            }}>🚀</div>
            <div>
              <div style={{ fontWeight: 800, fontSize: 15, lineHeight: 1 }}>Bags</div>
              <div style={{ fontSize: 10, color: '#f97316', fontWeight: 700, letterSpacing: 1 }}>LAUNCHPAD</div>
            </div>
          </div>
        </div>

        <div style={{ padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ display: 'flex', background: 'rgba(255,255,255,0.05)', borderRadius: 8, padding: 3, gap: 2 }}>
            {['PAPER', 'LIVE'].map(m => (
              <button key={m} onClick={() => setMode(m)} style={{
                flex: 1, padding: '5px 0', borderRadius: 6, border: 'none', cursor: 'pointer',
                fontSize: 11, fontWeight: 700, letterSpacing: 0.5,
                background: mode === m ? (m === 'LIVE' ? '#10b981' : '#f97316') : 'transparent',
                color: mode === m ? '#fff' : '#555', transition: 'all 0.15s'
              }}>{m}</button>
            ))}
          </div>
          {mode === 'LIVE' && (
            <div style={{ fontSize: 10, color: '#10b981', marginTop: 6, textAlign: 'center' }}>⚡ Real transactions enabled</div>
          )}
        </div>

        <nav style={{ flex: 1, padding: '8px 10px' }}>
          {NAV.map(item => {
            const isActive = activeNav === item.id
            return (
              <button key={item.id} onClick={() => {
                setActiveNav(item.id)
                if (item.id === 'launch') setStep(1)
                if (item.id === 'preview') setStep(2)
                if (item.id === 'wallet') setStep(3)
              }} style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: 10,
                padding: '9px 12px', borderRadius: 8, border: 'none', cursor: 'pointer',
                background: isActive ? 'rgba(249,115,22,0.12)' : 'transparent',
                color: isActive ? '#f97316' : '#475569',
                fontSize: 14, fontWeight: isActive ? 700 : 500,
                marginBottom: 2, transition: 'all 0.15s', textAlign: 'left'
              }}>
                <span>{item.icon}</span>
                <span>{item.label}</span>
                {isActive && <div style={{ marginLeft: 'auto', width: 3, height: 3, borderRadius: '50%', background: '#f97316' }} />}
              </button>
            )
          })}
        </nav>

        <div style={{ padding: '12px 16px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ fontSize: 10, color: '#334155', fontWeight: 600, letterSpacing: 1, marginBottom: 6 }}>POWERED BY</div>
          <div style={{ fontSize: 12, color: '#475569' }}>bags.fm · Solana</div>
        </div>
      </div>

      {/* Main */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

        {/* Topbar */}
        <div style={{
          height: 56, padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.01)', flexShrink: 0
        }}>
          <div style={{ fontWeight: 700, fontSize: 15, color: '#e2e8f0' }}>Token Setup</div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            {STEPS.map((s, i) => {
              const n = i + 1
              const active = step === n
              const done = step > n
              return (
                <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div onClick={() => done && setStep(n)} style={{
                    display: 'flex', alignItems: 'center', gap: 5,
                    padding: '3px 10px', borderRadius: 99, cursor: done ? 'pointer' : 'default',
                    background: active ? '#f97316' : done ? 'rgba(249,115,22,0.15)' : 'rgba(255,255,255,0.05)',
                  }}>
                    <span style={{
                      width: 16, height: 16, borderRadius: '50%', fontSize: 10, fontWeight: 700,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: active ? '#fff' : done ? '#f97316' : 'rgba(255,255,255,0.15)',
                      color: active ? '#f97316' : '#fff'
                    }}>{done ? '✓' : n}</span>
                    <span style={{ fontSize: 12, fontWeight: active ? 700 : 500, color: active ? '#fff' : done ? '#f97316' : '#475569' }}>{s}</span>
                  </div>
                  {i < 3 && <div style={{ width: 16, height: 1, background: done ? '#f97316' : 'rgba(255,255,255,0.08)' }} />}
                </div>
              )
            })}
          </div>

          {/* REAL Solana Wallet Button */}
          <WalletMultiButton style={{
            background: connected ? 'rgba(16,185,129,0.12)' : 'rgba(249,115,22,0.12)',
            border: `1px solid ${connected ? 'rgba(16,185,129,0.35)' : 'rgba(249,115,22,0.35)'}`,
            borderRadius: 8, fontSize: 13, fontWeight: 700,
            color: connected ? '#10b981' : '#f97316',
            height: 36, padding: '0 14px',
            fontFamily: '"DM Sans","Segoe UI",sans-serif',
          }} />
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px' }}>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 24 }}>
            {metrics.map(m => (
              <div key={m.label} style={{
                background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 12, padding: '14px 16px'
              }}>
                <div style={{ fontSize: 11, color: '#475569', fontWeight: 600, letterSpacing: 0.5, marginBottom: 6 }}>{m.label.toUpperCase()}</div>
                <div style={{ fontSize: 18, fontWeight: 800, color: m.color }}>{m.value}</div>
                <div style={{ fontSize: 11, color: '#334155', marginTop: 3 }}>{m.sub}</div>
              </div>
            ))}
          </div>

          {connected && publicKey && (
            <div style={{
              marginBottom: 16, padding: '10px 16px', borderRadius: 10,
              background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.2)',
              display: 'flex', alignItems: 'center', gap: 10, fontSize: 13
            }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981' }} />
              <span style={{ color: '#10b981', fontWeight: 700 }}>Wallet Connected</span>
              <span style={{ color: '#475569', fontSize: 12 }}>
                {publicKey.toString().slice(0, 4)}...{publicKey.toString().slice(-4)}
              </span>
            </div>
          )}

          <div style={{
            background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: 16, overflow: 'hidden'
          }}>
            <div style={{
              padding: '14px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{
                  padding: '3px 8px', borderRadius: 6,
                  background: 'rgba(249,115,22,0.15)', border: '1px solid rgba(249,115,22,0.3)',
                  fontSize: 11, fontWeight: 700, color: '#f97316', letterSpacing: 0.5
                }}>⚡ LAUNCH BUILDER</div>
                <div style={{ fontSize: 12, color: '#334155' }}>bags-launchpad · v1.0</div>
              </div>
              <div style={{ fontSize: 11, color: '#334155' }}>
                {mode === 'PAPER' ? '📄 Simulated mode' : '🔴 Live mode'}
              </div>
            </div>

            <div style={{ padding: '24px 20px' }}>
              {step === 1 && (
                <>
                  <LaunchWizard tokenData={tokenData} onComplete={handleFormComplete} />
                  <div style={{ marginTop: 36, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: '#f97316', letterSpacing: 1, marginBottom: 14 }}>
                      🔥 RECENTLY LAUNCHED ON BAGS
                    </div>
                    <RecentLaunches />
                  </div>
                </>
              )}
              {step === 2 && (
                <div>
                  <TokenPreview tokenData={tokenData} launchCost={LAUNCH_COST} />
                  <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 32 }}>
                    <button onClick={() => { setStep(1); setActiveNav('launch') }} style={backBtn}>← Edit</button>
                    <button onClick={() => { setStep(3); setActiveNav('wallet') }} style={primaryBtn}>Connect Wallet →</button>
                  </div>
                </div>
              )}
              {step === 3 && (
                <WalletSimulator
                  balance={walletBalance}
                  launchCost={LAUNCH_COST}
                  onLaunch={handleLaunch}
                  onBack={() => { setStep(2); setActiveNav('preview') }}
                />
              )}
              {step === 4 && <LaunchSuccess tokenData={tokenData} bagsUrl={bagsLaunchUrl} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function LaunchSuccess({ tokenData, bagsUrl }) {
  return (
    <div style={{ textAlign: 'center', padding: '60px 20px' }}>
      <div style={{ fontSize: 72, marginBottom: 16 }}>🎉</div>
      <h1 style={{ fontSize: 36, fontWeight: 900, marginBottom: 12, letterSpacing: '-1px' }}>Ready to Launch!</h1>
      <p style={{ color: '#888', fontSize: 16, marginBottom: 36 }}>
        Your token <strong style={{ color: '#f97316' }}>${tokenData.ticker}</strong> is configured. Complete the launch on Bags.fm
      </p>
      <div style={{
        background: 'rgba(249,115,22,0.08)', border: '1px solid rgba(249,115,22,0.2)',
        borderRadius: 16, padding: 24, maxWidth: 360, margin: '0 auto 32px', textAlign: 'left'
      }}>
        <div style={{ fontSize: 11, color: '#f97316', fontWeight: 700, letterSpacing: 1, marginBottom: 14 }}>LAUNCH SUMMARY</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, fontSize: 14 }}>
          <div><div style={{ color: '#475569', fontSize: 12 }}>Name</div><strong>{tokenData.name || '—'}</strong></div>
          <div><div style={{ color: '#475569', fontSize: 12 }}>Ticker</div><strong>${tokenData.ticker || '—'}</strong></div>
          <div><div style={{ color: '#475569', fontSize: 12 }}>Creator Fee</div><strong>{tokenData.creatorFee}%</strong></div>
          <div><div style={{ color: '#475569', fontSize: 12 }}>Supply</div><strong>1,000,000,000</strong></div>
        </div>
      </div>
      <a href={bagsUrl} target="_blank" rel="noopener noreferrer" style={{
        display: 'inline-flex', alignItems: 'center', gap: 10,
        padding: '16px 40px', borderRadius: 14,
        background: 'linear-gradient(135deg, #f97316, #ef4444)',
        color: '#fff', fontWeight: 800, fontSize: 18, textDecoration: 'none',
        boxShadow: '0 8px 32px rgba(249,115,22,0.35)'
      }}>
        🚀 Launch on Bags.fm
      </a>
    </div>
  )
}

const primaryBtn = {
  padding: '13px 32px', borderRadius: 12, border: 'none', cursor: 'pointer',
  background: 'linear-gradient(135deg, #f97316, #ef4444)',
  color: '#fff', fontWeight: 700, fontSize: 16
}
const backBtn = {
  padding: '13px 24px', borderRadius: 12,
  border: '1px solid rgba(255,255,255,0.1)',
  cursor: 'pointer', background: 'rgba(255,255,255,0.05)',
  color: '#888', fontWeight: 600, fontSize: 15
}