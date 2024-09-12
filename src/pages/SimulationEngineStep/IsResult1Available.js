import React, { useState } from "react";
import SEYesNo from "../../components/SimulationEngine/SEYesNo";
import { useDispatch, useSelector } from 'react-redux'
import {setStep} from '../../redux/simulationStepSlice';
import { setProgress } from "../../redux/progressBarStepSlice";
import helper from '../../utils/Helper';
import {SIMULATION_ENGINE_STEPS, PROGRESS_BAR_STEPS} from '../../utils/Constants'

const IsResult1Available = () => {

    const dispatch = useDispatch()
    let user = helper.getLocalStorageWithExpiration('wendogouser')

    const simulationStepGlobal = useSelector((state) => state.simulationStep); 
    const isInUniversityGlobal = useSelector((state) => state.university.active)

    const progressBarStep = useSelector((state) => state.progressBarStep); 

    const [isResult1Available, setIsResult1Available] = useState('isResult1Available' in user ? user.isResult1Available : true)


    const showContinueBtn = (simulationStepGlobal === SIMULATION_ENGINE_STEPS.IS_YEAR_1_RESULTS_AVAILABLE) || 
                                   (!user?.isResult1Available && (progressBarStep === PROGRESS_BAR_STEPS.BULLETIN_N_2)) 

    const handleIsResult1Available = (val) => {
        setIsResult1Available(val); 
        updateWendogouser(val? SIMULATION_ENGINE_STEPS.SCHOOL_YEAR1 : SIMULATION_ENGINE_STEPS.HAS_WON_AWARD, val)
    };
    
    const updateWendogouser = (simulationStep, isResult1Available) => {
        dispatch(setStep(simulationStep)) 
        let updatedUser
        if(isResult1Available){
            updatedUser = {...user, simulationStep, isResult1Available, date: new Date().toISOString()} 
        } else {   
            dispatch(setProgress(PROGRESS_BAR_STEPS.PARCOURS_ACADEMIQUE_ET_PROFESSIONNEL)) 
            updatedUser = {...user, simulationStep, isResult1Available, progressBarStep: PROGRESS_BAR_STEPS.PARCOURS_ACADEMIQUE_ET_PROFESSIONNEL,  date: new Date().toISOString()}   
        }
        helper.setLocalStorageWithExpiration('wendogouser', updatedUser, false)         
    } 

    const handleContinue = () => {
        updateWendogouser(isResult1Available? SIMULATION_ENGINE_STEPS.SCHOOL_YEAR1 : SIMULATION_ENGINE_STEPS.HAS_WON_AWARD, isResult1Available)
        window.location.hash = "";
        window.location.hash = "form/PARCOURS_ACADEMIQUE_ET_PROFESSIONNEL";
    } 

    return (<SEYesNo title={`Vos relevés académiques ${helper.updateBAC(isInUniversityGlobal, user, 2)} sont-ils disponibles ?`} 
                    yes={isResult1Available} handleYes={handleIsResult1Available} handleContinue={handleContinue} 
                    showContinueBtn={showContinueBtn} 
                    id="IS_YEAR_1_RESULTS_AVAILABLE"/>);
}

export default IsResult1Available;
