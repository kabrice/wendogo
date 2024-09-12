import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCountriesQuery } from '../../store/apis/userApi';
import { useGetSpokenLanguagesQuery } from '../../store/apis/spokenLanguageApi';
import { useGetAcademicYearOrganizationsQuery } from '../../store/apis/academicYearOrganizationApi';
import { useGetMarkSystemsQuery } from '../../store/apis/markSystemApi';
import { useGetSubjectWeightSystemsQuery } from '../../store/apis/subjectWeightSystemApi';
import { activateSpinner, deactivateSpinner } from '../../redux/spinnerslice';
import helper from '../../utils/Helper';
import SELabel from './SELabel';
import SEDropDownList from './SEDropDownList';
import SETextArea from './SETextArea';
import SENumberSelection from './SENumberSelection';
import ButtonLarge from '../ButtonLarge';
import { update } from 'lodash';
import SESmallAlertMessage from './SESmallAlertMessage';

const SEAcademicYearHeadDetails = (props) => {
    const { title, tip, showWarning, selectedYear,
            selectedCountry, schoolLevelSelected,
            collapseCountryOption, setCollapseCountryOption,
            selectedCity, setSelectedCity,
            collapseCityOption, setCollapseCityOption,
            selectedSpokenLanguage, setSelectedSpokenLanguage, 
            collapseSpokenLanguageOption, setCollapseSpokenLanguageOption,
            selectedAcademicYearOrganization, setSelectedAcademicYearOrganization,
            collapseAcademicYearOrganizationOption, setCollapseAcademicYearOrganizationOption,
            selectedMarkSystem, setSelectedMarkSystem, 
            collapseMarkSystemOption, setCollapseMarkSystemOption,
            selectedSubjectWeightSystem, setSelectedSubjectWeightSystem,
            collapseSubjectWeightSystemOption, setCollapseSubjectWeightSystemOption,
            updateSelectedCountry, updateSelectedCity, updateSelectedSpokenLanguage, updateSelectedAcademicYearOrganization, updateSelectedMarkSystem, updateSelectedSubjectWeightSystem,
            schoolName, handleChangeSchoolName, handleContinue, showContinueBtn
            } = props;

    const dispatch = useDispatch();
    
    // State variables
    const [countries, setCountries] = useState(null);
    const [cities, setCities] = useState(null);

    const newRefCountry = useRef(null);
    const newRefCity = useRef(null);
    const newRefSpokenLanguage = useRef(null);
    const newRefAcademicYearOrganization = useRef(null);
    const newRefMarkSystem = useRef(null);
    const newRefSubjectWeightSystem = useRef(null);
 
    // Queries 
    const { data, error, isLoading } = useCountriesQuery(selectedCountry.iso2);
    const { data: spokenLanguages, error: spokenLanguagesError, isLoading: spokenLanguagesIsLoading } = useGetSpokenLanguagesQuery();
    const { data: academicYearOrganizations, error: academicYearOrganizationsError, isLoading: academicYearOrganizationsIsLoading } = useGetAcademicYearOrganizationsQuery();
    const { data: markSystems, error: markSystemsError, isLoading: markSystemsIsLoading } = useGetMarkSystemsQuery();
    const { data: subjectWeightSystems, error: subjectWeightSystemsError, isLoading: subjectWeightSystemsIsLoading } = useGetSubjectWeightSystemsQuery();

    const doesValueValid = (schoolName) => {
        console.log('schoolName', schoolName,  schoolName !== undefined, schoolName.trim().length >= 10, /[a-zA-Z].*[a-zA-Z]/.test(schoolName));
        console.log('schoolNamexxx', schoolName !== undefined && schoolName && schoolName.trim().length >= 10 && /[a-zA-Z].*[a-zA-Z]/.test(schoolName));
        return schoolName !== undefined && schoolName && schoolName.trim().length >= 10 && /[a-zA-Z].*[a-zA-Z]/.test(schoolName);
    }
      
    const [valid, setValid] = useState(doesValueValid(schoolName) || schoolName === '');

    useEffect(() => {
        
        if (isLoading || spokenLanguagesIsLoading || academicYearOrganizationsIsLoading || markSystemsIsLoading || subjectWeightSystemsIsLoading) {
            dispatch(activateSpinner());
        }

        if (error || spokenLanguagesError || academicYearOrganizationsError || markSystemsError || subjectWeightSystemsError) {
            console.error('Error:', error || spokenLanguagesError || academicYearOrganizationsError || markSystemsError || subjectWeightSystemsError);
            document.location.href = '/error';
        }
        //console.log('IN SEAcademicYearHeadDetails useEffect');
        if (data) {
            dispatch(deactivateSpinner());
            const sortedCountries = data.countries.map((item) => ({ ...item })).sort((a, b) => a.name.localeCompare(b.name));
            setCountries(sortedCountries);
            //console.log('IN sortedCountries useEffect', sortedCountries);
            const sortedCities = data.cities_new.map((item) => ({ ...item })).sort((a, b) => a.name.localeCompare(b.name));
            setCities(sortedCities);
            //console.log('IN sortedCities setSelectedCity', selectedCity.name);
            sortedCities.forEach((item) => {
                if (item.default && !selectedCity.validated) {
                    setSelectedCity(item);
                }
            });
        }
       
        if(spokenLanguages){
            const selectedCountrySpokenLanguage = spokenLanguages.find(language => language.id === selectedCountry.most_popular_spoken_language_id);
            if (selectedCountrySpokenLanguage) {
                setSelectedSpokenLanguage({ name: selectedCountrySpokenLanguage.name });
            }  
        }
        if(!showContinueBtn){
            helper.addOutsideClick(handleOutsideClick);
            return;
        }

        if (academicYearOrganizations || subjectWeightSystems) {
            const isHigherEducation = schoolLevelSelected === "Supérieur";
        
            // Initialize based on school level
            const selectedAcademicYearOrganizationInit = isHigherEducation
                ? { name: "Semestre", id: 'ayo00002' }
                : { name: "Trimestre", id: 'ayo00001' };
        
            const selectedSubjectWeightSystemInit = isHigherEducation
                ? { name: "Crédit", id: 'sws001' }
                : { name: "Coefficient", id: 'sws002' };
        
            // Update only if not validated
            const updateIfNotValidated = (currentValue, setValue, updateFunction, initialValue) => {
                if (!currentValue.validated) {
                    setValue(initialValue);
                    updateFunction(initialValue);
                }
            };
        
            updateIfNotValidated(selectedAcademicYearOrganization, setSelectedAcademicYearOrganization, updateSelectedAcademicYearOrganization, selectedAcademicYearOrganizationInit);
            updateIfNotValidated(selectedSubjectWeightSystem, setSelectedSubjectWeightSystem, updateSelectedSubjectWeightSystem, selectedSubjectWeightSystemInit);
        }

        if(markSystems && !selectedMarkSystem.validated){
            const selectedMarkSystemInit = markSystems.find(markSystem => markSystem.id === 'crs0003');
            setSelectedMarkSystem({ name: "Sur 20", id: 'crs0003'});
            updateSelectedMarkSystem(selectedMarkSystemInit);
        }

        if (spokenLanguages || academicYearOrganizations || markSystems || subjectWeightSystems) {
            //console.log('spokenLanguages', spokenLanguages);
            dispatch(deactivateSpinner());
        }

        helper.addOutsideClick(handleOutsideClick);

        
    }, [data, error, isLoading, 
        spokenLanguages, spokenLanguagesError, spokenLanguagesIsLoading, 
        academicYearOrganizations, academicYearOrganizationsError, academicYearOrganizationsIsLoading, 
        markSystems, markSystemsError, markSystemsIsLoading, 
        subjectWeightSystems, subjectWeightSystemsError, subjectWeightSystemsIsLoading]);

    const handleOutsideClick = (e) => {
        if (newRefCountry.current && !newRefCountry.current.contains(e.target) && !helper.isTargetContainsIgnoreClass(e.target)) {
            setCollapseCountryOption(true);
            //console.log('Outside click on ResidentCountry');
        }
        if (newRefCity.current && !newRefCity.current.contains(e.target) && !helper.isTargetContainsIgnoreClass(e.target)) {
            setCollapseCityOption(true);
            //console.log('Outside click on ResidentCity');
        }
        if (newRefSpokenLanguage.current && !newRefSpokenLanguage.current.contains(e.target) && !helper.isTargetContainsIgnoreClass(e.target)) {
            setCollapseSpokenLanguageOption(true);
            //console.log('Outside click on SpokenLanguage');
        }
        if (newRefAcademicYearOrganization.current && !newRefAcademicYearOrganization.current.contains(e.target) && !helper.isTargetContainsIgnoreClass(e.target)) {
            setCollapseAcademicYearOrganizationOption(true);
            //console.log('Outside click on AcademicYearOrganization');
        }
        if (newRefMarkSystem.current && !newRefMarkSystem.current.contains(e.target) && !helper.isTargetContainsIgnoreClass(e.target)) {
            setCollapseMarkSystemOption(true);
            //console.log('Outside click on MarkSystem');
        }
        if (newRefSubjectWeightSystem.current && !newRefSubjectWeightSystem.current.contains(e.target) && !helper.isTargetContainsIgnoreClass(e.target)) {
            setCollapseSubjectWeightSystemOption(true);
            //console.log('Outside click on SubjectWeightSystem');
        }

    };

    // Toggle functions for dropdowns
    const toggleMarkSystemDropdown = () => setCollapseMarkSystemOption(!collapseMarkSystemOption);
    const toggleSubjectWeightSystemDropdown = () => setCollapseSubjectWeightSystemOption(!collapseSubjectWeightSystemOption);
    const toggleAcademicYearOrganizationDropdown = () => setCollapseAcademicYearOrganizationOption(!collapseAcademicYearOrganizationOption);
    const toggleSpokenLanguageDropdown = () => setCollapseSpokenLanguageOption(!collapseSpokenLanguageOption);
    const toggleCountryDropdown = () => setCollapseCountryOption(!collapseCountryOption);
    const toggleCityDropdown = () => setCollapseCityOption(!collapseCityOption);

    const voidFunction = () => { return null;}

    return (
        <div style={{margin: '0 0 35px'}}>
            <SELabel title={title} tip={tip}/>

            {countries && (
                <SEDropDownList
                    newRef={newRefCountry}
                    collapseOption={collapseCountryOption}
                    items={countries}
                    itemSelected={selectedCountry}
                    toggleDropdown={toggleCountryDropdown}
                    updateSelected={updateSelectedCountry}
                    isPartOfInputGroup={true}
                    inputGroupBlockTitle={`Selectionnez le pays d'étude`}/>
            )}

            {cities && (
                <SEDropDownList
                    newRef={newRefCity}
                    collapseOption={collapseCityOption}
                    items={cities}
                    itemSelected={selectedCity}
                    toggleDropdown={toggleCityDropdown}
                    updateSelected={updateSelectedCity}
                    isPartOfInputGroup={true}
                    inputGroupBlockTitle={`Selectionnez la ville où se situait l'école`}/>
            )}

            <SETextArea
                placeholderText="Renseignez le nom de l'établissement pour cette année."
                isPartOfInputGroup={true}
                value={schoolName}
                valid={valid}
                setValid={setValid}
                onClickOutside={doesValueValid}
                //doesValueValid={doesValueValid}
                handleChange={handleChangeSchoolName}/>

            {spokenLanguages && (
                <SEDropDownList
                    newRef={newRefSpokenLanguage}
                    collapseOption={collapseSpokenLanguageOption}
                    items={spokenLanguages}
                    itemSelected={selectedSpokenLanguage}
                    toggleDropdown={toggleSpokenLanguageDropdown}
                    updateSelected={updateSelectedSpokenLanguage}
                    isPartOfInputGroup={true}
                    inputGroupBlockTitle={`Selectionnez la langue d'enseignement`}/>
            )}

            {academicYearOrganizations && (
                <SEDropDownList
                    newRef={newRefAcademicYearOrganization}
                    collapseOption={collapseAcademicYearOrganizationOption}
                    items={academicYearOrganizations}
                    itemSelected={selectedAcademicYearOrganization}
                    toggleDropdown={toggleAcademicYearOrganizationDropdown}
                    updateSelected={updateSelectedAcademicYearOrganization}
                    isPartOfInputGroup={true}
                    inputGroupBlockTitle={`Selectionnez le type de période académique`}/>
            )}

            {markSystems && (
                <SEDropDownList
                    newRef={newRefMarkSystem}
                    collapseOption={collapseMarkSystemOption}
                    items={markSystems}
                    itemSelected={selectedMarkSystem}
                    toggleDropdown={toggleMarkSystemDropdown}
                    updateSelected={updateSelectedMarkSystem}
                    isPartOfInputGroup={true}
                    inputGroupBlockTitle={`Selectionnez le système de notation`}/>
            )}

            {subjectWeightSystems && (
                <SEDropDownList
                    newRef={newRefSubjectWeightSystem}
                    collapseOption={collapseSubjectWeightSystemOption}
                    items={subjectWeightSystems}
                    itemSelected={selectedSubjectWeightSystem}
                    toggleDropdown={toggleSubjectWeightSystemDropdown}
                    updateSelected={updateSelectedSubjectWeightSystem}
                    isPartOfInputGroup={true}
                    inputGroupBlockTitle={`Selectionnez le système de point`}/>
            )}

            {showWarning && <SESmallAlertMessage 
                                type="warning" 
                                content={`Attention, modifier le système de notation entraînera la suppression 
                                          de toutes les données du relevé de notes pour l'année ${selectedYear}. 
                                          Remettez la valeur précédente pour annuler l'action.`}/>}
             {showContinueBtn &&            
                                <div className="FieldView DaisyFieldView field-default SelectField VEH_USA_KILOM" style={{ margin: 0 }}>
                                    <ButtonLarge name="Continuer" handleContinue={valid ? handleContinue : voidFunction}/>
                                </div>}

        </div>
    );
};

export default SEAcademicYearHeadDetails;
