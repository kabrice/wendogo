'use client';

import { useState, useEffect } from 'react';
import { useGetLevelValuesQuery } from '../../store/apis/levelValueApi';
import { activateSpinner, deactivateSpinner } from '../../redux/spinnerslice'
import { activateErrorPage, deactivateErrorPage } from '../../redux/errorPageSlice';
import SEAutoSuggestInput from '../../components/SimulationEngine/SEAutoSuggestInput';
import { useDispatch, useSelector } from 'react-redux'
import { setStep } from '../../redux/simulationStepSlice';
import helper from '../../utils/Helper';
import { setUser } from '../../redux/userSlice';
import { Loader2 } from "lucide-react";
import { SIMULATION_ENGINE_STEPS, PROGRESS_BAR_STEPS } from '../../utils/Constants'

const ProgramDomain = () => {
    const dispatch = useDispatch();
    const [isInitializing, setIsInitializing] = useState(true);
    const user = useSelector((state) => state.user);
    const [programDomainObj, setProgramDomainObj] = useState(null);
    const [urlFragment] = useState('/levelvalue/search/');
    const simulationStepGlobal = useSelector((state) => state.simulationStep);
    const progressBarStep = useSelector((state) => state.progressBarStep);
    const titleWhenNoMatch = "Quel Domaine d'études correspond le mieux à cette formation ?";

    // Initialize user data
    useEffect(() => {
        const initializeUser = () => {
            
            
            setProgramDomainObj(user?.programDomainObj || null);
            setIsInitializing(false);
        };

        initializeUser();
    }, []);

    const { data, error, isLoading } = useGetLevelValuesQuery(
        user?.degreeExactNameValue ? 
        { userid: '1', externalLevelValueInput: user.degreeExactNameValue } 
        : null, // Use null instead of skip
        { 
            skip: !user?.degreeExactNameValue // Add proper skip condition
        }
    );

    let showContinueBtn = (() => {
        if (user?.isResult3Available) {
            return simulationStepGlobal === SIMULATION_ENGINE_STEPS.PROGRAM_DOMAIN;
        } else if (!user?.isResult3Available && user?.isResult2Available && progressBarStep === PROGRESS_BAR_STEPS.BULLETIN_N_1) {
            return simulationStepGlobal === SIMULATION_ENGINE_STEPS.PROGRAM_DOMAIN_BAC_N_1;
        } else if (!user?.isResult2Available && user?.isResult1Available && progressBarStep === PROGRESS_BAR_STEPS.BULLETIN_N_2) {
            return simulationStepGlobal === SIMULATION_ENGINE_STEPS.PROGRAM_DOMAIN_BAC_N_2;
        }
        return false;
    })();

    useEffect(() => {
        if (isLoading) {
            dispatch(activateSpinner());
        }
        if (error) {
            console.error('🛑 error', error);
            dispatch(deactivateSpinner());
            dispatch(activateErrorPage());
        }
        if (data) {
            dispatch(deactivateSpinner());
            dispatch(deactivateErrorPage());
        }
    }, [data, error, isLoading, dispatch]);

    const handleChange = (value) => {
        const determineCurrentStep = () => {
            if (!user?.isResult2Available && !user?.isResult3Available) {
                return {
                    step: SIMULATION_ENGINE_STEPS.PROGRAM_DOMAIN_BAC_N_2 
                };
            }
            if (!user?.isResult3Available) { 
                return {
                    step: SIMULATION_ENGINE_STEPS.PROGRAM_DOMAIN_BAC_N_1 
                }
            }
            return {
                step: SIMULATION_ENGINE_STEPS.PROGRAM_DOMAIN 
            };
        };
        const { step } = determineCurrentStep(); 
        setProgramDomainObj(value);
        updateWendogouser(step, value);  
    }; 
    
    const handleContinue = () => {
        let NEXT_EFFECTIVE_STEP;
        
        if (user?.isResult3Available) {
            NEXT_EFFECTIVE_STEP = SIMULATION_ENGINE_STEPS.MAIN_SUBJECTS;
        } else if (!user?.isResult3Available && progressBarStep === PROGRESS_BAR_STEPS.BULLETIN_N_1) {
            NEXT_EFFECTIVE_STEP = SIMULATION_ENGINE_STEPS.MAIN_SUBJECTS_BAC_N_1;
        } else if (!user?.isResult2Available && progressBarStep === PROGRESS_BAR_STEPS.BULLETIN_N_2) {
            NEXT_EFFECTIVE_STEP = SIMULATION_ENGINE_STEPS.MAIN_SUBJECTS_BAC_N_2;
        }
        updateWendogouser(NEXT_EFFECTIVE_STEP, programDomainObj ? programDomainObj : data?.best_match);
    };

    const updateWendogouser = (simulationStep, programDomainObj) => {
        dispatch(setStep(simulationStep));
        const updatedUser = { ...user, simulationStep, programDomainObj, date: new Date().toISOString() };
        helper.setLocalStorageWithExpiration('wendogouser', updatedUser);
        dispatch(setUser(updatedUser));
    };

    if (isInitializing  || isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[200px]">
                <Loader2 className="w-8 h-8 animate-spin" />
            </div>
        );
    }

    return (
        <>
            {data?.hasOwnProperty('best_match') && (
                <SEAutoSuggestInput
                    title={titleWhenNoMatch}
                    id={`PROGRAM_DOMAIN${simulationStepGlobal}`}
                    tip="Par exemple, des formations en droit civil, droit des affaires ou droit des contrats s'inscrivent dans le domaine d'études du droit."
                    messageError="Un domaine d'études doit être sélectionné"
                    matchingValue={programDomainObj || data.best_match}
                    urlFragment={urlFragment}
                    showContinueBtn={showContinueBtn}
                    handleChange={handleChange}
                    handleContinue={handleContinue}
                />
            )}
        </>
    );
};

export default ProgramDomain;
