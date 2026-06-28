import { ResourceManager, type Field } from "@/components/resource-manager"

const fields: Field[] = [
  { key: "code", label: "Code", required: true, badge: true },
  { key: "libelle", label: "Libellé", required: true },
  {
    key: "module",
    label: "Module",
    type: "select",
    badge: true,
    options: [
      { label: "Paramétrage", value: "Paramétrage" },
      { label: "Référentiels", value: "Référentiels" },
      { label: "Financement", value: "Financement" },
      { label: "Suivis", value: "Suivis" },
      { label: "Rapport", value: "Rapport" },
    ],
  },
  {
    key: "action",
    label: "Action",
    type: "select",
    options: [
      { label: "Créer", value: "Créer" },
      { label: "Lire", value: "Lire" },
      { label: "Modifier", value: "Modifier" },
      { label: "Supprimer", value: "Supprimer" },
    ],
  },
]

const data = [
  { code: "USER_CREATE", libelle: "Créer un utilisateur", module: "Paramétrage", action: "Créer" },
  { code: "PROJ_READ", libelle: "Consulter les projets", module: "Suivis", action: "Lire" },
  { code: "FIN_UPDATE", libelle: "Modifier un financement", module: "Financement", action: "Modifier" },
  { code: "JEUNE_DELETE", libelle: "Supprimer un jeune", module: "Référentiels", action: "Supprimer" },
  { code: "RAPPORT_READ", libelle: "Générer un rapport", module: "Rapport", action: "Lire" },
]

export default function PermissionsPage() {
  return (
    <ResourceManager
      title="Permissions"
      singular="Permission"
      fields={fields}
      initialData={data}
    />
  )
}
