"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react"

export type AppSettings = {
  appName: string
  appShortName: string
  tagline: string
  activityDelay: number // minutes d'inactivite avant deconnexion automatique
  recordsPerPage: number
  language: string
  primaryContact: string
}

export const DEFAULT_SETTINGS: AppSettings = {
  appName: "PDIGSF",
  appShortName: "PDIGSF",
  tagline: "Gestion · Suivis · Financements",
  activityDelay: 30,
  recordsPerPage: 25,
  language: "Français",
  primaryContact: "support@pdigsf.gov",
}

type SettingsContextType = {
  settings: AppSettings
  updateSettings: (patch: Partial<AppSettings>) => void
  resetSettings: () => void
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined)

const STORAGE_KEY = "pdigsf.settings"

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        setSettings({ ...DEFAULT_SETTINGS, ...JSON.parse(raw) })
      }
    } catch {
      // ignore
    }
  }, [])

  const updateSettings = (patch: Partial<AppSettings>) => {
    setSettings((prev) => {
      const next = { ...prev, ...patch }
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      } catch {
        // ignore
      }
      return next
    })
  }

  const resetSettings = () => {
    setSettings(DEFAULT_SETTINGS)
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {
      // ignore
    }
  }

  return (
    <SettingsContext.Provider value={{ settings, updateSettings, resetSettings }}>
      {children}
    </SettingsContext.Provider>
  )
}

export function useSettings() {
  const ctx = useContext(SettingsContext)
  if (!ctx) throw new Error("useSettings doit être utilisé dans SettingsProvider")
  return ctx
}
