import { useState } from 'react'

export default function LaunchWizard({ tokenData, onComplete }) {
  const [form, setForm] = useState(tokenData)
  const [errors, setErrors] = useState({})
  const [imgPreview, setImgPreview] = useState(tokenData.imageUrl || '')

  function set(key, val) {
    setForm(prev => ({ ...prev, [key]: val }))
    if (errors[key]) setErrors(prev => ({ ...prev, [key]: '' }))
  }

  function handleImage(e) {
    const file = e.target.files[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    setImgPreview(url)
    setForm(prev => ({ ...prev, image: file, imageUrl: url }))
  }

  function validate() {
    const e = {}
    if (!form.name.trim()) e.name = 'Token name is required'
    if (!form.ticker.trim()) e.ticker = 'Ticker is required'
    if (form.ticker.length > 10) e.ticker = 'Max 10 characters'
    if (!form.description.trim()) e.description = 'Description is required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function handleSubmit() {
    if (validate()) onComplete(form)
  }

  const inputStyle = {
    width: '100%', padding: '12px 14px', borderRadius: 10,
    background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
    color: '#fff', fontSize: 15, outline: 'none', boxSizing: 'border-box'
  }
  const labelStyle = { fontSize: 13, fontWeight: 600, color: '#aaa', marginBottom: 6, display: 'block' }
  const errorStyle = { color: '#ef4444', fontSize: 12, marginTop: 4 }

  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <h1 style={{ fontSize: 36, fontWeight: 900, letterSpacing: '-1px', marginBottom: 8 }}>
          Create Your Token 🪙
        </h1>
        <p style={{ color: '#666', fontSize: 16 }}>
          Fill in the details below — preview before launching on Bags.fm
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
        {/* Left column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

          {/* Image upload */}
          <div>
            <label style={labelStyle}>Token Image</label>
            <label style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              width: '100%', height: 140, borderRadius: 12,
              border: '2px dashed rgba(255,255,255,0.15)',
              background: 'rgba(255,255,255,0.03)', cursor: 'pointer',
              overflow: 'hidden', position: 'relative'
            }}>
              {imgPreview ? (
                <img src={imgPreview} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <div style={{ textAlign: 'center', color: '#555' }}>
                  <div style={{ fontSize: 32 }}>🖼️</div>
                  <div style={{ fontSize: 13, marginTop: 6 }}>Click to upload image</div>
                  <div style={{ fontSize: 11, marginTop: 2 }}>PNG, JPG, GIF — recommended 500×500</div>
                </div>
              )}
              <input type="file" accept="image/*" onChange={handleImage} style={{ display: 'none' }} />
            </label>
          </div>

          {/* Token Name */}
          <div>
            <label style={labelStyle}>Token Name *</label>
            <input
              value={form.name}
              onChange={e => set('name', e.target.value)}
              placeholder="e.g. Pepe Galaxy"
              style={{ ...inputStyle, borderColor: errors.name ? '#ef4444' : 'rgba(255,255,255,0.1)' }}
            />
            {errors.name && <div style={errorStyle}>{errors.name}</div>}
          </div>

          {/* Ticker */}
          <div>
            <label style={labelStyle}>Ticker Symbol *</label>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#f97316', fontWeight: 700 }}>$</span>
              <input
                value={form.ticker}
                onChange={e => set('ticker', e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, ''))}
                placeholder="PEPE"
                style={{ ...inputStyle, paddingLeft: 28, borderColor: errors.ticker ? '#ef4444' : 'rgba(255,255,255,0.1)' }}
              />
            </div>
            {errors.ticker && <div style={errorStyle}>{errors.ticker}</div>}
          </div>

          {/* Description */}
          <div>
            <label style={labelStyle}>Description *</label>
            <textarea
              value={form.description}
              onChange={e => set('description', e.target.value)}
              placeholder="Tell the world about your token..."
              rows={4}
              style={{ ...inputStyle, resize: 'vertical', borderColor: errors.description ? '#ef4444' : 'rgba(255,255,255,0.1)' }}
            />
            {errors.description && <div style={errorStyle}>{errors.description}</div>}
          </div>
        </div>

        {/* Right column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

          {/* Creator Fee */}
          <div>
            <label style={labelStyle}>
              Creator Fee: <span style={{ color: '#f97316', fontWeight: 700 }}>{form.creatorFee}%</span>
              <span style={{ color: '#555', fontWeight: 400, marginLeft: 8 }}>— you earn this from every trade</span>
            </label>
            <input
              type="range" min="0.1" max="5" step="0.1"
              value={form.creatorFee}
              onChange={e => set('creatorFee', parseFloat(e.target.value))}
              style={{ width: '100%', accentColor: '#f97316' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#555' }}>
              <span>0.1%</span><span>5%</span>
            </div>
            <div style={{
              marginTop: 10, padding: '10px 14px', borderRadius: 8,
              background: 'rgba(249,115,22,0.08)', border: '1px solid rgba(249,115,22,0.2)',
              fontSize: 13, color: '#f97316'
            }}>
              💰 At {form.creatorFee}% fee — earn <strong>{(form.creatorFee * 0.01 * 1000).toFixed(1)} SOL</strong> per 1,000 SOL volume
            </div>
          </div>

          {/* Website */}
          <div>
            <label style={labelStyle}>Website (optional)</label>
            <input
              value={form.website}
              onChange={e => set('website', e.target.value)}
              placeholder="https://yourtoken.com"
              style={inputStyle}
            />
          </div>

          {/* Twitter */}
          <div>
            <label style={labelStyle}>Twitter/X (optional)</label>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#555' }}>@</span>
              <input
                value={form.twitter}
                onChange={e => set('twitter', e.target.value)}
                placeholder="yourhandle"
                style={{ ...inputStyle, paddingLeft: 28 }}
              />
            </div>
          </div>

          {/* Bags info box */}
          <div style={{
            marginTop: 'auto', padding: 16, borderRadius: 12,
            background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)'
          }}>
            <div style={{ fontSize: 12, color: '#555', fontWeight: 700, letterSpacing: 1, marginBottom: 10 }}>POWERED BY BAGS.FM</div>
            <div style={{ fontSize: 13, color: '#666', lineHeight: 1.6 }}>
              ✓ Earn 1% from every transaction<br />
              ✓ Instant token launch on Solana<br />
              ✓ Auto liquidity via DAMM v2<br />
              ✓ Tradeable immediately after launch
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 32 }}>
        <button onClick={handleSubmit} style={{
          padding: '14px 40px', borderRadius: 12, border: 'none', cursor: 'pointer',
          background: 'linear-gradient(135deg, #f97316, #ef4444)',
          color: '#fff', fontWeight: 700, fontSize: 16,
          boxShadow: '0 4px 24px rgba(249,115,22,0.3)'
        }}>
          Preview Token →
        </button>
      </div>
    </div>
  )
}
