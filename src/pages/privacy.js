import React from 'react';
import { Shield, Eye, Lock, Trash2, Mail, Globe, UserCheck, FileText } from 'lucide-react';
import HeaderMenuBarOnlyWithLogo from '../components/HeaderMenuBarOnlyWithLogo';
import Footer from '../components/Footer';

const PrivacyPolicy = () => {
  return (
    <>
      <HeaderMenuBarOnlyWithLogo />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          
          {/* Header */}
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Politique de Confidentialité
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Wendogo s'engage à protéger votre vie privée et vos données personnelles. 
              Cette politique explique comment nous collectons, utilisons et protégeons vos informations.
            </p>
            <div className="mt-4 text-sm text-gray-500">
              Dernière mise à jour : 11 juillet 2025
            </div>
          </div>

          {/* Table des matières */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" />
              Table des matières
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <a href="#collecte" className="text-blue-600 hover:text-blue-700 hover:underline">1. Données collectées</a>
              <a href="#utilisation" className="text-blue-600 hover:text-blue-700 hover:underline">2. Utilisation des données</a>
              <a href="#partage" className="text-blue-600 hover:text-blue-700 hover:underline">3. Partage des données</a>
              <a href="#protection" className="text-blue-600 hover:text-blue-700 hover:underline">4. Protection des données</a>
              <a href="#droits" className="text-blue-600 hover:text-blue-700 hover:underline">5. Vos droits</a>
              <a href="#cookies" className="text-blue-600 hover:text-blue-700 hover:underline">6. Cookies</a>
              <a href="#contact" className="text-blue-600 hover:text-blue-700 hover:underline">7. Nous contacter</a>
              <a href="#modifications" className="text-blue-600 hover:text-blue-700 hover:underline">8. Modifications</a>
            </div>
          </div>

          {/* Contenu principal */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 space-y-8">
            
            {/* 1. Données collectées */}
            <section id="collecte">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Eye className="w-6 h-6 text-blue-600" />
                1. Données que nous collectons
              </h2>
              
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-2">Données d'inscription</h3>
                  <ul className="list-disc list-inside text-blue-800 space-y-1">
                    <li>Nom et prénom</li>
                    <li>Adresse email</li>
                    <li>Numéro de téléphone</li>
                    <li>Date de naissance</li>
                    <li>Pays de résidence (détecté automatiquement)</li>
                  </ul>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-green-900 mb-2">Données via les réseaux sociaux</h3>
                  <p className="text-green-800 mb-2">
                    Lorsque vous vous connectez via Google ou Facebook, nous collectons :
                  </p>
                  <ul className="list-disc list-inside text-green-800 space-y-1">
                    <li>Nom et prénom</li>
                    <li>Adresse email</li>
                    <li>Photo de profil (optionnel)</li>
                  </ul>
                </div>
                
                <div className="bg-orange-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-orange-900 mb-2">Données d'utilisation</h3>
                  <ul className="list-disc list-inside text-orange-800 space-y-1">
                    <li>Formations ajoutées aux favoris</li>
                    <li>Historique de recherche</li>
                    <li>Préférences d'orientation</li>
                    <li>Données de navigation (pages visitées, temps passé)</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 2. Utilisation des données */}
            <section id="utilisation">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <UserCheck className="w-6 h-6 text-green-600" />
                2. Comment nous utilisons vos données
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Services principaux</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Créer et gérer votre compte</li>
                    <li>Sauvegarder vos formations favorites</li>
                    <li>Personnaliser vos recommandations</li>
                    <li>Fournir un support client</li>
                  </ul>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Amélioration des services</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Analyser l'utilisation de la plateforme</li>
                    <li>Améliorer nos algorithmes de recherche</li>
                    <li>Développer de nouvelles fonctionnalités</li>
                    <li>Prévenir la fraude et les abus</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 3. Partage des données */}
            <section id="partage">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Globe className="w-6 h-6 text-orange-600" />
                3. Partage de vos données
              </h2>
              
              <div className="bg-red-50 border border-red-200 p-4 rounded-lg mb-4">
                <p className="text-red-800 font-medium">
                  🚫 Nous ne vendons jamais vos données personnelles à des tiers.
                </p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Écoles partenaires</h4>
                    <p className="text-gray-700">Uniquement si vous demandez expressément à être mis en contact</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Fournisseurs de services</h4>
                    <p className="text-gray-700">Services d'hébergement, d'email, d'analytics (avec protection des données)</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Obligations légales</h4>
                    <p className="text-gray-700">Seulement si requis par la loi ou pour protéger nos droits</p>
                  </div>
                </div>
              </div>
            </section>

            {/* 4. Protection des données */}
            <section id="protection">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Lock className="w-6 h-6 text-purple-600" />
                4. Protection de vos données
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-purple-50 p-4 rounded-lg text-center">
                  <Shield className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <h4 className="font-semibold text-purple-900">Chiffrement</h4>
                  <p className="text-purple-800 text-sm">SSL/TLS pour tous les transferts</p>
                </div>
                
                <div className="bg-purple-50 p-4 rounded-lg text-center">
                  <Lock className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <h4 className="font-semibold text-purple-900">Accès restreint</h4>
                  <p className="text-purple-800 text-sm">Seuls les employés autorisés</p>
                </div>
                
                <div className="bg-purple-50 p-4 rounded-lg text-center">
                  <FileText className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <h4 className="font-semibold text-purple-900">Sauvegardes</h4>
                  <p className="text-purple-800 text-sm">Régulières et sécurisées</p>
                </div>
              </div>
            </section>

            {/* 5. Vos droits */}
            <section id="droits">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <UserCheck className="w-6 h-6 text-green-600" />
                5. Vos droits (RGPD)
              </h2>
              
              <div className="bg-green-50 p-6 rounded-lg">
                <p className="text-green-800 mb-4 font-medium">
                  Conformément au RGPD, vous disposez des droits suivants :
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Eye className="w-4 h-4 text-green-600" />
                      <span className="font-medium text-green-900">Droit d'accès</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-green-600" />
                      <span className="font-medium text-green-900">Droit de rectification</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Trash2 className="w-4 h-4 text-green-600" />
                      <span className="font-medium text-green-900">Droit d'effacement</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Lock className="w-4 h-4 text-green-600" />
                      <span className="font-medium text-green-900">Droit de limitation</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-green-600" />
                      <span className="font-medium text-green-900">Droit de portabilité</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-green-600" />
                      <span className="font-medium text-green-900">Droit d'opposition</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 p-3 bg-white rounded border">
                  <p className="text-green-800 text-sm">
                    💡 <strong>Comment exercer vos droits :</strong> Contactez-nous à 
                    <a href="mailto:privacy@wendogo.com" className="text-blue-600 hover:underline"> privacy@wendogo.com</a>
                  </p>
                </div>
              </div>
            </section>

            {/* 6. Cookies */}
            <section id="cookies">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Cookies et technologies similaires</h2>
              
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">Cookies essentiels</h4>
                  <p className="text-blue-800">Nécessaires au fonctionnement du site (connexion, favoris)</p>
                </div>
                
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-yellow-900 mb-2">Cookies d'analyse</h4>
                  <p className="text-yellow-800">Pour comprendre l'utilisation du site et l'améliorer</p>
                </div>
              </div>
            </section>

            {/* 7. Contact */}
            <section id="contact">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Mail className="w-6 h-6 text-blue-600" />
                7. Nous contacter
              </h2>
              
              <div className="bg-blue-50 p-6 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-3">Délégué à la Protection des Données</h4>
                <div className="space-y-2 text-blue-800">
                  <p><strong>Email :</strong> hello@wendogo.com</p>
                  <p><strong>Adresse :</strong> Wendogo, 50 Avenue des Champs Elysées 75008 Paris</p>
                  <p><strong>Téléphone :</strong> +33 6 68 15 60 73</p>
                </div>
                
                <div className="mt-4 p-3 bg-white rounded border">
                  <p className="text-blue-800 text-sm">
                    ⏱️ <strong>Délai de réponse :</strong> Nous nous engageons à répondre dans un délai de 30 jours maximum.
                  </p>
                </div>
              </div>
            </section>

            {/* 8. Modifications */}
            <section id="modifications">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Modifications de cette politique</h2>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700 mb-3">
                  Nous pouvons modifier cette politique de confidentialité pour refléter les changements 
                  de nos pratiques ou pour des raisons légales.
                </p>
                <p className="text-gray-700">
                  <strong>Notification :</strong> Nous vous informerons de tout changement important 
                  par email ou via une notification sur notre site.
                </p>
              </div>
            </section>

            {/* Footer de la politique */}
            <div className="border-t pt-6 mt-8">
              <div className="text-center text-gray-500 text-sm">
                <p>Cette politique de confidentialité est effective depuis le 11 juillet 2025.</p>
                <p className="mt-2">© 2025 Wendogo. Tous droits réservés.</p>
              </div>
            </div>
            
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default PrivacyPolicy;
