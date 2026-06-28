import { ReportView } from "@/components/report-view"
import { REGIONS, projetsDetail } from "@/lib/mock-data"
import { formatFCFA, formatNumber } from "@/lib/format"

export default function RapportMatriceProjetsPage() {
  // Agregation par region
  const rows = REGIONS.filter((r) => projetsDetail.some((p) => p.region === r)).map(
    (region) => {
      const projets = projetsDetail.filter((p) => p.region === region)
      return {
        region,
        total: projets.length,
        enCours: projets.filter((p) => p.etat === "En cours").length,
        acheves: projets.filter((p) => p.etat === "Achevé").length,
        jeunes: projets.reduce((s, p) => s + p.jeunes, 0),
        financement: projets.reduce((s, p) => s + p.financement, 0),
      }
    },
  )

  const totalProjets = projetsDetail.length
  const totalAchevés = projetsDetail.filter((p) => p.etat === "Achevé").length
  const totalJeunes = projetsDetail.reduce((s, p) => s + p.jeunes, 0)
  const totalFinancement = projetsDetail.reduce((s, p) => s + p.financement, 0)

  return (
    <ReportView
      title="Rapport matrice projets"
      description="Synthèse des projets par région : volume, état et financement."
      filename="rapport_matrice_projets"
      summary={[
        { label: "Projets", value: formatNumber(totalProjets) },
        { label: "Projets achevés", value: formatNumber(totalAchevés) },
        { label: "Jeunes concernés", value: formatNumber(totalJeunes) },
        { label: "Financement total", value: formatFCFA(totalFinancement) },
      ]}
      columns={[
        { key: "region", label: "Région" },
        { key: "total", label: "Projets", align: "right", total: true, format: (v) => formatNumber(Number(v)) },
        { key: "enCours", label: "En cours", align: "right", total: true, format: (v) => formatNumber(Number(v)) },
        { key: "acheves", label: "Achevés", align: "right", total: true, format: (v) => formatNumber(Number(v)) },
        { key: "jeunes", label: "Jeunes", align: "right", total: true, format: (v) => formatNumber(Number(v)) },
        { key: "financement", label: "Financement", align: "right", total: true, format: (v) => formatFCFA(Number(v)) },
      ]}
      rows={rows}
    />
  )
}
