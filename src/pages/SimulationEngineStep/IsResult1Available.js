'use client';

import React, { useState, useEffect, useCallback, useMemo } from "react";
import SEYesNo from "../../components/SimulationEngine/SEYesNo";
import SESmallAlertMessage from "../../components/SimulationEngine/SESmallAlertMessage";
import { useDispatch, useSelector } from 'react-redux';
import { setStep } from '../../redux/simulationStepSlice';
import { setProgress } from "../../redux/progressBarStepSlice";
import { Loader2 } from "lucide-react";
import helper from '../../utils/Helper';
import { SIMULATION_ENGINE_STEPS, PROGRESS_BAR_STEPS } from '../../utils/Constants';
import { setUser } from '../../redux/userSlice';

const IsResult1Available = () => {
    const [isLoading, setIsLoading] = useState(true);
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    // Redux selectors
    const simulationStepGlobal = useSelector((state) => state.simulationStep);
    const isInUniversityGlobal = useSelector((state) => state.university.active);
    const progressBarStep = useSelector((state) => state.progressBarStep);

    // Local state
    const [isAtLeastOneReportFilled, setIsAtLeastOneReportFilled] = useState(true);
    const [isResult1Available, setIsResult1Available] = useState(true);

    // Load user data on component mount
    useEffect(() => {
        const loadUserData = () => {
            
            if (user) {
                
                setIsResult1Available('reportCard1' in user ? user?.isResult1Available : true);
            }
            setIsLoading(false);
        };

        loadUserData();
    }, []);

    // Memoized values
    const mostRecentBacId = useMemo(() => 
        user ? helper.getMostRecentBacId(user) : '',
    [user]);

    const bac_year = useMemo(() => 
        mostRecentBacId ? parseInt(mostRecentBacId.slice(-1)) : 0,
    [mostRecentBacId]);

    const isUpToBac1 = useMemo(() => 
        bac_year > 6,
    [bac_year]);

    const additionalText = useMemo(() => 
        isUpToBac1 ? 'et votre Baccalauréat' : '',
    [isUpToBac1]);

    const showContinueBtn = useMemo(() => 
        (simulationStepGlobal === SIMULATION_ENGINE_STEPS.IS_YEAR_1_RESULTS_AVAILABLE) || 
        (!user?.isResult1Available && (progressBarStep === PROGRESS_BAR_STEPS.BULLETIN_N_2)),
    [simulationStepGlobal, user?.isResult1Available, progressBarStep]);

    const updateWendogouser = useCallback((simulationStep, isResult1Available) => {
        if (!user) return;

        const myIsAtLeastOneReportFilled = user.isResult3Available || user.isResult2Available || isResult1Available;
        setIsAtLeastOneReportFilled(myIsAtLeastOneReportFilled);

        if (!myIsAtLeastOneReportFilled) {
            return;
        }

        dispatch(setStep(simulationStep));
        
        const updatedUser = {
            ...user,
            simulationStep,
            isResult1Available,
            ...((!isResult1Available) && {
                progressBarStep: PROGRESS_BAR_STEPS.PARCOURS_ACADEMIQUE_ET_PROFESSIONNEL
            }),
            date: new Date().toISOString()
        };

        if (!isResult1Available) {
            dispatch(setProgress(PROGRESS_BAR_STEPS.PARCOURS_ACADEMIQUE_ET_PROFESSIONNEL));
        }

        helper.setLocalStorageWithExpiration('wendogouser', updatedUser);
        dispatch(setUser(updatedUser));
    }, [dispatch, user]);
 

    const handleIsResult1Available = useCallback((val) => {
        console.log('handleIsResult1Available', val);
        setIsResult1Available(val);
        dispatch(setStep(SIMULATION_ENGINE_STEPS.IS_YEAR_1_RESULTS_AVAILABLE));
        const updatedUser = {
            ...user,
            simulationStep: SIMULATION_ENGINE_STEPS.IS_YEAR_1_RESULTS_AVAILABLE,
            isResult1Available: val,
        };
        dispatch(setUser(updatedUser));
        helper.setLocalStorageWithExpiration('wendogouser', updatedUser);
    }, [dispatch, user]);

    const handleContinue = useCallback(() => {
        updateWendogouser(
            isResult1Available 
                ? SIMULATION_ENGINE_STEPS.SCHOOL_YEAR1 
                : SIMULATION_ENGINE_STEPS.HAS_WON_AWARD,
            isResult1Available
        );

        if (user?.isResult3Available || user?.isResult2Available || isResult1Available) {
            if (typeof window !== 'undefined') {
                window.location.hash = "";
                window.location.hash = "form/PARCOURS_ACADEMIQUE_ET_PROFESSIONNEL";
            }
        }
    }, [isResult1Available, updateWendogouser, user]);

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
        <>
            <SEYesNo 
                title={`Vos relevés académiques ${helper.updateBAC(isInUniversityGlobal, user, 2)} ${additionalText} sont-ils disponibles ?`}
                svgConstantName="YEAR_N_2"
                tip="Considérer uniquement les bulletins des années validées."
                yes={isResult1Available}
                handleYes={handleIsResult1Available}
                handleContinue={handleContinue}
                showContinueBtn={showContinueBtn}
                id="IS_YEAR_1_RESULTS_AVAILABLE"
            />
            {!isAtLeastOneReportFilled && (
                <SESmallAlertMessage 
                    type="error" 
                    content="Vous devez remplir au moins un bulletin pour continuer"
                />
            )}
        </>
    );
};

export default IsResult1Available;
