'use client';

import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { activateSpinner, deactivateSpinner } from "../../redux/spinnerslice";
import { activateErrorPage, deactivateErrorPage } from "../../redux/errorPageSlice";
import { setUser } from "../../redux/userSlice";
import { setStep } from "../../redux/simulationStepSlice";
import { SIMULATION_ENGINE_STEPS } from "../../utils/Constants";
import helper from "../../utils/Helper";
import SEDropDownList from "../../components/SimulationEngine/SEDropDownList";

const SchoolYear3 = ({ schoolYears, isErrorPage }) => {
    const user = useSelector((state) => state.user);
    const currentYear = new Date().getFullYear();
    const isInUniversityGlobal = useSelector((state) => state.university.active);

    const dispatch = useDispatch();
    const [schoolYears3, setSchoolYears3] = useState([]);
    const [selectedSchoolYear3, setSelectedSchoolYear3] = useState(
        user?.selectedSchoolYear3 || { name: currentYear.toString(), validated: false }
    );
    const newRef = useRef(null);
    const [collapseYearOption, setCollapseYearOption] = useState(true);
    const [fieldDefault, setFieldDefault] = useState(true);
    const simulationStepGlobal = useSelector((state) => state.simulationStep);

    // Handle outside click
    const handleOutsideClick = (e) => {
        if (newRef.current && !newRef.current.contains(e.target) && !helper.isTargetContainsIgnoreClass(e.target)) {
            setCollapseYearOption(true);
        }
    };

    const toggleYearDropdown = () => {
        console.log("toggleYearDropdown", schoolYears);
        setCollapseYearOption(!collapseYearOption);
    };

    const updateSelectedYear = (item) => {
        setSelectedSchoolYear3({ ...item, validated: true });
        setCollapseYearOption(true);
        setFieldDefault(false);
        updateWendogouser(
            isInUniversityGlobal ? SIMULATION_ENGINE_STEPS.RECENT_DEGREE : SIMULATION_ENGINE_STEPS.DEGREE_EXACT_NAME,
            { ...item, validated: true }
        );
    };

    useEffect(() => {
        if (isErrorPage) {
            console.error("🛑 Error in SchoolYear3:", isErrorPage);
            dispatch(deactivateSpinner());
            dispatch(activateErrorPage());
        } else if (schoolYears) {
            dispatch(deactivateSpinner());
            dispatch(deactivateErrorPage());
            setSchoolYears3(_.cloneDeep(schoolYears).reverse());
        }

        // Add and clean up outside click listener
        return helper.addOutsideClick(handleOutsideClick);
    }, [schoolYears, isErrorPage, dispatch]);

    const handleContinue = () => {
        updateWendogouser(
            isInUniversityGlobal ? SIMULATION_ENGINE_STEPS.RECENT_DEGREE : SIMULATION_ENGINE_STEPS.DEGREE_EXACT_NAME,
            { ...selectedSchoolYear3, validated: true }
        );
    };

    const updateWendogouser = (simulationStep, selectedSchoolYear3) => {
        dispatch(setStep(simulationStep));
        if (!selectedSchoolYear3.id) {
            const foundYear = _.find(schoolYears3, { name: selectedSchoolYear3.name });
            if (foundYear) {
                selectedSchoolYear3.id = foundYear.id;
            }
        }
        const updatedUser = { ...user, simulationStep, selectedSchoolYear3, date: new Date().toISOString() };
        dispatch(setUser(updatedUser));
        helper.setLocalStorageWithExpiration("wendogouser", updatedUser);
    };

    return (
        <SEDropDownList
            title="Cela correspond à quelle année scolaire ?"
            svgConstantName="YEAR_N"
            newRef={newRef}
            collapseOption={collapseYearOption}
            fieldDefault={fieldDefault}
            items={schoolYears3}
            itemSelected={selectedSchoolYear3}
            toggleDropdown={toggleYearDropdown}
            updateSelected={updateSelectedYear}
            handleContinue={handleContinue}
            showContinueBtn={simulationStepGlobal === SIMULATION_ENGINE_STEPS.SCHOOL_YEAR3}
        />
    );
};

export default SchoolYear3;
