// src/utils/cacheUtils.js - Version avancée avec TTL intelligent
import { useState, useEffect, useCallback } from 'react';
import { REST_API_PARAMS } from './Constants';

const CACHE_DURATION = {
  DOMAINS: 30 * 60 * 1000,        // 30 minutes (données quasi-statiques)
  SCHOOLS: 20 * 60 * 1000,        // 20 minutes (changent peu)
  MEDIUM: 10 * 60 * 1000,         // 10 minutes (valeur par défaut)
  FILTER_OPTIONS: 15 * 60 * 1000, // 15 minutes (peuvent changer)
  PROGRAMS: 5 * 60 * 1000,        // 5 minutes (plus dynamiques)
  SEARCH_RESULTS: 2 * 60 * 1000   // 2 minutes (très dynamiques)
};

export const cacheUtils = {
  // ✅ NOUVEAU: Cache avec TTL différencié
  set: (key, data, customTTL = null) => {

    if (typeof window === 'undefined') {
        console.log(`⚠️ Server-side, skipping cache set for: ${key}`);
        return;
    }
    
    const ttl = customTTL || CACHE_DURATION.DOMAINS;
    const cacheData = {
      data,
      timestamp: Date.now(),
      expires: Date.now() + ttl
    };
    
    try {
      // Utiliser localStorage pour persister entre sessions
      localStorage.setItem(`wendogo_${key}`, JSON.stringify(cacheData));
      console.log(`📦 Cached data for: ${key} (TTL: ${ttl/1000/60}min)`);
    } catch (error) {
      console.error('Cache storage error:', error);
      // Fallback vers sessionStorage si localStorage plein
      try {
        sessionStorage.setItem(`wendogo_${key}`, JSON.stringify(cacheData));
      } catch (fallbackError) {
        console.error('Fallback cache error:', fallbackError);
      }
    }
  },

  get: (key) => {
    try {

      if (typeof window === 'undefined') {
        console.log(`⚠️ Server-side, skipping cache for: ${key}`);
        return null;
     }
      // Essayer localStorage d'abord, puis sessionStorage
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

  // ✅ NOUVEAU: Cache conditionnel avec validation de fraîcheur
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

  // ✅ NOUVEAU: Cache en arrière-plan (stale-while-revalidate)
  getStaleWhileRevalidate: async (key, fetchFunction, ttl = null) => {
    const cached = cacheUtils.get(key);
    
    // Si on a des données en cache, les retourner immédiatement
    if (cached) {
      // En parallèle, vérifier si on doit refresh en arrière-plan
      const cacheInfo = JSON.parse(localStorage.getItem(`wendogo_${key}`) || '{}');
      const age = Date.now() - (cacheInfo.timestamp || 0);
      const refreshThreshold = (ttl || CACHE_DURATION.DOMAINS) * 0.8; // Refresh à 80% du TTL
      
      if (age > refreshThreshold) {
        console.log(`🔄 Background refresh for: ${key}`);
        // Refresh en arrière-plan sans bloquer
        fetchFunction().then(freshData => {
          if (freshData) {
            cacheUtils.set(key, freshData, ttl);
            console.log(`✅ Background refresh completed for: ${key}`);
          }
        }).catch(console.error);
      }
      
      return cached;
    }

    // Pas de cache, fetch normal
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
  },

  // ✅ NOUVEAU: Préchargement intelligent
  preload: async (keys) => {
    const promises = keys.map(({ key, fetchFunction, ttl }) => {
      if (!cacheUtils.get(key)) {
        return cacheUtils.getOrFetch(key, fetchFunction, ttl);
      }
      return Promise.resolve(null);
    });
    
    await Promise.allSettled(promises);
    console.log('📦 Preloading completed');
  },

  // ✅ NOUVEAU: Statistiques du cache
  getStats: () => {
    const stats = { total: 0, byType: {}, totalSize: 0 };
    
    [...Object.keys(localStorage), ...Object.keys(sessionStorage)].forEach(key => {
      if (key.startsWith('wendogo_')) {
        const cleanKey = key.replace('wendogo_', '');
        const data = localStorage.getItem(key) || sessionStorage.getItem(key);
        stats.total++;
        stats.byType[cleanKey] = {
          size: new Blob([data]).size,
          cached: true
        };
        stats.totalSize += new Blob([data]).size;
      }
    });
    
    return stats;
  },

  clearPattern: (pattern) => {
  if (typeof window === 'undefined') return;
  
  let cleared = 0;
  
  Object.keys(localStorage).forEach(key => {
    if (key.startsWith('wendogo_') && key.includes(pattern)) {
      localStorage.removeItem(key);
      cleared++;
    }
  });
  
  Object.keys(sessionStorage).forEach(key => {
    if (key.startsWith('wendogo_') && key.includes(pattern)) {
      sessionStorage.removeItem(key);
      cleared++;
    }
  });
  
  console.log(`🗑️ Cleared ${cleared} cache entries matching: ${pattern}`);
  }
};

// ✅ NOUVEAU: Hook React pour cache avec SWR
export const useCachedData = (key, fetchFunction, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { ttl, staleWhileRevalidate = true } = options;

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const result = staleWhileRevalidate 
        ? await cacheUtils.getStaleWhileRevalidate(key, fetchFunction, ttl)
        : await cacheUtils.getOrFetch(key, fetchFunction, ttl);
      
      setData(result);
      setError(null);
    } catch (err) {
      setError(err);
      console.error(`Error loading ${key}:`, err);
    } finally {
      setLoading(false);
    }
  }, [key, fetchFunction, ttl, staleWhileRevalidate]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return { data, loading, error, refresh: loadData };
};

// ✅ NOUVEAU: API optimisée pour les données initiales
export const optimizedApi = {
  // NOUVEAU : Cache pour programme individuel
  getProgram: (slug, locale) => cacheUtils.getStaleWhileRevalidate(
    `program_${slug}_${locale}`,
    () => fetch(`${REST_API_PARAMS.baseUrl}/programs/slug/${slug}?locale=${locale}`).then(r => r.json()),
    CACHE_DURATION.PROGRAMS
  ),

  // NOUVEAU : Cache pour école individuelle
  getSchool: (slug, locale) => cacheUtils.getStaleWhileRevalidate(
    `school_${slug}_${locale}`,
    () => fetch(`${REST_API_PARAMS.baseUrl}/schools/slug/${slug}?locale=${locale}`).then(r => r.json()),
    CACHE_DURATION.SCHOOLS
  ),
  
  // NOUVEAU : Cache pour programmes d'une école
  getSchoolPrograms: (schoolSlug, locale) => cacheUtils.getStaleWhileRevalidate(
    `school_programs_${schoolSlug}_${locale}`,
    () => fetch(`${REST_API_PARAMS.baseUrl}/programs/by-school-slug/${schoolSlug}`).then(r => r.json()),
    CACHE_DURATION.PROGRAMS
  ),
  // Domaines avec cache long (changent rarement)
  getDomains: (locale = 'fr') => cacheUtils.getStaleWhileRevalidate(
    `domains_${locale}`, 
    () => fetch(`${REST_API_PARAMS.baseUrl}/domains?locale=${locale}`).then(r => r.json()),
    CACHE_DURATION.DOMAINS
  ),

  // ✅ AJOUT: Tous les sous-domaines pour les filtres
  getAllSubdomains: (locale = 'fr') => cacheUtils.getStaleWhileRevalidate(
    `all_subdomains_${locale}`,
    () => fetch(`${REST_API_PARAMS.baseUrl}/subdomains?locale=${locale}`).then(r => r.json()),
    CACHE_DURATION.DOMAINS
  ),

  // Écoles avec cache moyen
  getSchools: (locale = 'fr') => cacheUtils.getStaleWhileRevalidate(
    `schools_${locale}`, 
    () => fetch(`${REST_API_PARAMS.baseUrl}/schools/preview?locale=${locale}`).then(r => r.json()),
    CACHE_DURATION.SCHOOLS
  ),

  // Options de filtres avec cache court
  getFilterOptions: (locale = 'fr') => cacheUtils.getStaleWhileRevalidate(
    `filter_options_${locale}`, 
    () => fetch(`${REST_API_PARAMS.baseUrl}/programs/filter-options?locale=${locale}`).then(r => r.json()),
    CACHE_DURATION.FILTER_OPTIONS
  ),

  // Stats globales avec cache court
  getGlobalStats: (locale = 'fr') => cacheUtils.getStaleWhileRevalidate(
    `global_stats_${locale}`, 
    () => fetch(`${REST_API_PARAMS.baseUrl}/stats?locale=${locale}`).then(r => r.json()),
    CACHE_DURATION.FILTER_OPTIONS
  ),

  // ✅ NOUVEAU: Chargement parallèle de toutes les données initiales
  loadAllInitialData: async (locale = 'fr') => {
    console.log('🚀 Loading initial data with optimized cache...');
    const startTime = performance.now();
    const cacheKey = `initial_data_${locale}`;
    const cached = cacheUtils.get(cacheKey);
    console.log('localelocale ', locale)
    if (cached) {
      console.log(`✅ Using cached initial data for locale: ${locale}`);
      return cached;
    }

    console.log(`🔄 Fetching fresh initial data for locale: ${locale}`);
    try {
      // ✅ CORRECTION: Charger aussi tous les sous-domaines
      const [domains, allSubdomains, schools, filterOptions, globalStats] = await Promise.all([
        optimizedApi.getDomains(locale),
        optimizedApi.getAllSubdomains(locale),
        optimizedApi.getSchools(locale), 
        optimizedApi.getFilterOptions(locale),
        optimizedApi.getGlobalStats(locale)
      ]);

      const endTime = performance.now();
      // console.log(`✅ Initial data loaded in ${Math.round(endTime - startTime)}ms`);
      console.log('📦 ✅✅✅', domains);
      // console.log('allSubdomains ✅✅✅', allSubdomains);

      const initialData = {
        domains: (domains && domains.data) || [],
        allSubdomains: (allSubdomains && allSubdomains.data) || [], // ✅ AJOUT
        schools: schools || [],
        filterOptions: filterOptions || {},
        globalStats: (globalStats && globalStats.data) || {}
      };

      cacheUtils.set(cacheKey, initialData, CACHE_DURATION.MEDIUM);
      return initialData;
    } catch (error) {
      console.error('❌ Error loading initial data:', error);
      throw error;
    }
  }
};
