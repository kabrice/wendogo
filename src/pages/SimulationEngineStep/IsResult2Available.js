import React, { useState } from "react";
import SEYesNo from "../../components/SimulationEngine/SEYesNo";
import { useDispatch, useSelector } from 'react-redux'
import {setStep} from '../../redux/simulationStepSlice';
import { setProgress } from "../../redux/progressBarStepSlice";
import helper from '../../utils/Helper';
import {SIMULATION_ENGINE_STEPS, PROGRESS_BAR_STEPS} from '../../utils/Constants'

const IsResult2Available = () => {

    const dispatch = useDispatch()
    let user = helper.getLocalStorageWithExpiration('wendogouser')

    const simulationStepGlobal = useSelector((state) => state.simulationStep);
    const isInUniversityGlobal = useSelector((state) => state.university.active)
    const isInPremiereClassGlobal = useSelector((state) => state.premiereClass.active)

    const progressBarStep = useSelector((state) => state.progressBarStep); 

    const [isResult2Available, setIsResult2Available] = useState('isResult2Available' in user ? user.isResult2Available : true)

    const showContinueBtn = (simulationStepGlobal === SIMULATION_ENGINE_STEPS.IS_YEAR_2_RESULTS_AVAILABLE) || 
                                   (!user?.isResult2Available && (progressBarStep === PROGRESS_BAR_STEPS.BULLETIN_N_1)) 

    const handleIsResult2Available = (val) => {
        setIsResult2Available(val);
        updateWendogouser(val? SIMULATION_ENGINE_STEPS.SCHOOL_YEAR2 : SIMULATION_ENGINE_STEPS.IS_YEAR_1_RESULTS_AVAILABLE, val)
    };

    const updateWendogouser = (simulationStep, isResult2Available) => {
        dispatch(setStep(simulationStep)) 
        let updatedUser
        if(isResult2Available){
            updatedUser = {...user, simulationStep, isResult2Available, date: new Date().toISOString()} 
        } else {   
            let nextProgressBarStep = isInPremiereClassGlobal? PROGRESS_BAR_STEPS.PARCOURS_ACADEMIQUE_ET_PROFESSIONNEL : PROGRESS_BAR_STEPS.BULLETIN_N_2
            console.log('nextProgressBarStep', nextProgressBarStep)
            dispatch(setProgress(nextProgressBarStep)) 
            updatedUser = {...user, simulationStep, isResult2Available, progressBarStep: nextProgressBarStep,  date: new Date().toISOString()}   
        }
        helper.setLocalStorageWithExpiration('wendogouser', updatedUser, false)         
    }
 
    const handleContinue = () => {
        let nextSimulationStep = isInPremiereClassGlobal? SIMULATION_ENGINE_STEPS.HAS_WON_AWARD : SIMULATION_ENGINE_STEPS.IS_YEAR_1_RESULTS_AVAILABLE 
        updateWendogouser(isResult2Available? SIMULATION_ENGINE_STEPS.SCHOOL_YEAR2 : nextSimulationStep, isResult2Available)
        window.location.hash = ""
        window.location.hash =isInPremiereClassGlobal ? "form/PARCOURS_ACADEMIQUE_ET_PROFESSIONNEL": "form/BULLETIN_N_2";
    }

    return (<SEYesNo title={`Vos relevés académiques ${helper.updateBAC(isInUniversityGlobal, user, 1)} sont-ils disponibles ?`} 
                    yes={isResult2Available} handleYes={handleIsResult2Available} handleContinue={handleContinue} 
                    showContinueBtn={showContinueBtn} 
                    id="IS_YEAR_3_RESULTS_AVAILABLE" />);
}

export default IsResult2Available;
