import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { Search, Filter, Heart, MapPin, Clock, Euro, Calendar, GraduationCap, Building2, Users, ChevronDown, ChevronRight, ChevronLeft, X, Award, Briefcase, Globe, ExternalLink, Check } from 'lucide-react';
import Link from 'next/link';
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';
import { optimizedApi, cacheUtils, CACHE_DURATION } from '../utils/cacheUtils';

import { useRouter } from 'next/router';
// NOUVEAUX IMPORTS - APIs au lieu des mocks
import ProgramApi from '../store/apis/programApi';
import PrivateSchoolApi from '../store/apis/privateSchoolApi';
import DomainApi from '../store/apis/domainApi';
import SubdomainApi from '../store/apis/subdomainApi';
import StatsApi from '../store/apis/statsApi';
import { getDomainsWithIcons,getDomainNameSync,getSubdomainNamesSync,getSubdomainsByDomainSync,getSubdomainDomainSync,getSubdomainNameSync } from '../utils/apiUtils';
import { FadeTransition } from '../components/ui';
import {ProgressLoader, ZenLoader} from '../components/ui/ProgressLoader';
import RocketLoader from '../components/ui/RocketLoader';
import FavoriteButton from '../components/FavoriteButton';
import AccompanySection from '../components/AccompanySection';
import OrganizationContactSection from '../components/OrganizationContactSection';
import { trackSearch } from '../lib/gtag';
// Ajout de l'import ou définition de REST_API_PARAMS

const HomePage = () => {
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
    duration: '',
    deposit: { min: '', max: '' },
    applicationDate: '',
    tuition: { min: '', max: '' },
    alternance: '',
    city: '',
    domains: [],
    language: '',
    rncpLevel: ''
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
      setError(null);

      try {
        console.log('🚀 Loading initial data with cache...');
        const startTime = performance.now();

        // Utiliser le cache intelligent pour charger toutes les données
        const data = await optimizedApi.loadAllInitialData();
        
        setDomains(data.domains);
        setSubdomains(data.allSubdomains);
        setSchools(data.schools);
        setFilterOptions(data.filterOptions);
        setGlobalStats(data.globalStats);

        const endTime = performance.now();
        console.log(`✅ Initial data loaded in ${Math.round(endTime - startTime)}ms`);
      } catch (err) {
        console.error('❌ Error loading initial data:', err);
        setError(err);
        
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

  const router = useRouter();

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

  const handleSearch = useCallback(async (queryOverride = null, forceSearch = false) => {
    const query = queryOverride || searchQuery;

    console.log('🔍 handleSearch called with:', {
      query: query.trim(),
      forceSearch,
      filters,
      selectedSubdomainFilters: selectedSubdomainFilters.size,
      selectedSubdomains: selectedSubdomains.length
    });

    // ✅ NOUVELLE LOGIQUE : Permettre la recherche si :
    // 1. forceSearch = true (bouton "Appliquer" ou "Voir toutes")
    // 2. OU il y a une query de recherche
    // 3. OU il y a des filtres actifs
    // 4. OU il y a des sous-domaines sélectionnés
    const hasActiveFilters = Object.values(filters).some(f => 
      f !== '' && 
      !(Array.isArray(f) && f.length === 0) && 
      !(typeof f === 'object' && f.min === '' && f.max === '')
    );

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
      if (filters.duration) searchFilters.duration = filters.duration;
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

      // Ajouter les sous-domaines SEULEMENT s'ils sont sélectionnés
      const activeSubdomains = selectedSubdomainFilters.size > 0 ? 
                              [...selectedSubdomainFilters] : 
                              selectedSubdomains.length > 0 ? selectedSubdomains : null;
      
      if (activeSubdomains && activeSubdomains.length > 0) {
        searchFilters.subdomain_ids = activeSubdomains;
      }

      console.log('🔍 API call with filters:', searchFilters);

      const response = await ProgramApi.searchPrograms(searchFilters);
      
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
  }, [searchQuery, filters, selectedSubdomainFilters, selectedSubdomains, itemsPerPage]);

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
      if (filters.duration) searchFilters.duration = filters.duration;
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

      // Ajouter les sous-domaines actifs
      const activeSubdomains = selectedSubdomainFilters.size > 0 ? 
                              [...selectedSubdomainFilters] : 
                              selectedSubdomains.length > 0 ? selectedSubdomains : null;
      
      if (activeSubdomains && activeSubdomains.length > 0) {
        searchFilters.subdomain_ids = activeSubdomains;
      }

      console.log(`🔍 Pagination: Going to page ${targetPage} with filters:`, searchFilters);

      const response = await ProgramApi.searchPrograms(searchFilters);
      
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
  }, [searchQuery, filters, selectedSubdomainFilters, selectedSubdomains, itemsPerPage, totalResults, isSearching]);

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

  // 6. CORRIGER LA SÉLECTION DE DOMAINE
  // const handleDomainSelection = (domainId) => {
  //   setSelectedDomain(domainId);
  //   setSelectedSubdomains([]);
    
  //   // CORRECTION: Utiliser la version synchrone
  //   const domainSubdomains = getSubdomainsByDomainSync(domainId, domains);
  //   console.log('🔍 Domain selected:', domainSubdomains)
  //   // Synchroniser avec les filtres avancés
  //   setSelectedDomainFilters(new Set([domainId]));
  //   setSelectedSubdomainFilters(new Set(domainSubdomains.map(sd => sd.id)));
  // };

//   const debugProgramData = (programs) => {
//   console.log('🐛 Debug first few programs:');
//   programs.slice(0, 3).forEach((program, index) => {
//     console.log(`Program ${index}:`, {
//       id: program.id,
//       name: program.title,
//       name_type: typeof program.title,
//       school_name: program.school_name,
//       school_name_type: typeof program.school_name,
//       description: program.description ? program.description.substring(0, 50) + '...' : null,
//       school: program.school
//     });
//   });
// };

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
      });
      
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

  // Fonction de recherche avec IA-like scoring (mise à jour pour API)
  /*const searchPrograms = useMemo(() => {
    let filteredPrograms = programs;
    const activeSubdomains = selectedSubdomains.length > 0 ? selectedSubdomains : [...selectedSubdomainFilters];
    
    if (activeSubdomains.length > 0) {
      filteredPrograms = filteredPrograms.filter(program => {
        const programSubdomains = [program.sub_domain1, program.sub_domain2, program.sub_domain3].filter(Boolean);
        return activeSubdomains.some(subdomain => programSubdomains.includes(subdomain));
      });
    }

    if (!searchQuery.trim() && Object.values(filters).every(f => 
      f === '' || (Array.isArray(f) && f.length === 0) || 
      (typeof f === 'object' && f.min === '' && f.max === '')
    )) {
      return filteredPrograms.map(program => ({
        ...program,
        school: schools.find(s => s.id === program.school_id) || program.school,
        score: Math.random()
      }));
    }

    const query = searchQuery.toLowerCase().trim();
    
    return filteredPrograms.map(program => {
      const school = schools.find(s => s.id === program.school_id) || program.school;
      let score = 0;

      // Recherche textuelle avec pondération
      if (query) {
        // PRIORITÉ HAUTE
        if (program.title?.toLowerCase().includes(query)) score += 10;
        if (program.school_name?.toLowerCase().includes(query)) score += 9;
        if (school?.school_group?.toLowerCase().includes(query)) score += 8;
        if (school?.description?.toLowerCase().includes(query)) score += 7;
        if (program.description?.toLowerCase().includes(query)) score += 7;
        if (program.skills_acquired?.toLowerCase().includes(query)) score += 6;
        if (program.careers?.toLowerCase().includes(query)) score += 6;

        // PRIORITÉ MOYENNE
        if (program.curriculum_highlights?.toLowerCase().includes(query)) score += 4;
        if (program.grade?.toLowerCase().includes(query)) score += 3;
        if (program.state_certification_type?.toLowerCase().includes(query)) score += 3;

        // Sous-domaines - utiliser une fonction asynchrone en interne n'est pas pratique ici
        // On peut faire un matching simple sur les IDs pour l'instant
        const subdomainIds = [
          program.sub_domain1, 
          program.sub_domain2, 
          program.sub_domain3
        ].filter(Boolean);
        
        // CORRECTION: Chercher dans les sous-domaines chargés dans l'état
        const matchingSubdomains = subdomains.filter(subdomain => 
          subdomainIds.includes(subdomain.id) && 
          subdomain.name.toLowerCase().includes(query)
        );
        
        if (matchingSubdomains.length > 0) score += 5;

        // PRIORITÉ FAIBLE
        if (program.special_comment?.toLowerCase().includes(query)) score += 2;
        if (program.partner_companies?.toLowerCase().includes(query)) score += 1;
        if (school?.partnerships?.toLowerCase().includes(query)) score += 1;
      }

      // Filtres (similaire à l'ancien code)
      let passesFilters = true;

      if (filters.entryLevel) {
        const hasMatchingLevel = [1,2,3,4,5].some(year => {
          const level = program[`y${year}_required_level`];
          return level && level.includes(filters.entryLevel);
        });
        if (!hasMatchingLevel) passesFilters = false;
      }

      if (filters.grade && program.grade !== filters.grade) passesFilters = false;
      if (filters.diplomaType && program.state_certification_type_complement !== filters.diplomaType) passesFilters = false;
      if (filters.duration && program.fi_school_duration !== filters.duration) passesFilters = false;
      if (filters.alternance && program.alternance_possible.toString() !== filters.alternance) passesFilters = false;
      if (filters.city && school?.base_city !== filters.city) passesFilters = false;
      if (filters.rncpLevel && program.rncp_level !== filters.rncpLevel) passesFilters = false;
      if (filters.applicationDate && program.application_date_comment !== filters.applicationDate) passesFilters = false;

      // Filtre langue
      if (filters.language && filters.entryLevel) {
        const levelMap = { 'Bac': 1, 'Bac+1': 2, 'Bac+2': 3, 'Bac+3': 4, 'Bac+4': 5 };
        const yearLevel = levelMap[filters.entryLevel];
        const programLanguage = program[`language_tech_level${yearLevel}`];
        
        if (!programLanguage) {
          passesFilters = false;
        } else {
          const selectedLang = filters.language;
          const programLangs = programLanguage.split(',').map(lang => lang.trim());
          
          const hasMatchingLanguage = programLangs.some(progLang => {
            const formatProgLang = progLang.replace('-', ' ').replace('Fr', 'Français').replace('En', 'Anglais');
            return selectedLang.includes(formatProgLang) || progLang === selectedLang;
          });
          
          if (!hasMatchingLanguage) {
            passesFilters = false;
          }
        }
      }

      // Filtres prix
      if (filters.deposit.min || filters.deposit.max) {
        const deposit = parseInt(program.first_deposit?.replace(/[^\d]/g, '') || '0');
        if (filters.deposit.min && deposit < parseInt(filters.deposit.min)) passesFilters = false;
        if (filters.deposit.max && deposit > parseInt(filters.deposit.max)) passesFilters = false;
      }

      if (filters.tuition.min || filters.tuition.max) {
        const tuition = parseInt(program.tuition?.replace(/[^\d]/g, '') || '0');
        if (filters.tuition.min && tuition < parseInt(filters.tuition.min)) passesFilters = false;
        if (filters.tuition.max && tuition > parseInt(filters.tuition.max)) passesFilters = false;
      }

      // Scoring école
      if (school?.rating) {
        score += parseFloat(school.rating) * 2;
        if (school.reviews_counter) {
          score += Math.min(parseFloat(school.reviews_counter) * 0.1, 5);
        }
      }

      return passesFilters ? { ...program, school, score } : null;
    })
    .filter(Boolean)
    .sort((a, b) => b.score - a.score);
  }, [searchQuery, filters, selectedDomain, selectedSubdomains, selectedSubdomainFilters, programs, schools, subdomains]);*/

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
      });
      
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
    const num = parseInt(duration);
    return num > 1 ? `${num} ans` : `${num} an`;
  };

  const formatPrice = (price) => {
    if (!price) return 'Non communiqué';
    return price.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
  };

  // Composant Dropdown avec Checkboxes pour Domaines/Sous-domaines (mise à jour pour API)
  const DomainCheckboxDropdown = () => {
    const filteredDomains = getFilteredDomains;

    console.log('🐛 Filtered domains:', filteredDomains.length)

    const toggleDomain = async (domainId) => {
      const newSelectedDomains = new Set(selectedDomainFilters);
      
      // Récupérer les sous-domaines de ce domaine depuis l'API
      const subdomainsResponse = await SubdomainApi.getSubdomainsByDomain(domainId);
      const domainSubdomains = subdomainsResponse.success ? subdomainsResponse.data : [];
      
      // Filtrer seulement les sous-domaines qui ont des programmes
      const availableSubdomains = domainSubdomains.filter(subdomain => {
        return programs.some(program => 
          [program.sub_domain1, program.sub_domain2, program.sub_domain3]
            .filter(Boolean)
            .includes(subdomain.id)
        );
      });
      
      const newSelectedSubdomains = new Set(selectedSubdomainFilters);
      
      if (newSelectedDomains.has(domainId)) {
        // Désélectionner le domaine et tous ses sous-domaines
        newSelectedDomains.delete(domainId);
        availableSubdomains.forEach(subdomain => newSelectedSubdomains.delete(subdomain.id));
      } else {
        // Sélectionner le domaine et tous ses sous-domaines disponibles
        newSelectedDomains.add(domainId);
        availableSubdomains.forEach(subdomain => newSelectedSubdomains.add(subdomain.id));
      }
      
      setSelectedDomainFilters(newSelectedDomains);
      setSelectedSubdomainFilters(newSelectedSubdomains);
    };

    const toggleSubdomain = async (subdomainId, domainId) => {
      const newSelectedSubdomains = new Set(selectedSubdomainFilters);
      const newSelectedDomains = new Set(selectedDomainFilters);
      
      if (newSelectedSubdomains.has(subdomainId)) {
        // Désélectionner le sous-domaine
        newSelectedSubdomains.delete(subdomainId);
        
        // Vérifier si il faut désélectionner le domaine parent
        const subdomainsResponse = await SubdomainApi.getSubdomainsByDomain(domainId);
        const domainSubdomains = subdomainsResponse.success ? subdomainsResponse.data.filter(subdomain => {
          return programs.some(program => 
            [program.sub_domain1, program.sub_domain2, program.sub_domain3]
              .filter(Boolean)
              .includes(subdomain.id)
          );
        }) : [];
        
        const hasOtherSelected = domainSubdomains.some(subdomain => 
          subdomain.id !== subdomainId && newSelectedSubdomains.has(subdomain.id)
        );
        if (!hasOtherSelected) {
          newSelectedDomains.delete(domainId);
        }
      } else {
        // Sélectionner le sous-domaine
        newSelectedSubdomains.add(subdomainId);
        
        // Vérifier si tous les sous-domaines disponibles sont sélectionnés
        const subdomainsResponse = await SubdomainApi.getSubdomainsByDomain(domainId);
        const domainSubdomains = subdomainsResponse.success ? subdomainsResponse.data.filter(subdomain => {
          return programs.some(program => 
            [program.sub_domain1, program.sub_domain2, program.sub_domain3]
              .filter(Boolean)
              .includes(subdomain.id)
          );
        }) : [];
        
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
              ? `${selectedSubdomainFilters.size} spécialisation${selectedSubdomainFilters.size > 1 ? 's' : ''} sélectionnée${selectedSubdomainFilters.size > 1 ? 's' : ''}`
              : 'Sélectionner des domaines et spécialisations'
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
                <p className="text-sm">Aucun domaine trouvé</p>
                <p className="text-xs">Total domaines: {domains.length}</p>
                <p className="text-xs">Recherche: "{domainSearch}"</p>
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
                    {selectedSubdomainFilters.size} spécialisation{selectedSubdomainFilters.size > 1 ? 's' : ''} sélectionnée{selectedSubdomainFilters.size > 1 ? 's' : ''}
                  </span>
                  <button
                    onClick={() => {
                      setSelectedDomainFilters(new Set());
                      setSelectedSubdomainFilters(new Set());
                    }}
                    className="text-sm text-red-600 hover:text-red-700 font-medium"
                  >
                    Tout effacer
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  const getLanguagesForEntryLevel = useMemo(() => {
    if (!filters.entryLevel) {
      return filterOptions.languages; // Toutes les langues disponibles
    }
    
    // Filtrer les langues basées sur le niveau d'entrée sélectionné
    const levelMap = { 'Bac': 1, 'Bac+1': 2, 'Bac+2': 3, 'Bac+3': 4, 'Bac+4': 5 };
    const yearLevel = levelMap[filters.entryLevel];
    
    if (yearLevel) {
      // Retourner les langues disponibles dans l'API
      return filterOptions.languages;
    }
    
    return [];
  }, [filters.entryLevel, filterOptions.languages]);

  if (isLoading) {
    return (
      <>
        <NavBar />
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center">
          <RocketLoader />
        </div>
      </>
    );
  }

  const SearchableDropdown = ({ 
    options, 
    value, 
    onChange, 
    placeholder, 
    searchValue, 
    onSearchChange, 
    showDropdown, 
    setShowDropdown, 
    dropdownRef,
    renderOption = (option) => option 
  }) => (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-left focus:ring-2 focus:ring-blue-500 flex items-center justify-between"
      >
        <span className={value ? 'text-gray-900' : 'text-gray-500'}>
          {value || placeholder}
        </span>
        <ChevronDown className={`w-4 h-4 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
      </button>
      
      {showDropdown && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-hidden">
          <div className="p-2 border-b">
            <input
              type="text"
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Rechercher..."
              className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="max-h-48 overflow-y-auto">
            {options.length > 0 ? (
              options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => {
                    onChange(typeof option === 'string' ? option : option.name);
                    setShowDropdown(false);
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-gray-100 flex items-center gap-2"
                >
                  {renderOption(option)}
                </button>
              ))
            ) : (
              <div className="px-3 py-2 text-gray-500 text-sm">Aucun résultat</div>
            )}
          </div>
        </div>
      )}
    </div>
  );

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
              <span className="bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                {program.grade}
              </span>
              {program.state_certification_type && (
                <span className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                  {program.state_certification_type}
                </span>
              )}
              {program.alternance_possible && (
                <span className="bg-gradient-to-r from-purple-100 to-violet-100 text-purple-700 px-2 py-1 rounded-full text-xs font-medium">
                  Alternance
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
              <span className="text-gray-700 truncate">Rentrée: {program.intake}</span>
            </div>
            <div className="flex items-center gap-2">
              <Euro className="w-4 h-4 text-green-600 flex-shrink-0" />
              <span className="text-gray-700 font-medium truncate">{formatPrice(program.tuition)}</span>
            </div>
            <div className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-red-600 flex-shrink-0" />
              <span className="text-gray-700 truncate">Deadline: {program.application_date}</span>
            </div>
            {program.first_deposit && (
              <div className="flex items-center gap-2 col-span-2">
                <Euro className="w-4 h-4 text-purple-600 flex-shrink-0" />
                <span className="text-gray-700 truncate">Acompte: {formatPrice(program.first_deposit)}</span>
              </div>
            )}
          </div>
        </div>

        {/* Footer avec bouton full-width - HAUTEUR FIXE */}
        <div className="p-4 bg-white border-t border-gray-100 flex-shrink-0">
          <Link href={programUrl} target="_blank" rel="noopener noreferrer" className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg text-sm font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 flex items-center justify-center gap-2">
            Voir le programme
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </Link>
                      {/* <Link href={programUrl} target="_blank" rel="noopener noreferrer">
                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 text-sm font-medium">
                  Voir le programme
                  <ExternalLink className="w-4 h-4" />
                </button>
              </Link> */}
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
                    }}
                    className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-6 py-3 sm:py-4 font-semibold transition-all duration-300 whitespace-nowrap text-xs sm:text-base ${
                      activeTab === 'search'
                        ? 'text-white border-b-2 border-white bg-white/10'
                        : 'text-blue-100 hover:text-white'
                    }`}
                  >
                    <Search className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>Rechercher</span>
                  </button>
                  
                  <button
                    onClick={() => setActiveTab('accompany')}
                    className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-6 py-3 sm:py-4 font-semibold transition-all duration-300 whitespace-nowrap text-xs sm:text-base ${
                      activeTab === 'accompany'
                        ? 'text-white border-b-2 border-white bg-white/10'
                        : 'text-blue-100 hover:text-white'
                    }`}
                  >
                    <Users className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="xs:inline">Accompagnez-moi</span>
                  </button>
                  
                  <button
                    onClick={() => setActiveTab('organizations')}
                    className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-6 py-3 sm:py-4 font-semibold transition-all duration-300 whitespace-nowrap text-xs sm:text-base ${
                      activeTab === 'organizations'
                        ? 'text-white border-b-2 border-white bg-white/10'
                        : 'text-blue-100 hover:text-white'
                    }`}
                  >
                    <Building2 className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>Organismes</span>
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
                    Votre avenir académique en France vous attend
                  </h1>
                  <p className="text-lg sm:text-xl text-blue-100 mb-8 max-w-4xl mx-auto">
                    Explorez <span className="font-bold text-yellow-300">{globalStats.total_programs.toLocaleString()}+ formations</span> dans <span className="font-bold text-yellow-300">{globalStats.total_schools.toLocaleString()}+ écoles privées</span> françaises. 
                    Trouvez le programme parfait pour votre parcours international.
                  </p>

                  {/* Barre de recherche intégrée dans le header */}
                  <div ref={dropdownRef} className="max-w-4xl mx-auto mb-4 sm:mb-6 lg:mb-8 relative z-[100]">
                    <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 sm:p-4 lg:p-6 border border-white/20">
                      <div className="relative mb-2 sm:mb-3 lg:mb-4" id="search-container">
                        <div className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:gap-2">
                          <div className="relative flex-1 z-[110]">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 z-[111]" />
                            <input
                              type="text"
                              placeholder="Rechercher une formation, une école..."
                              value={searchQuery}
                              onFocus={() => setShowSuggestions(true)}
                              onBlur={() => {
                                setTimeout(() => setShowSuggestions(false), 150);
                              }}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  handleSearch();
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
                                title="Effacer la recherche"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                          <button
                            onClick={() => {
                              if (searchQuery && searchQuery.trim()) {
                                handleSearch();
                              }
                            }}
                            disabled={isSearching || !searchQuery || !searchQuery.trim()}
                            className="px-4 sm:px-6 lg:px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors border border-gray-200 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base z-[111] w-full sm:w-auto" 
                          >
                            {isSearching ? 'Recherche...' : 'Rechercher'}
                          </button>
                        </div>
                        
                        {/* Suggestions avec largeur adaptée */}
                        {showSuggestions && suggestions.length > 0 && (
                          <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg mt-1 max-h-48 overflow-y-auto z-[120]">
                            <div className="p-2"></div>
                            {suggestions.map((suggestion, index) => (
                              <button
                                key={index}
                                onClick={() => {
                                  setSearchQuery(suggestion);
                                  setShowSuggestions(false);
                                  handleSearch(suggestion);
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
                          onClick={() => {
                            setShowFilters(!showFilters);
                            if (!showFilters && !showResults && searchQuery.trim()) {
                              setShowResults(true);
                              handleSearch();
                            }
                          }}
                          className="flex items-center justify-center gap-2 px-3 py-2 bg-white/20 border border-white/30 rounded-lg hover:bg-white/30 transition-colors text-white text-sm order-1 sm:order-none"
                        >
                          <Filter className="w-4 h-4" />
                          <span>Filtres avancés</span>
                          <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                        </button>
                        
                        <div className="flex flex-col text-center sm:text-left space-y-1 sm:space-y-0 text-xs sm:text-sm text-blue-100 order-2 sm:order-none">
                          <span>
                            {totalResults} formation{totalResults > 1 ? 's' : ''} disponible{totalResults > 1 ? 's' : ''}
                          </span>
                          <div className="flex items-center justify-center sm:justify-start gap-2">
                            <span className="text-blue-200/80">(écoles privées)</span>
                            <span className="bg-orange-500/20 border border-orange-400/30 text-orange-200 px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
                              BÊTA
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) } 
              {activeTab === 'accompany' && (
                <>
                  <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                    Accompagnement personnalisé
                  </h1>
                  <p className="text-lg sm:text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
                    Laissez nos experts vous guider vers la formation parfaite selon votre profil et vos objectifs.
                  </p>
                </>
              )}
              {activeTab === 'organizations' && (
                <>
                  <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                    Partenaires & Organismes
                  </h1>
                  <p className="text-lg sm:text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
                    Vous représentez une école, une université, un organisme de formation ou une entreprise ? Rejoignez notre réseau de partenaires et donnez plus de visibilité à vos formations.
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
                    Découvrez les formations par domaine
                  </h2>
                  <p className="text-gray-600 text-lg">
                    Cliquez sur un domaine pour explorer les spécialisations disponibles
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
                  {domains.map((domain) => (
                    <button
                      key={domain.id}
                      onClick={() => {
                        setSelectedDomain(domain.id);
                        setSelectedSubdomains([]);
                        const domainSubdomains = getSubdomainsByDomainSync(domain.id, domains);
                        setSelectedDomainFilters(new Set([domain.id]));
                        setSelectedSubdomainFilters(new Set(domainSubdomains.map(sd => sd.id)));
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
                  ))}
                </div>
              </div>
            </FadeTransition>

            {/* Sélection des sous-domaines */}
            <FadeTransition show={selectedDomain && !showResults}>
              <div className="mb-8" data-subdomain-selection>
                <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                    <div className="mb-4">
                      {/* Barre en haut : retour + titre (à gauche) ET bouton (à droite) en desktop */}
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between sm:mb-4">
                        
                        {/* Bouton retour + titre */}
                        <div className="flex items-center gap-2 mb-3 sm:mb-0">
                          <button
                            onClick={() => setSelectedDomain(null)}
                            className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
                            title="Retour"
                          >
                            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                          </button>

                          <h2 className="text-sm sm:text-xl font-bold text-gray-900 truncate">
                            <span className="text-gray-500 text-xs sm:text-base font-normal">Spécialisations dans </span>
                            <br className="sm:hidden" />
                            <span className="text-blue-600">{getDomainNameSync(selectedDomain, domains)}</span>
                          </h2>
                        </div>

                        {/* Bouton "Voir les formations" visible uniquement en desktop */}
                        <div className="block sm:flex sm:justify-end">
                          <button
                            onClick={() => {
                              if (selectedSubdomains.length > 0) {
                                setShowResults(true);
                                setSelectedSubdomainFilters(new Set(selectedSubdomains));
                                handleSearch();
                              }
                            }}
                            disabled={selectedSubdomains.length === 0}
                            className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                              selectedSubdomains.length > 0
                                ? 'bg-blue-600 text-white hover:bg-blue-700'
                                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            }`}
                          >
                            Voir les formations ({programCountForSelected || 0})
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
                      <p className="text-gray-500">Aucune formation disponible dans ce domaine pour le moment.</p>
                      <button
                        onClick={() => setSelectedDomain(null)}
                        className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
                      >
                        ← Retour aux domaines
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </FadeTransition>

            {/* Panneau de filtres avancés */}
            <FadeTransition show={showFilters}>
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 mb-4 sm:mb-8"> {/* ✅ Margin réduite mobile */}
                <div className="p-4 sm:p-6 bg-gray-50 border-b border-gray-200"> {/* ✅ Padding réduit mobile */}
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Filtres avancés</h3> {/* ✅ Taille titre responsive */}

                  {/* {!filterOptionsLoaded && (
                    <div className="p-3 sm:p-4 text-center text-gray-500 mb-3 sm:mb-4"> 
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mx-auto mb-2"></div>
                      <p className="text-xs sm:text-sm">Chargement des options de filtres...</p>
                    </div>
                  )} */}

                  {/* Section Domaines avec padding mobile optimisé */}
                  <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-white rounded-lg border border-gray-200"> {/* ✅ Padding responsive */}
                    <label className="block text-sm font-medium text-gray-700 mb-2 sm:mb-3">
                      <span className="flex items-center gap-2">
                        🎯 Domaines d'étude et spécialisations
                        {selectedSubdomainFilters.size > 0 && (
                          <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">
                            {selectedSubdomainFilters.size} sélectionnée{selectedSubdomainFilters.size > 1 ? 's' : ''}
                          </span>
                        )}
                      </span>
                    </label>
                    <DomainCheckboxDropdown />
                    
                    {/* Tags sélectionnés - optimisés mobile */}
                    {selectedSubdomainFilters.size > 0 && (
                      <div className="mt-2 sm:mt-3 flex flex-wrap gap-1 sm:gap-2"> {/* ✅ Gap réduit mobile */}
                        {[...selectedSubdomainFilters].slice(0, 4).map(subdomainId => { {/* ✅ Moins de tags sur mobile */}
                          const subdomain = subdomains.find(s => s.id === subdomainId);
                          const subdomainName = subdomain ? subdomain.name : subdomainId;
                          
                          return (
                            <span 
                              key={subdomainId} 
                              className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs flex items-center gap-1" 
                            >
                              <span className="truncate max-w-[120px] sm:max-w-none">{subdomainName}</span> {/* ✅ Truncate mobile */}
                              <button
                                onClick={() => {
                                  const newSelected = new Set(selectedSubdomainFilters);
                                  newSelected.delete(subdomainId);
                                  setSelectedSubdomainFilters(newSelected);
                                }}
                                className="hover:text-blue-900 hover:bg-blue-200 rounded-full w-4 h-4 flex items-center justify-center text-xs"
                              >
                                ×
                              </button>
                            </span>
                          );
                        })}
                        {selectedSubdomainFilters.size > 4 && (
                          <span className="text-xs text-gray-500 py-1 px-2 bg-gray-100 rounded-full">
                            +{selectedSubdomainFilters.size - 4} autres
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Grille de filtres - responsive */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4"> {/* ✅ 1 colonne mobile */}
                    
                    {/* Niveau d'entrée */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Niveau d'entrée
                      </label>
                      <select
                        value={filters.entryLevel}
                        onChange={(e) => setFilters({...filters, entryLevel: e.target.value, language: ''})}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500" 
                      >
                        <option value="">Tous niveaux</option>
                        {filterOptions.entry_levels.map(level => (
                          <option key={level} value={level}>{level}</option>
                        ))}
                      </select>
                    </div>

                    {/* Type de grade/diplôme */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Type de grade/diplôme
                      </label>
                      <select
                        value={filters.grade}
                        onChange={(e) => setFilters({...filters, grade: e.target.value})}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Tous diplômes</option>
                        {filterOptions.grades.map(grade => (
                          <option key={grade} value={grade}>{grade}</option>
                        ))}
                      </select>
                    </div>

                    {/* Durée */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Durée
                      </label>
                      <select
                        value={filters.duration}
                        onChange={(e) => setFilters({...filters, duration: e.target.value})}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Toutes durées</option>
                        {filterOptions.durations.map(duration => (
                          <option key={duration} value={duration}>{duration}</option>
                        ))}
                      </select>
                    </div>

                    {/* Alternance */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Alternance
                      </label>
                      <select
                        value={filters.alternance}
                        onChange={(e) => setFilters({...filters, alternance: e.target.value})}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Peu importe</option>
                        <option value="true">Oui</option>
                        <option value="false">Non</option>
                      </select>
                    </div>

                    {/* Ville */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Ville
                      </label>
                      <SearchableDropdown
                        options={['Toutes villes', ...filterOptions.cities]}
                        value={filters.city}
                        onChange={(value) => {
                          const cityValue = value === 'Toutes villes' ? '' : value;
                          setFilters({...filters, city: cityValue});
                        }}
                        placeholder="Toutes villes"
                        searchValue={citySearch}
                        onSearchChange={setCitySearch}
                        showDropdown={showCityDropdown}
                        setShowDropdown={setShowCityDropdown}
                        dropdownRef={cityDropdownRef}
                      />
                    </div>

                    {/* Langue d'enseignement */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Langue d'enseignement
                      </label>
                      <select
                        value={filters.language}
                        onChange={(e) => setFilters({...filters, language: e.target.value})}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Toutes langues</option>
                        {filterOptions.languages.map(lang => (
                          <option key={lang} value={lang}>
                            {ProgramApi.formatLanguageLevels(lang)}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Niveau RNCP */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Niveau RNCP
                      </label>
                      <select
                        value={filters.rncpLevel}
                        onChange={(e) => setFilters({...filters, rncpLevel: e.target.value})}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Tous niveaux</option>
                        {filterOptions.rncp_levels.map(level => (
                          <option key={level} value={level}>Niveau {level}</option>
                        ))}
                      </select>
                    </div>

                    {/* Dates de candidature */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Dates de candidature
                      </label>
                      <select
                        value={filters.applicationDate}
                        onChange={(e) => setFilters({...filters, applicationDate: e.target.value})}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Toutes périodes</option>
                        {filterOptions.application_dates.map(date => (
                          <option key={date} value={date}>{date}</option>
                        ))}
                      </select>
                    </div>

                    {/* Frais de scolarité - mobile optimisé */}
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Frais de scolarité (€/an)
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="number"
                          placeholder="Min"
                          value={filters.tuition.min}
                          onChange={(e) => setFilters({
                            ...filters, 
                            tuition: {...filters.tuition, min: e.target.value}
                          })}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                          type="number"
                          placeholder="Max"
                          value={filters.tuition.max}
                          onChange={(e) => setFilters({
                            ...filters, 
                            tuition: {...filters.tuition, max: e.target.value}
                          })}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    {/* Acompte - mobile optimisé */}
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Acompte (€)
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="number"
                          placeholder="Min"
                          value={filters.deposit.min}
                          onChange={(e) => setFilters({
                            ...filters, 
                            deposit: {...filters.deposit, min: e.target.value}
                          })}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                          type="number"
                          placeholder="Max"
                          value={filters.deposit.max}
                          onChange={(e) => setFilters({
                            ...filters, 
                            deposit: {...filters.deposit, max: e.target.value}
                          })}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Boutons d'action - mobile optimisé */}
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-2 mt-4 sm:mt-6"> {/* ✅ Stack vertical mobile */}
                    <button
                        onClick={() => {
                          // ✅ ANCIEN CODE (incomplet)
                          // setFilters({
                          //   entryLevel: '', grade: '', diplomaType: '', duration: '',
                          //   deposit: { min: '', max: '' }, applicationDate: '',
                          //   tuition: { min: '', max: '' }, alternance: '', city: '',
                          //   domains: [], language: '', rncpLevel: ''
                          // });

                          // ✅ NOUVEAU CODE (complet)
                          // 1. Réinitialiser TOUS les filtres
                          setFilters({
                            entryLevel: '', 
                            grade: '', 
                            diplomaType: '', 
                            duration: '',
                            deposit: { min: '', max: '' }, 
                            applicationDate: '',
                            tuition: { min: '', max: '' }, 
                            alternance: '', 
                            city: '',
                            domains: [], 
                            language: '', 
                            rncpLevel: ''
                          });

                          // 2. ✅ RÉINITIALISER les recherches de dropdowns
                          setCitySearch('');
                          setDomainSearch('');

                          // 3. ✅ RÉINITIALISER les sélections de domaines/sous-domaines
                          setSelectedDomain(null);
                          setSelectedSubdomains([]);
                          setSelectedDomainFilters(new Set());
                          setSelectedSubdomainFilters(new Set());

                          // 4. ✅ RÉINITIALISER la recherche textuelle
                          setSearchQuery('');
                          setSuggestions([]);
                          setShowSuggestions(false);

                          // 5. ✅ RÉINITIALISER les résultats et l'affichage
                          setSearchResults([]);
                          setTotalResults(0);
                          setShowResults(false);
                          setCurrentPage(1);

                          // 6. ✅ FERMER le panneau de filtres
                          setShowFilters(false);

                          // 7. ✅ OPTIONNEL : Afficher notification de succès
                          console.log('🔄 Tous les filtres ont été réinitialisés');
                          
                          // Si vous avez le système de notifications :
                          // setToast({
                          //   show: true,
                          //   message: 'Filtres réinitialisés',
                          //   type: 'info'
                          // });
                          if (window.innerWidth <= 768) {
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }
                        }}
                        className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                      >
                        Réinitialiser
                    </button>
                    
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setShowFilters(false);
                          if (!showResults && !searchQuery.trim()) {
                            setShowResults(false);
                          }
                        }}
                        className="flex-1 sm:flex-none px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                      >
                        Fermer filtres
                      </button>
                      <button
                        onClick={() => {
                          console.log('🔵 Appliquer button clicked');
                          setShowResults(true);
                          handleSearch(null, true); // ✅ RESTAURER : forceSearch = true
                        }}
                        className="flex-1 sm:flex-none px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                      >
                        Appliquer les filtres
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </FadeTransition>

            {/* Résultats */}
            <FadeTransition show={showResults}>
              <div className="animate-fade-in" data-results-section>
                  {/* Compteur de résultats */}
                  <div className="mb-6 flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between gap-4">
                    <p className="text-slate-600 text-sm text-center sm:text-left">
                      {totalResults} formation{totalResults > 1 ? 's' : ''} trouvée{totalResults > 1 ? 's' : ''}
                      {searchQuery && (
                        <span> pour "<strong>{searchQuery}</strong>"</span>
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
                          {totalResults === 0 ? 'Aucune formation trouvée' : 'Chargement...'}
                        </h3>
                        <p className="text-gray-600 mb-4">
                          {selectedSubdomainFilters.size > 0 || selectedSubdomains.length > 0 ? 
                            'Aucune formation ne correspond à vos critères dans les domaines sélectionnés.' :
                            'Aucune formation ne correspond à vos critères. Essayez de modifier vos filtres.'
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
                            Voir toutes les formations
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
                            Nouvelle recherche
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
              <div className="text-blue-200">Formations</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-400 mb-2">{globalStats.total_schools.toLocaleString()}+</div>
              <div className="text-blue-200">Écoles</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-400 mb-2">95%</div>
              <div className="text-blue-200">Taux de satisfaction</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-400 mb-2">24/7</div>
              <div className="text-blue-200">Support disponible</div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
    </>
  );
};

export default HomePage;
