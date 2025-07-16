// src/pages/cgu.js - Version redesignée
'use client';

import { useEffect } from 'react';
import { trackPageView } from '../lib/gtag';
import SocialMediaLogo from '../assets/optimized/social_media_logo.webp';
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';
import Head from 'next/head';

function CGU() {
  useEffect(() => {
    trackPageView('cgu_page');
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <meta property="og:url" content="https://wendogo.com/cgu" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Conditions Générales d'Utilisation - Wendogo" />
        <meta property="og:description" content="Conditions Générales d'Utilisation et de Vente de Wendogo, plateforme d'accompagnement pour vos études en France." />
        <meta property="og:image" content={'https://wendogo.com' + SocialMediaLogo} />
        <title>Conditions Générales d'Utilisation - Wendogo</title>
        <meta name="description" content="Conditions Générales d'Utilisation et de Vente de Wendogo, plateforme d'accompagnement pour vos études en France." />
      </Head>

      <NavBar variant="simple" />

      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Conditions Générales d'Utilisation
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Conditions régissant l'utilisation de la plateforme Wendogo et nos services d'accompagnement pour vos études en France.
          </p>
          <div className="mt-4 text-sm text-gray-500">
            Version 2024-002 - Dernière mise à jour : 15 décembre 2024
          </div>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          {/* Préambule */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 border-b border-gray-200 pb-2">
              Préambule
            </h2>
            <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mb-6">
              <p className="text-gray-700 leading-relaxed">
                Les présentes Conditions Générales d'Utilisation et de Vente (CGU-CGV) régissent l'utilisation de la plateforme Wendogo.com et de ses services d'accompagnement pour les projets d'études en France.
              </p>
            </div>
            <div className="bg-amber-50 border-l-4 border-amber-400 p-6">
              <p className="font-semibold text-amber-800 mb-2">⚠️ Important</p>
              <p className="text-amber-700">
                Toute utilisation de la plateforme Wendogo implique l'acceptation préalable et sans réserve des présentes conditions. Si vous n'acceptez pas ces conditions, vous ne devez pas utiliser nos services.
              </p>
            </div>
          </section>

          {/* Glossaire */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 border-b border-gray-200 pb-2">
              1. Définitions
            </h2>
            <div className="grid gap-4">
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">PLATEFORME WENDOGO</h3>
                <p className="text-gray-700">Site internet wendogo.com et applications correspondantes proposant des services d'accompagnement pour les études en France.</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">UTILISATEUR</h3>
                <p className="text-gray-700">Personne physique utilisant les services de la plateforme Wendogo pour son projet d'études en France.</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">SERVICES</h3>
                <p className="text-gray-700">Ensemble des fonctionnalités et services d'accompagnement proposés : recherche de formations, accompagnement visa, orientation personnalisée.</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">OPÉRATEUR</h3>
                <p className="text-gray-700">Société WENDOGO SAS, éditeur et opérateur de la plateforme.</p>
              </div>
            </div>
          </section>

          {/* Objet */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 border-b border-gray-200 pb-2">
              2. Objet des services
            </h2>
            <p className="text-gray-700 mb-6">
              Wendogo propose une plateforme complète d'accompagnement pour la réalisation de projets d'études en France, comprenant :
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-3">🎓 Orientation académique</h3>
                <ul className="text-blue-800 space-y-2 text-sm">
                  <li>• Recherche de formations adaptées</li>
                  <li>• Conseils personnalisés</li>
                  <li>• Accompagnement candidatures</li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-lg">
                <h3 className="font-semibold text-green-900 mb-3">📋 Accompagnement visa</h3>
                <ul className="text-green-800 space-y-2 text-sm">
                  <li>• Préparation dossier visa étudiant</li>
                  <li>• Suivi procédure Campus France</li>
                  <li>• Support administratif</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Obligations utilisateur */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 border-b border-gray-200 pb-2">
              3. Obligations de l'utilisateur
            </h2>
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Vous vous engagez à :</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Fournir des informations exactes et à jour sur votre profil académique
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Utiliser la plateforme conformément aux lois en vigueur
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Respecter les droits de propriété intellectuelle
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Maintenir la confidentialité de vos identifiants de connexion
                </li>
              </ul>
            </div>
          </section>

          {/* Tarification */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 border-b border-gray-200 pb-2">
              4. Tarification et paiement
            </h2>
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-4">Principe de tarification</h3>
              <p className="text-blue-800 mb-4">
                Nos services sont proposés selon une tarification transparente et fixe, communiquée avant tout engagement.
              </p>
              <div className="grid md:grid-cols-3 gap-4 mt-6">
                <div className="bg-white p-4 rounded border">
                  <h4 className="font-semibold text-gray-900 mb-2">Pack Orientation</h4>
                  <p className="text-sm text-gray-600">À partir de 100€</p>
                </div>
                <div className="bg-white p-4 rounded border">
                  <h4 className="font-semibold text-gray-900 mb-2">Pack Visa</h4>
                  <p className="text-sm text-gray-600">À partir de 200€</p>
                </div>
                <div className="bg-white p-4 rounded border">
                  <h4 className="font-semibold text-gray-900 mb-2">Pack Complet</h4>
                  <p className="text-sm text-gray-600">À partir de 300€</p>
                </div>
              </div>
            </div>
          </section>

          {/* Données personnelles */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 border-b border-gray-200 pb-2">
              5. Protection des données
            </h2>
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <p className="text-green-800 mb-4">
                Nous collectons et traitons vos données personnelles dans le strict respect du RGPD et pour les finalités suivantes :
              </p>
              <ul className="text-green-700 space-y-2">
                <li>• Fourniture des services d'accompagnement</li>
                <li>• Amélioration de nos services</li>
                <li>• Communication relative à votre projet</li>
              </ul>
              <p className="mt-4 text-green-800">
                Pour plus d'informations : <a href="/privacy" className="underline font-semibold">Politique de confidentialité</a>
              </p>
            </div>
          </section>

          {/* Contact */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 border-b border-gray-200 pb-2">
              6. Contact et réclamations
            </h2>
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Nous contacter</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">📧 Email</h4>
                  <p className="text-gray-600">hello@wendogo.com</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">📍 Adresse</h4>
                  <p className="text-gray-600">
                    WENDOGO SAS<br />
                    50 Avenue des Champs Elysées<br />
                    75008 Paris
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Informations légales */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 border-b border-gray-200 pb-2">
              7. Informations légales
            </h2>
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Éditeur</h3>
                  <p className="text-gray-700">
                    WENDOGO SAS<br />
                    Capital social : 10 000€<br />
                    RCS : Paris B 123 456 789
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Directeur de publication</h3>
                  <p className="text-gray-700">
                    Edgar Kamdem<br />
                    Co-fondateur & CEO
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

export default CGU;
