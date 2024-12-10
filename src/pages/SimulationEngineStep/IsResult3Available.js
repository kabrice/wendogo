'use client';

import React, { useState, useEffect } from "react";
import SEYesNo from "../../components/SimulationEngine/SEYesNo";
import { useDispatch, useSelector } from 'react-redux';
import { setStep } from '../../redux/simulationStepSlice';
import { setProgress } from "../../redux/progressBarStepSlice"; 
import helper from '../../utils/Helper';
import { SIMULATION_ENGINE_STEPS, PROGRESS_BAR_STEPS } from '../../utils/Constants';
import { useRouter } from 'next/router';
import { setUser } from '../../redux/userSlice';

const IsResult3Available = () => {
    const dispatch = useDispatch();
    
    const router = useRouter();
    // Add loading and user states
    const [isLoading, setIsLoading] = useState(true);
    const user = useSelector((state) => state.user);
    const [isResult3Available, setIsResult3Available] = useState(true);

    const simulationStepGlobal = useSelector((state) => state.simulationStep);
    const progressBarStep = useSelector((state) => state.progressBarStep);

    // Load user data on client-side only
    useEffect(() => {
        const loadUserData = () => {
            
            if (user) {
                
                setIsResult3Available('reportCard3' in user ? user.isResult3Available : true);
            } else {
                // Handle case where user data is not available
                router.push('/simulation/home');
                return;
            }
            setIsLoading(false);
        };

        loadUserData();
    }, []);

    // Don't render anything until user data is loaded
    if (isLoading || !user) {
        return <div>Loading...</div>; // Or your loading component
    }

    // Early return if required data is missing
    if (!user.selectedSchoolYear3?.name) {
        return <div>Please complete previous steps first.</div>;
    }

    const showContinueBtn = (simulationStepGlobal === SIMULATION_ENGINE_STEPS.IS_YEAR_3_RESULTS_AVAILABLE) || 
                           (!user.isResult3Available && (progressBarStep === PROGRESS_BAR_STEPS.BULLETIN_LE_PLUS_RECENT));

    const handleIsResult3Available = (val) => {
        setIsResult3Available(val);
        updateWendogouser(
            val ? SIMULATION_ENGINE_STEPS.ACADEMIC_YEAR_HEAD_DETAILS3 : SIMULATION_ENGINE_STEPS.IS_YEAR_2_RESULTS_AVAILABLE, 
            val
        );
    };

    const updateWendogouser = (simulationStep, isResult3Available) => {
        dispatch(setStep(simulationStep));
        
        const updatedUser = {
            ...user,
            simulationStep,
            mainSubjects: null,
            isResult3Available,
            ...(isResult3Available 
                ? { selectedSchoolYear2: null }
                : { progressBarStep: PROGRESS_BAR_STEPS.BULLETIN_N_1 }
            ),
            date: new Date().toISOString()
        };

        if (!isResult3Available) {
            dispatch(setProgress(PROGRESS_BAR_STEPS.BULLETIN_N_1));
        }

        helper.setLocalStorageWithExpiration('wendogouser', updatedUser);
        dispatch(setUser(updatedUser)); // Update local state
    };

    const handleContinue = () => {
        updateWendogouser(
            isResult3Available 
                ? SIMULATION_ENGINE_STEPS.ACADEMIC_YEAR_HEAD_DETAILS3 
                : SIMULATION_ENGINE_STEPS.IS_YEAR_2_RESULTS_AVAILABLE,
            isResult3Available
        );
        
        window.location.hash = "";
        window.location.hash = "form/BULLETIN_N_1";
    };

    return (
        <SEYesNo 
            title={`Vos relevés académiques ${user.selectedSchoolYear3.name} ${user.universityLevelSelected?.id === 'bac00004' ? 'ou du Baccalauréat' : ''} sont-ils disponibles ?`}
            tip ={user.universityLevelSelected?.id === 'bac00004' ? 'Les notes du Baccalauréat sont indispensables pour bien poursuivre la simulation.' : ''}
            svgConstantName="YEAR_N"
            yes={isResult3Available}
            handleYes={handleIsResult3Available}
            handleContinue={handleContinue}
            showContinueBtn={showContinueBtn}
            id="IS_YEAR_3_RESULTS_AVAILABLE"
        />
    );
};

// Optional: Add getServerSideProps if you need to redirect on server side
export async function getServerSideProps(context) {
    // You could add server-side checks here if needed
    return {
        props: {} // Will be passed to the page component as props
    };
}

export default IsResult3Available;
