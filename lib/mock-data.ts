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

// Etats possibles d'un projet
export const ETATS_PROJET = ["Démarré", "En cours", "Suspendu", "Achevé"] as const

export const SECTEURS = [
  "Agriculture",
  "Élevage",
  "Artisanat",
  "Numérique",
  "Commerce",
  "Transformation",
]

// Jeu de donnees detaille des projets (matrice & rapports)
export type ProjetDetail = {
  code: string
  intitule: string
  promoteur: string
  region: string
  secteur: string
  etat: (typeof ETATS_PROJET)[number]
  progression: number
  financement: number
  jeunes: number
}

export const projetsDetail: ProjetDetail[] = [
  { code: "PRJ-001", intitule: "Maraîchage Bio", promoteur: "Ndiaye Aboubacar", region: "Thiès", secteur: "Agriculture", etat: "En cours", progression: 65, financement: 4500000, jeunes: 12 },
  { code: "PRJ-002", intitule: "Atelier de couture", promoteur: "Diop Fatoumata", region: "Kaolack", secteur: "Artisanat", etat: "Achevé", progression: 100, financement: 1800000, jeunes: 8 },
  { code: "PRJ-003", intitule: "Application mobile agricole", promoteur: "Fall Ismaël", region: "Dakar", secteur: "Numérique", etat: "Démarré", progression: 20, financement: 7200000, jeunes: 5 },
  { code: "PRJ-004", intitule: "Élevage de volaille", promoteur: "Sow Aïcha", region: "Saint-Louis", secteur: "Élevage", etat: "Suspendu", progression: 40, financement: 3200000, jeunes: 10 },
  { code: "PRJ-005", intitule: "Transformation de céréales", promoteur: "Ba Mamadou", region: "Diourbel", secteur: "Transformation", etat: "En cours", progression: 55, financement: 9500000, jeunes: 18 },
  { code: "PRJ-006", intitule: "Boutique solidaire", promoteur: "Sarr Khady", region: "Dakar", secteur: "Commerce", etat: "Achevé", progression: 100, financement: 2400000, jeunes: 6 },
  { code: "PRJ-007", intitule: "Pisciculture moderne", promoteur: "Gueye Ousmane", region: "Ziguinchor", secteur: "Élevage", etat: "En cours", progression: 70, financement: 5600000, jeunes: 14 },
  { code: "PRJ-008", intitule: "Centre de formation digitale", promoteur: "Faye Mariama", region: "Thiès", secteur: "Numérique", etat: "Démarré", progression: 30, financement: 8100000, jeunes: 22 },
  { code: "PRJ-009", intitule: "Unité de séchage de mangues", promoteur: "Cissé Abdou", region: "Kaolack", secteur: "Transformation", etat: "En cours", progression: 48, financement: 6300000, jeunes: 9 },
  { code: "PRJ-010", intitule: "Coopérative apicole", promoteur: "Mbaye Ndeye", region: "Saint-Louis", secteur: "Agriculture", etat: "Achevé", progression: 100, financement: 2900000, jeunes: 11 },
  { code: "PRJ-011", intitule: "Menuiserie communautaire", promoteur: "Diallo Samba", region: "Diourbel", secteur: "Artisanat", etat: "Suspendu", progression: 35, financement: 3700000, jeunes: 7 },
  { code: "PRJ-012", intitule: "E-commerce local", promoteur: "Niang Awa", region: "Dakar", secteur: "Commerce", etat: "En cours", progression: 60, financement: 4100000, jeunes: 13 },
]

// Rapport des jeunes par region
export const rapportJeunes = [
  { region: "Dakar", inscrits: 1240, formes: 860, inseres: 540 },
  { region: "Thiès", inscrits: 720, formes: 510, inseres: 320 },
  { region: "Saint-Louis", inscrits: 560, formes: 410, inseres: 260 },
  { region: "Kaolack", inscrits: 480, formes: 330, inseres: 190 },
  { region: "Ziguinchor", inscrits: 410, formes: 280, inseres: 170 },
  { region: "Diourbel", inscrits: 360, formes: 240, inseres: 150 },
]

// Rapport des stages
export const rapportStages = [
  { entreprise: "AgroTech Sénégal", domaine: "Agriculture", stagiaires: 24, termines: 18, embauches: 9 },
  { entreprise: "Digital Dakar", domaine: "Numérique", stagiaires: 31, termines: 27, embauches: 15 },
  { entreprise: "Coop Élevage Nord", domaine: "Élevage", stagiaires: 16, termines: 12, embauches: 5 },
  { entreprise: "Artisans Réunis", domaine: "Artisanat", stagiaires: 12, termines: 10, embauches: 4 },
  { entreprise: "TransFood SA", domaine: "Transformation", stagiaires: 20, termines: 16, embauches: 8 },
]

// Rapport de financement par partenaire
export const rapportFinancement = [
  { partenaire: "Fonds National de l'Emploi", dossiers: 86, octroye: 480000000, decaisse: 410000000 },
  { partenaire: "Banque Régionale de Développement", dossiers: 54, octroye: 320000000, decaisse: 250000000 },
  { partenaire: "Programme Jeunesse & Emploi", dossiers: 72, octroye: 540000000, decaisse: 470000000 },
  { partenaire: "Agence de Microfinance Locale", dossiers: 95, octroye: 210000000, decaisse: 205000000 },
  { partenaire: "Coopération Internationale", dossiers: 38, octroye: 295000000, decaisse: 180000000 },
]
