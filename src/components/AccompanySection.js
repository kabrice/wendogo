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
import { useTranslation } from 'next-i18next';

const AccompanySection = () => {
  const { data: session } = useSession();
  const { convertPrice, userCurrency } = useCurrencyConverter();
  const { t } = useTranslation(['common', 'accompanyModal']);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [expandedOffer, setExpandedOffer] = useState(null);

  // 🎯 Données des offres avec contenu vendeur
  const offers = [
    {
      id: 'orientation',
      name: t('accompany.orientation.name'),
      tagline: t('accompany.orientation.tagline'),
      description: t('accompany.orientation.description'),
      price: 100,
      originalPrice: 150,
      badge: t('accompany.orientation.mostPopular'),
      color: 'from-blue-500 to-indigo-600',
      borderColor: 'border-blue-500',
      icon: <GraduationCap className="w-8 h-8" />,
      features: [
        t('accompany.orientation.features.analysis'),
        t('accompany.orientation.features.recommendations'),
        t('accompany.orientation.features.dossier'),
        t('accompany.orientation.features.followup')
      ],
      detailedFeatures: [
        {
          title: t('accompany.orientation.detailed.strategy.title'),
          items: [
            t('accompany.orientation.detailed.strategy.items.analysis'),
            t('accompany.orientation.detailed.strategy.items.strengths'),
            t('accompany.orientation.detailed.strategy.items.recommendations'),
            t('accompany.orientation.detailed.strategy.items.guide'),
            t('accompany.orientation.detailed.strategy.items.financing')
          ]
        },
        {
          title: t('accompany.orientation.detailed.preparation.title'),
          items: [
            t('accompany.orientation.detailed.preparation.items.campusFrance'),
            t('accompany.orientation.detailed.preparation.items.selection'),
            t('accompany.orientation.detailed.preparation.items.structure'),
            t('accompany.orientation.detailed.preparation.items.motivation'),
            t('accompany.orientation.detailed.preparation.items.interview')
          ]
        }
      ],
      specialMessage: t('accompany.orientation.specialMessage')
    },
    {
      id: 'visa',
      name: t('accompany.visa.name'),
      tagline: t('accompany.visa.tagline'),
      description: t('accompany.visa.description'),
      price: 200,
      originalPrice: 300,
      badge: t('accompany.visa.mostComplete'),
      color: 'from-emerald-500 to-teal-600',
      borderColor: 'border-emerald-500',
      icon: <FileCheck className="w-8 h-8" />,
      features: [
        t('accompany.visa.features.dossier'),
        t('accompany.visa.features.interview'),
        t('accompany.visa.features.guarantee'),
        t('accompany.visa.features.support')
      ],
      detailedFeatures: [
        {
          title: t('accompany.visa.detailed.assistance.title'),
          items: [
            t('accompany.visa.detailed.assistance.items.dossier'),
            t('accompany.visa.detailed.assistance.items.coaching'),
            t('accompany.visa.detailed.assistance.items.strategies'),
            t('accompany.visa.detailed.assistance.items.financial'),
            t('accompany.visa.detailed.assistance.items.documents')
          ]
        },
        {
          title: t('accompany.visa.detailed.housing.title'),
          items: [
            t('accompany.visa.detailed.housing.items.search'),
            t('accompany.visa.detailed.housing.items.guarantee'),
            t('accompany.visa.detailed.housing.items.insurance'),
            t('accompany.visa.detailed.housing.items.budget'),
            t('accompany.visa.detailed.housing.items.banking')
          ]
        }
      ],
      specialMessage: t('accompany.visa.specialMessage')
    },
    {
      id: 'installation',
      name: t('accompany.installation.name'),
      tagline: t('accompany.installation.tagline'),
      description: t('accompany.installation.description'),
      price: 150,
      originalPrice: 200,
      badge: t('accompany.installation.successGuaranteed'),
      color: 'from-purple-500 to-pink-600',
      borderColor: 'border-purple-500',
      icon: <MapPin className="w-8 h-8" />,
      features: [
        t('accompany.installation.features.banking'),
        t('accompany.installation.features.university'),
        t('accompany.installation.features.social'),
        t('accompany.installation.features.integration')
      ],
      detailedFeatures: [
        {
          title: t('accompany.installation.detailed.administrative.title'),
          items: [
            t('accompany.installation.detailed.administrative.items.banking'),
            t('accompany.installation.detailed.administrative.items.university'),
            t('accompany.installation.detailed.administrative.items.social'),
            t('accompany.installation.detailed.administrative.items.residence'),
            t('accompany.installation.detailed.administrative.items.cards')
          ]
        },
        {
          title: t('accompany.installation.detailed.integration.title'),
          items: [
            t('accompany.installation.detailed.integration.items.coaching'),
            t('accompany.installation.detailed.integration.items.jobs'),
            t('accompany.installation.detailed.integration.items.internships'),
            t('accompany.installation.detailed.integration.items.network'),
            t('accompany.installation.detailed.integration.items.support')
          ]
        }
      ],
      specialMessage: t('accompany.installation.specialMessage')
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
              <span className="text-sm font-medium text-gray-700">{t('accompany.guarantees.satisfaction')}</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
              <Award className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-medium text-gray-700">{t('accompany.guarantees.students')}</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
              <Users className="w-5 h-5 text-purple-600" />
              <span className="text-sm font-medium text-gray-700">{t('accompany.guarantees.advisors')}</span>
            </div>
          </div>
        </div>

        {/* Grille des offres */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {offers.map((offer, index) => (
            <div key={offer.id} className="relative">
              {/* Badge */}
              {offer.badge && (
<div className="absolute -top-3 sm:-top-4 left-1/2 transform -translate-x-1/2 z-10">
  <div className={`bg-gradient-to-r ${offer.color} text-white px-2 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-bold shadow-lg whitespace-nowrap max-w-[140px] sm:max-w-none`}>
    <Sparkles className="w-3 h-3 inline mr-1 flex-shrink-0" />
    <span className="truncate">{offer.badge}</span>
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
                    {t('accompany.savings', { amount: convertPrice(offer.originalPrice - offer.price) })}
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
                    {t('accompany.chooseOffer')}
                    <ArrowRight className="w-5 h-5 inline ml-2" />
                  </button>
                  
                  <button
                    onClick={() => toggleExpanded(offer.id)}
                    className="w-full py-2 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                  >
                    <span>{t('accompany.learnMore')}</span>
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
            {t('accompany.trust.title')}
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">{t('accompany.trust.security.title')}</h4>
              <p className="text-gray-600 text-sm">{t('accompany.trust.security.description')}</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Award className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">{t('accompany.trust.expertise.title')}</h4>
              <p className="text-gray-600 text-sm">{t('accompany.trust.expertise.description')}</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Heart className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">{t('accompany.trust.human.title')}</h4>
              <p className="text-gray-600 text-sm">{t('accompany.trust.human.description')}</p>
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
// export async function getStaticProps({ locale }) {
//   const { serverSideTranslations } = await import('next-i18next/serverSideTranslations');
  
//   return {
//     props: {
//       ...(await serverSideTranslations(locale, ['authModal', 'common', 'accompanyModal'])),
//     },
//   };
// }
export default AccompanySection;
