import React, { useState } from "react";
import SEYesNo from "../../components/SimulationEngine/SEYesNo";
import { useDispatch, useSelector } from 'react-redux'
import {setStep} from '../../redux/simulationStepSlice';
import helper from '../../utils/Helper';
import {SIMULATION_ENGINE_STEPS} from '../../utils/Constants'

const IsResult1Available = () => {

    const dispatch = useDispatch()
    let user = helper.getLocalStorageWithExpiration('wendogouser')
    const simulationStepGlobal = useSelector((state) => state.simulationStep); 
    const [isResult1Available, setIsResult1Available] = useState(user?.isResult1Available || true)
    const handleIsResult1Available = (val) => {
        setIsResult1Available(val);
        updateWendogouser(SIMULATION_ENGINE_STEPS.IS_YEAR_1_RESULTS_AVAILABLE, val)
    };
    
    
    const updateWendogouser = (simulationStep, isResult1Available) => {
        dispatch(setStep(simulationStep)) 
        let updatedUser = {...user, simulationStep, isResult1Available, date: new Date().toISOString()}
        helper.setLocalStorageWithExpiration('wendogouser', updatedUser, false)         
    }

    const handleContinue = () => {
        updateWendogouser(isResult1Available? SIMULATION_ENGINE_STEPS.SCHOOL_YEAR1 : SIMULATION_ENGINE_STEPS.HAS_WON_AWARD, isResult1Available)
    }

    return (<SEYesNo title={`Vos relevés académiques ${helper.updateBAC(user.universityLevelSelected.name, 2)} sont-ils disponibles ?`} 
                    yes={isResult1Available} handleYes={handleIsResult1Available} handleContinue={handleContinue} 
                    showContinueBtn={simulationStepGlobal === SIMULATION_ENGINE_STEPS.IS_YEAR_1_RESULTS_AVAILABLE} />);
}

export default IsResult1Available;
