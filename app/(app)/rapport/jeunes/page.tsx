import { ReportView } from "@/components/report-view"
import { rapportJeunes } from "@/lib/mock-data"
import { formatNumber } from "@/lib/format"

export default function RapportJeunesPage() {
  const totalInscrits = rapportJeunes.reduce((s, r) => s + r.inscrits, 0)
  const totalFormes = rapportJeunes.reduce((s, r) => s + r.formes, 0)
  const totalInseres = rapportJeunes.reduce((s, r) => s + r.inseres, 0)
  const tauxInsertion = totalInscrits
    ? Math.round((totalInseres / totalInscrits) * 100)
    : 0

  return (
    <ReportView
      title="Rapport des jeunes"
      description="Synthèse des jeunes inscrits, formés et insérés par région."
      filename="rapport_jeunes"
      summary={[
        { label: "Total inscrits", value: formatNumber(totalInscrits) },
        { label: "Total formés", value: formatNumber(totalFormes) },
        { label: "Total insérés", value: formatNumber(totalInseres) },
        { label: "Taux d'insertion", value: `${tauxInsertion} %` },
      ]}
      columns={[
        { key: "region", label: "Région" },
        { key: "inscrits", label: "Inscrits", align: "right", total: true, format: (v) => formatNumber(Number(v)) },
        { key: "formes", label: "Formés", align: "right", total: true, format: (v) => formatNumber(Number(v)) },
        { key: "inseres", label: "Insérés", align: "right", total: true, format: (v) => formatNumber(Number(v)) },
        {
          key: "taux",
          label: "Taux d'insertion",
          align: "right",
          format: (_v, row) =>
            row.inscrits ? `${Math.round((row.inseres / row.inscrits) * 100)} %` : "—",
        },
      ]}
      rows={rapportJeunes}
    />
  )
}
