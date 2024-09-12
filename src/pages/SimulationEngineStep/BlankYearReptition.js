import NumberSelection from "../../components/SimulationEngine/SENumberSelection";
import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import {setStep} from '../../redux/simulationStepSlice';
import helper from '../../utils/Helper';
import {ReactComponent as QuestionMark} from './../../assets/simulation_icons/question_mark.svg'
import {CAMPUS_FRANCE_CRITERIA, SIMULATION_ENGINE_STEPS} from '../../utils/Constants'

const BlankYearReptition = () => {

    const dispatch = useDispatch()
    let user = helper.getLocalStorageWithExpiration('wendogouser')

    const simulationStepGlobal = useSelector((state) => state.simulationStep);
    const isInUniversityGlobal = useSelector((state) => state.university.active)

    const [blankYearRepetitionNumber, setblankYearRepetitionNumber] = useState(user?.blankYearRepetitionNumber || 0)
    
    const handleIncrement = () => {
        console.log('handleIncrement')
        const newBlankYearRepetitionNumber = blankYearRepetitionNumber + 1;
        setblankYearRepetitionNumber(newBlankYearRepetitionNumber);
        updateWendogouser(SIMULATION_ENGINE_STEPS.BLANK_YEAR_REPETITION, newBlankYearRepetitionNumber)
    };

    const handleDecrement = () => {
        console.log('handleDecrement')
        if (blankYearRepetitionNumber > 0) {
            const newBlankYearRepetitionNumber = blankYearRepetitionNumber - 1;
            setblankYearRepetitionNumber(newBlankYearRepetitionNumber);
            updateWendogouser(SIMULATION_ENGINE_STEPS.BLANK_YEAR_REPETITION, newBlankYearRepetitionNumber)
        }
    };

    const handleContinue = () => {
        if(blankYearRepetitionNumber >=2){
            updateWendogouser(SIMULATION_ENGINE_STEPS.BLANK_YEAR_REPETITION_WARNING, blankYearRepetitionNumber)
        }else{
            updateWendogouser(SIMULATION_ENGINE_STEPS.COULD_PAY_TUITION, blankYearRepetitionNumber)
        }
    }

    const updateWendogouser = (simulationStep, blankYearRepetitionNumber) => {
        dispatch(setStep(simulationStep)) 
        let updatedUser = {...user, simulationStep, blankYearRepetitionNumber, date: new Date().toISOString()}
        helper.setLocalStorageWithExpiration('wendogouser', updatedUser, false)         
    }
    
    const getValidLevelRepetitionStartText = (user) => {
        let bacNumber = 0
        if(isInUniversityGlobal){
            bacNumber = user.universityLevelSelected.name.slice(-1) 
        }else if(user.hsLevelSelected === 'deg00002'){
            bacNumber = -2
        }else if(user.hsLevelSelected === 'deg00003'){
            bacNumber = -1
        }
        if(bacNumber===-1 || bacNumber===-2){
            return 'la classe de seconde'
        }
        if(bacNumber>=3){
            return 'BAC+'+(bacNumber-2)
        }
        return 'le BAC'
    }
    
    return (
        <NumberSelection number={blankYearRepetitionNumber} handleIncrement={handleIncrement} handleDecrement={handleDecrement} 
                         title1={`Depuis ${getValidLevelRepetitionStartText(user)}, combien d'années n'avez-vous pas été scolarisé ou avez-vous eu une interruption dans vos études`} 
                         title2="Nombre d'années blanches" handleContinue={handleContinue} showContinueBtn={simulationStepGlobal === SIMULATION_ENGINE_STEPS.BLANK_YEAR_REPETITION} 
                         modalTitle = "Quelques critères d'inéligibilité Campus France" modalParagraphs={CAMPUS_FRANCE_CRITERIA} modalIcon={<QuestionMark className="FrancoisImg image"/>} 
                         modalIsLiTag={true} displayQuestionTooltip={true} specialTextModal="* Critères valables dans la majorité des pays francophones."/>
    );
}

export default BlankYearReptition;
