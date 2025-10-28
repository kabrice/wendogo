// src/pages/forum/index.js - Page principale du forum

import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
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

const ForumPage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const { t } = useTranslation(['common', 'forum']);

  const CATEGORIES = [
    { id: 'all', label: t('forum:category_all'), icon: '📚' },
    { id: 'orientation', label: t('forum:category_orientation'), icon: '🎯' },
    { id: 'visa', label: t('forum:category_visa'), icon: '📝' },
    { id: 'logement', label: t('forum:category_logement'), icon: '🏠' },
    { id: 'finance', label: t('forum:category_finance'), icon: '💰' },
    { id: 'vie-etudiante', label: t('forum:category_vie_etudiante'), icon: '🎓' },
    { id: 'emploi', label: t('forum:category_emploi'), icon: '💼' },
    { id: 'autres', label: t('forum:category_autres'), icon: '💬' }
  ];

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
      alert(t('forum:alert_login_required_ask'));
      return;
    }

    try {
      await createQuestion({
        ...questionForm,
        token: session.accessToken // ✅ Passer le token
      }).unwrap();
      alert(t('forum:alert_question_published'));
      setShowQuestionModal(false);
      setQuestionForm({ title: '', content: '', category: 'orientation' });
      refetch(); // Rafraîchir la liste
    } catch (error) {
      console.error('Erreur:', error);
      alert(t('forum:alert_question_error'));
    }
  };

  // ✅ Gestion du like
  const handleLike = async (questionId) => {
    if (!session) {
      alert(t('forum:alert_login_required_like'));
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
        <title>{t('forum:page_title')}</title>
        <meta name="description" content={t('forum:page_description')} />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <NavBar variant="simple" languageSelectorVariant="light" />

        {/* Header avec info anonymat */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <MessageSquare className="w-16 h-16 mx-auto mb-4" />
              <h1 className="text-4xl font-bold mb-4">{t('forum:header_title')}</h1>
              <p className="text-xl mb-6">
                {t('forum:header_subtitle')}
              </p>
              
              {/* IMPORTANT: Info anonymat */}
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 inline-flex items-center gap-3">
                <Lock className="w-5 h-5" />
                <span className="font-medium">
                  {t('forum:anonymity_info')}
                </span>
              </div>
              
              <div className="mt-6">
                <button
                  onClick={() => session ? setShowQuestionModal(true) : alert(t('forum:login_to_ask'))}
                  className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  {t('forum:ask_question_button')}
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
                  {t('forum:categories_title')}
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
              </div>
            </div>

            {/* Main content */}
            <div className="lg:col-span-3">
              {/* Barre de recherche et tri */}
              <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={t('forum:search_placeholder')}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg bg-white"
                  >
                    <option value="recent">{t('forum:sort_recent')}</option>
                    <option value="popular">{t('forum:sort_popular')}</option>
                    <option value="unanswered">{t('forum:sort_unanswered')}</option>
                  </select>
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
                    <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      {t('forum:no_questions')}
                    </h3>
                    <p className="text-gray-600">{t('forum:no_questions_desc')}</p>
                  </div>
                ) : (
                  questions.map(question => (
                    <div
                      key={question.id}
                      onClick={() => router.push(`/forum/${question.id}/${question.slug}`)}
                      className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow cursor-pointer"
                    >
                      <div className="flex gap-4">
                        {/* Stats */}
                        <div className="flex-shrink-0 flex flex-col gap-4">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleLike(question.id);
                            }}
                            className={`flex flex-col items-center ${
                              question.is_liked ? 'text-purple-600' : 'text-gray-500'
                            } hover:text-purple-600`}
                          >
                            <ThumbsUp className={`w-5 h-5 ${question.is_liked ? 'fill-current' : ''}`} />
                            <span className="text-sm">{question.likes_count}</span>
                          </button>
                          
                          <div className="flex flex-col items-center text-gray-500">
                            <MessageCircle className="w-5 h-5" />
                            <span className="text-sm">{question.answers_count}</span>
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
                                {t('forum:moderator_wendogo')}
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                                <Users className="w-4 h-4" />
                                {t('forum:anonymous_user')}
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
                    {t('forum:pagination_previous')}
                  </button>
                  
                  <span className="px-4 py-2">
                    {t('forum:pagination_page', { page: pagination.page, total: pagination.pages })}
                  </span>
                  
                  <button
                    onClick={() => setPage(page + 1)}
                    disabled={!pagination.has_next}
                    className="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {t('forum:pagination_next')}
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
                  <h2 className="text-2xl font-bold text-gray-900">{t('forum:modal_title')}</h2>
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
                      <h4 className="font-medium text-purple-900 mb-1">{t('forum:modal_anonymity_title')}</h4>
                      <p className="text-sm text-purple-700">
                        {t('forum:modal_anonymity_description')}
                      </p>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleAskQuestion}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('forum:modal_category_label')}
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
                        {t('forum:modal_title_label')}
                      </label>
                      <input
                        type="text"
                        value={questionForm.title}
                        onChange={(e) => setQuestionForm({...questionForm, title: e.target.value})}
                        placeholder={t('forum:modal_title_placeholder')}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        required
                        minLength={10}
                      />
                      <p className="text-xs text-gray-500 mt-1">{t('forum:modal_title_min')}</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('forum:modal_content_label')}
                      </label>
                      <textarea
                        value={questionForm.content}
                        onChange={(e) => setQuestionForm({...questionForm, content: e.target.value})}
                        placeholder={t('forum:modal_content_placeholder')}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg h-32"
                        required
                        minLength={20}
                      />
                      <p className="text-xs text-gray-500 mt-1">{t('forum:modal_content_min')}</p>
                    </div>

                    <div className="flex gap-3 pt-4">
                      <button
                        type="submit"
                        disabled={isCreating}
                        className="flex-1 bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isCreating ? t('forum:modal_submitting') : t('forum:modal_submit')}
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowQuestionModal(false)}
                        className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
                      >
                        {t('forum:modal_cancel')}
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
export async function getStaticProps({ locale }) {
  const { serverSideTranslations } = await import('next-i18next/serverSideTranslations');
  
  return {
    props: {
      ...(await serverSideTranslations(locale, ['authModal', 'common', 'forum'])),
    },
  };
}

export default ForumPage;
