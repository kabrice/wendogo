'use client';

import React, { useState, useEffect } from "react"; 
import SEDateInput from "../../components/SimulationEngine/SEDateInput";
import {SIMULATION_ENGINE_STEPS} from '../../utils/Constants'
import helper from '../../utils/Helper';
import { useDispatch, useSelector } from 'react-redux'
import {setStep} from '../../redux/simulationStepSlice';
import { setUser } from "../../redux/userSlice";
import { Loader2 } from "lucide-react";

const BirthDate = () => {

    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();   
    const [isLoading, setIsLoading] = useState(true);
    const [initialBirthDate, setInitialBirthDate] = useState(null);
    //const [formatedDate, setFormattedDate] = useState('');
    const simulationStepGlobal = useSelector((state) => state.simulationStep); 

    // const [day, setDay] = useState(initialBirthDate?.date?.split('/')[0] || '');
    // const [month, setMonth] = useState(initialBirthDate?.date?.split('/')[1] || '');
    // const [year, setYear] = useState(initialBirthDate?.date?.split('/')[2] || '');
    const [day, setDay] = useState(null);
    const [month, setMonth] = useState(null);
    const [year, setYear] = useState(null);

    useEffect(() => {
        if (user) {
            let initialBirthDateTemp = user?.birthDate || '';
            setInitialBirthDate(initialBirthDateTemp);
            setDay(initialBirthDateTemp?.date?.split('/')[0] || '');
            setMonth(initialBirthDateTemp?.date?.split('/')[1] || '');
            setYear(initialBirthDateTemp?.date?.split('/')[2] || '');
        }
        setIsLoading(false);
    }, []);

    const handleDayChange = (e) => {
        const value = e.target.value.replace(/[^0-9]/g, ); 
        if (value <= 31 && value >= 0) {
            setDay(value);
        }
        updateWendogouser(SIMULATION_ENGINE_STEPS.BIRTHDATE, {date: `${value}/${month}/${year}`, validated: false})
    };

    const handleMonthChange = (e) => {
        const value = e.target.value.replace(/[^0-9]/g, ); 
        if (/^\d{0,2}$/.test(value) && value >= 0) {
            
            setMonth(value);
        }
        updateWendogouser(SIMULATION_ENGINE_STEPS.BIRTHDATE, {date: `${day}/${value}/${year}`, validated: false})
    };
    let todayYear = new Date().getFullYear();

    const handleYearChange = (e) => {
        const value = e.target.value.replace(/[^0-9]/g, ); 
       // console.log('valuexxx', value)
        if ( value <= todayYear){
            //console.log('handleYearChange value', value)
            setYear(value);
        }
        updateWendogouser(SIMULATION_ENGINE_STEPS.BIRTHDATE, {date: `${day}/${month}/${value}`, validated: false})
    };

    const updateWendogouser = (simulationStep, birthDate) => {
        dispatch(setStep(simulationStep));
        let updatedUser = { ...user, simulationStep, birthDate, date: new Date().toISOString() };
        helper.setLocalStorageWithExpiration('wendogouser', updatedUser);
        dispatch(setUser(updatedUser));
    };

    const handleContinue = (birthDate) => { 
        //console.log('birthDate', {birthDate, validated: true})
        updateWendogouser(SIMULATION_ENGINE_STEPS.FIRSTNAME, {date: birthDate, validated: true})
    } 
    if (isLoading || !user) {
        return (
            <div className="flex items-center justify-center min-h-[200px]">
                <Loader2 className="w-8 h-8 animate-spin" />
            </div>
        );
    }

    return (<SEDateInput title="Quelle est votre date de naissance ?" id="BIRTHDATE"
                         validated={initialBirthDate.validated || simulationStepGlobal > SIMULATION_ENGINE_STEPS.BIRTHDATE} 
                         day={day} month={month} year={year} setDay={setDay} setMonth={setMonth} setYear={setYear}
                         handleDayChange={handleDayChange} handleMonthChange={handleMonthChange} handleYearChange={handleYearChange} 
                         showContinueBtn={simulationStepGlobal === SIMULATION_ENGINE_STEPS.BIRTHDATE}
                         sendFormattedDateResultToParent={handleContinue} />);
}

export default BirthDate;
