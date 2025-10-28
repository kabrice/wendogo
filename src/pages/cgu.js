// src/pages/cgu.js - Version redesignée
'use client';

import { useEffect } from 'react';
import { trackPageView } from '../lib/gtag';
import SocialMediaLogo from '../assets/optimized/social_media_logo.webp';
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';

function CGU() {

  const router = useRouter();
  const { t } = useTranslation(['common', 'cgu']);  
  const getTranslationArray = (t, key, defaultValue = []) => {
    const result = t(key, { returnObjects: true });
    return Array.isArray(result) ? result : defaultValue;
  };
  useEffect(() => {
    trackPageView('cgu_page');
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <meta property="og:url" content="https://wendogo.com/cgu" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={t('cgu:meta.title')} />
        <meta property="og:description" content={t('cgu:meta.description')} />
        <meta property="og:image" content={'https://wendogo.com' + SocialMediaLogo} />
        <title>{t('cgu:meta.title')}</title>
        <meta name="description" content={t('cgu:meta.description')} />
      </Head>

      <NavBar variant="simple" languageSelectorVariant="light" />

      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('cgu:header.title')}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('cgu:header.description')}
          </p>
          <div className="mt-4 text-sm text-gray-500">
            {t('cgu:header.version')}
          </div>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          {/* Préambule */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 border-b border-gray-200 pb-2">
              {t('cgu:preamble.title')}
            </h2>
            <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mb-6">
              <p className="text-gray-700 leading-relaxed">
                {t('cgu:preamble.content')}
              </p>
            </div>
            <div className="bg-amber-50 border-l-4 border-amber-400 p-6">
              <p className="font-semibold text-amber-800 mb-2">{t('cgu:preamble.warning.label')}</p>
              <p className="text-amber-700">
                {t('cgu:preamble.warning.text')}
              </p>
            </div>
          </section>

          {/* Glossaire */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 border-b border-gray-200 pb-2">
              {t('cgu:definitions.title')}
            </h2>
            <div className="grid gap-4">
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">{t('cgu:definitions.platform.title')}</h3>
                <p className="text-gray-700">{t('cgu:definitions.platform.description')}</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">{t('cgu:definitions.user.title')}</h3>
                <p className="text-gray-700">{t('cgu:definitions.user.description')}</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">{t('cgu:definitions.services.title')}</h3>
                <p className="text-gray-700">{t('cgu:definitions.services.description')}</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">{t('cgu:definitions.operator.title')}</h3>
                <p className="text-gray-700">{t('cgu:definitions.operator.description')}</p>
              </div>
            </div>
          </section>

          {/* Objet */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 border-b border-gray-200 pb-2">
              {t('cgu:purpose.title')}
            </h2>
            <p className="text-gray-700 mb-6">
              {t('cgu:purpose.description')}
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-3">{t('cgu:purpose.academic.title')}</h3>
                <ul className="text-blue-800 space-y-2 text-sm">
                  {getTranslationArray(t, 'cgu:purpose.academic.items').map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-lg">
                <h3 className="font-semibold text-green-900 mb-3">{t('cgu:purpose.visa.title')}</h3>
                <ul className="text-green-800 space-y-2 text-sm">
                  {getTranslationArray(t, 'cgu:purpose.visa.items').map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Obligations utilisateur */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 border-b border-gray-200 pb-2">
              {t('cgu:obligations.title')}
            </h2>
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-4">{t('cgu:obligations.subtitle')}</h3>
              <ul className="space-y-3 text-gray-700">
                {getTranslationArray(t, 'cgu:obligations.items').map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Tarification */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 border-b border-gray-200 pb-2">
              {t('cgu:pricing.title')}
            </h2>
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-4">{t('cgu:pricing.subtitle')}</h3>
              <p className="text-blue-800 mb-4">
                {t('cgu:pricing.description')}
              </p>
              <div className="grid md:grid-cols-3 gap-4 mt-6">
                <div className="bg-white p-4 rounded border">
                  <h4 className="font-semibold text-gray-900 mb-2">{t('cgu:pricing.packs.orientation.title')}</h4>
                  <p className="text-sm text-gray-600">{t('cgu:pricing.packs.orientation.price')}</p>
                </div>
                <div className="bg-white p-4 rounded border">
                  <h4 className="font-semibold text-gray-900 mb-2">{t('cgu:pricing.packs.visa.title')}</h4>
                  <p className="text-sm text-gray-600">{t('cgu:pricing.packs.visa.price')}</p>
                </div>
                <div className="bg-white p-4 rounded border">
                  <h4 className="font-semibold text-gray-900 mb-2">{t('cgu:pricing.packs.complete.title')}</h4>
                  <p className="text-sm text-gray-600">{t('cgu:pricing.packs.complete.price')}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Données personnelles */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 border-b border-gray-200 pb-2">
              {t('cgu:dataProtection.title')}
            </h2>
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <p className="text-green-800 mb-4">
                {t('cgu:dataProtection.description')}
              </p>
              <ul className="text-green-700 space-y-2">
                  {getTranslationArray(t, 'cgu:dataProtection.purposes').map((purpose, index) => (
                  <li key={index}>{purpose}</li>
                ))}
              </ul>
              <p className="mt-4 text-green-800">
                {t('cgu:dataProtection.moreInfo')}
                <Link href="/privacy" className="underline font-semibold">{t('cgu:dataProtection.privacyLink')}</Link>
              </p>
            </div>
          </section>

          {/* Contact */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 border-b border-gray-200 pb-2">
              {t('cgu:contact.title')}
            </h2>
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-4">{t('cgu:contact.subtitle')}</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">{t('cgu:contact.email.label')}</h4>
                  <p className="text-gray-600">{t('cgu:contact.email.value')}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">{t('cgu:contact.address.label')}</h4>
                  <p className="text-gray-600">
                    {getTranslationArray(t, 'cgu:contact.address.lines').map((line, index) => (
                      <span key={index}>
                        {line}
                        {index < getTranslationArray(t, 'cgu:contact.address.lines').length - 1 && <br />}
                      </span>
                    ))}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Informations légales */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 border-b border-gray-200 pb-2">
              {t('cgu:legal.title')}
            </h2>
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">{t('cgu:legal.publisher.title')}</h3>
                  <p className="text-gray-700">
                    {getTranslationArray(t, 'cgu:legal.publisher.lines').map((line, index) => (
                      <span key={index}>
                        {line}
                        {index < getTranslationArray(t, 'cgu:legal.publisher.lines').length - 1 && <br />}
                      </span>
                    ))}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">{t('cgu:legal.director.title')}</h3>
                  <p className="text-gray-700">
                    {getTranslationArray(t, 'cgu:legal.director.lines').map((line, index) => (
                      <span key={index}>
                        {line}
                        {index < getTranslationArray(t, 'cgu:legal.director.lines').length - 1 && <br />}
                      </span>
                    ))}
                  </p>
                </div>
              </div>
            </div>
          </section>
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
      ...(await serverSideTranslations(locale, ['authModal', 'common', 'cgu'])),
    },
  };
}
export default CGU;
