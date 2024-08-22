import { useState, useEffect, useRef} from 'react';
import { useGetDegreesQuery } from '../../store/apis/degreeApi';
import { activateSpinner, deactivateSpinner } from '../../redux/spinnerslice'
import SEDropDownList from '../../components/SimulationEngine/SEDropDownList';
import helper from '../../utils/Helper';
import _ from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import {setStep} from '../../redux/simulationStepSlice';
import {SIMULATION_ENGINE_STEPS} from '../../utils/Constants'

const RecentDegree = () => {

    let user = helper.getLocalStorageWithExpiration('wendogouser')   
    
    const [degrees, setDegrees] = useState([])
    const [degreeSelected, setDegreeSelected] = useState(user?.degreeSelected || {name : 'Licence', validated: false})
    const newRef = useRef(null)
    const [collapseDegreeOption, setCollapseDegreeOption] = useState(true)
    const [fieldDefault, setFieldDefault] = useState(true)
    console.log('RecentDegree' )
    const dispatch = useDispatch()
    const { data, error, isLoading } = useGetDegreesQuery('university');
    const simulationStepGlobal = useSelector((state) => state.simulationStep);

    const handleOutsideClick = (e) => {
        if (newRef.current && !newRef.current.contains(e.target) && !helper.isTargetContainsIgnoreClass(e.target)) {
            //console.log('outside click')
          setCollapseDegreeOption(true)
          console.log('outside click RecentDegree')
        }
      };

    const toggleDegreeDropdown= () => {
        setCollapseDegreeOption(!collapseDegreeOption)
    }   
    const updateSelectedDegree = (item) => { 
        console.log('item', item)
        setDegreeSelected({name : item.name, validated: true})
        setCollapseDegreeOption(true)
        setFieldDefault(false)
        updateWendogouser(SIMULATION_ENGINE_STEPS.DEGREE_EXACT_NAME, {name : item.name, validated: true})
    }

    useEffect(() => {
        if(isLoading){
            dispatch(activateSpinner())
        }
        if(error){
            document.location.href='/error'
        }
        if (data) {
            dispatch(deactivateSpinner())
            
            setDegrees(_.sortBy(data, 'order'))
            console.log('degree data', data)
        }

        helper.addOutsideClick(handleOutsideClick)

    }, [data, error, isLoading ])

    const handleContinue = () => {
        updateWendogouser(SIMULATION_ENGINE_STEPS.DEGREE_EXACT_NAME, {...degreeSelected, validated: true})
    }

    const updateWendogouser = (simulationStep, degreeSelected) => {
        dispatch(setStep(simulationStep)) 
        let updatedUser = {...user, simulationStep, degreeSelected, date: new Date().toISOString()}
        helper.setLocalStorageWithExpiration('wendogouser', updatedUser, false)         
    }
    return (
             <SEDropDownList title="Quelle est l'équivalence de votre dernier diplôme obtenu ou en cours de préparation ?" newRef={newRef} collapseOption={collapseDegreeOption} 
                             fieldDefault={fieldDefault} items={degrees} itemSelected={degreeSelected} toggleDropdown={toggleDegreeDropdown} updateSelected={updateSelectedDegree} 
                             handleContinue={handleContinue} showContinueBtn={simulationStepGlobal === SIMULATION_ENGINE_STEPS.RECENT_DEGREE} />
                                
                )

}

export default RecentDegree;
