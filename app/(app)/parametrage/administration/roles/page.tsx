import { ResourceManager, type Field } from "@/components/resource-manager"

const fields: Field[] = [
  { key: "code", label: "Code", required: true, badge: true },
  { key: "libelle", label: "Libellé", required: true },
  { key: "description", label: "Description", type: "textarea" },
  { key: "nbUtilisateurs", label: "Utilisateurs", type: "number" },
]

const data = [
  { code: "ADMIN", libelle: "Administrateur", description: "Accès total à la plateforme", nbUtilisateurs: 2 },
  { code: "AGENT", libelle: "Agent de suivi", description: "Suivi des projets et indicateurs", nbUtilisateurs: 8 },
  { code: "GEST", libelle: "Gestionnaire", description: "Gestion des financements et référentiels", nbUtilisateurs: 5 },
  { code: "CONS", libelle: "Consultation", description: "Lecture seule", nbUtilisateurs: 12 },
]

export default function RolesPage() {
  return (
    <ResourceManager title="Rôles" singular="Rôle" fields={fields} initialData={data} />
  )
}
