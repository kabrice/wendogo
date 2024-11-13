import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { useGetVisaTypesByCountryIso2Query } from '../../store/apis/visaTypeApi';
import { activateSpinner, deactivateSpinner } from '../../redux/spinnerslice';
import { activateErrorPage, deactivateErrorPage } from '../../redux/errorPageSlice';
import { setStep } from '../../redux/simulationStepSlice';
import { SIMULATION_ENGINE_STEPS } from '../../utils/Constants';
import SESelectionList from '../../components/SimulationEngine/SESelectionList';
import KeepInTouch from '../ressources/KeepInTouch';
import helper from '../../utils/Helper';
import { setUser } from '../../redux/userSlice';
import { Loader2 } from "lucide-react";
import _ from 'lodash';

/**
 * Component for selecting a visa type.
 * Handles visa selection for different countries (France, Germany, Italy, Spain)
 */
function VisaType() {
    const router = useRouter();
    const dispatch = useDispatch();
    
    // Constants
    const VISA_ETUDIANT_ID = 'vis00001';
    
    // Core states
    const [isInitializing, setIsInitializing] = useState(true);
    const user = useSelector((state) => state.user);
    const [visaTypes, setVisaTypes] = useState([]);
    const [visaTypeSelectedId, setVisaTypeSelectedId] = useState(null);
    const [isErrorPage, setIsErrorPage] = useState(false);
    const [isKeepInTouch, setIsKeepInTouch] = useState(false);
    
    // Selectors
    const simulationStepGlobal = useSelector((state) => state.simulationStep);

    // Get country from URL
    const queryParameters = typeof window !== 'undefined' ? 
        new URLSearchParams(window.location.search) : new URLSearchParams();
    const countryIso2 = queryParameters.get("country");

    // API Query
    const { data, error, isLoading } = useGetVisaTypesByCountryIso2Query(
        { countryIso2 },
        { skip: !countryIso2 }
    );

    // Initialize user data
    useEffect(() => {
        const initializeData = () => {
            
            if (!user) return;

            
            setVisaTypeSelectedId(user?.visaTypeSelectedId || null);
            
            // Only dispatch step if it exists
            if (user?.simulationStep) {
                dispatch(setStep(user.simulationStep));
            }
            
            setIsInitializing(false);
        };

        initializeData();
    }, [dispatch]);

    // Handle loading state
    useEffect(() => {
        if (isLoading) {
            dispatch(activateSpinner());
        } else {
            dispatch(deactivateSpinner());
        }
    }, [isLoading, dispatch]);

    // Handle data and errors
    useEffect(() => {
        if (error || isErrorPage) {
            console.error('🛑 error visaTypes:', error);
            dispatch(activateErrorPage());
            return;
        }

        if (data) {
            dispatch(deactivateErrorPage());
            
            // Process visa types
            const defaultVisa = data.find(value => value.default);
            if (defaultVisa && !visaTypeSelectedId) {
                setVisaTypeSelectedId(defaultVisa.id);
            }
            setVisaTypes(data);
        }
    }, [data, error, isErrorPage, visaTypeSelectedId, dispatch]);

    const handleVisaTypeSelection = (item) => {
        setVisaTypeSelectedId(item.id);
        updateWendogouser(
            item.id === VISA_ETUDIANT_ID ? 2 : 1,
            item.id
        );
    };

    const handleContinue = () => {
        if (visaTypeSelectedId === VISA_ETUDIANT_ID) {
            updateWendogouser(SIMULATION_ENGINE_STEPS.SCHOOL_LEVEL, visaTypeSelectedId);
        } else {
            setIsKeepInTouch(true);
            updateWendogouser(1, visaTypeSelectedId);
        }
    };

    const updateWendogouser = (simulationStep, visaTypeSelectedId) => {
        const updatedUser = {
            ...user,
            simulationStep,
            visaTypeSelectedId,
            date: new Date().toISOString()
        };
        
        helper.setLocalStorageWithExpiration('wendogouser', updatedUser);
        dispatch(setUser(updatedUser));
        dispatch(setStep(simulationStep));
    };

    if (isInitializing) {
        return (
            <div className="flex items-center justify-center min-h-[200px]">
                <Loader2 className="w-8 h-8 animate-spin" />
            </div>
        );
    }

    return (
        <>
            {isKeepInTouch ? (
                <KeepInTouch 
                    setIsError={setIsErrorPage}
                    setIsKeepInTouch={setIsKeepInTouch}
                    typeRequest={visaTypeSelectedId === 'vis00003' ? 'TOURISM' : 'FAMILY'}
                    title={`Notre similulateur visa ${
                        visaTypeSelectedId === 'vis00003' ? 'visiteur' : 'famille'
                    } arrive bientôt ! En attendant, nous vous accompagnons personnellement`}
                />
            ) : (
                <SESelectionList 
                    title="Quel type de visa désirez-vous ?"
                    items={visaTypes}
                    itemSelected={visaTypeSelectedId}
                    handleItemSelection={handleVisaTypeSelection}
                    handleContinue={handleContinue}
                    showContinueBtn={simulationStepGlobal === SIMULATION_ENGINE_STEPS.VISA_TYPE}
                />
            )}
        </>
    );
}

export default VisaType;
