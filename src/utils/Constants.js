const REST_API_PARAMS = {baseUrl: 'http://127.0.0.1:5000', prepareHeaders: (headers, { getState }) => {
    headers.set('Content-Type', 'application/json')
    headers.set('Access-Control-Allow-Origin', '*')
    headers.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    headers.set('Access-Control-Request-Method', 'GET, POST, DELETE, PUT, OPTIONS')
    return headers
}}

const  ERROR_TEXT = <p>Une erreur est survenue. Nous en sommes désolé. Veuillez nous soumettre le problème 
                        <a href="https://m.me/wendogoHQ" style={{color: "rgb(1, 84, 192)"}}><b> ici.</b></a>
                    </p>
const FRANCOPHONE_COUNTRIES = [
    { "pays": "Belgique", "code_iso2": "BE" },
    { "pays": "Bénin", "code_iso2": "BJ" },
    { "pays": "Burkina Faso", "code_iso2": "BF" },
    { "pays": "Burundi", "code_iso2": "BI" },
    { "pays": "Cameroun", "code_iso2": "CM" },
    { "pays": "Canada", "code_iso2": "CA" },
    { "pays": "République centrafricaine", "code_iso2": "CF" },
    { "pays": "Tchad", "code_iso2": "TD" },
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
    { "pays": "Sénégal", "code_iso2": "SN" },
    { "pays": "Seychelles", "code_iso2": "SC" },
    { "pays": "Suisse", "code_iso2": "CH" },
    { "pays": "Togo", "code_iso2": "TG" }
  ]

  const CAMPUS_FRANCE_CRITERIA = [
    "Avoir passé le baccalauréat plus de deux fois et candidater en première année (Licence et BUT).",
    "Postuler pour une formation (hors Licence 1 et BUT1) après avoir redoublé plus de deux fois une année dans un cycle universitaire.",
    "Avoir des dettes de crédits sur une année antérieure dans le cycle universitaire en cours.",
    "Avoir produit de faux documents (passible d'une suspension de 5 ans).",
    "Être inscrit dans une formation ou avoir obtenu un diplôme non accrédité par son pays.",
    "Être un candidat étranger dans son pays de résidence sans pouvoir justifier d'une année d'études validée ou d'un contrat de travail de plus d'un an dans ledit pays.",
    "Avoir obtenu le baccalauréat avec mention passable et une moyenne cumulative inférieure à 10 (ex : de la seconde à la terminale).",
    "Avoir redoublé au moins deux années dans un même cycle.",
    "Avoir obtenu sa licence en cinq ans ou plus.",
    "Demander une formation impliquant une régression de plus d'un an (ex. je suis en cours de M1, je peux postuler à une L3, M1 et M2, mais pas à une L1 ou L2) sauf réorientation.",
    // "Pour la DAP (Demande d’Admission Préalable) : un moyenne recommandée de 12/20 est exigé au baccalauréat , pas de redoublement durant les 3 années de lycée."
  ];  

  const SIMULATION_ENGINE_STEPS = {
    VISA_TYPE: 1,
    SCHOOL_LEVEL: 2,
    RECENT_CLASS_LEVEL: 3,
    SCHOOL_YEAR3: 4,
    RECENT_DEGREE: 5,
    DEGREE_EXACT_NAME: 6,
    PROGRAM_DOMAIN: 7,
    MAIN_SUBJECTS: 8,
    CLASS_REPETITION: 9,
    CLASS_REPETITION_WARNING: 10,
    BLANK_YEAR_REPETITION: 11,
    BLANK_YEAR_REPETITION_WARNING: 12,
    COULD_PAY_TUITION: 13,
    COULD_PAY_TUITION_WARNING: 14,
    RESIDENT_COUNTRY: 15,
    HIGH_SCHOOL_IN_FRENCH: 16,
    FRENCH_TEST: 17,
    FRENCH_LEVEL: 18,
    IS_YEAR_3_RESULTS_AVAILABLE: 19,
    ACADEMIC_YEAR_HEAD_DETAILS3: 20,
    REPORT_CARD3: 21,
    IS_YEAR_2_RESULTS_AVAILABLE: 22,
    SCHOOL_YEAR2: 23,
    ACADEMIC_YEAR_HEAD_DETAILS2: 24,
    REPORT_CARD2: 25,
    IS_YEAR_1_RESULTS_AVAILABLE: 26,
    SCHOOL_YEAR1: 27,
    ACADEMIC_YEAR_HEAD_DETAILS1: 28,
    REPORT_CARD1: 29,
    HAS_WON_AWARD: 30, // in the last 3 years
    AWARD_DETAILS: 31,
  }

export{REST_API_PARAMS, ERROR_TEXT, FRANCOPHONE_COUNTRIES, CAMPUS_FRANCE_CRITERIA, SIMULATION_ENGINE_STEPS}

