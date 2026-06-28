// Données fictives partagées (maquette)

export const REGIONS = [
  "Dakar",
  "Thiès",
  "Saint-Louis",
  "Diourbel",
  "Kaolack",
  "Ziguinchor",
  "Louga",
  "Fatick",
  "Tambacounda",
  "Kolda",
]

export const PROMOTEURS = [
  "Ndiaye",
  "Diop",
  "Fall",
  "Sow",
  "Ba",
  "Sarr",
  "Gueye",
  "Faye",
  "Cissé",
  "Mbaye",
]

export const PARTENAIRES_FINANCIERS = [
  "Fonds National de l'Emploi",
  "Banque Régionale de Développement",
  "Programme Jeunesse & Emploi",
  "Agence de Microfinance Locale",
  "Coopération Internationale",
]

export const AVIS = ["Favorable", "Défavorable", "En attente", "Réservé"]

// Indicateurs de pilotage du tableau de bord
export const dashboardKpis = [
  { label: "Jeunes enregistrés", value: 4286, trend: "+12,4 %", positive: true },
  { label: "Projets financés", value: 312, trend: "+8,1 %", positive: true },
  { label: "Financements (FCFA)", value: 1_845_000_000, trend: "+15,2 %", positive: true, money: true },
  { label: "Embauches", value: 1027, trend: "+5,6 %", positive: true },
]

export const financementParMois = [
  { mois: "Jan", montant: 120 },
  { mois: "Fév", montant: 180 },
  { mois: "Mar", montant: 150 },
  { mois: "Avr", montant: 210 },
  { mois: "Mai", montant: 260 },
  { mois: "Juin", montant: 230 },
  { mois: "Juil", montant: 310 },
  { mois: "Août", montant: 285 },
]

export const projetsParRegion = [
  { region: "Dakar", projets: 86 },
  { region: "Thiès", projets: 54 },
  { region: "Saint-Louis", projets: 41 },
  { region: "Kaolack", projets: 33 },
  { region: "Ziguinchor", projets: 28 },
  { region: "Diourbel", projets: 24 },
]

export const repartitionAvis = [
  { name: "Favorable", value: 198 },
  { name: "En attente", value: 74 },
  { name: "Réservé", value: 25 },
  { name: "Défavorable", value: 15 },
]

export const activitesRecentes = [
  { user: "Aïcha Diallo", action: "a validé le financement du projet « Maraîchage Bio »", date: "Il y a 2 h" },
  { user: "Moussa Koné", action: "a enregistré 3 nouveaux jeunes à Thiès", date: "Il y a 4 h" },
  { user: "Fatou Sarr", action: "a mis à jour les valeurs d'indicateurs du Q2", date: "Hier" },
  { user: "Ibrahima Ba", action: "a ajouté l'organisme « Microfinance Sénégal »", date: "Hier" },
  { user: "Awa Ndiaye", action: "a généré le rapport de stages mensuel", date: "Il y a 2 j" },
]
