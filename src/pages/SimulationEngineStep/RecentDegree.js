import { useState, useEffect, useRef } from 'react';
import { useGetDegreesByBacIdQuery } from '../../store/apis/levelApi';
import { activateSpinner, deactivateSpinner } from '../../redux/spinnerslice'
import { activateErrorPage, deactivateErrorPage } from '../../redux/errorPageSlice';
import SEDropDownList from '../../components/SimulationEngine/SEDropDownList';
import helper from '../../utils/Helper';
import { setUser } from '../../redux/userSlice';
import _ from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { setStep } from '../../redux/simulationStepSlice';
import { SIMULATION_ENGINE_STEPS } from '../../utils/Constants'
import { Loader2 } from "lucide-react";

const RecentDegree = () => {
    const dispatch = useDispatch();
    const [isInitializing, setIsInitializing] = useState(true);
    const user = useSelector((state) => state.user);
    const [degrees, setDegrees] = useState([]);
    const [degreeSelected, setDegreeSelected] = useState(null);
    const [collapseDegreeOption, setCollapseDegreeOption] = useState(true);
    const [fieldDefault, setFieldDefault] = useState(true);
    const newRef = useRef(null);
    const simulationStepGlobal = useSelector((state) => state.simulationStep);

    // Initialize user data and default degree
    useEffect(() => {
        const initializeUserData = () => {
            
            const mostRecentBacId = helper.getMostRecentBacId(user);
            
            let defaultDegree = { id: 'deg00008', name: 'Licence', validated: false };
            if (mostRecentBacId >= 'bac00009') {
                defaultDegree = { id: 'deg00010', name: 'Doctorat', validated: false };
            } else if (mostRecentBacId >= 'bac00007') {
                defaultDegree = { id: 'deg00009', name: 'Master', validated: false };
            }

            
            setDegreeSelected(user?.degreeSelected || defaultDegree);
            setIsInitializing(false);
        };

        initializeUserData();
    }, []);

    const { data, error, isLoading } = useGetDegreesByBacIdQuery(
        user ? helper.getMostRecentBacId(user) : undefined,
        { skip: !user }
    );

    const handleOutsideClick = (e) => {
        if (newRef.current && !newRef.current.contains(e.target) && !helper.isTargetContainsIgnoreClass(e.target)) {
            setCollapseDegreeOption(true);
        }
    };

    const toggleDegreeDropdown = () => {
        setCollapseDegreeOption(!collapseDegreeOption);
    };

    const updateSelectedDegree = (item) => {
        const updatedDegree = { id: item.id, name: item.name, validated: true };
        setDegreeSelected(updatedDegree);
        setCollapseDegreeOption(true);
        setFieldDefault(false);
        updateWendogouser(SIMULATION_ENGINE_STEPS.DEGREE_EXACT_NAME, updatedDegree);
    };

    useEffect(() => {
        if (isLoading) {
            dispatch(activateSpinner());
        }
        if (error) {
            console.error('🛑 error', error);
            dispatch(deactivateSpinner());
            dispatch(activateErrorPage());
        }
        if (data) {
            dispatch(deactivateSpinner());
            dispatch(deactivateErrorPage());
            setDegrees(_.sortBy(data, 'order'));
        }

        helper.addOutsideClick(handleOutsideClick);

        // return () => {
        //     helper.removeOutsideClick(handleOutsideClick);
        // };
    }, [data, error, isLoading, dispatch]);

    const handleContinue = () => {
        updateWendogouser(SIMULATION_ENGINE_STEPS.DEGREE_EXACT_NAME, { ...degreeSelected, validated: true });
    };

    const updateWendogouser = (simulationStep, degreeSelected) => {
        dispatch(setStep(simulationStep));
        const updatedUser = { ...user, simulationStep, degreeSelected, date: new Date().toISOString() };
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
        <SEDropDownList
            title="Quelle est l'équivalence de votre dernier diplôme obtenu ou en cours de préparation ?"
            newRef={newRef}
            collapseOption={collapseDegreeOption}
            fieldDefault={fieldDefault}
            items={degrees}
            itemSelected={degreeSelected}
            toggleDropdown={toggleDegreeDropdown}
            updateSelected={updateSelectedDegree}
            handleContinue={handleContinue}
            showContinueBtn={simulationStepGlobal === SIMULATION_ENGINE_STEPS.RECENT_DEGREE}
        />
    );
};

export default RecentDegree;
