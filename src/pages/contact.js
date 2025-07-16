// src/pages/contact.js - Version mise à jour avec vraie API
'use client';

import { useEffect, useState } from 'react';
import { trackPageView, event } from '../lib/gtag';
import Head from 'next/head';
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';
import { Mail, MessageCircle, Phone, MapPin, Clock, Users, Send, CheckCircle, AlertCircle } from 'lucide-react';
import Image from 'next/image';
import SocialMediaLogo from '../assets/optimized/social_media_logo.webp';
import { FloatingWhatsApp } from 'react-floating-whatsapp';
import { REST_API_PARAMS } from '../utils/Constants';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    projectType: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');
  const [submitMessage, setSubmitMessage] = useState('');

  useEffect(() => {
    trackPageView('contact_page');
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');
    setSubmitMessage('');

    try {
      // ✅ VRAIE API CALL vers votre backend Flask
      const response = await fetch(`${REST_API_PARAMS.baseUrl}/api/contact/send-message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitStatus('success');
        setSubmitMessage(result.message);
        
        // Réinitialiser le formulaire
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
          projectType: ''
        });

        // Track successful form submission
        if (typeof event !== 'undefined') {
          event('event', 'form_submit', {
            event_category: 'engagement',
            event_label: 'contact_form_success',
            value: 1
          });
        }

      } else {
        setSubmitStatus('error');
        setSubmitMessage(result.error || 'Erreur lors de l\'envoi du message');
      }

    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
      setSubmitMessage('Erreur de connexion. Veuillez vérifier votre connexion internet et réessayer.');

      // Track form submission error
      if (typeof gtag !== 'undefined') {
        gtag('event', 'form_error', {
          event_category: 'error',
          event_label: 'contact_form_error',
          value: 0
        });
      }

    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <meta property="og:url" content="https://wendogo.com/contact" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Contactez-nous - Wendogo" />
        <meta property="og:description" content="Contactez l'équipe Wendogo pour toute question sur votre projet d'études en France. Support disponible 24h/24." />
        <meta property="og:image" content={'https://wendogo.com' + SocialMediaLogo} />
        <title>Contactez-nous - Wendogo</title>
        <meta name="description" content="Contactez l'équipe Wendogo pour toute question sur votre projet d'études en France. Support disponible 24h/24." />
      </Head>

      <NavBar variant="simple" />

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Contactez l'équipe Wendogo
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Notre équipe d'experts est là pour vous accompagner dans votre projet d'études en France. 
            Nous répondons à toutes vos questions rapidement et avec bienveillance.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Informations de contact */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                <Clock className="w-6 h-6 text-blue-600 mr-3" />
                Disponibilité
              </h2>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-green-800 font-semibold mb-2">
                  📞 Support disponible 24h/24, 7j/7
                </p>
                <p className="text-green-700">
                  Notre équipe est disponible pour vous accompagner à tout moment, 
                  où que vous soyez dans le monde.
                </p>
              </div>
            </div>

            {/* Méthodes de contact */}
            <div className="space-y-6">
              {/* Email */}
              <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Mail className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-gray-900">Email</h3>
                    <p className="text-gray-600">Réponse sous 2h en moyenne</p>
                  </div>
                </div>
                <a 
                  href="mailto:hello@wendogo.com" 
                  className="text-blue-600 hover:text-blue-800 font-medium text-lg"
                >
                  hello@wendogo.com
                </a>
              </div>

              {/* WhatsApp */}
              <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="bg-green-100 p-3 rounded-full">
                    <MessageCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-gray-900">WhatsApp</h3>
                    <p className="text-gray-600">Réponse immédiate</p>
                  </div>
                </div>
                <a 
                  href="https://wa.me/33668156073" 
                  className="text-green-600 hover:text-green-800 font-medium text-lg"
                >
                  +33 6 68 15 60 73
                </a>
              </div>

              {/* Messenger */}
              <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-gray-900">Messenger</h3>
                    <p className="text-gray-600">Chat en temps réel</p>
                  </div>
                </div>
                <a 
                  href="https://m.me/wendogoHQ" 
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Écrivez-nous sur Messenger
                </a>
              </div>

              {/* Adresse */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-purple-100 p-3 rounded-full">
                    <MapPin className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-gray-900">Adresse</h3>
                    <p className="text-gray-600">Siège social</p>
                  </div>
                </div>
                <address className="text-gray-700 not-italic">
                  WENDOGO SAS<br />
                  50 Avenue des Champs Elysées<br />
                  75008 Paris<br />
                  France
                </address>
              </div>
            </div>
          </div>

          {/* Formulaire de contact */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
              <Send className="w-6 h-6 text-blue-600 mr-3" />
              Envoyez-nous un message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Type de projet */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type de projet *
                </label>
                <select
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Sélectionnez votre projet</option>
                  <option value="orientation">Orientation et recherche de formations</option>
                  <option value="visa">Accompagnement visa étudiant</option>
                  <option value="campus-france">Procédure Campus France</option>
                  <option value="parcoursup">Questions Parcoursup</option>
                  <option value="logement">Aide au logement</option>
                  <option value="general">Question générale</option>
                  <option value="other">Autre</option>
                </select>
              </div>

              {/* Nom */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nom complet *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  placeholder="Votre nom et prénom"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  placeholder="votre@email.com"
                />
              </div>

              {/* Sujet */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sujet *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  placeholder="Résumé de votre demande"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="6"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  placeholder="Décrivez votre projet ou posez votre question..."
                />
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Envoi en cours...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Envoyer le message
                  </>
                )}
              </button>

              {/* Status messages */}
              {submitStatus === 'success' && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                    <p className="text-green-800 font-medium">{submitMessage}</p>
                  </div>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
                    <p className="text-red-800 font-medium">{submitMessage}</p>
                  </div>
                  <p className="text-red-700 text-sm mt-2">
                    Si le problème persiste, contactez-nous directement :
                    <a href="mailto:hello@wendogo.com" className="underline ml-1">hello@wendogo.com</a>
                  </p>
                </div>
              )}

              <p className="text-xs text-gray-500">
                * Champs obligatoires. Vos données sont protégées selon notre 
                <a href="/privacy" className="underline ml-1">politique de confidentialité</a>.
              </p>
            </form>
          </div>
        </div>

        {/* Section FAQ rapide */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8 text-center">
            Questions fréquentes
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">
                🎓 Quelle formation choisir ?
              </h3>
              <p className="text-blue-800 text-sm">
                Nos conseillers analysent votre profil pour vous proposer les formations les plus adaptées.
              </p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="font-semibold text-green-900 mb-2">
                📋 Comment préparer mon visa ?
              </h3>
              <p className="text-green-800 text-sm">
                Accompagnement complet pour constituer votre dossier et maximiser vos chances.
              </p>
            </div>
            <div className="bg-purple-50 p-6 rounded-lg">
              <h3 className="font-semibold text-purple-900 mb-2">
                ⏰ Quand commencer ?
              </h3>
              <p className="text-purple-800 text-sm">
                Idéalement 8-12 mois avant votre rentrée pour préparer sereinement votre projet.
              </p>
            </div>
          </div>
        </div>
      </main>

      <FloatingWhatsApp 
        phoneNumber="33668156073" 
        accountName="Wendogo" 
        avatar="/social_media_logo.webp"
        statusMessage="Répond en général dans l'heure"
        chatMessage="Salut ! 🎓\n\nJe peux t'aider avec :\n• Recherche de formations\n• Accompagnement visa\n• Questions sur Campus France\n\nDis-moi comment je peux t'aider !"
        placeholder="Votre message..."
        chatboxHeight={500}
      />

      <Footer />
    </div>
  );
}

export default Contact;
