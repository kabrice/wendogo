import NumberSelection from "../../components/SimulationEngine/SENumberSelection";
import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import {setStep} from '../../redux/simulationStepSlice';
import helper from '../../utils/Helper';
import {ReactComponent as QuestionMark} from './../../assets/simulation_icons/question_mark.svg'
import {CAMPUS_FRANCE_CRITERIA, SIMULATION_ENGINE_STEPS} from '../../utils/Constants'

const ClassRepetition = () => {

    const dispatch = useDispatch()
    let user = helper.getLocalStorageWithExpiration('wendogouser')
    const simulationStepGlobal = useSelector((state) => state.simulationStep);
    const [classRepetitionNumber, setClassRepetitionNumber] = useState(user?.classRepetitionNumber || 0)
    
    const handleIncrement = () => {
        setClassRepetitionNumber(classRepetitionNumber + 1);
        updateWendogouser(SIMULATION_ENGINE_STEPS.CLASS_REPETITION, classRepetitionNumber + 1)
    };

    const handleDecrement = () => {
        if (classRepetitionNumber > 0) {
            setClassRepetitionNumber(classRepetitionNumber - 1);
            updateWendogouser(SIMULATION_ENGINE_STEPS.CLASS_REPETITION, classRepetitionNumber - 1)
        }
    };

    const handleContinue = () => {
        if(classRepetitionNumber >=2){
            updateWendogouser(SIMULATION_ENGINE_STEPS.CLASS_REPETITION_WARNING, classRepetitionNumber)
        }else{
            updateWendogouser(SIMULATION_ENGINE_STEPS.BLANK_YEAR_REPETITION, classRepetitionNumber)
        }
    }

    const updateWendogouser = (simulationStep, classRepetitionNumber) => {
        dispatch(setStep(simulationStep)) 
        let updatedUser = {...user, simulationStep, classRepetitionNumber, date: new Date().toISOString()}
        helper.setLocalStorageWithExpiration('wendogouser', updatedUser, false)         
    }

    const getValidLevelRepetitionStart = (user) => {
        let bacNumber = user.universityLevelSelected.name.slice(-1)

        if(bacNumber>=3){
            return '+'+(bacNumber-2)
        }
        return ''
    }
    return (
        <NumberSelection number={classRepetitionNumber} handleIncrement={handleIncrement} handleDecrement={handleDecrement} 
                         title1={`Vous avez redoublé combien de fois depuis le BAC${getValidLevelRepetitionStart(user)} ?`} title2="Nombre de redoublement" 
                         handleContinue={handleContinue} showContinueBtn={simulationStepGlobal === SIMULATION_ENGINE_STEPS.CLASS_REPETITION}
                         modalTitle = "Quelques critères d'inéligibilité Campus France" modalParagraphs={CAMPUS_FRANCE_CRITERIA} modalIcon={<QuestionMark className="FrancoisImg image"/>} 
                         modalIsLiTag={true} displayQuestionTooltip={true} specialTextModal="* Critères valables dans la majorité des pays francophones."/>
    );
}

export default ClassRepetition;
