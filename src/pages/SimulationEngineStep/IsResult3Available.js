import React, { useState } from "react";
import SEYesNo from "../../components/SimulationEngine/SEYesNo";
import { useDispatch, useSelector } from 'react-redux'
import {setStep} from '../../redux/simulationStepSlice';
import { setProgress } from "../../redux/progressBarStepSlice";
import helper from '../../utils/Helper';
import {SIMULATION_ENGINE_STEPS, PROGRESS_BAR_STEPS} from '../../utils/Constants'

const IsResult3Available = () => {

    const dispatch = useDispatch()
    let user = helper.getLocalStorageWithExpiration('wendogouser')

    const simulationStepGlobal = useSelector((state) => state.simulationStep);
    const progressBarStep = useSelector((state) => state.progressBarStep); 

    const [isResult3Available, setIsResult3Available] = useState('isResult3Available' in user ? user.isResult3Available : true)

    const showContinueBtn = (simulationStepGlobal === SIMULATION_ENGINE_STEPS.IS_YEAR_3_RESULTS_AVAILABLE) || 
                                   (!user?.isResult3Available && (progressBarStep === PROGRESS_BAR_STEPS.BULLETIN_LE_PLUS_RECENT)) 

    const handleIsResult3Available = (val) => { 
        setIsResult3Available(val);
        updateWendogouser(val ? SIMULATION_ENGINE_STEPS.ACADEMIC_YEAR_HEAD_DETAILS3 : SIMULATION_ENGINE_STEPS.IS_YEAR_2_RESULTS_AVAILABLE, val)
    };
    
    
    const updateWendogouser = (simulationStep, isResult3Available) => {
        dispatch(setStep(simulationStep)) 
        let updatedUser
        if(isResult3Available){
            updatedUser = {...user, simulationStep, isResult3Available, date: new Date().toISOString()} 
        } else {   
            dispatch(setProgress(PROGRESS_BAR_STEPS.BULLETIN_N_1)) 
            updatedUser = {...user, simulationStep, isResult3Available, progressBarStep: PROGRESS_BAR_STEPS.BULLETIN_N_1,  date: new Date().toISOString()}   
        }
        helper.setLocalStorageWithExpiration('wendogouser', updatedUser, false)         
    }

    const handleContinue = () => {
        updateWendogouser(isResult3Available ? SIMULATION_ENGINE_STEPS.ACADEMIC_YEAR_HEAD_DETAILS3 : SIMULATION_ENGINE_STEPS.IS_YEAR_2_RESULTS_AVAILABLE, isResult3Available)
        window.location.hash = ""
        window.location.hash = "form/BULLETIN_N_1";
    }

    return (<SEYesNo title={`Vos relevés académiques ${user.selectedSchoolYear3.name} sont-ils disponibles ?`} 
                    yes={isResult3Available} handleYes={handleIsResult3Available} handleContinue={handleContinue} 
                    showContinueBtn={showContinueBtn}  
                    id="IS_YEAR_3_RESULTS_AVAILABLE" />);
}

export default IsResult3Available;
