import { ResourceManager } from "@/components/resource-manager"
import { PARTENAIRES_FINANCIERS, AVIS } from "@/lib/mock-data"
import { formatFCFA } from "@/lib/format"

export default function FinancementPage() {
  return (
    <ResourceManager
      title="Financements"
      description="Dossiers de financement octroyés aux promoteurs."
      singular="Financement"
      fields={[
        { key: "reference", label: "Référence", required: true, placeholder: "FIN-2024-001" },
        { key: "promoteur", label: "Promoteur", required: true },
        { key: "projet", label: "Projet", required: true },
        {
          key: "partenaire",
          label: "Partenaire financier",
          type: "select",
          options: PARTENAIRES_FINANCIERS.map((p) => ({ label: p, value: p })),
        },
        {
          key: "montant",
          label: "Montant (FCFA)",
          type: "number",
          required: true,
          render: (row) => formatFCFA(Number(row.montant)),
        },
        { key: "dateOctroi", label: "Date d'octroi", type: "date" },
        {
          key: "avis",
          label: "Avis",
          type: "select",
          badge: true,
          options: AVIS.map((a) => ({ label: a, value: a })),
        },
      ]}
      initialData={[
        { id: 1, reference: "FIN-2024-001", promoteur: "Ndiaye Aboubacar", projet: "Maraîchage Bio", partenaire: "Fonds National de l'Emploi", montant: 4500000, dateOctroi: "2024-02-10", avis: "Favorable" },
        { id: 2, reference: "FIN-2024-002", promoteur: "Diop Fatoumata", projet: "Atelier de couture", partenaire: "Agence de Microfinance Locale", montant: 1800000, dateOctroi: "2024-03-05", avis: "Favorable" },
        { id: 3, reference: "FIN-2024-003", promoteur: "Fall Ismaël", projet: "Application mobile agricole", partenaire: "Programme Jeunesse & Emploi", montant: 7200000, dateOctroi: "2024-03-22", avis: "En attente" },
        { id: 4, reference: "FIN-2024-004", promoteur: "Sow Aïcha", projet: "Élevage de volaille", partenaire: "Banque Régionale de Développement", montant: 3200000, dateOctroi: "2024-04-12", avis: "Réservé" },
        { id: 5, reference: "FIN-2024-005", promoteur: "Ba Mamadou", projet: "Transformation de céréales", partenaire: "Coopération Internationale", montant: 9500000, dateOctroi: "2024-05-01", avis: "Favorable" },
      ]}
    />
  )
}
