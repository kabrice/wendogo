import React, { useState, useCallback, useEffect } from "react";
import SELevelRail from "../../components/SimulationEngine/SELevelRail";
import { useDispatch, useSelector } from 'react-redux';
import { setStep } from '../../redux/simulationStepSlice';
import { setProgress } from "../../redux/progressBarStepSlice";
import { Loader2 } from "lucide-react";
import helper from '../../utils/Helper';
import { SIMULATION_ENGINE_STEPS, PROGRESS_BAR_STEPS } from '../../utils/Constants';
import { setUser } from '../../redux/userSlice';

const FRENCH_LEVELS = [
    { value: 0, label: 'A1' },
    { value: 20, label: 'A2' },
    { value: 40, label: 'B1' },
    { value: 60, label: 'B2' },
    { value: 80, label: 'C1' },
    { value: 100, label: 'C2' }
];


const LEVEL_DESCRIPTIONS = [
    'Débutant',
    'Élémentaire',
    'Intermédiaire',
    'Intermédiaire avancé',
    'Avancé',
    'Maîtrise'
];

const FrenchLevel = () => {
    const [isLoading, setIsLoading] = useState(true);
   //  const user = useSelector((state) => state.user);
    const user = useSelector((state) => state.user); 
    const dispatch = useDispatch();
    
    // Redux selectors
    const simulationStepGlobal = useSelector((state) => state.simulationStep);
    const progressBarStep = useSelector((state) => state.progressBarStep);
    
    // Local state
    const [selectedFrenchLevel, setSelectedFrenchLevel] = useState(20); // Default to A2

    // Load user data on component mount
    useEffect(() => {
        const loadUserData = () => { 
            if (user) { 
                setSelectedFrenchLevel(user?.selectedFrenchLevel || 20);
            }
            setIsLoading(false);
        };

        loadUserData();
    }, []);

    const showContinueBtn = (
        simulationStepGlobal === SIMULATION_ENGINE_STEPS.FRENCH_LEVEL ||
        progressBarStep === PROGRESS_BAR_STEPS.GENERALITES_SUR_LES_VISAS_ET_LES_ETUDES
    );

    const valueLabelFormat = useCallback((value) => {
        return LEVEL_DESCRIPTIONS[value / 20];
    }, []);
     
    /*  import { setUser } from '../../redux/userSlice';
        const user = useSelector((state) => state.user);  */
    const updateWendogouser = useCallback((
        simulationStep,
        level,
        progressBarStep = PROGRESS_BAR_STEPS.GENERALITES_SUR_LES_VISAS_ET_LES_ETUDES
    ) => { 
      const updatedUser = {
        ...user, // Get the current user from Redux
        simulationStep,
        selectedFrenchLevel: level,
        progressBarStep,
        date: new Date().toISOString(),
      };

      // Update Redux store
      dispatch(setUser(updatedUser));
      dispatch(setStep(simulationStep));
      dispatch(setProgress(progressBarStep));
      // Update local storage
      helper.setLocalStorageWithExpiration('wendogouser', updatedUser);
    }, [dispatch, user]);

    const handleChange = useCallback((event, newValue) => {
        console.log('CCCCC', user?.selectedFrenchLevel);
        setSelectedFrenchLevel(newValue);
        updateWendogouser(SIMULATION_ENGINE_STEPS.FRENCH_LEVEL, newValue);
    }, [updateWendogouser]);

    const valuetext = useCallback((value) => `${value} - C2`, []);

    const handleContinue = useCallback(() => {
      console.log('Current Selected French Level:', selectedFrenchLevel);
      updateWendogouser(
          SIMULATION_ENGINE_STEPS.IS_YEAR_3_RESULTS_AVAILABLE,
          selectedFrenchLevel,
          PROGRESS_BAR_STEPS.BULLETIN_LE_PLUS_RECENT
      );
  
      if (typeof window !== 'undefined') {
          window.location.hash = "";
          window.location.hash = "form/GENERALITES_SUR_LES_VISAS_ET_LES_ETUDES";
      }
  }, [selectedFrenchLevel, updateWendogouser]);

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
        <SELevelRail 
            id="FRENCH_LEVEL"
            title="Comment évaluer votre niveau de langue française ?"
            arialLabel="French Level"
            value={selectedFrenchLevel}
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
