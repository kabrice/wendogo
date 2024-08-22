import { useState, useEffect, useRef} from 'react';
import { useGetBacQuery } from '../../store/apis/bacApi';
import { activateSpinner, deactivateSpinner } from '../../redux/spinnerslice'
import helper from '../../utils/Helper';
import _ from 'lodash'
import SEDropDownList from '../../components/SimulationEngine/SEDropDownList';
import { useDispatch, useSelector } from 'react-redux'
import {setStep} from '../../redux/simulationStepSlice';
import {SIMULATION_ENGINE_STEPS} from '../../utils/Constants'

const RecentLevelUniversity = () => {

    let user = helper.getLocalStorageWithExpiration('wendogouser')

    const dispatch = useDispatch()
    const { data, error, isLoading } = useGetBacQuery();
    const [universityLevels, setUniversityLevels] = useState([])
    const [universityLevelSelected, setUniversityLevelSelected] = useState(user?.universityLevelSelected || {name : 'BAC+3', validated: false})
    const newRef = useRef(null)
    const [collapseBacOption, setCollapseBacOption] = useState(true)
    const [fieldDefault, setFieldDefault] = useState(true)
    const simulationStepGlobal = useSelector((state) => state.simulationStep);

    const handleOutsideClick = (e) => {
        if (newRef.current && !newRef.current.contains(e.target) && !helper.isTargetContainsIgnoreClass(e.target)) {
          setCollapseBacOption(true)
          console.log('outside click RecentLevelUniversity')
        }
      };

    const toggleBacDropdown= () => {
        setCollapseBacOption(!collapseBacOption)
    }
    const updateSelectedBac = (item) => {
        console.log('item', item)
        setUniversityLevelSelected({name : item.name, validated: true})
        setCollapseBacOption(true)
        setFieldDefault(false)
        updateWendogouser(SIMULATION_ENGINE_STEPS.SCHOOL_YEAR3, {name : item.name, validated: true})
    }

    useEffect(() => {
        if(isLoading){
            dispatch(activateSpinner())
        }
        if(error){
            console.log('error', error)
            document.location.href='/error'
        }
        if (data) {
            dispatch(deactivateSpinner())
            const updatedData = _.map(data, item => {
                
                return { ...item, name: `BAC+${item.name}` };
            });

            setUniversityLevels(updatedData);
        }

        helper.addOutsideClick(handleOutsideClick)

    }, [data, error, isLoading ])

    const handleContinue = () => {
        updateWendogouser(SIMULATION_ENGINE_STEPS.SCHOOL_YEAR3, {...universityLevelSelected, validated: true})
    }

    const updateWendogouser = (simulationStep, universityLevelSelected) => {
        dispatch(setStep(simulationStep)) 
        let updatedUser = {...user, simulationStep, universityLevelSelected, date: new Date().toISOString()}
        helper.setLocalStorageWithExpiration('wendogouser', updatedUser, false)         
    }

  return (
         <SEDropDownList title="Vous avez quel niveau dans le supérieur ?" tip="Cela signifie que vous venez d'obtenir votre baccalauréat ou que vous êtes en première année d'études supérieures." 
                         showTip={universityLevelSelected  === 'BAC+1'}
                         newRef={newRef} collapseOption={collapseBacOption} fieldDefault={fieldDefault} items={universityLevels} 
                         itemSelected={universityLevelSelected} toggleDropdown={toggleBacDropdown} updateSelected={updateSelectedBac} 
                         handleContinue={handleContinue} showContinueBtn={simulationStepGlobal === SIMULATION_ENGINE_STEPS.RECENT_CLASS_LEVEL}/>  
  );
}

export default RecentLevelUniversity;
