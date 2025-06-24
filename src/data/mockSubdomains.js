// src/data/mockSubdomains.js

export const mockSubdomains = {
  // Marketing et Communication
  "sub0201": "Marketing",
  "sub0202": "Communication et information", 
  "sub0203": "Finances",
  "sub0196": "Management",
  "sub0204": "Commerce international",
  "sub0205": "Ressources humaines",
  "sub0206": "Logistique",
  "sub0207": "Entrepreneuriat",
  "sub0208": "Innovation",
  "sub0209": "Développement durable",
  "sub0210": "Digital",
  "sub0211": "Stratégie",
  "sub0212": "Audit",
  "sub0213": "Consulting",
  "sub0214": "Vente",
  "sub0215": "Négociation",
  
  // Informatique et Tech
  "sub0094": "Cybersécurité",
  "sub0095": "Réseaux informatiques",
  "sub0101": "Programmation",
  "sub0102": "Intelligence artificielle",
  "sub0103": "Big Data",
  "sub0104": "Cloud computing",
  "sub0105": "DevOps",
  "sub0106": "UX/UI Design",
  "sub0107": "Mobile Development",
  "sub0108": "Web Development",
  
  // Business et Gestion
  "sub0060": "Événementiel",
  "sub0061": "Luxe",
  "sub0062": "Mode",
  "sub0063": "Hôtellerie",
  "sub0064": "Tourisme",
  "sub0065": "Sport Business",
  "sub0066": "Immobilier",
  "sub0067": "Banque Assurance",
  "sub0068": "Comptabilité",
  "sub0069": "Juridique",
  
  // Ingénierie et Sciences
  "sub0070": "Génie civil",
  "sub0071": "Mécanique",
  "sub0072": "Électronique",
  "sub0073": "Aéronautique",
  "sub0074": "Automobile",
  "sub0075": "Énergie",
  "sub0076": "Environnement",
  "sub0077": "Biologie",
  "sub0078": "Chimie",
  "sub0079": "Physique",
  
  // Design et Créatif
  "sub0080": "Design graphique",
  "sub0081": "Architecture",
  "sub0082": "Arts appliqués",
  "sub0083": "Multimédia",
  "sub0084": "Animation 3D",
  "sub0085": "Photographie",
  "sub0086": "Vidéo",
  "sub0087": "Son",
  "sub0088": "Jeux vidéo",
  "sub0089": "Motion design"
};

/**
 * Récupère le nom d'un sous-domaine par son ID
 * @param {string} subdomainId - L'ID du sous-domaine (ex: "sub0201")
 * @returns {string} Le nom du sous-domaine ou l'ID si non trouvé
 */
export const getSubdomainName = (subdomainId) => {
  return mockSubdomains[subdomainId] || subdomainId;
};

/**
 * Récupère les noms de plusieurs sous-domaines
 * @param {Array<string>} subdomainIds - Les IDs des sous-domaines
 * @returns {Array<string>} Les noms des sous-domaines
 */
export const getSubdomainNames = (subdomainIds) => {
  return subdomainIds.filter(id => id && id.trim()).map(id => getSubdomainName(id.trim()));
};

/**
 * Récupère tous les sous-domaines
 * @returns {Object} Tous les sous-domaines
 */
export const getAllSubdomains = () => {
  return mockSubdomains;
};

export default mockSubdomains;
