import { ReportView } from "@/components/report-view"
import { rapportStages } from "@/lib/mock-data"
import { formatNumber } from "@/lib/format"

export default function RapportStagesPage() {
  const totalStagiaires = rapportStages.reduce((s, r) => s + r.stagiaires, 0)
  const totalTermines = rapportStages.reduce((s, r) => s + r.termines, 0)
  const totalEmbauches = rapportStages.reduce((s, r) => s + r.embauches, 0)
  const tauxEmbauche = totalTermines
    ? Math.round((totalEmbauches / totalTermines) * 100)
    : 0

  return (
    <ReportView
      title="Rapport de stages"
      description="Suivi des stages par entreprise d'accueil."
      filename="rapport_stages"
      summary={[
        { label: "Stagiaires", value: formatNumber(totalStagiaires) },
        { label: "Stages terminés", value: formatNumber(totalTermines) },
        { label: "Embauches", value: formatNumber(totalEmbauches) },
        { label: "Taux d'embauche", value: `${tauxEmbauche} %` },
      ]}
      columns={[
        { key: "entreprise", label: "Entreprise" },
        { key: "domaine", label: "Domaine" },
        { key: "stagiaires", label: "Stagiaires", align: "right", total: true, format: (v) => formatNumber(Number(v)) },
        { key: "termines", label: "Terminés", align: "right", total: true, format: (v) => formatNumber(Number(v)) },
        { key: "embauches", label: "Embauches", align: "right", total: true, format: (v) => formatNumber(Number(v)) },
      ]}
      rows={rapportStages}
    />
  )
}
