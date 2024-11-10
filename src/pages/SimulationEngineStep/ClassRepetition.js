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

    const isInUniversityGlobal = useSelector((state) => state.university.active)
    //const isInUniversity = user.hasOwnProperty("schoolLevelSelected") ? (user.schoolLevelSelected === 'Supérieur') : isInUniversityGlobal

    const handleIncrement = () => {
        const newClassRepetitionNumber = classRepetitionNumber + 1; 
        setClassRepetitionNumber(newClassRepetitionNumber);
        updateWendogouser(SIMULATION_ENGINE_STEPS.CLASS_REPETITION, newClassRepetitionNumber)
    };

    const handleDecrement = () => {
        if (classRepetitionNumber > 0) {
            const newClassRepetitionNumber = classRepetitionNumber - 1;
            setClassRepetitionNumber(newClassRepetitionNumber);
            updateWendogouser(SIMULATION_ENGINE_STEPS.CLASS_REPETITION, newClassRepetitionNumber)
        }
    };

    const handleContinue = () => {
        // if(classRepetitionNumber >2){
        //     updateWendogouser(SIMULATION_ENGINE_STEPS.CLASS_REPETITION_WARNING, classRepetitionNumber)
        // }else{
        //     updateWendogouser(SIMULATION_ENGINE_STEPS.BLANK_YEAR_REPETITION, classRepetitionNumber)
        // }
        updateWendogouser(SIMULATION_ENGINE_STEPS.BLANK_YEAR_REPETITION, classRepetitionNumber)
    }

    const updateWendogouser = (simulationStep, classRepetitionNumber) => {
        dispatch(setStep(simulationStep)) 
        let updatedUser = {...user, simulationStep, classRepetitionNumber, date: new Date().toISOString()}
        helper.setLocalStorageWithExpiration('wendogouser', updatedUser)         
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
            return 'Vous avez redoublé combien de fois depuis la classe de seconde ?'
        }
        if(bacNumber>=3){
            return 'Vous avez redoublé combien de fois depuis le BAC+'+(bacNumber-2)+' ?'
        }
        return 'Vous avez redoublé combien de fois depuis le BAC?'
    }

    return (
        <NumberSelection number={classRepetitionNumber} handleIncrement={handleIncrement} handleDecrement={handleDecrement} 
                         title1={getValidLevelRepetitionStartText(user)} title2="Nombre de redoublement" 
                         handleContinue={handleContinue} showContinueBtn={simulationStepGlobal === SIMULATION_ENGINE_STEPS.CLASS_REPETITION}
                         modalTitle = "Quelques critères d'inéligibilité Campus France" modalParagraphs={CAMPUS_FRANCE_CRITERIA} modalIcon={<QuestionMark className="FrancoisImg image"/>} 
                         modalIsLiTag={true} displayQuestionTooltip={true} specialTextModal="* Critères valables dans la majorité des pays francophones."/>
    );

}

export default ClassRepetition;
