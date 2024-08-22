
import { useState, useEffect} from 'react';
import { useGetDegreesQuery } from '../../store/apis/degreeApi';
import { activateSpinner, deactivateSpinner } from '../../redux/spinnerslice'
import SESelectionList from '../../components/SimulationEngine/SESelectionList';
import _ from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import helper from '../../utils/Helper';
import {setStep} from '../../redux/simulationStepSlice';
import {SIMULATION_ENGINE_STEPS} from '../../utils/Constants'

/**
 * Represents a component for selecting a visa type. 
 * {France, Germany, Italy, Spain} -> Step1
 * @returns {JSX.Element} The HSLevel component.
 */
function RecentLevelHighSchool() {

    let user = helper.getLocalStorageWithExpiration('wendogouser')

    const dispatch = useDispatch()
    const { data, error, isLoading } = useGetDegreesQuery('highschool');   
    const [hsLevels, setHSLevels] = useState([])
    const [hsLevelSelected, setHSLevelSelected] = useState(user?.hsLevelSelected)
    const simulationStepGlobal = useSelector((state) => state.simulationStep);

    useEffect(() => {
        if(isLoading){
            dispatch(activateSpinner())
        }
        if(error){
            document.location.href='/error'
        }
        if (data) {
            const filteredData = data.filter(value => value.id === "deg00002" || value.id === "deg00003");
            
            dispatch(deactivateSpinner())
            _.forEach(filteredData, (value) => {
                if(value.code === "Tle"){
                    setHSLevelSelected(user?.hsLevelSelected || value.id)
                }
            });
            setHSLevels(filteredData)
        }
    }, [data, error, isLoading ])
    
    const handleHSLevelSelection = (item) => {
        //console.log('item', item)
        setHSLevelSelected(item.id)
        updateWendogouser(SIMULATION_ENGINE_STEPS.SCHOOL_YEAR3, item.id)
    }

    const handleContinue = () => {
        updateWendogouser(SIMULATION_ENGINE_STEPS.SCHOOL_YEAR3, hsLevelSelected)
    }

    const updateWendogouser = (simulationStep, hsLevelSelected) => {
        dispatch(setStep(simulationStep)) 
        let updatedUser = {...user, simulationStep, hsLevelSelected, date: new Date().toISOString()}
        helper.setLocalStorageWithExpiration('wendogouser', updatedUser, false)         
    }

  return (
    <SESelectionList title="Quel est votre niveau scolaire actuel ?" items={hsLevels} itemSelected={hsLevelSelected} handleItemSelection={handleHSLevelSelection} 
                     handleContinue={handleContinue} showContinueBtn={simulationStepGlobal === SIMULATION_ENGINE_STEPS.RECENT_CLASS_LEVEL}/>
  );

}

export default RecentLevelHighSchool;
