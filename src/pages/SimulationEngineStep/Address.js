import React, { useState, useEffect } from 'react';
import SETextArea from "../../components/SimulationEngine/SETextArea";
import { useDispatch, useSelector } from 'react-redux';
import { setStep } from '../../redux/simulationStepSlice';
import helper from '../../utils/Helper';
import { SIMULATION_ENGINE_STEPS } from '../../utils/Constants';

const Address = () => {
    const dispatch = useDispatch();
    let user = helper.getLocalStorageWithExpiration('wendogouser');
    const [addressName, setAddressName] = useState(user?.address?.name || '');
    const simulationStepGlobal = useSelector((state) => state.simulationStep);
    const [errorMessage, setErrorMessage] = useState('');
    const [valid, setValid] = useState(user?.address?.validated);

    const validateAddress = (addressName) => {
        const rules = [
            { regex: /^[a-zA-Z0-9\sÀ-ÿ,'.;-]+$/gm, error: "Seules les lettres, les chiffres et les espaces sont autorisés." },
            { regex: /^[\s\S]{10,255}$/, error: "Le contenu doit être compris entre 10 et 255 caractères." },
            { regex: /^(?!.*[^\S\n]{2,})[\s\S]*$/, error: "Aucun espace consécutif n'est autorisé." },
            // Add more rules as needed
        ];
        console.log('addressName', addressName);
        for (let rule of rules) {
            if (!rule.regex.test(addressName)) {
                setErrorMessage(rule.error);
                return false;
            }
        }
        setErrorMessage('');
        return true;
    };

    // Validate addressName on change and set the error message
    useEffect(() => {
        setValid(validateAddress(addressName));
    }, [addressName]);

    const handleChange = (e) => {
        const addressName = e.target.value;
        setAddressName(addressName);
        updateWendogouser(SIMULATION_ENGINE_STEPS.ADDRESS, {name : addressName, validated: false});
    };

    const handleContinue = () => {
        if (valid) {
            updateWendogouser(SIMULATION_ENGINE_STEPS.VALIDATION, {name : addressName, validated: true});
        }
    };

    const updateWendogouser = (simulationStep, address) => {
        dispatch(setStep(simulationStep));
        let updatedUser = { ...user, simulationStep, address, date: new Date().toISOString() };
        helper.setLocalStorageWithExpiration('wendogouser', updatedUser);
    };

    return ( 
        <SETextArea
            title="Quelle est votre adresse ?"
            tip="Cette information est utilisée uniquement à des fins statistiques."
            type="address"
            id="ADDRESS"
            isPartOfInputGroup={false}
            handleChange={handleChange}
            value={addressName}
            inputLength={255}
            valid={valid}
            setValid={setValid}
            onClickOutside={() => validateAddress(addressName)}
            errorMessage={errorMessage}
            showTip={true}
            handleContinue={handleContinue}
            showContinueBtn={simulationStepGlobal === SIMULATION_ENGINE_STEPS.ADDRESS}
        />
    );
};

export default Address;
