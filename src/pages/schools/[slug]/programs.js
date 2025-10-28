// src/pages/schools/[slug]/programs.js - Page listant tous les programmes d'une école (mise à jour API)

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Footer from '../../../components/Footer';
import NavBar from '../../../components/NavBar';
import { useRouter } from 'next/router';
import { Search, Filter, MapPin, Clock, Euro, Users, GraduationCap, Briefcase, Award, ChevronLeft, SortAsc, SortDesc, Grid, List, ExternalLink } from 'lucide-react';
import PrivateSchoolApi from '../../../store/apis/privateSchoolApi';
import ProgramApi from '../../../store/apis/programApi';
import SubdomainApi from '../../../store/apis/subdomainApi';
import OptimizedImage from '../../../components/OptimizedImage';
import RocketLoader from '../../../components/ui/RocketLoader';
//import { trackSchoolProgramsView } from '../../../lib/gtag';

const SchoolProgramsPage = ({ school, programs, error }) => {
  const router = useRouter();
  const locale = router.locale || 'fr';
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGrade, setFilterGrade] = useState('');
  const [filterDuration, setFilterDuration] = useState('');
  const [filterAlternance, setFilterAlternance] = useState('');
  const [sortBy, setSortBy] = useState('title');
  const [sortOrder, setSortOrder] = useState('asc');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' ou 'list'
  
  // NOUVEAUX ÉTATS pour les sous-domaines depuis l'API
  const [subdomains, setSubdomains] = useState([]);
  const [subdomainsLoaded, setSubdomainsLoaded] = useState(false);

  // NOUVEAU : Tracking de la vue de l'école
  // useEffect(() => {
  //   if (school) {
  //     trackSchoolProgramsView("SchoolProgramsPage", school.name);
  //   }
  // }, [school]);

  // Charger les sous-domaines depuis l'API
  useEffect(() => {
    const loadSubdomains = async () => {
      try {
        const response = await SubdomainApi.getAllSubdomains(locale);
        if (response.success) {
          setSubdomains(response.data);
        }
      } catch (error) {
        console.error('Erreur lors du chargement des sous-domaines:', error);
      } finally {
        setSubdomainsLoaded(true);
      }
    };

    loadSubdomains();
  }, []);

  // Fonction pour récupérer les noms des sous-domaines depuis l'API
  const getSubdomainNames = (subdomainIds) => {
    if (!subdomainsLoaded || !subdomainIds || subdomainIds.length === 0) {
      return [];
    }

    const validIds = subdomainIds.filter(id => id && id.trim());
    return validIds.map(id => {
      const subdomain = subdomains.find(s => s.id === id);
      return subdomain ? subdomain.name : id;
    });
  };

  // Gérer le cas d'erreur
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="text-center max-w-md">
          <h1 className="text-xl font-bold text-gray-900 mb-4">École non trouvée</h1>
          <p className="text-gray-600 mb-6 text-sm">{error}</p>
          <Link href="/schools" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
            Retour aux écoles
          </Link>
        </div>
      </div>
    );
  }

  // Loading state
  if (router.isFallback) {
    return (
      // <div className="min-h-screen flex items-center justify-center p-4">
      //   <div className="text-center">
      //     <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
      //     <p className="mt-4 text-gray-600 text-sm">Chargement...</p>
      //   </div>
      // </div>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center">
        <RocketLoader />
      </div>
    );
  }

  // Filtrage et tri des programmes
  const filteredAndSortedPrograms = programs
    .filter(program => {
      const matchesSearch = program.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           program.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           program.skills_acquired?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesGrade = !filterGrade || program.grade === filterGrade;
      const matchesDuration = !filterDuration || program.fi_school_duration === filterDuration;
      const matchesAlternance = !filterAlternance || 
                               (filterAlternance === 'yes' && program.alternance_possible) ||
                               (filterAlternance === 'no' && !program.alternance_possible);
      
      return matchesSearch && matchesGrade && matchesDuration && matchesAlternance;
    })
    .sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'title':
          aValue = a.title.toLowerCase();
          bValue = b.title.toLowerCase();
          break;
        case 'tuition':
          aValue = parseInt(a.tuition?.replace(/[^\d]/g, '') || '0');
          bValue = parseInt(b.tuition?.replace(/[^\d]/g, '') || '0');
          break;
        case 'duration':
          aValue = a.fi_school_duration;
          bValue = b.fi_school_duration;
          break;
        case 'grade':
          aValue = a.grade;
          bValue = b.grade;
          break;
        default:
          return 0;
      }
      
      if (sortOrder === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

  // Obtenir les valeurs uniques pour les filtres
  const uniqueGrades = [...new Set(programs.map(p => p.grade).filter(Boolean))];
  const uniqueDurations = [...new Set(programs.map(p => p.fi_school_duration).filter(Boolean))];

  // Fonction pour changer le tri
  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  // Carte programme (mise à jour pour utiliser l'API)
  const ProgramCard = ({ program, isListView = false }) => {
    const programUrl = program.full_url_path || `/schools/${program.school_slug}/programs/${program.slug}`;
    
    if (isListView) {
      return (
        <Link href={programUrl} target="_blank" rel="noopener noreferrer">
          <div className="bg-white rounded-lg shadow-md border border-slate-200 hover:shadow-lg transition-all duration-200 cursor-pointer group p-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-bold text-slate-800 text-lg leading-tight group-hover:text-blue-600 transition-colors">
                    {program.title}
                  </h3>
                  <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-blue-600" />
                </div>
                
                <p className="text-slate-600 text-sm line-clamp-2 mb-3">
                  {program.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                    {program.grade}
                  </span>
                  <span className="bg-slate-100 text-slate-700 px-2 py-1 rounded-full text-xs">
                    {program.fi_school_duration}
                  </span>
                  <span className="bg-slate-100 text-slate-700 px-2 py-1 rounded-full text-xs">
                    {program.intake}
                  </span>
                  {program.alternance_possible && (
                    <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs font-medium">
                      Alternance
                    </span>
                  )}
                </div>
                
                {/* Sous-domaines avec API */}
                <div className="flex flex-wrap gap-1">
                  {getSubdomainNames([program.sub_domain1, program.sub_domain2, program.sub_domain3].filter(Boolean)).slice(0, 4).map((subdomain, index) => (
                    <span key={index} className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs">
                      {subdomain}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="text-right flex-shrink-0">
                <div className="text-xl font-bold text-blue-600 mb-1">{program.tuition}</div>
                <div className="text-xs text-slate-500 mb-2">frais annuel</div>
                {program.intake_capacity && (
                  <div className="text-sm text-slate-600">
                    {program.intake_capacity} places
                  </div>
                )}
              </div>
            </div>
          </div>
        </Link>
      );
    }

    // Vue grille
    return (
      <Link href={programUrl} target="_blank" rel="noopener noreferrer">
        <div className="bg-white rounded-xl shadow-md border border-slate-200 hover:shadow-lg transition-all duration-200 cursor-pointer group p-6 h-full flex flex-col">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-bold text-slate-800 text-lg leading-tight group-hover:text-blue-600 transition-colors line-clamp-2">
                  {program.title}
                </h3>
                <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-blue-600 flex-shrink-0" />
              </div>
              
              <div className="flex flex-wrap gap-1 mb-2">
                <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                  {program.grade}
                </span>
                {program.alternance_possible && (
                  <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs font-medium">
                    Alternance
                  </span>
                )}
                {program.rncp_level && (
                  <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded-full text-xs font-medium">
                    RNCP {program.rncp_level}
                  </span>
                )}
              </div>
            </div>
          </div>

          <p className="text-slate-600 text-sm line-clamp-3 mb-4 flex-grow">
            {program.description}
          </p>

          <div className="space-y-3 mt-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-500">
                <Clock className="w-4 h-4" />
                <span className="text-sm">{program.fi_school_duration}</span>
              </div>
              {program.intake_capacity && (
                <div className="flex items-center gap-2 text-slate-500">
                  <Users className="w-4 h-4" />
                  <span className="text-sm">{program.intake_capacity}</span>
                </div>
              )}
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-500">
                <GraduationCap className="w-4 h-4" />
                <span className="text-sm">{program.intake}</span>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-blue-600">{program.tuition}</div>
                <div className="text-xs text-slate-500">frais annuels</div>
              </div>
            </div>
          </div>

          {/* Sous-domaines avec API */}
          <div className="mt-4 pt-4 border-t border-slate-100">
            <div className="flex flex-wrap gap-1">
              {getSubdomainNames([program.sub_domain1, program.sub_domain2, program.sub_domain3].filter(Boolean)).slice(0, 3).map((subdomain, index) => (
                <span key={index} className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs">
                  {subdomain}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Link>
    );
  };

  return (
    <>
      <Head>
        <title>Programmes de formation - {school.name} | Wendogo</title>
        <meta name="description" content={`Découvrez tous les programmes de formation proposés par ${school.name}. ${programs.length} formations disponibles avec reconnaissance internationale.`} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://wendogo.com/schools/${school.slug}/programs`} />
        <meta property="og:title" content={`Programmes de formation - ${school.name}`} />
        <meta property="og:description" content={`${programs.length} formations disponibles chez ${school.name}`} />
        <meta property="og:image" content={school.cover_page_path} />

        <link rel="canonical" href={`https://wendogo.com/schools/${school.slug}/programs`} />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
          <div className="px-4 sm:px-6 lg:px-8 py-6">
            <div className="max-w-7xl mx-auto">
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-blue-100 mb-4 text-sm">
                <Link href="/schools" className="hover:text-white">
                  Écoles
                </Link>
                <span>/</span>
                <Link href={`/schools/${school.slug}`} className="hover:text-white">
                  {school.name.length > 30 ? school.name.substring(0, 30) + '...' : school.name}
                </Link>
                <span>/</span>
                <span className="text-white font-medium">Programmes</span>
              </div>

              {/* Header Content */}
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <Link href={`/schools/${school.slug}`} className="hover:text-blue-200">
                      <ChevronLeft className="w-5 h-5" />
                    </Link>
                    <div>
                      <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold">
                        Programmes de {school.name}
                      </h1>
                      <p className="text-blue-100 text-sm sm:text-base mt-1">
                        {programs.length} formation{programs.length > 1 ? 's' : ''} disponible{programs.length > 1 ? 's' : ''}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg w-fit mx-auto sm:mx-0">
                  <div className="flex items-center justify-center">
                    <OptimizedImage 
                      src={school.logo_path} 
                      alt={"Logo " + school.name}
                      className="h-12 w-auto object-contain"
                      width={120}
                      height={80}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filtres et recherche */}
        <div className="bg-white border-b border-slate-200 sticky top-0 z-20">
          <div className="px-4 sm:px-6 lg:px-8 py-4">
            <div className="max-w-7xl mx-auto">
              {/* Barre de recherche */}
              <div className="flex flex-col lg:flex-row gap-4 mb-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Rechercher une formation..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>
                
                {/* Mode d'affichage */}
                <div className="flex items-center gap-2 bg-slate-100 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-md transition-colors ${
                      viewMode === 'grid' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600 hover:text-slate-800'
                    }`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-md transition-colors ${
                      viewMode === 'list' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600 hover:text-slate-800'
                    }`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Filtres */}
              <div className="flex flex-wrap gap-3 items-center">
                <select
                  value={filterGrade}
                  onChange={(e) => setFilterGrade(e.target.value)}
                  className="px-3 py-1.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Tous les diplômes</option>
                  {uniqueGrades.map(grade => (
                    <option key={grade} value={grade}>{grade}</option>
                  ))}
                </select>

                <select
                  value={filterDuration}
                  onChange={(e) => setFilterDuration(e.target.value)}
                  className="px-3 py-1.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Toutes les durées</option>
                  {uniqueDurations.map(duration => (
                    <option key={duration} value={duration}>{duration}</option>
                  ))}
                </select>

                <select
                  value={filterAlternance}
                  onChange={(e) => setFilterAlternance(e.target.value)}
                  className="px-3 py-1.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Tous</option>
                  <option value="yes">Avec alternance</option>
                  <option value="no">Sans alternance</option>
                </select>

                {/* Tri */}
                <div className="flex items-center gap-2 ml-auto">
                  <span className="text-sm text-slate-600">Trier par:</span>
                  <button
                    onClick={() => handleSort('title')}
                    className={`flex items-center gap-1 px-2 py-1 rounded text-sm ${
                      sortBy === 'title' ? 'text-blue-600 bg-blue-50' : 'text-slate-600 hover:text-slate-800'
                    }`}
                  >
                    Nom
                    {sortBy === 'title' && (
                      sortOrder === 'asc' ? <SortAsc className="w-3 h-3" /> : <SortDesc className="w-3 h-3" />
                    )}
                  </button>
                  <button
                    onClick={() => handleSort('tuition')}
                    className={`flex items-center gap-1 px-2 py-1 rounded text-sm ${
                      sortBy === 'tuition' ? 'text-blue-600 bg-blue-50' : 'text-slate-600 hover:text-slate-800'
                    }`}
                  >
                    Prix
                    {sortBy === 'tuition' && (
                      sortOrder === 'asc' ? <SortAsc className="w-3 h-3" /> : <SortDesc className="w-3 h-3" />
                    )}
                  </button>
                  <button
                    onClick={() => handleSort('duration')}
                    className={`flex items-center gap-1 px-2 py-1 rounded text-sm ${
                      sortBy === 'duration' ? 'text-blue-600 bg-blue-50' : 'text-slate-600 hover:text-slate-800'
                    }`}
                  >
                    Durée
                    {sortBy === 'duration' && (
                      sortOrder === 'asc' ? <SortAsc className="w-3 h-3" /> : <SortDesc className="w-3 h-3" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Indicateur de chargement des sous-domaines */}
        {!subdomainsLoaded && (
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-blue-700">
                  Chargement des spécialisations...
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Résultats */}
        <div className="px-4 sm:px-6 lg:px-8 py-6">
          <div className="max-w-7xl mx-auto">
            {/* Compteur de résultats */}
            <div className="mb-6">
              <p className="text-slate-600 text-sm">
                {filteredAndSortedPrograms.length} formation{filteredAndSortedPrograms.length > 1 ? 's' : ''} trouvée{filteredAndSortedPrograms.length > 1 ? 's' : ''}
                {searchTerm && (
                  <span> pour "<strong>{searchTerm}</strong>"</span>
                )}
              </p>
            </div>

            {/* Liste des programmes */}
            {filteredAndSortedPrograms.length === 0 ? (
              <div className="text-center py-12">
                <GraduationCap className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-600 mb-2">Aucune formation trouvée</h3>
                <p className="text-slate-500 mb-4">Essayez de modifier vos critères de recherche</p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setFilterGrade('');
                    setFilterDuration('');
                    setFilterAlternance('');
                  }}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                >
                  Réinitialiser les filtres
                </button>
              </div>
            ) : (
              <div className={viewMode === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
                : 'space-y-4'
              }>
                {filteredAndSortedPrograms.map((program) => (
                  <ProgramCard 
                    key={program.id} 
                    program={program} 
                    isListView={viewMode === 'list'} 
                  />
                ))}
              </div>
            )}

            {/* Retour vers l'école */}
            <div className="mt-12 text-center">
              <Link href={`/schools/${school.slug}`}>
                <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                  ← Retour à {school.name}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// Génération statique des pages - MISE À JOUR POUR API

// Génération statique des pages - MISE À JOUR POUR API
export async function getStaticPaths() {
  try {
    const response = await PrivateSchoolApi.getAllSchoolSlugs();
    
    if (!response.success) {
      return {
        paths: [],
        fallback: 'blocking'
      };
    }

    // ✅ Générer les paths pour toutes les locales
    const locales = ['fr', 'en'];
    const paths = [];
    
    response.data.forEach((slug) => {
      locales.forEach((locale) => {
        paths.push({
          params: { slug },
          locale, // ✅ Ajouter la locale
        });
      });
    });

    return {
      paths,
      fallback: 'blocking'
    };
  } catch (error) {
    console.error('Erreur lors de la génération des paths:', error);
    return {
      paths: [],
      fallback: 'blocking'
    };
  }
}

const sanitizeData = (obj) => {
  if (obj === null || obj === undefined) return null;
  if (Array.isArray(obj)) return obj.map(sanitizeData);
  if (typeof obj !== 'object') return obj;
  
  const cleaned = {};
  for (const key in obj) {
    const value = obj[key];
    if (value === undefined) {
      cleaned[key] = null;
    } else if (value && typeof value === 'object') {
      cleaned[key] = sanitizeData(value);
    } else {
      cleaned[key] = value;
    }
  }
  return cleaned;
};
// }

export async function getStaticProps({ params, locale = 'fr' }) {
  // ✅ DÉPLACER L'IMPORT ICI, AU DÉBUT DE LA FONCTION
  const { serverSideTranslations } = await import('next-i18next/serverSideTranslations');
  
  try {
    const { slug } = params;

    console.log('getStaticProps called with:', { slug, locale });

    // Récupérer l'école
    const schoolResponse = await PrivateSchoolApi.getSchoolBySlug(slug, locale);
    
    if (!schoolResponse.success || !schoolResponse.data) {
      console.log('School not found:', slug);
      return { notFound: true };
    }

    const school = schoolResponse.data;

    // Récupérer les programmes de l'école avec la locale
    const programsResponse = await ProgramApi.getProgramsBySchoolId(school.id, locale);
    const programs = programsResponse.success ? programsResponse.data : [];

    // ✅ Nettoyer toutes les données
    const cleanedSchool = sanitizeData(school);
    const cleanedPrograms = sanitizeData(programs);

    return {
      props: {
        school: cleanedSchool,
        programs: cleanedPrograms,
        ...(await serverSideTranslations(locale, ['authModal', 'common', 'programs'])),
      },
      revalidate: 86400 // 24 heures
    };
  } catch (error) {
    console.error('Error in getStaticProps:', error);
    // ✅ MAINTENANT serverSideTranslations EST ACCESSIBLE ICI
    return {
      props: {
        error: 'Erreur lors du chargement des données',
        school: null,
        programs: [],
        ...(await serverSideTranslations(locale, ['authModal', 'common', 'programs'])),
      },
      revalidate: 60
    };
  }
}
export default SchoolProgramsPage;
