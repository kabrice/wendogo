import React, { useState } from "react";
import SEYesNo from "../../components/SimulationEngine/SEYesNo";
import { useDispatch, useSelector } from 'react-redux'
import {setStep} from '../../redux/simulationStepSlice';
import { setProgress } from "../../redux/progressBarStepSlice";
import helper from '../../utils/Helper';
import {SIMULATION_ENGINE_STEPS, PROGRESS_BAR_STEPS} from '../../utils/Constants'

const HasPassport = () => {

    const dispatch = useDispatch()
    let user = helper.getLocalStorageWithExpiration('wendogouser')

    const simulationStepGlobal = useSelector((state) => state.simulationStep); 
    const progressBarStep = useSelector((state) => state.progressBarStep); 

    const [hasPassport, setHasPassport] = useState(user?.hasPassport)

    const showContinueBtn = (simulationStepGlobal === SIMULATION_ENGINE_STEPS.HAS_PASSEPORT) || 
                                    (!user?.hasPassport && (progressBarStep === PROGRESS_BAR_STEPS.INFORMATIONS_VOYAGE)) 

    const handleHasPassport = (val) => {
        setHasPassport(val);
        updateWendogouser(hasPassport? SIMULATION_ENGINE_STEPS.PASSEPORT_DETAILS : SIMULATION_ENGINE_STEPS.SALUTATION, val)
    };

    const updateWendogouser = (simulationStep, hasPassport) => {
        dispatch(setStep(simulationStep)) 
        let updatedUser
        if(hasPassport){
            updatedUser = {...user, simulationStep, hasPassport, date: new Date().toISOString()} 
        } else {   
            dispatch(setProgress(PROGRESS_BAR_STEPS.COORDONNEES)) 
            updatedUser = {...user, simulationStep, hasPassport, progressBarStep: PROGRESS_BAR_STEPS.COORDONNEES,  date: new Date().toISOString()}   
        }
        helper.setLocalStorageWithExpiration('wendogouser', updatedUser, false)         
    }

    const handleContinue = () => {
        updateWendogouser(hasPassport? SIMULATION_ENGINE_STEPS.PASSEPORT_DETAILS : SIMULATION_ENGINE_STEPS.SALUTATION, hasPassport)
        window.location.hash = ""
        window.location.hash = "form/COORDONNEES";
    }

    return (<SEYesNo title={`Possédez-vous déjà un passeport valide ?`}  
                     yes={hasPassport} handleYes={handleHasPassport} handleContinue={handleContinue} 
                     showContinueBtn={showContinueBtn} 
                     id="HAS_PASSEPORT"/>);
}

export default HasPassport;
