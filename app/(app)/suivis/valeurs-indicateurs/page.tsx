import { ResourceManager } from "@/components/resource-manager"

export default function ValeursIndicateursPage() {
  return (
    <ResourceManager
      title="Valeurs des indicateurs"
      description="Saisie périodique des valeurs réalisées des indicateurs."
      singular="Valeur d'indicateur"
      fields={[
        { key: "indicateur", label: "Indicateur", required: true },
        {
          key: "periode",
          label: "Période",
          type: "select",
          badge: true,
          options: [
            { label: "T1 2024", value: "T1 2024" },
            { label: "T2 2024", value: "T2 2024" },
            { label: "T3 2024", value: "T3 2024" },
            { label: "T4 2024", value: "T4 2024" },
          ],
        },
        { key: "cible", label: "Cible", type: "number" },
        { key: "realise", label: "Réalisé", type: "number" },
        {
          key: "taux",
          label: "Taux (%)",
          render: (row) => {
            const c = Number(row.cible)
            const r = Number(row.realise)
            return c > 0 ? `${Math.round((r / c) * 100)} %` : "—"
          },
        },
      ]}
      initialData={[
        { id: 1, indicateur: "Nombre de jeunes formés", periode: "T1 2024", cible: 1250, realise: 1180 },
        { id: 2, indicateur: "Taux d'insertion professionnelle", periode: "T1 2024", cible: 60, realise: 52 },
        { id: 3, indicateur: "Nombre d'entreprises créées", periode: "T1 2024", cible: 200, realise: 174 },
        { id: 4, indicateur: "Nombre de jeunes formés", periode: "T2 2024", cible: 1250, realise: 1320 },
        { id: 5, indicateur: "Taux de remboursement", periode: "T2 2024", cible: 85, realise: 78 },
      ]}
    />
  )
}
