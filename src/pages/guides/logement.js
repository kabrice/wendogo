// src/pages/guides/logement.js
'use client';

import { useEffect, useState } from 'react';
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
  const [activeTab, setActiveTab] = useState('types');
  const [expandedSection, setExpandedSection] = useState(null);

  useEffect(() => {
    trackPageView('guide_logement');
  }, []);

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const quickStats = [
    { number: '300-800€', label: 'Budget moyen', icon: Euro },
    { number: '30-45m²', label: 'Surface studio', icon: Home },
    { number: '1-3', label: 'Mois de préavis', icon: Calendar },
    { number: '200€', label: 'APL moyenne', icon: Shield }
  ];

  const typesLogement = [
    {
      title: 'Résidence universitaire CROUS',
      description: 'Logement public étudiant le plus économique',
      price: '150-400€/mois',
      advantages: ['Prix très abordable', 'Proche des campus', 'Communauté étudiante', 'Démarches simplifiées'],
      disadvantages: ['Difficile à obtenir', 'Confort basique', 'Règles strictes', 'Demande très tôt'],
      icon: Building,
      color: 'green'
    },
    {
      title: 'Résidence étudiante privée',
      description: 'Logements modernes avec services inclus',
      price: '400-800€/mois',
      advantages: ['Confort moderne', 'Services inclus', 'Sécurité', 'Meublé équipé'],
      disadvantages: ['Plus cher', 'Contrat long', 'Frais de dossier', 'Caution élevée'],
      icon: Building,
      color: 'blue'
    },
    {
      title: 'Appartement privé',
      description: 'Location classique sur le marché privé',
      price: '400-1200€/mois',
      advantages: ['Choix varié', 'Indépendance', 'Négociation possible', 'Pas de règles'],
      disadvantages: ['Cher', 'Garant obligatoire', 'Meubles à acheter', 'Démarches longues'],
      icon: Home,
      color: 'purple'
    },
    {
      title: 'Colocation',
      description: 'Partage d\'appartement avec autres étudiants',
      price: '300-600€/mois',
      advantages: ['Économique', 'Convivial', 'Charges partagées', 'Moins de garant'],
      disadvantages: ['Colocataires', 'Responsabilité solidaire', 'Intimité réduite', 'Règles communes'],
      icon: Users,
      color: 'orange'
    },
    {
      title: 'Chambre chez l\'habitant',
      description: 'Logement chez une famille française',
      price: '300-500€/mois',
      advantages: ['Immersion culturelle', 'Sécurité', 'Aide quotidienne', 'Pratique français'],
      disadvantages: ['Moins d\'intimité', 'Règles famille', 'Horaires', 'Dépendance'],
      icon: Heart,
      color: 'pink'
    },
    {
      title: 'Auberge de jeunesse',
      description: 'Solution temporaire à l\'arrivée',
      price: '20-50€/nuit',
      advantages: ['Flexible', 'Immédiat', 'Pas de garant', 'Rencontres'],
      disadvantages: ['Temporaire', 'Pas intime', 'Cher à long terme', 'Peu de confort'],
      icon: MapPin,
      color: 'red'
    }
  ];

  const villes = [
    {
      name: 'Paris',
      studios: '600-1200€',
      coloc: '500-800€',
      crous: '300-500€',
      tips: 'Rechercher en banlieue, transport inclus'
    },
    {
      name: 'Lyon',
      studios: '400-700€',
      coloc: '350-550€',
      crous: '200-350€',
      tips: 'Quartiers étudiants : Guillotière, Croix-Rousse'
    },
    {
      name: 'Marseille',
      studios: '350-600€',
      coloc: '300-450€',
      crous: '200-300€',
      tips: 'Éviter hypercentre, préférer quartiers étudiants'
    },
    {
      name: 'Toulouse',
      studios: '350-550€',
      coloc: '280-420€',
      crous: '200-320€',
      tips: 'Capitole cher, chercher vers Mirail, Rangueil'
    },
    {
      name: 'Lille',
      studios: '350-550€',
      coloc: '280-400€',
      crous: '200-300€',
      tips: 'Vieux-Lille cher, Wazemmes plus abordable'
    },
    {
      name: 'Bordeaux',
      studios: '400-650€',
      coloc: '320-480€',
      crous: '200-350€',
      tips: 'Éviter centre historique, chercher périphérie'
    }
  ];

  const etapesRecherche = [
    {
      step: 1,
      title: 'Définir le budget',
      description: 'Calculer capacité financière réelle',
      details: [
        'Loyer max = 30% des revenus',
        'Inclure charges et assurance',
        'Prévoir frais installation',
        'Vérifier éligibilité APL'
      ],
      duration: '1 semaine'
    },
    {
      step: 2,
      title: 'Choisir la zone',
      description: 'Sélectionner quartiers cibles',
      details: [
        'Proximité université/école',
        'Transport public disponible',
        'Commerces et services',
        'Sécurité du quartier'
      ],
      duration: '1 semaine'
    },
    {
      step: 3,
      title: 'Rechercher activement',
      description: 'Utiliser tous les canaux',
      details: [
        'Sites spécialisés étudiants',
        'Plateformes généralistes',
        'Réseaux sociaux',
        'Agences immobilières'
      ],
      duration: '2-4 semaines'
    },
    {
      step: 4,
      title: 'Préparer le dossier',
      description: 'Rassembler documents requis',
      details: [
        'Pièce d\'identité',
        'Justificatifs revenus',
        'Garant français',
        'Assurance logement'
      ],
      duration: '1 semaine'
    },
    {
      step: 5,
      title: 'Visiter et candidater',
      description: 'Organiser visites et postulations',
      details: [
        'Prendre rendez-vous rapidement',
        'Visiter en journée',
        'Poser bonnes questions',
        'Candidater immédiatement'
      ],
      duration: '1-2 semaines'
    },
    {
      step: 6,
      title: 'Signer et s\'installer',
      description: 'Finaliser contrat et emménager',
      details: [
        'Lire contrat attentivement',
        'Faire état des lieux',
        'Souscrire assurance',
        'Demander APL'
      ],
      duration: '1 semaine'
    }
  ];

  const sites = [
    {
      name: 'Lokaviz',
      url: 'https://www.lokaviz.fr',
      description: 'Plateforme officielle CROUS',
      type: 'Gratuit',
      specialty: 'Résidences universitaires'
    },
    {
      name: 'Studapart',
      url: 'https://www.studapart.com',
      description: 'Spécialisé logement étudiant',
      type: 'Gratuit',
      specialty: 'Tous types logements'
    },
    {
      name: 'Seloger',
      url: 'https://www.seloger.com',
      description: 'Leader immobilier français',
      type: 'Gratuit',
      specialty: 'Marché privé'
    },
    {
      name: 'Leboncoin',
      url: 'https://www.leboncoin.fr',
      description: 'Petites annonces entre particuliers',
      type: 'Gratuit',
      specialty: 'Particuliers'
    },
    {
      name: 'Appartager',
      url: 'https://www.appartager.com',
      description: 'Spécialisé colocation',
      type: 'Gratuit',
      specialty: 'Colocation'
    },
    {
      name: 'Adele',
      url: 'https://www.adele.org',
      description: 'Réseau résidences étudiantes',
      type: 'Gratuit',
      specialty: 'Résidences privées'
    }
  ];

  const aides = [
    {
      name: 'APL (Aide Personnalisée au Logement)',
      description: 'Aide de la CAF selon revenus',
      montant: '50-300€/mois',
      conditions: ['Revenus modestes', 'Logement décent', 'Étudiant ou salarié'],
      demarche: 'Demande CAF en ligne'
    },
    {
      name: 'ALS (Allocation Logement Social)',
      description: 'Alternative à l\'APL',
      montant: '50-250€/mois',
      conditions: ['Pas éligible APL', 'Logement convenable', 'Ressources limitées'],
      demarche: 'Demande CAF en ligne'
    },
    {
      name: 'Caution Visale',
      description: 'Garantie locative gratuite',
      montant: 'Gratuit',
      conditions: ['Étudiant -30 ans', 'Salaire <1500€', 'Logement -800€'],
      demarche: 'Demande en ligne Visale'
    },
    {
      name: 'Mobili-Jeune',
      description: 'Aide pour jeunes en formation',
      montant: '10-100€/mois',
      conditions: ['Formation professionnelle', 'Alternance', 'Moins de 30 ans'],
      demarche: 'Demande via employeur'
    }
  ];

  const documents = [
    {
      category: 'Identité',
      items: [
        'Carte d\'identité ou passeport',
        'Carte de séjour (étudiants étrangers)',
        'Carte étudiante',
        'Justificatif de scolarité'
      ]
    },
    {
      category: 'Revenus',
      items: [
        'Avis d\'imposition ou non-imposition',
        'Bulletins de salaire (3 derniers)',
        'Attestation de bourse',
        'Relevés bancaires (3 mois)'
      ]
    },
    {
      category: 'Garant',
      items: [
        'Pièce d\'identité du garant',
        'Justificatifs revenus garant',
        'Attestation employeur garant',
        'Acte de cautionnement signé'
      ]
    },
    {
      category: 'Assurance',
      items: [
        'Attestation assurance habitation',
        'Attestation responsabilité civile',
        'Justificatif assurance scolaire',
        'Couverture santé'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Guide Logement Étudiant France 2024 - Trouver son logement</title>
        <meta name="description" content="Guide complet logement étudiant France 2024 : types, prix, démarches, aides. Tout pour trouver votre logement étudiant rapidement." />
        <meta name="keywords" content="logement étudiant France, CROUS, résidence étudiante, colocation, APL, garant, visa logement" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        
        <meta property="og:title" content="Guide Logement Étudiant France 2024 - Trouver son logement" />
        <meta property="og:description" content="Types de logements, prix, démarches et aides pour étudiants en France" />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://wendogo.com/guides/logement" />
        <meta property="og:image" content="https://wendogo.com/images/guide-logement.jpg" />
        
        <link rel="canonical" href="https://wendogo.com/guides/logement" />
        
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Guide Logement Étudiant France 2024",
            "description": "Guide complet pour trouver son logement étudiant en France",
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
      <section className="bg-gradient-to-br from-orange-600 via-red-600 to-pink-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-full p-4">
                <Home className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Guide Logement Étudiant France
            </h1>
            <p className="text-lg sm:text-xl text-orange-100 max-w-3xl mx-auto mb-8">
              Trouvez votre logement étudiant en France : types, prix, démarches, aides. 
              Tout ce qu'il faut savoir pour se loger facilement.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="bg-white text-orange-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Aide au logement
              </Link>
              <Link href="/guides/campus-france" className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-orange-600 transition-colors">
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
              { id: 'types', label: 'Types logements', icon: Home },
              { id: 'recherche', label: 'Recherche', icon: Search },
              { id: 'villes', label: 'Prix par ville', icon: MapPin },
              { id: 'aides', label: 'Aides', icon: Shield },
              { id: 'documents', label: 'Documents', icon: FileText }
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
                  Types de logements étudiants
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Découvrez les différentes options de logement disponibles pour les étudiants en France.
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
                        <h4 className="font-medium text-green-900 mb-1">Avantages :</h4>
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
                        <h4 className="font-medium text-red-900 mb-1">Inconvénients :</h4>
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
                    Recommandations par profil
                  </h3>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-2">Étudiant avec budget limité :</h4>
                    <ul className="text-blue-800 text-sm space-y-1">
                      <li>• 1ère priorité : Résidence CROUS</li>
                      <li>• 2ème option : Colocation</li>
                      <li>• 3ème choix : Chambre chez l'habitant</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-2">Étudiant avec budget confortable :</h4>
                    <ul className="text-blue-800 text-sm space-y-1">
                      <li>• 1ère priorité : Résidence privée</li>
                      <li>• 2ème option : Studio privé</li>
                      <li>• 3ème choix : Colocation haut standing</li>
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
                  Méthode de recherche efficace
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Suivez ces étapes pour trouver votre logement étudiant rapidement.
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
                  Sites de recherche recommandés
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
                          Visiter
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
                    Conseils pour recherche efficace
                  </h3>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-amber-900 mb-2">Timing :</h4>
                    <ul className="text-amber-800 text-sm space-y-1">
                      <li>• Commencer 3-4 mois avant rentrée</li>
                      <li>• Pic d'offres : mai-juillet</li>
                      <li>• Visiter rapidement</li>
                      <li>• Candidater le jour même</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-amber-900 mb-2">Stratégie :</h4>
                    <ul className="text-amber-800 text-sm space-y-1">
                      <li>• Élargir zone géographique</li>
                      <li>• Créer alertes automatiques</li>
                      <li>• Préparer dossier complet</li>
                      <li>• Être flexible sur critères</li>
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
                  Prix par ville étudiante
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Découvrez les fourchettes de prix pour les principales villes étudiantes françaises.
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
                        <span className="text-sm text-gray-600">Studios :</span>
                        <span className="font-semibold text-gray-900">{ville.studios}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Colocation :</span>
                        <span className="font-semibold text-gray-900">{ville.coloc}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">CROUS :</span>
                        <span className="font-semibold text-green-700">{ville.crous}</span>
                      </div>
                    </div>
                    
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <div className="flex items-center mb-2">
                        <Star className="w-4 h-4 text-blue-600 mr-2" />
                        <span className="text-sm font-semibold text-blue-900">Conseil :</span>
                      </div>
                      <p className="text-xs text-blue-800">{ville.tips}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">
                  Facteurs influençant les prix
                </h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-semibold text-orange-900 mb-3">Augmentent les prix :</h4>
                    <ul className="space-y-2 text-orange-800">
                      <li className="flex items-center">
                        <ChevronRight className="w-4 h-4 mr-2" />
                        <span className="text-sm">Centre-ville</span>
                      </li>
                      <li className="flex items-center">
                        <ChevronRight className="w-4 h-4 mr-2" />
                        <span className="text-sm">Proche transports</span>
                      </li>
                      <li className="flex items-center">
                        <ChevronRight className="w-4 h-4 mr-2" />
                        <span className="text-sm">Meublé équipé</span>
                      </li>
                      <li className="flex items-center">
                        <ChevronRight className="w-4 h-4 mr-2" />
                        <span className="text-sm">Grandes surfaces</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-green-900 mb-3">Réduisent les prix :</h4>
                    <ul className="space-y-2 text-green-800">
                      <li className="flex items-center">
                        <ChevronRight className="w-4 h-4 mr-2" />
                        <span className="text-sm">Périphérie</span>
                      </li>
                      <li className="flex items-center">
                        <ChevronRight className="w-4 h-4 mr-2" />
                        <span className="text-sm">Logement vide</span>
                      </li>
                      <li className="flex items-center">
                        <ChevronRight className="w-4 h-4 mr-2" />
                        <span className="text-sm">Quartiers populaires</span>
                      </li>
                      <li className="flex items-center">
                        <ChevronRight className="w-4 h-4 mr-2" />
                        <span className="text-sm">Colocation</span>
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
                  Aides au logement étudiant
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Découvrez toutes les aides disponibles pour réduire votre budget logement.
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
                        <span className="text-sm text-gray-600">Montant :</span>
                        <span className="font-semibold text-green-700">{aide.montant}</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Conditions :</h4>
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
                        <span className="text-sm font-semibold text-blue-900">Démarche :</span>
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
                    Simulation d'économies
                  </h3>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-900 mb-1">200€</div>
                    <div className="text-sm text-green-800">APL moyenne</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-900 mb-1">100€</div>
                    <div className="text-sm text-green-800">Mobili-Jeune max</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-900 mb-1">300€</div>
                    <div className="text-sm text-green-800">Économie totale</div>
                  </div>
                </div>
                <p className="text-green-800 text-sm mt-4 text-center">
                  Un étudiant peut réduire son budget logement de 200 à 300€/mois grâce aux aides
                </p>
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
                  Préparez tous les documents nécessaires pour constituer un dossier solide.
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
                    Spécificités étudiants étrangers
                  </h3>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-red-900 mb-2">Documents supplémentaires :</h4>
                    <ul className="text-red-800 text-sm space-y-1">
                      <li>• Titre de séjour ou visa</li>
                      <li>• Attestation Campus France</li>
                      <li>• Justificatifs traduits</li>
                      <li>• Garant français obligatoire</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-900 mb-2">Difficultés courantes :</h4>
                    <ul className="text-red-800 text-sm space-y-1">
                      <li>• Pas d'historique locatif</li>
                      <li>• Revenus étrangers</li>
                      <li>• Méconnaissance des codes</li>
                      <li>• Barrière linguistique</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">
                  Checklist dossier parfait
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-3">Avant la visite :</h4>
                    <ul className="space-y-2 text-blue-800 text-sm">
                      <li>☑️ Dossier complet numérisé</li>
                      <li>☑️ Originaux dans classeur</li>
                      <li>☑️ Garant mobilisé</li>
                      <li>☑️ Assurance souscrite</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-3">Pendant la visite :</h4>
                    <ul className="space-y-2 text-blue-800 text-sm">
                      <li>☑️ Présentation soignée</li>
                      <li>☑️ Motivation exprimée</li>
                      <li>☑️ Questions pertinentes</li>
                      <li>☑️ Candidature immédiate</li>
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
            Besoin d'aide pour trouver votre logement ?
          </h2>
          <p className="text-lg lg:text-xl mb-8 text-orange-100">
            Nos conseillers spécialisés vous accompagnent dans votre recherche de logement 
            étudiant et vous aident à optimiser votre budget.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="bg-white text-orange-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Aide au logement
            </Link>
            <Link href="/guides/visa-etudiant" className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-orange-600 transition-colors">
              Guide visa étudiant
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default LogementGuide;
