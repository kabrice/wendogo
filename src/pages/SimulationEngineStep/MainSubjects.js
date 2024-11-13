import { useState, useEffect, useCallback, useMemo } from 'react';
import { useGetLevelValuesQuery } from '../../store/apis/levelValueApi';
import { activateSpinner, deactivateSpinner } from '../../redux/spinnerslice';
import SEAutoSuggestListInput from '../../components/SimulationEngine/SEAutoSuggestListInput';
import { useDispatch, useSelector } from 'react-redux';
import { setStep } from '../../redux/simulationStepSlice';
import { setProgress } from "../../redux/progressBarStepSlice";
import { Loader2 } from "lucide-react";
import helper from '../../utils/Helper';
import { SIMULATION_ENGINE_STEPS, PROGRESS_BAR_STEPS } from '../../utils/Constants';
import { setUser } from '../../redux/userSlice';

const MainSubjects = () => {
    const [isLoading, setIsLoading] = useState(true);
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    // Redux selectors
    const simulationStepGlobal = useSelector((state) => state.simulationStep);
    const progressBarStep = useSelector((state) => state.progressBarStep);

    // Local state
    const [mainSubjects, setMainSubjects] = useState([]);
    const [urlFragment, setUrlFragment] = useState('');

    // Load user data on component mount
    useEffect(() => {
        const loadUserData = () => {
            try {
                
                if (user) {
                    
                    setMainSubjects(user?.mainSubjects || []);
                    setUrlFragment(`/subject/search/${user?.applyingForMaster}/`);
                }
            } catch (error) {
                console.error('Error loading user data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadUserData();
    }, []);

    // API query
    const { data, error, isLoading: isApiLoading } = useGetLevelValuesQuery(
        user ? {
            userid: '1',
            externalLevelValueInput: user?.degreeExactNameValue
        } : null
    );

    // Handle API loading state
    useEffect(() => {
        if (isApiLoading) {
            dispatch(activateSpinner());
        }
        if (data || error) {
            dispatch(deactivateSpinner());
        }
    }, [data, error, isApiLoading, dispatch]);

    // Memoized values
    const titleWhenNoMatch = useMemo(() => 
        `Veuillez renseigner les équivalents français correspondant au mieux à vos trois principales unités d'enseignement pour l'année scolaire ${user?.selectedSchoolYear3?.name}.`,
    [user?.selectedSchoolYear3?.name]);

    const showContinueBtn = useMemo(() => {
        if (!user) return false;

        if (!user.isResult3Available && progressBarStep === PROGRESS_BAR_STEPS.BULLETIN_N_1) {
            return simulationStepGlobal === SIMULATION_ENGINE_STEPS.MAIN_SUBJECTS_BAC_N_1 || 
                   (progressBarStep === PROGRESS_BAR_STEPS.BULLETIN_N_1);
        }
        
        if (!user.isResult2Available && progressBarStep === PROGRESS_BAR_STEPS.BULLETIN_N_2) {
            return simulationStepGlobal === SIMULATION_ENGINE_STEPS.MAIN_SUBJECTS_BAC_N_2 || 
                   (progressBarStep === PROGRESS_BAR_STEPS.BULLETIN_N_2);
        }

        return (simulationStepGlobal === SIMULATION_ENGINE_STEPS.MAIN_SUBJECTS) || 
               (progressBarStep === PROGRESS_BAR_STEPS.BULLETIN_LE_PLUS_RECENT);
    }, [simulationStepGlobal, progressBarStep, user]);

    const updateWendogouser = useCallback((simulationStep, subjects, progressBarStep = PROGRESS_BAR_STEPS.BULLETIN_LE_PLUS_RECENT) => {
        if (!user) return;

        dispatch(setStep(simulationStep));
        dispatch(setProgress(progressBarStep));
        
        const updatedUser = {
            ...user,
            simulationStep,
            mainSubjects: subjects,
            progressBarStep,
            date: new Date().toISOString()
        };
        
        helper.setLocalStorageWithExpiration('wendogouser', updatedUser);
        dispatch(setUser(updatedUser));
    }, [dispatch, user]);

    const handleChange = useCallback((newMainSubjects) => {
        setMainSubjects(newMainSubjects);

        const currentStep = !user?.isResult3Available ? {
            step: SIMULATION_ENGINE_STEPS.MAIN_SUBJECTS_BAC_N_1,
            progressBarStep: PROGRESS_BAR_STEPS.BULLETIN_N_1
        } : !user?.isResult2Available ? {
            step: SIMULATION_ENGINE_STEPS.MAIN_SUBJECTS_BAC_N_2,
            progressBarStep: PROGRESS_BAR_STEPS.BULLETIN_N_2
        } : {
            step: SIMULATION_ENGINE_STEPS.MAIN_SUBJECTS,
            progressBarStep: PROGRESS_BAR_STEPS.BULLETIN_LE_PLUS_RECENT
        };

        updateWendogouser(currentStep.step, newMainSubjects, currentStep.progressBarStep);
    }, [user, updateWendogouser]);

    const handleContinue = useCallback(() => {
        if (typeof window === 'undefined' || !user) return;

        const nextStep = (() => {
            window.location.hash = "";
            
            if (user.isResult3Available && progressBarStep === PROGRESS_BAR_STEPS.BULLETIN_LE_PLUS_RECENT) {
                window.location.hash = "form/BULLETIN_N_1";
                return {
                    step: SIMULATION_ENGINE_STEPS.IS_YEAR_2_RESULTS_AVAILABLE,
                    myProgressBarStep: PROGRESS_BAR_STEPS.BULLETIN_N_1
                };
            }
            
            if (!user.isResult3Available && progressBarStep === PROGRESS_BAR_STEPS.BULLETIN_N_1) {
                window.location.hash = "form/BULLETIN_N_2";
                return {
                    step: SIMULATION_ENGINE_STEPS.IS_YEAR_1_RESULTS_AVAILABLE,
                    myProgressBarStep: PROGRESS_BAR_STEPS.BULLETIN_N_2
                };
            }
            
            if (!user.isResult2Available && progressBarStep === PROGRESS_BAR_STEPS.BULLETIN_N_2) {
                window.location.hash = "form/PARCOURS_ACADEMIQUE_ET_PROFESSIONNEL";
                return {
                    step: SIMULATION_ENGINE_STEPS.HAS_WON_AWARD,
                    myProgressBarStep: PROGRESS_BAR_STEPS.PARCOURS_ACADEMIQUE_ET_PROFESSIONNEL
                };
            }
        })();

        if (nextStep) {
            updateWendogouser(nextStep.step, mainSubjects, nextStep.myProgressBarStep);
        }
    }, [user, progressBarStep, mainSubjects, updateWendogouser]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[100px]">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (!user || !data?.hasOwnProperty('best_match')) {
        return null;
    }

    return (
        <SEAutoSuggestListInput 
            title={titleWhenNoMatch}
            id={`MAIN_SUBJECTS${simulationStepGlobal}`}
            tip="Pour une meilleure suggestion de l'algorithme, soyez le plus précis possible. En cas de priorités égales, classez à votre convenance."
            messageError="Vous devez obligatoirement saisir 3 unités d'enseignement."
            mainValues={mainSubjects}
            setMainValues={setMainSubjects}
            urlFragment={urlFragment}
            showContinueBtn={showContinueBtn}
            handleChange={handleChange}
            handleContinue={handleContinue}
        />
    );
};

export default MainSubjects;
