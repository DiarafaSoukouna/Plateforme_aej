import { ResourceManager, type Field } from "@/components/resource-manager"

const fields: Field[] = [
  { key: "code", label: "Code", required: true, badge: true },
  { key: "libelle", label: "Libellé de la direction", required: true },
  { key: "responsable", label: "Responsable", required: true },
  { key: "telephone", label: "Téléphone" },
]

const data = [
  { code: "DG", libelle: "Direction Générale", responsable: "Aïcha Diallo", telephone: "33 800 00 01" },
  { code: "DSE", libelle: "Direction du Suivi-Évaluation", responsable: "Moussa Koné", telephone: "33 800 00 02" },
  { code: "DF", libelle: "Direction des Financements", responsable: "Fatou Sarr", telephone: "33 800 00 03" },
  { code: "DR", libelle: "Direction des Référentiels", responsable: "Ibrahima Ba", telephone: "33 800 00 04" },
]

export default function DirectionsPage() {
  return (
    <ResourceManager
      title="Directions"
      singular="Direction"
      fields={fields}
      initialData={data}
    />
  )
}
