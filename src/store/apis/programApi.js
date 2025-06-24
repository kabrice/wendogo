// src/store/apis/programApi.js

import { mockPrograms, getProgramBySlug, getAllProgramSlugs, getProgramsBySchoolId, getProgramsPreview } from '../../data/mockPrograms';

/**
 * API pour la gestion des programmes de formation
 */
class ProgramApi {
  
  /**
   * Récupère tous les programmes
   * @returns {Promise<Object>} Liste de tous les programmes
   */
  static async getAllPrograms() {
    try {
      await new Promise(resolve => setTimeout(resolve, 100));
      return {
        success: true,
        data: mockPrograms,
        total: mockPrograms.length
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
  static async getProgramBySlug(slug) {
    try {
      await new Promise(resolve => setTimeout(resolve, 50));
      const program = getProgramBySlug(slug);
      
      if (!program) {
        return {
          success: false,
          error: 'Programme non trouvé',
          data: null
        };
      }

      return {
        success: true,
        data: program
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
  static async getAllProgramSlugs() {
    try {
      await new Promise(resolve => setTimeout(resolve, 50));
      return {
        success: true,
        data: getAllProgramSlugs()
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
  static async getProgramsBySchoolId(schoolId) {
    try {
      await new Promise(resolve => setTimeout(resolve, 50));
      const programs = getProgramsBySchoolId(schoolId);
      
      return {
        success: true,
        data: programs,
        total: programs.length
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
   * Récupère un aperçu des programmes (données limitées)
   * @returns {Promise<Array>} Liste simplifiée des programmes
   */
  static async getProgramsPreview() {
    try {
      await new Promise(resolve => setTimeout(resolve, 50));
      return {
        success: true,
        data: getProgramsPreview()
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
   * @param {string} filters.query - Terme de recherche
   * @param {string} filters.school_name - Nom de l'école
   * @param {string} filters.grade - Type de diplôme
   * @param {string} filters.duration - Durée du programme
   * @param {boolean} filters.alternance - Alternance disponible
   * @param {number} filters.max_tuition - Frais maximum
   * @param {string} filters.language - Langue d'enseignement
   * @param {string} filters.domain - Domaine d'études
   * @returns {Promise<Array>} Programmes filtrés
   */
  static async searchPrograms(filters = {}) {
    try {
      await new Promise(resolve => setTimeout(resolve, 100));
      
      let filteredPrograms = [...mockPrograms];

      // Filtre par terme de recherche
      if (filters.query) {
        const query = filters.query.toLowerCase();
        filteredPrograms = filteredPrograms.filter(program => 
          program.title.toLowerCase().includes(query) ||
          program.school_name.toLowerCase().includes(query) ||
          program.careers.toLowerCase().includes(query) ||
          program.skills_acquired.toLowerCase().includes(query)
        );
      }

      // Filtre par école
      if (filters.school_name) {
        filteredPrograms = filteredPrograms.filter(program => 
          program.school_name.toLowerCase().includes(filters.school_name.toLowerCase())
        );
      }

      // Filtre par type de diplôme
      if (filters.grade) {
        filteredPrograms = filteredPrograms.filter(program => 
          program.grade.toLowerCase().includes(filters.grade.toLowerCase())
        );
      }

      // Filtre par durée
      if (filters.duration) {
        filteredPrograms = filteredPrograms.filter(program => 
          program.fi_school_duration === filters.duration
        );
      }

      // Filtre alternance
      if (filters.alternance !== undefined) {
        filteredPrograms = filteredPrograms.filter(program => 
          program.alternance_possible === filters.alternance
        );
      }

      // Filtre par frais maximum
      if (filters.max_tuition) {
        filteredPrograms = filteredPrograms.filter(program => {
          const tuition = parseInt(program.tuition.replace(/[^\d]/g, ''));
          return tuition <= filters.max_tuition;
        });
      }

      // Filtre par langue
      if (filters.language) {
        filteredPrograms = filteredPrograms.filter(program => 
          program.teaching_language_with_required_level_for_year_1
            .toLowerCase()
            .includes(filters.language.toLowerCase())
        );
      }

      // Filtre par domaine (basé sur les compétences et carrières)
      if (filters.domain) {
        const domain = filters.domain.toLowerCase();
        filteredPrograms = filteredPrograms.filter(program => 
          program.skills_acquired.toLowerCase().includes(domain) ||
          program.careers.toLowerCase().includes(domain) ||
          program.title.toLowerCase().includes(domain)
        );
      }

      return {
        success: true,
        data: filteredPrograms,
        total: filteredPrograms.length,
        filters: filters
      };
    } catch (error) {
      console.error('Erreur lors de la recherche de programmes:', error);
      return {
        success: false,
        error: error.message,
        data: []
      };
    }
  }

  /**
   * Récupère les statistiques des programmes
   * @returns {Promise<Object>} Statistiques globales
   */
  static async getProgramsStats() {
    try {
      await new Promise(resolve => setTimeout(resolve, 50));
      
      const alternanceCount = mockPrograms.filter(program => program.alternance_possible).length;
      const avgTuition = mockPrograms.reduce((sum, program) => {
        return sum + parseInt(program.tuition.replace(/[^\d]/g, ''));
      }, 0) / mockPrograms.length;

      const gradeDistribution = mockPrograms.reduce((acc, program) => {
        acc[program.grade] = (acc[program.grade] || 0) + 1;
        return acc;
      }, {});

      const durationDistribution = mockPrograms.reduce((acc, program) => {
        acc[program.fi_school_duration] = (acc[program.fi_school_duration] || 0) + 1;
        return acc;
      }, {});

      return {
        success: true,
        data: {
          total_programs: mockPrograms.length,
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
   * Récupère les programmes similaires
   * @param {string} programId - ID du programme de référence
   * @param {number} limit - Nombre de programmes à retourner
   * @returns {Promise<Array>} Programmes similaires
   */
  static async getSimilarPrograms(programId, limit = 3) {
    try {
      await new Promise(resolve => setTimeout(resolve, 50));
      
      const currentProgram = mockPrograms.find(program => program.id === parseInt(programId));
      if (!currentProgram) {
        return {
          success: false,
          error: 'Programme de référence non trouvé',
          data: []
        };
      }

      // Logique de similarité basée sur les compétences, école et niveau
      const similarPrograms = mockPrograms
        .filter(program => program.id !== parseInt(programId))
        .map(program => {
          let similarity = 0;
          
          // Similarité par compétences
          const currentSkills = currentProgram.skills_acquired.toLowerCase().split(', ');
          const programSkills = program.skills_acquired.toLowerCase().split(', ');
          const commonSkills = currentSkills.filter(skill => 
            programSkills.some(pSkill => pSkill.includes(skill) || skill.includes(pSkill))
          );
          similarity += commonSkills.length * 2;
          
          // Similarité par école
          if (program.school_id === currentProgram.school_id) {
            similarity += 3;
          }
          
          // Similarité par niveau
          if (program.grade === currentProgram.grade) {
            similarity += 2;
          }
          
          // Similarité par durée
          if (program.fi_school_duration === currentProgram.fi_school_duration) {
            similarity += 1;
          }

          // Similarité par alternance
          if (program.alternance_possible === currentProgram.alternance_possible) {
            similarity += 1;
          }

          return { ...program, similarity };
        })
        .sort((a, b) => b.similarity - a.similarity)
        .slice(0, limit);

      return {
        success: true,
        data: similarPrograms
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
   * Récupère les programmes par catégories populaires
   * @returns {Promise<Object>} Programmes groupés par catégories
   */
  static async getProgramsByCategories() {
    try {
      await new Promise(resolve => setTimeout(resolve, 50));
      
      const categories = {
        'Master of Science': mockPrograms.filter(p => p.grade === 'Master of Science'),
        'Diplôme d\'Ingénieur': mockPrograms.filter(p => p.grade === 'Diplôme d\'Ingénieur'),
        'Alternance': mockPrograms.filter(p => p.alternance_possible),
        'International': mockPrograms.filter(p => 
          p.teaching_language_with_required_level_for_year_1.toLowerCase().includes('anglais')
        ),
        'Courte durée': mockPrograms.filter(p => p.fi_school_duration === '1 an'),
        'Longue durée': mockPrograms.filter(p => p.fi_school_duration === '3 ans')
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
