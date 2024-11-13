import { useState, useEffect, useRef, useCallback } from 'react';
import { useGetNationalitiesQuery } from '../../store/apis/nationalityApi';
import { activateSpinner, deactivateSpinner } from '../../redux/spinnerslice';
import { activateErrorPage, deactivateErrorPage } from '../../redux/errorPageSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setStep } from '../../redux/simulationStepSlice';
import { Loader2 } from "lucide-react";
import SEDropDownList from '../../components/SimulationEngine/SEDropDownList';
import helper from '../../utils/Helper';
import { SIMULATION_ENGINE_STEPS } from '../../utils/Constants';
import _ from 'lodash';
import { setUser } from '../../redux/userSlice';

const DEFAULT_NATIONALITY = {
    country_id: 38,
    id: 'nat0038',
    name: 'Camerounaise',
    validated: false
};

const Nationality = () => {
    const [isLoading, setIsLoading] = useState(true);
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const simulationStepGlobal = useSelector((state) => state.simulationStep);

    // Local state
    const [nationalities, setNationalities] = useState([]);
    const [nationalitySelected, setNationalitySelected] = useState(DEFAULT_NATIONALITY);
    const [collapseNationalityOption, setCollapseNationalityOption] = useState(true);
    const [fieldDefault, setFieldDefault] = useState(true);

    // Refs
    const newRef = useRef(null);

    // API query
    const { data, error, isLoading: isApiLoading } = useGetNationalitiesQuery();

    // Load user data on component mount
    useEffect(() => {
        const loadUserData = () => {
            try {
                
                if (user) {
                    
                    setNationalitySelected(user?.nationality || DEFAULT_NATIONALITY);
                }
            } catch (error) {
                console.error('Error loading user data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadUserData();
    }, []);

    // Handle API states
    useEffect(() => {
        if (isApiLoading) {
            dispatch(activateSpinner());
        }

        if (error) {
            console.error('API Error:', error);
            dispatch(deactivateSpinner());
            dispatch(activateErrorPage());
            return;
        }

        if (data) {
            dispatch(deactivateSpinner());
            dispatch(deactivateErrorPage());

            const sortedNationalities = [...data].sort((a, b) => 
                a.name.localeCompare(b.name)
            );

            let initialNationality = user?.selectedCountry?.id
                ? _.find(sortedNationalities, { country_id: user.selectedCountry.id })
                : null;

            if (initialNationality) {
                initialNationality = { ...initialNationality, validated: true };
                setNationalitySelected(user?.nationality || initialNationality);
            }

            setNationalities(sortedNationalities);
        }
    }, [data, error, isApiLoading, dispatch, user]);

    // Handle outside clicks
    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (newRef.current && 
                !newRef.current.contains(e.target) && 
                !helper.isTargetContainsIgnoreClass(e.target)) {
                setCollapseNationalityOption(true);
            }
        };

        return helper.addOutsideClick(handleOutsideClick);
    }, []);

    const updateWendogouser = useCallback((simulationStep, nationality) => {
        if (!user) return;

        dispatch(setStep(simulationStep));
        const updatedUser = {
            ...user,
            simulationStep,
            nationality,
            date: new Date().toISOString()
        };
        helper.setLocalStorageWithExpiration('wendogouser', updatedUser);
        dispatch(setUser(updatedUser));
    }, [dispatch, user]);

    const handleContinue = useCallback(() => {
        updateWendogouser(
            SIMULATION_ENGINE_STEPS.DISABLE,
            { ...nationalitySelected, validated: true }
        );
    }, [nationalitySelected, updateWendogouser]);

    const updateSelectedNationality = useCallback((item) => {
        const updatedNationality = {
            name: item.name,
            id: item.id,
            country_id: item.country_id,
            validated: true
        };
        setNationalitySelected(updatedNationality);
        setCollapseNationalityOption(true);
        setFieldDefault(false);
        updateWendogouser(SIMULATION_ENGINE_STEPS.DISABLE, updatedNationality);
    }, [updateWendogouser]);

    const toggleNationalityDropdown = useCallback(() => {
        setCollapseNationalityOption(prev => !prev);
    }, []);

    if (isLoading || isApiLoading) {
        return (
            <div className="flex items-center justify-center min-h-[100px]">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (!user || error) {
        return (
            <div className="flex items-center justify-center min-h-[100px] text-red-500">
                {error ? 'Error loading nationalities' : 'Error loading user data'}
            </div>
        );
    }

    return (
        <SEDropDownList 
            title="Quelle est votre nationalité ?"
            newRef={newRef}
            collapseOption={collapseNationalityOption}
            fieldDefault={fieldDefault}
            items={nationalities}
            itemSelected={nationalitySelected}
            toggleDropdown={toggleNationalityDropdown}
            updateSelected={updateSelectedNationality}
            handleContinue={handleContinue}
            showContinueBtn={simulationStepGlobal === SIMULATION_ENGINE_STEPS.NATIONALITY}
        />
    );
};

export default Nationality;
