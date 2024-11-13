import React, { useState, useEffect } from 'react';
import SETextInput from "../../components/SimulationEngine/SETextInput";
import { useDispatch, useSelector } from 'react-redux';
import { setStep } from '../../redux/simulationStepSlice';
import helper from '../../utils/Helper';
import { SIMULATION_ENGINE_STEPS } from '../../utils/Constants';
import { Loader2 } from "lucide-react"; // Using lucide-react for loading spinner
import { setUser } from '../../redux/userSlice';

const Firstname = () => {
    const [isLoading, setIsLoading] = useState(true);
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const simulationStepGlobal = useSelector((state) => state.simulationStep);
    const [firstname, setFirstname] = useState('');
    const [valid, setValid] = useState(false);

    useEffect(() => {
        const loadUserData = () => {
            
            if (user) {
                
                const initialFirstname = user?.firstname || '';
                setFirstname(initialFirstname);
                setValid(doesValid(initialFirstname));
            }
            setIsLoading(false);
        };

        loadUserData();
    }, []);

    const doesValid = (value) => {
        return value !== undefined && 
               value.trim().length >= 3 && 
               /[a-zA-Z].*[a-zA-Z]/.test(value);
    };

    const updateWendogouser = (simulationStep, firstname) => {
        if (!user) return;

        dispatch(setStep(simulationStep));
        const updatedUser = {
            ...user,
            simulationStep,
            firstname,
            date: new Date().toISOString()
        };
        helper.setLocalStorageWithExpiration('wendogouser', updatedUser);
        dispatch(setUser(updatedUser));
    };

    const handleChange = (e) => {
        const newFirstname = e.target.value;
        setFirstname(newFirstname);
        updateWendogouser(SIMULATION_ENGINE_STEPS.FIRSTNAME, newFirstname);
    };

    const handleContinue = () => {
        updateWendogouser(SIMULATION_ENGINE_STEPS.LASTNAME, firstname);
    };

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
            title="Quel est votre prénom ?"
            id="FIRSTNAME"
            autoComplete="on"
            handleChange={handleChange}
            value={firstname}
            inputLength={64}
            valid={valid}
            setValid={setValid}
            onClickOutside={() => setValid(doesValid(firstname))}
            handleContinue={handleContinue}
            showContinueBtn={simulationStepGlobal === SIMULATION_ENGINE_STEPS.FIRSTNAME}
        />
    );
};

export default Firstname;
