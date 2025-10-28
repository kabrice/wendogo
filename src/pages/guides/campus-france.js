// src/pages/guides/campus-france.js
'use client';

import { useEffect, useState } from 'react';
import { trackPageView } from '../../lib/gtag';
import Head from 'next/head';
import Footer from '../../components/Footer';
import NavBar from '../../components/NavBar';
import { useTranslation } from 'next-i18next';
import { 
  FileText, 
  Globe, 
  Calendar, 
  User, 
  DollarSign, 
  AlertTriangle,
  CheckCircle, 
  Clock,
  BookOpen,
  MessageSquare,
  Star,
  ArrowRight,
  ExternalLink,
  Play,
  Award,
  FileCheck,
  Target,
  Users,
  Trophy,
  Shield,
  GraduationCap,
  AlertCircle,
  ChevronDown,
  Youtube
} from 'lucide-react';
import Link from 'next/link';

function CampusFranceGuide() {
  const { t } = useTranslation(['common', 'campusFrance']);
  const [activeStep, setActiveStep] = useState(0);
  const [expandedSection, setExpandedSection] = useState(null);

  useEffect(() => {
    trackPageView('guide_campus_france');
  }, []);

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const steps = [
    {
      id: 'preparation',
      title: t('campusFrance:step_preparation'),
      subtitle: t('campusFrance:step_preparation_subtitle'),
      duration: t('campusFrance:step_preparation_duration'),
      icon: Target,
      color: 'blue'
    },
    {
      id: 'inscription',
      title: t('campusFrance:step_inscription'),
      subtitle: t('campusFrance:step_inscription_subtitle'),
      duration: t('campusFrance:step_inscription_duration'),
      icon: FileText,
      color: 'green'
    },
    {
      id: 'candidatures',
      title: t('campusFrance:step_candidatures'),
      subtitle: t('campusFrance:step_candidatures_subtitle'),
      duration: t('campusFrance:step_candidatures_duration'),
      icon: MessageSquare,
      color: 'purple'
    },
    {
      id: 'financier',
      title: t('campusFrance:step_financier'),
      subtitle: t('campusFrance:step_financier_subtitle'),
      duration: t('campusFrance:step_financier_duration'),
      icon: DollarSign,
      color: 'yellow-500 '
    },
    {
      id: 'erreurs',
      title: t('campusFrance:step_erreurs'),
      subtitle: t('campusFrance:step_erreurs_subtitle'),
      duration: t('campusFrance:step_erreurs_duration'),
      icon: AlertTriangle,
      color: 'red'
    },
    {
      id: 'conseils',
      title: t('campusFrance:step_conseils'),
      subtitle: t('campusFrance:step_conseils_subtitle'),
      duration: t('campusFrance:step_conseils_duration'),
      icon: Star,
      color: 'indigo'
    }
  ];

  const quickStats = [
    { number: '100+', label: t('campusFrance:stat_countries'), icon: Globe },
    { number: '7', label: t('campusFrance:stat_voeux'), icon: Target },
    { number: '615€', label: t('campusFrance:stat_resources'), icon: DollarSign },
    { number: '6-8', label: t('campusFrance:stat_preparation'), icon: Clock }
  ];

  const testsLangue = [
    { name: t('campusFrance:test_tcf_name'), description: t('campusFrance:test_tcf_description'), level: t('campusFrance:test_tcf_level') },
    { name: t('campusFrance:test_delf_name'), description: t('campusFrance:test_delf_description'), level: t('campusFrance:test_delf_level') },
    { name: t('campusFrance:test_dalf_name'), description: t('campusFrance:test_dalf_description'), level: t('campusFrance:test_dalf_level') }
  ];

  const documentsRequis = [
    { title: t('campusFrance:doc_diplomes'), description: t('campusFrance:doc_diplomes_desc'), urgent: true },
    { title: t('campusFrance:doc_releves'), description: t('campusFrance:doc_releves_desc'), urgent: true },
    { title: t('campusFrance:doc_cv'), description: t('campusFrance:doc_cv_desc'), urgent: false },
    { title: t('campusFrance:doc_lettres'), description: t('campusFrance:doc_lettres_desc'), urgent: true },
    { title: t('campusFrance:doc_photos'), description: t('campusFrance:doc_photos_desc'), urgent: false },
    { title: t('campusFrance:doc_attestations'), description: t('campusFrance:doc_attestations_desc'), urgent: false },
    { title: t('campusFrance:doc_portfolio'), description: t('campusFrance:doc_portfolio_desc'), urgent: false }
  ];

  const erreursCourantes = [
    { title: t('campusFrance:error_derniere_minute'), impact: t('campusFrance:error_derniere_minute_impact') },
    { title: t('campusFrance:error_formulaire'), impact: t('campusFrance:error_formulaire_impact') },
    { title: t('campusFrance:error_lettres_generiques'), impact: t('campusFrance:error_lettres_generiques_impact') },
    { title: t('campusFrance:error_choix_selectifs'), impact: t('campusFrance:error_choix_selectifs_impact') },
    { title: t('campusFrance:error_sous_estimer_temps'), impact: t('campusFrance:error_sous_estimer_temps_impact') },
    { title: t('campusFrance:error_scans_qualite'), impact: t('campusFrance:error_scans_qualite_impact') }
  ];

  const conseilsStrategie = [
    { title: t('campusFrance:conseil_diversifier'), description: t('campusFrance:conseil_diversifier_desc') },
    { title: t('campusFrance:conseil_melanger_niveaux'), description: t('campusFrance:conseil_melanger_niveaux_desc') },
    { title: t('campusFrance:conseil_plan_b'), description: t('campusFrance:conseil_plan_b_desc') },
    { title: t('campusFrance:conseil_anticiper'), description: t('campusFrance:conseil_anticiper_desc') }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>{t('campusFrance:meta_title')}</title>
        <meta name="description" content={t('campusFrance:meta_description')} />
        <meta name="keywords" content={t('campusFrance:meta_keywords')} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                
        <meta property="og:title" content={t('campusFrance:meta_og_title')} />
        <meta property="og:description" content={t('campusFrance:meta_og_description')} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://wendogo.com/guides/campus-france" />
        <meta property="og:image" content="https://wendogo.com/images/guide-campus-france.jpg" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t('campusFrance:meta_twitter_title')} />
        <meta name="twitter:description" content={t('campusFrance:meta_twitter_description')} />
        
        <link rel="canonical" href="https://wendogo.com/guides/campus-france" />
        
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": t('campusFrance:schema_howto_name'),
            "description": t('campusFrance:schema_howto_description'),
            "image": "https://wendogo.com/images/guide-campus-france.jpg",
            "totalTime": "PT6M",
            "estimatedCost": {
              "@type": "MonetaryAmount",
              "currency": "EUR",
              "value": "200"
            },
            "supply": [
              {
                "@type": "HowToSupply",
                "name": t('campusFrance:schema_supply_documents')
              },
              {
                "@type": "HowToSupply", 
                "name": t('campusFrance:schema_supply_test')
              }
            ],
            "step": [
              {
                "@type": "HowToStep",
                "name": t('campusFrance:schema_step_preparation_name'),
                "text": t('campusFrance:schema_step_preparation_text')
              },
              {
                "@type": "HowToStep",
                "name": t('campusFrance:schema_step_inscription_name'),
                "text": t('campusFrance:schema_step_inscription_text')
              },
              {
                "@type": "HowToStep",
                "name": t('campusFrance:schema_step_candidatures_name'),
                "text": t('campusFrance:schema_step_candidatures_text')
              }
            ]
          })
        }} />
      </Head>

      <NavBar variant="simple" languageSelectorVariant="light" />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 via-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-full p-4 mr-4">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2">
                    {t('campusFrance:hero_title')}
                  </h1>
                  <p className="text-lg text-green-100">
                    {t('campusFrance:hero_subtitle')}
                  </p>
                </div>
              </div>
              <p className="text-lg sm:text-xl text-green-100 mb-8">
                {t('campusFrance:hero_description')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/?tab=accompany#accompany-section" className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-center">
                  {t('campusFrance:hero_cta_accompany')}
                </Link>
              </div>
            </div>
            
            {/* Video Section */}
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-white">
                    {t('campusFrance:video_title')}
                  </h3>
                  <Youtube className="w-6 h-6 text-red-400" />
                </div>
                <div className="relative bg-gray-900 rounded-lg overflow-hidden" style={{ aspectRatio: '574/1021' }}>
                  <iframe
                    src="https://www.youtube.com/embed/Y5k5QXqxScY"
                    title="Guide Campus France - Wendogo"
                    className="absolute top-0 left-0 w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <p className="text-sm text-green-100 mt-3 text-center">
                  {t('campusFrance:video_caption')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {quickStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="bg-green-100 w-12 h-12 lg:w-16 lg:h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                  <stat.icon className="w-6 h-6 lg:w-8 lg:h-8 text-green-600" />
                </div>
                <div className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1">{stat.number}</div>
                <div className="text-sm lg:text-base text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Steps Navigation */}
      <section className="py-8 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-2 lg:space-x-4 overflow-x-auto pb-4">
            {steps.map((step, index) => (
              <button
                key={step.id}
                onClick={() => setActiveStep(index)}
                className={`flex items-center px-4 py-3 rounded-lg font-medium transition-colors whitespace-nowrap ${
                  activeStep === index
                    ? `bg-${step.color}-600 text-white`
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                <step.icon className="w-4 h-4 mr-2" />
                <div className="text-left">
                  <div className="text-sm font-semibold">{step.title}</div>
                  <div className="text-xs opacity-75">{step.subtitle}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Étape 1: Phase préparatoire */}
          {activeStep === 0 && (
            <div className="space-y-12">
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Target className="w-8 h-8 text-blue-600" />
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                 {t('campusFrance:phase_prep_title')}
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  {t('campusFrance:phase_prep_description')}
                </p>
              </div>

              {/* Tests de langue */}
              <div>
                <h3 className="text-xl lg:text-2xl font-semibold text-gray-900 mb-6">
                  {t('campusFrance:tests_langue_title')}
                </h3>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                  <div className="flex items-center mb-4">
                    <BookOpen className="w-6 h-6 text-blue-600 mr-3" />
                    <p className="text-blue-800 font-medium">
                      {t('campusFrance:tests_langue_info')}
                    </p>
                  </div>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  {testsLangue.map((test, index) => (
                    <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-lg font-semibold text-gray-900">{test.name}</h4>
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                          {test.level}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm">{test.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Choix des formations */}
              <div>
                <h3 className="text-xl lg:text-2xl font-semibold text-gray-900 mb-6">
                  {t('campusFrance:choix_formations_title')}
                </h3>
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
                  <div className="flex items-center mb-4">
                    <Trophy className="w-6 h-6 text-green-600 mr-3" />
                    <p className="text-green-800 font-medium">
                     {t('campusFrance:choix_formations_info')}
                    </p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-4">{t('campusFrance:choix_formations_points_title')}</h4>
                    <ul className="space-y-3">
                      {[
                          t('campusFrance:choix_point_catalogue'),
                          t('campusFrance:choix_point_couts'),
                          t('campusFrance:choix_point_taux'),
                          t('campusFrance:choix_point_poursuite'),
                          t('campusFrance:choix_point_prerequis'),
                          t('campusFrance:choix_point_dates')
                      ].map((item, index) => (
                        <li key={index} className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-3" />
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
                    <h4 className="font-semibold text-amber-900 mb-3">
                      {t('campusFrance:conseils_strategiques_title')}
                    </h4>
                    <ul className="space-y-2 text-amber-800 text-sm">
                      <li>{t('campusFrance:conseil_strat_1')}</li>
                      <li>{t('campusFrance:conseil_strat_2')}</li>
                      <li>{t('campusFrance:conseil_strat_3')}</li>
                      <li>{t('campusFrance:conseil_strat_4')}</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Documents à préparer */}
              <div>
                <h3 className="text-xl lg:text-2xl font-semibold text-gray-900 mb-6">
                  {t('campusFrance:documents_preparer_title')}
                </h3>
                <div className="grid gap-4">
                  {documentsRequis.map((doc, index) => (
                    <div key={index} className={`border rounded-lg p-6 transition-all hover:shadow-md ${
                      doc.urgent ? 'border-red-200 bg-red-50' : 'border-gray-200 bg-white'
                    }`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <FileCheck className={`w-5 h-5 mr-3 ${doc.urgent ? 'text-red-600' : 'text-gray-600'}`} />
                          <div>
                            <h4 className="font-semibold text-gray-900">{doc.title}</h4>
                            <p className="text-sm text-gray-600">{doc.description}</p>
                          </div>
                        </div>
                        {doc.urgent && (
                          <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-medium">
                            {t('campusFrance:doc_urgent_label')}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Étape 2: Inscription Campus France */}
          {activeStep === 1 && (
            <div className="space-y-12">
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FileText className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                   {t('campusFrance:inscription_title')}
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  {t('campusFrance:inscription_description')}
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">
                    {t('campusFrance:creation_compte_title')}
                  </h3>
                  <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
                    <div className="flex items-center mb-4">
                      <ExternalLink className="w-5 h-5 text-blue-600 mr-3" />
                      <a 
                        href="https://pastel.diplomatie.gouv.fr/etudesenfrance"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        pastel.diplomatie.gouv.fr/etudesenfrance
                      </a>
                    </div>
                    <ul className="space-y-3">
                      {[
                         t('campusFrance:creation_step_1'),
                         t('campusFrance:creation_step_2'),
                         t('campusFrance:creation_step_3'),
                         t('campusFrance:creation_step_4')
                      ].map((step, index) => (
                        <li key={index} className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-3" />
                          <span className="text-gray-700">{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">
                    {t('campusFrance:saisie_dossier_title')}
                  </h3>
                  <div className="space-y-4">
                    {[
                      t('campusFrance:saisie_item_1'),
                      t('campusFrance:saisie_item_2'),
                      t('campusFrance:saisie_item_3'),
                      t('campusFrance:saisie_item_4'),
                      t('campusFrance:saisie_item_5'),
                      t('campusFrance:saisie_item_6')
                    ].map((item, index) => (
                      <div key={index} className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center">
                          <div className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3">
                            {index + 1}
                          </div>
                          <span className="text-gray-900 font-medium">{item}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-6">
                  {t('campusFrance:numerisation_title')}
                </h3>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-blue-900 mb-3">{t('campusFrance:numerisation_qualite_title')}</h4>
                      <ul className="space-y-2 text-blue-800 text-sm">
                        <li>{t('campusFrance:numerisation_qualite_item_1')}</li>
                        <li>{t('campusFrance:numerisation_qualite_item_2')}</li>
                        <li>{t('campusFrance:numerisation_qualite_item_3')}</li>
                        <li>{t('campusFrance:numerisation_qualite_item_4')}</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-900 mb-3">{t('campusFrance:numerisation_organisation_title')}</h4>
                      <ul className="space-y-2 text-blue-800 text-sm">
                        <li>{t('campusFrance:numerisation_organisation_item_1')}</li>
                        <li>{t('campusFrance:numerisation_organisation_item_2')}</li>
                        <li>{t('campusFrance:numerisation_organisation_item_3')}</li>
                        <li>{t('campusFrance:numerisation_organisation_item_4')}</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Étape 3: Candidatures */}
          {activeStep === 2 && (
<div className="space-y-12">
              <div className="text-center">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <MessageSquare className="w-8 h-8 text-purple-600" />
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                  {t('campusFrance:candidatures_main_title')}
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  {t('campusFrance:candidatures_main_description')}
                </p>
              </div>

              {/* Navigation par niveaux */}
              <div className="grid md:grid-cols-3 gap-6 mb-12">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
                  <div className="text-center">
                    <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                      <span className="font-bold">L1</span>
                    </div>
                    <h3 className="font-semibold text-blue-900 mb-2"> {t('campusFrance:level_l1_title')}</h3>
                    <p className="text-sm text-blue-800"> {t('campusFrance:level_l1_description')}</p>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
                  <div className="text-center">
                    <div className="bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                      <span className="font-bold">L2+</span>
                    </div>
                    <h3 className="font-semibold text-green-900 mb-2">{t('campusFrance:level_l2_title')}</h3>
                    <p className="text-sm text-green-800">{t('campusFrance:level_l2_description')}</p>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
                  <div className="text-center">
                    <div className="bg-purple-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                      <span className="font-bold">PhD</span>
                    </div>
                    <h3 className="font-semibold text-purple-900 mb-2">{t('campusFrance:level_phd_title')}</h3>
                    <p className="text-sm text-purple-800">{t('campusFrance:level_phd_description')}</p>
                  </div>
                </div>
              </div>

              {/* Section 1ère année Licence */}
              <div className="bg-white border border-gray-200 rounded-xl p-8">
                <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                  <div className="bg-blue-100 p-2 rounded-lg mr-3">
                    <GraduationCap className="w-6 h-6 text-blue-600" />
                  </div>
                  {t('campusFrance:section_l1_title')}
                </h3>
                
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center mb-2">
                    <AlertCircle className="w-5 h-5 text-amber-600 mr-2" />
                    <p className="font-medium text-amber-800"> {t('campusFrance:section_l1_alert_title')}</p>
                  </div>
                  <p className="text-amber-700 text-sm">
                    {t('campusFrance:section_l1_alert_description')}
                  </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Cas 1 : Nationalité du pays de résidence */}
                  <div className="bg-blue-50 rounded-lg p-6">
                    <h4 className="font-semibold text-blue-900 mb-4">
                      {t('campusFrance:section_l1_alert_same_country')}
                    </h4>
                    <p className="text-sm text-blue-800 mb-4">
                      {t('campusFrance:case_non_eu_note')}
                    </p>
                    
                    <div className="space-y-4">
                      <div className="bg-white border border-blue-200 rounded-lg p-4">
                        <h5 className="font-medium text-blue-900 mb-2">
                           {t('campusFrance:case_bac_fr_title')}
                        </h5>
                        <div className="flex items-start">
                          <ArrowRight className="w-4 h-4 text-blue-600 mr-2 mt-1" />
                          <div>
                            <p className="text-sm text-blue-800 font-medium">{t('campusFrance:case_bac_fr_procedure')}</p>
                            <p className="text-xs text-blue-700">{t('campusFrance:case_bac_fr_note')}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-white border border-blue-200 rounded-lg p-4">
                        <h5 className="font-medium text-blue-900 mb-2">
                          {t('campusFrance:case_bac_other_title')}
                        </h5>
                        <div className="flex items-start">
                          <ArrowRight className="w-4 h-4 text-blue-600 mr-2 mt-1" />
                          <div>
                            <p className="text-sm text-blue-800 font-medium">{t('campusFrance:case_bac_other_procedure')}</p>
                            <p className="text-xs text-blue-700">{t('campusFrance:case_bac_other_note')}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Cas 2 : Nationalité UE */}
                  <div className="bg-green-50 rounded-lg p-6">
                    <h4 className="font-semibold text-green-900 mb-4">
                      {t('campusFrance:case_eu_title')}
                    </h4>
                    <p className="text-sm text-green-800 mb-4">
                      {t('campusFrance:case_eu_example')}
                    </p>
                    
                    <div className="bg-white border border-green-200 rounded-lg p-4">
                      <h5 className="font-medium text-green-900 mb-2">
                        {t('campusFrance:case_eu_simplified_title')}
                      </h5>
                      <div className="flex items-center mb-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                        <span className="text-sm text-green-800 font-medium">{t('campusFrance:case_eu_parcoursup_only')}</span>
                      </div>
                      <p className="text-xs text-green-700">
                        {t('campusFrance:case_eu_countries')}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Calendrier */}
                <div className="mt-8">
                  <h4 className="text-xl font-semibold text-gray-900 mb-6">{t('campusFrance:calendar_general_title')}</h4>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Parcoursup */}
                    <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6">
                      <h5 className="font-semibold text-indigo-900 mb-4 flex items-center">
                        <Calendar className="w-5 h-5 mr-2" />
                        {t('campusFrance:calendar_parcoursup_title')}
                      </h5>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-indigo-800">
                            {t('campusFrance:calendar_parcoursup_discovery')}
                          </span>
                          <span className="text-xs bg-indigo-100 px-2 py-1 rounded">
                            {t('campusFrance:calendar_parcoursup_discovery_period')}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-indigo-800">
                            {t('campusFrance:calendar_parcoursup_registration')}
                          </span>
                          <span className="text-xs bg-indigo-100 px-2 py-1 rounded">
                            {t('campusFrance:calendar_parcoursup_registration_period')}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-indigo-800">
                            {t('campusFrance:calendar_parcoursup_confirmation')}
                          </span>
                          <span className="text-xs bg-indigo-100 px-2 py-1 rounded">
                            {t('campusFrance:calendar_parcoursup_confirmation_period')}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-indigo-800">
                            {t('campusFrance:calendar_parcoursup_responses')}
                          </span>
                          <span className="text-xs bg-indigo-100 px-2 py-1 rounded">
                            {t('campusFrance:calendar_parcoursup_responses_period')}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* DAP */}
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                      <h5 className="font-semibold text-orange-900 mb-4 flex items-center">
                        <Calendar className="w-5 h-5 mr-2" />
                        {t('campusFrance:calendar_dap_title')}
                      </h5>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-orange-800">
                            {t('campusFrance:calendar_dap_opening')}
                          </span>
                          <span className="text-xs bg-orange-100 px-2 py-1 rounded">
                            {t('campusFrance:calendar_dap_opening_date')}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-orange-800">
                            {t('campusFrance:calendar_dap_closing')}
                          </span>
                          <span className="text-xs bg-orange-100 px-2 py-1 rounded">
                            {t('campusFrance:calendar_dap_closing_date')}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-orange-800">
                            {t('campusFrance:calendar_dap_university_response')}
                          </span>
                          <span className="text-xs bg-orange-100 px-2 py-1 rounded">
                            {t('campusFrance:calendar_dap_university_response_date')}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-orange-800">
                            {t('campusFrance:calendar_dap_student_response')}
                          </span>
                          <span className="text-xs bg-orange-100 px-2 py-1 rounded">
                            {t('campusFrance:calendar_dap_student_response_date')}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section Licence 2/3 et Master */}
              <div className="bg-white border border-gray-200 rounded-xl p-8">
                <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                  <div className="bg-green-100 p-2 rounded-lg mr-3">
                    <BookOpen className="w-6 h-6 text-green-600" />
                  </div>
                 {t('campusFrance:section_l2_master_title')}
                </h3>
                
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <h4 className="font-semibold text-green-900 mb-4">
                    {t('campusFrance:section_l2_procedure_title')}
                  </h4>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="font-medium text-green-800 mb-3"> {t('campusFrance:section_l2_steps_title')}</h5>
                      <ul className="space-y-2 text-sm text-green-700">
                        <li className="flex items-center">
                          <CheckCircle className="w-4 h-4 mr-2" />
                          {t('campusFrance:section_l2_step_1')}
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="w-4 h-4 mr-2" />
                          {t('campusFrance:section_l2_step_2')}
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="w-4 h-4 mr-2" />
                          {t('campusFrance:section_l2_step_3')}
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="w-4 h-4 mr-2" />
                          {t('campusFrance:section_l2_step_4')}
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium text-green-800 mb-3">{t('campusFrance:section_l2_calendar_title')}</h5>
                      <p className="text-sm text-green-700 mb-3">
                        {t('campusFrance:section_l2_calendar_note')}
                      </p>
                      <a 
                        href="https://www.campusfrance.org/fr/espaces" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm text-green-800 hover:text-green-900 font-medium"
                      >
                        <ExternalLink className="w-4 h-4 mr-1" />
                        {t('campusFrance:section_l2_find_office')}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section Doctorat */}
              <div className="bg-white border border-gray-200 rounded-xl p-8">
                <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                  <div className="bg-purple-100 p-2 rounded-lg mr-3">
                    <Award className="w-6 h-6 text-purple-600" />
                  </div>
                  {t('campusFrance:section_phd_title')}
                </h3>
                
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                  <h4 className="font-semibold text-purple-900 mb-4">
                    {t('campusFrance:section_phd_procedure_title')}
                  </h4>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="font-medium text-purple-800 mb-3">{t('campusFrance:section_phd_steps_title')}</h5>
                      <ul className="space-y-2 text-sm text-purple-700">
                        <li className="flex items-center">
                          <ArrowRight className="w-4 h-4 mr-2" />
                          {t('campusFrance:section_phd_step_1')}
                        </li>
                        <li className="flex items-center">
                          <ArrowRight className="w-4 h-4 mr-2" />
                          {t('campusFrance:section_phd_step_2')}
                        </li>
                        <li className="flex items-center">
                          <ArrowRight className="w-4 h-4 mr-2" />
                          {t('campusFrance:section_phd_step_3')}
                        </li>
                        <li className="flex items-center">
                          <ArrowRight className="w-4 h-4 mr-2" />
                          {t('campusFrance:section_phd_step_4')}
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium text-purple-800 mb-3">{t('campusFrance:section_phd_visa_title')}</h5>
                      <div className="bg-white border border-purple-200 rounded-lg p-4">
                        <p className="text-sm text-purple-700 mb-2">
                          <strong>{t('campusFrance:section_phd_visa_name')}</strong>
                        </p>
                        <p className="text-xs text-purple-600">
                          {t('campusFrance:section_phd_visa_note')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Aide Campus France */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8">
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {t('campusFrance:accompaniment_title')}
                  </h3>
                  <p className="text-gray-700 mb-6">
                     {t('campusFrance:accompaniment_description')}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                      href="https://www.campusfrance.org/fr/espaces"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <ExternalLink className="w-5 h-5 mr-2" />
                      {t('campusFrance:accompaniment_find_office')}
                    </a>
                    {/* <Link
                      href="/contact"
                      className="inline-flex items-center px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                    >
                      <MessageSquare className="w-5 h-5 mr-2" />
                      Aide personnalisée Wendogo
                    </Link> */}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Étape 4: Aspects financiers */}
          {activeStep === 3 && (
            <div className="space-y-12">
              <div className="text-center">
                <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <DollarSign className="w-8 h-8 text-yellow-600" />
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                  {t('campusFrance:aspects_financiers_title')}
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  {t('campusFrance:aspects_financiers_description')}
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">
                    {t('campusFrance:budget_title')}
                  </h3>
                  <div className="space-y-4">
                    {[
                      { 
                        item: t('campusFrance:budget_item_campus_fees'), 
                        amount: t('campusFrance:budget_amount_campus_fees'), 
                        urgent: true 
                      },
                      { 
                        item: t('campusFrance:budget_item_language_test'), 
                        amount: t('campusFrance:budget_amount_language_test'), 
                        urgent: false 
                      },
                      { 
                        item: t('campusFrance:budget_item_translations'), 
                        amount: t('campusFrance:budget_amount_translations'), 
                        urgent: true 
                      },
                      { 
                        item: t('campusFrance:budget_item_visa'), 
                        amount: t('campusFrance:budget_amount_visa'), 
                        urgent: true 
                      },
                      { 
                        item: t('campusFrance:budget_item_insurance'), 
                        amount: t('campusFrance:budget_amount_insurance'), 
                        urgent: true 
                      },
                      { 
                        item: t('campusFrance:budget_item_housing'), 
                        amount: t('campusFrance:budget_amount_housing'), 
                        urgent: true 
                      }
                    ].map((cost, index) => (
                      <div key={index} className={`border rounded-lg p-4 ${
                        cost.urgent ? 'border-red-200 bg-red-50' : 'border-gray-200 bg-white'
                      }`}>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-900 font-medium">{cost.item}</span>
                          <span className="text-gray-700 font-bold">{cost.amount}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">
                    {t('campusFrance:resources_title')}
                  </h3>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
                    <div className="flex items-center mb-4">
                      <Shield className="w-6 h-6 text-green-600 mr-3" />
                      <h4 className="font-semibold text-green-900">
                        {t('campusFrance:resources_minimum_title')}
                      </h4>
                    </div>
                    <p className="text-green-800 text-sm">
                      {t('campusFrance:resources_minimum_note')}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-4">
                      {t('campusFrance:resources_guarantees_title')}
                    </h4>
                    <div className="space-y-3">
                      {[
                        t('campusFrance:garantie_garant_francais'),
                        t('campusFrance:garantie_bourse'),
                        t('campusFrance:garantie_compte_bloque'),
                        t('campusFrance:garantie_releves_bancaires'),
                        t('campusFrance:garantie_attestation')
                      ].map((guarantee, index) => (
                        <div key={index} className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-3" />
                          <span className="text-gray-700">{guarantee}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Étape 5: Erreurs à éviter */}
          {activeStep === 4 && (
            <div className="space-y-12">
              <div className="text-center">
                <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <AlertTriangle className="w-8 h-8 text-red-600" />
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                  {t('campusFrance:erreurs_eviter_title')}
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  {t('campusFrance:erreurs_eviter_description')}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {erreursCourantes.map((erreur, index) => (
                  <div key={index} className="bg-red-50 border border-red-200 rounded-lg p-6">
                    <div className="flex items-start">
                      <AlertTriangle className="w-5 h-5 text-red-600 mr-3 mt-1" />
                      <div>
                        <h3 className="font-semibold text-red-900 mb-2">{erreur.title}</h3>
                        <p className="text-red-800 text-sm">{erreur.impact}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-2xl p-8">
                <h3 className="text-xl font-semibold text-amber-900 mb-6">
                  {t('campusFrance:conseils_eviter_erreurs_title')}
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-amber-900 mb-3">{t('campusFrance:organisation_title')}</h4>
                    <ul className="space-y-2 text-amber-800 text-sm">
                      <li>{t('campusFrance:organisation_item_1')}</li>
                      <li>{t('campusFrance:organisation_item_2')}</li>
                      <li>{t('campusFrance:organisation_item_3')}</li>
                      <li>{t('campusFrance:organisation_item_4')}</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-amber-900 mb-3">{t('campusFrance:qualite_title')}</h4>
                    <ul className="space-y-2 text-amber-800 text-sm">
                      <li>{t('campusFrance:qualite_item_1')}</li>
                      <li>{t('campusFrance:qualite_item_2')}</li>
                      <li>{t('campusFrance:qualite_item_3')}</li>
                      <li>{t('campusFrance:qualite_item_4')}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Étape 6: Conseils pratiques */}
          {activeStep === 5 && (
            <div className="space-y-12">
              <div className="text-center">
                <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Star className="w-8 h-8 text-indigo-600" />
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                  {t('campusFrance:conseils_pratiques_title')}
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  {t('campusFrance:conseils_pratiques_description')}
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">
                    {t('campusFrance:organisation_optimale_title')}
                  </h3>
                  <div className="space-y-4">
                    {[
                      t('campusFrance:org_opt_item_1'),
                      t('campusFrance:org_opt_item_2'),
                      t('campusFrance:org_opt_item_3'),
                      t('campusFrance:org_opt_item_4'),
                      t('campusFrance:org_opt_item_5'),
                      t('campusFrance:org_opt_item_6')
                    ].map((conseil, index) => (
                      <div key={index} className="flex items-center bg-indigo-50 p-4 rounded-lg">
                        <CheckCircle className="w-5 h-5 text-indigo-600 mr-3" />
                        <span className="text-indigo-900 font-medium">{conseil}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">
                    {t('campusFrance:strategies_gagnantes_title')}
                  </h3>
                  <div className="space-y-6">
                    {conseilsStrategie.map((conseil, index) => (
                      <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
                        <h4 className="font-semibold text-gray-900 mb-2">{conseil.title}</h4>
                        <p className="text-gray-600 text-sm">{conseil.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">
                  {t('campusFrance:checklist_finale_title')}
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-green-900 mb-3">{t('campusFrance:checklist_documents_title')}</h4>
                    <ul className="space-y-2 text-green-800 text-sm">
                      <li>{t('campusFrance:checklist_doc_1')}</li>
                      <li>{t('campusFrance:checklist_doc_2')}</li>
                      <li>{t('campusFrance:checklist_doc_3')}</li>
                      <li>{t('campusFrance:checklist_doc_4')}</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-3">{t('campusFrance:checklist_candidature_title')}</h4>
                    <ul className="space-y-2 text-blue-800 text-sm">
                      <li>{t('campusFrance:checklist_cand_1')}</li>
                      <li>{t('campusFrance:checklist_cand_2')}</li>
                      <li>{t('campusFrance:checklist_cand_3')}</li>
                      <li>{t('campusFrance:checklist_cand_4')}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold mb-6">
           {t('campusFrance:cta_title')}
          </h2>
          <p className="text-lg lg:text-xl mb-8 text-green-100">
             {t('campusFrance:cta_description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/?tab=accompany#accompany-section" className="bg-white text-green-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              {t('campusFrance:cta_button')}
            </Link>
            {/* <Link href="/simulation/home" className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors">
              Évaluer mon profil
            </Link> */}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export async function getStaticProps({ locale }) {
  const { serverSideTranslations } = await import('next-i18next/serverSideTranslations');
  
  return {
    props: {
      ...(await serverSideTranslations(locale, ['authModal', 'common', 'campusFrance'])),
    },
  };
}
export default CampusFranceGuide;
