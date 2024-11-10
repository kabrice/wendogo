import { useState, useEffect} from 'react';
import { useGetLevelValuesQuery } from '../../store/apis/levelValueApi';
import { activateSpinner, deactivateSpinner } from '../../redux/spinnerslice'
import SEAutoSuggestListInput from '../../components/SimulationEngine/SEAutoSuggestListInput';
import { useDispatch, useSelector } from 'react-redux'
import {setStep} from '../../redux/simulationStepSlice';
import helper from '../../utils/Helper'; 
import {setProgress} from "../../redux/progressBarStepSlice";
import {SIMULATION_ENGINE_STEPS, PROGRESS_BAR_STEPS} from '../../utils/Constants'

const MainSubjects = () => {
 
    const dispatch = useDispatch()
    const simulationStepGlobal = useSelector((state) => state.simulationStep);
    const progressBarStep = useSelector((state) => state.progressBarStep); 
    let user = helper.getLocalStorageWithExpiration('wendogouser') 
    const [mainSubjects, setMainSubjects] = useState(user?.mainSubjects || []) 
    const [urlFragment] = useState('/subject/search/'+user?.applyingForMaster+'/');
    const titleWhenNoMatch = `Veuillez renseigner les équivalents français correspondant au mieux à vos trois principales unités d'enseignement pour l'année scolaire ${user.selectedSchoolYear3.name}.`; 
    const { data, error, isLoading } = useGetLevelValuesQuery({userid : '1', externalLevelValueInput : user?.degreeExactNameValue});
    let showContinueBtn = (simulationStepGlobal === SIMULATION_ENGINE_STEPS.MAIN_SUBJECTS) || (progressBarStep === PROGRESS_BAR_STEPS.BULLETIN_LE_PLUS_RECENT) 
    if(!user?.isResult3Available && progressBarStep === PROGRESS_BAR_STEPS.BULLETIN_N_1){
        showContinueBtn = simulationStepGlobal === SIMULATION_ENGINE_STEPS.MAIN_SUBJECTS_BAC_N_1 || (progressBarStep === PROGRESS_BAR_STEPS.BULLETIN_N_1)
    }else if(!user?.isResult2Available && progressBarStep === PROGRESS_BAR_STEPS.BULLETIN_N_2){
        showContinueBtn = simulationStepGlobal === SIMULATION_ENGINE_STEPS.MAIN_SUBJECTS_BAC_N_2 || (progressBarStep === PROGRESS_BAR_STEPS.BULLETIN_N_2)
    }

    useEffect(() => {
        if(isLoading){
            dispatch(activateSpinner())
        }
        if(error){ 
        }
        if (data) {
            dispatch(deactivateSpinner()) 
            
        }
    }, [data, error, isLoading ])

    const handleChange = (newMainSubjects) => {

        console.log('newMainSubjects', newMainSubjects)
        setMainSubjects(newMainSubjects);
        console.log('simulationStepGlobal $$$ ', simulationStepGlobal )
        const determineCurrentStep = () => {
            if (!user?.isResult3Available) { 
                return {
                    step: SIMULATION_ENGINE_STEPS.MAIN_SUBJECTS_BAC_N_1,
                    progressBarStep: PROGRESS_BAR_STEPS.BULLETIN_N_1
                }
            }
             if (!user?.isResult2Available && !user?.isResult3Available) {
                return {
                    step: SIMULATION_ENGINE_STEPS.MAIN_SUBJECTS_BAC_N_2,
                    progressBarStep: PROGRESS_BAR_STEPS.BULLETIN_N_2
                };
            }
            return {
                step: SIMULATION_ENGINE_STEPS.MAIN_SUBJECTS,
                progressBarStep: PROGRESS_BAR_STEPS.BULLETIN_LE_PLUS_RECENT
            };
        };
        const { step, progressBarStep } = determineCurrentStep();   
        //console.log('determineCurrentStep $$$ ', determineCurrentStep() )
        updateWendogouser(step, newMainSubjects, progressBarStep)
    };   

    const handleContinue = () => {
        
        const determineNextStep = () => {
            window.location.hash = ""
            if(user?.isResult3Available && progressBarStep === PROGRESS_BAR_STEPS.BULLETIN_LE_PLUS_RECENT){
                console.log('HHHHHOOOO')
                window.location.hash = "form/BULLETIN_N_1";
                return {
                    step: SIMULATION_ENGINE_STEPS.IS_YEAR_2_RESULTS_AVAILABLE,
                    myProgressBarStep: PROGRESS_BAR_STEPS.BULLETIN_N_1
                };
            }else if (!user?.isResult3Available && progressBarStep === PROGRESS_BAR_STEPS.BULLETIN_N_1) {
                window.location.hash = "form/BULLETIN_N_2";
                return {
                    step: SIMULATION_ENGINE_STEPS.IS_YEAR_1_RESULTS_AVAILABLE,
                    myProgressBarStep: PROGRESS_BAR_STEPS.BULLETIN_N_2
                };
            }else if (!user?.isResult2Available && progressBarStep === PROGRESS_BAR_STEPS.BULLETIN_N_2) {
                window.location.hash = "form/PARCOURS_ACADEMIQUE_ET_PROFESSIONNEL";
                return {
                    step: SIMULATION_ENGINE_STEPS.HAS_WON_AWARD,
                    myProgressBarStep: PROGRESS_BAR_STEPS.PARCOURS_ACADEMIQUE_ET_PROFESSIONNEL
                };
            }
            //window.location.hash = "form/BULLETIN_N_1";
            // return {
            //     step: SIMULATION_ENGINE_STEPS.IS_YEAR_2_RESULTS_AVAILABLE,
            //     progressBarStep: PROGRESS_BAR_STEPS.BULLETIN_N_1
            // };
        };
    
        let { step, myProgressBarStep } = determineNextStep();
        //console.log('determineNextStep $$$ ', determineNextStep() , mainSubjects, ' === ', myProgressBarStep, ' === ', step)
        updateWendogouser(step, mainSubjects, myProgressBarStep);
    };
    

    const updateWendogouser = (simulationStep, mainSubjects, progressBarStep=PROGRESS_BAR_STEPS.BULLETIN_LE_PLUS_RECENT) => {
        console.log('ppp ', simulationStep, progressBarStep)
        dispatch(setStep(simulationStep)) 
        dispatch(setProgress(progressBarStep)) 
        let updatedUser = {...user, simulationStep, mainSubjects, progressBarStep, date: new Date().toISOString()}
        helper.setLocalStorageWithExpiration('wendogouser', updatedUser)         
    } 

    return (<>   
        {data?.hasOwnProperty('best_match') && 
                <SEAutoSuggestListInput title={titleWhenNoMatch}  id={`MAIN_SUBJECTS${simulationStepGlobal}`}
                                    tip="Pour une meilleure suggestion de l'algorithme, soyez le plus précis possible. En cas de priorités égales, classez à votre convenance."
                                    messageError="Vous devez obligatoirement saisir 3 unités d'enseignement."
                                    mainValues={mainSubjects}
                                    setMainValues={setMainSubjects}
                                    urlFragment ={urlFragment}
                                    showContinueBtn={showContinueBtn }
                                    handleChange={handleChange} 
                                    handleContinue={handleContinue}/>}
                                    </>
    );
}

export default MainSubjects;
