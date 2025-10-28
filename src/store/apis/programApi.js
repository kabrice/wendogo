// src/store/apis/programApi.js (mis à jour pour utiliser l'API Flask)

import { REST_API_PARAMS } from '../../utils/Constants';

/**
 * API pour la gestion des programmes de formation
 */
class ProgramApi {
  
  static baseUrl = REST_API_PARAMS.baseUrl;
  static headers = REST_API_PARAMS.prepareHeaders ? REST_API_PARAMS.prepareHeaders({}, {}).headers : {
    'Content-Type': 'application/json'
  };

  /**
   * Récupère tous les programmes
   * @returns {Promise<Object>} Liste de tous les programmes
   */
  static async getAllPrograms() {
    try {
      const response = await fetch(`${this.baseUrl}/programs`, {
        method: 'GET',
        headers: this.headers
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return {
        success: true,
        data: data,
        total: data.length
      };
    } catch (error) {
      console.error('Erreur lors de la récupération des programmes:', error);
      return {
        success: false,
        error: error.message,
        data: []
      };
    }
  }

  /**
   * Récupère un programme par son slug
   * @param {string} slug - Le slug du programme
   * @returns {Promise<Object>} Données du programme
   */
  static async getProgramBySlug(slug, locale = 'fr') {
    try {
      const response = await fetch(`${this.baseUrl}/programs/slug/${slug}?locale=${locale}`, {
        method: 'GET',
        headers: this.headers
      });
      
      if (!response.ok) {
        if (response.status === 404) {
          return {
            success: false,
            error: 'Programme non trouvé',
            data: null
          };
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const resp = await response.json();
      //console.log('Raw program data from API:😎😎😎', resp.data);
      // Transformer les données pour compatibilité avec l'ancien format
      const transformedData = this.transformProgramData(resp.data);
      
      return {
        success: true,
        data: transformedData
      };
    } catch (error) {
      console.error('Erreur lors de la récupération du programme:', error);
      return {
        success: false,
        error: error.message,
        data: null
      };
    }
  }

  /**
   * Récupère tous les slugs des programmes pour la génération statique
   * @returns {Promise<Array>} Liste des slugs
   */
  static async getAllProgramSlugs(locale = 'fr') {
    try {
      const response = await fetch(`${this.baseUrl}/programs/slugs?locale=${locale}`, {
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
      console.error('Erreur lors de la récupération des slugs:', error);
      return {
        success: false,
        error: error.message,
        data: []
      };
    }
  }

  /**
   * Récupère les programmes d'une école spécifique
   * @param {number} schoolId - ID de l'école
   * @returns {Promise<Array>} Programmes de l'école
   */
  static async getProgramsBySchoolId(schoolId, locale = 'fr') {
    try {
      console.log('Fetching programs for school ID:', `${this.baseUrl}/programs/by-school/${schoolId}?locale=${locale}`);
      const response = await fetch(`${this.baseUrl}/programs/by-school/${schoolId}?locale=${locale}`, {
        method: 'GET',
        headers: this.headers
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Transformer les données
      const transformedData = data.map(program => this.transformProgramData(program));
      
      return {
        success: true,
        data: transformedData,
        total: transformedData.length
      };
    } catch (error) {
      console.error('Erreur lors de la récupération des programmes par école:', error);
      return {
        success: false,
        error: error.message,
        data: []
      };
    }
  }

  /**
   * Récupère les programmes d'une école par son slug
   * @param {string} schoolSlug - Slug de l'école
   * @returns {Promise<Array>} Programmes de l'école
   */
  static async getProgramsBySchoolSlug(schoolSlug, locale = 'fr') {
    try {
      const response = await fetch(`${this.baseUrl}/programs/by-school-slug/${schoolSlug}?locale=${locale}`, {
        method: 'GET',
        headers: this.headers
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Transformer les données
      const transformedData = data.map(program => this.transformProgramData(program));
      
      return {
        success: true,
        data: transformedData,
        total: transformedData.length
      };
    } catch (error) {
      console.error('Erreur lors de la récupération des programmes par slug école:', error);
      return {
        success: false,
        error: error.message,
        data: []
      };
    }
  }

  /**
   * Récupère un aperçu des programmes (données limitées)
   * @returns {Promise<Array>} Liste simplifiée des programmes
   */
  static async getProgramsPreview() {
    try {
      const response = await fetch(`${this.baseUrl}/programs/preview`, {
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
      console.error('Erreur lors de la récupération de l\'aperçu des programmes:', error);
      return {
        success: false,
        error: error.message,
        data: []
      };
    }
  }

  /**
   * Recherche de programmes avec filtres
   * @param {Object} filters - Filtres de recherche
   * @returns {Promise<Array>} Programmes filtrés
   */
  static async searchPrograms(filters = {}, locale = 'fr') {
    try {

      const params = new URLSearchParams();
      
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== null && value !== undefined && value !== '') {
          if (Array.isArray(value)) {
            value.forEach(v => params.append(key, v));
          } else {
            params.append(key, value);
          }
        }
      });
      console.log('searchPrograms filters params:', params.toString(), JSON.stringify(filters));
      const response = await fetch(`${this.baseUrl}/programs/search?${params.toString()}&locale=${locale}`, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify(filters)
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Si c'est la nouvelle réponse paginée
      if (data.data && data.total !== undefined) {
        const transformedData = data.data.map(program => this.transformProgramData(program));
        
        return {
          success: true,
          data: transformedData,
          total: data.total,
          page: data.page,
          limit: data.limit,
          pages: data.pages,
          filters: filters
        };
      }
      
      // Fallback pour l'ancienne API
      const transformedData = data.map(program => this.transformProgramData(program));
      
      return {
        success: true,
        data: transformedData,
        total: transformedData.length,
        page: 1,
        limit: transformedData.length,
        pages: 1,
        filters: filters
      };
    } catch (error) {
      console.error('Erreur lors de la recherche de programmes:', error);
      return {
        success: false,
        error: error.message,
        data: [],
        total: 0
      };
    }
  }

  static async getProgramDetail(programId, locale = 'fr') {
    try {
      const response = await fetch(`${this.baseUrl}/program/${programId}?locale=${locale}`, {
        method: 'GET',
        headers: this.headers
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching program detail:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Récupère les programmes similaires
   * @param {string} programId - ID du programme de référence
   * @param {number} limit - Nombre de programmes à retourner
   * @returns {Promise<Array>} Programmes similaires
   */
  static async getSimilarPrograms(programId, limit = 3) {
    try {
      const response = await fetch(`${this.baseUrl}/programs/${programId}/similar?limit=${limit}`, {
        method: 'GET',
        headers: this.headers
      });
      
      if (!response.ok) {
        if (response.status === 404) {
          return {
            success: false,
            error: 'Programme de référence non trouvé',
            data: []
          };
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Transformer les données
      const transformedData = data.map(program => this.transformProgramData(program));
      
      return {
        success: true,
        data: transformedData
      };
    } catch (error) {
      console.error('Erreur lors de la récupération des programmes similaires:', error);
      return {
        success: false,
        error: error.message,
        data: []
      };
    }
  }

  /**
   * Récupère les options disponibles pour tous les filtres
   * @returns {Promise<Object>} Options de filtres
   */
  static async getFilterOptions() {
    try {
      const response = await fetch(`${this.baseUrl}/programs/filter-options`, {
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
      console.error('Erreur lors de la récupération des options de filtres:', error);
      return {
        success: false,
        error: error.message,
        data: {
          grades: [],
          durations: [],
          application_dates: [],
          cities: [],
          rncp_levels: [],
          entry_levels: [],
          languages: []
        }
      };
    }
  }  

  /**
   * Transforme les données de l'API Flask vers le format attendu par le frontend
   * @param {Object} program - Données du programme depuis l'API
   * @returns {Object} Programme transformé
   */
  static transformProgramData(program) {
    return {
      // Mapping des champs de base
      id: program.id,
      slug: program.slug,
      school_id: program.school_id,
      school_name: program.school_name,
      school_slug: program.school?.slug,
      title: program.name,
      description: program.description,
      
      // Durée et organisation
      fi_school_duration: program.fi_school_duration,
      alternance_possible: program.ca_school_duration,
      ca_school_duration: program.ca_school_duration,
      ca_program_details: program.ca_program_details,
      
      // Candidatures
      application_date: program.application_date,
      application_date_comment: program.application_date_comment,
      intake: program.intake,
      intake_comment: program.intake_comment,
      intake_capacity: program.intake_capacity,
      url_application: program.url_application,
      
      // Frais
      tuition: program.tuition || program.fi_annual_tuition_fee,
      tuition_comment: program.tuition_comment,
      fi_registration_fee: program.fi_registration_fee,
      first_deposit: program.first_deposit,
      first_deposit_comment: program.first_deposit_comment,
      
      // Sous-domaines (transformation vers ancien format)
      sub_domain1: program.sub_domain1_id,
      sub_domain2: program.sub_domain2_id,
      sub_domain3: program.sub_domain3_id,
      
      // Certifications
      state_certification_type: program.state_certification_type,
      state_certification_type_complement: program.state_certification_type_complement,
      state_certification_type_complement2: program.state_certification_type_complement2,
      rncp_level: program.rncp_level,
      rncp_certifier: program.rncp_certifier,
      grade: program.grade,
      
      // Contenu académique
      curriculum_highlights: program.curriculum_highlights,
      skills_acquired: program.skills_acquired,
      special_comment: program.special_comment,
      
      // Partenariats
      joint_preparation_with: program.joint_preparation_with,
      partner_companies: program.corporate_partners,
      
      // Admissions par année
      y1_required_level: program.y1_required_level,
      required_degree1: program.required_degree1,
      y1_admission_details: program.y1_admission_details,
      y1_teaching_language_with_required_level: program.y1_teaching_language_with_required_level,
      language_tech_level1: program.language_tech_level1,
      
      y2_required_level: program.y2_required_level,
      required_degree2: program.required_degree2,
      y2_admission_details: program.y2_admission_details,
      y2_admission_method: program.y2_admission_method,
      y2_application_date: program.y2_application_date,
      y2_teaching_language_with_required_level: program.y2_teaching_language_with_required_level,
      language_tech_level2: program.language_tech_level2,
      
      y3_required_level: program.y3_required_level,
      required_degree3: program.required_degree3,
      y3_admission_details: program.y3_admission_details,
      y3_admission_method: program.y3_admission_method,
      y3_application_date: program.y3_application_date,
      y3_teaching_language_with_required_level: program.y3_teaching_language_with_required_level,
      language_tech_level3: program.language_tech_level3,
      
      y4_required_level: program.y4_required_level,
      required_degree4: program.required_degree4,
      y4_admission_details: program.y4_admission_details,
      y4_admission_method: program.y4_admission_method,
      y4_application_date: program.y4_application_date,
      y4_teaching_language_with_required_level: program.y4_teaching_language_with_required_level,
      language_tech_level4: program.language_tech_level4,
      
      y5_required_level: program.y5_required_level,
      required_degree5: program.required_degree5,
      y5_admission_details: program.y5_admission_details,
      y5_admission_method: program.y5_admission_method,
      y5_application_date: program.y5_application_date,
      y5_teaching_language_with_required_level: program.y5_teaching_language_with_required_level,
      language_tech_level5: program.language_tech_level5,
      
      // Statistiques et débouchés
      careers: program.careers,
      employment_rate_among_graduates: program.employment_rate_among_graduates,
      Success_rate_of_the_program: program.success_rate_of_the_program,
      starting_salary: program.starting_salary,
      
      // Campus France et evaluations
      eef_name: program.eef_name,
      is_active: program.is_active,
      parallel_procedure: program.parallel_procedure,
      bienvenue_en_france_level: program.bienvenue_en_france_level,
      contact: program.contact,
      language_tech_level_unofficial1: program.language_tech_level_unofficial1,
      language_tech_level_unofficial2: program.language_tech_level_unofficial2,
      language_tech_level_unofficial3: program.language_tech_level_unofficial3,
      language_tech_level_unofficial4: program.language_tech_level_unofficial4,
      language_tech_level_unofficial5: program.language_tech_level_unofficial5,
      is_referenced_in_eef: program.is_referenced_in_eef,
      address: program.address,
      phone: program.phone,
      email: program.email,
      exoneration_tuition: program.school?.exoneration_tuition,
      exoneration_tuition_comment: program.school?.exoneration_tuition_comment,
      connection_campus_france: program.school?.connection_campus_france,
      desired_profiles: program.desired_profiles,

      y1_tuition : program.y1_tuition,
      y2_tuition : program.y2_tuition,
      y3_tuition : program.y3_tuition,
      y4_tuition : program.y4_tuition,
      y5_tuition : program.y5_tuition,
      
      // SEO
      seo_title: program.seo_title,
      seo_description: program.seo_description,
      seo_keywords: program.seo_keywords,
      
      // URL complète (construite depuis les données école)
      full_url_path: program.school?.slug ? `/schools/${program.school.slug}/programs/${program.slug}` : `/programs/${program.slug}`,
      
      // École (si incluse)
      school: program.school ? this.transformSchoolData(program.school) : null
    };
  }

  /**
   * Transforme les données école de l'API Flask
   * @param {Object} school - Données de l'école depuis l'API
   * @returns {Object} École transformée
   */
  static transformSchoolData(school) {
    return {
      id: school.id,
      slug: school.slug,
      name: school.name,
      base_city: school.base_city,
      logo_path: '/images/schools/logos/'+school.logo_path,
      cover_page_path: '/images/schools/covers/'+school.cover_page_path,
      connection_campus_france: school.connection_campus_france,
      international_student_rate_tech: school.international_student_rate_tech,
      hors_contrat: school.hors_contrat,
      school_group: school.school_group,
      url: school.url,
      exoneration_tuition: school.exoneration_tuition,
      exoneration_tuition_comment: school.exoneration_tuition_comment
    };
  }

  /**
   * Formate les niveaux de langue à partir d'une chaîne d'entrée
   * @param {string} input - Chaîne de langues et niveaux (ex: "Fr-B2,En-C1")
   * @returns {string} Chaîne formatée (ex: "Français (B2), Anglais (C1)")
   */
  static formatLanguageLevels(input, locale = 'fr') {
    if (!input) return '';
    const map = {
      Fr: locale === 'fr' ? "Français" : "French",
      En: locale === 'fr' ? "Anglais" : "English",
      Es: locale === 'fr' ? "Espagnol" : "Spanish"
    };

    return input
      .split(",")
      .map(code => {
        const [lang, level] = code.trim().split("-");
        return `${map[lang] || lang} (${level})`;
      })
      .join(", ");
  }

  /**
   * Récupère les statistiques des programmes
   * @returns {Promise<Object>} Statistiques globales
   */
  static async getProgramsStats() {
    try {
      const response = await this.getAllPrograms();
      if (!response.success) {
        return {
          success: false,
          error: 'Erreur lors de la récupération des programmes',
          data: null
        };
      }

      const programs = response.data;
      const alternanceCount = programs.filter(program => program.alternance_possible).length;
      
      // Calculer la moyenne des frais (en supprimant les caractères non numériques)
      const validTuitions = programs
        .map(program => {
          const tuition = program.tuition?.replace(/[^\d]/g, '');
          return tuition ? parseInt(tuition) : 0;
        })
        .filter(tuition => tuition > 0);
      
      const avgTuition = validTuitions.length > 0 
        ? validTuitions.reduce((sum, tuition) => sum + tuition, 0) / validTuitions.length 
        : 0;

      const gradeDistribution = programs.reduce((acc, program) => {
        if (program.grade) {
          acc[program.grade] = (acc[program.grade] || 0) + 1;
        }
        return acc;
      }, {});

      const durationDistribution = programs.reduce((acc, program) => {
        if (program.fi_school_duration) {
          acc[program.fi_school_duration] = (acc[program.fi_school_duration] || 0) + 1;
        }
        return acc;
      }, {});

      return {
        success: true,
        data: {
          total_programs: programs.length,
          alternance_available: alternanceCount,
          average_tuition: Math.round(avgTuition),
          grade_distribution: Object.entries(gradeDistribution)
            .map(([grade, count]) => ({ grade, count })),
          duration_distribution: Object.entries(durationDistribution)
            .map(([duration, count]) => ({ duration, count }))
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
   * Récupère les programmes par catégories populaires
   * @returns {Promise<Object>} Programmes groupés par catégories
   */
  static async getProgramsByCategories() {
    try {
      const response = await this.getAllPrograms();
      if (!response.success) {
        return {
          success: false,
          error: 'Erreur lors de la récupération des programmes',
          data: {}
        };
      }

      const programs = response.data;
      const categories = {
        'Master of Science': programs.filter(p => p.grade === 'Master of Science'),
        'Master': programs.filter(p => p.grade === 'Master'),
        'Licence': programs.filter(p => p.grade === 'Licence'),
        'Alternance': programs.filter(p => p.alternance_possible),
        'International': programs.filter(p => 
          p.y1_teaching_language_with_required_level?.toLowerCase().includes('anglais')
        ),
        'Courte durée': programs.filter(p => p.fi_school_duration === '1 an'),
        'Longue durée': programs.filter(p => p.fi_school_duration === '3 ans' || p.fi_school_duration === '5 ans')
      };

      return {
        success: true,
        data: categories
      };
    } catch (error) {
      console.error('Erreur lors de la récupération des catégories:', error);
      return {
        success: false,
        error: error.message,
        data: {}
      };
    }
  }
}

export default ProgramApi;
