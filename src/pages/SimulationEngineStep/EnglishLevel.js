import React, { useState, useEffect } from "react";
import SELevelRail from "../../components/SimulationEngine/SELevelRail";
import { useDispatch, useSelector } from 'react-redux';
import { setStep } from '../../redux/simulationStepSlice';
import helper from '../../utils/Helper';
import { SIMULATION_ENGINE_STEPS } from '../../utils/Constants';
import { Loader2 } from "lucide-react";
import { setUser } from '../../redux/userSlice';

const ENGLISH_LEVELS = [
    { value: 0, label: 'A1' },
    { value: 20, label: 'A2' },
    { value: 40, label: 'B1' },
    { value: 60, label: 'B2' },
    { value: 80, label: 'C1' },
    { value: 100, label: 'C2' }
];

const LEVEL_DESCRIPTIONS = [
    'Débutant',
    'Élémentaire',
    'Intermédiaire',
    'Intermédiaire avancé',
    'Avancé',
    'Maîtrise'
];

const EnglishLevel = () => {
    const [isLoading, setIsLoading] = useState(true);
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const simulationStepGlobal = useSelector((state) => state.simulationStep);
    const [selectedEnglishLevel, setSelectedEnglishLevel] = useState(20); // Default to A2

    // Load user data on component mount
    useEffect(() => {
        const loadUserData = () => {
            
            if (user) {
                
                setSelectedEnglishLevel(user?.selectedEnglishLevel || 20);
            }
            setIsLoading(false);
        };

        loadUserData();
    }, []);

    const updateWendogouser = (simulationStep, selectedEnglishLevel) => {
        if (!user) return;

        dispatch(setStep(simulationStep));
        const updatedUser = {
            ...user,
            simulationStep,
            selectedEnglishLevel,
            date: new Date().toISOString()
        };
        helper.setLocalStorageWithExpiration('wendogouser', updatedUser);
        dispatch(setUser(updatedUser));
    };

    const valueLabelFormat = (value) => {
        if (simulationStepGlobal === SIMULATION_ENGINE_STEPS.ENGLISH_LEVEL) {
            setSelectedEnglishLevel(value);
            return LEVEL_DESCRIPTIONS[value / 20];
        }
        return '';
    };

    const handleChange = () => {
        updateWendogouser(SIMULATION_ENGINE_STEPS.ENGLISH_LEVEL, selectedEnglishLevel);
    };

    const valuetext = (value) => `${value} - C2`;

    const handleContinue = () => {
        const nextStep = selectedEnglishLevel >= 40 
            ? SIMULATION_ENGINE_STEPS.CAN_JUSTIFY_ENGLISH_LEVEL 
            : SIMULATION_ENGINE_STEPS.OTHER_SPOKEN_LANGUAGE;
            
        updateWendogouser(nextStep, selectedEnglishLevel);
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
        <SELevelRail 
            id="ENGLISH_LEVEL"
            title="Comment évaluer votre niveau en anglais ?"
            arialLabel="English Level"
            defaultValue={selectedEnglishLevel}
            svgConstantName="ENGLISH"
            handleChange={handleChange}
            marks={ENGLISH_LEVELS}
            step={20}
            valuetext={valuetext}
            valueLabelFormat={valueLabelFormat}
            handleContinue={handleContinue}
            showContinueBtn={simulationStepGlobal === SIMULATION_ENGINE_STEPS.ENGLISH_LEVEL}
        />
    );
};

export default EnglishLevel;
