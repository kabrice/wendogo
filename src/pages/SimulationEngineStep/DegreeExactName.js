import React, { useState} from 'react';
import SETextInput from "../../components/SimulationEngine/SETextInput";
import { useDispatch, useSelector } from 'react-redux'
import {setStep} from '../../redux/simulationStepSlice';
import helper from '../../utils/Helper';
import {SIMULATION_ENGINE_STEPS} from '../../utils/Constants'

const DegreeExactName = () => {


    const dispatch = useDispatch()
    let user = helper.getLocalStorageWithExpiration('wendogouser')
    const [degreeExactNameValue, setDegreeExactNameValue] = useState(user?.degreeExactNameValue || '');
    const simulationStepGlobal = useSelector((state) => state.simulationStep);
    //const isInUniversityGlobal = useSelector((state) => state.university.active)

    const doesValueValid = (degreeExactNameValue) => {
        return degreeExactNameValue !== undefined && degreeExactNameValue.trim().length >= 3 && /[a-zA-Z].*[a-zA-Z]/.test(degreeExactNameValue);
      }
      
    const [valid, setValid] = useState(doesValueValid());

    const handleChange = (e) => {
        const inputValue = e.target.value;
        setDegreeExactNameValue(inputValue);
        updateWendogouser(SIMULATION_ENGINE_STEPS.DEGREE_EXACT_NAME, inputValue)
    };   

    const handleContinue = () => {
        //updateWendogouser(isInUniversityGlobal ? SIMULATION_ENGINE_STEPS.CLASS_REPETITION : SIMULATION_ENGINE_STEPS.MAIN_SUBJECTS, degreeExactNameValue)
        updateWendogouser( SIMULATION_ENGINE_STEPS.CLASS_REPETITION, degreeExactNameValue)
    }

    const updateWendogouser = (simulationStep, degreeExactNameValue) => {
        dispatch(setStep(simulationStep)) 
        let updatedUser = {...user, simulationStep, degreeExactNameValue, date: new Date().toISOString()}
         // Cas exceptionnel : ProgramDomain est null, car on veut clean cette valeur dans l'etape suivante
        if(user.degreeExactNameValue !== degreeExactNameValue ){
            updatedUser = {...updatedUser, programDomainObj:null}
        }
        helper.setLocalStorageWithExpiration('wendogouser', updatedUser)         
    }

    return (
        <SETextInput title="Intitulé exact du diplôme ou du programme suivi" tip=" Veuillez vous assurer de bien écrire l'intitulé de ce diplôme, 
                                                             car l'algorithme l'utilisera pour vous proposer les écoles les plus adaptées à votre profil."
                    handleChange={handleChange} value={degreeExactNameValue} inputLength={255} 
                    autoComplete="off"
                    valid={valid} setValid={setValid} onClickOutside={doesValueValid}
                   handleContinue={handleContinue} showContinueBtn={simulationStepGlobal === SIMULATION_ENGINE_STEPS.DEGREE_EXACT_NAME}/>
    );
}

export default DegreeExactName;
