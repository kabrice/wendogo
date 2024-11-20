'use client';

import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import { activateErrorPage, deactivateErrorPage } from '../../redux/errorPageSlice';
import { setStep } from '../../redux/simulationStepSlice';
import { SIMULATION_ENGINE_STEPS } from '../../utils/Constants';
import SEDropDownList from '../../components/SimulationEngine/SEDropDownList';
import helper from '../../utils/Helper';
import { setUser } from '../../redux/userSlice';
import { Loader2 } from "lucide-react";
import _ from 'lodash';

const SchoolYear1 = ({ schoolYears, isErrorPage }) => {
    const dispatch = useDispatch();
    
    // Core states
    const [isInitializing, setIsInitializing] = useState(true);
    const user = useSelector((state) => state.user);
    const [schoolYears1, setSchoolYears1] = useState([]);
    const [selectedSchoolYear1, setSelectedSchoolYear1] = useState(null);
    
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

            
            setSelectedSchoolYear1(
                user?.selectedSchoolYear1 || 
                { name: (user?.selectedSchoolYear3.name - 2).toString(), validated: false }
            );
            setIsInitializing(false);
        };

        initializeData();
    }, []);

    // Handle schoolYears data and error states
    useEffect(() => {
        if (isErrorPage) {
            console.error('🛑 error SchoolYear1:', isErrorPage);
            dispatch(activateErrorPage());
            return;
        }

        if (schoolYears && user) { 
            dispatch(deactivateErrorPage());

            const processSchoolYears = () => {
                let filteredYears = _.cloneDeep(schoolYears);

                if (user?.selectedSchoolYear2) {
                    filteredYears = _.dropRightWhile(
                        filteredYears,
                        item => parseInt(item.name, 10) >= parseInt(user.selectedSchoolYear2.name, 10)
                    );
                } else if (!user?.selectedSchoolYear2 && user?.selectedSchoolYear3) {
                    const yearBeforeSelected3 = (parseInt(user.selectedSchoolYear3.name, 10) - 2).toString();
                    filteredYears = _.filter(
                        filteredYears,
                        item => parseInt(item.name, 10) <= parseInt(yearBeforeSelected3, 10)
                    );
                }

                const reversedYears = filteredYears.reverse();

                if (!user?.selectedSchoolYear1 && reversedYears.length > 0) {
                    const mostRecentYear = _.maxBy(reversedYears, item => parseInt(item.name, 10));
                    setSelectedSchoolYear1({ ...mostRecentYear, validated: false });
                }

                setSchoolYears1(reversedYears);
            };

            processSchoolYears();
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
        setSelectedSchoolYear1(updatedYear);
        setCollapseYearOption(true);
        setFieldDefault(false);
        updateWendogouser(SIMULATION_ENGINE_STEPS.ACADEMIC_YEAR_HEAD_DETAILS1, updatedYear);
    };

    const handleContinue = () => {
        updateWendogouser(
            SIMULATION_ENGINE_STEPS.ACADEMIC_YEAR_HEAD_DETAILS1,
            { ...selectedSchoolYear1, validated: true }
        );
    };

    const updateWendogouser = (simulationStep, selectedSchoolYear1) => {
        const updatedUser = {
            ...user,
            simulationStep,
            selectedSchoolYear1,
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
            title={`Votre ${helper.updateBAC(isInUniversityGlobal, user, 2)} correspond à quelle année scolaire ?`}
            svgConstantName="YEAR_N_2"
            newRef={newRef}
            collapseOption={collapseYearOption}
            fieldDefault={fieldDefault}
            items={schoolYears1}
            itemSelected={selectedSchoolYear1}
            toggleDropdown={toggleYearDropdown}
            updateSelected={updateSelectedYear}
            handleContinue={handleContinue}
            showContinueBtn={simulationStepGlobal === SIMULATION_ENGINE_STEPS.SCHOOL_YEAR1}
        />
    );
};

export default SchoolYear1;
