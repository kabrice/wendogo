import React, { useState, useEffect } from 'react';
import SETextInput from "../../components/SimulationEngine/SETextInput";
import { useDispatch, useSelector } from 'react-redux';
import { setStep } from '../../redux/simulationStepSlice';
import helper from '../../utils/Helper';
import { SIMULATION_ENGINE_STEPS } from '../../utils/Constants';

const Email = () => {
    const dispatch = useDispatch();
    let user = helper.getLocalStorageWithExpiration('wendogouser');
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

    const updateWendogouser = (simulationStep, email) => {
        dispatch(setStep(simulationStep));
        let updatedUser = { ...user, simulationStep, email, date: new Date().toISOString() };
        helper.setLocalStorageWithExpiration('wendogouser', updatedUser);
    };

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
