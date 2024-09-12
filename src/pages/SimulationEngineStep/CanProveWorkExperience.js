import React, { useState } from "react";
import SEYesNo from "../../components/SimulationEngine/SEYesNo";
import { useDispatch, useSelector } from 'react-redux'
import {setStep} from '../../redux/simulationStepSlice';
import helper from '../../utils/Helper';
import {SIMULATION_ENGINE_STEPS} from '../../utils/Constants'

const CanProveWorkExperience = () => {

    const dispatch = useDispatch()
    let user = helper.getLocalStorageWithExpiration('wendogouser')
    const simulationStepGlobal = useSelector((state) => state.simulationStep);
    //console.log('user FrenchTest', user)
    const [canProveWorkExperience, setCanProveWorkExperience] = useState(user?.canProveWorkExperience)

    const handleCanProveWorkExperience = (val) => {
        setCanProveWorkExperience(val);
        updateWendogouser(SIMULATION_ENGINE_STEPS.CAN_PROVE_WORK_EXPERIENCE, val)
    };

    const updateWendogouser = (simulationStep, canProveWorkExperience) => {
        dispatch(setStep(simulationStep)) 
        let updatedUser = {...user, simulationStep, canProveWorkExperience, date: new Date().toISOString()}
        helper.setLocalStorageWithExpiration('wendogouser', updatedUser, false)         
    }

    const handleContinue = () => {
        updateWendogouser(SIMULATION_ENGINE_STEPS.ENGLISH_LEVEL, canProveWorkExperience)
    }

    return (<SEYesNo title="Pouvez-vous présenter un document officiel (diplôme, attestation, etc.) justifiant cette expérience ?" 
                     yes={canProveWorkExperience} handleYes={handleCanProveWorkExperience} handleContinue={handleContinue} 
                     showContinueBtn={simulationStepGlobal === SIMULATION_ENGINE_STEPS.CAN_PROVE_WORK_EXPERIENCE} 
                     id="CAN_PROVE_WORK_EXPERIENCE"/>);
}

export default CanProveWorkExperience;
