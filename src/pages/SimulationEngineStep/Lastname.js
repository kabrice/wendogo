import React, { useState, useEffect, useCallback } from 'react';
import SETextInput from "../../components/SimulationEngine/SETextInput";
import { useDispatch, useSelector } from 'react-redux';
import { setStep } from '../../redux/simulationStepSlice';
import { Loader2 } from "lucide-react";
import helper from '../../utils/Helper';
import { SIMULATION_ENGINE_STEPS } from '../../utils/Constants';
import { setUser } from '../../redux/userSlice';

const Lastname = () => {
    const [isLoading, setIsLoading] = useState(true);
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const simulationStepGlobal = useSelector((state) => state.simulationStep);
    
    // Local state
    const [lastname, setLastname] = useState('');
    const [valid, setValid] = useState(false);

    // Load user data on component mount
    useEffect(() => {
        const loadUserData = () => {
            try {
                
                if (user) {
                    
                    const initialLastname = user?.lastname === 'guest' ? '' : user?.lastname || '';
                    setLastname(initialLastname);
                    setValid(doesValid(initialLastname));
                }
            } catch (error) {
                console.error('Error loading user data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadUserData();
    }, []);

    const doesValid = useCallback((value) => {
        return value !== undefined && 
               value.trim().length >= 3 && 
               /[a-zA-Z].*[a-zA-Z]/.test(value);
    }, []);

    const updateWendogouser = useCallback((simulationStep, lastnameValue) => {
        if (!user) return;

        dispatch(setStep(simulationStep));
        const updatedUser = {
            ...user,
            simulationStep,
            lastname: lastnameValue,
            date: new Date().toISOString()
        };
        helper.setLocalStorageWithExpiration('wendogouser', updatedUser);
        dispatch(setUser(updatedUser));
    }, [dispatch, user]);

    const handleChange = useCallback((e) => {
        const newLastname = e.target.value;
        setLastname(newLastname);
        updateWendogouser(SIMULATION_ENGINE_STEPS.LASTNAME, newLastname);
    }, [updateWendogouser]);

    const handleContinue = useCallback(() => {
        updateWendogouser(SIMULATION_ENGINE_STEPS.NATIONALITY, lastname);
    }, [lastname, updateWendogouser]);

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
        <SETextInput 
            title="Quel est votre nom ?"
            id="LASTNAME"
            autoComplete="on"
            handleChange={handleChange}
            value={lastname}
            inputLength={64}
            valid={valid}
            setValid={setValid}
            onClickOutside={() => setValid(doesValid(lastname))}
            handleContinue={handleContinue}
            showContinueBtn={simulationStepGlobal === SIMULATION_ENGINE_STEPS.LASTNAME}
        />
    );
};

export default Lastname;
