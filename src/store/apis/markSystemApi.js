import {createApi, fetchBaseQuery, REST_API_PARAMS} from './init.js'

export const markSystemApi = createApi({
    reducerPath: 'markSystemApi',
    baseQuery: fetchBaseQuery(REST_API_PARAMS),
    tagTypes: ['MarkSystem'],
    endpoints: (builder) => ({
        getMarkSystems: builder.query({
            query: () => `/markSystems`,
            providesTags: ['MarkSystem']
          })
    })
})

export const { useGetMarkSystemsQuery } = markSystemApi
