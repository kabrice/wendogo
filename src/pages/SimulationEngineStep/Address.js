import React, { useState, useEffect } from 'react';
import SETextArea from "../../components/SimulationEngine/SETextArea";
import { useDispatch, useSelector } from 'react-redux';
import { setStep } from '../../redux/simulationStepSlice';
import helper from '../../utils/Helper';
import { SIMULATION_ENGINE_STEPS } from '../../utils/Constants';
import { Loader2 } from "lucide-react";
import { setUser } from '../../redux/userSlice'; 

const Address = () => {
    const [isLoading, setIsLoading] = useState(true);
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const simulationStepGlobal = useSelector((state) => state.simulationStep);

    // Initialize states with defaults
    const [addressName, setAddressName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [valid, setValid] = useState(false);

    // Load user data on component mount
    useEffect(() => {
        const loadUserData = () => {
            
            if (user) {
                
                setAddressName(user?.address?.name || '');
                setValid(user?.address?.validated || false);
            }
            setIsLoading(false);
        };

        loadUserData();
    }, []);

    const validateAddress = (addressName) => {
        const rules = [
            { regex: /^[a-zA-Z0-9\sÀ-ÿ,'.;-]+$/gm, error: "Seules les lettres, les chiffres et les espaces sont autorisés." },
            { regex: /^[\s\S]{10,255}$/, error: "Le contenu doit être compris entre 10 et 255 caractères." },
            { regex: /^(?!.*[^\S\n]{2,})[\s\S]*$/, error: "Aucun espace consécutif n'est autorisé." },
        ];

        for (let rule of rules) {
            if (!rule.regex.test(addressName)) {
                setErrorMessage(rule.error);
                return false;
            }
        }
        setErrorMessage('');
        return true;
    };

    // Validate addressName on change
    useEffect(() => {
        if (!isLoading) {
            setValid(validateAddress(addressName));
        }
    }, [addressName, isLoading]);

    const updateWendogouser = (simulationStep, address) => {
        if (!user) return;

        dispatch(setStep(simulationStep));
        const updatedUser = { 
            ...user, 
            simulationStep, 
            address, 
            date: new Date().toISOString() 
        };
        helper.setLocalStorageWithExpiration('wendogouser', updatedUser);
        dispatch(setUser(updatedUser));
    };

    const handleChange = (e) => {
        const newAddressName = e.target.value;
        setAddressName(newAddressName);
        updateWendogouser(SIMULATION_ENGINE_STEPS.ADDRESS, {
            name: newAddressName, 
            validated: false
        });
    };

    const handleContinue = () => {
        if (valid) {
            updateWendogouser(SIMULATION_ENGINE_STEPS.VALIDATION, {
                name: addressName, 
                validated: true
            });
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
