import { useState } from 'react'
import LaunchWizard from './LaunchWizard'
import TokenPreview from './TokenPreview'
import WalletSimulator from './WalletSimulator'

export default function App() {
  const [step, setStep] = useState(1)
  const [tokenData, setTokenData] = useState({
    name: '', ticker: '', description: '', image: null, imageUrl: '',
    creatorFee: 1, supply: 1000000000, website: '', twitter: ''
  })
  const [walletBalance, setWalletBalance] = useState(2.5)

  const LAUNCH_COST = 0.02

  function handleFormComplete(data) {
    setTokenData(prev => ({ ...prev, ...data }))
    setStep(2)
  }

  function handleLaunch() {
    setWalletBalance(prev => +(prev - LAUNCH_COST).toFixed(4))
    setStep(4)
  }

  const bagsLaunchUrl = `https://bags.fm/create?name=${encodeURIComponent(tokenData.name)}&ticker=${encodeURIComponent(tokenData.ticker)}`

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0f', fontFamily: '"DM Sans","Segoe UI",sans-serif', color: '#fff' }}>
      {/* Header */}
      <div style={{
        padding: '0 32px', height: 64, display: 'flex', alignItems: 'center',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        background: 'rgba(255,255,255,0.02)', position: 'sticky', top: 0, zIndex: 100
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: 'linear-gradient(135deg, #f97316, #ef4444)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16
          }}>🚀</div>
          <span style={{ fontWeight: 800, fontSize: 18 }}>
            Bags <span style={{ color: '#f97316' }}>Launchpad</span>
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '0 auto' }}>
          {['Setup', 'Preview', 'Wallet', 'Launch'].map((s, i) => {
            const n = i + 1
            const active = step === n
            const done = step > n
            return (
              <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div
                  onClick={() => done && setStep(n)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 6,
                    padding: '4px 12px', borderRadius: 99,
                    background: active ? '#f97316' : done ? 'rgba(249,115,22,0.2)' : 'rgba(255,255,255,0.06)',
                    cursor: done ? 'pointer' : 'default'
                  }}>
                  <span style={{
                    width: 18, height: 18, borderRadius: '50%',
                    background: active ? '#fff' : done ? '#f97316' : 'rgba(255,255,255,0.2)',
                    color: active ? '#f97316' : '#fff',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 11, fontWeight: 700
                  }}>{done ? '✓' : n}</span>
                  <span style={{ fontSize: 13, fontWeight: active ? 700 : 500, color: active ? '#fff' : done ? '#f97316' : '#666' }}>{s}</span>
                </div>
                {i < 3 && <div style={{ width: 20, height: 1, background: done ? '#f97316' : 'rgba(255,255,255,0.1)' }} />}
              </div>
            )
          })}
        </div>

        <div style={{
          padding: '6px 14px', borderRadius: 8,
          background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
          fontSize: 13, fontWeight: 600
        }}>
          💰 {walletBalance} SOL
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 24px' }}>
        {step === 1 && <LaunchWizard tokenData={tokenData} onComplete={handleFormComplete} />}
        {step === 2 && (
          <div>
            <TokenPreview tokenData={tokenData} launchCost={LAUNCH_COST} />
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 32 }}>
              <button onClick={() => setStep(1)} style={backBtn}>← Edit</button>
              <button onClick={() => setStep(3)} style={primaryBtn}>Connect Wallet →</button>
            </div>
          </div>
        )}
        {step === 3 && (
          <WalletSimulator balance={walletBalance} launchCost={LAUNCH_COST} onLaunch={handleLaunch} onBack={() => setStep(2)} />
        )}
        {step === 4 && <LaunchSuccess tokenData={tokenData} bagsUrl={bagsLaunchUrl} />}
      </div>
    </div>
  )
}

function LaunchSuccess({ tokenData, bagsUrl }) {
  return (
    <div style={{ textAlign: 'center', padding: '60px 20px' }}>
      <div style={{ fontSize: 72, marginBottom: 16 }}>🎉</div>
      <h1 style={{ fontSize: 40, fontWeight: 900, marginBottom: 12, letterSpacing: '-1px' }}>Ready to Launch!</h1>
      <p style={{ color: '#888', fontSize: 17, marginBottom: 36 }}>
        Your token <strong style={{ color: '#f97316' }}>${tokenData.ticker}</strong> is configured. Complete the launch on Bags.fm
      </p>
      <div style={{
        background: 'rgba(249,115,22,0.08)', border: '1px solid rgba(249,115,22,0.25)',
        borderRadius: 16, padding: 24, maxWidth: 360, margin: '0 auto 32px', textAlign: 'left'
      }}>
        <div style={{ fontSize: 11, color: '#f97316', fontWeight: 700, letterSpacing: 1, marginBottom: 14 }}>LAUNCH SUMMARY</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, fontSize: 14 }}>
          <div><div style={{ color: '#555', fontSize: 12 }}>Name</div><strong>{tokenData.name || '—'}</strong></div>
          <div><div style={{ color: '#555', fontSize: 12 }}>Ticker</div><strong>${tokenData.ticker || '—'}</strong></div>
          <div><div style={{ color: '#555', fontSize: 12 }}>Creator Fee</div><strong>{tokenData.creatorFee}%</strong></div>
          <div><div style={{ color: '#555', fontSize: 12 }}>Supply</div><strong>1,000,000,000</strong></div>
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
      <div style={{ marginTop: 10, fontSize: 12, color: '#444' }}>Opens Bags.fm to complete on-chain launch</div>
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
