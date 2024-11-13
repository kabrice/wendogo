import { useState, useEffect } from 'react';
import { useGetDegreesQuery } from '../../store/apis/degreeApi';
import { activateSpinner, deactivateSpinner } from '../../redux/spinnerslice'
import { activateErrorPage, deactivateErrorPage } from '../../redux/errorPageSlice';
import { activatePremiereClass, deactivatePremiereClass } from '../../redux/premiereClassSlice';
import SESelectionList from '../../components/SimulationEngine/SESelectionList';
import _ from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import helper from '../../utils/Helper';
import { setUser } from '../../redux/userSlice';
import { setStep } from '../../redux/simulationStepSlice';
import { SIMULATION_ENGINE_STEPS } from '../../utils/Constants'
import { Loader2 } from "lucide-react";

/**
 * Represents a component for selecting a high school level.
 * @param {Object} props - Component props
 * @param {Array} props.degrees - Array of available degrees
 * @param {boolean} props.isErrorPage - Error state indicator
 * @returns {JSX.Element} The RecentLevelHighSchool component
 */
function RecentLevelHighSchool({ degrees, isErrorPage }) {
    const dispatch = useDispatch();
    const [isInitializing, setIsInitializing] = useState(true);
    const user = useSelector((state) => state.user);
    const [hsLevels, setHSLevels] = useState([]);
    const [hsLevelSelected, setHSLevelSelected] = useState(null);
    const simulationStepGlobal = useSelector((state) => state.simulationStep);

    // Initialize user data
    useEffect(() => {
        const initializeUserData = () => {
            
            
            setHSLevelSelected(user?.hsLevelSelected || null);
            setIsInitializing(false);
        };

        initializeUserData();
    }, []);

    // Handle degrees data and errors
    useEffect(() => {
        if (isErrorPage) {
            console.error('🛑 error RecentLevelHighSchool', isErrorPage);
            dispatch(activateErrorPage());
        }

        if (degrees && user) {
            const filteredData = degrees.filter(value => 
                value.id === "deg00002" || value.id === "deg00003"
            );
            
            dispatch(deactivateErrorPage());
            
            // Set default selection for Terminal level
            const terminalLevel = filteredData.find(value => value.code === "Tle");
            if (terminalLevel && !user.hsLevelSelected) {
                setHSLevelSelected(terminalLevel.id);
            }
            
            setHSLevels(filteredData);
        }
    }, [isErrorPage, degrees, user, dispatch]);

    const handleHSLevelSelection = (item) => {
        setHSLevelSelected(item.id);
        updateWendogouser(SIMULATION_ENGINE_STEPS.SCHOOL_YEAR3, item.id);
        
        if (item.id === 'deg00002') {
            dispatch(activatePremiereClass());
        } else {
            dispatch(deactivatePremiereClass());
        }
    };

    const handleContinue = () => {
        updateWendogouser(SIMULATION_ENGINE_STEPS.SCHOOL_YEAR3, hsLevelSelected);
    };

    const updateWendogouser = (simulationStep, hsLevelSelected) => {
        dispatch(setStep(simulationStep));

        const updatedUser = {
            ...user,
            simulationStep,
            hsLevelSelected,
            universityLevelSelected: null,
            date: new Date().toISOString()
        };

        // Update report cards if they exist
        ['reportCard3', 'reportCard2', 'reportCard1'].some(reportCard => {
            if (user[reportCard]?.length > 0) {
                updatedUser[reportCard] = user[reportCard].map((card, index) => 
                    index === user[reportCard].length - 1 ? [] : card
                );
                return true; // Stop after first match
            }
            return false;
        });

        helper.setLocalStorageWithExpiration('wendogouser', updatedUser);
        dispatch(setUser(updatedUser));
    };

    if (isInitializing) {
        return (
            <div className="flex items-center justify-center min-h-[200px]">
                <Loader2 className="w-8 h-8 animate-spin" />
            </div>
        );
    }

    return (
        <SESelectionList 
            title="Quel est votre niveau scolaire actuel ?"
            items={hsLevels}
            itemSelected={hsLevelSelected}
            handleItemSelection={handleHSLevelSelection}
            handleContinue={handleContinue}
            showContinueBtn={simulationStepGlobal === SIMULATION_ENGINE_STEPS.RECENT_CLASS_LEVEL}
        />
    );
}

export default RecentLevelHighSchool;
