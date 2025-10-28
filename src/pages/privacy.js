import React from 'react';
import { Shield, Eye, Lock, Trash2, Mail, Globe, UserCheck, FileText } from 'lucide-react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { useTranslation } from 'next-i18next';

const PrivacyPolicy = () => {
  const { t } = useTranslation(['common', 'privacy']);
  const getTranslationArray = (t, key, defaultValue = []) => {
    const result = t(key, { returnObjects: true });
    return Array.isArray(result) ? result : defaultValue;
  };
  return (
    <>
      <NavBar variant="simple" languageSelectorVariant="light" />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          
          {/* Header */}
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {t('privacy:header.title')}
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('privacy:header.description')}
            </p>
            <div className="mt-4 text-sm text-gray-500">
              {t('privacy:header.lastUpdate')}
            </div>
          </div>

          {/* Table des matières */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" />
              {t('privacy:tableOfContents.title')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <a href="#collecte" className="text-blue-600 hover:text-blue-700 hover:underline">{t('privacy:tableOfContents.items.collecte')}</a>
              <a href="#utilisation" className="text-blue-600 hover:text-blue-700 hover:underline">{t('privacy:tableOfContents.items.utilisation')}</a>
              <a href="#partage" className="text-blue-600 hover:text-blue-700 hover:underline">{t('privacy:tableOfContents.items.partage')}</a>
              <a href="#protection" className="text-blue-600 hover:text-blue-700 hover:underline">{t('privacy:tableOfContents.items.protection')}</a>
              <a href="#droits" className="text-blue-600 hover:text-blue-700 hover:underline">{t('privacy:tableOfContents.items.droits')}</a>
              <a href="#cookies" className="text-blue-600 hover:text-blue-700 hover:underline">{t('privacy:tableOfContents.items.cookies')}</a>
              <a href="#contact" className="text-blue-600 hover:text-blue-700 hover:underline">{t('privacy:tableOfContents.items.contact')}</a>
              <a href="#modifications" className="text-blue-600 hover:text-blue-700 hover:underline">{t('privacy:tableOfContents.items.modifications')}</a>
            </div>
          </div>

          {/* Contenu principal */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 space-y-8">
            
            {/* 1. Données collectées */}
            <section id="collecte">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Eye className="w-6 h-6 text-blue-600" />
                {t('privacy:collecte.title')}
              </h2>
              
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-2">{t('privacy:collecte.inscription.title')}</h3>
                  <ul className="list-disc list-inside text-blue-800 space-y-1">
                    {getTranslationArray(t, 'privacy:collecte.inscription.items').map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-green-900 mb-2">{t('privacy:collecte.social.title')}</h3>
                  <p className="text-green-800 mb-2">
                    {t('privacy:collecte.social.description')}
                  </p>
                  <ul className="list-disc list-inside text-green-800 space-y-1">
                    {getTranslationArray(t, 'privacy:collecte.social.items').map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-orange-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-orange-900 mb-2">{t('privacy:collecte.usage.title')}</h3>
                  <ul className="list-disc list-inside text-orange-800 space-y-1">
                    {getTranslationArray(t, 'privacy:collecte.usage.items').map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* 2. Utilisation des données */}
            <section id="utilisation">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <UserCheck className="w-6 h-6 text-green-600" />
                {t('privacy:utilisation.title')}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">{t('privacy:utilisation.principal.title')}</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    {getTranslationArray(t, 'privacy:utilisation.principal.items').map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">{t('privacy:utilisation.amelioration.title')}</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    {getTranslationArray(t, 'privacy:utilisation.amelioration.items').map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* 3. Partage des données */}
            <section id="partage">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Globe className="w-6 h-6 text-orange-600" />
                {t('privacy:partage.title')}
              </h2>
              
              <div className="bg-red-50 border border-red-200 p-4 rounded-lg mb-4">
                <p className="text-red-800 font-medium">
                  {t('privacy:partage.noSale')}
                </p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{t('privacy:partage.partners.title')}</h4>
                    <p className="text-gray-700">{t('privacy:partage.partners.description')}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{t('privacy:partage.providers.title')}</h4>
                    <p className="text-gray-700">{t('privacy:partage.providers.description')}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{t('privacy:partage.legal.title')}</h4>
                    <p className="text-gray-700">{t('privacy:partage.legal.description')}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* 4. Protection des données */}
            <section id="protection">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Lock className="w-6 h-6 text-purple-600" />
                {t('privacy:protection.title')}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-purple-50 p-4 rounded-lg text-center">
                  <Shield className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <h4 className="font-semibold text-purple-900">{t('privacy:protection.encryption.title')}</h4>
                  <p className="text-purple-800 text-sm">{t('privacy:protection.encryption.description')}</p>
                </div>
                
                <div className="bg-purple-50 p-4 rounded-lg text-center">
                  <Lock className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <h4 className="font-semibold text-purple-900">{t('privacy:protection.access.title')}</h4>
                  <p className="text-purple-800 text-sm">{t('privacy:protection.access.description')}</p>
                </div>
                
                <div className="bg-purple-50 p-4 rounded-lg text-center">
                  <FileText className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <h4 className="font-semibold text-purple-900">{t('privacy:protection.backups.title')}</h4>
                  <p className="text-purple-800 text-sm">{t('privacy:protection.backups.description')}</p>
                </div>
              </div>
            </section>

            {/* 5. Vos droits */}
            <section id="droits">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <UserCheck className="w-6 h-6 text-green-600" />
                {t('privacy:droits.title')}
              </h2>
              
              <div className="bg-green-50 p-6 rounded-lg">
                <p className="text-green-800 mb-4 font-medium">
                  {t('privacy:droits.intro')}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Eye className="w-4 h-4 text-green-600" />
                      <span className="font-medium text-green-900">{t('privacy:droits.rights.access')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-green-600" />
                      <span className="font-medium text-green-900">{t('privacy:droits.rights.rectification')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Trash2 className="w-4 h-4 text-green-600" />
                      <span className="font-medium text-green-900">{t('privacy:droits.rights.erasure')}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Lock className="w-4 h-4 text-green-600" />
                      <span className="font-medium text-green-900">{t('privacy:droits.rights.limitation')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-green-600" />
                      <span className="font-medium text-green-900">{t('privacy:droits.rights.portability')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-green-600" />
                      <span className="font-medium text-green-900">{t('privacy:droits.rights.opposition')}</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 p-3 bg-white rounded border">
                  <p className="text-green-800 text-sm">
                    <strong>{t('privacy:droits.exercise')}</strong> {t('privacy:droits.exerciseText')}
                    <a href={`mailto:${t('privacy:droits.email')}`} className="text-blue-600 hover:underline"> {t('privacy:droits.email')}</a>
                  </p>
                </div>
              </div>
            </section>

            {/* 6. Cookies */}
            <section id="cookies">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('privacy:cookies.title')}</h2>
              
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">{t('privacy:cookies.essential.title')}</h4>
                  <p className="text-blue-800">{t('privacy:cookies.essential.description')}</p>
                </div>
                
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-yellow-900 mb-2">{t('privacy:cookies.analytics.title')}</h4>
                  <p className="text-yellow-800">{t('privacy:cookies.analytics.description')}</p>
                </div>
              </div>
            </section>

            {/* 7. Contact */}
            <section id="contact">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Mail className="w-6 h-6 text-blue-600" />
                {t('privacy:contact.title')}
              </h2>
              
              <div className="bg-blue-50 p-6 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-3">{t('privacy:contact.dpo')}</h4>
                <div className="space-y-2 text-blue-800">
                  <p><strong>{t('privacy:contact.email')}</strong> {t('privacy:contact.emailValue')}</p>
                  <p><strong>{t('privacy:contact.address')}</strong> {t('privacy:contact.addressValue')}</p>
                  <p><strong>{t('privacy:contact.phone')}</strong> {t('privacy:contact.phoneValue')}</p>
                </div>
                
                <div className="mt-4 p-3 bg-white rounded border">
                  <p className="text-blue-800 text-sm">
                    <strong>{t('privacy:contact.responseTime')}</strong> {t('privacy:contact.responseTimeText')}
                  </p>
                </div>
              </div>
            </section>

            {/* 8. Modifications */}
            <section id="modifications">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('privacy:modifications.title')}</h2>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700 mb-3">
                  {t('privacy:modifications.description')}
                </p>
                <p className="text-gray-700">
                  <strong>{t('privacy:modifications.notification')}</strong> {t('privacy:modifications.notificationText')}
                </p>
              </div>
            </section>

            {/* Footer de la politique */}
            <div className="border-t pt-6 mt-8">
              <div className="text-center text-gray-500 text-sm">
                <p>{t('privacy:footer.effective')}</p>
                <p className="mt-2">{t('privacy:footer.copyright')}</p>
              </div>
            </div>
            
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export async function getStaticProps({ locale }) {
  const { serverSideTranslations } = await import('next-i18next/serverSideTranslations');
  
  return {
    props: {
      ...(await serverSideTranslations(locale, ['authModal', 'common', 'privacy'])),
    },
  };
}

export default PrivacyPolicy;
