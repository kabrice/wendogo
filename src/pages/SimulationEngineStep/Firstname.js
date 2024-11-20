'use client';

import React, { useState, useEffect , useCallback} from 'react';
import SETextInput from "../../components/SimulationEngine/SETextInput";
import { useDispatch, useSelector } from 'react-redux';
import { setStep } from '../../redux/simulationStepSlice';
import helper from '../../utils/Helper';
import { SIMULATION_ENGINE_STEPS } from '../../utils/Constants';
import { Loader2 } from "lucide-react"; // Using lucide-react for loading spinner
import { setUser } from '../../redux/userSlice';

const Firstname = () => {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [firstname, setFirstname] = useState(user?.firstname || '');
    const simulationStepGlobal = useSelector((state) => state.simulationStep);

    const doesValid = (firstname) => {
        return firstname !== undefined && firstname.trim().length >= 3 && /[a-zA-Z].*[a-zA-Z]/.test(firstname);
      }
      
    const [valid, setValid] = useState(doesValid());

    const handleChange = (e) => {
        const firstname = e.target.value;
        setFirstname(firstname);
        updateWendogouser(SIMULATION_ENGINE_STEPS.FIRSTNAME, firstname)
    };   


    const updateWendogouser = useCallback((simulationStep, firstname) => {
        
        dispatch(setStep(simulationStep));
        const updatedUser = {
            ...user,
            simulationStep,
            firstname,
            date: new Date().toISOString()
        };
        helper.setLocalStorageWithExpiration('wendogouser', updatedUser);
        dispatch(setUser(updatedUser));
    }, [dispatch, user]);
 

    const handleContinue = useCallback(() => { 
        updateWendogouser(SIMULATION_ENGINE_STEPS.LASTNAME, firstname);
    }, [firstname, updateWendogouser]);

    if (!user) {
        return (
            <div className="flex items-center justify-center min-h-[100px]">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (<>{'xx '+valid}
        <SETextInput 
            title="Quel est votre prénom ?"
            id="FIRSTNAME"
            autoComplete="on"
            handleChange={handleChange}
            value={firstname}
            inputLength={64}
            valid={valid}
            setValid={setValid}
            onClickOutside={doesValid}
            handleContinue={handleContinue}
            showContinueBtn={simulationStepGlobal === SIMULATION_ENGINE_STEPS.FIRSTNAME}
        /></>
    );
};

export default Firstname;
