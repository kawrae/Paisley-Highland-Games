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
    <section className="container-page section flex items-center justify-center">
      <div
        className="
          card
          max-w-md w-full
          p-6
          border border-gray-200 dark:border-dark-border
          bg-white dark:bg-dark-card
          shadow-soft dark:shadow-softDark
          transition-colors duration-300
        "
      >
        <h1 className="h2 mb-4 text-center">Login</h1>

        {err && (
          <p className="mb-3 rounded bg-red-50 p-2 text-sm text-red-700 dark:bg-red-900/20 dark:text-red-300">
            {err}
          </p>
        )}

        <div className="text-xs font-mono rounded-md p-3 mb-4 border border-gray-200 bg-gray-50 text-gray-700 dark:bg-[#121714] dark:text-gray-300 dark:border-[#1f3b34]">
          # demo email: admin@phg.local<br />
          # password: admin123
        </div>

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input w-full"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input w-full"
            />
          </div>

          <button
            disabled={busy}
            className="btn-primary w-full justify-center text-sm font-semibold"
          >
            {busy ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </section>
  );
}
