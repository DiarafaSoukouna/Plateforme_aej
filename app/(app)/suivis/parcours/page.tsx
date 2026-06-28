import { ResourceManager } from "@/components/resource-manager"

export default function ParcoursPage() {
  return (
    <ResourceManager
      title="Suivi de parcours"
      description="Parcours d'insertion des jeunes bénéficiaires."
      singular="Parcours"
      fields={[
        { key: "jeune", label: "Jeune", required: true },
        { key: "matricule", label: "Matricule", placeholder: "JN-2024-0001" },
        {
          key: "etape",
          label: "Étape",
          type: "select",
          badge: true,
          options: [
            { label: "Orientation", value: "Orientation" },
            { label: "Formation", value: "Formation" },
            { label: "Stage", value: "Stage" },
            { label: "Insertion", value: "Insertion" },
          ],
        },
        { key: "structure", label: "Structure d'accueil" },
        { key: "dateDebut", label: "Date de début", type: "date" },
        { key: "dateFin", label: "Date de fin", type: "date", hideInTable: true },
        {
          key: "statut",
          label: "Statut",
          type: "select",
          badge: true,
          options: [
            { label: "En cours", value: "En cours" },
            { label: "Terminé", value: "Terminé" },
            { label: "Abandonné", value: "Abandonné" },
          ],
        },
      ]}
      initialData={[
        { id: 1, jeune: "Ndiaye Aboubacar", matricule: "JN-2024-0001", etape: "Insertion", structure: "AgriPlus Sénégal", dateDebut: "2024-03-01", dateFin: "", statut: "En cours" },
        { id: 2, jeune: "Diop Fatoumata", matricule: "JN-2024-0002", etape: "Formation", structure: "Centre de formation Thiès", dateDebut: "2024-04-10", dateFin: "2024-08-10", statut: "Terminé" },
        { id: 3, jeune: "Fall Ismaël", matricule: "JN-2024-0003", etape: "Stage", structure: "TechNova", dateDebut: "2024-05-15", dateFin: "", statut: "En cours" },
        { id: 4, jeune: "Sow Aïcha", matricule: "JN-2024-0004", etape: "Orientation", structure: "Antenne Kaolack", dateDebut: "2024-06-01", dateFin: "", statut: "En cours" },
      ]}
    />
  )
}
