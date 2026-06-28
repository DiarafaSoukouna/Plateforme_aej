import { ResourceManager } from "@/components/resource-manager"
import { REGIONS } from "@/lib/mock-data"

export default function ProjetsSuiviPage() {
  return (
    <ResourceManager
      title="Projets"
      description="Suivi de l'avancement des projets financés."
      singular="Projet"
      fields={[
        { key: "code", label: "Code", required: true, placeholder: "PRJ-001" },
        { key: "intitule", label: "Intitulé", required: true },
        { key: "promoteur", label: "Promoteur", required: true },
        {
          key: "region",
          label: "Région",
          type: "select",
          options: REGIONS.map((r) => ({ label: r, value: r })),
        },
        {
          key: "etat",
          label: "État d'avancement",
          type: "select",
          badge: true,
          options: [
            { label: "Démarré", value: "Démarré" },
            { label: "En cours", value: "En cours" },
            { label: "Suspendu", value: "Suspendu" },
            { label: "Achevé", value: "Achevé" },
          ],
        },
        { key: "progression", label: "Progression (%)", type: "number" },
      ]}
      initialData={[
        { id: 1, code: "PRJ-001", intitule: "Maraîchage Bio", promoteur: "Ndiaye Aboubacar", region: "Thiès", etat: "En cours", progression: 65 },
        { id: 2, code: "PRJ-002", intitule: "Atelier de couture", promoteur: "Diop Fatoumata", region: "Kaolack", etat: "Achevé", progression: 100 },
        { id: 3, code: "PRJ-003", intitule: "Application mobile agricole", promoteur: "Fall Ismaël", region: "Dakar", etat: "Démarré", progression: 20 },
        { id: 4, code: "PRJ-004", intitule: "Élevage de volaille", promoteur: "Sow Aïcha", region: "Saint-Louis", etat: "Suspendu", progression: 40 },
        { id: 5, code: "PRJ-005", intitule: "Transformation de céréales", promoteur: "Ba Mamadou", region: "Diourbel", etat: "En cours", progression: 55 },
      ]}
    />
  )
}
