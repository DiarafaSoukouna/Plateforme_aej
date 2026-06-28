import { ResourceManager } from "@/components/resource-manager"
import { formatFCFA } from "@/lib/format"

export default function EmbauchesPage() {
  return (
    <ResourceManager
      title="Embauches"
      description="Suivi des embauches réalisées par les entreprises partenaires."
      singular="Embauche"
      fields={[
        { key: "jeune", label: "Jeune", required: true },
        { key: "entreprise", label: "Entreprise", required: true },
        { key: "poste", label: "Poste" },
        {
          key: "typeContrat",
          label: "Type de contrat",
          type: "select",
          badge: true,
          options: [
            { label: "CDI", value: "CDI" },
            { label: "CDD", value: "CDD" },
            { label: "Stage", value: "Stage" },
            { label: "Apprentissage", value: "Apprentissage" },
          ],
        },
        {
          key: "salaire",
          label: "Salaire (FCFA)",
          type: "number",
          render: (row) => formatFCFA(Number(row.salaire)),
        },
        { key: "dateEmbauche", label: "Date d'embauche", type: "date" },
      ]}
      initialData={[
        { id: 1, jeune: "Ndiaye Aboubacar", entreprise: "AgriPlus Sénégal", poste: "Technicien agricole", typeContrat: "CDI", salaire: 180000, dateEmbauche: "2024-06-01" },
        { id: 2, jeune: "Fall Ismaël", entreprise: "TechNova", poste: "Développeur junior", typeContrat: "CDD", salaire: 250000, dateEmbauche: "2024-07-15" },
        { id: 3, jeune: "Diop Fatoumata", entreprise: "Atelier Couture Mariam", poste: "Couturière", typeContrat: "Apprentissage", salaire: 90000, dateEmbauche: "2024-08-20" },
        { id: 4, jeune: "Ba Mamadou", entreprise: "BTP Services", poste: "Conducteur de travaux", typeContrat: "CDI", salaire: 300000, dateEmbauche: "2024-09-05" },
      ]}
    />
  )
}
