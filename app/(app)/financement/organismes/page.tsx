import { ResourceManager } from "@/components/resource-manager"

export default function OrganismesPage() {
  return (
    <ResourceManager
      title="Organismes de financement"
      description="Partenaires financiers et bailleurs de fonds."
      singular="Organisme"
      fields={[
        { key: "nom", label: "Nom", required: true },
        { key: "sigle", label: "Sigle", placeholder: "FNE" },
        {
          key: "type",
          label: "Type",
          type: "select",
          badge: true,
          options: [
            { label: "Fonds public", value: "Fonds public" },
            { label: "Banque", value: "Banque" },
            { label: "Microfinance", value: "Microfinance" },
            { label: "ONG / Coopération", value: "ONG / Coopération" },
          ],
        },
        { key: "contact", label: "Contact", hideInTable: true },
        { key: "telephone", label: "Téléphone" },
        { key: "email", label: "Email", type: "email", hideInTable: true },
      ]}
      initialData={[
        { id: 1, nom: "Fonds National de l'Emploi", sigle: "FNE", type: "Fonds public", contact: "Direction des financements", telephone: "+221 33 889 00 00", email: "contact@fne.sn" },
        { id: 2, nom: "Banque Régionale de Développement", sigle: "BRD", type: "Banque", contact: "Service crédit", telephone: "+221 33 822 11 22", email: "credit@brd.sn" },
        { id: 3, nom: "Agence de Microfinance Locale", sigle: "AML", type: "Microfinance", contact: "Guichet PME", telephone: "+221 33 845 33 44", email: "info@aml.sn" },
        { id: 4, nom: "Programme Jeunesse & Emploi", sigle: "PJE", type: "ONG / Coopération", contact: "Cellule projets", telephone: "+221 33 860 55 66", email: "projets@pje.org" },
        { id: 5, nom: "Coopération Internationale", sigle: "COOP-INT", type: "ONG / Coopération", contact: "Bureau Dakar", telephone: "+221 33 869 77 88", email: "dakar@coopint.org" },
      ]}
    />
  )
}
