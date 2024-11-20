'use client';

import React, { useState, useEffect, useCallback, useMemo } from "react";
import SEYesNo from "../../components/SimulationEngine/SEYesNo";
import { useDispatch, useSelector } from 'react-redux';
import { setStep } from '../../redux/simulationStepSlice';
import { Loader2 } from "lucide-react";
import helper from '../../utils/Helper';
import { SIMULATION_ENGINE_STEPS } from '../../utils/Constants';
import { setUser } from '../../redux/userSlice';

const HasWonAward = () => {
    const [isLoading, setIsLoading] = useState(true);
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const simulationStepGlobal = useSelector((state) => state.simulationStep);
    const [hasWonAward, setHasWonAward] = useState(false);

    // Load user data on component mount
    useEffect(() => {
        const loadUserData = () => {
            
            if (user) {
                
                setHasWonAward(user?.hasWonAward || false);
            }
            setIsLoading(false);
        };

        loadUserData();
    }, []);

    // Memoize formatted subject names
    const formattedString = useMemo(() => {
        if (!user?.mainSubjects) return '';

        const uniqueNames = [...new Set(user.mainSubjects.map(obj => `«${obj.name}»`))];
        
        if (uniqueNames.length > 1) {
            const lastTwoNames = uniqueNames.splice(-2);
            return [...uniqueNames, `${lastTwoNames[0]} ou ${lastTwoNames[1]}`].join(', ');
        }
        return uniqueNames[0] || '';
    }, [user?.mainSubjects]);

    // Memoize oldest school year
    const oldestSchoolYear = useMemo(() => 
        user?.selectedSchoolYear1?.name || 
        user?.selectedSchoolYear2?.name || 
        user?.selectedSchoolYear3?.name || 
        '',
    [user?.selectedSchoolYear1?.name, user?.selectedSchoolYear2?.name, user?.selectedSchoolYear3?.name]);

    const updateWendogouser = useCallback((simulationStep, hasWonAwardValue) => {
        if (!user) return;

        dispatch(setStep(simulationStep));
        const updatedUser = {
            ...user,
            simulationStep,
            hasWonAward: hasWonAwardValue,
            date: new Date().toISOString()
        };
        helper.setLocalStorageWithExpiration('wendogouser', updatedUser);
        dispatch(setUser(updatedUser));
    }, [dispatch, user]);

    const handleHasWonAward = useCallback((val) => {
        setHasWonAward(val);
        updateWendogouser(
            val ? SIMULATION_ENGINE_STEPS.AWARD_DETAILS : SIMULATION_ENGINE_STEPS.HAS_WORK_EXPERIENCE,
            val
        );
    }, [updateWendogouser]);

    const handleContinue = useCallback(() => {
        updateWendogouser(
            hasWonAward ? SIMULATION_ENGINE_STEPS.AWARD_DETAILS : SIMULATION_ENGINE_STEPS.HAS_WORK_EXPERIENCE,
            hasWonAward
        );
    }, [hasWonAward, updateWendogouser]);

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
            title={`Avez-vous obtenu une recompense en ${formattedString} depuis ${oldestSchoolYear}`}
            id="HAS_WON_AWARD"
            tip="Cela peut être un prix académique, sportif, artistique ou de toute autre nature, à condition qu'il puisse être justifié par un document officiel."
            yes={hasWonAward}
            handleYes={handleHasWonAward}
            handleContinue={handleContinue}
            svgConstantName="AWARD"
            showContinueBtn={simulationStepGlobal === SIMULATION_ENGINE_STEPS.HAS_WON_AWARD}
        />
    );
};

export default HasWonAward;
