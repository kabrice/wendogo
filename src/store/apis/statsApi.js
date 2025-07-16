// src/store/apis/statsApi.js

import { REST_API_PARAMS } from '../../utils/Constants';

/**
 * API pour la gestion des statistiques globales
 */
class StatsApi {
  
  static baseUrl = REST_API_PARAMS.baseUrl;
  static headers = REST_API_PARAMS.headers || {
    'Content-Type': 'application/json'
  };

  /**
   * Récupère les statistiques globales de la plateforme
   * @returns {Promise<Object>} Statistiques globales
   */
  static async getGlobalStats() {
    try {
      const response = await fetch(`${this.baseUrl}/stats`, {
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
      console.error('Erreur lors de la récupération des statistiques:', error);
      return {
        success: false,
        error: error.message,
        data: {
          total_programs: 0,
          total_schools: 0,
          satisfaction_rate: 95,
          support_availability: '24/7'
        }
      };
    }
  }

  /**
   * Récupère les statistiques des programmes
   * @returns {Promise<Object>} Statistiques des programmes
   
  static async getProgramStats() {
    try {
      const response = await fetch(`${this.baseUrl}/programs/stats`, {
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
      console.error('Erreur lors de la récupération des stats programmes:', error);
      return {
        success: false,
        error: error.message,
        data: { total_programs: 0 }
      };
    }
  }*/

  /**
   * Récupère les statistiques des écoles
   * @returns {Promise<Object>} Statistiques des écoles
   
  static async getSchoolStats() {
    try {
      const response = await fetch(`${this.baseUrl}/schools/stats`, {
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
      console.error('Erreur lors de la récupération des stats écoles:', error);
      return {
        success: false,
        error: error.message,
        data: { total_schools: 0 }
      };
    }
  }*/

  /**
   * Récupère les statistiques d'un domaine spécifique
   * @param {string} domainId - L'ID du domaine
   * @returns {Promise<Object>} Statistiques du domaine
   */
  static async getDomainStats(domainId) {
    try {
      const response = await fetch(`${this.baseUrl}/domains/${domainId}/stats`, {
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
      console.error('Erreur lors de la récupération des stats du domaine:', error);
      return {
        success: false,
        error: error.message,
        data: { domain_id: domainId, total_programs: 0 }
      };
    }
  }

  /**
   * Teste la connectivité avec l'API de stats
   * @returns {Promise<Object>} Résultat du test
   */
  static async testConnection() {
    try {
      const response = await fetch(`${this.baseUrl}/stats`, {
        method: 'GET',
        headers: this.headers
      });
      
      return {
        success: response.ok,
        status: response.status,
        message: response.ok ? 'Connexion réussie' : 'Erreur de connexion'
      };
    } catch (error) {
      return {
        success: false,
        status: 0,
        message: error.message
      };
    }
  }
}

export default StatsApi;
