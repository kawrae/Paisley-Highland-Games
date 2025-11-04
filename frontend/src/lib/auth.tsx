import React, { createContext, useContext, useEffect, useMemo, useState } from "react"

type Role = "guest" | "admin"
export type User = { id: string; name: string; role: Role }

type AuthCtx = {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthCtx | undefined>(undefined)
const LS_KEY = "phg_user"

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const raw = localStorage.getItem(LS_KEY)
    if (raw) setUser(JSON.parse(raw))
  }, [])

  const login = async (email: string, password: string) => {
    // PoC logic:
    // If email is 'admin@phg.local' and password 'pass123', you are admin.
    // Anything else becomes a 'guest'.
    const isAdmin = email.trim().toLowerCase() === "admin@phg.local" && password === "pass123"
    const u: User = {
      id: crypto.randomUUID(),
      name: isAdmin ? "Admin" : email.split("@")[0] || "Guest",
      role: isAdmin ? "admin" : "guest",
    }
    setUser(u)
    localStorage.setItem(LS_KEY, JSON.stringify(u))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem(LS_KEY)
  }

  const value = useMemo(() => ({ user, login, logout }), [user])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within AuthProvider")
  return ctx
}
