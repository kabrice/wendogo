'use client';

import React, { useState, useEffect, useCallback, useMemo } from "react";
import SELevelRail from "../../components/SimulationEngine/SELevelRail";
import { useDispatch, useSelector } from 'react-redux';
import { setStep } from '../../redux/simulationStepSlice';
import { Loader2 } from "lucide-react";
import helper from '../../utils/Helper';
import { SIMULATION_ENGINE_STEPS } from '../../utils/Constants';
import { setUser } from '../../redux/userSlice';

const OTHER_LANGUAGE_LEVELS = [
    { value: 0, label: 'A1' },
    { value: 20, label: 'A2' },
    { value: 40, label: 'B1' },
    { value: 60, label: 'B2' },
    { value: 80, label: 'C1' },
    { value: 100, label: 'C2' }
];

const LEVEL_DESCRIPTIONS = [
    'Débutant',
    'Élémentaire',
    'Intermédiaire',
    'Intermédiaire avancé',
    'Avancé',
    'Maîtrise'
];

const OtherLanguageLevel = () => {
    const [isLoading, setIsLoading] = useState(true);
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const simulationStepGlobal = useSelector((state) => state.simulationStep);
    const [selectedOtherLanguageLevel, setSelectedOtherLanguageLevel] = useState(20);

    // Load user data on component mount
    useEffect(() => {
        const loadUserData = () => {
            try {
                
                if (user) {
                    
                    setSelectedOtherLanguageLevel(user?.selectedOtherLanguageLevel || 20);
                }
            } catch (error) {
                console.error('Error loading user data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadUserData();
    }, []);

    const valueLabelFormat = (value) => {
        return LEVEL_DESCRIPTIONS[value / 20];
    };

    const updateWendogouser = (simulationStep, level) => {
        if (!user) return;

        dispatch(setStep(simulationStep));
        const updatedUser = {
            ...user,
            simulationStep,
            selectedOtherLanguageLevel: level,
            date: new Date().toISOString()
        };
        helper.setLocalStorageWithExpiration('wendogouser', updatedUser);
        dispatch(setUser(updatedUser));
    };

    const handleChange = (event, value) => {
        setSelectedOtherLanguageLevel(value);
        updateWendogouser(SIMULATION_ENGINE_STEPS.OTHER_LANGUAGE_LEVEL);
    } 

    const valuetext = useCallback((value) => `${value} - C2`, []);

    const handleContinue = () => {
        const nextStep = selectedOtherLanguageLevel >= 40
            ? SIMULATION_ENGINE_STEPS.CAN_JUSTIFY_OTHER_LANGUAGE
            : SIMULATION_ENGINE_STEPS.ALREADY_TRAVELED_TO_FRANCE;

        updateWendogouser(nextStep, selectedOtherLanguageLevel);
    } 

    // Memoized title
    const title = useMemo(() => 
        user?.selectedOtherSpokenLanguage?.name
            ? `Comment évaluer votre niveau en ${user.selectedOtherSpokenLanguage.name} ?`
            : '',
    [user?.selectedOtherSpokenLanguage?.name]);

    if (isLoading || !user) {
        return (
            <div className="flex items-center justify-center min-h-[100px]">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }
 

    return (
        <SELevelRail 
            id="OTHER_LANGUAGE_LEVEL"
            title={title}
            arialLabel="Other Language Level"
            defaultValue={selectedOtherLanguageLevel}
            handleChange={handleChange}
            marks={OTHER_LANGUAGE_LEVELS}
            step={20}
            valuetext={valuetext}
            valueLabelFormat={valueLabelFormat}
            handleContinue={handleContinue}
            showContinueBtn={simulationStepGlobal === SIMULATION_ENGINE_STEPS.OTHER_LANGUAGE_LEVEL}
        />
    );
};

export default OtherLanguageLevel;
