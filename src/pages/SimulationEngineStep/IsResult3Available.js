import React, { useState } from "react";
import SEYesNo from "../../components/SimulationEngine/SEYesNo";
import { useDispatch, useSelector } from 'react-redux'
import {setStep} from '../../redux/simulationStepSlice';
import helper from '../../utils/Helper';
import {SIMULATION_ENGINE_STEPS} from '../../utils/Constants'

const IsResult3Available = () => {

    const dispatch = useDispatch()
    let user = helper.getLocalStorageWithExpiration('wendogouser')
    const simulationStepGlobal = useSelector((state) => state.simulationStep);
    //console.log('user FrenchTest', user)
    const [isResult3Available, setIsResult3Available] = useState(user?.isResult3Available || true)
    const handleIsResult3Available = (val) => {
        console.log('handleIsResult3Available', val)
        setIsResult3Available(val);
        updateWendogouser(SIMULATION_ENGINE_STEPS.IS_YEAR_3_RESULTS_AVAILABLE, val)
    };
    
    
    const updateWendogouser = (simulationStep, isResult3Available) => {
        dispatch(setStep(simulationStep)) 
        let updatedUser = {...user, simulationStep, isResult3Available, date: new Date().toISOString()}
        helper.setLocalStorageWithExpiration('wendogouser', updatedUser, false)         
    }

    const handleContinue = () => {
        updateWendogouser(isResult3Available ? SIMULATION_ENGINE_STEPS.ACADEMIC_YEAR_HEAD_DETAILS3 : SIMULATION_ENGINE_STEPS.IS_YEAR_2_RESULTS_AVAILABLE, isResult3Available)
    }

    return (<SEYesNo title={`Vos relevés académiques ${user.selectedSchoolYear3.name} sont-ils disponibles ?`} 
                    yes={isResult3Available} handleYes={handleIsResult3Available} handleContinue={handleContinue} 
                    showContinueBtn={simulationStepGlobal === SIMULATION_ENGINE_STEPS.IS_YEAR_3_RESULTS_AVAILABLE} />);
}

export default IsResult3Available;
