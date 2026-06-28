"use client"

import { useMemo, useState } from "react"
import { Download, FolderKanban, Users, Wallet, CircleCheck } from "lucide-react"
import { toast } from "sonner"
import { PageHeader } from "@/components/layout/page-header"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  ETATS_PROJET,
  REGIONS,
  projetsDetail,
  type ProjetDetail,
} from "@/lib/mock-data"
import { formatFCFA, formatNumber } from "@/lib/format"
import { exportToCsv } from "@/lib/export"

const etatBadge: Record<string, string> = {
  "Démarré": "bg-accent/15 text-accent",
  "En cours": "bg-primary/15 text-primary",
  "Suspendu": "bg-destructive/15 text-destructive",
  "Achevé": "bg-secondary text-secondary-foreground",
}

export default function MatriceProjetsPage() {
  const [secteur, setSecteur] = useState<string>("Tous")

  const secteurs = useMemo(
    () => ["Tous", ...Array.from(new Set(projetsDetail.map((p) => p.secteur)))],
    [],
  )

  const data: ProjetDetail[] = useMemo(
    () =>
      secteur === "Tous"
        ? projetsDetail
        : projetsDetail.filter((p) => p.secteur === secteur),
    [secteur],
  )

  // Regions reellement presentes dans les donnees filtrees
  const activeRegions = useMemo(
    () => REGIONS.filter((r) => data.some((p) => p.region === r)),
    [data],
  )

  // Matrice region x etat
  function count(region: string, etat: string) {
    return data.filter((p) => p.region === region && p.etat === etat).length
  }

  const kpis = useMemo(() => {
    const total = data.length
    const acheves = data.filter((p) => p.etat === "Achevé").length
    const jeunes = data.reduce((s, p) => s + p.jeunes, 0)
    const financement = data.reduce((s, p) => s + p.financement, 0)
    return { total, acheves, jeunes, financement }
  }, [data])

  function handleExport() {
    exportToCsv(
      "matrice_projets.csv",
      [
        { key: "code", label: "Code" },
        { key: "intitule", label: "Intitulé" },
        { key: "promoteur", label: "Promoteur" },
        { key: "region", label: "Région" },
        { key: "secteur", label: "Secteur" },
        { key: "etat", label: "État" },
        { key: "progression", label: "Progression (%)" },
        { key: "financement", label: "Financement (FCFA)" },
        { key: "jeunes", label: "Jeunes" },
      ],
      data,
    )
    toast.success("Export CSV téléchargé.")
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Matrice des projets"
        description="Croisement des projets par région, état d'avancement et secteur."
      >
        <Select value={secteur} onValueChange={(v) => setSecteur(v ?? "Tous")}>
          <SelectTrigger className="w-44">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {secteurs.map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button variant="outline" onClick={handleExport}>
          <Download className="size-4" />
          Exporter
        </Button>
      </PageHeader>

      {/* KPIs */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Projets", value: formatNumber(kpis.total), Icon: FolderKanban },
          { label: "Projets achevés", value: formatNumber(kpis.acheves), Icon: CircleCheck },
          { label: "Jeunes concernés", value: formatNumber(kpis.jeunes), Icon: Users },
          { label: "Financement total", value: formatFCFA(kpis.financement), Icon: Wallet },
        ].map(({ label, value, Icon }) => (
          <Card key={label}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {label}
              </CardTitle>
              <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Icon className="size-4.5" />
              </span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Matrice region x etat */}
      <Card>
        <CardHeader>
          <CardTitle>Matrice région / état d'avancement</CardTitle>
          <CardDescription>
            Nombre de projets par région et par état.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50 hover:bg-muted/50">
                  <TableHead className="font-semibold">Région</TableHead>
                  {ETATS_PROJET.map((e) => (
                    <TableHead key={e} className="text-center font-semibold">
                      {e}
                    </TableHead>
                  ))}
                  <TableHead className="text-center font-semibold">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {activeRegions.map((region) => {
                  const totalRegion = data.filter((p) => p.region === region).length
                  return (
                    <TableRow key={region}>
                      <TableCell className="font-medium">{region}</TableCell>
                      {ETATS_PROJET.map((e) => {
                        const c = count(region, e)
                        return (
                          <TableCell key={e} className="text-center">
                            {c > 0 ? (
                              <span className="inline-flex size-7 items-center justify-center rounded-md bg-primary/10 text-sm font-semibold text-primary">
                                {c}
                              </span>
                            ) : (
                              <span className="text-muted-foreground">—</span>
                            )}
                          </TableCell>
                        )
                      })}
                      <TableCell className="text-center font-semibold">
                        {totalRegion}
                      </TableCell>
                    </TableRow>
                  )
                })}
                <TableRow className="bg-muted/30 font-semibold hover:bg-muted/30">
                  <TableCell>Total</TableCell>
                  {ETATS_PROJET.map((e) => (
                    <TableCell key={e} className="text-center">
                      {data.filter((p) => p.etat === e).length}
                    </TableCell>
                  ))}
                  <TableCell className="text-center">{data.length}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Detail des projets */}
      <Card>
        <CardHeader>
          <CardTitle>Détail des projets</CardTitle>
          <CardDescription>{data.length} projet(s) affiché(s).</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50 hover:bg-muted/50">
                  <TableHead className="font-semibold">Code</TableHead>
                  <TableHead className="font-semibold">Intitulé</TableHead>
                  <TableHead className="font-semibold">Région</TableHead>
                  <TableHead className="font-semibold">Secteur</TableHead>
                  <TableHead className="font-semibold">État</TableHead>
                  <TableHead className="font-semibold">Progression</TableHead>
                  <TableHead className="text-right font-semibold">Financement</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((p) => (
                  <TableRow key={p.code}>
                    <TableCell className="font-medium">{p.code}</TableCell>
                    <TableCell>{p.intitule}</TableCell>
                    <TableCell>{p.region}</TableCell>
                    <TableCell>{p.secteur}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={etatBadge[p.etat]}>
                        {p.etat}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-20 overflow-hidden rounded-full bg-muted">
                          <div
                            className="h-full rounded-full bg-primary"
                            style={{ width: `${p.progression}%` }}
                          />
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {p.progression}%
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right whitespace-nowrap">
                      {formatFCFA(p.financement)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
