// src/store/apis/domainApi.js

import { REST_API_PARAMS } from '../../utils/Constants';

/**
 * API pour la gestion des domaines d'études
 */
class DomainApi {
  
  static baseUrl = REST_API_PARAMS.baseUrl;
  static headers = REST_API_PARAMS.prepareHeaders ? REST_API_PARAMS.prepareHeaders({}, {}).headers : {
    'Content-Type': 'application/json'
  };

  /**
   * Récupère tous les domaines avec leurs sous-domaines
   * @returns {Promise<Object>} Liste de tous les domaines
   */
  static async getAllDomains() {
    try {
      const response = await fetch(`${this.baseUrl}/domains`, {
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
      console.error('Erreur lors de la récupération des domaines:', error);
      return {
        success: false,
        error: error.message,
        data: []
      };
    }
  }

  /**
   * Récupère un domaine par son ID
   * @param {string} domainId - L'ID du domaine
   * @returns {Promise<Object>} Données du domaine
   */
  static async getDomainById(domainId) {
    try {
      const response = await fetch(`${this.baseUrl}/domains/${domainId}`, {
        method: 'GET',
        headers: this.headers
      });
      
      if (!response.ok) {
        if (response.status === 404) {
          return {
            success: false,
            error: 'Domaine non trouvé',
            data: null
          };
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return {
        success: true,
        data: data
      };
    } catch (error) {
      console.error('Erreur lors de la récupération du domaine:', error);
      return {
        success: false,
        error: error.message,
        data: null
      };
    }
  }

  /**
   * Récupère plusieurs domaines par leurs IDs
   * @param {Array<string>} domainIds - Liste des IDs des domaines
   * @returns {Promise<Object>} Données des domaines
   */
  static async getDomainsFromIds(domainIds) {
    try {
      const response = await fetch(`${this.baseUrl}/domains/filtering`, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({ domain_ids: domainIds })
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
      console.error('Erreur lors de la récupération des domaines par IDs:', error);
      return {
        success: false,
        error: error.message,
        data: []
      };
    }
  }

  /**
   * Transforme les données de l'API en format compatible avec les mocks
   * @param {Array} domains - Domaines depuis l'API
   * @returns {Object} Format compatible avec mockDomains
   */
  static transformToMockFormat(domains) {
    const mockDomains = {};
    const domainIcons = {};
    
    domains.forEach(domain => {
      mockDomains[domain.id] = domain.name;
      // Définir des icônes par défaut basées sur le nom
      domainIcons[domain.id] = this.getIconForDomain(domain.name);
    });
    
    return { mockDomains, domainIcons };
  }

  /**
   * Récupère une icône basée sur le nom du domaine
   * @param {string} domainName - Nom du domaine
   * @returns {string} Emoji représentant le domaine
   */
  static getIconForDomain(domainName) {
    const iconMap = {
      'agriculture': '🌱',
      'architecture': '🏗️',
      'arts': '🎨',
      'biologie': '🧬',
      'chimie': '⚗️',
      'journalisme': '📰',
      'droit': '⚖️',
      'informatique': '💻',
      'langues': '📚',
      'mathématiques': '📊',
      'médecine': '🏥',
      'philosophie': '🤔',
      'physique': '⚛️',
      'ingénieur': '⚙️',
      'politiques': '🏛️',
      'terre': '🌍',
      'gestion': '💼',
      'technologies': '📡',
      'humaines': '👥',
      'transport': '🚛',
      'éducation': '🎓',
      'tourisme': '✈️',
    };
    
    const lowerName = domainName.toLowerCase();
    for (const [key, icon] of Object.entries(iconMap)) {
      if (lowerName.includes(key)) {
        return icon;
      }
    }
    return '📚'; // Icône par défaut
  }

  /**
   * Récupère tous les domaines avec leurs icônes (compatible avec l'ancien format)
   * @returns {Promise<Array>} Domaines avec ID, nom et icône
   */
  static async getDomainsWithIcons() {
    try {
      const response = await this.getAllDomains();
      if (!response.success) {
        return [];
      }

      return response.data.map(domain => ({
        id: domain.id,
        name: domain.name,
        icon: this.getIconForDomain(domain.name),
        subdomains: domain.subdomains || []
      }));
    } catch (error) {
      console.error('Erreur lors de la récupération des domaines avec icônes:', error);
      return [];
    }
  }

    // src/store/apis/domainApi.js - Ajoutez cette méthode

    /**
     * Récupère tous les domaines avec leurs sous-domaines ayant des programmes
     * @returns {Promise<Array>} Domaines avec sous-domaines actifs
     */
    static async getDomainsWithActivePrograms() {
    try {
        const response = await fetch(`${this.baseUrl}/domains`, {
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
        console.error('Erreur lors de la récupération des domaines avec programmes:', error);
        return {
        success: false,
        error: error.message,
        data: []
        };
    }
    }

    /**
     * Récupère les statistiques d'un domaine
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
        data: null
        };
    }
}


}

export default DomainApi;
