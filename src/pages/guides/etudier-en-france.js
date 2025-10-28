// src/pages/guides/etudier-en-france.js
'use client';

import { useEffect, useState } from 'react';
import { trackPageView } from '../../lib/gtag';
import Head from 'next/head';
import Footer from '../../components/Footer';
import NavBar from '../../components/NavBar';
import { useTranslation } from 'next-i18next';
import { 
  GraduationCap, 
  Globe, 
  Heart, 
  FileText, 
  Users, 
  CheckCircle, 
  AlertCircle,
  Clock,
  MapPin,
  BookOpen,
  Award,
  ArrowRight,
  ExternalLink,
  Star,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

function EtudierEnFranceGuide() {
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedSection, setExpandedSection] = useState(null);
  const { t } = useTranslation(['common', 'etudierEnFrance']);
  useEffect(() => {
    trackPageView('guide_etudier_en_france');
  }, []);

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const quickStats = [
    { number: '2,7M', label: t('etudierEnFrance:quickStats.students'), icon: Users },
    { number: '370K', label: t('etudierEnFrance:quickStats.international'), icon: Globe },
    { number: '3 500', label: t('etudierEnFrance:quickStats.establishments'), icon: GraduationCap },
    { number: '70', label: t('etudierEnFrance:quickStats.countries'), icon: MapPin }
  ];

  const campusFranceCountries = {
    [t('etudierEnFrance:campusFrance.regions.africa')]: [
      'Algérie', 'Bénin', 'Burkina Faso', 'Burundi', 'Cameroun', 'Comores', 'Congo', 
      'Côte d\'Ivoire', 'Djibouti', 'Éthiopie', 'Gabon', 'Ghana', 'Guinée', 'Kenya', 
      'Madagascar', 'Mali', 'Maurice', 'Mauritanie', 'Niger', 'Nigeria', 
      'République centrafricaine', 'République démocratique du Congo', 'Rwanda', 
      'Sénégal', 'Tchad', 'Togo', 'Afrique du Sud'
    ],
    [t('etudierEnFrance:campusFrance.regions.maghreb')]: [
      'Arabie Saoudite', 'Bahreïn', 'Égypte', 'Émirats Arabes Unis', 'Iran', 'Israël', 
      'Jordanie', 'Koweït', 'Liban', 'Maroc', 'Qatar', 'Tunisie'
    ],
    [t('etudierEnFrance:campusFrance.regions.americas')]: [
      'Argentine', 'Bolivie', 'Brésil', 'Canada', 'Chili', 'Colombie', 'Équateur', 
      'États-Unis', 'Haïti', 'Mexique', 'Pérou', 'République dominicaine'
    ],
    [t('etudierEnFrance:campusFrance.regions.asia')]: [
      'Birmanie', 'Cambodge', 'Chine', 'Corée du Sud', 'Inde', 'Indonésie', 'Japon', 
      'Malaisie', 'Népal', 'Pakistan', 'Singapour', 'Taïwan', 'Thaïlande', 'Vietnam'
    ],
    [t('etudierEnFrance:campusFrance.regions.europe')]: [
      'Arménie', 'Azerbaïdjan', 'Géorgie', 'Royaume-Uni', 'Russie', 'Turquie', 'Ukraine'
    ]
  };

  const parcoursupFormations = [
    {
      title: t('etudierEnFrance:parcoursup.formations.bts.title'),
      description: t('etudierEnFrance:parcoursup.formations.bts.description'),
      duration: t('etudierEnFrance:parcoursup.formations.bts.duration'),
      level: t('etudierEnFrance:parcoursup.formations.bts.level')
    },
    {
      title: t('etudierEnFrance:parcoursup.formations.cpge.title'),
      description: t('etudierEnFrance:parcoursup.formations.cpge.description'),
      duration: t('etudierEnFrance:parcoursup.formations.cpge.duration'),
      level: t('etudierEnFrance:parcoursup.formations.cpge.level')
    },
    {
      title: t('etudierEnFrance:parcoursup.formations.dcg.title'),
      description: t('etudierEnFrance:parcoursup.formations.dcg.description'),
      duration: t('etudierEnFrance:parcoursup.formations.dcg.duration'),
      level: t('etudierEnFrance:parcoursup.formations.dcg.level')
    }
  ];

  const parisAcalaySteps = [
    {
      step: 1,
      title: t('etudierEnFrance:parisSaclay.steps.1.title'),
      description: t('etudierEnFrance:parisSaclay.steps.1.description'),
      details: [
        t('etudierEnFrance:parisSaclay.steps.1.details.1'),
        t('etudierEnFrance:parisSaclay.steps.1.details.2'),
        t('etudierEnFrance:parisSaclay.steps.1.details.3'),
        t('etudierEnFrance:parisSaclay.steps.1.details.4')
      ],
      url: 'https://www.universite-paris-saclay.fr/admission/etre-candidat-un-master-paris-saclay'
    },
    {
      step: 2,
      title: t('etudierEnFrance:parisSaclay.steps.2.title'),
      description: t('etudierEnFrance:parisSaclay.steps.2.description'),
      details: [
        t('etudierEnFrance:parisSaclay.steps.2.details.1'),
        t('etudierEnFrance:parisSaclay.steps.2.details.2'),
        t('etudierEnFrance:parisSaclay.steps.2.details.3')
      ]
    },
    {
      step: 3,
      title: t('etudierEnFrance:parisSaclay.steps.3.title'),
      description: t('etudierEnFrance:parisSaclay.steps.3.description'),
      details: [
        t('etudierEnFrance:parisSaclay.steps.3.details.1'),
        t('etudierEnFrance:parisSaclay.steps.3.details.2'),
        t('etudierEnFrance:parisSaclay.steps.3.details.3')
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>{t('etudierEnFrance:meta.title')}</title>
        <meta name="description" content={t('etudierEnFrance:meta.description')} />
        <meta name="keywords" content={t('etudierEnFrance:meta.keywords')} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        
        <meta property="og:title" content={t('etudierEnFrance:meta.ogTitle')} />
        <meta property="og:description" content={t('etudierEnFrance:meta.ogDescription')} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://wendogo.com/guides/etudier-en-france" />
        <meta property="og:image" content="https://wendogo.com/images/guide-etudier-france.jpg" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t('etudierEnFrance:meta.twitterTitle')} />
        <meta name="twitter:description" content={t('etudierEnFrance:meta.twitterDescription')} />
        
        <link rel="canonical" href="https://wendogo.com/guides/etudier-en-france" />
        
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": t('etudierEnFrance:meta.schemaHeadline'),
            "description": t('etudierEnFrance:meta.schemaDescription'),
            "author": {
              "@type": "Organization",
              "name": "Wendogo"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Wendogo",
              "logo": {
                "@type": "ImageObject",
                "url": "https://wendogo.com/logo.png"
              }
            },
            "datePublished": "2025-05-15",
            "dateModified": "2025-07-15"
          })
        }} />
      </Head>

      <NavBar variant="simple" languageSelectorVariant="light" />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-full p-4">
                <GraduationCap className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              {t('etudierEnFrance:hero.title')}
            </h1>
            <p className="text-lg sm:text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              {t('etudierEnFrance:hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/?tab=accompany#accompany-section" className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                {t('etudierEnFrance:hero.ctaPrimary')}
              </Link>
              <Link href="/programs" className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                {t('etudierEnFrance:hero.ctaSecondary')}
              </Link>
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
                <div className="bg-blue-100 w-12 h-12 lg:w-16 lg:h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                  <stat.icon className="w-6 h-6 lg:w-8 lg:h-8 text-blue-600" />
                </div>
                <div className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1">{stat.number}</div>
                <div className="text-sm lg:text-base text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-6 lg:space-x-8 border-b border-gray-200 overflow-x-auto">
            {[
              { id: 'overview', label: t('etudierEnFrance:tabs.overview'), icon: Globe },
              { id: 'campus-france', label: t('etudierEnFrance:tabs.campusFrance'), icon: FileText },
              { id: 'parcoursup', label: t('etudierEnFrance:tabs.parcoursup'), icon: GraduationCap },
              { id: 'paris-saclay', label: t('etudierEnFrance:tabs.parisSaclay'), icon: Award }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center py-4 px-2 font-medium border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <tab.icon className="w-4 h-4 mr-2" />
                <span className="text-sm lg:text-base">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-12">
              <div className="text-center">
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                  {t('etudierEnFrance:overview.title')}
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  {t('etudierEnFrance:overview.subtitle')}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {[
                  {
                    title: t('etudierEnFrance:overview.reasons.excellence.title'),
                    description: t('etudierEnFrance:overview.reasons.excellence.description'),
                    icon: Award,
                    color: 'yellow'
                  },
                  {
                    title: t('etudierEnFrance:overview.reasons.affordable.title'),
                    description: t('etudierEnFrance:overview.reasons.affordable.description'),
                    icon: Star,
                    color: 'green'
                  },
                  {
                    title: t('etudierEnFrance:overview.reasons.culture.title'),
                    description: t('etudierEnFrance:overview.reasons.culture.description'),
                    icon: Heart,
                    color: 'red'
                  },
                  {
                    title: t('etudierEnFrance:overview.reasons.opportunities.title'),
                    description: t('etudierEnFrance:overview.reasons.opportunities.description'),
                    icon: Users,
                    color: 'purple'
                  }
                ].map((advantage, index) => (
                  <div key={index} className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow">
                    <div className={`bg-${advantage.color}-100 w-12 h-12 rounded-full flex items-center justify-center mb-4`}>
                      <advantage.icon className={`w-6 h-6 text-${advantage.color}-600`} />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {advantage.title}
                    </h3>
                    <p className="text-gray-600">
                      {advantage.description}
                    </p>
                  </div>
                ))}
              </div>

              <div>
                <h3 className="text-xl lg:text-2xl font-semibold text-gray-900 mb-6 text-center">
                  {t('etudierEnFrance:overview.typesTitle')}
                </h3>
                <p className="text-gray-600 text-center mb-8 max-w-3xl mx-auto">
                  {t('etudierEnFrance:overview.typesSubtitle')}
                </p>
                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    {
                      title: t('etudierEnFrance:overview.institutions.universities.title'),
                      description: t('etudierEnFrance:overview.institutions.universities.description'),
                      icon: GraduationCap
                    },
                    {
                      title: t('etudierEnFrance:overview.institutions.grandes.title'),
                      description: t('etudierEnFrance:overview.institutions.grandes.description'),
                      icon: Award
                    },
                    {
                      title: t('etudierEnFrance:overview.institutions.specialized.title'),
                      description: t('etudierEnFrance:overview.institutions.specialized.description'),
                      icon: BookOpen
                    }
                  ].map((institution, index) => (
                    <div key={index} className="bg-blue-50 rounded-xl p-6">
                      <institution.icon className="w-10 h-10 text-blue-600 mb-4" />
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">
                        {institution.title}
                      </h4>
                      <p className="text-gray-600 text-sm">
                        {institution.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl lg:text-2xl font-semibold text-gray-900 mb-6 text-center">
                  {t('etudierEnFrance:overview.levelsTitle')}
                </h3>
                <p className="text-gray-600 text-center mb-8 max-w-3xl mx-auto">
                  {t('etudierEnFrance:overview.levelsSubtitle')}
                </p>
                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    {
                      title: t('etudierEnFrance:overview.degrees.licence.title'),
                      description: t('etudierEnFrance:overview.degrees.licence.description')
                    },
                    {
                      title: t('etudierEnFrance:overview.degrees.master.title'),
                      description: t('etudierEnFrance:overview.degrees.master.description')
                    },
                    {
                      title: t('etudierEnFrance:overview.degrees.doctorat.title'),
                      description: t('etudierEnFrance:overview.degrees.doctorat.description')
                    }
                  ].map((degree, index) => (
                    <div key={index} className="bg-white border-2 border-blue-200 rounded-xl p-6">
                      <h4 className="text-lg font-semibold text-blue-600 mb-2">
                        {degree.title}
                      </h4>
                      <p className="text-gray-600 text-sm">
                        {degree.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl lg:text-2xl font-semibold text-gray-900 mb-6 text-center">
                  {t('etudierEnFrance:overview.costsTitle')}
                </h3>
                <p className="text-gray-600 text-center mb-8 max-w-3xl mx-auto">
                  {t('etudierEnFrance:overview.costsSubtitle')}
                </p>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                    <h4 className="text-lg font-semibold text-green-900 mb-2">
                      {t('etudierEnFrance:overview.publicFees')}
                    </h4>
                    <p className="text-2xl font-bold text-green-600 mb-2">170-600€/an</p>
                    <p className="text-green-700 text-sm">
                      {t('etudierEnFrance:overview.publicFeesDesc')}
                    </p>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                    <h4 className="text-lg font-semibold text-blue-900 mb-2">
                      {t('etudierEnFrance:overview.privateFees')}
                    </h4>
                    <p className="text-2xl font-bold text-blue-600 mb-2">3 000-20 000€/an</p>
                    <p className="text-blue-700 text-sm">
                      {t('etudierEnFrance:overview.privateFeesDesc')}
                    </p>
                  </div>
                  <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
                    <h4 className="text-lg font-semibold text-purple-900 mb-2">
                      {t('etudierEnFrance:overview.living')}
                    </h4>
                    <p className="text-2xl font-bold text-purple-600 mb-2">600-1 200€</p>
                    <p className="text-purple-700 text-sm">
                      {t('etudierEnFrance:overview.livingDesc')}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6 lg:p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">
                  {t('etudierEnFrance:overview.scholarshipsTitle')}
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    t('etudierEnFrance:overview.scholarships.eiffel'),
                    t('etudierEnFrance:overview.scholarships.government'),
                    t('etudierEnFrance:overview.scholarships.institutional'),
                    t('etudierEnFrance:overview.scholarships.regional')
                  ].map((scholarship, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{scholarship}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl lg:text-2xl font-semibold text-gray-900 mb-6 text-center">
                  {t('etudierEnFrance:overview.keyDatesTitle')}
                </h3>
                <p className="text-gray-600 text-center mb-8 max-w-3xl mx-auto">
                  {t('etudierEnFrance:overview.keyDatesSubtitle')}
                </p>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    {
                      title: t('etudierEnFrance:overview.timeline.autumn.title'),
                      description: t('etudierEnFrance:overview.timeline.autumn.description'),
                      icon: BookOpen,
                      color: 'orange'
                    },
                    {
                      title: t('etudierEnFrance:overview.timeline.winter.title'),
                      description: t('etudierEnFrance:overview.timeline.winter.description'),
                      icon: FileText,
                      color: 'blue'
                    },
                    {
                      title: t('etudierEnFrance:overview.timeline.spring.title'),
                      description: t('etudierEnFrance:overview.timeline.spring.description'),
                      icon: CheckCircle,
                      color: 'green'
                    },
                    {
                      title: t('etudierEnFrance:overview.timeline.summer.title'),
                      description: t('etudierEnFrance:overview.timeline.summer.description'),
                      icon: ArrowRight,
                      color: 'purple'
                    }
                  ].map((period, index) => (
                    <div key={index} className="bg-white border-2 border-gray-200 rounded-xl p-6">
                      <div className={`bg-${period.color}-100 w-12 h-12 rounded-full flex items-center justify-center mb-4`}>
                        <period.icon className={`w-6 h-6 text-${period.color}-600`} />
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">
                        {period.title}
                      </h4>
                      <p className="text-gray-600 text-sm">
                        {period.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Campus France Tab */}
          {activeTab === 'campus-france' && (
            <div className="space-y-12">
              <div className="text-center">
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                  {t('etudierEnFrance:campusFrance.title')}
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  {t('etudierEnFrance:campusFrance.subtitle')}
                </p>
              </div>

              <div>
                <h3 className="text-xl lg:text-2xl font-semibold text-gray-900 mb-4">
                  {t('etudierEnFrance:campusFrance.concernedTitle')}
                </h3>
                <p className="text-gray-600 mb-6">
                  {t('etudierEnFrance:campusFrance.concernedIntro')}
                </p>
                <div className="space-y-4">
                  {Object.entries(campusFranceCountries).map(([region, countries]) => (
                    <div key={region} className="border border-gray-200 rounded-lg">
                      <button
                        onClick={() => toggleSection(region)}
                        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                      >
                        <h4 className="font-semibold text-gray-900">{region}</h4>
                        {expandedSection === region ? 
                          <ChevronUp className="w-5 h-5 text-gray-500" /> : 
                          <ChevronDown className="w-5 h-5 text-gray-500" />
                        }
                      </button>
                      {expandedSection === region && (
                        <div className="px-6 pb-4 border-t border-gray-200">
                          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 pt-4">
                            {countries.map((country, index) => (
                              <div key={index} className="bg-blue-50 px-3 py-2 rounded text-sm text-blue-800">
                                {country}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl lg:text-2xl font-semibold text-gray-900 mb-6">
                  {t('etudierEnFrance:campusFrance.stepsTitle')}
                </h3>
                <div className="space-y-6">
                  {[1, 2, 3, 4, 5].map((stepNum) => (
                    <div key={stepNum} className="bg-white border border-gray-200 rounded-xl p-6">
                      <div className="flex items-start">
                        <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-1">
                          {stepNum}
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-gray-900 mb-2">
                            {t(`etudierEnFrance:campusFrance.steps.${stepNum}.title`)}
                          </h4>
                          <p className="text-gray-600 mb-4">
                            {t(`etudierEnFrance:campusFrance.steps.${stepNum}.description`)}
                          </p>
                          <div className="grid md:grid-cols-2 gap-3">
                            {[1, 2, 3, 4].map((detailNum) => {
                              const detailKey = `etudierEnFrance:campusFrance.steps.${stepNum}.details.${detailNum}`;
                              const detail = t(detailKey);
                              if (detail === detailKey) return null;
                              return (
                                <div key={detailNum} className="flex items-center">
                                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                                  <span className="text-sm text-gray-700">{detail}</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl lg:text-2xl font-semibold text-gray-900 mb-6">
                  {t('etudierEnFrance:campusFrance.documentsTitle')}
                </h3>
                <p className="text-gray-600 mb-6">
                  {t('etudierEnFrance:campusFrance.documentsSubtitle')}
                </p>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {['academic', 'language', 'motivation', 'identity', 'financial'].map((category) => (
                    <div key={category} className="bg-blue-50 rounded-lg p-6">
                      <h4 className="font-semibold text-blue-900 mb-3">
                        {t(`etudierEnFrance:campusFrance.docCategories.${category}.title`)}
                      </h4>
                      <ul className="space-y-2 text-blue-800">
                        {[1, 2, 3, 4].map((itemNum) => {
                          const itemKey = `etudierEnFrance:campusFrance.docCategories.${category}.items.${itemNum}`;
                          const item = t(itemKey);
                          if (item === itemKey) return null;
                          return (
                            <li key={itemNum}>• {item}</li>
                          );
                        })}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-amber-900 mb-4">
                  {t('etudierEnFrance:campusFrance.feesTitle')}
                </h3>
                <p className="text-amber-800 mb-2">
                  {t('etudierEnFrance:campusFrance.feesSubtitle')}
                </p>
                <p className="text-2xl font-bold text-amber-600">
                  {t('etudierEnFrance:campusFrance.feesAmount')} 
                  <span className="text-sm font-normal text-amber-700 ml-2">
                    {t('etudierEnFrance:campusFrance.feesNote')}
                  </span>
                </p>
              </div>

              <div>
                <h3 className="text-xl lg:text-2xl font-semibold text-gray-900 mb-4">
                  {t('etudierEnFrance:campusFrance.interviewTitle')}
                </h3>
                <p className="text-gray-600 mb-6">
                  {t('etudierEnFrance:campusFrance.interviewSubtitle')}
                </p>
                <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                  <ul className="space-y-3">
                    {[1, 2, 3, 4, 5].map((tipNum) => (
                      <li key={tipNum} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-green-800">
                          {t(`etudierEnFrance:campusFrance.interviewTips.${tipNum}`)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-xl lg:text-2xl font-semibold text-gray-900 mb-6">
                  {t('etudierEnFrance:campusFrance.timelineTitle')}
                </h3>
                <p className="text-gray-600 mb-6">
                  {t('etudierEnFrance:campusFrance.timelineSubtitle')}
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  {['application', 'response'].map((phase) => (
                    <div key={phase} className="bg-white border border-gray-200 rounded-xl p-6">
                      <h4 className="font-semibold text-gray-900 mb-4">
                        {t(`etudierEnFrance:campusFrance.timelinePhases.${phase}.title`)}
                      </h4>
                      <ul className="space-y-3">
                        {[1, 2, 3].map((itemNum) => (
                          <li key={itemNum} className="flex items-center">
                            <Clock className="w-4 h-4 text-blue-600 mr-2" />
                            <span className="text-sm text-gray-700">
                              {t(`etudierEnFrance:campusFrance.timelinePhases.${phase}.items.${itemNum}`)}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-4">
                  {t('etudierEnFrance:campusFrance.tipsTitle')}
                </h3>
                <ul className="space-y-3">
                  {[1, 2, 3, 4, 5].map((tipNum) => (
                    <li key={tipNum} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-blue-800">
                        {t(`etudierEnFrance:campusFrance.tips.${tipNum}`)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Parcoursup Tab */}
          {activeTab === 'parcoursup' && (
            <div className="space-y-12">
              <div className="text-center">
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                  {t('etudierEnFrance:parcoursup.title')}
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  {t('etudierEnFrance:parcoursup.subtitle')}
                </p>
              </div>

              <div>
                <h3 className="text-xl lg:text-2xl font-semibold text-gray-900 mb-4">
                  {t('etudierEnFrance:parcoursup.whoTitle')}
                </h3>
                <p className="text-gray-600 mb-4">
                  {t('etudierEnFrance:parcoursup.whoIntro')}
                </p>
                <ul className="space-y-2">
                  {[1, 2, 3].map((itemNum) => (
                    <li key={itemNum} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                      <span className="text-gray-700">
                        {t(`etudierEnFrance:parcoursup.whoItems.${itemNum}`)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <AlertCircle className="w-6 h-6 text-amber-600 mr-3" />
                  <h3 className="text-lg font-semibold text-amber-900">
                    {t('etudierEnFrance:parcoursup.note')}
                  </h3>
                </div>
                <p className="text-amber-800">
                  {t('etudierEnFrance:parcoursup.noteContent')}
                </p>
              </div>

              <div>
                <h3 className="text-xl lg:text-2xl font-semibold text-gray-900 mb-6">
                  {t('etudierEnFrance:parcoursup.formationsTitle')}
                </h3>
                <p className="text-gray-600 mb-6">
                  {t('etudierEnFrance:parcoursup.formationsSubtitle')}
                </p>
                <div className="grid md:grid-cols-3 gap-6">
                  {parcoursupFormations.map((formation, index) => (
                    <div key={index} className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow">
                      <div className="flex items-center justify-between mb-3">
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                          {formation.level}
                        </span>
                        <span className="text-gray-500 text-sm">{formation.duration}</span>
                      </div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">
                        {formation.title}
                      </h4>
                      <p className="text-gray-600 text-sm">
                        {formation.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl lg:text-2xl font-semibold text-gray-900 mb-6">
                  {t('etudierEnFrance:parcoursup.calendarTitle')}
                </h3>
                <p className="text-gray-600 mb-6">
                  {t('etudierEnFrance:parcoursup.calendarSubtitle')}
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  {['registration', 'admission'].map((phase) => (
                    <div key={phase} className="bg-white border border-gray-200 rounded-xl p-6">
                      <h4 className="font-semibold text-gray-900 mb-4">
                        {t(`etudierEnFrance:parcoursup.calendarPhases.${phase}.title`)}
                      </h4>
                      <ul className="space-y-3">
                        {[1, 2, 3, 4].map((itemNum) => {
                          const itemKey = `etudierEnFrance:parcoursup.calendarPhases.${phase}.items.${itemNum}`;
                          const item = t(itemKey);
                          if (item === itemKey) return null;
                          return (
                            <li key={itemNum} className="flex items-center">
                              <Clock className="w-4 h-4 text-blue-600 mr-2" />
                              <span className="text-sm text-gray-700">{item}</span>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl lg:text-2xl font-semibold text-gray-900 mb-6">
                  {t('etudierEnFrance:parcoursup.stepByStepTitle')}
                </h3>
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((stepNum) => (
                    <div key={stepNum} className="flex items-center bg-blue-50 rounded-lg p-4">
                      <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4">
                        {stepNum}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">
                          {t(`etudierEnFrance:parcoursup.steps.${stepNum}.title`)}
                        </div>
                        <div className="text-gray-600 text-sm">
                          {t(`etudierEnFrance:parcoursup.steps.${stepNum}.description`)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl lg:text-2xl font-semibold text-gray-900 mb-6">
                  {t('etudierEnFrance:parcoursup.dossierTitle')}
                </h3>
                <p className="text-gray-600 mb-6">
                  {t('etudierEnFrance:parcoursup.dossierSubtitle')}
                </p>
                <div className="grid md:grid-cols-3 gap-6">
                  {['academic', 'motivation', 'complementary'].map((category) => (
                    <div key={category} className="bg-green-50 rounded-lg p-6">
                      <h4 className="font-semibold text-green-900 mb-3">
                        {t(`etudierEnFrance:parcoursup.dossierCategories.${category}.title`)}
                      </h4>
                      <ul className="space-y-2 text-green-800">
                        {[1, 2, 3, 4].map((itemNum) => {
                          const itemKey = `etudierEnFrance:parcoursup.dossierCategories.${category}.items.${itemNum}`;
                          const item = t(itemKey);
                          if (item === itemKey) return null;
                          return (
                            <li key={itemNum}>• {item}</li>
                          );
                        })}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl lg:text-2xl font-semibold text-gray-900 mb-6">
                  {t('etudierEnFrance:parcoursup.responsesTitle')}
                </h3>
                <p className="text-gray-600 mb-6">
                  {t('etudierEnFrance:parcoursup.responsesSubtitle')}
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  {['accepted', 'waiting', 'conditional', 'refused'].map((type) => (
                    <div key={type} className="bg-white border border-gray-200 rounded-xl p-6">
                      <h4 className="font-semibold text-gray-900 mb-2">
                        {t(`etudierEnFrance:parcoursup.responseTypes.${type}.title`)}
                      </h4>
                      <p className="text-gray-600 text-sm">
                        {t(`etudierEnFrance:parcoursup.responseTypes.${type}.description`)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-4">
                  {t('etudierEnFrance:parcoursup.tipsTitle')}
                </h3>
                <ul className="space-y-3">
                  {[1, 2, 3, 4, 5].map((tipNum) => (
                    <li key={tipNum} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-blue-800">
                        {t(`etudierEnFrance:parcoursup.tips.${tipNum}`)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-purple-900 mb-4">
                  {t('etudierEnFrance:parcoursup.complementaryTitle')}
                </h3>
                <p className="text-purple-800">
                  {t('etudierEnFrance:parcoursup.complementaryContent')}
                </p>
              </div>

              <div>
                <h3 className="text-xl lg:text-2xl font-semibold text-gray-900 mb-6">
                  {t('etudierEnFrance:parcoursup.forInternationalsTitle')}
                </h3>
                <p className="text-gray-600 mb-6">
                  {t('etudierEnFrance:parcoursup.forInternationalsSubtitle')}
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  {['resident', 'abroad'].map((situation) => (
                    <div key={situation} className="bg-gray-50 rounded-xl p-6">
                      <h4 className="font-semibold text-gray-900 mb-3">
                        {t(`etudierEnFrance:parcoursup.internationalCases.${situation}.title`)}
                      </h4>
                      <ul className="space-y-2 text-gray-700">
                        {[1, 2, 3].map((itemNum) => (
                          <li key={itemNum} className="flex items-start">
                            <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-1 flex-shrink-0" />
                            <span className="text-sm">
                              {t(`etudierEnFrance:parcoursup.internationalCases.${situation}.items.${itemNum}`)}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">
                  {t('etudierEnFrance:parcoursup.resourcesTitle')}
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <a 
                    href="https://www.parcoursup.fr" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                  >
                    <div>
                      <div className="font-semibold text-blue-900">
                        {t('etudierEnFrance:parcoursup.resources.platform')}
                      </div>
                    </div>
                    <ExternalLink className="w-5 h-5 text-blue-600" />
                  </a>
                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                    <div>
                      <div className="font-semibold text-green-900">
                        {t('etudierEnFrance:parcoursup.resources.assistance')}
                      </div>
                      <div className="text-sm text-green-700">0800 400 070</div>
                    </div>
                  </div>
                  <a 
                    href="https://www.parcoursup.fr/index.php?desc=questions" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
                  >
                    <div>
                      <div className="font-semibold text-purple-900">
                        {t('etudierEnFrance:parcoursup.resources.faq')}
                      </div>
                    </div>
                    <ExternalLink className="w-5 h-5 text-purple-600" />
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* Paris-Saclay Tab */}
          {activeTab === 'paris-saclay' && (
            <div className="space-y-12">
              <div className="text-center">
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                  {t('etudierEnFrance:parisSaclay.title')}
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  {t('etudierEnFrance:parisSaclay.subtitle')}
                </p>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
                  <h3 className="text-lg font-semibold text-green-900">
                    {t('etudierEnFrance:parisSaclay.freeProcess')}
                  </h3>
                </div>
                <p className="text-green-800">
                  {t('etudierEnFrance:parisSaclay.freeProcessDesc')}
                </p>
              </div>

              <div>
                <h3 className="text-xl lg:text-2xl font-semibold text-gray-900 mb-6">
                  {t('etudierEnFrance:parisSaclay.stepsTitle')}
                </h3>
                <div className="space-y-6">
                  {parisAcalaySteps.map((step, index) => (
                    <div key={index} className="bg-white border border-gray-200 rounded-xl p-6">
                      <div className="flex items-start">
                        <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-1">
                          {step.step}
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-gray-900 mb-2">
                            {step.title}
                          </h4>
                          <p className="text-gray-600 mb-4">{step.description}</p>
                          {step.url && (
                            <div className="mb-4">
                              <a 
                                href={step.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                              >
                                {t('etudierEnFrance:parisSaclay.steps.1.linkText')}
                                <ExternalLink className="w-4 h-4 ml-1" />
                              </a>
                            </div>
                          )}
                          <div className="grid md:grid-cols-2 gap-3">
                            {step.details.map((detail, detailIndex) => (
                              <div key={detailIndex} className="flex items-center">
                                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                                <span className="text-sm text-gray-700">{detail}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6 lg:p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">
                  {t('etudierEnFrance:parisSaclay.calendarTitle')}
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">
                      {t('etudierEnFrance:parisSaclay.applicationPhase.title')}
                    </h4>
                    <div className="space-y-3">
                      {[1, 2, 3].map((itemNum) => (
                        <div key={itemNum} className="flex items-center">
                          <Clock className="w-4 h-4 text-blue-600 mr-2" />
                          <span className="text-sm text-gray-700">
                            {t(`etudierEnFrance:parisSaclay.applicationPhase.items.${itemNum}`)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">
                      {t('etudierEnFrance:parisSaclay.visaPhase.title')}
                    </h4>
                    <div className="space-y-3">
                      {[1, 2, 3].map((itemNum) => (
                        <div key={itemNum} className="flex items-center">
                          <Clock className="w-4 h-4 text-green-600 mr-2" />
                          <span className="text-sm text-gray-700">
                            {t(`etudierEnFrance:parisSaclay.visaPhase.items.${itemNum}`)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <AlertCircle className="w-6 h-6 text-amber-600 mr-3" />
                  <h3 className="text-lg font-semibold text-amber-900">
                    {t('etudierEnFrance:parisSaclay.importantPointsTitle')}
                  </h3>
                </div>
                <ul className="space-y-2 text-amber-800">
                  {[1, 2, 3, 4].map((pointNum) => (
                    <li key={pointNum}>
                      • {t(`etudierEnFrance:parisSaclay.importantPoints.${pointNum}`)}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold mb-6">
            {t('etudierEnFrance:cta.title')}
          </h2>
          <p className="text-lg lg:text-xl mb-8 text-blue-100">
            {t('etudierEnFrance:cta.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/?tab=accompany#accompany-section" className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              {t('etudierEnFrance:cta.button')}
            </Link>
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
      ...(await serverSideTranslations(locale, ['authModal', 'common', 'etudierEnFrance'])),
    },
  };
}
export default EtudierEnFranceGuide;
