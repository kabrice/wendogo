'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import SE2DateInput from '../../components/SimulationEngine/SE2DateInput';
import { useDispatch, useSelector } from 'react-redux';
import { setStep } from '../../redux/simulationStepSlice';
import { setProgress } from "../../redux/progressBarStepSlice";
import { Loader2 } from "lucide-react";
import helper from '../../utils/Helper';
import { SIMULATION_ENGINE_STEPS, PROGRESS_BAR_STEPS } from '../../utils/Constants';
import { setUser } from '../../redux/userSlice';

const PassportDetails = () => {
    const [isLoading, setIsLoading] = useState(true);
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    // Redux selectors
    const simulationStepGlobal = useSelector((state) => state.simulationStep);
    const progressBarStep = useSelector((state) => state.progressBarStep);

    // Date states
    const [startDay, setStartDay] = useState('');
    const [startMonth, setStartMonth] = useState('');
    const [startYear, setStartYear] = useState('');
    const [endDay, setEndDay] = useState('');
    const [endMonth, setEndMonth] = useState('');
    const [endYear, setEndYear] = useState('');

    // Validation states
    const [validated, setValidated] = useState(false);
    const [isStartDateValid, setIsStartDateValid] = useState(false);
    const [isEndDateValid, setIsEndDateValid] = useState(false);
    const [isButtonClicked, setIsButtonClicked] = useState(false);

    // Load user data on component mount
    useEffect(() => {
        const loadUserData = () => {
            try {
                
                if (user) {
                    
                    
                    // Initialize date states from user data
                    const startDate = user?.passportDetails?.startDate?.split('/') || [];
                    const endDate = user?.passportDetails?.endDate?.split('/') || [];
                    
                    setStartDay(startDate[0] || '');
                    setStartMonth(startDate[1] || '');
                    setStartYear(startDate[2] || '');
                    setEndDay(endDate[0] || '');
                    setEndMonth(endDate[1] || '');
                    setEndYear(endDate[2] || '');
                    
                    // Initialize validation states
                    const isValidated = user?.passportDetails?.validated || false;
                    setValidated(isValidated);
                    setIsStartDateValid(isValidated);
                    setIsEndDateValid(isValidated);
                }
            } catch (error) {
                console.error('Error loading user data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadUserData();
    }, []);

    // Memoized values
    const showContinueBtn = useMemo(() => 
        (simulationStepGlobal === SIMULATION_ENGINE_STEPS.PASSEPORT_DETAILS) || 
        (progressBarStep === PROGRESS_BAR_STEPS.INFORMATIONS_VOYAGE),
    [simulationStepGlobal, progressBarStep]);

    const lastPossibleDate = useMemo(() => {
        const date = new Date();
        return date.setFullYear(date.getFullYear() + 20);
    }, []);

    const updateWendogouser = useCallback((simulationStep, passportDetails, progressBarStep = PROGRESS_BAR_STEPS.INFORMATIONS_VOYAGE) => {
        if (!user) return;

        dispatch(setStep(simulationStep));
        dispatch(setProgress(progressBarStep));
        
        const updatedUser = {
            ...user,
            simulationStep,
            passportDetails,
            progressBarStep,
            date: new Date().toISOString()
        };
        
        helper.setLocalStorageWithExpiration('wendogouser', updatedUser);
        dispatch(setUser(updatedUser));

        if (typeof window !== 'undefined') {
            window.location.hash = "";
            window.location.hash = "form/COORDONNEES";
        }
    }, [dispatch, user]);

    const handleContinue = useCallback((passportDetails) => {
        updateWendogouser(
            SIMULATION_ENGINE_STEPS.SALUTATION,
            passportDetails,
            PROGRESS_BAR_STEPS.COORDONNEES
        );
    }, [updateWendogouser]);

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
        <SE2DateInput 
            title="Quelles sont les dates de validité de votre passeport ?"
            tip="Veuillez saisir les dates de validité de votre passeport."
            titleStartDate="Date de délivrance"
            titleEndDate="Date d'expiration"
            lastPossibleDate={lastPossibleDate}
            isButtonClicked={isButtonClicked}
            setIsButtonClicked={setIsButtonClicked}
            showContinueBtn={showContinueBtn}
            startDay={startDay}
            setStartDay={setStartDay}
            startMonth={startMonth}
            setStartMonth={setStartMonth}
            startYear={startYear}
            setStartYear={setStartYear}
            endDay={endDay}
            setEndDay={setEndDay}
            endMonth={endMonth}
            setEndMonth={setEndMonth}
            endYear={endYear}
            setEndYear={setEndYear}
            sendFormattedDateResultToParent={handleContinue}
            validated={validated}
            isStartDateValid={isStartDateValid}
            setIsStartDateValid={setIsStartDateValid}
            isEndDateValid={isEndDateValid}
            setIsEndDateValid={setIsEndDateValid}
        />
    );
};

export default PassportDetails;
