import React, { useState, useEffect, useCallback, useMemo } from "react";
import SEYesNo from "../../components/SimulationEngine/SEYesNo";
import { useDispatch, useSelector } from 'react-redux';
import { setStep } from '../../redux/simulationStepSlice';
import { setProgress } from "../../redux/progressBarStepSlice";
import { Loader2 } from "lucide-react";
import helper from '../../utils/Helper';
import { SIMULATION_ENGINE_STEPS, PROGRESS_BAR_STEPS } from '../../utils/Constants';
import { setUser } from '../../redux/userSlice';

const IsResult2Available = () => {
    const [isLoading, setIsLoading] = useState(true);
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    // Redux selectors
    const simulationStepGlobal = useSelector((state) => state.simulationStep);
    const isInUniversityGlobal = useSelector((state) => state.university.active);
    const isInPremiereClassGlobal = useSelector((state) => state.premiereClass.active);
    const progressBarStep = useSelector((state) => state.progressBarStep);

    // Local state
    const [isResult2Available, setIsResult2Available] = useState(true);

    // Load user data on component mount
    useEffect(() => {
        const loadUserData = () => {
            
            if (user) {
                
                setIsResult2Available('reportCard2' in user ? user?.isResult2Available : true);
            }
            setIsLoading(false);
        };

        loadUserData();
    }, []);

    // Memoized values
    const showContinueBtn = useMemo(() => 
        (simulationStepGlobal === SIMULATION_ENGINE_STEPS.IS_YEAR_2_RESULTS_AVAILABLE) || 
        (!user?.isResult2Available && (progressBarStep === PROGRESS_BAR_STEPS.BULLETIN_N_1)),
    [simulationStepGlobal, user?.isResult2Available, progressBarStep]);

    const updateWendogouser = useCallback((simulationStep, isResult2Available) => {
        if (!user) return;

        dispatch(setStep(simulationStep));

        const nextProgressBarStep = isInPremiereClassGlobal
            ? PROGRESS_BAR_STEPS.PARCOURS_ACADEMIQUE_ET_PROFESSIONNEL
            : PROGRESS_BAR_STEPS.BULLETIN_N_2;

        const updatedUser = {
            ...user,
            simulationStep,
            isResult2Available,
            selectedSchoolYear1: null,
            ...((!isResult2Available) && {
                progressBarStep: nextProgressBarStep,
                selectedSchoolYear2: null
            }),
            date: new Date().toISOString()
        };

        if (!isResult2Available) {
            dispatch(setProgress(nextProgressBarStep));
        }

        helper.setLocalStorageWithExpiration('wendogouser', updatedUser);
        dispatch(setUser(updatedUser));
    }, [dispatch, user, isInPremiereClassGlobal]);

    const handleIsResult2Available = useCallback((val) => {
        setIsResult2Available(val);
        updateWendogouser(
            val 
                ? SIMULATION_ENGINE_STEPS.SCHOOL_YEAR2 
                : SIMULATION_ENGINE_STEPS.IS_YEAR_1_RESULTS_AVAILABLE,
            val
        );
    }, [updateWendogouser]);

    const handleContinue = useCallback(() => {
        const nextSimulationStep = isInPremiereClassGlobal
            ? SIMULATION_ENGINE_STEPS.HAS_WON_AWARD
            : SIMULATION_ENGINE_STEPS.IS_YEAR_1_RESULTS_AVAILABLE;

        updateWendogouser(
            isResult2Available 
                ? SIMULATION_ENGINE_STEPS.SCHOOL_YEAR2 
                : nextSimulationStep,
            isResult2Available
        );

        if (typeof window !== 'undefined') {
            window.location.hash = "";
            window.location.hash = isInPremiereClassGlobal 
                ? "form/PARCOURS_ACADEMIQUE_ET_PROFESSIONNEL"
                : "form/BULLETIN_N_2";
        }
    }, [isResult2Available, isInPremiereClassGlobal, updateWendogouser]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[100px]">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (!user) {
        return (
            <div className="flex items-center justify-center min-h-[100px] text-red-500">
                Error loading user data
            </div>
        );
    }

    return (
        <SEYesNo 
            title={`Vos relevés académiques ${helper.updateBAC(isInUniversityGlobal, user, 1)} sont-ils disponibles ?`}
            tip="Considérer uniquement les bulletins des années validées."
            yes={isResult2Available}
            handleYes={handleIsResult2Available}
            handleContinue={handleContinue}
            showContinueBtn={showContinueBtn}
            id="IS_YEAR_3_RESULTS_AVAILABLE"
        />
    );
};

export default IsResult2Available;
