'use client';

import { useState, useEffect, useCallback } from 'react';
import SE2DateInput from '../../components/SimulationEngine/SE2DateInput';
import { useDispatch, useSelector } from 'react-redux';
import { setStep } from '../../redux/simulationStepSlice';
import { Loader2 } from "lucide-react";
import helper from '../../utils/Helper';
import { SIMULATION_ENGINE_STEPS } from '../../utils/Constants';
import { setUser } from '../../redux/userSlice';

const LastFranceTravelDetails = () => {
    const [isLoading, setIsLoading] = useState(true);
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const simulationStepGlobal = useSelector((state) => state.simulationStep);

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
                    const startDate = user?.frenchTravelDate?.startDate?.split('/') || [];
                    const endDate = user?.frenchTravelDate?.endDate?.split('/') || [];
                    
                    setStartDay(startDate[0] || '');
                    setStartMonth(startDate[1] || '');
                    setStartYear(startDate[2] || '');
                    setEndDay(endDate[0] || '');
                    setEndMonth(endDate[1] || '');
                    setEndYear(endDate[2] || '');
                    
                    // Initialize validation states
                    const isValidated = user?.frenchTravelDate?.validated || false;
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

    const updateWendogouser = useCallback((simulationStep, frenchTravelDate) => {
        if (!user) return;

        dispatch(setStep(simulationStep));
        const updatedUser = {
            ...user,
            simulationStep,
            frenchTravelDate,
            date: new Date().toISOString()
        };
        helper.setLocalStorageWithExpiration('wendogouser', updatedUser);
        dispatch(setUser(updatedUser));
    }, [dispatch, user]);

    const handleContinue = useCallback((frenchTravelDate) => {
        updateWendogouser(SIMULATION_ENGINE_STEPS.HAS_PASSEPORT, frenchTravelDate);
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
            title="Quand a eu lieu votre dernier voyage d'an l'espace Schengen ?"
            tip="Veuillez saisir les dates d'arrivée et de départ du séjour le plus récent."
            isButtonClicked={isButtonClicked}
            setIsButtonClicked={setIsButtonClicked}
            showContinueBtn={simulationStepGlobal === SIMULATION_ENGINE_STEPS.LAST_FRANCE_TRAVEL_DETAILS}
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

export default LastFranceTravelDetails;
