import React, { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import SEYesNo from "../../components/SimulationEngine/SEYesNo";
import { setStep } from '../../redux/simulationStepSlice';
import helper from '../../utils/Helper';
import { SIMULATION_ENGINE_STEPS } from '../../utils/Constants';
import { setUser } from '../../redux/userSlice';

const FrenchTest = () => {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [isClient, setIsClient] = useState(false); 
    
    const [haveDoneFrenchTest, setHaveDoneFrenchTest] = useState(null);
    
    const simulationStepGlobal = useSelector((state) => state.simulationStep);

    // Initialize client-side data
    useEffect(() => {
        setIsClient(true); 
        setHaveDoneFrenchTest(user?.haveDoneFrenchTest);
    }, []);

    const updateWendogouser = useCallback((simulationStep, haveDoneFrenchTest) => {
        dispatch(setStep(simulationStep));
        
        const updatedUser = {
            ...user,
            simulationStep,
            haveDoneFrenchTest,
            date: new Date().toISOString()
        };
        
        helper.setLocalStorageWithExpiration('wendogouser', updatedUser);
        dispatch(setUser(updatedUser));
    }, [dispatch, user]);

    const handleHaveDoneFrenchTest = useCallback((val) => {
        setHaveDoneFrenchTest(val);
        updateWendogouser(SIMULATION_ENGINE_STEPS.FRENCH_TEST, val);
    }, [updateWendogouser]);

    const handleContinue = useCallback(() => {
        updateWendogouser(SIMULATION_ENGINE_STEPS.FRENCH_LEVEL, haveDoneFrenchTest);
    }, [updateWendogouser, haveDoneFrenchTest]);

    // Don't render until client-side initialization is complete
    if (!isClient) {
        return null;
    }

    return (
        <SEYesNo 
            title="Avez-vous passé un test de langue française, comme le DELF ?" 
            id="FRENCH_TEST"
            yes={haveDoneFrenchTest}
            handleYes={handleHaveDoneFrenchTest}
            handleContinue={handleContinue}
            showContinueBtn={simulationStepGlobal === SIMULATION_ENGINE_STEPS.FRENCH_TEST}
        />
    );
};

export default FrenchTest;
