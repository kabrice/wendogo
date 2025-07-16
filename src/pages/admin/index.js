// src/pages/admin/index.js - Page admin avec gestion des messages de contact

import React, { useState, useEffect } from 'react';
import { REST_API_PARAMS } from '../../utils/Constants';
import FooterSingleRow from '../../components/FooterSingleRow';
import { 
  Users, 
  Building2, 
  TrendingUp, 
  Clock, 
  CheckCircle,
  AlertTriangle,
  Mail,
  Phone,
  Eye,
  Edit,
  Filter,
  Lock,
  Shield,
  LogOut,
  Key,
  AlertCircle,
  UserCheck,
  MessageSquare,
  Send,
  ExternalLink,
  Reply,
  Archive
} from 'lucide-react';
import { useRouter } from 'next/router';

// ✅ COMPOSANT DE LOGIN ADMIN (identique)
const AdminLogin = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);

  useEffect(() => {
    const blockUntil = localStorage.getItem('adminBlockUntil');
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (isBlocked) return;
    
    setIsLoading(true);
    setError('');

    try {
      if (credentials.email !== 'admin@wendogo.com') {
        throw new Error('Accès non autorisé');
      }

      const response = await fetch(`${REST_API_PARAMS.baseUrl}/api/admin/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        localStorage.setItem('adminToken', data.token);
        localStorage.setItem('adminSession', JSON.stringify({
          email: data.user.email,
          loginTime: new Date().toISOString(),
          expiresAt: new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString()
        }));
        localStorage.removeItem('adminAttempts');
        localStorage.removeItem('adminBlockUntil');
        
        onLogin(data.user);
      } else {
        throw new Error(data.error || 'Identifiants incorrects');
      }
    } catch (error) {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      localStorage.setItem('adminAttempts', newAttempts.toString());

      if (newAttempts >= 3) {
        const blockUntil = new Date(Date.now() + 30 * 60 * 1000);
        localStorage.setItem('adminBlockUntil', blockUntil.toISOString());
        setIsBlocked(true);
        setError('Trop de tentatives échouées. Accès bloqué pendant 30 minutes.');
        
        await fetch(`${REST_API_PARAMS.baseUrl}/api/admin/auth/security-alert`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'failed_login_attempts',
            email: credentials.email,
            attempts: newAttempts,
            ip: 'unknown',
            timestamp: new Date().toISOString()
          })
        });
      } else {
        setError(`${error.message} (Tentative ${newAttempts}/3)`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    if (credentials.email !== 'admin@wendogo.com') {
      setError('Seul admin@wendogo.com peut demander une réinitialisation');
      return;
    }

    try {
      await fetch(`${REST_API_PARAMS.baseUrl}/api/admin/auth/request-reset`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'briceouabo@gmail.com' })
      });
      
      setError('');
      alert('Demande de réinitialisation envoyée à briceouabo@gmail.com');
    } catch (error) {
      setError('Erreur lors de la demande de réinitialisation');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-10 h-10 text-red-600" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Admin Wendogo</h1>
          <p className="text-gray-300">Accès restreint - Autorisation requise</p>
        </div>

        <div className="bg-white rounded-xl shadow-2xl p-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Mail className="w-4 h-4 inline mr-2" />
                Adresse email autorisée
              </label>
              <input
                type="email"
                value={credentials.email}
                onChange={(e) => setCredentials({...credentials, email: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="admin@wendogo.com"
                required
                disabled={isBlocked}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Key className="w-4 h-4 inline mr-2" />
                Mot de passe
              </label>
              <input
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="••••••••"
                required
                disabled={isBlocked}
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <div className="flex items-center gap-2 text-red-800">
                  <AlertCircle className="w-4 h-4" />
                  <span className="text-sm">{error}</span>
                </div>
              </div>
            )}

            <button
              type="button"
              onClick={handleLogin}
              disabled={isLoading || isBlocked}
              className="w-full py-3 px-4 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Vérification...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <Lock className="w-4 h-4" />
                  <span>Accéder à l'admin</span>
                </div>
              )}
            </button>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={handlePasswordReset}
              className="text-sm text-blue-600 hover:text-blue-800 underline"
              disabled={isBlocked}
            >
              Mot de passe oublié ? (Contacte Brice)
            </button>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="text-xs text-gray-500 space-y-1">
              <p>🔒 Accès réservé à admin@wendogo.com</p>
              <p>⚠️ Tentatives de connexion surveillées</p>
              <p>📧 Mot de passe géré par briceouabo@gmail.com</p>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-400">
            ⚖️ Accès non autorisé strictement interdit - Article 323-1 du Code pénal
          </p>
        </div>
      </div>
    </div>
  );
};

// ✅ COMPOSANT PRINCIPAL ADMIN DASHBOARD AVEC MESSAGES CONTACT
const AdminDashboard = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminUser, setAdminUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  
  // États existants
  const [accompanyRequests, setAccompanyRequests] = useState([]);
  const [organizationContacts, setOrganizationContacts] = useState([]);
  
  // ✅ NOUVEAUX ÉTATS POUR LES MESSAGES DE CONTACT
  const [contactMessages, setContactMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [replyModal, setReplyModal] = useState(null);
  const [replyContent, setReplyContent] = useState('');
  
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [messageFilter, setMessageFilter] = useState('all');

  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const session = localStorage.getItem('adminSession');

      if (!token || !session) {
        setIsAuthenticated(false);
        setIsLoading(false);
        return;
      }

      const sessionData = JSON.parse(session);
      
      if (new Date() > new Date(sessionData.expiresAt)) {
        handleLogout();
        return;
      }

      const response = await fetch(`${REST_API_PARAMS.baseUrl}/api/admin/auth/verify`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setAdminUser(data.user);
        setIsAuthenticated(true);
        await fetchData();
      } else {
        handleLogout();
      }
    } catch (error) {
      console.error('Erreur vérification auth:', error);
      handleLogout();
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = (user) => {
    setAdminUser(user);
    setIsAuthenticated(true);
    fetchData();
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminSession');
    setIsAuthenticated(false);
    setAdminUser(null);
    router.push('/admin/login');
  };

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      
      // Récupérer les demandes d'accompagnement
      const accompanyResponse = await fetch(`${REST_API_PARAMS.baseUrl}/api/admin/accompany-requests`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (accompanyResponse.ok) {
        const accompanyData = await accompanyResponse.json();
        setAccompanyRequests(accompanyData.requests || []);
      }
      
      // Récupérer les contacts d'organismes
      const orgResponse = await fetch(`${REST_API_PARAMS.baseUrl}/api/admin/organization-contacts`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (orgResponse.ok) {
        const orgData = await orgResponse.json();
        setOrganizationContacts(orgData.contacts || []);
      }

      // ✅ NOUVEAU : Récupérer les messages de contact
      const contactResponse = await fetch(`${REST_API_PARAMS.baseUrl}/api/admin/contact-messages`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (contactResponse.ok) {
        const contactData = await contactResponse.json();
        setContactMessages(contactData.messages || []);
      }
      
    } catch (error) {
      console.error('Erreur lors du chargement des données:', error);
    }
  };

  // ✅ NOUVELLE FONCTION : Marquer un message comme lu
  const markMessageAsRead = async (messageId) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${REST_API_PARAMS.baseUrl}/api/admin/contact-messages/${messageId}/read`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        await fetchData();
      }
    } catch (error) {
      console.error('Erreur lors du marquage comme lu:', error);
    }
  };

  // ✅ NOUVELLE FONCTION : Répondre à un message
  const sendReply = async (messageId, replyText) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${REST_API_PARAMS.baseUrl}/api/admin/contact-messages/${messageId}/reply`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ reply: replyText })
      });

      if (response.ok) {
        setReplyModal(null);
        setReplyContent('');
        await fetchData();
        alert('Réponse envoyée avec succès !');
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi de la réponse:', error);
      alert('Erreur lors de l\'envoi de la réponse');
    }
  };

  const updateRequestStatus = async (requestId, newStatus) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${REST_API_PARAMS.baseUrl}/api/admin/accompany-requests/${requestId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        await fetchData();
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { color: 'bg-yellow-100 text-yellow-800', label: 'En attente' },
      contacted: { color: 'bg-blue-100 text-blue-800', label: 'Contacté' },
      in_progress: { color: 'bg-purple-100 text-purple-800', label: 'En cours' },
      completed: { color: 'bg-green-100 text-green-800', label: 'Terminé' },
      cancelled: { color: 'bg-red-100 text-red-800', label: 'Annulé' },
      // ✅ NOUVEAUX STATUTS POUR LES MESSAGES
      new: { color: 'bg-red-100 text-red-800', label: 'Nouveau' },
      read: { color: 'bg-gray-100 text-gray-800', label: 'Lu' },
      replied: { color: 'bg-green-100 text-green-800', label: 'Répondu' },
      archived: { color: 'bg-gray-100 text-gray-600', label: 'Archivé' }
    };

    const config = statusConfig[status] || statusConfig.pending;
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const getUrgencyBadge = (urgency) => {
    const urgencyConfig = {
      normal: { color: 'bg-gray-100 text-gray-800', label: 'Normal' },
      urgent: { color: 'bg-orange-100 text-orange-800', label: 'Urgent' },
      very_urgent: { color: 'bg-red-100 text-red-800', label: 'Très urgent' }
    };

    const config = urgencyConfig[urgency] || urgencyConfig.normal;
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  // ✅ NOUVEAU : Badge pour type de projet
  const getProjectTypeBadge = (projectType) => {
    const typeConfig = {
      orientation: { color: 'bg-blue-100 text-blue-800', label: 'Orientation', icon: '🎓' },
      visa: { color: 'bg-green-100 text-green-800', label: 'Visa étudiant', icon: '📋' },
      'campus-france': { color: 'bg-purple-100 text-purple-800', label: 'Campus France', icon: '🏛️' },
      parcoursup: { color: 'bg-orange-100 text-orange-800', label: 'Parcoursup', icon: '📚' },
      logement: { color: 'bg-yellow-100 text-yellow-800', label: 'Logement', icon: '🏠' },
      general: { color: 'bg-gray-100 text-gray-800', label: 'Question générale', icon: '❓' },
      other: { color: 'bg-gray-100 text-gray-800', label: 'Autre', icon: '📝' }
    };

    const config = typeConfig[projectType] || typeConfig.general;
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        {config.icon} {config.label}
      </span>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Vérification des autorisations...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  const filteredRequests = accompanyRequests.filter(request => 
    filterStatus === 'all' || request.status === filterStatus
  );

  // ✅ NOUVEAU : Filtrage des messages de contact
  const filteredMessages = contactMessages.filter(message => 
    messageFilter === 'all' || message.status === messageFilter
  );

  const stats = {
    totalRequests: accompanyRequests.length,
    pendingRequests: accompanyRequests.filter(r => r.status === 'pending').length,
    totalContacts: organizationContacts.length,
    newContacts: organizationContacts.filter(c => c.status === 'new').length,
    // ✅ NOUVELLES STATS POUR LES MESSAGES
    totalMessages: contactMessages.length,
    newMessages: contactMessages.filter(m => m.status === 'new').length,
    unreadMessages: contactMessages.filter(m => m.status === 'new' || m.status === 'read').length
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header sécurisé */}
      <div className="bg-white shadow-sm border-b border-red-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Admin Wendogo</h1>
                <p className="text-gray-600">Tableau de bord sécurisé</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1 bg-green-100 rounded-full">
                <UserCheck className="w-4 h-4 text-green-600" />
                <span className="text-sm text-green-800">{adminUser?.email}</span>
              </div>
              
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Déconnexion</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Bandeau de sécurité */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <div>
              <p className="text-sm font-medium text-red-800">Zone sécurisée</p>
              <p className="text-xs text-red-600">
                Accès limité à admin@wendogo.com - Toutes les actions sont journalisées
              </p>
            </div>
          </div>
        </div>

        {/* ✅ STATISTIQUES MISES À JOUR */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Demandes totales</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalRequests}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">En attente</p>
                <p className="text-2xl font-bold text-gray-900">{stats.pendingRequests}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Building2 className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Contacts organismes</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalContacts}</p>
              </div>
            </div>
          </div>

          {/* ✅ NOUVELLE CARTE : Messages de contact */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <MessageSquare className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Messages contact</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalMessages}</p>
              </div>
            </div>
          </div>

          {/* <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <Mail className="w-6 h-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Non lus</p>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold text-gray-900">{stats.newMessages}</p>
                  {stats.newMessages > 0 && (
                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                      Nouveau
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div> */}
        </div>

        {/* ✅ TABS MISES À JOUR */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('accompany')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'accompany'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Demandes d'accompagnement ({stats.totalRequests})
              </button>
              
              {/* ✅ NOUVEAU TAB : Messages de contact */}
              <button
                onClick={() => setActiveTab('contact-messages')}
                className={`py-4 px-1 border-b-2 font-medium text-sm relative ${
                  activeTab === 'contact-messages'
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Messages contact ({stats.totalMessages})
                {/* {stats.newMessages > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {stats.newMessages}
                  </span>
                )} */}
              </button>
              
              <button
                onClick={() => setActiveTab('organizations')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'organizations'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Contacts organismes ({stats.totalContacts})
              </button>
            </nav>
          </div>

          {/* Contenu des tabs */}
          <div className="p-6">
            {/* ✅ NOUVEAU TAB : Messages de contact */}
            {activeTab === 'contact-messages' && (
              <div>
                {/* Filtres */}
                <div className="mb-6 flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">Filtrer par statut :</span>
                  </div>
                  <select
                    value={messageFilter}
                    onChange={(e) => setMessageFilter(e.target.value)}
                    className="border border-gray-300 rounded-md px-3 py-1 text-sm"
                  >
                    <option value="all">Tous</option>
                    <option value="new">Nouveaux</option>
                    <option value="read">Lus</option>
                    <option value="replied">Répondus</option>
                    <option value="archived">Archivés</option>
                  </select>
                  
                  {stats.newMessages > 0 && (
                    <div className="ml-auto bg-red-50 border border-red-200 rounded-lg px-3 py-1">
                      <span className="text-sm text-red-800 font-medium">
                        {stats.newMessages} nouveau(x) message(s)
                      </span>
                    </div>
                  )}
                </div>

                {/* Liste des messages */}
                <div className="space-y-4">
                  {filteredMessages.map((message) => (
                    <div 
                      key={message.id} 
                      className={`border rounded-lg p-4 hover:shadow-md transition-shadow ${
                        message.status === 'new' ? 'border-red-200 bg-red-50' : 'border-gray-200'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-gray-900">
                              {message.subject}
                            </h3>
                            {getStatusBadge(message.status)}
                            {getProjectTypeBadge(message.project_type)}
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                            <div>
                              <p className="text-sm text-gray-600">
                                <strong>De :</strong> {message.name}
                              </p>
                              <p className="text-sm text-gray-600">
                                <strong>Email :</strong> 
                                <a href={`mailto:${message.email}`} className="text-blue-600 hover:underline ml-1">
                                  {message.email}
                                </a>
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">
                                <strong>Reçu le :</strong> {new Date(message.created_at).toLocaleDateString('fr-FR', {
                                  day: '2-digit',
                                  month: '2-digit', 
                                  year: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </p>
                              {message.replied_at && (
                                <p className="text-sm text-gray-600">
                                  <strong>Répondu le :</strong> {new Date(message.replied_at).toLocaleDateString('fr-FR')}
                                </p>
                              )}
                            </div>
                          </div>
                          
                          <div className="mb-3">
                            <p className="text-sm font-medium text-gray-700 mb-1">Message :</p>
                            <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                              {message.message.substring(0, 200)}
                              {message.message.length > 200 && '...'}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex flex-col gap-2 ml-4">
                          <button
                            onClick={() => {
                              setSelectedMessage(message);
                              if (message.status === 'new') markMessageAsRead(message.id);
                            }}
                            className="flex items-center gap-1 px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                          >
                            <Eye className="w-3 h-3" />
                            Voir
                          </button>
                          
                          <a
                            href={`mailto:${message.email}?subject=Re: ${message.subject}&body=Bonjour ${message.name},%0A%0AMerci pour votre message concernant votre projet d'études en France.%0A%0A`}
                            className="flex items-center gap-1 px-3 py-1 text-sm bg-green-100 text-green-700 rounded hover:bg-green-200"
                          >
                            <Mail className="w-3 h-3" />
                            Email
                          </a>
                          
                          <button
                            onClick={() => {
                              setReplyModal(message);
                              setReplyContent(`Bonjour ${message.name},\n\nMerci pour votre message concernant votre projet d'études en France.\n\n`);
                            }}
                            className="flex items-center gap-1 px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded hover:bg-purple-200"
                          >
                            <Reply className="w-3 h-3" />
                            Répondre
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {filteredMessages.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      Aucun message de contact trouvé.
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Tabs existants (accompany et organizations) - code identique */}
            {activeTab === 'accompany' && (
              <div>
                <div className="mb-6 flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">Filtrer par statut :</span>
                  </div>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="border border-gray-300 rounded-md px-3 py-1 text-sm"
                  >
                    <option value="all">Tous</option>
                    <option value="pending">En attente</option>
                    <option value="contacted">Contacté</option>
                    <option value="in_progress">En cours</option>
                    <option value="completed">Terminé</option>
                  </select>
                </div>

                <div className="space-y-4">
                  {filteredRequests.map((request) => (
                    <div key={request.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-gray-900">
                              {request.offer_name}
                            </h3>
                            {getStatusBadge(request.status)}
                            {getUrgencyBadge(request.urgency)}
                            <span className="text-sm font-medium text-green-600">
                              {request.price}€
                            </span>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                            <div>
                              <p className="text-sm text-gray-600">
                                <strong>Client :</strong> {request.user?.firstname} {request.user?.lastname}
                              </p>
                              <p className="text-sm text-gray-600">
                                <strong>Email :</strong> {request.user?.email}
                              </p>
                              <p className="text-sm text-gray-600">
                                <strong>Téléphone :</strong> {request.user?.phone || 'Non renseigné'}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">
                                <strong>Contact préféré :</strong> {request.preferred_contact}
                              </p>
                              <p className="text-sm text-gray-600">
                                <strong>Créé le :</strong> {new Date(request.created_at).toLocaleDateString('fr-FR')}
                              </p>
                            </div>
                          </div>
                          
                          <div className="mb-3">
                            <p className="text-sm font-medium text-gray-700 mb-1">Description du projet :</p>
                            <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                              {request.project_description.substring(0, 200)}
                              {request.project_description.length > 200 && '...'}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex flex-col gap-2 ml-4">
                          <button
                            onClick={() => setSelectedRequest(request)}
                            className="flex items-center gap-1 px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                          >
                            <Eye className="w-3 h-3" />
                            Voir
                          </button>
                          
                          {request.status === 'pending' && (
                            <button
                              onClick={() => updateRequestStatus(request.id, 'contacted')}
                              className="flex items-center gap-1 px-3 py-1 text-sm bg-green-100 text-green-700 rounded hover:bg-green-200"
                            >
                              <Phone className="w-3 h-3" />
                              Contacté
                            </button>
                          )}
                          
                          <select
                            value={request.status}
                            onChange={(e) => updateRequestStatus(request.id, e.target.value)}
                            className="text-xs border rounded px-2 py-1"
                          >
                            <option value="pending">En attente</option>
                            <option value="contacted">Contacté</option>
                            <option value="in_progress">En cours</option>
                            <option value="completed">Terminé</option>
                            <option value="cancelled">Annulé</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {filteredRequests.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      Aucune demande d'accompagnement trouvée.
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'organizations' && (
              <div>
                <div className="space-y-4">
                  {organizationContacts.map((contact) => (
                    <div key={contact.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-gray-900">
                              {contact.organization}
                            </h3>
                            {getStatusBadge(contact.status)}
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                            <div>
                              <p className="text-sm text-gray-600">
                                <strong>Contact :</strong> {contact.first_name} {contact.last_name}
                              </p>
                              <p className="text-sm text-gray-600">
                                <strong>Poste :</strong> {contact.position}
                              </p>
                              <p className="text-sm text-gray-600">
                                <strong>Email :</strong> {contact.email}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">
                                <strong>Créé le :</strong> {new Date(contact.created_at).toLocaleDateString('fr-FR')}
                              </p>
                            </div>
                          </div>
                          
                          <div className="mb-3">
                            <p className="text-sm font-medium text-gray-700 mb-1">Message :</p>
                            <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                              {contact.message.substring(0, 200)}
                              {contact.message.length > 200 && '...'}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex flex-col gap-2 ml-4">
                          <a
                            href={`mailto:${contact.email}`}
                            className="flex items-center gap-1 px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                          >
                            <Mail className="w-3 h-3" />
                            Email
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {organizationContacts.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      Aucun contact d'organisme trouvé.
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ✅ NOUVEAU : Modal pour voir un message de contact */}
      {selectedMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Message de contact</h2>
                <button
                  onClick={() => setSelectedMessage(null)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-3 mb-4">
                {getStatusBadge(selectedMessage.status)}
                {getProjectTypeBadge(selectedMessage.project_type)}
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Informations</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Nom :</span> {selectedMessage.name}
                  </div>
                  <div>
                    <span className="font-medium">Email :</span> 
                    <a href={`mailto:${selectedMessage.email}`} className="text-blue-600 hover:underline ml-1">
                      {selectedMessage.email}
                    </a>
                  </div>
                  <div>
                    <span className="font-medium">Sujet :</span> {selectedMessage.subject}
                  </div>
                  <div>
                    <span className="font-medium">Date :</span> {new Date(selectedMessage.created_at).toLocaleDateString('fr-FR')}
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Message complet</h3>
                <div className="bg-gray-50 p-4 rounded text-sm whitespace-pre-wrap">
                  {selectedMessage.message}
                </div>
              </div>
              
              <div className="flex gap-3 pt-4">
                <a
                  href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}&body=Bonjour ${selectedMessage.name},%0A%0AMerci pour votre message concernant votre projet d'études en France.%0A%0A`}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  <Mail className="w-4 h-4" />
                  Répondre par email
                </a>
                
                <button
                  onClick={() => {
                    setReplyModal(selectedMessage);
                    setReplyContent(`Bonjour ${selectedMessage.name},\n\nMerci pour votre message concernant votre projet d'études en France.\n\n`);
                    setSelectedMessage(null);
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  <Reply className="w-4 h-4" />
                  Réponse rapide
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ✅ NOUVEAU : Modal de réponse rapide */}
      {replyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Répondre à {replyModal.name}</h2>
                <button
                  onClick={() => {
                    setReplyModal(null);
                    setReplyContent('');
                  }}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="bg-gray-50 p-4 rounded">
                <h3 className="font-semibold text-gray-900 mb-2">Message original :</h3>
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Sujet :</strong> {replyModal.subject}
                </p>
                <p className="text-sm text-gray-600">
                  {replyModal.message.substring(0, 200)}...
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Votre réponse :
                </label>
                <textarea
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  rows="8"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Tapez votre réponse ici..."
                />
              </div>
              
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => sendReply(replyModal.id, replyContent)}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                  disabled={!replyContent.trim()}
                >
                  <Send className="w-4 h-4" />
                  Envoyer la réponse
                </button>
                
                <button
                  onClick={() => {
                    setReplyModal(null);
                    setReplyContent('');
                  }}
                  className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
                >
                  Annuler
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de détail pour accompany requests (existant) */}
      {selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Détails de la demande</h2>
                <button
                  onClick={() => setSelectedRequest(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Informations générales</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Offre :</span> {selectedRequest.offer_name}
                  </div>
                  <div>
                    <span className="font-medium">Prix :</span> {selectedRequest.price}€
                  </div>
                  <div>
                    <span className="font-medium">Urgence :</span> {selectedRequest.urgency}
                  </div>
                  <div>
                    <span className="font-medium">Contact préféré :</span> {selectedRequest.preferred_contact}
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Description du projet</h3>
                <div className="bg-gray-50 p-3 rounded text-sm">
                  {selectedRequest.project_description}
                </div>
              </div>
              
              {selectedRequest.additional_info && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Informations supplémentaires</h3>
                  <div className="bg-gray-50 p-3 rounded text-sm">
                    {selectedRequest.additional_info}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      <FooterSingleRow />
    </div>
  );
};

export default AdminDashboard;
