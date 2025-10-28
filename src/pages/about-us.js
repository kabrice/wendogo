// src/pages/about-us.js - Version internationalisée
'use client';

import { useEffect, useState } from 'react';
import { trackPageView } from '../lib/gtag';
import Head from 'next/head';
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';
import { Users, Award, Heart, Target, LinkedinIcon, Mail, Globe } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import ExpertMan from '../assets/optimized/superhero.webp';
import WendogoTeam from '../assets/optimized/wendogo_team.webp';
import EdgarHead from '../assets/optimized/edgar_head.webp';
import SocialMediaLogo from '../assets/optimized/wendogo_jeu_concours.webp';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

function AboutUs() {
  const [activeSection, setActiveSection] = useState('team');
  const router = useRouter();
  const { t } = useTranslation(['common', 'aboutUs']);

  useEffect(() => {
    trackPageView('about_us_page');
  }, []);

  const teamMembers = [
    {
      name: t('aboutUs:team.members.edgar.name'),
      role: t('aboutUs:team.members.edgar.role'),
      description: t('aboutUs:team.members.edgar.description'),
      image: EdgarHead,
      linkedin: '#',
      email: 'edgar@wendogo.com'
    },
    {
      name: t('aboutUs:team.members.advisors.name'),
      role: t('aboutUs:team.members.advisors.role'),
      description: t('aboutUs:team.members.advisors.description'),
      image: ExpertMan,
      linkedin: '#',
      email: 'hello@wendogo.com'
    }
  ];

  const expertise = [
    {
      title: t('aboutUs:expertise.sections.personalizedSupport.title'),
      description: t('aboutUs:expertise.sections.personalizedSupport.description'),
      icon: Target,
      color: 'blue'
    },
    {
      title: t('aboutUs:expertise.sections.recognizedExpertise.title'),
      description: t('aboutUs:expertise.sections.recognizedExpertise.description'),
      icon: Award,
      color: 'green'
    },
    {
      title: t('aboutUs:expertise.sections.supportiveCare.title'),
      description: t('aboutUs:expertise.sections.supportiveCare.description'),
      icon: Heart,
      color: 'red'
    },
    {
      title: t('aboutUs:expertise.sections.extensiveNetwork.title'),
      description: t('aboutUs:expertise.sections.extensiveNetwork.description'),
      icon: Globe,
      color: 'purple'
    }
  ];

  const milestones = [
    {
      year: '2020',
      title: t('aboutUs:story.milestones.2020.title'),
      description: t('aboutUs:story.milestones.2020.description')
    },
    {
      year: '2021',
      title: t('aboutUs:story.milestones.2021.title'),
      description: t('aboutUs:story.milestones.2021.description')
    },
    {
      year: '2022',
      title: t('aboutUs:story.milestones.2022.title'),
      description: t('aboutUs:story.milestones.2022.description')
    },
    {
      year: '2023',
      title: t('aboutUs:story.milestones.2023.title'),
      description: t('aboutUs:story.milestones.2023.description')
    },
    {
      year: '2024',
      title: t('aboutUs:story.milestones.2024.title'),
      description: t('aboutUs:story.milestones.2024.description')
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <meta property="og:url" content="https://wendogo.com/about-us" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={t('aboutUs:meta.title')} />
        <meta property="og:description" content={t('aboutUs:meta.description')} />
        <meta property="og:image" content={'https://wendogo.com' + SocialMediaLogo} />
        <title>{t('aboutUs:meta.title')}</title>
        <meta name="description" content={t('aboutUs:meta.description')} />
      </Head>

      <NavBar variant="simple" languageSelectorVariant="light" />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold mb-6">
                {t('aboutUs:hero.title')}
              </h1>
              <p className="text-xl mb-8 text-indigo-100">
                {t('aboutUs:hero.description')}
              </p>
              <div className="flex items-center space-x-6 text-indigo-200">
                <div className="flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  <span>{t('aboutUs:hero.expertTeam')}</span>
                </div>
                <div className="flex items-center">
                  <Heart className="w-5 h-5 mr-2" />
                  <span>{t('aboutUs:hero.supportiveCare')}</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="relative z-10">
                <Image
                  src={WendogoTeam}
                  alt={t('aboutUs:hero.teamImageAlt')}
                  className="rounded-2xl shadow-2xl"
                  width={600}
                  height={400}
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 rounded-2xl blur-xl opacity-20 transform -rotate-6"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex space-x-8">
            {[
              { id: 'team', label: t('aboutUs:navigation.team') },
              { id: 'expertise', label: t('aboutUs:navigation.expertise') },
              { id: 'story', label: t('aboutUs:navigation.story') }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveSection(tab.id)}
                className={`py-4 px-2 font-medium border-b-2 transition-colors ${
                  activeSection === tab.id
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

      {/* Content */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {/* Team Section */}
          {activeSection === 'team' && (
            <div>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  {t('aboutUs:team.title')}
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  {t('aboutUs:team.description')}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-12 mb-16">
                {teamMembers.map((member, index) => (
                  <div key={index} className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-shadow">
                    <div className="flex items-center mb-6">
                      <div className="w-20 h-20 rounded-full overflow-hidden mr-6">
                        <Image
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover"
                          width={80}
                          height={80}
                        />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">{member.name}</h3>
                        <p className="text-blue-600 font-medium">{member.role}</p>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-6">{member.description}</p>
                    <div className="flex space-x-4">
                      <Link
                        href={`mailto:${member.email}`}
                        className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
                      >
                        <Mail className="w-4 h-4 mr-2" />
                        Contact
                      </Link>
                      <Link   
                        href={member.linkedin}
                        className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
                      >
                        <LinkedinIcon className="w-4 h-4 mr-2" />
                        LinkedIn
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8">
                <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
                  {t('aboutUs:team.whyChooseAdvisors')}
                </h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="w-8 h-8 text-blue-600" />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      {t('aboutUs:team.advisorQualities.livedExperience.title')}
                    </h4>
                    <p className="text-gray-700 text-sm">
                      {t('aboutUs:team.advisorQualities.livedExperience.description')}
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Award className="w-8 h-8 text-green-600" />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      {t('aboutUs:team.advisorQualities.recognizedExpertise.title')}
                    </h4>
                    <p className="text-gray-700 text-sm">
                      {t('aboutUs:team.advisorQualities.recognizedExpertise.description')}
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Heart className="w-8 h-8 text-red-600" />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      {t('aboutUs:team.advisorQualities.humanSupport.title')}
                    </h4>
                    <p className="text-gray-700 text-sm">
                      {t('aboutUs:team.advisorQualities.humanSupport.description')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Expertise Section */}
          {activeSection === 'expertise' && (
            <div>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  {t('aboutUs:expertise.title')}
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  {t('aboutUs:expertise.description')}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-16">
                {expertise.map((item, index) => (
                  <div key={index} className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-shadow">
                    <div className={`bg-${item.color}-100 w-16 h-16 rounded-full flex items-center justify-center mb-6`}>
                      <item.icon className={`w-8 h-8 text-${item.color}-600`} />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      {item.title}
                    </h3>
                    <p className="text-gray-700">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>

              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8">
                <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
                  {t('aboutUs:expertise.domains.title')}
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <h4 className="font-semibold text-gray-900 mb-2">
                        {t('aboutUs:expertise.domains.orientation.title')}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {t('aboutUs:expertise.domains.orientation.description')}
                      </p>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <h4 className="font-semibold text-gray-900 mb-2">
                        {t('aboutUs:expertise.domains.visa.title')}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {t('aboutUs:expertise.domains.visa.description')}
                      </p>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <h4 className="font-semibold text-gray-900 mb-2">
                        {t('aboutUs:expertise.domains.campusFrance.title')}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {t('aboutUs:expertise.domains.campusFrance.description')}
                      </p>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <h4 className="font-semibold text-gray-900 mb-2">
                        {t('aboutUs:expertise.domains.installation.title')}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {t('aboutUs:expertise.domains.installation.description')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Story Section */}
          {activeSection === 'story' && (
            <div>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  {t('aboutUs:story.title')}
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  {t('aboutUs:story.description')}
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-12 mb-16">
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                    {t('aboutUs:story.origin.title')}
                  </h3>
                  <div className="space-y-4 text-gray-700">
                    <p>
                      {t('aboutUs:story.origin.paragraph1')}
                    </p>
                    <p>
                      {t('aboutUs:story.origin.paragraph2')}
                    </p>
                    <p>
                      {t('aboutUs:story.origin.paragraph3')}
                    </p>
                  </div>
                </div>
                <div className="relative">
                  <div className="relative z-10">
                    <Image
                      src={ExpertMan}
                      alt={t('aboutUs:story.origin.imageAlt')}
                      className="rounded-2xl shadow-lg"
                      width={400}
                      height={300}
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl blur-xl opacity-20 transform rotate-3"></div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-200 p-8">
                <h3 className="text-2xl font-semibold text-gray-900 mb-8 text-center">
                  {t('aboutUs:story.milestones.title')}
                </h3>
                <div className="space-y-8">
                  {milestones.map((milestone, index) => (
                    <div key={index} className="flex items-start">
                      <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center font-bold text-sm mr-6 flex-shrink-0">
                        {milestone.year}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-gray-900 mb-2">
                          {milestone.title}
                        </h4>
                        <p className="text-gray-600">
                          {milestone.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">
            {t('aboutUs:cta.title')}
          </h2>
          <p className="text-xl mb-8 text-indigo-100">
            {t('aboutUs:cta.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="bg-white text-indigo-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              {t('aboutUs:cta.button')}
            </Link>
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
      ...(await serverSideTranslations(locale, ['authModal', 'common', 'aboutUs'])),
    },
  };
}

export default AboutUs;
