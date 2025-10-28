// src/components/OrganizationContactSection.js - Section dédiée aux organismes

import React, { useState } from 'react';
import { REST_API_PARAMS } from '../utils/Constants';
import { 
  Building2, 
  User, 
  Mail, 
  MessageSquare, 
  Send, 
  CheckCircle,
  Loader2,
  Users,
  GraduationCap,
  Globe,
  Award
} from 'lucide-react';
import { useTranslation } from 'next-i18next';

const OrganizationContactSection = () => {
  const { t } = useTranslation('common');
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    position: '',
    organization: '',
    email: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = t('organization.contact.form.errors.firstNameRequired');
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = t('organization.contact.form.errors.lastNameRequired');
    }

    if (!formData.position.trim()) {
      newErrors.position = t('organization.contact.form.errors.positionRequired');
    }

    if (!formData.organization.trim()) {
      newErrors.organization = t('organization.contact.form.errors.organizationRequired');
    }

    if (!formData.email.trim()) {
      newErrors.email = t('organization.contact.form.errors.emailRequired');
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('organization.contact.form.errors.emailInvalid');
    }

    if (!formData.message.trim()) {
      newErrors.message = t('organization.contact.form.errors.messageRequired');
    } else if (formData.message.trim().length < 20) {
      newErrors.message = t('organization.contact.form.errors.messageTooShort');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const response = await fetch(`${REST_API_PARAMS.baseUrl}/api/organizations/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({
          firstName: '',
          lastName: '',
          position: '',
          organization: '',
          email: '',
          message: ''
        });
      } else {
        throw new Error('Erreur lors de l\'envoi');
      }
    } catch (error) {
      console.error('Erreur:', error);
      setErrors({ submit: t('organization.contact.form.errors.submitError') });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Effacer l'erreur du champ modifié
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  if (isSubmitted) {
    return (
      <div id="organization-contact" className="py-6 bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              {t('organization.contact.success.title')}
            </h3>
            
            <p className="text-lg text-gray-600 mb-8">
              {t('organization.contact.success.message')}
            </p>
            
            <button
              onClick={() => setIsSubmitted(false)}
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              {t('organization.contact.success.sendAnother')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="organization-contact" className="py-16 bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="container mx-auto px-4">
        {/* En-tête */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Building2 className="w-4 h-4" />
            {t('organization.title')}
          </div>
          
          {/* Avantages partenariat */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{t('organization.advantages.visibility.title')}</h3>
              <p className="text-gray-600 text-sm">{t('organization.advantages.visibility.description')}</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{t('organization.advantages.reach.title')}</h3>
              <p className="text-gray-600 text-sm">{t('organization.advantages.reach.description')}</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{t('organization.advantages.support.title')}</h3>
              <p className="text-gray-600 text-sm">{t('organization.advantages.support.description')}</p>
            </div>
          </div>
        </div>

        {/* Formulaire de contact */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white mx-auto mb-4">
                <GraduationCap className="w-8 h-8" />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {t('organization.contact.title')}
              </h3>
              <p className="text-gray-600">
                {t('organization.contact.subtitle')}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Nom et Prénom */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <User className="w-4 h-4 inline mr-2" />
                    {t('organization.contact.form.firstName')} *
                  </label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                      errors.firstName ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder={t('organization.contact.form.placeholders.firstName')}
                  />
                  {errors.firstName && (
                    <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <User className="w-4 h-4 inline mr-2" />
                    {t('organization.contact.form.lastName')} *
                  </label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                      errors.lastName ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder={t('organization.contact.form.placeholders.lastName')}
                  />
                  {errors.lastName && (
                    <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
                  )}
                </div>
              </div>

              {/* Poste et Établissement */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Building2 className="w-4 h-4 inline mr-2" />
                    {t('organization.contact.form.position')} *
                  </label>
                  <input
                    type="text"
                    value={formData.position}
                    onChange={(e) => handleInputChange('position', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                      errors.position ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder={t('organization.contact.form.placeholders.position')}
                  />
                  {errors.position && (
                    <p className="mt-1 text-sm text-red-600">{errors.position}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <GraduationCap className="w-4 h-4 inline mr-2" />
                    {t('organization.contact.form.organization')} *
                  </label>
                  <input
                    type="text"
                    value={formData.organization}
                    onChange={(e) => handleInputChange('organization', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                      errors.organization ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder={t('organization.contact.form.placeholders.organization')}
                  />
                  {errors.organization && (
                    <p className="mt-1 text-sm text-red-600">{errors.organization}</p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Mail className="w-4 h-4 inline mr-2" />
                  {t('organization.contact.form.email')} *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                    errors.email ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder={t('organization.contact.form.placeholders.email')}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MessageSquare className="w-4 h-4 inline mr-2" />
                  {t('organization.contact.form.message')} *
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  rows={6}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                    errors.message ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder={t('organization.contact.form.placeholders.message')}
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-600">{errors.message}</p>
                )}
                <p className="mt-1 text-sm text-gray-500">
                  {t('organization.contact.form.charactersCount', { count: formData.message.length })}
                </p>
              </div>

              {/* Message d'erreur général */}
              {errors.submit && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                  {errors.submit}
                </div>
              )}

              {/* Bouton d'envoi */}
              <div className="text-center">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:transform-none"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>{t('organization.contact.form.submitting')}</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>{t('organization.contact.form.submit')}</span>
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Note de confidentialité */}
            <div className="mt-8 pt-6 border-t border-gray-200 text-center">
              <p className="text-sm text-gray-500">
                {t('organization.contact.privacy')}
              </p>
            </div>
          </div>
        </div>

        {/* Section de témoignages partenaires */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
            {t('organization.testimonials.title')}
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building2 className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">{t('organization.testimonials.businessSchools.title')}</h4>
              <p className="text-gray-600 text-sm">
                {t('organization.testimonials.businessSchools.quote')}
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">{t('organization.testimonials.universities.title')}</h4>
              <p className="text-gray-600 text-sm">
                {t('organization.testimonials.universities.quote')}
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-purple-600" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">{t('organization.testimonials.specializedSchools.title')}</h4>
              <p className="text-gray-600 text-sm">
                {t('organization.testimonials.specializedSchools.quote')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizationContactSection;
