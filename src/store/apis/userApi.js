import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const userApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({baseUrl: 'http://127.0.0.1:5000',         prepareHeaders: (headers, { getState }) => {
    headers.set('Content-Type', 'application/json')
    return headers
}}),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    users: builder.query({
      query: () => '/users',
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
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['User']
    })
  })
}) 

export const {
  useUsersQuery,
  useAddUserMutation,
  useUpdateUserMutation,
  useSendVerificationAndAddUserMutation,
  useDeleteUserMutation
} = userApi 
