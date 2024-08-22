import {createApi, fetchBaseQuery, REST_API_PARAMS} from './init.js'

export const degreeApi = createApi({
    reducerPath: 'degreeApi',
    baseQuery: fetchBaseQuery(REST_API_PARAMS),
    tagTypes: ['Degree'],
    endpoints: (builder) => ({
        getDegrees: builder.query({
            query: (typeOfSchool) => `/degrees/${typeOfSchool}`,
            method: 'GET',
            providesTags: ['Degree']
          })
    })
})

export const { useGetDegreesQuery } = degreeApi
