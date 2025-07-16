// src/pages/programs/[slug].js - Version mise à jour avec API Flask

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Footer from '../../components/Footer';
import NavBar from '../../components/NavBar';
import { Clock, MapPin, Users, GraduationCap, Euro, Calendar, Award, Briefcase, Target, Globe, ChevronDown, ChevronUp, Star, CreditCard, CheckCircle, AlertCircle, Banknote, Phone, Mail, Menu, X, Building, BookOpen, TrendingUp } from 'lucide-react';
import ProgramApi from '../../store/apis/programApi';
import PrivateSchoolApi from '../../store/apis/privateSchoolApi';
import SubdomainApi from '../../store/apis/subdomainApi';
import OptimizedImage from '../../components/OptimizedImage';
import { getSubdomainNamesSync } from '../../utils/apiUtils';
import { LinkWithLoading } from '../../components/ui';
import FavoriteButton from '../../components/FavoriteButton';
import RocketLoader from '../../components/ui/RocketLoader';
import { optimizedApi } from '../../utils/cacheUtils';
import { trackProgramView } from '../../lib/gtag';

const ProgramPage = ({ program, school, similarPrograms, error }) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showAllPartners, setShowAllPartners] = useState(false);
  const [selectedAdmissionYear, setSelectedAdmissionYear] = useState('y1');
  const [subdomains, setSubdomains] = useState([]);
  const [subdomainsLoaded, setSubdomainsLoaded] = useState(false);

  console.log('Program data:', program);
  console.log('School data:', school);

  // ✅ NOUVEAU : Tracking de la vue de l'école
  useEffect(() => {
    if (program && school) {
      trackProgramView(program.slug, school.name);
    }
  }, [program, school]);

  useEffect(() => {
    const loadSubdomains = async () => {
      try {
        const response = await SubdomainApi.getAllSubdomains();
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

  // Gérer le cas d'erreur
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="text-center max-w-md">
          <h1 className="text-xl font-bold text-gray-900 mb-4">Programme non trouvé</h1>
          <p className="text-gray-600 mb-6 text-sm">{error}</p>
          <LinkWithLoading href="/programs" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
            Retour aux programmes
          </LinkWithLoading>
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

  // Génération du JSON-LD pour le SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": program.title,
    "description": program.description,
    "provider": {
      "@type": "EducationalOrganization",
      "name": school.name,
      "url": school && school.url ? school.url : undefined
    },
    "offers": {
      "@type": "Offer",
      "category": "Education",
      "price": program.tuition?.replace(/[^\d]/g, '') || "0",
      "priceCurrency": "EUR"
    },
    "courseMode": "full-time",
    "educationalCredentialAwarded": program.grade,
    "timeRequired": program.fi_school_duration,
    "applicationStartDate": program.application_date,
    "applicationDeadline": program.application_date,
    "startDate": program.intake,
    "teaches": program.skills_acquired ? program.skills_acquired.split(', ') : [],
    "occupationalCategory": program.careers ? program.careers.split(', ') : []
  };

  // Informations financières clés
  const financialHighlights = [
    {
      icon: Euro,
      title: "Frais annuel",
      value: program.tuition,
      subtitle: program.tuition_comment,
      color: "from-blue-500 to-indigo-600"
    },
    {
      icon: CreditCard,
      title: "Acompte",
      value: program.first_deposit,
      subtitle: program.first_deposit_comment,
      color: "from-green-500 to-emerald-600"
    },
    {
      icon: Briefcase,
      title: "Alternance",
      value: program.alternance_possible ? "✓" : "✗",
      subtitle: program.ca_school_duration || (program.alternance_possible ? "Possible" : "Non disponible"),
      color: program.alternance_possible ? "from-purple-500 to-violet-600" : "from-gray-400 to-gray-500"
    }
  ];

  // Dates importantes
  const importantDates = [
    {
      icon: Calendar,
      title: "Candidatures",
      date: program.application_date,
      subtitle: program.application_date_comment,
      status: "urgent"
    },
    {
      icon: GraduationCap,
      title: "Rentrée",
      date: program.intake,
      subtitle: program.intake_comment,
      status: "info"
    }
  ];

  // Certifications et reconnaissances
  const certifications = [
    program.state_certification_type,
    program.state_certification_type_complement,
    program.state_certification_type_complement2
  ].filter(Boolean);

  // Fonction pour récupérer les critères d'admission par année
  const getAdmissionCriteria = () => {
    const criteria = [];
    
    for (let i = 1; i <= 5; i++) {
      const level = program[`y${i}_required_level`];
      if (level) {
        criteria.push({
          year: i,
          level: level,
          degree: program[`required_degree${i}`] || program[`y${i}_required_degree`],
          method: program[`y${i}_admission_details`] || program[`application_details_for_year_${i}`],
          applicationDate: program[`y${i}_application_date`],
          language: program[`y${i}_teaching_language_with_required_level`] || program[`teaching_language_with_required_level_for_year_${i}`],
          languageTech: program[`language_tech_level${i}`]
        });
      }
    }
    
    return criteria;
  };

  const admissionCriteria = getAdmissionCriteria();

  function splitSkills(str) {
    if (!str) return [];
    const result = [];
    let current = '';
    let parenLevel = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str[i];
      if (char === '(') {
        parenLevel++;
        current += char;
      } else if (char === ')') {
        parenLevel = Math.max(0, parenLevel - 1);
        current += char;
      } else if (char === ',' && parenLevel === 0) {
        result.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    if (current.trim()) result.push(current.trim().replace(/\./g, ''));
    return result;
  }
  // Fonction pour afficher les entreprises partenaires
  const PartnersSection = () => {
    if (!program.partner_companies) return null;
    
    // Split on ', ' except when inside parentheses
    const partners = [];
    let current = '';
    let parenLevel = 0;
    const str = program.partner_companies;
    for (let i = 0; i < str.length; i++) {
      const char = str[i];
      if (char === '(') parenLevel++;
      if (char === ')') parenLevel = Math.max(0, parenLevel - 1);
      // Check for ', ' only if not inside parentheses
      if (char === ',' && str[i + 1] === ' ' && parenLevel === 0) {
      partners.push(current.trim().replace(/\./g, ''));
      current = '';
      i++; // skip the space after comma
      } else {
      current += char;
      }
    }
    if (current.trim()) partners.push(current.trim().replace(/\./g, ''));
    const displayedPartners = showAllPartners ? partners : partners.slice(0, 10);
    
    return (
      <div>
        <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-3">Entreprises partenaires</h3>
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-4 border border-indigo-200">
          <div className="flex flex-wrap gap-2 mb-3">
            {displayedPartners.map((company, index) => (
              <span key={index} className="bg-white px-2 py-1 rounded-full text-xs font-medium text-indigo-700 border border-indigo-200">
                {company.trim()}
              </span>
            ))}
          </div>
          
          {partners.length > 15 && (
            <div className="text-center">
              <button
                onClick={() => setShowAllPartners(!showAllPartners)}
                className="text-indigo-600 hover:text-indigo-700 text-sm font-medium bg-white px-3 py-1 rounded-lg border border-indigo-200 hover:bg-indigo-50 transition-colors"
              >
                {showAllPartners ? 'Voir moins' : `Voir les ${partners.length - 10} autres entreprises`}
              </button>
            </div>
          )}
          
          <div className="mt-3 text-xs text-indigo-600">
            <strong>{partners.length} entreprises partenaires</strong> pour stages, alternance et recrutement
          </div>
        </div>
      </div>
    );
  };

  const tabs = [
    { id: 'overview', label: 'Aperçu', icon: Target },
    { id: 'finances', label: 'Prix', icon: Euro },
    { id: 'admission', label: 'Admission', icon: GraduationCap },
    { id: 'career', label: 'Débouchés', icon: Briefcase }
  ];

  return (
    <>
      <Head>
        <title>{program.seo_title || program.title + " - " + school.name + " | Wendogo"}</title>
        <meta name="description" content={program.seo_description || program.description} />
        <meta name="keywords" content={program.seo_keywords || program.title + ", " + school.name + ", " + program.grade} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://wendogo.com${program.full_url_path}`} />
        <meta property="og:title" content={program.seo_title || program.title} />
        <meta property="og:description" content={program.seo_description || program.description} />
        <meta property="og:image" content={school && school.cover_page_path ? school.cover_page_path : ""} />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={`https://wendogo.com${program.full_url_path}`} />
        <meta property="twitter:title" content={program.seo_title || program.title} />
        <meta property="twitter:description" content={program.seo_description || program.description} />
        <meta property="twitter:image" content={school && school.cover_page_path ? school.cover_page_path : ""} />

        <link rel="canonical" href={`https://wendogo.com${program.full_url_path}`} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>
      <NavBar 
        variant="simple"
        // showDropdowns={false}
        // showAllMenuItems={false}
      />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">
        {/* Header Mobile-First */}
        <div className="bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          
          <div className="relative px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-12">
            <div className="max-w-7xl mx-auto">
              {/* Breadcrumb Mobile */}
              <div className="flex items-center gap-2 text-blue-100 mb-4 text-sm">
                <LinkWithLoading href={"/schools/" + school.slug} className="hover:text-white truncate">
                  {school.name.length > 45 ? school.name.substring(0, 45) + '...' : school.name}
                </LinkWithLoading>
                <span>/</span>
                <span className="text-white font-medium">Formation</span>
              </div>

              {/* Contenu Header Mobile */}
              <div className="space-y-3 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-8">
                <div className="lg:col-span-3">
                  {/* Badges Mobile - Scroll horizontal */}
                  <div className="flex gap-2 mb-4 overflow-x-auto pb-2 scrollbar-hide">
                    <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap">
                      {program.grade}
                    </span>
                    {certifications.slice(0, 4).map((cert, index) => (
                      <span key={index} className="bg-green-500/20 backdrop-blur-sm text-green-100 px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap">
                        {cert}
                      </span>
                    ))}
                    {program.alternance_possible && (
                      <span className="bg-purple-500/20 backdrop-blur-sm text-purple-100 px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap">
                        Alternance possible
                      </span>
                    )}
                    {program.rncp_level && (
                      <span className="bg-orange-500/20 backdrop-blur-sm text-orange-100 px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap">
                        RNCP Niveau {program.rncp_level}
                      </span>
                    )}
                  </div>

                  {/* Titre Mobile */}
                  <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-3 leading-tight">
                    {program.title}
                  </h1>
                  
                  {/* École Mobile */}
                  <div className="flex items-center gap-2 text-blue-100 text-sm sm:text-base mb-4">
                    <MapPin className="w-4 h-4 flex-shrink-0" />
                    <LinkWithLoading href={"/schools/" + school.slug} className="hover:text-white truncate">
                      {school.name}
                    </LinkWithLoading>
                  </div>

                  {/* Sous-domaines */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {(() => {
                      // ✅ Utiliser getSubdomainNamesSync comme dans index.js
                      const subdomainIds = [
                        program.sub_domain1, 
                        program.sub_domain2, 
                        program.sub_domain3
                      ].filter(Boolean);
                      
                      if (subdomainIds.length === 0) return null;
                      
                      // ✅ Récupérer les vrais noms depuis l'API
                      const subdomainNames = subdomainsLoaded 
                        ? getSubdomainNamesSync(subdomainIds, subdomains)
                        : subdomainIds; // Fallback vers IDs si pas encore chargé
                      
                      return subdomainNames.map((subdomainName, index) => (
                        <span 
                          key={index} 
                          className="bg-blue-500/20 backdrop-blur-sm text-blue-100 px-2 py-1 rounded text-xs"
                        >
                          {subdomainName}
                        </span>
                      ));
                    })()}
                  </div>
                </div>

                {/* CTA Mobile */}
                {/* <div className="w-full lg:w-auto">
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                    <div className="text-center">
                      <div className="text-xs text-blue-100 mb-1">Frais de formation</div>
                      <div className="text-2xl sm:text-3xl font-bold text-white mb-2">{program.tuition}</div>
                      <div className="text-blue-100 text-xs mb-4">Acompte: {program.first_deposit}</div>
                      <button className="w-full bg-white text-blue-600 font-semibold py-2.5 px-4 rounded-lg hover:bg-blue-50 transition-all duration-300 text-sm">
                        Candidater
                      </button>
                      <div className="text-xs text-blue-200 mt-2">
                        Limite: {program.application_date}
                      </div>
                    </div>
                  </div>
                </div> */}
                  {/* <FavoriteButton 
                    programId={program.id} 
                    className="absolute top-4 right-4 z-10"
                    size="w-6 h-6"
                  /> */}
                <div className="flex-shrink-0">
                  <FavoriteButton 
                    programId={program.id} 
                    className="absolute top-4 right-4 z-10"
                    size="w-6 h-6"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Points forts financiers Mobile */}
        <div className="px-4 sm:px-6 lg:px-8 -mt-6 relative z-10">
          <div className="max-w-7xl mx-auto">
            {(() => {
              // ✅ Filtrer d'abord les highlights valides
              const validHighlights = financialHighlights.filter(highlight => 
                highlight.value && highlight.value !== '✗'
              );
              
              // ✅ Adapter la grille selon le nombre d'éléments
              const getGridClass = (count) => {
                if (count === 1) return 'grid grid-cols-1 max-w-md mx-auto gap-4';
                if (count === 2) return 'grid grid-cols-1 sm:grid-cols-2 max-w-2xl mx-auto gap-3 sm:gap-4';
                return 'grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 lg:gap-6';
              };
              
              if (validHighlights.length === 0) return null; // Pas d'éléments à afficher
              
              return (
                <div className={getGridClass(validHighlights.length)}>
                  {validHighlights.map((highlight, index) => {
                    const IconComponent = highlight.icon;
                    return (
                      <div key={index} className="bg-white rounded-xl p-4 shadow-lg border border-slate-100">
                        <div className="flex items-center gap-3">
                          <div className={"bg-gradient-to-br " + highlight.color + " p-2 sm:p-3 rounded-lg shadow-md flex-shrink-0"}>
                            <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <h3 className="font-bold text-slate-800 text-sm sm:text-base">{highlight.title}</h3>
                            <div className="text-lg sm:text-xl font-bold text-slate-800 truncate">{highlight.value}</div>
                            {highlight.subtitle && (
                              <div className="text-xs text-slate-500 mt-1 line-clamp-2" title={highlight.subtitle}>
                                {highlight.subtitle.length > 50 ? highlight.subtitle.substring(0, 50) + '...' : highlight.subtitle}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })()}
          </div>
        </div>

        {/* Dates importantes Mobile */}
        <div className="px-4 sm:px-6 lg:px-8 py-6">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {importantDates.map((date, index) => {
                const IconComponent = date.icon;
                const isUrgent = date.status === 'urgent';
                return (
                  <div key={index} className={"rounded-xl p-4 shadow-md border-2 " + (
                    isUrgent 
                      ? 'bg-gradient-to-r from-red-50 to-orange-50 border-red-200' 
                      : 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200'
                  )}>
                    <div className="flex items-center gap-3 mb-2">
                      <div className={"p-2 rounded-lg shadow-md flex-shrink-0 " + (
                        isUrgent 
                          ? 'bg-gradient-to-br from-red-500 to-orange-500' 
                          : 'bg-gradient-to-br from-blue-500 to-indigo-500'
                      )}>
                        <IconComponent className="w-4 h-4 text-white" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className={"font-bold text-sm " + (isUrgent ? 'text-red-800' : 'text-blue-800')}>
                          {date.title}
                        </h3>
                        <div className={"text-lg font-bold " + (isUrgent ? 'text-red-700' : 'text-blue-700')}>
                          {date.date}
                        </div>
                      </div>
                    </div>
                    {date.subtitle && (
                      <div className={"text-xs " + (isUrgent ? 'text-red-600' : 'text-blue-600')}>
                        {date.subtitle.length > 50  ? date.subtitle.substring(0, 50) + '...' : date.subtitle}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Navigation Tabs Mobile - Sticky */}
        <div className="sticky top-0 z-30 bg-white shadow-md">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="flex overflow-x-auto scrollbar-hide border-b border-slate-200">
                {tabs.map((tab) => {
                  const IconComponent = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2 py-3 px-4 font-semibold transition-all duration-300 whitespace-nowrap min-w-max ${
                        isActive
                          ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                          : 'text-slate-600 hover:text-slate-800'
                      }`}
                    >
                      <IconComponent className="w-4 h-4" />
                      <span className="text-sm">{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Contenu principal Mobile */}
        <div className="px-4 sm:px-6 lg:px-8 py-6">
          <div className="max-w-7xl mx-auto">
            <div className="space-y-6 lg:grid lg:grid-cols-3 lg:gap-8 lg:space-y-0">
              {/* Contenu principal */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden">
                  <div className="p-4 sm:p-6 lg:p-8">
                    {activeTab === 'overview' && (
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-3">A propos du programme</h3>
                          <p className="text-slate-600 leading-relaxed text-sm sm:text-base mb-4">
                            {program.description}
                          </p>
                          {program.special_comment && (
                            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-3 sm:p-4 border border-blue-200">
                              <p className="text-blue-700 font-medium text-sm">💡 {program.special_comment}</p>
                            </div>
                          )}
                        </div>
                        {program.skills_acquired && 
                          <div>
                            <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-3">Compétences acquises</h3>
                            <div className="flex flex-wrap gap-2">
                              {program.skills_acquired && (
                                <>
                                    {splitSkills(program.skills_acquired).slice(0, 4).map((skill, index) => (
                                      <span key={index} className="bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                                        {skill.charAt(0).toUpperCase() + skill.slice(1)}
                                      </span>
                                    ))}
                                </>
                              )}
                            </div>
                          </div>}

                        <div>
                          <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-3">Certifications et reconnaissances</h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {certifications.map((cert, index) => (
                              <div key={index} className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-3 border border-green-200">
                                <div className="flex items-center gap-2">
                                  <Award className="w-4 h-4 text-green-600 flex-shrink-0" />
                                  <span className="font-medium text-green-800 text-sm">{cert}</span>
                                </div>
                              </div>
                            ))}
                            {program.rncp_level && (
                              <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-3 border border-orange-200">
                                <div className="flex items-center gap-2">
                                  <Award className="w-4 h-4 text-orange-600 flex-shrink-0" />
                                  <span className="font-medium text-orange-800 text-sm">RNCP Niveau {program.rncp_level}</span>
                                </div>
                                {program.rncp_certifier && (
                                  <div className="text-xs text-orange-700 mt-1">Certifié par {program.rncp_certifier}</div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                        {program.curriculum_highlights && (
                         <div>
                            <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-3">Points forts du programme</h3>
                            <div className="grid grid-cols-1 gap-2">
                              {(() => {
                              // Split on '-' except when inside parentheses
                              const highlights = [];
                              const str = program.curriculum_highlights;
                              let current = '';
                              let parenLevel = 0;
                              for (let i = 0; i < str.length; i++) {
                                const char = str[i];
                                if (char === '(') parenLevel++;
                                if (char === ')') parenLevel = Math.max(0, parenLevel - 1);
                                if (char === '-' && parenLevel === 0) {
                                highlights.push(current.trim());
                                current = '';
                                } else {
                                current += char;
                                }
                              }
                              if (current.trim()) highlights.push(current.trim());
                              return highlights.map((highlight, index) => (
                                <div key={index} className="flex items-start gap-2">
                                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                                <span className="text-slate-700 text-sm">{highlight.charAt(0).toUpperCase() + highlight.slice(1)}</span>
                                </div>
                              ));
                              })()}
                            </div>
                          </div>
                        )}

                        {program.joint_preparation_with && (
                          <div>
                            <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-3">Partenariats académiques</h3>
                            <div className="bg-gradient-to-r from-purple-50 to-violet-50 rounded-lg p-4 border border-purple-200">
                              <div className="flex flex-wrap gap-2">
                                {program.joint_preparation_with.split('; ').map((partner, index) => (
                                  <span key={index} className="bg-white px-3 py-1 rounded-full text-sm font-medium text-purple-700 border border-purple-200">
                                    {partner.trim()}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {activeTab === 'finances' && (
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-4">Structure des coûts</h3>
                          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
                            <div className="space-y-4">
                              <div>
                                <h4 className="font-semibold text-blue-800 mb-3 text-sm sm:text-base">Frais de formation</h4>
                                <div className="space-y-2 text-sm">
                                  {program.tuition && 
                                  <div className="flex justify-between">
                                    <span className="text-slate-600">Frais annuels</span>
                                    <span className="font-semibold">{program.tuition}</span>
                                  </div>}
                                  {program.fi_school_duration &&  
                                    <div className="flex justify-between">
                                      <span className="text-slate-600">Durée</span>
                                      <span className="font-semibold">{program.fi_school_duration}</span>
                                    </div>}
                                  {program.fi_registration_fee &&                                   <div className="flex justify-between">
                                    <span className="text-slate-600">Frais d'inscription</span>
                                    <span className="font-semibold">{program.fi_registration_fee}</span>
                                  </div>}
                                </div>
                                {program.tuition_comment && (
                                  <div className="mt-3 text-xs text-blue-700 bg-blue-100 rounded p-2">
                                    💡 {program.tuition_comment}
                                  </div>
                                )}
                              </div>
                              
                              {program.first_deposit && program.first_deposit_comment && 
                              <div>
                                <h4 className="font-semibold text-blue-800 mb-3 text-sm sm:text-base">Modalités de paiement</h4>
                                <div className="bg-white rounded-lg p-3 border border-blue-200">
                                  <div className="flex items-center gap-2 mb-1">
                                    <CreditCard className="w-4 h-4 text-green-600" />
                                    <span className="font-semibold text-green-800 text-sm">Premier acompte</span>
                                  </div>
                                  <div className="text-xl font-bold text-green-600">{program.first_deposit}</div>
                                  {program.first_deposit_comment && (
                                    <div className="text-xs text-green-700 mt-1">
                                      {program.first_deposit_comment}
                                    </div>
                                  )}
                                </div>
                              </div>}
                            </div>
                          </div>
                        </div>

                        {program.alternance_possible && (
                          <div>
                            <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-3">Financement par alternance</h3>
                            <div className="bg-gradient-to-r from-purple-50 to-violet-50 rounded-lg p-4 border border-purple-200">
                              <div className="flex items-start gap-3">
                                <div className="bg-gradient-to-br from-purple-500 to-violet-500 p-2 rounded-lg flex-shrink-0">
                                  <Briefcase className="w-5 h-5 text-white" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h4 className="font-bold text-purple-800 mb-2 text-sm sm:text-base">Alternance disponible</h4>
                                  {program.ca_school_duration && (
                                    <div className="text-purple-700 text-sm mb-2">
                                      <strong>Durée:</strong> {program.ca_school_duration}
                                    </div>
                                  )}
                                  <ul className="space-y-2 text-purple-700 text-sm">
                                    <li className="flex items-start gap-2">
                                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                                      <span>Frais de formation pris en charge par l'entreprise</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                                      <span>Rémunération pendant les études</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                                      <span>Expérience professionnelle intégrée</span>
                                    </li>
                                  </ul>
                                  <div className="mt-3 bg-white/50 rounded-lg p-2">
                                    <div className="text-xs font-medium text-purple-800">💡 Avantage financier</div>
                                    <div className="text-xs text-purple-700">L'alternance peut vous faire économiser la totalité des frais de formation !</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {activeTab === 'admission' && (
                      <div className="space-y-6">
                        {program.Success_rate_of_the_program && 
                        <div>
                          <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-3">Performance du programme</h3>
                          <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border border-green-200">
                            { program.Success_rate_of_the_program.includes('%') &&
                            <div className="text-2xl sm:text-3xl font-bold text-green-600 mb-1">
                              {
                                      (() => {
                                        // Find the last '%' and take everything before the character before '%'
                                        const str = program.Success_rate_of_the_program;
                                        const lastPercent = str.lastIndexOf('%');
                                        if (lastPercent !== -1) {
                                        // Find the start of the number/phrase before the last '%'
                                        let end = lastPercent + 1;
                                        // Go backwards to find where the "block" starts (could be a number or phrase)
                                        // But as per your example, just take everything up to the character before '%'
                                        return str.substring(0, end).trim();
                                        }
                                        return str;
                                      })()
                                      }
                            </div>}
                            <div className="text-green-700 font-medium text-sm">Taux de réussite</div>
                             <div className="text-xs text-green-600 mt-1">
                              {program.Success_rate_of_the_program.includes('%') 
                                        ? (() => {
                                        // Take everything after the last '%', trim, and if it starts with '(', keep it, else add '(' at start and ')' at end
                                        const str = program.Success_rate_of_the_program;
                                        const percentIdx = str.lastIndexOf('%');
                                        if (percentIdx !== -1 && percentIdx + 1 < str.length) {
                                          let after = str.substring(percentIdx + 1).trim();
                                          // Remove leading non-letter chars except '('
                                          after = after.replace(/^([^\wÀ-ÿ(]*)(.*)/, '$2');
                                          if (after.length > 0) {
                                          // If already wrapped in parentheses, keep as is, else wrap in ()
                                          if (after.startsWith('(') && after.endsWith(')')) {
                                            return after;
                                          } else if (after.startsWith('(')) {
                                            return after;
                                          } else {
                                            return `(${after})`;
                                          }
                                          }
                                        }
                                        return '';
                                        })()
                                        : program.Success_rate_of_the_program}
                            </div>
                          </div>
                          <div className="mt-3 text-center">
                            <p className="text-slate-600 text-sm">
                              Le taux de réussite reflète la qualité de l'accompagnement pédagogique et l'adéquation du programme aux profils étudiants.
                            </p>
                          </div>
                        </div>}
                        <div>
                          <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-3">Conditions d'admission par année</h3>
                          
                          {/* Sélecteur d'année */}
                          {admissionCriteria.length > 1 && (
                            <div className="flex gap-2 mb-4 overflow-x-auto">
                              {admissionCriteria.map((criteria) => (
                                <button
                                  key={criteria.year}
                                  onClick={() => setSelectedAdmissionYear(`y${criteria.year}`)}
                                  className={`px-3 py-1 rounded-lg text-sm font-medium whitespace-nowrap ${
                                    selectedAdmissionYear === `y${criteria.year}`
                                      ? 'bg-blue-600 text-white'
                                      : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                                  }`}
                                >
                                  {criteria.year === 1 ? '1ère année' : `${criteria.year}ème année`}
                                </button>
                              ))}
                            </div>
                          )}

                          {/* Affichage des critères pour l'année sélectionnée */}
                          {admissionCriteria.map((criteria) => {
                            if (selectedAdmissionYear !== `y${criteria.year}`) return null;
                            
                            return (
                              <div key={criteria.year} className="bg-slate-50 rounded-lg p-4">
                                <h4 className="font-bold text-slate-800 mb-3">
                                  Admission en {criteria.year === 1 ? '1ère année' : `${criteria.year}ème année`}
                                </h4>
                                <div className="space-y-3">
                                  <div>
                                    <span className="font-semibold text-slate-700 text-sm">Niveau requis:</span>
                                    <p className="text-slate-600 text-sm">{criteria.level}</p>
                                  </div>
                                  {criteria.degree && (
                                    <div>
                                      <span className="font-semibold text-slate-700 text-sm">Diplômes requis:</span>
                                      <p className="text-slate-600 text-sm">{criteria.degree}</p>
                                    </div>
                                  )}
                                  {/* {criteria.details && (
                                    <div>
                                      <span className="font-semibold text-slate-700 text-sm">Modalités:</span>
                                      <p className="text-slate-600 text-sm mt-1">{criteria.details}</p>
                                    </div>
                                  )} */}
                                  {criteria.method && (
                                    <div>
                                      <span className="font-semibold text-slate-700 text-sm">Méthode d'admission:</span>
                                      <p className="text-slate-600 text-sm">{criteria.method}</p>
                                    </div>
                                  )}
                                  {criteria.language && (
                                    <div>
                                      <span className="font-semibold text-slate-700 text-sm">Langues:</span>
                                      <p className="text-slate-600 text-sm">{criteria.language}</p>
                                    </div>
                                  )}
                                  {/* {criteria.applicationDate && (
                                    <div>
                                      <span className="font-semibold text-slate-700 text-sm">Date limite:</span>
                                      <p className="text-slate-600 text-sm font-medium text-red-600">{criteria.applicationDate}</p>
                                    </div>
                                  )} */}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                        <div>
                          <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-3">Calendrier des admissions</h3>
                          <div className="space-y-4">
                            
                            {/* Timeline style avec commentaires */}
                            <div className="relative">
                              {/* Ligne de temps */}
                              <div className="absolute left-4 top-8 bottom-0 w-0.5 bg-slate-300"></div>
                              
                              {/* Candidature */}
                              <div className="relative flex gap-4">
                                <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center border-2 border-red-300">
                                  <AlertCircle className="w-4 h-4 text-red-600" />
                                </div>
                                <div className="flex-1 pb-6">
                                  <div className="flex items-center justify-between mb-2">
                                    <h4 className="font-semibold text-red-800">Candidatures</h4>
                                    <span className="text-red-600 font-bold text-sm bg-red-100 px-2 py-1 rounded">
                                      {program.application_date}
                                    </span>
                                  </div>
                                  {program.application_date_comment && (
                                    <div className="bg-red-50 rounded-lg p-3 border border-red-200">
                                      <p className="text-red-700 text-sm">{program.application_date_comment}</p>
                                    </div>
                                  )}
                                </div>
                              </div>
                              
                              {/* Rentrée */}
                              <div className="relative flex gap-4">
                                <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center border-2 border-green-300">
                                  <Calendar className="w-4 h-4 text-green-600" />
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center justify-between mb-2">
                                    <h4 className="font-semibold text-green-800">Rentrée</h4>
                                    <span className="text-green-600 font-bold text-sm bg-green-100 px-2 py-1 rounded">
                                      {program.intake}
                                    </span>
                                  </div>
                                  {program.intake_comment && (
                                    <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                                      <p className="text-green-700 text-sm">{program.intake_comment}</p>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                            
                            {/* Places disponibles */}
                            { program.intake_capacity && 
                            <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <Users className="w-4 h-4 text-blue-600" />
                                  <span className="font-medium text-blue-800 text-sm">Places disponibles</span>
                                </div>
                                <span className="text-blue-600 font-bold">{program.intake_capacity}</span>
                              </div>
                            </div>
                            }
                          </div>
                        </div>
                      </div>
                    )}

                    {activeTab === 'career' && (
                      <div className="space-y-6">
                        {program.careers && (
                          <div>
                            <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-3">Débouchés professionnels</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              {program.careers.split(', ').map((career, index) => (
                                <div key={index} className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-3 border border-purple-100">
                                  <div className="flex items-center gap-2">
                                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-1 rounded flex-shrink-0">
                                      <Briefcase className="w-3 h-3 text-white" />
                                    </div>
                                    <span className="font-medium text-slate-700 text-sm leading-tight">{career.trim()}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          { program.employment_rate_among_graduates && 
                              <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border border-green-200">
                                { program.employment_rate_among_graduates.includes('%') &&
                                <div className="text-2xl sm:text-3xl font-bold text-green-600 mb-1">
                                  { 
                                    <div className="text-2xl sm:text-3xl font-bold text-green-600 mb-1">
                                      {
                                      (() => {
                                        // Find the last '%' and take everything before the character before '%'
                                        const str = program.employment_rate_among_graduates;
                                        const lastPercent = str.lastIndexOf('%');
                                        if (lastPercent !== -1) {
                                        // Find the start of the number/phrase before the last '%'
                                        let end = lastPercent + 1;
                                        // Go backwards to find where the "block" starts (could be a number or phrase)
                                        // But as per your example, just take everything up to the character before '%'
                                        return str.substring(0, end).trim();
                                        }
                                        return str;
                                      })()
                                      }
                                    </div>}
                                </div>}
                                <div className="text-green-700 font-medium text-sm">Taux d'emploi</div>
                                <div className="text-xs text-green-600 mt-1">
                                      {program.employment_rate_among_graduates.includes('%') 
                                        ? (() => {
                                        // Take everything after the last '%', trim, and if it starts with '(', keep it, else add '(' at start and ')' at end
                                        const str = program.employment_rate_among_graduates;
                                        const percentIdx = str.lastIndexOf('%');
                                        if (percentIdx !== -1 && percentIdx + 1 < str.length) {
                                          let after = str.substring(percentIdx + 1).trim();
                                          // Remove leading non-letter chars except '('
                                          after = after.replace(/^([^\wÀ-ÿ(]*)(.*)/, '$2');
                                          if (after.length > 0) {
                                          // If already wrapped in parentheses, keep as is, else wrap in ()
                                          if (after.startsWith('(') && after.endsWith(')')) {
                                            return after;
                                          } else if (after.startsWith('(')) {
                                            return after;
                                          } else {
                                            return `(${after})`;
                                          }
                                          }
                                        }
                                        return '';
                                        })()
                                        : program.employment_rate_among_graduates}
                                </div>
                              </div>
                            }
                          { program.starting_salary &&
                          <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                            { program.starting_salary.includes('€') &&
                            <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-1"> {
                              (() => {
                                const salary = program.starting_salary || '';
                                const lastEuro = salary.lastIndexOf('€');
                                if (lastEuro !== -1) {
                                return salary.substring(0, lastEuro + 1).trim();
                                }
                                return salary;
                              })()
                              }</div>}
                            <div className="text-blue-700 font-medium text-sm">Salaire moyen/an</div>
                            <div className="text-xs text-blue-600 mt-1">
                              {program.starting_salary.includes('€') 
                                ? program.starting_salary.substring(program.starting_salary.lastIndexOf('€') + 1).trim() 
                                : program.starting_salary}
                            </div>
                          </div>
    }
                        </div>

                        <PartnersSection />

                        {/* {program.international_opportunities && (
                          <div>
                            <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-3">Opportunités internationales</h3>
                            <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-4 border border-orange-200">
                              <ul className="space-y-2">
                                {program.international_opportunities.map((opportunity, index) => (
                                  <li key={index} className="flex items-start gap-2">
                                    <Globe className="w-4 h-4 text-orange-600 mt-1 flex-shrink-0" />
                                    <span className="text-orange-800 text-sm">{opportunity}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        )} */}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Sidebar Mobile */}
              <div className="space-y-4 lg:space-y-6">
                {/* Récapitulatif financier Mobile */}
                <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl p-4 text-white shadow-lg">
                  <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                    <Euro className="w-5 h-5" />
                    Récapitulatif
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-blue-100 text-sm">Frais annuels</span>
                      <span className="font-bold text-lg">{program.tuition}</span>
                    </div>
                    { program.first_deposit && 
                    <div className="flex justify-between items-center">
                      <span className="text-blue-100 text-sm">Premier acompte</span>
                      <span className="font-semibold">{program.first_deposit}</span>
                    </div>}
                    <div className="border-t border-blue-400 pt-2">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-blue-100 text-sm">Date de candidature</span>
                        <span className="font-semibold text-sm">{program.application_date}</span>
                      </div>
                      <a    href={program.url_application}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full bg-white text-blue-600 font-semibold py-2.5 px-4 rounded-lg hover:bg-blue-50 transition-colors text-sm text-center border border-blue-200"
                          >
                            <div className="flex items-center justify-center gap-2">
                              <span>Candidater maintenant</span>
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                            </div>
                          </a>
                    </div>
                  </div>
                </div>

                {/* Informations pratiques Mobile */}
                <div className="bg-white rounded-xl p-4 shadow-lg border border-slate-100">
                  <h3 className="text-lg font-bold text-slate-800 mb-4">Informations pratiques</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-slate-500" />
                        <span className="text-slate-600 text-sm">Durée</span>
                      </div>
                      <span className="font-semibold text-slate-800 text-sm">{program.fi_school_duration}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-slate-500" />
                        <span className="text-slate-600 text-sm">Rentrée</span>
                      </div>
                      <span className="font-semibold text-slate-800 text-sm">{program.intake}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Globe className="w-4 h-4 text-slate-500" />
                        <span className="text-slate-600 text-sm">Langue</span>
                      </div>
                      <span className="font-semibold text-slate-800 text-sm">
                        {(program.language_tech_level1 && ProgramApi.formatLanguageLevels(program.language_tech_level1))
                         || (program.language_tech_level2 && ProgramApi.formatLanguageLevels(program.language_tech_level2))}
                      </span>
                    </div>
                    { program.intake_capacity && 
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-slate-500" />
                          <span className="text-slate-600 text-sm">Capacité</span>
                        </div>
                        <span className="font-semibold text-slate-800 text-sm">{program.intake_capacity}</span>
                      </div>
                    }
                  </div>
                </div>

                {/* École partenaire Mobile */}
                
                {school && (
                  <div className="bg-white rounded-xl p-4 shadow-lg border border-slate-100">
                    <h3 className="text-lg font-bold text-slate-800 mb-3">École</h3>
                    <LinkWithLoading href={"/schools/" + program.school_slug}>
                      <div className="cursor-pointer hover:shadow-md transition-shadow border border-slate-200 rounded-lg p-3">
                        <div className="flex items-start gap-3">
                          <OptimizedImage 
                            src={school.logo_path} 
                            alt={"Logo " + school.name}
                            className="w-10 h-7 object-contain flex-shrink-0"
                            width={40}
                            height={28}
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-slate-800 text-sm leading-tight">{school.name}</h4>
                            <p className="text-xs text-slate-600">{school.base_city}</p>
                            <div className="flex flex-wrap gap-1 mt-2">
                              {school.connection_campus_france && (
                                <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs">
                                  Campus France
                                </span>
                              )}
                              <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs">
                                  {school.international_student_rate_tech && school.international_student_rate_tech.includes('-')
                                      ? school.international_student_rate_tech.replace(/\s*-\s*/, ' d\'internationaux en ')
                                      : school.international_student_rate_tech}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </LinkWithLoading>
                  </div>
                )}

                {/* Programmes similaires Mobile */}
                {similarPrograms && similarPrograms.length > 0 && (
                  <div className="bg-white rounded-xl p-4 shadow-lg border border-slate-100">
                    <h3 className="text-lg font-bold text-slate-800 mb-3">Programmes similaires</h3>
                    <div className="space-y-2">
                      {similarPrograms.slice(0, 3).map((similarProgram) => (
                        <LinkWithLoading key={similarProgram.id} href={similarProgram.full_url_path || `/schools/${similarProgram.school_slug}/programs/${similarProgram.slug}`}>
                          <div className="p-3 border border-slate-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer">
                            <h4 className="font-medium text-slate-800 text-sm leading-tight line-clamp-2">{similarProgram.title}</h4>
                            <p className="text-xs text-slate-600 mt-1">{ similarProgram.school.name}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs text-blue-600">{similarProgram.tuition}</span>
                              <span className="text-xs text-slate-500">•</span>
                              <span className="text-xs text-slate-500">{similarProgram.fi_school_duration}</span>
                            </div>
                          </div>
                        </LinkWithLoading>
                      ))}
                    </div>
                  </div>
                )}

                {/* Support étudiant international Mobile */}
                <div className="bg-gradient-to-br from-green-600 to-emerald-700 rounded-xl p-4 text-white shadow-lg">
                  <h3 className="text-lg font-bold mb-2">Votre réussite, notre mission</h3>
                  <p className="text-green-100 mb-3 text-sm">Accompagnement dédié aux étudiants étrangers</p>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-green-100">
                      <CheckCircle className="w-3 h-3" />
                      <span className="text-xs">Aide visa & logement</span>
                    </div>
                    <div className="flex items-center gap-2 text-green-100">
                      <CheckCircle className="w-3 h-3" />
                      <span className="text-xs">Intégration campus</span>
                    </div>
                    <div className="flex items-center gap-2 text-green-100">
                      <CheckCircle className="w-3 h-3" />
                      <span className="text-xs">Support administratif</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      router.push('/?tab=accompany#accompany-section');
                    }}
                    className="w-full bg-white text-green-600 font-semibold py-2 px-4 rounded-lg hover:bg-green-50 transition-colors mt-3 text-sm"
                  >
                    Découvez nos services
                  </button>
                </div>

                {/* Alternance highlight Mobile */}
                {program.alternance_possible && (
                  <div className="bg-gradient-to-br from-purple-600 to-violet-700 rounded-xl p-4 text-white shadow-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Briefcase className="w-5 h-5" />
                      <h3 className="text-lg font-bold">Alternance</h3>
                    </div>
                    <p className="text-purple-100 mb-3 text-sm">Financez vos études grâce à l'alternance</p>
                    {program.ca_school_duration && (
                      <div className="bg-white/20 rounded-lg p-2 mb-3">
                        <div className="text-xs font-medium">⏱️ Durée alternance</div>
                        <div className="text-sm font-bold">{program.ca_school_duration}</div>
                      </div>
                    )}
                    <div className="bg-white/20 rounded-lg p-2 mb-3">
                      <div className="text-xs font-medium">💰 Économie potentielle</div>
                      <div className="text-lg font-bold">{program.tuition}</div>
                    </div>
                    {/* <button className="w-full bg-white text-purple-600 font-semibold py-2 px-4 rounded-lg hover:bg-purple-50 transition-colors text-sm">
                      En savoir plus
                    </button> */}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Padding en bas pour le CTA fixe mobile */}
      <div className="h-20 lg:hidden"></div>
      <Footer />
    </>
  );
};

// Génération statique des pages pour le SEO - MISE À JOUR POUR API
export async function getStaticPaths() {
  try {
    const response = await ProgramApi.getAllProgramSlugs();
    
    if (!response.success) {
      return {
        paths: [],
        fallback: true
      };
    }

    const paths = response.data.map((slug) => ({
      params: { slug }
    }));

    return {
      paths,
      fallback: true
    };
  } catch (error) {
    console.error('Erreur lors de la génération des paths:', error);
    return {
      paths: [],
      fallback: true
    };
  }
}

export async function getStaticProps({ params }) {
  try {
    const { slug } = params;
    
    // ✅ UTILISER LE CACHE
    const program = await optimizedApi.getProgram(slug);
    
    if (!program) {
      return { notFound: true };
    }

    // ✅ PRÉCHARGER L'ÉCOLE LIÉE automatiquement
    const school = program.school?.slug ? 
      await optimizedApi.getSchool(program.school.slug) : 
      program.school;

    // ✅ PRÉCHARGER programmes similaires
    const similarPrograms = await optimizedApi.getSimilarPrograms?.(program.id, 3) || [];

    return {
      props: { program, school, similarPrograms },
      revalidate: 86400 // ✅ 24h au lieu de 1h
    };
  } catch (error) {
    return {
      props: { error: 'Erreur lors du chargement' },
      revalidate: 60
    };
  }
}

export default ProgramPage;
