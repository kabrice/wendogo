//src/pages/index.js
import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { Search, Filter, MapPin, Clock, Euro, Calendar, GraduationCap, Building2, Users, ChevronDown, ChevronRight, ChevronLeft, X, Award, Briefcase, Globe, Check } from 'lucide-react';
import Link from 'next/link';
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';
import { optimizedApi, cacheUtils, CACHE_DURATION } from '../utils/cacheUtils';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
// NOUVEAUX IMPORTS - APIs au lieu des mocks
import ProgramApi from '../store/apis/programApi';
import DomainApi from '../store/apis/domainApi';
import SubdomainApi from '../store/apis/subdomainApi';
import {getDomainNameSync,getSubdomainNamesSync,getSubdomainsByDomainSync,getSubdomainDomainSync,getSubdomainNameSync } from '../utils/apiUtils';
import { FadeTransition } from '../components/ui';
import FavoriteButton from '../components/FavoriteButton';
import AccompanySection from '../components/AccompanySection';
import OrganizationContactSection from '../components/OrganizationContactSection';
import { trackSearch } from '../lib/gtag';
import ActiveFiltersBar from '../components/ActiveFiltersBar';

// Ajout de l'import ou définition de REST_API_PARAMS
// Ajouter au début du fichier, après les imports
/**
 * Extrait les années d'une chaîne de durée
 * "1 an" -> [1]
 * "2 à 5 ans" -> [2, 3, 4, 5]
 */
const extractYearsFromDuration = (duration) => {
  if (!duration) return [];
  
  const match = duration.match(/(\d+)(?:\s*à\s*(\d+))?\s*ans?/);
  if (!match) return [];
  
  const start = parseInt(match[1]);
  const end = match[2] ? parseInt(match[2]) : start;
  
  const years = [];
  for (let i = start; i <= end; i++) {
    years.push(i);
  }
  return years;
};

/**
 * Vérifie si une durée inclut une année cible
 */
const durationIncludesYear = (duration, targetYear) => {
  const years = extractYearsFromDuration(duration);
  return years.includes(targetYear);
};

/**
 * Obtient toutes les durées qui incluent une année donnée
 */
const getDurationsForYear = (targetYear, allDurations) => {
  return allDurations.filter(duration => 
    durationIncludesYear(duration, targetYear)
  );
};

const HomePage = () => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const locale = router.locale;
  // États principaux
  const [activeTab, setActiveTab] = useState('search');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState(new Set());
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedDomain, setSelectedDomain] = useState(null);
  const [selectedSubdomains, setSelectedSubdomains] = useState([]);
  const [showResults, setShowResults] = useState(false);

  // NOUVEAUX ÉTATS pour les données depuis l'API
  const [programs, setPrograms] = useState([]);
  const [schools, setSchools] = useState([]);
  const [domains, setDomains] = useState([]);
  const [subdomains, setSubdomains] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingDomains, setIsLoadingDomains] = useState(true);
  // NOUVEAUX ÉTATS pour pagination
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [isSearching, setIsSearching] = useState(false);
  const itemsPerPage = 12;  

  // États des filtres
  const [filters, setFilters] = useState({
    entryLevel: '',
    grade: '',
    diplomaType: '',
    selectedYear: null, 
    durations: [],
    deposit: { min: '', max: '' },
    applicationDate: '',
    tuition: { min: '', max: '' },
    alternance: '',
    city: '',
    domains: [],
    language: '',
    rncpLevel: ''
  });

  // Ajouter après les états existants
  const [showFilterSection, setShowFilterSection] = useState({
    domains: true, 
    general: false,
    cost: false,
    language: false,
    admission: false,
    campusFrance: false
  });

  // Nouveaux filtres
  const [campusFranceFilters, setCampusFranceFilters] = useState({
    connected: false,
    parallelProcedure: false,
    exoneration: null, // null, 1, -1, 0
    bienvenueFrance: null // null, 1, 2, 3, 4
  });

  // Pour les langues - séparer langue et niveau
  const [languageFilter, setLanguageFilter] = useState({
    language: '', // Fr, En, Es
    minLevel: '' // A1, A2, B1, B2, C1, C2
  });

  // Pour les dates - utiliser des mois
  const [dateRangeFilter, setDateRangeFilter] = useState({
    startMonth: 0, // 0-11 (0=Toute l'année)
    endMonth: 0
  });  

  // États pour les dropdowns searchables
  const [citySearch, setCitySearch] = useState('');
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [domainSearch, setDomainSearch] = useState('');
  const [showDomainDropdown, setShowDomainDropdown] = useState(false);
  const [selectedDomainFilters, setSelectedDomainFilters] = useState(new Set());
  const [selectedSubdomainFilters, setSelectedSubdomainFilters] = useState(new Set());

  const cityDropdownRef = useRef(null);
  const domainDropdownRef = useRef(null);
  const filtersDropdownRef = useRef(null);

  const [globalStats, setGlobalStats] = useState({
    total_programs: 0,
    total_schools: 0,
    satisfaction_rate: 95,
    support_availability: '24/7'
  });

  const [filterOptionsLoaded, setFilterOptionsLoaded] = useState(false);

  const scrollToResults = useCallback(() => {
    if (window.innerWidth <= 768) {
      setTimeout(() => {
        const resultsSection = document.querySelector('[data-results-section]');
        if (resultsSection) {
          const offset = 100; // Décalage pour éviter que ça soit collé en haut
          const elementPosition = resultsSection.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 300);
    }
  }, []);
  
  const [error, setError] = useState(null);
  // 3. REMPLACER LE CHARGEMENT INITIAL (optimisation)
  const loadInitialData = useCallback(async () => {
      setIsLoading(true);
      setIsLoadingDomains(true); 
      setError(null);

      try {
        console.log('🚀 Loading initial data with cache...');
        const startTime = performance.now();

        // Utiliser le cache intelligent pour charger toutes les données
        console.log(`🚀 Loading initial data with locale: ${locale}`);
        const data = await optimizedApi.loadAllInitialData(locale);
        console.log('✅ Initial data fetched:', {data});
        
        setDomains(data.domains);
        setSubdomains(data.allSubdomains);
        setSchools(data.schools);
        setFilterOptions(data.filterOptions);
        setGlobalStats(data.globalStats);

        const endTime = performance.now();
        console.log(`✅ Initial data loaded in ${Math.round(endTime - startTime)}ms`);
        setIsLoadingDomains(false);
      } catch (err) {
        console.error('❌ Error loading initial data:', err);
        setError(err);
        setIsLoadingDomains(false);
        // Fallback vers cache expiré si disponible
        const cachedDomains = cacheUtils.get('domains');
        const cachedSchools = cacheUtils.get('schools');
        
        if (cachedDomains || cachedSchools) {
          console.log('🔄 Using expired cache as fallback');
          setDomains(cachedDomains || []);
          setSchools(cachedSchools || []);
        }
      } finally {
        setIsLoading(false);
      }
    }, []);

  // ✅ OPTIMISATION: Charger au montage
  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]);


  useEffect(() => {
    // Gérer les paramètres d'URL pour l'onglet
    const { tab } = router.query;
    if (tab === 'accompany') {
      setActiveTab('accompany');
      // Scroll vers la section après un court délai
      setTimeout(() => {
        const element = document.getElementById('accompany-section');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [router.query]);  

  // Pour afficher le nombre de programmes dans un domaine :
  const getTotalProgramsForDomain = (domainId) => {
    const domain = domains.find(d => d.id === domainId);
    return domain ? domain.total_programs || 0 : 0;
  };

  // Pour afficher le nombre de programmes dans les sous-domaines sélectionnés :
  const getProgramCountForSelectedSubdomains = () => {
    let total = 0;
    selectedSubdomains.forEach(subdomainId => {
      // Trouver le sous-domaine dans les domaines chargés
      domains.forEach(domain => {
        const subdomain = domain.subdomains?.find(sub => sub.id === subdomainId);
        if (subdomain) {
          total += subdomain.program_count || 0;
        }
      });
    });
    return total;
  }; 
  // CORRECTION 3: Fermer les suggestions en cliquant à l'extérieur
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.relative')) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);  
  
  // CORRECTION 1: Vérifier le chargement des domaines avec sous-domaines
  useEffect(() => {
    console.log('🐛 Debug domains loaded:', {
      domainsCount: domains.length,
      firstDomain: domains[0],
      subdomainsCount: subdomains.length,
      firstSubdomain: subdomains[0]
    });
  }, [domains, subdomains]);

  useEffect(() => {
      const handleClickOutside = (event) => {
        // Fermer le panneau de filtres si on clique à l'extérieur
        if (showFilters && 
            filtersDropdownRef.current && 
            !filtersDropdownRef.current.contains(event.target)) {
          
          // ✅ Vérifier aussi qu'on ne clique pas sur le bouton qui ouvre les filtres
          const filterButton = event.target.closest('[data-filter-toggle]');
          if (!filterButton) {
            setShowFilters(false);
          }
        }
      };

      // Ajouter l'écouteur seulement si le panneau est ouvert
      if (showFilters) {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
      }
    }, [showFilters]);    
    
    // 🎁 BONUS : Fermer le panneau avec la touche Escape
    useEffect(() => {
      const handleKeyDown = (event) => {
        if (event.key === 'Escape' && showFilters) {
          console.log('🔒 Fermeture du panneau de filtres (Escape)');
          setShowFilters(false);
        }
      };

      if (showFilters) {
        document.addEventListener('keydown', handleKeyDown);
        return () => {
          document.removeEventListener('keydown', handleKeyDown);
        };
      }
    }, [showFilters]);

  /**
   * Réinitialise tous les filtres avancés (garde uniquement la recherche textuelle)
   */
  const resetAdvancedFilters = useCallback(() => {
    console.log('🔄 Resetting all advanced filters');
    
    // Réinitialiser tous les états de filtres
    setFilters({
      entryLevel: '',
      grade: '',
      diplomaType: '',
      selectedYear: null,
      durations: [],
      deposit: { min: '', max: '' },
      applicationDate: '',
      tuition: { min: '', max: '' },
      alternance: '',
      city: '',
      domains: [],
      language: '',
      rncpLevel: ''
    });
    
    // Réinitialiser les filtres de domaines
    setSelectedDomain(null);
    setSelectedSubdomains([]);
    setSelectedDomainFilters(new Set());
    setSelectedSubdomainFilters(new Set());
    
    // Réinitialiser les filtres Campus France
    setCampusFranceFilters({
      connected: false,
      parallelProcedure: false,
      exoneration: null,
      bienvenueFrance: null
    });
    
    // Réinitialiser le filtre langue
    setLanguageFilter({
      language: '',
      minLevel: ''
    });
    
    // Réinitialiser les recherches de dropdowns
    setCitySearch('');
    setDomainSearch('');
    
    // Fermer le panneau de filtres si ouvert
    setShowFilters(false);
    
    console.log('✅ All advanced filters reset');
  }, []);


  const handleSearch = useCallback(async (queryOverride = null, forceSearch = false) => {
    const query = queryOverride || searchQuery;

    console.log('🔍 handleSearch called with:', {
      query: query.trim(),
      forceSearch,
      filters,
      campusFranceFilters,
      selectedSubdomainFilters: selectedSubdomainFilters.size,
      selectedSubdomains: selectedSubdomains.length
    });

    // ✅ NOUVELLE LOGIQUE : Permettre la recherche si :
    // 1. forceSearch = true (bouton "Appliquer" ou "Voir toutes")
    // 2. OU il y a une query de recherche
    // 3. OU il y a des filtres actifs
    // 4. OU il y a des sous-domaines sélectionnés
    // ✅ CODE CORRIGÉ
    const hasActiveFilters = Object.entries(filters).some(([key, value]) => {
      // Ignorer les valeurs vides/null
      if (value === '' || value === null || value === undefined) return false;
      
      // selectedYear : actif si !== null
      if (key === 'selectedYear') return value !== null;
      
      // Objets avec min/max (deposit, tuition)
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        // Vérifier que l'objet a bien les propriétés min et max
        if ('min' in value && 'max' in value) {
          return value.min !== '' || value.max !== '';
        }
      }
      
      // Arrays
      if (Array.isArray(value)) return value.length > 0;
      
      // Valeurs simples (string, number, boolean)
      return value !== '';
    });

    const hasSubdomains = selectedSubdomainFilters.size > 0 || selectedSubdomains.length > 0;

    const shouldSearch = forceSearch || 
                        query.trim() || 
                        hasActiveFilters || 
                        hasSubdomains;

    console.log('🔍 Search decision:', {
      shouldSearch,
      forceSearch,
      hasQuery: !!query.trim(),
      hasActiveFilters,
      hasSubdomains
    });

    if (!shouldSearch) {
      console.log('❌ Search blocked - no criteria');
      setSearchResults([]);
      setTotalResults(0);
      return;
    }

    // ✅ FORCER l'affichage des résultats
    setShowResults(true);
    setIsSearching(true);
    setCurrentPage(1);

    try {
      // ✅ CONSTRUIRE les filtres - TOUS optionnels
      const searchFilters = {
        page: 1,
        limit: itemsPerPage,
      };

      // Ajouter search seulement si il y a du texte
      if (query && query.trim()) {
        searchFilters.search = query.trim();
      }

      // Ajouter tous les filtres s'ils existent
      if (filters.grade) searchFilters.grade = filters.grade;

      // ✅ CORRECTION : Calculer les durées à partir de l'année sélectionnée
      if (filters.selectedYear !== null) {
        const year = filters.selectedYear;
        const matchingDurations = getDurationsForYear(year, filterOptions.durations);
        searchFilters.durations = matchingDurations;
        console.log(`🔍 Year ${year} selected, matching durations:`, matchingDurations);
      }

      if (filters.durations && filters.durations.length > 0) {
        searchFilters.durations = filters.durations;
      }
      if (filters.alternance) searchFilters.alternance = filters.alternance;
      if (filters.city) searchFilters.city = filters.city;
      if (filters.rncpLevel) searchFilters.rncp_level = filters.rncpLevel;
      if (filters.entryLevel) searchFilters.entry_level = filters.entryLevel;
      if (filters.diplomaType) searchFilters.diploma_type = filters.diplomaType;
      if (filters.language) searchFilters.language = filters.language;
      if (filters.applicationDate) searchFilters.application_date = filters.applicationDate;
      if (filters.tuition.min) searchFilters.tuition_min = filters.tuition.min;
      if (filters.tuition.max) searchFilters.tuition_max = filters.tuition.max;
      if (filters.deposit.min) searchFilters.deposit_min = filters.deposit.min;
      if (filters.deposit.max) searchFilters.deposit_max = filters.deposit.max;

      if (campusFranceFilters.connected) {
        searchFilters.campus_france_connected = true;
      }
      console.log('🔍 Search Campus France Filters:', campusFranceFilters);
      if (campusFranceFilters.parallelProcedure) {
        searchFilters.parallel_procedure = true;
      }
      
      if (campusFranceFilters.exoneration !== null) {
        searchFilters.exoneration = campusFranceFilters.exoneration;
      }
      
      if (campusFranceFilters.bienvenueFrance !== null) {
        searchFilters.bienvenue_france_level = campusFranceFilters.bienvenueFrance;
      }
    
      // Ajouter les sous-domaines SEULEMENT s'ils sont sélectionnés
      const activeSubdomains = selectedSubdomainFilters.size > 0 ? 
                              [...selectedSubdomainFilters] : 
                              selectedSubdomains.length > 0 ? selectedSubdomains : null;
      
      if (activeSubdomains && activeSubdomains.length > 0) {
        searchFilters.subdomain_ids = activeSubdomains;
      }

      console.log('🔍 API call with filters:', searchFilters);

      const response = await ProgramApi.searchPrograms(searchFilters, locale);
      
      console.log('🔍 API response:', response);
      
      if (response.success) {
        setSearchResults(response.data);
        setTotalResults(response.total || 0);
        //setCurrentPage(1);
        console.log('✅ Search successful:', response.data.length, 'programs found');
      } else {
        console.error('❌ Search failed:', response.error);
        setSearchResults([]);
        setTotalResults(0);
      }
      trackSearch(query.trim(), response.data.length);
    } catch (error) {
      console.error('❌ Erreur lors de la recherche:', error);
      setSearchResults([]);
      setTotalResults(0);
    } finally {
      setIsSearching(false);
    }
  }, [searchQuery, filters, campusFranceFilters, selectedSubdomainFilters, selectedSubdomains, itemsPerPage, locale]);

  // Ajouter cette fonction au début du composant HomePage, avant le return
  const getActiveFiltersCount = useCallback(() => {
    let count = 0;
    
    // Parcourir tous les filtres
    Object.entries(filters).forEach(([key, value]) => {
      if (key === 'selectedYear') {
        // selectedYear est actif si !== null
        if (value !== null) count++;
      } else if (key === 'deposit' || key === 'tuition') {
        // deposit/tuition sont actifs si min ou max rempli
        if (value.min !== '' || value.max !== '') count++;
      } else if (Array.isArray(value)) {
        // Arrays sont actifs si non vides
        if (value.length > 0) count++;
      } else {
        // Autres valeurs sont actives si !== ''
        if (value !== '' && value !== null) count++;
      }
    });
    
    // Ajouter les sous-domaines
    count += selectedSubdomainFilters.size;
    
    return count;
  }, [filters, selectedSubdomainFilters]);
  /**
   * Lance une recherche simple (uniquement texte, sans filtres avancés)
   */
  const handleSimpleSearch = useCallback(() => {
    console.log('🔍 Simple search triggered with query:', searchQuery);
    
    // Réinitialiser tous les filtres avancés
    resetAdvancedFilters();
    
    // Lancer la recherche avec uniquement le texte
    setShowResults(true);
    setTimeout(() => {
      handleSearch(searchQuery, true);
    }, 100); // Petit délai pour que les états soient bien mis à jour
  }, [searchQuery, resetAdvancedFilters, handleSearch]);  
  
  
  // CORRECTION 4: Ajouter un effet pour mettre à jour les résultats quand les filtres changent
  useEffect(() => {
    // ✅ Ne faire la recherche automatique QUE si on a déjà des résultats affichés
    // et qu'il y a vraiment des changements significatifs
    if (showResults && (searchQuery.trim() || selectedSubdomainFilters.size > 0)) {
      const timeoutId = setTimeout(() => {
        handleSearch(null, false); // ✅ forceSearch = false pour auto-search
      }, 500);
      
      return () => clearTimeout(timeoutId);
    }
  }, [searchQuery, selectedSubdomainFilters]); 
 
  const goToPage = useCallback(async (targetPage) => {
    if (targetPage < 1 || targetPage > Math.ceil(totalResults / itemsPerPage) || isSearching) {
      return;
    }

    setIsSearching(true);
    setCurrentPage(targetPage); // ✅ Mettre à jour la page courante AVANT l'appel API
    
    try {
      const searchFilters = {
        page: targetPage, // ✅ Utiliser la page cible
        limit: itemsPerPage,
      };

      // ✅ Reprendre EXACTEMENT les mêmes filtres que la recherche initiale
      const query = searchQuery;
      if (query && query.trim()) {
        searchFilters.search = query.trim();
      }

      // Ajouter tous les filtres actifs
      if (filters.grade) searchFilters.grade = filters.grade;
      // ✅ Calculer les durées
      if (filters.selectedYear !== null) {
        const year = filters.selectedYear;
        const matchingDurations = getDurationsForYear(year, filterOptions.durations);
        searchFilters.durations = matchingDurations;
      }
    
      if (filters.durations && filters.durations.length > 0) {
        searchFilters.durations = filters.durations;
      }
      if (filters.alternance) searchFilters.alternance = filters.alternance;
      if (filters.city) searchFilters.city = filters.city;
      if (filters.rncpLevel) searchFilters.rncp_level = filters.rncpLevel;
      if (filters.entryLevel) searchFilters.entry_level = filters.entryLevel;
      if (filters.diplomaType) searchFilters.diploma_type = filters.diplomaType;
      if (filters.language) searchFilters.language = filters.language;
      if (filters.applicationDate) searchFilters.application_date = filters.applicationDate;
      if (filters.tuition.min) searchFilters.tuition_min = filters.tuition.min;
      if (filters.tuition.max) searchFilters.tuition_max = filters.tuition.max;
      if (filters.deposit.min) searchFilters.deposit_min = filters.deposit.min;
      if (filters.deposit.max) searchFilters.deposit_max = filters.deposit.max;

      // ✅ Campus France
      if (campusFranceFilters.connected) {
        searchFilters.campus_france_connected = true;
      }
      console.log('🔍 Pagination Campus France Filters:', campusFranceFilters);
      if (campusFranceFilters.parallelProcedure) {
        searchFilters.parallel_procedure = true;
      }
      if (campusFranceFilters.exoneration !== null) {
        searchFilters.exoneration = campusFranceFilters.exoneration;
      }
      if (campusFranceFilters.bienvenueFrance !== null) {
        searchFilters.bienvenue_france_level = campusFranceFilters.bienvenueFrance;
      }      

      // Ajouter les sous-domaines actifs
      const activeSubdomains = selectedSubdomainFilters.size > 0 ? 
                              [...selectedSubdomainFilters] : 
                              selectedSubdomains.length > 0 ? selectedSubdomains : null;
      
      if (activeSubdomains && activeSubdomains.length > 0) {
        searchFilters.subdomain_ids = activeSubdomains;
      }

      console.log(`🔍 Pagination: Going to page ${targetPage} with filters:`, searchFilters);

      const response = await ProgramApi.searchPrograms(searchFilters, locale);
      
      if (response.success) {
        // ✅ REMPLACER les résultats (pas ajouter)
        setSearchResults(response.data);
        setTotalResults(response.total || 0);
        scrollToResults();
      } else {
        console.error('❌ Pagination failed:', response.error);
        setCurrentPage(1); // Revenir à la page 1 en cas d'erreur
      }
    } catch (error) {
      console.error('❌ Erreur lors de la pagination:', error);
      setCurrentPage(1); // Revenir à la page 1 en cas d'erreur
    } finally {
      setIsSearching(false);
    }
  }, [searchQuery, filters, selectedSubdomainFilters, selectedSubdomains, itemsPerPage, totalResults, isSearching, locale, campusFranceFilters]);

  // 4. NOUVELLE FONCTION DE RECHERCHE PAGINÉE
  const performSearch = useCallback(async (page = 1, resetResults = false) => {
    if (resetResults) {
      // ✅ Si c'est un reset, utiliser handleSearch qui remet à page 1
      return handleSearch();
    } else {
      // ✅ Sinon, c'est une pagination normale
      return goToPage(page);
    }
  }, [handleSearch, goToPage]);

  // CORRECTION 3: Nouvelles suggestions basées sur l'API
  const loadSuggestions = useCallback(async (query) => {
    if (!query || typeof query !== 'string' || query.trim().length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    try {
      // Recherche avec limite plus élevée pour avoir plus de choix
      const response = await ProgramApi.searchPrograms({
        search: query.trim(),
        page: 1,
        limit: 20
      }, locale);
      
      if (response.success && response.data.length > 0) {
        const suggestionMap = new Map();
        //debugProgramData(response.data);
        const queryLower = query.toLowerCase();
        
        response.data.forEach(program => {
          const suggestions = [];
          
          // PRIORITÉ HAUTE (score 10-6) avec vérifications de sécurité
          if (program.title && typeof program.title === 'string' && program.title.toLowerCase().includes(queryLower)) {
            suggestions.push({ text: program.title.trim(), score: 10, type: 'Programme' });
          }
          if (program.school_name && typeof program.school_name === 'string' && program.school_name.toLowerCase().includes(queryLower)) {
            suggestions.push({ text: program.school_name.trim(), score: 9, type: 'École' });
          }
          if (program.school?.school_group && typeof program.school.school_group === 'string' && program.school.school_group.toLowerCase().includes(queryLower)) {
            suggestions.push({ text: program.school.school_group.trim(), score: 8, type: 'Groupe' });
          }
          if (program.description && typeof program.description === 'string' && program.description.toLowerCase().includes(queryLower)) {
            suggestions.push({ text: program.title.trim(), score: 7, type: 'Programme' });
          }
          if (program.skills_acquired && typeof program.skills_acquired === 'string' && program.skills_acquired.toLowerCase().includes(queryLower)) {
            suggestions.push({ text: program.title.trim(), score: 6, type: 'Programme' });
          }
          if (program.careers && typeof program.careers === 'string' && program.careers.toLowerCase().includes(queryLower)) {
            suggestions.push({ text: program.title.trim(), score: 6, type: 'Programme' });
          }

          // PRIORITÉ MOYENNE (score 5-3)
          if (program.curriculum_highlights && typeof program.curriculum_highlights === 'string' && program.curriculum_highlights.toLowerCase().includes(queryLower)) {
            suggestions.push({ text: program.title.trim(), score: 4, type: 'Programme' });
          }
          if (program.grade && typeof program.grade === 'string' && program.grade.toLowerCase().includes(queryLower)) {
            suggestions.push({ text: program.grade.trim(), score: 3, type: 'Grade' });
          }
          if (program.state_certification_type && typeof program.state_certification_type === 'string' && program.state_certification_type.toLowerCase().includes(queryLower)) {
            suggestions.push({ text: program.state_certification_type.trim(), score: 3, type: 'Certification' });
          }
          if (program.state_certification_type_complement && typeof program.state_certification_type_complement === 'string' && program.state_certification_type_complement.toLowerCase().includes(queryLower)) {
            suggestions.push({ text: program.state_certification_type_complement.trim(), score: 3, type: 'Certification' });
          }

          // PRIORITÉ FAIBLE (score 2-1)
          if (program.special_comment && typeof program.special_comment === 'string' && program.special_comment.toLowerCase().includes(queryLower)) {
            suggestions.push({ text: program.title.trim(), score: 2, type: 'Programme' });
          }
          if (program.corporate_partners && typeof program.corporate_partners === 'string' && program.corporate_partners.toLowerCase().includes(queryLower)) {
            suggestions.push({ text: program.title.trim(), score: 1, type: 'Programme' });
          }

          // Ajouter les suggestions avec vérification de sécurité
          suggestions.forEach(suggestion => {
            // CORRECTION: Vérifier que suggestion.text existe et n'est pas vide
            if (suggestion.text && typeof suggestion.text === 'string' && suggestion.text.trim().length > 0) {
              const key = suggestion.text.toLowerCase().trim();
              if (!suggestionMap.has(key) || suggestionMap.get(key).score < suggestion.score) {
                suggestionMap.set(key, {
                  ...suggestion,
                  text: suggestion.text.trim() // S'assurer que le texte est nettoyé
                });
              }
            }
          });
        });
        
        // Trier par score et prendre les 5 meilleurs
        const sortedSuggestions = Array.from(suggestionMap.values())
          .filter(s => s.text && s.text.length > 0) // Double vérification
          .sort((a, b) => b.score - a.score)
          .slice(0, 5)
          .map(s => s.text);
        
        setSuggestions(sortedSuggestions);
        setShowSuggestions(sortedSuggestions.length > 0);
        
        console.log('✅ Suggestions generated:', sortedSuggestions);
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
        console.log('ℹ️ No suggestions found for:', query);
      }
    } catch (error) {
      console.error('❌ Erreur lors de la récupération des suggestions:', error);
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, []);


  // CORRECTION 4: Mettre à jour l'effet des suggestions
  // CORRECTION SUPPLÉMENTAIRE: Améliorer l'effet de debounce
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery && searchQuery.trim().length > 2) {
        loadSuggestions(searchQuery);
      } else {
        // Vider les suggestions si le champ est vide ou trop court
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }, 300); // Debounce de 300ms

    return () => clearTimeout(timeoutId);
  }, [searchQuery, loadSuggestions]);

  const dropdownRef = useRef(null);
  // ✅ Solution - Ajouter un useEffect pour gérer le clic extérieur
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowSuggestions(false); // ou setIsOpen(false)
      }
    };

    if (showSuggestions) { // Seulement si ouvert
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showSuggestions]);
  // 7. COMPOSANT PAGINATION (inspiré de votre code)
  const Pagination = ({ className = "" }) => {
    const totalPages = Math.ceil(totalResults / itemsPerPage);
    
    if (totalPages <= 1) return null;

    const getVisiblePages = () => {
      const delta = 2;
      const range = [];
      const rangeWithDots = [];

      for (let i = Math.max(2, currentPage - delta); 
          i <= Math.min(totalPages - 1, currentPage + delta); 
          i++) {
        range.push(i);
      }

      if (currentPage - delta > 2) {
        rangeWithDots.push(1, '...');
      } else {
        rangeWithDots.push(1);
      }

      rangeWithDots.push(...range);

      if (currentPage + delta < totalPages - 1) {
        rangeWithDots.push('...', totalPages);
      } else {
        rangeWithDots.push(totalPages);
      }

      return rangeWithDots;
    };

    return (
      <div className={`flex items-center justify-center gap-2 ${className}`}>
        <button
          onClick={() => goToPage(currentPage - 1)} // ✅ Utiliser goToPage
          disabled={currentPage === 1 || isSearching}
          className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {getVisiblePages().map((page, index) => (
          <button
            key={index}
            onClick={() => typeof page === 'number' ? goToPage(page) : null} // ✅ Utiliser goToPage
            disabled={isSearching || page === '...'}
            className={`px-3 py-2 rounded-lg border text-sm font-medium ${
              page === currentPage
                ? 'bg-blue-600 text-white border-blue-600'
                : page === '...'
                ? 'border-transparent cursor-default'
                : 'border-gray-300 hover:bg-gray-50'
            }`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => goToPage(currentPage + 1)} // ✅ Utiliser goToPage
          disabled={currentPage === totalPages || isSearching}
          className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    );
  };
  

  const [filterOptions, setFilterOptions] = useState({
    grades: [],
    durations: [],
    application_dates: [],
    cities: [],
    rncp_levels: [],
    entry_levels: [],
    languages: []
  });
  // ✅ AJOUTER une fonction helper pour les villes filtrées par recherche :
  const getFilteredCities = useMemo(() => {
    return filterOptions.cities.filter(city => 
      city.toLowerCase().includes(citySearch.toLowerCase())
    );
  }, [filterOptions.cities, citySearch]);

  // ✅ AJOUTER une fonction helper pour les domaines filtrés par recherche :
  const getFilteredDomains = useMemo(() => {
    return domains.filter(domain => 
      domain && domain.name && domain.name.toLowerCase().includes(domainSearch.toLowerCase())
    );
  }, [domains, domainSearch]);

  // Fonction de formatage des langues
  const formatLanguage = (langCode) => {
    if (!langCode) return '';
    return langCode.split(',').map(code => {
      const [lang, level] = code.trim().split('-');
      const langName = lang === 'Fr' ? 'Français' : 'Anglais';
      return `${langName} (${level})`;
    }).join(', ');
  };

  // Autosuggestions (mise à jour pour API)
  useEffect(() => {
    if (searchQuery.trim().length > 2) {
      const query = searchQuery.toLowerCase();
      const suggestions = new Set();
      
      programs.forEach(program => {
        if (program.title.toLowerCase().includes(query)) {
          suggestions.add(program.title);
        }
        if (program.school_name.toLowerCase().includes(query)) {
          suggestions.add(program.school_name);
        }
        
        // Pour les sous-domaines, on utilise les données chargées
        const programSubdomainIds = [program.sub_domain1, program.sub_domain2, program.sub_domain3].filter(Boolean);
        console.log('🐛 Debug program subdomain IDs:', programSubdomainIds) ;
        programSubdomainIds.forEach(subdomainId => {
          const subdomain = subdomains.find(s => s.id === subdomainId);
          if (subdomain && subdomain.name.toLowerCase().includes(query)) {
            suggestions.add(subdomain.name);
          }
        });
      });

      setSuggestions([...suggestions].slice(0, 5));
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchQuery, programs, subdomains]);

  useEffect(() => {
    // ✅ Réinitialiser les résultats quand searchQuery est complètement effacé
    if (searchQuery === '' && showResults) {
      console.log('🔄 SearchQuery vide - Réinitialisation des résultats');
      setSearchResults([]);
      setTotalResults(0);
      setShowResults(false);
      setCurrentPage(1);
    }
  }, [searchQuery]); 

    // Gestion des clics extérieurs pour les dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cityDropdownRef.current && !cityDropdownRef.current.contains(event.target)) {
        setShowCityDropdown(false);
      }
      if (domainDropdownRef.current && !domainDropdownRef.current.contains(event.target)) {
        setShowDomainDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  const getProgramCountForSubdomains = useCallback(async (subdomainIds) => {
    if (!subdomainIds || subdomainIds.length === 0) return 0;
    
    try {
      // Faire un appel API pour compter les programmes avec ces sous-domaines
      const response = await ProgramApi.searchPrograms({
        subdomain_ids: subdomainIds,
        page: 1,
        limit: 1 // On veut juste le total, pas les données
      }, locale);
      
      return response.success ? response.total : 0;
    } catch (error) {
      console.error('Erreur lors du comptage des programmes:', error);
      return 0;
    }
  }, []);

  // Ajoutez un état pour stocker le count
  const [programCountForSelected, setProgramCountForSelected] = useState(0);

  // Ajoutez un effet pour mettre à jour le count quand les sous-domaines changent
  useEffect(() => {
    if (selectedSubdomains.length > 0) {
      const updateCount = async () => {
        const count = await getProgramCountForSubdomains(selectedSubdomains);
        setProgramCountForSelected(count);
      };
      updateCount();
    } else {
      setProgramCountForSelected(0);
    }
  }, [selectedSubdomains, getProgramCountForSubdomains]);

  // Remplacer l'useEffect existant qui gère router.query par :
  useEffect(() => {
    const { tab, domain: domainSlug, subdomains: subdomainSlugs, view } = router.query;
    
    // Gérer l'onglet actif
    if (tab && ['search', 'accompany', 'organizations'].includes(tab)) {
      setActiveTab(tab);
      
      if (tab === 'accompany') {
        setTimeout(() => {
          const element = document.getElementById('accompany-section');
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }
    }

    // Gérer la sélection de domaine depuis l'URL
    if (tab === 'search' && domainSlug && domains.length > 0) {
      const domain = getDomainBySlug(domainSlug);
      if (domain) {
        setSelectedDomain(domain.id);
        const domainSubdomains = getSubdomainsByDomainSync(domain.id, domains);
        setSelectedDomainFilters(new Set([domain.id]));
        
        // ✅ NOUVEAU : Si on a des sous-domaines dans l'URL
        if (subdomainSlugs) {
          const subdomainSlugArray = subdomainSlugs.split(',');
          const matchingSubdomains = domainSubdomains.filter(sd => 
            subdomainSlugArray.includes(toSlug(sd.name))
          );
          const subdomainIds = matchingSubdomains.map(sd => sd.id);
          setSelectedSubdomains(subdomainIds);
          setSelectedSubdomainFilters(new Set(subdomainIds));
          
          // ✅ NOUVEAU : Lancer la recherche SEULEMENT si view=results
          if (view === 'results' && subdomainIds.length > 0) {
            setShowResults(true);
            setTimeout(() => handleSearch(null, true), 100);
          } else {
            // Sinon, juste afficher le widget de sélection
            setShowResults(false);
          }
        } else {
          // ✅ NOUVEAU : Sans sous-domaines, afficher le widget de sélection
          setShowResults(false);
          setSelectedSubdomains([]);
          // Ne pas sélectionner automatiquement tous les sous-domaines
        }
      }
    }
  }, [router.query, domains, subdomains]);

  // Toggle favori
  const toggleFavorite = (programId) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(programId)) {
      newFavorites.delete(programId);
    } else {
      newFavorites.add(programId);
    }
    setFavorites(newFavorites);
  };

  // Fonctions utilitaires
  const formatDuration = (duration) => {
    if (!duration) return '';
    // extraire deux nombres si la durée est une plage (ex: "2 à 5 ans")
    const match = duration.match(/(\d+)(?:\D+(\d+))?/);
    if (!match) return duration;

    const start = parseInt(match[1], 10);
    const end = match[2] ? parseInt(match[2], 10) : null;

    const lang = (locale || 'fr').split('-')[0];

    const localeMap = {
      fr: { singular: 'an', plural: 'ans', rangeSep: '–' },
      en: { singular: 'year', plural: 'years', rangeSep: '–' }
    };

    const words = localeMap[lang] || localeMap.default;

    if (end && end !== start) {
      return `${start}${words.rangeSep}${end} ${words.plural}`;
    }

    const unit = start > 1 ? words.plural : words.singular;
    return `${start} ${unit}`;
  };

  const formatPrice = (price) => {
    if (!price) return 'Non communiqué';
    return price.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
  };

  // Composant Dropdown avec Checkboxes pour Domaines/Sous-domaines (mise à jour pour API)
  const DomainCheckboxDropdown = () => {
    const filteredDomains = getFilteredDomains;

    console.log('🐛 Filtered domains:', filteredDomains.length)

    const toggleDomain = (domainId) => {
      const newSelectedDomains = new Set(selectedDomainFilters);
      
      // ✅ UTILISER LES DONNÉES DÉJÀ CHARGÉES au lieu d'une requête API
      const domain = domains.find(d => d.id === domainId);
      if (!domain) return;
      
      // Récupérer les sous-domaines de ce domaine depuis les données chargées
      const domainSubdomains = domain.subdomains?.filter(subdomain => {
        // Filtrer seulement les sous-domaines qui ont des programmes
        return subdomain.program_count && subdomain.program_count > 0;
      }) || [];
      
      const newSelectedSubdomains = new Set(selectedSubdomainFilters);
      
      if (newSelectedDomains.has(domainId)) {
        // ✅ Désélectionner le domaine et TOUS ses sous-domaines
        newSelectedDomains.delete(domainId);
        domainSubdomains.forEach(subdomain => newSelectedSubdomains.delete(subdomain.id));
      } else {
        // ✅ Sélectionner le domaine et TOUS ses sous-domaines disponibles
        newSelectedDomains.add(domainId);
        domainSubdomains.forEach(subdomain => newSelectedSubdomains.add(subdomain.id));
      }
      
      setSelectedDomainFilters(newSelectedDomains);
      setSelectedSubdomainFilters(newSelectedSubdomains);
    };

    const toggleSubdomain = (subdomainId, domainId) => {
      const newSelectedSubdomains = new Set(selectedSubdomainFilters);
      const newSelectedDomains = new Set(selectedDomainFilters);
      
      if (newSelectedSubdomains.has(subdomainId)) {
        // Désélectionner le sous-domaine
        newSelectedSubdomains.delete(subdomainId);
        
        // ✅ UTILISER LES DONNÉES DÉJÀ CHARGÉES
        const domain = domains.find(d => d.id === domainId);
        const domainSubdomains = domain?.subdomains?.filter(subdomain => 
          subdomain.program_count && subdomain.program_count > 0
        ) || [];
        
        // Vérifier s'il reste des sous-domaines sélectionnés pour ce domaine
        const hasOtherSelected = domainSubdomains.some(subdomain => 
          subdomain.id !== subdomainId && newSelectedSubdomains.has(subdomain.id)
        );
        
        if (!hasOtherSelected) {
          newSelectedDomains.delete(domainId);
        }
      } else {
        // Sélectionner le sous-domaine
        newSelectedSubdomains.add(subdomainId);
        
        // ✅ UTILISER LES DONNÉES DÉJÀ CHARGÉES
        const domain = domains.find(d => d.id === domainId);
        const domainSubdomains = domain?.subdomains?.filter(subdomain => 
          subdomain.program_count && subdomain.program_count > 0
        ) || [];
        
        // Vérifier si TOUS les sous-domaines disponibles sont maintenant sélectionnés
        const allSelected = domainSubdomains.every(subdomain => 
          subdomain.id === subdomainId || newSelectedSubdomains.has(subdomain.id)
        );
        
        if (allSelected) {
          newSelectedDomains.add(domainId);
        }
      }
      
      setSelectedSubdomainFilters(newSelectedSubdomains);
      setSelectedDomainFilters(newSelectedDomains);
    };

    return (
      <div className="relative" ref={domainDropdownRef}>
        <button
          type="button"
          onClick={() => setShowDomainDropdown(!showDomainDropdown)}
          className="w-full px-4 py-3 rounded-lg text-left border border-gray-300 bg-white hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 flex items-center justify-between"
        >
          <span className={selectedSubdomainFilters.size > 0 ? 'text-gray-900 font-medium' : 'text-gray-500'}>
            {selectedSubdomainFilters.size > 0 
              ? t('subdomainSelection.selected', { count: selectedSubdomainFilters.size })
              : t('subdomainSelection.selectPrompt')
            }
          </span>
          <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${showDomainDropdown ? 'rotate-180' : ''}`} />
        </button>

        {showDomainDropdown && (
          <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-96 overflow-hidden">
            {/* Barre de recherche */}
            <div className="p-3 border-b border-gray-200 bg-gray-50">
              <input
                type="text"
                placeholder="Rechercher un domaine..."
                value={domainSearch}
                onChange={(e) => setDomainSearch(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>

            {/* Debug info */}
            {filteredDomains.length === 0 && (
              <div className="p-4 text-center text-gray-500">
                <p className="text-sm">{t('domainSelection.noDomainFound')}</p>
                <p className="text-xs">{t('domainSelection.totalDomains', { count: domains.length })}</p>
                <p className="text-xs">{t('domainSelection.searchQuery', { query: domainSearch })}</p>
              </div>
            )}

            {/* Liste organisée parent/child */}
            <div className="max-h-80 overflow-y-auto">
              {filteredDomains.map((domain) => {
                // CORRECTION: Vérifier que domain.subdomains existe
                const domainSubdomains = domain.subdomains?.filter(subdomain => {
                  if (!subdomain || !subdomain.name) return false;
                  
                  const matchesSearch = subdomain.name.toLowerCase().includes(domainSearch.toLowerCase());
                  // Vérifier si ce sous-domaine a des programmes
                  const hasPrograms = subdomain.program_count && subdomain.program_count > 0;
                  return matchesSearch && hasPrograms;
                }) || [];
                
                const isDomainSelected = selectedDomainFilters.has(domain.id);

                console.log(`🐛 Domain ${domain.name}:`, {
                  totalSubdomains: domain.subdomains?.length || 0,
                  activeSubdomains: domainSubdomains.length
                });

                // Ne pas afficher le domaine s'il n'y a aucun sous-domaine disponible
                if (domainSubdomains.length === 0) {
                  return null;
                }

                return (
                  <div key={domain.id} className="border-b border-gray-100 last:border-b-0">
                    {/* Parent (Domaine) */}
                    <div className="parent">
                      <div className="px-4 py-3 hover:bg-gray-50 cursor-pointer" onClick={() => toggleDomain(domain.id)}>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            checked={isDomainSelected}
                            onChange={() => {}}
                            className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mr-3"
                          />
                          <span className="text-lg mr-3">{DomainApi.getIconForDomain(domain.name)}</span>
                          <span className="font-semibold text-gray-900">{domain.name}</span>
                          <span className="ml-auto text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                            {domainSubdomains.length}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Children (Sous-domaines) */}
                    <div>
                      <ul className="child bg-gray-50">
                        {domainSubdomains.map((subdomain) => (
                          <li key={subdomain.id}>
                            <div 
                              className="px-8 py-2 hover:bg-gray-100 cursor-pointer"
                              onClick={() => toggleSubdomain(subdomain.id, domain.id)}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                  <input
                                    type="checkbox"
                                    checked={selectedSubdomainFilters.has(subdomain.id)}
                                    onChange={() => {}}
                                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mr-3"
                                  />
                                  <span className="text-gray-700 text-sm">{subdomain.name}</span>
                                </div>
                                <span className="text-xs text-gray-500">
                                  {subdomain.program_count || 0}
                                </span>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer avec actions */}
            {selectedSubdomainFilters.size > 0 && (
              <div className="p-3 border-t border-gray-200 bg-gray-50">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">
                     {t('subdomainSelection.selected', { count: selectedSubdomainFilters.size })}
                  </span>
                  <button
                    onClick={() => {
                      setSelectedDomainFilters(new Set());
                      setSelectedSubdomainFilters(new Set());
                    }}
                    className="text-sm text-red-600 hover:text-red-700 font-medium"
                  >
                    {t('subdomainSelection.clearAll')}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  // Ajouter ces fonctions au début du composant HomePage, après les imports

  // Helper pour convertir un nom en slug URL-friendly
  const toSlug = (text) => {
    if (!text) return '';
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Retire les accents
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  // Helper pour retrouver un domaine par son slug
  const getDomainBySlug = (slug) => {
    return domains.find(d => toSlug(d.name) === slug);
  };

  // Helper pour retrouver des sous-domaines par leurs slugs
  const getSubdomainsByIds = (ids) => {
    return subdomains.filter(s => ids.includes(s.id));
  };

  // Composant Card de Programme
  // Composant ProgramCard amélioré avec layout homogène
  const ProgramCard = ({ program }) => {
    const school = program.school;
    const isFavorite = favorites.has(program.id);
    const programUrl = `/schools/${program.school.slug}/programs/${program.slug}`;
    const subdomainNames = getSubdomainNamesSync([
      program.sub_domain1, 
      program.sub_domain2, 
      program.sub_domain3
    ].filter(Boolean), subdomains);

    return (
      <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group flex flex-col h-full">
        {/* Header avec logo école et favori - HAUTEUR FIXE */}
        <div className="p-4 pb-2 flex-shrink-0">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              {school?.logo_path && (
                <div className="w-12 h-8 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <img 
                    src={school.logo_path} 
                    alt={school.name}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              )}
              <div className="min-w-0 flex-1">
                <h4 className="font-medium text-gray-900 text-sm truncate">
                  {school?.name}
                </h4>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <MapPin className="w-3 h-3" />
                  <span>{school?.base_city}</span>
                </div>
              </div>
            </div>
            <FavoriteButton programId={program.id} />
          </div>
        </div>

        {/* Contenu principal - ZONE FLEXIBLE */}
        <div className="px-4 flex-1 flex flex-col">
          {/* Titre du programme - HAUTEUR FIXE (2 lignes max) */}
          <div className="h-14 mb-3 flex items-start">
            <h3 className="font-bold text-gray-900 text-lg leading-tight line-clamp-2">
              {program.title}
            </h3>
          </div>

          {/* Badges - HAUTEUR FLEXIBLE MAIS LIMITÉE */}
          <div className="min-h-[2rem] mb-3">
            <div className="flex flex-wrap gap-2">
              {program.grade && (!program.is_referenced_in_eef)&& (
                <span className="bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                  {program.grade}
                </span>
              )}
              {program.state_certification_type && (
                <span className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                  {program.state_certification_type}
                </span>
              )}
              {!program.state_certification_type && program.state_certification_type_complement && (
                <span className="bg-gradient-to-r from-yellow-100 to-amber-100 text-yellow-700 px-2 py-1 rounded-full text-xs font-medium">
                  {program.state_certification_type_complement}
                </span>
              )}
              {program.alternance_possible && (
                <span className="bg-gradient-to-r from-purple-100 to-violet-100 text-purple-700 px-2 py-1 rounded-full text-xs font-medium">
                   {t('program.alternance')}
                </span>
              )}
            </div>
          </div>
          {/* Description - HAUTEUR FIXE (3 lignes max) */}
          <div className="h-16 mb-3">
            <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
              {program.description?.length > 120 
                ? program.description.substring(0, 120) + '...' 
                : program.description}
            </p>
          </div>

          {/* Sous-domaines - HAUTEUR FIXE */}
          <div className="h-8 mb-3">
            {subdomainNames.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {subdomainNames.slice(0, 3).map((domain, index) => (
                  <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs truncate">
                    {domain}
                  </span>
                ))}
                {subdomainNames.length > 3 && (
                  <span className="text-gray-500 text-xs py-1">
                    +{subdomainNames.length - 3}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Informations pratiques - HAUTEUR FIXE */}
        <div className="px-4 py-3 bg-gradient-to-r from-gray-50 to-blue-50 border-t border-gray-100 flex-shrink-0">
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-600 flex-shrink-0" />
              <span className="text-gray-700 truncate">{formatDuration(program.fi_school_duration)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-orange-600 flex-shrink-0" />
              <span className="text-gray-700 truncate">{t('program.intake')}: {program.intake}</span>
            </div>
            <div className="flex items-center gap-2">
                {program.is_referenced_in_eef && !program.tuition ? (
                  // Programme référencé EEF - Afficher Award avec couleur selon exonération
                  <Award 
                    className={`w-4 h-4 inline-block mr-1 ${
                      program.exoneration_tuition === 1 
                        ? 'text-green-500' // Exonération totale - vert
                        : program.exoneration_tuition === -1 
                          ? 'text-orange-500' // Exonération partielle - orange
                          : 'text-red-500' // Aucune exonération - rouge
                    }`}
                  />
                ) : (
                  // Programme non-EEF - Afficher Euro
                  <Euro className="w-4 h-4 text-green-600 flex-shrink-0 mr-1" />
                )}

                {/* Texte affiché */}
                <span className="text-gray-700 font-medium truncate">
                  {program.is_referenced_in_eef && !program.tuition
                    ? (
                        program.exoneration_tuition === 1
                          ? t('program.exonerationFull')
                          : program.exoneration_tuition === -1
                            ? t('program.exonerationPartial')
                            : t('program.exonerationNone')
                      )
                    : formatPrice(program.tuition)
                  }
                </span>
            </div>
            <div className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-red-600 flex-shrink-0" />
              <span className="text-gray-700 truncate">
                {t('program.deadline')}: {program.is_referenced_in_eef ? t('program.campusFranceCalendar') : program.application_date}
              </span>
            </div>
            {program.first_deposit && (
              <div className="flex items-center gap-2 col-span-2">
                <Euro className="w-4 h-4 text-purple-600 flex-shrink-0" />
                <span className="text-gray-700 truncate">{t('program.deposit')}: {formatPrice(program.first_deposit)}</span>
              </div>
            )}
          </div>
        </div>

        {/* Footer avec bouton full-width - HAUTEUR FIXE */}
        <div className="p-4 bg-white border-t border-gray-100 flex-shrink-0">
          <Link href={programUrl} target="_blank" rel="noopener noreferrer" className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg text-sm font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 flex items-center justify-center gap-2">
            {t('program.viewProgram')}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </Link>
        </div>
      </div>
    );
  };


  return (
    <>
    <NavBar />
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header Hero avec Navigation intégrée */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 relative">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative">
          {/* Navigation Tabs dans le Header */}
          <div className="px-4 sm:px-6 lg:px-8 pt-6">
            <div className="max-w-7xl mx-auto">
              {/* ✅ CORRECTION : Scroll horizontal + espacement adapté */}
              <div className="flex border-b border-white/20 overflow-x-auto scrollbar-hide">
                <div className="flex min-w-max">
                  <button
                    onClick={() => {
                      setActiveTab('search');
                      setShowResults(false);
                      setSelectedDomain(null);
                      setSelectedSubdomains([]);
                      router.push('/?tab=search', undefined, { shallow: true }); // ✅ AJOUT
                    }}
                    className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-6 py-3 sm:py-4 font-semibold transition-all duration-300 whitespace-nowrap text-xs sm:text-base ${
                      activeTab === 'search'
                        ? 'text-white border-b-2 border-white bg-white/10'
                        : 'text-blue-100 hover:text-white'
                    }`}
                  >
                    <Search className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>{t('tabs.search')}</span>
                  </button>
                  
                  <button
                    onClick={() => {
                      setActiveTab('accompany');
                      router.push('/?tab=accompany', undefined, { shallow: true }); // ✅ AJOUT
                    }}
                    className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-6 py-3 sm:py-4 font-semibold transition-all duration-300 whitespace-nowrap text-xs sm:text-base ${
                      activeTab === 'accompany'
                        ? 'text-white border-b-2 border-white bg-white/10'
                        : 'text-blue-100 hover:text-white'
                    }`}
                  >
                    <Users className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="xs:inline">{t('tabs.accompany')}</span>
                  </button>
                  
                  <button
                    onClick={() => {
                      setActiveTab('organizations');
                      router.push('/?tab=organizations', undefined, { shallow: true }); // ✅ AJOUT
                    }}
                    className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-6 py-3 sm:py-4 font-semibold transition-all duration-300 whitespace-nowrap text-xs sm:text-base ${
                      activeTab === 'organizations'
                        ? 'text-white border-b-2 border-white bg-white/10'
                        : 'text-blue-100 hover:text-white'
                    }`}
                  >
                    <Building2 className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>{t('tabs.organizations')}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Contenu du Header selon l'onglet */}
          <div className="px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
            <div className="max-w-7xl mx-auto text-center">
              {activeTab === 'search' && (
                <>
                  <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                    {t('hero.title')}
                  </h1>
                  <div className="text-lg sm:text-xl text-blue-100 mb-8 max-w-4xl mx-auto">
                    {t('hero.description_part1')}{' '}
                    <span className="font-bold text-yellow-300">
                      {t('hero.programs_count')} {t('hero.programs_label')}
                    </span>{' '}
                    {t('hero.description_part2')}{' '}
                    <span className="font-bold text-yellow-300">
                      {t('hero.schools_count')} {t('hero.schools_label')}
                    </span>.
                    <br/><br />
                    {t('hero.description_cta')}
                  </div>
                  {/* Barre de recherche intégrée dans le header */}
                  <div ref={dropdownRef} className="max-w-4xl mx-auto mb-4 sm:mb-6 lg:mb-8 relative z-[100]">
                    <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 sm:p-4 lg:p-6 border border-white/20">
                      <div className="relative mb-2 sm:mb-3 lg:mb-4" id="search-container">
                        <div className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:gap-2">
                          <div className="relative flex-1 z-[110]">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 z-[111]" />
                            <input
                              type="text"
                              placeholder={t('hero.searchPlaceholder')}
                              value={searchQuery}
                              onFocus={() => setShowSuggestions(true)}
                              onBlur={() => {
                                setTimeout(() => setShowSuggestions(false), 150);
                              }}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  handleSimpleSearch();
                                }
                              }}
                              className="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base bg-white relative z-[111]" 
                            />
                            {searchQuery && (
                              <button
                                onClick={() => {
                                  setSearchQuery('');
                                  setShowSuggestions(false);
                                  setSearchResults([]);
                                  setTotalResults(0);
                                  setShowResults(false);
                                  setCurrentPage(1);
                                }}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors z-[112]"
                                title={t('hero.clearSearch')}
                              >
                                <X className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                          <button
                            onClick={() => {
                              if (searchQuery && searchQuery.trim()) {
                                handleSimpleSearch();
                              }
                            }}
                            disabled={isSearching || !searchQuery || !searchQuery.trim()}
                            className="px-4 sm:px-6 lg:px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors border border-gray-200 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base z-[111] w-full sm:w-auto" 
                          >
                            {isSearching ? t('hero.searching') : t('hero.search')}
                          </button>
                        </div>
                        
                        {/* Suggestions avec largeur adaptée */}
                        {showSuggestions && suggestions.length > 0 && (
                          <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg mt-1 max-h-48 overflow-y-auto z-[120]">
                            <div className="p-2"></div>
                            {suggestions.map((suggestion, index) => (
                              <button
                                key={index}
                                onMouseDown={(e) => {  // ✅ CHANGEMENT ICI : onClick → onMouseDown
                                  e.preventDefault();   // ✅ IMPORTANT : Empêche le onBlur de l'input
                                  setSearchQuery(suggestion);
                                  setShowSuggestions(false);
                                  setShowResults(true);  // ✅ AJOUT : Force l'affichage des résultats
                                  resetAdvancedFilters();
                                  handleSearch(suggestion, true); // ✅ AJOUT : forceSearch = true
                                }}
                                className="w-full text-left px-3 py-2 hover:bg-blue-50 flex items-center gap-2 transition-colors"
                              >
                                <Search className="w-3 h-3 text-blue-500 flex-shrink-0" />
                                <span className="text-gray-800 truncate text-sm">{suggestion}</span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Boutons et infos en bas - mobile friendly */}
                      <div className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between gap-2">
                        <button
                          data-filter-toggle
                          onClick={() => {
                            setShowFilters(!showFilters);
                            
                            // ✅ AJOUTER : Réinitialiser la sélection de domaine quand on ouvre les filtres
                            if (!showFilters) {
                              setSelectedDomain(null);
                              setSelectedSubdomains([]);
                            }
                            
                            if (!showFilters && !showResults && searchQuery.trim()) {
                              setShowResults(true);
                              handleSearch();
                            }
                          }}
                          className="flex items-center justify-center gap-2 px-3 py-2 bg-white/20 border border-white/30 rounded-lg hover:bg-white/30 transition-colors text-white text-sm order-1 sm:order-none"
                        >
                          <Filter className="w-4 h-4" />
                          <span>{t('hero.advancedFilters')}</span>
                          <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                        </button>
                        
                        <div className="flex flex-col text-center sm:text-left space-y-1 sm:space-y-0 text-xs sm:text-sm text-blue-100 order-2 sm:order-none">
                          <span>
                             {t('hero.resultsCount', { count: totalResults })}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) } 
              {activeTab === 'accompany' && (
                <>
                  <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                    {t('accompany_tab.title')}
                  </h1>
                  <p className="text-lg sm:text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
                    {t('accompany_tab.description')}
                  </p>
                </>
              )}
              {activeTab === 'organizations' && (
                <>
                  <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                    {t('organizations_tab.title')}
                  </h1>
                  <p className="text-lg sm:text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
                    {t('organizations_tab.description')}
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        {activeTab === 'search' && 
          <>
            {/* Sélection par domaines (affichage initial) */}
            <FadeTransition show={!showResults && !selectedDomain && !showFilters}>
              <div className="mb-12" data-domains-section>
                <div className="text-center mb-8">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                    {t('domainSelection.title')}
                  </h2>
                  <p className="text-gray-600 text-lg">
                    {t('domainSelection.description')}
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
                    {isLoadingDomains ? (
                      // ✅ SKELETON LOADER pendant le chargement
                      [...Array(10)].map((_, index) => (
                        <div 
                          key={index}
                          className="bg-white rounded-xl p-3 sm:p-4 lg:p-6 shadow-md border border-gray-100 animate-pulse"
                        >
                          {/* Icône skeleton */}
                          <div className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-gray-200 rounded-full mx-auto mb-2 sm:mb-3"></div>
                          {/* Titre skeleton */}
                          <div className="h-4 bg-gray-200 rounded mb-2"></div>
                          {/* Compteur skeleton */}
                          <div className="h-3 bg-gray-200 rounded w-20 mx-auto"></div>
                        </div>
                      ))
                    ) : domains.length === 0 ? (
                      // ✅ MESSAGE SI AUCUN DOMAINE
                      <div className="col-span-full text-center py-12">
                        <p className="text-gray-500 text-lg">{t('domainSelection.noDomains')}</p>
                      </div>
                    ) : (domains.map((domain) => (
                      <button
                        key={domain.id}
                        onClick={() => {
                          setSelectedDomain(domain.id);
                          setSelectedSubdomains([]);
                          const domainSubdomains = getSubdomainsByDomainSync(domain.id, domains);
                          setSelectedDomainFilters(new Set([domain.id]));
                          setSelectedSubdomainFilters(new Set(domainSubdomains.map(sd => sd.id)));
                          
                          // ✅ AJOUT : Mettre à jour l'URL
                          const domainSlug = toSlug(domain.name);
                          router.push(
                            `/?tab=search&domain=${domainSlug}`, 
                            undefined, 
                            { shallow: true }
                          );
                          
                          if (window.innerWidth <= 768) {
                            setTimeout(() => {
                              const subdomainSection = document.querySelector('[data-subdomain-selection]');
                              if (subdomainSection) {
                                subdomainSection.scrollIntoView({ 
                                  behavior: 'smooth', 
                                  block: 'start' 
                                });
                              }
                            }, 100);
                          }
                        }}
                        className="bg-white rounded-xl p-3 sm:p-4 lg:p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 group text-center"
                      >
                      <div className="text-2xl sm:text-3xl lg:text-4xl mb-2 sm:mb-3 group-hover:scale-110 transition-transform">
                        {DomainApi.getIconForDomain(domain.name)}
                      </div>
                      <h3 className="font-semibold text-gray-900 text-xs sm:text-sm leading-tight">
                        {domain.name}
                      </h3>
                      <div className="text-xs text-gray-500 mt-1 sm:mt-2">
                        {domain.total_programs || 0} formation{(domain.total_programs || 0) > 1 ? 's' : ''}
                      </div>
                    </button>
                  )))}
                </div>
              </div>
            </FadeTransition>

            {/* Sélection des sous-domaines */}
            
            <FadeTransition show={selectedDomain && !showResults && !showFilters}>
              <div className="mb-8" data-subdomain-selection>
                <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                    <div className="mb-4">
                      {/* Barre en haut : retour + titre (à gauche) ET bouton (à droite) en desktop */}
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between sm:mb-4">
                        
                        {/* Bouton retour + titre */}
                        <div className="flex items-center gap-2 mb-3 sm:mb-0">
                          <button
                            onClick={() => {
                              setSelectedDomain(null);
                              setSelectedSubdomains([]);
                              setSelectedDomainFilters(new Set());
                              setSelectedSubdomainFilters(new Set());
                              router.push('/?tab=search', undefined, { shallow: true }); // ✅ AJOUT
                            }}
                            className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
                            title="Retour"
                          >
                            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                          </button>

                          <h2 className="text-sm sm:text-xl font-bold text-gray-900 truncate">
                            <span className="text-gray-500 text-xs sm:text-base font-normal">{t('hero.specializations_in')} </span>
                            <br className="sm:hidden" />
                            <span className="text-blue-600">{getDomainNameSync(selectedDomain, domains)} {selectedDomain ? DomainApi.getIconForDomain(getDomainNameSync(selectedDomain, domains)) : ''}</span>
                          </h2>
                        </div>

                        {/* Bouton "Voir les formations" visible uniquement en desktop */}
                        <div className="block sm:flex sm:justify-end">
                          <button
                            onClick={() => {
                              if (selectedSubdomains.length > 0) {
                                setShowResults(true);
                                setSelectedSubdomainFilters(new Set(selectedSubdomains));
                                
                                // ✅ MODIFIER : Mettre à jour l'URL avec view=results
                                const domainSlug = toSlug(getDomainNameSync(selectedDomain, domains));
                                const selectedSubdomainsData = getSubdomainsByIds(selectedSubdomains);
                                const subdomainSlugs = selectedSubdomainsData.map(sd => toSlug(sd.name)).join(',');
                                
                                router.push(
                                  `/?tab=search&domain=${domainSlug}&subdomains=${subdomainSlugs}&view=results`,
                                  undefined,
                                  { shallow: true }
                                );
                                
                                handleSearch(null, true);
                              }
                            }}
                            disabled={selectedSubdomains.length === 0}
                            className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                              selectedSubdomains.length > 0
                                ? 'bg-blue-600 text-white hover:bg-blue-700'
                                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            }`}
                          >
                            {t('hero.viewPrograms')} ({programCountForSelected || 0})
                          </button>
                        </div>
                      </div>
                    </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-3">
                    {/* Filtrer pour ne montrer que les sous-domaines avec des programmes */}
                    {getSubdomainsByDomainSync(selectedDomain, domains).map((subdomain) => (
                    <button
                      key={subdomain.id}
                      onClick={() => {
                        const newSelected = selectedSubdomains.includes(subdomain.id)
                          ? selectedSubdomains.filter(id => id !== subdomain.id)
                          : [...selectedSubdomains, subdomain.id];
                        setSelectedSubdomains(newSelected);
                        
                        setSelectedSubdomainFilters(new Set(newSelected));
                        if (newSelected.length === 0) {
                          setSelectedDomainFilters(new Set());
                        } else {
                          setSelectedDomainFilters(new Set([selectedDomain]));
                        }
                      }}
                      className={`p-2 sm:p-3 rounded-lg border-2 transition-all duration-200 text-xs sm:text-sm font-medium ${
                        selectedSubdomains.includes(subdomain.id)
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 bg-white text-gray-700 hover:border-blue-300 hover:bg-blue-50'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-1 sm:gap-2">
                        <div className="flex items-center gap-1 sm:gap-2 min-w-0">
                          {selectedSubdomains.includes(subdomain.id) && (
                            <Check className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600 flex-shrink-0" />
                          )}
                          <span className="truncate">{subdomain.name}</span>
                        </div>
                        <span className="text-xs text-gray-500 bg-gray-100 px-1 sm:px-2 py-0.5 sm:py-1 rounded-full flex-shrink-0">
                          {subdomain.program_count || 0}
                        </span>
                      </div>
                    </button>
                    ))}
                  </div>
                  
                  {/* Message si aucun sous-domaine disponible */}
                  {getSubdomainsByDomainSync(selectedDomain, domains).length === 0 && (
                    <div className="text-center py-8">
                      <p className="text-gray-500">{t('domainSelection.noResults')}</p>
                      <button
                        onClick={() => setSelectedDomain(null)}
                        className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
                      >
                        {t('domainSelection.backToDomains')}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </FadeTransition>

            {/* Panneau de filtres avancés */}
            {/* Panneau de filtres avancés - VERSION AMÉLIORÉE */}
            <FadeTransition show={showFilters}>
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 mb-4 sm:mb-8" ref={filtersDropdownRef}>
                {/* Header avec compteur */}
                <div className="p-4 sm:p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200 rounded-t-xl">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 flex items-center gap-2">
                      <Filter className="w-5 h-5 text-blue-600" />
                      {t('filters.title')}
                    </h3>
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      {t('filters.active_filters', { count: getActiveFiltersCount() })}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    {t('filters.subtitle')}
                  </p>
                </div>

                <div className="p-4 sm:p-6 space-y-4">
                  
                  {/* ========== SECTION 1 : DOMAINES ========== */}
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-200">
                    <button
                      onClick={() => setShowFilterSection({...showFilterSection, domains: !showFilterSection.domains})}
                      className="w-full flex items-center justify-between mb-3"
                    >
                      <div className="flex items-center gap-2">
                        <GraduationCap className="w-5 h-5 text-purple-600" />
                        <h4 className="font-semibold text-gray-900">{t('filters.general.domainsAndSpecializations')}</h4>
                        {selectedSubdomainFilters.size > 0 && (
                          <span className="bg-purple-600 text-white px-2 py-0.5 rounded-full text-xs">
                            {selectedSubdomainFilters.size}
                          </span>
                        )}
                      </div>
                      <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${showFilterSection.domains ? 'rotate-180' : ''}`} />
                    </button>

                    {showFilterSection.domains && (
                      <div className="space-y-3">
                        <DomainCheckboxDropdown />
                        
                        {/* Tags sélectionnés */}
                        {selectedSubdomainFilters.size > 0 && (
                          <div className="flex flex-wrap gap-2 pt-2">
                            {[...selectedSubdomainFilters].slice(0, 5).map(subdomainId => {
                              const subdomain = subdomains.find(s => s.id === subdomainId);
                              const subdomainName = subdomain ? subdomain.name : subdomainId;
                              
                              return (
                                <span 
                                  key={subdomainId} 
                                  className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs flex items-center gap-1.5"
                                >
                                  <span className="truncate max-w-[150px]">{subdomainName}</span>
                                  <button
                                    onClick={() => {
                                      const newSelected = new Set(selectedSubdomainFilters);
                                      newSelected.delete(subdomainId);
                                      setSelectedSubdomainFilters(newSelected);
                                    }}
                                    className="hover:bg-purple-200 rounded-full w-4 h-4 flex items-center justify-center"
                                  >
                                    ×
                                  </button>
                                </span>
                              );
                            })}
                            {selectedSubdomainFilters.size > 5 && (
                              <span className="text-xs text-gray-500 py-1 px-2 bg-gray-100 rounded-full">
                                +{selectedSubdomainFilters.size - 5}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* ========== SECTION 2 : CRITÈRES GÉNÉRAUX ========== */}
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-200">
                    <button
                      onClick={() => setShowFilterSection({...showFilterSection, general: !showFilterSection.general})}
                      className="w-full flex items-center justify-between mb-3"
                    >
                      <div className="flex items-center gap-2">
                        <Award className="w-5 h-5 text-blue-600" />
                        <h4 className="font-semibold text-gray-900">{t('filters.general.generalCriteria')}</h4>
                      </div>
                      <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${showFilterSection.general ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {showFilterSection.general && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        
                        {/* Niveau d'entrée */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                            <Users className="w-4 h-4 text-blue-500" />
                            {t('filters.general.entryLevel')}
                          </label>
                          <select
                            value={filters.entryLevel}
                            onChange={(e) => setFilters({...filters, entryLevel: e.target.value, language: ''})}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 bg-white"
                          >
                            <option value="">{t('filters.general.entryLevel.all')}</option>
                            {filterOptions.entry_levels.map(level => (
                              <option key={level} value={level}>{level}</option>
                            ))}
                          </select>
                        </div>

                        {/* Type de diplôme - AMÉLIORÉ avec groupes */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                            <Award className="w-4 h-4 text-blue-500" />
                            {t('filters.general.degreeType')}
                          </label>
                          <select
                            value={filters.grade}
                            onChange={(e) => setFilters({...filters, grade: e.target.value})}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 bg-white"
                          >
                            <option value="">{t('filters.general.degreeType.all')}</option>
                            {locale === 'fr' ? <>
                            <optgroup label="🎓 Licences & Bachelors">
                              <option value="Licence">Licence</option>
                              <option value="Licence 2">Licence 2</option>
                              <option value="Licence professionnelle">Licence professionnelle</option>
                              <option value="Bachelor">Bachelor</option>
                              <option value="Bachelor visé">Bachelor visé</option>
                              <option value="Bachelor universitaire de technologie (BUT)">BUT</option>
                              <option value="DUT">DUT</option>
                            </optgroup>
                            
                            <optgroup label="🎯 Masters">
                              <option value="Master">Master</option>
                              <option value="Master 2">Master 2</option>
                              <option value="Master professionnel">Master professionnel</option>
                              <option value="Master recherche">Master recherche</option>
                              <option value="Master of science">Master of Science</option>
                              <option value="Master of arts">Master of Arts</option>
                            </optgroup>
                            
                            <optgroup label="⭐ Mastères & MBA">
                              <option value="Mastère">Mastère</option>
                              <option value="Mastère Spécialisé">Mastère Spécialisé</option>
                              <option value="Mastère en sciences (MSc)">MSc</option>
                              <option value="MBA">MBA</option>
                            </optgroup>
                            
                            <optgroup label="🏆 Diplômes spécialisés">
                              <option value="Diplôme d'ingénieur">Diplôme d'ingénieur</option>
                              <option value="Diplôme d'école de commerce visé de niveau bac + 4 ou 5">École de commerce visé</option>
                              <option value="PGE (Programme Grande École)">Programme Grande École</option>
                              <option value="Diplôme d'Etat en santé">Diplôme d'État en santé</option>
                              <option value="DCG">DCG</option>
                            </optgroup>
                            
                            <optgroup label="📚 Autres">
                              <option value="Diplôme visé">Diplôme visé</option>
                              <option value="Titre d'établissement">Titre d'établissement</option>
                              <option value="PhD Doctorat">PhD / Doctorat</option>
                            </optgroup></> : <>
                                              <optgroup label="🎓 Bachelor's Degrees">
                                                <option value="Bachelor">Bachelor</option>
                                                <option value="Accredited Bachelor">Accredited Bachelor</option>
                                                <option value="Public bachelor">Public Bachelor</option>
                                                <option value="Professional public bachelor">Professional Public Bachelor</option>
                                                <option value="University Bachelor's degree in technology (BUT)">Bachelor's in Technology (BUT)</option>
                                              </optgroup>

                                              <optgroup label="🎯 Master's Degrees">
                                                <option value="Master">Master</option>
                                                <option value="Master 2">Master 2</option>
                                                <option value="Undifferentiated Master's (Research and Professional)">Master's (Research & Professional)</option>
                                                <option value="Professional Master's">Professional Master's</option>
                                                <option value="Research Master's">Research Master's</option>
                                                <option value="Master of Science">Master of Science</option>
                                                <option value="Master of science">Master of Science (MSc)</option>
                                                <option value="Master of Arts">Master of Arts</option>
                                                <option value="Master's degree">Master's Degree</option>
                                              </optgroup>

                                              <optgroup label="⭐ Postgraduate Programs & MBA">
                                                <option value="Postgraduate Program">Postgraduate Program</option>
                                                <option value="Postgraduate Program 2">Postgraduate Program 2</option>
                                                <option value="Postgraduate MSc Program">Postgraduate MSc Program</option>
                                                <option value="Postgraduate Professional Program">Postgraduate Professional Program</option>
                                                <option value="Specialized Postgraduate Program">Specialized Postgraduate Program</option>
                                                <option value="MBA">MBA</option>
                                              </optgroup>

                                              <optgroup label="🏆 Specialized Degrees">
                                                <option value="Engineering Degree">Engineering Degree</option>
                                                <option value="Specialized engineering degree">Specialized Engineering Degree</option>
                                                <option value="Accredited Business School Degree">Accredited Business School Degree</option>
                                                <option value="PGE (Grande École Program)">Grande École Program (PGE)</option>
                                                <option value="Specialized School Training">Specialized School Training</option>
                                              </optgroup>

                                              <optgroup label="📚 Other Degrees">
                                                <option value="Accredited degree">Accredited Degree</option>
                                                <option value="National degree">National Degree</option>
                                                <option value="State-recognized degree">State-Recognized Degree</option>
                                                <option value="Institutional degree">Institutional Degree</option>
                                                <option value="Title from the Ministry of Labor, Full Employment and Integration.">Ministry of Labor Title</option>
                                                <option value="PhD">PhD / Doctorate</option>
                                              </optgroup>
                            </>}
                          </select>
                        </div>

                        {/* Durée */}
                        {/* Durée - VERSION SIMPLIFIÉE */}
                        <div className="sm:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center gap-1">
                            <Clock className="w-4 h-4 text-blue-500" />
                            {t('filters.general.duration')}
                          </label>
                          
                          <div className="flex flex-wrap gap-2">
                            {/* Bouton "Toutes durées" */}
                            <button
                              onClick={() => setFilters({...filters, selectedYear: null})}
                              className={`px-3 py-2 rounded-lg border-2 text-sm font-medium transition-all ${
                                filters.selectedYear === null
                                  ? 'border-gray-600 bg-gray-600 text-white'
                                  : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                              }`}
                            >
                              {t('filters.general.duration.all')}
                            </button>
                            
                            {/* Boutons pour chaque année (1 à 9) */}
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(year => {
                              const isSelected = filters.selectedYear === year;
                              
                              return (
                                <button
                                  key={year}
                                  onClick={() => {
                                    // Toggle : si déjà sélectionné, désélectionner
                                    if (isSelected) {
                                      setFilters({...filters, selectedYear: null});
                                    } else {
                                      setFilters({...filters, selectedYear: year});
                                    }
                                  }}
                                  className={`px-3 py-2 rounded-lg border-2 text-sm font-medium transition-all ${
                                    isSelected
                                      ? 'border-blue-600 bg-blue-600 text-white shadow-md'
                                      : 'border-gray-200 bg-white text-gray-700 hover:border-blue-300 hover:bg-blue-50'
                                  }`}
                                >
                                  <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4" />
                                     {t('filters.general.year', { count: year })}
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* Alternance */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                            <Briefcase className="w-4 h-4 text-blue-500" />
                            {t('filters.general.alternance')}
                          </label>
                          <select
                            value={filters.alternance}
                            onChange={(e) => setFilters({...filters, alternance: e.target.value})}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 bg-white"
                          >
                            <option value="">{t('filters.general.filter_any')}</option>
                            <option value="true">{t('filters.general.filter_available')}</option>
                            <option value="false">{t('filters.general.filter_not_available')}</option>
                          </select>
                        </div>

                        {/* Ville - CORRIGÉ */}
                        <div className="sm:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                            <MapPin className="w-4 h-4 text-blue-500" />
                            {t('filters.general.city')}
                          </label>
                          <div className="relative" ref={cityDropdownRef}>
                            <button
                              onClick={() => setShowCityDropdown(!showCityDropdown)}
                              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-left focus:ring-2 focus:ring-blue-500 flex items-center justify-between bg-white text-sm"
                            >
                              <span className={filters.city ? 'text-gray-900' : 'text-gray-500'}>
                                {filters.city || t('filters.general.city.all')}
                              </span>
                              <ChevronDown className={`w-4 h-4 transition-transform ${showCityDropdown ? 'rotate-180' : ''}`} />
                            </button>
                            
                            {showCityDropdown && (
                              <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-hidden">
                                <div className="p-2 border-b sticky top-0 bg-white">
                                  <input
                                    type="text"
                                    value={citySearch}
                                    onChange={(e) => setCitySearch(e.target.value)}
                                    placeholder={t('filters.general.city.search')}
                                    className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                    onClick={(e) => e.stopPropagation()}
                                  />
                                </div>
                                <div className="max-h-48 overflow-y-auto">
                                  <button
                                    onClick={() => {
                                      setFilters({...filters, city: ''});
                                      setShowCityDropdown(false);
                                      setCitySearch('');
                                    }}
                                    className="w-full text-left px-3 py-2 hover:bg-blue-50 text-sm text-gray-700"
                                  >
                                    {t('filters.general.city.all')}
                                  </button>
                                  {getFilteredCities.length > 0 ? (
                                    getFilteredCities.map((city, index) => (
                                      <button
                                        key={index}
                                        onClick={() => {
                                          setFilters({...filters, city: city});
                                          setShowCityDropdown(false);
                                          setCitySearch('');
                                        }}
                                        className="w-full text-left px-3 py-2 hover:bg-blue-50 text-sm text-gray-700"
                                      >
                                        {city}
                                      </button>
                                    ))
                                  ) : (
                                    <div className="px-3 py-2 text-gray-500 text-sm">{t('filters.general.city.no_results')}</div>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* ========== SECTION 3 : COÛTS ========== */}
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
                    <button
                      onClick={() => setShowFilterSection({...showFilterSection, cost: !showFilterSection.cost})}
                      className="w-full flex items-center justify-between mb-3"
                    >
                      <div className="flex items-center gap-2">
                        <Euro className="w-5 h-5 text-green-600" />
                        <h4 className="font-semibold text-gray-900">{t('filters.cost.title')}</h4>
                      </div>
                      <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${showFilterSection.cost ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {showFilterSection.cost && (
                      <div className="space-y-4">
                        {/* Frais de scolarité */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-3">
                            {t('filters.cost.tuition_label')}
                          </label>
                          <div className="flex gap-3 items-center mb-2">
                            <input
                              type="number"
                              placeholder={t('filters.cost.min_placeholder')}
                              value={filters.tuition.min}
                              onChange={(e) => setFilters({
                                ...filters, 
                                tuition: {...filters.tuition, min: e.target.value}
                              })}
                              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500"
                            />
                            <span className="text-gray-500">→</span>
                            <input
                              type="number"
                              placeholder={t('filters.cost.max_placeholder')}
                              value={filters.tuition.max}
                              onChange={(e) => setFilters({
                                ...filters, 
                                tuition: {...filters.tuition, max: e.target.value}
                              })}
                              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500"
                            />
                          </div>
                          {/* Suggestions rapides */}
                          <div className="flex flex-wrap gap-2">
                            <button
                              onClick={() => setFilters({...filters, tuition: {min: '', max: '5000'}})}
                              className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs hover:bg-green-200"
                            >
                              {t('filters.cost.quick_filter_less_5000')}
                            </button>
                            <button
                              onClick={() => setFilters({...filters, tuition: {min: '5000', max: '10000'}})}
                              className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs hover:bg-green-200"
                            >
                              {t('filters.cost.quick_filter_5000_10000')}
                            </button>
                            <button
                              onClick={() => setFilters({...filters, tuition: {min: '10000', max: ''}})}
                              className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs hover:bg-green-200"
                            >
                              {t('filters.cost.quick_filter_more_10000')}
                            </button>
                          </div>
                        </div>

                        {/* Acompte */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-3">
                            {t('filters.cost.deposit_label')}
                          </label>
                          <div className="flex gap-3 items-center">
                            <input
                              type="number"
                              placeholder={t('filters.cost.min_placeholder')}
                              value={filters.deposit.min}
                              onChange={(e) => setFilters({
                                ...filters, 
                                deposit: {...filters.deposit, min: e.target.value}
                              })}
                              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500"
                            />
                            <span className="text-gray-500">→</span>
                            <input
                              type="number"
                              placeholder={t('filters.cost.max_placeholder')}
                              value={filters.deposit.max}
                              onChange={(e) => setFilters({
                                ...filters, 
                                deposit: {...filters.deposit, max: e.target.value}
                              })}
                              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* ========== SECTION 4 : LANGUES ========== */}
                  <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-4 border border-orange-200">
                    <button
                      onClick={() => setShowFilterSection({...showFilterSection, language: !showFilterSection.language})}
                      className="w-full flex items-center justify-between mb-3"
                    >
                      <div className="flex items-center gap-2">
                        <Globe className="w-5 h-5 text-orange-600" />
                        <h4 className="font-semibold text-gray-900">{t('filters.language.title')}</h4>
                      </div>
                      <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${showFilterSection.language ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {showFilterSection.language && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Langue */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            {t('filters.language.language_label')}
                          </label>
                          <select
                            value={languageFilter.language}
                            onChange={(e) => {
                              setLanguageFilter({...languageFilter, language: e.target.value});
                              if (e.target.value && languageFilter.minLevel) {
                                setFilters({...filters, language: `${e.target.value}-${languageFilter.minLevel}`});
                              } else {
                                setFilters({...filters, language: ''});
                              }
                            }}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-orange-500 bg-white"
                          >
                            <option value="">{t('filters.language.all_languages')}</option>
                            <option value="Fr">{t('filters.language.languages.french')}</option>
                            <option value="En">{t('filters.language.languages.english')}</option>
                            <option value="Es">{t('filters.language.languages.spanish')}</option>
                          </select>
                        </div>

                        {/* Niveau minimum */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            {t('filters.language.min_level_label')}
                          </label>
                          <select
                            value={languageFilter.minLevel}
                            onChange={(e) => {
                              setLanguageFilter({...languageFilter, minLevel: e.target.value});
                              if (languageFilter.language && e.target.value) {
                                setFilters({...filters, language: `${languageFilter.language}-${e.target.value}`});
                              } else {
                                setFilters({...filters, language: ''});
                              }
                            }}
                            disabled={!languageFilter.language}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-orange-500 bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
                          >
                            <option value="">{t('filters.language.all_levels')}</option>
                            <option value="A1">{t('filters.language.levels.a1')}</option>
                            <option value="A2">{t('filters.language.levels.a2')}</option>
                            <option value="B1">{t('filters.language.levels.b1')}</option>
                            <option value="B2">{t('filters.language.levels.b2')}</option>
                            <option value="C1">{t('filters.language.levels.c1')}</option>
                            <option value="C2">{t('filters.language.levels.c2')}</option>
                          </select>
                        </div>
                      </div>
                    )}
                  </div>
                  {/* ========== SECTION 5 : ADMISSION ========== */}
                  <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-xl p-4 border border-red-200">
                    <button
                      onClick={() => setShowFilterSection({...showFilterSection, admission: !showFilterSection.admission})}
                      className="w-full flex items-center justify-between mb-3"
                    >
                      <div className="flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-red-600" />
                        <h4 className="font-semibold text-gray-900">{t('filters.admission.title')}</h4>
                      </div>
                      <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${showFilterSection.admission ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {showFilterSection.admission && (
                      <div className="space-y-4">
                        {/* Dates de candidature - SIMPLIFIÉ avec boutons */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-3">
                            {t('filters.admission.application_period_label')}
                          </label>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                            <button
                              onClick={() => setFilters({...filters, applicationDate: ''})}
                              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                                !filters.applicationDate 
                                  ? 'bg-red-600 text-white' 
                                  : 'bg-red-100 text-red-700 hover:bg-red-200'
                              }`}
                            >
                              {t('filters.admission.all_year')}
                            </button>
                            
                            <button
                              onClick={() => setFilters({...filters, applicationDate: 'Janvier'})}
                              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                                filters.applicationDate?.includes('Janvier') 
                                  ? 'bg-red-600 text-white' 
                                  : 'bg-red-100 text-red-700 hover:bg-red-200'
                              }`}
                            >
                              {t('filters.admission.periods.jan_mar')}
                            </button>
                            
                            <button
                              onClick={() => setFilters({...filters, applicationDate: 'Avril'})}
                              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                                filters.applicationDate?.includes('Avril') 
                                  ? 'bg-red-600 text-white' 
                                  : 'bg-red-100 text-red-700 hover:bg-red-200'
                              }`}
                            >
                              {t('filters.admission.periods.apr_jun')}
                            </button>
                            
                            <button
                              onClick={() => setFilters({...filters, applicationDate: 'Septembre'})}
                              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                                filters.applicationDate?.includes('Septembre') 
                                  ? 'bg-red-600 text-white' 
                                  : 'bg-red-100 text-red-700 hover:bg-red-200'
                              }`}
                            >
                              {t('filters.admission.periods.sep_nov')}
                            </button>
                            
                            <button
                              onClick={() => setFilters({...filters, applicationDate: 'Décembre'})}
                              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                                filters.applicationDate?.includes('Décembre') 
                                  ? 'bg-red-600 text-white' 
                                  : 'bg-red-100 text-red-700 hover:bg-red-200'
                              }`}
                            >
                              {t('filters.admission.periods.dec_feb')}
                            </button>
                            
                            <button
                              onClick={() => setShowCityDropdown(true)} 
                              className="px-3 py-2 rounded-lg text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200"
                            >
                              {t('filters.admission.advanced')} 
                            </button>
                          </div>
                          
                          {/* Dropdown complet en cas de besoin */}
                          {showCityDropdown && (
                            <div className="mt-3">
                              <select
                                value={filters.applicationDate}
                                onChange={(e) => {
                                  setFilters({...filters, applicationDate: e.target.value});
                                  setShowCityDropdown(false);
                                }}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-red-500"
                              >
                                <option value="">{t('filters.admission.all_periods')}</option>
                                {filterOptions.application_dates
                                  .sort((a, b) => a.localeCompare(b))
                                  .map(date => (
                                    <option key={date} value={date}>{date}</option>
                                  ))
                                }
                              </select>
                            </div>
                          )}
                        </div>

                        {/* Niveau RNCP */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            {t('filters.admission.rncp_level_label')}
                          </label>
                          <select
                            value={filters.rncpLevel}
                            onChange={(e) => setFilters({...filters, rncpLevel: e.target.value})}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-red-500 bg-white"
                          >
                            <option value="">{t('filters.admission.rncp_all_levels')}</option>
                            {filterOptions.rncp_levels.map(level => (
                              <option key={level} value={level}>{t('filters.admission.rncp_level', { level })}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* ========== SECTION 6 : CAMPUS FRANCE (NOUVEAU) ========== */}
                  <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-4 border border-indigo-200">
                    <button
                      onClick={() => setShowFilterSection({...showFilterSection, campusFrance: !showFilterSection.campusFrance})}
                      className="w-full flex items-center justify-between mb-3"
                    >
                      <div className="flex items-center gap-2">
                        <Award className="w-5 h-5 text-indigo-600" />
                        <h4 className="font-semibold text-gray-900">{t('filters.campus_france.title')}</h4>
                      </div>
                      <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${showFilterSection.campusFrance ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {showFilterSection.campusFrance && (
                      <div className="space-y-4">
                        
                        {/* Connexion Campus France */}
                        <label className="flex items-center gap-3 p-3 bg-white rounded-lg border border-indigo-200 hover:bg-indigo-50 cursor-pointer transition-colors">
                          <input
                            type="checkbox"
                            checked={campusFranceFilters.connected}
                            onChange={(e) => setCampusFranceFilters({...campusFranceFilters, connected: e.target.checked})}
                            className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                          />
                          <div className="flex-1">
                            <div className="font-medium text-gray-900 flex items-center gap-2">
                              <Globe className="w-4 h-4 text-indigo-600" />
                              {t('filters.campus_france.connected_school')}
                            </div>
                            <p className="text-xs text-gray-600 mt-0.5">
                              {t('filters.campus_france.connected_school_help')}
                            </p>
                          </div>
                        </label>

                        {/* Procédure parallèle */}
                        <label className="flex items-center gap-3 p-3 bg-white rounded-lg border border-indigo-200 hover:bg-indigo-50 cursor-pointer transition-colors">
                          <input
                            type="checkbox"
                            checked={campusFranceFilters.parallelProcedure}
                            onChange={(e) => setCampusFranceFilters({...campusFranceFilters, parallelProcedure: e.target.checked})}
                            className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                          />
                          <div className="flex-1">
                            <div className="font-medium text-gray-900 flex items-center gap-2">
                              <Award className="w-4 h-4 text-indigo-600" />
                              {t('filters.campus_france.parallel_procedure')}
                            </div>
                            <p className="text-xs text-gray-600 mt-0.5">
                              {t('filters.campus_france.parallel_procedure_help')}
                            </p>
                          </div>
                        </label>

                        {/* Exonération des frais */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            {t('filters.campus_france.tuition_exemption')}
                          </label>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                            <button
                              onClick={() => setCampusFranceFilters({...campusFranceFilters, exoneration: campusFranceFilters.exoneration === 1 ? null : 1})}
                              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-1 ${
                                campusFranceFilters.exoneration === 1
                                  ? 'bg-green-600 text-white' 
                                  : 'bg-green-100 text-green-700 hover:bg-green-200'
                              }`}
                            >
                              <Check className="w-4 h-4" />
                              {t('filters.campus_france.exemption_total')}
                            </button>
                            
                            <button
                              onClick={() => setCampusFranceFilters({...campusFranceFilters, exoneration: campusFranceFilters.exoneration === -1 ? null : -1})}
                              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                                campusFranceFilters.exoneration === -1
                                  ? 'bg-orange-600 text-white' 
                                  : 'bg-orange-100 text-orange-700 hover:bg-orange-200'
                              }`}
                            >
                              {t('filters.campus_france.exemption_partial')}
                            </button>
                            
                            <button
                              onClick={() => setCampusFranceFilters({...campusFranceFilters, exoneration: campusFranceFilters.exoneration === 0 ? null : 0})}
                              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                                campusFranceFilters.exoneration === 0
                                  ? 'bg-red-600 text-white' 
                                  : 'bg-red-100 text-red-700 hover:bg-red-200'
                              }`}
                            >
                              {t('filters.campus_france.exemption_none')}
                            </button>
                          </div>
                        </div>

                        {/* Label Bienvenue en France */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            {t('filters.campus_france.welcome_label')}
                          </label>
                          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                            {[1, 2, 3].map(level => (
                              <button
                                key={level}
                                onClick={() => setCampusFranceFilters({
                                  ...campusFranceFilters, 
                                  bienvenueFrance: campusFranceFilters.bienvenueFrance === level ? null : level
                                })}
                                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                                  campusFranceFilters.bienvenueFrance === level
                                    ? 'bg-indigo-600 text-white' 
                                    : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'
                                }`}
                              >
                                {'⭐'.repeat(level)}
                              </button>
                            ))}
                            <button
                              onClick={() => setCampusFranceFilters({...campusFranceFilters, bienvenueFrance: null})}
                              className={`px-3 py-2 rounded-lg text-sm font-medium ${
                                !campusFranceFilters.bienvenueFrance
                                  ? 'bg-gray-600 text-white' 
                                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                              }`}
                            >
                              {t('filters.campus_france.welcome_label_all')}
                            </button>
                          </div>
                          <p className="text-xs text-gray-500 mt-2">
                            {t('filters.campus_france.welcome_label_help')}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Boutons d'action */}
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 pt-4 border-t border-gray-200">
                    <button
                      onClick={() => {
                        // Réinitialiser TOUS les filtres
                        setFilters({
                          entryLevel: '', grade: '', diplomaType: '',
                          duration: '', selectedYear: null,
                          durations: [],
                          deposit: { min: '', max: '' }, applicationDate: '',
                          tuition: { min: '', max: '' }, alternance: '', city: '',
                          domains: [], language: '', rncpLevel: ''
                        });
                        setCitySearch('');
                        setDomainSearch('');
                        setSelectedDomain(null);
                        setSelectedSubdomains([]);
                        setSelectedDomainFilters(new Set());
                        setSelectedSubdomainFilters(new Set());
                        setSearchQuery('');
                        setSuggestions([]);
                        setShowSuggestions(false);
                        setSearchResults([]);
                        setTotalResults(0);
                        setShowResults(false);
                        setCurrentPage(1);
                        setCampusFranceFilters({
                          connected: false,
                          parallelProcedure: false,
                          exoneration: null,
                          bienvenueFrance: null
                        });
                        setLanguageFilter({language: '', minLevel: ''});
                        
                        if (window.innerWidth <= 768) {
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }
                      }}
                      className="w-full sm:w-auto px-6 py-2.5 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium flex items-center justify-center gap-2"
                    >
                      <X className="w-4 h-4" />
                      {t('filters.reset_all')}
                    </button>
                    
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setShowFilters(false);
                          if (!showResults && !searchQuery.trim()) {
                            setShowResults(false);
                          }
                        }}
                        className="flex-1 sm:flex-none px-6 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                      >
                        {t('filters.close')}
                      </button>
                      <button
                        onClick={() => {
                          setShowResults(true);
                          handleSearch(null, true);
                          setShowFilters(false);
                        }}
                        className="flex-1 sm:flex-none px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-colors text-sm font-medium flex items-center justify-center gap-2 shadow-lg"
                      >
                        <Search className="w-4 h-4" />
                        {t('hero.search')}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </FadeTransition>
  {/* "results": {
    "found_one": "{{count}} formation trouvée",
    "found_other": "{{count}} formations trouvées",
    "noResults": "Aucune formation trouvée",
    "noResultsSubdomains": "Aucune formation ne correspond à vos critères dans les domaines sélectionnés.",
    "noResultsFilters": "Aucune formation ne correspond à vos critères. Essayez de modifier vos filtres.",
    "viewAllPrograms": "Voir toutes les formations",
    "newSearch": "Nouvelle recherche",
    "for": "pour",
    "loading": "Chargement..."
  }, */}
            {/* Résultats */}
            <FadeTransition show={showResults}>
              <div className="animate-fade-in" data-results-section>
                  <ActiveFiltersBar 
                    showResults={showResults}
                    selectedSubdomainFilters={selectedSubdomainFilters}
                    subdomains={subdomains}
                    selectedDomain={selectedDomain}
                    domains={domains}
                    setSelectedSubdomainFilters={setSelectedSubdomainFilters}
                    setSelectedSubdomains={setSelectedSubdomains}
                    setShowResults={setShowResults}
                    setSelectedDomain={setSelectedDomain}
                    handleSearch={handleSearch}
                    toSlug={toSlug}
                    selectedDomainFilters={selectedDomainFilters} // ✅ AJOUT
                    setSelectedDomainFilters={setSelectedDomainFilters} // ✅ AJOUT pour handleModifyFilters
                  />
                  {/* Compteur de résultats */}
                  <div className="mb-6 flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between gap-4">
                    <p className="text-slate-600 text-sm text-center sm:text-left">
                      {t('results.found', { count: totalResults })}
                      {searchQuery && (
                        <span> {t('results.for')} "<strong>{searchQuery}</strong>"</span>
                      )}                   
                    </p>
                    
                    {/* Pagination mobile ET desktop */}
                    <div className="flex justify-center sm:justify-end">
                      <Pagination />
                    </div>
                  </div>

                  {/* Grille des résultats */}
                  {isSearching && currentPage === 1 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {[...Array(6)].map((_, i) => (
                        <div key={i} className="bg-white rounded-xl shadow-md border border-gray-100 p-6 animate-pulse">
                          <div className="h-4 bg-gray-200 rounded mb-4"></div>
                          <div className="h-6 bg-gray-200 rounded mb-2"></div>
                          <div className="h-4 bg-gray-200 rounded mb-4"></div>
                          <div className="h-20 bg-gray-200 rounded"></div>
                        </div>
                      ))}
                    </div>
                  ) : searchResults.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 max-w-md mx-auto">
                        <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {totalResults === 0 ? t('results.noResults') : t('results.loading')}
                        </h3>
                        <p className="text-gray-600 mb-4">
                          {selectedSubdomainFilters.size > 0 || selectedSubdomains.length > 0 ? 
                            t('results.noResultsSubdomains') :
                            t('results.noResultsFilters')
                          }
                        </p>
                        <div className="space-y-2">
                          <button
                            onClick={() => {
                              console.log('🔵 Voir toutes button clicked');
                              // Reset tous les filtres
                              setSearchQuery('');
                              setFilters({
                                entryLevel: '', grade: '', diplomaType: '', duration: '',
                                deposit: { min: '', max: '' }, applicationDate: '',
                                tuition: { min: '', max: '' }, alternance: '', city: '',
                                domains: [], language: '', rncpLevel: ''
                              });
                              setSelectedDomain(null);
                              setSelectedSubdomains([]);
                              setSelectedDomainFilters(new Set());
                              setSelectedSubdomainFilters(new Set());
                              
                              // ✅ Forcer la recherche pour TOUTES les formations
                              setShowResults(true);
                              setTimeout(() => {
                                handleSearch('', true); // ✅ forceSearch = true, query vide
                              }, 100);
                            }}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors mr-2"
                          >
                            {t('results.viewAllPrograms')}
                          </button>
                          <button
                            onClick={() => {
                              setSearchQuery('');
                              setFilters({
                                entryLevel: '', grade: '', diplomaType: '', duration: '',
                                deposit: { min: '', max: '' }, applicationDate: '',
                                tuition: { min: '', max: '' }, alternance: '', city: '',
                                domains: [], language: '', rncpLevel: ''
                              });
                              setSelectedDomain(null);
                              setSelectedSubdomains([]);
                              setSelectedDomainFilters(new Set());
                              setSelectedSubdomainFilters(new Set());
                              setShowResults(false);
                              setShowFilters(false);
                            }}
                            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                          >
                            {t('results.newSearch')}
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {searchResults.map((program) => (
                          <ProgramCard key={program.id} program={program} />
                        ))}
                      </div>
                      
                      {/* Pagination en bas */}
                      <div className="mt-6 sm:mt-8 flex justify-center">
                        <Pagination />
                      </div>
                    </>
                  )}
              </div>
            </FadeTransition>
          </>
        } 
        {activeTab === 'accompany' && (
          <AccompanySection />
        )}
        {activeTab === 'organizations' && (
          <OrganizationContactSection />
        )}
      </div>


      {/* Statistiques en bas */}
      <div className="bg-gradient-to-r from-gray-900 to-blue-900 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-yellow-400 mb-2">{globalStats.total_programs.toLocaleString()}+</div>
              <div className="text-blue-200">{t('stats.programs')}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-400 mb-2">{globalStats.total_schools.toLocaleString()}+</div>
              <div className="text-blue-200">{t('stats.schools')}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-400 mb-2">95%</div>
              <div className="text-blue-200">{t('stats.satisfactionRate')}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-400 mb-2">24/7</div>
              <div className="text-blue-200">{t('stats.supportAvailable')}</div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
    </>
  );
};

export async function getStaticProps({ locale }) {
  const { serverSideTranslations } = await import('next-i18next/serverSideTranslations');
  
  return {
    props: {
      ...(await serverSideTranslations(locale, ['authModal', 'common', 'accompanyModal'])),
    },
  };
}


export default HomePage;
