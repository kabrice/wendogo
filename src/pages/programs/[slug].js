// src/pages/programs/[slug].js - Version Mobile-First Responsive

import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Clock, MapPin, Users, GraduationCap, Euro, Calendar, Award, Briefcase, Target, Globe, ChevronDown, ChevronUp, Star, CreditCard, CheckCircle, AlertCircle, Banknote, Phone, Mail, Menu, X } from 'lucide-react';
import ProgramApi from '../../store/apis/programApi';
import PrivateSchoolApi from '../../store/apis/privateSchoolApi';
import OptimizedImage from '../../components/OptimizedImage';

const ProgramPage = ({ program, school, similarPrograms, error }) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Gérer le cas d'erreur
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="text-center max-w-md">
          <h1 className="text-xl font-bold text-gray-900 mb-4">Programme non trouvé</h1>
          <p className="text-gray-600 mb-6 text-sm">{error}</p>
          <Link href="/programs" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
            Retour aux programmes
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

  // Génération du JSON-LD pour le SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": program.title,
    "description": program.program_description || program.application_details_for_year_1,
    "provider": {
      "@type": "EducationalOrganization",
      "name": program.school_name,
      "url": school && school.url ? school.url : undefined
    },
    "offers": {
      "@type": "Offer",
      "category": "Education",
      "price": program.tuition.replace(/[^\d]/g, ''),
      "priceCurrency": "EUR"
    },
    "courseMode": "full-time",
    "educationalCredentialAwarded": program.grade,
    "timeRequired": program.fi_school_duration,
    "applicationStartDate": program.application_date,
    "applicationDeadline": program.application_date,
    "startDate": program.intake,
    "teaches": program.skills_acquired.split(', '),
    "occupationalCategory": program.careers.split(', ')
  };

  // Informations financières clés - Version mobile simplifiée
  const financialHighlights = [
    {
      icon: Euro,
      title: "Total",
      value: program.tuition,
      subtitle: program.fi_annual_tuition_fee + "/an",
      color: "from-blue-500 to-indigo-600"
    },
    {
      icon: CreditCard,
      title: "Acompte",
      value: program.first_deposit,
      subtitle: "À l'inscription",
      color: "from-green-500 to-emerald-600"
    },
    {
      icon: Briefcase,
      title: "Alternance",
      value: program.alternance_possible ? "✓" : "✗",
      subtitle: program.alternance_possible ? "Possible" : "Non",
      color: program.alternance_possible ? "from-purple-500 to-violet-600" : "from-gray-400 to-gray-500"
    }
  ];

  // Dates importantes
  const importantDates = [
    {
      icon: Calendar,
      title: "Candidatures",
      date: program.application_date,
      status: "urgent"
    },
    {
      icon: GraduationCap,
      title: "Rentrée",
      date: program.intake,
      status: "info"
    }
  ];

  // Reconnaissances
  const recognitions = program.reconnaissance.split(', ');

  const tabs = [
    { id: 'overview', label: 'Aperçu', icon: Target },
    { id: 'finances', label: 'Prix', icon: Euro },
    { id: 'admission', label: 'Admission', icon: GraduationCap },
    { id: 'career', label: 'Débouchés', icon: Briefcase }
  ];

  return (
    <>
      <Head>
        <title>{program.seo_title || program.title + " - " + program.school_name + " | Wendogo"}</title>
        <meta name="description" content={program.seo_description || program.program_description || program.application_details_for_year_1} />
        <meta name="keywords" content={program.seo_keywords || program.title + ", " + program.school_name + ", " + program.grade} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        
        <meta property="og:type" content="website" />
        <meta property="og:url" content={"https://wendogo.com/programs/" + program.slug} />
        <meta property="og:title" content={program.seo_title || program.title} />
        <meta property="og:description" content={program.seo_description || program.program_description} />
        <meta property="og:image" content={school && school.cover_page_url ? school.cover_page_url : ""} />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={"https://wendogo.com/programs/" + program.slug} />
        <meta property="twitter:title" content={program.seo_title || program.title} />
        <meta property="twitter:description" content={program.seo_description || program.program_description} />
        <meta property="twitter:image" content={school && school.cover_page_url ? school.cover_page_url : ""} />

        <link rel="canonical" href={"https://wendogo.com/programs/" + program.slug} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">
        {/* Header Mobile-First */}
        <div className="bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          
          <div className="relative px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-12">
            <div className="max-w-7xl mx-auto">
              {/* Breadcrumb Mobile */}
              <div className="flex items-center gap-2 text-blue-100 mb-4 text-sm">
                <Link href={"/schools/" + program.school_slug} className="hover:text-white truncate">
                  {program.school_name.length > 20 ? program.school_name.substring(0, 20) + '...' : program.school_name}
                </Link>
                <span>/</span>
                <span className="text-white font-medium">Formation</span>
              </div>

              {/* Contenu Header Mobile */}
              <div className="space-y-4 lg:space-y-0 lg:grid lg:grid-cols-4 lg:gap-8">
                <div className="lg:col-span-3">
                  {/* Badges Mobile - Scroll horizontal */}
                  <div className="flex gap-2 mb-4 overflow-x-auto pb-2 scrollbar-hide">
                    <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap">
                      {program.grade}
                    </span>
                    {recognitions.slice(0, 2).map((recognition, index) => (
                      <span key={index} className="bg-green-500/20 backdrop-blur-sm text-green-100 px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap">
                        {recognition}
                      </span>
                    ))}
                    {program.alternance_possible && (
                      <span className="bg-purple-500/20 backdrop-blur-sm text-purple-100 px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap">
                        Alternance possible
                      </span>
                    )}
                  </div>
                  
                  {/* Titre Mobile - Taille adaptative */}
                  <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-3 leading-tight">
                    {program.title}
                  </h1>
                  
                  {/* École Mobile */}
                  <div className="flex items-center gap-2 text-blue-100 text-sm sm:text-base mb-4">
                    <MapPin className="w-4 h-4 flex-shrink-0" />
                    <Link href={"/schools/" + program.school_slug} className="hover:text-white truncate">
                      {program.school_name}
                    </Link>
                  </div>

                  {/* Reconnaissances Mobile - Masqué sur très petit écran */}
                  <div className="hidden sm:flex flex-wrap gap-2">
                    {recognitions.map((recognition, index) => (
                      <span key={index} className="bg-blue-500/20 backdrop-blur-sm text-blue-100 px-2 py-1 rounded text-xs">
                        {recognition}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA Mobile - Full width sur mobile */}
                <div className="w-full lg:w-auto">
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                    <div className="text-center">
                      <div className="text-xs text-blue-100 mb-1">Frais totaux</div>
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
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Points forts financiers Mobile - Cards empilées */}
        <div className="px-4 sm:px-6 lg:px-8 -mt-6 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
              {financialHighlights.map((highlight, index) => {
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
                          <div className="text-xs text-slate-500">{highlight.subtitle}</div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Dates importantes Mobile - Cards côte à côte */}
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
                    <div className="flex items-center gap-3">
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
              {/* Mobile Tab Navigation - Horizontal Scroll */}
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
              {/* Contenu principal - Full width sur mobile */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden">
                  <div className="p-4 sm:p-6 lg:p-8">
                    {activeTab === 'overview' && (
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-3">Programme d'excellence</h3>
                          <p className="text-slate-600 leading-relaxed text-sm sm:text-base mb-4">
                            {program.program_description || 
                              "Ce " + program.grade + " forme les futurs experts dans le domaine. Le programme combine excellence académique et expérience pratique pour préparer les étudiants aux défis de demain."
                            }
                          </p>
                          {program.special_comment && (
                            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-3 sm:p-4 border border-blue-200">
                              <p className="text-blue-700 font-medium text-sm">💡 {program.special_comment}</p>
                            </div>
                          )}
                        </div>

                        <div>
                          <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-3">Compétences acquises</h3>
                          <div className="flex flex-wrap gap-2">
                            {program.skills_acquired.split(', ').map((skill, index) => (
                              <span key={index} className="bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-3">Reconnaissances officielles</h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {recognitions.map((recognition, index) => (
                              <div key={index} className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-3 border border-green-200">
                                <div className="flex items-center gap-2">
                                  <Award className="w-4 h-4 text-green-600 flex-shrink-0" />
                                  <span className="font-medium text-green-800 text-sm">{recognition}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {program.curriculum_highlights && (
                          <div>
                            <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-3">Points forts du curriculum</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {program.curriculum_highlights.map((highlight, index) => (
                                <div key={index} className="flex items-start gap-2">
                                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                                  <span className="text-slate-700 text-sm">{highlight}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {activeTab === 'finances' && (
                      <div className="space-y-6">
                        {/* Structure des coûts Mobile */}
                        <div>
                          <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-4">Structure des coûts</h3>
                          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
                            <div className="space-y-4">
                              <div>
                                <h4 className="font-semibold text-blue-800 mb-3 text-sm sm:text-base">Frais de scolarité</h4>
                                <div className="space-y-2 text-sm">
                                  <div className="flex justify-between">
                                    <span className="text-slate-600">Coût annuel</span>
                                    <span className="font-semibold">{program.fi_annual_tuition_fee}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-slate-600">Durée</span>
                                    <span className="font-semibold">{program.fi_school_duration}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-slate-600">Frais d'inscription</span>
                                    <span className="font-semibold">{program.fi_registration_fee}</span>
                                  </div>
                                  <div className="border-t pt-2 flex justify-between">
                                    <span className="font-semibold text-slate-800">Total</span>
                                    <span className="font-bold text-blue-600 text-base">{program.tuition}</span>
                                  </div>
                                </div>
                              </div>
                              
                              <div>
                                <h4 className="font-semibold text-blue-800 mb-3 text-sm sm:text-base">Modalités de paiement</h4>
                                <div className="space-y-3">
                                  <div className="bg-white rounded-lg p-3 border border-blue-200">
                                    <div className="flex items-center gap-2 mb-1">
                                      <CreditCard className="w-4 h-4 text-green-600" />
                                      <span className="font-semibold text-green-800 text-sm">Premier acompte</span>
                                    </div>
                                    <div className="text-xl font-bold text-green-600">{program.first_deposit}</div>
                                    <div className="text-xs text-green-700">À l'inscription</div>
                                  </div>
                                  
                                  <div className="bg-white rounded-lg p-3 border border-blue-200">
                                    <div className="flex items-center gap-2 mb-1">
                                      <Banknote className="w-4 h-4 text-blue-600" />
                                      <span className="font-semibold text-blue-800 text-sm">Solde</span>
                                    </div>
                                    <div className="text-lg font-bold text-blue-600">
                                      {(parseInt(program.tuition.replace(/[^\d]/g, '')) - parseInt(program.first_deposit.replace(/[^\d]/g, ''))).toLocaleString()}€
                                    </div>
                                    <div className="text-xs text-blue-700">Paiement échelonné possible</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Option alternance Mobile */}
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
                                  <ul className="space-y-2 text-purple-700 text-sm">
                                    <li className="flex items-start gap-2">
                                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                                      <span>Frais de scolarité pris en charge par l'entreprise</span>
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
                                    <div className="text-xs text-purple-700">L'alternance peut vous faire économiser la totalité des frais de scolarité !</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Aide pour étudiants internationaux Mobile */}
                        <div>
                          <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-3">Aides pour étudiants internationaux</h3>
                          <div className="space-y-3">
                            <div className="bg-white rounded-lg p-3 border border-slate-200">
                              <h4 className="font-semibold text-slate-800 mb-1 text-sm">🏦 Prêts étudiants</h4>
                              <p className="text-slate-600 text-xs">Possibilité de prêts bancaires avec garant français ou caution.</p>
                            </div>
                            <div className="bg-white rounded-lg p-3 border border-slate-200">
                              <h4 className="font-semibold text-slate-800 mb-1 text-sm">💼 Jobs étudiants</h4>
                              <p className="text-slate-600 text-xs">Autorisation de travail 20h/semaine avec visa étudiant.</p>
                            </div>
                            <div className="bg-white rounded-lg p-3 border border-slate-200">
                              <h4 className="font-semibold text-slate-800 mb-1 text-sm">🎓 Bourses d'excellence</h4>
                              <p className="text-slate-600 text-xs">Bourses mérite disponibles selon le dossier académique.</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeTab === 'admission' && (
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-3">Conditions d'admission</h3>
                          <div className="bg-slate-50 rounded-lg p-4">
                            <div className="space-y-3">
                              <div>
                                <span className="font-semibold text-slate-700 text-sm">Niveau requis:</span>
                                <p className="text-slate-600 text-sm">{program.y1_required_level}</p>
                              </div>
                              <div>
                                <span className="font-semibold text-slate-700 text-sm">Diplôme:</span>
                                <p className="text-slate-600 text-sm">{program.y1_required_degree}</p>
                              </div>
                              <div>
                                <span className="font-semibold text-slate-700 text-sm">Modalités:</span>
                                <p className="text-slate-600 text-sm mt-1">{program.application_details_for_year_1}</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-3">Calendrier des admissions</h3>
                          <div className="space-y-3">
                            <div className="flex justify-between items-center py-2 px-3 bg-red-50 rounded-lg border border-red-200">
                              <div className="flex items-center gap-2">
                                <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                                <span className="font-medium text-red-800 text-sm">Date limite candidature</span>
                              </div>
                              <span className="text-red-600 font-bold text-sm">{program.application_date}</span>
                            </div>
                            <div className="flex justify-between items-center py-2 px-3 bg-green-50 rounded-lg border border-green-200">
                              <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-green-600 flex-shrink-0" />
                                <span className="font-medium text-green-800 text-sm">Rentrée</span>
                              </div>
                              <span className="text-green-600 font-bold text-sm">{program.intake}</span>
                            </div>
                            <div className="flex justify-between items-center py-2 px-3 bg-blue-50 rounded-lg border border-blue-200">
                              <div className="flex items-center gap-2">
                                <Users className="w-4 h-4 text-blue-600 flex-shrink-0" />
                                <span className="font-medium text-blue-800 text-sm">Places disponibles</span>
                              </div>
                              <span className="text-blue-600 font-bold text-sm">{program.intake_capacity}</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-3">Spécificités étudiants internationaux</h3>
                          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
                            <ul className="space-y-3">
                              <li className="flex items-start gap-2">
                                <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                                <div>
                                  <span className="font-semibold text-blue-800 text-sm">Procédure Campus France</span>
                                  <p className="text-blue-700 text-xs mt-1">Candidature via la plateforme Études en France</p>
                                </div>
                              </li>
                              <li className="flex items-start gap-2">
                                <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                                <div>
                                  <span className="font-semibold text-blue-800 text-sm">Équivalences de diplômes</span>
                                  <p className="text-blue-700 text-xs mt-1">Reconnaissance automatique des diplômes étrangers</p>
                                </div>
                              </li>
                              <li className="flex items-start gap-2">
                                <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                                <div>
                                  <span className="font-semibold text-blue-800 text-sm">Support visa</span>
                                  <p className="text-blue-700 text-xs mt-1">Assistance complète pour l'obtention du visa étudiant</p>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeTab === 'career' && (
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-3">Débouchés professionnels</h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {program.careers.split(', ').map((career, index) => (
                              <div key={index} className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-3 border border-purple-100">
                                <div className="flex items-center gap-2">
                                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-1 rounded flex-shrink-0">
                                    <Briefcase className="w-3 h-3 text-white" />
                                  </div>
                                  <span className="font-medium text-slate-700 text-sm leading-tight">{career}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border border-green-200">
                            <div className="text-2xl sm:text-3xl font-bold text-green-600 mb-1">{program.employment_rate_among_graduates}</div>
                            <div className="text-green-700 font-medium text-sm">Taux d'emploi</div>
                            <div className="text-xs text-green-600 mt-1">dans les 6 mois</div>
                          </div>
                          <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                            <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-1">{program.starting_salary}</div>
                            <div className="text-blue-700 font-medium text-sm">Salaire moyen</div>
                            <div className="text-xs text-blue-600 mt-1">premier emploi</div>
                          </div>
                        </div>

                        {program.partner_companies && (
                          <div>
                            <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-3">Entreprises partenaires</h3>
                            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-4 border border-indigo-200">
                              <div className="flex flex-wrap gap-2">
                                {program.partner_companies.map((company, index) => (
                                  <span key={index} className="bg-white px-2 py-1 rounded-full text-xs font-medium text-indigo-700 border border-indigo-200">
                                    {company}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}

                        {program.international_opportunities && (
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
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Sidebar Mobile - Devient des sections empilées */}
              <div className="space-y-4 lg:space-y-6">
                {/* Récapitulatif financier Mobile */}
                <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl p-4 text-white shadow-lg">
                  <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                    <Euro className="w-5 h-5" />
                    Récapitulatif
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-blue-100 text-sm">Frais totaux</span>
                      <span className="font-bold text-lg">{program.tuition}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-blue-100 text-sm">Premier acompte</span>
                      <span className="font-semibold">{program.first_deposit}</span>
                    </div>
                    <div className="border-t border-blue-400 pt-2">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-blue-100 text-sm">Date limite</span>
                        <span className="font-semibold text-sm">{program.application_date}</span>
                      </div>
                      <button className="w-full bg-white text-blue-600 font-semibold py-2.5 px-4 rounded-lg hover:bg-blue-50 transition-colors text-sm">
                        Candidater maintenant
                      </button>
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
                      <span className="font-semibold text-slate-800 text-sm">{program.teaching_language_with_required_level_for_year_1}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-slate-500" />
                        <span className="text-slate-600 text-sm">Capacité</span>
                      </div>
                      <span className="font-semibold text-slate-800 text-sm">{program.intake_capacity}</span>
                    </div>
                  </div>
                </div>

                {/* École partenaire Mobile */}
                {school && (
                  <div className="bg-white rounded-xl p-4 shadow-lg border border-slate-100">
                    <h3 className="text-lg font-bold text-slate-800 mb-3">École</h3>
                    <Link href={"/schools/" + program.school_slug}>
                      <div className="cursor-pointer hover:shadow-md transition-shadow border border-slate-200 rounded-lg p-3">
                        <div className="flex items-start gap-3">
                          <OptimizedImage 
                            src={school.logo_url} 
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
                                {school.international_student_rate} internationaux
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                )}

                {/* Programmes similaires Mobile */}
                {similarPrograms && similarPrograms.length > 0 && (
                  <div className="bg-white rounded-xl p-4 shadow-lg border border-slate-100">
                    <h3 className="text-lg font-bold text-slate-800 mb-3">Programmes similaires</h3>
                    <div className="space-y-2">
                      {similarPrograms.slice(0, 3).map((similarProgram) => (
                        <Link key={similarProgram.id} href={"/programs/" + similarProgram.slug}>
                          <div className="p-3 border border-slate-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer">
                            <h4 className="font-medium text-slate-800 text-sm leading-tight line-clamp-2">{similarProgram.title}</h4>
                            <p className="text-xs text-slate-600 mt-1">{similarProgram.school_name}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs text-blue-600">{similarProgram.fi_annual_tuition_fee}/an</span>
                              <span className="text-xs text-slate-500">•</span>
                              <span className="text-xs text-slate-500">{similarProgram.fi_school_duration}</span>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Support étudiant international Mobile */}
                <div className="bg-gradient-to-br from-green-600 to-emerald-700 rounded-xl p-4 text-white shadow-lg">
                  <h3 className="text-lg font-bold mb-2">Support International</h3>
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
                  <button className="w-full bg-white text-green-600 font-semibold py-2 px-4 rounded-lg hover:bg-green-50 transition-colors mt-3 text-sm">
                    Nous contacter
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
                    <div className="bg-white/20 rounded-lg p-2 mb-3">
                      <div className="text-xs font-medium">💰 Économie potentielle</div>
                      <div className="text-lg font-bold">{program.tuition}</div>
                    </div>
                    <button className="w-full bg-white text-purple-600 font-semibold py-2 px-4 rounded-lg hover:bg-purple-50 transition-colors text-sm">
                      En savoir plus
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA fixe mobile en bas */}
      {/* <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-40 lg:hidden">
        <div className="flex gap-3">
          <div className="flex-1">
            <div className="text-xs text-gray-600">Frais totaux</div>
            <div className="font-bold text-blue-600">{program.tuition}</div>
          </div>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold text-sm hover:bg-blue-700 transition-colors flex-shrink-0">
            Candidater
          </button>
        </div>
      </div> */}

      {/* Padding en bas pour le CTA fixe mobile */}
      <div className="h-20 lg:hidden"></div>
    </>
  );
};

// Génération statique des pages pour le SEO
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
    
    const programResponse = await ProgramApi.getProgramBySlug(slug);
    
    if (!programResponse.success) {
      return {
        notFound: true
      };
    }

    const program = programResponse.data;

    const schoolResponse = await PrivateSchoolApi.getSchoolBySlug(program.school_slug);
    const school = schoolResponse.success ? schoolResponse.data : null;

    const similarProgramsResponse = await ProgramApi.getSimilarPrograms(program.id, 3);
    const similarPrograms = similarProgramsResponse.success ? similarProgramsResponse.data : [];

    return {
      props: {
        program,
        school,
        similarPrograms
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

export default ProgramPage;
