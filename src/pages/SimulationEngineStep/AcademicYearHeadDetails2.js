import React, { useState, useRef} from "react";
import SEAcademicYearHeadDetails from "../../components/SimulationEngine/SEAcademicYearHeadDetails";
import { useDispatch, useSelector } from 'react-redux';
import { setStep } from '../../redux/simulationStepSlice';
import helper from '../../utils/Helper';
import { SIMULATION_ENGINE_STEPS } from '../../utils/Constants'; 
import _ from "lodash";


// Entête de l'année scolaire la plus recente
const AcademicYearHeadDetails2 = () => {

    let user = helper.getLocalStorageWithExpiration('wendogouser');
    const dispatch = useDispatch();
    //console.log('user AcademicYearHeadDetails2', user)
    const [selectedCountry, setSelectedCountry] = useState(user?.academicYearHeadDetails2?.country || user?.academicYearHeadDetails3?.country || user?.selectedCountry || { name: '',  validated: false });
    const [collapseCountryOption, setCollapseCountryOption] = useState(true);
    const [selectedCity, setSelectedCity] = useState(user?.academicYearHeadDetails2?.city || user?.academicYearHeadDetails3?.country || { name: '', validated: false });
    const [collapseCityOption, setCollapseCityOption] = useState(true);  
    const [selectedSpokenLanguage, setSelectedSpokenLanguage] = useState(user?.academicYearHeadDetails2?.spokenLanguage || user?.academicYearHeadDetails3?.country || { name: '', validated: false });
    const [collapseSpokenLanguageOption, setCollapseSpokenLanguageOption] = useState(true);
    const [selectedAcademicYearOrganization, setSelectedAcademicYearOrganization] = useState(user?.academicYearHeadDetails2?.academicYearOrganization || user?.academicYearHeadDetails3?.academicYearOrganization ||{ name: '', validated: false });
    const [collapseAcademicYearOrganizationOption, setCollapseAcademicYearOrganizationOption] = useState(true);
    const [selectedMarkSystem, setSelectedMarkSystem] = useState(user?.academicYearHeadDetails2?.markSystem || user?.academicYearHeadDetails3?.markSystem || { name: '', validated: false });
    const [collapseMarkSystemOption, setCollapseMarkSystemOption] = useState(true);
    const [selectedSubjectWeightSystem, setSelectedSubjectWeightSystem] = useState(user?.academicYearHeadDetails2?.subjectWeightSystem || user?.academicYearHeadDetails3?.subjectWeightSystem || { name: '', validated: false });
    const [collapseSubjectWeightSystemOption, setCollapseSubjectWeightSystemOption] = useState(true);
    const [schoolName, setSchoolName] = useState(user?.academicYearHeadDetails2?.schoolName || user?.academicYearHeadDetails3?.schoolName || '');
    const [showWarning, setShowWarning] = useState(false);
    const [academicYearHeadDetails2, setAcademicYearHeadDetails2] = useState(user?.academicYearHeadDetails2 || user?.academicYearHeadDetails3 || {});
    // Use useRef to store the initial markSystem name
    const initialMarkSystemNameRef = useRef(user?.academicYearHeadDetails2?.markSystem?.name);

    // Redux state selectors
    const simulationStepGlobal = useSelector((state) => state.simulationStep);
    //console.log('simulationStepGlobal XXXXX', user?.academicYearHeadDetails2)
    // Update functions for dropdowns

    const updateSelectedCountry = (item) => {
        setSelectedCountry({ ...item, validated: true });
        setCollapseCountryOption(true);  
        //academicYearHeadDetails2.country = { ...item, validated: true };
        setAcademicYearHeadDetails2({ ...academicYearHeadDetails2, country: { ...item, validated: true } })
        updateWendogouser(SIMULATION_ENGINE_STEPS.ACADEMIC_YEAR_HEAD_DETAILS2, academicYearHeadDetails2)
    };

    const updateSelectedCity = (item) => {
        setSelectedCity({ ...item, validated: true });
        setCollapseCityOption(true);  
        //academicYearHeadDetails2.city = { ...item, validated: true };
        setAcademicYearHeadDetails2({ ...academicYearHeadDetails2, city: { ...item, validated: true } })
        //console.log('setSelectedCity', academicYearHeadDetails2)
        updateWendogouser(SIMULATION_ENGINE_STEPS.ACADEMIC_YEAR_HEAD_DETAILS2, academicYearHeadDetails2)
    };

    const updateSelectedMarkSystem = (item) => {
        const originalMarkSystemName = initialMarkSystemNameRef.current;
        const isReportCardsValid = user?.reportCard2 && !_.every(user.reportCard2, _.isEmpty);

        if (item?.name !== originalMarkSystemName && isReportCardsValid) {
            setShowWarning(true);
        } else if (item?.name === originalMarkSystemName) {
            setShowWarning(false);
        }

        // Update the selected mark system state
        setSelectedMarkSystem({ ...item, validated: true });
        setCollapseMarkSystemOption(true);
 
        setAcademicYearHeadDetails2({ ...academicYearHeadDetails2, markSystem: { ...item, validated: true } }) 
        updateWendogouser(SIMULATION_ENGINE_STEPS.ACADEMIC_YEAR_HEAD_DETAILS2, academicYearHeadDetails2);
    };
    

    const updateSelectedSubjectWeightSystem = (item) => {
        setSelectedSubjectWeightSystem({ ...item, validated: true });
        setCollapseSubjectWeightSystemOption(true) 
        setAcademicYearHeadDetails2({ ...academicYearHeadDetails2, subjectWeightSystem: { ...item, validated: true } })
        console.log('academicYearHeadDetails2 subjectWeightSystem', academicYearHeadDetails2)
        updateWendogouser(SIMULATION_ENGINE_STEPS.ACADEMIC_YEAR_HEAD_DETAILS2, academicYearHeadDetails2)
    };

    const updateSelectedAcademicYearOrganization = (item) => {
        setSelectedAcademicYearOrganization({ ...item, validated: true });
        setCollapseAcademicYearOrganizationOption(true); 
        setAcademicYearHeadDetails2({ ...academicYearHeadDetails2, academicYearOrganization: { ...item, validated: true } }) 
        updateWendogouser(SIMULATION_ENGINE_STEPS.ACADEMIC_YEAR_HEAD_DETAILS2, academicYearHeadDetails2)
    };

    const updateSelectedSpokenLanguage = (item) => {
        setSelectedSpokenLanguage({ ...item, validated: true });
        setCollapseSpokenLanguageOption(true);   
        setAcademicYearHeadDetails2({ ...academicYearHeadDetails2, spokenLanguage: { ...item, validated: true } })
        updateWendogouser(SIMULATION_ENGINE_STEPS.ACADEMIC_YEAR_HEAD_DETAILS2, academicYearHeadDetails2)
    }; 

    const handleChangeSchoolName = (e) => {
        const inputValue = e.target.value
        setSchoolName(inputValue);  
        setAcademicYearHeadDetails2({ ...academicYearHeadDetails2, schoolName: inputValue })
        updateWendogouser(SIMULATION_ENGINE_STEPS.ACADEMIC_YEAR_HEAD_DETAILS2, academicYearHeadDetails2)
        
    };

    const handleContinue = () => {  
        console.log('user?.reportCard2', user?.reportCard2)

        let updatedAcademicYearHeadDetails2 = { ...academicYearHeadDetails2, city: selectedCity, country: selectedCountry, markSystem: selectedMarkSystem, spokenLanguage: selectedSpokenLanguage, subjectWeightSystem: selectedSubjectWeightSystem, academicYearOrganization: selectedAcademicYearOrganization, schoolName }
        updateWendogouser(SIMULATION_ENGINE_STEPS.REPORT_CARD2, updatedAcademicYearHeadDetails2, showWarning ? null : user?.reportCard2)
        if (showWarning) {
            setShowWarning(false);
        }
    };

    const updateWendogouser = (simulationStep, academicYearHeadDetails2, reportCard2 = user?.reportCard2) => {
        dispatch(setStep(simulationStep));
        let mainSubjects = user?.mainSubjects;
        //console.log('user?.isResult3Available ooo', user?.isResult3Available)
        if (!user.isResult3Available) { 
            mainSubjects = null;
        }
        //console.log('mainSubjects ooo', mainSubjects)
        let updatedUser = { ...user, simulationStep, academicYearHeadDetails2, reportCard2,isResult1Available:false,mainSubjects, date: new Date().toISOString() };
        helper.setLocalStorageWithExpiration('wendogouser', updatedUser);
    };
    
    
    return (
        <SEAcademicYearHeadDetails 
            title={`Informations au début de l'année académique ${user.selectedSchoolYear2.name}`}
            tip={`Veuillez renseigner les détails de votre année académique ${user.selectedSchoolYear2.name-1}/${user.selectedSchoolYear2.name}.`}
            showWarning={showWarning}
            selectedYear={user.selectedSchoolYear2.name}
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
            showContinueBtn={simulationStepGlobal === SIMULATION_ENGINE_STEPS.ACADEMIC_YEAR_HEAD_DETAILS2}
        />
    );
}

export default AcademicYearHeadDetails2;
