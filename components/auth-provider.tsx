"use client"

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react"

export type SessionUser = {
  name: string
  email: string
  role: string
}

type AuthContextType = {
  user: SessionUser | null
  loading: boolean
  login: (email: string, password: string) => boolean
  logout: () => void
  updateUser: (patch: Partial<SessionUser>) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const STORAGE_KEY = "pdigsf.session"

// Comptes de démonstration (maquette)
const DEMO_ACCOUNTS = [
  {
    email: "admin@pdigsf.gov",
    password: "admin123",
    name: "Aïcha Diallo",
    role: "Administrateur",
  },
  {
    email: "agent@pdigsf.gov",
    password: "agent123",
    name: "Moussa Koné",
    role: "Agent de suivi",
  },
]

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<SessionUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setUser(JSON.parse(raw))
    } catch {
      // ignore
    }
    setLoading(false)
  }, [])

  const login = (email: string, password: string) => {
    const found = DEMO_ACCOUNTS.find(
      (a) => a.email === email.trim().toLowerCase() && a.password === password,
    )
    if (!found) return false
    const session: SessionUser = {
      name: found.name,
      email: found.email,
      role: found.role,
    }
    setUser(session)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session))
    return true
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem(STORAGE_KEY)
  }

  const updateUser = (patch: Partial<SessionUser>) => {
    setUser((prev) => {
      if (!prev) return prev
      const next = { ...prev, ...patch }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      return next
    })
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth doit être utilisé dans AuthProvider")
  return ctx
}
