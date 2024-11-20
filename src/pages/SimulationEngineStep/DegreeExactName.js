'use client';

import React, { useState, useEffect } from 'react';
import SETextInput from "../../components/SimulationEngine/SETextInput";
import { useDispatch, useSelector } from 'react-redux';
import { setStep } from '../../redux/simulationStepSlice';
import helper from '../../utils/Helper';
import { SIMULATION_ENGINE_STEPS } from '../../utils/Constants';
import { Loader2 } from "lucide-react";
import { setUser } from '../../redux/userSlice';

const DegreeExactName = () => {
    const [isLoading, setIsLoading] = useState(true);
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const simulationStepGlobal = useSelector((state) => state.simulationStep);
    
    // Local state
    const [degreeExactNameValue, setDegreeExactNameValue] = useState('');
    const [valid, setValid] = useState(false);

    // Load user data on component mount
    useEffect(() => {
        const loadUserData = () => {
            
            if (user) {
                
                const initialValue = user?.degreeExactNameValue || '';
                setDegreeExactNameValue(initialValue);
                setValid(doesValueValid(initialValue));
            }
            setIsLoading(false);
        };

        loadUserData();
    }, []);

    const doesValueValid = (value) => {
        return value !== undefined && 
               value.trim().length >= 3 && 
               /[a-zA-Z].*[a-zA-Z]/.test(value);
    };

    const updateWendogouser = (simulationStep, degreeExactNameValue) => {
        if (!user) return;

        dispatch(setStep(simulationStep));
        const updatedUser = {
            ...user,
            simulationStep,
            degreeExactNameValue,
            // Clear programDomainObj if degree name changed
            ...(user.degreeExactNameValue !== degreeExactNameValue && { programDomainObj: null }),
            date: new Date().toISOString()
        };
        
        helper.setLocalStorageWithExpiration('wendogouser', updatedUser);
        dispatch(setUser(updatedUser));
    };

    const handleChange = (e) => {
        const inputValue = e.target.value;
        setDegreeExactNameValue(inputValue);
        updateWendogouser(SIMULATION_ENGINE_STEPS.DEGREE_EXACT_NAME, inputValue);
    };

    const handleContinue = () => {
        updateWendogouser(
            SIMULATION_ENGINE_STEPS.CLASS_REPETITION,
            degreeExactNameValue
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
        <SETextInput 
            title="Intitulé exact du diplôme ou du programme suivi"
            tip="Veuillez vous assurer de bien écrire l'intitulé de ce diplôme, car l'algorithme l'utilisera pour vous proposer les écoles les plus adaptées à votre profil."
            handleChange={handleChange}
            value={degreeExactNameValue}
            inputLength={255}
            autoComplete="off"
            valid={valid}
            setValid={setValid}
            onClickOutside={doesValueValid}
            handleContinue={handleContinue}
            showContinueBtn={simulationStepGlobal === SIMULATION_ENGINE_STEPS.DEGREE_EXACT_NAME}
        />
    );
};

export default DegreeExactName;
