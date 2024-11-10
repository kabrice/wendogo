import React, { useState} from 'react';
import SETextInput from "../../components/SimulationEngine/SETextInput";
import { useDispatch, useSelector } from 'react-redux'
import {setStep} from '../../redux/simulationStepSlice';
import helper from '../../utils/Helper';
import {SIMULATION_ENGINE_STEPS} from '../../utils/Constants'

const Firstname = () => {


    const dispatch = useDispatch()
    let user = helper.getLocalStorageWithExpiration('wendogouser')
    const [firstname, setFirstname] = useState(user?.firstname || '');
    const simulationStepGlobal = useSelector((state) => state.simulationStep);

    const doesValid = (firstname) => {
        return firstname !== undefined && firstname.trim().length >= 3 && /[a-zA-Z].*[a-zA-Z]/.test(firstname);
      }
      
    const [valid, setValid] = useState(doesValid());

    const handleChange = (e) => {
        const firstname = e.target.value;
        setFirstname(firstname);
        updateWendogouser(SIMULATION_ENGINE_STEPS.FIRSTNAME, firstname)
    };   

    const handleContinue = () => {
        updateWendogouser(SIMULATION_ENGINE_STEPS.LASTNAME, firstname)
    }

    const updateWendogouser = (simulationStep, firstname) => {
        dispatch(setStep(simulationStep)) 
        let updatedUser = {...user, simulationStep, firstname, date: new Date().toISOString()}
        helper.setLocalStorageWithExpiration('wendogouser', updatedUser)         
    }

    return (
        <SETextInput title="Quel est votre prénom ?" id="FIRSTNAME" autoComplete="on"
                    handleChange={handleChange} value={firstname} inputLength={64} 
                    valid={valid} setValid={setValid} onClickOutside={doesValid}
                   handleContinue={handleContinue} showContinueBtn={simulationStepGlobal === SIMULATION_ENGINE_STEPS.FIRSTNAME}/>
    );
}

export default Firstname;
