// src/pages/guides/etudier-en-france.js
'use client';

import { useEffect, useState } from 'react';
import { trackPageView } from '../../lib/gtag';
import Head from 'next/head';
import Footer from '../../components/Footer';
import NavBar from '../../components/NavBar';
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

  useEffect(() => {
    trackPageView('guide_etudier_en_france');
  }, []);

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const quickStats = [
    { number: '2,7M', label: 'Étudiants en France', icon: Users },
    { number: '370K', label: 'Étudiants internationaux', icon: Globe },
    { number: '3 500', label: 'Établissements', icon: GraduationCap },
    { number: '70', label: 'Pays représentés', icon: MapPin }
  ];

  const campusFranceCountries = {
    'Afrique': [
      'Algérie', 'Bénin', 'Burkina Faso', 'Burundi', 'Cameroun', 'Comores', 'Congo', 
      'Côte d\'Ivoire', 'Djibouti', 'Éthiopie', 'Gabon', 'Ghana', 'Guinée', 'Kenya', 
      'Madagascar', 'Mali', 'Maurice', 'Mauritanie', 'Niger', 'Nigeria', 
      'République centrafricaine', 'République démocratique du Congo', 'Rwanda', 
      'Sénégal', 'Tchad', 'Togo', 'Afrique du Sud'
    ],
    'Maghreb / Moyen-Orient': [
      'Arabie Saoudite', 'Bahreïn', 'Égypte', 'Émirats Arabes Unis', 'Iran', 'Israël', 
      'Jordanie', 'Koweït', 'Liban', 'Maroc', 'Qatar', 'Tunisie'
    ],
    'Amériques': [
      'Argentine', 'Bolivie', 'Brésil', 'Canada', 'Chili', 'Colombie', 'Équateur', 
      'États-Unis', 'Haïti', 'Mexique', 'Pérou', 'République dominicaine'
    ],
    'Asie': [
      'Birmanie', 'Cambodge', 'Chine', 'Corée du Sud', 'Inde', 'Indonésie', 'Japon', 
      'Malaisie', 'Népal', 'Pakistan', 'Singapour', 'Taïwan', 'Thaïlande', 'Vietnam'
    ],
    'Europe / Eurasie': [
      'Arménie', 'Azerbaïdjan', 'Géorgie', 'Royaume-Uni', 'Russie', 'Turquie', 'Ukraine'
    ]
  };

  const parcoursupFormations = [
    {
      title: 'BTS (Brevet de Technicien Supérieur)',
      description: 'Formation professionnelle de 2 ans dans de nombreux domaines',
      duration: '2 ans',
      level: 'Bac+2'
    },
    {
      title: 'CPGE (Classes Préparatoires aux Grandes Écoles)',
      description: 'Préparation intensive aux concours des grandes écoles',
      duration: '2 ans',
      level: 'Bac+2'
    },
    {
      title: 'DCG (Diplôme de Comptabilité et Gestion)',
      description: 'Formation spécialisée en comptabilité et gestion',
      duration: '3 ans',
      level: 'Bac+3'
    }
  ];

  const parisAcalaySteps = [
    {
      step: 1,
      title: 'Candidature (Mars)',
      description: 'Via INCEPTION pour M1 spécifiques et M2',
      details: ['CV professionnel', 'Lettres de motivation', 'Relevés de notes', 'Diplômes'],
      url: 'https://www.universite-paris-saclay.fr/admission/etre-candidat-un-master-paris-saclay'
    },
    {
      step: 2,
      title: 'Procédure d\'admission (Mars-Mai)',
      description: 'Étude du dossier par l\'université',
      details: ['Évaluation du dossier', 'Réponse par email', 'Confirmation rapide si accepté']
    },
    {
      step: 3,
      title: 'Campus France (Si accepté)',
      description: 'Procédure visa après acceptation',
      details: ['Onglet "Je suis accepté"', 'Télécharger attestation', 'Procédure visa']
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Guide complet pour étudier en France - Wendogo</title>
        <meta name="description" content="Guide complet pour étudier en France : Parcoursup, Campus France, procédures d'admission, universités. Tout ce qu'il faut savoir pour réussir votre projet d'études." />
        <meta name="keywords" content="étudier en France, Campus France, Parcoursup, université française, étudiant étranger, admission France, visa étudiant" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        
        <meta property="og:title" content="Guide complet pour étudier en France - Wendogo" />
        <meta property="og:description" content="Découvrez tout ce qu'il faut savoir pour étudier en France : procédures, démarches, conseils d'experts." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://wendogo.com/guides/etudier-en-france" />
        <meta property="og:image" content="https://wendogo.com/images/guide-etudier-france.jpg" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Guide complet pour étudier en France" />
        <meta name="twitter:description" content="Procédures, démarches et conseils pour réussir vos études en France" />
        
        <link rel="canonical" href="https://wendogo.com/guides/etudier-en-france" />
        
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Guide complet pour étudier en France",
            "description": "Guide complet pour étudier en France : Parcoursup, Campus France, procédures d'admission",
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

      <NavBar variant="simple" />

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
              Guide complet pour étudier en France
            </h1>
            <p className="text-lg sm:text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              Découvrez tout ce qu'il faut savoir pour réussir votre projet d'études en France : 
              procédures, démarches et conseils d'experts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/?tab=accompany#accompany-section" className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Me faire accompagner
              </Link>
              {/* <Link href="/contact" className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                Parler à un conseiller
              </Link> */}
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
              { id: 'overview', label: 'Vue d\'ensemble', icon: Globe },
              { id: 'campus-france', label: 'Campus France', icon: FileText },
              { id: 'parcoursup', label: 'Parcoursup', icon: GraduationCap },
              { id: 'paris-saclay', label: 'Paris-Saclay', icon: Award }
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
                  Pourquoi étudier en France ?
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  La France accueille chaque année plus de 370 000 étudiants internationaux, 
                  ce qui en fait la 4ème destination mondiale pour les études supérieures.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    title: 'Excellence académique',
                    description: 'Universités reconnues mondialement avec des programmes d\'excellence',
                    icon: Award,
                    color: 'yellow'
                  },
                  {
                    title: 'Diversité des formations',
                    description: 'Plus de 3 500 établissements proposant tous types de formations',
                    icon: BookOpen,
                    color: 'blue'
                  },
                  {
                    title: 'Coût accessible',
                    description: 'Frais de scolarité abordables par rapport à d\'autres destinations',
                    icon: Star,
                    color: 'green'
                  },
                  {
                    title: 'Qualité de vie',
                    description: 'Culture riche, patrimoine exceptionnel et art de vivre français',
                    icon: Heart,
                    color: 'red'
                  },
                  {
                    title: 'Opportunités professionnelles',
                    description: 'Marché du travail dynamique et possibilités de stage',
                    icon: Users,
                    color: 'purple'
                  },
                  {
                    title: 'Langue française',
                    description: 'Maîtrise du français, atout professionnel international',
                    icon: Globe,
                    color: 'indigo'
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
            </div>
          )}

          {/* Campus France Tab */}
          {activeTab === 'campus-france' && (
            <div className="space-y-12">
              <div className="text-center">
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                  Campus France : Votre porte d'entrée vers la France
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Campus France est l'agence nationale française qui accompagne les étudiants 
                  internationaux dans leur projet d'études en France.
                </p>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 lg:p-8">
                <h3 className="text-xl lg:text-2xl font-semibold text-blue-900 mb-4">
                  Qu'est-ce que Campus France ?
                </h3>
                <div className="space-y-4 text-blue-800">
                  <p>
                    Campus France est l'agence nationale française en charge de la promotion 
                    de l'enseignement supérieur français à l'étranger et de l'accueil des 
                    étudiants internationaux.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold mb-2">Missions principales :</h4>
                      <ul className="space-y-1 text-sm">
                        <li>• Promouvoir les universités françaises</li>
                        <li>• Informer sur les formations</li>
                        <li>• Gérer les candidatures</li>
                        <li>• Faciliter l'obtention du visa</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Services proposés :</h4>
                      <ul className="space-y-1 text-sm">
                        <li>• Plateforme "Études en France"</li>
                        <li>• Conseil personnalisé</li>
                        <li>• Réseau France Alumni</li>
                        <li>• Support visa étudiant</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl lg:text-2xl font-semibold text-gray-900 mb-6">
                  Pays concernés par la procédure Campus France
                </h3>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center">
                    <AlertCircle className="w-5 h-5 text-amber-600 mr-2" />
                    <p className="text-amber-800 font-medium">
                      La procédure Campus France est obligatoire pour les ressortissants 
                      des pays suivants :
                    </p>
                  </div>
                </div>
                
                <div className="space-y-6">
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

                <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                    <p className="text-green-800">
                      <strong>Comment savoir si vous êtes concerné ?</strong> Si vous résidez 
                      dans l'un de ces pays, la procédure Campus France est obligatoire.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6 lg:p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Liens utiles Campus France
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <a 
                    href="https://www.campusfrance.org" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                  >
                    <div>
                      <div className="font-semibold text-blue-900">Site officiel</div>
                      <div className="text-sm text-blue-700">campusfrance.org</div>
                    </div>
                    <ExternalLink className="w-5 h-5 text-blue-600" />
                  </a>
                  <a 
                    href="https://pastel.diplomatie.gouv.fr/etudesenfrance" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
                  >
                    <div>
                      <div className="font-semibold text-green-900">Plateforme candidature</div>
                      <div className="text-sm text-green-700">Études en France</div>
                    </div>
                    <ExternalLink className="w-5 h-5 text-green-600" />
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* Parcoursup Tab */}
          {activeTab === 'parcoursup' && (
            <div className="space-y-12">
              <div className="text-center">
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                  Parcoursup pour les étudiants étrangers
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Parcoursup est la plateforme nationale d'admission en première année 
                  de l'enseignement supérieur en France.
                </p>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <AlertCircle className="w-6 h-6 text-amber-600 mr-3" />
                  <h3 className="text-lg font-semibold text-amber-900">
                    Important à savoir
                  </h3>
                </div>
                <p className="text-amber-800">
                  Les étudiants étrangers n'ont pas d'accès direct aux universités françaises 
                  via Parcoursup. Cette plateforme est principalement destinée aux formations 
                  post-bac spécialisées.
                </p>
              </div>

              <div>
                <h3 className="text-xl lg:text-2xl font-semibold text-gray-900 mb-6">
                  Formations accessibles via Parcoursup
                </h3>
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

              <div className="bg-white border border-gray-200 rounded-xl p-6 lg:p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">
                  Calendrier Parcoursup
                </h3>
                <div className="space-y-4">
                  {[
                    { date: '15 janvier', action: 'Début de la formulation des vœux' },
                    { date: '13 mars', action: 'Clôture des vœux (23h59)' },
                    { date: '2 avril', action: 'Confirmation des vœux (23h59)' },
                    { date: '2 juin', action: 'Début des réponses aux admissions' },
                    { date: '11 juin', action: 'Phase complémentaire' },
                    { date: '11 juillet', action: 'Fin de la phase principale' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center">
                      <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4">
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{item.date}</div>
                        <div className="text-gray-600">{item.action}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-6">
                  Dossier requis pour candidater
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 rounded-lg p-6">
                    <h4 className="font-semibold text-blue-900 mb-3">Documents académiques</h4>
                    <ul className="space-y-2 text-blue-800">
                      <li>• Relevés de notes depuis 2020</li>
                      <li>• Scolarité de l'année en cours</li>
                      <li>• Attestation du Bac</li>
                      <li>• Relevé de notes du Bac</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 rounded-lg p-6">
                    <h4 className="font-semibold text-green-900 mb-3">Informations personnelles</h4>
                    <ul className="space-y-2 text-green-800">
                      <li>• Nom et prénom</li>
                      <li>• Numéro de téléphone</li>
                      <li>• Adresse email</li>
                      <li>• Adresse physique</li>
                      <li>• Coordonnées du représentant</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Paris-Saclay Tab */}
          {activeTab === 'paris-saclay' && (
            <div className="space-y-12">
              <div className="text-center">
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                  Processus d'admission Paris-Saclay
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  L'Université Paris-Saclay dispose d'une procédure d'admission spécifique 
                  pour ses programmes de Master.
                </p>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
                  <h3 className="text-lg font-semibold text-green-900">
                    Procédure totalement gratuite
                  </h3>
                </div>
                <p className="text-green-800">
                  Contrairement à d'autres universités, la candidature à l'Université 
                  Paris-Saclay est entièrement gratuite.
                </p>
              </div>

              <div>
                <h3 className="text-xl lg:text-2xl font-semibold text-gray-900 mb-6">
                  Étapes du processus
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
                                Accéder à la plateforme
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
                  Calendrier général Paris-Saclay
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Phase de candidature</h4>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 text-blue-600 mr-2" />
                        <span className="text-sm text-gray-700">Janvier : Ouverture candidatures</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 text-blue-600 mr-2" />
                        <span className="text-sm text-gray-700">Mars : Fermeture plateforme</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 text-blue-600 mr-2" />
                        <span className="text-sm text-gray-700">Avril-Mai : Réponses</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Phase visa</h4>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 text-green-600 mr-2" />
                        <span className="text-sm text-gray-700">Mai-Juillet : Campus France</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 text-green-600 mr-2" />
                        <span className="text-sm text-gray-700">Août-Septembre : Visa</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 text-green-600 mr-2" />
                        <span className="text-sm text-gray-700">Septembre : Arrivée</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <AlertCircle className="w-6 h-6 text-amber-600 mr-3" />
                  <h3 className="text-lg font-semibold text-amber-900">
                    Points importants
                  </h3>
                </div>
                <ul className="space-y-2 text-amber-800">
                  <li>• Ne pas postuler via Campus France normal</li>
                  <li>• Attendre l'acceptation avant de faire Campus France</li>
                  <li>• Commencer tôt (forte sélectivité)</li>
                  <li>• Vérifier les spécificités de votre Master</li>
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
            Prêt à concrétiser votre projet d'études en France ?
          </h2>
          <p className="text-lg lg:text-xl mb-8 text-blue-100">
            Nos conseillers experts vous accompagnent personnellement dans toutes 
            vos démarches, de l'orientation à l'obtention de votre visa.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/?tab=accompany#accompany-section" className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Me faire accompagner
            </Link>
            {/* <Link href="/contact" className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              Parler à un conseiller
            </Link> */}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default EtudierEnFranceGuide;
