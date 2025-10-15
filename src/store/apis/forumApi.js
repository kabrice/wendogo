// src/store/apis/forumApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Base query simple (le token est passé manuellement dans chaque requête)
const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000',
});

export const forumApi = createApi({
  reducerPath: 'forumApi',
  baseQuery,
  tagTypes: ['Question', 'Answer'],
  endpoints: (builder) => ({
    
    // Récupérer toutes les questions avec filtres
    getQuestions: builder.query({
      query: ({ page = 1, per_page = 20, category = 'all', sort = 'recent', search = '', token = null }) => ({
        url: `/api/forum/questions?page=${page}&per_page=${per_page}&category=${category}&sort=${sort}&search=${search}`,
        method: 'GET',
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      }),
      providesTags: ['Question']
    }),
    
    // Récupérer une question avec ses réponses
    getQuestion: builder.query({
      query: (id) => ({
        url: `/api/forum/questions/${id}`,
        method: 'GET'
      }),
      providesTags: (result, error, id) => [{ type: 'Question', id }]
    }),
    
    // Créer une question
    createQuestion: builder.mutation({
      query: ({ token, ...body }) => ({
        url: '/api/forum/questions',
        method: 'POST',
        body,
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      }),
      invalidatesTags: ['Question']
    }),
    
    // Liker/Unliker une question
    toggleQuestionLike: builder.mutation({
      query: ({ questionId, token }) => ({
        url: `/api/forum/questions/${questionId}/like`,
        method: 'POST',
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      }),
      invalidatesTags: (result, error, { questionId }) => [
        { type: 'Question', id: questionId },
        'Question'
      ]
    }),
    
    // Créer une réponse
    createAnswer: builder.mutation({
      query: ({ questionId, content, token }) => ({
        url: `/api/forum/questions/${questionId}/answers`,
        method: 'POST',
        body: { content },
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      }),
      invalidatesTags: (result, error, { questionId }) => [
        { type: 'Question', id: questionId },
        'Answer'
      ]
    }),
    
    // Liker/Unliker une réponse
    toggleAnswerLike: builder.mutation({
      query: ({ answerId, token }) => ({
        url: `/api/forum/answers/${answerId}/like`,
        method: 'POST',
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      }),
      invalidatesTags: ['Answer']
    }),
    
    // Accepter une réponse
    acceptAnswer: builder.mutation({
      query: ({ answerId, token }) => ({
        url: `/api/forum/answers/${answerId}/accept`,
        method: 'POST',
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      }),
      invalidatesTags: ['Answer']
    }),
    
    // Supprimer une question
    deleteQuestion: builder.mutation({
      query: ({ questionId, token }) => ({
        url: `/api/forum/questions/${questionId}`,
        method: 'DELETE',
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      }),
      invalidatesTags: ['Question']
    }),
    
    // Supprimer une réponse
    deleteAnswer: builder.mutation({
      query: ({ answerId, token }) => ({
        url: `/api/forum/answers/${answerId}`,
        method: 'DELETE',
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      }),
      invalidatesTags: ['Answer']
    })
  })
});

export const {
  useGetQuestionsQuery,
  useGetQuestionQuery,
  useCreateQuestionMutation,
  useToggleQuestionLikeMutation,
  useCreateAnswerMutation,
  useToggleAnswerLikeMutation,
  useAcceptAnswerMutation,
  useDeleteQuestionMutation,
  useDeleteAnswerMutation
} = forumApi;
