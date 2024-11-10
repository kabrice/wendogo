import {createApi, fetchBaseQuery, REST_API_PARAMS} from './init.js'

export const schoolApi = createApi({
  reducerPath: 'schoolsApi',
  baseQuery: fetchBaseQuery(REST_API_PARAMS),
  tagTypes: ['School'],
  endpoints: (builder) => ({
    getSchoolDetailsFromSchoolIds: builder.mutation({ 
      query: ({...body }) => ({
        url: '/schools/filtring',
        method: 'POST',
        body
      }),
      invalidatesTags: ['school']
    })
  })
}) 

export const {useGetSchoolDetailsFromSchoolIdsMutation} = schoolApi
