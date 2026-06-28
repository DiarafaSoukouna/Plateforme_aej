import { PageHeader } from "@/components/layout/page-header"
import { ResourceManager } from "@/components/resource-manager"
import { REGIONS } from "@/lib/mock-data"

export default function EntreprisesPage() {
  return (
    <div className="space-y-5">
      <PageHeader
        title="Entreprises"
        description="Répertoire des entreprises partenaires et structures d'accueil."
      />
      <div className="rounded-xl border bg-card p-4 sm:p-6">
        <ResourceManager
          title="Liste des entreprises"
          singular="Entreprise"
          fields={[
            { key: "raisonSociale", label: "Raison sociale", required: true },
            {
              key: "type",
              label: "Type",
              type: "select",
              badge: true,
              options: [
                { label: "SARL", value: "SARL" },
                { label: "SA", value: "SA" },
                { label: "GIE", value: "GIE" },
                { label: "Entreprise individuelle", value: "EI" },
                { label: "Coopérative", value: "COOP" },
              ],
            },
            { key: "secteur", label: "Secteur d'activité", placeholder: "Agriculture" },
            {
              key: "region",
              label: "Région",
              type: "select",
              options: REGIONS.map((r) => ({ label: r, value: r })),
            },
            { key: "contact", label: "Personne de contact", hideInTable: true },
            { key: "telephone", label: "Téléphone" },
            { key: "email", label: "Email", type: "email", hideInTable: true },
            { key: "effectif", label: "Effectif", type: "number" },
          ]}
          initialData={[
            { id: 1, raisonSociale: "AgriPlus Sénégal", type: "SARL", secteur: "Agriculture", region: "Thiès", contact: "M. Diop", telephone: "+221 33 951 00 00", email: "contact@agriplus.sn", effectif: 24 },
            { id: 2, raisonSociale: "TechNova", type: "SA", secteur: "Numérique", region: "Dakar", contact: "Mme Ndiaye", telephone: "+221 33 820 11 22", email: "info@technova.sn", effectif: 58 },
            { id: 3, raisonSociale: "Coopérative Maraîchère du Nord", type: "COOP", secteur: "Agriculture", region: "Saint-Louis", contact: "M. Fall", telephone: "+221 33 961 22 33", email: "coopnord@mail.sn", effectif: 40 },
            { id: 4, raisonSociale: "BTP Services", type: "SARL", secteur: "Bâtiment", region: "Dakar", contact: "M. Ba", telephone: "+221 33 824 33 44", email: "btp@services.sn", effectif: 120 },
            { id: 5, raisonSociale: "Atelier Couture Mariam", type: "EI", secteur: "Artisanat", region: "Kaolack", contact: "Mme Sarr", telephone: "+221 77 555 44 33", email: "", effectif: 6 },
          ]}
        />
      </div>
    </div>
  )
}
