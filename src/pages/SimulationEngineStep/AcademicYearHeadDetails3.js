import React, { useState, useRef, useEffect} from "react";
import SEAcademicYearHeadDetails from "../../components/SimulationEngine/SEAcademicYearHeadDetails";
import { useDispatch, useSelector } from 'react-redux';
import { setStep } from '../../redux/simulationStepSlice';
import helper from '../../utils/Helper';
import { SIMULATION_ENGINE_STEPS } from '../../utils/Constants'; 
import _ from "lodash";
import { Loader2 } from "lucide-react";
import { setUser } from '../../redux/userSlice';

// Entête de l'année scolaire la plus recente
const AcademicYearHeadDetails3 = ({spokenLanguages, academicYearOrganizations, markSystems, subjectWeightSystems, isErrorPage}) => {

    const user = useSelector((state) => state.user);
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();

    // Initialize all states with null/empty defaults
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);
    const [selectedSpokenLanguage, setSelectedSpokenLanguage] = useState(null);
    const [selectedAcademicYearOrganization, setSelectedAcademicYearOrganization] = useState(null);
    const [selectedMarkSystem, setSelectedMarkSystem] = useState(null);
    const [selectedSubjectWeightSystem, setSelectedSubjectWeightSystem] = useState(null);
    const [schoolName, setSchoolName] = useState('');
    const [showWarning, setShowWarning] = useState(false);
    const [academicYearHeadDetails3, setAcademicYearHeadDetails3] = useState(null);

    // Collapse states
    const [collapseCountryOption, setCollapseCountryOption] = useState(true);
    const [collapseCityOption, setCollapseCityOption] = useState(true);
    const [collapseSpokenLanguageOption, setCollapseSpokenLanguageOption] = useState(true);
    const [collapseAcademicYearOrganizationOption, setCollapseAcademicYearOrganizationOption] = useState(true);
    const [collapseMarkSystemOption, setCollapseMarkSystemOption] = useState(true);
    const [collapseSubjectWeightSystemOption, setCollapseSubjectWeightSystemOption] = useState(true);

    const initialMarkSystemNameRef = useRef(null);
    const simulationStepGlobal = useSelector((state) => state.simulationStep);

    // Load user data on component mount
    useEffect(() => {
        const loadUserData = () => { 
            if (user) {
                //
                
                // Initialize all state values based on user
                setSelectedCountry(user?.academicYearHeadDetails3?.country || user?.selectedCountry || { name: '', validated: false });
                setSelectedCity(user?.academicYearHeadDetails3?.city || { name: '', validated: false });
                setSelectedSpokenLanguage(user?.academicYearHeadDetails3?.spokenLanguage || { name: '', validated: false });
                setSelectedAcademicYearOrganization(user?.academicYearHeadDetails3?.academicYearOrganization || { name: '', validated: false });
                setSelectedMarkSystem(user?.academicYearHeadDetails3?.markSystem || { name: '', validated: false });
                setSelectedSubjectWeightSystem(user?.academicYearHeadDetails3?.subjectWeightSystem || { name: '', validated: false });
                setSchoolName(user?.academicYearHeadDetails3?.schoolName || '');
                setAcademicYearHeadDetails3(user?.academicYearHeadDetails3 || {});
                
                initialMarkSystemNameRef.current = user?.academicYearHeadDetails3?.markSystem?.name;
            }
            setIsLoading(false);
        };

        loadUserData();
    }, []);

    // Redux state selectors
    //const simulationStepGlobal = useSelector((state) => state.simulationStep);
    ////console.log('simulationStepGlobal XXXXX', user?.academicYearHeadDetails3)
    // Update functions for dropdowns

    const updateSelectedCountry = (item) => {
        setSelectedCountry({ ...item, validated: true });
        setCollapseCountryOption(true);
        const newAcademicYearHeadDetails = { ...academicYearHeadDetails3, country: { ...item, validated: true } };
        setAcademicYearHeadDetails3(newAcademicYearHeadDetails);
        updateWendogouser(SIMULATION_ENGINE_STEPS.ACADEMIC_YEAR_HEAD_DETAILS3, newAcademicYearHeadDetails);
    };

    // const updateSelectedCountry = (item) => {
    //     setSelectedCountry({ ...item, validated: true });
    //     setCollapseCountryOption(true);  
    //     //academicYearHeadDetails3.country = { ...item, validated: true };
    //     setAcademicYearHeadDetails3({ ...academicYearHeadDetails3, country: { ...item, validated: true } })
    //     updateWendogouser(SIMULATION_ENGINE_STEPS.ACADEMIC_YEAR_HEAD_DETAILS3, academicYearHeadDetails3)
    // };

    // const updateSelectedCity = (item) => {
    //     setSelectedCity({ ...item, validated: true });
    //     setCollapseCityOption(true);  
    //     //academicYearHeadDetails3.city = { ...item, validated: true };
    //     setAcademicYearHeadDetails3({ ...academicYearHeadDetails3, city: { ...item, validated: true } })
    //     ////console.log('setSelectedCity', academicYearHeadDetails3)
    //     updateWendogouser(SIMULATION_ENGINE_STEPS.ACADEMIC_YEAR_HEAD_DETAILS3, academicYearHeadDetails3)
    // };
    const updateSelectedCity = (item) => {
        setSelectedCity({ ...item, validated: true });
        setCollapseCityOption(true);
        const newAcademicYearHeadDetails = { ...academicYearHeadDetails3, city: { ...item, validated: true } };
        setAcademicYearHeadDetails3(newAcademicYearHeadDetails);
        updateWendogouser(SIMULATION_ENGINE_STEPS.ACADEMIC_YEAR_HEAD_DETAILS3, newAcademicYearHeadDetails);
    };
    const updateWendogouser = (simulationStep, academicYearHeadDetails3, reportCard3 = user?.reportCard3) => {
        if (!user) return;
        
        dispatch(setStep(simulationStep));
        let updatedUser = { 
            ...user, 
            simulationStep, 
            academicYearHeadDetails3, 
            reportCard3, 
            isResult2Available: false, 
            date: new Date().toISOString() 
        };
        dispatch(setUser(updatedUser));
        helper.setLocalStorageWithExpiration('wendogouser', updatedUser);
         
    };

    const updateSelectedMarkSystem = (item) => {
        const originalMarkSystemName = initialMarkSystemNameRef.current;
        const isReportCardsValid = user?.reportCard3 && !_.every(user.reportCard3, _.isEmpty);

        if (item?.name !== originalMarkSystemName && isReportCardsValid) {
            setShowWarning(true);
        } else if (item?.name === originalMarkSystemName) {
            setShowWarning(false);
        }

        setSelectedMarkSystem({ ...item, validated: true });
        setCollapseMarkSystemOption(true);
        const newAcademicYearHeadDetails = { ...academicYearHeadDetails3, markSystem: { ...item, validated: true } };
        setAcademicYearHeadDetails3(newAcademicYearHeadDetails);
        updateWendogouser(SIMULATION_ENGINE_STEPS.ACADEMIC_YEAR_HEAD_DETAILS3, newAcademicYearHeadDetails);
    };
    

    const updateSelectedSubjectWeightSystem = (item) => {
        setSelectedSubjectWeightSystem({ ...item, validated: true });
        setCollapseSubjectWeightSystemOption(true);
        const newAcademicYearHeadDetails = { ...academicYearHeadDetails3, subjectWeightSystem: { ...item, validated: true } };
        setAcademicYearHeadDetails3(newAcademicYearHeadDetails);
        updateWendogouser(SIMULATION_ENGINE_STEPS.ACADEMIC_YEAR_HEAD_DETAILS3, newAcademicYearHeadDetails);
    };

    const updateSelectedAcademicYearOrganization = (item) => {
        setSelectedAcademicYearOrganization({ ...item, validated: true });
        setCollapseAcademicYearOrganizationOption(true);
        const newAcademicYearHeadDetails = { ...academicYearHeadDetails3, academicYearOrganization: { ...item, validated: true } };
        setAcademicYearHeadDetails3(newAcademicYearHeadDetails);
        updateWendogouser(SIMULATION_ENGINE_STEPS.ACADEMIC_YEAR_HEAD_DETAILS3, newAcademicYearHeadDetails);
    };

    const updateSelectedSpokenLanguage = (item) => {
        setSelectedSpokenLanguage({ ...item, validated: true });
        setCollapseSpokenLanguageOption(true);
        const newAcademicYearHeadDetails = { ...academicYearHeadDetails3, spokenLanguage: { ...item, validated: true } };
        setAcademicYearHeadDetails3(newAcademicYearHeadDetails);
        updateWendogouser(SIMULATION_ENGINE_STEPS.ACADEMIC_YEAR_HEAD_DETAILS3, newAcademicYearHeadDetails);
    };

    const handleChangeSchoolName = (e) => {
        const inputValue = e.target.value;
        setSchoolName(inputValue);
        const newAcademicYearHeadDetails = { ...academicYearHeadDetails3, schoolName: inputValue };
        setAcademicYearHeadDetails3(newAcademicYearHeadDetails);
        updateWendogouser(SIMULATION_ENGINE_STEPS.ACADEMIC_YEAR_HEAD_DETAILS3, newAcademicYearHeadDetails);
    };

    const handleContinue = () => {
        let updatedAcademicYearHeadDetails3 = {
            ...academicYearHeadDetails3,
            city: selectedCity,
            country: selectedCountry,
            markSystem: selectedMarkSystem,
            spokenLanguage: selectedSpokenLanguage,
            subjectWeightSystem: selectedSubjectWeightSystem,
            academicYearOrganization: selectedAcademicYearOrganization,
            schoolName
        };
        updateWendogouser(SIMULATION_ENGINE_STEPS.REPORT_CARD3, updatedAcademicYearHeadDetails3, showWarning ? null : user?.reportCard3);
        if (showWarning) {
            setShowWarning(false);
        }
    };

    if (isLoading) {
        return <div className="flex items-center justify-center min-h-[200px]">
                    <Loader2 className="w-8 h-8 animate-spin" />
               </div>; 
    }

    if (!user) {
        return <div className="flex items-center justify-center min-h-[200px]">
                    <Loader2 className="w-8 h-8 animate-spin" />
               </div>; 
    }
    
    return (
        <SEAcademicYearHeadDetails 
            title={`Informations au début de l'année académique ${user?.selectedSchoolYear3.name}`}
            tip={`Veuillez renseigner les détails de votre année académique ${user?.selectedSchoolYear3.name-1}/${user?.selectedSchoolYear3.name}.`}
            showWarning={showWarning}
            selectedYear={user?.selectedSchoolYear3.name}
            selectedCountry={selectedCountry}
            schoolLevelSelected={user?.schoolLevelSelected}
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
            spokenLanguages={spokenLanguages} academicYearOrganizations={academicYearOrganizations} markSystems={markSystems} subjectWeightSystems={subjectWeightSystems} isErrorPage={isErrorPage}
        />
    );
}

export default AcademicYearHeadDetails3;
