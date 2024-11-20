'use client';

import React, { useState, useEffect } from "react";
import SEYesNo from "../../components/SimulationEngine/SEYesNo";
import { useDispatch, useSelector } from 'react-redux';
import { setStep } from '../../redux/simulationStepSlice';
import helper from '../../utils/Helper';
import { SIMULATION_ENGINE_STEPS } from '../../utils/Constants';
import { Loader2 } from "lucide-react";
import { setUser } from '../../redux/userSlice';

const CanJustifyEnglishLevel = () => {
    const [isLoading, setIsLoading] = useState(true);
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const simulationStepGlobal = useSelector((state) => state.simulationStep);
    const [canJustifyEnglishLevel, setCanJustifyEnglishLevel] = useState(null);

    // Load user data on component mount
    useEffect(() => {
        const loadUserData = () => {
            
            if (user) {
                
                setCanJustifyEnglishLevel(user?.canJustifyEnglishLevel);
            }
            setIsLoading(false);
        };

        loadUserData();
    }, []);

    const updateWendogouser = (simulationStep, canJustifyEnglishLevel) => {
        if (!user) return;

        dispatch(setStep(simulationStep));
        const updatedUser = {
            ...user,
            simulationStep,
            canJustifyEnglishLevel,
            date: new Date().toISOString()
        };
        helper.setLocalStorageWithExpiration('wendogouser', updatedUser);
        dispatch(setUser(updatedUser));
    };

    const handleCanJustifyEnglishLevel = (val) => {
        setCanJustifyEnglishLevel(val);
        updateWendogouser(SIMULATION_ENGINE_STEPS.OTHER_SPOKEN_LANGUAGE, val);
    };

    const handleContinue = () => {
        updateWendogouser(
            SIMULATION_ENGINE_STEPS.OTHER_SPOKEN_LANGUAGE,
            canJustifyEnglishLevel
        );
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
        <SEYesNo 
            title="Pouvez-vous présenter un document officiel (diplôme, attestation, etc.) justifiant ce niveau d'anglais ?"
            yes={canJustifyEnglishLevel}
            handleYes={handleCanJustifyEnglishLevel}
            handleContinue={handleContinue}
            id="CAN_JUSTIFY_ENGLISH_LEVEL"
            showContinueBtn={simulationStepGlobal === SIMULATION_ENGINE_STEPS.CAN_JUSTIFY_ENGLISH_LEVEL}
        />
    );
};

export default CanJustifyEnglishLevel;
