// src/pages/guides/visa-etudiant.js
'use client';

import { useEffect, useState } from 'react';
import { trackPageView } from '../../lib/gtag';
import Head from 'next/head';
import Footer from '../../components/Footer';
import NavBar from '../../components/NavBar';
import { 
  FileText, 
  Shield, 
  Calendar, 
  CreditCard, 
  MapPin, 
  Clock,
  CheckCircle, 
  AlertTriangle,
  User,
  Plane,
  Building,
  Heart,
  Euro,
  Phone,
  Mail,
  ExternalLink,
  Download,
  ChevronUp,
  ChevronDown,
  Target,
  Award,
  Globe
} from 'lucide-react';
import Link from 'next/link';

function VisaEtudiantGuide() {
  const [activeTab, setActiveTab] = useState('types');
  const [expandedSection, setExpandedSection] = useState(null);

  useEffect(() => {
    trackPageView('guide_visa_etudiant');
  }, []);

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const quickStats = [
    { number: '99€', label: 'Frais de visa', icon: Euro },
    { number: '615€', label: 'Ressources/mois', icon: CreditCard },
    { number: '2-8', label: 'Semaines délai', icon: Clock },
    { number: '1 an', label: 'Validité initiale', icon: Calendar }
  ];

  const visaTypes = [
    {
      title: 'Visa long séjour étudiant (VLS-TS)',
      description: 'Pour études de plus de 3 mois',
      duration: '1 an renouvelable',
      requirements: 'Admission + ressources',
      color: 'blue'
    },
    {
      title: 'Visa court séjour étudiant',
      description: 'Pour études de moins de 3 mois',
      duration: '90 jours maximum',
      requirements: 'Inscription + hébergement',
      color: 'green'
    },
    {
      title: 'Visa études - concours',
      description: 'Pour passer un concours',
      duration: '90 jours',
      requirements: 'Convocation + garanties',
      color: 'purple'
    }
  ];

  const documentsRequis = [
    {
      category: 'Documents personnels',
      items: [
        { name: 'Passeport', detail: 'Valide + 3 mois après fin séjour', urgent: true },
        { name: 'Photos d\'identité', detail: '2 photos récentes format 35x45mm', urgent: true },
        { name: 'Formulaire visa', detail: 'Complété et signé', urgent: true },
        { name: 'Acte de naissance', detail: 'Original + traduction', urgent: false }
      ]
    },
    {
      category: 'Documents académiques',
      items: [
        { name: 'Attestation Campus France', detail: 'Validation obligatoire', urgent: true },
        { name: 'Attestation admission', detail: 'Université ou école', urgent: true },
        { name: 'Diplômes antérieurs', detail: 'Originaux + traductions', urgent: false },
        { name: 'Relevés de notes', detail: '3 dernières années', urgent: false }
      ]
    },
    {
      category: 'Documents financiers',
      items: [
        { name: 'Justificatifs ressources', detail: '615€/mois minimum', urgent: true },
        { name: 'Relevés bancaires', detail: '3 derniers mois', urgent: true },
        { name: 'Attestation garant', detail: 'Si applicable', urgent: false },
        { name: 'Bourse', detail: 'Attestation si bénéficiaire', urgent: false }
      ]
    },
    {
      category: 'Documents logement',
      items: [
        { name: 'Attestation hébergement', detail: 'Premier mois minimum', urgent: true },
        { name: 'Contrat location', detail: 'Ou réservation logement', urgent: false },
        { name: 'Attestation garant', detail: 'Pour la location', urgent: false }
      ]
    }
  ];

  const etapesProcedure = [
    {
      step: 1,
      title: 'Validation Campus France',
      description: 'Obligatoire avant toute demande',
      details: [
        'Compléter dossier Campus France',
        'Passer entretien pédagogique',
        'Obtenir attestation de validation',
        'Télécharger document officiel'
      ],
      duration: '4-6 semaines'
    },
    {
      step: 2,
      title: 'Rassemblement documents',
      description: 'Préparer dossier complet',
      details: [
        'Vérifier liste documents',
        'Faire traductions assermentées',
        'Obtenir attestations nécessaires',
        'Organiser dans ordre requis'
      ],
      duration: '2-3 semaines'
    },
    {
      step: 3,
      title: 'Prise de rendez-vous',
      description: 'Réserver créneaux consulaires',
      details: [
        'Créer compte VFS/TLScontact',
        'Choisir date disponible',
        'Payer frais en ligne',
        'Confirmer rendez-vous'
      ],
      duration: '1-2 semaines'
    },
    {
      step: 4,
      title: 'Dépôt du dossier',
      description: 'Présentation au consulat',
      details: [
        'Arriver à l\'heure précise',
        'Présenter documents originaux',
        'Payer frais complémentaires',
        'Récépissé de dépôt'
      ],
      duration: '1-2 heures'
    },
    {
      step: 5,
      title: 'Instruction et décision',
      description: 'Traitement par consulat',
      details: [
        'Vérification documents',
        'Enquête si nécessaire',
        'Décision consulaire',
        'Notification résultat'
      ],
      duration: '2-8 semaines'
    },
    {
      step: 6,
      title: 'Retrait du visa',
      description: 'Récupération passeport',
      details: [
        'Vérifier informations visa',
        'Contrôler dates validité',
        'Préparer voyage',
        'Validation OFII en France'
      ],
      duration: '1-2 jours'
    }
  ];

  const conseils = [
    {
      title: 'Anticipation',
      description: 'Commencer 3 mois avant',
      tips: [
        'Période haute été = délais plus longs',
        'Prévoir délais administratifs',
        'Réserver rendez-vous tôt',
        'Éviter dernière minute'
      ]
    },
    {
      title: 'Qualité du dossier',
      description: 'Soigner chaque détail',
      tips: [
        'Documents lisibles et complets',
        'Traductions certifiées',
        'Cohérence dans les informations',
        'Copies de sauvegarde'
      ]
    },
    {
      title: 'Aspects financiers',
      description: 'Bien justifier ressources',
      tips: [
        'Montant 615€/mois minimum',
        'Preuves variées acceptées',
        'Cohérence avec coût études',
        'Garant français = avantage'
      ]
    },
    {
      title: 'Entretien consulaire',
      description: 'Se préparer aux questions',
      tips: [
        'Projet d\'études clair',
        'Motivation sincère',
        'Liens avec pays d\'origine',
        'Plans après études'
      ]
    }
  ];

  const erreurs = [
    'Dossier incomplet ou documents manquants',
    'Justificatifs financiers insuffisants',
    'Incohérence dans le projet d\'études',
    'Délais trop courts pour préparation',
    'Mauvaise qualité des documents',
    'Pas de validation Campus France'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Guide Visa Étudiant France - Procédure complète et conseils</title>
        <meta name="description" content="Guide complet visa étudiant France : types, documents, procédure, délais, conseils. Tout pour réussir votre demande de visa d'études." />
        <meta name="keywords" content="visa étudiant France, VLS-TS, Campus France, documents visa, procédure visa, délais visa, justificatifs financiers" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        
        <meta property="og:title" content="Guide Visa Étudiant France - Procédure complète" />
        <meta property="og:description" content="Tout savoir sur le visa étudiant France : types, documents, procédure et conseils d'experts" />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://wendogo.com/guides/visa-etudiant" />
        <meta property="og:image" content="https://wendogo.com/images/guide-visa-etudiant.jpg" />
        
        <link rel="canonical" href="https://wendogo.com/guides/visa-etudiant" />
        
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Guide Visa Étudiant France",
            "description": "Guide complet pour obtenir son visa étudiant pour la France",
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

      <NavBar variant="simple" />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-full p-4">
                <Shield className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Guide Visa Étudiant France
            </h1>
            <p className="text-lg sm:text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              Obtenez votre visa étudiant pour la France : types, documents requis, 
              procédure complète et conseils d'experts pour maximiser vos chances.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/?tab=accompany#accompany-section" className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Accompagnement visa
              </Link>
              <Link href="/guides/campus-france" className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                Guide Campus France
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
              { id: 'types', label: 'Types de visa', icon: Award },
              { id: 'documents', label: 'Documents', icon: FileText },
              { id: 'procedure', label: 'Procédure', icon: Target },
              { id: 'conseils', label: 'Conseils', icon: CheckCircle }
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
          
          {/* Types de visa */}
          {activeTab === 'types' && (
            <div className="space-y-12">
              <div className="text-center">
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                  Types de visa étudiant
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Choisissez le type de visa adapté à votre durée d'études et votre situation.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {visaTypes.map((visa, index) => (
                  <div key={index} className={`bg-${visa.color}-50 border border-${visa.color}-200 rounded-xl p-6 hover:shadow-lg transition-shadow`}>
                    <div className={`bg-${visa.color}-100 w-12 h-12 rounded-full flex items-center justify-center mb-4`}>
                      <Shield className={`w-6 h-6 text-${visa.color}-600`} />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {visa.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {visa.description}
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <Clock className="w-4 h-4 text-gray-500 mr-2" />
                        <span className="text-gray-700">{visa.duration}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <FileText className="w-4 h-4 text-gray-500 mr-2" />
                        <span className="text-gray-700">{visa.requirements}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <CheckCircle className="w-6 h-6 text-blue-600 mr-3" />
                  <h3 className="text-lg font-semibold text-blue-900">
                    Visa long séjour étudiant (VLS-TS) - Le plus courant
                  </h3>
                </div>
                <p className="text-blue-800 mb-4">
                  C'est le visa le plus demandé pour des études supérieures en France. 
                  Il permet un séjour d'un an renouvelable et donne droit au travail étudiant.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-2">Avantages :</h4>
                    <ul className="text-blue-800 text-sm space-y-1">
                      <li>• Durée d'un an renouvelable</li>
                      <li>• Droit au travail étudiant (964h/an)</li>
                      <li>• Validation OFII en France</li>
                      <li>• Accès aux services publics</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-2">Conditions :</h4>
                    <ul className="text-blue-800 text-sm space-y-1">
                      <li>• Admission dans établissement</li>
                      <li>• Ressources 615€/mois minimum</li>
                      <li>• Validation Campus France</li>
                      <li>• Assurance maladie</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Documents */}
          {activeTab === 'documents' && (
            <div className="space-y-12">
              <div className="text-center">
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                  Documents requis
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Liste complète des documents nécessaires pour votre demande de visa étudiant.
                </p>
              </div>

              <div className="space-y-8">
                {documentsRequis.map((category, categoryIndex) => (
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
                            <div key={itemIndex} className={`border rounded-lg p-4 ${
                              item.urgent ? 'border-red-200 bg-red-50' : 'border-gray-200 bg-white'
                            }`}>
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-semibold text-gray-900">{item.name}</h4>
                                {item.urgent && (
                                  <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-medium">
                                    Obligatoire
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-gray-600">{item.detail}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <AlertTriangle className="w-6 h-6 text-amber-600 mr-3" />
                  <h3 className="text-lg font-semibold text-amber-900">
                    Points importants sur les documents
                  </h3>
                </div>
                <ul className="space-y-2 text-amber-800">
                  <li>• Tous les documents doivent être récents (moins de 6 mois)</li>
                  <li>• Traductions assermentées obligatoires pour documents non français</li>
                  <li>• Photocopies ET originaux requis</li>
                  <li>• Vérifier spécificités du consulat de votre pays</li>
                </ul>
              </div>
            </div>
          )}

          {/* Procédure */}
          {activeTab === 'procedure' && (
            <div className="space-y-12">
              <div className="text-center">
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                  Procédure étape par étape
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Suivez ces 6 étapes pour obtenir votre visa étudiant sans stress.
                </p>
              </div>

              <div className="space-y-8">
                {etapesProcedure.map((etape, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-start">
                      <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold mr-6 mt-1">
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

              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Délais à prévoir
                </h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Clock className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="text-2xl font-bold text-green-900">2-4 sem</div>
                    <div className="text-sm text-green-800">Délai normal</div>
                  </div>
                  <div className="text-center">
                    <div className="bg-amber-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                      <AlertTriangle className="w-6 h-6 text-amber-600" />
                    </div>
                    <div className="text-2xl font-bold text-amber-900">4-8 sem</div>
                    <div className="text-sm text-amber-800">Période haute</div>
                  </div>
                  <div className="text-center">
                    <div className="bg-red-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Target className="w-6 h-6 text-red-600" />
                    </div>
                    <div className="text-2xl font-bold text-red-900">3 mois</div>
                    <div className="text-sm text-red-800">Commencer avant</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Conseils */}
          {activeTab === 'conseils' && (
            <div className="space-y-12">
              <div className="text-center">
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                  Conseils d'experts
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Maximisez vos chances d'obtenir votre visa avec ces conseils éprouvés.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {conseils.map((conseil, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {conseil.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{conseil.description}</p>
                    <ul className="space-y-2">
                      {conseil.tips.map((tip, tipIndex) => (
                        <li key={tipIndex} className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                          <span className="text-sm text-gray-700">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <AlertTriangle className="w-6 h-6 text-red-600 mr-3" />
                  <h3 className="text-lg font-semibold text-red-900">
                    Erreurs fréquentes à éviter
                  </h3>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {erreurs.map((erreur, index) => (
                    <div key={index} className="flex items-start">
                      <div className="bg-red-100 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">
                        <span className="text-red-600 text-sm font-bold">✗</span>
                      </div>
                      <span className="text-sm text-red-800">{erreur}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">
                  Checklist finale avant dépôt
                </h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-3">Documents</h4>
                    <ul className="space-y-2 text-blue-800 text-sm">
                      <li>☑️ Passeport valide</li>
                      <li>☑️ Formulaire complété</li>
                      <li>☑️ Photos conformes</li>
                      <li>☑️ Attestation Campus France</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-3">Finances</h4>
                    <ul className="space-y-2 text-blue-800 text-sm">
                      <li>☑️ Justificatifs 615€/mois</li>
                      <li>☑️ Relevés bancaires</li>
                      <li>☑️ Frais visa 99€</li>
                      <li>☑️ Assurance santé</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-3">Logement</h4>
                    <ul className="space-y-2 text-blue-800 text-sm">
                      <li>☑️ Attestation hébergement</li>
                      <li>☑️ Contrat ou réservation</li>
                      <li>☑️ Coordonnées propriétaire</li>
                      <li>☑️ Plan d'accès</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold mb-6">
            Besoin d'aide pour votre visa étudiant ?
          </h2>
          <p className="text-lg lg:text-xl mb-8 text-blue-100">
            Nos experts vous accompagnent dans toutes les démarches pour obtenir 
            votre visa étudiant France rapidement et sans stress.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/?tab=accompany#accompany-section" className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Accompagnement personnalisé
            </Link>
            <Link href="/guides/campus-france" className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              Guide Campus France
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default VisaEtudiantGuide;
