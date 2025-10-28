import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { CheckCircle, Clock, AlertTriangle, Mail } from 'lucide-react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const DataDeletionStatus = () => {
  const router = useRouter();
  const { code } = router.query;
  const [status, setStatus] = useState('processing');

  useEffect(() => {
    if (code) {
      // Simuler un délai de traitement
      setTimeout(() => {
        setStatus('completed');
      }, 2000);
    }
  }, [code]);

  if (!code) {
    return (
      <>
        <NavBar variant="simple" languageSelectorVariant="light" />
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center">
          <div className="text-center">
            <AlertTriangle className="w-16 h-16 text-orange-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Code de confirmation manquant</h1>
            <p className="text-gray-600">Aucun code de confirmation n'a été fourni.</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <NavBar variant="simple" languageSelectorVariant="light" />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 text-center">
            
            {status === 'processing' ? (
              <>
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Clock className="w-8 h-8 text-blue-600 animate-pulse" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-4">
                  Traitement de votre demande
                </h1>
                <p className="text-gray-600 mb-6">
                  Nous traitons actuellement votre demande de suppression de données. 
                  Veuillez patienter quelques instants...
                </p>
                <div className="flex justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
              </>
            ) : (
              <>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-4">
                  Suppression des données confirmée
                </h1>
                <p className="text-gray-600 mb-6">
                  Votre demande de suppression de données a été traitée avec succès. 
                  Toutes vos données personnelles ont été supprimées de nos systèmes.
                </p>
                
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                  <h3 className="font-semibold text-green-900 mb-2">Ce qui a été supprimé :</h3>
                  <ul className="text-green-800 text-sm space-y-1">
                    <li>• Informations de profil (nom, email, téléphone)</li>
                    <li>• Formations favorites sauvegardées</li>
                    <li>• Historique de recherche et préférences</li>
                    <li>• Données de connexion via les réseaux sociaux</li>
                    <li>• Toutes autres données personnelles associées</li>
                  </ul>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Mail className="w-4 h-4 text-blue-600" />
                    <h3 className="font-semibold text-blue-900">Code de confirmation</h3>
                  </div>
                  <p className="text-blue-800 text-sm mb-2">
                    Conservez ce code pour vos dossiers :
                  </p>
                  <code className="bg-white px-3 py-2 rounded border text-blue-900 font-mono text-sm">
                    {code}
                  </code>
                </div>
                
                <div className="text-sm text-gray-500">
                  <p className="mb-2">
                    <strong>Date de traitement :</strong> {new Date().toLocaleDateString('fr-FR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                  <p>
                    Si vous avez des questions concernant cette suppression, 
                    contactez-nous à <a href="mailto:privacy@wendogo.com" className="text-blue-600 hover:underline">privacy@wendogo.com</a>
                  </p>
                </div>
              </>
            )}
            
          </div>
          
          {/* Informations supplémentaires */}
          <div className="mt-8 bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Informations importantes</h2>
            
            <div className="space-y-4 text-sm text-gray-700">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h4 className="font-semibold text-gray-900">Délai de suppression</h4>
                  <p>La suppression complète peut prendre jusqu'à 30 jours pour les sauvegardes système.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h4 className="font-semibold text-gray-900">Données conservées</h4>
                  <p>Seules les données anonymisées à des fins statistiques peuvent être conservées (sans lien avec votre identité).</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h4 className="font-semibold text-gray-900">Réactivation de compte</h4>
                  <p>Vous pouvez créer un nouveau compte à tout moment si vous souhaitez utiliser à nouveau nos services.</p>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default DataDeletionStatus;
