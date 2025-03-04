import { createApi, fetchBaseQuery } from './init.js'

// Custom fetch base query with proper CORS handling
// In your uploadToDriveApi.js
export const uploadToDriveApi = createApi({
    reducerPath: 'uploadToDriveApi',
    baseQuery: fetchBaseQuery({
      baseUrl: 'http://192.168.1.191:5000',
      credentials: 'include',  // Add this line
      prepareHeaders: (headers) => {
        // Don't set Content-Type as it will be automatically set for FormData
        headers.set('Accept', '*/*')
        return headers
      }
    }),
    endpoints: (builder) => ({
      uploadFile: builder.mutation({
        query: (formData) => ({
          url: '/api/upload-to-drive',
          method: 'POST',
          body: formData,
          formData: true
        })
      }),
      deleteFile: builder.mutation({
        query: (payload) => ({
          url: '/api/delete-from-drive',
          method: 'POST',
          body: payload
        })
      })
    })
  });



export const { useUploadFileMutation, useDeleteFileMutation } = uploadToDriveApi;
