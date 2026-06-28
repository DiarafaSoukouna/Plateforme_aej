"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Loader2, LogIn } from "lucide-react"
import { toast } from "sonner"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginPage() {
  const { user, loading, login } = useAuth()
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (!loading && user) router.replace("/")
  }, [loading, user, router])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    const ok = login(email, password)
    if (ok) {
      toast.success("Connexion réussie.")
      router.replace("/")
    } else {
      toast.error("Identifiants incorrects.")
      setSubmitting(false)
    }
  }

  function fillDemo() {
    setEmail("admin@pdigsf.gov")
    setPassword("admin123")
  }

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      {/* Panneau marque */}
      <div className="relative hidden flex-col justify-between bg-sidebar p-10 text-sidebar-foreground lg:flex">
        <div className="flex items-center gap-3">
          <Image
            src="/icon.png"
            alt="PDIGSF"
            width={44}
            height={44}
            className="rounded-lg"
          />
          <span className="text-lg font-bold">PDIGSF</span>
        </div>
        <div className="space-y-4">
          <h1 className="text-3xl font-bold leading-tight text-balance">
            Plateforme Digitale Intégrée de Gestion, de Suivis et des
            Financements
          </h1>
          <p className="max-w-md text-sm text-sidebar-foreground/80 text-pretty">
            Gérez les référentiels, suivez les projets et les indicateurs,
            pilotez les financements et générez vos rapports — le tout depuis une
            seule plateforme.
          </p>
        </div>
        <p className="text-xs text-sidebar-foreground/60">
          © {new Date().getFullYear()} PDIGSF. Tous droits réservés.
        </p>
      </div>

      {/* Formulaire */}
      <div className="flex items-center justify-center p-6">
        <div className="w-full max-w-sm space-y-6">
          <div className="space-y-2 text-center lg:hidden">
            <Image
              src="/icon.png"
              alt="PDIGSF"
              width={48}
              height={48}
              className="mx-auto rounded-lg"
            />
            <h1 className="text-xl font-bold">PDIGSF</h1>
          </div>

          <div className="space-y-1">
            <h2 className="text-2xl font-bold">Connexion</h2>
            <p className="text-sm text-muted-foreground">
              Accédez à votre espace de gestion.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Adresse e-mail</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nom@pdigsf.gov"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Mot de passe</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={submitting}>
              {submitting ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <LogIn className="size-4" />
              )}
              Se connecter
            </Button>
          </form>

          <div className="rounded-lg border bg-muted/40 p-3 text-xs text-muted-foreground">
            <p className="font-medium text-foreground">Compte de démonstration</p>
            <p>admin@pdigsf.gov / admin123</p>
            <button
              type="button"
              onClick={fillDemo}
              className="mt-1 font-medium text-primary hover:underline"
            >
              Remplir automatiquement
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
