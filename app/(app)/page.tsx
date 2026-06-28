import { TrendingUp, Users, FolderKanban, Wallet, Briefcase } from "lucide-react"
import { PageHeader } from "@/components/layout/page-header"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  AvisChart,
  FinancementChart,
  ProjetsRegionChart,
} from "@/components/dashboard/charts"
import {
  activitesRecentes,
  dashboardKpis,
  repartitionAvis,
} from "@/lib/mock-data"
import { formatFCFA, formatNumber } from "@/lib/format"

const kpiIcons = [Users, FolderKanban, Wallet, Briefcase]
const legendColors = [
  "oklch(0.52 0.13 150)",
  "oklch(0.7 0.17 52)",
  "oklch(0.62 0.1 180)",
  "oklch(0.6 0.12 25)",
]

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Tableau de bord"
        description="Vue d'ensemble de la gestion, des suivis et des financements."
      />

      {/* KPIs */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {dashboardKpis.map((kpi, i) => {
          const Icon = kpiIcons[i]
          return (
            <Card key={kpi.label}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {kpi.label}
                </CardTitle>
                <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="size-4.5" />
                </span>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {kpi.money ? formatFCFA(kpi.value) : formatNumber(kpi.value)}
                </div>
                <p className="mt-1 flex items-center gap-1 text-xs text-primary">
                  <TrendingUp className="size-3.5" />
                  {kpi.trend}
                  <span className="text-muted-foreground">vs trimestre préc.</span>
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Graphiques */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Financements décaissés</CardTitle>
            <CardDescription>Évolution mensuelle (millions FCFA)</CardDescription>
          </CardHeader>
          <CardContent>
            <FinancementChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Avis des partenaires</CardTitle>
            <CardDescription>Répartition des dossiers</CardDescription>
          </CardHeader>
          <CardContent>
            <AvisChart />
            <ul className="mt-3 space-y-1.5">
              {repartitionAvis.map((item, i) => (
                <li
                  key={item.name}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="flex items-center gap-2">
                    <span
                      className="size-2.5 rounded-full"
                      style={{ backgroundColor: legendColors[i] }}
                    />
                    {item.name}
                  </span>
                  <span className="font-medium">{item.value}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Projets par région</CardTitle>
            <CardDescription>Top 6 des régions</CardDescription>
          </CardHeader>
          <CardContent>
            <ProjetsRegionChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Activités récentes</CardTitle>
            <CardDescription>Dernières actions sur la plateforme</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {activitesRecentes.map((a, i) => (
                <li key={i} className="flex gap-3">
                  <span className="mt-1.5 size-2 shrink-0 rounded-full bg-accent" />
                  <div className="text-sm">
                    <p>
                      <span className="font-medium">{a.user}</span> {a.action}
                    </p>
                    <p className="text-xs text-muted-foreground">{a.date}</p>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <Badge variant="secondary" className="text-xs">
        Données de démonstration
      </Badge>
    </div>
  )
}
