import {createApi, fetchBaseQuery, REST_API_PARAMS} from './init.js'

export const subjectWeightSystemApi = createApi({
    reducerPath: 'subjectWeightSystemApi',
    baseQuery: fetchBaseQuery(REST_API_PARAMS),
    tagTypes: ['SubjectWeightSystem'],
    endpoints: (builder) => ({
        getSubjectWeightSystems: builder.query({
            query: () => `/subjectWeightSystems`,
            providesTags: ['SubjectWeightSystem']
          })
    })
})

export const { useGetSubjectWeightSystemsQuery } = subjectWeightSystemApi
