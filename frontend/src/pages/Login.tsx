import { useState } from "react";
import { useAuth } from "../lib/auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [email, setEmail] = useState("admin@phg.local");
  const [password, setPassword] = useState("admin123");
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    setBusy(true);
    try {
      await login(email, password);
      nav("/leaderboard");
    } catch (e: any) {
      setErr(e?.response?.data?.message ?? "Login failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="container-page section">
      <div className="max-w-md mx-auto rounded-2xl border bg-white p-6 shadow-soft">
        <h1 className="h2 mb-4">Login</h1>
        {err && <p className="mb-3 rounded bg-red-50 p-2 text-sm text-red-700">{err}</p>}
        <pre className="text-gray-500 text-sm font-mono bg-gray-50 border border-gray-200 rounded-lg p-2 mb-3">
        # demo email: admin@phg.local <br />
        # pw: admin123
        </pre>
        <form onSubmit={submit} className="space-y-3">
          <div>
            <label className="mb-1 block text-sm font-medium">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border p-2.5 focus:outline-none focus:ring-2 focus:ring-highland-300"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border p-2.5 focus:outline-none focus:ring-2 focus:ring-highland-300"
            />
          </div>
          <button disabled={busy} className="btn-primary">{busy ? "Signing in…" : "Sign in"}</button>
        </form>
      </div>
    </section>
  );
}
