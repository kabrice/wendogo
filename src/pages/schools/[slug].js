// src/pages/schools/[slug].js - Version Mobile-First Responsive

import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { MapPin, Users, Globe, Award, ExternalLink, Facebook, Twitter, Linkedin, Instagram, Shield, CheckCircle, ChevronDown, ChevronUp, Phone, Mail, Star, Building, GraduationCap, Menu, X } from 'lucide-react';
import PrivateSchoolApi from '../../store/apis/privateSchoolApi';
import ProgramApi from '../../store/apis/programApi';
import OptimizedImage from '../../components/OptimizedImage';

const SchoolPage = ({ school, programs, similarSchools, error }) => {
  const router = useRouter();
  const [expandedSections, setExpandedSections] = useState(new Set(['presentation'])); // Permet plusieurs sections ouvertes
  const [showAllPrograms, setShowAllPrograms] = useState(false);

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
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 text-sm">Chargement...</p>
        </div>
      </div>
    );
  }

  // Fonction pour toggle les sections FAQ (permet plusieurs ouvertes)
  const toggleSection = (section) => {
    const newExpandedSections = new Set(expandedSections);
    if (newExpandedSections.has(section)) {
      newExpandedSections.delete(section);
    } else {
      newExpandedSections.add(section);
    }
    setExpandedSections(newExpandedSections);
  };

  // Widget des programmes avec pagination
  const ProgramsWidget = () => {
    const displayedPrograms = showAllPrograms ? programs : programs.slice(0, 3);
    
    if (programs.length === 0) {
      return (
        <div className="bg-slate-50 rounded-lg p-4 text-center">
          <GraduationCap className="w-8 h-8 text-slate-400 mx-auto mb-2" />
          <p className="text-slate-600 text-sm">Aucun programme disponible pour le moment</p>
        </div>
      );
    }

    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="font-bold text-slate-800 text-sm sm:text-base flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-blue-600" />
            Programmes disponibles ({programs.length})
          </h4>
          {programs.length > 3 && (
            <button
              onClick={() => setShowAllPrograms(!showAllPrograms)}
              className="text-blue-600 hover:text-blue-700 text-xs font-medium"
            >
              {showAllPrograms ? 'Voir moins' : `Voir tous (${programs.length})`}
            </button>
          )}
        </div>
        
        <div className="space-y-2">
          {displayedPrograms.map((program) => (
            <Link key={program.id} href={"/programs/" + program.slug}>
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-3 border border-blue-200 hover:shadow-md transition-all duration-200 cursor-pointer group">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <h5 className="font-semibold text-blue-800 text-sm leading-tight group-hover:text-blue-900 transition-colors">
                      {program.title}
                    </h5>
                    <div className="flex flex-wrap items-center gap-2 mt-1">
                      <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs font-medium">
                        {program.grade}
                      </span>
                      <span className="text-blue-600 text-xs">•</span>
                      <span className="text-blue-600 text-xs">{program.fi_school_duration}</span>
                      <span className="text-blue-600 text-xs">•</span>
                      <span className="text-blue-600 text-xs font-medium">{program.fi_annual_tuition_fee}/an</span>
                      {program.alternance_possible && (
                        <>
                          <span className="text-blue-600 text-xs">•</span>
                          <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full text-xs font-medium">
                            Alternance
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <div className="w-6 h-6 bg-blue-200 rounded-full flex items-center justify-center group-hover:bg-blue-300 transition-colors">
                      <ChevronUp className="w-3 h-3 text-blue-600 transform rotate-45" />
                    </div>
                  </div>
                </div>
                
                {/* Preview des compétences sur les 3 premiers programmes */}
                {programs.indexOf(program) < 3 && program.skills_acquired && (
                  <div className="mt-2 pt-2 border-t border-blue-200">
                    <div className="flex flex-wrap gap-1">
                      {program.skills_acquired.split(', ').slice(0, 3).map((skill, index) => (
                        <span key={index} className="bg-white/70 text-blue-700 px-1.5 py-0.5 rounded text-xs">
                          {skill}
                        </span>
                      ))}
                      {program.skills_acquired.split(', ').length > 3 && (
                        <span className="text-blue-600 text-xs">+{program.skills_acquired.split(', ').length - 3} autres</span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
        
        {programs.length > 3 && !showAllPrograms && (
          <div className="text-center">
            <button
              onClick={() => setShowAllPrograms(true)}
              className="text-blue-600 hover:text-blue-700 font-medium text-sm bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-lg transition-colors"
            >
              Découvrir {programs.length - 3} autres programmes →
            </button>
          </div>
        )}

        {/* Filtres rapides pour les programmes */}
        {programs.length > 5 && (
          <div className="mt-4 p-3 bg-slate-50 rounded-lg">
            <div className="text-xs font-semibold text-slate-700 mb-2">Filtres rapides :</div>
            <div className="flex flex-wrap gap-2">
              {/* Filtre par niveau */}
              {[...new Set(programs.map(p => p.grade))].map((grade, index) => (
                <button
                  key={index}
                  className="bg-white text-slate-600 hover:text-blue-600 hover:bg-blue-50 px-2 py-1 rounded text-xs border border-slate-200 transition-colors"
                >
                  {grade} ({programs.filter(p => p.grade === grade).length})
                </button>
              ))}
              
              {/* Filtre alternance */}
              {programs.some(p => p.alternance_possible) && (
                <button className="bg-purple-100 text-purple-700 hover:bg-purple-200 px-2 py-1 rounded text-xs border border-purple-200 transition-colors">
                  Alternance ({programs.filter(p => p.alternance_possible).length})
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  // Génération du JSON-LD pour le SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": school.name,
    "description": school.description,
    "url": school.url,
    "logo": school.logo_url,
    "image": school.cover_page_url,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": school.address,
      "addressLocality": school.base_city,
      "addressCountry": "FR"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": school.phone,
      "email": school.email,
      "contactType": "admissions"
    },
    "foundingDate": school.founded_year,
    "numberOfEmployees": school.teacher_count,
    "sameAs": [
      school.facebook_url,
      school.x_url,
      school.linkedin_url,
      school.instagram_url
    ].filter(Boolean)
  };

  // Points forts pour étudiants internationaux - Version mobile
  const internationalHighlights = [
    {
      icon: Shield,
      title: "Reconnaissances",
      value: school.acknoledgement.split(', ').length + "+ accréditations",
      description: "CTI, EUR-ACE, ParisTech...",
      color: "from-blue-500 to-indigo-600"
    },
    {
      icon: Globe,
      title: "Campus France",
      value: school.connection_campus_france ? "✓ Partenaire" : "Non partenaire",
      description: "Procédures simplifiées",
      color: "from-green-500 to-emerald-600"
    },
    {
      icon: Users,
      title: "International",
      value: school.international_student_rate,
      description: "Étudiants étrangers",
      color: "from-purple-500 to-violet-600"
    }
  ];

  const faqSections = [
    {
      id: 'presentation',
      title: school.name.length > 30 ? 'Qu\'est-ce que ' + school.name.substring(0, 20) + '... ?' : 'Qu\'est-ce que ' + school.name + ' ?',
      content: (
        <div className="space-y-4">
          <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
            <a href={school.url} className="text-blue-600 font-medium hover:text-blue-700" target="_blank" rel="noopener">
              {school.name}
            </a> {school.long_description || school.description}
          </p>
          <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
            L'établissement accueille plus de {school.student_count?.toLocaleString()} étudiants dont{' '}
            <strong>{school.international_student_rate} d'étudiants internationaux</strong> {school.international_student_comment}.
          </p>
          
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
            <h4 className="font-bold text-blue-800 mb-3 flex items-center gap-2 text-sm sm:text-base">
              <Award className="w-4 h-4" />
              Reconnaissances internationales
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {school.acknoledgement.split(', ').map((acc, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle className="w-3 h-3 text-green-600 flex-shrink-0" />
                  <span className="text-blue-700 font-medium text-xs sm:text-sm">{acc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'access',
      title: 'Comment venir à ' + school.base_city + ' ?',
      content: (
        <div className="space-y-3">
          <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
            Le campus {school.name} est situé à {school.base_city}. L'école est facilement accessible 
            en transports en commun et dispose de toutes les commodités nécessaires.
          </p>
          <div className="bg-green-50 rounded-lg p-3 border border-green-200">
            <h4 className="font-semibold text-green-800 mb-2 text-sm">📍 Adresse complète</h4>
            <p className="text-green-700 text-xs sm:text-sm">{school.address}</p>
          </div>
          <p className="text-slate-700 text-sm">
            Pour plus d'informations sur l'accès, consultez le{' '}
            <a href={school.url} className="text-blue-600 font-medium hover:text-blue-700" target="_blank" rel="noopener">
              site officiel de l'école
            </a>.
          </p>
        </div>
      )
    },
    {
      id: 'programs',
      title: 'Quels diplômes peut-on obtenir ?',
      content: (
        <div className="space-y-4">
          <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
            {school.name} propose <strong>{school.programs_count} programmes de formation</strong> reconnus internationalement dans les domaines suivants :
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {school.specialties?.map((specialty, index) => (
              <div key={index} className="bg-white rounded-lg border border-slate-200 p-3">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <span className="font-medium text-slate-800 text-sm">{specialty}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Widget des programmes */}
          <ProgramsWidget />
        </div>
      )
    },
    {
      id: 'admission',
      title: 'Modalités d\'admission pour étudiants internationaux',
      content: (
        <div className="space-y-4">
          {school.connection_campus_france && (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
              <div className="flex items-center gap-2 mb-3">
                <Shield className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <h4 className="font-bold text-blue-800 text-sm sm:text-base">Procédure Campus France</h4>
              </div>
              <p className="text-blue-700 mb-3 text-sm">
                {school.name} est partenaire officiel de Campus France, facilitant vos démarches visa et d'inscription.
              </p>
              <div className="space-y-2">
                {[
                  'Candidature via plateforme "Études en France"',
                  'Support personnalisé pour les démarches visa',
                  'Procédures simplifiées et accélérées'
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckCircle className="w-3 h-3 text-green-600 mt-1 flex-shrink-0" />
                    <span className="text-blue-700 text-xs">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-white rounded-lg border border-slate-200 p-3">
              <h4 className="font-bold text-slate-800 mb-2 text-sm">Conditions générales</h4>
              <ul className="text-slate-600 text-xs space-y-1">
                <li>• Diplôme reconnu du pays d'origine</li>
                <li>• Niveau de langue requis selon programme</li>
                <li>• Dossier académique complet</li>
                <li>• Lettre de motivation</li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg border border-slate-200 p-3">
              <h4 className="font-bold text-slate-800 mb-2 text-sm">Support international</h4>
              <ul className="text-slate-600 text-xs space-y-1">
                <li>• Service d'accueil dédié</li>
                <li>• Aide au logement</li>
                <li>• Accompagnement administratif</li>
                <li>• Parrainage étudiant</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'alternance',
      title: 'Formations en alternance',
      content: (
        <div className="space-y-4">
          <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
            {school.name} propose des formations en <strong>alternance</strong> avec un taux de {school.alternance_rate}. 
            {school.alternance_comment}
          </p>
          
          <div className="bg-gradient-to-r from-purple-50 to-violet-50 rounded-lg p-4 border border-purple-200">
            <h4 className="font-bold text-purple-800 mb-3 flex items-center gap-2 text-sm sm:text-base">
              <Building className="w-4 h-4" />
              Avantages de l'alternance
            </h4>
            <div className="space-y-2">
              {[
                'Frais de scolarité pris en charge par l\'entreprise',
                'Rémunération pendant les études (55-80% du SMIC)',
                'Expérience professionnelle valorisante',
                'Facilite l\'insertion professionnelle'
              ].map((advantage, index) => (
                <div key={index} className="bg-white/50 rounded-lg p-2">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-3 h-3 text-green-600 mt-1 flex-shrink-0" />
                    <span className="text-purple-700 text-xs">{advantage}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'campus-life',
      title: 'La vie de campus',
      content: (
        <div className="space-y-4">
          <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
            Le campus de {school.name} offre un environnement d'études exceptionnel avec plus de {school.student_count} étudiants 
            et {school.teacher_count} enseignants-chercheurs.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-white rounded-lg border border-slate-200 p-3">
              <h4 className="font-bold text-slate-800 mb-2 flex items-center gap-2 text-sm">
                <Building className="w-3 h-3 text-blue-600" />
                Infrastructures
              </h4>
              <ul className="text-slate-600 space-y-1 text-xs">
                {school.facilities?.map((facility, index) => (
                  <li key={index}>• {facility}</li>
                ))}
              </ul>
            </div>
            
            <div className="bg-white rounded-lg border border-slate-200 p-3">
              <h4 className="font-bold text-slate-800 mb-2 flex items-center gap-2 text-sm">
                <Users className="w-3 h-3 text-green-600" />
                Vie étudiante
              </h4>
              <ul className="text-slate-600 space-y-1 text-xs">
                <li>• Associations étudiantes actives</li>
                <li>• Bureau des étudiants internationaux</li>
                <li>• Événements interculturels</li>
                <li>• Clubs sportifs et culturels</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-3 border border-orange-200">
            <h4 className="font-semibold text-orange-800 mb-2 flex items-center gap-2 text-sm">
              <Globe className="w-3 h-3" />
              Support spécial étudiants internationaux
            </h4>
            <ul className="text-orange-700 space-y-1 text-xs">
              <li>• Service d'accueil dédié aux internationaux</li>
              <li>• Aide au logement et démarches administratives</li>
              <li>• Cours de français langue étrangère (FLE)</li>
              <li>• Accompagnement personnalisé</li>
            </ul>
          </div>
        </div>
      )
    }
  ];

  return (
    <>
      <Head>
        <title>{school.seo_title || school.name + " - École Internationale | Wendogo"}</title>
        <meta name="description" content={school.seo_description || school.description} />
        <meta name="keywords" content={school.seo_keywords || school.name + ", école internationale, étudiants étrangers"} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        
        <meta property="og:type" content="website" />
        <meta property="og:url" content={"https://wendogo.com/schools/" + school.slug} />
        <meta property="og:title" content={school.seo_title || school.name} />
        <meta property="og:description" content={school.seo_description || school.description} />
        <meta property="og:image" content={school.cover_page_url} />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={"https://wendogo.com/schools/" + school.slug} />
        <meta property="twitter:title" content={school.seo_title || school.name} />
        <meta property="twitter:description" content={school.seo_description || school.description} />
        <meta property="twitter:image" content={school.cover_page_url} />

        <link rel="canonical" href={"https://wendogo.com/schools/" + school.slug} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
        {/* Header Mobile-First */}
        <div className="relative h-48 sm:h-56 md:h-64 lg:h-80 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/85 via-indigo-800/75 to-blue-700/65 z-10"></div>
          <OptimizedImage 
            src={school.cover_page_url} 
            alt={"Campus " + school.name}
            className="w-full h-full object-cover"
            width={800}
            height={400}
            priority
          />
          
          <div className="absolute inset-0 z-20 flex items-end">
            <div className="w-full px-4 sm:px-6 lg:px-8 pb-4 sm:pb-6">
              <div className="max-w-7xl mx-auto">
                <div className="flex flex-col sm:flex-row items-start sm:items-end gap-3 sm:gap-4">
                  <div className="bg-white/95 backdrop-blur-sm rounded-lg p-2 sm:p-3 shadow-lg">
                    <OptimizedImage 
                      src={school.logo_url} 
                      alt={"Logo " + school.name}
                      className="h-8 sm:h-10 md:h-12 lg:h-16 w-auto mb-2"
                      width={120}
                      height={80}
                    />
                    {school.connection_campus_france && (
                      <div className="flex items-center gap-1 bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-semibold">
                        <CheckCircle className="w-2 h-2" />
                        Campus France
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1 text-white min-w-0">
                    <div className="flex flex-wrap gap-1 sm:gap-2 mb-2">
                      {school.acknoledgement.split(', ').slice(0, 2).map((acc, index) => (
                        <span key={index} className="bg-blue-500/20 backdrop-blur-sm text-blue-100 px-2 py-0.5 rounded-full text-xs font-medium">
                          {acc}
                        </span>
                      ))}
                    </div>
                    
                    <h1 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2 leading-tight">
                      {school.name}
                    </h1>
                    
                    <div className="flex items-center gap-1 sm:gap-2 text-blue-100 text-sm sm:text-base">
                      <MapPin className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                      <span>{school.base_city}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Points forts pour internationaux Mobile */}
        <div className="px-4 sm:px-6 lg:px-8 -mt-4 sm:-mt-6 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
              {internationalHighlights.map((highlight, index) => {
                const IconComponent = highlight.icon;
                return (
                  <div key={index} className="bg-white rounded-lg p-4 shadow-lg border border-slate-100">
                    <div className="flex items-start gap-3">
                      <div className={"bg-gradient-to-br " + highlight.color + " p-2 rounded-lg shadow-md flex-shrink-0"}>
                        <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-slate-800 text-sm sm:text-base">{highlight.title}</h3>
                        <div className="text-base sm:text-lg font-bold text-slate-800 truncate">{highlight.value}</div>
                        <p className="text-xs text-slate-600">{highlight.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* FAQ Section Mobile */}
        <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
          <div className="max-w-7xl mx-auto">
            <div className="space-y-6 lg:grid lg:grid-cols-3 lg:gap-8 lg:space-y-0">
              {/* FAQ principale */}
              <div className="lg:col-span-2">
                <div className="space-y-3 sm:space-y-4">
                  {faqSections.map((section) => (
                    <div key={section.id} className="border border-black rounded-lg overflow-hidden bg-white shadow-sm">
                      <button
                        onClick={() => toggleSection(section.id)}
                        className="w-full px-4 sm:px-6 py-4 sm:py-6 flex items-center justify-between hover:bg-slate-50 transition-colors"
                      >
                        <h2 className="font-bold text-base sm:text-lg lg:text-xl text-left text-slate-800 pr-2">
                          {section.title}
                        </h2>
                        {expandedSections.has(section.id) ? (
                          <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0" />
                        ) : (
                          <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0" />
                        )}
                      </button>
                      
                      {expandedSections.has(section.id) && (
                        <div className="px-4 sm:px-6 pb-4 sm:pb-6">
                          {section.content}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Sidebar mobile - devient des sections empilées */}
              <div className="space-y-4 lg:space-y-6">
                {/* Informations de contact */}
                <div className="border border-black rounded-lg bg-white shadow-sm">
                  <div className="px-4 sm:px-6 py-4 sm:py-6">
                    <h3 className="font-bold text-lg sm:text-xl text-slate-800 mb-4 sm:mb-5">
                      {school.name.length > 25 ? school.name.substring(0, 25) + '...' : school.name}
                    </h3>
                    
                    <div className="space-y-3 sm:space-y-4">
                      <div className="flex items-start gap-2 sm:gap-3">
                        <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-black mt-1 flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                          <div className="font-medium text-slate-800 text-sm sm:text-base">{school.base_city}</div>
                          <div className="text-xs sm:text-sm text-slate-600 break-words">{school.address}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 sm:gap-3">
                        <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-black flex-shrink-0" />
                        <a href={"tel:" + school.phone} className="text-slate-800 hover:text-blue-600 text-sm sm:text-base">
                          {school.phone}
                        </a>
                      </div>
                      
                      <div className="flex items-center gap-2 sm:gap-3">
                        <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-black flex-shrink-0" />
                        <a href={"mailto:" + school.email} className="text-slate-800 hover:text-blue-600 text-sm sm:text-base break-all">
                          {school.email}
                        </a>
                      </div>
                    </div>
                  </div>
                  
                  <hr className="border-t border-gray-400" />
                  
                  <div className="px-4 sm:px-6 py-4 sm:py-6">
                    <h3 className="font-bold text-lg sm:text-xl text-slate-800 mb-4 sm:mb-5">
                      Suivre {school.name.split(' ')[0]}
                    </h3>
                    <div className="flex gap-3 sm:gap-4">
                      <a href={school.url} target="_blank" rel="noopener" className="text-black hover:text-blue-600 transition-colors">
                        <ExternalLink className="w-5 h-5 sm:w-6 sm:h-6" />
                      </a>
                      {school.facebook_url && (
                        <a href={school.facebook_url} target="_blank" rel="noopener" className="text-black hover:text-blue-600 transition-colors">
                          <Facebook className="w-5 h-5 sm:w-6 sm:h-6" />
                        </a>
                      )}
                      {school.x_url && (
                        <a href={school.x_url} target="_blank" rel="noopener" className="text-black hover:text-blue-600 transition-colors">
                          <Twitter className="w-5 h-5 sm:w-6 sm:h-6" />
                        </a>
                      )}
                      {school.linkedin_url && (
                        <a href={school.linkedin_url} target="_blank" rel="noopener" className="text-black hover:text-blue-600 transition-colors">
                          <Linkedin className="w-5 h-5 sm:w-6 sm:h-6" />
                        </a>
                      )}
                      {school.instagram_url && (
                        <a href={school.instagram_url} target="_blank" rel="noopener" className="text-black hover:text-blue-600 transition-colors">
                          <Instagram className="w-5 h-5 sm:w-6 sm:h-6" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Écoles similaires Mobile */}
                {similarSchools.length > 0 && (
                  <div className="bg-white rounded-lg p-4 shadow-lg border border-slate-100">
                    <h3 className="text-lg font-bold text-slate-800 mb-3">Écoles similaires</h3>
                    <div className="space-y-2">
                      {similarSchools.slice(0, 3).map((similarSchool) => (
                        <Link key={similarSchool.id} href={"/schools/" + similarSchool.slug}>
                          <div className="p-2 border border-slate-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer">
                            <h4 className="font-medium text-slate-800 text-sm leading-tight">{similarSchool.name}</h4>
                            <p className="text-xs text-slate-600">{similarSchool.base_city}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Call to action Mobile */}
                <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg p-4 text-white shadow-lg">
                  <h3 className="text-lg font-bold mb-2">Découvrez nos formations</h3>
                  <p className="text-blue-100 mb-4 text-sm">Explorez toutes les formations disponibles avec reconnaissance internationale.</p>
                  <Link href={"/schools/" + school.slug + "/programs"}>
                    <button className="w-full bg-white text-blue-600 font-semibold py-2.5 px-4 rounded-lg hover:bg-blue-50 transition-colors text-sm">
                      Voir les {programs.length} formations
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// Génération statique des pages pour le SEO
export async function getStaticPaths() {
  try {
    const response = await PrivateSchoolApi.getAllSchoolSlugs();
    
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
    
    const schoolResponse = await PrivateSchoolApi.getSchoolBySlug(slug);
    
    if (!schoolResponse.success) {
      return {
        notFound: true
      };
    }

    const school = schoolResponse.data;

    const programsResponse = await ProgramApi.getProgramsBySchoolId(school.id);
    const programs = programsResponse.success ? programsResponse.data : [];

    const similarSchoolsResponse = await PrivateSchoolApi.getSimilarSchools(school.id, 3);
    const similarSchools = similarSchoolsResponse.success ? similarSchoolsResponse.data : [];

    return {
      props: {
        school,
        programs,
        similarSchools
      },
      revalidate: 3600
    };
  } catch (error) {
    console.error('Erreur lors de la récupération des données:', error);
    return {
      props: {
        error: 'Erreur lors du chargement des données'
      },
      revalidate: 60
    };
  }
}

export default SchoolPage;
