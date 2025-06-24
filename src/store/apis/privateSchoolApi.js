// src/store/apis/privateSchoolApi.js

import { mockSchools, getSchoolBySlug, getAllSchoolSlugs, getSchoolsPreview } from '../../data/mockSchools';

/**
 * API pour la gestion des écoles privées
 */
class PrivateSchoolApi {
  
  /**
   * Récupère toutes les écoles
   * @returns {Promise<Array>} Liste de toutes les écoles
   */
  static async getAllSchools() {
    try {
      // Simulation d'un délai d'API
      await new Promise(resolve => setTimeout(resolve, 100));
      return {
        success: true,
        data: mockSchools,
        total: mockSchools.length
      };
    } catch (error) {
      console.error('Erreur lors de la récupération des écoles:', error);
      return {
        success: false,
        error: error.message,
        data: []
      };
    }
  }

  /**
   * Récupère une école par son slug
   * @param {string} slug - Le slug de l'école
   * @returns {Promise<Object>} Données de l'école
   */
  static async getSchoolBySlug(slug) {
    try {
      await new Promise(resolve => setTimeout(resolve, 50));
      const school = getSchoolBySlug(slug);
      
      if (!school) {
        return {
          success: false,
          error: 'École non trouvée',
          data: null
        };
      }

      return {
        success: true,
        data: school
      };
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'école:', error);
      return {
        success: false,
        error: error.message,
        data: null
      };
    }
  }

  /**
   * Récupère tous les slugs des écoles pour la génération statique
   * @returns {Promise<Array>} Liste des slugs
   */
  static async getAllSchoolSlugs() {
    try {
      await new Promise(resolve => setTimeout(resolve, 50));
      return {
        success: true,
        data: getAllSchoolSlugs()
      };
    } catch (error) {
      console.error('Erreur lors de la récupération des slugs:', error);
      return {
        success: false,
        error: error.message,
        data: []
      };
    }
  }

  /**
   * Récupère un aperçu des écoles (données limitées)
   * @returns {Promise<Array>} Liste simplifiée des écoles
   */
  static async getSchoolsPreview() {
    try {
      await new Promise(resolve => setTimeout(resolve, 50));
      return {
        success: true,
        data: getSchoolsPreview()
      };
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'aperçu des écoles:', error);
      return {
        success: false,
        error: error.message,
        data: []
      };
    }
  }

  /**
   * Recherche d'écoles avec filtres
   * @param {Object} filters - Filtres de recherche
   * @param {string} filters.query - Terme de recherche
   * @param {string} filters.city - Ville
   * @param {boolean} filters.campus_france - Partenaire Campus France
   * @param {Array} filters.accreditations - Accréditations
   * @returns {Promise<Array>} Écoles filtrées
   */
  static async searchSchools(filters = {}) {
    try {
      await new Promise(resolve => setTimeout(resolve, 100));
      
      let filteredSchools = [...mockSchools];

      // Filtre par terme de recherche
      if (filters.query) {
        const query = filters.query.toLowerCase();
        filteredSchools = filteredSchools.filter(school => 
          school.name.toLowerCase().includes(query) ||
          school.description.toLowerCase().includes(query) ||
          school.base_city.toLowerCase().includes(query) ||
          school.specialties?.some(specialty => 
            specialty.toLowerCase().includes(query)
          )
        );
      }

      // Filtre par ville
      if (filters.city) {
        filteredSchools = filteredSchools.filter(school => 
          school.base_city.toLowerCase().includes(filters.city.toLowerCase())
        );
      }

      // Filtre Campus France
      if (filters.campus_france !== undefined) {
        filteredSchools = filteredSchools.filter(school => 
          school.connection_campus_france === filters.campus_france
        );
      }

      // Filtre par accréditations
      if (filters.accreditations && filters.accreditations.length > 0) {
        filteredSchools = filteredSchools.filter(school => 
          filters.accreditations.some(accreditation => 
            school.acknoledgement.toLowerCase().includes(accreditation.toLowerCase())
          )
        );
      }

      return {
        success: true,
        data: filteredSchools,
        total: filteredSchools.length,
        filters: filters
      };
    } catch (error) {
      console.error('Erreur lors de la recherche d\'écoles:', error);
      return {
        success: false,
        error: error.message,
        data: []
      };
    }
  }

  /**
   * Récupère les statistiques des écoles
   * @returns {Promise<Object>} Statistiques globales
   */
  static async getSchoolsStats() {
    try {
      await new Promise(resolve => setTimeout(resolve, 50));
      
      const campusFranceCount = mockSchools.filter(school => school.connection_campus_france).length;
      const avgInternationalRate = mockSchools.reduce((sum, school) => {
        return sum + parseFloat(school.international_student_rate.replace('%', ''));
      }, 0) / mockSchools.length;

      const topCities = mockSchools.reduce((acc, school) => {
        acc[school.base_city] = (acc[school.base_city] || 0) + 1;
        return acc;
      }, {});

      return {
        success: true,
        data: {
          total_schools: mockSchools.length,
          campus_france_partners: campusFranceCount,
          average_international_rate: Math.round(avgInternationalRate),
          top_cities: Object.entries(topCities)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 5)
            .map(([city, count]) => ({ city, count }))
        }
      };
    } catch (error) {
      console.error('Erreur lors de la récupération des statistiques:', error);
      return {
        success: false,
        error: error.message,
        data: null
      };
    }
  }

  /**
   * Récupère les écoles similaires
   * @param {string} schoolId - ID de l'école de référence
   * @param {number} limit - Nombre d'écoles à retourner
   * @returns {Promise<Array>} Écoles similaires
   */
  static async getSimilarSchools(schoolId, limit = 3) {
    try {
      await new Promise(resolve => setTimeout(resolve, 50));
      
      const currentSchool = mockSchools.find(school => school.id === parseInt(schoolId));
      if (!currentSchool) {
        return {
          success: false,
          error: 'École de référence non trouvée',
          data: []
        };
      }

      // Logique de similarité basée sur les spécialités et la ville
      const similarSchools = mockSchools
        .filter(school => school.id !== parseInt(schoolId))
        .map(school => {
          let similarity = 0;
          
          // Similarité par spécialités
          if (school.specialties && currentSchool.specialties) {
            const commonSpecialties = school.specialties.filter(specialty => 
              currentSchool.specialties.includes(specialty)
            );
            similarity += commonSpecialties.length * 2;
          }
          
          // Similarité par ville
          if (school.base_city === currentSchool.base_city) {
            similarity += 1;
          }
          
          // Similarité par type d'établissement (accréditations)
          const currentAccreds = currentSchool.acknoledgement.split(', ');
          const schoolAccreds = school.acknoledgement.split(', ');
          const commonAccreds = currentAccreds.filter(accred => 
            schoolAccreds.includes(accred)
          );
          similarity += commonAccreds.length;

          return { ...school, similarity };
        })
        .sort((a, b) => b.similarity - a.similarity)
        .slice(0, limit);

      return {
        success: true,
        data: similarSchools
      };
    } catch (error) {
      console.error('Erreur lors de la récupération des écoles similaires:', error);
      return {
        success: false,
        error: error.message,
        data: []
      };
    }
  }
}

export default PrivateSchoolApi;
