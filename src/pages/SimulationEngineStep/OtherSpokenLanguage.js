'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import SEDropDownList from '../../components/SimulationEngine/SEDropDownList';
import { useDispatch, useSelector } from 'react-redux';
import { setStep } from '../../redux/simulationStepSlice';
import { setProgress } from "../../redux/progressBarStepSlice";
import { Loader2 } from "lucide-react";
import helper from '../../utils/Helper';
import { SIMULATION_ENGINE_STEPS, PROGRESS_BAR_STEPS } from '../../utils/Constants';
import { setUser } from '../../redux/userSlice';

const OTHER_SPOKEN_LANGUAGES = [
    { id: 'none', name: 'None', validated: false },
    { id: 'spl00004', name: 'Espagnol', validated: false },
    { id: 'spl00035', name: 'Allemand', validated: false },
    { id: 'spl00036', name: 'Italien', validated: false },
    { id: 'spl00026', name: 'Russe', validated: false }
];

const DEFAULT_LANGUAGE = { id: 'none', name: 'None', validated: false };

const OtherSpokenLanguage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    
    // Redux selectors
    const simulationStepGlobal = useSelector((state) => state.simulationStep);
    const progressBarStep = useSelector((state) => state.progressBarStep);

    // Local state
    const [selectedOtherSpokenLanguage, setSelectedOtherSpokenLanguage] = useState(DEFAULT_LANGUAGE);
    const [collapseOtherSpokenLanguageOption, setCollapseOtherSpokenLanguageOption] = useState(true);
    const [fieldDefault, setFieldDefault] = useState(true);

    // Refs
    const newRef = useRef(null);

    // Load user data on component mount
    useEffect(() => {
        const loadUserData = () => {
            try {
                
                if (user) {
                    
                    setSelectedOtherSpokenLanguage(user?.selectedOtherSpokenLanguage || DEFAULT_LANGUAGE);
                }
            } catch (error) {
                console.error('Error loading user data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadUserData();
    }, []);

    // Handle outside clicks
    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (newRef.current && 
                !newRef.current.contains(e.target) && 
                !helper.isTargetContainsIgnoreClass(e.target)) {
                setCollapseOtherSpokenLanguageOption(true);
            }
        };

        return helper.addOutsideClick(handleOutsideClick);
    }, []);

    // Memoized values
    const showContinueBtn = useMemo(() => 
        (simulationStepGlobal === SIMULATION_ENGINE_STEPS.OTHER_SPOKEN_LANGUAGE) || 
        ((!user?.selectedOtherSpokenLanguage || selectedOtherSpokenLanguage.id === 'none') && 
         (progressBarStep === PROGRESS_BAR_STEPS.PARCOURS_ACADEMIQUE_ET_PROFESSIONNEL)),
    [simulationStepGlobal, progressBarStep, user?.selectedOtherSpokenLanguage, selectedOtherSpokenLanguage.id]);

    const updateWendogouser = useCallback((simulationStep, language) => {
        if (!user) return;

        dispatch(setStep(simulationStep));

        const updatedUser = {
            ...user,
            simulationStep,
            selectedOtherSpokenLanguage: language,
            ...(language.id === 'none' && {
                progressBarStep: PROGRESS_BAR_STEPS.INFORMATIONS_VOYAGE
            }),
            date: new Date().toISOString()
        };

        if (language.id === 'none') {
            dispatch(setProgress(PROGRESS_BAR_STEPS.INFORMATIONS_VOYAGE));
            if (typeof window !== 'undefined') {
                window.location.hash = "";
                window.location.hash = "form/INFORMATIONS_VOYAGE";
            }
        }

        helper.setLocalStorageWithExpiration('wendogouser', updatedUser);
        dispatch(setUser(updatedUser));
    }, [dispatch, user]);

    const toggleOtherSpokenLanguageDropdown = useCallback(() => {
        setCollapseOtherSpokenLanguageOption(prev => !prev);
    }, []);

    const updateSelectedOtherSpokenLanguage = useCallback((item) => {
        const validatedItem = { ...item, validated: true };
        setSelectedOtherSpokenLanguage(validatedItem);
        setCollapseOtherSpokenLanguageOption(true);
        setFieldDefault(false);

        const nextStep = item.id === 'none'
            ? SIMULATION_ENGINE_STEPS.ALREADY_TRAVELED_TO_FRANCE
            : SIMULATION_ENGINE_STEPS.OTHER_LANGUAGE_LEVEL;

        updateWendogouser(nextStep, validatedItem);
    }, [updateWendogouser]);

    const handleContinue = useCallback(() => {
        const nextStep = selectedOtherSpokenLanguage.id === 'none'
            ? SIMULATION_ENGINE_STEPS.ALREADY_TRAVELED_TO_FRANCE
            : SIMULATION_ENGINE_STEPS.OTHER_LANGUAGE_LEVEL;

        updateWendogouser(nextStep, { ...selectedOtherSpokenLanguage, validated: true });
    }, [selectedOtherSpokenLanguage, updateWendogouser]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[100px]">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (!user) {
        return (
            <div className="flex items-center justify-center min-h-[100px] text-red-500">
                Error loading user data
            </div>
        );
    }

    return (
        <SEDropDownList 
            title="Choisissez une autre langue que vous maîtrisez"
            newRef={newRef}
            collapseOption={collapseOtherSpokenLanguageOption}
            fieldDefault={fieldDefault}
            items={OTHER_SPOKEN_LANGUAGES}
            itemSelected={selectedOtherSpokenLanguage}
            toggleDropdown={toggleOtherSpokenLanguageDropdown}
            updateSelected={updateSelectedOtherSpokenLanguage}
            handleContinue={handleContinue}
            showContinueBtn={showContinueBtn}
        />
    );
};

export default OtherSpokenLanguage;
