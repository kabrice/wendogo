import {createApi, fetchBaseQuery, REST_API_PARAMS} from './init.js'

export const leadstatusApi = createApi({
  reducerPath: 'leadstatusApi',
  baseQuery: fetchBaseQuery(REST_API_PARAMS),
  tagTypes: ['Leadstatus'],
  endpoints: (builder) => ({
    leadstatus: builder.query({
      query: () => `/leadstatus`,
      providesTags: ['Leadstatus']
    }) 
  })
}) 

export const {
  useLeadstatusQuery
} = leadstatusApi 
