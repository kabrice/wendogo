// src/pages/admin/password-manager.js - Interface de gestion mot de passe admin

import React, { useState, useEffect } from 'react';
import { REST_API_PARAMS } from '../../utils/Constants';
import { 
  Shield, 
  Key, 
  Mail, 
  RefreshCw, 
  CheckCircle, 
  AlertTriangle,
  Clock,
  Lock,
  User,
  Settings,
  Eye,
  EyeOff,
  Copy,
  Send,
  AlertCircle,
  UserCheck,
  History
} from 'lucide-react';
import { useRouter } from 'next/router';

const AdminPasswordManager = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [lastAction, setLastAction] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [generatedPassword, setGeneratedPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [adminStatus, setAdminStatus] = useState(null);
  const [securityLogs, setSecurityLogs] = useState([]);

  useEffect(() => {
    checkAccess();
  }, []);

  const checkAccess = async () => {
    try {
      // Vérifier si l'accès est autorisé (basé sur l'email ou token spécial)
      const params = new URLSearchParams(window.location.search);
      const accessToken = params.get('token');
      const emailParam = params.get('email');

      if (emailParam === 'briceouabo@gmail.com' || accessToken) {
        // Vérifier le token si fourni
        if (accessToken) {
          const response = await fetch(`${REST_API_PARAMS.baseUrl}/api/admin/password-manager/verify-access`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'
        //                 'Access-Control-Allow-Origin': '*',
        // 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
        // 'Access-Control-Request-Method': 'GET, POST, DELETE, PUT, OPTIONS'
            },
            
            body: JSON.stringify({ token: accessToken, email: emailParam })
          });

          if (response.ok) {
            setIsAuthenticated(true);
            setEmail(emailParam || 'briceouabo@gmail.com');
            await fetchAdminStatus();
          } else {
            setError('Token d\'accès invalide ou expiré');
          }
        } else {
          // Accès direct avec email - nécessite validation
          setEmail(emailParam);
          await sendAccessToken(emailParam);
        }
      } else {
        setError('Accès non autorisé - Réservé à briceouabo@gmail.com');
      }
    } catch (error) {
      console.error('Erreur vérification accès:', error);
      setError('Erreur lors de la vérification des droits d\'accès');
    } finally {
      setIsLoading(false);
    }
  };

  const sendAccessToken = async (email) => {
    try {
      const response = await fetch(`${REST_API_PARAMS.baseUrl}/api/admin/password-manager/request-access`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      if (response.ok) {
        setSuccess('Un lien d\'accès sécurisé a été envoyé à votre email');
      } else {
        setError('Erreur lors de l\'envoi du lien d\'accès');
      }
    } catch (error) {
      setError('Erreur lors de la demande d\'accès');
    }
  };

  const fetchAdminStatus = async () => {
    try {
      const response = await fetch(`${REST_API_PARAMS.baseUrl}/api/admin/password-manager/status`)
      if (response.ok) {
        const data = await response.json();
        setAdminStatus(data.admin);
        setSecurityLogs(data.recentLogs || []);
      }
    } catch (error) {
      console.error('Erreur récupération statut:', error);
    }
  };

  const generateNewPassword = async () => {
    setIsGenerating(true);
    setError('');   
    setSuccess('');

    try {
      const response = await fetch(`${REST_API_PARAMS.baseUrl}/api/admin/password-manager/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          requestedBy: email,
          action: 'generate_new_password'
        })
      });

      const data = await response.json();

      if (response.ok) {
        setGeneratedPassword(data.password);
        setSuccess('Nouveau mot de passe généré et envoyé par email !');
        setLastAction({
          type: 'generate',
          timestamp: new Date().toISOString(),
          password: data.password
        });
        await fetchAdminStatus();
      } else {
        setError(data.error || 'Erreur lors de la génération');
      }
    } catch (error) {
      setError('Erreur de connexion au serveur');
    } finally {
      setIsGenerating(false);
    }
  };

  const resetToInitialPassword = async () => {
    setIsGenerating(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch(`${REST_API_PARAMS.baseUrl}/api/admin/password-manager/reset`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          requestedBy: email,
          action: 'reset_to_initial'
        })
      });

      const data = await response.json();

      if (response.ok) {
        setGeneratedPassword(data.password);
        setSuccess('Mot de passe réinitialisé et envoyé par email !');
        setLastAction({
          type: 'reset',
          timestamp: new Date().toISOString(),
          password: data.password
        });
        await fetchAdminStatus();
      } else {
        setError(data.error || 'Erreur lors de la réinitialisation');
      }
    } catch (error) {
      setError('Erreur de connexion au serveur');
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setSuccess('Mot de passe copié dans le presse-papier');
    setTimeout(() => setSuccess(''), 3000);
  };

  const revokeAdminSessions = async () => {
    try {
      const response = await fetch(`${REST_API_PARAMS.baseUrl}/api/admin/password-manager/revoke-sessions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ requestedBy: email })
      });

      if (response.ok) {
        setSuccess('Toutes les sessions admin ont été révoquées');
        await fetchAdminStatus();
      } else {
        setError('Erreur lors de la révocation des sessions');
      }
    } catch (error) {
      setError('Erreur de connexion');
    }
  };

  // Écran de chargement
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Vérification des autorisations...</p>
        </div>
      </div>
    );
  }

  // Écran d'accès en attente
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 to-indigo-900 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-xl shadow-2xl p-8 text-center">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Mail className="w-10 h-10 text-blue-600" />
            </div>
            
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Gestion Mot de Passe Admin
            </h1>
            
            {error ? (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-2 text-red-800">
                  <AlertCircle className="w-5 h-5" />
                  <span className="font-medium">{error}</span>
                </div>
              </div>
            ) : success ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-2 text-green-800">
                  <CheckCircle className="w-5 h-5" />
                  <div>
                    <p className="font-medium">{success}</p>
                    <p className="text-sm mt-1">Vérifiez votre boîte email et cliquez sur le lien sécurisé</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-blue-800">
                  Accès réservé à <strong>briceouabo@gmail.com</strong>
                </p>
                <p className="text-blue-600 text-sm mt-1">
                  Un lien de vérification va être envoyé à votre email
                </p>
              </div>
            )}
            
            <button
              onClick={() => router.push('/')}
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              ← Retour à l'accueil
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Interface principale de gestion
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-indigo-900">
      {/* Header */}
      ...

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Messages de feedback */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2 text-red-800">
              <AlertTriangle className="w-5 h-5" />
              <span>{error}</span>
            </div>
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2 text-green-800">
              <CheckCircle className="w-5 h-5" />
              <span>{success}</span>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Actions principales */}
          <div className="lg:col-span-2 space-y-6">
            {/* Statut admin */}
            {adminStatus && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Statut du Compte Admin
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Email Admin</p>
                    <p className="font-medium">{adminStatus.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Dernière connexion</p>
                    <p className="font-medium">
                      {adminStatus.last_login ? 
                        new Date(adminStatus.last_login).toLocaleString('fr-FR') : 
                        'Jamais'
                      }
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Sessions actives</p>
                    <p className="font-medium">{adminStatus.active_sessions || 0}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Mot de passe configuré</p>
                    <div className="flex items-center gap-2">
                      {adminStatus.has_password ? (
                        <>
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="text-green-600 font-medium">Oui</span>
                        </>
                      ) : (
                        <>
                          <AlertTriangle className="w-4 h-4 text-red-600" />
                          <span className="text-red-600 font-medium">Non</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Actions de gestion */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Actions de Gestion
              </h2>

              <div className="space-y-4">
                {/* Générer nouveau mot de passe */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-medium text-gray-900 flex items-center gap-2">
                        <RefreshCw className="w-4 h-4" />
                        Générer un nouveau mot de passe
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Crée un mot de passe sécurisé et l'envoie par email
                      </p>
                    </div>
                  </div>
                  
                  <button
                    onClick={generateNewPassword}
                    disabled={isGenerating}
                    className="w-full py-3 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                  >
                    {isGenerating ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>Génération en cours...</span>
                      </>
                    ) : (
                      <>
                        <Key className="w-4 h-4" />
                        <span>Générer un nouveau mot de passe</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Réinitialiser */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-medium text-gray-900 flex items-center gap-2">
                        <Lock className="w-4 h-4" />
                        Réinitialiser le mot de passe
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Remet un mot de passe par défaut sécurisé
                      </p>
                    </div>
                  </div>
                  
                  <button
                    onClick={resetToInitialPassword}
                    disabled={isGenerating}
                    className="w-full py-3 px-4 bg-orange-600 text-white font-medium rounded-lg hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                  >
                    {isGenerating ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>Réinitialisation en cours...</span>
                      </>
                    ) : (
                      <>
                        <RefreshCw className="w-4 h-4" />
                        <span>Réinitialiser le mot de passe</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Révoquer sessions */}
                <div className="border border-red-200 rounded-lg p-4 bg-red-50">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-medium text-red-900 flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4" />
                        Révoquer toutes les sessions admin
                      </h3>
                      <p className="text-sm text-red-600 mt-1">
                        Force la déconnexion de toutes les sessions actives
                      </p>
                    </div>
                  </div>
                  
                  <button
                    onClick={revokeAdminSessions}
                    className="w-full py-3 px-4 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <AlertTriangle className="w-4 h-4" />
                    <span>Révoquer toutes les sessions</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Dernier mot de passe généré */}
            {lastAction && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Dernière Action
                </h2>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="font-medium text-gray-900">
                        {lastAction.type === 'generate' ? 'Nouveau mot de passe généré' : 'Mot de passe réinitialisé'}
                      </p>
                      <p className="text-sm text-gray-600">
                        {new Date(lastAction.timestamp).toLocaleString('fr-FR')}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={lastAction.password}
                      readOnly
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-white font-mono"
                    />
                    <button
                      onClick={() => setShowPassword(!showPassword)}
                      className="p-2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => copyToClipboard(lastAction.password)}
                      className="p-2 text-blue-600 hover:text-blue-800"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar avec logs de sécurité */}
          <div className="space-y-6">
            {/* Logs de sécurité récents */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <History className="w-5 h-5" />
                Logs Récents
              </h2>
              
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {securityLogs.length > 0 ? (
                  securityLogs.slice(0, 10).map((log, index) => (
                    <div key={index} className="text-sm border-l-2 border-gray-200 pl-3">
                      <p className="font-medium text-gray-900">{log.event_type}</p>
                      <p className="text-gray-600">{log.ip_address}</p>
                      <p className="text-gray-500 text-xs">
                        {new Date(log.timestamp).toLocaleString('fr-FR')}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">Aucun log récent</p>
                )}
              </div>
            </div>

            {/* Informations de sécurité */}
            <div className="bg-blue-50 rounded-xl border border-blue-200 p-6">
              <h3 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Sécurité
              </h3>
              
              <div className="space-y-2 text-sm text-blue-800">
                <p>• Mots de passe générés avec 16+ caractères</p>
                <p>• Chiffrement bcrypt avec salt</p>
                <p>• Envoi sécurisé par email</p>
                <p>• Logs de toutes les actions</p>
                <p>• Accès restreint à briceouabo@gmail.com</p>
              </div>
            </div>

            {/* Liens rapides */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Liens Rapides</h3>
              
              <div className="space-y-2">
                <a
                  href="/admin"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-2 px-3 text-center bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Interface Admin
                </a>
                <button
                  onClick={() => window.location.reload()}
                  className="block w-full py-2 px-3 text-center bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                >
                  Actualiser
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPasswordManager;
