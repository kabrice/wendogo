import React, { useState, useEffect } from "react";
import SEYesNo from "../../components/SimulationEngine/SEYesNo";
import { useDispatch, useSelector } from 'react-redux';
import { setStep } from '../../redux/simulationStepSlice';
import helper from '../../utils/Helper';
import { SIMULATION_ENGINE_STEPS } from '../../utils/Constants';
import { Loader2 } from "lucide-react";
import { setUser } from '../../redux/userSlice';

const Disable = () => {
    const [isLoading, setIsLoading] = useState(true);
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const simulationStepGlobal = useSelector((state) => state.simulationStep);
    const [disable, setDisable] = useState(false);

    // Load user data on component mount
    useEffect(() => {
        const loadUserData = () => {
            
            if (user) {
                
                setDisable(user?.disable || false);
            }
            setIsLoading(false);
        };

        loadUserData();
    }, []);

    const updateWendogouser = (simulationStep, disable) => {
        if (!user) return;

        dispatch(setStep(simulationStep));
        const updatedUser = {
            ...user,
            simulationStep,
            disable,
            date: new Date().toISOString()
        };
        helper.setLocalStorageWithExpiration('wendogouser', updatedUser);
        dispatch(setUser(updatedUser));
    };

    const handleDisable = (val) => {
        setDisable(val);
        updateWendogouser(SIMULATION_ENGINE_STEPS.EMAIL, val);
    };

    const handleContinue = () => {
        updateWendogouser(SIMULATION_ENGINE_STEPS.EMAIL, disable);
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
            title="Etes-vous en situation de handicap ?"
            yes={disable}
            handleYes={handleDisable}
            handleContinue={handleContinue}
            showContinueBtn={simulationStepGlobal === SIMULATION_ENGINE_STEPS.DISABLE}
            id="DISABLE"
        />
    );
};

export default Disable;
