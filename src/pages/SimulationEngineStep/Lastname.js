'use client';

import React, { useState, useEffect, useCallback } from 'react';
import SETextInput from "../../components/SimulationEngine/SETextInput";
import { useDispatch, useSelector } from 'react-redux';
import { setStep } from '../../redux/simulationStepSlice';
import { Loader2 } from "lucide-react";
import helper from '../../utils/Helper';
import { SIMULATION_ENGINE_STEPS } from '../../utils/Constants';
import { setUser } from '../../redux/userSlice';

const Lastname = () => {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user);
    const [lastname, setLastname] = useState((user?.lastname === 'guest'? '' : user?.lastname) || '');
    const simulationStepGlobal = useSelector((state) => state.simulationStep);

    const doesValid = (lastname) => {
        return lastname !== undefined && lastname.trim().length >= 3 && /[a-zA-Z].*[a-zA-Z]/.test(lastname);
      }
      
    const [valid, setValid] = useState(doesValid());

    const handleChange = (e) => {
        const lastname = e.target.value;
        setLastname(lastname);
        updateWendogouser(SIMULATION_ENGINE_STEPS.LASTNAME, lastname)
    };   

    const updateWendogouser = useCallback((simulationStep, lastname) => {
        dispatch(setStep(simulationStep));
        const updatedUser = {
            ...user,
            simulationStep,
            lastname,
            date: new Date().toISOString()
        };
        helper.setLocalStorageWithExpiration('wendogouser', updatedUser);
        dispatch(setUser(updatedUser));
    }, [dispatch, user]);
  
    const handleContinue = useCallback(() => { 
        updateWendogouser(SIMULATION_ENGINE_STEPS.NATIONALITY, lastname);
    }, [lastname, updateWendogouser]);

    if (!user) {
        return (
            <div className="flex items-center justify-center min-h-[100px]">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <SETextInput 
            title="Quel est votre nom ?"
            id="LASTNAME"
            autoComplete="on"
            handleChange={handleChange}
            value={lastname}
            inputLength={64}
            valid={valid}
            setValid={setValid}
            onClickOutside={doesValid}
            handleContinue={handleContinue}
            showContinueBtn={simulationStepGlobal === SIMULATION_ENGINE_STEPS.LASTNAME}
        />
    );
};

export default Lastname;
