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

function WendogoMission() {
  const [activeTab, setActiveTab] = useState('mission');

  useEffect(() => {
    trackPageView('mission_page');
  }, []);

  const stats = [
    { number: '2100+', label: 'Formations référencées', icon: GraduationCap },
    { number: '500+', label: 'Écoles partenaires', icon: Users },
    { number: '95%', label: 'Taux de satisfaction', icon: Heart },
    { number: '24/7', label: 'Support disponible', icon: Shield }
  ];

  const values = [
    {
      icon: Heart,
      title: 'Bienveillance',
      description: 'Nous comprenons que votre projet d\'études est unique et précieux. Chaque étudiant est accompagné avec empathie et respect.',
      color: 'red'
    },
    {
      icon: Target,
      title: 'Excellence',
      description: 'Notre équipe d\'experts vous guide vers les meilleures formations et optimise chaque étape de votre parcours.',
      color: 'blue'
    },
    {
      icon: Shield,
      title: 'Transparence',
      description: 'Tarifs clairs, processus transparent, conseils honnêtes. Nous défendons vos intérêts en toute transparence.',
      color: 'green'
    },
    {
      icon: Globe,
      title: 'Accessibilité',
      description: 'Où que vous soyez dans le monde, notre support 24/7 vous accompagne dans votre langue et selon votre fuseau horaire.',
      color: 'purple'
    }
  ];

  const services = [
    {
      title: 'Orientation personnalisée',
      description: 'Analyse de votre profil et recommandations de formations adaptées à vos objectifs.',
      features: ['Analyse de profil', 'Recommandations personnalisées', 'Coaching orientation'],
      icon: Target
    },
    {
      title: 'Accompagnement visa',
      description: 'Support complet pour votre dossier visa étudiant et procédure Campus France.',
      features: ['Préparation dossier', 'Suivi Campus France', 'Accompagnement entretien'],
      icon: Shield
    },
    {
      title: 'Support continu',
      description: 'Accompagnement avant, pendant et après votre arrivée en France.',
      features: ['Support 24/7', 'Aide au logement', 'Intégration en France'],
      icon: Heart
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <meta property="og:url" content="https://wendogo.com/mission" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Notre mission - Réaliser votre rêve d'études en France - Wendogo" />
        <meta property="og:description" content="Découvrez la mission de Wendogo : vous accompagner de A à Z dans votre projet d'études en France avec bienveillance et expertise." />
        <meta property="og:image" content={'https://wendogo.com' + SocialMediaLogo} />
        <title>Notre mission - Réaliser votre rêve d'études en France - Wendogo</title>
        <meta name="description" content="Découvrez la mission de Wendogo : vous accompagner de A à Z dans votre projet d'études en France avec bienveillance et expertise." />
      </Head>

      <NavBar variant="simple" />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold mb-6">
                Réaliser votre rêve d'études en France
              </h1>
              <p className="text-xl mb-8 text-blue-100">
                Wendogo est la plateforme de référence pour accompagner les étudiants internationaux 
                dans leur projet d'études en France. De l'orientation à l'installation, nous sommes 
                votre partenaire de confiance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/?tab=accompany#accompany-section" className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-center">
                  Accompagnez-moi
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
                  alt="Étudiante heureuse"
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
              { id: 'mission', label: 'Notre mission' },
              { id: 'values', label: 'Nos valeurs' },
              { id: 'services', label: 'Nos services' }
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
                  Notre mission
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Démocratiser l'accès à l'enseignement supérieur français et accompagner 
                  chaque étudiant dans la réalisation de son projet académique.
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                    Pourquoi Wendogo existe ?
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                      <p className="text-gray-700">
                        <strong>Simplifier</strong> les démarches complexes et bureaucratiques
                      </p>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                      <p className="text-gray-700">
                        <strong>Démocratiser</strong> l'accès à l'information sur les formations françaises
                      </p>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                      <p className="text-gray-700">
                        <strong>Accompagner</strong> humainement chaque étudiant dans son parcours
                      </p>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                      <p className="text-gray-700">
                        <strong>Maximiser</strong> les chances de réussite grâce à notre expertise
                      </p>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <Image
                    src={Mentorship}
                    alt="Accompagnement étudiant"
                    className="rounded-2xl shadow-lg"
                    width={500}
                    height={400}
                  />
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4 text-center">
                  Notre engagement
                </h3>
                <p className="text-lg text-gray-700 text-center max-w-4xl mx-auto">
                  Nous nous engageons à offrir un accompagnement personnalisé, transparent et bienveillant 
                  à chaque étudiant, en mettant notre expertise au service de la réussite de leur projet 
                  d'études en France.
                </p>
              </div>
            </div>
          )}

          {/* Values Tab */}
          {activeTab === 'values' && (
            <div>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Nos valeurs
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Les principes qui guident notre action au quotidien et définissent notre façon 
                  d'accompagner les étudiants.
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
                  Nos services
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Un accompagnement complet pour toutes les étapes de votre projet d'études en France.
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
            Prêt à commencer votre aventure académique en France ?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Rejoignez des milliers d'étudiants qui ont réalisé leur rêve d'études en France avec Wendogo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/?tab=accompany#accompany-section" className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Accompagnez-moi
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

export default WendogoMission;
