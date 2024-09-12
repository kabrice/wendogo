import { useState} from 'react';
import SE2DateInput from '../../components/SimulationEngine/SE2DateInput';    
import { useDispatch, useSelector } from 'react-redux'
import {setStep} from '../../redux/simulationStepSlice';
import {setProgress} from "../../redux/progressBarStepSlice";
import helper from '../../utils/Helper'; 
import {SIMULATION_ENGINE_STEPS, PROGRESS_BAR_STEPS} from '../../utils/Constants'

const PassportDetails = () => {
    const dispatch = useDispatch()
    let user = helper.getLocalStorageWithExpiration('wendogouser') 

    const simulationStepGlobal = useSelector((state) => state.simulationStep);

    const progressBarStep = useSelector((state) => state.progressBarStep); 
    const showContinueBtn = (simulationStepGlobal === SIMULATION_ENGINE_STEPS.PASSEPORT_DETAILS) || (progressBarStep === PROGRESS_BAR_STEPS.INFORMATIONS_VOYAGE) 

    const [startDay, setStartDay] = useState(user?.passportDetails?.startDate?.split('/')[0] || '');
    const [startMonth, setStartMonth] = useState(user?.passportDetails?.startDate?.split('/')[1] || '');
    const [startYear, setStartYear] = useState(user?.passportDetails?.startDate?.split('/')[2] || '');
    const [endDay, setEndDay] = useState(user?.passportDetails?.endDate?.split('/')[0] || '');
    const [endMonth, setEndMonth] = useState(user?.passportDetails?.endDate?.split('/')[1] || '');
    const [endYear, setEndYear] = useState(user?.passportDetails?.endDate?.split('/')[2] || '');
    const [validated] = useState(user?.passportDetails?.validated)
    const [isStartDateValid, setIsStartDateValid] = useState(user?.passportDetails?.validated);
    const [isEndDateValid, setIsEndDateValid] = useState(user?.passportDetails?.validated);
    const [isButtonClicked, setIsButtonClicked] = useState(false);

    const handleContinue = (passportDetails) => { 
        updateWendogouser(SIMULATION_ENGINE_STEPS.SALUTATION, passportDetails, PROGRESS_BAR_STEPS.COORDONNEES)
    }
    
    const updateWendogouser = (simulationStep, passportDetails, progressBarStep=PROGRESS_BAR_STEPS.INFORMATIONS_VOYAGE) => {
        dispatch(setStep(simulationStep)) 
        dispatch(setProgress(progressBarStep)) 
        let updatedUser = {...user, simulationStep, passportDetails, progressBarStep, date: new Date().toISOString()}
        helper.setLocalStorageWithExpiration('wendogouser', updatedUser, false)         
        window.location.hash = ""
        window.location.hash = "form/COORDONNEES";
    }

    const currentDate = new Date();
    
    return (
        <SE2DateInput title="Quelles sont les dates de validité de votre passeport ?" tip="Veuillez saisir les dates de validité de votre passeport." 
                      titleStartDate="Date de délivrance" 
                      titleEndDate="Date d'expiration" 
                      lastPossibleDate={currentDate.setFullYear(currentDate.getFullYear() + 20)}
                      isButtonClicked={isButtonClicked} setIsButtonClicked={setIsButtonClicked}
                      showContinueBtn={showContinueBtn} 
                      startDay={startDay} setStartDay={setStartDay} startMonth={startMonth} 
                      setStartMonth={setStartMonth} startYear={startYear} setStartYear={setStartYear} endDay={endDay} 
                      setEndDay={setEndDay} endMonth={endMonth} setEndMonth={setEndMonth} endYear={endYear} setEndYear={setEndYear} 
                      sendFormattedDateResultToParent={handleContinue} validated = {validated}
                      isStartDateValid={isStartDateValid} setIsStartDateValid={setIsStartDateValid} isEndDateValid={isEndDateValid} setIsEndDateValid={setIsEndDateValid}  />)
};

export default PassportDetails;
