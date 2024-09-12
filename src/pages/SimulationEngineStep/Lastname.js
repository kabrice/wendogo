import React, { useState} from 'react';
import SETextInput from "../../components/SimulationEngine/SETextInput";
import { useDispatch, useSelector } from 'react-redux'
import {setStep} from '../../redux/simulationStepSlice';
import helper from '../../utils/Helper';
import {SIMULATION_ENGINE_STEPS} from '../../utils/Constants'

const Lastname = () => {


    const dispatch = useDispatch()
    let user = helper.getLocalStorageWithExpiration('wendogouser')
    const [lastname, setLastname] = useState((user?.lastname === 'guest'? '' : user?.lastname) || '');
    const simulationStepGlobal = useSelector((state) => state.simulationStep);

    const doesValid = (lastname) => {
        return lastname !== undefined && lastname.trim().length >= 3 && /[a-zA-Z].*[a-zA-Z]/.test(lastname);
      }
      
    const [valid, setValid] = useState(doesValid());

    const handleChange = (e) => {
        const lastname = e.target.value;
        setLastname(lastname);
        updateWendogouser(SIMULATION_ENGINE_STEPS.LASTNAME, lastname)
    };   

    const handleContinue = () => {
        updateWendogouser(SIMULATION_ENGINE_STEPS.NATIONALITY, lastname)
    }

    const updateWendogouser = (simulationStep, lastname) => {
        dispatch(setStep(simulationStep)) 
        let updatedUser = {...user, simulationStep, lastname, date: new Date().toISOString()}
        helper.setLocalStorageWithExpiration('wendogouser', updatedUser, false)         
    }

    return (
        <SETextInput title="Quel est votre nom ?" id="LASTNAME" autoComplete="on"
                    handleChange={handleChange} value={lastname} inputLength={64} 
                    valid={valid} setValid={setValid} onClickOutside={doesValid}
                   handleContinue={handleContinue} showContinueBtn={simulationStepGlobal === SIMULATION_ENGINE_STEPS.LASTNAME}/>
    );
}

export default Lastname;
