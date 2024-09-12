import React, { useState } from "react";
import SEYesNo from "../../components/SimulationEngine/SEYesNo";
import { useDispatch, useSelector } from 'react-redux'
import {setStep} from '../../redux/simulationStepSlice';
import helper from '../../utils/Helper';
import {SIMULATION_ENGINE_STEPS} from '../../utils/Constants'

const HasWorkExperience = () => {

    const dispatch = useDispatch()
    let user = helper.getLocalStorageWithExpiration('wendogouser')
    const simulationStepGlobal = useSelector((state) => state.simulationStep); 
    const [hasWorkExperience, setHasWorkExperience] = useState(user?.hasWorkExperience)

    const uniqueNames = [...new Set(user.mainSubjects.map(obj => `«${obj.name}»`))];

    let formattedString;
    if (uniqueNames.length > 1) {
        const lastTwoNames = uniqueNames.splice(-2);
        formattedString = [...uniqueNames, `${lastTwoNames[0]} ou ${lastTwoNames[1]}`].join(', ');
    } else {
        formattedString = `${uniqueNames[0]}`;
    }
    const oldestSchoolYear = user?.selectedSchoolYear1?.name || user?.selectedSchoolYear2?.name || user?.selectedSchoolYear3?.name;


    const handleHasWorkExperience = (val) => {
        setHasWorkExperience(val);
        updateWendogouser(val ? SIMULATION_ENGINE_STEPS.WORK_EXPERIENCE_DETAILS : SIMULATION_ENGINE_STEPS.ENGLISH_LEVEL, val)
    };
    
    
    const updateWendogouser = (simulationStep, hasWorkExperience) => {
        dispatch(setStep(simulationStep)) 
        let updatedUser = {...user, simulationStep, hasWorkExperience, date: new Date().toISOString()}
        helper.setLocalStorageWithExpiration('wendogouser', updatedUser, false)         
    }

    const handleContinue = () => { 
        updateWendogouser(hasWorkExperience ? SIMULATION_ENGINE_STEPS.WORK_EXPERIENCE_DETAILS : SIMULATION_ENGINE_STEPS.ENGLISH_LEVEL, hasWorkExperience)
    }

    return (<SEYesNo title={`Avez-vous une expérience professionnel en ${formattedString} depuis ${oldestSchoolYear-2}`} 
                    id="HAS_WORK_EXPERIENCE"
                    yes={hasWorkExperience} handleYes={handleHasWorkExperience} handleContinue={handleContinue} 
                    showContinueBtn={simulationStepGlobal === SIMULATION_ENGINE_STEPS.HAS_WORK_EXPERIENCE} />);
}

export default HasWorkExperience;
