'use client';

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { activateUniversity, deactivateUniversity } from '../../redux/universitySlice';
import { setStep } from '../../redux/simulationStepSlice';
import { SIMULATION_ENGINE_STEPS } from '../../utils/Constants';
import SEDualSelection from "../../components/SimulationEngine/SEDualSelection";
import TutorialModal from "../ressources/TutorialModal";
import helper from '../../utils/Helper';
import { setUser } from '../../redux/userSlice';
import { Loader2 } from "lucide-react"; 

function SchoolLevel() {
    const dispatch = useDispatch();
    
    // Core states
    const [isInitializing, setIsInitializing] = useState(true);
    const user = useSelector((state) => state.user);
    const [schoolLevelSelected, setSchoolLevelSelected] = useState('Supérieur');
    const [showContinueBtn, setShowContinueBtn] = useState(false);
    const [openTutorial, setOpenTutorial] = useState(true);



    // Initialize user data
    useEffect(() => {
        const initializeData = () => {
            
            if (!user) return;
           
            setSchoolLevelSelected(user?.schoolLevelSelected || 'Supérieur');
            setShowContinueBtn(user?.simulationStep === SIMULATION_ENGINE_STEPS.SCHOOL_LEVEL);

            // Only set openTutorial to false if it's explicitly set to false in user data
            // This ensures the modal opens on first load and subsequent loads if not explicitly closed
            if (user.openTutorial === false) {
                setOpenTutorial(false);
            }
            // Set initial university state
            if (user?.schoolLevelSelected === 'Supérieur') {
                dispatch(activateUniversity());
            } else {
                dispatch(deactivateUniversity());
            }
            
            setIsInitializing(false);
        };

        initializeData();
    }, [dispatch]);



    const handleSchoolLevelSelection = (item) => {
        setSchoolLevelSelected(item);
        dispatch(item === 'Supérieur' ? activateUniversity() : deactivateUniversity());
        updateWendogouser(SIMULATION_ENGINE_STEPS.RECENT_CLASS_LEVEL, item);
    };

    const handleContinue = () => {
        dispatch(schoolLevelSelected === 'Supérieur' ? activateUniversity() : deactivateUniversity());
        updateWendogouser(SIMULATION_ENGINE_STEPS.RECENT_CLASS_LEVEL, schoolLevelSelected);
    };

    const updateWendogouser = (simulationStep, schoolLevelSelected) => {
        const updatedUser = {
            ...user,
            simulationStep,
            schoolLevelSelected,
            date: new Date().toISOString()
        };
        
        console.log('updatedUser:', updatedUser);
        dispatch(setUser(updatedUser));
        setShowContinueBtn(false);
        dispatch(setStep(simulationStep));
        helper.setLocalStorageWithExpiration('wendogouser', updatedUser);
    };

    // SVG icons
    const superieurSVG =  <svg width="64.3499068px" height="60px" viewBox="0 0 64.3499068 60" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                                <title>noun-university-6599176</title>
                                <g id="Page-1" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                                    <g id="noun-university-6599176" fill={schoolLevelSelected==='Supérieur' ? "#0154c0" : "#4e6174"} fillRule="nonzero">
                                    <path d="M63.4695998,54.7593434 L61.6851769,54.7593434 L61.6851769,52.1621812 C61.685177,51.9287684 61.5924101,51.7049251 61.4273021,51.5399377 C61.262194,51.3749504 61.0382829,51.2823472 60.8048702,51.282518 L58.6034599,51.282518 L58.6034599,27.545768 L60.8048702,27.545768 C61.2910502,27.545768 61.6851769,27.1516413 61.6851769,26.6654613 L61.6851769,23.1905664 C61.6851769,22.7043864 61.2910502,22.3102596 60.8048702,22.3102596 L58.874373,22.3102596 L56.5436194,17.9582755 C56.391014,17.6734056 56.0945882,17.495056 55.7714205,17.4936692 L42.4599989,17.4936692 L41.0739019,16.3315098 L41.6015712,16.1744961 C41.9745181,16.0634819 42.2302166,15.7206312 42.2302698,15.3315123 L42.2302698,8.84118075 L45.0584481,7.86756667 L45.0584481,12.3038492 C44.0140864,12.7251941 43.4149399,13.8277029 43.6295451,14.9332198 C43.8441502,16.0387368 44.812279,16.8370029 45.9384331,16.8370029 C47.0645872,16.8370029 48.032716,16.0387368 48.2473211,14.9332198 C48.4619263,13.8277029 47.8627798,12.7251941 46.8184181,12.3038492 L46.8184181,7.26203405 L47.6967943,6.95958949 C48.0515918,6.8370051 48.2896254,6.50292266 48.2896254,6.1275452 C48.2896254,5.75216774 48.0515918,5.4180853 47.6967943,5.29550091 L40.0796959,2.67002473 L32.463241,0.0477660504 C32.277648,-0.0159220168 32.0761198,-0.0159220168 31.8905268,0.0477660504 L24.2695674,2.67002473 L16.6531125,5.29550091 C16.2983149,5.4180853 16.0602814,5.75216774 16.0602814,6.1275452 C16.0602814,6.50292266 16.2983149,6.8370051 16.6531125,6.95958949 L22.1228545,8.84118075 L22.1228545,15.3282948 C22.1229077,15.7174137 22.3786062,16.0602644 22.7515531,16.1712786 L23.2811528,16.3289358 L21.8950559,17.4872342 L8.57848625,17.4872342 C8.25379404,17.4873289 7.95551589,17.6661474 7.80242638,17.952484 L5.47553376,22.3083291 L3.54503657,22.3083291 C3.0588566,22.3083291 2.66472986,22.7024559 2.66472986,23.1886359 L2.66472986,26.6635308 C2.66472986,27.1497108 3.0588566,27.5438375 3.54503657,27.5438375 L5.74644687,27.5438375 L5.74644687,51.282518 L3.54503657,51.282518 C3.31162391,51.2823472 3.08771278,51.3749504 2.92260472,51.5399377 C2.75749666,51.7049251 2.66472979,51.9287684 2.66472986,52.1621812 L2.66472986,54.7593434 L0.880306954,54.7593434 C0.646782749,54.7591725 0.422773985,54.851864 0.257647392,55.0169906 C0.0925207989,55.1821171 0,55.4061259 0,55.6396501 L0,59.1203365 C0,59.3537493 0.0927670395,59.5775926 0.257875097,59.74258 C0.422983155,59.9075674 0.646894289,60 0.880306954,60 L63.4695998,60 C63.7030125,60 63.9269236,59.9075674 64.0920317,59.74258 C64.2571397,59.5775926 64.3499068,59.3537493 64.3499068,59.1203365 L64.3499068,55.6396501 C64.3499068,55.4061259 64.257386,55.1821171 64.0922594,55.0169906 C63.9271328,54.851864 63.703124,54.7591725 63.4695998,54.7593434 Z M45.9387549,15.0766899 C45.6110835,15.0777511 45.3445901,14.8129845 45.3435213,14.4853131 C45.3424589,14.1576417 45.6072246,13.8911474 45.934896,13.8900775 C46.2625673,13.8890139 46.5290626,14.1537787 46.5301305,14.48145 C46.5297866,14.8085435 46.2658391,15.0742142 45.9387549,15.0766899 Z M56.84349,51.282518 L46.0745332,51.282518 L46.0745332,27.545768 L56.84349,27.545768 L56.84349,51.282518 Z M59.925207,25.7857981 L46.0745332,25.7857981 L46.0745332,24.0682991 L59.925207,24.0682991 L59.925207,25.7857981 Z M55.2443948,19.2536391 L56.8808129,22.3102596 L46.0745332,22.3102596 L46.0745332,20.9331716 C46.0743708,20.6732623 45.9594446,20.426689 45.7605056,20.2594281 L44.5584494,19.2536391 L55.2443948,19.2536391 Z M24.8429251,4.33411331 L32.1749534,1.81030998 L39.5044077,4.33411331 L44.7083846,6.1262582 L41.1105814,7.3649939 C41.074983,7.37439132 41.0401369,7.38643687 41.0063345,7.40102984 L32.1749534,10.4409194 L23.3358503,7.39845585 C23.3053702,7.38600441 23.2742194,7.37526274 23.2425429,7.3662809 L19.6389481,6.1269017 L24.8429251,4.33411331 Z M31.8905268,12.2034634 C32.0760116,12.2677965 32.2777562,12.2677965 32.463241,12.2034634 L40.4702998,9.44735687 L40.4702998,14.6732128 L39.0217834,15.1050006 L38.9986175,15.1120791 L32.1749534,17.1436057 L25.3731683,15.1178706 C25.3551503,15.1120791 25.3377758,15.1069311 25.3197579,15.1024266 L23.879607,14.6732128 L23.879607,9.44671337 L31.8905268,12.2034634 Z M31.9259193,18.9055061 C32.0896567,18.9544012 32.2641111,18.9544012 32.4278485,18.9055061 L39.0558889,16.9318945 L41.5520217,19.0251969 C41.5680024,19.0400159 41.5847568,19.053978 41.6022147,19.0670244 L44.3164937,21.343724 L44.3164937,51.282518 L39.658204,51.282518 L39.658204,41.2291321 C39.6578491,40.7430992 39.2639302,40.3491803 38.7778973,40.3488254 L25.575227,40.3488254 C25.0892983,40.3491806 24.6955637,40.7432033 24.6955638,41.2291321 L24.6955638,51.282518 L20.0359871,51.282518 L20.0359871,21.3443675 L22.7676406,19.0541544 L22.7772931,19.0464324 L25.2991659,16.932538 L31.9259193,18.9055061 Z M33.0565471,51.282518 L33.0565471,42.1087953 L37.8982341,42.1087953 L37.8982341,51.282518 L33.0565471,51.282518 Z M26.4555337,51.282518 L26.4555337,42.1087953 L31.2965772,42.1087953 L31.2965772,51.282518 L26.4555337,51.282518 Z M9.10551198,19.2536391 L19.7921009,19.2536391 L18.5906882,20.2587846 C18.391025,20.4258895 18.2755766,20.6728077 18.2753736,20.9331716 L18.2753736,22.3083291 L7.47102436,22.3083291 L9.10551198,19.2536391 Z M4.42469979,24.0682991 L18.2753736,24.0682991 L18.2753736,25.7857981 L4.42469979,25.7857981 L4.42469979,24.0682991 Z M7.50641681,27.543194 L18.2753736,27.543194 L18.2753736,51.282518 L7.50641681,51.282518 L7.50641681,27.543194 Z M4.42469979,53.0424879 L59.925207,53.0424879 L59.925207,54.7593434 L4.42469979,54.7593434 L4.42469979,53.0424879 Z M62.5899366,58.2400298 L1.75997017,58.2400298 L1.75997017,56.5193133 L62.5899366,56.5193133 L62.5899366,58.2400298 Z M30.5018558,29.7651963 L33.8544859,29.7651963 C34.3405188,29.7648414 34.7344378,29.3709225 34.7347927,28.8848896 L34.7347927,25.529042 C34.7344375,25.0431133 34.3404147,24.6493787 33.8544859,24.6493787 L30.5018558,24.6493787 C30.0160312,24.6493787 29.6221926,25.0432174 29.6221926,25.529042 L29.6221926,28.8848896 C29.6221926,29.3708184 30.0159272,29.7648411 30.5018558,29.7651963 L30.5018558,29.7651963 Z M31.3821625,26.4093487 L32.9780402,26.4093487 L32.9780402,28.0052263 L31.3821625,28.0052263 L31.3821625,26.4093487 Z M23.7727861,36.6976117 L27.1286337,36.6976117 C27.6148137,36.6976117 28.0089405,36.3034849 28.0089405,35.817305 L28.0089405,32.4614574 C28.0085852,31.9755287 27.6145625,31.5817941 27.1286337,31.5817941 L23.7727861,31.5817941 C23.2868573,31.5817941 22.8928346,31.9755287 22.8924794,32.4614574 L22.8924794,35.817305 C22.8924794,36.0507768 22.9852257,36.2746863 23.1503153,36.4397758 C23.3154048,36.6048654 23.5393143,36.6976117 23.7727861,36.6976117 Z M24.6524493,33.3417641 L26.248327,33.3417641 L26.248327,34.9376418 L24.6524493,34.9376418 L24.6524493,33.3417641 Z M23.7727861,29.7651963 L27.1286337,29.7651963 C27.6146666,29.7648414 28.0085856,29.3709225 28.0089405,28.8848896 L28.0089405,25.529042 C28.0085852,25.0431133 27.6145625,24.6493787 27.1286337,24.6493787 L23.7727861,24.6493787 C23.2868573,24.6493787 22.8928346,25.0431133 22.8924794,25.529042 L22.8924794,28.8848896 C22.8928343,29.3709225 23.2867532,29.7648414 23.7727861,29.7651963 L23.7727861,29.7651963 Z M24.6524493,26.4093487 L26.248327,26.4093487 L26.248327,28.0052263 L24.6524493,28.0052263 L24.6524493,26.4093487 Z M30.5018558,36.6976117 L33.8544859,36.6976117 C34.0879578,36.6976117 34.3118673,36.6048654 34.4769568,36.4397758 C34.6420463,36.2746863 34.7347927,36.0507768 34.7347927,35.817305 L34.7347927,32.4614574 C34.7344375,31.9755287 34.3404147,31.5817941 33.8544859,31.5817941 L30.5018558,31.5817941 C30.0160312,31.5817941 29.6221924,31.9756328 29.6221924,32.4614574 L29.6221924,35.817305 C29.6220219,36.0507176 29.714625,36.2746288 29.8796124,36.4397368 C30.0445997,36.6048449 30.2684431,36.6976117 30.5018558,36.6976117 L30.5018558,36.6976117 Z M31.3821625,33.3417641 L32.9780402,33.3417641 L32.9780402,34.9376418 L31.3821625,34.9376418 L31.3821625,33.3417641 Z M37.2244905,36.6976117 L40.5803382,36.6976117 C41.0665181,36.6976117 41.4606449,36.3034849 41.4606449,35.817305 L41.4606449,32.4614574 C41.4602897,31.9755287 41.0662669,31.5817941 40.5803382,31.5817941 L37.221273,31.5817941 C36.7353443,31.5817941 36.3413215,31.9755287 36.3409663,32.4614574 L36.3409663,35.817305 C36.3409663,36.3034849 36.7350931,36.6976117 37.221273,36.6976117 L37.2244905,36.6976117 Z M38.1047973,33.3417641 L39.7006749,33.3417641 L39.7006749,34.9376418 L38.1015798,34.9376418 L38.1047973,33.3417641 Z M37.2244905,29.7651963 L40.5803382,29.7651963 C41.0663711,29.7648414 41.46029,29.3709225 41.4606449,28.8848896 L41.4606449,25.529042 C41.4602897,25.0431133 41.0662669,24.6493787 40.5803382,24.6493787 L37.221273,24.6493787 C36.7353443,24.6493787 36.3413215,25.0431133 36.3409663,25.529042 L36.3409663,28.8848896 C36.3413212,29.3709225 36.7352401,29.7648414 37.221273,29.7651963 L37.2244905,29.7651963 Z M38.1015798,26.4093487 L39.6974574,26.4093487 L39.6974574,28.0052263 L38.1015798,28.0052263 L38.1015798,26.4093487 Z M14.5707495,30.1319907 L11.2149019,30.1319907 C10.7289731,30.1319907 10.3349504,30.5257253 10.3345952,31.011654 L10.3345952,34.3675016 C10.3349501,34.8535345 10.728869,35.2474534 11.2149019,35.2478083 L14.5707495,35.2478083 C15.0566782,35.2474531 15.4504127,34.8534304 15.4504127,34.3675016 L15.4504127,31.011654 C15.4504127,30.5258294 15.0565741,30.1319907 14.5707495,30.1319907 L14.5707495,30.1319907 Z M13.6904428,33.4878384 L12.0977826,33.4878384 L12.0977826,31.8919607 L13.6936603,31.8919607 L13.6904428,33.4878384 Z M14.5707495,36.857843 L11.2149019,36.857843 C10.7287219,36.857843 10.3345952,37.2519697 10.3345952,37.7381497 L10.3345952,41.0901363 C10.335659,41.5756665 10.7293707,41.9688025 11.2149019,41.969156 L14.5707495,41.969156 C15.0566782,41.9688008 15.450413,41.5747781 15.450413,41.0888493 L15.450413,37.7381497 C15.4505835,37.504737 15.3579803,37.2808259 15.192993,37.1157178 C15.0280056,36.9506098 14.8041622,36.857843 14.5707495,36.857843 L14.5707495,36.857843 Z M13.6904428,40.2104731 L12.0977826,40.2104731 L12.0977826,38.6178129 L13.6936603,38.6178129 L13.6904428,40.2104731 Z M14.5707495,43.5779037 L11.2149019,43.5779037 C10.7289731,43.5779037 10.3349504,43.9716382 10.3345952,44.4575669 L10.3345952,47.8134145 C10.3345952,48.2995945 10.7287219,48.6937212 11.2149019,48.6937212 L14.5707495,48.6937212 C14.8041622,48.6937212 15.0280056,48.6009544 15.192993,48.4358464 C15.3579803,48.2707383 15.4505835,48.0468272 15.4504165,47.8134145 L15.4504165,44.4601409 C15.4510967,44.226394 15.3587202,44.0019864 15.1936772,43.8364604 C15.0286341,43.6709345 14.8044974,43.5779037 14.5707495,43.5779037 L14.5707495,43.5779037 Z M13.6904428,46.9337513 L12.0977826,46.9337513 L12.0977826,45.3378736 L13.6936603,45.3378736 L13.6904428,46.9337513 Z M49.7823748,35.2478083 L53.1350049,35.2478083 C53.6209335,35.2474531 54.0146681,34.8534304 54.0146681,34.3675016 L54.0146681,31.011654 C54.0146681,30.5258294 53.6208295,30.1319907 53.1350049,30.1319907 L49.7823748,30.1319907 C49.2978072,30.1337631 48.905929,30.5270831 48.905929,31.011654 L48.905929,34.3675016 C48.905929,34.8521777 49.2977033,35.2456825 49.7823748,35.2478083 Z M50.6626815,31.8919607 L52.2521242,31.8919607 L52.2521242,33.4878384 L50.6626815,33.4878384 L50.6626815,31.8919607 Z M49.7823748,41.969156 L53.1350049,41.969156 C53.6209335,41.9688008 54.0146683,41.5747781 54.0146683,41.0888493 L54.0146683,37.7381497 C54.0148388,37.504737 53.9222357,37.2808259 53.7572483,37.1157178 C53.592261,36.9506098 53.3684176,36.857843 53.1350049,36.857843 L49.7823748,36.857843 C49.2975559,36.8596161 48.9055711,37.2533277 48.9059288,37.7381497 L48.9059288,41.0901363 C48.9066322,41.5743102 49.298205,41.967033 49.7823748,41.969156 Z M50.6626815,38.6165259 L52.2521242,38.6165259 L52.2521242,40.2091861 L50.6626815,40.2091861 L50.6626815,38.6165259 Z M49.7823748,48.6962952 L53.1350049,48.6962952 C53.3684176,48.6962952 53.592261,48.6035284 53.7572483,48.4384204 C53.9222357,48.2733123 54.0148388,48.0494012 54.0146719,47.8159885 L54.0146719,44.4601409 C54.0153521,44.226394 53.9229756,44.0019864 53.7579325,43.8364604 C53.5928895,43.6709345 53.3687527,43.5779037 53.1350049,43.5779037 L49.7823748,43.5779037 C49.2968009,43.5796777 48.9045049,43.9745659 48.9059252,44.4601409 L48.9059252,47.8159885 C48.9055711,48.3008104 49.2975559,48.694522 49.7823748,48.6962952 L49.7823748,48.6962952 Z M50.6626815,45.3404476 L52.2521242,45.3404476 L52.2521242,46.9363253 L50.6626815,46.9363253 L50.6626815,45.3404476 Z" id="Shape" />
                                    </g>
                                </g>
                                </svg>

    const lyceeSVG =  <svg width="82.001551px" height="60px" viewBox="0 0 82.001551 60" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3. org/1999/xlink">
                            <title>noun-campus-5246149</title>
                            <g id="Page-1" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                                <g id="noun-campus-5246149" fill={schoolLevelSelected==='Lycée' ? "#0154c0" : "#4e6174"} fillRule="nonzero">
                                <g id="Group">
                                    <path d="M41.0011684,14.4665482 C37.0177692,14.4665482 33.7771188,17.7079964 33.7771188,21.6913956 C33.7771188,25.6755926 37.0177692,28.9170408 41.0011684,28.9170408 C44.9853654,28.9170408 48.2268136,25.6755926 48.2268136,21.6913956 C48.2268136,17.7071986 44.9853654,14.4665482 41.0011684,14.4665482 Z M41.0011684,27.3206495 C37.8977391,27.3206495 35.3727123,24.794825 35.3727123,21.6905978 C35.3727123,18.5863707 37.8977391,16.0613439 41.0011684,16.0613439 C44.1053956,16.0613439 46.6312201,18.5863707 46.6312201,21.6905978 C46.6312201,24.7956228 44.1053956,27.3206495 41.0011684,27.3206495 Z" id="Shape" />
                                    <path d="M41.0011684,18.110086 L41.0011684,18.110086 C40.5599868,18.110086 40.2033717,18.4674989 40.2033717,18.9078827 L40.2049673,21.4568434 L38.4075312,24.2555144 C38.1697878,24.6264899 38.2766925,25.1195283 38.647668,25.3580695 C38.7809001,25.4434337 38.9300881,25.4849192 39.0784783,25.4849192 C39.3409534,25.4849192 39.5978439,25.3556761 39.7502231,25.1187305 L41.6745089,22.1222059 C41.7574797,21.9929628 41.8013586,21.842977 41.8013586,21.6905978 L41.7989652,18.9078827 C41.7981674,18.4674989 41.4407544,18.110086 41.0011684,18.110086 Z" id="Path" />
                                    <path d="M81.8890497,27.7091765 L74.202278,14.8550753 C74.0578768,14.6141406 73.7977951,14.4665482 73.5177684,14.4665482 L56.7057975,14.4665482 L43.0658664,0.826617186 C41.9633113,-0.275140127 40.0422167,-0.275937924 38.9388638,0.826617186 L25.298135,14.4665482 L8.48616404,14.4665482 C8.20533958,14.4665482 7.94525784,14.6141406 7.80165443,14.8550753 L0.113287139,27.7091765 C0.0390920408,27.832835 0,27.9748428 0,28.1184462 L0,30.0411364 C0,30.4815202 0.357412944,30.8389332 0.797796751,30.8389332 L3.71135049,30.8389332 L3.71135049,33.8841234 L3.71135049,41.0682831 L3.71135049,49.3573913 L3.71135049,56.5407533 L3.71135049,59.2022032 C3.71135049,59.6425871 4.06876343,60 4.50914724,60 L23.9530497,60 L23.9801747,60 L30.0649706,60 L33.2457862,60 L41.0011684,60 L41.0019662,60 L41.002764,60 L48.7565506,60 L51.9373663,60 L58.0221621,60 L58.0476916,60 L77.4931896,60 C77.9335734,60 78.2909864,59.6425871 78.2909864,59.2022032 L78.2909864,56.5407533 L78.2909864,49.3573913 L78.2909864,41.0682831 L78.2909864,33.8841234 L78.2909864,30.8389332 L81.2037423,30.8389332 C81.6441261,30.8389332 82.001551,30.4815202 82.001551,30.0411364 L82.001551,28.1184462 C82.001551,27.9748428 81.9632448,27.832835 81.8890497,27.7091765 Z M73.0646198,16.0621417 L79.3839679,26.6297575 L58.8462861,26.6297575 L58.8462861,24.2603012 C59.074456,24.3169447 59.3082105,24.355239 59.5483473,24.355239 C60.3285925,24.355239 61.0609699,24.0512784 61.6114497,23.5000008 C62.1627272,22.9487233 62.4666878,22.2155481 62.4666878,21.4361007 C62.4666878,20.6566532 62.1627272,19.923478 61.6114497,19.3729983 L58.3005932,16.0621417 L73.0646198,16.0621417 Z M76.6961907,34.6827179 L76.6961907,40.2712841 L71.8846784,40.2712841 L71.8846784,34.6827179 L76.6961907,34.6827179 Z M76.6961907,55.7429565 L71.8846784,55.7429565 L71.8846784,50.1551881 L76.6961907,50.1551881 L76.6961907,55.7429565 Z M58.8462861,55.7429565 L58.8462861,50.1551881 L64.8975745,50.1551881 L64.8975745,55.7429565 L58.8462861,55.7429565 Z M41.002764,58.4044065 L41.002764,58.4044065 L41.0011684,58.4044065 L34.0443808,58.4044065 L34.0443808,45.4202644 L41.7311524,45.4202644 L47.9587539,45.4202644 L47.9587539,58.4044065 L41.002764,58.4044065 L41.002764,58.4044065 Z M41.7311524,43.8246709 L33.246584,43.8246709 L30.0657684,43.8246709 L28.7422235,43.8246709 L28.7422235,42.1141946 L40.5288727,33.6240416 L41.4734641,33.6240416 L53.2601133,42.1141946 L53.2601133,43.8246709 L51.9365685,43.8246709 L48.7557528,43.8246709 L41.7311524,43.8246709 Z M54.0587078,45.4202644 C54.4990917,45.4202644 54.8565046,45.0628514 54.8565046,44.6224676 L54.8565046,41.7057227 C54.8565046,41.4488322 54.7328461,41.2078975 54.5246211,41.0579117 L42.1978635,32.1784339 C42.1731318,32.1608824 42.1444112,32.1568934 42.1188817,32.1425331 C42.0726095,32.1162058 42.0263372,32.0938674 41.9744805,32.0771137 C41.9202303,32.0595622 41.8675757,32.0499886 41.8117299,32.0444041 C41.783807,32.0412129 41.7598731,32.0276503 41.7311524,32.0276503 L40.2711844,32.0276503 C40.1036471,32.0276503 39.9408965,32.0803049 39.8052711,32.1776361 L27.4785135,41.0579117 C27.2702885,41.2078975 27.14663,41.4488322 27.14663,41.7057227 L27.14663,44.6224676 C27.14663,45.0628514 27.504043,45.4202644 27.9444268,45.4202644 L29.2679716,45.4202644 L29.2679716,58.4044065 L24.7508464,58.4044065 L24.7508464,56.6755809 C24.7588244,56.6301065 24.7779715,56.5886211 24.7779715,56.5407533 L24.7779715,49.3573913 C24.7779715,49.3095235 24.7588244,49.2680381 24.7508464,49.2225637 L24.7508464,43.651549 C24.7588244,43.6060746 24.7779715,43.5645891 24.7779715,43.5167213 C24.7779715,43.4688535 24.7588244,43.4273681 24.7508464,43.3818937 L24.7508464,41.2047063 C24.7588244,41.1592319 24.7779715,41.1177465 24.7779715,41.0698787 L24.7779715,33.885719 C24.7779715,33.8378511 24.7588244,33.7963657 24.7508464,33.7508913 L24.7508464,30.1775597 C24.7588244,30.1320852 24.7779715,30.0905998 24.7779715,30.042732 C24.7779715,29.9948642 24.7588244,29.9533788 24.7508464,29.9079044 L24.7508464,27.5639775 C24.7588244,27.5185031 24.7779715,27.4770177 24.7779715,27.4291498 C24.7779715,27.381282 24.7588244,27.3397966 24.7508464,27.2943222 L24.7508464,23.2686398 L26.5347199,21.4855641 L26.5347199,38.1028726 C26.5347199,38.5432564 26.8921329,38.9006693 27.3325167,38.9006693 C27.7729005,38.9006693 28.1303134,38.5432564 28.1303134,38.1028726 L28.1303134,19.9450185 C28.1303134,19.9282648 28.1215377,19.9139045 28.1207399,19.8971507 L41.002764,7.01751997 L53.8823948,19.8979485 C53.881597,19.9147022 53.8728212,19.9282648 53.8728212,19.9450185 L53.8728212,38.1004792 C53.8728212,38.540863 54.2302341,38.8982759 54.670618,38.8982759 C55.1110018,38.8982759 55.4684147,38.540863 55.4684147,38.1004792 L55.4684147,21.4847663 L57.2506926,23.2670442 L57.2506926,27.3007046 C57.2435125,27.3437856 57.2251631,27.3828776 57.2251631,27.428352 C57.2251631,27.4738265 57.2435125,27.5121207 57.2506926,27.5559995 L57.2506926,29.9150845 C57.2435125,29.9581655 57.2251631,29.9972576 57.2251631,30.042732 C57.2251631,30.0882064 57.2435125,30.1265007 57.2506926,30.1703795 L57.2506926,33.7588693 C57.2435125,33.8019503 57.2251631,33.8410423 57.2251631,33.8865167 L57.2251631,41.0706765 C57.2251631,41.1161509 57.2435125,41.1544451 57.2506926,41.198324 L57.2506926,43.3906694 C57.2435125,43.4337505 57.2251631,43.4728425 57.2251631,43.5183169 C57.2251631,43.5637913 57.2435125,43.6020856 57.2506926,43.6459644 L57.2506926,49.232935 C57.2435125,49.2760161 57.2251631,49.3151081 57.2251631,49.3605825 L57.2251631,56.5439445 C57.2251631,56.5894189 57.2435125,56.6277131 57.2506926,56.671592 L57.2506926,58.4075977 L52.735163,58.4075977 L52.735163,45.4202644 L54.0587078,45.4202644 Z M5.30694399,55.7429565 L5.30694399,50.1551881 L10.1184562,50.1551881 L10.1184562,55.7429565 L5.30694399,55.7429565 Z M23.1552529,34.6827179 L23.1552529,40.2712841 L17.1055601,40.2712841 L17.1055601,34.6827179 L23.1552529,34.6827179 Z M10.9170507,41.8668776 L16.3085612,41.8668776 L23.1560507,41.8668776 L23.1560507,42.7181268 L5.30694399,42.7181268 L5.30694399,41.8668776 L10.9170507,41.8668776 Z M15.5099666,40.2712841 L11.7140497,40.2712841 L11.7140497,34.6827179 L15.5099666,34.6827179 L15.5099666,40.2712841 Z M10.119254,40.2712841 L5.30774178,40.2712841 L5.30774178,34.6827179 L10.119254,34.6827179 L10.119254,40.2712841 Z M5.30694399,44.3137203 L23.1552529,44.3137203 L23.1552529,48.5595946 L16.3077634,48.5595946 L10.9162529,48.5595946 L5.30694399,48.5595946 L5.30694399,44.3137203 Z M11.7148475,50.1551881 L15.5107644,50.1551881 L15.5107644,55.7429565 L11.7148475,55.7429565 L11.7148475,50.1551881 Z M17.1055601,50.1551881 L23.1552529,50.1551881 L23.1552529,55.7429565 L17.1055601,55.7429565 L17.1055601,50.1551881 Z M66.493168,50.1551881 L70.2882871,50.1551881 L70.2882871,55.7429565 L66.493168,55.7429565 L66.493168,50.1551881 Z M71.0860839,48.5595946 L65.6953713,48.5595946 L58.8462861,48.5595946 L58.8462861,44.3137203 L76.6961907,44.3137203 L76.6961907,48.5595946 L71.0860839,48.5595946 Z M76.6961907,42.7181268 L58.8462861,42.7181268 L58.8462861,41.8668776 L65.6953713,41.8668776 L71.0860839,41.8668776 L76.6953929,41.8668776 L76.6953929,42.7181268 L76.6961907,42.7181268 Z M70.2882871,40.2712841 L66.493168,40.2712841 L66.493168,34.6827179 L70.2882871,34.6827179 L70.2882871,40.2712841 Z M64.8975745,40.2712841 L58.8462861,40.2712841 L58.8462861,34.6827179 L64.8975745,34.6827179 L64.8975745,40.2712841 Z M40.0669484,1.95549959 C40.567167,1.45607882 41.4391588,1.45607882 41.9385796,1.95549959 L55.7284964,15.7462142 C55.7691841,15.798071 55.8138607,15.8435454 55.8657175,15.8834353 L60.4833651,20.5018807 C60.7330755,20.751591 60.8702965,21.0834745 60.8702965,21.4361007 C60.8702965,21.7895246 60.7330755,22.1214081 60.4817695,22.3719162 C59.9831465,22.8721348 59.1127503,22.871337 58.6117339,22.3719162 C58.6117339,22.3719162 58.6117339,22.3719162 58.6109361,22.3719162 L41.5668063,5.32619086 C41.411236,5.17062049 41.207,5.09243641 41.002764,5.09243641 C40.798528,5.09243641 40.5942921,5.17062049 40.4387217,5.32619086 L23.3898051,22.3719162 C23.3898051,22.3719162 23.3898051,22.3719162 23.3890073,22.372714 L23.3890073,22.372714 C22.8903844,22.871337 22.0199881,22.8729326 21.5197696,22.3719162 C21.2700592,22.1222059 21.1320403,21.7903224 21.1320403,21.4368984 C21.1320403,21.0842723 21.2692614,20.7523888 21.5197696,20.5018807 L26.1390127,15.8834353 C26.1900717,15.8435454 26.2339506,15.7996666 26.2738404,15.7486076 L40.0669484,1.95549959 Z M8.9385148,16.0621417 L23.7033393,16.0621417 L20.3924828,19.3729983 C19.8412052,19.923478 19.5372446,20.6566532 19.5372446,21.4361007 C19.5372446,22.2155481 19.8404074,22.9487233 20.391685,23.5000008 C21.1160844,24.2244003 22.1899188,24.4629415 23.1560507,24.2363672 L23.1560507,26.6297575 L2.61757114,26.6297575 L8.9385148,16.0621417 Z M1.5955935,28.3394359 L1.66340623,28.225351 L23.1552529,28.225351 L23.1552529,29.2433397 L1.5955935,29.2433397 L1.5955935,28.3394359 Z M23.1552529,30.8389332 L23.1552529,33.0863266 L16.3077634,33.0863266 L10.9162529,33.0863266 L5.30694399,33.0863266 L5.30694399,30.8389332 L23.1552529,30.8389332 L23.1552529,30.8389332 Z M5.30694399,57.33855 L10.9162529,57.33855 L16.3077634,57.33855 L23.1552529,57.33855 L23.1552529,58.4044065 L5.30694399,58.4044065 L5.30694399,57.33855 Z M30.8635651,58.4044065 L30.8635651,45.4202644 L32.4487873,45.4202644 L32.4487873,58.4044065 L30.8635651,58.4044065 L30.8635651,58.4044065 Z M49.5543474,58.4044065 L49.5543474,45.4202644 L51.1395695,45.4202644 L51.1395695,58.4044065 L49.5543474,58.4044065 L49.5543474,58.4044065 Z M58.8462861,58.4044065 L58.8462861,57.33855 L65.6953713,57.33855 L71.0860839,57.33855 L76.6953929,57.33855 L76.6953929,58.4044065 L58.8462861,58.4044065 Z M76.6961907,33.0871244 L71.0868817,33.0871244 L65.6961691,33.0871244 L58.8470839,33.0871244 L58.8470839,30.839731 L76.6969884,30.839731 L76.6969884,33.0871244 L76.6961907,33.0871244 Z M80.4067433,29.2433397 L58.8462861,29.2433397 L58.8462861,28.225351 L80.3389306,28.225351 L80.4067433,28.3394359 L80.4067433,29.2433397 L80.4067433,29.2433397 Z" id="Shape" />
                                </g>
                                </g>
                            </g>
                            </svg>

    const icons = [
        { label: "Lycée", svg: lyceeSVG },
        { label: "Supérieur", svg: superieurSVG },
    ];

    if (isInitializing) {
        return (
            <div className="flex items-center justify-center min-h-[200px]">
                <Loader2 className="w-8 h-8 animate-spin" />
            </div>
        );
    }

    const closeTutorial = () => {
        setOpenTutorial(false);
        const updatedUser = {
            ...user,
            openTutorial : false,
            date: new Date().toISOString()
        };
        
        console.log('updatedUser:', updatedUser);
        dispatch(setUser(updatedUser)); 
        helper.setLocalStorageWithExpiration('wendogouser', updatedUser);
    };

    return (
        <>
            <TutorialModal 
                isOpen={openTutorial} 
                onClose={() => closeTutorial()}/>
            <SEDualSelection 
                title="Quel est votre degré d'enseignement le plus récent ?"
                valueSelected={schoolLevelSelected}
                handleValueSelected={handleSchoolLevelSelection}
                handleContinue={handleContinue}
                icons={icons}
                showContinueBtn={showContinueBtn}
            />
        </>
    );
}

export default SchoolLevel;
