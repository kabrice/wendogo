import {createApi, fetchBaseQuery, REST_API_PARAMS} from './init.js'

export const levelValueApi = createApi({
    reducerPath: 'levelValueApi',
    baseQuery: fetchBaseQuery(REST_API_PARAMS),
    tagTypes: ['LevelValue'],
    endpoints: (builder) => ({
        getLevelValues: builder.query({
            query:  ({userid, externalLevelValueInput}) => `/levelvalue/${userid}/${externalLevelValueInput}`,
            providesTags: ['LevelValue']
          }),
        searchLevelValues: builder.query({
            query: (externalLevelValueInput) => `/levelvalue/search/${externalLevelValueInput}`,
            providesTags: ['LevelValue']
        })
    })
})

export const { useGetLevelValuesQuery, useSearchLevelValuesQuery } = levelValueApi
