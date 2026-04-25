import { useState } from "react"

export default function LaunchWizard({ tokenData, onComplete }) {
  const [form, setForm] = useState(tokenData)
  const [errors, setErrors] = useState({})
  const [imgPreview, setImgPreview] = useState(tokenData.imageUrl || "")

  function set(key, val) {
    setForm(prev => ({ ...prev, [key]: val }))
    if (errors[key]) setErrors(prev => ({ ...prev, [key]: "" }))
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
    if (!form.name.trim()) e.name = "Token name is required"
    if (!form.ticker.trim()) e.ticker = "Ticker is required"
    if (form.ticker.length > 10) e.ticker = "Max 10 characters"
    if (!form.description.trim()) e.description = "Description is required"
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function handleSubmit() {
    if (validate()) onComplete(form)
  }

  const inp = {
    width: "100%", padding: "12px 14px", borderRadius: 10,
    background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
    color: "#fff", fontSize: 15, outline: "none", boxSizing: "border-box"
  }
  const lbl = { fontSize: 13, fontWeight: 600, color: "#aaa", marginBottom: 6, display: "block" }
  const err = { color: "#ef4444", fontSize: 12, marginTop: 4 }

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div>
            <label style={lbl}>Token Image</label>
            <label style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%", height: 140, borderRadius: 12, border: "2px dashed rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.03)", cursor: "pointer", overflow: "hidden" }}>
              {imgPreview ? <img src={imgPreview} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <div style={{ textAlign: "center", color: "#555" }}><div style={{ fontSize: 32 }}>🖼️</div><div style={{ fontSize: 13, marginTop: 6 }}>Click to upload image</div><div style={{ fontSize: 11, marginTop: 2 }}>PNG, JPG, GIF</div></div>}
              <input type="file" accept="image/*" onChange={handleImage} style={{ display: "none" }} />
            </label>
          </div>
          <div>
            <label style={lbl}>Token Name *</label>
            <input value={form.name} onChange={e => set("name", e.target.value)} placeholder="e.g. Pepe Galaxy" style={{ ...inp, borderColor: errors.name ? "#ef4444" : "rgba(255,255,255,0.1)" }} />
            {errors.name && <div style={err}>{errors.name}</div>}
          </div>
          <div>
            <label style={lbl}>Ticker Symbol *</label>
            <div style={{ position: "relative" }}>
              <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#f97316", fontWeight: 700 }}>$</span>
              <input value={form.ticker} onChange={e => set("ticker", e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, ""))} placeholder="PEPE" style={{ ...inp, paddingLeft: 28, borderColor: errors.ticker ? "#ef4444" : "rgba(255,255,255,0.1)" }} />
            </div>
            {errors.ticker && <div style={err}>{errors.ticker}</div>}
          </div>
          <div>
            <label style={lbl}>Description *</label>
            <textarea value={form.description} onChange={e => set("description", e.target.value)} placeholder="Tell the world about your token..." rows={4} style={{ ...inp, resize: "vertical", borderColor: errors.description ? "#ef4444" : "rgba(255,255,255,0.1)" }} />
            {errors.description && <div style={err}>{errors.description}</div>}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div>
            <label style={lbl}>Creator Fee: <span style={{ color: "#f97316", fontWeight: 700 }}>{form.creatorFee}%</span><span style={{ color: "#555", fontWeight: 400, marginLeft: 8 }}>— you earn this from every trade</span></label>
            <input type="range" min="0.1" max="5" step="0.1" value={form.creatorFee} onChange={e => set("creatorFee", parseFloat(e.target.value))} style={{ width: "100%", accentColor: "#f97316" }} />
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#555" }}><span>0.1%</span><span>5%</span></div>
            <div style={{ marginTop: 10, padding: "10px 14px", borderRadius: 8, background: "rgba(249,115,22,0.08)", border: "1px solid rgba(249,115,22,0.2)", fontSize: 13, color: "#f97316" }}>
              💰 At {form.creatorFee}% fee — earn <strong>{(form.creatorFee * 0.01 * 1000).toFixed(1)} SOL</strong> per 1,000 SOL volume
            </div>
          </div>
          <div>
            <label style={lbl}>Website (optional)</label>
            <input value={form.website} onChange={e => set("website", e.target.value)} placeholder="https://yourtoken.com" style={inp} />
          </div>
          <div>
            <label style={lbl}>Twitter/X (optional)</label>
            <div style={{ position: "relative" }}>
              <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#555" }}>@</span>
              <input value={form.twitter} onChange={e => set("twitter", e.target.value)} placeholder="yourhandle" style={{ ...inp, paddingLeft: 28 }} />
            </div>
          </div>
          <div style={{ marginTop: "auto", padding: 16, borderRadius: 12, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
            <div style={{ fontSize: 12, color: "#555", fontWeight: 700, letterSpacing: 1, marginBottom: 10 }}>POWERED BY BAGS.FM</div>
            <div style={{ fontSize: 13, color: "#666", lineHeight: 1.6 }}>✓ Earn 1% from every transaction<br />✓ Instant token launch on Solana<br />✓ Auto liquidity via DAMM v2<br />✓ Tradeable immediately after launch</div>
          </div>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 32 }}>
        <button onClick={handleSubmit} style={{ padding: "14px 40px", borderRadius: 12, border: "none", cursor: "pointer", background: "linear-gradient(135deg, #f97316, #ef4444)", color: "#fff", fontWeight: 700, fontSize: 16, boxShadow: "0 4px 24px rgba(249,115,22,0.3)" }}>Preview Token →</button>
      </div>
    </div>
  )
}
