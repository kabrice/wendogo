
const IPINFO_URL = 'https://ipinfo.io/json?token=3089ed2a513bd9';
//http://127.0.0.1:5000 => Test on Localhost PC
//http://192.168.1.191:5000 => Test on Mobile
//https://wendogo.online

// CORRECTION: Simplifier la configuration des headers
const REST_API_PARAMS = {
    baseUrl: 'https://wendogo.online',
    // prepareHeaders: (headers, { getState }) => {
    //     // Pour Next.js, on retourne un objet simple avec les headers
    //     return {
    //         ...headers,
    //         'Content-Type': 'application/json',
    //         'Access-Control-Allow-Origin': '*',
    //         'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    //         'Access-Control-Request-Method': 'GET, POST, DELETE, PUT, OPTIONS'
    //     };
    // },
    // NOUVEAU: Configuration simple pour les APIs JavaScript
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
        'Access-Control-Request-Method': 'GET, POST, DELETE, PUT, OPTIONS'
    }
};

const  ERROR_TEXT = <p>Une erreur est survenue. Nous en sommes désolé. Veuillez nous soumettre le problème 
                        <a href="https://m.me/wendogoHQ" style={{color: "rgb(1, 84, 192)"}}><b> ici.</b></a>
                    </p>
const FRANCOPHONE_COUNTRIES = [
    { "pays": "Belgique", "code_iso2": "BE" },
    { "pays": "Bénin", "code_iso2": "BJ" }, //https://www.benin.campusfrance.org/les-pieces-a-fournir, https://monespacebj.campusfrance.org/mon-compte/video/65167b8d392caeafcf360774
    { "pays": "Burkina Faso", "code_iso2": "BF" },
    { "pays": "Burundi", "code_iso2": "BI" },
    { "pays": "Cameroun", "code_iso2": "CM" },
    { "pays": "Canada", "code_iso2": "CA" },
    { "pays": "République centrafricaine", "code_iso2": "CF" },
    { "pays": "Tchad", "code_iso2": "TD" }, //https://www.tchad.campusfrance.org/les-conditions-pour-poursuivre-ses-etudes-en-france
    { "pays": "Comores", "code_iso2": "KM" },
    { "pays": "République démocratique du Congo", "code_iso2": "CD" },
    { "pays": "République du Congo", "code_iso2": "CG" },
    { "pays": "Côte d'Ivoire", "code_iso2": "CI" },
    { "pays": "Djibouti", "code_iso2": "DJ" },
    { "pays": "France", "code_iso2": "FR" },
    { "pays": "Gabon", "code_iso2": "GA" },
    { "pays": "Guinée", "code_iso2": "GN" },
    { "pays": "Guinée-Bissau", "code_iso2": "GW" },
    { "pays": "Haïti", "code_iso2": "HT" },
    { "pays": "Luxembourg", "code_iso2": "LU" },
    { "pays": "Madagascar", "code_iso2": "MG" },
    { "pays": "Mali", "code_iso2": "ML" },
    { "pays": "Monaco", "code_iso2": "MC" },
    { "pays": "Niger", "code_iso2": "NE" },
    { "pays": "Rwanda", "code_iso2": "RW" },
    { "pays": "Sénégal", "code_iso2": "SN" }, //L1,L2, ne sont pas eligibles
    { "pays": "Seychelles", "code_iso2": "SC" },
    { "pays": "Suisse", "code_iso2": "CH" },
    { "pays": "Togo", "code_iso2": "TG" }
  ]

  const CAMPUS_FRANCE_CRITERIA = [
    "Avoir passé le baccalauréat plus de deux fois et candidater en première année (Licence et BUT).",
    "Postuler pour une formation (hors Licence 1 et BUT1) après avoir redoublé plus de deux fois une année dans un cycle universitaire.",
    "Avoir des dettes de crédits sur une année antérieure dans le cycle universitaire en cours.",
    "Avoir produit de faux documents (passible d'une suspension de 5 ans).",
    "Être inscrit dans une formation ou avoir obtenu un diplôme non accrédité par son pays de résidence.",
    "Être un candidat étranger dans son pays de résidence sans pouvoir justifier d'une année d'études validée ou d'un contrat de travail de plus d'un an dans ledit pays.",
    "Pour les licences, avoir obtenu le baccalauréat avec mention passable et une moyenne cumulative inférieure à 10 (ex : de la seconde à la terminale).",
    "Avoir redoublé au moins deux années dans un même cycle.",
    "Avoir obtenu sa licence en cinq ans ou plus.",
    "Demander une formation impliquant une régression de plus d'un an (ex. je suis actuellement en de M1, je peux postuler à une L3, M1 et M2, mais pas à une L1 ou L2) sauf réorientation.",
    // "Pour la DAP (Demande d’Admission Préalable) : un moyenne recommandée de 12/20 est exigé au baccalauréat , pas de redoublement durant les 3 années de lycée."
  ];  

  const SIMULATION_ENGINE_STEPS = {
    VISA_TYPE: 1,
    SCHOOL_LEVEL: 2,
    RECENT_CLASS_LEVEL: 3,
    SCHOOL_YEAR3: 4,
    RECENT_DEGREE: 5,
    DEGREE_EXACT_NAME: 6,
    CLASS_REPETITION: 7,
    CLASS_REPETITION_WARNING: 8,
    BLANK_YEAR_REPETITION: 9,
    BLANK_YEAR_REPETITION_WARNING: 10,
    COULD_PAY_TUITION: 11,
    COULD_PAY_TUITION_WARNING: 12,
    RESIDENT_COUNTRY: 13,
    CAMPUS_FRANCE_INELIGIBILITY: 14,
    HIGH_SCHOOL_IN_FRENCH: 15,
    FRENCH_TEST: 16,
    FRENCH_LEVEL: 17,
    IS_YEAR_3_RESULTS_AVAILABLE: 18,
    ACADEMIC_YEAR_HEAD_DETAILS3: 19,
    REPORT_CARD3: 20,
    PROGRAM_DOMAIN: 21,
    MAIN_SUBJECTS: 22,
    IS_YEAR_2_RESULTS_AVAILABLE: 23,
    SCHOOL_YEAR2: 24,
    ACADEMIC_YEAR_HEAD_DETAILS2: 25,
    REPORT_CARD2: 26,
    PROGRAM_DOMAIN_BAC_N_1: 27,
    MAIN_SUBJECTS_BAC_N_1: 28,
    IS_YEAR_1_RESULTS_AVAILABLE: 29,
    SCHOOL_YEAR1: 30,
    ACADEMIC_YEAR_HEAD_DETAILS1: 31,
    REPORT_CARD1: 32,
    PROGRAM_DOMAIN_BAC_N_2: 33,
    MAIN_SUBJECTS_BAC_N_2: 34,
    HAS_WON_AWARD: 35, // in the last 3 years
    AWARD_DETAILS: 36,
    HAS_WORK_EXPERIENCE: 37, // In the main objects
    WORK_EXPERIENCE_DETAILS: 38, // If above is yes
    CAN_PROVE_WORK_EXPERIENCE: 39,
    ENGLISH_LEVEL: 40,
    CAN_JUSTIFY_ENGLISH_LEVEL: 41,
    OTHER_SPOKEN_LANGUAGE: 42, // Provides : Italian, Spanish, etc
    OTHER_LANGUAGE_LEVEL: 43,
    CAN_JUSTIFY_OTHER_LANGUAGE: 44,
    ALREADY_TRAVELED_TO_FRANCE: 45,
    LAST_FRANCE_TRAVEL_DETAILS: 46, // If above is yes
    HAS_PASSEPORT: 47,
    PASSEPORT_DETAILS: 48, // If yes above 
    SALUTATION: 49,
    BIRTHDATE: 50,
    FIRSTNAME: 51,
    LASTNAME: 52,
    NATIONALITY: 53,
    DISABLE: 54,
    EMAIL: 55,
    WHATSAPP_NUMBER: 56,
    ADDRESS: 57,
    VALIDATION: 58
};

const PROGRESS_BAR_STEPS = {
  GENERALITES_SUR_LES_VISAS_ET_LES_ETUDES : 1,
  BULLETIN_LE_PLUS_RECENT : 2,
  BULLETIN_N_1 : 3,
  BULLETIN_N_2 : 4,
  PARCOURS_ACADEMIQUE_ET_PROFESSIONNEL : 5,
  INFORMATIONS_VOYAGE : 6,
  COORDONNEES : 7
}
 
// URLs et configurations existantes
const API_BASE_URL = "https://wendogo.online";

// ✅ NOUVEAU: URLs pour les APIs de taux de change
const EXCHANGE_RATE_APIS = {
  primary: 'https://api.exchangerate-api.com/v4/latest/EUR', // Gratuit jusqu'à 1500 req/mois
  fallback: 'https://api.fixer.io/latest?access_key=YOUR_FIXER_KEY&base=EUR', // Alternative
  backup: 'https://open.er-api.com/v6/latest/EUR' // Backup gratuit
};

// ✅ NOUVEAU: Configuration des devises supportées
const SUPPORTED_CURRENCIES = {
  // Europe
  'FR': 'EUR', 'BE': 'EUR', 'LU': 'EUR', 'DE': 'EUR', 'IT': 'EUR', 'ES': 'EUR',
  'CH': 'CHF', 'GB': 'GBP', 'NO': 'NOK', 'SE': 'SEK', 'DK': 'DKK',
  
  // Afrique francophone (principales destinations Wendogo)
  'CM': 'XAF', 'SN': 'XOF', 'CI': 'XOF', 'TG': 'XOF', 'BJ': 'XOF', 
  'BF': 'XOF', 'ML': 'XOF', 'NE': 'XOF', 'TD': 'XAF', 'GA': 'XAF',
  'CG': 'XAF', 'CD': 'CDF', 'CF': 'XAF', 'GN': 'GNF', 'RW': 'RWF',
  'BI': 'BIF', 'DJ': 'DJF', 'KM': 'KMF', 'MG': 'MGA', 'SC': 'SCR',
  
  // Afrique du Nord
  'MA': 'MAD', 'TN': 'TND', 'DZ': 'DZD', 'EG': 'EGP',
  
  // Amériques
  'US': 'USD', 'CA': 'CAD', 'BR': 'BRL', 'AR': 'ARS', 'MX': 'MXN', 'HT': 'HTG',
  
  // Asie (étudiants internationaux)
  'CN': 'CNY', 'JP': 'JPY', 'IN': 'INR', 'KR': 'KRW', 'TH': 'THB',
  'VN': 'VND', 'SG': 'SGD', 'MY': 'MYR', 'ID': 'IDR', 'PH': 'PHP',
  
  // Autres
  'AU': 'AUD', 'NZ': 'NZD', 'ZA': 'ZAR', 'RU': 'RUB', 'TR': 'TRY'
};

// ✅ NOUVEAU: Symboles des devises pour l'affichage
const CURRENCY_SYMBOLS = {
  'EUR': '€', 'USD': '$', 'GBP': '£', 'CHF': 'CHF', 'CAD': 'CAD$',
  'XAF': 'FCFA', 'XOF': 'FCFA', 'MAD': 'DH', 'TND': 'TND', 'DZD': 'DA',
  'CDF': 'FC', 'GNF': 'FG', 'RWF': 'RF', 'BIF': 'FBu', 'DJF': 'Fdj',
  'KMF': 'CF', 'MGA': 'Ar', 'SCR': 'SR', 'EGP': 'LE', 'HTG': 'G',
  'CNY': '¥', 'JPY': '¥', 'INR': '₹', 'KRW': '₩', 'BRL': 'R$',
  'AUD': 'A$', 'NZD': 'NZ$', 'ZAR': 'R', 'RUB': '₽'
};

// ✅ NOUVEAU: Noms des pays en français
const COUNTRY_NAMES = {
  'FR': 'France', 'CM': 'Cameroun', 'SN': 'Sénégal', 'CI': 'Côte d\'Ivoire',
  'MA': 'Maroc', 'TN': 'Tunisie', 'DZ': 'Algérie', 'US': 'États-Unis',
  'CA': 'Canada', 'GB': 'Royaume-Uni', 'CH': 'Suisse', 'BE': 'Belgique',
  'TG': 'Togo', 'BJ': 'Bénin', 'BF': 'Burkina Faso', 'ML': 'Mali',
  'NE': 'Niger', 'TD': 'Tchad', 'GA': 'Gabon', 'CG': 'Congo',
  'CD': 'RD Congo', 'CF': 'Centrafrique', 'GN': 'Guinée', 'RW': 'Rwanda',
  'BI': 'Burundi', 'DJ': 'Djibouti', 'KM': 'Comores', 'MG': 'Madagascar',
  'SC': 'Seychelles', 'EG': 'Égypte', 'HT': 'Haïti'
};

// ✅ NOUVEAU: Configuration des offres d'accompagnement
const ACCOMPANY_OFFERS = {
  ORIENTATION: {
    id: 'orientation',
    name: 'Pack Orientation Premium',
    basePrice: 100,
    description: 'Trouvez LA formation qui transformera votre avenir'
  },
  VISA: {
    id: 'visa',
    name: 'Pack Visa & Préparation',
    basePrice: 200,
    description: 'Obtenez votre visa sans stress'
  },
  INSTALLATION: {
    id: 'installation',
    name: 'Pack Installation France',
    basePrice: 150,
    description: 'Intégrez-vous facilement en France'
  }
};

// ✅ NOUVEAU: Configuration des notifications
const NOTIFICATION_CONFIG = {
  admin: {
    email: 'hello@wendogo.com',
    phone: '+33755097584' // Pour SMS si service gratuit disponible
  },
  emailTemplates: {
    accompanyRequest: 'accompany_request_notification',
    organizationContact: 'organization_contact_notification'
  }
};

// ✅ NOUVEAU: Statuts des demandes d'accompagnement
const ACCOMPANY_STATUS = {
  PENDING: 'pending',
  CONTACTED: 'contacted',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled'
};

// ✅ NOUVEAU: Niveaux d'urgence
const URGENCY_LEVELS = {
  NORMAL: 'normal',
  URGENT: 'urgent',
  VERY_URGENT: 'very_urgent'
};

// ✅ NOUVEAU: Types de préférences de contact
const CONTACT_PREFERENCES = {
  EMAIL: 'email',
  WHATSAPP: 'whatsapp',
  PHONE: 'phone'
};

// URLs existantes (à conserver)
const REGISTRATION_URL = `${API_BASE_URL}/auth/register`;
const LOGIN_URL = `${API_BASE_URL}/auth/login`;
const OAUTH_SIGNIN_URL = `${API_BASE_URL}/auth/oauth-signin`;

// ✅ NOUVEAU: URLs pour les nouvelles fonctionnalités
const ACCOMPANY_REQUEST_URL = `${API_BASE_URL}/api/accompany/request`;
const ORGANIZATION_CONTACT_URL = `${API_BASE_URL}/api/organizations/contact`;
const USER_DASHBOARD_URL = `${API_BASE_URL}/api/user/dashboard`;

// Messages d'erreur localisés
const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Erreur de connexion. Veuillez vérifier votre connexion internet.',
  VALIDATION_ERROR: 'Veuillez vérifier les informations saisies.',
  SERVER_ERROR: 'Erreur serveur. Veuillez réessayer plus tard.',
  CURRENCY_ERROR: 'Impossible de charger les taux de change.',
  GEOLOCATION_ERROR: 'Impossible de détecter votre localisation.'
};

// ✅ NOUVEAU: Configuration du cache pour les taux de change
const CACHE_CONFIG = {
  exchangeRates: {
    duration: 3600000, // 1 heure en millisecondes
    key: 'wendogo_exchange_rates'
  },
  userLocation: {
    duration: 86400000, // 24 heures en millisecondes
    key: 'wendogo_user_location'
  }
};

// Regex patterns utiles
const PATTERNS = {
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  phone: /^[+]?[\d\s\-\(\)]{8,}$/,
  // ✅ NOUVEAU: Pattern pour validation des prix
  price: /^\d+(\.\d{1,2})?$/
};

// ✅ NOUVEAU: Configuration des services SMS gratuits/peu chers
const SMS_SERVICES = {
  // Options gratuites ou très peu chères pour les notifications SMS
  textbelt: {
    url: 'https://textbelt.com/text',
    free: true,
    dailyLimit: 1
  },
  smsTo: {
    url: 'https://api.sms.to/sms/send',
    free: false,
    costPerSMS: 0.05 // 5 centimes
  }
  // À configurer selon vos besoins et budget
};
export {
  REST_API_PARAMS,
  ERROR_TEXT,
  FRANCOPHONE_COUNTRIES,
  CAMPUS_FRANCE_CRITERIA,
  SIMULATION_ENGINE_STEPS,
  PROGRESS_BAR_STEPS,
  IPINFO_URL,
  API_BASE_URL,
  SUPPORTED_CURRENCIES,
  CURRENCY_SYMBOLS,
  COUNTRY_NAMES,
  ACCOMPANY_OFFERS,
  NOTIFICATION_CONFIG,
  EXCHANGE_RATE_APIS,
  REGISTRATION_URL,
  LOGIN_URL,
  OAUTH_SIGNIN_URL,
  ACCOMPANY_REQUEST_URL,
  ORGANIZATION_CONTACT_URL,
  USER_DASHBOARD_URL,
  ERROR_MESSAGES,
  CACHE_CONFIG,
  PATTERNS,
  SMS_SERVICES,
  ACCOMPANY_STATUS,
  URGENCY_LEVELS,
  CONTACT_PREFERENCES
};

