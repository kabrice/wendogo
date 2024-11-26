'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { activateSpinner, deactivateSpinner } from '../../redux/spinnerslice';
import { activateErrorPage, deactivateErrorPage } from '../../redux/errorPageSlice';
import { useGetCountriesQuery } from '../../store/apis/countryApi';
import helper from '../../utils/Helper';
import { setUser } from '../../redux/userSlice'; 
import SEDropDownList from '../../components/SimulationEngine/SEDropDownList';
import { FRANCOPHONE_COUNTRIES } from '../../utils/Constants';
import { useDispatch, useSelector } from 'react-redux';
import { setStep } from '../../redux/simulationStepSlice';
import { SIMULATION_ENGINE_STEPS } from '../../utils/Constants';
import { Loader2 } from "lucide-react";
import { IPINFO_URL } from '../../utils/Constants';

const ResidentCountry = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    
    // States for loading and data
    const [isClientLoaded, setIsClientLoaded] = useState(false);
    const user = useSelector((state) => state.user);
    const [countries, setCountries] = useState(null);
    const [selectedCountry, setSelectedCountry] = useState({ name: '', validated: false });
    const [collapseCountryOption, setCollapseCountryOption] = useState(true);
    const [fieldDefault, setFieldDefault] = useState(true);
    const [isFrancophoneCountry, setIsFrancophoneCountry] = useState(false);
    const [userCountry, setUserCountry] = useState(null);

    // Refs
    const newRef = useRef(null);

    // Selectors and Queries
    const simulationStepGlobal = useSelector((state) => state.simulationStep);
    const { data, error, isLoading } = useGetCountriesQuery(userCountry);

    // Detect user's country
    useEffect(() => {
        const getCountry = async () => {
            try {
                const response = await fetch(IPINFO_URL);
                const data = await response.json();
                setUserCountry(data.country || 'CM'); // Default to FR if detection fails
            } catch (error) {
                console.warn('Failed to get country:', error);
                setUserCountry('CM'); // Default to FR on error
            }
        };

        if (!user?.country) {
            getCountry();
        } else {
            setUserCountry(user.country);
        }
    }, [user?.country]);

    // Load user data on client side
    useEffect(() => {
        const loadUserData = () => {
            if (!user) {
                router.push('/simulation/home');
                return;
            }
            
            setSelectedCountry(user?.selectedCountry || { name: '', validated: false });
            setIsFrancophoneCountry(user?.isFrancophoneCountry);
            setIsClientLoaded(true);
        };

        loadUserData();
    }, [router, user]);

    // Handle outside clicks
    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (newRef.current && !newRef.current.contains(e.target) && !helper.isTargetContainsIgnoreClass(e.target)) {
                setCollapseCountryOption(true);
            }
        };

        if (typeof window !== 'undefined') {
            helper.addOutsideClick(handleOutsideClick);
        }

        return () => {
            if (typeof window !== 'undefined') {
                document.removeEventListener('mousedown', handleOutsideClick);
            }
        };
    }, []);

    // Handle API data loading
    useEffect(() => {
        if (isLoading) {
            dispatch(activateSpinner());
            return;
        }  

        dispatch(deactivateSpinner());
        
        if (error) {
            console.error('🛑 error ResidentCountry', error);
            dispatch(activateErrorPage());
            return;
        }

        if (data && isClientLoaded) {
            dispatch(deactivateErrorPage());
            
            const sortedCountries = [...data]
                .map(item => ({ ...item }))
                .sort((a, b) => a.name.localeCompare(b.name));
            
            setCountries(sortedCountries);

            // Set default country if needed
            if (!user?.selectedCountry) {
                const defaultCountry = data.find(item => item.default === true);
                if (defaultCountry) {
                    const isFrancophoneCountryTemp = FRANCOPHONE_COUNTRIES.some(
                        country => country.code_iso2 === defaultCountry.iso2
                    );
                    setSelectedCountry({ ...defaultCountry });
                    setIsFrancophoneCountry(isFrancophoneCountryTemp);
                }
            }
        }
    }, [data, error, isLoading, isClientLoaded, user, dispatch]);

    // Early return if not loaded
    if (!isClientLoaded || !user) {
        return (
            <div className="flex items-center justify-center min-h-[200px]">
                <Loader2 className="w-8 h-8 animate-spin" />
            </div>
        );
    }

    const toggleCountryDropdown = () => {
        setCollapseCountryOption(!collapseCountryOption);
    };

    const updateSelectedCountry = (item) => {
        const isFrancophoneCountryTemp = FRANCOPHONE_COUNTRIES.some(
            country => country.code_iso2 === item.iso2
        );
        
        setSelectedCountry({ ...item, validated: true });
        setCollapseCountryOption(true);
        setFieldDefault(false);
        setIsFrancophoneCountry(isFrancophoneCountryTemp);
        
        updateWendogouser(
            SIMULATION_ENGINE_STEPS.RESIDENT_COUNTRY,
            { ...item, validated: true },
            false,
            isFrancophoneCountryTemp
        );
    };

    const handleContinue = () => {
        let nextStep = SIMULATION_ENGINE_STEPS.HIGH_SCHOOL_IN_FRENCH;
        let isIneligibleForCampusFrance = false;

        if (selectedCountry.iso2 === 'SN') {
            const isIneligible = (
                (["bac00005"].includes(user?.universityLevelSelected?.id) && 
                ["deg00008", "deg00011", "deg00012"].includes(user?.degreeSelected?.id)) ||
                ["bac00004", "bac00007"].includes(user?.universityLevelSelected?.id)
            );

            if (isIneligible) {
                nextStep = SIMULATION_ENGINE_STEPS.CAMPUS_FRANCE_INELIGIBILITY;
                isIneligibleForCampusFrance = true;
            }
        }

        updateWendogouser(
            nextStep,
            { ...selectedCountry, validated: true },
            isIneligibleForCampusFrance,
            isFrancophoneCountry
        );
    };

    const updateWendogouser = (simulationStep, selectedCountry, isIneligibleForCampusFrance, isFrancophone) => {
        const updatedUser = {
            ...user,
            simulationStep,
            selectedCountry,
            country : selectedCountry.iso2,
            isFrancophone,
            isIneligibleForCampusFrance,
            isFrancophoneCountry: isFrancophone,
            date: new Date().toISOString()
        };

        helper.setLocalStorageWithExpiration('wendogouser', updatedUser);
        dispatch(setUser(updatedUser));
        dispatch(setStep(simulationStep));
    };

    if (!countries) {
        return (
            <div className="flex items-center justify-center min-h-[200px]">
                <Loader2 className="w-8 h-8 animate-spin" />
            </div>
        );
    }

    return (
        <SEDropDownList 
            title="Dans quel pays résidez-vous ?" 
            newRef={newRef}
            collapseOption={collapseCountryOption}
            fieldDefault={fieldDefault}
            items={countries}
            itemSelected={selectedCountry}
            toggleDropdown={toggleCountryDropdown}
            updateSelected={updateSelectedCountry}
            handleContinue={handleContinue}
            showContinueBtn={simulationStepGlobal === SIMULATION_ENGINE_STEPS.RESIDENT_COUNTRY}
        />
    );
};

export default ResidentCountry;
