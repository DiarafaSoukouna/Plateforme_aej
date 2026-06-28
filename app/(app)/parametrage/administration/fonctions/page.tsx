import { ResourceManager, type Field } from "@/components/resource-manager"

const fields: Field[] = [
  { key: "code", label: "Code", required: true, badge: true },
  { key: "libelle", label: "Libellé de la fonction", required: true },
  { key: "categorie", label: "Catégorie", badge: true,
    type: "select",
    options: [
      { label: "Direction", value: "Direction" },
      { label: "Encadrement", value: "Encadrement" },
      { label: "Exécution", value: "Exécution" },
    ],
  },
]

const data = [
  { code: "DIR", libelle: "Directeur", categorie: "Direction" },
  { code: "CHEF", libelle: "Chef de service", categorie: "Encadrement" },
  { code: "AGT", libelle: "Agent", categorie: "Exécution" },
  { code: "ASS", libelle: "Assistant", categorie: "Exécution" },
]

export default function FonctionsPage() {
  return (
    <ResourceManager
      title="Fonctions"
      singular="Fonction"
      fields={fields}
      initialData={data}
    />
  )
}
