// src/pages/contact.js - Version mise à jour avec vraie API
'use client';

import { useEffect, useState } from 'react';
import { trackPageView, event } from '../lib/gtag';
import Head from 'next/head';
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';
import { Mail, MessageCircle, Phone, MapPin, Clock, Users, Send, CheckCircle, AlertCircle } from 'lucide-react';
import Image from 'next/image';
import SocialMediaLogo from '../assets/optimized/social_media_logo.webp';
import { FloatingWhatsApp } from 'react-floating-whatsapp';
import { REST_API_PARAMS } from '../utils/Constants';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';

function Contact() {
  const { t } = useTranslation(['common', 'contact']);  

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    projectType: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');
  const [submitMessage, setSubmitMessage] = useState('');

  useEffect(() => {
    trackPageView('contact_page');
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');
    setSubmitMessage('');

    try {
      // ✅ VRAIE API CALL vers votre backend Flask
      const response = await fetch(`${REST_API_PARAMS.baseUrl}/api/contact/send-message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitStatus('success');
        setSubmitMessage(result.message);
        
        // Réinitialiser le formulaire
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
          projectType: ''
        });

        // Track successful form submission
        if (typeof event !== 'undefined') {
          event('event', 'form_submit', {
            event_category: 'engagement',
            event_label: 'contact_form_success',
            value: 1
          });
        }

      } else {
        setSubmitStatus('error');
        setSubmitMessage(result.error || t('contact:form.errors.default'));
      }

    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
      setSubmitMessage(t('contact:form.errors.connection'));

      // Track form submission error
      if (typeof event !== 'undefined') {
        event('event', 'form_error', {
          event_category: 'error',
          event_label: 'contact_form_error',
          value: 0
        });
      }

    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <meta property="og:url" content="https://wendogo.com/contact" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={t('contact:meta.title')} />
        <meta property="og:description" content={t('contact:meta.description')} />
        <meta property="og:image" content={'https://wendogo.com' + SocialMediaLogo} />
        <title>{t('contact:meta.title')}</title>
        <meta name="description" content={t('contact:meta.description')} />
      </Head>

      <NavBar variant="simple" languageSelectorVariant="light" />

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('contact:header.title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('contact:header.description')}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Informations de contact */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                <Clock className="w-6 h-6 text-blue-600 mr-3" />
                {t('contact:availability.title')}
              </h2>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-green-800 font-semibold mb-2">
                  {t('contact:availability.supportTitle')}
                </p>
                <p className="text-green-700">
                  {t('contact:availability.supportDescription')}
                </p>
              </div>
            </div>

            {/* Méthodes de contact */}
            <div className="space-y-6">
              {/* Email */}
              <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Mail className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-gray-900">{t('contact:contactMethods.email.title')}</h3>
                    <p className="text-gray-600">{t('contact:contactMethods.email.responseTime')}</p>
                  </div>
                </div>
                <a 
                  href="mailto:hello@wendogo.com" 
                  className="text-blue-600 hover:text-blue-800 font-medium text-lg"
                >
                  {t('contact:contactMethods.email.address')}
                </a>
              </div>

              {/* WhatsApp */}
              <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="bg-green-100 p-3 rounded-full">
                    <MessageCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-gray-900">{t('contact:contactMethods.whatsapp.title')}</h3>
                    <p className="text-gray-600">{t('contact:contactMethods.whatsapp.responseTime')}</p>
                  </div>
                </div>
                <a 
                  href="https://wa.me/33668156073" 
                  className="text-green-600 hover:text-green-800 font-medium text-lg"
                >
                  {t('contact:contactMethods.whatsapp.number')}
                </a>
              </div>

              {/* Messenger */}
              <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-gray-900">{t('contact:contactMethods.messenger.title')}</h3>
                    <p className="text-gray-600">{t('contact:contactMethods.messenger.responseTime')}</p>
                  </div>
                </div>
                <a 
                  href="https://m.me/wendogo.officiel" 
                  className="text-blue-600 hover:text-blue-800 font-medium text-lg"
                >
                  {t('contact:contactMethods.messenger.linkText')}
                </a>
              </div>

              {/* Localisation */}
              <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="bg-purple-100 p-3 rounded-full">
                    <MapPin className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-gray-900">{t('contact:contactMethods.location.title')}</h3>
                    <p className="text-gray-600">{t('contact:contactMethods.location.info')}</p>
                  </div>
                </div>
                <p className="text-purple-600 font-medium">
                  {t('contact:contactMethods.location.address')}
                </p>
              </div>
            </div>
          </div>

          {/* Formulaire de contact */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
              <Send className="w-6 h-6 text-blue-600 mr-3" />
              {t('contact:form.title')}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Type de projet */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('contact:form.projectType.label')}
                </label>
                <select
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">{t('contact:form.projectType.placeholder')}</option>
                  <option value="orientation">{t('contact:form.projectType.options.orientation')}</option>
                  <option value="visa">{t('contact:form.projectType.options.visa')}</option>
                  <option value="campus-france">{t('contact:form.projectType.options.campusFrance')}</option>
                  <option value="parcoursup">{t('contact:form.projectType.options.parcoursup')}</option>
                  <option value="logement">{t('contact:form.projectType.options.housing')}</option>
                  <option value="general">{t('contact:form.projectType.options.general')}</option>
                  <option value="other">{t('contact:form.projectType.options.other')}</option>
                </select>
              </div>

              {/* Nom */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('contact:form.name.label')}
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  placeholder={t('contact:form.name.placeholder')}
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('contact:form.email.label')}
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  placeholder={t('contact:form.email.placeholder')}
                />
              </div>

              {/* Sujet */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('contact:form.subject.label')}
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  placeholder={t('contact:form.subject.placeholder')}
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('contact:form.message.label')}
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="6"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  placeholder={t('contact:form.message.placeholder')}
                />
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    {t('contact:form.submit.sending')}
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    {t('contact:form.submit.send')}
                  </>
                )}
              </button>

              {/* Status messages */}
              {submitStatus === 'success' && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                    <p className="text-green-800 font-medium">{submitMessage}</p>
                  </div>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
                    <p className="text-red-800 font-medium">{submitMessage}</p>
                  </div>
                  <p className="text-red-700 text-sm mt-2">
                    {t('contact:form.errors.persist')}
                    <a href="mailto:hello@wendogo.com" className="underline ml-1">hello@wendogo.com</a>
                  </p>
                </div>
              )}

              <p className="text-xs text-gray-500">
                {t('contact:form.privacy')}
                <Link href="/privacy" className="underline ml-1">{t('contact:form.privacyLink')}</Link>.
              </p>
            </form>
          </div>
        </div>

        {/* Section FAQ rapide */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8 text-center">
            {t('contact:faq.title')}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">
                {t('contact:faq.items.formation.title')}
              </h3>
              <p className="text-blue-800 text-sm">
                {t('contact:faq.items.formation.description')}
              </p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="font-semibold text-green-900 mb-2">
                {t('contact:faq.items.visa.title')}
              </h3>
              <p className="text-green-800 text-sm">
                {t('contact:faq.items.visa.description')}
              </p>
            </div>
            <div className="bg-purple-50 p-6 rounded-lg">
              <h3 className="font-semibold text-purple-900 mb-2">
                {t('contact:faq.items.timing.title')}
              </h3>
              <p className="text-purple-800 text-sm">
                {t('contact:faq.items.timing.description')}
              </p>
            </div>
          </div>
        </div>
      </main>

      <FloatingWhatsApp 
        phoneNumber="33668156073" 
        accountName={t('contact:whatsapp.accountName')} 
        avatar="/social_media_logo.webp"
        statusMessage={t('contact:whatsapp.statusMessage')}
        chatMessage={t('contact:whatsapp.chatMessage')}
        placeholder={t('contact:whatsapp.placeholder')}
        chatboxHeight={500}
      />

      <Footer />
    </div>
  );
}

export async function getStaticProps({ locale }) {
  const { serverSideTranslations } = await import('next-i18next/serverSideTranslations');
  
  return {
    props: {
      ...(await serverSideTranslations(locale, ['authModal', 'common', 'contact'])),
    },
  };
}
export default Contact;
