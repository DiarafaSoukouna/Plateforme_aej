import { PageHeader } from "@/components/layout/page-header"
import { ResourceManager } from "@/components/resource-manager"
import { REGIONS } from "@/lib/mock-data"

export default function JeunesPage() {
  return (
    <div className="space-y-5">
      <PageHeader
        title="Jeunes"
        description="Répertoire des jeunes bénéficiaires des programmes d'insertion et de financement."
      />
      <div className="rounded-xl border bg-card p-4 sm:p-6">
        <ResourceManager
          title="Liste des jeunes"
          singular="Jeune"
          fields={[
            { key: "matricule", label: "Matricule", required: true, placeholder: "JN-2024-0001" },
            { key: "nom", label: "Nom", required: true },
            { key: "prenoms", label: "Prénoms", required: true },
            {
              key: "sexe",
              label: "Sexe",
              type: "select",
              badge: true,
              options: [
                { label: "Masculin", value: "M" },
                { label: "Féminin", value: "F" },
              ],
            },
            { key: "dateNaissance", label: "Date de naissance", type: "date", hideInTable: true },
            { key: "telephone", label: "Téléphone", placeholder: "+225 07 00 00 00 00" },
            { key: "email", label: "Email", type: "email", hideInTable: true },
            {
              key: "region",
              label: "Région",
              type: "select",
              options: REGIONS.map((r) => ({ label: r, value: r })),
            },
            {
              key: "niveau",
              label: "Niveau d'étude",
              type: "select",
              options: [
                { label: "Sans niveau", value: "Sans niveau" },
                { label: "Primaire", value: "Primaire" },
                { label: "Secondaire", value: "Secondaire" },
                { label: "Supérieur", value: "Supérieur" },
              ],
            },
            {
              key: "statut",
              label: "Statut",
              type: "select",
              badge: true,
              options: [
                { label: "En formation", value: "En formation" },
                { label: "En recherche", value: "En recherche" },
                { label: "Inséré", value: "Inséré" },
              ],
            },
          ]}
          initialData={[
            { id: 1, matricule: "JN-2024-0001", nom: "Ndiaye", prenoms: "Aboubacar", sexe: "M", dateNaissance: "2000-03-12", telephone: "+221 77 11 22 33", email: "a.ndiaye@mail.com", region: "Dakar", niveau: "Supérieur", statut: "Inséré" },
            { id: 2, matricule: "JN-2024-0002", nom: "Diop", prenoms: "Fatoumata", sexe: "F", dateNaissance: "2001-07-25", telephone: "+221 78 22 33 44", email: "f.diop@mail.com", region: "Thiès", niveau: "Secondaire", statut: "En formation" },
            { id: 3, matricule: "JN-2024-0003", nom: "Fall", prenoms: "Ismaël", sexe: "M", dateNaissance: "1999-11-02", telephone: "+221 76 33 44 55", email: "i.fall@mail.com", region: "Saint-Louis", niveau: "Supérieur", statut: "En recherche" },
            { id: 4, matricule: "JN-2024-0004", nom: "Sow", prenoms: "Aïcha", sexe: "F", dateNaissance: "2002-01-18", telephone: "+221 70 44 55 66", email: "a.sow@mail.com", region: "Kaolack", niveau: "Secondaire", statut: "En formation" },
            { id: 5, matricule: "JN-2024-0005", nom: "Ba", prenoms: "Mamadou Jean", sexe: "M", dateNaissance: "1998-09-30", telephone: "+221 77 55 66 77", email: "m.ba@mail.com", region: "Diourbel", niveau: "Supérieur", statut: "Inséré" },
            { id: 6, matricule: "JN-2024-0006", nom: "Sarr", prenoms: "Mariam", sexe: "F", dateNaissance: "2000-05-14", telephone: "+221 78 66 77 88", email: "m.sarr@mail.com", region: "Ziguinchor", niveau: "Primaire", statut: "En recherche" },
          ]}
        />
      </div>
    </div>
  )
}
