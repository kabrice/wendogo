// src/pages/forum/index.js - Page principale du forum

import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import NavBar from '../../components/NavBar';
import FooterSingleRow from '../../components/FooterSingleRow';
import { 
  useGetQuestionsQuery, 
  useCreateQuestionMutation, 
  useToggleQuestionLikeMutation 
} from '../../store/apis/forumApi';
import {
  MessageSquare,
  ThumbsUp,
  MessageCircle,
  Search,
  Plus,
  Filter,
  Clock,
  AlertCircle,
  Users,
  Eye,
  Lock,
  UserCheck
} from 'lucide-react';

const CATEGORIES = [
  { id: 'all', label: 'Toutes les catégories', icon: '📚' },
  { id: 'orientation', label: 'Orientation', icon: '🎯' },
  { id: 'visa', label: 'Visa & Démarches', icon: '📝' },
  { id: 'logement', label: 'Logement', icon: '🏠' },
  { id: 'finance', label: 'Financement', icon: '💰' },
  { id: 'vie-etudiante', label: 'Vie étudiante', icon: '🎓' },
  { id: 'emploi', label: 'Emploi & Stage', icon: '💼' },
  { id: 'autres', label: 'Autres', icon: '💬' }
];

const ForumPage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  
  // États locaux
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [page, setPage] = useState(1);
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [questionForm, setQuestionForm] = useState({
    title: '',
    content: '',
    category: 'orientation'
  });

  // ✅ RTK Query - Récupération des questions
  const { data, isLoading, refetch } = useGetQuestionsQuery({
    page,
    per_page: 20,
    category: selectedCategory,
    sort: sortBy,
    search: searchQuery,
    token: session?.accessToken
  });

  // ✅ RTK Query - Mutations
  const [createQuestion, { isLoading: isCreating }] = useCreateQuestionMutation();
  const [toggleLike] = useToggleQuestionLikeMutation();

  // Extraire les données de la réponse
  const questions = data?.questions || [];
  const pagination = data?.pagination || {};
  const categoriesStats = data?.categories_stats || [];

  // ✅ Gestion de la création de question
  const handleAskQuestion = async (e) => {
    e.preventDefault();
    
    if (!session) {
      alert('⚠️ Vous devez être connecté pour poser une question');
      return;
    }

    try {
      await createQuestion({
        ...questionForm,
        token: session.accessToken // ✅ Passer le token
      }).unwrap();
      alert('✅ Question publiée avec succès (anonymement) !');
      setShowQuestionModal(false);
      setQuestionForm({ title: '', content: '', category: 'orientation' });
      refetch(); // Rafraîchir la liste
    } catch (error) {
      console.error('Erreur:', error);
      alert('❌ Erreur lors de la publication');
    }
  };

  // ✅ Gestion du like
  const handleLike = async (questionId) => {
    if (!session) {
      alert('⚠️ Vous devez être connecté pour liker');
      return;
    }

    try {
      await toggleLike({
        questionId,
        token: session.accessToken // ✅ Passer le token
      }).unwrap();
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  return (
    <>
      <Head>
        <title>Forum Questions/Réponses - Wendogo</title>
        <meta name="description" content="Posez vos questions sur les études en France et obtenez des réponses de la communauté Wendogo" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <NavBar variant="simple" />

        {/* Header avec info anonymat */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <MessageSquare className="w-16 h-16 mx-auto mb-4" />
              <h1 className="text-4xl font-bold mb-4">Forum Questions/Réponses</h1>
              <p className="text-xl mb-6">
                Posez vos questions sur les études en France, obtenez des réponses de la communauté
              </p>
              
              {/* IMPORTANT: Info anonymat */}
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 inline-flex items-center gap-3">
                <Lock className="w-5 h-5" />
                <span className="font-medium">
                  🔒 Toutes les questions et réponses sont anonymes pour protéger votre vie privée
                </span>
              </div>
              
              <div className="mt-6">
                <button
                  onClick={() => session ? setShowQuestionModal(true) : alert('Connectez-vous pour poser une question')}
                  className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  Poser une question (anonyme)
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar - Catégories */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm border p-4 sticky top-20">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  Catégories
                </h3>
                
                <div className="space-y-2">
                  {CATEGORIES.map(cat => {
                    const stats = categoriesStats.find(s => s.category === cat.id);
                    const count = stats?.count || 0;
                    
                    return (
                      <button
                        key={cat.id}
                        onClick={() => {
                          setSelectedCategory(cat.id);
                          setPage(1); // Reset à la page 1
                        }}
                        className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                          selectedCategory === cat.id
                            ? 'bg-purple-100 text-purple-700 font-medium'
                            : 'hover:bg-gray-100 text-gray-700'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-2">
                            <span>{cat.icon}</span>
                            <span className="text-sm">{cat.label}</span>
                          </span>
                          {count > 0 && (
                            <span className="text-xs bg-gray-200 px-2 py-1 rounded-full">
                              {count}
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Tri */}
                <div className="mt-6 pt-6 border-t">
                  <h4 className="font-semibold text-gray-900 mb-3 text-sm">Trier par</h4>
                  <select
                    value={sortBy}
                    onChange={(e) => {
                      setSortBy(e.target.value);
                      setPage(1);
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  >
                    <option value="recent">Plus récentes</option>
                    <option value="popular">Plus populaires</option>
                    <option value="unanswered">Sans réponse</option>
                    <option value="answered">Avec réponses</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Main Content - Questions */}
            <div className="lg:col-span-3">
              {/* Barre de recherche */}
              <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Rechercher une question..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setPage(1);
                    }}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Liste des questions */}
              <div className="space-y-4">
                {isLoading ? (
                  <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
                  </div>
                ) : questions.length === 0 ? (
                  <div className="bg-white rounded-lg shadow-sm border p-12 text-center">
                    <AlertCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Aucune question trouvée</p>
                  </div>
                ) : (
                  questions.map(question => (
                    <div
                      key={question.id}
                      className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow p-6 cursor-pointer"
                      onClick={() => router.push(`/forum/${question.id}/${question.slug}`)}
                    >
                      <div className="flex gap-4">
                        {/* Stats sidebar */}
                        <div className="flex-shrink-0 text-center space-y-3">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleLike(question.id);
                            }}
                            className={`flex flex-col items-center ${
                              question.is_liked ? 'text-purple-600' : 'text-gray-500'
                            } hover:text-purple-600`}
                          >
                            <ThumbsUp className={`w-6 h-6 ${question.is_liked ? 'fill-current' : ''}`} />
                            <span className="text-sm font-medium">{question.likes_count}</span>
                          </button>
                          
                          <div className="flex flex-col items-center text-gray-500">
                            <MessageCircle className="w-6 h-6" />
                            <span className="text-sm font-medium">{question.answers_count}</span>
                          </div>
                          
                          <div className="flex flex-col items-center text-gray-400">
                            <Eye className="w-5 h-5" />
                            <span className="text-xs">{question.views_count}</span>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-purple-600">
                            {question.title}
                          </h3>
                          
                          <p className="text-gray-600 mb-4 line-clamp-2">
                            {question.content}
                          </p>

                          <div className="flex items-center gap-3 flex-wrap">
                            <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                              {CATEGORIES.find(c => c.id === question.category)?.icon || '💬'}
                              {CATEGORIES.find(c => c.id === question.category)?.label || question.category}
                            </span>
                            
                            {question.is_moderator ? (
                              <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                                <UserCheck className="w-4 h-4" />
                                Modérateur Wendogo
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                                <Users className="w-4 h-4" />
                                Utilisateur anonyme
                              </span>
                            )}
                            
                            <span className="text-sm text-gray-500 flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {new Date(question.created_at).toLocaleDateString('fr-FR')}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Pagination */}
              {pagination.pages > 1 && (
                <div className="mt-6 flex justify-center gap-2">
                  <button
                    onClick={() => setPage(page - 1)}
                    disabled={!pagination.has_prev}
                    className="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Précédent
                  </button>
                  
                  <span className="px-4 py-2">
                    Page {pagination.page} sur {pagination.pages}
                  </span>
                  
                  <button
                    onClick={() => setPage(page + 1)}
                    disabled={!pagination.has_next}
                    className="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Suivant
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Modal nouvelle question */}
        {showQuestionModal && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Poser une question (anonyme)</h2>
                  <button
                    onClick={() => setShowQuestionModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>

                {/* Info anonymat */}
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
                  <div className="flex gap-3">
                    <Lock className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-purple-900 mb-1">Anonymat garanti</h4>
                      <p className="text-sm text-purple-700">
                        Votre question sera publiée de manière anonyme. Personne ne pourra voir votre identité.
                        Seuls les modérateurs Wendogo peuvent afficher leur nom pour répondre officiellement.
                      </p>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleAskQuestion}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Catégorie
                      </label>
                      <select
                        value={questionForm.category}
                        onChange={(e) => setQuestionForm({...questionForm, category: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        required
                      >
                        {CATEGORIES.filter(c => c.id !== 'all').map(cat => (
                          <option key={cat.id} value={cat.id}>
                            {cat.icon} {cat.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Titre de la question *
                      </label>
                      <input
                        type="text"
                        value={questionForm.title}
                        onChange={(e) => setQuestionForm({...questionForm, title: e.target.value})}
                        placeholder="Ex: Comment obtenir un visa étudiant pour la France ?"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        required
                        minLength={10}
                      />
                      <p className="text-xs text-gray-500 mt-1">Minimum 10 caractères</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Détails de votre question *
                      </label>
                      <textarea
                        value={questionForm.content}
                        onChange={(e) => setQuestionForm({...questionForm, content: e.target.value})}
                        placeholder="Décrivez votre question en détail..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg h-32"
                        required
                        minLength={20}
                      />
                      <p className="text-xs text-gray-500 mt-1">Minimum 20 caractères</p>
                    </div>

                    <div className="flex gap-3 pt-4">
                      <button
                        type="submit"
                        disabled={isCreating}
                        className="flex-1 bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isCreating ? 'Publication...' : 'Publier la question'}
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowQuestionModal(false)}
                        className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
                      >
                        Annuler
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        <FooterSingleRow />
      </div>
    </>
  );
};

export default ForumPage;
