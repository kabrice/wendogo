import { useState, useEffect, useRef} from 'react';
import { useGetLevelValuesQuery } from '../../store/apis/levelValueApi';
import { activateSpinner, deactivateSpinner } from '../../redux/spinnerslice'
import SEAutoSuggestInput from '../../components/SimulationEngine/SEAutoSuggestInput';
import { useDispatch, useSelector } from 'react-redux'
import {setStep} from '../../redux/simulationStepSlice';
import helper from '../../utils/Helper';
import { set } from 'lodash';
import {SIMULATION_ENGINE_STEPS} from '../../utils/Constants'

const ProgramDomain = () => {


    const dispatch = useDispatch()
    let user = helper.getLocalStorageWithExpiration('wendogouser') 
    const [programDomainObj, setProgramDomainObj] = useState(user?.programDomainObj || null)
    console.log('programDomainObj', programDomainObj?.name)
    const [urlFragment] = useState('/levelvalue/search/');
    const simulationStepGlobal = useSelector((state) => state.simulationStep);
    const titleWhenNoMatch = "Quel Domaine d'études correspond le mieux à votre formation ?"; 
    const { data, error, isLoading } = useGetLevelValuesQuery({userid : '1', externalLevelValueInput : user?.degreeExactNameValue});
    useEffect(() => {
        if(isLoading){
            dispatch(activateSpinner())
        }
        if(error){
            //document.location.href='/error'
        }
        if (data) {
            dispatch(deactivateSpinner())
            //console.log('matching domain', data.best_match)  
            // console.log('matching data 00', data)
            
        }
    }, [data, error, isLoading ])
    const handleChange = (value) => {
        const inputValue = value;
        setProgramDomainObj(value);
        console.log('inputValue', inputValue)
        // setDegreeExactNameValue(inputValue);
         updateWendogouser(SIMULATION_ENGINE_STEPS.PROGRAM_DOMAIN, inputValue)
    };   

    const handleContinue = () => {
        //console.log('programDomainObj handleContinue', programDomainObj ? programDomainObj : data.best_match)
        updateWendogouser(SIMULATION_ENGINE_STEPS.MAIN_SUBJECTS, programDomainObj ? programDomainObj : data?.best_match)
    }

    const updateWendogouser = (simulationStep, programDomainObj) => {
        dispatch(setStep(simulationStep)) 
        let updatedUser = {...user, simulationStep, programDomainObj, date: new Date().toISOString()}
        helper.setLocalStorageWithExpiration('wendogouser', updatedUser, false)         
    }

    return (<>   
        {data?.hasOwnProperty('best_match') && 
                <SEAutoSuggestInput title={titleWhenNoMatch} 
                                    tip="Par exemple, des formations en droit civil, droit des affaires ou droit des contrats s'inscrivent dans le domaine d'études du droit."
                                    messageError="Un domaine d'études doit être sélectionné"
                                    matchingValue={programDomainObj || data.best_match}
                                    urlFragment ={urlFragment}
                                    showContinueBtn={simulationStepGlobal === SIMULATION_ENGINE_STEPS.PROGRAM_DOMAIN}
                                    handleChange={handleChange} 
                                    handleContinue={handleContinue}/>}</>
    );
}

export default ProgramDomain;
