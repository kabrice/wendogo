import React, { useState, useEffect } from "react";
import SEYesNo from "../../components/SimulationEngine/SEYesNo";
import { useDispatch, useSelector } from 'react-redux';
import { setStep } from '../../redux/simulationStepSlice';
import helper from '../../utils/Helper';
import { SIMULATION_ENGINE_STEPS } from '../../utils/Constants';
import { Loader2 } from "lucide-react";
import { setUser } from '../../redux/userSlice';

const CanProveWorkExperience = () => {
    const [isLoading, setIsLoading] = useState(true);
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const simulationStepGlobal = useSelector((state) => state.simulationStep);
    const [canProveWorkExperience, setCanProveWorkExperience] = useState(null);

    // Load user data on component mount
    useEffect(() => {
        const loadUserData = () => {
            
            if (user) {
                
                setCanProveWorkExperience(user?.canProveWorkExperience);
            }
            setIsLoading(false);
        };

        loadUserData();
    }, []);

    const updateWendogouser = (simulationStep, canProveWorkExperience) => {
        if (!user) return;

        dispatch(setStep(simulationStep));
        const updatedUser = {
            ...user,
            simulationStep,
            canProveWorkExperience,
            date: new Date().toISOString()
        };
        helper.setLocalStorageWithExpiration('wendogouser', updatedUser);
        dispatch(setUser(updatedUser));
    };

    const handleCanProveWorkExperience = (val) => {
        setCanProveWorkExperience(val);
        updateWendogouser(SIMULATION_ENGINE_STEPS.CAN_PROVE_WORK_EXPERIENCE, val);
    };

    const handleContinue = () => {
        updateWendogouser(
            SIMULATION_ENGINE_STEPS.ENGLISH_LEVEL,
            canProveWorkExperience
        );
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
        <SEYesNo 
            title="Pouvez-vous présenter un document officiel (diplôme, attestation, etc.) justifiant cette expérience ?"
            yes={canProveWorkExperience}
            handleYes={handleCanProveWorkExperience}
            handleContinue={handleContinue}
            showContinueBtn={simulationStepGlobal === SIMULATION_ENGINE_STEPS.CAN_PROVE_WORK_EXPERIENCE}
            id="CAN_PROVE_WORK_EXPERIENCE"
        />
    );
};

export default CanProveWorkExperience;
