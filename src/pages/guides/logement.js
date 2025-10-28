// src/pages/guides/logement.js
'use client';

import { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { trackPageView } from '../../lib/gtag';
import Head from 'next/head';
import Footer from '../../components/Footer';
import NavBar from '../../components/NavBar';
import { 
  Home, 
  Building, 
  Users, 
  MapPin, 
  Euro, 
  Shield,
  CheckCircle, 
  AlertTriangle,
  Search,
  Phone,
  Mail,
  Calendar,
  FileText,
  CreditCard,
  Key,
  Wifi,
  Car,
  Heart,
  Star,
  ExternalLink,
  ChevronUp,
  Target,
  Award,
  ChevronRight,
  ChevronDown
} from 'lucide-react';
import Link from 'next/link';

function LogementGuide() {
  const { t } = useTranslation(['common', 'logement']);
  const [activeTab, setActiveTab] = useState('types');
  const [expandedSection, setExpandedSection] = useState(null);

  useEffect(() => {
    trackPageView('guide_logement');
  }, []);

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const quickStats = [
    { number: '300-800€', label: t('logement:quickStats.budget'), icon: Euro },
    { number: '30-45m²', label: t('logement:quickStats.surface'), icon: Home },
    { number: '1-3', label: t('logement:quickStats.notice'), icon: Calendar },
    { number: '200€', label: t('logement:quickStats.apl'), icon: Shield }
  ];

  const typesLogement = [
    {
      title: t('logement:types.crous.title'),
      description: t('logement:types.crous.description'),
      price: t('logement:types.crous.price'),
      advantages: [
        t('logement:types.crous.advantages.1'),
        t('logement:types.crous.advantages.2'),
        t('logement:types.crous.advantages.3'),
        t('logement:types.crous.advantages.4')
      ],
      disadvantages: [
        t('logement:types.crous.disadvantages.1'),
        t('logement:types.crous.disadvantages.2'),
        t('logement:types.crous.disadvantages.3'),
        t('logement:types.crous.disadvantages.4')
      ],
      icon: Building,
      color: 'green'
    },
    {
      title: t('logement:types.privateResidence.title'),
      description: t('logement:types.privateResidence.description'),
      price: t('logement:types.privateResidence.price'),
      advantages: [
        t('logement:types.privateResidence.advantages.1'),
        t('logement:types.privateResidence.advantages.2'),
        t('logement:types.privateResidence.advantages.3'),
        t('logement:types.privateResidence.advantages.4')
      ],
      disadvantages: [
        t('logement:types.privateResidence.disadvantages.1'),
        t('logement:types.privateResidence.disadvantages.2'),
        t('logement:types.privateResidence.disadvantages.3'),
        t('logement:types.privateResidence.disadvantages.4')
      ],
      icon: Building,
      color: 'blue'
    },
    {
      title: t('logement:types.privateApartment.title'),
      description: t('logement:types.privateApartment.description'),
      price: t('logement:types.privateApartment.price'),
      advantages: [
        t('logement:types.privateApartment.advantages.1'),
        t('logement:types.privateApartment.advantages.2'),
        t('logement:types.privateApartment.advantages.3'),
        t('logement:types.privateApartment.advantages.4')
      ],
      disadvantages: [
        t('logement:types.privateApartment.disadvantages.1'),
        t('logement:types.privateApartment.disadvantages.2'),
        t('logement:types.privateApartment.disadvantages.3'),
        t('logement:types.privateApartment.disadvantages.4')
      ],
      icon: Home,
      color: 'purple'
    },
    {
      title: t('logement:types.flatShare.title'),
      description: t('logement:types.flatShare.description'),
      price: t('logement:types.flatShare.price'),
      advantages: [
        t('logement:types.flatShare.advantages.1'),
        t('logement:types.flatShare.advantages.2'),
        t('logement:types.flatShare.advantages.3'),
        t('logement:types.flatShare.advantages.4')
      ],
      disadvantages: [
        t('logement:types.flatShare.disadvantages.1'),
        t('logement:types.flatShare.disadvantages.2'),
        t('logement:types.flatShare.disadvantages.3'),
        t('logement:types.flatShare.disadvantages.4')
      ],
      icon: Users,
      color: 'orange'
    },
    {
      title: t('logement:types.homestay.title'),
      description: t('logement:types.homestay.description'),
      price: t('logement:types.homestay.price'),
      advantages: [
        t('logement:types.homestay.advantages.1'),
        t('logement:types.homestay.advantages.2'),
        t('logement:types.homestay.advantages.3'),
        t('logement:types.homestay.advantages.4')
      ],
      disadvantages: [
        t('logement:types.homestay.disadvantages.1'),
        t('logement:types.homestay.disadvantages.2'),
        t('logement:types.homestay.disadvantages.3'),
        t('logement:types.homestay.disadvantages.4')
      ],
      icon: Heart,
      color: 'pink'
    },
    {
      title: t('logement:types.hostel.title'),
      description: t('logement:types.hostel.description'),
      price: t('logement:types.hostel.price'),
      advantages: [
        t('logement:types.hostel.advantages.1'),
        t('logement:types.hostel.advantages.2'),
        t('logement:types.hostel.advantages.3'),
        t('logement:types.hostel.advantages.4')
      ],
      disadvantages: [
        t('logement:types.hostel.disadvantages.1'),
        t('logement:types.hostel.disadvantages.2'),
        t('logement:types.hostel.disadvantages.3'),
        t('logement:types.hostel.disadvantages.4')
      ],
      icon: MapPin,
      color: 'red'
    }
  ];

  const villes = [
    {
      name: 'Paris',
      studios: t('logement:cities.paris.studios'),
      coloc: t('logement:cities.paris.coloc'),
      crous: t('logement:cities.paris.crous'),
      tips: t('logement:cities.paris.tips')
    },
    {
      name: 'Lyon',
      studios: t('logement:cities.lyon.studios'),
      coloc: t('logement:cities.lyon.coloc'),
      crous: t('logement:cities.lyon.crous'),
      tips: t('logement:cities.lyon.tips')
    },
    {
      name: 'Marseille',
      studios: t('logement:cities.marseille.studios'),
      coloc: t('logement:cities.marseille.coloc'),
      crous: t('logement:cities.marseille.crous'),
      tips: t('logement:cities.marseille.tips')
    },
    {
      name: 'Toulouse',
      studios: t('logement:cities.toulouse.studios'),
      coloc: t('logement:cities.toulouse.coloc'),
      crous: t('logement:cities.toulouse.crous'),
      tips: t('logement:cities.toulouse.tips')
    },
    {
      name: 'Lille',
      studios: t('logement:cities.lille.studios'),
      coloc: t('logement:cities.lille.coloc'),
      crous: t('logement:cities.lille.crous'),
      tips: t('logement:cities.lille.tips')
    },
    {
      name: 'Bordeaux',
      studios: t('logement:cities.bordeaux.studios'),
      coloc: t('logement:cities.bordeaux.coloc'),
      crous: t('logement:cities.bordeaux.crous'),
      tips: t('logement:cities.bordeaux.tips')
    }
  ];

  const etapesRecherche = [
    {
      step: 1,
      title: t('logement:search.steps.1.title'),
      description: t('logement:search.steps.1.description'),
      details: [
        t('logement:search.steps.1.details.1'),
        t('logement:search.steps.1.details.2'),
        t('logement:search.steps.1.details.3'),
        t('logement:search.steps.1.details.4')
      ],
      duration: t('logement:search.steps.1.duration')
    },
    {
      step: 2,
      title: t('logement:search.steps.2.title'),
      description: t('logement:search.steps.2.description'),
      details: [
        t('logement:search.steps.2.details.1'),
        t('logement:search.steps.2.details.2'),
        t('logement:search.steps.2.details.3'),
        t('logement:search.steps.2.details.4')
      ],
      duration: t('logement:search.steps.2.duration')
    },
    {
      step: 3,
      title: t('logement:search.steps.3.title'),
      description: t('logement:search.steps.3.description'),
      details: [
        t('logement:search.steps.3.details.1'),
        t('logement:search.steps.3.details.2'),
        t('logement:search.steps.3.details.3'),
        t('logement:search.steps.3.details.4')
      ],
      duration: t('logement:search.steps.3.duration')
    },
    {
      step: 4,
      title: t('logement:search.steps.4.title'),
      description: t('logement:search.steps.4.description'),
      details: [
        t('logement:search.steps.4.details.1'),
        t('logement:search.steps.4.details.2'),
        t('logement:search.steps.4.details.3'),
        t('logement:search.steps.4.details.4')
      ],
      duration: t('logement:search.steps.4.duration')
    },
    {
      step: 5,
      title: t('logement:search.steps.5.title'),
      description: t('logement:search.steps.5.description'),
      details: [
        t('logement:search.steps.5.details.1'),
        t('logement:search.steps.5.details.2'),
        t('logement:search.steps.5.details.3'),
        t('logement:search.steps.5.details.4')
      ],
      duration: t('logement:search.steps.5.duration')
    },
    {
      step: 6,
      title: t('logement:search.steps.6.title'),
      description: t('logement:search.steps.6.description'),
      details: [
        t('logement:search.steps.6.details.1'),
        t('logement:search.steps.6.details.2'),
        t('logement:search.steps.6.details.3'),
        t('logement:search.steps.6.details.4')
      ],
      duration: t('logement:search.steps.6.duration')
    }
  ];

  const sites = [
    {
      name: 'Lokaviz',
      url: 'https://www.lokaviz.fr',
      description: t('logement:search.sites.lokaviz.description'),
      type: t('logement:search.sites.lokaviz.type'),
      specialty: t('logement:search.sites.lokaviz.specialty')
    },
    {
      name: 'Studapart',
      url: 'https://www.studapart.com',
      description: t('logement:search.sites.studapart.description'),
      type: t('logement:search.sites.studapart.type'),
      specialty: t('logement:search.sites.studapart.specialty')
    },
    {
      name: 'Seloger',
      url: 'https://www.seloger.com',
      description: t('logement:search.sites.seloger.description'),
      type: t('logement:search.sites.seloger.type'),
      specialty: t('logement:search.sites.seloger.specialty')
    },
    {
      name: 'Leboncoin',
      url: 'https://www.leboncoin.fr',
      description: t('logement:search.sites.leboncoin.description'),
      type: t('logement:search.sites.leboncoin.type'),
      specialty: t('logement:search.sites.leboncoin.specialty')
    },
    {
      name: 'Appartager',
      url: 'https://www.appartager.com',
      description: t('logement:search.sites.appartager.description'),
      type: t('logement:search.sites.appartager.type'),
      specialty: t('logement:search.sites.appartager.specialty')
    },
    {
      name: 'Adele',
      url: 'https://www.adele.org',
      description: t('logement:search.sites.adele.description'),
      type: t('logement:search.sites.adele.type'),
      specialty: t('logement:search.sites.adele.specialty')
    }
  ];

  const aides = [
    {
      name: t('logement:aids.apl.name'),
      description: t('logement:aids.apl.description'),
      montant: t('logement:aids.apl.montant'),
      conditions: [
        t('logement:aids.apl.conditions.1'),
        t('logement:aids.apl.conditions.2'),
        t('logement:aids.apl.conditions.3')
      ],
      demarche: t('logement:aids.apl.demarche')
    },
    {
      name: t('logement:aids.als.name'),
      description: t('logement:aids.als.description'),
      montant: t('logement:aids.als.montant'),
      conditions: [
        t('logement:aids.als.conditions.1'),
        t('logement:aids.als.conditions.2'),
        t('logement:aids.als.conditions.3')
      ],
      demarche: t('logement:aids.als.demarche')
    },
    {
      name: t('logement:aids.visale.name'),
      description: t('logement:aids.visale.description'),
      montant: t('logement:aids.visale.montant'),
      conditions: [
        t('logement:aids.visale.conditions.1'),
        t('logement:aids.visale.conditions.2'),
        t('logement:aids.visale.conditions.3')
      ],
      demarche: t('logement:aids.visale.demarche')
    },
    {
      name: t('logement:aids.mobilijeune.name'),
      description: t('logement:aids.mobilijeune.description'),
      montant: t('logement:aids.mobilijeune.montant'),
      conditions: [
        t('logement:aids.mobilijeune.conditions.1'),
        t('logement:aids.mobilijeune.conditions.2'),
        t('logement:aids.mobilijeune.conditions.3')
      ],
      demarche: t('logement:aids.mobilijeune.demarche')
    }
  ];

  const documents = [
    {
      category: t('logement:documents.identity.title'),
      items: [
        t('logement:documents.identity.1'),
        t('logement:documents.identity.2'),
        t('logement:documents.identity.3'),
        t('logement:documents.identity.4')
      ]
    },
    {
      category: t('logement:documents.income.title'),
      items: [
        t('logement:documents.income.1'),
        t('logement:documents.income.2'),
        t('logement:documents.income.3'),
        t('logement:documents.income.4')
      ]
    },
    {
      category: t('logement:documents.guarantor.title'),
      items: [
        t('logement:documents.guarantor.1'),
        t('logement:documents.guarantor.2'),
        t('logement:documents.guarantor.3'),
        t('logement:documents.guarantor.4')
      ]
    },
    {
      category: t('logement:documents.insurance.title'),
      items: [
        t('logement:documents.insurance.1'),
        t('logement:documents.insurance.2'),
        t('logement:documents.insurance.3'),
        t('logement:documents.insurance.4')
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>{t('logement:meta.title')}</title>
        <meta name="description" content={t('logement:meta.description')} />
        <meta name="keywords" content={t('logement:meta.keywords')} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        
        <meta property="og:title" content={t('logement:meta.ogTitle')} />
        <meta property="og:description" content={t('logement:meta.ogDescription')} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://wendogo.com/guides/logement" />
        <meta property="og:image" content="https://wendogo.com/images/guide-logement.jpg" />
        
        <link rel="canonical" href="https://wendogo.com/guides/logement" />
        
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": t('logement:meta.ogTitle'),
            "description": t('logement:meta.ogDescription'),
            "author": {
              "@type": "Organization",
              "name": "Wendogo"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Wendogo"
            },
            "datePublished": "2024-01-15",
            "dateModified": "2024-12-15"
          })
        }} />
      </Head>

      <NavBar variant="simple" languageSelectorVariant="light" />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-600 via-red-600 to-pink-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-full p-4">
                <Home className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              {t('logement:hero.title')}
            </h1>
            <p className="text-lg sm:text-xl text-orange-100 max-w-3xl mx-auto mb-8">
              {t('logement:hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="bg-white text-orange-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                {t('logement:hero.ctaHelp')}
              </Link>
              <Link href="/guides/campus-france" className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-orange-600 transition-colors">
                {t('logement:hero.ctaCampusFrance')}
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
                <div className="bg-orange-100 w-12 h-12 lg:w-16 lg:h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                  <stat.icon className="w-6 h-6 lg:w-8 lg:h-8 text-orange-600" />
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
          <div className="flex space-x-4 lg:space-x-6 border-b border-gray-200 overflow-x-auto">
            {[
              { id: 'types', label: t('logement:tabs.types'), icon: Home },
              { id: 'recherche', label: t('logement:tabs.search'), icon: Search },
              { id: 'villes', label: t('logement:tabs.cities'), icon: MapPin },
              { id: 'aides', label: t('logement:tabs.aids'), icon: Shield },
              { id: 'documents', label: t('logement:tabs.documents'), icon: FileText }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center py-4 px-2 font-medium border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-orange-600 text-orange-600'
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
          
          {/* Types de logements */}
          {activeTab === 'types' && (
            <div className="space-y-12">
              <div className="text-center">
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                  {t('logement:types.title')}
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  {t('logement:types.subtitle')}
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {typesLogement.map((type, index) => (
                  <div key={index} className={`bg-${type.color}-50 border border-${type.color}-200 rounded-xl p-6 hover:shadow-lg transition-shadow`}>
                    <div className={`bg-${type.color}-100 w-12 h-12 rounded-full flex items-center justify-center mb-4`}>
                      <type.icon className={`w-6 h-6 text-${type.color}-600`} />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {type.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">
                      {type.description}
                    </p>
                    <div className="flex items-center mb-4">
                      <Euro className="w-4 h-4 text-gray-500 mr-2" />
                      <span className="font-semibold text-gray-900">{type.price}</span>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-medium text-green-900 mb-1">{t('logement:types.advantagesLabel')}</h4>
                        <ul className="text-xs text-green-800 space-y-1">
                          {type.advantages.map((advantage, i) => (
                            <li key={i} className="flex items-center">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              {advantage}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-red-900 mb-1">{t('logement:types.disadvantagesLabel')}</h4>
                        <ul className="text-xs text-red-800 space-y-1">
                          {type.disadvantages.map((disadvantage, i) => (
                            <li key={i} className="flex items-center">
                              <AlertTriangle className="w-3 h-3 mr-1" />
                              {disadvantage}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <Target className="w-6 h-6 text-blue-600 mr-3" />
                  <h3 className="text-lg font-semibold text-blue-900">
                    {t('logement:types.recommendations.title')}
                  </h3>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-2">{t('logement:types.recommendations.limited.title')}</h4>
                    <ul className="text-blue-800 text-sm space-y-1">
                      <li>• {t('logement:types.recommendations.limited.1')}</li>
                      <li>• {t('logement:types.recommendations.limited.2')}</li>
                      <li>• {t('logement:types.recommendations.limited.3')}</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-2">{t('logement:types.recommendations.comfortable.title')}</h4>
                    <ul className="text-blue-800 text-sm space-y-1">
                      <li>• {t('logement:types.recommendations.comfortable.1')}</li>
                      <li>• {t('logement:types.recommendations.comfortable.2')}</li>
                      <li>• {t('logement:types.recommendations.comfortable.3')}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Recherche */}
          {activeTab === 'recherche' && (
            <div className="space-y-12">
              <div className="text-center">
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                  {t('logement:search.title')}
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  {t('logement:search.subtitle')}
                </p>
              </div>

              <div className="space-y-8">
                {etapesRecherche.map((etape, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-start">
                      <div className="bg-orange-600 text-white rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold mr-6 mt-1">
                        {etape.step}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-xl font-semibold text-gray-900">
                            {etape.title}
                          </h3>
                          <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
                            {etape.duration}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-4">{etape.description}</p>
                        <div className="grid md:grid-cols-2 gap-3">
                          {etape.details.map((detail, detailIndex) => (
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

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-6">
                  {t('logement:search.sites.title')}
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sites.map((site, index) => (
                    <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-gray-900">{site.name}</h4>
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                          {site.type}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mb-3">{site.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">{site.specialty}</span>
                        <a 
                          href={site.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-orange-600 hover:text-orange-800 text-sm"
                        >
                          {t('logement:search.sites.visit')}
                          <ExternalLink className="w-3 h-3 ml-1" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <AlertTriangle className="w-6 h-6 text-amber-600 mr-3" />
                  <h3 className="text-lg font-semibold text-amber-900">
                    {t('logement:search.tips.title')}
                  </h3>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-amber-900 mb-2">{t('logement:search.tips.timing.title')}</h4>
                    <ul className="text-amber-800 text-sm space-y-1">
                      <li>• {t('logement:search.tips.timing.1')}</li>
                      <li>• {t('logement:search.tips.timing.2')}</li>
                      <li>• {t('logement:search.tips.timing.3')}</li>
                      <li>• {t('logement:search.tips.timing.4')}</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-amber-900 mb-2">{t('logement:search.tips.strategy.title')}</h4>
                    <ul className="text-amber-800 text-sm space-y-1">
                      <li>• {t('logement:search.tips.strategy.1')}</li>
                      <li>• {t('logement:search.tips.strategy.2')}</li>
                      <li>• {t('logement:search.tips.strategy.3')}</li>
                      <li>• {t('logement:search.tips.strategy.4')}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Villes */}
          {activeTab === 'villes' && (
            <div className="space-y-12">
              <div className="text-center">
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                  {t('logement:cities.title')}
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  {t('logement:cities.subtitle')}
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {villes.map((ville, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-center mb-4">
                      <MapPin className="w-6 h-6 text-orange-600 mr-3" />
                      <h3 className="text-lg font-semibold text-gray-900">{ville.name}</h3>
                    </div>
                    
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">{t('logement:cities.studios')}</span>
                        <span className="font-semibold text-gray-900">{ville.studios}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">{t('logement:cities.coloc')}</span>
                        <span className="font-semibold text-gray-900">{ville.coloc}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">{t('logement:cities.crous')}</span>
                        <span className="font-semibold text-green-700">{ville.crous}</span>
                      </div>
                    </div>
                    
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <div className="flex items-center mb-2">
                        <Star className="w-4 h-4 text-blue-600 mr-2" />
                        <span className="text-sm font-semibold text-blue-900">{t('logement:cities.advice')}</span>
                      </div>
                      <p className="text-xs text-blue-800">{ville.tips}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">
                  {t('logement:cities.priceFactors.title')}
                </h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-semibold text-orange-900 mb-3">{t('logement:cities.priceFactors.increase.title')}</h4>
                    <ul className="space-y-2 text-orange-800">
                      <li className="flex items-center">
                        <ChevronRight className="w-4 h-4 mr-2" />
                        <span className="text-sm">{t('logement:cities.priceFactors.increase.1')}</span>
                      </li>
                      <li className="flex items-center">
                        <ChevronRight className="w-4 h-4 mr-2" />
                        <span className="text-sm">{t('logement:cities.priceFactors.increase.2')}</span>
                      </li>
                      <li className="flex items-center">
                        <ChevronRight className="w-4 h-4 mr-2" />
                        <span className="text-sm">{t('logement:cities.priceFactors.increase.3')}</span>
                      </li>
                      <li className="flex items-center">
                        <ChevronRight className="w-4 h-4 mr-2" />
                        <span className="text-sm">{t('logement:cities.priceFactors.increase.4')}</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-green-900 mb-3">{t('logement:cities.priceFactors.reduce.title')}</h4>
                    <ul className="space-y-2 text-green-800">
                      <li className="flex items-center">
                        <ChevronRight className="w-4 h-4 mr-2" />
                        <span className="text-sm">{t('logement:cities.priceFactors.reduce.1')}</span>
                      </li>
                      <li className="flex items-center">
                        <ChevronRight className="w-4 h-4 mr-2" />
                        <span className="text-sm">{t('logement:cities.priceFactors.reduce.2')}</span>
                      </li>
                      <li className="flex items-center">
                        <ChevronRight className="w-4 h-4 mr-2" />
                        <span className="text-sm">{t('logement:cities.priceFactors.reduce.3')}</span>
                      </li>
                      <li className="flex items-center">
                        <ChevronRight className="w-4 h-4 mr-2" />
                        <span className="text-sm">{t('logement:cities.priceFactors.reduce.4')}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Aides */}
          {activeTab === 'aides' && (
            <div className="space-y-12">
              <div className="text-center">
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                  {t('logement:aids.title')}
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  {t('logement:aids.subtitle')}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {aides.map((aide, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-center mb-4">
                      <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                        <Shield className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{aide.name}</h3>
                        <p className="text-sm text-gray-600">{aide.description}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">{t('logement:aids.amount')}</span>
                        <span className="font-semibold text-green-700">{aide.montant}</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">{t('logement:aids.conditions')}</h4>
                        <ul className="space-y-1">
                          {aide.conditions.map((condition, i) => (
                            <li key={i} className="flex items-center text-sm text-gray-700">
                              <CheckCircle className="w-3 h-3 text-green-500 mr-2" />
                              {condition}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <div className="flex items-center">
                        <FileText className="w-4 h-4 text-blue-600 mr-2" />
                        <span className="text-sm font-semibold text-blue-900">{t('logement:aids.procedure')}</span>
                      </div>
                      <p className="text-xs text-blue-800 mt-1">{aide.demarche}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <Award className="w-6 h-6 text-green-600 mr-3" />
                  <h3 className="text-lg font-semibold text-green-900">
                    {t('logement:aids.simulation.title')}
                  </h3>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-900 mb-1">200€</div>
                    <div className="text-sm text-green-800">{t('logement:aids.simulation.aplAverage')}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-900 mb-1">100€</div>
                    <div className="text-sm text-green-800">{t('logement:aids.simulation.mobiliMax')}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-900 mb-1">300€</div>
                    <div className="text-sm text-green-800">{t('logement:aids.simulation.totalSavings')}</div>
                  </div>
                </div>
                <p className="text-green-800 text-sm mt-4 text-center">
                  {t('logement:aids.simulation.description')}
                </p>
              </div>
            </div>
          )}

          {/* Documents */}
          {activeTab === 'documents' && (
            <div className="space-y-12">
              <div className="text-center">
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                  {t('logement:documents.title')}
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  {t('logement:documents.subtitle')}
                </p>
              </div>

              <div className="space-y-8">
                {documents.map((category, categoryIndex) => (
                  <div key={categoryIndex} className="border border-gray-200 rounded-lg">
                    <button
                      onClick={() => toggleSection(category.category)}
                      className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                    >
                      <h3 className="text-lg font-semibold text-gray-900">{category.category}</h3>
                      {expandedSection === category.category ? 
                        <ChevronUp className="w-5 h-5 text-gray-500" /> : 
                        <ChevronDown className="w-5 h-5 text-gray-500" />
                      }
                    </button>
                    {expandedSection === category.category && (
                      <div className="px-6 pb-4 border-t border-gray-200">
                        <div className="grid md:grid-cols-2 gap-4 pt-4">
                          {category.items.map((item, itemIndex) => (
                            <div key={itemIndex} className="flex items-center bg-gray-50 p-3 rounded-lg">
                              <FileText className="w-4 h-4 text-gray-600 mr-3" />
                              <span className="text-sm text-gray-800">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <AlertTriangle className="w-6 h-6 text-red-600 mr-3" />
                  <h3 className="text-lg font-semibold text-red-900">
                    {t('logement:documents.foreignStudents.title')}
                  </h3>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-red-900 mb-2">{t('logement:documents.foreignStudents.additional.title')}</h4>
                    <ul className="text-red-800 text-sm space-y-1">
                      <li>• {t('logement:documents.foreignStudents.additional.1')}</li>
                      <li>• {t('logement:documents.foreignStudents.additional.2')}</li>
                      <li>• {t('logement:documents.foreignStudents.additional.3')}</li>
                      <li>• {t('logement:documents.foreignStudents.additional.4')}</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-900 mb-2">{t('logement:documents.foreignStudents.difficulties.title')}</h4>
                    <ul className="text-red-800 text-sm space-y-1">
                      <li>• {t('logement:documents.foreignStudents.difficulties.1')}</li>
                      <li>• {t('logement:documents.foreignStudents.difficulties.2')}</li>
                      <li>• {t('logement:documents.foreignStudents.difficulties.3')}</li>
                      <li>• {t('logement:documents.foreignStudents.difficulties.4')}</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">
                  {t('logement:documents.checklist.title')}
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-3">{t('logement:documents.checklist.beforeVisit.title')}</h4>
                    <ul className="space-y-2 text-blue-800 text-sm">
                      <li>☑️ {t('logement:documents.checklist.beforeVisit.1')}</li>
                      <li>☑️ {t('logement:documents.checklist.beforeVisit.2')}</li>
                      <li>☑️ {t('logement:documents.checklist.beforeVisit.3')}</li>
                      <li>☑️ {t('logement:documents.checklist.beforeVisit.4')}</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-3">{t('logement:documents.checklist.duringVisit.title')}</h4>
                    <ul className="space-y-2 text-blue-800 text-sm">
                      <li>☑️ {t('logement:documents.checklist.duringVisit.1')}</li>
                      <li>☑️ {t('logement:documents.checklist.duringVisit.2')}</li>
                      <li>☑️ {t('logement:documents.checklist.duringVisit.3')}</li>
                      <li>☑️ {t('logement:documents.checklist.duringVisit.4')}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-orange-600 to-red-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold mb-6">
            {t('logement:cta.title')}
          </h2>
          <p className="text-lg lg:text-xl mb-8 text-orange-100">
            {t('logement:cta.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="bg-white text-orange-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              {t('logement:cta.helpButton')}
            </Link>
            <Link href="/guides/visa-etudiant" className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-orange-600 transition-colors">
              {t('logement:cta.visaGuideButton')}
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
      ...(await serverSideTranslations(locale, ['authModal', 'common', 'logement'])),
    },
  };
}
export default LogementGuide;
