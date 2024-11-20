'use client';

import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { activateSpinner, deactivateSpinner } from '../../redux/spinnerslice';
import { activateErrorPage, deactivateErrorPage } from '../../redux/errorPageSlice';
import { setStep } from '../../redux/simulationStepSlice';
import { SIMULATION_ENGINE_STEPS } from '../../utils/Constants';
import SEDropDownList from '../../components/SimulationEngine/SEDropDownList';
import helper from '../../utils/Helper';
import { setUser } from '../../redux/userSlice';
import { Loader2 } from "lucide-react";
import _ from 'lodash';

const SchoolYear2 = ({ schoolYears, isErrorPage }) => {
    const dispatch = useDispatch();
    
    // Core states
    const [isInitializing, setIsInitializing] = useState(true);
    const user = useSelector((state) => state.user);
    const [schoolYears2, setSchoolYears2] = useState([]);
    const [selectedSchoolYear2, setSelectedSchoolYear2] = useState(null);
    
    // UI states
    const [collapseYearOption, setCollapseYearOption] = useState(true);
    const [fieldDefault, setFieldDefault] = useState(true);
    
    // Refs and Selectors
    const newRef = useRef(null);
    const simulationStepGlobal = useSelector(state => state.simulationStep);
    const isInUniversityGlobal = useSelector(state => state.university.active);

    // Initialize user data and state
    useEffect(() => {
        const initializeData = () => {
            
            if (!user) return;

            
            setSelectedSchoolYear2(
                user?.selectedSchoolYear2 || 
                { name: (user?.selectedSchoolYear3.name - 1).toString(), validated: false }
            );
            setIsInitializing(false);
        };

        initializeData();
    }, []);

    // Handle schoolYears data and error states
    useEffect(() => {
        if (isErrorPage) {
            console.error('🛑 error SchoolYear2:', isErrorPage);
            dispatch(activateErrorPage());
            return;
        }

        if (schoolYears && user?.selectedSchoolYear3) {
            dispatch(deactivateErrorPage());

            const processSchoolYears = () => {
                let filteredYears = _.cloneDeep(schoolYears);
                const selectedYear3 = user.selectedSchoolYear3;
                
                if (selectedYear3) {
                    const index = _.findIndex(filteredYears, { id: selectedYear3.id });
                    if (index !== -1) {
                        filteredYears.splice(index);
                    }
                }

                return filteredYears.reverse();
            };

            const processedYears = processSchoolYears();
            setSchoolYears2(processedYears);
        }
    }, [schoolYears, isErrorPage, user, dispatch]);

    // Handle outside clicks
    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (newRef.current && 
                !newRef.current.contains(e.target) && 
                !helper.isTargetContainsIgnoreClass(e.target)) {
                setCollapseYearOption(true);
            }
        };

        return helper.addOutsideClick(handleOutsideClick);
    }, []);

    const toggleYearDropdown = () => setCollapseYearOption(prev => !prev);

    const updateSelectedYear = (item) => {
        const updatedYear = { ...item, validated: true };
        setSelectedSchoolYear2(updatedYear);
        setCollapseYearOption(true);
        setFieldDefault(false);
        updateWendogouser(SIMULATION_ENGINE_STEPS.ACADEMIC_YEAR_HEAD_DETAILS2, updatedYear);
    };

    const handleContinue = () => {
        updateWendogouser(
            SIMULATION_ENGINE_STEPS.ACADEMIC_YEAR_HEAD_DETAILS2,
            { ...selectedSchoolYear2, validated: true }
        );
    };

    const updateWendogouser = (simulationStep, selectedSchoolYear2) => {
        const updatedUser = {
            ...user,
            simulationStep,
            selectedSchoolYear2,
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
        <SEDropDownList 
            title={`Votre ${helper.updateBAC(isInUniversityGlobal, user, 1)} correspond à quelle année scolaire ?`}
            svgConstantName="YEAR_N_1"
            newRef={newRef}
            collapseOption={collapseYearOption}
            fieldDefault={fieldDefault}
            items={schoolYears2}
            itemSelected={selectedSchoolYear2}
            toggleDropdown={toggleYearDropdown}
            updateSelected={updateSelectedYear}
            handleContinue={handleContinue}
            showContinueBtn={simulationStepGlobal === SIMULATION_ENGINE_STEPS.SCHOOL_YEAR2}
        />
    );
};

export default SchoolYear2;
