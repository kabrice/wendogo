
import { useState, useEffect} from 'react';
import { useGetVisaTypesByCountryIso2Query } from '../../store/apis/visaTypeApi';
import { activateSpinner, deactivateSpinner } from '../../redux/spinnerslice'
import SESelectionList from '../../components/SimulationEngine/SESelectionList';
import _  from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import helper from '../../utils/Helper';
import {setStep} from '../../redux/simulationStepSlice';
import { useNavigate } from "react-router-dom"
import {SIMULATION_ENGINE_STEPS} from '../../utils/Constants'

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
    
    const navigate = useNavigate()

    useEffect(() => {
        //if(simulationStepGlobal === SIMULATION_ENGINE_STEPS.VISA_TYPE){
        
            if(isLoading){
                dispatch(activateSpinner())
            }
            if(error){
                document.location.href='/error'
            }
            if (data) {
                dispatch(deactivateSpinner())
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

    const handleContinue = () => {
       let simulationStep = 1
       visaTypeSelectedId === VISA_ETUDIANT_ID ? simulationStep = SIMULATION_ENGINE_STEPS.SCHOOL_LEVEL : navigate('/simulation/appointment')
       updateWendogouser(simulationStep, visaTypeSelectedId)              
    }
    
    const updateWendogouser = (simulationStep, visaTypeSelectedId) => {
        dispatch(setStep(simulationStep)) 
        let updatedUser = {...user, simulationStep, visaTypeSelectedId, date: new Date().toISOString()}          
        helper.setLocalStorageWithExpiration('wendogouser', updatedUser, false)         
    }
    
  return (
    <SESelectionList title="Quel type de visa voulez-vous ?" items={visaTypes} itemSelected={visaTypeSelectedId} handleItemSelection={handleVisaTypeSelection} 
                     handleContinue={handleContinue} showContinueBtn={simulationStepGlobal === SIMULATION_ENGINE_STEPS.VISA_TYPE}/>
  );

}

export default VisaType;
