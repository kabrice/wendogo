import { useState, useEffect, useRef} from 'react';
import SE2DateInput from '../../components/SimulationEngine/SE2DateInput';   
//import SEDateInput from '../../components/SimulationEngine/SEDateInput';
import { useDispatch, useSelector } from 'react-redux'
import {setStep} from '../../redux/simulationStepSlice';
import helper from '../../utils/Helper'; 
import {SIMULATION_ENGINE_STEPS} from '../../utils/Constants'

const LastFranceTravelDetails = () => {
    const dispatch = useDispatch()
    let user = helper.getLocalStorageWithExpiration('wendogouser') 

    const simulationStepGlobal = useSelector((state) => state.simulationStep);
    const [startDay, setStartDay] = useState(user?.frenchTravelDate?.startDate?.split('/')[0] || '');
    const [startMonth, setStartMonth] = useState(user?.frenchTravelDate?.startDate?.split('/')[1] || '');
    const [startYear, setStartYear] = useState(user?.frenchTravelDate?.startDate?.split('/')[2] || '');
    const [endDay, setEndDay] = useState(user?.frenchTravelDate?.endDate?.split('/')[0] || '');
    const [endMonth, setEndMonth] = useState(user?.frenchTravelDate?.endDate?.split('/')[1] || '');
    const [endYear, setEndYear] = useState(user?.frenchTravelDate?.endDate?.split('/')[2] || '');
    const [validated] = useState(user?.frenchTravelDate?.validated)
    const [isStartDateValid, setIsStartDateValid] = useState(user?.frenchTravelDate?.validated);
    const [isEndDateValid, setIsEndDateValid] = useState(user?.frenchTravelDate?.validated);
    const [isButtonClicked, setIsButtonClicked] = useState(false);

    const handleContinue = (frenchTravelDate) => { 
        updateWendogouser(SIMULATION_ENGINE_STEPS.HAS_PASSEPORT, frenchTravelDate)
    }

    const updateWendogouser = (simulationStep, frenchTravelDate) => {
        dispatch(setStep(simulationStep)) 
        let updatedUser = {...user, simulationStep, frenchTravelDate, date: new Date().toISOString()}
        helper.setLocalStorageWithExpiration('wendogouser', updatedUser, false)         
    }

    return (
        <SE2DateInput title="Quand a eu lieu votre dernier voyage en France ?" tip="Veuillez saisir les dates d'arrivée et de départ du séjour le plus récent." 
                        isButtonClicked={isButtonClicked} setIsButtonClicked={setIsButtonClicked}
                      showContinueBtn={simulationStepGlobal === SIMULATION_ENGINE_STEPS.LAST_FRANCE_TRAVEL_DETAILS} startDay={startDay} setStartDay={setStartDay} startMonth={startMonth} 
                      setStartMonth={setStartMonth} startYear={startYear} setStartYear={setStartYear} endDay={endDay} 
                      setEndDay={setEndDay} endMonth={endMonth} setEndMonth={setEndMonth} endYear={endYear} setEndYear={setEndYear} 
                      sendFormattedDateResultToParent={handleContinue} validated = {validated}
                      isStartDateValid={isStartDateValid} setIsStartDateValid={setIsStartDateValid} isEndDateValid={isEndDateValid} setIsEndDateValid={setIsEndDateValid}  />)
};

export default LastFranceTravelDetails;
