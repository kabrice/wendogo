import {createApi, fetchBaseQuery, REST_API_PARAMS} from './init.js'

export const leadApi = createApi({
  reducerPath: 'leadApi',
  baseQuery: fetchBaseQuery(REST_API_PARAMS),
  tagTypes: ['Lead'],
  endpoints: (builder) => ({
    addLead: builder.mutation({
      query: (lead) => ({
        url: '/lead/add',
        method: 'POST',
        body: lead
      }),
      invalidatesTags: ['Lead']
    }), 
    updateClicksAndProjectMessageByUserId: builder.mutation({
      query: ({...body }) => ({
        url: `/lead/update/clicks`,
        method: 'PUT',
        body: body
      }),
      invalidatesTags: ['Lead']
    }),
  })
}) 

export const {
  useAddLeadMutation,
  useUpdateClicksAndProjectMessageByUserIdMutation
} = leadApi 
