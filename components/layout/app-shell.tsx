"use client"

import { useEffect, useRef, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"
import { useAuth } from "@/components/auth-provider"
import { useSettings } from "@/components/settings-provider"
import { TopNav } from "@/components/layout/top-nav"

export function AppShell({ children }: { children: ReactNode }) {
  const { user, loading, logout } = useAuth()
  const { settings } = useSettings()
  const router = useRouter()
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login")
    }
  }, [loading, user, router])

  // Deconnexion automatique apres le delai d'inactivite configure
  useEffect(() => {
    if (!user || !settings.activityDelay) return

    const reset = () => {
      if (timerRef.current) clearTimeout(timerRef.current)
      timerRef.current = setTimeout(
        () => {
          logout()
          toast.info("Session expirée pour cause d'inactivité.")
          router.replace("/login")
        },
        settings.activityDelay * 60 * 1000,
      )
    }

    const events = ["mousemove", "keydown", "click", "scroll", "touchstart"]
    events.forEach((e) => window.addEventListener(e, reset, { passive: true }))
    reset()

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
      events.forEach((e) => window.removeEventListener(e, reset))
    }
  }, [user, settings.activityDelay, logout, router])

  if (loading || !user) {
    return (
      <div className="flex min-h-svh items-center justify-center">
        <Loader2 className="size-6 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="flex min-h-svh flex-col">
      <TopNav />
      <main className="mx-auto w-full max-w-[1400px] flex-1 px-4 py-6 lg:px-6">
        {children}
      </main>
      <footer className="border-t py-4 text-center text-xs text-muted-foreground">
        {settings.appName} — {settings.tagline}
      </footer>
    </div>
  )
}
