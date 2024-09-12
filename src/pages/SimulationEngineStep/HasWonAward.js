import React, { useState } from "react";
import SEYesNo from "../../components/SimulationEngine/SEYesNo";
import { useDispatch, useSelector } from 'react-redux'
import {setStep} from '../../redux/simulationStepSlice';
import helper from '../../utils/Helper';
import {SIMULATION_ENGINE_STEPS} from '../../utils/Constants'

const HasWonAward = () => {

    const dispatch = useDispatch()
    let user = helper.getLocalStorageWithExpiration('wendogouser')
    const simulationStepGlobal = useSelector((state) => state.simulationStep); 
    const [hasWonAward, setHasWonAward] = useState(user?.hasWonAward)

    const uniqueNames = [...new Set(user.mainSubjects.map(obj => `«${obj.name}»`))];

    let formattedString;
    if (uniqueNames.length > 1) {
        const lastTwoNames = uniqueNames.splice(-2);
        formattedString = [...uniqueNames, `${lastTwoNames[0]} ou ${lastTwoNames[1]}`].join(', ');
    } else {
        formattedString = `${uniqueNames[0]}`;
    }
    const oldestSchoolYear = user?.selectedSchoolYear1?.name || user?.selectedSchoolYear2?.name || user?.selectedSchoolYear3?.name;


    const handleHasWonAward = (val) => {
        setHasWonAward(val);
        console.log('hasWonAward handleHasWonAward', val, SIMULATION_ENGINE_STEPS.AWARD_DETAILS)
        updateWendogouser(val ? SIMULATION_ENGINE_STEPS.AWARD_DETAILS : SIMULATION_ENGINE_STEPS.HAS_WORK_EXPERIENCE, val)
    };
    
    const updateWendogouser = (simulationStep, hasWonAward) => {
        dispatch(setStep(simulationStep)) 
        let updatedUser = {...user, simulationStep, hasWonAward, date: new Date().toISOString()}
        helper.setLocalStorageWithExpiration('wendogouser', updatedUser, false)         
    }

    const handleContinue = () => {
        console.log('hasWonAward handleContinue', hasWonAward, SIMULATION_ENGINE_STEPS.AWARD_DETAILS)
        updateWendogouser(hasWonAward ? SIMULATION_ENGINE_STEPS.AWARD_DETAILS : SIMULATION_ENGINE_STEPS.HAS_WORK_EXPERIENCE, hasWonAward)
        //Todo updateWendogouser(, hasWonAward)
    }

    return (<SEYesNo title={`Avez-vous obtenu une recompense en ${formattedString} depuis ${oldestSchoolYear}`} id="HAS_WON_AWARD"
                    tip="Cela peut être un prix académique, sportif, artistique ou de toute autre nature, à condition qu'il puisse être justifié par un document officiel."
                    yes={hasWonAward} handleYes={handleHasWonAward} handleContinue={handleContinue} 
                    showContinueBtn={simulationStepGlobal === SIMULATION_ENGINE_STEPS.HAS_WON_AWARD} />);
}

export default HasWonAward;
