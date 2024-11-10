import React, { useState } from "react";
import SEYesNo from "../../components/SimulationEngine/SEYesNo";
import { useDispatch, useSelector } from 'react-redux'
import {setStep} from '../../redux/simulationStepSlice';
import helper from '../../utils/Helper';
import {SIMULATION_ENGINE_STEPS} from '../../utils/Constants'

const CanJustifyEnglishLevel = () => {

    const dispatch = useDispatch()
    let user = helper.getLocalStorageWithExpiration('wendogouser')
    const simulationStepGlobal = useSelector((state) => state.simulationStep);
    //console.log('user FrenchTest', user)
    const [canJustifyEnglishLevel, setCanJustifyEnglishLevel] = useState(user?.canJustifyEnglishLevel)
    const handleCanJustifyEnglishLevel = (val) => {
        setCanJustifyEnglishLevel(val);
        updateWendogouser(SIMULATION_ENGINE_STEPS.OTHER_SPOKEN_LANGUAGE, val)
    };

    const updateWendogouser = (simulationStep, canJustifyEnglishLevel) => {
        dispatch(setStep(simulationStep)) 
        let updatedUser = {...user, simulationStep, canJustifyEnglishLevel, date: new Date().toISOString()}
        helper.setLocalStorageWithExpiration('wendogouser', updatedUser)         
    }

    const handleContinue = () => {
        updateWendogouser(SIMULATION_ENGINE_STEPS.OTHER_SPOKEN_LANGUAGE, canJustifyEnglishLevel)
    }

    return (<SEYesNo title="Pouvez-vous présenter un document officiel (diplôme, attestation, etc.) justifiant ce niveau d'anglais ?" 
                    yes={canJustifyEnglishLevel} handleYes={handleCanJustifyEnglishLevel} handleContinue={handleContinue} 
                    id="CAN_JUSTIFY_ENGLISH_LEVEL"
                    showContinueBtn={simulationStepGlobal === SIMULATION_ENGINE_STEPS.CAN_JUSTIFY_ENGLISH_LEVEL} />);
}

export default CanJustifyEnglishLevel;
