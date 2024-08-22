import {createApi, fetchBaseQuery, REST_API_PARAMS} from './init.js'

export const countryApi = createApi({
    reducerPath: 'countryApi',
    baseQuery: fetchBaseQuery(REST_API_PARAMS),
    tagTypes: ['Country'],
    endpoints: (builder) => ({
        getCountries: builder.query({
            query: (countryIso2) => `/countries/${countryIso2}`,
            providesTags: ['Country']
          })
    })
})

export const { useGetCountriesQuery } = countryApi
