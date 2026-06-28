import { ResourceManager } from "@/components/resource-manager"

export default function LocalitesPage() {
  return (
    <ResourceManager
      title="Localités"
      description="Régions, départements et communes du territoire."
      singular="Localité"
      fields={[
        { key: "nom", label: "Nom", required: true, placeholder: "Pikine" },
        {
          key: "niveau",
          label: "Niveau",
          type: "select",
          badge: true,
          required: true,
          options: [
            { label: "Région", value: "Région" },
            { label: "Département", value: "Département" },
            { label: "Commune", value: "Commune" },
            { label: "Village/Quartier", value: "Village/Quartier" },
          ],
        },
        { key: "parent", label: "Localité parente", placeholder: "Dakar" },
        { key: "code", label: "Code", placeholder: "DK-01" },
      ]}
      initialData={[
        { id: 1, nom: "Dakar", niveau: "Région", parent: "—", code: "DK" },
        { id: 2, nom: "Pikine", niveau: "Département", parent: "Dakar", code: "DK-02" },
        { id: 3, nom: "Guédiawaye", niveau: "Département", parent: "Dakar", code: "DK-03" },
        { id: 4, nom: "Thiès", niveau: "Région", parent: "—", code: "TH" },
        { id: 5, nom: "Mbour", niveau: "Département", parent: "Thiès", code: "TH-02" },
        { id: 6, nom: "Saly", niveau: "Commune", parent: "Mbour", code: "TH-02-01" },
      ]}
    />
  )
}
