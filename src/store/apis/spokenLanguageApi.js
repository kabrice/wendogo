import {createApi, fetchBaseQuery, REST_API_PARAMS} from './init.js'

export const spokenLanguageApi = createApi({
    reducerPath: 'spokenLanguageApi',
    baseQuery: fetchBaseQuery(REST_API_PARAMS),
    tagTypes: ['SpokenLanguages'],
    endpoints: (builder) => ({
        getSpokenLanguages: builder.query({
            query: () => `/spokenlanguages`,
            providesTags: ['SpokenLanguages']
          })
    })
})

export const { useGetSpokenLanguagesQuery } = spokenLanguageApi
