import React, { useState } from "react";
import SELevelRail from "../../components/SimulationEngine/SELevelRail";
import { useDispatch, useSelector } from 'react-redux'
import {setStep} from '../../redux/simulationStepSlice';
import helper from '../../utils/Helper';
import {SIMULATION_ENGINE_STEPS} from '../../utils/Constants'

const EnglishLevel = () => {

    const dispatch = useDispatch()
    let user = helper.getLocalStorageWithExpiration('wendogouser')
    const simulationStepGlobal = useSelector((state) => state.simulationStep);
    const [selectedEnglishLevel, setSelectedEnglishLevel] = useState(user?.selectedEnglishLevel || 20)
    const EnglishLevels = [
        {
            value: 0,
            label: 'A1',
        },
        {
            value: 20,
            label: 'A2',
        },
        {
            value: 40,
            label: 'B1',
        },
        {
            value: 60,
            label: 'B2',
        },
        {
            value:  80,
            label: 'C1',
        },
        {
            value: 100,
            label: 'C2',
        }
      ];

      function valueLabelFormat(value) {
        if(simulationStepGlobal === SIMULATION_ENGINE_STEPS.ENGLISH_LEVEL){
          const levels = ['Débutant', 'Élémentaire', 'Intermédiaire', 'Intermédiaire avancé', 'Avancé', 'Maîtrise'];
          console.log('valueLabelFormat', value)
          setSelectedEnglishLevel(value)
          return levels[value / 20];  
        }
      }

      function handleChange(event, newValue) {
        updateWendogouser(SIMULATION_ENGINE_STEPS.ENGLISH_LEVEL)
      }

      function valuetext(value) {
        //console.log(value);
        return `${value} - C2`;
      }

      const updateWendogouser = (simulationStep, selectedEnglishLevel) => {
        dispatch(setStep(simulationStep)) 
        let updatedUser = {...user, simulationStep, selectedEnglishLevel, date: new Date().toISOString()}
        helper.setLocalStorageWithExpiration('wendogouser', updatedUser)         
      }

      const handleContinue = () => {  
        updateWendogouser(selectedEnglishLevel >= 40 ? SIMULATION_ENGINE_STEPS.CAN_JUSTIFY_ENGLISH_LEVEL : SIMULATION_ENGINE_STEPS.OTHER_SPOKEN_LANGUAGE, selectedEnglishLevel)
      }
  return (
    <SELevelRail id={'ENGLISH_LEVEL'} title="Comment évaluer votre niveau en anglais ?" arialLabel="English Level" defaultValue={selectedEnglishLevel}  svgConstantName="ENGLISH"
                 handleChange={handleChange} marks={EnglishLevels} step = {20} valuetext={valuetext} valueLabelFormat={valueLabelFormat} 
                 handleContinue={handleContinue} showContinueBtn={simulationStepGlobal === SIMULATION_ENGINE_STEPS.ENGLISH_LEVEL} />
  );
}

export default EnglishLevel;
