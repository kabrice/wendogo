import {createApi, fetchBaseQuery, REST_API_PARAMS} from './init.js'

export const levelApi = createApi({
    reducerPath: 'levelApi',
    baseQuery: fetchBaseQuery(REST_API_PARAMS),
    tagTypes: ['Level'],
    endpoints: (builder) => ({
        getLevels: builder.query({
            query: () => `/level/highschools`,
            providesTags: ['Level']
          }),
        getDegreesByBacId: builder.query({
            query: (bacId) => `/level/degrees/${bacId}`,
            providesTags: ['Level']
          }),
    })
})

export const { useGetLevelsQuery, useGetDegreesByBacIdQuery } = levelApi
