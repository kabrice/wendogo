import React, { useState, useRef} from "react";
import SEAcademicYearHeadDetails from "../../components/SimulationEngine/SEAcademicYearHeadDetails";
import { useDispatch, useSelector } from 'react-redux';
import { setStep } from '../../redux/simulationStepSlice';
import helper from '../../utils/Helper';
import { SIMULATION_ENGINE_STEPS } from '../../utils/Constants'; 
import _ from "lodash";


// Entête de l'année scolaire la plus recente
const AcademicYearHeadDetails3 = () => {

    let user = helper.getLocalStorageWithExpiration('wendogouser');
    const dispatch = useDispatch();
    //console.log('user AcademicYearHeadDetails3', user)
    const [selectedCountry, setSelectedCountry] = useState(user?.academicYearHeadDetails3?.country || user?.selectedCountry || { name: '',  validated: false });
    const [collapseCountryOption, setCollapseCountryOption] = useState(true);
    const [selectedCity, setSelectedCity] = useState(user?.academicYearHeadDetails3?.city || { name: '', validated: false });
    const [collapseCityOption, setCollapseCityOption] = useState(true);  
    const [selectedSpokenLanguage, setSelectedSpokenLanguage] = useState(user?.academicYearHeadDetails3?.spokenLanguage || { name: '', validated: false });
    const [collapseSpokenLanguageOption, setCollapseSpokenLanguageOption] = useState(true);
    const [selectedAcademicYearOrganization, setSelectedAcademicYearOrganization] = useState(user?.academicYearHeadDetails3?.academicYearOrganization || { name: '', validated: false });
    const [collapseAcademicYearOrganizationOption, setCollapseAcademicYearOrganizationOption] = useState(true);
    const [selectedMarkSystem, setSelectedMarkSystem] = useState(user?.academicYearHeadDetails3?.markSystem || { name: '', validated: false });
    const [collapseMarkSystemOption, setCollapseMarkSystemOption] = useState(true);
    const [selectedSubjectWeightSystem, setSelectedSubjectWeightSystem] = useState(user?.academicYearHeadDetails3?.subjectWeightSystem || { name: '', validated: false });
    const [collapseSubjectWeightSystemOption, setCollapseSubjectWeightSystemOption] = useState(true);
    const [schoolName, setSchoolName] = useState(user?.academicYearHeadDetails3?.schoolName || '');
    const [showWarning, setShowWarning] = useState(false);
    const [academicYearHeadDetails3, setAcademicYearHeadDetails3] = useState(user?.academicYearHeadDetails3 || {});
    // Use useRef to store the initial markSystem name
    const initialMarkSystemNameRef = useRef(user?.academicYearHeadDetails3?.markSystem?.name);

    // Redux state selectors
    const simulationStepGlobal = useSelector((state) => state.simulationStep);
    //console.log('simulationStepGlobal XXXXX', user?.academicYearHeadDetails3)
    // Update functions for dropdowns

    const updateSelectedCountry = (item) => {
        setSelectedCountry({ ...item, validated: true });
        setCollapseCountryOption(true);  
        //academicYearHeadDetails3.country = { ...item, validated: true };
        setAcademicYearHeadDetails3({ ...academicYearHeadDetails3, country: { ...item, validated: true } })
        updateWendogouser(SIMULATION_ENGINE_STEPS.ACADEMIC_YEAR_HEAD_DETAILS3, academicYearHeadDetails3)
    };

    const updateSelectedCity = (item) => {
        setSelectedCity({ ...item, validated: true });
        setCollapseCityOption(true);  
        //academicYearHeadDetails3.city = { ...item, validated: true };
        setAcademicYearHeadDetails3({ ...academicYearHeadDetails3, city: { ...item, validated: true } })
        //console.log('setSelectedCity', academicYearHeadDetails3)
        updateWendogouser(SIMULATION_ENGINE_STEPS.ACADEMIC_YEAR_HEAD_DETAILS3, academicYearHeadDetails3)
    };

    const updateSelectedMarkSystem = (item) => {
        const originalMarkSystemName = initialMarkSystemNameRef.current;
        const reportCardExistsAndNotEmpty = user?.reportCard3 && !_.every(user.reportCard3, _.isEmpty);

        if (item?.name !== originalMarkSystemName && reportCardExistsAndNotEmpty) {
            setShowWarning(true);
        } else if (item?.name === originalMarkSystemName) {
            setShowWarning(false);
        }

        // Update the selected mark system state
        setSelectedMarkSystem({ ...item, validated: true });
        setCollapseMarkSystemOption(true);

        // Update the academicYearHeadDetails3 object and local storage
        //academicYearHeadDetails3.markSystem = { ...item, validated: true };
        setAcademicYearHeadDetails3({ ...academicYearHeadDetails3, markSystem: { ...item, validated: true } })
        console.log('academicYearHeadDetails3 markSystem', academicYearHeadDetails3)
        updateWendogouser(SIMULATION_ENGINE_STEPS.ACADEMIC_YEAR_HEAD_DETAILS3, academicYearHeadDetails3);
    };
    

    const updateSelectedSubjectWeightSystem = (item) => {
        setSelectedSubjectWeightSystem({ ...item, validated: true });
        setCollapseSubjectWeightSystemOption(true)
        //academicYearHeadDetails3.subjectWeightSystem = { ...item, validated: true }
        setAcademicYearHeadDetails3({ ...academicYearHeadDetails3, subjectWeightSystem: { ...item, validated: true } })
        console.log('academicYearHeadDetails3 subjectWeightSystem', academicYearHeadDetails3)
        updateWendogouser(SIMULATION_ENGINE_STEPS.ACADEMIC_YEAR_HEAD_DETAILS3, academicYearHeadDetails3)
    };

    const updateSelectedAcademicYearOrganization = (item) => {
        setSelectedAcademicYearOrganization({ ...item, validated: true });
        setCollapseAcademicYearOrganizationOption(true);
        console.log('academicYearHeadDetails3 academicYearOrganization before', academicYearHeadDetails3)
        setAcademicYearHeadDetails3({ ...academicYearHeadDetails3, academicYearOrganization: { ...item, validated: true } })
        //academicYearHeadDetails3.academicYearOrganization = { ...item, validated: true }
        console.log('academicYearHeadDetails3 academicYearOrganization', academicYearHeadDetails3)
        updateWendogouser(SIMULATION_ENGINE_STEPS.ACADEMIC_YEAR_HEAD_DETAILS3, academicYearHeadDetails3)
    };

    const updateSelectedSpokenLanguage = (item) => {
        setSelectedSpokenLanguage({ ...item, validated: true });
        setCollapseSpokenLanguageOption(true);  
        //academicYearHeadDetails3.spokenLanguage = { ...item, validated: true };
        setAcademicYearHeadDetails3({ ...academicYearHeadDetails3, spokenLanguage: { ...item, validated: true } })
        updateWendogouser(SIMULATION_ENGINE_STEPS.ACADEMIC_YEAR_HEAD_DETAILS3, academicYearHeadDetails3)
    }; 

    const handleChangeSchoolName = (e) => {
        const inputValue = e.target.value
        setSchoolName(inputValue); 
        //console.log('handleChangeSchoolName', academicYearHeadDetails3)
        //academicYearHeadDetails3.schoolName = inputValue;
        setAcademicYearHeadDetails3({ ...academicYearHeadDetails3, schoolName: inputValue })
        updateWendogouser(SIMULATION_ENGINE_STEPS.ACADEMIC_YEAR_HEAD_DETAILS3, academicYearHeadDetails3)
        
    };

    const handleContinue = () => {  
        console.log('user?.reportCard3', user?.reportCard3)
        updateWendogouser(SIMULATION_ENGINE_STEPS.REPORT_CARD3, academicYearHeadDetails3, showWarning ? null : user?.reportCard3)
        if (showWarning) {
            setShowWarning(false);
        }
    };

    const updateWendogouser = (simulationStep, academicYearHeadDetails3, reportCard3 = user?.reportCard3) => {
        dispatch(setStep(simulationStep));
        let updatedUser = { ...user, simulationStep, academicYearHeadDetails3, reportCard3, date: new Date().toISOString() };
        helper.setLocalStorageWithExpiration('wendogouser', updatedUser, false);
    };
    
    
    return (
        <SEAcademicYearHeadDetails 
            title={`Informations au début de l'année académique ${user.selectedSchoolYear3.name}`}
            tip={`Veuillez renseigner les détails de votre année académique ${user.selectedSchoolYear3.name-1}/${user.selectedSchoolYear3.name}.`}
            showWarning={showWarning}
            selectedYear={user.selectedSchoolYear3.name}
            selectedCountry={selectedCountry}
            schoolLevelSelected={user.schoolLevelSelected}
            setSelectedCountry={setSelectedCountry}
            collapseCountryOption={collapseCountryOption}
            setCollapseCountryOption={setCollapseCountryOption}
            selectedCity={selectedCity}
            setSelectedCity={setSelectedCity}
            collapseCityOption={collapseCityOption}
            setCollapseCityOption={setCollapseCityOption}
            selectedSpokenLanguage={selectedSpokenLanguage}
            setSelectedSpokenLanguage={setSelectedSpokenLanguage}
            collapseSpokenLanguageOption={collapseSpokenLanguageOption}
            setCollapseSpokenLanguageOption={setCollapseSpokenLanguageOption}
            selectedAcademicYearOrganization={selectedAcademicYearOrganization}
            setSelectedAcademicYearOrganization={setSelectedAcademicYearOrganization}
            collapseAcademicYearOrganizationOption={collapseAcademicYearOrganizationOption}
            setCollapseAcademicYearOrganizationOption={setCollapseAcademicYearOrganizationOption}
            selectedMarkSystem={selectedMarkSystem}
            setSelectedMarkSystem={setSelectedMarkSystem}
            collapseMarkSystemOption={collapseMarkSystemOption}
            setCollapseMarkSystemOption={setCollapseMarkSystemOption}
            selectedSubjectWeightSystem={selectedSubjectWeightSystem}
            setSelectedSubjectWeightSystem={setSelectedSubjectWeightSystem}
            collapseSubjectWeightSystemOption={collapseSubjectWeightSystemOption}
            setCollapseSubjectWeightSystemOption={setCollapseSubjectWeightSystemOption}
            updateSelectedMarkSystem={updateSelectedMarkSystem}
            updateSelectedSubjectWeightSystem={updateSelectedSubjectWeightSystem}
            updateSelectedAcademicYearOrganization={updateSelectedAcademicYearOrganization}
            updateSelectedSpokenLanguage={updateSelectedSpokenLanguage}
            updateSelectedCountry={updateSelectedCountry}
            updateSelectedCity={updateSelectedCity}
            schoolName={schoolName}
            setSchoolName={setSchoolName}
            handleChangeSchoolName={handleChangeSchoolName}
            handleContinue={handleContinue}
            showContinueBtn={simulationStepGlobal === SIMULATION_ENGINE_STEPS.ACADEMIC_YEAR_HEAD_DETAILS3}
        />
    );
}

export default AcademicYearHeadDetails3;
