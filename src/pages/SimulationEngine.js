import { useState, useEffect, useRef} from 'react';
import EdgarHead from '../assets/edgar_head.jpeg'
//import {ReactComponent as ExpertMan} from '../assets/ExpertMan1.svg'

import { Link } from 'react-router-dom';
import FlightSimilution from '../assets/simulation_icons/aeroplane_simulation.png'
import FooterSingleRow from '../components/FooterSingleRow';
import HeaderMenuLoginBar from '../components/HeaderMenuLoginBar';
import SvgSpriteGen from '../assets/simulation_icons/svg-sprite.gen.svg'
import VisaType from './SimulationEngineStep/VisaType'
import SchoolLevel from './SimulationEngineStep/SchoolLevel';
import SchoolYear3 from './SimulationEngineStep/SchoolYear3';
import helper from '../utils/Helper';
import {CAMPUS_FRANCE_CRITERIA, SIMULATION_ENGINE_STEPS, PROGRESS_BAR_STEPS} from '../utils/Constants'
import RecentLevel from './SimulationEngineStep/RecentLevel';
import ClassRepetition from './SimulationEngineStep/ClassRepetition';
import BlankYearReptition from './SimulationEngineStep/BlankYearReptition';
import CouldPayTuition from './SimulationEngineStep/CouldPayTuition';
import ResidentCountry from './SimulationEngineStep/ResidentCountry';
import HighSchoolInFrench from './SimulationEngineStep/HighSchoolInFrench';
import FrenchTest from './SimulationEngineStep/FrenchTest';
import FrenchTestInfoAlert from './SimulationEngineStep/FrenchTestInfoAlert';
import FrenchLevel from './SimulationEngineStep/FrenchLevel';
import RecentDegree from './SimulationEngineStep/RecentDegree';
import DegreeExactName from './SimulationEngineStep/DegreeExactName';
import { useUpdateUserMutation } from '../store/apis/userApi';
import { useDispatch, useSelector } from 'react-redux'
import { setStep } from '../redux/simulationStepSlice';
import { setProgress } from '../redux/progressBarStepSlice';
import { activateUniversity, deactivateUniversity } from '../redux/universitySlice';
import ClassRepetitionWarningAlert from './SimulationEngineStep/ClassRepetitionWarningAlert';
import BlankYearReptitionAlert from './SimulationEngineStep/BlankYearReptitionAlert';
import SEAlertMessage from '../components/SimulationEngine/SEAlertMessage';
import {ReactComponent as IconEconomy} from '../assets/simulation_icons/perplexe_icon.svg'
import CouldPayTuitionWarningAlert from './SimulationEngineStep/CouldPayTuitionWarningAlert';
import MainSubjects from './SimulationEngineStep/MainSubjects';
import ProgramDomain from './SimulationEngineStep/ProgramDomain';
import IsResult3Available from './SimulationEngineStep/IsResult3Available';
import AcademicYearHeadDetails3 from './SimulationEngineStep/AcademicYearHeadDetails3';
import ReportCard3 from './SimulationEngineStep/ReportCard3';
import IsResult2Available from './SimulationEngineStep/IsResult2Available';
import SchoolYear2 from './SimulationEngineStep/SchoolYear2';
import AcademicYearHeadDetails2 from './SimulationEngineStep/AcademicYearHeadDetails2';
import ReportCard2 from './SimulationEngineStep/ReportCard2';
import IsResult1Available from './SimulationEngineStep/IsResult1Available';
import SchoolYear1 from './SimulationEngineStep/SchoolYear1';
import AcademicYearHeadDetails1 from './SimulationEngineStep/AcademicYearHeadDetails1';
import ReportCard1 from './SimulationEngineStep/ReportCard1';
import HasWonAward from './SimulationEngineStep/HasWonAward';
import AwardDetails from './SimulationEngineStep/AwardDetails';
import HasWorkExperience from './SimulationEngineStep/HasWorkExperience';
import WorkExperienceDetails from './SimulationEngineStep/WorkExperienceDetails';
import CanProveWorkExperience from './SimulationEngineStep/CanProveWorkExperience';
import EnglishLevel from './SimulationEngineStep/EnglishLevel';
import CanJustifyEnglishLevel from './SimulationEngineStep/CanJustifyEnglishLevel';
import OtherSpokenLanguage from './SimulationEngineStep/OtherSpokenLanguage';
import OtherLanguageLevel from './SimulationEngineStep/OtherLanguageLevel';
import CanJustifyOtherLanguage from './SimulationEngineStep/CanJustifyOtherLanguage';
import AlreadyTraveledToFrance from './SimulationEngineStep/AlreadyTraveledToFrance';
import LastFranceTravelDetails from './SimulationEngineStep/LastFranceTravelDetails';
import HasPassport from './SimulationEngineStep/HasPassport';
import PassportDetails from './SimulationEngineStep/PassportDetails';
import Salutation from './SimulationEngineStep/Salutation';
import BirthDate from './SimulationEngineStep/BirthDate';
import Firstname from './SimulationEngineStep/Firstname';
import Lastname from './SimulationEngineStep/Lastname';
import Nationality from './SimulationEngineStep/Nationality';
import Disable from './SimulationEngineStep/Disable';
import Email from './SimulationEngineStep/Email';
import PhoneNumber from './SimulationEngineStep/PhoneNumber';
import Address from './SimulationEngineStep/Address';
import Validation from './SimulationEngineStep/Validation';
import _ from 'lodash';
import { activatePremiereClass, deactivatePremiereClass } from '../redux/premiereClassSlice';


function SimulationEngine(){

    const dispatch = useDispatch()
    let user = helper.getLocalStorageWithExpiration('wendogouser')
    const newRefModal = useRef(null)

    
    dispatch(setStep(user?.simulationStep ? user.simulationStep : SIMULATION_ENGINE_STEPS.VISA_TYPE))
    dispatch(setProgress(user?.progressBarStep ? user.progressBarStep : PROGRESS_BAR_STEPS.GENERALITES_SUR_LES_VISAS_ET_LES_ETUDES))
    dispatch(user?.schoolLevelSelected === 'Supérieur' ? activateUniversity() : deactivateUniversity())
    dispatch(user?.hsLevelSelected === 'deg00002' ? activatePremiereClass() : deactivatePremiereClass())
    if(!user){
        document.location.href = '/simulation/home'
        //helper.redirectionAtInit(user, '/simulation/engine', '/simulation/home')
    }
    //dispatch(setStep(user.simulationStep))

    const STEPS = {
        VISA_TYPE: SIMULATION_ENGINE_STEPS.VISA_TYPE,
        SCHOOL_LEVEL: SIMULATION_ENGINE_STEPS.SCHOOL_LEVEL,
        RECENT_CLASS_LEVEL: SIMULATION_ENGINE_STEPS.RECENT_CLASS_LEVEL,
        SCHOOL_YEAR3: SIMULATION_ENGINE_STEPS.SCHOOL_YEAR3,
        RECENT_DEGREE: SIMULATION_ENGINE_STEPS.RECENT_DEGREE,
        DEGREE_EXACT_NAME: SIMULATION_ENGINE_STEPS.DEGREE_EXACT_NAME,
        PROGRAM_DOMAIN: SIMULATION_ENGINE_STEPS.PROGRAM_DOMAIN,
        MAIN_SUBJECTS: SIMULATION_ENGINE_STEPS.MAIN_SUBJECTS,
        CLASS_REPETITION: SIMULATION_ENGINE_STEPS.CLASS_REPETITION,
        CLASS_REPETITION_WARNING: SIMULATION_ENGINE_STEPS.CLASS_REPETITION_WARNING,
        BLANK_YEAR_REPETITION: SIMULATION_ENGINE_STEPS.BLANK_YEAR_REPETITION,
        BLANK_YEAR_REPETITION_WARNING: SIMULATION_ENGINE_STEPS.BLANK_YEAR_REPETITION_WARNING,
        COULD_PAY_TUITION: SIMULATION_ENGINE_STEPS.COULD_PAY_TUITION,
        COULD_PAY_TUITION_WARNING: SIMULATION_ENGINE_STEPS.COULD_PAY_TUITION_WARNING,
        RESIDENT_COUNTRY: SIMULATION_ENGINE_STEPS.RESIDENT_COUNTRY,
        HIGH_SCHOOL_IN_FRENCH: SIMULATION_ENGINE_STEPS.HIGH_SCHOOL_IN_FRENCH,
        FRENCH_TEST: SIMULATION_ENGINE_STEPS.FRENCH_TEST,
        FRENCH_LEVEL: SIMULATION_ENGINE_STEPS.FRENCH_LEVEL,
        IS_YEAR_3_RESULTS_AVAILABLE: SIMULATION_ENGINE_STEPS.IS_YEAR_3_RESULTS_AVAILABLE,
        SCHOOL_YEAR2: SIMULATION_ENGINE_STEPS.SCHOOL_YEAR2,
        ACADEMIC_YEAR_HEAD_DETAILS3: SIMULATION_ENGINE_STEPS.ACADEMIC_YEAR_HEAD_DETAILS3,
        REPORT_CARD3: SIMULATION_ENGINE_STEPS.REPORT_CARD3,
        IS_YEAR_2_RESULTS_AVAILABLE: SIMULATION_ENGINE_STEPS.IS_YEAR_2_RESULTS_AVAILABLE,
        ACADEMIC_YEAR_HEAD_DETAILS2: SIMULATION_ENGINE_STEPS.ACADEMIC_YEAR_HEAD_DETAILS2,
        REPORT_CARD2: SIMULATION_ENGINE_STEPS.REPORT_CARD2,
        IS_YEAR_1_RESULTS_AVAILABLE: SIMULATION_ENGINE_STEPS.IS_YEAR_1_RESULTS_AVAILABLE,
        SCHOOL_YEAR1: SIMULATION_ENGINE_STEPS.SCHOOL_YEAR1,
        ACADEMIC_YEAR_HEAD_DETAILS1: SIMULATION_ENGINE_STEPS.ACADEMIC_YEAR_HEAD_DETAILS1,
        REPORT_CARD1: SIMULATION_ENGINE_STEPS.REPORT_CARD1,
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



    console.log('progressBarStep ===', user?.progressBarStep)
    const [deviceType, setDeviceType] = useState('lg')
    const [browserWidth, setBrowserWidth] = useState(0) 
    const [isModalOpened, setIsModalOpened] = useState(false)
    
    const currentSimulationStep = useSelector((state) => state.simulationStep);
    const currentProgressBarStep = useSelector((state) => state.progressBarStep);
    const isInUniversityGlobal = useSelector((state) => state.university.active)
    const isInPremiereClassGlobal = useSelector((state) => state.premiereClass.active)

    // Conditionally remove or re-add the BULLETIN_N_2 step
    console.log('user.hsLevelSelected === 🤣 ', user?.hsLevelSelected)      
    if (isInPremiereClassGlobal) {
        // Filter out BULLETIN_N_2 if the condition is met
        progressBarSteps = progressBarSteps.filter(step => step.id !== PROGRESS_BAR_STEPS.BULLETIN_N_2);
    } else {
        // Add BULLETIN_N_2 if not already present
        progressBarSteps.splice(3, 0, bulletinN2Step);  // Insert it back at its original position (after BULLETIN_N_1)
    }

    const handleClickOutsideOfModal = (e) => {
        console.log('newRefModal.current 🥳', newRefModal.current)
        if (newRefModal.current && !newRefModal.current.contains(e.target)) {
            console.log('newRefModal.current 🥳xx ')
            setIsModalOpened(false)
        }
    }
    
    //console.log('currentSimulationStep 🥳', currentSimulationStep)
    useEffect(() => {
        helper.addOutsideClick(handleClickOutsideOfModal)

        const handleResize = () => {
            const browserWidth = window.innerWidth;
            console.log('browserWidth', browserWidth)
            if (browserWidth>1200) {
                setDeviceType('lg');
                setIsModalOpened(false)
            }
            if (browserWidth>991 && browserWidth <= 1200) {
                setDeviceType('md');
                setIsModalOpened(false)
            } 
            if (browserWidth>765 && browserWidth <= 990) {
                setDeviceType('sm');
            }  
            if (browserWidth <= 764) {
                setDeviceType('xs');
            } 
        };
        
        if (isModalOpened) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
        
    }, [browserWidth, isModalOpened]);

    const handleProgressBarStep = (stepId) => { 
        dispatch(setProgress(stepId))
        let updatedUser = {...user, progressBarStep: stepId, date: new Date().toISOString()}
        helper.setLocalStorageWithExpiration('wendogouser', updatedUser, false)
        setIsModalOpened(false)
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
                                                    <p>Les dates de candidatures 2024 pour Campus France debutent en Novembre...</p>
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
    return <>{helper.redirectionAtInit(user, '/simulation/engine', '/simulation/home') && 
            <div>   
              <HeaderMenuLoginBar/>
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
                                            {currentSimulationStep >= STEPS.RECENT_CLASS_LEVEL && <RecentLevel/>}
                                            {currentSimulationStep >= STEPS.SCHOOL_YEAR3 && <SchoolYear3/>}
                                            {/* {'isInUniversityGlobal '+isInUniversityGlobal} */}
                                            {isInUniversityGlobal && currentSimulationStep >= STEPS.RECENT_DEGREE && <RecentDegree/>}
                                            {currentSimulationStep >= STEPS.DEGREE_EXACT_NAME && <DegreeExactName/>}
                                            {(isInUniversityGlobal && currentSimulationStep >= STEPS.PROGRAM_DOMAIN) && <ProgramDomain/>}
                                            {currentSimulationStep >= STEPS.MAIN_SUBJECTS && <MainSubjects/>}
                                            {currentSimulationStep >= STEPS.CLASS_REPETITION && <ClassRepetition/>}
                                            {currentSimulationStep >= STEPS.CLASS_REPETITION_WARNING && <ClassRepetitionWarningAlert/>}
                                            {currentSimulationStep >= STEPS.BLANK_YEAR_REPETITION && <BlankYearReptition/>}
                                            {currentSimulationStep >= STEPS.BLANK_YEAR_REPETITION_WARNING && <BlankYearReptitionAlert/>}  
                                            {currentSimulationStep >= STEPS.COULD_PAY_TUITION && <CouldPayTuition/>}
                                            {/* {currentSimulationStep >= STEPS.COULD_PAY_TUITION_WARNING && <CouldPayTuitionWarningAlert/>} */}
                                            {currentSimulationStep >= STEPS.RESIDENT_COUNTRY && <ResidentCountry/>}
                                            {currentSimulationStep >= STEPS.HIGH_SCHOOL_IN_FRENCH && <HighSchoolInFrench/>}
                                            {currentSimulationStep >= STEPS.FRENCH_TEST && <FrenchTest/>}
                                            {currentSimulationStep >= STEPS.FRENCH_TEST && !(user.isFrancophone && user.isFrancophoneCountry) && <FrenchTestInfoAlert/>}
                                            {currentSimulationStep >= STEPS.FRENCH_LEVEL && <FrenchLevel/>} 
                                        </div>
                                    }
                                    
                                    { currentProgressBarStep === PROGRESS_BAR_STEPS.BULLETIN_LE_PLUS_RECENT &&
                                        <div id="form/BULLETIN_LE_PLUS_RECENT"  >
                                            {currentSimulationStep >= STEPS.IS_YEAR_3_RESULTS_AVAILABLE && <IsResult3Available/>}
                                            {currentSimulationStep >= STEPS.ACADEMIC_YEAR_HEAD_DETAILS3 && user.isResult3Available && <AcademicYearHeadDetails3/>} 
                                            {currentSimulationStep >= STEPS.REPORT_CARD3 && user.isResult3Available && <ReportCard3/>}
                                        </div>
                                    }
                                    {currentProgressBarStep === PROGRESS_BAR_STEPS.BULLETIN_N_1 &&
                                        <div id="form/BULLETIN_N_1">
                                            {currentSimulationStep >= STEPS.IS_YEAR_2_RESULTS_AVAILABLE && <IsResult2Available/>}
                                            {currentSimulationStep >= STEPS.SCHOOL_YEAR2 && user.isResult2Available && <SchoolYear2/>}
                                            {currentSimulationStep >= STEPS.ACADEMIC_YEAR_HEAD_DETAILS2 && user.isResult2Available && <AcademicYearHeadDetails2/>}
                                            {currentSimulationStep >= STEPS.REPORT_CARD2 && user.isResult2Available && <ReportCard2/>}
                                        </div>
                                    }
                                    {currentProgressBarStep === PROGRESS_BAR_STEPS.BULLETIN_N_2 && !isInPremiereClassGlobal &&
                                        <div id="form/BULLETIN_N_2"> 
                                            {currentSimulationStep >= STEPS.IS_YEAR_1_RESULTS_AVAILABLE && <IsResult1Available/>}
                                            {currentSimulationStep >= STEPS.SCHOOL_YEAR1 && user.isResult1Available  && <SchoolYear1/>}
                                            {currentSimulationStep >= STEPS.ACADEMIC_YEAR_HEAD_DETAILS1 && user.isResult1Available && <AcademicYearHeadDetails1/>}
                                            {currentSimulationStep >= STEPS.REPORT_CARD1 && user.isResult1Available && <ReportCard1/>}
                                        </div>
                                    }
                                    
                                    {currentProgressBarStep === PROGRESS_BAR_STEPS.PARCOURS_ACADEMIQUE_ET_PROFESSIONNEL &&
                                        <div id="form/PARCOURS_ACADEMIQUE_ET_PROFESSIONNEL">
                                            {currentSimulationStep >= STEPS.HAS_WON_AWARD && <HasWonAward/>}
                                            {currentSimulationStep >= STEPS.AWARD_DETAILS && user.hasWonAward && <AwardDetails/>}
                                            {currentSimulationStep >=STEPS.HAS_WORK_EXPERIENCE && <HasWorkExperience/>}
                                            {currentSimulationStep >=STEPS.WORK_EXPERIENCE_DETAILS && user.hasWorkExperience && <WorkExperienceDetails/>}
                                            {currentSimulationStep >=STEPS.CAN_PROVE_WORK_EXPERIENCE && user.hasWorkExperience && <CanProveWorkExperience/>}
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
                                            {currentSimulationStep >=STEPS.LAST_FRANCE_TRAVEL_DETAILS && user.alreadyTraveledToFrance && <LastFranceTravelDetails/>}
                                            {currentSimulationStep >=STEPS.HAS_PASSEPORT && <HasPassport/>}
                                            {currentSimulationStep >=STEPS.PASSEPORT_DETAILS && user.hasPassport && <PassportDetails/>}
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
                                                                            <a className={`${(currentProgressBarStep !== step.id && currentSimulationStep < step.completedStep) ? 'not-clickable' : ''}`} 
                                                                                href={`/simulation/engine?country=FR#form/${step.reference}`} onClick={() => handleProgressBarStep(step.id)}>
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
                                                                            </a>
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
                                                                        <a className={`${(currentProgressBarStep !== step.id && currentSimulationStep < step.completedStep) ? 'not-clickable' : ''}`}
                                                                            href={`/simulation/engine?country=FR#form/${step.reference}`} onClick={() => handleProgressBarStep(step.id)}>
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
                                                                        </a>
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
                                                            <div className="Tag   ProgressBarMobile-tag" style={{ fontWeight: 500, height: "100%", margin: 0 }}> Étape  {getCurrentStateNumber()}</div>
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
                                    <svg className="SvgIcon">
                                        <use xlinkHref={SvgSpriteGen+'#icon-quote-blue'} />
                                    </svg>
                                    </div>
                                    <div className="Reassurance-content">
                                    <div className="Heading s isWeak  Reassurance-title"> Offres sur-mesure </div>
                                    <div className="Reassurance-text"> Vos réponses nous aident à évaluer au maximum vos chances d'obternir votre visa </div>
                                    </div>
                                </div>
                                <div className="Reassurance-item">
                                    <div className="Reassurance-icon">
                                    <svg className="SvgIcon">
                                        <use xlinkHref={SvgSpriteGen+'#icon-locker-blue'} />
                                    </svg>
                                    </div>
                                    <div className="Reassurance-content">
                                    <div className="Heading s isWeak  Reassurance-title"> Données protégées </div>
                                    <div className="Reassurance-text"> Vos données ne seront jamais communiquées sans votre accord </div>
                                    </div>
                                </div>
                                <div className="Reassurance-item">
                                    <div className="Reassurance-icon">
                                    <svg className="SvgIcon">
                                        <use xlinkHref={SvgSpriteGen+'#icon-wallet-blue'}/>
                                    </svg>
                                    </div>
                                    <div className="Reassurance-content">
                                    <div className="Heading s isWeak  Reassurance-title"> Économies à la clé </div>
                                    <div className="Reassurance-text"> Seulement 10 minutes pour un maximum d'économies </div>
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
                </div>
              <FooterSingleRow/>                    
          </div>}</>

}

export default SimulationEngine
