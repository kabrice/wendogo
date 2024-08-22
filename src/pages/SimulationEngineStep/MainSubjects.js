import { useState, useEffect, useRef} from 'react';
import { useGetLevelValuesQuery } from '../../store/apis/levelValueApi';
import { activateSpinner, deactivateSpinner } from '../../redux/spinnerslice'
import SEAutoSuggestListInput from '../../components/SimulationEngine/SEAutoSuggestListInput';
import { useDispatch, useSelector } from 'react-redux'
import {setStep} from '../../redux/simulationStepSlice';
import helper from '../../utils/Helper'; 
import {SIMULATION_ENGINE_STEPS} from '../../utils/Constants'

const MainSubjects = () => {


    const dispatch = useDispatch()
    let user = helper.getLocalStorageWithExpiration('wendogouser') 
    const [mainSubjects, setMainSubjects] = useState(user?.mainSubjects || [])
    //console.log('mainSubjects', mainSubjects)
    const [urlFragment] = useState('/subject/search/');
    const simulationStepGlobal = useSelector((state) => state.simulationStep);
    const titleWhenNoMatch = `Veuillez renseigner les matières françaises correspondant au mieux à vos trois unités d'enseignement principales pour l'année scolaire ${user.selectedSchoolYear3.name}.`; 
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
            // console.log('matching domain', data.best_match)  
            // console.log('matching data 00', data)
            
        }
    }, [data, error, isLoading ])
    const handleChange = (newMainSubjects) => {

        console.log('newMainSubjects', newMainSubjects)
        setMainSubjects(newMainSubjects);
        // setDegreeExactNameValue(inputValue);
        updateWendogouser(SIMULATION_ENGINE_STEPS.MAIN_SUBJECTS, newMainSubjects)
    };   

    const handleContinue = () => {
        console.log('mainSubjects handleContinue', mainSubjects)
        updateWendogouser(SIMULATION_ENGINE_STEPS.CLASS_REPETITION, mainSubjects)
    }

    const updateWendogouser = (simulationStep, mainSubjects) => {
        dispatch(setStep(simulationStep)) 
        let updatedUser = {...user, simulationStep, mainSubjects, date: new Date().toISOString()}
        helper.setLocalStorageWithExpiration('wendogouser', updatedUser, false)         
    }

    return (<>   
        {data?.hasOwnProperty('best_match') && 
                <SEAutoSuggestListInput title={titleWhenNoMatch} 
                                    tip="Pour une meilleure suggestion de l'algorithme, soyez le plus précis possible. En cas de priorités égales, classez à votre convenance."
                                    messageError="Vous devez obligatoirement saisir 03 unités d'enseignement."
                                    mainValues={mainSubjects}
                                    setMainValues={setMainSubjects}
                                    urlFragment ={urlFragment}
                                    showContinueBtn={simulationStepGlobal === SIMULATION_ENGINE_STEPS.MAIN_SUBJECTS}
                                    handleChange={handleChange} 
                                    handleContinue={handleContinue}/>}
                                    </>
    );
}

export default MainSubjects;
