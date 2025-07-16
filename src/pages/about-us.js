// src/pages/about-us.js - Version redesignée
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

function AboutUs() {
  const [activeSection, setActiveSection] = useState('team');

  useEffect(() => {
    trackPageView('about_us_page');
  }, []);

  const teamMembers = [
    {
      name: 'Edgar Kamdem',
      role: 'Co-fondateur & CEO',
      description: 'Ingénieur et entrepreneur passionné par l\'éducation internationale. Edgar a créé Wendogo après avoir vécu les difficultés des démarches d\'études à l\'étranger.',
      image: EdgarHead,
      linkedin: '#',
      email: 'edgar@wendogo.com'
    },
    {
      name: 'Équipe Conseillers',
      role: 'Experts en orientation',
      description: 'Une équipe de conseillers expérimentés, anciens étudiants internationaux, qui comprennent parfaitement les défis que vous rencontrez.',
      image: ExpertMan,
      linkedin: '#',
      email: 'hello@wendogo.com'
    }
  ];

  const expertise = [
    {
      title: 'Accompagnement personnalisé',
      description: 'Chaque étudiant est unique. Nos conseillers prennent le temps de comprendre votre profil, vos objectifs et vos contraintes pour vous proposer un accompagnement sur mesure.',
      icon: Target,
      color: 'blue'
    },
    {
      title: 'Expertise reconnue',
      description: 'Notre équipe maîtrise parfaitement le système éducatif français, les procédures administratives et les attentes des établissements.',
      icon: Award,
      color: 'green'
    },
    {
      title: 'Suivi bienveillant',
      description: 'Nous vous accompagnons avec empathie et bienveillance, en comprenant les enjeux émotionnels de votre projet d\'études.',
      icon: Heart,
      color: 'red'
    },
    {
      title: 'Réseau étendu',
      description: 'Grâce à notre réseau de partenaires et d\'anciens étudiants, nous vous ouvrons des portes et facilitons votre intégration.',
      icon: Globe,
      color: 'purple'
    }
  ];

  const milestones = [
    {
      year: '2020',
      title: 'Création de Wendogo',
      description: 'Naissance de l\'idée suite aux difficultés rencontrées par les fondateurs'
    },
    {
      year: '2021',
      title: 'Premiers étudiants accompagnés',
      description: 'Lancement officiel avec les premiers services d\'orientation'
    },
    {
      year: '2022',
      title: 'Expansion des services',
      description: 'Ajout de l\'accompagnement visa et partenariats avec les écoles'
    },
    {
      year: '2023',
      title: 'Reconnaissance nationale',
      description: 'Wendogo devient une référence pour les études en France'
    },
    {
      year: '2024',
      title: 'Innovation continue',
      description: 'Nouveaux outils et services pour optimiser votre expérience'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <meta property="og:url" content="https://wendogo.com/about-us" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="À propos de Wendogo - Votre partenaire pour étudier en France" />
        <meta property="og:description" content="Découvrez l'équipe Wendogo et notre mission : vous accompagner avec expertise et bienveillance dans votre projet d'études en France." />
        <meta property="og:image" content={'https://wendogo.com' + SocialMediaLogo} />
        <title>À propos de Wendogo - Votre partenaire pour étudier en France</title>
        <meta name="description" content="Découvrez l'équipe Wendogo et notre mission : vous accompagner avec expertise et bienveillance dans votre projet d'études en France." />
      </Head>

      <NavBar variant="simple" />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold mb-6">
                Qui sommes-nous ?
              </h1>
              <p className="text-xl mb-8 text-indigo-100">
                Wendogo, c'est une équipe passionnée d'experts en éducation internationale 
                qui comprend parfaitement les défis que vous rencontrez. Nous sommes vos 
                partenaires de confiance pour réaliser votre rêve d'études en France.
              </p>
              <div className="flex items-center space-x-6 text-indigo-200">
                <div className="flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  <span>Équipe d'experts</span>
                </div>
                <div className="flex items-center">
                  <Heart className="w-5 h-5 mr-2" />
                  <span>Accompagnement bienveillant</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="relative z-10">
                <Image
                  src={WendogoTeam}
                  alt="Équipe Wendogo"
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
              { id: 'team', label: 'Notre équipe' },
              { id: 'expertise', label: 'Notre expertise' },
              { id: 'story', label: 'Notre histoire' }
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
                  Notre équipe
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Des experts passionnés qui mettent leur expérience et leur bienveillance 
                  au service de votre réussite.
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
                      <a
                        href={`mailto:${member.email}`}
                        className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
                      >
                        <Mail className="w-4 h-4 mr-2" />
                        Contact
                      </a>
                      <a
                        href={member.linkedin}
                        className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
                      >
                        <LinkedinIcon className="w-4 h-4 mr-2" />
                        LinkedIn
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8">
                <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
                  Pourquoi choisir nos conseillers ?
                </h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="w-8 h-8 text-blue-600" />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">Expérience vécue</h4>
                    <p className="text-gray-700 text-sm">
                      Nos conseillers ont eux-mêmes vécu l'expérience des études à l'étranger
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Award className="w-8 h-8 text-green-600" />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">Expertise reconnue</h4>
                    <p className="text-gray-700 text-sm">
                      Formation continue et certification sur les procédures françaises
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Heart className="w-8 h-8 text-red-600" />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">Accompagnement humain</h4>
                    <p className="text-gray-700 text-sm">
                      Écoute, empathie et soutien tout au long de votre parcours
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
                  Notre expertise
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Ce qui nous différencie et fait de nous vos meilleurs alliés pour réussir 
                  votre projet d'études en France.
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
                  Nos domaines d'expertise
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <h4 className="font-semibold text-gray-900 mb-2">🎓 Orientation</h4>
                      <p className="text-sm text-gray-600">
                        Plus de 2100 formations analysées et répertoriées
                      </p>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <h4 className="font-semibold text-gray-900 mb-2">📋 Visa étudiant</h4>
                      <p className="text-sm text-gray-600">
                        Expertise complète des procédures consulaires
                      </p>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <h4 className="font-semibold text-gray-900 mb-2">🏫 Campus France</h4>
                      <p className="text-sm text-gray-600">
                        Accompagnement personnalisé de A à Z
                      </p>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <h4 className="font-semibold text-gray-900 mb-2">🏠 Installation</h4>
                      <p className="text-sm text-gray-600">
                        Support pour votre arrivée et intégration
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
                  Notre histoire
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Wendogo est née d'une frustration personnelle qui s'est transformée 
                  en mission : faciliter l'accès aux études supérieures en France.
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-12 mb-16">
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                    L'origine de Wendogo
                  </h3>
                  <div className="space-y-4 text-gray-700">
                    <p>
                      Tout a commencé avec Edgar Kamdem, ingénieur passionné par l'éducation, 
                      qui a vécu les difficultés des démarches administratives pour faire 
                      voyager ses proches et les accompagner dans leurs études à l'étranger.
                    </p>
                    <p>
                      Constatant que de nombreux étudiants talentueux abandonnaient leurs 
                      rêves face à la complexité des procédures, Edgar a décidé de créer 
                      une solution pour démocratiser l'accès aux études en France.
                    </p>
                    <p>
                      Wendogo est ainsi né de cette volonté de simplifier, d'accompagner 
                      et de réussir ensemble.
                    </p>
                  </div>
                </div>
                <div className="relative">
                  <div className="relative z-10">
                    <Image
                      src={ExpertMan}
                      alt="Conseiller Wendogo"
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
                  Les étapes clés de notre développement
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
            Prêt à faire équipe avec nous ?
          </h2>
          <p className="text-xl mb-8 text-indigo-100">
            Rejoignez la communauté Wendogo et bénéficiez de l'accompagnement 
            d'experts qui comprennent vraiment votre projet.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="bg-white text-indigo-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Me faire accompagner
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default AboutUs;
