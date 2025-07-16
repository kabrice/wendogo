// src/pages/guides/campus-france.js
'use client';

import { useEffect, useState } from 'react';
import { trackPageView } from '../../lib/gtag';
import Head from 'next/head';
import Footer from '../../components/Footer';
import NavBar from '../../components/NavBar';
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
      title: 'Phase préparatoire',
      subtitle: '6-8 mois avant',
      duration: '6-8 mois',
      icon: Target,
      color: 'blue'
    },
    {
      id: 'inscription',
      title: 'Inscription Campus France',
      subtitle: 'Octobre-Février',
      duration: '2-3 mois',
      icon: FileText,
      color: 'green'
    },
    {
      id: 'candidatures',
      title: 'Candidatures',
      subtitle: 'Janvier-Mars',
      duration: '1-2 mois',
      icon: MessageSquare,
      color: 'purple'
    },
    {
      id: 'financier',
      title: 'Aspects financiers',
      subtitle: 'Prévoir budget',
      duration: 'Continue',
      icon: DollarSign,
      color: 'yellow-500 '
    },
    {
      id: 'erreurs',
      title: 'Erreurs à éviter',
      subtitle: 'Points d\'attention',
      duration: 'Toujours',
      icon: AlertTriangle,
      color: 'red'
    },
    {
      id: 'conseils',
      title: 'Conseils pratiques',
      subtitle: 'Astuces d\'expert',
      duration: 'Toujours',
      icon: Star,
      color: 'indigo'
    }
  ];

  const quickStats = [
    { number: '100+', label: 'Pays concernés', icon: Globe },
    { number: '7', label: 'Vœux maximum', icon: Target },
    { number: '615€', label: 'Ressources/mois', icon: DollarSign },
    { number: '6-8', label: 'Mois de préparation', icon: Clock }
  ];

  const testsLangue = [
    { name: 'TCF', description: 'Test de Connaissance du Français', level: 'Tous niveaux' },
    { name: 'DELF', description: 'Diplôme d\'Études en Langue Française', level: 'A1 à B2' },
    { name: 'DALF', description: 'Diplôme Approfondi de Langue Française', level: 'C1 à C2' }
  ];

  const documentsRequis = [
    { title: 'Diplômes traduits', description: 'Traduction officielle de tous les diplômes', urgent: true },
    { title: 'Relevés de notes', description: '3 dernières années + baccalauréat tamponnés', urgent: true },
    { title: 'CV français', description: 'Format chronologique, maximum 2 pages', urgent: false },
    { title: 'Lettres de motivation', description: 'Spécifiques pour chaque école', urgent: true },
    { title: 'Photos d\'identité', description: 'Format officiel 3,5 x 4,5 cm, fond blanc', urgent: false },
    { title: 'Attestations travail', description: 'Si applicable, stages et expériences', urgent: false },
    { title: 'Portfolio', description: 'Si pertinent pour la formation', urgent: false }
  ];

  const erreursCourantes = [
    { title: 'Attendre la dernière minute', impact: 'Stress et erreurs' },
    { title: 'Négliger le formulaire', impact: 'Dossier incomplet' },
    { title: 'Lettres génériques', impact: 'Manque de personnalisation' },
    { title: 'Choix trop sélectifs', impact: 'Risque de refus' },
    { title: 'Sous-estimer le temps', impact: 'Précipitation' },
    { title: 'Scans de mauvaise qualité', impact: 'Documents illisibles' }
  ];

  const conseilsStrategie = [
    { title: 'Diversifier géographiquement', description: 'Ne pas se limiter aux grandes villes' },
    { title: 'Mélanger les niveaux', description: 'Universités sélectives + accessibles' },
    { title: 'Préparer un plan B', description: 'Écoles privées ou non connectées' },
    { title: 'Anticiper les obstacles', description: 'Prévoir solutions alternatives' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Guide Campus France - Procédure complète étape par étape</title>
        <meta name="description" content="Guide complet Campus France : 6 étapes détaillées pour étudier en France. Procédure, documents, conseils d'experts et erreurs à éviter." />
        <meta name="keywords" content="Campus France, étudier en France, procédure Campus France, dossier étudiant, visa étudiant, TCF, DELF, DALF" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        
        <meta property="og:title" content="Guide Campus France - Procédure complète" />
        <meta property="og:description" content="Découvrez les 6 étapes clés pour réussir votre dossier Campus France et étudier en France" />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://wendogo.com/guides/campus-france" />
        <meta property="og:image" content="https://wendogo.com/images/guide-campus-france.jpg" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Guide Campus France - Procédure complète" />
        <meta name="twitter:description" content="6 étapes clés pour réussir votre dossier Campus France" />
        
        <link rel="canonical" href="https://wendogo.com/guides/campus-france" />
        
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": "Guide Campus France",
            "description": "Guide complet pour réussir sa procédure Campus France",
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
                "name": "Documents académiques"
              },
              {
                "@type": "HowToSupply", 
                "name": "Test de langue"
              }
            ],
            "step": [
              {
                "@type": "HowToStep",
                "name": "Phase préparatoire",
                "text": "Préparer tous les documents nécessaires 6-8 mois avant"
              },
              {
                "@type": "HowToStep",
                "name": "Inscription Campus France",
                "text": "Créer son compte et saisir le dossier"
              },
              {
                "@type": "HowToStep",
                "name": "Candidatures",
                "text": "Soumettre les dossiers et passer l'entretien"
              }
            ]
          })
        }} />
      </Head>

      <NavBar variant="simple" />

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
                    Guide Campus France
                  </h1>
                  <p className="text-lg text-green-100">
                    6 étapes clés pour réussir votre dossier
                  </p>
                </div>
              </div>
              <p className="text-lg sm:text-xl text-green-100 mb-8">
                Découvrez la procédure complète Campus France avec tous les conseils 
                d'experts pour maximiser vos chances d'admission dans les universités françaises.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/?tab=accompany#accompany-section" className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-center">
                  Accompagnez-moi
                </Link>
                {/* <Link href="/contact" className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors text-center">
                  Accompagnement personnalisé
                </Link> */}
              </div>
            </div>
            
            {/* Video Section */}
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-white">
                    Vidéo explicative
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
                  Guide vidéo Campus France par nos experts
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
                  Phase préparatoire (6-8 mois avant)
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  La préparation est cruciale pour le succès de votre dossier Campus France. 
                  Commencez tôt pour éviter le stress et maximiser vos chances.
                </p>
              </div>

              {/* Tests de langue */}
              <div>
                <h3 className="text-xl lg:text-2xl font-semibold text-gray-900 mb-6">
                  Tests de langue française
                </h3>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                  <div className="flex items-center mb-4">
                    <BookOpen className="w-6 h-6 text-blue-600 mr-3" />
                    <p className="text-blue-800 font-medium">
                      Non obligatoire si vous avez déjà un cursus francophone et résidez 
                      dans un pays officiellement francophone
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
                  Choix des formations
                </h3>
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
                  <div className="flex items-center mb-4">
                    <Trophy className="w-6 h-6 text-green-600 mr-3" />
                    <p className="text-green-800 font-medium">
                      Maximum 7 vœux autorisés - Choisissez stratégiquement !
                    </p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-4">Points à vérifier :</h4>
                    <ul className="space-y-3">
                      {[
                        'Catalogue Campus France',
                        'Coûts de formation',
                        'Taux de réussite/insertion',
                        'Possibilités de poursuite',
                        'Prérequis spécifiques',
                        'Dates limites'
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
                      Conseils stratégiques
                    </h4>
                    <ul className="space-y-2 text-amber-800 text-sm">
                      <li>• Diversifiez vos choix géographiques</li>
                      <li>• Mélangez formations sélectives et accessibles</li>
                      <li>• Vérifiez les débouchés professionnels</li>
                      <li>• Consultez les avis d'anciens étudiants</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Documents à préparer */}
              <div>
                <h3 className="text-xl lg:text-2xl font-semibold text-gray-900 mb-6">
                  Documents à préparer
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
                            Urgent
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
                  Inscription Campus France (Octobre-Février)
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Créez votre compte et saisissez méticuleusement votre dossier sur la 
                  plateforme "Études en France".
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">
                    Création du compte
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
                        'Remplir informations personnelles',
                        'Vérifier emails régulièrement',
                        'Garder accès sécurisés',
                        'Noter identifiants dans lieu sûr'
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
                    Saisie du dossier
                  </h3>
                  <div className="space-y-4">
                    {[
                      'Parcours académique détaillé',
                      'Expériences professionnelles',
                      'Stages et formations',
                      'Compétences linguistiques',
                      'Projet de Formation Motivé',
                      'Détailler toutes les compétences'
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
                  Numérisation des documents
                </h3>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-blue-900 mb-3">Qualité technique</h4>
                      <ul className="space-y-2 text-blue-800 text-sm">
                        <li>• Scanner en haute qualité (300 dpi min)</li>
                        <li>• Vérifier la lisibilité</li>
                        <li>• Respecter formats demandés</li>
                        <li>• Éviter les photos de documents</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-900 mb-3">Organisation</h4>
                      <ul className="space-y-2 text-blue-800 text-sm">
                        <li>• Nommer clairement les fichiers</li>
                        <li>• Créer dossier backup</li>
                        <li>• Tester l'ouverture des fichiers</li>
                        <li>• Garder versions originales</li>
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
                  Comment candidater selon votre niveau d'études
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Les modalités de candidature varient selon votre niveau d'études visé 
                  et votre situation personnelle. Découvrez la procédure qui vous concerne.
                </p>
              </div>

              {/* Navigation par niveaux */}
              <div className="grid md:grid-cols-3 gap-6 mb-12">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
                  <div className="text-center">
                    <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                      <span className="font-bold">L1</span>
                    </div>
                    <h3 className="font-semibold text-blue-900 mb-2">1ère année Licence</h3>
                    <p className="text-sm text-blue-800">Parcoursup ou DAP selon votre profil</p>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
                  <div className="text-center">
                    <div className="bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                      <span className="font-bold">L2+</span>
                    </div>
                    <h3 className="font-semibold text-green-900 mb-2">Licence 2/3 & Master</h3>
                    <p className="text-sm text-green-800">Procédure "Études en France"</p>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
                  <div className="text-center">
                    <div className="bg-purple-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                      <span className="font-bold">PhD</span>
                    </div>
                    <h3 className="font-semibold text-purple-900 mb-2">Doctorat</h3>
                    <p className="text-sm text-purple-800">Contact direct avec les laboratoires</p>
                  </div>
                </div>
              </div>

              {/* Section 1ère année Licence */}
              <div className="bg-white border border-gray-200 rounded-xl p-8">
                <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                  <div className="bg-blue-100 p-2 rounded-lg mr-3">
                    <GraduationCap className="w-6 h-6 text-blue-600" />
                  </div>
                  Candidater en 1ère année de Licence
                </h3>
                
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center mb-2">
                    <AlertCircle className="w-5 h-5 text-amber-600 mr-2" />
                    <p className="font-medium text-amber-800">La procédure dépend de votre situation</p>
                  </div>
                  <p className="text-amber-700 text-sm">
                    Vérifiez d'abord si vous résidez dans un pays relevant de la procédure "Études en France"
                  </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Cas 1 : Nationalité du pays de résidence */}
                  <div className="bg-blue-50 rounded-lg p-6">
                    <h4 className="font-semibold text-blue-900 mb-4">
                      🏠 Vous résidez ET avez la nationalité du même pays Campus France
                    </h4>
                    <p className="text-sm text-blue-800 mb-4">
                      Exemple : Vous habitez au Maroc et avez la nationalité marocaine
                    </p>
                    
                    <div className="space-y-4">
                      <div className="bg-white border border-blue-200 rounded-lg p-4">
                        <h5 className="font-medium text-blue-900 mb-2">
                          📚 Baccalauréat français ou européen
                        </h5>
                        <div className="flex items-start">
                          <ArrowRight className="w-4 h-4 text-blue-600 mr-2 mt-1" />
                          <div>
                            <p className="text-sm text-blue-800 font-medium">Parcoursup + Campus France</p>
                            <p className="text-xs text-blue-700">Procédure parallèle obligatoire</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-white border border-blue-200 rounded-lg p-4">
                        <h5 className="font-medium text-blue-900 mb-2">
                          🎓 Autre diplôme national
                        </h5>
                        <div className="flex items-start">
                          <ArrowRight className="w-4 h-4 text-blue-600 mr-2 mt-1" />
                          <div>
                            <p className="text-sm text-blue-800 font-medium">DAP via "Études en France"</p>
                            <p className="text-xs text-blue-700">Demande d'Admission Préalable en ligne</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Cas 2 : Nationalité UE */}
                  <div className="bg-green-50 rounded-lg p-6">
                    <h4 className="font-semibold text-green-900 mb-4">
                      🇪🇺 Vous avez une nationalité européenne
                    </h4>
                    <p className="text-sm text-green-800 mb-4">
                      Exemple : Vous habitez au Sénégal mais avez la nationalité allemande
                    </p>
                    
                    <div className="bg-white border border-green-200 rounded-lg p-4">
                      <h5 className="font-medium text-green-900 mb-2">
                        ✅ Procédure simplifiée
                      </h5>
                      <div className="flex items-center mb-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                        <span className="text-sm text-green-800 font-medium">Uniquement Parcoursup</span>
                      </div>
                      <p className="text-xs text-green-700">
                        Pays concernés : UE + Norvège, Islande, Liechtenstein, Suisse, Andorre, Monaco
                      </p>
                    </div>
                  </div>
                </div>

                {/* Calendrier */}
                <div className="mt-8">
                  <h4 className="text-xl font-semibold text-gray-900 mb-6">Calendrier général des candidatures</h4>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Parcoursup */}
                    <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6">
                      <h5 className="font-semibold text-indigo-900 mb-4 flex items-center">
                        <Calendar className="w-5 h-5 mr-2" />
                        Calendrier Parcoursup
                      </h5>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-indigo-800">Découverte formations</span>
                          <span className="text-xs bg-indigo-100 px-2 py-1 rounded">Mi-décembre</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-indigo-800">Inscriptions et vœux</span>
                          <span className="text-xs bg-indigo-100 px-2 py-1 rounded">Jan-mars</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-indigo-800">Confirmation vœux</span>
                          <span className="text-xs bg-indigo-100 px-2 py-1 rounded">Début avril</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-indigo-800">Réponses admissions</span>
                          <span className="text-xs bg-indigo-100 px-2 py-1 rounded">Juin-juillet</span>
                        </div>
                      </div>
                    </div>

                    {/* DAP */}
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                      <h5 className="font-semibold text-orange-900 mb-4 flex items-center">
                        <Calendar className="w-5 h-5 mr-2" />
                        Calendrier DAP
                      </h5>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-orange-800">Ouverture inscriptions</span>
                          <span className="text-xs bg-orange-100 px-2 py-1 rounded">1er octobre</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-orange-800">Clôture inscriptions</span>
                          <span className="text-xs bg-orange-100 px-2 py-1 rounded">15 décembre</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-orange-800">Réponses universités</span>
                          <span className="text-xs bg-orange-100 px-2 py-1 rounded">Avant 30 avril</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-orange-800">Réponse étudiant</span>
                          <span className="text-xs bg-orange-100 px-2 py-1 rounded">Avant 31 mai</span>
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
                  Candidater en Licence 2/3 ou Master
                </h3>
                
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <h4 className="font-semibold text-green-900 mb-4">
                    📋 Procédure "Études en France" uniquement
                  </h4>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="font-medium text-green-800 mb-3">✅ Étapes à suivre :</h5>
                      <ul className="space-y-2 text-sm text-green-700">
                        <li className="flex items-center">
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Créer votre dossier électronique
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Suivre la procédure guidée
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Obtenir l'attestation Campus France
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Demander votre visa étudiant
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium text-green-800 mb-3">📅 Calendrier variable :</h5>
                      <p className="text-sm text-green-700 mb-3">
                        Consultez le site Campus France de votre pays pour connaître 
                        le calendrier spécifique aux formations hors DAP.
                      </p>
                      <a 
                        href="https://www.campusfrance.org/fr/espaces" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm text-green-800 hover:text-green-900 font-medium"
                      >
                        <ExternalLink className="w-4 h-4 mr-1" />
                        Trouver votre espace Campus France
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
                  Candidater en Doctorat
                </h3>
                
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                  <h4 className="font-semibold text-purple-900 mb-4">
                    🔬 Procédure directe avec les laboratoires
                  </h4>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="font-medium text-purple-800 mb-3">📚 Démarches :</h5>
                      <ul className="space-y-2 text-sm text-purple-700">
                        <li className="flex items-center">
                          <ArrowRight className="w-4 h-4 mr-2" />
                          Contactez directement les écoles doctorales
                        </li>
                        <li className="flex items-center">
                          <ArrowRight className="w-4 h-4 mr-2" />
                          Recherchez les sujets qui vous intéressent
                        </li>
                        <li className="flex items-center">
                          <ArrowRight className="w-4 h-4 mr-2" />
                          Consultez les catalogues Campus France
                        </li>
                        <li className="flex items-center">
                          <ArrowRight className="w-4 h-4 mr-2" />
                          Obtenez une réponse positive d'admission
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium text-purple-800 mb-3">🛂 Visa spécifique :</h5>
                      <div className="bg-white border border-purple-200 rounded-lg p-4">
                        <p className="text-sm text-purple-700 mb-2">
                          <strong>Visa "Passeport Talent - Chercheur"</strong>
                        </p>
                        <p className="text-xs text-purple-600">
                          À demander auprès du consulat après obtention 
                          de votre acceptation en doctorat
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
                    🤝 Accompagnement Campus France
                  </h3>
                  <p className="text-gray-700 mb-6">
                    Quelle que soit votre situation, l'Espace Campus France de votre pays 
                    est à votre disposition pour vous accompagner dans vos démarches.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                      href="https://www.campusfrance.org/fr/espaces"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <ExternalLink className="w-5 h-5 mr-2" />
                      Trouver mon espace Campus France
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
                  Aspects financiers
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Préparez votre budget et les justificatifs financiers nécessaires 
                  pour votre dossier Campus France.
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">
                    Budget à prévoir
                  </h3>
                  <div className="space-y-4">
                    {[
                      { item: 'Frais de dossier Campus France', amount: '130-200€', urgent: true },
                      { item: 'Coût du test de langue', amount: '100-200€', urgent: false },
                      { item: 'Traductions officielles', amount: '50-150€', urgent: true },
                      { item: 'Frais de visa', amount: '99€', urgent: true },
                      { item: 'Assurance santé', amount: '200-400€', urgent: true },
                      { item: 'Logement et caution', amount: '500-1500€', urgent: true }
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
                    Ressources financières
                  </h3>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
                    <div className="flex items-center mb-4">
                      <Shield className="w-6 h-6 text-green-600 mr-3" />
                      <h4 className="font-semibold text-green-900">
                        Justifier 615€/mois minimum
                      </h4>
                    </div>
                    <p className="text-green-800 text-sm">
                      Montant minimum requis pour couvrir les frais de subsistance en France
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-4">
                      Garanties financières acceptées :
                    </h4>
                    <div className="space-y-3">
                      {[
                        'Garant français ou étranger',
                        'Bourse gouvernementale',
                        'Compte bloqué en France',
                        'Relevés bancaires personnels',
                        'Attestation de ressources parentales'
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
                  Erreurs à éviter absolument
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Apprenez des erreurs les plus fréquentes pour ne pas compromettre 
                  votre candidature Campus France.
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
                  Conseils pour éviter ces erreurs
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-amber-900 mb-3">Organisation</h4>
                    <ul className="space-y-2 text-amber-800 text-sm">
                      <li>• Créer un calendrier détaillé</li>
                      <li>• Commencer 6-8 mois avant</li>
                      <li>• Faire des listes de contrôle</li>
                      <li>• Demander aide si nécessaire</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-amber-900 mb-3">Qualité</h4>
                    <ul className="space-y-2 text-amber-800 text-sm">
                      <li>• Relire plusieurs fois</li>
                      <li>• Faire relire par quelqu'un</li>
                      <li>• Personnaliser chaque candidature</li>
                      <li>• Vérifier tous les documents</li>
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
                  Conseils pratiques d'experts
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Stratégies éprouvées et astuces pour optimiser vos chances de succès 
                  dans votre démarche Campus France.
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">
                    Organisation optimale
                  </h3>
                  <div className="space-y-4">
                    {[
                      'Ne rien faire dans le stress',
                      'Prendre le temps de bien préparer',
                      'Faire les choses sereinement',
                      'Créer un calendrier personnalisé',
                      'Faire des copies de tous documents',
                      'Avoir un dossier numérique backup'
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
                    Stratégies gagnantes
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
                  Checklist finale avant soumission
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-green-900 mb-3">Documents</h4>
                    <ul className="space-y-2 text-green-800 text-sm">
                      <li>☑️ Tous les documents traduits</li>
                      <li>☑️ Scans de qualité (300 dpi)</li>
                      <li>☑️ Fichiers bien nommés</li>
                      <li>☑️ Backup sécurisé</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-3">Candidature</h4>
                    <ul className="space-y-2 text-blue-800 text-sm">
                      <li>☑️ Lettres personnalisées</li>
                      <li>☑️ Orthographe vérifiée</li>
                      <li>☑️ Cohérence du projet</li>
                      <li>☑️ Preuves de paiement</li>
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
            Besoin d'aide pour votre dossier Campus France ?
          </h2>
          <p className="text-lg lg:text-xl mb-8 text-green-100">
            Nos experts vous accompagnent personnellement dans chaque étape de votre 
            procédure Campus France pour maximiser vos chances d'admission.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/?tab=accompany#accompany-section" className="bg-white text-green-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Accompagnement personnalisé
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

export default CampusFranceGuide;
