import React, { useState, useEffect } from 'react';
import SETextInput from "../../components/SimulationEngine/SETextInput";
import { useDispatch, useSelector } from 'react-redux';
import { setStep } from '../../redux/simulationStepSlice';
import helper from '../../utils/Helper';
import { SIMULATION_ENGINE_STEPS } from '../../utils/Constants';
import { Loader2 } from "lucide-react";
import { setUser } from '../../redux/userSlice';

const Email = () => {
    const [isLoading, setIsLoading] = useState(true);
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const simulationStepGlobal = useSelector((state) => state.simulationStep);
    
    // Local state
    const [email, setEmail] = useState('');
    const [valid, setValid] = useState(true); // Initially true for empty state

    // Load user data on component mount
    useEffect(() => {
        const loadUserData = () => {
            
            if (user) {
                
                const initialEmail = user?.email || '';
                setEmail(initialEmail);
                setValid(doesValid(initialEmail));
            }
            setIsLoading(false);
        };

        loadUserData();
    }, []);

    const doesValid = (emailValue) => {
        if (!emailValue || emailValue.trim() === '') {
            return true;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(emailValue.trim());
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

    const handleChange = (e) => {
        const newEmail = e.target.value;
        setEmail(newEmail);
        const isValid = doesValid(newEmail);
        setValid(isValid);
        
        if (isValid) {
            updateWendogouser(SIMULATION_ENGINE_STEPS.EMAIL, newEmail);
        }
    };

    const handleContinue = () => {
        if (doesValid(email)) {
            updateWendogouser(SIMULATION_ENGINE_STEPS.WHATSAPP_NUMBER, email);
        }
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
            onClickOutside={() => setValid(doesValid(email))}
            handleContinue={handleContinue}
            showContinueBtn={simulationStepGlobal === SIMULATION_ENGINE_STEPS.EMAIL}
        />
    );
};

export default Email;
