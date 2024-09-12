import React, { useState } from "react";
import SEYesNo from "../../components/SimulationEngine/SEYesNo";
import { useDispatch, useSelector } from 'react-redux'
import {setStep} from '../../redux/simulationStepSlice';
import helper from '../../utils/Helper';
import {SIMULATION_ENGINE_STEPS} from '../../utils/Constants'

const AlreadyTraveledToFrance = () => {

    const dispatch = useDispatch()
    let user = helper.getLocalStorageWithExpiration('wendogouser')
    const simulationStepGlobal = useSelector((state) => state.simulationStep);
    const [alreadyTraveledToFrance, setAlreadyTraveledToFrance] = useState(user?.alreadyTraveledToFrance)

    const handleAlreadyTraveledToFrance = (val) => {
        setAlreadyTraveledToFrance(val);
        updateWendogouser(val? SIMULATION_ENGINE_STEPS.LAST_FRANCE_TRAVEL_DETAILS : SIMULATION_ENGINE_STEPS.HAS_PASSEPORT, val)
    };

    const updateWendogouser = (simulationStep, alreadyTraveledToFrance) => {
        dispatch(setStep(simulationStep)) 
        let updatedUser = {...user, simulationStep, alreadyTraveledToFrance, date: new Date().toISOString()}
        helper.setLocalStorageWithExpiration('wendogouser', updatedUser, false)         
    }

    const handleContinue = () => {
        updateWendogouser(alreadyTraveledToFrance? SIMULATION_ENGINE_STEPS.LAST_FRANCE_TRAVEL_DETAILS : SIMULATION_ENGINE_STEPS.HAS_PASSEPORT, alreadyTraveledToFrance)
    }

    return (<SEYesNo title={`Vous êtes-vous déjà rendu en France ?`} id="ALREADY_TRAVELED_TO_FRANCE"
                    yes={alreadyTraveledToFrance} handleYes={handleAlreadyTraveledToFrance} handleContinue={handleContinue} 
                    showContinueBtn={simulationStepGlobal === SIMULATION_ENGINE_STEPS.ALREADY_TRAVELED_TO_FRANCE} />);
}

export default AlreadyTraveledToFrance;
