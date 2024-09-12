import { useState, useEffect, useRef} from 'react';  
import _ from 'lodash'
import SEDropDownList from '../../components/SimulationEngine/SEDropDownList';
import { useDispatch, useSelector } from 'react-redux'
import {setStep} from '../../redux/simulationStepSlice';
import { setProgress } from "../../redux/progressBarStepSlice";
import helper from '../../utils/Helper';
import {SIMULATION_ENGINE_STEPS, PROGRESS_BAR_STEPS} from '../../utils/Constants'

const otherSpokenLanguages = [
    {id: 'none', name: 'None', validated: false},
    {id: 'spl00004', name: 'Espagnol', validated: false},
    {id: 'spl00035', name: 'Allemand', validated: false},
    {id: 'spl00036', name: 'Italien', validated: false}, 
    {id: 'spl00026', name: 'Russe', validated: false}

]

const OtherSpokenLanguage = () => {

    let user = helper.getLocalStorageWithExpiration('wendogouser') 
    const dispatch = useDispatch() 
    const [selectedOtherSpokenLanguage, setSelectedOtherSpokenLanguage] = useState(user?.selectedOtherSpokenLanguage || {id: 'none', name: 'None', validated: false})
    const newRef = useRef(null)
    const [collapseOtherSpokenLanguageOption, setCollapseOtherSpokenLanguageOption] = useState(true)
    const [fieldDefault, setFieldDefault] = useState(true)

    const simulationStepGlobal = useSelector((state) => state.simulationStep);
    const progressBarStep = useSelector((state) => state.progressBarStep); 
  
    const showContinueBtn = (simulationStepGlobal === SIMULATION_ENGINE_STEPS.OTHER_SPOKEN_LANGUAGE) || 
                                   ((!user?.selectedOtherSpokenLanguage || selectedOtherSpokenLanguage.id ==='none')  
                                         && (progressBarStep === PROGRESS_BAR_STEPS.PARCOURS_ACADEMIQUE_ET_PROFESSIONNEL)) 

    const handleOutsideClick = (e) => {
        if (newRef.current && !newRef.current.contains(e.target) && !helper.isTargetContainsIgnoreClass(e.target)) {
          setCollapseOtherSpokenLanguageOption(true)
          //console.log('Outside click OtherSpokenLanguage')
        }
      };

    const toggleOtherSpokenLanguageDropdown= () => { 
        setCollapseOtherSpokenLanguageOption(!collapseOtherSpokenLanguageOption)
    }

    const updateSelectedOtherSpokenLanguage = (item) => { 
        setSelectedOtherSpokenLanguage({ ...item, validated: true })
        setCollapseOtherSpokenLanguageOption(true)
        setFieldDefault(false)
        updateWendogouser(selectedOtherSpokenLanguage.id === 'none' ? SIMULATION_ENGINE_STEPS.ALREADY_TRAVELED_TO_FRANCE : SIMULATION_ENGINE_STEPS.OTHER_LANGUAGE_LEVEL, {...item, validated : true})
        //updateWendogouser(SIMULATION_ENGINE_STEPS.OTHER_LANGUAGE_LEVEL, {...item, validated: true}) 
    }

    useEffect(() => { 
        helper.addOutsideClick(handleOutsideClick)
    }, [])

    const handleContinue = () => {
        updateWendogouser(selectedOtherSpokenLanguage.id === 'none' ? SIMULATION_ENGINE_STEPS.ALREADY_TRAVELED_TO_FRANCE : SIMULATION_ENGINE_STEPS.OTHER_LANGUAGE_LEVEL, {...selectedOtherSpokenLanguage, validated: true})
    }
    const updateWendogouser = (simulationStep, selectedOtherSpokenLanguage) => {
        dispatch(setStep(simulationStep)) 
        let updatedUser
        if(selectedOtherSpokenLanguage.id !== 'none'){
            updatedUser = {...user, simulationStep, selectedOtherSpokenLanguage, date: new Date().toISOString()} 
        } else {   
            dispatch(setProgress(PROGRESS_BAR_STEPS.INFORMATIONS_VOYAGE)) 
            updatedUser = {...user, simulationStep, selectedOtherSpokenLanguage, progressBarStep: PROGRESS_BAR_STEPS.INFORMATIONS_VOYAGE,  date: new Date().toISOString()}   
            window.location.hash = ""
            window.location.hash = "form/INFORMATIONS_VOYAGE";
        }
        helper.setLocalStorageWithExpiration('wendogouser', updatedUser, false)         
    }

  return (
         <SEDropDownList title="Choisissez une autre langue que vous maîtrisez" newRef={newRef} collapseOption={collapseOtherSpokenLanguageOption} 
                         fieldDefault={fieldDefault} items={otherSpokenLanguages} itemSelected={selectedOtherSpokenLanguage} toggleDropdown={toggleOtherSpokenLanguageDropdown} 
                         updateSelected={updateSelectedOtherSpokenLanguage} handleContinue={handleContinue} showContinueBtn={showContinueBtn}
                          />    
  );
}

export default OtherSpokenLanguage;
