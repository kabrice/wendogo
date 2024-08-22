import {createApi, fetchBaseQuery, REST_API_PARAMS} from './init.js'

export const schoolYearApi = createApi({
    reducerPath: 'schoolYearApi',
    baseQuery: fetchBaseQuery(REST_API_PARAMS),
    tagTypes: ['SchoolYear'],
    endpoints: (builder) => ({
        getSchoolYears: builder.query({
            query: () => `/schoolyear`,
            providesTags: ['SchoolYear']
          })
    })
})

export const { useGetSchoolYearsQuery } = schoolYearApi
