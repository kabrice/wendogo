// src/components/AccompanyModal.js - Modal de commande avec formulaire

import React, { useState, useEffect } from 'react';
import { REST_API_PARAMS } from '../utils/Constants';
import { 
  X, 
  User, 
  Phone, 
  MessageSquare, 
  CheckCircle, 
  AlertCircle,
  Loader2,
  Clock,
  Shield
} from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useFavorites } from '../contexts/FavoritesContext';
import { useTranslation } from 'next-i18next';

const AccompanyModal = ({ offer, isOpen, onClose, userCurrency, convertPrice }) => {
  const { t } = useTranslation('accompanyModal');
  const { data: session } = useSession();
  const { setShowAuthModal } = useFavorites();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    projectDescription: '',
    additionalInfo: '',
    preferredContact: 'whatsapp',
    urgency: 'normal'
  });
  const [userProfile, setUserProfile] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (session?.user) {
      fetchUserProfile();
    }
  }, [session]);

  const fetchUserProfile = async () => {
    try {
      const response = await fetch(`${REST_API_PARAMS.baseUrl}/api/user/profile`, {
        headers: {
          'Authorization': `Bearer ${session.accessToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUserProfile(data.user);
      }
    } catch (error) {
      console.error('Erreur profil utilisateur:', error);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.projectDescription.trim()) {
      newErrors.projectDescription = t('accompanyModal:errors.projectDescriptionRequired');
    } else if (formData.projectDescription.trim().length < 50) {
      newErrors.projectDescription = t('accompanyModal:errors.projectDescriptionTooShort');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isProfileComplete = () => {
    if (!userProfile) return false;
    
    return !!(
      userProfile.firstname &&
      userProfile.lastname &&
      userProfile.phone &&
      userProfile.birthdate &&
      userProfile.country
    );
  };

  const handleNext = () => {
    if (step === 1) {
      // Vérifier la connexion
      if (!session) {
        setShowAuthModal(true);
        return;
      }
      
      // Vérifier le profil complet
      if (!isProfileComplete()) {
        setStep(2);
        return;
      }
      
      setStep(3);
    } else if (step === 2) {
      setStep(3);
    } else if (step === 3) {
      if (validateForm()) {
        handleSubmit();
      }
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    
    try {
      const response = await fetch(`${REST_API_PARAMS.baseUrl}/api/accompany/request`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.accessToken}`,
          
        },
        body: JSON.stringify({
          offerId: offer.id,
          offerName: offer.name,
          price: offer.price,
          currency: userCurrency,
          projectDescription: formData.projectDescription,
          additionalInfo: formData.additionalInfo,
          preferredContact: formData.preferredContact,
          urgency: formData.urgency
        }),
      });

      if (response.ok) {
        setStep(4); // Étape de confirmation
      } else {
        throw new Error('Erreur lors de l\'envoi de la demande');
      }
    } catch (error) {
      console.error('Erreur soumission:', error);
      setErrors({ submit: t('accompanyModal:errors.submitError') });
    } finally {
      setIsLoading(false);
    }
  };
  const getPlaceholderByOffer = (offerId) => {
    const placeholders = {
      orientation: t('accompanyModal:step3.projectDescription.placeholder.orientation'),
      visa: t('accompanyModal:step3.projectDescription.placeholder.visa'),
      installation: t('accompanyModal:step3.projectDescription.placeholder.installation')
    };
    
    return placeholders[offerId] || placeholders.orientation;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-110 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className={`bg-gradient-to-r ${offer.color} text-white p-6 rounded-t-2xl relative`}>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="flex items-center gap-4">
            {offer.icon}
            <div>
              <h3 className="text-2xl font-bold">{offer.name}</h3>
              <p className="text-white/90">{offer.tagline}</p>
              <p className="text-2xl font-bold mt-2">{convertPrice(offer.price)}</p>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">{t('accompanyModal:step.label')} {step} {t('accompanyModal:step.of')} 4</span>
            <span className="text-sm text-gray-600">{Math.round((step / 4) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`bg-gradient-to-r ${offer.color} h-2 rounded-full transition-all duration-300`}
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Étape 1: Connexion */}
          {step === 1 && (
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <User className="w-10 h-10 text-blue-600" />
              </div>
              
              <h4 className="text-2xl font-bold text-gray-900 mb-4">
                {t('accompanyModal:step1.title')}
              </h4>
              
              {!session ? (
                <>
                  <p className="text-gray-600 mb-6">
                    {t('accompanyModal:step1.notConnected.description')}
                  </p>
                  
                  <button
                    onClick={() => setShowAuthModal(true)}
                    className="w-full py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    {t('accompanyModal:step1.notConnected.button')}
                  </button>
                </>
              ) : (
                <>
                  <p className="text-gray-600 mb-6">
                    {t('accompanyModal:step1.connected.description')} <strong>{session.user.name}</strong>
                  </p>
                  
                  <button
                    onClick={handleNext}
                    className="w-full py-3 px-6 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
                  >
                    {t('accompanyModal:step1.connected.button')}
                  </button>
                </>
              )}
            </div>
          )}

          {/* Étape 2: Vérification du profil */}
          {step === 2 && (
            <div className="text-center">
              <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertCircle className="w-10 h-10 text-orange-600" />
              </div>
              
              <h4 className="text-2xl font-bold text-gray-900 mb-4">
                {isProfileComplete() ? t('accompanyModal:step2.title.complete') : t('accompanyModal:step2.title.incomplete')}
              </h4>
              
              {isProfileComplete() ? (
                <>
                  <p className="text-gray-600 mb-6">
                    {t('accompanyModal:step2.profileComplete.description')}
                  </p>
                  
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                    <h5 className="font-semibold text-green-800 mb-2">{t('accompanyModal:step2.profileComplete.sectionTitle')}</h5>
                    <ul className="text-left text-green-700 space-y-1">
                      <li>• {t('accompanyModal:step2.profileComplete.fields.name')} {userProfile?.firstname} {userProfile?.lastname}</li>
                      <li>• {t('accompanyModal:step2.profileComplete.fields.phone')} {userProfile?.phone}</li>
                      <li>• {t('accompanyModal:step2.profileComplete.fields.birthdate')} {userProfile?.birthdate ? new Date(userProfile.birthdate).toLocaleDateString('fr-FR') : 'Renseignée'}</li>
                      <li>• {t('accompanyModal:step2.profileComplete.fields.country')} {userProfile?.country}</li>
                    </ul>
                  </div>
                  
                  {/* <button
                    onClick={handleNext}
                    className="w-full py-3 px-6 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Continuer vers mon projet
                  </button> */}
                </>
              ) : (
                <>
                  <p className="text-gray-600 mb-6">
                    {t('accompanyModal:step2.profileIncomplete.description')}
                  </p>
                  
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
                    <h5 className="font-semibold text-orange-800 mb-2">{t('accompanyModal:step2.profileIncomplete.sectionTitle')}</h5>
                    <ul className="text-left text-orange-700 space-y-1">
                      {!userProfile?.phone && <li>• {t('accompanyModal:step2.profileIncomplete.missingFields.phone')}</li>}
                      {!userProfile?.birthdate && <li>• {t('accompanyModal:step2.profileIncomplete.missingFields.birthdate')}</li>}
                      {!userProfile?.country && <li>• {t('accompanyModal:step2.profileIncomplete.missingFields.country')}</li>}
                    </ul>
                  </div>
                  
                  <button
                    onClick={() => window.open('/account', '_blank')}
                    className="w-full py-3 px-6 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition-colors mb-3"
                  >
                    {t('accompanyModal:step2.profileIncomplete.button')}
                  </button>
                  
                  <button
                    onClick={handleNext}
                    className="w-full py-2 px-4 text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    {t('accompanyModal:step2.profileIncomplete.skipButton')}
                  </button>
                </>
              )}
            </div>
          )}

          {/* Étape 3: Formulaire du projet */}
          {step === 3 && (
            <div>
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="w-10 h-10 text-purple-600" />
                </div>
                
                <h4 className="text-2xl font-bold text-gray-900 mb-2">
                  {t('accompanyModal:step3.title')}
                </h4>
                <p className="text-gray-600">
                  {t('accompanyModal:step3.subtitle')}
                </p>
              </div>

              <div className="space-y-6">
                {/* Description du projet */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('accompanyModal:step3.projectDescription.label')}
                  </label>
                  <textarea
                    value={formData.projectDescription}
                    onChange={(e) => setFormData({...formData, projectDescription: e.target.value})}
                    placeholder={getPlaceholderByOffer(offer.id)}
                    rows={5}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                      errors.projectDescription ? 'border-red-300' : 'border-gray-300'
                    }`}
                  />
                  {errors.projectDescription && (
                    <p className="mt-1 text-sm text-red-600">{errors.projectDescription}</p>
                  )}
                  <p className="mt-1 text-sm text-gray-500">
                    {t('accompanyModal:step3.projectDescription.charactersCount', { count: formData.projectDescription.length })}
                  </p>
                </div>

                {/* Informations supplémentaires */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('accompanyModal:step3.additionalInfo.label')}
                  </label>
                  <textarea
                    value={formData.additionalInfo}
                    onChange={(e) => setFormData({...formData, additionalInfo: e.target.value})}
                    placeholder={t('accompanyModal:step3.additionalInfo.placeholder')}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                {/* Préférence de contact */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('accompanyModal:step3.contactPreference.label')}
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="contact"
                        value="whatsapp"
                        checked={formData.preferredContact === 'whatsapp'}
                        onChange={(e) => setFormData({...formData, preferredContact: e.target.value})}
                        className="mr-2"
                      />
                      <span>{t('accompanyModal:step3.contactPreference.options.whatsapp')}</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="contact"
                        value="email"
                        checked={formData.preferredContact === 'email'}
                        onChange={(e) => setFormData({...formData, preferredContact: e.target.value})}
                        className="mr-2"
                      />
                      <span>{t('accompanyModal:step3.contactPreference.options.email')}</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="contact"
                        value="phone"
                        checked={formData.preferredContact === 'phone'}
                        onChange={(e) => setFormData({...formData, preferredContact: e.target.value})}
                        className="mr-2"
                      />
                      <span>{t('accompanyModal:step3.contactPreference.options.phone')}</span>
                    </label>
                  </div>
                </div>

                {/* Urgence */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('accompanyModal:step3.urgency.label')}
                  </label>
                  <select
                    value={formData.urgency}
                    onChange={(e) => setFormData({...formData, urgency: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="normal">{t('accompanyModal:step3.urgency.options.normal')}</option>
                    <option value="urgent">{t('accompanyModal:step3.urgency.options.urgent')}</option>
                    <option value="very_urgent">{t('accompanyModal:step3.urgency.options.veryUrgent')}</option>
                  </select>
                </div>

                {errors.submit && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                    {errors.submit}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Étape 4: Confirmation */}
          {step === 4 && (
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              
              <h4 className="text-2xl font-bold text-gray-900 mb-4">
                {t('accompanyModal:step4.title')}
              </h4>
              
              <p className="text-gray-600 mb-6" dangerouslySetInnerHTML={{ 
                __html: t('accompanyModal:step4.description', { offerName: offer.name }) 
              }} />
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-3 mb-2">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <span className="font-semibold text-blue-800">{t('accompanyModal:step4.nextSteps.title')}</span>
                </div>
                <ul className="text-left text-blue-700 space-y-1">
                  <li>• {t('accompanyModal:step4.nextSteps.steps.0')}</li>
                  <li>• {t('accompanyModal:step4.nextSteps.steps.1')}</li>
                  <li>• {t('accompanyModal:step4.nextSteps.steps.2')}</li>
                  <li>• {t('accompanyModal:step4.nextSteps.steps.3')}</li>
                </ul>
              </div>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-green-600" />
                  <span className="font-semibold text-green-800">{t('accompanyModal:step4.guarantee')}</span>
                </div>
              </div>
              
              <button
                onClick={onClose}
                className="w-full py-3 px-6 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
              >
                {t('accompanyModal:step4.button')}
              </button>
            </div>
          )}
        </div>

        {/* Footer avec boutons */}
        {step < 4 && step !== 1 && (
          <div className="px-6 pb-6">
            <div className="flex gap-3">
              <button
                onClick={() => setStep(step - 1)}
                className="flex-1 py-2 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                {t('accompanyModal:navigation.back')}
              </button>
              
              <button
                onClick={handleNext}
                disabled={isLoading}
                className={`flex-1 py-2 px-4 bg-gradient-to-r ${offer.color} text-white rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2`}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>{t('accompanyModal:navigation.sending')}</span>
                  </>
                ) : (
                  <span>{step === 3 ? t('accompanyModal:navigation.submit') : t('accompanyModal:navigation.continue')}</span>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccompanyModal;
