import { ResourceManager } from "@/components/resource-manager"

export default function TypeEmploiPage() {
  return (
    <ResourceManager
      title="Types d'emploi"
      description="Catégories d'emploi utilisées dans le suivi des parcours et des embauches."
      singular="Type d'emploi"
      fields={[
        { key: "code", label: "Code", required: true, placeholder: "CDI" },
        { key: "libelle", label: "Libellé", required: true, placeholder: "Contrat à durée indéterminée" },
        {
          key: "categorie",
          label: "Catégorie",
          type: "select",
          badge: true,
          options: [
            { label: "Salarié", value: "Salarié" },
            { label: "Indépendant", value: "Indépendant" },
            { label: "Stage", value: "Stage" },
            { label: "Apprentissage", value: "Apprentissage" },
          ],
        },
        { key: "description", label: "Description", type: "textarea", hideInTable: true },
      ]}
      initialData={[
        { id: 1, code: "CDI", libelle: "Contrat à durée indéterminée", categorie: "Salarié", description: "" },
        { id: 2, code: "CDD", libelle: "Contrat à durée déterminée", categorie: "Salarié", description: "" },
        { id: 3, code: "STG", libelle: "Stage de qualification", categorie: "Stage", description: "" },
        { id: 4, code: "AUTO", libelle: "Auto-entrepreneur", categorie: "Indépendant", description: "" },
        { id: 5, code: "APP", libelle: "Contrat d'apprentissage", categorie: "Apprentissage", description: "" },
      ]}
    />
  )
}
