import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { fadeIn, fieldFade, formStagger } from "../lib/anim"
import { useAuth } from "../lib/auth"

export default function Login() {
  const { login } = useAuth()
  const nav = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [err, setErr] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErr(null)
    setLoading(true)
    try {
      await login(email, password)
      nav("/leaderboard")
    } catch {
      setErr("Login failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="container-page section">
      <motion.div variants={fadeIn} initial="hidden" animate="visible"
        className="mx-auto max-w-md rounded-2xl border bg-white p-6 shadow-soft">
        <h1 className="h2 mb-4">Sign in</h1>
        <p className="text-sm text-gray-600 mb-4">
          Demo credentials: <span className="font-mono">admin@phg.local</span> / <span className="font-mono">pass123</span>
        </p>
        {err && <p className="mb-3 rounded bg-red-50 p-2 text-sm text-red-700">{err}</p>}
        <motion.form variants={formStagger} onSubmit={onSubmit} className="space-y-3">
          <motion.div variants={fieldFade}>
            <label className="mb-1 block text-sm font-medium">Email</label>
            <input className="w-full rounded-lg border p-2.5 focus:outline-none focus:ring-2 focus:ring-highland-300"
              type="email" value={email} onChange={e=>setEmail(e.target.value)} />
          </motion.div>
          <motion.div variants={fieldFade}>
            <label className="mb-1 block text-sm font-medium">Password</label>
            <input className="w-full rounded-lg border p-2.5 focus:outline-none focus:ring-2 focus:ring-highland-300"
              type="password" value={password} onChange={e=>setPassword(e.target.value)} />
          </motion.div>
          <motion.div variants={fieldFade}>
            <button disabled={loading} className="btn-primary w-full">{loading ? "Signing in..." : "Sign in"}</button>
          </motion.div>
        </motion.form>
      </motion.div>
    </section>
  )
}
