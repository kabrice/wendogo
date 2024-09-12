import React, { useState, useEffect } from 'react';
import { isValidNumber, parsePhoneNumber, formatPhoneNumber } from 'libphonenumber-js';
import SETextInputPhone from "../../components/SimulationEngine/SETextInputPhone";
import { useDispatch, useSelector } from 'react-redux';
import { setStep } from '../../redux/simulationStepSlice';
import helper from '../../utils/Helper';
import { SIMULATION_ENGINE_STEPS } from '../../utils/Constants';

const PhoneNumber = () => {
    const dispatch = useDispatch();
    let user = helper.getLocalStorageWithExpiration('wendogouser');
    console.log('user.phoneNumberFormatted', user?.phoneNumberFormatted);
    const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumberFormatted?.name || '');
    const [phoneNumberFormatted, setPhoneNumberFormatted] = useState(user?.phoneNumberFormatted || {name: '', validated: false});
    //const [countryCode, setCountryCode] = useState('CM'); // Default country code
    const simulationStepGlobal = useSelector((state) => state.simulationStep);
    const [valid, setValid] = useState(user?.phoneNumberFormatted?.validated || false);

    // Validate phone number based on the country code
    const doesValid = (phoneNumber) => {
        //let phoneNumber = e ? e.target.value : phoneNumberFormatted.name;
        console.log('phoneNumber', phoneNumber)
        if (phoneNumber.trim() === '') {
            return true; // Consider empty input as valid
        }

        try {
           ;
            const phoneNumberObj = parsePhoneNumber(phoneNumber.toString(), 'FR');
            console.log('phoneNumberObj', phoneNumberObj, phoneNumberObj.isValid());
            let phoneNumberFormatted = {name: phoneNumberObj.number, validated: phoneNumberObj.isValid()};
            setPhoneNumberFormatted(phoneNumberFormatted);
            //setValid(phoneNumberObj.isValid());
            return phoneNumberObj.isValid();
        } catch (error) {
            console.error('Error validating phone number:', error);
            return false;
        }
    };

    

    // Update validity when phone number or country code changes
    // useEffect(() => {
        
    //     console.log('phoneNumber', phoneNumber);
    //     setValid(doesValid());
    // }, [phoneNumber]);

    const handleChange = (e) => {
        const phoneNumber = e.target.value;
        setPhoneNumber(phoneNumber);
        setValid(doesValid(phoneNumber));
        console.log('phoneNumber', phoneNumber, phoneNumberFormatted);
        if(phoneNumberFormatted.validated){
            updateWendogouser(SIMULATION_ENGINE_STEPS.WHATSAPP_NUMBER, {name: phoneNumberFormatted, validated: true});
        }else{
            updateWendogouser(SIMULATION_ENGINE_STEPS.WHATSAPP_NUMBER, {name: phoneNumber, validated: false});
        }
    };

    const handleContinue = () => {
        if (doesValid(phoneNumber)) {
            updateWendogouser(SIMULATION_ENGINE_STEPS.ADDRESS, phoneNumberFormatted);
        }
    };

    const updateWendogouser = (simulationStep, phoneNumberFormatted) => {
        dispatch(setStep(simulationStep));
        let updatedUser = { ...user, simulationStep, phoneNumberFormatted, date: new Date().toISOString() };
        helper.setLocalStorageWithExpiration('wendogouser', updatedUser, false);
    };

    return ( 
         
        <SETextInputPhone
            title="Quel est votre numéro de téléphone WhatsApp?" autoComplete="on"
            id="WHATSAPP_NUMBER"
            tip="Si vous acceptez d'être mis en relation avec nous, ce numéro WhatsApp facilitera notre communication."
            type="whatsapp"
            handleChange={handleChange}
            value={phoneNumber}
            inputLength={15} // Adjust according to your needs
            valid={valid}
            onClickOutside={doesValid}
            setValid={setValid} 
            handleContinue={handleContinue}
            countryCodeName={user.country}
            showContinueBtn={simulationStepGlobal === SIMULATION_ENGINE_STEPS.WHATSAPP_NUMBER}
        />  
        
    );
};

export default PhoneNumber;
