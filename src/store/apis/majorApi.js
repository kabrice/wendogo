import {createApi, fetchBaseQuery, REST_API_PARAMS} from './init.js'

export const majorApi = createApi({
  reducerPath: 'majorsApi',
  baseQuery: fetchBaseQuery(REST_API_PARAMS),
  tagTypes: ['Major'],
  endpoints: (builder) => ({
    getMajorDetailsFromMajorIds: builder.mutation({ 
      query: ({...body }) => ({
        url: '/majors/filtring',
        method: 'POST',
        body
      }),
      invalidatesTags: ['major']
    })
  })
}) 

export const {useGetMajorDetailsFromMajorIdsMutation} = majorApi

