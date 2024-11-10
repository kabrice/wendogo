import React, { useState } from "react";
import SEYesNo from "../../components/SimulationEngine/SEYesNo";
import { useDispatch, useSelector } from 'react-redux'
import {setStep} from '../../redux/simulationStepSlice';
import helper from '../../utils/Helper';
import {SIMULATION_ENGINE_STEPS} from '../../utils/Constants'

const FrenchTest = () => {

    const dispatch = useDispatch()
    let user = helper.getLocalStorageWithExpiration('wendogouser')
    const simulationStepGlobal = useSelector((state) => state.simulationStep);
    console.log('user FrenchTest', user)
    const [haveDoneFrenchTest, setHaveDoneFrenchTest] = useState(user?.haveDoneFrenchTest)
    const handleHaveDoneFrenchTest = (val) => {
        setHaveDoneFrenchTest(val);
        updateWendogouser(SIMULATION_ENGINE_STEPS.FRENCH_TEST, val)
    };

    const updateWendogouser = (simulationStep, haveDoneFrenchTest) => {
        dispatch(setStep(simulationStep)) 
        let updatedUser = {...user, simulationStep, haveDoneFrenchTest, date: new Date().toISOString()}
        helper.setLocalStorageWithExpiration('wendogouser', updatedUser)         
    }

    const handleContinue = () => {
        updateWendogouser(SIMULATION_ENGINE_STEPS.FRENCH_LEVEL, haveDoneFrenchTest)
    }

    return (<SEYesNo title="Avez-vous passé un test de langue française, comme le DELF ?" id="FRENCH_TEST"
                     yes={haveDoneFrenchTest} handleYes={handleHaveDoneFrenchTest} handleContinue={handleContinue} 
                     showContinueBtn={simulationStepGlobal === SIMULATION_ENGINE_STEPS.FRENCH_TEST} />);
}

export default FrenchTest;
