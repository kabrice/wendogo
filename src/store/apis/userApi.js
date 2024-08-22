import {createApi, fetchBaseQuery, REST_API_PARAMS} from './init.js'

export const userApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery(REST_API_PARAMS),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    user: builder.query({
      query: ({phone}) => `/user/${phone}`,
      providesTags: ['User']
    }),
    addUser: builder.mutation({
      query: (user) => ({
        url: '/user/add',
        method: 'POST',
        body: user
      }),
      invalidatesTags: ['User']
    }),
    updateUser: builder.mutation({ 
      query: ({...body }) => ({
        url: `/user/edit`,
        method: 'PATCH',
        body
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
      query: (countryIso2) => `/countries/cities/${countryIso2}`,
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
