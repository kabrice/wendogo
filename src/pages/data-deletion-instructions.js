import React from 'react';
import { Trash2, Mail, MessageCircle, Shield, AlertTriangle, CheckCircle } from 'lucide-react';
import HeaderMenuBarOnlyWithLogo from '../components/HeaderMenuBarOnlyWithLogo';
import Footer from '../components/Footer';

const DataDeletionInstructions = () => {
  return (
    <>
      <HeaderMenuBarOnlyWithLogo />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          
          {/* Header */}
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Trash2 className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Suppression de vos données
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Instructions pour supprimer toutes vos données personnelles de Wendogo
            </p>
          </div>

          {/* Instructions principales */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 mb-8">
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
              <div className="flex items-center gap-3 mb-3">
                <Shield className="w-6 h-6 text-blue-600" />
                <h2 className="text-xl font-bold text-blue-900">Votre droit à la suppression</h2>
              </div>
              <p className="text-blue-800">
                Conformément au RGPD et à nos engagements, vous avez le droit de demander 
                la suppression complète de toutes vos données personnelles de nos systèmes.
              </p>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Comment supprimer vos données
            </h3>

            {/* Méthode 1 : Email */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">1</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <Mail className="w-5 h-5 text-green-600" />
                    <h4 className="font-bold text-green-900 text-lg">Par email (Recommandé)</h4>
                  </div>
                  <p className="text-green-800 mb-4">
                    Envoyez-nous un email avec votre demande de suppression :
                  </p>
                  
                  <div className="bg-white rounded-lg p-4 border border-green-200 mb-4">
                    <p className="font-semibold text-green-900 mb-2">📧 Email :</p>
                    <a href="mailto:hello@wendogo.com?subject=Demande de suppression de données&body=Bonjour,%0A%0AJe souhaite supprimer toutes mes données personnelles de Wendogo.%0A%0AEmail de mon compte : [votre-email@example.com]%0AMotif : [optionnel]%0A%0AMerci." 
                       className="text-blue-600 hover:underline font-medium">
                      hello@wendogo.com
                    </a>
                    
                    <p className="font-semibold text-green-900 mt-3 mb-2">✉️ Objet :</p>
                    <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                      Demande de suppression de données
                    </code>
                    
                    <p className="font-semibold text-green-900 mt-3 mb-2">📝 Informations à inclure :</p>
                    <ul className="list-disc list-inside text-green-800 text-sm space-y-1">
                      <li>L'email de votre compte Wendogo</li>
                      <li>Confirmation que vous souhaitez supprimer toutes vos données</li>
                      <li>Motif de suppression (optionnel)</li>
                    </ul>
                  </div>
                  
                  <div className="flex items-center gap-2 text-green-700">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm font-medium">Réponse sous 72h maximum</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Méthode 2 : Contact */}
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 mb-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">2</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <MessageCircle className="w-5 h-5 text-orange-600" />
                    <h4 className="font-bold text-orange-900 text-lg">Via notre formulaire de contact</h4>
                  </div>
                  <p className="text-orange-800 mb-4">
                    Utilisez notre formulaire de contact en précisant votre demande :
                  </p>
                  
                  <a href="/contact" 
                     className="inline-flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
                    Accéder au formulaire de contact
                  </a>
                </div>
              </div>
            </div>

            {/* Méthode 3 : Depuis votre compte */}
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">3</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <Shield className="w-5 h-5 text-purple-600" />
                    <h4 className="font-bold text-purple-900 text-lg">Depuis votre compte Wendogo</h4>
                  </div>
                  <p className="text-purple-800 mb-4">
                    Connectez-vous à votre compte et accédez aux paramètres de confidentialité :
                  </p>
                  
                  <div className="space-y-2 text-purple-800 text-sm">
                    <p>1. Connectez-vous → Dashboard → Paramètres</p>
                    <p>2. Section "Confidentialité et données"</p>
                    <p>3. Cliquez sur "Supprimer mon compte et mes données"</p>
                  </div>
                  
                  <a href="/dashboard" 
                     className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors mt-3">
                    Accéder à mon dashboard
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Informations sur le processus */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">
              Ce qui sera supprimé
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Données de compte :</h4>
                <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                  <li>Nom, prénom, email</li>
                  <li>Numéro de téléphone</li>
                  <li>Date de naissance</li>
                  <li>Informations de connexion</li>
                  <li>Photo de profil</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Données d'utilisation :</h4>
                <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                  <li>Formations favorites</li>
                  <li>Historique de recherche</li>
                  <li>Préférences d'orientation</li>
                  <li>Messages et communications</li>
                  <li>Données de navigation</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Délais et informations importantes */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">
              Délais et informations importantes
            </h3>
            
            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Délai de traitement</h4>
                  <p className="text-gray-700 text-sm">
                    Votre demande sera traitée dans un délai maximum de <strong>30 jours</strong> 
                    conformément au RGPD.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Confirmation</h4>
                  <p className="text-gray-700 text-sm">
                    Vous recevrez une confirmation par email une fois la suppression effectuée.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Action irréversible</h4>
                  <p className="text-gray-700 text-sm">
                    La suppression est <strong>définitive</strong>. Vous ne pourrez pas récupérer 
                    vos données une fois supprimées.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Shield className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Données anonymisées</h4>
                  <p className="text-gray-700 text-sm">
                    Seules les données statistiques anonymisées (sans lien avec votre identité) 
                    peuvent être conservées.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact pour questions */}
          <div className="text-center mt-8">
            <p className="text-gray-600 mb-4">
              Des questions sur la suppression de vos données ?
            </p>
            <a href="mailto:hello@wendogo.com" 
               className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Mail className="w-4 h-4" />
              Contactez notre équipe confidentialité
            </a>
          </div>
          
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default DataDeletionInstructions;
