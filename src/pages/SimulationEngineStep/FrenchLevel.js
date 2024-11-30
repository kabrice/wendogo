'use client';

import React, { useState, useEffect } from "react";
import SELevelRail from "../../components/SimulationEngine/SELevelRail";
import { useDispatch, useSelector } from "react-redux";
import { setStep } from "../../redux/simulationStepSlice";
import { setProgress } from "../../redux/progressBarStepSlice";
import { setUser } from "../../redux/userSlice";
import { Loader2 } from "lucide-react";
import helper from "../../utils/Helper";
import { SIMULATION_ENGINE_STEPS, PROGRESS_BAR_STEPS } from "../../utils/Constants";

const FRENCH_LEVELS = [
    { value: 0, label: "A1" },
    { value: 20, label: "A2" },
    { value: 40, label: "B1" },
    { value: 60, label: "B2" },
    { value: 80, label: "C1" },
    { value: 100, label: "C2" },
];

const LEVEL_DESCRIPTIONS = [
    "Débutant",
    "Élémentaire",
    "Intermédiaire",
    "Intermédiaire avancé",
    "Avancé",
    "Maîtrise",
];

const FrenchLevel = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const simulationStepGlobal = useSelector((state) => state.simulationStep);
    const progressBarStep = useSelector((state) => state.progressBarStep);

    const [isLoading, setIsLoading] = useState(true);
    const [selectedFrenchLevel, setSelectedFrenchLevel] = useState(user?.selectedFrenchLevel);

    const showContinueBtn =
        simulationStepGlobal === SIMULATION_ENGINE_STEPS.FRENCH_LEVEL ||
        progressBarStep === PROGRESS_BAR_STEPS.GENERALITES_SUR_LES_VISAS_ET_LES_ETUDES;

    // Load user data on component mount
    useEffect(() => {
        if (user) {
            setSelectedFrenchLevel(user?.selectedFrenchLevel || 20);
        }
        setIsLoading(false);
    }, []);

    const updateWendogouser = (simulationStep, selectedFrenchLevel, progressBarStep = PROGRESS_BAR_STEPS.GENERALITES_SUR_LES_VISAS_ET_LES_ETUDES) => {
        if (!user) return;

        const updatedUser = {
            ...user,
            simulationStep,
            selectedFrenchLevel,
            progressBarStep,
            date: new Date().toISOString(),
        };

        helper.setLocalStorageWithExpiration("wendogouser", updatedUser);
        dispatch(setUser(updatedUser));
        dispatch(setStep(simulationStep));
        dispatch(setProgress(progressBarStep));
    };

    const handleChange = (event, value) => {
        setSelectedFrenchLevel(value);
        updateWendogouser(SIMULATION_ENGINE_STEPS.FRENCH_LEVEL, value);
    };

    const valueLabelFormat = (value) => LEVEL_DESCRIPTIONS[value / 20];

    const valuetext = (value) => `${value} - C2`;

    const handleContinue = () => {
        updateWendogouser(
            SIMULATION_ENGINE_STEPS.IS_YEAR_3_RESULTS_AVAILABLE,
            selectedFrenchLevel,
            PROGRESS_BAR_STEPS.BULLETIN_LE_PLUS_RECENT
        );

        if (typeof window !== "undefined") {
            window.location.hash = "";
            window.location.hash = "form/GENERALITES_SUR_LES_VISAS_ET_LES_ETUDES";
        }
    };

    if (isLoading || !user) {
        return (
            <div className="flex items-center justify-center min-h-[200px]">
                <Loader2 className="w-8 h-8 animate-spin" />
            </div>
        );
    }

    return (
        <SELevelRail
            id="FRENCH_LEVEL"
            title="Comment évaluez-vous votre niveau de langue française ?"
            arialLabel="French Level"
            defaultValue={selectedFrenchLevel}
            handleChange={handleChange}
            marks={FRENCH_LEVELS}
            step={20}
            valuetext={valuetext}
            valueLabelFormat={valueLabelFormat}
            handleContinue={handleContinue}
            showContinueBtn={showContinueBtn}
        />
    );
};

export default FrenchLevel;
