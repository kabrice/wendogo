import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const userApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({baseUrl: 'https://wendogo.online:8080', prepareHeaders: (headers, { getState }) => {
    headers.set('Content-Type', 'application/json')
    headers.set('Access-Control-Allow-Origin', '*')
    headers.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    headers.set('Access-Control-Request-Method', 'GET, POST, DELETE, PUT, OPTIONS')
    return headers
}}),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    user: builder.query({
      query: ({phone}) => `/user/${phone}`,
      providesTags: ['User']
    }),
    addUser: builder.mutation({
      query: (user) => ({
        url: '/users',
        method: 'POST',
        body: user
      }),
      invalidatesTags: ['User']
    }),
    updateUser: builder.mutation({ 
      query: ({id, ...rest}) => ({
        url: `/users/${id}`,
        method: 'PUT',
        body: rest
      }),
      invalidatesTags: ['User']
    }),
    sendVerificationAndAddUser: builder.mutation({ 
        query: ({...body }) => ({
          url: '/user/add/verification',
          method: 'POST',
          body
        }),
        invalidatesTags: ['User']
      }),
    sendCodeForVerification: builder.mutation({ 
      query: ({...body }) => ({
        url: '/user/verificationCheck',
        method: 'POST',
        body
      }),
      invalidatesTags: ['User']
    }),  
    updateCredential: builder.mutation({ 
      query: ({...body }) => ({
        url: '/user/update/credentials',
        method: 'POST',
        body
      }),
      invalidatesTags: ['User']
    }), 
    updateSubscriptionStep: builder.mutation({ 
      query: ({...body }) => ({
        url: '/user/update/subscriptionStep',
        method: 'PUT',
        body
      }),
      invalidatesTags: ['User']
    }), 
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['User']
    }),
    countries: builder.query({
      query: (countryIso2) => `/countries/${countryIso2}`,
      method: 'GET',
      providesTags: ['User']
    })
  })
}) 

export const {
  useUserQuery,
  useCountriesQuery,
  useAddUserMutation,
  useUpdateUserMutation,
  useSendVerificationAndAddUserMutation,
  useSendCodeForVerificationMutation,
  useUpdateCredentialMutation,
  useUpdateSubscriptionStepMutation,
  useDeleteUserMutation
} = userApi 
