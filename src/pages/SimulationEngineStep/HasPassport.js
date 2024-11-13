import React, { useState, useEffect, useCallback } from "react";
import SEYesNo from "../../components/SimulationEngine/SEYesNo";
import { useDispatch, useSelector } from 'react-redux';
import { setStep } from '../../redux/simulationStepSlice';
import { setProgress } from "../../redux/progressBarStepSlice";
import { Loader2 } from "lucide-react";
import helper from '../../utils/Helper';
import { SIMULATION_ENGINE_STEPS, PROGRESS_BAR_STEPS } from '../../utils/Constants';
import { setUser } from '../../redux/userSlice';

const HasPassport = () => {
    const [isLoading, setIsLoading] = useState(true);
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    // Redux selectors
    const simulationStepGlobal = useSelector((state) => state.simulationStep);
    const progressBarStep = useSelector((state) => state.progressBarStep);

    // Local state
    const [hasPassport, setHasPassport] = useState(false);

    // Load user data on component mount
    useEffect(() => {
        const loadUserData = () => {
            
            if (user) {
                
                setHasPassport(user?.hasPassport || false);
            }
            setIsLoading(false);
        };

        loadUserData();
    }, []);

    const showContinueBtn = (
        simulationStepGlobal === SIMULATION_ENGINE_STEPS.HAS_PASSEPORT ||
        (!user?.hasPassport && progressBarStep === PROGRESS_BAR_STEPS.INFORMATIONS_VOYAGE)
    );

    const updateWendogouser = useCallback((simulationStep, hasPassportValue) => {
        if (!user) return;

        dispatch(setStep(simulationStep));
        
        const updatedUser = {
            ...user,
            simulationStep,
            hasPassport: hasPassportValue,
            ...((!hasPassportValue) && {
                progressBarStep: PROGRESS_BAR_STEPS.COORDONNEES
            }),
            date: new Date().toISOString()
        };

        if (!hasPassportValue) {
            dispatch(setProgress(PROGRESS_BAR_STEPS.COORDONNEES));
        }

        helper.setLocalStorageWithExpiration('wendogouser', updatedUser);
        dispatch(setUser(updatedUser));
    }, [dispatch, user]);

    const handleHasPassport = useCallback((val) => {
        setHasPassport(val);
        updateWendogouser(
            val ? SIMULATION_ENGINE_STEPS.PASSEPORT_DETAILS : SIMULATION_ENGINE_STEPS.SALUTATION,
            val
        );
    }, [updateWendogouser]);

    const handleContinue = useCallback(() => {
        updateWendogouser(
            hasPassport ? SIMULATION_ENGINE_STEPS.PASSEPORT_DETAILS : SIMULATION_ENGINE_STEPS.SALUTATION,
            hasPassport
        );

        if (typeof window !== 'undefined') {
            window.location.hash = "";
            window.location.hash = "form/COORDONNEES";
        }
    }, [hasPassport, updateWendogouser]);

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
            title="Possédez-vous déjà un passeport valide ?"
            yes={hasPassport}
            handleYes={handleHasPassport}
            handleContinue={handleContinue}
            showContinueBtn={showContinueBtn}
            id="HAS_PASSEPORT"
        />
    );
};

export default HasPassport;
