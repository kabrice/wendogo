'use client';

import React, { useState, useEffect, useCallback, useMemo } from "react";
import SEYesNo from "../../components/SimulationEngine/SEYesNo";
import { useDispatch, useSelector } from 'react-redux';
import { setStep } from '../../redux/simulationStepSlice';
import { Loader2 } from "lucide-react";
import helper from '../../utils/Helper';
import { SIMULATION_ENGINE_STEPS } from '../../utils/Constants';
import { setUser } from '../../redux/userSlice';

const HasWorkExperience = () => {
    const [isLoading, setIsLoading] = useState(true);
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const simulationStepGlobal = useSelector((state) => state.simulationStep);
    const [hasWorkExperience, setHasWorkExperience] = useState(false);

    // Load user data on component mount
    useEffect(() => {
        const loadUserData = () => {
            
            if (user) {
                
                setHasWorkExperience(user?.hasWorkExperience || false);
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

    // Memoize oldest school year with the -2 calculation
    const oldestSchoolYear = useMemo(() => {
        const year = user?.selectedSchoolYear1?.name || 
                    user?.selectedSchoolYear2?.name || 
                    user?.selectedSchoolYear3?.name;
        return year ? year - 2 : '';
    }, [
        user?.selectedSchoolYear1?.name,
        user?.selectedSchoolYear2?.name,
        user?.selectedSchoolYear3?.name
    ]);

    const updateWendogouser = useCallback((simulationStep, hasWorkExperienceValue) => {
        if (!user) return;

        dispatch(setStep(simulationStep));
        const updatedUser = {
            ...user,
            simulationStep,
            hasWorkExperience: hasWorkExperienceValue,
            date: new Date().toISOString()
        };
        helper.setLocalStorageWithExpiration('wendogouser', updatedUser);
        dispatch(setUser(updatedUser));
    }, [dispatch, user]);

    const handleHasWorkExperience = useCallback((val) => {
        setHasWorkExperience(val);
        updateWendogouser(
            val ? SIMULATION_ENGINE_STEPS.WORK_EXPERIENCE_DETAILS : SIMULATION_ENGINE_STEPS.ENGLISH_LEVEL,
            val
        );
    }, [updateWendogouser]);

    const handleContinue = useCallback(() => {
        updateWendogouser(
            hasWorkExperience 
                ? SIMULATION_ENGINE_STEPS.WORK_EXPERIENCE_DETAILS 
                : SIMULATION_ENGINE_STEPS.ENGLISH_LEVEL,
            hasWorkExperience
        );
    }, [hasWorkExperience, updateWendogouser]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[100px]">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (!user || !formattedString || !oldestSchoolYear) {
        return (
            <div className="flex items-center justify-center min-h-[100px] text-red-500">
                Error loading user data
            </div>
        );
    }

    return (
        <SEYesNo 
            title={`Avez-vous une expérience professionnelle ou extrascolaire en ${formattedString} depuis ${oldestSchoolYear}`}
            id="HAS_WORK_EXPERIENCE"
            svgConstantName="WORK_EXPERIENCE"
            yes={hasWorkExperience}
            handleYes={handleHasWorkExperience}
            handleContinue={handleContinue}
            showContinueBtn={simulationStepGlobal === SIMULATION_ENGINE_STEPS.HAS_WORK_EXPERIENCE}
        />
    );
};

export default HasWorkExperience;
