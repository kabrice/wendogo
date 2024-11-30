'use client';

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
    const [selectedEnglishLevel, setSelectedEnglishLevel] = useState(user?.selectedEnglishLevel); 

    useEffect(() => {
      const loadUserData = () => {
          if (user) {
              setSelectedEnglishLevel(user?.selectedEnglishLevel || 20);
          }
          setIsLoading(false);
        };
        loadUserData();
    }, []);

    function valueLabelFormat(value) {
      return LEVEL_DESCRIPTIONS[value / 20]; // Pure formatting, no state update
    }
  

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
 
    const handleChange = (event, value) => {
      console.log('valuejjj', value)
      setSelectedEnglishLevel(value);
      updateWendogouser(SIMULATION_ENGINE_STEPS.ENGLISH_LEVEL, value);
    }
  //   const handleChange = (event, value) => {
  //     setSelectedEnglishLevel(value); // Update the state here
  // };

    const valuetext = (value) => `${value} - C2`;

    const handleContinue = () => {
        const nextStep = selectedEnglishLevel >= 40 
            ? SIMULATION_ENGINE_STEPS.CAN_JUSTIFY_ENGLISH_LEVEL 
            : SIMULATION_ENGINE_STEPS.OTHER_SPOKEN_LANGUAGE;
            
        updateWendogouser(nextStep, selectedEnglishLevel);
    };

 

    if (isLoading || !user) {
      return <div className="flex items-center justify-center min-h-[200px]">
                    <Loader2 className="w-8 h-8 animate-spin" />
              </div>; 
  }

    return (
        <SELevelRail 
            id="ENGLISH_LEVEL"
            title="Comment évaluez-vous votre niveau en anglais ?"
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
