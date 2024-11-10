import React, { useState } from "react";
import SEYesNo from "../../components/SimulationEngine/SEYesNo";
import { useDispatch, useSelector } from 'react-redux'
import {setStep} from '../../redux/simulationStepSlice';
import { setProgress } from "../../redux/progressBarStepSlice";
import helper from '../../utils/Helper';
import SESmallAlertMessage from "../../components/SimulationEngine/SESmallAlertMessage";
import {SIMULATION_ENGINE_STEPS, PROGRESS_BAR_STEPS} from '../../utils/Constants'

const IsResult1Available = () => {

    const dispatch = useDispatch()
    let user = helper.getLocalStorageWithExpiration('wendogouser')

    const simulationStepGlobal = useSelector((state) => state.simulationStep); 
    const isInUniversityGlobal = useSelector((state) => state.university.active)
    const [isAtLeastOneReportFilled, setIsAtLeastOneReportFilled] = useState(true)

    const progressBarStep = useSelector((state) => state.progressBarStep); 

    const [isResult1Available, setIsResult1Available] = useState('reportCard1' in user ? user.isResult1Available : true)


    const showContinueBtn = (simulationStepGlobal === SIMULATION_ENGINE_STEPS.IS_YEAR_1_RESULTS_AVAILABLE) || 
                                   (!user?.isResult1Available && (progressBarStep === PROGRESS_BAR_STEPS.BULLETIN_N_2)) 

    const handleIsResult1Available = (val) => {
        setIsResult1Available(val); 
        dispatch(setStep( SIMULATION_ENGINE_STEPS.IS_YEAR_1_RESULTS_AVAILABLE))  
        helper.setLocalStorageWithExpiration('wendogouser', {...user, simulationStep : SIMULATION_ENGINE_STEPS.IS_YEAR_1_RESULTS_AVAILABLE})
    };
    
    const updateWendogouser = (simulationStep, isResult1Available) => {
        let myIsAtLeastOneReportFilled = user.isResult3Available || user.isResult2Available || isResult1Available
        setIsAtLeastOneReportFilled(myIsAtLeastOneReportFilled)
        if(!myIsAtLeastOneReportFilled){
            return
        }
        dispatch(setStep(simulationStep)) 
        let updatedUser
        if(isResult1Available){
            updatedUser = {...user, simulationStep, isResult1Available, date: new Date().toISOString()} 
        } else {   
            dispatch(setProgress(PROGRESS_BAR_STEPS.PARCOURS_ACADEMIQUE_ET_PROFESSIONNEL)) 
            updatedUser = {...user, simulationStep, isResult1Available, progressBarStep: PROGRESS_BAR_STEPS.PARCOURS_ACADEMIQUE_ET_PROFESSIONNEL,  date: new Date().toISOString()}   
        }
        helper.setLocalStorageWithExpiration('wendogouser', updatedUser)         
    } 

    const handleContinue = () => {
        updateWendogouser(isResult1Available? SIMULATION_ENGINE_STEPS.SCHOOL_YEAR1 : SIMULATION_ENGINE_STEPS.HAS_WON_AWARD, isResult1Available)
        if(user.isResult3Available || user.isResult2Available || isResult1Available){
            console.log('🥳 YYYOOO')
            window.location.hash = "";
            window.location.hash = "form/PARCOURS_ACADEMIQUE_ET_PROFESSIONNEL";
        }
    } 

    const mostRecentBacId = helper.getMostRecentBacId(user);
    let bac_year = parseInt(mostRecentBacId.slice(-1))
    console.log('🥳 mostRecentBacId', mostRecentBacId, bac_year)
    const isUpToBac1 = bac_year > 6  
    const additionalText = isUpToBac1 ? 'et votre Baccalauréat' : ''    

    return (<>
                <SEYesNo title={`Vos relevés académiques ${helper.updateBAC(isInUniversityGlobal, user, 2)} ${additionalText} sont-ils disponibles ?`} 
                    tip="Considérer uniquement les bulletins des années validées."
                    yes={isResult1Available} handleYes={handleIsResult1Available} handleContinue={handleContinue} 
                    showContinueBtn={showContinueBtn} 
                    id="IS_YEAR_1_RESULTS_AVAILABLE"/>
                    {!isAtLeastOneReportFilled && <SESmallAlertMessage type="error" content="Vous devez remplir au moins un bulletin pour continuer" />}               
            </>);
}

export default IsResult1Available;
