
import {REST_API_PARAMS} from '../Constants'

export async function fetchDataForSimulationEngine() {

    try {
        const baseUrl = REST_API_PARAMS.baseUrl;

        // Perform multiple API calls in parallel
        const responses = await Promise.all([
            fetch(`${baseUrl}/spokenlanguages`),
            fetch(`${baseUrl}/academicYearOrganizations`),
            fetch(`${baseUrl}/markSystems`),
            fetch(`${baseUrl}/subjectWeightSystems`),
            fetch(`${baseUrl}/schoolyear`),
            fetch(`${baseUrl}/bac/universities`),
            fetch(`${baseUrl}/degrees/highschool`)
        ]);

        // Check if any response failed
        for (const response of responses) {
            if (!response.ok) {
                throw new Error(`API call failed: ${response.statusText}`);
            }
        }

        // Parse all responses
        const [
            spokenLanguagesData,
            academicYearOrganizationsData,
            markSystemsData,
            subjectWeightSystemsData,
            schoolYearsData,
            bacsData,
            degreesData
        ] = await Promise.all(responses.map(r => r.json()));

        // Process university levels
        const processedUniversityLevels = (bacsData || []).map((item) => ({
            ...item,
            name: `BAC+${item.name}`,
        }));

        // Return data ensuring all values are not undefined
        return {
            spokenLanguages: spokenLanguagesData || [],
            academicYearOrganizations: academicYearOrganizationsData || [],
            markSystems: markSystemsData || [],
            schoolYears: schoolYearsData || [],
            subjectWeightSystems: subjectWeightSystemsData || [],
            universityLevels: processedUniversityLevels,
            degrees: degreesData || [],
            isErrorPage: false
        };

    } catch (error) {
        console.error('Error fetching data:', error);
        return {
            spokenLanguages: [],
            academicYearOrganizations: [],
            markSystems: [],
            schoolYears: [],
            subjectWeightSystems: [],
            universityLevels: [],
            degrees: [],
            isErrorPage: true
        };
    }
}

