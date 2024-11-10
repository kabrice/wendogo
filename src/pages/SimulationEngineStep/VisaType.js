
import { useState, useEffect} from 'react';
import { useGetVisaTypesByCountryIso2Query } from '../../store/apis/visaTypeApi';
import { activateSpinner, deactivateSpinner } from '../../redux/spinnerslice'
import { activateErrorPage, deactivateErrorPage } from '../../redux/errorPageSlice';
import SESelectionList from '../../components/SimulationEngine/SESelectionList';
import _  from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import helper from '../../utils/Helper';
import {setStep} from '../../redux/simulationStepSlice';
import { useNavigate } from "react-router-dom"
import {SIMULATION_ENGINE_STEPS} from '../../utils/Constants'
import KeepInTouch from '../ressources/KeepInTouch';

/**
 * Represents a component for selecting a visa type. 
 * {France, Germany, Italy, Spain} -> Step1
 * @returns {JSX.Element} The VisaType component.
 */
function VisaType() {

    const VISA_ETUDIANT_ID = 'vis00001'
    const queryParameters = new URLSearchParams(window.location.search)
    const countryIso2 = queryParameters.get("country")
    //console.log(countryIso2)
    let user = helper.getLocalStorageWithExpiration('wendogouser')
    //console.log('VisaType visaTypeSelectedId user', user.visaTypeSelectedId)
    const dispatch = useDispatch()
    const { data, error, isLoading } = useGetVisaTypesByCountryIso2Query({countryIso2: countryIso2});   
    const [visaTypes, setVisaTypes] = useState([])
    const [visaTypeSelectedId, setVisaTypeSelectedId] = useState(user?.visaTypeSelectedId)
    const simulationStepGlobal = useSelector((state) => state.simulationStep);
    const [isErrorPage, setIsErrorPage] = useState(false)
    
    const navigate = useNavigate()

    useEffect(() => {
        //if(simulationStepGlobal === SIMULATION_ENGINE_STEPS.VISA_TYPE){
        
            if(isLoading){
                dispatch(activateSpinner())
            }
            if(error || isErrorPage){
                console.error('🛑 error', error)
                dispatch(deactivateSpinner()) 
                dispatch(activateErrorPage())
            }
            if (data) {
                dispatch(deactivateSpinner())
                dispatch(deactivateErrorPage())
                _.forEach(data, (value) => {
                    if(value.default === true && !visaTypeSelectedId){
                        setVisaTypeSelectedId(value.id)
                    }
                });
                setVisaTypes(data)
                dispatch(setStep(user.simulationStep))
            }
        //}
    }, [data, error, isLoading ])
    
    const handleVisaTypeSelection = (item) => {
        setVisaTypeSelectedId(item.id)  
        item.id === VISA_ETUDIANT_ID ? updateWendogouser(2, item.id) : updateWendogouser(1, item.id)      
    }

    const [isKeepInTouch, setIsKeepInTouch] = useState(false)

    const handleContinue = () => {
       let simulationStep = 1
       if(visaTypeSelectedId === VISA_ETUDIANT_ID){
              simulationStep = SIMULATION_ENGINE_STEPS.SCHOOL_LEVEL
        }else{
            setIsKeepInTouch(true)
        }
    //    visaTypeSelectedId === VISA_ETUDIANT_ID ? simulationStep = SIMULATION_ENGINE_STEPS.SCHOOL_LEVEL : navigate('/simulation/appointment')
       updateWendogouser(simulationStep, visaTypeSelectedId)              
    }
    
    const updateWendogouser = (simulationStep, visaTypeSelectedId) => {
        dispatch(setStep(simulationStep)) 
        let updatedUser = {...user, simulationStep, visaTypeSelectedId, date: new Date().toISOString()}          
        helper.setLocalStorageWithExpiration('wendogouser', updatedUser)         
    }

   
  return (
    <>
    {isKeepInTouch ? <KeepInTouch setIsError={setIsErrorPage} 
                                         setIsKeepInTouch={setIsKeepInTouch} 
                                         typeRequest={visaTypeSelectedId === 'vis00003' ? 'TOURISM' : 'FAMILY'}
                                         title={`Notre similulateur visa ${(visaTypeSelectedId === 'vis00003') ? 'visiteur' :  'famille'} arrive bientôt ! En attendant, nous vous accompagnons personnellement`}/>:
    <SESelectionList title="Quel type de visa désirez-vous ?" items={visaTypes} itemSelected={visaTypeSelectedId} handleItemSelection={handleVisaTypeSelection} 
                     handleContinue={handleContinue} showContinueBtn={simulationStepGlobal === SIMULATION_ENGINE_STEPS.VISA_TYPE}/>}
                     </>
  );

}

export default VisaType;
