// src/pages/dashboard.js - Version avec questions forum

import React, { useState, useEffect, startTransition } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { REST_API_PARAMS } from '../utils/Constants';
import OptimizedImage from '../components/OptimizedImage';
import FooterSingleRow from '../components/FooterSingleRow';
import { 
  TrendingUp, 
  Eye, 
  EyeOff, 
  Heart, 
  BookOpen, 
  Calendar,
  User,
  Award,
  GraduationCap,
  Shield,
  MapPin,
  Clock,
  CheckCircle,
  AlertCircle,
  Phone,
  MessageSquare,
  ArrowRight,
  Sparkles,
  ThumbsUp,
  MessageCircle
} from 'lucide-react';
import NavBar from '../components/NavBar';
import SubdomainApi from '../store/apis/subdomainApi';

const Dashboard = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [dashboard, setDashboard] = useState(null);
  const [domainNames, setDomainNames] = useState({});
  const [showAllDomains, setShowAllDomains] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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
      loadDashboard();
    }
  }, [session]);

  useEffect(() => {
    if (dashboard?.domain_preferences) {
      fetchDomainNames(dashboard.domain_preferences);
    }
  }, [dashboard]);

  const loadDashboard = async () => {
    try {
      const response = await fetch(`${REST_API_PARAMS.baseUrl}/api/user/dashboard`, {
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.accessToken}`
          },
      });

      if (response.ok) {
        const data = await response.json();
        console.log('📊 Dashboard chargé:', data);
        setDashboard(data.dashboard);
      }
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchDomainNames = async (domainPreferences) => {
    try {
      const subdomainIds = domainPreferences
        .map(pref => pref.subdomain_id)
        .filter(Boolean);
      
      if (subdomainIds.length === 0) {
        setDomainNames({});
        return;
      }

      const response = await SubdomainApi.getSubdomainsFromIds(subdomainIds);
      
      if (response.success) {
        const nameMapping = {};
        response.data.forEach(subdomain => {
          nameMapping[subdomain.id] = subdomain.name;
        });
        setDomainNames(nameMapping);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des noms de domaines:', error);
      setDomainNames({});
    }
  };

  // ✅ NOUVEAU: Composant pour les questions du forum
  const ForumQuestions = ({ userQuestions = [] }) => {
    const CATEGORIES = {
      'orientation': { label: 'Orientation', icon: '🎯' },
      'visa': { label: 'Visa', icon: '📝' },
      'logement': { label: 'Logement', icon: '🏠' },
      'finance': { label: 'Finance', icon: '💰' },
      'vie-etudiante': { label: 'Vie étudiante', icon: '🎓' },
      'emploi': { label: 'Emploi', icon: '💼' },
      'autres': { label: 'Autres', icon: '💬' }
    };

    if (!userQuestions || userQuestions.length === 0) {
      return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <MessageSquare className="w-6 h-6 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Mes questions</h3>
          </div>
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="w-8 h-8 text-blue-600" />
            </div>
            <p className="text-gray-500 mb-4">Aucune question posée</p>
            <p className="text-sm text-gray-400 mb-6">
              Posez vos questions sur les études en France et obtenez des réponses de la communauté
            </p>
            <a 
              href="/forum"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
            >
              <MessageSquare className="w-4 h-4" />
              Poser une question
            </a>
          </div>
        </div>
      );
    }

    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <MessageSquare className="w-6 h-6 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Mes questions</h3>
          </div>
          <a 
            href="/forum"
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            Voir toutes
          </a>
        </div>

        <div className="space-y-4">
          {userQuestions.slice(0, 3).map((question) => {
            const categoryInfo = CATEGORIES[question.category] || { icon: '💬', label: question.category };
            
            return (
              <div 
                key={question.id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => router.push(`/forum/${question.id}/${question.slug}`)}
              >
                <h4 className="font-medium text-gray-900 line-clamp-2 mb-2">
                  {question.title}
                </h4>
                
                <div className="flex items-center gap-3 mb-2">
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">
                    {categoryInfo.icon} {categoryInfo.label}
                  </span>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <ThumbsUp className="w-4 h-4" />
                    {question.likes_count}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="w-4 h-4" />
                    {question.answers_count}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    {question.views_count}
                  </span>
                  <span className="flex items-center gap-1 ml-auto">
                    <Clock className="w-4 h-4" />
                    {new Date(question.created_at).toLocaleDateString('fr-FR')}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Composant existant pour les demandes d'accompagnement
  const AccompanyRequests = ({ accompanyRequests = [] }) => {
    const getStatusConfig = (status) => {
      const configs = {
        pending: { 
          color: 'bg-yellow-100 text-yellow-800 border-yellow-200', 
          label: 'En attente', 
          icon: Clock 
        },
        contacted: { 
          color: 'bg-blue-100 text-blue-800 border-blue-200', 
          label: 'Contacté', 
          icon: Phone 
        },
        in_progress: { 
          color: 'bg-purple-100 text-purple-800 border-purple-200', 
          label: 'En cours', 
          icon: TrendingUp 
        },
        completed: { 
          color: 'bg-green-100 text-green-800 border-green-200', 
          label: 'Terminé', 
          icon: CheckCircle 
        },
        cancelled: { 
          color: 'bg-red-100 text-red-800 border-red-200', 
          label: 'Annulé', 
          icon: AlertCircle 
        }
      };
      return configs[status] || configs.pending;
    };

    const getOfferIcon = (offerId) => {
      const icons = {
        orientation: { icon: GraduationCap, color: 'text-blue-600', bg: 'bg-blue-100' },
        visa: { icon: Shield, color: 'text-green-600', bg: 'bg-green-100' },
        installation: { icon: MapPin, color: 'text-purple-600', bg: 'bg-purple-100' }
      };
      return icons[offerId] || icons.orientation;
    };

    if (!accompanyRequests || accompanyRequests.length === 0) {
      return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <GraduationCap className="w-6 h-6 text-purple-600" />
            <h3 className="text-lg font-semibold text-gray-900">Mes accompagnements</h3>
          </div>
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <GraduationCap className="w-8 h-8 text-purple-600" />
            </div>
            <p className="text-gray-500 mb-4">Aucun accompagnement en cours</p>
            <p className="text-sm text-gray-400 mb-6">
              Bénéficiez d'un accompagnement personnalisé pour réussir vos études en France
            </p>
            <a 
              href="/?tab=accompany#accompany-section"
              className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm"
            >
              <Sparkles className="w-4 h-4" />
              Découvrir nos offres
            </a>
          </div>
        </div>
      );
    }

    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <GraduationCap className="w-6 h-6 text-purple-600" />
            <h3 className="text-lg font-semibold text-gray-900">Mes accompagnements</h3>
          </div>
          <a 
            href="/account/accompagnements"
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            Voir tout
          </a>
        </div>

        <div className="space-y-4">
          {accompanyRequests.slice(0, 3).map((request) => {
            const statusConfig = getStatusConfig(request.status);
            const offerConfig = getOfferIcon(request.offer_id);
            const StatusIcon = statusConfig.icon;
            const OfferIcon = offerConfig.icon;

            return (
              <div key={request.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-3">
                  <div className={`p-2 ${offerConfig.bg} rounded-lg flex-shrink-0`}>
                    <OfferIcon className={`w-5 h-5 ${offerConfig.color}`} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-medium text-gray-900 truncate">{request.offer_name}</h4>
                      <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${statusConfig.color}`}>
                        <StatusIcon className="w-3 h-3" />
                        {statusConfig.label}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                      <span>💰 {request.price}€</span>
                      <span>📅 {new Date(request.created_at).toLocaleDateString('fr-FR')}</span>
                      {request.urgency !== 'normal' && (
                        <span className="text-orange-600 font-medium">⚡ {request.urgency_label}</span>
                      )}
                    </div>
                    
                    {request.assigned_counselor && (
                      <div className="flex items-center gap-2 text-sm text-green-600">
                        <User className="w-4 h-4" />
                        <span>Conseiller : {request.assigned_counselor}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Composant existant pour les recommandations
  const Recommendations = ({ recommendations = [] }) => {
    if (!recommendations || recommendations.length === 0) {
      return null;
    }

    return (
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-200 p-6">
        <div className="flex items-center gap-3 mb-4">
          <Sparkles className="w-6 h-6 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">Recommandé pour vous</h3>
        </div>
        
        <div className="space-y-4">
          {recommendations.map((rec, index) => (
            <div key={index} className="bg-white rounded-lg p-4 border border-blue-100">
              <h4 className="font-medium text-gray-900 mb-2">{rec.title}</h4>
              <p className="text-sm text-gray-600 mb-3">{rec.description}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Composant existant pour les domaines d'intérêt (inchangé)
  const DomainInterests = ({ domainPreferences, domainNames }) => {
    const visibleDomains = showAllDomains ? domainPreferences : domainPreferences.slice(0, 3);
    const hasMoreDomains = domainPreferences.length > 3;

    if (!domainPreferences || domainPreferences.length === 0) {
      return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-6 h-6 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Domaines d'intérêt</h3>
          </div>
          <div className="text-center py-8">
            <TrendingUp className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 mb-4">
              Aucun domaine d'intérêt détecté pour le moment
            </p>
            <p className="text-sm text-gray-400">
              Ajoutez des formations à vos favoris pour voir vos préférences apparaître ici
            </p>
            <a 
              href="/"
              className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
            >
              <BookOpen className="w-4 h-4" />
              Découvrir les formations
            </a>
          </div>
        </div>
      );
    }

    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <TrendingUp className="w-6 h-6 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Domaines d'intérêt</h3>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-900">
              {domainPreferences.length}
            </div>
            <div className="text-sm text-gray-500">domaine{domainPreferences.length > 1 ? 's' : ''}</div>
          </div>
        </div>

        <div className="space-y-4">
          {visibleDomains.map((preference, index) => {
            const domainName = domainNames[preference.subdomain_id] || `Domaine ${preference.subdomain_id}`;
            const maxCount = domainPreferences[0]?.count || 1;
            const percentage = Math.round((preference.count / maxCount) * 100);
            
            return (
              <div key={preference.subdomain_id} className="relative">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-900 truncate flex-1 mr-2">
                    {domainName}
                  </span>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span>{preference.count} formation{preference.count > 1 ? 's' : ''}</span>
                    <span className="text-blue-600 font-medium">{percentage}%</span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-blue-600 h-2.5 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {hasMoreDomains && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <button
              onClick={() => setShowAllDomains(!showAllDomains)}
              className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              {showAllDomains ? (
                <>
                  <EyeOff className="w-4 h-4" />
                  Afficher moins
                </>
              ) : (
                <>
                  <Eye className="w-4 h-4" />
                  Voir tous les domaines ({domainPreferences.length - 3} de plus)
                </>
              )}
            </button>
          </div>
        )}

        {domainPreferences.length > 0 && (
          <div className="mt-6 pt-4 border-t border-gray-100">
            <p className="text-xs text-gray-500">
              Ces domaines sont déterminés en fonction de vos formations favorites. 
              Plus vous ajoutez de favoris, plus cette analyse devient précise.
            </p>
          </div>
        )}
      </div>
    );
  };

  // Composant existant pour les favoris récents (inchangé)
  const RecentFavorites = ({ recentFavorites }) => {
    if (!recentFavorites || recentFavorites.length === 0) {
      return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <Heart className="w-6 h-6 text-red-500" />
            <h3 className="text-lg font-semibold text-gray-900">Favoris récents</h3>
          </div>
          <div className="text-center py-8">
            <Heart className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 mb-4">Aucun favori pour le moment</p>
            <a 
              href="/"
              className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
            >
              <Heart className="w-4 h-4" />
              Découvrir les formations
            </a>
          </div>
        </div>
      );
    }

    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Heart className="w-6 h-6 text-red-500" />
            <h3 className="text-lg font-semibold text-gray-900">Favoris récents</h3>
          </div>
          <a 
            href="/favorites"
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            Voir tous les favoris
          </a>
        </div>

        <div className="space-y-4">
          {recentFavorites.slice(0, 3).map((favorite) => (
            <div key={favorite.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex-shrink-0">
                {favorite.school_logo_path ? (
                  <OptimizedImage 
                    src={'/images/schools/logos/'+favorite.school_logo_path} 
                    alt={favorite.school_name}
                    className="w-10 h-10 object-contain rounded-lg border border-gray-200"
                  />
                ) : (
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <span className="text-gray-400 text-xs font-semibold">
                      {favorite.school_name?.charAt(0) || 'E'}
                    </span>
                  </div>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-gray-900 line-clamp-1 mb-1">
                  {favorite.title}
                </h4>
                <p className="text-sm text-gray-600 mb-2">{favorite.school_name}</p>
                <div className="flex items-center gap-2">
                  <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">
                    {favorite.grade}
                  </span>
                  <span className="text-xs text-gray-500">
                    {new Date(favorite.favorited_at).toLocaleDateString('fr-FR')}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
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
        {/* En-tête */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Bonjour {dashboard?.user?.firstname || session.user.name} ! 👋
          </h1>
          <p className="text-gray-600">
            Voici un aperçu de votre activité sur Wendogo
          </p>
        </div>

        {/* ✅ STATISTIQUES AMÉLIORÉES avec forum */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3">
              <Heart className="w-8 h-8 text-red-500" />
              <div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {dashboard?.statistics?.favorites_count || 0}
                </h3>
                <p className="text-gray-600">Formations favorites</p>
              </div>
            </div>
          </div>

          {/* ✅ NOUVELLE STATISTIQUE: Questions */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3">
              <MessageSquare className="w-8 h-8 text-blue-600" />
              <div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {dashboard?.statistics?.questions_count || 0}
                </h3>
                <p className="text-gray-600">Questions posées</p>
              </div>
            </div>
          </div>

          {/* STATISTIQUE: Accompagnements */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3">
              <GraduationCap className="w-8 h-8 text-purple-600" />
              <div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {dashboard?.statistics?.accompany_requests_count || 0}
                </h3>
                <p className="text-gray-600">Accompagnements</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3">
              <Calendar className="w-8 h-8 text-green-600" />
              <div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {dashboard?.statistics?.last_login 
                    ? new Date(dashboard.statistics.last_login).toLocaleDateString('fr-FR')
                    : 'Aujourd\'hui'
                  }
                </h3>
                <p className="text-gray-600">Dernière visite</p>
              </div>
            </div>
          </div>
        </div>

        {/* ✅ CONTENU PRINCIPAL AMÉLIORÉ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* ✅ NOUVEAU: Questions du forum */}
          <ForumQuestions 
            userQuestions={dashboard?.user_questions || []}
          />
          
          {/* Demandes d'accompagnement */}
          <AccompanyRequests 
            accompanyRequests={dashboard?.accompany_requests || []}
          />
          
          {/* Favoris récents */}
          <RecentFavorites 
            recentFavorites={dashboard?.recent_favorites || []}
          />
          
          {/* Domaines d'intérêt */}
          <DomainInterests 
            domainPreferences={dashboard?.domain_preferences || []} 
            domainNames={domainNames}
          />
          
          {/* Recommandations */}
          <Recommendations 
            recommendations={dashboard?.recommendations || []}
          />
        </div>

        {/* ✅ ACTIONS RAPIDES AMÉLIORÉES */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions rapides</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <a 
              href="/"
              className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <BookOpen className="w-6 h-6 text-blue-600" />
              <div>
                <h4 className="font-medium text-gray-900">Rechercher</h4>
                <p className="text-sm text-gray-600">Parcourir le catalogue</p>
              </div>
            </a>
            
            <a 
              href="/favorites"
              className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Heart className="w-6 h-6 text-red-600" />
              <div>
                <h4 className="font-medium text-gray-900">Mes favoris</h4>
                <p className="text-sm text-gray-600">Gérer mes formations</p>
              </div>
            </a>
            
            {/* ✅ NOUVELLE ACTION: Forum */}
            <a 
              href="/forum"
              className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <MessageSquare className="w-6 h-6 text-blue-600" />
              <div>
                <h4 className="font-medium text-gray-900">Forum</h4>
                <p className="text-sm text-gray-600">Poser une question</p>
              </div>
            </a>
            
            {/* ACTION: Accompagnement */}
            <a 
              href="/#accompany-section"
              className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <GraduationCap className="w-6 h-6 text-purple-600" />
              <div>
                <h4 className="font-medium text-gray-900">Accompagnement</h4>
                <p className="text-sm text-gray-600">Être accompagné</p>
              </div>
            </a>
          </div>
        </div>
      </div>
      <FooterSingleRow />
    </div>
  );
};

export default Dashboard;
