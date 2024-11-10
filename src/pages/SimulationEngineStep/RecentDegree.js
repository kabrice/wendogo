import { useState, useEffect, useRef} from 'react';
import { useGetDegreesByBacIdQuery } from '../../store/apis/levelApi';
import { activateSpinner, deactivateSpinner } from '../../redux/spinnerslice'
import { activateErrorPage, deactivateErrorPage } from '../../redux/errorPageSlice';
import SEDropDownList from '../../components/SimulationEngine/SEDropDownList';
import helper from '../../utils/Helper';
import _ from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import {setStep} from '../../redux/simulationStepSlice';
import {SIMULATION_ENGINE_STEPS} from '../../utils/Constants'

const RecentDegree = () => {

    let user = helper.getLocalStorageWithExpiration('wendogouser')   

    const mostRecentBacId = helper.getMostRecentBacId(user)
    let defaultDegree = {id: 'deg00008', name : 'Licence', validated: false}
    if(mostRecentBacId>= 'bac00009'){
        defaultDegree = {id: 'deg00010', name : 'Doctorat', validated: false}
    }else if(mostRecentBacId>= 'bac00007'){
        defaultDegree = {id: 'deg00009', name : 'Master', validated: false}
    }
    
    const [degrees, setDegrees] = useState([])
    const [degreeSelected, setDegreeSelected] = useState(user?.degreeSelected || defaultDegree)
    const newRef = useRef(null)
    const [collapseDegreeOption, setCollapseDegreeOption] = useState(true)
    const [fieldDefault, setFieldDefault] = useState(true)
    console.log('RecentDegree' )
    const dispatch = useDispatch() 
    const { data, error, isLoading } = useGetDegreesByBacIdQuery(mostRecentBacId);
    const simulationStepGlobal = useSelector((state) => state.simulationStep);

    const handleOutsideClick = (e) => {
        if (newRef.current && !newRef.current.contains(e.target) && !helper.isTargetContainsIgnoreClass(e.target)) {
            ////console.log('Outside click')
          setCollapseDegreeOption(true)
          //console.log('Outside click RecentDegree')
        }
      };

    const toggleDegreeDropdown= () => {
        setCollapseDegreeOption(!collapseDegreeOption)
    }   
    const updateSelectedDegree = (item) => { 
        console.log('item updateSelectedDegree', item)
        setDegreeSelected({id: item.id, name : item.name, validated: true})
        setCollapseDegreeOption(true)
        setFieldDefault(false)
        updateWendogouser(SIMULATION_ENGINE_STEPS.DEGREE_EXACT_NAME, {id: item.id, name : item.name, validated: true})
    }

    useEffect(() => {
        if(isLoading){
            dispatch(activateSpinner())
        }
        if(error){
            console.error('🛑 error', error)
            dispatch(deactivateSpinner()) 
            dispatch(activateErrorPage())
        }
        if (data) {
            dispatch(deactivateSpinner())
            dispatch(deactivateErrorPage())
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
        helper.setLocalStorageWithExpiration('wendogouser', updatedUser)         
    }
    return (
             <SEDropDownList title="Quelle est l'équivalence de votre dernier diplôme obtenu ou en cours de préparation ?" newRef={newRef} collapseOption={collapseDegreeOption} 
                             fieldDefault={fieldDefault} items={degrees} itemSelected={degreeSelected} toggleDropdown={toggleDegreeDropdown} updateSelected={updateSelectedDegree} 
                             handleContinue={handleContinue} showContinueBtn={simulationStepGlobal === SIMULATION_ENGINE_STEPS.RECENT_DEGREE} />
                                
                )

}

export default RecentDegree;
