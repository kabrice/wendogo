// src/pages/schools/[slug].js - Version mise à jour avec nouvelles données CSV

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { MapPin, Users, Globe, Award, ExternalLink, Facebook, Twitter, Linkedin, Instagram, Shield, CheckCircle, ChevronDown, ChevronUp, Phone, Mail, Star, Building, GraduationCap, Menu, X, AlertTriangle } from 'lucide-react';
import PrivateSchoolApi from '../../store/apis/privateSchoolApi';
import ProgramApi from '../../store/apis/programApi';
import SubdomainApi from '../../store/apis/subdomainApi';
import OptimizedImage from '../../components/OptimizedImage';
import Footer from '../../components/Footer';
import NavBar from '../../components/NavBar';
import HeaderMenuBar from '../../components/HeaderMenuBar';
import { getSubdomainNamesSync } from '../../utils/apiUtils';
import { LinkWithLoading, FadeTransition } from '../../components/ui';
import RocketLoader from '../../components/ui/RocketLoader';
import { trackSchoolView } from '../../lib/gtag';

const SchoolPage = ({ school, programs, similarSchools, error }) => {
  const router = useRouter();
  const [expandedSections, setExpandedSections] = useState(new Set(['presentation']));
  const [showAllPrograms, setShowAllPrograms] = useState(false);
  const [subdomains, setSubdomains] = useState([]);
  const [subdomainsLoaded, setSubdomainsLoaded] = useState(false);

  console.log('Écoles similaires (côté client):', similarSchools);

  useEffect(() => {
    if (school) {
      trackSchoolView(school.slug, school.name);
    }
  }, [school]);
  
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
          <h1 className="text-xl font-bold text-gray-900 mb-4">École non trouvée</h1>
          <p className="text-gray-600 mb-6 text-sm">{error}</p>
          <LinkWithLoading href="/schools" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
            Retour aux écoles
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

  // Fonction pour toggle les sections FAQ
  const toggleSection = (section) => {
    const newExpandedSections = new Set(expandedSections);
    if (newExpandedSections.has(section)) {
      newExpandedSections.delete(section);
    } else {
      newExpandedSections.add(section);
    }
    setExpandedSections(newExpandedSections);
  };

  // Fonction pour formater le numéro de téléphone
  const formatPhoneNumber = (phone) => {
    if (!phone) return '';
    // Si le numéro commence déjà par +33, ne rien faire
    if (phone.startsWith('+33')) return phone;
    // Si c'est un numéro français (commence par 0), remplacer par +33
    if (phone.startsWith('0')) {
      return '+33 ' + phone.substring(1);
    }
    return phone;
  };

  // Fonction pour parser l'email (peut être email, URL, ou email|url)
  const parseContactEmail = (emailField) => {
    if (!emailField) return { email: null, url: null };
    
    if (emailField.includes('|')) {
      // Forme 3: email|url
      const [email, url] = emailField.split('|').map(s => s.trim());
      return { email, url };
    } else if (emailField.startsWith('http')) {
      // Forme 2: URL seulement
      return { email: null, url: emailField };
    } else {
      // Forme 1: Email seulement
      return { email: emailField, url: null };
    }
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
      
      <div className="space-y-4">
        {displayedPrograms.map((program) => (
        <LinkWithLoading key={program.id} href={program.full_url_path || `/schools/${program.school_slug}/programs/${program.slug}`}   target="_blank" rel="noopener noreferrer">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200 hover:shadow-lg hover:border-blue-300 transition-all duration-300 cursor-pointer group">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
            <h5 className="font-semibold text-blue-800 text-sm leading-tight group-hover:text-blue-900 transition-colors">
              {program.title}
            </h5>
            <div className="flex flex-wrap items-center gap-2 mt-1">
              <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs font-medium">
              {program.state_certification_type_complement || program.state_certification_type_complement2}
              </span>
              <span className="text-blue-600 text-xs">•</span>
              <span className="text-blue-600 text-xs">{program.fi_school_duration}</span>
              <span className="text-blue-600 text-xs">•</span>
              <span className="text-blue-600 text-xs font-medium">{PrivateSchoolApi.formatFee(program.tuition)}</span>
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
                      {splitSkills(program.skills_acquired).slice(0, 4).map((skill, index) => (
                        <span key={index} className="bg-white/70 text-blue-700 px-1.5 py-0.5 rounded text-xs">
                          {skill.charAt(0).toUpperCase() + skill.slice(1)}
                        </span>
                      ))}
                      {splitSkills(program.skills_acquired).length > 4 && (
                        <span className="text-blue-600 text-xs">+{splitSkills(program.skills_acquired).length - 4} autres</span>
                      )}
                    </div>
                  </div>
                )}
          </div>
        </LinkWithLoading>
        ))}
      </div>
      
      {programs.length > 3 && !showAllPrograms && (
        <div className="text-center">
        <LinkWithLoading href={`/schools/${school.slug}/programs`}>
          <button className="text-blue-600 hover:text-blue-700 font-medium text-sm bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-lg transition-colors">
          Voir tous les {programs.length} programmes →
          </button>
        </LinkWithLoading>
        </div>
      )}
      </div>
    );
  };

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

  // Génération du JSON-LD pour le SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization", 
    "name": school.name,
    "description": school.description,
    "url": school.url,
    "logo": school.logo_path,
    "image": school.cover_page_path,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": school.address,
      "addressLocality": school.base_city,
      "addressCountry": "FR"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": formatPhoneNumber(school.phone),
      "email": parseContactEmail(school.email).email,
      "contactType": "admissions"
    },
    "sameAs": [
      school.facebook_url,
      school.x_url,
      school.linkedin_url,
      school.instagram_url
    ].filter(Boolean)
  };

  // Points forts pour étudiants internationaux
  const internationalHighlights = [
    {
      icon: Shield,
      title: "Reconnaissances",
      value: school?.acknoledgement?.split(', ').length + "+ accréditations",
      description: school?.acknoledgement?.split(', ').slice(0, 3).join(', ') + '...',
      color: "from-blue-500 to-indigo-600"
    },
    {
      icon: Globe,
      title: "Campus France",
      value: school.connection_campus_france ? "✓ Connectée" : "Non Connectée",
      description: school.connection_campus_france ? "Procédures simplifiées" : "Peut-être procédure parrallèle",
      color: "from-green-500 to-emerald-600"
    },
    {
      icon: Users,
      title: "International",
      value: (() => {
        const rate = school.international_student_rate || "";
        const percentIdx = rate.indexOf("%");
        return percentIdx !== -1 ? rate.substring(0, percentIdx + 1) : rate;
      })(),
      description: (() => {
        const rate = school.international_student_rate || "";
        const percentIdx = rate.indexOf("-");
        return percentIdx !== -1
          ? "Étudiants étrangers en " + rate.substring(percentIdx + 1).trim()
          : "Étudiants étrangers";
      })(),
      color: "from-purple-500 to-violet-600"
    }
  ];

  // Parsing des contacts
  const contactInfo = parseContactEmail(school.email);

  const faqSections = [
    {
      id: 'presentation',
      title: 'À propos de l\'école',
      content: (
        <div className="space-y-4">
          <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
            {school.description}
          </p>
          
          {/* Commentaire sur les étudiants internationaux avec HTML */}
          {school.international_student_comment && (
            <p 
              className="text-slate-700 leading-relaxed text-sm sm:text-base"
              dangerouslySetInnerHTML={{ __html: school.international_student_comment }}
            />
          )}

          {school.acknoledgement && school.acknoledgement.trim() !== "" && (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
              <h4 className="font-bold text-blue-800 mb-3 flex items-center gap-2 text-sm sm:text-base">
                <Award className="w-4 h-4" />
                Reconnaissances et accréditations
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {school?.acknoledgement?.split(', ').map((acc, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 text-green-600 flex-shrink-0" />
                    <span className="text-blue-700 font-medium text-xs sm:text-sm">{acc}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Rankings */}
          {(school.national_ranking || school.international_ranking) && (
            <div className="space-y-3">
              {school.national_ranking && (
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-3 border border-green-200">
                  <h4 className="font-semibold text-green-800 mb-1 text-sm">🏆 Rayonnement national</h4>
                  <p className="text-green-700 text-xs sm:text-sm">{school.national_ranking}</p>
                </div>
              )}
              {school.international_ranking && (
                <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-3 border border-orange-200">
                  <h4 className="font-semibold text-orange-800 mb-1 text-sm">🌍 Rayonnement international</h4>
                  <p className="text-orange-700 text-xs sm:text-sm">{school.international_ranking}</p>
                </div>
              )}
            </div>
          )}
        </div>
      )
    },
    {
      id: 'programs',
      title: 'Quels diplômes peut-on obtenir ?',
      content: (
        <div className="space-y-4">
          <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
            {school.name} propose des programmes de formation reconnus  dans les domaines suivants :
          </p>
          
          {/* Spécialités basées sur les sous-domaines des programmes */}
          {programs.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[...new Set(programs.flatMap(p => [p.sub_domain1, p.sub_domain2, p.sub_domain3].filter(Boolean)))].slice(0, 6).map((subdomainId, index) => (
                <div key={index} className="bg-white rounded-lg border border-slate-200 p-3">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-blue-600 flex-shrink-0" />
                    <span className="font-medium text-slate-800 text-sm">
                      {(() => {
                        const subdomainNames = subdomainsLoaded 
                          ? getSubdomainNamesSync([subdomainId], subdomains)
                          : [subdomainId];
                        return subdomainNames[0] || subdomainId;
                      })()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

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
                {school.general_entry_requirements.split('-').map((req, index) => (
                  <li key={index}>• {req.trim().charAt(0).toUpperCase() + req.trim().slice(1)}</li>
                ))}
              </ul>
            </div>
            
            <div className="bg-white rounded-lg border border-slate-200 p-3">
              <h4 className="font-bold text-slate-800 mb-2 text-sm">Support international</h4>
              <ul className="text-slate-600 text-xs space-y-1">
                {school.international_support_before_coming.split(',').map((support, index) => (
                  <li key={index}>• {support.trim().charAt(0).toUpperCase()+ support.trim().slice(1)}</li>
                ))}
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
          <div 
            className="text-slate-700 leading-relaxed text-sm sm:text-base"
            dangerouslySetInnerHTML={{ 
              __html: `${school.work_study_programs}` 
            }}
          />
          
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
            Le campus de {school.name} offre un environnement d'études exceptionnel avec des infrastructures modernes et un accompagnement personnalisé.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-white rounded-lg border border-slate-200 p-3">
              <h4 className="font-bold text-slate-800 mb-2 flex items-center gap-2 text-sm">
                <Building className="w-3 h-3 text-blue-600" />
                Infrastructures
              </h4>
              <ul className="text-slate-600 space-y-1 text-xs">
                {school.facilities.split(', ').map((facility, index) => (
                  <li key={index}>• {facility.trim().charAt(0).toUpperCase()+ facility.trim().slice(1).replace(/\./g, '')}</li>
                ))}
              </ul>
            </div>
            
            <div className="bg-white rounded-lg border border-slate-200 p-3">
              <h4 className="font-bold text-slate-800 mb-2 flex items-center gap-2 text-sm">
                <Users className="w-3 h-3 text-green-600" />
                Partenariats
              </h4>
              <ul className="text-slate-600 space-y-1 text-xs">
                {school.partnerships.split(', ').slice(0, 10).map((partnership, index) => (
                  <li key={index}>• {partnership.trim().charAt(0).toUpperCase()+ partnership.trim().slice(1).replace(/\./g, '')}</li>
                ))}
                {school.partnerships.split(', ').length > 10 && (
                  <li className="text-blue-600 text-xs">+{school.partnerships.split(', ').length - 10} autres</li>
                )}
              </ul>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-3 border border-orange-200">
            <h4 className="font-semibold text-orange-800 mb-2 flex items-center gap-2 text-sm">
              <Globe className="w-3 h-3" />
              Accompagnement après arrivée
            </h4>
            <ul className="text-orange-700 space-y-1 text-xs">
              {school.international_support_after_coming.split(', ').map((support, index) => (
                <li key={index}>• {support.trim().charAt(0).toUpperCase()+ support.trim().slice(1).replace(/\./g, '')}</li>
              ))}
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
        <meta property="og:image" content={school.cover_page_path} />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={"https://wendogo.com/schools/" + school.slug} />
        <meta property="twitter:title" content={school.seo_title || school.name} />
        <meta property="twitter:description" content={school.seo_description || school.description} />
        <meta property="twitter:image" content={school.cover_page_path} />

        <link rel="canonical" href={"https://wendogo.com/schools/" + school.slug} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>
      <style jsx>{`
            /* Pour les très petits écrans (iPhone SE, etc.) */
            @media (max-width: 375px) and (max-height: 667px) {
              .mobile-header {
                min-height: 320px !important;
                height: 45vh !important;
              }
              
              .mobile-logo {
                height: 2.5rem !important; /* 40px */
              }
              
              .mobile-title {
                font-size: 1.125rem !important; /* 18px */
                line-height: 1.4 !important;
              }
            }
            
            /* Pour les écrans en mode paysage */
            @media (max-height: 500px) and (orientation: landscape) {
              .mobile-header {
                height: 80vh !important;
                min-height: 240px !important;
              }
            }
              
          `}</style>
      {/* <HeaderMenuBar /> */}
      <NavBar 
        variant="simple"
        // showDropdowns={false}
        // showAllMenuItems={false}
      />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
        {/* Header Mobile-First */}
        <div className="relative min-h-[280px] h-[45vh] sm:min-h-[320px] sm:h-[40vh] md:h-64 lg:h-80 overflow-hidden mobile-header">
          {/* Gradient overlay avec la couleur #0154c0 */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0154c0]/85 via-[#0154c0]/75 to-[#0154c0]/65 z-10"></div>
          
          {/* Image de couverture avec meilleur positioning */}
          <OptimizedImage 
            src={school.cover_page_path} 
            alt={"Campus " + school.name}
            className="w-full h-full object-cover"
            style={{ objectPosition: '50% 35%' }} // ✅ Position plus haute de l'image
            width={800}
            height={400}
            priority
          />
          
          <div className="absolute inset-0 z-20 flex items-end">
            <div className="w-full px-4 sm:px-6 lg:px-8 pb-6 sm:pb-8">
              <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:gap-4 sm:flex-row sm:items-end sm:gap-6 gap-4">
                  
                  {/* Container logo avec taille adaptative */}
                <div className="bg-white/95 backdrop-blur-sm rounded-lg p-4 lg:p-5 xl:p-6 2xl:p-8 shadow-lg w-fit mx-auto sm:mx-0">
                  <div className="flex items-center justify-center">
                    <OptimizedImage 
                      src={school.logo_path} 
                      alt={"Logo " + school.name}
                      className="h-16 sm:h-18 md:h-20 lg:h-22 xl:h-24  w-auto object-contain"
                      // ✅ Plus de padding sur larges écrans pour équilibrer
                      width={120}
                      height={80}
                    />
                  </div>
                </div>
                  
                  {/* Informations école */}
                  <div className="flex-1 text-white min-w-0">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {school?.acknoledgement?.split(', ').slice(0, 5).map((acc, index) => (
                        <span key={index} className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium">
                          {acc}
                        </span>
                      ))}
                    </div>
                    
                    {/* Titre avec taille responsive améliorée */}
                    <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-2 sm:mb-3 leading-tight mobile-title ">
                      {school.name}
                    </h1>
                    
                    {/* Groupe d'école en subtitle */}
                    {school.school_group && (
                      <p className="text-white/90 text-sm sm:text-base mb-2">
                        Groupe {school.school_group}
                      </p>
                    )}
                    
                    <div className="flex items-center gap-2 text-white/90 text-sm sm:text-base">
                      <MapPin className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                      <span>{school.base_city}</span>
                    </div>
                  </div>
                </div>

                {/* Badges avec layout amélioré pour mobile */}
                <div className="flex md:flex-wrap flex-start mt-3 gap-1 sm:gap-2">
                  {school.connection_campus_france && (
                    <div className="flex items-center justify-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-semibold">
                      <CheckCircle className="w-3 h-3" />
                      <span className="xs:inline md:inline">Campus France</span> 
                    </div>
                  )}
                  {school.hors_contrat && (
                    <div className="flex items-center justify-center gap-1 bg-orange-100 text-orange-700 px-2 py-1 rounded-full text-xs font-semibold">
                      <AlertTriangle className="w-3 h-3" />
                      <span className="xs:inline md:inline">Hors contrat</span> 
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

          <div className="px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8 relative z-10">
            <div className="max-w-7xl mx-auto px-2 sm:px-0">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
                {internationalHighlights
            .filter((highlight) => highlight.value && highlight.value.trim())
            .map((highlight, index) => {
              const IconComponent = highlight.icon;
              return (
                <div key={index} className="bg-white rounded-lg p-4 shadow-lg border border-slate-100">
                  <div className="flex items-center gap-3">
              <div className={"bg-gradient-to-br " + highlight.color + " p-2 rounded-lg shadow-md flex-shrink-0"}>
                <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-slate-800 text-sm sm:text-base">{highlight.title}</h3>
                <div className="text-lg sm:text-xl font-bold text-slate-800">{highlight.value}</div>
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
          <div className="max-w-7xl mx-auto px-2 sm:px-0">
            <div className="space-y-6 xl:grid xl:grid-cols-3 xl:gap-8 xl:space-y-0">
              {/* FAQ principale */}
              <div className="lg:col-span-2">
                <div className="space-y-4 sm:space-y-4">
                  {faqSections.map((section) =>
                    (section.id==='alternance'&& !school.work_study_programs)? '' : (
                    <div key={section.id} className="border border-black rounded-lg overflow-hidden bg-white shadow-sm">
                      <button
                          onClick={() => toggleSection(section.id)}
                          className="w-full px-4 sm:px-6 py-5 sm:py-6 flex items-center justify-between hover:bg-slate-50 transition-colors touch-manipulation"
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
                      <FadeTransition show={expandedSections.has(section.id)}>
                        <div className="px-4 sm:px-6 pb-4 sm:pb-6 animate-slide-down">
                          {section.content}
                        </div>
                      </FadeTransition>  
                    </div>
                  ))}
                </div>
              </div>

              {/* Sidebar mobile */}
              <div className="space-y-6 lg:space-y-6">
                {/* Informations de contact */}
                <div className="border border-black rounded-lg bg-white shadow-sm">
                  <div className="px-4 sm:px-6 py-5 sm:py-6">
                    <h3 className="font-bold text-lg sm:text-xl text-slate-800 mb-4 sm:mb-5 break-words leading-tight">
                      <span className="sm:hidden">
                        {school.name.length > 45 ? school.name.substring(0, 45) + '...' : school.name}
                      </span>
                      <span className="hidden sm:inline">
                        {school.name.length > 35 ? school.name.substring(0, 35) + '...' : school.name}
                      </span>
                    </h3>
                    
                    <div className="space-y-4 sm:space-y-4">
                      <div className="flex items-start gap-2 sm:gap-3">
                        <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-black mt-1 flex-shrink-0" />
                        <div className="min-w-0 flex-1"> 
                          <a 
                            href={`https://maps.google.com/?q=${encodeURIComponent(school.address)}`}
                            target="_blank"
                            rel="noopener"
                            className="text-xs sm:text-sm text-slate-800  hover:text-blue-600 break-words underline cursor-pointer"
                          >
                            {school.address}
                          </a>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 sm:gap-3">
                        <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-black flex-shrink-0" />
                        <a href={"tel:" + formatPhoneNumber(school.phone)} className="text-slate-800 hover:text-blue-600 text-sm sm:text-base">
                          {formatPhoneNumber(school.phone)}
                        </a>
                      </div>
                      
                      <div className="flex items-start gap-2 sm:gap-3">
                        <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-black mt-1 flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                          {contactInfo.email && (
                            <a href={"mailto:" + contactInfo.email} className="text-slate-800 hover:text-blue-600 text-sm sm:text-base break-all block">
                              {contactInfo.email}
                            </a>
                          )}
                          {contactInfo.url && (
                            <a href={contactInfo.url} target="_blank" rel="noopener" className="text-blue-600 hover:text-blue-700 text-sm sm:text-base break-all underline block mt-1">
                              Formulaire de contact
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <hr className="border-t border-gray-400" />
                  
                  <div className="px-4 sm:px-6 py-5 sm:py-6">
                    <h3 className="font-bold text-lg sm:text-xl text-slate-800 mb-4 sm:mb-5">
                      Suivre {school.name.length > 25 ? school.name.substring(0, 25) + '...' : school.name}
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
                  <div className="bg-white rounded-lg p-4 sm:p-5 shadow-lg border border-slate-100">
                    <h3 className="text-lg font-bold text-slate-800 mb-3">Écoles similaires</h3>
                    <div className="space-y-3">
                      {similarSchools.slice(0, 3).map((similarSchool) => (
                        <LinkWithLoading key={similarSchool.id} href={"/schools/" + similarSchool.slug}>
                          <div className="p-3 border border-slate-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer">
                            <div className="flex items-start gap-3">
                              {/* ✅ NOUVEAU : Logo de l'école */}
                              <div className="w-12 h-8 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0">
                                <OptimizedImage 
                                  src={similarSchool.logo_path || '/images/default-school-logo.svg'} 
                                  alt={"Logo " + similarSchool.name}
                                  className="max-w-full max-h-full object-contain"
                                  width={48}
                                  height={32}
                                />
                              </div>
                              
                              {/* Informations école */}
                              <div className="flex-1 min-w-0">
                                <h4 className="font-medium text-slate-800 text-sm leading-tight line-clamp-2">
                                  {similarSchool.name}
                                </h4>
                                <p className="text-xs text-slate-600 mt-1">{similarSchool.base_city}</p>
                                
                                {/* ✅ NOUVEAU : Badges informatifs */}
                                <div className="flex flex-wrap gap-1 mt-2">
                                  {similarSchool.connection_campus_france && (
                                    <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs">
                                      Campus France
                                    </span>
                                  )}
                                  {similarSchool.school_group && (
                                    <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs">
                                      {similarSchool.school_group}
                                    </span>
                                  )}
                                  {similarSchool.similarity_score && (
                                    <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full text-xs">
                                      {Math.round(similarSchool.similarity_score * 20)}% similaire
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </LinkWithLoading>
                      ))}
                    </div>
                  </div>
                )}

                {/* Call to action Mobile */}
                <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg p-4 text-white shadow-lg">
                  <h3 className="text-lg font-bold mb-2">Découvrez les formations</h3>
                  <p className="text-blue-100 mb-4 text-sm">Explorez toutes les formations disponibles avec reconnaissance internationale.</p>
                  <LinkWithLoading href={`/schools/${school.slug}/programs`}>
                    <button className="w-full bg-white text-blue-600 font-semibold py-3 px-4 rounded-lg hover:bg-blue-50 transition-colors text-sm sm:text-base">
                      Voir les {programs.length} formations
                    </button>
                  </LinkWithLoading>
                </div>
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
              </div>
            </div>
          </div>
        </div>
        <Footer/>
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
