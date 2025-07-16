// src/components/UserDashboard.js - Dashboard utilisateur avec accompagnement

import React, { useState, useEffect } from 'react';
import { REST_API_PARAMS } from '../utils/Constants';
import { 
  Heart, 
  Search, 
  GraduationCap, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  User,
  Mail,
  MapPin,
  TrendingUp,
  ArrowRight,
  Calendar,
  Shield,
  Phone,
  MessageSquare
} from 'lucide-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

const UserDashboard = () => {
  const { data: session } = useSession();
  const [dashboardData, setDashboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (session?.user) {
      fetchDashboardData();
    }
  }, [session]);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch(`${REST_API_PARAMS.baseUrl}/api/user/dashboard`, {
        headers: {
          'Authorization': `Bearer ${session.accessToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setDashboardData(data.dashboard);
      }
    } catch (error) {
      console.error('Erreur lors du chargement du dashboard:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { color: 'bg-yellow-100 text-yellow-800 border-yellow-200', label: 'En attente', icon: Clock },
      contacted: { color: 'bg-blue-100 text-blue-800 border-blue-200', label: 'Contacté', icon: Phone },
      in_progress: { color: 'bg-purple-100 text-purple-800 border-purple-200', label: 'En cours', icon: TrendingUp },
      completed: { color: 'bg-green-100 text-green-800 border-green-200', label: 'Terminé', icon: CheckCircle },
      cancelled: { color: 'bg-red-100 text-red-800 border-red-200', label: 'Annulé', icon: AlertCircle }
    };

    const config = statusConfig[status] || statusConfig.pending;
    const IconComponent = config.icon;

    return (
      <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${config.color}`}>
        <IconComponent className="w-3 h-3" />
        {config.label}
      </div>
    );
  };

  const getOfferIcon = (offerId) => {
    const icons = {
      orientation: { icon: GraduationCap, color: 'text-blue-600', bg: 'bg-blue-100' },
      visa: { icon: Shield, color: 'text-green-600', bg: 'bg-green-100' },
      installation: { icon: MapPin, color: 'text-purple-600', bg: 'bg-purple-100' }
    };

    return icons[offerId] || icons.orientation;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement de votre dashboard...</p>
        </div>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-gray-600">Erreur lors du chargement des données</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Bonjour {dashboardData.user.firstname} ! 👋
              </h1>
              <p className="text-gray-600">Voici un aperçu de votre parcours Wendogo</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistiques principales */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <Heart className="w-6 h-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Favoris</p>
                <p className="text-2xl font-bold text-gray-900">{dashboardData.statistics.favorites_count}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <GraduationCap className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Accompagnements</p>
                <p className="text-2xl font-bold text-gray-900">{dashboardData.statistics.accompany_requests_count}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">En attente</p>
                <p className="text-2xl font-bold text-gray-900">{dashboardData.statistics.pending_requests_count}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Terminés</p>
                <p className="text-2xl font-bold text-gray-900">{dashboardData.statistics.completed_requests_count}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Colonne principale */}
          <div className="lg:col-span-2 space-y-8">
            {/* Actions rapides */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Actions rapides</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {dashboardData.quick_actions.map((action, index) => (
                  <Link key={index} href={action.link}>
                    <div className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all cursor-pointer">
                      <div className="flex items-center gap-3 mb-2">
                        {action.icon === 'heart' && <Heart className="w-5 h-5 text-red-500" />}
                        {action.icon === 'search' && <Search className="w-5 h-5 text-blue-500" />}
                        {action.icon === 'graduation-cap' && <GraduationCap className="w-5 h-5 text-purple-500" />}
                        <h3 className="font-medium text-gray-900">{action.title}</h3>
                      </div>
                      <p className="text-sm text-gray-600">{action.description}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Demandes d'accompagnement */}
            {dashboardData.accompany_requests.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-gray-900">Mes accompagnements</h2>
                  <Link href="/account/accompagnements" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    Voir tout →
                  </Link>
                </div>

                <div className="space-y-4">
                  {dashboardData.accompany_requests.slice(0, 3).map((request) => {
                    const offerConfig = getOfferIcon(request.offer_id);
                    const IconComponent = offerConfig.icon;

                    return (
                      <div key={request.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3 flex-1">
                            <div className={`p-2 ${offerConfig.bg} rounded-lg`}>
                              <IconComponent className={`w-5 h-5 ${offerConfig.color}`} />
                            </div>
                            
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="font-medium text-gray-900">{request.offer_name}</h3>
                                {getStatusBadge(request.status)}
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
                                  <span>Conseiller assigné : {request.assigned_counselor}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Favoris récents */}
            {dashboardData.recent_favorites.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-gray-900">Favoris récents</h2>
                  <Link href="/favorites" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    Voir tout →
                  </Link>
                </div>

                <div className="space-y-4">
                  {dashboardData.recent_favorites.slice(0, 3).map((program) => (
                    <div key={program.id} className="flex items-center gap-4 p-3 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                        {program.school_logo_path ? (
                          <img src={program.school_logo_path} alt="" className="w-8 h-8 object-contain" />
                        ) : (
                          <GraduationCap className="w-6 h-6 text-gray-400" />
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 mb-1">{program.title}</h3>
                        <p className="text-sm text-gray-600">{program.school_name}</p>
                        <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">
                          <span>{program.grade}</span>
                          {program.duration && <span>{program.duration}</span>}
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <p className="text-xs text-gray-500">Ajouté le</p>
                        <p className="text-sm font-medium text-gray-900">
                          {new Date(program.favorited_at).toLocaleDateString('fr-FR')}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Colonne latérale */}
          <div className="space-y-6">
            {/* Profil utilisateur */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Mon profil</h3>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <User className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    {dashboardData.user.firstname} {dashboardData.user.lastname}
                  </span>
                </div>
                
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{dashboardData.user.email}</span>
                </div>
                
                {dashboardData.user.country && (
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{dashboardData.user.country}</span>
                  </div>
                )}
                
                {dashboardData.statistics.last_login && (
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      Dernière connexion : {new Date(dashboardData.statistics.last_login).toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                )}
              </div>
              
              <Link href="/account">
                <button className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                  Modifier mon profil
                </button>
              </Link>
            </div>

            {/* Recommandations */}
            {dashboardData.recommendations.length > 0 && (
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommandé pour vous</h3>
                
                <div className="space-y-4">
                  {dashboardData.recommendations.map((rec, index) => (
                    <div key={index} className="bg-white rounded-lg p-4 border border-blue-100">
                      <h4 className="font-medium text-gray-900 mb-2">{rec.title}</h4>
                      <p className="text-sm text-gray-600 mb-3">{rec.description}</p>
                      <Link href={rec.link}>
                        <button className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium">
                          {rec.action}
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CTA Accompagnement */}
            {dashboardData.statistics.accompany_requests_count === 0 && (
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200 p-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <GraduationCap className="w-6 h-6 text-purple-600" />
                  </div>
                  
                  <h3 className="font-semibold text-gray-900 mb-2">Besoin d'aide ?</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Nos conseillers vous accompagnent dans votre projet d'études en France.
                  </p>
                  
                  <Link href="/accompagnement">
                    <button className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium">
                      Découvrir nos offres
                    </button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
