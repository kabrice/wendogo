// src/pages/forum/[id]/[slug].js - Page détail d'une question

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import NavBar from '../../../components/NavBar';
import FooterSingleRow from '../../../components/FooterSingleRow';
import { REST_API_PARAMS } from '../../../utils/Constants';
import {
  MessageSquare,
  ThumbsUp,
  Clock,
  Eye,
  Users,
  ArrowLeft,
  Send,
  CheckCircle,
  Lock,
  UserCheck,
  Award
} from 'lucide-react';

const CATEGORIES = {
  'orientation': { label: 'Orientation', icon: '🎯' },
  'visa': { label: 'Visa & Démarches', icon: '📝' },
  'logement': { label: 'Logement', icon: '🏠' },
  'finance': { label: 'Financement', icon: '💰' },
  'vie-etudiante': { label: 'Vie étudiante', icon: '🎓' },
  'emploi': { label: 'Emploi & Stage', icon: '💼' },
  'autres': { label: 'Autres', icon: '💬' }
};

const QuestionDetailPage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const { id, slug } = router.query;

  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [answerContent, setAnswerContent] = useState('');

  useEffect(() => {
    if (id) {
      loadQuestion();
    }
  }, [id]);

  const loadQuestion = async () => {
    setIsLoading(true);
    try {
      const headers = session?.accessToken
        ? { 'Authorization': `Bearer ${session.accessToken}` }
        : {};

      const response = await fetch(
        `${REST_API_PARAMS.baseUrl}/api/forum/questions/${id}`,
        { headers }
      );

      if (response.ok) {
        const data = await response.json();
        setQuestion(data.question);
        setAnswers(data.answers);
      }
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLikeQuestion = async () => {
    if (!session) {
      alert('⚠️ Vous devez être connecté pour liker');
      return;
    }

    try {
      const response = await fetch(
        `${REST_API_PARAMS.baseUrl}/api/forum/questions/${id}/like`,
        {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${session.accessToken}` }
        }
      );

      if (response.ok) {
        loadQuestion();
      }
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  const handleLikeAnswer = async (answerId) => {
    if (!session) {
      alert('⚠️ Vous devez être connecté pour liker');
      return;
    }

    try {
      const response = await fetch(
        `${REST_API_PARAMS.baseUrl}/api/forum/answers/${answerId}/like`,
        {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${session.accessToken}` }
        }
      );

      if (response.ok) {
        loadQuestion();
      }
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  const handleSubmitAnswer = async (e) => {
    e.preventDefault();
    
    if (!session) {
      alert('⚠️ Vous devez être connecté pour répondre');
      return;
    }

    if (!answerContent.trim() || answerContent.length < 10) {
      alert('⚠️ La réponse doit contenir au moins 10 caractères');
      return;
    }

    try {
      const response = await fetch(
        `${REST_API_PARAMS.baseUrl}/api/forum/questions/${id}/answers`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.accessToken}`
          },
          body: JSON.stringify({ content: answerContent })
        }
      );

      if (response.ok) {
        alert('✅ Réponse publiée avec succès (anonymement) !');
        setAnswerContent('');
        loadQuestion();
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert('❌ Erreur lors de la publication');
    }
  };

  const handleAcceptAnswer = async (answerId) => {
    if (!session) return;

    try {
      const response = await fetch(
        `${REST_API_PARAMS.baseUrl}/api/forum/answers/${answerId}/accept`,
        {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${session.accessToken}` }
        }
      );

      if (response.ok) {
        alert('✅ Réponse marquée comme acceptée !');
        loadQuestion();
      }
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!question) {
    return (
      <div className="min-h-screen bg-gray-50">
        <NavBar />
        <div className="container mx-auto px-4 py-12 text-center">
          <p className="text-gray-500">Question non trouvée</p>
        </div>
      </div>
    );
  }

  const categoryInfo = CATEGORIES[question.category] || { label: question.category, icon: '💬' };

  return (
    <>
      <Head>
        <title>{question.title} - Forum Wendogo</title>
        <meta name="description" content={question.content.substring(0, 160)} />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <NavBar />

        <div className="container mx-auto px-4 py-8 max-w-4xl">
          {/* Breadcrumb */}
          <button
            onClick={() => router.push('/forum')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour au forum
          </button>

          {/* Question principale */}
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
            <div className="flex gap-4">
              {/* Stats sidebar */}
              <div className="flex-shrink-0 text-center space-y-4">
                <button
                  onClick={handleLikeQuestion}
                  className={`flex flex-col items-center ${
                    question.is_liked ? 'text-purple-600' : 'text-gray-500'
                  } hover:text-purple-600`}
                >
                  <ThumbsUp className={`w-8 h-8 ${question.is_liked ? 'fill-current' : ''}`} />
                  <span className="text-lg font-medium">{question.likes_count}</span>
                  <span className="text-xs">J'aime</span>
                </button>

                <div className="flex flex-col items-center text-gray-500">
                  <MessageSquare className="w-8 h-8" />
                  <span className="text-lg font-medium">{question.answers_count}</span>
                  <span className="text-xs">Réponses</span>
                </div>

                <div className="flex flex-col items-center text-gray-400">
                  <Eye className="w-7 h-7" />
                  <span className="text-sm">{question.views_count}</span>
                  <span className="text-xs">Vues</span>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">
                  {question.title}
                </h1>

                <div className="flex items-center gap-3 mb-4 flex-wrap">
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                    {categoryInfo.icon} {categoryInfo.label}
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
                    {new Date(question.created_at).toLocaleDateString('fr-FR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>

                <div className="prose max-w-none">
                  <p className="text-gray-700 whitespace-pre-line">{question.content}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Réponses */}
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              {answers.length} réponse{answers.length > 1 ? 's' : ''}
            </h2>

            <div className="space-y-6">
              {answers.map(answer => (
                <div 
                  key={answer.id}
                  className={`border-l-4 pl-6 py-4 ${
                    answer.is_accepted 
                      ? 'border-green-500 bg-green-50' 
                      : 'border-gray-200'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    {/* Stats */}
                    <div className="flex-shrink-0 text-center">
                      <button
                        onClick={() => handleLikeAnswer(answer.id)}
                        className={`flex flex-col items-center ${
                          answer.is_liked ? 'text-purple-600' : 'text-gray-500'
                        } hover:text-purple-600`}
                      >
                        <ThumbsUp className={`w-6 h-6 ${answer.is_liked ? 'fill-current' : ''}`} />
                        <span className="text-sm font-medium">{answer.likes_count}</span>
                      </button>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      {answer.is_accepted && (
                        <div className="flex items-center gap-2 text-green-600 mb-2">
                          <CheckCircle className="w-5 h-5" />
                          <span className="font-medium text-sm">Réponse acceptée</span>
                        </div>
                      )}

                      <p className="text-gray-700 mb-3 whitespace-pre-line">{answer.content}</p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {answer.is_moderator ? (
                            <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                              <UserCheck className="w-3 h-3" />
                              Modérateur Wendogo
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                              <Users className="w-3 h-3" />
                              Utilisateur anonyme
                            </span>
                          )}

                          <span className="text-xs text-gray-500">
                            {new Date(answer.created_at).toLocaleDateString('fr-FR')}
                          </span>
                        </div>

                        {question.is_author && !answer.is_accepted && (
                          <button
                            onClick={() => handleAcceptAnswer(answer.id)}
                            className="text-xs text-green-600 hover:text-green-700 font-medium flex items-center gap-1"
                          >
                            <Award className="w-4 h-4" />
                            Marquer comme acceptée
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {answers.length === 0 && (
                <p className="text-center text-gray-500 py-8">
                  Aucune réponse pour le moment. Soyez le premier à répondre !
                </p>
              )}
            </div>
          </div>

          {/* Formulaire de réponse */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Votre réponse (anonyme)</h3>

            {/* Info anonymat */}
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 mb-4">
              <div className="flex gap-2 text-sm">
                <Lock className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                <p className="text-purple-700">
                  Votre réponse sera publiée de manière anonyme pour protéger votre vie privée.
                </p>
              </div>
            </div>

            {session ? (
              <form onSubmit={handleSubmitAnswer}>
                <textarea
                  value={answerContent}
                  onChange={(e) => setAnswerContent(e.target.value)}
                  placeholder="Partagez votre expérience ou vos conseils..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg h-32 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                  minLength={10}
                />
                <p className="text-xs text-gray-500 mb-4">Minimum 10 caractères</p>

                <button
                  type="submit"
                  className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 font-medium inline-flex items-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Publier la réponse
                </button>
              </form>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">Connectez-vous pour répondre à cette question</p>
                <button
                  onClick={() => router.push('/auth/signin')}
                  className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 font-medium"
                >
                  Se connecter
                </button>
              </div>
            )}
          </div>
        </div>

        <FooterSingleRow />
      </div>
    </>
  );
};

export default QuestionDetailPage;
