import React, { useState } from "react";
import SEYesNo from "../../components/SimulationEngine/SEYesNo";
import { useDispatch, useSelector } from 'react-redux'
import {setStep} from '../../redux/simulationStepSlice';
import {setProgress} from "../../redux/progressBarStepSlice";
import helper from '../../utils/Helper';
import {SIMULATION_ENGINE_STEPS, PROGRESS_BAR_STEPS} from '../../utils/Constants'

const CanJustifyOtherLanguage = () => {

    const dispatch = useDispatch()
    let user = helper.getLocalStorageWithExpiration('wendogouser')
    const simulationStepGlobal = useSelector((state) => state.simulationStep);
    const [canJustifyOtherLanguage, setCanJustifyOtherLanguage] = useState(user?.canJustifyOtherLanguage)

    const progressBarStep = useSelector((state) => state.progressBarStep); 
    const showContinueBtn = (simulationStepGlobal === SIMULATION_ENGINE_STEPS.CAN_JUSTIFY_OTHER_LANGUAGE) 
                                || (progressBarStep === PROGRESS_BAR_STEPS.PARCOURS_ACADEMIQUE_ET_PROFESSIONNEL) 

    const handleCanJustifyOtherLanguage = (val) => {
        setCanJustifyOtherLanguage(val);
        updateWendogouser(SIMULATION_ENGINE_STEPS.ALREADY_TRAVELED_TO_FRANCE, val)
    };

    const updateWendogouser = (simulationStep, canJustifyOtherLanguage, progressBarStep=PROGRESS_BAR_STEPS.PARCOURS_ACADEMIQUE_ET_PROFESSIONNEL) => {
        dispatch(setStep(simulationStep)) 
        dispatch(setProgress(progressBarStep)) 
        let updatedUser = {...user, simulationStep, canJustifyOtherLanguage, progressBarStep, date: new Date().toISOString()}
        helper.setLocalStorageWithExpiration('wendogouser', updatedUser, false)         
    }

    const handleContinue = () => {
        updateWendogouser(SIMULATION_ENGINE_STEPS.ALREADY_TRAVELED_TO_FRANCE, canJustifyOtherLanguage, PROGRESS_BAR_STEPS.INFORMATIONS_VOYAGE)
        window.location.hash = "";
        window.location.hash = "form/INFORMATIONS_VOYAGE";
        
    }

    return (<SEYesNo title={`Pouvez-vous présenter un document officiel (diplôme, attestation, etc.) justifiant ce niveau en ${user.selectedOtherSpokenLanguage.name} ?`} 
                    yes={canJustifyOtherLanguage} handleYes={handleCanJustifyOtherLanguage} handleContinue={handleContinue} 
                    showContinueBtn={showContinueBtn} 
                    id="CAN_JUSTIFY_OTHER_LANGUAGE"/>);
}

export default CanJustifyOtherLanguage;
