'use client';

import { useState, useEffect, useRef} from 'react';
// import EdgarHead from '../assets/edgar_head.jpeg'
//import ExpertMan} from '../assets/ExpertMan1.svg'

import Link from 'next/link';
// import FlightSimilution from '../../assets/simulation_icons/aeroplane_simulation.png'
import FooterSingleRow from '../../components/FooterSingleRow';
import HeaderMenuLoginBar from '../../components/HeaderMenuLoginBar';
import SvgSpriteGen from '../../assets/simulation_icons/svg-sprite.gen.svg'
import VisaType from '../SimulationEngineStep/VisaType'
import SchoolLevel from '../SimulationEngineStep/SchoolLevel';
import SchoolYear3 from '../SimulationEngineStep/SchoolYear3';
import helper from '../../utils/Helper';
import {CAMPUS_FRANCE_CRITERIA, SIMULATION_ENGINE_STEPS, PROGRESS_BAR_STEPS} from '../../utils/Constants'
import RecentLevel from '../SimulationEngineStep/RecentLevel';
import ClassRepetition from '../SimulationEngineStep/ClassRepetition';
import BlankYearReptition from '../SimulationEngineStep/BlankYearReptition';
import CouldPayTuition from '../SimulationEngineStep/CouldPayTuition';
import ResidentCountry from '../SimulationEngineStep/ResidentCountry';
import HighSchoolInFrench from '../SimulationEngineStep/HighSchoolInFrench';
import FrenchTest from '../SimulationEngineStep/FrenchTest';
import FrenchTestInfoAlert from '../SimulationEngineStep/FrenchTestInfoAlert';
import FrenchLevel from '../SimulationEngineStep/FrenchLevel';
import RecentDegree from '../SimulationEngineStep/RecentDegree';
import DegreeExactName from '../SimulationEngineStep/DegreeExactName';
// import { useUpdateUserMutation } from '../../store/apis/userApi';
import { useDispatch, useSelector } from 'react-redux'
import { setStep } from '../../redux/simulationStepSlice';
import { setProgress } from '../../redux/progressBarStepSlice';
import { activateUniversity, deactivateUniversity } from '../../redux/universitySlice';
import ClassRepetitionWarningAlert from '../SimulationEngineStep/ClassRepetitionWarningAlert';
import BlankYearReptitionAlert from '../SimulationEngineStep/BlankYearReptitionAlert';
import SEAlertMessage from '../../components/SimulationEngine/SEAlertMessage';
import IconEconomy from '../../assets/simulation_icons/perplexe_icon.svg'
import CampusFranceInegibilityAlert from '../SimulationEngineStep/CampusFranceInegibilityAlert';
import MainSubjects from '../SimulationEngineStep/MainSubjects';
import ProgramDomain from '../SimulationEngineStep/ProgramDomain';
import IsResult3Available from '../SimulationEngineStep/IsResult3Available';
import AcademicYearHeadDetails3 from '../SimulationEngineStep/AcademicYearHeadDetails3';
import ReportCard3 from '../SimulationEngineStep/ReportCard3';
import IsResult2Available from '../SimulationEngineStep/IsResult2Available';
import SchoolYear2 from '../SimulationEngineStep/SchoolYear2';
import AcademicYearHeadDetails2 from '../SimulationEngineStep/AcademicYearHeadDetails2';
import ReportCard2 from '../SimulationEngineStep/ReportCard2';
import IsResult1Available from '../SimulationEngineStep/IsResult1Available';
import SchoolYear1 from '../SimulationEngineStep/SchoolYear1';
import AcademicYearHeadDetails1 from '../SimulationEngineStep/AcademicYearHeadDetails1';
import ReportCard1 from '../SimulationEngineStep/ReportCard1';
import HasWonAward from '../SimulationEngineStep/HasWonAward';
import AwardDetails from '../SimulationEngineStep/AwardDetails';
import HasWorkExperience from '../SimulationEngineStep/HasWorkExperience';
import WorkExperienceDetails from '../SimulationEngineStep/WorkExperienceDetails';
import CanProveWorkExperience from '../SimulationEngineStep/CanProveWorkExperience';
import EnglishLevel from '../SimulationEngineStep/EnglishLevel';
import CanJustifyEnglishLevel from '../SimulationEngineStep/CanJustifyEnglishLevel';
import OtherSpokenLanguage from '../SimulationEngineStep/OtherSpokenLanguage';
import OtherLanguageLevel from '../SimulationEngineStep/OtherLanguageLevel';
import CanJustifyOtherLanguage from '../SimulationEngineStep/CanJustifyOtherLanguage';
import AlreadyTraveledToFrance from '../SimulationEngineStep/AlreadyTraveledToFrance';
import LastFranceTravelDetails from '../SimulationEngineStep/LastFranceTravelDetails';
import HasPassport from '../SimulationEngineStep/HasPassport';
import PassportDetails from '../SimulationEngineStep/PassportDetails';
import Salutation from '../SimulationEngineStep/Salutation';
import BirthDate from '../SimulationEngineStep/BirthDate';
import Firstname from '../SimulationEngineStep/Firstname';
import Lastname from '../SimulationEngineStep/Lastname';
import Nationality from '../SimulationEngineStep/Nationality';
import Disable from '../SimulationEngineStep/Disable';
import Email from '../SimulationEngineStep/Email';
import PhoneNumber from '../SimulationEngineStep/PhoneNumber';
import Address from '../SimulationEngineStep/Address';
import Validation from '../SimulationEngineStep/Validation';
import _ from 'lodash';
import { activatePremiereClass, deactivatePremiereClass } from '../../redux/premiereClassSlice';
import { useRouter } from 'next/router'
import { fetchDataForSimulationEngine } from '../../utils/serverSideFetchers/dataSEFetchers'; 
import { activateSpinner, deactivateSpinner } from '../../redux/spinnerslice';
import { Loader2 } from "lucide-react";
import { setUser } from '../../redux/userSlice';

export async function getServerSideProps() {
    const { spokenLanguages, academicYearOrganizations, markSystems, schoolYears, subjectWeightSystems, universityLevels, degrees, isErrorPage} = await fetchDataForSimulationEngine();

    return {
        props: { spokenLanguages, academicYearOrganizations, markSystems, schoolYears, subjectWeightSystems, universityLevels, degrees, isErrorPage },
    };
}



const SimulationEngine = ({ spokenLanguages, academicYearOrganizations, markSystems, schoolYears, subjectWeightSystems, universityLevels, degrees, isErrorPage }) => {
    //console.log('uuu', { spokenLanguages, academicYearOrganizations, markSystems, schoolYears, subjectWeightSystems, universityLevels, degrees, isErrorPage })
    const user = useSelector((state) => state.user); 
    const dispatch = useDispatch();
    const router = useRouter();
    //const user = useSelector((state) => state.user);
    const [isLoaded, setIsLoaded] = useState(false);
    const [deviceType, setDeviceType] = useState('lg');
    const [browserWidth, setBrowserWidth] = useState(0);
    const [isModalOpened, setIsModalOpened] = useState(false);
    const newRefModal = useRef(null); 
    const [isLoading, setIsLoading] = useState(true);
    const currentSimulationStep = useSelector((state) => state.simulationStep);
    const currentProgressBarStep = useSelector((state) => state.progressBarStep);
    const isInUniversityGlobal = useSelector((state) => state.university.active);
    const isInPremiereClassGlobal = useSelector((state) => state.premiereClass.active);
    const hasErrorPage = useSelector((state) => state.errorPage.active);

    useEffect(() => {
        const initializeData = async () => {
            try {
                //
                
                if (!user) {
                    router.push('/simulation/home');
                    return;
                }
 
                dispatch(setStep(user?.simulationStep ?? SIMULATION_ENGINE_STEPS.VISA_TYPE));
                dispatch(setProgress(user?.progressBarStep ?? PROGRESS_BAR_STEPS.GENERALITES_SUR_LES_VISAS_ET_LES_ETUDES));
                dispatch(user?.schoolLevelSelected === 'Supérieur' ? activateUniversity() : deactivateUniversity());
                dispatch(user?.hsLevelSelected === 'deg00002' ? activatePremiereClass() : deactivatePremiereClass());
            } catch (error) {
                console.error('Error initializing data:', error);
                // Handle error appropriately
            } finally {
                setIsLoading(false);
            }
        };

        initializeData();
    }, [dispatch, router]);


    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            setBrowserWidth(width);
            
            if (width > 1200) {
                setDeviceType('lg');
                setIsModalOpened(false);
            } else if (width > 991) {
                setDeviceType('md');
                setIsModalOpened(false);
            } else if (width > 765) {
                setDeviceType('sm');
            } else {
                setDeviceType('xs');
            }
        };

        handleResize(); // Initial call
        window.addEventListener('resize', handleResize);
        
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Handle modal effects
    useEffect(() => {
        if (isModalOpened) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [isModalOpened]);

    // Handle outside click for modal
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (newRefModal.current && !newRefModal.current.contains(e.target)) {
                setIsModalOpened(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    if (isLoading) {
        //dispatch(activateSpinner());
        return (
            <div className="flex items-center justify-center min-h-[200px]">
                <Loader2 className="w-8 h-8 animate-spin" />
            </div>
        );
    }
    //dispatch(deactivateSpinner());
    if (!user) {
        return null;
    } 
    const STEPS = {
        VISA_TYPE: SIMULATION_ENGINE_STEPS.VISA_TYPE,
        SCHOOL_LEVEL: SIMULATION_ENGINE_STEPS.SCHOOL_LEVEL,
        RECENT_CLASS_LEVEL: SIMULATION_ENGINE_STEPS.RECENT_CLASS_LEVEL,
        SCHOOL_YEAR3: SIMULATION_ENGINE_STEPS.SCHOOL_YEAR3,
        RECENT_DEGREE: SIMULATION_ENGINE_STEPS.RECENT_DEGREE,
        DEGREE_EXACT_NAME: SIMULATION_ENGINE_STEPS.DEGREE_EXACT_NAME,
        CLASS_REPETITION: SIMULATION_ENGINE_STEPS.CLASS_REPETITION,
        CLASS_REPETITION_WARNING: SIMULATION_ENGINE_STEPS.CLASS_REPETITION_WARNING,
        BLANK_YEAR_REPETITION: SIMULATION_ENGINE_STEPS.BLANK_YEAR_REPETITION,
        BLANK_YEAR_REPETITION_WARNING: SIMULATION_ENGINE_STEPS.BLANK_YEAR_REPETITION_WARNING,
        COULD_PAY_TUITION: SIMULATION_ENGINE_STEPS.COULD_PAY_TUITION,
        COULD_PAY_TUITION_WARNING: SIMULATION_ENGINE_STEPS.COULD_PAY_TUITION_WARNING,
        RESIDENT_COUNTRY: SIMULATION_ENGINE_STEPS.RESIDENT_COUNTRY,
        CAMPUS_FRANCE_INELIGIBILITY: SIMULATION_ENGINE_STEPS.CAMPUS_FRANCE_INELIGIBILITY,       
        HIGH_SCHOOL_IN_FRENCH: SIMULATION_ENGINE_STEPS.HIGH_SCHOOL_IN_FRENCH,
        FRENCH_TEST: SIMULATION_ENGINE_STEPS.FRENCH_TEST,
        FRENCH_LEVEL: SIMULATION_ENGINE_STEPS.FRENCH_LEVEL,
        IS_YEAR_3_RESULTS_AVAILABLE: SIMULATION_ENGINE_STEPS.IS_YEAR_3_RESULTS_AVAILABLE,
        SCHOOL_YEAR2: SIMULATION_ENGINE_STEPS.SCHOOL_YEAR2,
        ACADEMIC_YEAR_HEAD_DETAILS3: SIMULATION_ENGINE_STEPS.ACADEMIC_YEAR_HEAD_DETAILS3,
        REPORT_CARD3: SIMULATION_ENGINE_STEPS.REPORT_CARD3,
        PROGRAM_DOMAIN: SIMULATION_ENGINE_STEPS.PROGRAM_DOMAIN,
        MAIN_SUBJECTS: SIMULATION_ENGINE_STEPS.MAIN_SUBJECTS,
        IS_YEAR_2_RESULTS_AVAILABLE: SIMULATION_ENGINE_STEPS.IS_YEAR_2_RESULTS_AVAILABLE,
        ACADEMIC_YEAR_HEAD_DETAILS2: SIMULATION_ENGINE_STEPS.ACADEMIC_YEAR_HEAD_DETAILS2,
        REPORT_CARD2: SIMULATION_ENGINE_STEPS.REPORT_CARD2,
        PROGRAM_DOMAIN_BAC_N_1: SIMULATION_ENGINE_STEPS.PROGRAM_DOMAIN_BAC_N_1,
        MAIN_SUBJECTS_BAC_N_1: SIMULATION_ENGINE_STEPS.MAIN_SUBJECTS_BAC_N_1,
        IS_YEAR_1_RESULTS_AVAILABLE: SIMULATION_ENGINE_STEPS.IS_YEAR_1_RESULTS_AVAILABLE,
        SCHOOL_YEAR1: SIMULATION_ENGINE_STEPS.SCHOOL_YEAR1,
        ACADEMIC_YEAR_HEAD_DETAILS1: SIMULATION_ENGINE_STEPS.ACADEMIC_YEAR_HEAD_DETAILS1,
        REPORT_CARD1: SIMULATION_ENGINE_STEPS.REPORT_CARD1,
        PROGRAM_DOMAIN_BAC_N_2: SIMULATION_ENGINE_STEPS.PROGRAM_DOMAIN_BAC_N_2,
        MAIN_SUBJECTS_BAC_N_2: SIMULATION_ENGINE_STEPS.MAIN_SUBJECTS_BAC_N_2,
        HAS_WON_AWARD: SIMULATION_ENGINE_STEPS.HAS_WON_AWARD,
        AWARD_DETAILS: SIMULATION_ENGINE_STEPS.AWARD_DETAILS,
        HAS_WORK_EXPERIENCE: SIMULATION_ENGINE_STEPS.HAS_WORK_EXPERIENCE,
        WORK_EXPERIENCE_DETAILS: SIMULATION_ENGINE_STEPS.WORK_EXPERIENCE_DETAILS,
        CAN_PROVE_WORK_EXPERIENCE: SIMULATION_ENGINE_STEPS.CAN_PROVE_WORK_EXPERIENCE,
        ENGLISH_LEVEL: SIMULATION_ENGINE_STEPS.ENGLISH_LEVEL,
        CAN_JUSTIFY_ENGLISH_LEVEL: SIMULATION_ENGINE_STEPS.CAN_JUSTIFY_ENGLISH_LEVEL,
        OTHER_SPOKEN_LANGUAGE: SIMULATION_ENGINE_STEPS.OTHER_SPOKEN_LANGUAGE,
        OTHER_LANGUAGE_LEVEL: SIMULATION_ENGINE_STEPS.OTHER_LANGUAGE_LEVEL,
        CAN_JUSTIFY_OTHER_LANGUAGE: SIMULATION_ENGINE_STEPS.CAN_JUSTIFY_OTHER_LANGUAGE,
        ALREADY_TRAVELED_TO_FRANCE: SIMULATION_ENGINE_STEPS.ALREADY_TRAVELED_TO_FRANCE,
        LAST_FRANCE_TRAVEL_DETAILS: SIMULATION_ENGINE_STEPS.LAST_FRANCE_TRAVEL_DETAILS,
        HAS_PASSEPORT: SIMULATION_ENGINE_STEPS.HAS_PASSEPORT,
        PASSEPORT_DETAILS: SIMULATION_ENGINE_STEPS.PASSEPORT_DETAILS,
        SALUTATION: SIMULATION_ENGINE_STEPS.SALUTATION, 
        BIRTHDATE: SIMULATION_ENGINE_STEPS.BIRTHDATE,
        FIRSTNAME: SIMULATION_ENGINE_STEPS.FIRSTNAME,
        LASTNAME: SIMULATION_ENGINE_STEPS.LASTNAME,
        NATIONALITY: SIMULATION_ENGINE_STEPS.NATIONALITY,
        DISABLE: SIMULATION_ENGINE_STEPS.DISABLE,
        EMAIL: SIMULATION_ENGINE_STEPS.EMAIL,
        WHATSAPP_NUMBER: SIMULATION_ENGINE_STEPS.WHATSAPP_NUMBER,
        ADDRESS: SIMULATION_ENGINE_STEPS.ADDRESS,
        VALIDATION: SIMULATION_ENGINE_STEPS.VALIDATION
    }

    const bulletinN2Step = {
        id: PROGRESS_BAR_STEPS.BULLETIN_N_2,
        title: 'Bulletin n-2',
        reference: 'BULLETIN_N_2',
        completedStep: STEPS.IS_YEAR_1_RESULTS_AVAILABLE
      };
      
    let progressBarSteps = [
        {id: PROGRESS_BAR_STEPS.GENERALITES_SUR_LES_VISAS_ET_LES_ETUDES, title: 'Généralités sur les visas et les études', reference : 'GENERALITES_SUR_LES_VISAS_ET_LES_ETUDES', completedStep: STEPS.VISA_TYPE},
        {id: PROGRESS_BAR_STEPS.BULLETIN_LE_PLUS_RECENT, title: 'Bulletin le plus recent', reference : 'BULLETIN_LE_PLUS_RECENT', completedStep: STEPS.IS_YEAR_3_RESULTS_AVAILABLE},
        {id: PROGRESS_BAR_STEPS.BULLETIN_N_1, title: 'Bulletin n-1', reference : 'BULLETIN_N_1', completedStep: STEPS.IS_YEAR_2_RESULTS_AVAILABLE},
        //{id: PROGRESS_BAR_STEPS.BULLETIN_N_2, title: 'Bulletin n-2', reference : 'BULLETIN_N_2', completedStep: STEPS.IS_YEAR_1_RESULTS_AVAILABLE},
        {id: PROGRESS_BAR_STEPS.PARCOURS_ACADEMIQUE_ET_PROFESSIONNEL, title: 'Parcours académique et professionnel', reference : 'PARCOURS_ACADEMIQUE_ET_PROFESSIONNEL', completedStep: STEPS.HAS_WON_AWARD},
        {id: PROGRESS_BAR_STEPS.INFORMATIONS_VOYAGE, title: 'Informations voyage', reference : 'INFORMATIONS_VOYAGE', completedStep: STEPS.ALREADY_TRAVELED_TO_FRANCE},
        {id: PROGRESS_BAR_STEPS.COORDONNEES, title: 'Coordonnées', reference : 'COORDONNEES', completedStep: STEPS.SALUTATION},
    ]



    //console.log('progressBarStep ===', user?.progressBarStep)
    // const [deviceType, setDeviceType] = useState('lg')
    // const [browserWidth, setBrowserWidth] = useState(0) 
    // const [isModalOpened, setIsModalOpened] = useState(false)
    
    //const currentSimulationStep = useSelector((state) => state.simulationStep);
    //const currentProgressBarStep = useSelector((state) => state.progressBarStep);
    //const isInUniversityGlobal = useSelector((state) => state.university.active)
    //const isInPremiereClassGlobal = useSelector((state) => state.premiereClass.active)
    //const hasErrorPage = useSelector((state) => state.errorPage.active)

    // Conditionally remove or re-add the BULLETIN_N_2 step    
    if (isInPremiereClassGlobal) {
        // Filter out BULLETIN_N_2 if the condition is met
        progressBarSteps = progressBarSteps.filter(step => step.id !== PROGRESS_BAR_STEPS.BULLETIN_N_2);
    } else {
        // Add BULLETIN_N_2 if not already present
        progressBarSteps.splice(3, 0, bulletinN2Step);  // Insert it back at its original position (after BULLETIN_N_1)
    }

    const handleClickOutsideOfModal = (e) => { 
        if (newRefModal.current && !newRefModal.current.contains(e.target)) { 
            setIsModalOpened(false)
        }
    }
    
    //console.log('currentSimulationStep 🥳', currentSimulationStep)
    // useEffect(() => {
    //     helper.addOutsideClick(handleClickOutsideOfModal)

    //     const handleResize = () => {
    //         const browserWidth = window.innerWidth;
    //         //console.log('browserWidth', browserWidth)
    //         if (browserWidth>1200) {
    //             setDeviceType('lg');
    //             setIsModalOpened(false)
    //         }
    //         if (browserWidth>991 && browserWidth <= 1200) {
    //             setDeviceType('md');
    //             setIsModalOpened(false)
    //         } 
    //         if (browserWidth>765 && browserWidth <= 990) {
    //             setDeviceType('sm');
    //         }  
    //         if (browserWidth <= 764) {
    //             setDeviceType('xs');
    //         } 
    //     };

    //     handleResize();
        
    //     if (isModalOpened) {
    //         document.body.style.overflow = 'hidden';
    //     } else {
    //         document.body.style.overflow = 'auto';
    //     }
    //     window.addEventListener('resize', handleResize);
    //     return () => {
    //         window.removeEventListener('resize', handleResize);
    //     };
        
    // }, [browserWidth, isModalOpened]);
    

    const handleProgressBarStep = (step) => { 
        const stepId = step.id;
        const updatedUser = {
            ...user,
            progressBarStep: stepId,
            date: new Date().toISOString(),
        };
        dispatch(setUser(updatedUser));
        console.log('stepId mmm ', updatedUser)
        helper.setLocalStorageWithExpiration('wendogouser', updatedUser);
        dispatch(setProgress(stepId)) 
        setIsModalOpened(false)

        // Update hash without full page reload
        if (typeof window !== 'undefined') {
            window.location.hash = "";
            window.location.hash = "form/"+step.reference 
            // Scroll to the element if it exists
            const element = document.getElementById(`form/${step.reference}`);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }
    const getCurrentProgressBarStepTitle = () => {
        let currentStep = progressBarSteps.find(step => step.id === currentProgressBarStep)
        return currentStep.title
    } 
    const getCurrentStateNumber = () => {
        return _.findIndex(progressBarSteps, { id: currentProgressBarStep }) + 1;;
    }
    const renderContentAlert = () => {
        if (window.innerWidth > 768) {
            return (
                        <div className="MegaTip MegaTip-onboarding">
                                            <div className="MegaTip-icon">
                                                <svg width={90} height={90} viewBox="0 0 94 96" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <rect width="93.031" height={96} rx={4} fill="#3898ec" />
                                                    <g filter="url(#filter0_d_761_28388)">
                                                        <rect x="19.2" y="12.461" width="60.046" height="76.245" rx={3} transform="rotate(-4.65 19.2 12.46)" fill="#F7FCFF" />
                                                    </g>
                                                    <rect width="36.503" height="50.507" rx={3} transform="rotate(2.042 -1015.542 1243.76) skewX(.177)" fill="#DAE0E7" opacity=".18" />
                                                    <rect width="36.503" height="50.507" rx={3} transform="rotate(2.042 -937.088 1196.215) skewX(.177)" fill="#EAEDF1" />
                                                    <rect x="46.13" y={40} width="22.663" height={3} rx="1.5" transform="rotate(2.486 46.13 40)" fill="#DAE0E7" />
                                                    <rect x="46.13" y={45} width="27.378" height={3} rx="1.5" transform="rotate(2.486 46.13 45)" fill="#DAE0E7" />
                                                    <rect x="9.498" y="53.441" width="57.978" height="39.806" rx={5} transform="rotate(-7.903 9.498 53.441)" fill="#DAE0E7" opacity=".5" />
                                                    <rect x="7.362" y="51.797" width="57.978" height="39.806" rx={4} transform="rotate(-7.903 7.362 51.797)" fill="#FFE7E7" />
                                                    <rect x="11.694" y="56.525" width="17.148" height="22.864" rx={2} transform="rotate(-7.903 11.694 56.525)" fill="#FFCECE" />
                                                    <rect x="32.723" y="53.605" width="26.131" height="4.083" rx={2} transform="rotate(-7.903 32.723 53.605)" fill="#FFCECE" />
                                                    <rect x="33.621" y="60.078" width="26.131" height="4.083" rx={2} transform="rotate(-7.903 33.621 60.078)" fill="#FFCECE" />
                                                    <rect x="34.52" y="66.547" width="26.131" height="4.083" rx={2} transform="rotate(-7.903 34.52 66.547)" fill="#FFCECE" />
                                                    <rect x="15.399" y="83.217" width="50.629" height="4.083" rx={2} transform="rotate(-7.903 15.399 83.217)" fill="#fff" />
                                                    <defs>
                                                        <filter id="filter0_d_761_28388" x="19.434" y="7.826" width="67.562" height="82.394" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                                        <feFlood floodOpacity={0} result="BackgroundImageFix" />
                                                        <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                                        <feOffset dx={1} dy={1} />
                                                        <feGaussianBlur stdDeviation=".5" />
                                                        <feComposite in2="hardAlpha" operator="out" />
                                                        <feColorMatrix values="0 0 0 0 0.421649 0 0 0 0 0.594735 0 0 0 0 0.679167 0 0 0 0.19 0" />
                                                        <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_761_28388" />
                                                        <feBlend in="SourceGraphic" in2="effect1_dropShadow_761_28388" result="shape" />
                                                        </filter>
                                                    </defs>
                                                </svg>
                                            </div>
                                            <div className="MegaTip-content">
                                                <div className="Stack  stackColumn " style={{ flexDirection: "column", padding: 0, alignItems: "stretch", justifyContent: "center" }}>
                                                <div className="Stack-child  " style={{ paddingTop: 8 }}>
                                                    <div className="Heading s isWeak  MegaTip-title">
                                                    <div className="Stack  stackColumn " style={{ flexDirection: "column", padding: 0, alignItems: "stretch" }}>
                                                        <div className="Stack-child  " style={{ paddingTop: 8 }}> Conseil de Wendogo :  Pour une simulation optimale, pensez à vous munir des éléments suivants : </div>
                                                    </div>
                                                    </div>
                                                </div>
                                                <div className="Stack-child  " style={{ paddingTop: 8 }}>
                                                    <div className="MegaTip-text">
                                                    <ul style={{ margin: 0, paddingLeft: 25, color: "rgb(127, 148, 169)" }}>
                                                        <li>Passeport (si disponible) </li>
                                                        <li>Relevés de notes de vos 3 dernières années d'études</li>
                                                    </ul>
                                                    {/* <p>Les dates de candidatures 2024 pour Campus France debutent en Novembre...</p> */}
                                                    </div>
                                                </div>
                                                </div>
                                            </div>
                                        </div>
            );
        } else {
            return (
                    <div className="MegaTip MegaTip-onboarding">
                    <div className="Stack  stackColumn " style={{ flexDirection: "column", padding: 0, alignItems: "stretch" }}>
                        <div className="Stack-child  " style={{ paddingTop: 15 }}>
                        <div className="Stack  stackRow " style={{ flexDirection: "row", padding: 0, alignItems: "center" }}>
                            <div className="Stack-child  " style={{ paddingLeft: 0 }}>
                            <div className="MegaTip-icon">
                            <svg width={70} height={70} viewBox="0 0 94 96" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <rect width="93.031" height={96} rx={4} fill="#3898ec" />
                                                    <g filter="url(#filter0_d_761_28388)">
                                                        <rect x="19.2" y="12.461" width="60.046" height="76.245" rx={3} transform="rotate(-4.65 19.2 12.46)" fill="#F7FCFF" />
                                                    </g>
                                                    <rect width="36.503" height="50.507" rx={3} transform="rotate(2.042 -1015.542 1243.76) skewX(.177)" fill="#DAE0E7" opacity=".18" />
                                                    <rect width="36.503" height="50.507" rx={3} transform="rotate(2.042 -937.088 1196.215) skewX(.177)" fill="#EAEDF1" />
                                                    <rect x="46.13" y={40} width="22.663" height={3} rx="1.5" transform="rotate(2.486 46.13 40)" fill="#DAE0E7" />
                                                    <rect x="46.13" y={45} width="27.378" height={3} rx="1.5" transform="rotate(2.486 46.13 45)" fill="#DAE0E7" />
                                                    <rect x="9.498" y="53.441" width="57.978" height="39.806" rx={5} transform="rotate(-7.903 9.498 53.441)" fill="#DAE0E7" opacity=".5" />
                                                    <rect x="7.362" y="51.797" width="57.978" height="39.806" rx={4} transform="rotate(-7.903 7.362 51.797)" fill="#FFE7E7" />
                                                    <rect x="11.694" y="56.525" width="17.148" height="22.864" rx={2} transform="rotate(-7.903 11.694 56.525)" fill="#FFCECE" />
                                                    <rect x="32.723" y="53.605" width="26.131" height="4.083" rx={2} transform="rotate(-7.903 32.723 53.605)" fill="#FFCECE" />
                                                    <rect x="33.621" y="60.078" width="26.131" height="4.083" rx={2} transform="rotate(-7.903 33.621 60.078)" fill="#FFCECE" />
                                                    <rect x="34.52" y="66.547" width="26.131" height="4.083" rx={2} transform="rotate(-7.903 34.52 66.547)" fill="#FFCECE" />
                                                    <rect x="15.399" y="83.217" width="50.629" height="4.083" rx={2} transform="rotate(-7.903 15.399 83.217)" fill="#fff" />
                                                    <defs>
                                                        <filter id="filter0_d_761_28388" x="19.434" y="7.826" width="67.562" height="82.394" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                                        <feFlood floodOpacity={0} result="BackgroundImageFix" />
                                                        <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                                        <feOffset dx={1} dy={1} />
                                                        <feGaussianBlur stdDeviation=".5" />
                                                        <feComposite in2="hardAlpha" operator="out" />
                                                        <feColorMatrix values="0 0 0 0 0.421649 0 0 0 0 0.594735 0 0 0 0 0.679167 0 0 0 0.19 0" />
                                                        <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_761_28388" />
                                                        <feBlend in="SourceGraphic" in2="effect1_dropShadow_761_28388" result="shape" />
                                                        </filter>
                                                    </defs>
                                                </svg>
                            </div>
                            </div>
                            <div className="Stack-child  " style={{ paddingLeft: 0 }}>
                            <div className="Heading s isWeak  MegaTip-title">
                                <div className="Stack  stackColumn " style={{ flexDirection: "column", padding: 0, alignItems: "stretch" }}>
                                <div className="Stack-child  " style={{ paddingTop: 8 }}>  Conseil de Wendogo :  Pour une simulation optimale, pensez à vous munir des éléments suivants :   </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                        <div className="Stack-child  " style={{ paddingTop: 15 }}>
                        <div className="Stack  stackColumn " style={{ flexDirection: "column", padding: 0, alignItems: "stretch" }}>
                            <div className="Stack-child  " style={{ paddingTop: 0 }}>
                            <div className="MegaTip-content">
                                <ul style={{ margin: 0, paddingLeft: 25, color: "rgb(127, 148, 169)" }}>
                                    <li>Passeport (si disponible) </li>
                                    <li>Relevés de notes de vos 3 dernières années d'études</li>
                                </ul>
                                <p>Les dates de candidatures 2024 pour Campus France debutent en Novembre...</p>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                                );
                            }
                        };
    return <>{
        helper.redirectionAtInit(router, user, '/simulation/engine', '/simulation/home') && 
            <div>   
              <HeaderMenuLoginBar/>
               {(hasErrorPage || isErrorPage) ?
                <main className="styles__Main-sc-kz84w6-0 gEFmYD" style={{ paddingTop: 280 }}>
                        <div className="styles__Wrapper-sc-gk465i-0 fiWVzr">
                            <div className="styles__Hero-sc-s3dlnp-0 gMynSv">
                                <div className="styles__Title-sc-s3dlnp-2 eWHDTF">
                                    <h1 size="large" className="styles__HeadingBridge-sc-6txi54-0 hzNvHf">
                                        Désolé, une erreur s'est produite. Veuillez réessayer plus tard ou nous contacter.
                                    </h1>
                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '10px' }}>
                                        <button
                                            onClick={() => window.location.reload()}
                                            style={{ width: '15.3%', height: 20, margin: '10px' }}
                                            className="CTA button primary xlarge userValidation"
                                            title=""
                                            data-trackingprefix=""
                                            data-testid="DaisyFieldView-continuer-VEH_DTL_POSSESSION"
                                        >
                                            Recharger
                                        </button>
                                        <button
                                            onClick={() => window.location.href = 'mailto:hello@wendogo.com'}
                                            style={{ width: '21.7%', height: 20, margin: '10px' }}
                                            className="CTA button primary xlarge userValidation"
                                            title=""
                                            data-trackingprefix=""
                                            data-testid="DaisyFieldView-continuer-VEH_DTL_POSSESSION"
                                        >
                                            Nous contacter
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main> :
                    <div className="theme-wrapper theme-daisy" >
                        <div className="funnel AutoTunnel">
                            <div className="app-container">
                            <div className={"app-"+deviceType}>
                                <div className="FunnelView DaisyFormView">
                                <div className="NavigationScreenView">
                                    <div className="NavigationView hasFunnelSideBar">
                                    <div className="NavigationView-container">
                                        <div className="NavigationView-header NavigationView-header-without-back-button" />
                                    </div>
                                    </div>
                                    <div className="NavigationSideBar">
                                    <div className="NavigationSideBar-container" />
                                    </div>
                                </div>
                                <div id="scr_vehicule" className="ScreenView DaisyScreenView SCR_VEHICULE">
                                    <div id="blk_ma_demande" className="BlockView DaisyBlockView block-doing BLK_MA_DEMANDE block-doing block-active hasFunnelSideBar">
                                    <div className="BlockView-container DaisyBlockView-container">
                                        {(currentSimulationStep >= STEPS.SCHOOL_LEVEL) && 
                                            renderContentAlert()
                                        }
                                        <div id="INCENTIVE_ONBOARDING-wrapper" className="FieldWrapper INCENTIVE_MEGATIP INCENTIVE_ONBOARDING field-default  ">
                                        <div className="FieldView DaisyFieldView undefined field-default INCENTIVE_MEGATIP INCENTIVE_ONBOARDING ">
                                            <div className="FieldView-flex-container" />
                                            <div className="DrawerAnimation" style={{ height: 0 }}>
                                            <div />
                                            </div>
                                            <div className="app-row app-field">
                                            <div className="app-col-xs-12 app-col-sm-12 app-col-md-12 Field" />
                                            </div>
                                        </div>
                                        </div>
                                        <>
                                        {/*{'xxx '+currentSimulationStep+' -- '+currentProgressBarStep}
                                        <br/>
                                        {'yyy '+currentSimulationStep+' -- '+STEPS.IS_YEAR_1_RESULTS_AVAILABLE+ ' '+isInPremiereClassGlobal} */}
                                        { currentProgressBarStep === PROGRESS_BAR_STEPS.GENERALITES_SUR_LES_VISAS_ET_LES_ETUDES &&
                                            <div id="form/GENERALITES_SUR_LES_VISAS_ET_LES_ETUDES">
                                                {<VisaType/>}
                                                {currentSimulationStep >= STEPS.SCHOOL_LEVEL && <SchoolLevel/>}
                                                
                                                {currentSimulationStep >= STEPS.RECENT_CLASS_LEVEL && <RecentLevel degrees={degrees} universityLevels={universityLevels} isErrorPage={isErrorPage}  />}
                                                {currentSimulationStep >= STEPS.SCHOOL_YEAR3 && <SchoolYear3/>} 
                                                {isInUniversityGlobal && currentSimulationStep >= STEPS.RECENT_DEGREE && <RecentDegree/>}
                                                {currentSimulationStep >= STEPS.DEGREE_EXACT_NAME && <DegreeExactName/>}
                                                {currentSimulationStep >= STEPS.CLASS_REPETITION && <ClassRepetition/>} 
                                                {currentSimulationStep >= STEPS.BLANK_YEAR_REPETITION && <BlankYearReptition/>} 
                                                {currentSimulationStep >= STEPS.COULD_PAY_TUITION && <CouldPayTuition/>} 
                                                {currentSimulationStep >= STEPS.RESIDENT_COUNTRY && <ResidentCountry/>}
                                                {/* {'hhXXh '+(currentSimulationStep >= STEPS.CAMPUS_FRANCE_INELIGIBILITY)} */}
                                                {currentSimulationStep >= STEPS.CAMPUS_FRANCE_INELIGIBILITY && <CampusFranceInegibilityAlert/>}
                                                {currentSimulationStep >= STEPS.HIGH_SCHOOL_IN_FRENCH && <HighSchoolInFrench/>}
                                                {currentSimulationStep >= STEPS.FRENCH_TEST && <FrenchTest/>}
                                                {currentSimulationStep >= STEPS.FRENCH_TEST && !(user?.isFrancophone && user?.isFrancophoneCountry) && <FrenchTestInfoAlert/>}
                                                {currentSimulationStep >= STEPS.FRENCH_LEVEL && <FrenchLevel/>} 
                                            </div>
                                        }
                                        {/* {'currentProgressBarStep '+currentProgressBarStep+' '+PROGRESS_BAR_STEPS.BULLETIN_LE_PLUS_RECENT} */}
                                        
                                        { currentProgressBarStep === PROGRESS_BAR_STEPS.BULLETIN_LE_PLUS_RECENT &&
                                            <div id="form/BULLETIN_LE_PLUS_RECENT"  >
                                                {currentSimulationStep >= STEPS.IS_YEAR_3_RESULTS_AVAILABLE && <IsResult3Available/>}
                                                {user?.isResult3Available && 
                                                    <>
                                                        {currentSimulationStep >= STEPS.ACADEMIC_YEAR_HEAD_DETAILS3 && <AcademicYearHeadDetails3 spokenLanguages={spokenLanguages} 
                                                                                                                                                 academicYearOrganizations={academicYearOrganizations} 
                                                                                                                                                markSystems={markSystems} 
                                                                                                                                                subjectWeightSystems={subjectWeightSystems} 
                                                                                                                                                isErrorPage={isErrorPage}/>} 
                                                        {currentSimulationStep >= STEPS.REPORT_CARD3 && <ReportCard3/>}
                                                        {(isInUniversityGlobal && currentSimulationStep >= STEPS.PROGRAM_DOMAIN) && <ProgramDomain/>}
                                                        {currentSimulationStep >= STEPS.MAIN_SUBJECTS && <MainSubjects/>}
                                                    </>} 
                                            </div>
                                        }
                                        
                                        {currentProgressBarStep === PROGRESS_BAR_STEPS.BULLETIN_N_1 &&
                                            <div id="form/BULLETIN_N_1">
                                                {currentSimulationStep >= STEPS.IS_YEAR_2_RESULTS_AVAILABLE && <IsResult2Available/>}
                                                {
                                                    user?.isResult2Available &&
                                                    <> 

                                                        {currentSimulationStep >= STEPS.SCHOOL_YEAR2 && <SchoolYear2/>}
                                                        {currentSimulationStep >= STEPS.ACADEMIC_YEAR_HEAD_DETAILS2 && <AcademicYearHeadDetails2 spokenLanguages={spokenLanguages} 
                                                                                                                                                 academicYearOrganizations={academicYearOrganizations} 
                                                                                                                                                markSystems={markSystems} 
                                                                                                                                                subjectWeightSystems={subjectWeightSystems} 
                                                                                                                                                isErrorPage={isErrorPage}/>} 
                                                        {currentSimulationStep >= STEPS.REPORT_CARD2 && <ReportCard2/>}
                                                        {/* <h3>{'KK '+!user?.isResult3Available+ ' '+ isInUniversityGlobal+' '+currentSimulationStep+' '+STEPS.PROGRAM_DOMAIN_BAC_N_1}</h3> */}
                                                        {!user?.isResult3Available && 
                                                            <>
                                                            {/* <h3>{'KK '+isInUniversityGlobal+ ' '+ isInUniversityGlobal+' '+currentSimulationStep+' '+STEPS.PROGRAM_DOMAIN_BAC_N_1}</h3> */}
                                                                {(isInUniversityGlobal && currentSimulationStep >= STEPS.PROGRAM_DOMAIN_BAC_N_1) && <ProgramDomain/>}
                                                                {currentSimulationStep >= STEPS.MAIN_SUBJECTS_BAC_N_1 && <MainSubjects/>}
                                                            </>}
                                                    </>
                                                }
                                            </div>
                                        }
                                        {currentProgressBarStep === PROGRESS_BAR_STEPS.BULLETIN_N_2 && !isInPremiereClassGlobal &&
                                            <div id="form/BULLETIN_N_2"> 
                                                {currentSimulationStep >= STEPS.IS_YEAR_1_RESULTS_AVAILABLE && <IsResult1Available/>}
                                                {
                                                    user?.isResult1Available &&
                                                    <>
                                                        {currentSimulationStep >= STEPS.SCHOOL_YEAR1 && <SchoolYear1/>}
                                                        {currentSimulationStep >= STEPS.ACADEMIC_YEAR_HEAD_DETAILS1 && <AcademicYearHeadDetails1 spokenLanguages={spokenLanguages} 
                                                                                                                                                 academicYearOrganizations={academicYearOrganizations} 
                                                                                                                                                markSystems={markSystems} 
                                                                                                                                                subjectWeightSystems={subjectWeightSystems} 
                                                                                                                                                isErrorPage={isErrorPage}/>} 
                                                        {currentSimulationStep >= STEPS.REPORT_CARD1 && <ReportCard1/>}
                                                        {!user?.isResult2Available &&
                                                            <>
                                                                {(isInUniversityGlobal && currentSimulationStep >= STEPS.PROGRAM_DOMAIN_BAC_N_2) && <ProgramDomain/>}
                                                                {currentSimulationStep >= STEPS.MAIN_SUBJECTS_BAC_N_2 && <MainSubjects/>}
                                                            </>
                                                        }
                                                    </>
                                                }
                                            </div>
                                        }
                                        
                                        {currentProgressBarStep === PROGRESS_BAR_STEPS.PARCOURS_ACADEMIQUE_ET_PROFESSIONNEL &&
                                            <div id="form/PARCOURS_ACADEMIQUE_ET_PROFESSIONNEL">
                                                {currentSimulationStep >= STEPS.HAS_WON_AWARD && <HasWonAward/>}
                                                {currentSimulationStep >= STEPS.AWARD_DETAILS && user?.hasWonAward && <AwardDetails spokenLanguages={spokenLanguages} schoolYears={schoolYears} isErrorPage={isErrorPage}/>}
                                                {currentSimulationStep >=STEPS.HAS_WORK_EXPERIENCE && <HasWorkExperience/>}
                                                {currentSimulationStep >=STEPS.WORK_EXPERIENCE_DETAILS && user?.hasWorkExperience && <WorkExperienceDetails/>}
                                                {currentSimulationStep >=STEPS.CAN_PROVE_WORK_EXPERIENCE && user?.hasWorkExperience && <CanProveWorkExperience/>}
                                                {currentSimulationStep >=STEPS.ENGLISH_LEVEL && <EnglishLevel/>}
                                                {currentSimulationStep >=STEPS.CAN_JUSTIFY_ENGLISH_LEVEL && <CanJustifyEnglishLevel/>}
                                                {currentSimulationStep >=STEPS.OTHER_SPOKEN_LANGUAGE && <OtherSpokenLanguage/>}
                                                {currentSimulationStep >=STEPS.OTHER_LANGUAGE_LEVEL && user?.selectedOtherSpokenLanguage?.id !== 'none' && <OtherLanguageLevel/>}
                                                {currentSimulationStep >=STEPS.CAN_JUSTIFY_OTHER_LANGUAGE && user?.selectedOtherSpokenLanguage?.id !== 'none' && <CanJustifyOtherLanguage/>}
                                            </div>
                                        }
                                        {currentProgressBarStep === PROGRESS_BAR_STEPS.INFORMATIONS_VOYAGE &&
                                            <div id="form/INFORMATIONS_VOYAGE">
                                                {currentSimulationStep >=STEPS.ALREADY_TRAVELED_TO_FRANCE && <AlreadyTraveledToFrance/>}
                                                {currentSimulationStep >=STEPS.LAST_FRANCE_TRAVEL_DETAILS && user?.alreadyTraveledToFrance && <LastFranceTravelDetails/>}
                                                {currentSimulationStep >=STEPS.HAS_PASSEPORT && <HasPassport/>}
                                                {currentSimulationStep >=STEPS.PASSEPORT_DETAILS && user?.hasPassport && <PassportDetails/>}
                                            </div>
                                        }
                                        {currentProgressBarStep === PROGRESS_BAR_STEPS.COORDONNEES &&
                                            <div id="form/COORDONNEES">
                                                {currentSimulationStep >=STEPS.SALUTATION && <Salutation/>}
                                                {currentSimulationStep >=STEPS.BIRTHDATE && <BirthDate/>}
                                                {currentSimulationStep >=STEPS.FIRSTNAME  && <Firstname/>}
                                                {currentSimulationStep >=STEPS.LASTNAME  && <Lastname/>}
                                                {currentSimulationStep >=STEPS.NATIONALITY  && <Nationality/>}
                                                {currentSimulationStep >=STEPS.DISABLE  && <Disable/>}
                                                {currentSimulationStep >=STEPS.EMAIL  && <Email/>}
                                                {currentSimulationStep >=STEPS.WHATSAPP_NUMBER  && <PhoneNumber/>}
                                                {currentSimulationStep >=STEPS.ADDRESS  && <Address/>}
                                                {currentSimulationStep >=STEPS.VALIDATION  && <Validation/>}
                                            </div>
                                        }
                                        </>
                                        <div className="BlockView-ctas DaisyBlockView-ctas" />
                                    </div>
                                    </div>
                                    <div className="FunnelSideBar">
                                    <div className="FunnelSideBar-container">
                                        <div className="Stack  stackColumn " style={{ flexDirection: "column", padding: 0, alignItems: "stretch" }}>
                                        <div className="Stack-child  " style={{ paddingTop: 20 }}>
                                            <div className={"progressBar"+(['lg', 'md'].includes(deviceType) ? 'Desktop' : 'Mobile')}>
                                                {/* <h1>{['lg', 'md'].includes(deviceType) +' == '+deviceType}</h1> */}
                                            {['lg', 'md'].includes(deviceType)  && 
                                                        <div className="Card   progressBarDesktop-Card">
                                                                <div className="Box  " style={{ padding: "20px 10px", borderWidth: "initial", borderStyle: "none", borderColor: "initial" }}>
                                                                    <div className="Stack  stackColumn " style={{ flexDirection: "column", padding: 0, alignItems: "stretch" }}>
                                                                        {progressBarSteps.map((step, index) => {
                                                                            return <div key={index} className={`Stack-child ${(currentProgressBarStep !== step.id && currentSimulationStep < step.completedStep) ? 'not-clickable' : ''}`} style={{ paddingTop: 20 }}>
                                                                                {/* {'step.id '+step.id+' currentProgressBarStep== '+currentProgressBarStep+' currentSimulationStep== '+currentSimulationStep+' step.completedStep== '+step.completedStep} */}
                                                                                <Link className={`${(currentProgressBarStep !== step.id && currentSimulationStep < step.completedStep) ? 'not-clickable' : ''}`} 
                                                                                    href={`/simulation/engine?country=FR#form/${step.reference}`} onClick={(e) => {e.preventDefault();handleProgressBarStep(step)}}>
                                                                                    <div className="Stack  stackRow " style={{ flexDirection: "row", padding: 0, alignItems: "center" }}>
                                                                                    <div className="Stack-child  " style={{ paddingLeft: 10 }}>
                                                                                        <div className={`CheckProgressBar ${currentProgressBarStep === step.id ? 'BackgroundCircle' : ''}`}>
                                                                                        <div className="icon-wrapper" style={{ color: (currentProgressBarStep === step.id || currentSimulationStep>=step.completedStep)  ? "#0154c0" : "rgb(188, 199, 210)" }}>
                                                                                            <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" height={20} width={20}>
                                                                                            <path d="M12.098 20.161a1.5 1.5 0 00-2.196 2.045l4.953 5.316a1.5 1.5 0 002.176.02l13.048-13.5a1.5 1.5 0 00-2.158-2.084L15.972 24.32l-3.874-4.16z" fillRule="evenodd" />
                                                                                            </svg>
                                                                                        </div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="Stack-child  " style={{ paddingLeft: 10 }}>
                                                                                        <p style={{ color: currentProgressBarStep === step.id  ? "#0154c0" : "rgb(98, 122, 147)", fontSize: "0.875rem", margin: 0, padding: 0, textAlign: "left", fontWeight: 400, lineHeight: "inherit" }}>{step.title}</p>
                                                                                    </div>
                                                                                    </div>
                                                                                </Link>
                                                                            </div>
                                                                        })}
                                                                    </div>
                                                                </div>
                                                            </div>}
                                            {!['lg', 'md'].includes(deviceType) && <>
                                                {isModalOpened && <div className="ModalCore fade-animation fade-fast-enter-done" style={{ zIndex: 131 }} >
                                                        <div className="ModalCore-content " style={{ transition: "transform 300ms ease-in-out", transform: "scale(1, 1)" }}>
                                                        <div className="ProgressBarMobile-popin">
                                                            <div className="Card   ProgressBarMobile-popin-card" ref={newRefModal}>
                                                                <div className="ProgressBarMobile-popin-right">
                                                                    <svg viewBox="0 0 34 34" xmlns="http://www.w3.org/2000/svg" width={30} className="ProgressBarMobile-popin-close" onClick={() => setIsModalOpened(false)}>
                                                                    <path d="M17 0c9.389 0 17 7.611 17 17s-7.611 17-17 17S0 26.389 0 17 7.611 0 17 0zm0 1C8.163 1 1 8.163 1 17s7.163 16 16 16 16-7.163 16-16S25.837 1 17 1zm5.588 10.415c.47.47.545 1.194.19 1.764l-.083.12-.107.12-3.584 3.584 3.584 3.584c.436.436.532 1.091.26 1.64l-.07.124-.083.12-.107.12c-.47.47-1.194.545-1.764.19l-.12-.083-.12-.107L17 19.007l-3.584 3.584a1.414 1.414 0 01-1.64.26l-.124-.07-.12-.083-.12-.107a1.419 1.419 0 01-.19-1.764l.083-.12.107-.12 3.584-3.584-3.584-3.584a1.414 1.414 0 01-.26-1.64l.07-.124.083-.12.107-.12a1.419 1.419 0 011.764-.19l.12.083.12.107L17 15l3.584-3.584a1.417 1.417 0 012.004 0z" fill="#7F94A9" fillRule="nonzero" />
                                                                    </svg>
                                                                </div>
                                                            <div className="Box   " style={{ padding: 10, borderWidth: "initial", borderStyle: "none", borderColor: "initial" }}>
                                                                <div className="Box   " style={{ padding: "20px 10px", borderWidth: "initial", borderStyle: "none", borderColor: "initial" }}>
                                                                <div className="Stack  stackColumn " style={{ flexDirection: "column", padding: 0, alignItems: "stretch" }}>
                                                                    {progressBarSteps.map((step, index) => {
                                                                        return <div key={index} className={`Stack-child ${(currentProgressBarStep !== step.id && currentSimulationStep < step.completedStep) ? 'not-clickable' : ''}`} style={{ paddingTop: 20 }}>
                                                                            <Link className={`${(currentProgressBarStep !== step.id && currentSimulationStep < step.completedStep) ? 'not-clickable' : ''}`}
                                                                                href={`/simulation/engine?country=FR#form/${step.reference}`} onClick={(e) => {e.preventDefault();handleProgressBarStep(step)}}>
                                                                                <div className="Stack  stackRow " style={{ flexDirection: "row", padding: 0, alignItems: "center" }}>
                                                                                <div className="Stack-child  " style={{ paddingLeft: 10 }}>
                                                                                    <div className={`CheckProgressBar ${currentProgressBarStep === step.id ? 'BackgroundCircle' : ''}`}>
                                                                                    <div className="icon-wrapper" style={{ color: (currentProgressBarStep === step.id || currentSimulationStep>=step.completedStep)  ? "#0154c0" : "rgb(188, 199, 210)" }}>
                                                                                        <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" height={20} width={20}>
                                                                                        <path d="M12.098 20.161a1.5 1.5 0 00-2.196 2.045l4.953 5.316a1.5 1.5 0 002.176.02l13.048-13.5a1.5 1.5 0 00-2.158-2.084L15.972 24.32l-3.874-4.16z" fillRule="evenodd" />
                                                                                        </svg>
                                                                                    </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="Stack-child  " style={{ paddingLeft: 10 }}>
                                                                                    <p style={{ color: currentProgressBarStep === step.id  ? "#0154c0" : "rgb(98, 122, 147)", fontSize: "0.875rem", margin: 0, padding: 0, textAlign: "left", fontWeight: 400, lineHeight: "inherit" }}>{step.title}</p>
                                                                                </div>
                                                                                </div>
                                                                            </Link>
                                                                            </div>
                                                                        })}
                                                                </div>
                                                                </div>
                                                            </div>
                                                            </div>
                                                        </div>
                                                        </div>
                                                    </div>}
                                                    <div className="ProgressBarMobile">
                                                        <div className="ProgressBarMobile-encart" onClick={() => setIsModalOpened(true)}>
                                                            <div className="Stack pushLastItem stackRow " style={{ flexDirection: "row", padding: 0, alignItems: "center" }}>
                                                            <div className="Stack-child  " style={{ paddingLeft: 15 }}>
                                                                <div className="Tag  TagRadius ProgressBarMobile-tag" style={{ fontWeight: 500, height: "100%", margin: 0 }}> Étape  {getCurrentStateNumber()}</div>
                                                            </div>
                                                            <div className="Stack-child  " style={{ paddingLeft: 15 }}>
                                                                <p style={{
                                                                    color: "rgb(127, 148, 169)",
                                                                    fontSize: "0.875rem",
                                                                    margin: 0,
                                                                    padding: 0,
                                                                    textAlign: "left",
                                                                    fontWeight: 400,
                                                                    lineHeight: "inherit"
                                                                }}> {getCurrentProgressBarStepTitle()} </p>
                                                            </div>
                                                            <div className="Stack-child  " style={{ paddingLeft: 15 }}>
                                                                <div className={`ProgressBarMobileScreen-Label-arrow ${isModalOpened ? 'open' : 'closed'}`}>
                                                                <div className="icon-wrapper" style={{ color: "rgb(127, 148, 169)" }}>
                                                                    <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" width="30px" height="30px">
                                                                    <path d="M27.785 15.75l-.562-.53a.829.829 0 00-1.123 0l-6.592 6.226-6.59-6.226a.823.823 0 00-1.124 0l-.561.53a.721.721 0 000 1.061l7.714 7.286c.149.141.35.22.561.22a.82.82 0 00.563-.22l7.714-7.286a.73.73 0 00.233-.531.73.73 0 00-.233-.53" fillRule="evenodd" />
                                                                    </svg>
                                                                </div>
                                                                </div>
                                                            </div>
                                                            </div>
                                                        </div>
                                                    </div></>}
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                </div>
                                <div className="Reassurance trois-titre-text">
                                    <div className="Reassurance-item">
                                        <div className="Reassurance-icon">
                                        <svg id="icon-quote-blue" viewBox="0 0 120 120" className="SvgIcon">
                                            <g id="icon/large/quote/icon-quote-blue" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                                                <g id="icon/large/quote/blue" transform="translate(20 8)">
                                                    <path d="M16.153 80.389a4.483 4.483 0 014.476 4.49c0 2.479-2.005 4.488-4.476 4.488a4.483 4.483 0 01-4.478-4.489c0-2.48 2.005-4.49 4.478-4.49zm18.96 0a4.482 4.482 0 014.477 4.49c0 2.479-2.003 4.488-4.476 4.488a4.483 4.483 0 01-4.477-4.489c0-2.48 2.004-4.49 4.477-4.49zm18.962 0a4.483 4.483 0 014.477 4.49c0 2.479-2.004 4.488-4.477 4.488a4.483 4.483 0 01-4.477-4.489c0-2.48 2.004-4.49 4.477-4.49zM35.021 11.646c7.956 0 14.406 6.468 14.406 14.445 0 7.979-6.45 14.445-14.406 14.445-7.957 0-14.406-6.466-14.406-14.445 0-7.977 6.449-14.445 14.406-14.445zm5.081 9.459l-6.85 6.868-3.658-3.668-2.257 2.262 5.915 5.932 9.107-9.132-2.257-2.262z" id="Combined-Shape" fill="#0154c0" />
                                                    <path d="M59.08 17.614c5.844 0 10.673 4.32 10.673 9.676v65.945c0 5.357-4.829 9.677-10.673 9.677H11.676c-5.846 0-10.677-4.32-10.677-9.677V50.842c0-.661.535-1.198 1.195-1.198s1.194.537 1.194 1.198v42.393c0 3.97 3.704 7.281 8.288 7.281H59.08c4.582 0 8.284-3.312 8.284-7.28V27.29c0-3.969-3.702-7.28-8.284-7.28h-8.4c-.66 0-1.194-.537-1.194-1.198 0-.662.534-1.198 1.194-1.198h8.4zM56.928 69.01c.657 0 1.19.536 1.19 1.197 0 .662-.533 1.198-1.19 1.198H12.724c-.657 0-1.19-.536-1.19-1.198 0-.661.533-1.197 1.19-1.197h44.204zm.034-7.194c.65 0 1.176.536 1.176 1.198 0 .661-.526 1.197-1.176 1.197h-8.398c-.65 0-1.176-.536-1.176-1.197 0-.662.527-1.198 1.176-1.198h8.398zm-14.38 0a1.2 1.2 0 011.202 1.198 1.2 1.2 0 01-1.203 1.197H12.737a1.2 1.2 0 01-1.203-1.197 1.2 1.2 0 011.203-1.198h29.844zM36.69 50.254c.982 0 1.778.805 1.778 1.797 0 .992-.796 1.796-1.778 1.796H13.967a1.787 1.787 0 01-1.777-1.796c0-.992.796-1.797 1.777-1.797H36.69zm-18.173-32.64c.66 0 1.195.536 1.195 1.198 0 .661-.535 1.197-1.195 1.197h-6.842c-4.583 0-8.286 3.312-8.286 7.281v13.19c0 .66-.535 1.197-1.195 1.197S1 41.14 1 40.479V27.29c0-5.356 4.83-9.676 10.675-9.676h6.842zM57.69 24.8c3.164 0 5.8 2.357 5.8 5.316 0 .662-.534 1.198-1.194 1.198-.66 0-1.194-.536-1.194-1.198 0-1.57-1.51-2.921-3.412-2.921-.66 0-1.195-.536-1.195-1.198 0-.661.535-1.197 1.195-1.197z" id="Combined-Shape" fill="#617994" fillRule="nonzero" />
                                                    <path d="M86.138 24.788l-8.81 2.366M74.52 4.784l-5.617 7.203m-14.382-2.81L53.825.057" id="Combined-Shape" stroke="#0154c0" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /> </g>
                                            </g>
                                        </svg>
                                        </div>
                                        <div className="Reassurance-content">
                                        <div className="Heading s isWeak  Reassurance-title"> Offres sur-mesure </div>
                                        <div className="Reassurance-text"> Vos réponses nous aident à évaluer au maximum vos chances d'obternir votre visa </div>
                                        </div>
                                    </div>
                                    <div className="Reassurance-item">
                                        <div className="Reassurance-icon">
                                        <svg id="icon-locker-blue" viewBox="0 0 120 120" className="SvgIcon">
                                            <g id="icon/large/locker/icon-locker-blue" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                                                <g id="icon/large/locker/blue" transform="translate(17 9)">
                                                    <path d="M43.425 21.558c9.32 0 16.877 7.508 16.877 16.768v10.18h7.835c3.318 0 6.028 2.692 6.028 5.988v31.14c0 9.225-7.592 16.767-16.877 16.767H27.15c-9.285 0-16.877-7.542-16.877-16.767V74.256c0-.662.54-1.198 1.206-1.198.665 0 1.205.536 1.205 1.198v11.378c0 7.902 6.512 14.372 14.466 14.372h30.137c7.953 0 14.466-6.47 14.466-14.372v-31.14c0-1.973-1.63-3.593-3.617-3.593H16.302c-1.987 0-3.617 1.62-3.617 3.593v5.989c0 .661-.54 1.197-1.205 1.197a1.202 1.202 0 01-1.206-1.197v-5.989c0-3.296 2.71-5.988 6.028-5.988h9.04v-10.18c0-9.228 7.59-16.768 16.877-16.768h1.206zm21.698 59.884c.666 0 1.206.536 1.206 1.198 0 6.59-5.422 11.976-12.055 11.976a1.202 1.202 0 01-1.205-1.197c0-.662.54-1.198 1.205-1.198 5.302 0 9.644-4.314 9.644-9.581 0-.662.54-1.198 1.205-1.198zm0-8.983c.999 0 1.809.804 1.809 1.797 0 .993-.81 1.796-1.809 1.796a1.802 1.802 0 01-1.808-1.796c0-.993.81-1.797 1.808-1.797zM43.425 26.35h-1.206c-6.624 0-12.054 5.395-12.054 11.977v10.18h25.314v-10.18c0-6.614-5.397-11.977-12.054-11.977z" id="Combined-Shape" fill="#617994" fillRule="nonzero" />
                                                    <path d="M42.22 60.483c3.329 0 6.027 2.681 6.027 5.988 0 2.455-1.487 4.565-3.616 5.49v8.283a2.41 2.41 0 01-2.247 2.39l-.165.006a2.41 2.41 0 01-2.41-2.396v-8.283c-2.13-.924-3.617-3.035-3.617-5.49 0-3.307 2.698-5.988 6.027-5.988z" id="Combined-Shape" fill="#0154c0" />
                                                    <path d="M0 28.454l8.476 2.257L0 28.454zm86.833 1.198l-8.476 2.256 8.476-2.256zM43.425 0v8.384V0zm-28.63 8.183l5.406 6.868-5.405-6.868zm58.448 0l-5.406 6.868 5.406-6.868z" id="Shape" stroke="#0154c0" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /> </g>
                                            </g>
                                        </svg>
                                        </div>
                                        <div className="Reassurance-content">
                                        <div className="Heading s isWeak  Reassurance-title"> Données protégées </div>
                                        <div className="Reassurance-text"> Vos données ne seront jamais communiquées sans votre accord </div>
                                        </div>
                                    </div>
                                    <div className="Reassurance-item">
                                        <div className="Reassurance-icon">
                                        <svg id="icon-wallet-blue" viewBox="0 0 120 120" className="SvgIcon">
                                            <g id="Icon-large" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                                                <g id="icon/-large/wallet/icon-wallet-blue">
                                                    <g id="icon/-large/wallet/blue" transform="translate(20 15)">
                                                        <path d="M73.27 12.82l6.3-3.64M42.92 8l-2-7m17 7l2-8" id="Combined-Shape" stroke="#0154c0" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                                                        <rect id="Rectangle" fill="#0154c0" x={61} y="63.95" width="18.93" height={13} rx={4} />
                                                        <path d="M40.2 13.52v.06a6 6 0 011.51.19l12.4 3.24 5.92 1.54 7.8 2a6 6 0 014.29 7.32l-4.278 17.228.96-.028a7 7 0 017.198 7v10.881l.137.004a5 5 0 014.783 4.995v5a5 5 0 01-4.92 5v8.95c0 5.523-4.477 10-10 10H10c-5.523 0-10-4.477-10-10V76.2a1 1 0 012 0v10.7a8 8 0 008 8h56a8 8 0 008-8v-8.95h-9.01a5 5 0 01-5-5v-5a5 5 0 015-5 1 1 0 010 2 3 3 0 00-3 3v5a3 3 0 003 3h10.93a3 3 0 003-3v-5a3 3 0 00-3-3h-6.09a1 1 0 010-2H74V52.07a5 5 0 00-5.14-5L7 48.89c-.322 0-.636-.01-.94-.032L5 48.9a4.978 4.978 0 01-3-1v20.44a1 1 0 01-2 0V45.89c0-.412.029-.664.117-.91A5 5 0 015 38.9l19.356-1.968.524-11.592a4.83 4.83 0 014.81-4.6l.21-.08 3.706.171L34.39 18a6 6 0 015.81-4.48zM37 84.15a1.5 1.5 0 010 3H10a1.5 1.5 0 010-3h27zm6.5 0a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm-3.3-68.63a4 4 0 00-3.88 3l-7.44 26.89 36.38-.94.77-.39 4.15-16.7a4 4 0 00-2.85-4.91l-7.81-2-5.92-1.57-12.4-3.23a3.76 3.76 0 00-1-.13v-.02zM17.96 42.142h-.102l-11.97.83a.75.75 0 00.002 1.496h.102l11.97-.83a.75.75 0 00.097-1.483l-.099-.013zM29.82 22.65h-.13v.09a2.84 2.84 0 00-2.81 2.68l-.508 11.306 2.915-.296L33.06 22.8l-3.241-.15z" id="Combined-Shape" fill="#627A93" fillRule="nonzero" />
                                                        <path d="M48.93 25.3c7.72.017 13.97 6.28 13.97 14 .01 1.805-.33 3.594-1 5.27l-25.64.66a13.85 13.85 0 01-1.33-5.93c0-7.732 6.268-14 14-14zm3.338 6.214c-1.652 0-3.92 1.372-5.488 3.948-.952 0-1.764.168-2.576.14-.728 0-.98.252-.56.812.308.392 1.036.896 2.268.84-.112.308-.196.644-.196.84-.504.056-1.036.112-1.568.084-.644 0-.896.28-.504.812.308.392.98.84 2.1.784.252 1.26 1.064 2.128 2.436 2.66.448.168.924.252 1.456.252 1.204 0 2.352-.504 3.024-1.344.532-.7.756-1.54.364-2.044-.336-.476-.588-.504-.924.056-.84 1.4-2.268 2.24-3.192 1.932-.588-.196-.868-.812-.784-1.848.504-.056 1.008-.084 1.428-.056.672.056.924-.252.56-.784-.252-.364-.56-.784-1.596-.84l.364-.812c.644-.056 1.288-.112 1.876-.084.728.028.896-.308.616-.728-.224-.336-.56-.7-1.4-.84 1.204-1.456 2.632-2.436 3.052-2.156.196.112-.112.756-.448 1.4-.28.56-.588 1.456-.588 1.876 0 .588.308 1.064.812 1.4.616.364.868.14 1.064-.336.084-.28.308-.728.532-1.092.56-1.036 1.12-2.016.672-2.968-.308-.56-.812-1.12-1.624-1.652-.308-.196-.7-.252-1.176-.252z" id="Combined-Shape" fill="#0154c0" /> </g>
                                                </g>
                                            </g>
                                        </svg>
                                        </div>
                                        <div className="Reassurance-content">
                                        <div className="Heading s isWeak  Reassurance-title"> Économies à la clé </div>
                                        <div className="Reassurance-text"> Seulement 15 minutes pour un maximum d'économies </div>
                                        </div>
                                    </div>
                                </div>
                                {(currentSimulationStep >= STEPS.SCHOOL_LEVEL) && 
                                    <div className="theme-daisy">
                                        <div className="FunnelFooter ProgressBarActive">
                                            <div className="SEOTextContainer  " style={{ padding: "35px 45px 25px 30px", borderWidth: "initial", borderStyle: "none", borderColor: "initial" }}>
                                                <SEAlertMessage title="Quelques critères d'inéligibilité pour les études en France" isError={false} icon={<IconEconomy/>} subtitles={CAMPUS_FRANCE_CRITERIA} />                                                         
                                            </div>                                              
                                        </div>
                                    </div>}
                                <div className="App-modal-wrapper" />
                            </div>
                            </div>
                        </div>
                    </div>}
              <FooterSingleRow/>                    
          </div>}</>

}

export default SimulationEngine
