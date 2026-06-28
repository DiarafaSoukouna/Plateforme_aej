"use client"

import { useState } from "react"
import { Settings2, User, ShieldCheck, RotateCcw } from "lucide-react"
import { toast } from "sonner"
import { PageHeader } from "@/components/layout/page-header"
import { useAuth } from "@/components/auth-provider"
import { useSettings, DEFAULT_SETTINGS } from "@/components/settings-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ProfilPage() {
  const { user, updateUser } = useAuth()
  const { settings, updateSettings, resetSettings } = useSettings()

  // Etat du formulaire profil
  const [name, setName] = useState(user?.name ?? "")
  const [email, setEmail] = useState(user?.email ?? "")

  // Etat du formulaire configuration
  const [appName, setAppName] = useState(settings.appName)
  const [appShortName, setAppShortName] = useState(settings.appShortName)
  const [tagline, setTagline] = useState(settings.tagline)
  const [activityDelay, setActivityDelay] = useState(String(settings.activityDelay))
  const [recordsPerPage, setRecordsPerPage] = useState(String(settings.recordsPerPage))
  const [language, setLanguage] = useState(settings.language)
  const [primaryContact, setPrimaryContact] = useState(settings.primaryContact)

  // Etat du formulaire securite
  const [pwd, setPwd] = useState("")
  const [pwdConfirm, setPwdConfirm] = useState("")

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((p) => p[0])
        .slice(0, 2)
        .join("")
    : "U"

  function saveProfile() {
    if (!name.trim()) {
      toast.error("Le nom est obligatoire.")
      return
    }
    updateUser({ name: name.trim(), email: email.trim() })
    toast.success("Profil mis à jour avec succès.")
  }

  function saveConfig() {
    const delay = Number(activityDelay)
    const perPage = Number(recordsPerPage)
    if (!appName.trim() || !appShortName.trim()) {
      toast.error("Le nom de l'application est obligatoire.")
      return
    }
    if (Number.isNaN(delay) || delay < 1) {
      toast.error("Le délai d'inactivité doit être d'au moins 1 minute.")
      return
    }
    updateSettings({
      appName: appName.trim(),
      appShortName: appShortName.trim(),
      tagline: tagline.trim(),
      activityDelay: delay,
      recordsPerPage: Number.isNaN(perPage) ? DEFAULT_SETTINGS.recordsPerPage : perPage,
      language,
      primaryContact: primaryContact.trim(),
    })
    toast.success("Configuration enregistrée.")
  }

  function handleReset() {
    resetSettings()
    setAppName(DEFAULT_SETTINGS.appName)
    setAppShortName(DEFAULT_SETTINGS.appShortName)
    setTagline(DEFAULT_SETTINGS.tagline)
    setActivityDelay(String(DEFAULT_SETTINGS.activityDelay))
    setRecordsPerPage(String(DEFAULT_SETTINGS.recordsPerPage))
    setLanguage(DEFAULT_SETTINGS.language)
    setPrimaryContact(DEFAULT_SETTINGS.primaryContact)
    toast.success("Configuration réinitialisée.")
  }

  function changePassword() {
    if (pwd.length < 6) {
      toast.error("Le mot de passe doit contenir au moins 6 caractères.")
      return
    }
    if (pwd !== pwdConfirm) {
      toast.error("Les mots de passe ne correspondent pas.")
      return
    }
    setPwd("")
    setPwdConfirm("")
    toast.success("Mot de passe modifié (démonstration).")
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Profil & configuration"
        description="Gérez votre compte et les paramètres généraux de l'application."
      />

      <Tabs defaultValue="profil" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profil">
            <User className="size-4" />
            Profil
          </TabsTrigger>
          <TabsTrigger value="configuration">
            <Settings2 className="size-4" />
            Application
          </TabsTrigger>
          <TabsTrigger value="securite">
            <ShieldCheck className="size-4" />
            Sécurité
          </TabsTrigger>
        </TabsList>

        {/* Onglet Profil */}
        <TabsContent value="profil">
          <Card>
            <CardHeader>
              <CardTitle>Informations personnelles</CardTitle>
              <CardDescription>
                Mettez à jour vos informations de compte.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-4">
                <Avatar className="size-16">
                  <AvatarFallback className="bg-primary text-primary-foreground text-lg font-semibold">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-foreground">{user?.name}</p>
                  <p className="text-sm text-muted-foreground">{user?.role}</p>
                </div>
              </div>

              <Separator />

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="name">Nom complet</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Adresse e-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="role">Rôle</Label>
                  <Input id="role" value={user?.role ?? ""} disabled />
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={saveProfile}>Enregistrer le profil</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Onglet Configuration */}
        <TabsContent value="configuration">
          <Card>
            <CardHeader>
              <CardTitle>Paramètres de l'application</CardTitle>
              <CardDescription>
                Personnalisez le nom, l'identité et le comportement de la
                plateforme.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="appName">Nom de l'application</Label>
                  <Input
                    id="appName"
                    value={appName}
                    onChange={(e) => setAppName(e.target.value)}
                    placeholder="Nom complet"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="appShortName">Nom court (logo)</Label>
                  <Input
                    id="appShortName"
                    value={appShortName}
                    onChange={(e) => setAppShortName(e.target.value)}
                    placeholder="Sigle"
                  />
                </div>
                <div className="grid gap-2 sm:col-span-2">
                  <Label htmlFor="tagline">Slogan</Label>
                  <Input
                    id="tagline"
                    value={tagline}
                    onChange={(e) => setTagline(e.target.value)}
                    placeholder="Gestion · Suivis · Financements"
                  />
                </div>
              </div>

              <Separator />

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="activityDelay">
                    Délai d'inactivité (minutes)
                  </Label>
                  <Input
                    id="activityDelay"
                    type="number"
                    min={1}
                    value={activityDelay}
                    onChange={(e) => setActivityDelay(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Déconnexion automatique après cette durée sans activité.
                  </p>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="recordsPerPage">
                    Enregistrements par page
                  </Label>
                  <Input
                    id="recordsPerPage"
                    type="number"
                    min={5}
                    value={recordsPerPage}
                    onChange={(e) => setRecordsPerPage(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="language">Langue</Label>
                  <Select
                    value={language}
                    onValueChange={(v) => setLanguage(v ?? "Français")}
                  >
                    <SelectTrigger id="language">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Français">Français</SelectItem>
                      <SelectItem value="English">English</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="primaryContact">Contact support</Label>
                  <Input
                    id="primaryContact"
                    type="email"
                    value={primaryContact}
                    onChange={(e) => setPrimaryContact(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-between">
                <Button variant="outline" onClick={handleReset}>
                  <RotateCcw className="size-4" />
                  Réinitialiser
                </Button>
                <Button onClick={saveConfig}>Enregistrer la configuration</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Onglet Securite */}
        <TabsContent value="securite">
          <Card>
            <CardHeader>
              <CardTitle>Sécurité</CardTitle>
              <CardDescription>Modifiez votre mot de passe.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 sm:max-w-md">
                <div className="grid gap-2">
                  <Label htmlFor="pwd">Nouveau mot de passe</Label>
                  <Input
                    id="pwd"
                    type="password"
                    value={pwd}
                    onChange={(e) => setPwd(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="pwdConfirm">Confirmer le mot de passe</Label>
                  <Input
                    id="pwdConfirm"
                    type="password"
                    value={pwdConfirm}
                    onChange={(e) => setPwdConfirm(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <Button onClick={changePassword}>Modifier le mot de passe</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
