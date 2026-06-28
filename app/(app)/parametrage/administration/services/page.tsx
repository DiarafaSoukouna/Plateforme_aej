import { ResourceManager, type Field } from "@/components/resource-manager"

const fields: Field[] = [
  { key: "code", label: "Code", required: true, badge: true },
  { key: "libelle", label: "Libellé du service", required: true },
  {
    key: "direction",
    label: "Direction de rattachement",
    type: "select",
    required: true,
    options: [
      { label: "Direction Générale", value: "Direction Générale" },
      { label: "Direction du Suivi-Évaluation", value: "Direction du Suivi-Évaluation" },
      { label: "Direction des Financements", value: "Direction des Financements" },
      { label: "Direction des Référentiels", value: "Direction des Référentiels" },
    ],
  },
  { key: "responsable", label: "Responsable" },
]

const data = [
  { code: "SRH", libelle: "Service des Ressources Humaines", direction: "Direction Générale", responsable: "Awa Ndiaye" },
  { code: "SSE", libelle: "Service Suivi-Évaluation", direction: "Direction du Suivi-Évaluation", responsable: "Cheikh Faye" },
  { code: "SDF", libelle: "Service Décaissement", direction: "Direction des Financements", responsable: "Mariama Sow" },
  { code: "SRE", libelle: "Service Recensement", direction: "Direction des Référentiels", responsable: "Omar Cissé" },
]

export default function ServicesPage() {
  return (
    <ResourceManager
      title="Services"
      singular="Service"
      fields={fields}
      initialData={data}
    />
  )
}
