const REST_API_PARAMS = {baseUrl: 'https://wendogo-f972c21756e5.herokuapp.com', prepareHeaders: (headers, { getState }) => {
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
 

export{REST_API_PARAMS, ERROR_TEXT, FRANCOPHONE_COUNTRIES, CAMPUS_FRANCE_CRITERIA, SIMULATION_ENGINE_STEPS, PROGRESS_BAR_STEPS}

