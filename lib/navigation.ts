export type NavLeaf = {
  label: string
  href: string
}

export type NavItem = {
  label: string
  href?: string
  children?: NavLeaf[]
}

export const navigation: NavItem[] = [
  { label: "Tableau de bord", href: "/" },
  {
    label: "Paramétrage",
    children: [
      { label: "Administration", href: "/parametrage/administration/utilisateurs" },
      { label: "Autres paramétrages", href: "/parametrage/autres/type-emploi" },
    ],
  },
  {
    label: "Référentiels",
    children: [
      { label: "Jeunes", href: "/referentiels/jeunes" },
      { label: "Entreprises", href: "/referentiels/entreprises" },
      { label: "Localités", href: "/referentiels/localites" },
    ],
  },
  {
    label: "Financement",
    children: [
      { label: "Financement", href: "/financement" },
      { label: "Organismes", href: "/financement/organismes" },
      { label: "Remboursement", href: "/financement/remboursement" },
    ],
  },
  {
    label: "Suivis",
    children: [
      { label: "Projets", href: "/suivis/projets" },
      { label: "Valeurs des indicateurs", href: "/suivis/valeurs-indicateurs" },
      { label: "Suivi de parcours", href: "/suivis/parcours" },
      { label: "Embauches", href: "/suivis/embauches" },
    ],
  },
  { label: "Matrice des projets", href: "/matrice-projets" },
  {
    label: "Rapport",
    children: [
      { label: "Rapport des jeunes", href: "/rapport/jeunes" },
      { label: "Rapport de stages", href: "/rapport/stages" },
      { label: "Rapport de financement", href: "/rapport/financement" },
      { label: "Rapport matrice projets", href: "/rapport/matrice-projets" },
    ],
  },
]

// Sous-menus horizontaux (pages séparées présentées comme des onglets)
export const subNavs: Record<string, NavLeaf[]> = {
  administration: [
    { label: "Utilisateurs", href: "/parametrage/administration/utilisateurs" },
    { label: "Rôles", href: "/parametrage/administration/roles" },
    { label: "Permissions", href: "/parametrage/administration/permissions" },
    { label: "Directions", href: "/parametrage/administration/directions" },
    { label: "Services", href: "/parametrage/administration/services" },
    { label: "Fonctions", href: "/parametrage/administration/fonctions" },
  ],
  autres: [
    { label: "Type d'emploi", href: "/parametrage/autres/type-emploi" },
    { label: "Type d'entreprise", href: "/parametrage/autres/type-entreprise" },
    { label: "Indicateurs", href: "/parametrage/autres/indicateurs" },
  ],
  localites: [
    { label: "Localités", href: "/referentiels/localites" },
    { label: "Niveaux de localités", href: "/referentiels/localites/niveaux" },
  ],
  financement: [
    { label: "Financement", href: "/financement" },
    { label: "Organismes", href: "/financement/organismes" },
    { label: "Remboursement", href: "/financement/remboursement" },
  ],
  suivis: [
    { label: "Projets", href: "/suivis/projets" },
    { label: "Valeurs des indicateurs", href: "/suivis/valeurs-indicateurs" },
    { label: "Suivi de parcours", href: "/suivis/parcours" },
    { label: "Embauches", href: "/suivis/embauches" },
  ],
}
