import { ReportView } from "@/components/report-view"
import { rapportFinancement } from "@/lib/mock-data"
import { formatFCFA, formatNumber } from "@/lib/format"

export default function RapportFinancementPage() {
  const totalDossiers = rapportFinancement.reduce((s, r) => s + r.dossiers, 0)
  const totalOctroye = rapportFinancement.reduce((s, r) => s + r.octroye, 0)
  const totalDecaisse = rapportFinancement.reduce((s, r) => s + r.decaisse, 0)
  const tauxDecaissement = totalOctroye
    ? Math.round((totalDecaisse / totalOctroye) * 100)
    : 0

  return (
    <ReportView
      title="Rapport de financement"
      description="Montants octroyés et décaissés par partenaire financier."
      filename="rapport_financement"
      summary={[
        { label: "Dossiers", value: formatNumber(totalDossiers) },
        { label: "Total octroyé", value: formatFCFA(totalOctroye) },
        { label: "Total décaissé", value: formatFCFA(totalDecaisse) },
        { label: "Taux de décaissement", value: `${tauxDecaissement} %` },
      ]}
      columns={[
        { key: "partenaire", label: "Partenaire financier" },
        { key: "dossiers", label: "Dossiers", align: "right", total: true, format: (v) => formatNumber(Number(v)) },
        { key: "octroye", label: "Octroyé", align: "right", total: true, format: (v) => formatFCFA(Number(v)) },
        { key: "decaisse", label: "Décaissé", align: "right", total: true, format: (v) => formatFCFA(Number(v)) },
        {
          key: "taux",
          label: "Décaissement",
          align: "right",
          format: (_v, row) =>
            row.octroye ? `${Math.round((row.decaisse / row.octroye) * 100)} %` : "—",
        },
      ]}
      rows={rapportFinancement}
    />
  )
}
