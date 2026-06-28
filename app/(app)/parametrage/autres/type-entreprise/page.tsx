import { ResourceManager } from "@/components/resource-manager"

export default function TypeEntreprisePage() {
  return (
    <ResourceManager
      title="Types d'entreprise"
      description="Formes juridiques et catégories d'entreprises partenaires."
      singular="Type d'entreprise"
      fields={[
        { key: "code", label: "Code", required: true, placeholder: "SARL" },
        { key: "libelle", label: "Libellé", required: true, placeholder: "Société à responsabilité limitée" },
        {
          key: "secteur",
          label: "Secteur",
          type: "select",
          badge: true,
          options: [
            { label: "Privé", value: "Privé" },
            { label: "Public", value: "Public" },
            { label: "Économie sociale", value: "Économie sociale" },
            { label: "Informel", value: "Informel" },
          ],
        },
        { key: "description", label: "Description", type: "textarea", hideInTable: true },
      ]}
      initialData={[
        { id: 1, code: "SARL", libelle: "Société à responsabilité limitée", secteur: "Privé", description: "" },
        { id: 2, code: "SA", libelle: "Société anonyme", secteur: "Privé", description: "" },
        { id: 3, code: "GIE", libelle: "Groupement d'intérêt économique", secteur: "Économie sociale", description: "" },
        { id: 4, code: "EI", libelle: "Entreprise individuelle", secteur: "Informel", description: "" },
        { id: 5, code: "COOP", libelle: "Coopérative", secteur: "Économie sociale", description: "" },
      ]}
    />
  )
}
