// src/utils/apiUtils.js - Version corrigée avec fonctions synchrones et cache optimisé

import DomainApi from '../store/apis/domainApi';
import SubdomainApi from '../store/apis/subdomainApi';

// src/utils/cacheUtils.js - Version avec transformations de données

import { useState, useEffect, useCallback } from 'react';
import { REST_API_PARAMS } from './Constants';

// ✅ GARDER TOUTES LES TRANSFORMATIONS EXISTANTES
class DataTransformers {
  static transformSchoolData(school) {
    if (!school) return null;
    
    return {
      ...school,
      logo_path: '/images/schools/logos/' + school.logo_path,
      cover_page_path: school.cover_page_path ? '/images/schools/covers/' + school.cover_page_path : null,
      id: school.id,
      slug: school.slug,
      name: school.name,
      school_group: school.school_group,
      base_city: school.base_city,
      
      // URLs et médias
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
      
      // SEO
      seo_title: school.seo_title,
      seo_description: school.seo_description,
      seo_keywords: school.seo_keywords
    };
  }

  static transformProgramData(program) {
    if (!program) return null;
    
    return {
      ...program,
      // ✅ Transformer l'école si elle est incluse
      school: program.school ? DataTransformers.transformSchoolData(program.school) : null,
      id: program.id,
      slug: program.slug,
      school_id: program.school_id,
      school_name: program.school_name,
      school_slug: program.school?.slug,
      title: program.name,
      description: program.description,
      
      // Durée et organisation
      fi_school_duration: program.fi_school_duration,
      alternance_possible: !!program.ca_school_duration,
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
      application_details_for_year_1: program.application_details_for_year_1,
      teaching_language_with_required_level_for_year_1: program.teaching_language_with_required_level_for_year_1,
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
      teaching_language_with_required_level_for_year_4: program.teaching_language_with_required_level_for_year_4,
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
      
      // SEO
      seo_title: program.seo_title,
      seo_description: program.seo_description,
      seo_keywords: program.seo_keywords,
      
      // URL complète (construite depuis les données école)
      full_url_path: program.school?.slug ? `/schools/${program.school.slug}/programs/${program.slug}` : `/programs/${program.slug}`,
      
    };
  }

  static transformSchoolsArray(schools) {
    if (!Array.isArray(schools)) return [];
    return schools.map(school => DataTransformers.transformSchoolData(school));
  }

  static transformProgramsArray(programs) {
    if (!Array.isArray(programs)) return [];
    return programs.map(program => DataTransformers.transformProgramData(program));
  }
}

const CACHE_DURATION = {
  DOMAINS: 30 * 60 * 1000,
  SCHOOLS: 20 * 60 * 1000,
  FILTER_OPTIONS: 15 * 60 * 1000,
  PROGRAMS: 5 * 60 * 1000,
  SEARCH_RESULTS: 2 * 60 * 1000
};

export const cacheUtils = {
  set: (key, data, customTTL = null) => {
    const ttl = customTTL || CACHE_DURATION.DOMAINS;
    const cacheData = {
      data,
      timestamp: Date.now(),
      expires: Date.now() + ttl
    };
    
    try {
      localStorage.setItem(`wendogo_${key}`, JSON.stringify(cacheData));
      console.log(`📦 Cached data for: ${key} (TTL: ${ttl/1000/60}min)`);
    } catch (error) {
      console.error('Cache storage error:', error);
      try {
        sessionStorage.setItem(`wendogo_${key}`, JSON.stringify(cacheData));
      } catch (fallbackError) {
        console.error('Fallback cache error:', fallbackError);
      }
    }
  },

  get: (key) => {
    try {
      let cached = localStorage.getItem(`wendogo_${key}`) || 
                   sessionStorage.getItem(`wendogo_${key}`);
      
      if (!cached) return null;

      const { data, expires } = JSON.parse(cached);
      
      if (Date.now() > expires) {
        cacheUtils.clear(key);
        return null;
      }

      console.log(`✅ Using cached data for: ${key}`);
      return data;
    } catch (error) {
      console.error('Cache read error:', error);
      return null;
    }
  },

  getOrFetch: async (key, fetchFunction, ttl = null) => {
    const cached = cacheUtils.get(key);
    if (cached) return cached;

    console.log(`🔄 Fetching fresh data for: ${key}`);
    const data = await fetchFunction();
    if (data) {
      cacheUtils.set(key, data, ttl);
    }
    return data;
  },

  getStaleWhileRevalidate: async (key, fetchFunction, ttl = null) => {
    const cached = cacheUtils.get(key);
    
    if (cached) {
      const cacheInfo = JSON.parse(localStorage.getItem(`wendogo_${key}`) || '{}');
      const age = Date.now() - (cacheInfo.timestamp || 0);
      const refreshThreshold = (ttl || CACHE_DURATION.DOMAINS) * 0.8;
      
      if (age > refreshThreshold) {
        console.log(`🔄 Background refresh for: ${key}`);
        fetchFunction().then(freshData => {
          if (freshData) {
            cacheUtils.set(key, freshData, ttl);
            console.log(`✅ Background refresh completed for: ${key}`);
          }
        }).catch(console.error);
      }
      
      return cached;
    }

    return cacheUtils.getOrFetch(key, fetchFunction, ttl);
  },

  clear: (key) => {
    localStorage.removeItem(`wendogo_${key}`);
    sessionStorage.removeItem(`wendogo_${key}`);
  },

  clearAll: () => {
    const keys = [...Object.keys(localStorage), ...Object.keys(sessionStorage)];
    keys.forEach(key => {
      if (key.startsWith('wendogo_')) {
        localStorage.removeItem(key);
        sessionStorage.removeItem(key);
      }
    });
  }
};

// ✅ API OPTIMISÉE AVEC TRANSFORMATIONS
export const optimizedApi = {
  // Domaines (existant)
  getDomains: () => cacheUtils.getStaleWhileRevalidate(
    'domains', 
    () => fetch(`${REST_API_PARAMS.baseUrl}/domains`).then(r => r.json()),
    CACHE_DURATION.DOMAINS
  ),

  getAllSubdomains: () => cacheUtils.getStaleWhileRevalidate(
    'all_subdomains',
    () => fetch(`${REST_API_PARAMS.baseUrl}/subdomains`).then(r => r.json()),
    CACHE_DURATION.DOMAINS
  ),

  // ✅ NOUVEAU : École individuelle AVEC TRANSFORMATION
  getSchool: (slug) => cacheUtils.getStaleWhileRevalidate(
    `school_${slug}`,
    async () => {
      const response = await fetch(`${REST_API_PARAMS.baseUrl}/schools/slug/${slug}`);
      const school = await response.json();
      // ✅ APPLIQUER LA TRANSFORMATION
      return DataTransformers.transformSchoolData(school);
    },
    CACHE_DURATION.SCHOOLS
  ),

  // ✅ NOUVEAU : Programme individuel AVEC TRANSFORMATION
  getProgram: (slug) => cacheUtils.getStaleWhileRevalidate(
    `program_${slug}`,
    async () => {
      const response = await fetch(`${REST_API_PARAMS.baseUrl}/programs/slug/${slug}`);
      const program = await response.json();
      // ✅ APPLIQUER LA TRANSFORMATION
      return DataTransformers.transformProgramData(program);
    },
    CACHE_DURATION.PROGRAMS
  ),

  // ✅ NOUVEAU : Programmes d'une école AVEC TRANSFORMATION
  getSchoolPrograms: (schoolSlug) => cacheUtils.getStaleWhileRevalidate(
    `school_programs_${schoolSlug}`,
    async () => {
      const response = await fetch(`${REST_API_PARAMS.baseUrl}/programs/by-school-slug/${schoolSlug}`);
      const programs = await response.json();
      // ✅ APPLIQUER LA TRANSFORMATION
      return DataTransformers.transformProgramsArray(programs);
    },
    CACHE_DURATION.PROGRAMS
  ),

  // ✅ NOUVEAU : Programmes similaires AVEC TRANSFORMATION
  getSimilarPrograms: (programId, limit = 3) => cacheUtils.getStaleWhileRevalidate(
    `similar_programs_${programId}_${limit}`,
    async () => {
      const response = await fetch(`${REST_API_PARAMS.baseUrl}/programs/${programId}/similar?limit=${limit}`);
      const programs = await response.json();
      // ✅ APPLIQUER LA TRANSFORMATION
      return DataTransformers.transformProgramsArray(programs);
    },
    CACHE_DURATION.PROGRAMS
  ),

  // ✅ NOUVEAU : Écoles similaires AVEC TRANSFORMATION
  getSimilarSchools: (schoolId, limit = 3) => cacheUtils.getStaleWhileRevalidate(
    `similar_schools_${schoolId}_${limit}`,
    async () => {
      const response = await fetch(`${REST_API_PARAMS.baseUrl}/schools/${schoolId}/similar?limit=${limit}`);
      const schools = await response.json();
      // ✅ APPLIQUER LA TRANSFORMATION
      return DataTransformers.transformSchoolsArray(schools);
    },
    CACHE_DURATION.SCHOOLS
  ),

  // Écoles preview AVEC TRANSFORMATION
  getSchools: () => cacheUtils.getStaleWhileRevalidate(
    'schools', 
    async () => {
      const response = await fetch(`${REST_API_PARAMS.baseUrl}/schools/preview`);
      const schools = await response.json();
      // ✅ APPLIQUER LA TRANSFORMATION
      return DataTransformers.transformSchoolsArray(schools);
    },
    CACHE_DURATION.SCHOOLS
  ),

  // Options de filtres (existant)
  getFilterOptions: () => cacheUtils.getStaleWhileRevalidate(
    'filter_options', 
    () => fetch(`${REST_API_PARAMS.baseUrl}/programs/filter-options`).then(r => r.json()),
    CACHE_DURATION.FILTER_OPTIONS
  ),

  // Stats globales (existant)
  getGlobalStats: () => cacheUtils.getStaleWhileRevalidate(
    'global_stats', 
    () => fetch(`${REST_API_PARAMS.baseUrl}/stats`).then(r => r.json()),
    CACHE_DURATION.FILTER_OPTIONS
  ),

  // Chargement parallèle (existant avec transformations)
  loadAllInitialData: async () => {
    console.log('🚀 Loading initial data with optimized cache...');
    const startTime = performance.now();

    try {
      const [domains, allSubdomains, schools, filterOptions, globalStats] = await Promise.all([
        optimizedApi.getDomains(),
        optimizedApi.getAllSubdomains(),
        optimizedApi.getSchools(), // ✅ Déjà transformé
        optimizedApi.getFilterOptions(),
        optimizedApi.getGlobalStats()
      ]);

      const endTime = performance.now();
      console.log(`✅ Initial data loaded in ${Math.round(endTime - startTime)}ms`);

      return {
        domains: domains || [],
        allSubdomains: allSubdomains || [],
        schools: schools || [], // ✅ Déjà transformé avec logo_path, etc.
        filterOptions: filterOptions || {},
        globalStats: globalStats || {}
      };
    } catch (error) {
      console.error('❌ Error loading initial data:', error);
      throw error;
    }
  }
};

// ✅ HOOK REACT AVEC TRANSFORMATION
export const useCachedData = (key, fetchFunction, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { ttl, staleWhileRevalidate = true, transform } = options;

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      let result = staleWhileRevalidate 
        ? await cacheUtils.getStaleWhileRevalidate(key, fetchFunction, ttl)
        : await cacheUtils.getOrFetch(key, fetchFunction, ttl);
      
      // ✅ APPLIQUER TRANSFORMATION SI FOURNIE
      if (transform && result) {
        result = transform(result);
      }
      
      setData(result);
      setError(null);
    } catch (err) {
      setError(err);
      console.error(`Error loading ${key}:`, err);
    } finally {
      setLoading(false);
    }
  }, [key, fetchFunction, ttl, staleWhileRevalidate, transform]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return { data, loading, error, refresh: loadData };
};

// ✅ EXPORTER LES TRANSFORMERS POUR USAGE DIRECT
export { DataTransformers };

/**
 * Cache pour éviter les appels multiples à l'API
 */
let domainsCache = null;
let subdomainsCache = null;
let subdomainsByDomainCache = new Map();

/**
 * Récupère les domaines avec mise en cache
 * @returns {Promise<Array>} Domaines avec icônes
 */
export const getDomainsWithIcons = async () => {
  if (domainsCache) {
    return domainsCache;
  }
  
  try {
    domainsCache = await DomainApi.getDomainsWithIcons();
    return domainsCache;
  } catch (error) {
    console.error('Erreur lors de la récupération des domaines:', error);
    return [];
  }
};

/**
 * Récupère le nom d'un domaine par son ID
 * @param {string} domainId - L'ID du domaine
 * @returns {Promise<string>} Le nom du domaine
 */
export const getDomainName = async (domainId) => {
  try {
    const domains = await getDomainsWithIcons();
    const domain = domains.find(d => d.id === domainId);
    return domain ? domain.name : domainId;
  } catch (error) {
    console.error('Erreur lors de la récupération du nom du domaine:', error);
    return domainId;
  }
};

/**
 * VERSION SYNCHRONE - Récupère le nom d'un domaine depuis les données déjà chargées
 * @param {string} domainId - L'ID du domaine
 * @param {Array} domains - Domaines déjà chargés
 * @returns {string} Le nom du domaine
 */
export const getDomainNameSync = (domainId, domains = []) => {
  const domain = domains.find(d => d.id === domainId);
  console.log('getDomainNameSync called with:', { domainId, domains });
  return domain ? domain.name : domainId;
};

/**
 * Récupère les sous-domaines avec mise en cache
 * @returns {Promise<Array>} Tous les sous-domaines
 */
export const getAllSubdomains = async () => {
  if (subdomainsCache) {
    return subdomainsCache;
  }
  
  try {
    const response = await SubdomainApi.getAllSubdomains();
    if (response.success) {
      // Transformer en format compatible avec les mocks
      const mockFormat = {};
      response.data.forEach(subdomain => {
        mockFormat[subdomain.id] = subdomain.name;
      });
      subdomainsCache = mockFormat;
      return mockFormat;
    }
    return {};
  } catch (error) {
    console.error('Erreur lors de la récupération des sous-domaines:', error);
    return {};
  }
};

/**
 * Récupère le nom d'un sous-domaine par son ID
 * @param {string} subdomainId - L'ID du sous-domaine
 * @returns {Promise<string>} Le nom du sous-domaine
 */
export const getSubdomainName = async (subdomainId) => {
  try {
    return await SubdomainApi.getSubdomainName(subdomainId);
  } catch (error) {
    console.error('Erreur lors de la récupération du nom du sous-domaine:', error);
    return subdomainId;
  }
};

/**
 * VERSION SYNCHRONE - Récupère le nom d'un sous-domaine depuis les données chargées
 * @param {string} subdomainId - L'ID du sous-domaine
 * @param {Array} subdomains - Sous-domaines déjà chargés
 * @returns {string} Le nom du sous-domaine
 */
export const getSubdomainNameSync = (subdomainId, subdomains = []) => {
  const subdomain = subdomains.find(s => s.id === subdomainId);
  return subdomain ? subdomain.name : subdomainId;
};

/**
 * Récupère les noms de plusieurs sous-domaines
 * @param {Array<string>} subdomainIds - Les IDs des sous-domaines
 * @returns {Promise<Array<string>>} Les noms des sous-domaines
 */
export const getSubdomainNames = async (subdomainIds) => {
  try {
    return await SubdomainApi.getSubdomainNames(subdomainIds);
  } catch (error) {
    console.error('Erreur lors de la récupération des noms des sous-domaines:', error);
    return subdomainIds.filter(id => id && id.trim());
  }
};

/**
 * VERSION SYNCHRONE - Récupère les noms de plusieurs sous-domaines
 * @param {Array<string>} subdomainIds - Les IDs des sous-domaines
 * @param {Array} subdomains - Sous-domaines déjà chargés
 * @returns {Array<string>} Les noms des sous-domaines
 */
export const getSubdomainNamesSync = (subdomainIds, subdomains = []) => {
  if (!subdomainIds || !Array.isArray(subdomainIds)) return [];
  
  return subdomainIds
    .filter(id => id && id.trim())
    .map(id => {
      const subdomain = subdomains.find(s => s.id === id);
      return subdomain ? subdomain.name : id;
    });
};

/**
 * CORRECTION: Récupère les sous-domaines d'un domaine avec cache
 * @param {string} domainId - L'ID du domaine
 * @returns {Promise<Array>} Les sous-domaines du domaine
 */
export const getSubdomainsByDomain = async (domainId) => {
  // Vérifier le cache d'abord
  if (subdomainsByDomainCache.has(domainId)) {
    return subdomainsByDomainCache.get(domainId);
  }
  
  try {
    const response = await SubdomainApi.getSubdomainsByDomain(domainId);
    if (response.success) {
      // Mettre en cache
      subdomainsByDomainCache.set(domainId, response.data);
      return response.data;
    }
    return [];
  } catch (error) {
    console.error('Erreur lors de la récupération des sous-domaines par domaine:', error);
    return [];
  }
};

/**
 * VERSION SYNCHRONE - Récupère les sous-domaines d'un domaine depuis les données chargées
 * @param {string} domainId - L'ID du domaine
 * @param {Array} domains - Domaines avec sous-domaines chargés
 * @returns {Array} Les sous-domaines du domaine
 */
export const getSubdomainsByDomainSync = (domainId, domains = []) => {
  console.log('getSubdomainsByDomainSync called with:🥰', { domainId, domains });
  const domain = domains.find(d => d.id === domainId);
  return domain ? (domain.subdomains || []) : [];
};

/**
 * Récupère le domaine parent d'un sous-domaine
 * @param {string} subdomainId - L'ID du sous-domaine
 * @returns {Promise<string|null>} L'ID du domaine parent
 */
export const getSubdomainDomain = async (subdomainId) => {
  try {
    return await SubdomainApi.getSubdomainDomain(subdomainId);
  } catch (error) {
    console.error('Erreur lors de la récupération du domaine parent:', error);
    return null;
  }
};

/**
 * VERSION SYNCHRONE - Récupère le domaine parent d'un sous-domaine
 * @param {string} subdomainId - L'ID du sous-domaine
 * @param {Array} subdomains - Sous-domaines avec info domaine
 * @returns {string|null} L'ID du domaine parent
 */
export const getSubdomainDomainSync = (subdomainId, subdomains = []) => {
  const subdomain = subdomains.find(s => s.id === subdomainId);
  return subdomain ? subdomain.domain_id : null;
};

/**
 * Vide le cache (utile lors des changements de données)
 */
export const clearCache = () => {
  domainsCache = null;
  subdomainsCache = null;
  subdomainsByDomainCache.clear();
};

/**
 * Détermine si on doit utiliser les données mockées ou l'API
 */
export const shouldUseMockData = () => {
  return process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true' || false;
};

/**
 * Wrapper générique pour gérer la transition mocks -> API
 * @param {Function} mockFunction - Fonction utilisant les mocks
 * @param {Function} apiFunction - Fonction utilisant l'API
 * @returns {Promise} Résultat de la fonction appropriée
 */
export const withDataSource = async (mockFunction, apiFunction) => {
  if (shouldUseMockData()) {
    return await mockFunction();
  } else {
    return await apiFunction();
  }
};
