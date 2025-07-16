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

function LegalNotice() {
  const [expandedSection, setExpandedSection] = useState(null);

  useEffect(() => {
    trackPageView('legal_notice_page');
  }, []);

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const legalSections = [
    {
      id: 'definitions',
      title: 'Définitions',
      icon: FileText,
      content: (
        <div className="space-y-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 mb-2">🎓 Utilisateur</h4>
            <p className="text-blue-800 text-sm">
              Toute personne physique ou morale qui accède et utilise la plateforme Wendogo.com 
              pour ses services d'accompagnement pour études en France.
            </p>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <h4 className="font-semibold text-green-900 mb-2">📋 Services</h4>
            <p className="text-green-800 text-sm">
              Ensemble des prestations d'accompagnement proposées par Wendogo : orientation, 
              recherche de formations, accompagnement visa étudiant, procédure Campus France.
            </p>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <h4 className="font-semibold text-purple-900 mb-2">🔒 Données personnelles</h4>
            <p className="text-purple-800 text-sm">
              Toute information permettant d'identifier directement ou indirectement une personne physique, 
              au sens du Règlement Général sur la Protection des Données (RGPD).
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'company-info',
      title: 'Informations sur la société',
      icon: Building2,
      content: (
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                <Building2 className="w-4 h-4 mr-2 text-blue-600" />
                Éditeur du site
              </h4>
              <div className="space-y-2 text-sm text-gray-700">
                <p><strong>Raison sociale :</strong> WENDOGO SAS</p>
                <p><strong>Capital social :</strong> 10 000€</p>
                <p><strong>RCS :</strong> Paris B 123 456 789</p>
                <p><strong>SIRET :</strong> 123 456 789 00012</p>
                <p><strong>TVA intracommunautaire :</strong> FR12123456789</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                <MapPin className="w-4 h-4 mr-2 text-green-600" />
                Adresse du siège social
              </h4>
              <address className="text-sm text-gray-700 not-italic">
                WENDOGO SAS<br />
                50 Avenue des Champs Elysées<br />
                75008 Paris<br />
                France
              </address>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <Users className="w-4 h-4 mr-2 text-purple-600" />
                  Direction
                </h4>
                <div className="text-sm text-gray-700">
                  <p><strong>Directeur de la publication :</strong> Edgar Kamdem</p>
                  <p><strong>Responsable éditorial :</strong> Edgar Kamdem</p>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <Mail className="w-4 h-4 mr-2 text-orange-600" />
                  Contact
                </h4>
                <div className="text-sm text-gray-700">
                  <p><strong>Email :</strong> hello@wendogo.com</p>
                  <p><strong>WhatsApp :</strong> +33 6 68 15 60 73</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'hosting',
      title: 'Hébergement',
      icon: Shield,
      content: (
        <div className="bg-gray-50 rounded-lg p-6">
          <h4 className="font-semibold text-gray-900 mb-4">🌐 Hébergeur du site</h4>
          <div className="space-y-3 text-sm text-gray-700">
            <p><strong>Société :</strong> OVH SAS</p>
            <p><strong>Adresse :</strong> 2 rue Kellermann, 59100 Roubaix, France</p>
            <p><strong>Téléphone :</strong> 09 72 10 10 07</p>
            <p><strong>Site web :</strong> <a href="https://www.ovh.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">www.ovh.com</a></p>
          </div>
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded">
            <p className="text-green-800 text-sm">
              ✅ <strong>Conformité RGPD :</strong> Hébergement dans l'Union Européenne conformément au RGPD.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'services-description',
      title: 'Description des services',
      icon: Users,
      content: (
        <div className="space-y-6">
          <div className="bg-blue-50 rounded-lg p-6">
            <h4 className="font-semibold text-blue-900 mb-4">🎯 Notre mission</h4>
            <p className="text-blue-800 mb-4">
              Wendogo est la plateforme de référence pour accompagner les étudiants internationaux 
              dans leur projet d'études en France. Nous proposons des services complets et personnalisés.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h5 className="font-semibold text-gray-900 mb-2">🎓 Orientation</h5>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Analyse de profil personnalisée</li>
                <li>• Recherche de formations adaptées</li>
                <li>• Conseils d'orientation</li>
              </ul>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h5 className="font-semibold text-gray-900 mb-2">📋 Accompagnement visa</h5>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Préparation dossier visa étudiant</li>
                <li>• Suivi procédure Campus France</li>
                <li>• Accompagnement administratif</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div className="flex items-center">
              <AlertTriangle className="w-5 h-5 text-amber-600 mr-2" />
              <p className="text-amber-800 font-medium">Limitation de responsabilité</p>
            </div>
            <p className="text-amber-700 text-sm mt-2">
              Les informations fournies sont données à titre indicatif. Wendogo s'efforce de fournir 
              des informations précises mais ne peut garantir l'exhaustivité des données.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'intellectual-property',
      title: 'Propriété intellectuelle',
      icon: Lock,
      content: (
        <div className="space-y-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h4 className="font-semibold text-red-900 mb-2">🔐 Droits d'auteur</h4>
            <p className="text-red-800 text-sm">
              L'ensemble du contenu du site Wendogo.com (textes, images, logos, vidéos, design) 
              est protégé par le droit d'auteur et appartient à WENDOGO SAS.
            </p>
          </div>
          
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <h4 className="font-semibold text-orange-900 mb-2">⚠️ Utilisation interdite</h4>
            <p className="text-orange-800 text-sm">
              Toute reproduction, distribution, modification ou utilisation commerciale du contenu 
              sans autorisation écrite préalable est strictement interdite.
            </p>
          </div>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="font-semibold text-green-900 mb-2">✅ Utilisation autorisée</h4>
            <p className="text-green-800 text-sm">
              Consultation personnelle et privée dans le cadre d'un usage normal du site. 
              Partage de liens vers nos pages autorisé.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'personal-data',
      title: 'Protection des données personnelles',
      icon: Eye,
      content: (
        <div className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h4 className="font-semibold text-blue-900 mb-4 flex items-center">
              <Shield className="w-5 h-5 mr-2" />
              Responsable du traitement
            </h4>
            <div className="text-blue-800 text-sm space-y-2">
              <p><strong>Société :</strong> WENDOGO SAS</p>
              <p><strong>Responsable :</strong> Edgar Kamdem</p>
              <p><strong>Contact DPO :</strong> hello@wendogo.com</p>
              <p><strong>Adresse :</strong> 11 rue Pierre Brossolette, 93290 Tremblay-en-France</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h5 className="font-semibold text-gray-900 mb-3">🎯 Finalités du traitement</h5>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Fourniture des services d'accompagnement</li>
                <li>• Gestion de la relation client</li>
                <li>• Amélioration de nos services</li>
                <li>• Communication sur nos offres</li>
              </ul>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h5 className="font-semibold text-gray-900 mb-3">⚖️ Vos droits RGPD</h5>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Droit d'accès à vos données</li>
                <li>• Droit de rectification</li>
                <li>• Droit à l'effacement</li>
                <li>• Droit à la portabilité</li>
                <li>• Droit d'opposition</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="font-semibold text-green-900 mb-2">📧 Exercer vos droits</h4>
            <p className="text-green-800 text-sm mb-2">
              Pour exercer vos droits ou pour toute question relative au traitement de vos données :
            </p>
            <div className="space-y-1 text-green-700 text-sm">
              <p>📧 Email : hello@wendogo.com</p>
              <p>📮 Courrier : WENDOGO SAS - DPO, 11 rue Pierre Brossolette, 93290 Tremblay-en-France</p>
            </div>
          </div>
          
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <h4 className="font-semibold text-purple-900 mb-2">🛡️ Sécurité des données</h4>
            <p className="text-purple-800 text-sm">
              Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour 
              protéger vos données contre tout accès non autorisé, perte ou destruction.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'cookies',
      title: 'Cookies et traceurs',
      icon: Eye,
      content: (
        <div className="space-y-4">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-semibold text-yellow-900 mb-2">🍪 Qu'est-ce qu'un cookie ?</h4>
            <p className="text-yellow-800 text-sm">
              Un cookie est un petit fichier texte déposé sur votre terminal lors de la visite du site, 
              permettant d'améliorer votre expérience de navigation.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h5 className="font-semibold text-gray-900 mb-2">🔧 Cookies techniques</h5>
              <p className="text-sm text-gray-700">
                Nécessaires au fonctionnement du site (session, préférences utilisateur).
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h5 className="font-semibold text-gray-900 mb-2">📊 Cookies analytiques</h5>
              <p className="text-sm text-gray-700">
                Mesure d'audience et statistiques de visite (Google Analytics).
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h5 className="font-semibold text-gray-900 mb-2">🎯 Cookies marketing</h5>
              <p className="text-sm text-gray-700">
                Personnalisation des contenus et publicités ciblées.
              </p>
            </div>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 mb-2">⚙️ Gérer vos préférences</h4>
            <p className="text-blue-800 text-sm mb-2">
              Vous pouvez configurer vos préférences cookies :
            </p>
            <ul className="text-blue-700 text-sm space-y-1">
              <li>• Dans les paramètres de votre navigateur</li>
              <li>• Via notre bandeau de consentement</li>
              <li>• En nous contactant : hello@wendogo.com</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'applicable-law',
      title: 'Droit applicable et juridiction',
      icon: Scale,
      content: (
        <div className="space-y-4">
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <Scale className="w-4 h-4 mr-2 text-blue-600" />
                  Droit applicable
                </h4>
                <p className="text-sm text-gray-700">
                  Les présentes mentions légales et l'utilisation du site Wendogo.com 
                  sont régies par le droit français.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <Building2 className="w-4 h-4 mr-2 text-green-600" />
                  Juridiction compétente
                </h4>
                <p className="text-sm text-gray-700">
                  En cas de litige, les tribunaux compétents de Bobigny 
                  seront seuls compétents.
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 mb-2">📋 Règlement amiable</h4>
            <p className="text-blue-800 text-sm">
              En cas de différend, nous privilégions la résolution amiable. 
              Contactez-nous à hello@wendogo.com pour tout problème.
            </p>
          </div>
          
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <h4 className="font-semibold text-purple-900 mb-2">🔄 Modifications</h4>
            <p className="text-purple-800 text-sm">
              Ces mentions légales peuvent être modifiées à tout moment. 
              La version applicable est celle en vigueur lors de votre visite.
            </p>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Mentions légales - Wendogo</title>
        <meta name="description" content="Mentions légales de Wendogo, plateforme d'accompagnement pour vos études en France. Informations légales, protection des données, cookies." />
        <meta name="keywords" content="mentions légales, RGPD, protection données, cookies, Wendogo, études France" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        
        <meta property="og:title" content="Mentions légales - Wendogo" />
        <meta property="og:description" content="Consultez les mentions légales de Wendogo, plateforme d'accompagnement pour études en France." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://wendogo.com/legal-notice" />
        <meta property="og:image" content={'https://wendogo.com' + SocialMediaLogo} />
        
        <link rel="canonical" href="https://wendogo.com/legal-notice" />
      </Head>

      <NavBar variant="simple" />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="bg-blue-100 p-4 rounded-full">
              <Scale className="w-12 h-12 text-blue-600" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Mentions légales
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Informations légales relatives à l'utilisation de la plateforme Wendogo, 
            conformément aux obligations légales en vigueur.
          </p>
          <div className="mt-4 text-sm text-gray-500">
            Dernière mise à jour : 17 Juillet 2025
          </div>
        </div>

        {/* Informations importantes */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
          <div className="flex items-center mb-4">
            <Info className="w-6 h-6 text-blue-600 mr-3" />
            <h2 className="text-xl font-semibold text-blue-900">
              Informations essentielles
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="bg-white rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">🏢 Société</h3>
              <p className="text-gray-700">WENDOGO SAS</p>
              <p className="text-gray-600">Capital : 10 000€</p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">📧 Contact</h3>
              <p className="text-gray-700">hello@wendogo.com</p>
              <p className="text-gray-600">+33 6 68 15 60 73</p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">🏛️ Hébergeur</h3>
              <p className="text-gray-700">OVH SAS</p>
              <p className="text-gray-600">Roubaix, France</p>
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
            Des questions sur nos mentions légales ?
          </h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Notre équipe est disponible pour répondre à toutes vos questions concernant 
            l'utilisation de nos services et la protection de vos données.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:hello@wendogo.com"
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
            >
              <Mail className="w-4 h-4 mr-2" />
              Nous écrire
            </a>
            <a
              href="https://wa.me/33668156073"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors inline-flex items-center justify-center"
            >
              <Phone className="w-4 h-4 mr-2" />
              WhatsApp
            </a>
          </div>
        </div>

        {/* Liens utiles */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 text-sm mb-4">Documents connexes :</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/cgu"
              className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
            >
              <FileText className="w-4 h-4 mr-1" />
              Conditions générales
            </a>
            <a
              href="/privacy"
              className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
            >
              <Shield className="w-4 h-4 mr-1" />
              Politique de confidentialité
            </a>
            <a
              href="/contact"
              className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
            >
              <Mail className="w-4 h-4 mr-1" />
              Nous contacter
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default LegalNotice;
