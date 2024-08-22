import {createApi, fetchBaseQuery, REST_API_PARAMS} from './init.js'

export const visaTypeApi = createApi({
    reducerPath: 'visaTypeApi',
    baseQuery: fetchBaseQuery(REST_API_PARAMS),
    tagTypes: ['VisaType'],
    endpoints: (builder) => ({
        getVisaTypesByCountryIso2: builder.query({
            query: ({countryIso2}) => `/visatypes/country/${countryIso2}`,
            providesTags: ['VisaType']
          })
    })
})

export const { useGetVisaTypesByCountryIso2Query } = visaTypeApi
