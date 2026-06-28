import { ResourceManager } from "@/components/resource-manager"

export default function IndicateursPage() {
  return (
    <ResourceManager
      title="Indicateurs"
      description="Indicateurs de performance suivis dans les projets et financements."
      singular="Indicateur"
      fields={[
        { key: "code", label: "Code", required: true, placeholder: "IND-001" },
        { key: "libelle", label: "Libellé", required: true, placeholder: "Nombre de jeunes formés" },
        {
          key: "unite",
          label: "Unité",
          type: "select",
          badge: true,
          options: [
            { label: "Nombre", value: "Nombre" },
            { label: "Pourcentage", value: "Pourcentage" },
            { label: "Montant (FCFA)", value: "Montant (FCFA)" },
            { label: "Ratio", value: "Ratio" },
          ],
        },
        { key: "cible", label: "Cible", type: "number", placeholder: "1000" },
        { key: "description", label: "Description", type: "textarea", hideInTable: true },
      ]}
      initialData={[
        { id: 1, code: "IND-001", libelle: "Nombre de jeunes formés", unite: "Nombre", cible: 5000, description: "" },
        { id: 2, code: "IND-002", libelle: "Taux d'insertion professionnelle", unite: "Pourcentage", cible: 60, description: "" },
        { id: 3, code: "IND-003", libelle: "Montant des financements octroyés", unite: "Montant (FCFA)", cible: 2000000000, description: "" },
        { id: 4, code: "IND-004", libelle: "Nombre d'entreprises créées", unite: "Nombre", cible: 800, description: "" },
        { id: 5, code: "IND-005", libelle: "Taux de remboursement", unite: "Pourcentage", cible: 85, description: "" },
      ]}
    />
  )
}
