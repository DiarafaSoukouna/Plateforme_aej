import { ResourceManager, type Field } from "@/components/resource-manager"

const fields: Field[] = [
  { key: "nom", label: "Nom complet", required: true },
  { key: "email", label: "E-mail", type: "email", required: true },
  {
    key: "role",
    label: "Rôle",
    type: "select",
    required: true,
    badge: true,
    options: [
      { label: "Administrateur", value: "Administrateur" },
      { label: "Agent de suivi", value: "Agent de suivi" },
      { label: "Gestionnaire", value: "Gestionnaire" },
      { label: "Consultation", value: "Consultation" },
    ],
  },
  { key: "direction", label: "Direction", required: true },
  {
    key: "statut",
    label: "Statut",
    type: "select",
    badge: true,
    options: [
      { label: "Actif", value: "Actif" },
      { label: "Inactif", value: "Inactif" },
    ],
  },
]

const data = [
  { nom: "Aïcha Diallo", email: "admin@pdigsf.gov", role: "Administrateur", direction: "Direction Générale", statut: "Actif" },
  { nom: "Moussa Koné", email: "agent@pdigsf.gov", role: "Agent de suivi", direction: "Direction du Suivi", statut: "Actif" },
  { nom: "Fatou Sarr", email: "f.sarr@pdigsf.gov", role: "Gestionnaire", direction: "Direction des Financements", statut: "Actif" },
  { nom: "Ibrahima Ba", email: "i.ba@pdigsf.gov", role: "Gestionnaire", direction: "Direction des Référentiels", statut: "Inactif" },
  { nom: "Awa Ndiaye", email: "a.ndiaye@pdigsf.gov", role: "Consultation", direction: "Direction Générale", statut: "Actif" },
]

export default function UtilisateursPage() {
  return (
    <ResourceManager
      title="Utilisateurs"
      singular="Utilisateur"
      fields={fields}
      initialData={data}
    />
  )
}
