import React, { useState, useEffect } from "react";
import NumberSelection from "../../components/SimulationEngine/SENumberSelection";
import { useDispatch, useSelector } from 'react-redux';
import { setStep } from '../../redux/simulationStepSlice';
import helper from '../../utils/Helper';
import QuestionMark from './../../assets/simulation_icons/question_mark.svg';
import { CAMPUS_FRANCE_CRITERIA, SIMULATION_ENGINE_STEPS } from '../../utils/Constants';
import { Loader2 } from "lucide-react";
import { setUser } from '../../redux/userSlice';

const ClassRepetition = () => {
    const [isLoading, setIsLoading] = useState(true);
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    
    // Redux selectors
    const simulationStepGlobal = useSelector((state) => state.simulationStep);
    const isInUniversityGlobal = useSelector((state) => state.university.active);
    
    // Local state
    const [classRepetitionNumber, setClassRepetitionNumber] = useState(0);

    // Load user data on component mount
    useEffect(() => {
        const loadUserData = () => {
            
            if (user) {
                
                setClassRepetitionNumber(user?.classRepetitionNumber || 0);
            }
            setIsLoading(false);
        };

        loadUserData();
    }, []);

    const updateWendogouser = (simulationStep, classRepetitionNumber) => {
        if (!user) return;

        dispatch(setStep(simulationStep));
        const updatedUser = {
            ...user,
            simulationStep,
            classRepetitionNumber,
            date: new Date().toISOString()
        };
        helper.setLocalStorageWithExpiration('wendogouser', updatedUser);
        dispatch(setUser(updatedUser));
    };

    const handleIncrement = () => {
        const newClassRepetitionNumber = classRepetitionNumber + 1;
        setClassRepetitionNumber(newClassRepetitionNumber);
        updateWendogouser(SIMULATION_ENGINE_STEPS.CLASS_REPETITION, newClassRepetitionNumber);
    };

    const handleDecrement = () => {
        if (classRepetitionNumber > 0) {
            const newClassRepetitionNumber = classRepetitionNumber - 1;
            setClassRepetitionNumber(newClassRepetitionNumber);
            updateWendogouser(SIMULATION_ENGINE_STEPS.CLASS_REPETITION, newClassRepetitionNumber);
        }
    };

    const handleContinue = () => {
        updateWendogouser(
            SIMULATION_ENGINE_STEPS.BLANK_YEAR_REPETITION,
            classRepetitionNumber
        );
    };

    const getValidLevelRepetitionStartText = (user) => {
        if (!user) return '';

        let bacNumber = 0;
        if (isInUniversityGlobal) {
            bacNumber = user?.universityLevelSelected?.name?.slice(-1);
        } else if (user?.hsLevelSelected === 'deg00002') {
            bacNumber = -2;
        } else if (user?.hsLevelSelected === 'deg00003') {
            bacNumber = -1;
        }

        if (bacNumber === -1 || bacNumber === -2) {
            return 'Vous avez redoublé combien de fois depuis la classe de seconde ?';
        }
        if (bacNumber >= 3) {
            return `Vous avez redoublé combien de fois depuis le BAC+${bacNumber-2} ?`;
        }
        return 'Vous avez redoublé combien de fois depuis le BAC?';
    };

    if (isLoading) {
        return <div className="flex items-center justify-center min-h-[200px]">
                    <Loader2 className="w-8 h-8 animate-spin" />
               </div>; 
    }

    if (!user) {
        return <div className="flex items-center justify-center min-h-[200px]">
                    <Loader2 className="w-8 h-8 animate-spin" />
               </div>; 
    }

    return (
        <NumberSelection 
            number={classRepetitionNumber}
            handleIncrement={handleIncrement}
            handleDecrement={handleDecrement}
            title1={getValidLevelRepetitionStartText(user)}
            title2="Nombre de redoublement"
            handleContinue={handleContinue}
            showContinueBtn={simulationStepGlobal === SIMULATION_ENGINE_STEPS.CLASS_REPETITION}
            modalTitle="Quelques critères d'inéligibilité Campus France"
            modalParagraphs={CAMPUS_FRANCE_CRITERIA}
            modalIcon={<QuestionMark className="FrancoisImg image" />}
            modalIsLiTag={true}
            displayQuestionTooltip={true}
            specialTextModal="* Critères valables dans la majorité des pays francophones."
        />
    );
};

export default ClassRepetition;
