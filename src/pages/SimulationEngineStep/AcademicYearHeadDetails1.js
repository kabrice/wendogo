'use client';

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
const AcademicYearHeadDetails1 = ({spokenLanguages, academicYearOrganizations, markSystems, subjectWeightSystems, isErrorPage}) => {

    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const simulationStepGlobal = useSelector((state) => state.simulationStep);
    const [loading, setLoading] = useState(true); 
    
    // Loading and data states
    const [isLoading, setIsLoading] = useState(true);
    //const user = useSelector((state) => state.user);

    // Form states
    const [academicYearHeadDetails1, setAcademicYearHeadDetails1] = useState({});
    const [selectedCountry, setSelectedCountry] = useState({ name: '', validated: false });
    const [selectedCity, setSelectedCity] = useState({ name: '', validated: false });
    const [selectedSpokenLanguage, setSelectedSpokenLanguage] = useState({ name: '', validated: false });
    const [selectedAcademicYearOrganization, setSelectedAcademicYearOrganization] = useState({ name: '', validated: false });
    const [selectedMarkSystem, setSelectedMarkSystem] = useState({ name: '', validated: false });
    const [selectedSubjectWeightSystem, setSelectedSubjectWeightSystem] = useState({ name: '', validated: false });
    const [schoolName, setSchoolName] = useState('');
    
    // UI states
    const [showWarning, setShowWarning] = useState(false);
    const [collapseCountryOption, setCollapseCountryOption] = useState(true);
    const [collapseCityOption, setCollapseCityOption] = useState(true);
    const [collapseSpokenLanguageOption, setCollapseSpokenLanguageOption] = useState(true);
    const [collapseAcademicYearOrganizationOption, setCollapseAcademicYearOrganizationOption] = useState(true);
    const [collapseMarkSystemOption, setCollapseMarkSystemOption] = useState(true);
    const [collapseSubjectWeightSystemOption, setCollapseSubjectWeightSystemOption] = useState(true);

    // Ref for mark system comparison
    const initialMarkSystemNameRef = useRef(null);

    useEffect(() => {
        const initializeData = () => {
            try {
                //
                if (!user) {
                    throw new Error('No user data found');
                }

                //

                // Get initial academic year details
                const initialDetails = user?.academicYearHeadDetails1 || user?.academicYearHeadDetails2 || {};
                setAcademicYearHeadDetails1(initialDetails);

                // Set initial form states
                setSelectedCountry(initialDetails?.country || user?.selectedCountry || { name: '', validated: false });
                setSelectedCity(initialDetails?.city || { name: '', validated: false });
                setSelectedSpokenLanguage(initialDetails?.spokenLanguage || { name: '', validated: false });
                setSelectedAcademicYearOrganization(initialDetails?.academicYearOrganization || { name: '', validated: false });
                setSelectedMarkSystem(initialDetails?.markSystem || { name: '', validated: false });
                setSelectedSubjectWeightSystem(initialDetails?.subjectWeightSystem || { name: '', validated: false });
                setSchoolName(initialDetails?.schoolName || '');

                // Set initial mark system ref
                initialMarkSystemNameRef.current = initialDetails?.markSystem?.name;

            } catch (error) {
                console.error('Error initializing data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        initializeData();
    }, []);


    const updateSelectedCountry = (item) => {
        const selectedItem = { ...item, validated: true };
        setSelectedCountry(selectedItem);
        setCollapseCountryOption(true);
        
        const updatedDetails = { 
            ...academicYearHeadDetails1, 
            country: selectedItem 
        };
        setAcademicYearHeadDetails1(updatedDetails);
        updateWendogouser(SIMULATION_ENGINE_STEPS.ACADEMIC_YEAR_HEAD_DETAILS1, updatedDetails);
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
        const isReportCardsValid = user.reportCard1 && !_.every(user.reportCard1, _.isEmpty);

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

 
    // };
    const handleChangeSchoolName = (e) => {
        const value = e.target.value;
        setSchoolName(value);
        
        const updatedDetails = { 
            ...academicYearHeadDetails1, 
            schoolName: value 
        };
        setAcademicYearHeadDetails1(updatedDetails);
        updateWendogouser(SIMULATION_ENGINE_STEPS.ACADEMIC_YEAR_HEAD_DETAILS1, updatedDetails);
    };

 

    const handleContinue = () => {
        const updatedDetails = {
            ...academicYearHeadDetails1,
            city: selectedCity,
            country: selectedCountry,
            markSystem: selectedMarkSystem,
            spokenLanguage: selectedSpokenLanguage,
            subjectWeightSystem: selectedSubjectWeightSystem,
            academicYearOrganization: selectedAcademicYearOrganization,
            schoolName
        };

        updateWendogouser(
            SIMULATION_ENGINE_STEPS.REPORT_CARD1, 
            updatedDetails,
            showWarning ? null : user?.reportCard1
        );

        if (showWarning) {
            setShowWarning(false);
        }
    };

    if (isLoading) {
        return <div className="flex items-center justify-center min-h-[200px]">
                    <Loader2 className="w-8 h-8 animate-spin" />
                </div>
    }

    if (!user) {
        return <div className="flex items-center justify-center min-h-[200px]">
                    <Loader2 className="w-8 h-8 animate-spin" />
                </div>
    }
 
    
    const updateWendogouser = (simulationStep, details, reportCard1 = user?.reportCard1) => {
        if (!user) return;

        let mainSubjects = user?.mainSubjects;
        if (!user?.isResult3Available && !user?.isResult2Available) {
            mainSubjects = null;
        }

        const updatedUser = {
            ...user,
            simulationStep,
            academicYearHeadDetails1: details,
            reportCard1,
            mainSubjects,
            date: new Date().toISOString()
        };

        helper.setLocalStorageWithExpiration('wendogouser', updatedUser);
        dispatch(setUser(updatedUser));
        dispatch(setStep(simulationStep));
    };
    
    return (
        <SEAcademicYearHeadDetails 
            title={`Informations au début de l'année académique ${user?.selectedSchoolYear1.name || 'N/A'} `}
            svgConstantName="YEAR_N_2"
            tip={`Veuillez renseigner les détails de votre année académique ${user?.selectedSchoolYear1.name-1}/${user?.selectedSchoolYear1.name || 'N/A'}.`}
            showWarning={showWarning}
            selectedYear={user?.selectedSchoolYear1.name}
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
            showContinueBtn={simulationStepGlobal === SIMULATION_ENGINE_STEPS.ACADEMIC_YEAR_HEAD_DETAILS1}
            spokenLanguages={spokenLanguages} academicYearOrganizations={academicYearOrganizations} markSystems={markSystems} subjectWeightSystems={subjectWeightSystems} isErrorPage={isErrorPage}
        />
    );
}

export default AcademicYearHeadDetails1;
