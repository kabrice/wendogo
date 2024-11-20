'use client';

import React, { useState, useEffect } from 'react';
import { isValidNumber, parsePhoneNumberWithError, formatPhoneNumber } from 'libphonenumber-js';
import SETextInputPhone from "../../components/SimulationEngine/SETextInputPhone";
import { useDispatch, useSelector } from 'react-redux';
import { setStep } from '../../redux/simulationStepSlice';
import helper from '../../utils/Helper';
import { SIMULATION_ENGINE_STEPS } from '../../utils/Constants';
import { useRef } from 'react';
import useGeoLocation from "react-ipgeolocation";
import { Loader2 } from "lucide-react";
import { setUser } from '../../redux/userSlice';

const PhoneNumber = () => {
    const dispatch = useDispatch();
    const location = useGeoLocation(); 
    const simulationStepGlobal = useSelector((state) => state.simulationStep);

    // Local state
    const user = useSelector((state) => state.user); // Initially null until `localStorage` is accessed
    const [phoneNumber, setPhoneNumber] = useState('');
    const [phoneNumberFormatted, setPhoneNumberFormatted] = useState({ name: '', validated: false });
    const [countryIso2, setCountryIso2] = useState(null);
    const [valid, setValid] = useState(false);
    const [isLoadingCountry, setIsLoadingCountry] = useState(true);
    const isInitialized = useRef(false); 
    const [isDataSent, setIsDataSent] = useState(false);

    // Fetch user data from local storage during client-side render
    useEffect(() => {
        if (user?.phoneNumberFormatted) {
            setPhoneNumber(user.phoneNumberFormatted.name || '');
            setPhoneNumberFormatted(user.phoneNumberFormatted || { name: '', validated: false });
            setCountryIso2(user.country || null);
            setValid(user.phoneNumberFormatted.validated || false);
        }
    }, []);

    useEffect(() => {
        if (!isInitialized.current && user) {
            const getCountry = async () => {
                try {
                    setIsLoadingCountry(true);
                    if (user?.country) {
                        setCountryIso2(user.country);
                    } else if (!location.isLoading && location.country) {
                        setCountryIso2(location.country);
                    } else {
                        try {
                            const response = await fetch('https://ipinfo.io/json?token=3089ed2a513bd9');
                            const data = await response.json();
                            if (data.country) {
                                setCountryIso2(data.country);
                            }
                        } catch (error) {
                            console.warn('Failed to get country from IP:', error);
                        }
                    }
                } catch (error) {
                    console.error('Error in country detection:', error);
                } finally {
                    setIsLoadingCountry(false);
                    isInitialized.current = true;
                }
            };

            getCountry();
        }
    }, [location.isLoading, location.country, user]);

    const doesValid = (phoneNumber) => {
        if (phoneNumber.trim() === '') {
            return false;
        }
    
        try {
            // Attempt to parse the phone number with the selected country
            const phoneNumberObj = parsePhoneNumberWithError(phoneNumber, countryIso2 || user?.country || 'US');
            
            // Return the formatted phone number and its validity
            const formatted = { name: phoneNumberObj.number, validated: phoneNumberObj.isValid() };
            setPhoneNumberFormatted(formatted);
            return phoneNumberObj.isValid();
        } catch (error) {
            // Gracefully handle TOO_SHORT error or other parsing errors
            if (error.message === 'TOO_SHORT') {
                console.warn('Phone number is too short:', phoneNumber);
            } else {
                console.error('Error validating phone number:', error);
            }
            setPhoneNumberFormatted({ name: phoneNumber, validated: false });
            return false;
        }
    };
    

    const handleChange = (e) => {
        const phoneNumber = e.target.value;
        setPhoneNumber(phoneNumber);
        setValid(doesValid(phoneNumber));
        if (phoneNumberFormatted.validated) {
            updateWendogouser(SIMULATION_ENGINE_STEPS.WHATSAPP_NUMBER, { name: phoneNumberFormatted, validated: true });
        } else {
            updateWendogouser(SIMULATION_ENGINE_STEPS.WHATSAPP_NUMBER, { name: phoneNumber, validated: false });
        }
    };

    const handleContinue = () => {
        if (doesValid(phoneNumber)) {
            updateWendogouser(SIMULATION_ENGINE_STEPS.ADDRESS, phoneNumberFormatted);
        }
    };

    const updateWendogouser = (simulationStep, phoneNumberFormatted) => {
        dispatch(setStep(simulationStep));
        const updatedUser = { ...user, simulationStep, phoneNumberFormatted, date: new Date().toISOString() };
        dispatch(setUser(updatedUser));
        helper.setLocalStorageWithExpiration('wendogouser', updatedUser);
    };

    return (
        <>
          {user ? (
            countryIso2 ? (
              <SETextInputPhone
                title="Quel est votre numéro de téléphone WhatsApp?"
                autoComplete="on"
                id="WHATSAPP_NUMBER"
                tip="Si vous acceptez d'être mis en relation avec nous, ce numéro WhatsApp facilitera notre communication."
                type="whatsapp"
                handleChange={handleChange}
                value={phoneNumber}
                inputLength={15}
                valid={valid}
                onClickOutside={doesValid}
                setValid={setValid}
                handleContinue={handleContinue}
                countryCodeName={countryIso2}
                setCountryIso2={setCountryIso2}
                showContinueBtn={simulationStepGlobal === SIMULATION_ENGINE_STEPS.WHATSAPP_NUMBER}
              />
            ) : (
              <Loader2 className="animate-spin text-gray-500" size={32} />
            )
          ) : (
            <Loader2 className="animate-spin text-gray-500" size={32} />
          )}
        </>
    );
};

export default PhoneNumber;
