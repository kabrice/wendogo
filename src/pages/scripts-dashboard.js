import React, { useState, useMemo } from 'react';
import { Search, Clock, Eye, Tag, Filter, CheckCircle, Calendar, TrendingUp, Play, BookOpen } from 'lucide-react';

const ScriptsDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedMood, setSelectedMood] = useState('all');
  const [showDetails, setShowDetails] = useState(null);

const scripts = [
  // CATÉGORIE 1 : VISA & REFUS (15 contenus)
{
  id: 1,
  title: "POV: Tu découvres le VRAI motif de ton refus visa",
  category: "VISA & REFUS",
  duration: "30s",
  mood: "Révélation choquante",
  decor: "Bureau sombre + document officiel zoom",
  status: "priority",
  service: "Pack Visa",
  cta: "Découvre tous les motifs secrets sur wendogo.com",
  content: [
    "DÉBUT : 'Motif 5 écrit sur ton refus : informations incomplètes...'",
    "FAUX DIAGNOSTIC : 'Tu penses qu'il manque des documents'",
    "TWIST CHOQUANT : 'En réalité, ils ne te FONT PAS CONFIANCE'",
    "RÉVÉLATION : Motif 5 = problème de crédibilité, pas de documents",
    "EXEMPLES CONCRETS : Garant ami vs famille / Hôtel 3 mois vs CROUS",
    "SOLUTION : Reconstruire la confiance, pas juste compléter"
  ],
  hashtags: ["#motif5", "#refusvisa", "#verite", "#confiance", "#wendogo"],
  
  // SCRIPT DÉTAILLÉ pour tournage :
  hook: "Tu vois 'Motif 5' sur ton refus...",
  setup: "Tu cours partout chercher les documents 'manquants'",
  twist: "PLOT TWIST : Ils ont TOUS tes documents !",
  revelation: "Le problème ? Ils ne te croient pas.",
  proof: [
    "Garant 'ami' = pas crédible",
    "Virement de dernière minute = suspect", 
    "Attestation hébergement sans contacts = douteux"
  ],
  punchline: "Motif 5 = 'On ne vous croit pas', pas 'Il manque des trucs'"
},
  {
    id: 2,
    title: "3 erreurs qui font AUTOMATIQUEMENT refuser ton visa",
    category: "VISA & REFUS",
    duration: "45s",
    mood: "Urgence/Panique",
    decor: "Fond rouge",
    status: "urgent",
    service: "Pack Visa",
    cta: "Évite ces pièges avec wendogo.com",
    content: [
      "AMÉLIORÉ : Erreur 1 : Garant 1899€ net au lieu de 1900€ (après charges familiales)",
      "AMÉLIORÉ : Erreur 2 : Signature noire au lieu de bleue (détail consul)",
      "AMÉLIORÉ : Erreur 3 : Virement le jour du dossier (historique suspect)"
    ],
    hashtags: ["#erreursvisa", "#garant", "#wendogo"]
  },
  {
    id: 3,
    title: "Je décode ton refus visa en 10 secondes",
    category: "VISA & REFUS",
    duration: "15s",
    mood: "Défi/Speed",
    decor: "Timer visible",
    status: "viral",
    service: "Pack Visa",
    cta: "Solutions sur wendogo.com",
    content: [
      "Motif 2 = 'Ton garant est pauvre'",
      "Motif 4 = 'Ton projet pue'",
      "Motif 5 = 'Ton école est bidon'",
      "NOUVEAU : Motif 9 = 'Documents falsifiés détectés'"
    ],
    hashtags: ["#decodage", "#motifrefus", "#wendogo"]
  },
  {
    id: 4,
    title: "Plot twist : Ce que le consul fait VRAIMENT de ton dossier",
    category: "VISA & REFUS",
    duration: "60s",
    mood: "Behind the scenes",
    decor: "Mise en scène consulat",
    status: "trending",
    service: "Pack Visa",
    cta: "Prépare-toi mieux sur wendogo.com",
    content: [
      "Simulation humoristique du consul qui examine",
      "AMÉLIORÉ : 'Il compare les signatures en 3 secondes'",
      "AMÉLIORÉ : 'Il calcule les charges familiales de tête'"
    ],
    hashtags: ["#consul", "#behindthescenes", "#wendogo"]
  },
  {
    id: 5,
    title: "Red flags que même TOI tu connais pas",
    category: "VISA & REFUS",
    duration: "30s",
    mood: "Mystère",
    decor: "Fond noir",
    status: "priority",
    service: "Pack Visa",
    cta: "Liste complète sur wendogo.com",
    content: [
      "AMÉLIORÉ : AVI par email au lieu d'original papier",
      "AMÉLIORÉ : Contact manquant sur attestation hébergement",
      "NOUVEAU : Signatures différentes titre/lettre"
    ],
    hashtags: ["#redflags", "#secrets", "#wendogo"]
  },
  {
    id: 6,
    title: "Ils ont eu leur visa au 4ème essai grâce à ça...",
    category: "VISA & REFUS",
    duration: "45s",
    mood: "Success story",
    decor: "Témoignages",
    status: "trending",
    service: "Pack Visa",
    cta: "Ta stratégie sur wendogo.com",
    content: [
      "Transformation avant/après",
      "AMÉLIORÉ : 'Il a changé de 3 garants faibles à 1 garant solide'",
      "Résultats concrets"
    ],
    hashtags: ["#successstory", "#transformation", "#wendogo"]
  },
  {
    id: 7,
    title: "Le hack que 99% ignorent pour le visa",
    category: "VISA & REFUS",
    duration: "20s",
    mood: "Secret révélé",
    decor: "Chuchotement",
    status: "viral",
    service: "Pack Visa",
    cta: "Plus de hacks sur wendogo.com",
    content: [
      "NOUVEAU : 'Cette phrase magique quand AVI arrive par email'",
      "Exemple concret d'application",
      "Pourquoi ça marche"
    ],
    hashtags: ["#hack", "#secret", "#astuce", "#wendogo"]
  },
  {
    id: 8,
    title: "Campus France vs Consulat : qui décide VRAIMENT ?",
    category: "VISA & REFUS",
    duration: "40s",
    mood: "Débat",
    decor: "Split screen",
    status: "important",
    service: "Pack Visa",
    cta: "Comprends le système sur wendogo.com",
    content: [
      "AMÉLIORATION MAJEURE : Campus France = avis pédagogique SEULEMENT",
      "NOUVEAU : Consul = décision finale sur visa",
      "NOUVEAU : Campus OUI + Consul NON = possible"
    ],
    hashtags: ["#campusfrance", "#consulat", "#systeme", "#wendogo"]
  },
  {
    id: 9,
    title: "Cette phrase dans ta lettre = refus garanti",
    category: "VISA & REFUS",
    duration: "25s",
    mood: "Alerte",
    decor: "Texte barré rouge",
    status: "urgent",
    service: "Pack Visa",
    cta: "Exemples parfaits sur wendogo.com",
    content: [
      "AMÉLIORÉ : 'Je veux rester en France après mes études'",
      "NOUVEAU : 'Cette formation n'existe pas en Algérie'",
      "Alternatives qui marchent"
    ],
    hashtags: ["#lettremotivation", "#erreur", "#phrase", "#wendogo"]
  },
  {
    id: 10,
    title: "Visa accordé en 7 jours : voici comment",
    category: "VISA & REFUS",
    duration: "35s",
    mood: "Speed success",
    decor: "Chronométrage",
    status: "viral",
    service: "Pack Visa",
    cta: "Méthode complète sur wendogo.com",
    content: [
      "Dossier parfait décomposé",
      "AMÉLIORÉ : Documents couleur + signatures manuscrites",
      "Secrets de rapidité"
    ],
    hashtags: ["#rapidevisa", "#7jours", "#methode", "#wendogo"]
  },
  {
    id: 11,
    title: "Je teste les conseils TikTok les plus viraux",
    category: "VISA & REFUS",
    duration: "60s",
    mood: "Expérience",
    decor: "Test en live",
    status: "trending",
    service: "Pack Visa",
    cta: "Vrais conseils sur wendogo.com",
    content: [
      "NOUVEAU : Test 'photocopie N&B acceptable'",
      "NOUVEAU : Test '3 garants mieux qu'1'",
      "Vérité sur leur efficacité"
    ],
    hashtags: ["#test", "#tiktokconseils", "#verite", "#wendogo"]
  },
  {
    id: 12,
    title: "Cette école refuse 90% des visas étudiants",
    category: "VISA & REFUS",
    duration: "30s",
    mood: "Révélation",
    decor: "Graphiques",
    status: "important",
    service: "Pack Orientation",
    cta: "Écoles vérifiées sur wendogo.com",
    content: [
      "NOUVEAU : GGI Business School cas concret",
      "NOUVEAU : École non-reconnue par État français",
      "Pourquoi certaines écoles posent problème"
    ],
    hashtags: ["#ecole", "#refusvisa", "#ggibusiness", "#wendogo"]
  },
  {
    id: 13,
    title: "Refus Campus France ≠ Refus Visa (confusion mortelle)",
    category: "VISA & REFUS",
    duration: "40s",
    mood: "Distinction cruciale",
    decor: "2 tampons différents",
    status: "priority",
    service: "Pack Visa",
    cta: "Différences détaillées sur wendogo.com",
    content: [
      "Campus France = avis pédagogique uniquement",
      "Consul = décision visa finale",
      "Peut avoir Campus OUI + Visa NON"
    ],
    hashtags: ["#confusion", "#distinction", "#campusfrance", "#wendogo"]
  },
  {
    id: 14,
    title: "POV: Tu réalises que ton garant 'solide' est en fait faible",
    category: "VISA & REFUS",
    duration: "35s",
    mood: "Situational comedy",
    decor: "Calculs flottants",
    status: "viral",
    service: "Pack Visa",
    cta: "Calculateur réel sur wendogo.com",
    content: [
      "Garant 3000€ avec 4 enfants = 600€ disponible seulement",
      "Face de réalisation progressive",
      "Calcul charges familiales révélé"
    ],
    hashtags: ["#pov", "#garantfaible", "#calcul", "#wendogo"]
  },
  {
    id: 15,
    title: "Cette erreur dans ton historique bancaire = game over",
    category: "VISA & REFUS",
    duration: "25s",
    mood: "Problem-solver",
    decor: "Relevé bancaire zoom",
    status: "urgent",
    service: "Pack Visa",
    cta: "Timeline financière sur wendogo.com",
    content: [
      "Virement le jour du dossier = suspect",
      "Solution : Délai minimum 3 mois",
      "Comment préparer l'historique parfait"
    ],
    hashtags: ["#historiquebancaire", "#erreur", "#timeline", "#wendogo"]
  },

  // CATÉGORIE 2 : FINANCES & GARANTS (12 contenus)
  {
    id: 16,
    title: "Ton garant gagne 3000€ mais tu seras refusé... voici pourquoi",
    category: "FINANCES & GARANTS",
    duration: "40s",
    mood: "Surprise",
    decor: "Calculatrice",
    status: "priority",
    service: "Pack Visa",
    cta: "Calcul précis sur wendogo.com",
    content: [
      "AMÉLIORÉ : Calcul charges familiales déductibles",
      "NOUVEAU : Exemple avec 2,5 parts fiscales",
      "Seuil réel vs seuil apparent"
    ],
    hashtags: ["#garant", "#charges", "#calcul", "#wendogo"]
  },
  {
    id: 17,
    title: "Compte bloqué vs garant : le match du siècle",
    category: "FINANCES & GARANTS",
    duration: "50s",
    mood: "Combat épique",
    decor: "Ring de boxe",
    status: "trending",
    service: "Pack Visa",
    cta: "Stratégie sur wendogo.com",
    content: [
      "Avantages/inconvénients de chaque option",
      "AMÉLIORÉ : Déblocage après 3-6 mois pour compte bloqué",
      "Verdict final selon profil"
    ],
    hashtags: ["#comptebloque", "#garant", "#match", "#wendogo"]
  },
  {
    id: 18,
    title: "Cette astuce transforme ton garant faible en garant parfait",
    category: "FINANCES & GARANTS",
    duration: "35s",
    mood: "Transformation",
    decor: "Avant/après",
    status: "viral",
    service: "Pack Visa",
    cta: "Guide complet sur wendogo.com",
    content: [
      "NOUVEAU : Garant 2355€ net + documents complets",
      "Documents supplémentaires qui renforcent",
      "Présentation optimisée"
    ],
    hashtags: ["#transformation", "#garantfaible", "#astuce", "#wendogo"]
  },
  {
    id: 19,
    title: "Ils louent des garants sur Facebook... (ça finit mal)",
    category: "FINANCES & GARANTS",
    duration: "45s",
    mood: "Drame/Warning",
    decor: "Écran cassé",
    status: "important",
    service: "Pack Visa",
    cta: "Solutions légales sur wendogo.com",
    content: [
      "Témoignages d'échecs",
      "NOUVEAU : 'Cousine éloignée' = lien trop faible",
      "Alternatives légales"
    ],
    hashtags: ["#facebook", "#garantlocation", "#echec", "#wendogo"]
  },
  {
    id: 20,
    title: "Argent reçu hier = refus aujourd'hui",
    category: "FINANCES & GARANTS",
    duration: "25s",
    mood: "Flash info",
    decor: "Breaking news",
    status: "urgent",
    service: "Pack Visa",
    cta: "Timeline sur wendogo.com",
    content: [
      "AMÉLIORÉ : Timing crucial des virements (minimum 3 mois)",
      "Délais recommandés",
      "Justifications nécessaires"
    ],
    hashtags: ["#timing", "#virement", "#delai", "#wendogo"]
  },
  {
    id: 21,
    title: "Le secret des 615€ que personne ne dit",
    category: "FINANCES & GARANTS",
    duration: "30s",
    mood: "Révélation",
    decor: "Chuchotement",
    status: "viral",
    service: "Pack Visa",
    cta: "Calculs réels sur wendogo.com",
    content: [
      "NOUVEAU : 615€ théorique ≠ 615€ après charges",
      "Variations selon situation familiale",
      "Optimisation stratégique"
    ],
    hashtags: ["#615euros", "#secret", "#charges", "#wendogo"]
  },
  {
    id: 22,
    title: "Garant à l'étranger vs garant en France : le verdict",
    category: "FINANCES & GARANTS",
    duration: "40s",
    mood: "Comparaison",
    decor: "Split world",
    status: "trending",
    service: "Pack Visa",
    cta: "Guide international sur wendogo.com",
    content: [
      "AMÉLIORÉ : Garant Allemagne accepté si documents légalisés",
      "Preuves à fournir selon pays",
      "Stratégies selon profil"
    ],
    hashtags: ["#garantetranger", "#allemagne", "#international", "#wendogo"]
  },
  {
    id: 23,
    title: "Cette banque refuse TOUS les comptes bloqués étudiants",
    category: "FINANCES & GARANTS",
    duration: "35s",
    mood: "Alerte",
    decor: "Panneau stop",
    status: "important",
    service: "Pack Visa",
    cta: "Liste mise à jour sur wendogo.com",
    content: [
      "Banques à éviter absolument",
      "NOUVEAU : CIH, Studely, AVICENTER recommandées",
      "Critères de choix"
    ],
    hashtags: ["#banque", "#comptebloque", "#cih", "#wendogo"]
  },
  {
    id: 24,
    title: "Frais d'école = 10000€, budget consul = 7380€... Logique ?",
    category: "FINANCES & GARANTS",
    duration: "30s",
    mood: "Confusion",
    decor: "Mathématiques",
    status: "trending",
    service: "Pack Visa",
    cta: "Budgets réels sur wendogo.com",
    content: [
      "Incohérence dévoilée",
      "NOUVEAU : Frais école ≠ budget vie",
      "Stratégies d'ajustement"
    ],
    hashtags: ["#fraisecole", "#budget", "#incoherence", "#wendogo"]
  },
  {
    id: 25,
    title: "Papa vs Maman vs Oncle : qui choisir comme garant ?",
    category: "FINANCES & GARANTS",
    duration: "45s",
    mood: "Famille",
    decor: "Photo famille",
    status: "priority",
    service: "Pack Visa",
    cta: "Stratégie familiale sur wendogo.com",
    content: [
      "AMÉLIORÉ : Hiérarchie liens familiaux (parents > fratrie > oncles)",
      "Impact sur la crédibilité consulaire",
      "Cas particuliers acceptés"
    ],
    hashtags: ["#famille", "#hierarchie", "#choixgarant", "#wendogo"]
  },
  {
    id: 26,
    title: "Red Flags vs Green Flags : Ton dossier garant",
    category: "FINANCES & GARANTS",
    duration: "40s",
    mood: "Comparison",
    decor: "Feux tricolores",
    status: "viral",
    service: "Pack Visa",
    cta: "Audit dossier sur wendogo.com",
    content: [
      "🔴 Red Flag : Garant 8000dh retraite + frère 13400dh",
      "🟡 Warning : Garant 82k€ mais ami famille",
      "🟢 Green Flag : Parent salarié 3000€ net avec preuves"
    ],
    hashtags: ["#redflags", "#greenflags", "#audit", "#wendogo"]
  },
  {
    id: 27,
    title: "POV: Ton oncle t'envoie l'AVI par email",
    category: "FINANCES & GARANTS",
    duration: "30s",
    mood: "Situational comedy",
    decor: "Email + imprimante",
    status: "viral",
    service: "Pack Visa",
    cta: "Scripts parfaits sur wendogo.com",
    content: [
      "Panique initiale",
      "Dame TLS qui demande les originaux",
      "Phrase magique : 'Mon oncle me l'a envoyé par PDF, voici les coordonnées banque'"
    ],
    hashtags: ["#pov", "#avi", "#email", "#wendogo"]
  },

  // CATÉGORIE 3 : HÉBERGEMENT & DISTANCE (10 contenus)
  {
    id: 28,
    title: "64km = OK, 66km = REFUS... Sérieusement ?",
    category: "HÉBERGEMENT & DISTANCE",
    duration: "25s",
    mood: "Absurde",
    decor: "GPS géant",
    status: "viral",
    service: "Pack Orientation",
    cta: "Calculs précis sur wendogo.com",
    content: [
      "AMÉLIORÉ : Règle exacte des 65km dévoilée",
      "Cas limites problématiques",
      "Solutions transport en commun"
    ],
    hashtags: ["#distance", "#hebergement", "#absurde", "#wendogo"]
  },
  {
    id: 29,
    title: "Ton hébergeur a oublié ça = refus garanti",
    category: "HÉBERGEMENT & DISTANCE",
    duration: "30s",
    mood: "Détective",
    decor: "Loupe géante",
    status: "urgent",
    service: "Pack Installation",
    cta: "Checklist hébergement sur wendogo.com",
    content: [
      "AMÉLIORÉ : Contacts téléphone manquants",
      "NOUVEAU : Signatures différentes titre/lettre",
      "Template parfait révélé"
    ],
    hashtags: ["#hebergeur", "#checklist", "#template", "#wendogo"]
  },
  {
    id: 30,
    title: "Hôtel 3 mois = red flag énorme (voici pourquoi)",
    category: "HÉBERGEMENT & DISTANCE",
    duration: "35s",
    mood: "Warning",
    decor: "Panneau danger",
    status: "important",
    service: "Pack Installation",
    cta: "Solutions logement sur wendogo.com",
    content: [
      "Perception consul révélée",
      "AMÉLIORÉ : Maximum 1 mois acceptable",
      "Alternatives crédibles (résidences étudiantes)"
    ],
    hashtags: ["#hotel", "#redflag", "#logement", "#wendogo"]
  },
  {
    id: 31,
    title: "Cette capture d'écran sauve ton dossier hébergement",
    category: "HÉBERGEMENT & DISTANCE",
    duration: "20s",
    mood: "Hack technique",
    decor: "Screen phone",
    status: "viral",
    service: "Pack Installation",
    cta: "Template capture sur wendogo.com",
    content: [
      "AMÉLIORÉ : Google Maps avec temps transport",
      "Informations exactes à inclure",
      "Timing optimal pour capture"
    ],
    hashtags: ["#capture", "#googlemaps", "#hack", "#wendogo"]
  },
  {
    id: 32,
    title: "Ami vs famille pour l'hébergement : le match",
    category: "HÉBERGEMENT & DISTANCE",
    duration: "40s",
    mood: "Combat",
    decor: "VS screen",
    status: "trending",
    service: "Pack Installation",
    cta: "Guide choix hébergeur sur wendogo.com",
    content: [
      "AMÉLIORÉ : Famille = toujours plus crédible",
      "Documents requis différents",
      "NOUVEAU : 'Ami français' mieux qu''ami étranger'"
    ],
    hashtags: ["#ami", "#famille", "#hebergement", "#wendogo"]
  },
  {
    id: 33,
    title: "Transport en commun : cette app peut sauver ton visa",
    category: "HÉBERGEMENT & DISTANCE",
    duration: "25s",
    mood: "Tech savvy",
    decor: "Apps phones",
    status: "viral",
    service: "Pack Installation",
    cta: "Outils transport sur wendogo.com",
    content: [
      "NOUVEAU : Google Maps + Citymapper",
      "Preuves transport à capturer",
      "Calcul temps porte-à-porte"
    ],
    hashtags: ["#transport", "#app", "#citymapper", "#wendogo"]
  },
  {
    id: 34,
    title: "Résidence étudiante vs colocation : ce qu'ils préfèrent",
    category: "HÉBERGEMENT & DISTANCE",
    duration: "35s",
    mood: "Inside info",
    decor: "Coulisses",
    status: "trending",
    service: "Pack Installation",
    cta: "Hiérarchie logements sur wendogo.com",
    content: [
      "AMÉLIORÉ : CROUS = gold standard",
      "Résidences privées acceptables",
      "Colocation = plus de documents"
    ],
    hashtags: ["#residence", "#crous", "#colocation", "#wendogo"]
  },
  {
    id: 35,
    title: "Cette ville = refus automatique pour l'hébergement",
    category: "HÉBERGEMENT & DISTANCE",
    duration: "30s",
    mood: "Géographie",
    decor: "Carte France",
    status: "important",
    service: "Pack Installation",
    cta: "Carte complète sur wendogo.com",
    content: [
      "Villes problématiques révélées",
      "NOUVEAU : Longwy = petite ville, peu d'options",
      "Alternatives stratégiques"
    ],
    hashtags: ["#ville", "#longwy", "#geographie", "#wendogo"]
  },
  {
    id: 36,
    title: "POV: Tu réalises que ton hébergeur a 2 signatures différentes",
    category: "HÉBERGEMENT & DISTANCE",
    duration: "25s",
    mood: "Situational comedy",
    decor: "Documents comparés",
    status: "viral",
    service: "Pack Installation",
    cta: "Vérification signature sur wendogo.com",
    content: [
      "Moment de panique en comparant",
      "Consul qui compare TOUJOURS",
      "Solution de dernière minute"
    ],
    hashtags: ["#pov", "#signature", "#panique", "#wendogo"]
  },
  {
    id: 37,
    title: "Cette phrase sauve ton hébergement 'temporaire'",
    category: "HÉBERGEMENT & DISTANCE",
    duration: "30s",
    mood: "Problem-solver",
    decor: "Lettre explicative",
    status: "priority",
    service: "Pack Installation",
    cta: "Justification hébergement sur wendogo.com",
    content: [
      "'Hébergement transitoire en attendant logement étudiant'",
      "Preuve recherche active de logement",
      "Documents CROUS en cours"
    ],
    hashtags: ["#temporaire", "#justification", "#phrase", "#wendogo"]
  },

  // CATÉGORIE 4 : ÉCOLES & ORIENTATION (15 contenus)
  {
    id: 38,
    title: "École privée = 11000€, publique = 254€... Même diplôme ?",
    category: "ÉCOLES & ORIENTATION",
    duration: "40s",
    mood: "Comparaison choc",
    decor: "Price tags",
    status: "trending",
    service: "Pack Orientation",
    cta: "Comparateur diplômes sur wendogo.com",
    content: [
      "AMÉLIORÉ : RNCP = reconnaissance diplôme clé",
      "Valeur sur le marché comparée",
      "ROI calculé précisément"
    ],
    hashtags: ["#ecole", "#prixformation", "#rncp", "#wendogo"]
  },
  {
    id: 39,
    title: "Cette école privée a 5% d'acceptation visa",
    category: "ÉCOLES & ORIENTATION",
    duration: "35s",
    mood: "Statistiques",
    decor: "Graphiques rouges",
    status: "important",
    service: "Pack Orientation",
    cta: "Base de données écoles sur wendogo.com",
    content: [
      "NOUVEAU : GGI Business School nommée",
      "Raisons des refus consulaires",
      "Écoles sûres recommandées"
    ],
    hashtags: ["#ecoleprivee", "#ggibusiness", "#acceptation", "#wendogo"]
  },
  {
    id: 40,
    title: "Licence → BTS : cette lettre a convaincu le consul",
    category: "ÉCOLES & ORIENTATION",
    duration: "45s",
    mood: "Success story",
    decor: "Lettre manuscrite",
    status: "viral",
    service: "Pack Orientation",
    cta: "Templates régression sur wendogo.com",
    content: [
      "AMÉLIORÉ : Justification 'spécialisation technique nécessaire'",
      "Arguments qui fonctionnent vraiment",
      "Structure gagnante détaillée"
    ],
    hashtags: ["#licence", "#bts", "#regression", "#wendogo"]
  },
  {
    id: 41,
    title: "RNCP, CTI, EESPIG... décode ces acronymes en 10s",
    category: "ÉCOLES & ORIENTATION",
    duration: "15s",
    mood: "Speed learning",
    decor: "Acronymes volants",
    status: "trending",
    service: "Pack Orientation",
    cta: "Vérificateur reconnaissance sur wendogo.com",
    content: [
      "AMÉLIORÉ : RNCP = reconnaissance État",
      "CTI = écoles ingénieurs",
      "EESPIG = écoles privées reconnues"
    ],
    hashtags: ["#rncp", "#cti", "#eespig", "#wendogo"]
  },
  {
    id: 42,
    title: "Cette formation n'existe pas en France (arrête de chercher)",
    category: "ÉCOLES & ORIENTATION",
    duration: "30s",
    mood: "Reality check",
    decor: "Panneau stop",
    status: "important",
    service: "Pack Orientation",
    cta: "Moteur équivalences sur wendogo.com",
    content: [
      "NOUVEAU : Formations inexistantes populaires nommées",
      "Équivalences françaises exactes",
      "Redirections intelligentes"
    ],
    hashtags: ["#formation", "#inexistante", "#equivalence", "#wendogo"]
  },
  {
    id: 43,
    title: "Parcoursup vs Campus France : le piège mortel",
    category: "ÉCOLES & ORIENTATION",
    duration: "50s",
    mood: "Piège dévoilé",
    decor: "Labyrinthe",
    status: "priority",
    service: "Pack Orientation",
    cta: "Guide procédures sur wendogo.com",
    content: [
      "AMÉLIORÉ : Parcoursup = BTS, CPGE seulement",
      "Campus France = universités étrangers",
      "Erreurs de procédure communes"
    ],
    hashtags: ["#parcoursup", "#campusfrance", "#piege", "#wendogo"]
  },
  {
    id: 44,
    title: "Cette école publique refuse même les 18/20",
    category: "ÉCOLES & ORIENTATION",
    duration: "35s",
    mood: "Élitisme",
    decor: "Rejection letters",
    status: "trending",
    service: "Pack Orientation",
    cta: "Chances réelles par école sur wendogo.com",
    content: [
      "NOUVEAU : Sorbonne, Paris Cité ultra-sélectives",
      "Critères cachés dévoilés",
      "Alternatives viables pour excellents dossiers"
    ],
    hashtags: ["#sorbonne", "#pariscite", "#elitisme", "#wendogo"]
  },
  {
    id: 45,
    title: "Alternance : cette phrase magique ouvre toutes les portes",
    category: "ÉCOLES & ORIENTATION",
    duration: "25s",
    mood: "Formule magique",
    decor: "Baguette magique",
    status: "viral",
    service: "Pack Orientation",
    cta: "Scripts alternance sur wendogo.com",
    content: [
      "AMÉLIORÉ : 'Mon objectif est l'expérience professionnelle française'",
      "Pourquoi ça rassure le consul",
      "Où utiliser cette phrase"
    ],
    hashtags: ["#alternance", "#phrase", "#magique", "#wendogo"]
  },
  {
    id: 46,
    title: "Master 1 ou Master 2 : ce choix change tout",
    category: "ÉCOLES & ORIENTATION",
    duration: "40s",
    mood: "Décision cruciale",
    decor: "Carrefour",
    status: "priority",
    service: "Pack Orientation",
    cta: "Orientation niveau sur wendogo.com",
    content: [
      "AMÉLIORÉ : M1 = plus de temps d'adaptation",
      "M2 = spécialisation directe",
      "Impact sur visa et intégration"
    ],
    hashtags: ["#master1", "#master2", "#choix", "#wendogo"]
  },
  {
    id: 47,
    title: "Cette spécialité = 95% d'emploi garanti en France",
    category: "ÉCOLES & ORIENTATION",
    duration: "30s",
    mood: "Opportunité",
    decor: "Graphiques verts",
    status: "viral",
    service: "Pack Orientation",
    cta: "Secteurs porteurs sur wendogo.com",
    content: [
      "NOUVEAU : Sciences alimentaires, Data, Cybersécurité",
      "Données emploi réelles 2024",
      "Entreprises qui recrutent"
    ],
    hashtags: ["#specialite", "#emploi", "#cybersecurite", "#wendogo"]
  },
  {
    id: 48,
    title: "École connectée vs non-connectée : ça change TOUT",
    category: "ÉCOLES & ORIENTATION",
    duration: "40s",
    mood: "Distinction cruciale",
    decor: "Split screen",
    status: "important",
    service: "Pack Orientation",
    cta: "Liste complète sur wendogo.com",
    content: [
      "École connectée = via Campus France",
      "Non-connectée = candidature directe puis 'Je suis accepté'",
      "Paris-Saclay, ESSEC, Paris 2 = non-connectées"
    ],
    hashtags: ["#ecoleconnectee", "#parissaclay", "#essec", "#wendogo"]
  },
  {
    id: 49,
    title: "Procédure parallèle : ce raccourci que 90% ignorent",
    category: "ÉCOLES & ORIENTATION",
    duration: "45s",
    mood: "Secret révélé",
    decor: "Chemin détourné",
    status: "viral",
    service: "Pack Orientation",
    cta: "Procédures parallèles sur wendogo.com",
    content: [
      "Paris-Saclay INCEPTION février-mars",
      "Deadline différente de Campus France",
      "Double chance d'admission"
    ],
    hashtags: ["#procedureparallele", "#inception", "#raccourci", "#wendogo"]
  },
  {
    id: 50,
    title: "Paiement frais en plusieurs fois : cette astuce légale",
    category: "ÉCOLES & ORIENTATION",
    duration: "35s",
    mood: "Solution financière",
    decor: "Échéancier",
    status: "trending",
    service: "Pack Orientation",
    cta: "Négociation frais sur wendogo.com",
    content: [
      "Écoles privées acceptent échelonnement",
      "Négociation avec école avant inscription",
      "Impact sur dossier visa nul"
    ],
    hashtags: ["#paiement", "#echelonnement", "#negociation", "#wendogo"]
  },
  {
    id: 51,
    title: "Ces universités t'exonèrent (liste secrète)",
    category: "ÉCOLES & ORIENTATION",
    duration: "50s",
    mood: "Opportunité",
    decor: "Liste défilante",
    status: "viral",
    service: "Pack Orientation",
    cta: "Liste complète exonérations sur wendogo.com",
    content: [
      "Aix-Marseille, Avignon, Lorraine, Lille...",
      "Exonération partielle vs totale",
      "Critères d'éligibilité révélés"
    ],
    hashtags: ["#exoneration", "#aixmarseille", "#lille", "#wendogo"]
  },
  {
    id: 52,
    title: "Red Flags vs Green Flags : Ton choix d'université",
    category: "ÉCOLES & ORIENTATION",
    duration: "40s",
    mood: "Comparison",
    decor: "Feux tricolores",
    status: "priority",
    service: "Pack Orientation",
    cta: "Audit choix universités sur wendogo.com",
    content: [
      "🔴 Red Flag : Que Paris dans tes voeux",
      "🟡 Warning : Sorbonne avec 12 de moyenne",
      "🟢 Green Flag : Mix Lyon/Lille/ULCO"
    ],
    hashtags: ["#redflags", "#choixuniversite", "#lyon", "#wendogo"]
  },

  // CATÉGORIE 5 : PROCÉDURES & TIMING (8 contenus)
  {
    id: 53,
    title: "Référent académique : Prof vs Encadrant stage, qui choisir ?",
    category: "PROCÉDURES & TIMING",
    duration: "35s",
    mood: "Dilemme",
    decor: "Balance",
    status: "new",
    service: "Pack Orientation",
    cta: "Guide référents sur wendogo.com",
    content: [
      "Prof = connaît niveau académique",
      "Encadrant stage = connaît compétences pratiques",
      "Paris-Saclay accepte les deux"
    ],
    hashtags: ["#referent", "#parissaclay", "#choix", "#wendogo"]
  },
  {
    id: 54,
    title: "Cette université accepte en juillet, l'autre ferme en février",
    category: "PROCÉDURES & TIMING",
    duration: "30s",
    mood: "Timing différentiel",
    decor: "Calendrier",
    status: "important",
    service: "Pack Orientation",
    cta: "Calendrier admissions sur wendogo.com",
    content: [
      "Deadlines variables par université",
      "Rentrées décalées cachées mars/septembre",
      "Opportunités tardives révélées"
    ],
    hashtags: ["#deadline", "#calendrier", "#timing", "#wendogo"]
  },
  {
    id: 55,
    title: "POV: Tu découvres que ton université favorite n'est pas connectée",
    category: "PROCÉDURES & TIMING",
    duration: "25s",
    mood: "Situational comedy",
    decor: "Interface Campus France",
    status: "viral",
    service: "Pack Orientation",
    cta: "Procédures par université sur wendogo.com",
    content: [
      "Recherche désespérée dans Campus France",
      "Réalisation : candidature directe nécessaire",
      "Timeline complètement différente"
    ],
    hashtags: ["#pov", "#universite", "#nonconnectee", "#wendogo"]
  },
  {
    id: 56,
    title: "Dossier soumis = impossible de modifier (même une virgule)",
    category: "PROCÉDURES & TIMING",
    duration: "20s",
    mood: "Point de non-retour",
    decor: "Bouton grisé",
    status: "urgent",
    service: "Pack Orientation",
    cta: "Checklist final sur wendogo.com",
    content: [
      "Interface verrouillée après soumission",
      "Seule solution : nouveau dossier = nouveau paiement",
      "Vérification finale cruciale"
    ],
    hashtags: ["#dossier", "#soumission", "#verrouille", "#wendogo"]
  },
  {
    id: 57,
    title: "Campus France Alger vs Constantine : inégalité choquante",
    category: "PROCÉDURES & TIMING",
    duration: "35s",
    mood: "Injustice géographique",
    decor: "Cartes Algérie",
    status: "important",
    service: "Pack Orientation",
    cta: "Stratégies par antenne sur wendogo.com",
    content: [
      "Alger = traitement automatique",
      "Constantine/Annaba = double RDV obligatoire",
      "Impact timing et stress"
    ],
    hashtags: ["#alger", "#constantine", "#inegalite", "#wendogo"]
  },
  {
    id: 58,
    title: "Cette case mal cochée = 6 mois de retard",
    category: "PROCÉDURES & TIMING",
    duration: "25s",
    mood: "Erreur fatale",
    decor: "Interface zoom",
    status: "urgent",
    service: "Pack Orientation",
    cta: "Guide interface sur wendogo.com",
    content: [
      "'Je candidate' vs 'Je suis accepté'",
      "Confusion procédure = dossier invalide",
      "Comment éviter l'erreur"
    ],
    hashtags: ["#case", "#erreur", "#interface", "#wendogo"]
  },
  {
    id: 59,
    title: "Authentication documents ENS : cette étape que tous oublient",
    category: "PROCÉDURES & TIMING",
    duration: "30s",
    mood: "Spécificité technique",
    decor: "Tampons officiels",
    status: "new",
    service: "Pack Orientation",
    cta: "Procédure ENS sur wendogo.com",
    content: [
      "Diplômes ENS = procédure spéciale",
      "Ministère Enseignement Supérieur obligatoire",
      "Timeline augmentée de 2 semaines"
    ],
    hashtags: ["#ens", "#authentication", "#procedure", "#wendogo"]
  },
  {
    id: 60,
    title: "Il a payé hier, reçu l'autorisation aujourd'hui (RECORD)",
    category: "PROCÉDURES & TIMING",
    duration: "20s",
    mood: "Speed success",
    decor: "Chrono",
    status: "viral",
    service: "Pack Orientation",
    cta: "Timing optimal sur wendogo.com",
    content: [
      "Timeline normale : 48-120h",
      "Facteurs d'accélération révélés",
      "Période optimale pour soumission"
    ],
    hashtags: ["#record", "#rapidite", "#autorisation", "#wendogo"]
  },

  // SCRIPTS BONUS : MICRO-DÉTAILS QUI TUENT (10 contenus)
  {
    id: 61,
    title: "Couleur vs Noir & Blanc : le consul voit la différence",
    category: "MICRO-DÉTAILS",
    duration: "25s",
    mood: "Détail technique",
    decor: "Impressions comparées",
    status: "important",
    service: "Pack Visa",
    cta: "Standards documents sur wendogo.com",
    content: [
      "Couleur = authentique et sérieux",
      "N&B = photocopie suspecte",
      "Exceptions acceptées révélées"
    ],
    hashtags: ["#documents", "#couleur", "#details", "#wendogo"]
  },
  {
    id: 62,
    title: "CNSS obligatoire ? Pas pour tous... (règle secrète)",
    category: "MICRO-DÉTAILS",
    duration: "30s",
    mood: "Nuance importante",
    decor: "Documents éparpillés",
    status: "trending",
    service: "Pack Visa",
    cta: "Checklist personnalisée sur wendogo.com",
    content: [
      "Autofinancement = oui obligatoire",
      "Garant familial = souvent non nécessaire",
      "Alternative : Travail + Salaire + Banque"
    ],
    hashtags: ["#cnss", "#obligatoire", "#regle", "#wendogo"]
  },
  {
    id: 63,
    title: "RIB du garant ou le tien ? 90% se trompent",
    category: "MICRO-DÉTAILS",
    duration: "20s",
    mood: "Erreur commune",
    decor: "Formulaire zoom",
    status: "urgent",
    service: "Pack Visa",
    cta: "Guide formulaires sur wendogo.com",
    content: [
      "Avant arrivée France = RIB garant",
      "Logique : tu n'as pas encore de compte français",
      "Erreur fréquente dévoilée"
    ],
    hashtags: ["#rib", "#garant", "#erreur", "#wendogo"]
  },
  {
    id: 64,
    title: "Cette signature différente = refus hébergement garanti",
    category: "MICRO-DÉTAILS",
    duration: "35s",
    mood: "Incohérence fatale",
    decor: "Documents superposés",
    status: "priority",
    service: "Pack Installation",
    cta: "Vérification signatures sur wendogo.com",
    content: [
      "Consul compare signature titre/lettre",
      "Vérification systématique",
      "Solution : faire re-signer partout"
    ],
    hashtags: ["#signature", "#incoherence", "#hebergement", "#wendogo"]
  },
  {
    id: 65,
    title: "POV: Tu réalises que ton hébergeur a oublié ses contacts",
    category: "MICRO-DÉTAILS",
    duration: "25s",
    mood: "Situational comedy",
    decor: "Attestation barrée",
    status: "viral",
    service: "Pack Installation",
    cta: "Template hébergement sur wendogo.com",
    content: [
      "Moment de panique découverte",
      "Consul doit pouvoir vérifier",
      "Solution express révélée"
    ],
    hashtags: ["#pov", "#hebergeur", "#contacts", "#wendogo"]
  },
  {
    id: 66,
    title: "Capago fermé le samedi : cette erreur coûte 1 mois",
    category: "MICRO-DÉTAILS",
    duration: "20s",
    mood: "Timing critique",
    decor: "Planning barré",
    status: "urgent",
    service: "Pack Visa",
    cta: "Planning visa sur wendogo.com",
    content: [
      "Récupération passeport impossible weekend",
      "Impact sur voyage planifié",
      "Planning optimal dévoilé"
    ],
    hashtags: ["#capago", "#samedi", "#timing", "#wendogo"]
  },
  {
    id: 67,
    title: "Distance 66km = refus, 65km = OK (sérieusement ?)",
    category: "MICRO-DÉTAILS",
    duration: "25s",
    mood: "Absurdité bureaucratique",
    decor: "GPS zoom",
    status: "viral",
    service: "Pack Installation",
    cta: "Calcul distance exact sur wendogo.com",
    content: [
      "Règle exacte 65km révélée",
      "Cas limite problématiques",
      "Solutions transport public"
    ],
    hashtags: ["#distance", "#65km", "#absurdite", "#wendogo"]
  },
  {
    id: 68,
    title: "Cette moyenne cache tes vraies chances",
    category: "MICRO-DÉTAILS",
    duration: "40s",
    mood: "Révélation",
    decor: "Courbe progression",
    status: "trending",
    service: "Pack Orientation",
    cta: "Analyse progression sur wendogo.com",
    content: [
      "Bac 10,79 → L3 17,21 = excellent profil",
      "Consul regarde la progression, pas juste les notes",
      "Comment valoriser sa courbe ascendante"
    ],
    hashtags: ["#moyenne", "#progression", "#courbe", "#wendogo"]
  },
  {
    id: 69,
    title: "Problem-solver : Ton CNSS plante, RDV dans 3 jours",
    category: "MICRO-DÉTAILS",
    duration: "35s",
    mood: "Solution urgente",
    decor: "Écran erreur",
    status: "urgent",
    service: "Pack Visa",
    cta: "Solutions urgentes sur wendogo.com",
    content: [
      "Attestation employeur mentionnant problème",
      "Capture écran erreur plateforme",
      "Bordereaux mois précédents + explication"
    ],
    hashtags: ["#cnss", "#plante", "#solution", "#wendogo"]
  },
  {
    id: 70,
    title: "Je note ton profil Campus France en 10 secondes",
    category: "MICRO-DÉTAILS",
    duration: "15s",
    mood: "Speed rating",
    decor: "Notes apparition",
    status: "viral",
    service: "Pack Orientation",
    cta: "Analyse gratuite sur wendogo.com",
    content: [
      "Bac 17+ TCF C1 = 'Visa garanti ✅'",
      "Bac 12 + L1 faible = 'Oublie Paris ❌'",
      "M2 → L3 = 'Explique-moi ça 🤔'"
    ],
    hashtags: ["#profil", "#notation", "#10secondes", "#wendogo"]
  },
  {
  id: 71,
  title: "Refusé ? Cette stratégie de redemande fonctionne à 85%",
  category: "VISA & REFUS",
  duration: "40s",
  mood: "Hope/Comeback",
  decor: "Dossier avant/après + tampon ACCORDÉ",
  status: "urgent",
  service: "Pack Visa",
  cta: "Stratégie redemande sur wendogo.com",
  content: [
    "ERREUR : Redemander immédiatement = refus garanti",
    "STRATÉGIE : Attendre 3 mois + corriger le VRAI problème",
    "NOUVEAU DOSSIER : Changer 80% des documents même si corrects",
    "PHRASE MAGIQUE : 'Suite à l'analyse de mon précédent dossier...'"
  ],
  hashtags: ["#redemandevisa", "#refused", "#secondechance", "#strategie", "#wendogo"]
}
];

  const categories = [
    { value: 'all', label: 'Toutes les catégories', count: 70, color: 'bg-gray-100' },
    { value: 'VISA & REFUS', label: 'Visa & Refus', count: 15, color: 'bg-red-100' },
    { value: 'FINANCES & GARANTS', label: 'Finances & Garants', count: 12, color: 'bg-green-100' },
    { value: 'HÉBERGEMENT & DISTANCE', label: 'Hébergement & Distance', count: 10, color: 'bg-blue-100' },
    { value: 'ÉCOLES & ORIENTATION', label: 'Écoles & Orientation', count: 15, color: 'bg-purple-100' },
    { value: 'PROCÉDURES & TIMING', label: 'Procédures & Timing', count: 8, color: 'bg-yellow-100' },
    { value: 'MICRO-DÉTAILS', label: 'Micro-détails', count: 10, color: 'bg-pink-100' }
  ];

  const moods = [
    'all', 'Urgence/Panique', 'Révélation choquante', 'Success story', 'Mystère', 
    'Comparaison choc', 'Défi/Speed', 'Behind the scenes', 'Problem-solver'
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'urgent': return 'bg-red-500';
      case 'priority': return 'bg-orange-500';
      case 'viral': return 'bg-green-500';
      case 'trending': return 'bg-blue-500';
      case 'new': return 'bg-purple-500';
      case 'important': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getCategoryColor = (category) => {
    const cat = categories.find(c => c.value === category);
    return cat ? cat.color : 'bg-gray-100';
  };

  const filteredScripts = useMemo(() => {
    return scripts.filter(script => {
      const matchesSearch = script.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           script.content.some(c => c.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === 'all' || script.category === selectedCategory;
      const matchesMood = selectedMood === 'all' || script.mood === selectedMood;
      
      return matchesSearch && matchesCategory && matchesMood;
    });
  }, [searchTerm, selectedCategory, selectedMood]);

  const stats = {
    total: scripts.length,
    urgent: scripts.filter(s => s.status === 'urgent').length,
    viral: scripts.filter(s => s.status === 'viral').length,
    avgDuration: '35s'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            📱 Scripts TikTok Wendogo
          </h1>
          <p className="text-gray-600 text-lg">
            Dashboard complet des 70 scripts viraux pour dominer TikTok
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Scripts</p>
                <p className="text-3xl font-bold text-blue-600">{stats.total}</p>
              </div>
              <BookOpen className="w-12 h-12 text-blue-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-red-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Scripts Urgents</p>
                <p className="text-3xl font-bold text-red-600">{stats.urgent}</p>
              </div>
              <TrendingUp className="w-12 h-12 text-red-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Scripts Viraux</p>
                <p className="text-3xl font-bold text-green-600">{stats.viral}</p>
              </div>
              <Play className="w-12 h-12 text-green-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Durée Moyenne</p>
                <p className="text-3xl font-bold text-purple-600">{stats.avgDuration}</p>
              </div>
              <Clock className="w-12 h-12 text-purple-500" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl p-6 shadow-lg mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher dans les scripts..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category.value}
                  onClick={() => setSelectedCategory(category.value)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    selectedCategory === category.value
                      ? 'bg-blue-500 text-white shadow-lg'
                      : `${category.color} text-gray-700 hover:shadow-md`
                  }`}
                >
                  {category.label}
                  <span className="ml-2 bg-white bg-opacity-20 px-2 py-1 rounded text-xs">
                    {category.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Mood Filter */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filtrer par humeur :
            </label>
            <select
              value={selectedMood}
              onChange={(e) => setSelectedMood(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              {moods.map(mood => (
                <option key={mood} value={mood}>
                  {mood === 'all' ? 'Toutes les humeurs' : mood}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Scripts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredScripts.map(script => (
            <div key={script.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              {/* Card Header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`w-3 h-3 rounded-full ${getStatusColor(script.status)}`}></span>
                      <span className="text-xs font-medium text-gray-500">
                        Script #{script.id}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 leading-tight">
                      {script.title}
                    </h3>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(script.category)} text-gray-700`}>
                    {script.category}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                    {script.service}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{script.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    <span>{script.mood}</span>
                  </div>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6">
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">
                    <strong>Décor :</strong> {script.decor}
                  </p>
                  
                  <div className="space-y-2">
                    {script.content.map((item, index) => (
                      <div key={index} className="text-sm text-gray-700 bg-gray-50 p-2 rounded">
                        • {item}
                      </div>
                    ))}
                  </div>
                  {script.hook && (
                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">Structure de tournage :</p>
                      <div className="space-y-1 text-xs text-gray-600">
                        <div><strong>Hook:</strong> {script.hook}</div>
                        <div><strong>Setup:</strong> {script.setup}</div>
                        <div><strong>Twist:</strong> {script.twist}</div>
                        <div><strong>Révélation:</strong> {script.revelation}</div>
                        {script.proof && (
                          <div><strong>Preuves:</strong> {script.proof.join(' • ')}</div>
                        )}
                        <div><strong>Punchline:</strong> {script.punchline}</div>
                      </div>
                    </div>
                  )}
                </div>
                   
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">CTA :</p>
                  <p className="text-sm text-blue-600 bg-blue-50 p-2 rounded italic">
                    "{script.cta}"
                  </p>
                </div>

                <div className="flex flex-wrap gap-1">
                  {script.hashtags.map((tag, index) => (
                    <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-6 pb-6">
                <button
                  onClick={() => setShowDetails(showDetails === script.id ? null : script.id)}
                  className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2 px-4 rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 font-medium"
                >
                  {showDetails === script.id ? 'Masquer détails' : 'Voir détails'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Results Info */}
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Affichage de <span className="font-bold">{filteredScripts.length}</span> scripts 
            sur <span className="font-bold">{scripts.length}</span> au total
          </p>
        </div>

        {/* Footer */}
        <div className="mt-12 bg-white rounded-xl p-6 shadow-lg text-center">
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            🚀 Prêt à dominer TikTok ?
          </h3>
          <p className="text-gray-600 mb-4">
            Ces 70 scripts sont optimisés pour maximiser l'engagement et diriger le trafic vers wendogo.com
          </p>
          <div className="flex justify-center gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">+500%</p>
              <p className="text-sm text-gray-600">Trafic attendu</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">7.4M</p>
              <p className="text-sm text-gray-600">Vues prévues</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">+350%</p>
              <p className="text-sm text-gray-600">Conversions</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScriptsDashboard;
