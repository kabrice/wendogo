// src/pages/mission.js - Version redesignée
'use client';

import { useEffect, useState } from 'react';
import { trackPageView } from '../lib/gtag';
import Head from 'next/head';
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';
import { GraduationCap, Heart, Users, Target, Award, Shield, Globe, CheckCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import HappyGirl from '../assets/optimized/happyGirl.webp';
import Mentorship from '../assets/optimized/mentorship.webp';
import SocialMediaLogo from '../assets/optimized/wendogo_jeu_concours.webp';
import { useTranslation } from 'next-i18next';
function WendogoMission() {
  const [activeTab, setActiveTab] = useState('mission');
  const { t } = useTranslation(['common', 'mission']);
  useEffect(() => {
    trackPageView('mission_page');
  }, []);

  const stats = [
    { number: t('mission:stats.formations.number'), label: t('mission:stats.formations.label'), icon: GraduationCap },
    { number: t('mission:stats.schools.number'), label: t('mission:stats.schools.label'), icon: Users },
    { number: t('mission:stats.satisfaction.number'), label: t('mission:stats.satisfaction.label'), icon: Heart },
    { number: t('mission:stats.support.number'), label: t('mission:stats.support.label'), icon: Shield }
  ];

  const values = [
    {
      icon: Heart,
      title: t('mission:values.items.benevolence.title'),
      description: t('mission:values.items.benevolence.description'),
      color: 'red'
    },
    {
      icon: Target,
      title: t('mission:values.items.excellence.title'),
      description: t('mission:values.items.excellence.description'),
      color: 'blue'
    },
    {
      icon: Shield,
      title: t('mission:values.items.transparency.title'),
      description: t('mission:values.items.transparency.description'),
      color: 'green'
    },
    {
      icon: Globe,
      title: t('mission:values.items.accessibility.title'),
      description: t('mission:values.items.accessibility.description'),
      color: 'purple'
    }
  ];

  const services = [
    {
      title: t('mission:services.items.orientation.title'),
      description: t('mission:services.items.orientation.description'),
      features: t('mission:services.items.orientation.features', { returnObjects: true }),
      icon: Target
    },
    {
      title: t('mission:services.items.visa.title'),
      description: t('mission:services.items.visa.description'),
      features: t('mission:services.items.visa.features', { returnObjects: true }),
      icon: Shield
    },
    {
      title: t('mission:services.items.support.title'),
      description: t('mission:services.items.support.description'),
      features: t('mission:services.items.support.features', { returnObjects: true }),
      icon: Heart
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <meta property="og:url" content="https://wendogo.com/mission" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={t('mission:meta.title')} />
        <meta property="og:description" content={t('mission:meta.description')} />
        <meta property="og:image" content={'https://wendogo.com' + SocialMediaLogo} />
        <title>{t('mission:meta.title')}</title>
        <meta name="description" content={t('mission:meta.description')} />
      </Head>

      <NavBar variant="simple" languageSelectorVariant="light" />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold mb-6">
                {t('mission:hero.title')}
              </h1>
              <p className="text-xl mb-8 text-blue-100">
                {t('mission:hero.description')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/?tab=accompany#accompany-section" className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-center">
                  {t('mission:hero.cta')}
                </Link>
                {/* <Link href="/contact" className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors text-center">
                  Nous contacter
                </Link> */}
              </div>
            </div>
            <div className="relative">
              <div className="relative z-10">
                <Image
                  src={HappyGirl}
                  alt={t('mission:hero.imageAlt')}
                  className="rounded-2xl shadow-2xl"
                  width={500}
                  height={400}
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl blur-xl opacity-20 transform rotate-6"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="bg-gray-100 py-4">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex space-x-8 border-b border-gray-200">
            {[
              { id: 'mission', label: t('mission:tabs.mission') },
              { id: 'values', label: t('mission:tabs.values') },
              { id: 'services', label: t('mission:tabs.services') }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-3 px-4 font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {/* Mission Tab */}
          {activeTab === 'mission' && (
            <div>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  {t('mission:myMission.title')}
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  {t('mission:myMission.subtitle')}
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                    {t('mission:myMission.whyTitle')}
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                      <p className="text-gray-700">
                        <strong>{t('mission:myMission.reasons.simplify.bold')}</strong> {t('mission:myMission.reasons.simplify.text')}
                      </p>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                      <p className="text-gray-700">
                        <strong>{t('mission:myMission.reasons.democratize.bold')}</strong> {t('mission:myMission.reasons.democratize.text')}
                      </p>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                      <p className="text-gray-700">
                        <strong>{t('mission:myMission.reasons.accompany.bold')}</strong> {t('mission:myMission.reasons.accompany.text')}
                      </p>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                      <p className="text-gray-700">
                        <strong>{t('mission:myMission.reasons.maximize.bold')}</strong> {t('mission:myMission.reasons.maximize.text')}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <Image
                    src={Mentorship}
                    alt={t('mission:myMission.imageAlt')}
                    className="rounded-2xl shadow-lg"
                    width={500}
                    height={400}
                  />
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4 text-center">
                  {t('mission:myMission.commitment.title')}
                </h3>
                <p className="text-lg text-gray-700 text-center max-w-4xl mx-auto">
                  {t('mission:myMission.commitment.description')}
                </p>
              </div>
            </div>
          )}

          {/* Values Tab */}
          {activeTab === 'values' && (
            <div>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  {t('mission:values.title')}
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  {t('mission:values.subtitle')}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {values.map((value, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-shadow">
                    <div className={`bg-${value.color}-100 w-16 h-16 rounded-full flex items-center justify-center mb-6`}>
                      <value.icon className={`w-8 h-8 text-${value.color}-600`} />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      {value.title}
                    </h3>
                    <p className="text-gray-700">
                      {value.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Services Tab */}
          {activeTab === 'services' && (
            <div>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  {t('mission:services.title')}
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  {t('mission:services.subtitle')}
                </p>
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
                {services.map((service, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-shadow">
                    <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                      <service.icon className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      {service.title}
                    </h3>
                    <p className="text-gray-700 mb-6">
                      {service.description}
                    </p>
                    <ul className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-gray-600">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">
            {t('mission:cta.title')}
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            {t('mission:cta.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/?tab=accompany#accompany-section" className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              {t('mission:cta.button')}
            </Link>
            {/* <Link href="/contact" className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              Parler à un conseiller
            </Link> */}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export async function getStaticProps({ locale }) {
  const { serverSideTranslations } = await import('next-i18next/serverSideTranslations');
  
  return {
    props: {
      ...(await serverSideTranslations(locale, ['authModal', 'common', 'mission'])),
    },
  };
}
export default WendogoMission;
