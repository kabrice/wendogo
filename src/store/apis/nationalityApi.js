import {createApi, fetchBaseQuery, REST_API_PARAMS} from './init.js'

export const nationalityApi = createApi({
    reducerPath: 'nationalityApi',
    baseQuery: fetchBaseQuery(REST_API_PARAMS),
    tagTypes: ['Nationalities'],
    endpoints: (builder) => ({
        getNationalities: builder.query({
            query: () => `/nationalities`,
            providesTags: ['Nationalities']
          })
    })
})

export const { useGetNationalitiesQuery } = nationalityApi
