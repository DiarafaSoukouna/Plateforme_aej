import { ResourceManager } from "@/components/resource-manager"
import { formatFCFA } from "@/lib/format"

export default function RemboursementPage() {
  return (
    <ResourceManager
      title="Remboursements"
      description="Suivi des échéances et remboursements des financements."
      singular="Remboursement"
      fields={[
        { key: "reference", label: "Réf. financement", required: true, placeholder: "FIN-2024-001" },
        { key: "promoteur", label: "Promoteur", required: true },
        {
          key: "montantDu",
          label: "Montant dû (FCFA)",
          type: "number",
          render: (row) => formatFCFA(Number(row.montantDu)),
        },
        {
          key: "montantRembourse",
          label: "Remboursé (FCFA)",
          type: "number",
          render: (row) => formatFCFA(Number(row.montantRembourse)),
        },
        { key: "echeance", label: "Échéance", type: "date" },
        {
          key: "statut",
          label: "Statut",
          type: "select",
          badge: true,
          options: [
            { label: "À jour", value: "À jour" },
            { label: "En retard", value: "En retard" },
            { label: "Soldé", value: "Soldé" },
          ],
        },
      ]}
      initialData={[
        { id: 1, reference: "FIN-2024-001", promoteur: "Ndiaye Aboubacar", montantDu: 4500000, montantRembourse: 2250000, echeance: "2025-02-10", statut: "À jour" },
        { id: 2, reference: "FIN-2024-002", promoteur: "Diop Fatoumata", montantDu: 1800000, montantRembourse: 1800000, echeance: "2024-12-05", statut: "Soldé" },
        { id: 3, reference: "FIN-2024-004", promoteur: "Sow Aïcha", montantDu: 3200000, montantRembourse: 800000, echeance: "2024-10-12", statut: "En retard" },
        { id: 4, reference: "FIN-2024-005", promoteur: "Ba Mamadou", montantDu: 9500000, montantRembourse: 3000000, echeance: "2025-05-01", statut: "À jour" },
      ]}
    />
  )
}
