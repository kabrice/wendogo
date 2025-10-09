// src/store/apis/privateSchoolApi.js (mis à jour pour utiliser l'API Flask)

import { REST_API_PARAMS } from '../../utils/Constants';

/**
 * API pour la gestion des écoles privées
 */
class PrivateSchoolApi {
  
  static baseUrl = REST_API_PARAMS.baseUrl;
  static headers = REST_API_PARAMS.prepareHeaders ? REST_API_PARAMS.prepareHeaders({}, {}).headers : {
    'Content-Type': 'application/json'
  };

  /**
   * Récupère toutes les écoles
   * @returns {Promise<Object>} Liste de toutes les écoles
   */
  static async getAllSchools() {
    try {
      const response = await fetch(`${this.baseUrl}/schools`, {
        method: 'GET',
        headers: this.headers
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Transformer les données
      const transformedData = data.map(school => this.transformSchoolData(school));
      
      return {
        success: true,
        data: transformedData,
        total: transformedData.length
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
   * Récupère une école par son ID
   * @param {string} schoolId - L'ID de l'école
   * @returns {Promise<Object>} Données de l'école
   */
  static async getSchoolById(schoolId) {
    try {
      const response = await fetch(`${this.baseUrl}/schools/${schoolId}`, {
        method: 'GET',
        headers: this.headers
      });
      
      if (!response.ok) {
        if (response.status === 404) {
          return {
            success: false,
            error: 'École non trouvée',
            data: null
          };
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return {
        success: true,
        data: this.transformSchoolData(data)
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
   * Récupère une école par son slug
   * @param {string} slug - Le slug de l'école
   * @returns {Promise<Object>} Données de l'école
   */
  static async getSchoolBySlug(slug) {
    try {
      const response = await fetch(`${this.baseUrl}/schools/slug/${slug}`, {
        method: 'GET',
        headers: this.headers
      });
      
      if (!response.ok) {
        if (response.status === 404) {
          return {
            success: false,
            error: 'École non trouvée',
            data: null
          };
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return {
        success: true,
        data: this.transformSchoolData(data)
      };
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'école par slug:', error);
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
      const response = await fetch(`${this.baseUrl}/schools/slugs`, {
        method: 'GET',
        headers: this.headers
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return {
        success: true,
        data: data
      };
    } catch (error) {
      console.error('Erreur lors de la récupération des slugs des écoles:', error);
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
   * @returns {Promise<Array>} Écoles filtrées
   */
  static async searchSchools(filters = {}) {
    try {
      const response = await fetch(`${this.baseUrl}/schools/search`, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify(filters)
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Transformer les données
      const transformedData = data.map(school => this.transformSchoolData(school));
      
      return {
        success: true,
        data: transformedData,
        total: transformedData.length,
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
   * Récupère les écoles similaires
   * @param {string} schoolId - ID de l'école de référence
   * @param {number} limit - Nombre d'écoles à retourner
   * @returns {Promise<Array>} Écoles similaires
   */
  static async getSimilarSchools(schoolId, limit = 3) {
    try {
      const response = await fetch(`${this.baseUrl}/schools/${schoolId}/similar?limit=${limit}`, {
        method: 'GET',
        headers: this.headers
      });
      
      if (!response.ok) {
        if (response.status === 404) {
          return {
            success: false,
            error: 'École de référence non trouvée',
            data: []
          };
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Transformer les données
      const transformedData = data.map(school => this.transformSchoolData(school));
      
      return {
        success: true,
        data: transformedData
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

  /**
   * Récupère un aperçu des écoles (données limitées)
   * @returns {Promise<Array>} Liste simplifiée des écoles
   */
  static async getSchoolsPreview() {
    try {
      const response = await fetch(`${this.baseUrl}/schools/preview`, {
        method: 'GET',
        headers: this.headers
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return {
        success: true,
        data: data
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
   * Transforme les données de l'API Flask vers le format attendu par le frontend
   * @param {Object} school - Données de l'école depuis l'API
   * @returns {Object} École transformée
   */
  static transformSchoolData(school) {
    return {
      // Mapping des champs de base
      id: school.id,
      slug: school.slug,
      name: school.name,
      school_group: school.school_group,
      base_city: school.base_city,
      
      // URLs et médias
      logo_path: '/images/schools/logos/'+school.logo_path,
      cover_page_path: '/images/schools/covers/'+school.cover_page_path,
      url: school.url,
      
      // Contact
      address: school.address,
      phone: school.phone,
      email: school.email,
      
      // Description et contenu
      description: school.description,
      
      // Statut et accréditations
      hors_contrat: school.hors_contrat,
      acknoledgement: school.acknowledgement, // Garder le nom de l'ancien format
      
      // Statistiques
      alternance_rate: school.alternance_rate,
      work_study_programs: school.work_study_programs,
      international_student_rate_tech: school.international_student_rate_tech,
      international_student_comment: school.international_student_comment,
      
      // Campus France et évaluations
      connection_campus_france: school.connection_campus_france,
      rating: school.rating,
      reviews_counter: school.reviews_counter,
      
      // Réseaux sociaux
      facebook_url: school.facebook_url,
      x_url: school.x_url,
      linkedin_url: school.linkedin_url,
      instagram_url: school.instagram_url,
      
      // Rankings
      national_ranking: school.national_ranking,
      international_ranking: school.international_ranking,
      
      // Support international
      international_support_before_coming: school.international_support_before_coming,
      international_support_after_coming: school.international_support_after_coming,
      
      // Admission et partenariats
      general_entry_requirements: school.general_entry_requirements,
      partnerships: school.partnerships,
      facilities: school.facilities,

      exoneration_tuition: school.exoneration_tuition,
      exoneration_tuition_comment: school.exoneration_tuition_comment,

      // SEO
      seo_title: school.seo_title,
      seo_description: school.seo_description,
      seo_keywords: school.seo_keywords
    };
  }

  /**
   * Formate les frais (fonction utilitaire)
   * @param {string} fee - Frais à formater
   * @returns {string} Frais formatés
   */
  static formatFee(fee) {
    if (!fee) return 'Non communiqué';
    return fee.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
  }

  /**
   * Récupère les statistiques des écoles
   * @returns {Promise<Object>} Statistiques globales
   */
  static async getSchoolsStats() {
    try {
      const response = await this.getAllSchools();
      if (!response.success) {
        return {
          success: false,
          error: 'Erreur lors de la récupération des écoles',
          data: null
        };
      }

      const schools = response.data;
      const campusFranceCount = schools.filter(school => school.connection_campus_france).length;
      const horsContratCount = schools.filter(school => school.hors_contrat).length;

      const cityDistribution = schools.reduce((acc, school) => {
        if (school.base_city) {
          acc[school.base_city] = (acc[school.base_city] || 0) + 1;
        }
        return acc;
      }, {});

      return {
        success: true,
        data: {
          total_schools: schools.length,
          campus_france_connected: campusFranceCount,
          hors_contrat: horsContratCount,
          city_distribution: Object.entries(cityDistribution)
            .map(([city, count]) => ({ city, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 10) // Top 10 des villes
        }
      };
    } catch (error) {
      console.error('Erreur lors de la récupération des statistiques des écoles:', error);
      return {
        success: false,
        error: error.message,
        data: null
      };
    }
  }
}

export default PrivateSchoolApi;
