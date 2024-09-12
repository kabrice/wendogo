import React, { useState } from "react";
import SELevelRail from "../../components/SimulationEngine/SELevelRail";
import { useDispatch, useSelector } from 'react-redux'
import {setStep} from '../../redux/simulationStepSlice';
import {setProgress} from "../../redux/progressBarStepSlice";
import helper from '../../utils/Helper';
import {SIMULATION_ENGINE_STEPS, PROGRESS_BAR_STEPS} from '../../utils/Constants'

const FrenchLevel = () => {

    const dispatch = useDispatch()
    let user = helper.getLocalStorageWithExpiration('wendogouser')
    const simulationStepGlobal = useSelector((state) => state.simulationStep);
    const progressBarStep = useSelector((state) => state.progressBarStep);
    const [selectedFrenchLevel, setSelectedFrenchLevel] = useState(user?.selectedFrenchLevel || 20)
    const showContinueBtn = (simulationStepGlobal === SIMULATION_ENGINE_STEPS.FRENCH_LEVEL) || (progressBarStep === PROGRESS_BAR_STEPS.GENERALITES_SUR_LES_VISAS_ET_LES_ETUDES)

    const frenchLevels = [
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
        if(simulationStepGlobal === SIMULATION_ENGINE_STEPS.FRENCH_LEVEL){
          const levels = ['Débutant', 'Élémentaire', 'Intermédiaire', 'Intermédiaire avancé', 'Avancé', 'Maîtrise'];
          console.log('valueLabelFormat', value)
          setSelectedFrenchLevel(value)
          return levels[value / 20];  
        }
      }

      function handleChange(event, newValue) {
        updateWendogouser(SIMULATION_ENGINE_STEPS.FRENCH_LEVEL)
      }

      function valuetext(value) {
        //console.log(value);
        return `${value} - C2`;
      }

      const updateWendogouser = (simulationStep, selectedFrenchLevel, progressBarStep=PROGRESS_BAR_STEPS.GENERALITES_SUR_LES_VISAS_ET_LES_ETUDES) => {
        dispatch(setStep(simulationStep)) 
        dispatch(setProgress(progressBarStep)) 
        let updatedUser = {...user, simulationStep, selectedFrenchLevel, progressBarStep, date: new Date().toISOString()}
        helper.setLocalStorageWithExpiration('wendogouser', updatedUser, false)         
      }

      const handleContinue = () => {
        //console.log('selectedFrenchLevel === 😍😍 ', selectedFrenchLevel, SIMULATION_ENGINE_STEPS.IS_YEAR_3_RESULTS_AVAILABLE)
        updateWendogouser(SIMULATION_ENGINE_STEPS.IS_YEAR_3_RESULTS_AVAILABLE, selectedFrenchLevel, PROGRESS_BAR_STEPS.BULLETIN_LE_PLUS_RECENT)
        window.location.hash = ""
        window.location.hash = "form/GENERALITES_SUR_LES_VISAS_ET_LES_ETUDES";
      }
  return (
    <SELevelRail title="Comment évaluer votre niveau de langue française ?" arialLabel="French Level" defaultValue={selectedFrenchLevel}  handleChange={handleChange}
                 marks={frenchLevels} step = {20} valuetext={valuetext} valueLabelFormat={valueLabelFormat} handleContinue={handleContinue} showContinueBtn={showContinueBtn} />
  );
}

export default FrenchLevel;
