import React, { useState } from "react";
import SELevelRail from "../../components/SimulationEngine/SELevelRail";
import { useDispatch, useSelector } from 'react-redux'
import {setStep} from '../../redux/simulationStepSlice';
import helper from '../../utils/Helper';
import {SIMULATION_ENGINE_STEPS} from '../../utils/Constants'

const OtherLanguageLevel = () => {

    const dispatch = useDispatch()
    let user = helper.getLocalStorageWithExpiration('wendogouser')
    const simulationStepGlobal = useSelector((state) => state.simulationStep);
    const [selectedOtherLanguageLevel, setSelectedOtherLanguageLevel] = useState(user?.selectedOtherLanguageLevel || 20)
    const OtherLanguageLevels = [
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
        if(simulationStepGlobal === SIMULATION_ENGINE_STEPS.OTHER_LANGUAGE_LEVEL){
          const levels = ['Débutant', 'Élémentaire', 'Intermédiaire', 'Intermédiaire avancé', 'Avancé', 'Maîtrise'];
          //console.log('valueLabelFormat', value)
          setSelectedOtherLanguageLevel(value)
          return levels[value / 20];  
        }
      }

      function handleChange() {
        updateWendogouser(SIMULATION_ENGINE_STEPS.OTHER_LANGUAGE_LEVEL)
      }

      function valuetext(value) { 
        return `${value} - C2`;
      }

      const updateWendogouser = (simulationStep, selectedOtherLanguageLevel) => {
        dispatch(setStep(simulationStep)) 
        let updatedUser = {...user, simulationStep, selectedOtherLanguageLevel, date: new Date().toISOString()}
        helper.setLocalStorageWithExpiration('wendogouser', updatedUser)         
      }

      const handleContinue = () => {  
        updateWendogouser(selectedOtherLanguageLevel >= 40 ? SIMULATION_ENGINE_STEPS.CAN_JUSTIFY_OTHER_LANGUAGE : SIMULATION_ENGINE_STEPS.ALREADY_TRAVELED_TO_FRANCE, selectedOtherLanguageLevel)
      }
  return (
    <SELevelRail id={'OTHER_LANGUAGE_LEVEL'} title={`Comment évaluer votre niveau en ${user?.selectedOtherSpokenLanguage?.name} ?`} arialLabel="Other Language Level" defaultValue={selectedOtherLanguageLevel}  
                 handleChange={handleChange} marks={OtherLanguageLevels} step = {20} valuetext={valuetext} valueLabelFormat={valueLabelFormat} 
                 handleContinue={handleContinue} showContinueBtn={simulationStepGlobal === SIMULATION_ENGINE_STEPS.OTHER_LANGUAGE_LEVEL} />
  );
}

export default OtherLanguageLevel;
