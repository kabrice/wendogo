'use client';

import React, { useState, useEffect } from "react";
import SEYesNo from "../../components/SimulationEngine/SEYesNo";
import { useDispatch, useSelector } from 'react-redux';
import { setStep } from '../../redux/simulationStepSlice';
import helper from '../../utils/Helper';
import { SIMULATION_ENGINE_STEPS } from '../../utils/Constants';
import { Loader2 } from "lucide-react";
import { setUser } from '../../redux/userSlice';

const AlreadyTraveledToFrance = () => {
    const [isLoading, setIsLoading] = useState(true);
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const simulationStepGlobal = useSelector((state) => state.simulationStep);
    const [alreadyTraveledToFrance, setAlreadyTraveledToFrance] = useState(null);

    // Load user data on component mount
    useEffect(() => {
        const loadUserData = () => {
            
            if (user) {
                
                setAlreadyTraveledToFrance(user?.alreadyTraveledToFrance);
            }
            setIsLoading(false);
        };

        loadUserData();
    }, []);

    const updateWendogouser = (simulationStep, alreadyTraveledToFrance) => {
        if (!user) return;

        dispatch(setStep(simulationStep));
        const updatedUser = {
            ...user,
            simulationStep,
            alreadyTraveledToFrance,
            date: new Date().toISOString()
        };
        helper.setLocalStorageWithExpiration('wendogouser', updatedUser);
        dispatch(setUser(updatedUser));
    };

    const handleAlreadyTraveledToFrance = (val) => {
        setAlreadyTraveledToFrance(val);
        const nextStep = val ? 
            SIMULATION_ENGINE_STEPS.LAST_FRANCE_TRAVEL_DETAILS : 
            SIMULATION_ENGINE_STEPS.HAS_PASSEPORT;
        updateWendogouser(nextStep, val);
    };

    const handleContinue = () => {
        const nextStep = alreadyTraveledToFrance ? 
            SIMULATION_ENGINE_STEPS.LAST_FRANCE_TRAVEL_DETAILS : 
            SIMULATION_ENGINE_STEPS.HAS_PASSEPORT;
        updateWendogouser(nextStep, alreadyTraveledToFrance);
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
            title="Vous êtes-vous déjà rendu en France ou dans l'espace Schengen ?"
            id="ALREADY_TRAVELED_TO_FRANCE"
            yes={alreadyTraveledToFrance}
            handleYes={handleAlreadyTraveledToFrance}
            handleContinue={handleContinue}
            showContinueBtn={simulationStepGlobal === SIMULATION_ENGINE_STEPS.ALREADY_TRAVELED_TO_FRANCE}
        />
    );
};

export default AlreadyTraveledToFrance;
