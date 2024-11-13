import React, { useState, useEffect } from "react";
import SEYesNo from "../../components/SimulationEngine/SEYesNo";
import { useDispatch, useSelector } from 'react-redux';
import { setStep } from '../../redux/simulationStepSlice';
import { setProgress } from "../../redux/progressBarStepSlice";
import helper from '../../utils/Helper';
import { SIMULATION_ENGINE_STEPS, PROGRESS_BAR_STEPS } from '../../utils/Constants';
import { Loader2 } from "lucide-react";
import { setUser } from '../../redux/userSlice';

const CanJustifyOtherLanguage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    
    // Redux selectors
    const simulationStepGlobal = useSelector((state) => state.simulationStep);
    const progressBarStep = useSelector((state) => state.progressBarStep);
    
    // Local state
    const [canJustifyOtherLanguage, setCanJustifyOtherLanguage] = useState(null);
    const [selectedLanguageName, setSelectedLanguageName] = useState('');

    // Load user data on component mount
    useEffect(() => {
        const loadUserData = () => {
            
            if (user) {
                
                setCanJustifyOtherLanguage(user?.canJustifyOtherLanguage);
                setSelectedLanguageName(user?.selectedOtherSpokenLanguage?.name || '');
            }
            setIsLoading(false);
        };

        loadUserData();
    }, []);

    const updateWendogouser = (
        simulationStep, 
        canJustifyOtherLanguage, 
        progressBarStep = PROGRESS_BAR_STEPS.PARCOURS_ACADEMIQUE_ET_PROFESSIONNEL
    ) => {
        if (!user) return;

        dispatch(setStep(simulationStep));
        dispatch(setProgress(progressBarStep));
        
        const updatedUser = {
            ...user,
            simulationStep,
            canJustifyOtherLanguage,
            progressBarStep,
            date: new Date().toISOString()
        };
        
        helper.setLocalStorageWithExpiration('wendogouser', updatedUser);
        dispatch(setUser(updatedUser));
    };

    const handleCanJustifyOtherLanguage = (val) => {
        setCanJustifyOtherLanguage(val);
        updateWendogouser(SIMULATION_ENGINE_STEPS.ALREADY_TRAVELED_TO_FRANCE, val);
    };

    const handleContinue = () => {
        updateWendogouser(
            SIMULATION_ENGINE_STEPS.ALREADY_TRAVELED_TO_FRANCE, 
            canJustifyOtherLanguage, 
            PROGRESS_BAR_STEPS.INFORMATIONS_VOYAGE
        );

        // Handle hash navigation safely in useEffect
        if (typeof window !== 'undefined') {
            window.location.hash = "";
            window.location.hash = "form/INFORMATIONS_VOYAGE";
        }
    };

    // Determine if continue button should be shown
    const showContinueBtn = (
        simulationStepGlobal === SIMULATION_ENGINE_STEPS.CAN_JUSTIFY_OTHER_LANGUAGE ||
        progressBarStep === PROGRESS_BAR_STEPS.PARCOURS_ACADEMIQUE_ET_PROFESSIONNEL
    );

    if (isLoading) {
        return <div className="flex items-center justify-center min-h-[200px]">
                    <Loader2 className="w-8 h-8 animate-spin" />
               </div>; 
    }

    if (!user || !selectedLanguageName) {
        return <div className="flex items-center justify-center min-h-[200px]">
                    <Loader2 className="w-8 h-8 animate-spin" />
               </div>; 
    }

    return (
        <SEYesNo 
            title={`Pouvez-vous présenter un document officiel (diplôme, attestation, etc.) justifiant ce niveau en ${selectedLanguageName} ?`}
            yes={canJustifyOtherLanguage}
            handleYes={handleCanJustifyOtherLanguage}
            handleContinue={handleContinue}
            showContinueBtn={showContinueBtn}
            id="CAN_JUSTIFY_OTHER_LANGUAGE"
        />
    );
};

export default CanJustifyOtherLanguage;
