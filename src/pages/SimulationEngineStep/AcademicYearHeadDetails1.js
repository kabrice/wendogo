import React, { useState, useRef} from "react";
import SEAcademicYearHeadDetails from "../../components/SimulationEngine/SEAcademicYearHeadDetails";
import { useDispatch, useSelector } from 'react-redux';
import { setStep } from '../../redux/simulationStepSlice';
import helper from '../../utils/Helper';
import { SIMULATION_ENGINE_STEPS } from '../../utils/Constants'; 
import _ from "lodash";


// Entête de l'année scolaire la plus recente
const AcademicYearHeadDetails1 = () => {

    let user = helper.getLocalStorageWithExpiration('wendogouser');
    const dispatch = useDispatch();
    //console.log('user AcademicYearHeadDetails1', user)
    const [selectedCountry, setSelectedCountry] = useState(user?.academicYearHeadDetails1?.country || user?.academicYearHeadDetails2?.country || user?.selectedCountry || { name: '',  validated: false });
    const [collapseCountryOption, setCollapseCountryOption] = useState(true);
    const [selectedCity, setSelectedCity] = useState(user?.academicYearHeadDetails1?.city || user?.academicYearHeadDetails2?.country || { name: '', validated: false });
    const [collapseCityOption, setCollapseCityOption] = useState(true);  
    const [selectedSpokenLanguage, setSelectedSpokenLanguage] = useState(user?.academicYearHeadDetails1?.spokenLanguage || user?.academicYearHeadDetails2?.country || { name: '', validated: false });
    const [collapseSpokenLanguageOption, setCollapseSpokenLanguageOption] = useState(true);
    console.log('user.academicYearHeadDetails2.academicYearOrganization', user?.academicYearHeadDetails2?.academicYearOrganization)
    const [selectedAcademicYearOrganization, setSelectedAcademicYearOrganization] = useState(user?.academicYearHeadDetails1?.academicYearOrganization || user?.academicYearHeadDetails2?.academicYearOrganization ||{ name: '', validated: false });
    const [collapseAcademicYearOrganizationOption, setCollapseAcademicYearOrganizationOption] = useState(true);
    const [selectedMarkSystem, setSelectedMarkSystem] = useState(user?.academicYearHeadDetails1?.markSystem || user?.academicYearHeadDetails2?.markSystem || { name: '', validated: false });
    const [collapseMarkSystemOption, setCollapseMarkSystemOption] = useState(true);
    const [selectedSubjectWeightSystem, setSelectedSubjectWeightSystem] = useState(user?.academicYearHeadDetails1?.subjectWeightSystem || user?.academicYearHeadDetails2?.subjectWeightSystem || { name: '', validated: false });
    const [collapseSubjectWeightSystemOption, setCollapseSubjectWeightSystemOption] = useState(true);
    const [schoolName, setSchoolName] = useState(user?.academicYearHeadDetails1?.schoolName || user?.academicYearHeadDetails2?.schoolName || '');
    const [showWarning, setShowWarning] = useState(false);
    const [academicYearHeadDetails1, setAcademicYearHeadDetails1] = useState(user?.academicYearHeadDetails1 || user?.academicYearHeadDetails2 || {});
    // Use useRef to store the initial markSystem name
    const initialMarkSystemNameRef = useRef(user?.academicYearHeadDetails1?.markSystem?.name);

    // Redux state selectors
    const simulationStepGlobal = useSelector((state) => state.simulationStep);
    //console.log('simulationStepGlobal XXXXX', user?.academicYearHeadDetails1)
    // Update functions for dropdowns

    const updateSelectedCountry = (item) => {
        setSelectedCountry({ ...item, validated: true });
        setCollapseCountryOption(true);  
        //academicYearHeadDetails1.country = { ...item, validated: true };
        setAcademicYearHeadDetails1({ ...academicYearHeadDetails1, country: { ...item, validated: true } })
        updateWendogouser(SIMULATION_ENGINE_STEPS.ACADEMIC_YEAR_HEAD_DETAILS1, academicYearHeadDetails1)
    };

    const updateSelectedCity = (item) => {
        setSelectedCity({ ...item, validated: true });
        setCollapseCityOption(true);  
        //academicYearHeadDetails1.city = { ...item, validated: true };
        setAcademicYearHeadDetails1({ ...academicYearHeadDetails1, city: { ...item, validated: true } })
        //console.log('setSelectedCity', academicYearHeadDetails1)
        updateWendogouser(SIMULATION_ENGINE_STEPS.ACADEMIC_YEAR_HEAD_DETAILS1, academicYearHeadDetails1)
    };

    const updateSelectedMarkSystem = (item) => {
        const originalMarkSystemName = initialMarkSystemNameRef.current;
        const isReportCardsValid = user?.reportCard1 && !_.every(user?.reportCard1, _.isEmpty);

        if (item?.name !== originalMarkSystemName && isReportCardsValid) {
            setShowWarning(true);
        } else if (item?.name === originalMarkSystemName) {
            setShowWarning(false);
        }

        // Update the selected mark system state
        setSelectedMarkSystem({ ...item, validated: true });
        setCollapseMarkSystemOption(true);
 
        setAcademicYearHeadDetails1({ ...academicYearHeadDetails1, markSystem: { ...item, validated: true } }) 
        updateWendogouser(SIMULATION_ENGINE_STEPS.ACADEMIC_YEAR_HEAD_DETAILS1, academicYearHeadDetails1);
    };
    

    const updateSelectedSubjectWeightSystem = (item) => {
        setSelectedSubjectWeightSystem({ ...item, validated: true });
        setCollapseSubjectWeightSystemOption(true) 
        setAcademicYearHeadDetails1({ ...academicYearHeadDetails1, subjectWeightSystem: { ...item, validated: true } })
        console.log('academicYearHeadDetails1 subjectWeightSystem', academicYearHeadDetails1)
        updateWendogouser(SIMULATION_ENGINE_STEPS.ACADEMIC_YEAR_HEAD_DETAILS1, academicYearHeadDetails1)
    };

    const updateSelectedAcademicYearOrganization = (item) => {
        setSelectedAcademicYearOrganization({ ...item, validated: true });
        setCollapseAcademicYearOrganizationOption(true); 
        setAcademicYearHeadDetails1({ ...academicYearHeadDetails1, academicYearOrganization: { ...item, validated: true } }) 
        updateWendogouser(SIMULATION_ENGINE_STEPS.ACADEMIC_YEAR_HEAD_DETAILS1, academicYearHeadDetails1)
    };

    const updateSelectedSpokenLanguage = (item) => {
        setSelectedSpokenLanguage({ ...item, validated: true });
        setCollapseSpokenLanguageOption(true);   
        setAcademicYearHeadDetails1({ ...academicYearHeadDetails1, spokenLanguage: { ...item, validated: true } })
        updateWendogouser(SIMULATION_ENGINE_STEPS.ACADEMIC_YEAR_HEAD_DETAILS1, academicYearHeadDetails1)
    }; 

    const handleChangeSchoolName = (e) => {
        const inputValue = e.target.value
        setSchoolName(inputValue);  
        setAcademicYearHeadDetails1({ ...academicYearHeadDetails1, schoolName: inputValue })
        updateWendogouser(SIMULATION_ENGINE_STEPS.ACADEMIC_YEAR_HEAD_DETAILS1, academicYearHeadDetails1)
        
    };

    const handleContinue = () => {  
        console.log('user?.reportCard1', user?.reportCard1)
        let updatedAcademicYearHeadDetails1 = { ...academicYearHeadDetails1, city: selectedCity, country: selectedCountry, markSystem: selectedMarkSystem, spokenLanguage: selectedSpokenLanguage, subjectWeightSystem: selectedSubjectWeightSystem, academicYearOrganization: selectedAcademicYearOrganization, schoolName }
        updateWendogouser(SIMULATION_ENGINE_STEPS.REPORT_CARD1, updatedAcademicYearHeadDetails1, showWarning ? null : user?.reportCard1)
        if (showWarning) {
            setShowWarning(false);
        }
    };

    const updateWendogouser = (simulationStep, academicYearHeadDetails1, reportCard1 = user?.reportCard1) => {
        dispatch(setStep(simulationStep));
        let mainSubjects = user?.mainSubjects;
        if (!user.isResult3Available && !user.isResult2Available) { 
            mainSubjects = null;
        }
        let updatedUser = { ...user, simulationStep, academicYearHeadDetails1, reportCard1, mainSubjects, date: new Date().toISOString() };
        helper.setLocalStorageWithExpiration('wendogouser', updatedUser);
    };
    
    
    return (
        <SEAcademicYearHeadDetails 
            title={`Informations au début de l'année académique ${user.selectedSchoolYear1.name}`}
            tip={`Veuillez renseigner les détails de votre année académique ${user.selectedSchoolYear1.name-1}/${user.selectedSchoolYear1.name}.`}
            showWarning={showWarning}
            selectedYear={user.selectedSchoolYear1.name}
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
            showContinueBtn={simulationStepGlobal === SIMULATION_ENGINE_STEPS.ACADEMIC_YEAR_HEAD_DETAILS1}
        />
    );
}

export default AcademicYearHeadDetails1;
