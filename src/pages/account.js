// src/pages/account.js - Version corrigée avec validation et debug

import React, { useState, useEffect, startTransition } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  Save, 
  AlertTriangle,
  Eye,
  EyeOff,
  Trash2 
} from 'lucide-react';
import NavBar from '../components/NavBar';
import CountrySelector from '../components/CountrySelector';
import { REST_API_PARAMS } from '../utils/Constants';
//import { trackAccount } from '../lib/gtag'; // ✅ NOUVEAU: Import du tracker

const AccountPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    phone: '',
    birthdate: '',
    country: '',
  });
  const [originalData, setOriginalData] = useState({}); // ✅ Pour détecter les changements
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [showDeleteSection, setShowDeleteSection] = useState(false);

  useEffect(() => {
    if (status === 'loading') return;
    
    if (!session) {
      startTransition(() => {
        router.push('/');
      });
    }
  }, [session, status, router]);

  useEffect(() => {
    if (session?.user) {
      loadUserProfile();
    }
  }, [session]);

  const loadUserProfile = async () => {
    try {
      console.log('🔍 Chargement du profil utilisateur...');
      console.log('Session token:', session?.accessToken ? 'Présent' : 'Manquant');
      
      const response = await fetch(`${REST_API_PARAMS.baseUrl}/api/user/profile`, {
        headers: {
          'Authorization': `Bearer ${session.accessToken}`,
        },
      });

      console.log('📡 Réponse loadUserProfile:', response.status, response.statusText);

      if (response.ok) {
        const data = await response.json();
        console.log('✅ Données utilisateur reçues:', data);
        
        setUser(data.user);
        const userData = {
          firstname: data.user.firstname || '',
          lastname: data.user.lastname || '',
          phone: data.user.phone || '',
          birthdate: data.user.birthdate ? data.user.birthdate.split('T')[0] : '',
          country: data.user.country || '',
        };
        //trackAccount('AccountPage', userData.firstname +' '+userData.lastname);
        setFormData(userData);
        setOriginalData(userData); // ✅ Sauvegarder les données originales
      } else {
        const errorData = await response.text();
        console.error('❌ Erreur response:', errorData);
        setMessage({ type: 'error', text: 'Erreur lors du chargement du profil' });
      }
    } catch (error) {
      console.error('❌ Erreur loadUserProfile:', error);
      setMessage({ type: 'error', text: 'Erreur lors du chargement du profil' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Effacer le message lors de la modification
    if (message.text) {
      setMessage({ type: '', text: '' });
    }
  };

  // ✅ Fonction pour détecter les changements
  const hasChanges = () => {
    return Object.keys(formData).some(key => formData[key] !== originalData[key]);
  };

  // ✅ Validation des données avant envoi
  const validateFormData = () => {
    const errors = [];

    if (!formData.firstname?.trim()) {
      errors.push('Le prénom est requis');
    }

    if (!formData.lastname?.trim()) {
      errors.push('Le nom est requis');
    }

    if (formData.phone && !/^[\+]?[\d\s\-\(\)]{10,}$/.test(formData.phone)) {
      errors.push('Le format du téléphone est invalide');
    }

    if (formData.birthdate) {
      const birthDate = new Date(formData.birthdate);
      const minDate = new Date();
      minDate.setFullYear(minDate.getFullYear() - 13);
      
      if (birthDate > minDate) {
        errors.push('Vous devez avoir au moins 13 ans');
      }
    }

    return errors;
  };

  const handleSave = async () => {
    // ✅ Vérifier s'il y a des changements
    if (!hasChanges()) {
      setMessage({ type: 'info', text: 'Aucune modification détectée' });
      return;
    }

    // ✅ Valider les données
    const validationErrors = validateFormData();
    if (validationErrors.length > 0) {
      setMessage({ type: 'error', text: validationErrors[0] });
      return;
    }

    setIsSaving(true);
    setMessage({ type: '', text: '' });

    try {
      console.log('💾 Début sauvegarde...');
      console.log('📤 Données à envoyer:', formData);
      console.log('🔑 Token session:', session?.accessToken ? 'Présent' : 'Manquant');

      const response = await fetch(`${REST_API_PARAMS.baseUrl}/api/user/profile`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.accessToken}`,
        },
        body: JSON.stringify(formData),
      });

      console.log('📡 Réponse sauvegarde:', response.status, response.statusText);

      if (response.ok) {
        const data = await response.json();
        console.log('✅ Données sauvegardées:', data);
        
        setUser(data.user);
        setOriginalData(formData); // ✅ Mettre à jour les données originales
        setMessage({ type: 'success', text: 'Profil mis à jour avec succès !' });
        
        // Effacer le message après 3 secondes
        setTimeout(() => {
          setMessage({ type: '', text: '' });
        }, 3000);
      } else {
        const errorData = await response.text();
        console.error('❌ Erreur response:', errorData);
        
        try {
          const errorJson = JSON.parse(errorData);
          setMessage({ type: 'error', text: errorJson.message || 'Erreur lors de la mise à jour' });
        } catch {
          setMessage({ type: 'error', text: 'Erreur serveur lors de la mise à jour' });
        }
      }
    } catch (error) {
      console.error('❌ Erreur handleSave:', error);
      setMessage({ type: 'error', text: 'Erreur de connexion au serveur' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteAccount = () => {
    router.push('/data-deletion-instructions');
  };

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* En-tête */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Mon compte</h1>
            <p className="text-gray-600">Gérez vos informations personnelles</p>
          </div>

          {/* Message de feedback */}
          {message.text && (
            <div className={`mb-6 p-4 rounded-lg ${
              message.type === 'success' 
                ? 'bg-green-50 border border-green-200 text-green-800' 
                : message.type === 'info'
                ? 'bg-blue-50 border border-blue-200 text-blue-800'
                : 'bg-red-50 border border-red-200 text-red-800'
            }`}>
              <p className="font-medium">{message.text}</p>
            </div>
          )}

          {/* Formulaire principal */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Informations personnelles</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Prénom */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <User className="w-4 h-4 inline mr-2" />
                  Prénom *
                </label>
                <input
                  type="text"
                  value={formData.firstname}
                  onChange={(e) => handleInputChange('firstname', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Votre prénom"
                  required
                />
              </div>

              {/* Nom */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <User className="w-4 h-4 inline mr-2" />
                  Nom *
                </label>
                <input
                  type="text"
                  value={formData.lastname}
                  onChange={(e) => handleInputChange('lastname', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Votre nom"
                  required
                />
              </div>

              {/* Email (non modifiable) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Mail className="w-4 h-4 inline mr-2" />
                  Adresse email
                </label>
                <input
                  type="email"
                  value={user?.email || ''}
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
                />
                <p className="text-xs text-gray-500 mt-1">
                  L'adresse mail n'est pas modifiable depuis l'espace client, veuillez contacter le support.
                </p>
              </div>

              {/* Téléphone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Phone className="w-4 h-4 inline mr-2" />
                  Téléphone
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="+33 6 12 34 56 78"
                />
              </div>

              {/* Date de naissance */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 inline mr-2" />
                  Date de naissance
                </label>
                <input
                  type="date"
                  value={formData.birthdate}
                  onChange={(e) => handleInputChange('birthdate', e.target.value)}
                  max={new Date(new Date().setFullYear(new Date().getFullYear() - 13)).toISOString().split('T')[0]}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Pays */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  🌍 Pays de résidence
                </label>
                <CountrySelector
                  value={formData.country}
                  onChange={(countryCode) => handleInputChange('country', countryCode)}
                  placeholder="Sélectionnez votre pays"
                  className="text-left"
                />
              </div>
            </div>

            {/* Bouton de sauvegarde */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button
                    onClick={handleSave}
                    disabled={isSaving || !hasChanges()}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-colors font-medium ${
                      hasChanges() && !isSaving
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {isSaving ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    ) : (
                      <Save className="w-4 h-4" />
                    )}
                    {isSaving ? 'Enregistrement...' : 'Enregistrer les modifications'}
                  </button>
                  
                  {hasChanges() && (
                    <span className="text-sm text-amber-600 font-medium">
                      ⚠️ Modifications non sauvegardées
                    </span>
                  )}
                </div>
                
                {hasChanges() && (
                  <button
                    onClick={() => {
                      setFormData(originalData);
                      setMessage({ type: '', text: '' });
                    }}
                    className="text-sm text-gray-600 hover:text-gray-800 underline"
                  >
                    Annuler les modifications
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Section de suppression de compte */}
          <div className="bg-white rounded-lg shadow-sm border border-red-200 p-6">
            <div className="space-y-4">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-red-900 mb-2">Suppression du compte</h3>
                      <p className="text-sm text-red-700 mb-4">
                        Cette action est irréversible. Toutes vos données (favoris, historique, etc.) seront définitivement supprimées.
                      </p>
                      <button
                        onClick={handleDeleteAccount}
                        className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                      >
                        <Trash2 className="w-4 h-4" />
                        Demander la suppression de mon compte
                      </button>
                    </div>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
