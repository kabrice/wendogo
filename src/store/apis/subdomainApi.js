// src/store/apis/subdomainApi.js

import { REST_API_PARAMS } from '../../utils/Constants';

/**
 * API pour la gestion des sous-domaines
 */
class SubdomainApi {
  
  static baseUrl = REST_API_PARAMS.baseUrl;
  static headers = REST_API_PARAMS.prepareHeaders ? REST_API_PARAMS.prepareHeaders({}, {}).headers : {
    'Content-Type': 'application/json'
  };

  /**
   * Récupère tous les sous-domaines avec leur domaine parent
   * @returns {Promise<Object>} Liste de tous les sous-domaines
   */
  static async getAllSubdomains() {
    try {
      const response = await fetch(`${this.baseUrl}/subdomains`, {
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
      console.error('Erreur lors de la récupération des sous-domaines:', error);
      return {
        success: false,
        error: error.message,
        data: []
      };
    }
  }

  /**
   * Récupère un sous-domaine par son ID
   * @param {string} subdomainId - L'ID du sous-domaine
   * @returns {Promise<Object>} Données du sous-domaine
   */
  static async getSubdomainById(subdomainId) {
    try {
      const response = await fetch(`${this.baseUrl}/subdomains/${subdomainId}`, {
        method: 'GET',
        headers: this.headers
      });
      
      if (!response.ok) {
        if (response.status === 404) {
          return {
            success: false,
            error: 'Sous-domaine non trouvé',
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
      console.error('Erreur lors de la récupération du sous-domaine:', error);
      return {
        success: false,
        error: error.message,
        data: null
      };
    }
  }

  /**
   * Récupère plusieurs sous-domaines par leurs IDs
   * @param {Array<string>} subdomainIds - Liste des IDs des sous-domaines
   * @returns {Promise<Object>} Données des sous-domaines
   */
  static async getSubdomainsFromIds(subdomainIds) {
    try {
      const response = await fetch(`${this.baseUrl}/subdomains/filtering`, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({ subdomain_ids: subdomainIds })
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
      console.error('Erreur lors de la récupération des sous-domaines par IDs:', error);
      return {
        success: false,
        error: error.message,
        data: []
      };
    }
  }

  /**
   * Récupère tous les sous-domaines d'un domaine
   * @param {string} domainId - L'ID du domaine
   * @returns {Promise<Object>} Sous-domaines du domaine
   */
  static async getSubdomainsByDomain(domainId) {
    try {
      const response = await fetch(`${this.baseUrl}/subdomains/by-domain/${domainId}`, {
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
      console.error('Erreur lors de la récupération des sous-domaines par domaine:', error);
      return {
        success: false,
        error: error.message,
        data: []
      };
    }
  }

  /**
   * Transforme les données API en format compatible avec les mocks
   * @param {Array} subdomains - Sous-domaines depuis l'API
   * @returns {Object} Format compatible avec mockSubdomains
   */
  static transformToMockFormat(subdomains) {
    const mockSubdomains = {};
    
    subdomains.forEach(subdomain => {
      mockSubdomains[subdomain.id] = {
        name: subdomain.name,
        domain: subdomain.domain_id
      };
    });
    
    return mockSubdomains;
  }

  /**
   * Récupère le nom d'un sous-domaine par son ID (compatible avec l'ancien format)
   * @param {string} subdomainId - L'ID du sous-domaine
   * @returns {Promise<string>} Le nom du sous-domaine
   */
  static async getSubdomainName(subdomainId) {
    try {
      const response = await this.getSubdomainById(subdomainId);
      if (response.success && response.data) {
        return response.data.name;
      }
      return subdomainId; // Fallback
    } catch (error) {
      console.error('Erreur lors de la récupération du nom du sous-domaine:', error);
      return subdomainId; // Fallback
    }
  }

  /**
   * Récupère les noms de plusieurs sous-domaines (compatible avec l'ancien format)
   * @param {Array<string>} subdomainIds - Les IDs des sous-domaines
   * @returns {Promise<Array<string>>} Les noms des sous-domaines
   */
  static async getSubdomainNames(subdomainIds) {
    try {
      if (!subdomainIds || subdomainIds.length === 0) {
        return [];
      }

      const validIds = subdomainIds.filter(id => id && id.trim());
      if (validIds.length === 0) {
        return [];
      }

      const response = await this.getSubdomainsFromIds(validIds);
      if (response.success) {
        return response.data.map(subdomain => subdomain.name);
      }
      return validIds; // Fallback
    } catch (error) {
      console.error('Erreur lors de la récupération des noms des sous-domaines:', error);
      return subdomainIds.filter(id => id && id.trim()); // Fallback
    }
  }

  /**
   * Récupère le domaine parent d'un sous-domaine
   * @param {string} subdomainId - L'ID du sous-domaine
   * @returns {Promise<string>} L'ID du domaine parent
   */
  static async getSubdomainDomain(subdomainId) {
    try {
      const response = await this.getSubdomainById(subdomainId);
      if (response.success && response.data) {
        return response.data.domain_id;
      }
      return null;
    } catch (error) {
      console.error('Erreur lors de la récupération du domaine parent:', error);
      return null;
    }
  }
}

export default SubdomainApi;
