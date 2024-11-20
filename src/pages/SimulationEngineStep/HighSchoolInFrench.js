'use client';

import React, { useState, useEffect, useCallback } from "react";
import SEYesNo from "../../components/SimulationEngine/SEYesNo";
import { useDispatch, useSelector } from 'react-redux';
import { setStep } from '../../redux/simulationStepSlice';
import { Loader2 } from "lucide-react";
import helper from '../../utils/Helper';
import { SIMULATION_ENGINE_STEPS } from '../../utils/Constants';
import { setUser } from '../../redux/userSlice';

const HighSchoolInFrench = () => {
    const [isLoading, setIsLoading] = useState(true);
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const simulationStepGlobal = useSelector((state) => state.simulationStep);
    const [isHighSchoolInFrench, setIsHighSchoolInFrench] = useState(false);

    // Load user data on component mount
    useEffect(() => {
        const loadUserData = () => {
            
            if (user) {
                
                setIsHighSchoolInFrench(user?.isFrancophone || false);
            }
            setIsLoading(false);
        };

        loadUserData();
    }, []);

    const updateWendogouser = useCallback((simulationStep, isFrancophone) => {
        if (!user) return;

        dispatch(setStep(simulationStep));
        const updatedUser = {
            ...user,
            simulationStep,
            isFrancophone,
            date: new Date().toISOString()
        };
        helper.setLocalStorageWithExpiration('wendogouser', updatedUser);
        dispatch(setUser(updatedUser));
    }, [dispatch, user]);

    const handleIsHighSchoolInFrench = useCallback((val) => {
        setIsHighSchoolInFrench(val);
        updateWendogouser(SIMULATION_ENGINE_STEPS.HIGH_SCHOOL_IN_FRENCH, val);
    }, [updateWendogouser]);

    const handleContinue = useCallback(() => {
        updateWendogouser(SIMULATION_ENGINE_STEPS.FRENCH_TEST, isHighSchoolInFrench);
    }, [isHighSchoolInFrench, updateWendogouser]);

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
            title="Est-ce que vous avez effectué la totalité de vos études secondaires en langue française ?"
            id="HIGH_SCHOOL_IN_FRENCH"
            yes={isHighSchoolInFrench}
            handleYes={handleIsHighSchoolInFrench}
            handleContinue={handleContinue}
            showContinueBtn={simulationStepGlobal === SIMULATION_ENGINE_STEPS.HIGH_SCHOOL_IN_FRENCH}
        />
    );
};

export default HighSchoolInFrench;
