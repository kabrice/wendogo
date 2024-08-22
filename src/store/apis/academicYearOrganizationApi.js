import {createApi, fetchBaseQuery, REST_API_PARAMS} from './init.js'

export const academicYearOrganizationApi = createApi({
    reducerPath: 'academicYearOrganizationApi',
    baseQuery: fetchBaseQuery(REST_API_PARAMS),
    tagTypes: ['AcademicYearOrganization'],
    endpoints: (builder) => ({
        getAcademicYearOrganizations: builder.query({
            query: () => `/academicYearOrganizations`,
            providesTags: ['AcademicYearOrganization']
          })
    })
})

export const { useGetAcademicYearOrganizationsQuery } = academicYearOrganizationApi
