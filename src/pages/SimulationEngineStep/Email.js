'use client';

import React, { useState, useEffect } from 'react';
import SETextInput from "../../components/SimulationEngine/SETextInput";
import { useDispatch, useSelector } from 'react-redux';
import { setStep } from '../../redux/simulationStepSlice';
import helper from '../../utils/Helper';
import { SIMULATION_ENGINE_STEPS } from '../../utils/Constants';
import { Loader2 } from "lucide-react";
import { setUser } from '../../redux/userSlice';

const Email = () => { 
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch(); 
    const [email, setEmail] = useState(user?.email || '');
    const simulationStepGlobal = useSelector((state) => state.simulationStep);

    // Improved email validation function
    const doesValid = (email) => {
        console.log('email', email);
        if (!email || (email?.trim() === '')) {
            // Set valid to true if the email is empty
            return true;
        }
        // Regex for email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email?.trim());
    };

    const [valid, setValid] = useState(doesValid());

    // Update validity when email changes
    // useEffect(() => {
    //     setValid(doesValid());
    // }, [email]);

    const handleChange = (e) => {
        const email = e.target.value;
        setValid(doesValid());
        setEmail(email);
        if (doesValid()) {
            updateWendogouser(SIMULATION_ENGINE_STEPS.EMAIL, email);
        }
    };

    const handleContinue = () => {
        if (doesValid()) {
            updateWendogouser(SIMULATION_ENGINE_STEPS.WHATSAPP_NUMBER, email);
        }
    }; 

    const updateWendogouser = (simulationStep, emailValue) => {
        if (!user) return;

        dispatch(setStep(simulationStep));
        const updatedUser = {
            ...user,
            simulationStep,
            email: emailValue,
            date: new Date().toISOString()
        };
        helper.setLocalStorageWithExpiration('wendogouser', updatedUser);
        dispatch(setUser(updatedUser));
    };


    if (!user) {
        return <div className="flex items-center justify-center min-h-[200px]">
                      <Loader2 className="w-8 h-8 animate-spin" />
                </div>; 
    }

    return (
        <SETextInput
            title="Quelle est votre adresse email ?"
            id="EMAIL"
            tip="Votre adresse électronique nous permettra de vous envoyer le récapitulatif de votre comparaison par email."
            type="email"
            handleChange={handleChange}
            value={email}
            inputLength={255}
            valid={valid}
            autoComplete="off"
            setValid={setValid}
            onClickOutside={doesValid}
            handleContinue={handleContinue}
            showContinueBtn={simulationStepGlobal === SIMULATION_ENGINE_STEPS.EMAIL}
        />
    );
};

export default Email;
