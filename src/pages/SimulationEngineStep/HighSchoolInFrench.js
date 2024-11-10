import React, { useState } from "react";
import SEYesNo from "../../components/SimulationEngine/SEYesNo";
import { useDispatch, useSelector } from 'react-redux'
import {setStep} from '../../redux/simulationStepSlice';
import helper from '../../utils/Helper';
import {SIMULATION_ENGINE_STEPS} from '../../utils/Constants'


const HighSchoolInFrench = () => {

    const dispatch = useDispatch()
    let user = helper.getLocalStorageWithExpiration('wendogouser')
    const simulationStepGlobal = useSelector((state) => state.simulationStep);
    const [isHighSchoolInFrench, setIsHighSchoolInFrench] = useState(user?.isFrancophone)
    const handleIsHighSchoolInFrench = (val) => {
        setIsHighSchoolInFrench(val);
        updateWendogouser(SIMULATION_ENGINE_STEPS.HIGH_SCHOOL_IN_FRENCH, val)
    };
    
    const updateWendogouser = (simulationStep, isFrancophone) => {
        dispatch(setStep(simulationStep)) 
        let updatedUser = {...user, simulationStep, isFrancophone, date: new Date().toISOString()}
        helper.setLocalStorageWithExpiration('wendogouser', updatedUser)         
    }

    const handleContinue = () => {
        updateWendogouser(SIMULATION_ENGINE_STEPS.FRENCH_TEST, isHighSchoolInFrench)
    }

    return (<SEYesNo  title="Est-ce que vous avez effectué la totalité de vos études secondaires en langue française ?" id="HIGH_SCHOOL_IN_FRENCH"
                    yes={isHighSchoolInFrench} handleYes={handleIsHighSchoolInFrench} handleContinue={handleContinue} showContinueBtn={simulationStepGlobal === SIMULATION_ENGINE_STEPS.HIGH_SCHOOL_IN_FRENCH} />);
}

export default HighSchoolInFrench;
