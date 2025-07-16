// src/components/AccompanySection.js - Section accompagnement premium

import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, 
  FileCheck, 
  MapPin, 
  Check, 
  Star, 
  Users, 
  Shield, 
  ArrowRight,
  Globe,
  Heart,
  Award,
  Sparkles,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { useSession } from 'next-auth/react';
import AccompanyModal from './AccompanyModal';
import { useCurrencyConverter } from '../hooks/useCurrencyConverter';

const AccompanySection = () => {
  const { data: session } = useSession();
  const { convertPrice, userCurrency } = useCurrencyConverter();
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [expandedOffer, setExpandedOffer] = useState(null);

  // 🎯 Données des offres avec contenu vendeur
  const offers = [
    {
      id: 'orientation',
      name: '🎯 Pack Orientation+',
      tagline: 'De l\'idée au choix parfait',
      description: 'Trouvez LA formation qui transformera votre avenir',
      price: 100,
      originalPrice: 150,
      badge: 'Le plus populaire',
      color: 'from-blue-500 to-indigo-600',
      borderColor: 'border-blue-500',
      icon: <GraduationCap className="w-8 h-8" />,
      features: [
        'Analyse personnalisée de votre profil',
        'Recommandations d\'écoles sur-mesure',
        'Aide à la constitution du dossier',
        'Suivi jusqu\'à l\'admission garantie'
      ],
      detailedFeatures: [
        {
          title: 'Conseil Stratégique et Orientation Personnalisée',
          items: [
            'Analyse complète de votre parcours académique et professionnel',
            'Identification de vos atouts et domaines d\'amélioration',
            'Recommandations sur-mesure des formations alignées avec vos objectifs',
            'Guide complet des démarches administratives',
            'Orientation financière et solutions de financement'
          ]
        },
        {
          title: 'Préparation Optimale des Dossiers',
          items: [
            'Assistance complète pour votre dossier Campus France',
            'Sélection stratégique des établissements',
            'Structuration de votre projet académique et professionnel',
            'Rédaction de lettres de motivation percutantes',
            'Préparation intensive à l\'entretien Campus France'
          ]
        }
      ],
      specialMessage: 'Rassurez-vous, nous vous guidons vers les écoles les plus adaptées pour vous.'
    },
    {
      id: 'visa',
      name: '🛂 Pack Visa & Préparation',
      tagline: 'Votre passeport pour la France',
      description: 'Obtenez votre visa sans stress, nous nous occupons de tout',
      price: 200,
      originalPrice: 300,
      badge: 'Le plus complet',
      color: 'from-emerald-500 to-teal-600',
      borderColor: 'border-emerald-500',
      icon: <FileCheck className="w-8 h-8" />,
      features: [
        'Montage complet du dossier visa',
        'Préparation à l\'entretien consulaire',
        'Garantie financière & logement',
        'Assistance en cas de refus'
      ],
      detailedFeatures: [
        {
          title: 'Assistance Visa Complète',
          items: [
            'Montage professionnel du dossier de visa longue durée',
            'Coaching pour l\'interview consulaire',
            'Stratégies en cas de refus de visa',
            'Solutions financières (compte bloqué, garant)',
            'Préparation de tous les documents de voyage'
          ]
        },
        {
          title: 'Préparation Logement & Finances',
          items: [
            'Recherche et sécurisation du logement étudiant',
            'Assistance pour les garanties financières',
            'Conseils sur l\'assurance voyage et santé',
            'Préparation du budget de vie en France',
            'Aide pour les démarches bancaires'
          ]
        }
      ],
      specialMessage: 'Votre tranquillité d\'esprit : nous sécurisons votre visa.'
    },
    {
      id: 'installation',
      name: '🏠 Pack Installation France',
      tagline: 'Votre nouvelle vie commence ici',
      description: 'Intégrez-vous facilement et rapidement dans votre nouvelle vie française',
      price: 150,
      originalPrice: 200,
      badge: 'Succès garanti',
      color: 'from-purple-500 to-pink-600',
      borderColor: 'border-purple-500',
      icon: <MapPin className="w-8 h-8" />,
      features: [
        'Ouverture compte bancaire',
        'Inscription universitaire facilitée',
        'Sécurité sociale & mutuelle',
        'Intégration vie étudiante'
      ],
      detailedFeatures: [
        {
          title: 'Démarches Administratives Essentielles',
          items: [
            'Assistance ouverture compte bancaire français',
            'Accompagnement inscription universitaire',
            'Inscription sécurité sociale et mutuelle étudiante',
            'Régularisation du titre de séjour',
            'Obtention des cartes de réduction étudiantes'
          ]
        },
        {
          title: 'Intégration et Vie Étudiante',
          items: [
            'Coaching d\'intégration dans la vie française',
            'Aide à la recherche de jobs étudiants',
            'Accompagnement pour trouver des stages',
            'Accès aux réseaux étudiants et associatifs',
            'Support continu pendant les premiers mois'
          ]
        }
      ],
      specialMessage: 'Nous vous accompagnons dans vos premiers pas en France.'
    }
  ];

  const handleOfferSelect = (offer) => {
    setSelectedOffer(offer);
    setShowModal(true);
  };

  const toggleExpanded = (offerId) => {
    setExpandedOffer(expandedOffer === offerId ? null : offerId);
  };

  return (
    <div id="accompany-section" className="py-6 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        {/* En-tête avec message pour les parents */}
        <div className="text-center">
          
          {/* Garanties pour rassurer les parents */}
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
              <Shield className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium text-gray-700">Garantie satisfaction 100%</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
              <Award className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-medium text-gray-700">+500 étudiants accompagnées</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
              <Users className="w-5 h-5 text-purple-600" />
              <span className="text-sm font-medium text-gray-700">Conseillers bilingues</span>
            </div>
          </div>
        </div>

        {/* Grille des offres */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {offers.map((offer, index) => (
            <div key={offer.id} className="relative">
              {/* Badge */}
              {offer.badge && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <div className={`bg-gradient-to-r ${offer.color} text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg`}>
                    <Sparkles className="w-3 h-3 inline mr-1" />
                    {offer.badge}
                  </div>
                </div>
              )}

              {/* Carte de l'offre */}
              <div className={`relative bg-white rounded-2xl shadow-xl border-2 ${offer.borderColor} p-8 flex-col hover:transform hover:scale-105 transition-all duration-300`}>
                {/* Header */}
                <div className="text-center mb-6">
                  <div className={`w-16 h-16 bg-gradient-to-r ${offer.color} rounded-full flex items-center justify-center text-white mx-auto mb-4`}>
                    {offer.icon}
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{offer.name}</h3>
                  <p className="text-blue-600 font-semibold mb-2">{offer.tagline}</p>
                  <p className="text-gray-600 text-sm">{offer.description}</p>
                </div>

                {/* Prix */}
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-4xl font-bold text-gray-900">{convertPrice(offer.price)}</span>
                    <span className="text-lg text-gray-500 line-through">{convertPrice(offer.originalPrice)}</span>
                  </div>
                  <div className="text-green-600 font-semibold text-sm">
                    Économisez {convertPrice(offer.originalPrice - offer.price)} !
                  </div>
                </div>

                {/* Features principales */}
                <div className="space-y-3 mb-6">
                  {offer.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Message pour les parents */}
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
                  <p className="text-blue-800 text-sm italic">
                    💝 {offer.specialMessage}
                  </p>
                </div>

                {/* Boutons */}
                <div className="space-y-3 mt-auto">
                  <button
                    onClick={() => handleOfferSelect(offer)}
                    className={`w-full py-4 px-6 bg-gradient-to-r ${offer.color} text-white font-bold rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1`}
                  >
                    Choisir cette offre
                    <ArrowRight className="w-5 h-5 inline ml-2" />
                  </button>
                  
                  <button
                    onClick={() => toggleExpanded(offer.id)}
                    className="w-full py-2 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                  >
                    <span>En savoir plus</span>
                    {expandedOffer === offer.id ? 
                      <ChevronUp className="w-4 h-4" /> : 
                      <ChevronDown className="w-4 h-4" />
                    }
                  </button>
                </div>

                {/* Détails étendus */}
                {expandedOffer === offer.id && (
                  <div className="mt-6 pt-6 border-t border-gray-200 animate-in slide-in-from-top duration-300">
                    {offer.detailedFeatures.map((section, idx) => (
                      <div key={idx} className="mb-6">
                        <h4 className="font-bold text-gray-900 mb-3">{section.title}</h4>
                        <ul className="space-y-2">
                          {section.items.map((item, itemIdx) => (
                            <li key={itemIdx} className="flex items-start gap-2">
                              <Star className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" />
                              <span className="text-gray-600 text-sm">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Section de confiance supplémentaire */}
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Pourquoi ils nous font confiance ?
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Sécurité & Transparence</h4>
              <p className="text-gray-600 text-sm">Suivi en temps réel et communication constante avec nos étudiants</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Award className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Expertise Reconnue</h4>
              <p className="text-gray-600 text-sm">Équipe d'anciens étudiants en France et de professionnels de l'éducation</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Heart className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Accompagnement Humain</h4>
              <p className="text-gray-600 text-sm">Un conseiller dédié qui croit en votre potentiel disponible 7j/7</p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de sélection */}
      {showModal && selectedOffer && (
        <AccompanyModal
          offer={selectedOffer}
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          userCurrency={userCurrency}
          convertPrice={convertPrice}
        />
      )}
    </div>
  );
};

export default AccompanySection;
