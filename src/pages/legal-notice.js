// src/pages/legal-notice.js - Version redesignée
'use client';

import { useEffect, useState } from 'react';
import { trackPageView } from '../lib/gtag';
import Head from 'next/head';
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';
import { 
  Scale, 
  Building2, 
  Shield, 
  Eye, 
  Users, 
  Lock, 
  Mail, 
  MapPin,
  Phone,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  FileText,
  AlertTriangle,
  Info
} from 'lucide-react';
import SocialMediaLogo from '../assets/optimized/social_media_logo.webp';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';

function LegalNotice() {
  const { t } = useTranslation(['common', 'legalNotice']);
  const [expandedSection, setExpandedSection] = useState(null);
  const getTranslationArray = (t, key, defaultValue = []) => {
    const result = t(key, { returnObjects: true });
    return Array.isArray(result) ? result : defaultValue;
  };
  useEffect(() => {
    trackPageView('legal_notice_page');
  }, []);

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const legalSections = [
    {
      id: 'definitions',
      title: t('legalNotice:sections.definitions.title'),
      icon: FileText,
      content: (
        <div className="space-y-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 mb-2">{t('legalNotice:sections.definitions.user.title')}</h4>
            <p className="text-blue-800 text-sm">
              {t('legalNotice:sections.definitions.user.description')}
            </p>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <h4 className="font-semibold text-green-900 mb-2">{t('legalNotice:sections.definitions.services.title')}</h4>
            <p className="text-green-800 text-sm">
              {t('legalNotice:sections.definitions.services.description')}
            </p>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <h4 className="font-semibold text-purple-900 mb-2">{t('legalNotice:sections.definitions.personalData.title')}</h4>
            <p className="text-purple-800 text-sm">
              {t('legalNotice:sections.definitions.personalData.description')}
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'company-info',
      title: t('legalNotice:sections.companyInfo.title'),
      icon: Building2,
      content: (
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                <Building2 className="w-4 h-4 mr-2 text-blue-600" />
                {t('legalNotice:sections.companyInfo.publisher.title')}
              </h4>
              <div className="space-y-2 text-sm text-gray-700">
                <p><strong>{t('legalNotice:sections.companyInfo.publisher.legalName')}</strong> {t('legalNotice:sections.companyInfo.publisher.legalNameValue')}</p>
                <p><strong>{t('legalNotice:sections.companyInfo.publisher.capital')}</strong> {t('legalNotice:sections.companyInfo.publisher.capitalValue')}</p>
                <p><strong>{t('legalNotice:sections.companyInfo.publisher.rcs')}</strong> {t('legalNotice:sections.companyInfo.publisher.rcsValue')}</p>
                <p><strong>{t('legalNotice:sections.companyInfo.publisher.siret')}</strong> {t('legalNotice:sections.companyInfo.publisher.siretValue')}</p>
                <p><strong>{t('legalNotice:sections.companyInfo.publisher.vat')}</strong> {t('legalNotice:sections.companyInfo.publisher.vatValue')}</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                <MapPin className="w-4 h-4 mr-2 text-green-600" />
                {t('legalNotice:sections.companyInfo.address.title')}
              </h4>
              <address className="text-sm text-gray-700 not-italic">
                {t('legalNotice:sections.companyInfo.address.line1')}<br />
                {t('legalNotice:sections.companyInfo.address.line2')}<br />
                {t('legalNotice:sections.companyInfo.address.line3')}<br />
                {t('legalNotice:sections.companyInfo.address.line4')}
              </address>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <Users className="w-4 h-4 mr-2 text-purple-600" />
                  {t('legalNotice:sections.companyInfo.management.title')}
                </h4>
                <div className="text-sm text-gray-700">
                  <p><strong>{t('legalNotice:sections.companyInfo.management.publicationDirector')}</strong> {t('legalNotice:sections.companyInfo.management.publicationDirectorValue')}</p>
                  <p><strong>{t('legalNotice:sections.companyInfo.management.editorialManager')}</strong> {t('legalNotice:sections.companyInfo.management.editorialManagerValue')}</p>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <Mail className="w-4 h-4 mr-2 text-orange-600" />
                  {t('legalNotice:sections.companyInfo.contact.title')}
                </h4>
                <div className="text-sm text-gray-700">
                  <p><strong>{t('legalNotice:sections.companyInfo.contact.email')}</strong> {t('legalNotice:sections.companyInfo.contact.emailValue')}</p>
                  <p><strong>{t('legalNotice:sections.companyInfo.contact.whatsapp')}</strong> {t('legalNotice:sections.companyInfo.contact.whatsappValue')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'hosting',
      title: t('legalNotice:sections.hosting.title'),
      icon: Shield,
      content: (
        <div className="bg-gray-50 rounded-lg p-6">
          <h4 className="font-semibold text-gray-900 mb-4">{t('legalNotice:sections.hosting.subtitle')}</h4>
          <div className="space-y-3 text-sm text-gray-700">
            <p><strong>{t('legalNotice:sections.hosting.company')}</strong> {t('legalNotice:sections.hosting.companyValue')}</p>
            <p><strong>{t('legalNotice:sections.hosting.address')}</strong> {t('legalNotice:sections.hosting.addressValue')}</p>
            <p><strong>{t('legalNotice:sections.hosting.phone')}</strong> {t('legalNotice:sections.hosting.phoneValue')}</p>
            <p><strong>{t('legalNotice:sections.hosting.website')}</strong> <a href="https://www.ovh.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{t('legalNotice:sections.hosting.websiteValue')}</a></p>
          </div>
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded">
            <p className="text-green-800 text-sm">
              <strong>{t('legalNotice:sections.hosting.gdpr')}</strong> {t('legalNotice:sections.hosting.gdprText')}
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'services-description',
      title: t('legalNotice:sections.servicesDescription.title'),
      icon: Users,
      content: (
        <div className="space-y-6">
          <div className="bg-blue-50 rounded-lg p-6">
            <h4 className="font-semibold text-blue-900 mb-4">{t('legalNotice:sections.servicesDescription.mission.title')}</h4>
            <p className="text-blue-800 mb-4">
              {t('legalNotice:sections.servicesDescription.mission.description')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h5 className="font-semibold text-gray-900 mb-2">{t('legalNotice:sections.servicesDescription.orientation.title')}</h5>
              <ul className="text-sm text-gray-700 space-y-1">
                {getTranslationArray(t, 'legalNotice:sections.servicesDescription.orientation.items').map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h5 className="font-semibold text-gray-900 mb-2">{t('legalNotice:sections.servicesDescription.visa.title')}</h5>
              <ul className="text-sm text-gray-700 space-y-1">
                {getTranslationArray(t, 'legalNotice:sections.servicesDescription.visa.items').map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div className="flex items-center">
              <AlertTriangle className="w-5 h-5 text-amber-600 mr-2" />
              <p className="text-amber-800 font-medium">{t('legalNotice:sections.servicesDescription.liability.title')}</p>
            </div>
            <p className="text-amber-700 text-sm mt-2">
              {t('legalNotice:sections.servicesDescription.liability.description')}
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'intellectual-property',
      title: t('legalNotice:sections.intellectualProperty.title'),
      icon: Lock,
      content: (
        <div className="space-y-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h4 className="font-semibold text-red-900 mb-2">{t('legalNotice:sections.intellectualProperty.copyright.title')}</h4>
            <p className="text-red-800 text-sm">
              {t('legalNotice:sections.intellectualProperty.copyright.description')}
            </p>
          </div>
          
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <h4 className="font-semibold text-orange-900 mb-2">{t('legalNotice:sections.intellectualProperty.prohibited.title')}</h4>
            <p className="text-orange-800 text-sm">
              {t('legalNotice:sections.intellectualProperty.prohibited.description')}
            </p>
          </div>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="font-semibold text-green-900 mb-2">{t('legalNotice:sections.intellectualProperty.authorized.title')}</h4>
            <p className="text-green-800 text-sm">
              {t('legalNotice:sections.intellectualProperty.authorized.description')}
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'personal-data',
      title: t('legalNotice:sections.personalData.title'),
      icon: Eye,
      content: (
        <div className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h4 className="font-semibold text-blue-900 mb-4 flex items-center">
              <Shield className="w-5 h-5 mr-2" />
              {t('legalNotice:sections.personalData.controller.title')}
            </h4>
            <div className="text-blue-800 text-sm space-y-2">
              <p><strong>{t('legalNotice:sections.personalData.controller.company')}</strong> {t('legalNotice:sections.personalData.controller.companyValue')}</p>
              <p><strong>{t('legalNotice:sections.personalData.controller.responsible')}</strong> {t('legalNotice:sections.personalData.controller.responsibleValue')}</p>
              <p><strong>{t('legalNotice:sections.personalData.controller.dpo')}</strong> {t('legalNotice:sections.personalData.controller.dpoValue')}</p>
              <p><strong>{t('legalNotice:sections.personalData.controller.address')}</strong> {t('legalNotice:sections.personalData.controller.addressValue')}</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h5 className="font-semibold text-gray-900 mb-3">{t('legalNotice:sections.personalData.purposes.title')}</h5>
              <ul className="text-sm text-gray-700 space-y-1">
                {getTranslationArray(t, 'legalNotice:sections.personalData.purposes.items').map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h5 className="font-semibold text-gray-900 mb-3">{t('legalNotice:sections.personalData.rights.title')}</h5>
              <ul className="text-sm text-gray-700 space-y-1">
                {getTranslationArray(t, 'legalNotice:sections.personalData.rights.items').map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="font-semibold text-green-900 mb-2">{t('legalNotice:sections.personalData.exercise.title')}</h4>
            <p className="text-green-800 text-sm mb-2">
              {t('legalNotice:sections.personalData.exercise.description')}
            </p>
            <div className="space-y-1 text-green-700 text-sm">
              <p>{t('legalNotice:sections.personalData.exercise.email')}</p>
              <p>{t('legalNotice:sections.personalData.exercise.mail')}</p>
            </div>
          </div>
          
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <h4 className="font-semibold text-purple-900 mb-2">{t('legalNotice:sections.personalData.security.title')}</h4>
            <p className="text-purple-800 text-sm">
              {t('legalNotice:sections.personalData.security.description')}
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'cookies',
      title: t('legalNotice:sections.cookies.title'),
      icon: Eye,
      content: (
        <div className="space-y-4">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-semibold text-yellow-900 mb-2">{t('legalNotice:sections.cookies.definition.title')}</h4>
            <p className="text-yellow-800 text-sm">
              {t('legalNotice:sections.cookies.definition.description')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h5 className="font-semibold text-gray-900 mb-2">{t('legalNotice:sections.cookies.types.technical.title')}</h5>
              <p className="text-sm text-gray-700">
                {t('legalNotice:sections.cookies.types.technical.description')}
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h5 className="font-semibold text-gray-900 mb-2">{t('legalNotice:sections.cookies.types.analytics.title')}</h5>
              <p className="text-sm text-gray-700">
                {t('legalNotice:sections.cookies.types.analytics.description')}
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h5 className="font-semibold text-gray-900 mb-2">{t('legalNotice:sections.cookies.types.marketing.title')}</h5>
              <p className="text-sm text-gray-700">
                {t('legalNotice:sections.cookies.types.marketing.description')}
              </p>
            </div>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 mb-2">{t('legalNotice:sections.cookies.manage.title')}</h4>
            <p className="text-blue-800 text-sm mb-2">
              {t('legalNotice:sections.cookies.manage.description')}
            </p>
            <ul className="text-blue-700 text-sm space-y-1">
              {getTranslationArray(t, 'legalNotice:sections.cookies.manage.items').map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'applicable-law',
      title: t('legalNotice:sections.applicableLaw.title'),
      icon: Scale,
      content: (
        <div className="space-y-4">
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <Scale className="w-4 h-4 mr-2 text-blue-600" />
                  {t('legalNotice:sections.applicableLaw.law.title')}
                </h4>
                <p className="text-sm text-gray-700">
                  {t('legalNotice:sections.applicableLaw.law.description')}
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <Building2 className="w-4 h-4 mr-2 text-green-600" />
                  {t('legalNotice:sections.applicableLaw.jurisdiction.title')}
                </h4>
                <p className="text-sm text-gray-700">
                  {t('legalNotice:sections.applicableLaw.jurisdiction.description')}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 mb-2">{t('legalNotice:sections.applicableLaw.amicable.title')}</h4>
            <p className="text-blue-800 text-sm">
              {t('legalNotice:sections.applicableLaw.amicable.description')}
            </p>
          </div>
          
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <h4 className="font-semibold text-purple-900 mb-2">{t('legalNotice:sections.applicableLaw.modifications.title')}</h4>
            <p className="text-purple-800 text-sm">
              {t('legalNotice:sections.applicableLaw.modifications.description')}
            </p>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>{t('legalNotice:meta.title')}</title>
        <meta name="description" content={t('legalNotice:meta.description')} />
        <meta name="keywords" content={t('legalNotice:meta.keywords')} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        
        <meta property="og:title" content={t('legalNotice:meta.title')} />
        <meta property="og:description" content={t('legalNotice:meta.description')} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://wendogo.com/legal-notice" />
        <meta property="og:image" content={'https://wendogo.com' + SocialMediaLogo} />
        
        <link rel="canonical" href="https://wendogo.com/legal-notice" />
      </Head>

      <NavBar variant="simple" languageSelectorVariant="light" />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="bg-blue-100 p-4 rounded-full">
              <Scale className="w-12 h-12 text-blue-600" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {t('legalNotice:header.title')}
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {t('legalNotice:header.description')}
          </p>
          <div className="mt-4 text-sm text-gray-500">
            {t('legalNotice:header.lastUpdate')}
          </div>
        </div>

        {/* Informations importantes */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
          <div className="flex items-center mb-4">
            <Info className="w-6 h-6 text-blue-600 mr-3" />
            <h2 className="text-xl font-semibold text-blue-900">
              {t('legalNotice:essentialInfo.title')}
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="bg-white rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">{t('legalNotice:essentialInfo.company.label')}</h3>
              <p className="text-gray-700">{t('legalNotice:essentialInfo.company.name')}</p>
              <p className="text-gray-600">{t('legalNotice:essentialInfo.company.capital')}</p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">{t('legalNotice:essentialInfo.contact.label')}</h3>
              <p className="text-gray-700">{t('legalNotice:essentialInfo.contact.email')}</p>
              <p className="text-gray-600">{t('legalNotice:essentialInfo.contact.phone')}</p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">{t('legalNotice:essentialInfo.hosting.label')}</h3>
              <p className="text-gray-700">{t('legalNotice:essentialInfo.hosting.name')}</p>
              <p className="text-gray-600">{t('legalNotice:essentialInfo.hosting.location')}</p>
            </div>
          </div>
        </div>

        {/* Sections légales */}
        <div className="space-y-4">
          {legalSections.map((section, index) => (
            <div key={section.id} className="bg-white rounded-xl shadow-sm border border-gray-200">
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors rounded-xl"
              >
                <div className="flex items-center">
                  <div className="bg-blue-100 p-2 rounded-lg mr-4">
                    <section.icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {section.title}
                    </h3>
                  </div>
                </div>
                {expandedSection === section.id ? 
                  <ChevronUp className="w-5 h-5 text-gray-500" /> : 
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                }
              </button>
              
              {expandedSection === section.id && (
                <div className="px-6 pb-6 border-t border-gray-100">
                  <div className="pt-6">
                    {section.content}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact section */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">
            {t('legalNotice:contactSection.title')}
          </h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            {t('legalNotice:contactSection.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:hello@wendogo.com"
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
            >
              <Mail className="w-4 h-4 mr-2" />
              {t('legalNotice:contactSection.writeUs')}
            </a>
            <a
              href="https://wa.me/33668156073"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors inline-flex items-center justify-center"
            >
              <Phone className="w-4 h-4 mr-2" />
              {t('legalNotice:contactSection.whatsapp')}
            </a>
          </div>
        </div>

        {/* Liens utiles */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 text-sm mb-4">{t('legalNotice:relatedDocuments.title')}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/cgu"
              className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
            >
              <FileText className="w-4 h-4 mr-1" />
              {t('legalNotice:relatedDocuments.terms')}
            </Link> 
            <Link
              href="/privacy"
              className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
            >
              <Shield className="w-4 h-4 mr-1" />
              {t('legalNotice:relatedDocuments.privacy')}
            </Link>
            <Link
              href="/contact"
              className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
            >
              <Mail className="w-4 h-4 mr-1" />
              {t('legalNotice:relatedDocuments.contact')}
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export async function getStaticProps({ locale }) {
  const { serverSideTranslations } = await import('next-i18next/serverSideTranslations');
  
  return {
    props: {
      ...(await serverSideTranslations(locale, ['authModal', 'common', 'legalNotice'])),
    },
  };
}

export default LegalNotice;
