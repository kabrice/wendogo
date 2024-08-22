import {createApi, fetchBaseQuery, REST_API_PARAMS} from './init.js'

export const bacApi = createApi({
    reducerPath: 'bacApi',
    baseQuery: fetchBaseQuery(REST_API_PARAMS),
    tagTypes: ['Bac'],
    endpoints: (builder) => ({
        getBac: builder.query({
            query: () => `/bac/universities`,
            providesTags: ['Bac']
          })
    })
})

export const { useGetBacQuery } = bacApi
