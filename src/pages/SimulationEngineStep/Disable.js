import React, { useState } from "react";
import SEYesNo from "../../components/SimulationEngine/SEYesNo";
import { useDispatch, useSelector } from 'react-redux'
import {setStep} from '../../redux/simulationStepSlice';
import helper from '../../utils/Helper';
import {SIMULATION_ENGINE_STEPS} from '../../utils/Constants'

const Disable = () => {

    const dispatch = useDispatch()
    let user = helper.getLocalStorageWithExpiration('wendogouser')
    const simulationStepGlobal = useSelector((state) => state.simulationStep); 
    const [disable, setDisable] = useState(user?.disable || false)

    const handleDisable = (val) => {
        setDisable(val);
        updateWendogouser(SIMULATION_ENGINE_STEPS.EMAIL, val)
    };
    
    
    const updateWendogouser = (simulationStep, disable) => {
        dispatch(setStep(simulationStep)) 
        let updatedUser = {...user, simulationStep, disable, date: new Date().toISOString()}
        helper.setLocalStorageWithExpiration('wendogouser', updatedUser)         
    }

    const handleContinue = () => {
        updateWendogouser(SIMULATION_ENGINE_STEPS.EMAIL, disable)
    }

    return (<SEYesNo title={`Etes-vous en situation de handicap ?`}
                    yes={disable} handleYes={handleDisable} handleContinue={handleContinue} 
                    showContinueBtn={simulationStepGlobal === SIMULATION_ENGINE_STEPS.DISABLE}
                    id="DISABLE" />);
}

export default Disable;
