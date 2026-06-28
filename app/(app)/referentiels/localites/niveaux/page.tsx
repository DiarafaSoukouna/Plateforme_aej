import { ResourceManager } from "@/components/resource-manager"

export default function NiveauxLocalitesPage() {
  return (
    <ResourceManager
      title="Niveaux de localités"
      description="Hiérarchie des niveaux administratifs du découpage géographique."
      singular="Niveau"
      fields={[
        { key: "ordre", label: "Ordre", type: "number", required: true, placeholder: "1" },
        { key: "libelle", label: "Libellé", required: true, placeholder: "Région" },
        { key: "code", label: "Code", placeholder: "REG" },
        { key: "description", label: "Description", type: "textarea", hideInTable: true },
      ]}
      initialData={[
        { id: 1, ordre: 1, libelle: "Région", code: "REG", description: "" },
        { id: 2, ordre: 2, libelle: "Département", code: "DEP", description: "" },
        { id: 3, ordre: 3, libelle: "Arrondissement", code: "ARR", description: "" },
        { id: 4, ordre: 4, libelle: "Commune", code: "COM", description: "" },
        { id: 5, ordre: 5, libelle: "Village / Quartier", code: "VIL", description: "" },
      ]}
    />
  )
}
