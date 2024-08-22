import React, { useState } from "react";
import SEYesNo from "../../components/SimulationEngine/SEYesNo";
import { useDispatch, useSelector } from 'react-redux'
import {setStep} from '../../redux/simulationStepSlice';
import helper from '../../utils/Helper';
import {SIMULATION_ENGINE_STEPS} from '../../utils/Constants'

const IsResult2Available = () => {

    const dispatch = useDispatch()
    let user = helper.getLocalStorageWithExpiration('wendogouser')
    const simulationStepGlobal = useSelector((state) => state.simulationStep); 
    const [isResult2Available, setIsResult2Available] = useState(user?.isResult2Available || true)
    const handleIsResult2Available = (val) => {
        setIsResult2Available(val);
        updateWendogouser(SIMULATION_ENGINE_STEPS.IS_YEAR_2_RESULTS_AVAILABLE, val)
    };
    const updateWendogouser = (simulationStep, isResult2Available) => {
        dispatch(setStep(simulationStep)) 
        let updatedUser = {...user, simulationStep, isResult2Available, date: new Date().toISOString()}
        helper.setLocalStorageWithExpiration('wendogouser', updatedUser, false)         
    }

    const handleContinue = () => {
        updateWendogouser(isResult2Available? SIMULATION_ENGINE_STEPS.SCHOOL_YEAR2 : SIMULATION_ENGINE_STEPS.IS_YEAR_1_RESULTS_AVAILABLE, isResult2Available)
    }

    return (<SEYesNo title={`Vos relevés académiques ${helper.updateBAC(user.universityLevelSelected.name, 1)} sont-ils disponibles ?`} 
                    yes={isResult2Available} handleYes={handleIsResult2Available} handleContinue={handleContinue} 
                    showContinueBtn={simulationStepGlobal === SIMULATION_ENGINE_STEPS.IS_YEAR_2_RESULTS_AVAILABLE} />);
}

export default IsResult2Available;
