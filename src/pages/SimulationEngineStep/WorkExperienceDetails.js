import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setStep } from '../../redux/simulationStepSlice';
import { SIMULATION_ENGINE_STEPS } from '../../utils/Constants';
import SELabel from '../../components/SimulationEngine/SELabel';
import ButtonLarge from '../../components/ButtonLarge';
import SE2DateInput from '../../components/SimulationEngine/SE2DateInput';
import SETextArea from '../../components/SimulationEngine/SETextArea';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import helper from '../../utils/Helper';
import { setUser } from '../../redux/userSlice';
import { Loader2 } from "lucide-react";

const WorkExperienceDetails = () => {
    const dispatch = useDispatch();

    // Core states
    const [isInitializing, setIsInitializing] = useState(true);
    const user = useSelector((state) => state.user);
    const [workExperience, setWorkExperience] = useState({});

    // Form states
    const [description, setDescription] = useState('');
    const [startDay, setStartDay] = useState('');
    const [startMonth, setStartMonth] = useState('');
    const [startYear, setStartYear] = useState('');
    const [endDay, setEndDay] = useState('');
    const [endMonth, setEndMonth] = useState('');
    const [endYear, setEndYear] = useState('');
    const [hideEndDate, setHideEndDate] = useState(false);

    // Validation states
    const [isStartDateValid, setIsStartDateValid] = useState(false);
    const [isEndDateValid, setIsEndDateValid] = useState(false);
    const [showError, setShowError] = useState(false);
    const [validDescription, setValidDescription] = useState(false);
    const [isButtonClicked, setIsButtonClicked] = useState(false);

    const simulationStepGlobal = useSelector(state => state.simulationStep);
    const showContinueBtn = simulationStepGlobal === SIMULATION_ENGINE_STEPS.WORK_EXPERIENCE_DETAILS;

    // Initialize user data and form states
    useEffect(() => {
        const initializeData = () => {
            
            if (!user) return;

            
            const initialWorkExperience = user?.workExperience || {};
            setWorkExperience(initialWorkExperience);

            // Initialize form states from saved data
            setDescription(initialWorkExperience.description || '');
            if (initialWorkExperience.startDate) {
                const [day, month, year] = initialWorkExperience.startDate.split('/');
                setStartDay(day);
                setStartMonth(month);
                setStartYear(year);
            }
            if (initialWorkExperience.endDate) {
                const [day, month, year] = initialWorkExperience.endDate.split('/');
                setEndDay(day);
                setEndMonth(month);
                setEndYear(year);
            }
            setHideEndDate(initialWorkExperience.hideEndDate || false);
            setIsStartDateValid(initialWorkExperience.validated || false);
            setIsEndDateValid(initialWorkExperience.validated || false);
            setValidDescription(initialWorkExperience.description ? true : false);

            setIsInitializing(false);
        };

        initializeData();
    }, []);

    // Handle date changes effect
    useEffect(() => {
        if (showError) {
            setShowError(false);
        }
        if (isButtonClicked && (startDay || startMonth || startYear || endDay || endMonth || endYear)) {
            handleDates();
        }
    }, [startDay, startMonth, startYear, endDay, endMonth, endYear, showError, isButtonClicked]);

    const doesDescriptionIsValid = (description) => {
        return description.trim().length >= 10 && /[a-zA-Z].*[a-zA-Z]/.test(description);
    };

    const handleChangeDescription = (e) => {
        const inputValue = e.target.value;
        setDescription(inputValue);
        const updatedWorkExperience = { ...workExperience, description: inputValue };
        setWorkExperience(updatedWorkExperience);
        updateWendogouser(SIMULATION_ENGINE_STEPS.WORK_EXPERIENCE_DETAILS, updatedWorkExperience);
    };

    const handleChangeCheckbox = (e) => {
        const isChecked = e.target.checked;
        setHideEndDate(isChecked);
        
        if (isChecked) {
            setEndDay('');
            setEndMonth('');
            setEndYear('');
            const updatedWorkExperience = { 
                ...workExperience, 
                endDate: null, 
                hideEndDate: true 
            };
            setWorkExperience(updatedWorkExperience);
            updateWendogouser(SIMULATION_ENGINE_STEPS.WORK_EXPERIENCE_DETAILS, updatedWorkExperience);
        } else {
            const updatedWorkExperience = { 
                ...workExperience, 
                hideEndDate: false 
            };
            setWorkExperience(updatedWorkExperience);
            updateWendogouser(SIMULATION_ENGINE_STEPS.WORK_EXPERIENCE_DETAILS, updatedWorkExperience);
        }
    };

    const handleDates = () => {
        const start = `${startYear}-${startMonth.padStart(2, '0')}-${startDay.padStart(2, '0')}`;
        const end = `${endYear}-${endMonth.padStart(2, '0')}-${endDay.padStart(2, '0')}`;
        const updatedWorkExperience = { 
            ...workExperience, 
            startDate: start, 
            endDate: end 
        };
        setWorkExperience(updatedWorkExperience);
        updateWendogouser(SIMULATION_ENGINE_STEPS.WORK_EXPERIENCE_DETAILS, updatedWorkExperience);
    };

    const handleContinue = () => {
        const isDescriptionValid = doesDescriptionIsValid(description);
        setValidDescription(isDescriptionValid);

        if (!isDescriptionValid || !isStartDateValid || (!isEndDateValid && !hideEndDate)) {
            setShowError(true);
            return;
        }

        if (isStartDateValid && (isEndDateValid || hideEndDate) && isDescriptionValid) {
            const start = `${startDay.padStart(2, '0')}/${startMonth.padStart(2, '0')}/${startYear}`;
            const end = hideEndDate ? null : `${endDay.padStart(2, '0')}/${endMonth.padStart(2, '0')}/${endYear}`;
            
            const updatedWorkExperience = {
                ...workExperience,
                startDate: start,
                endDate: end,
                description,
                hideEndDate,
                validated: true
            };
            
            updateWendogouser(SIMULATION_ENGINE_STEPS.CAN_PROVE_WORK_EXPERIENCE, updatedWorkExperience);
        }
    };

    const updateWendogouser = (simulationStep, workExperience) => {
        const updatedUser = {
            ...user,
            simulationStep,
            workExperience,
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
        <div style={{ margin: '0 0 35px' }}>
            <SELabel title="Donnez quelques renseignements sur cette expérience" />
            <SETextArea
                placeholderText="Résumé succinct de cette expérience."
                id="DESCRIPTION"
                isPartOfInputGroup={true}
                value={description}
                valid={!showError || validDescription}
                setValid={setValidDescription}
                onClickOutside={doesDescriptionIsValid}
                maxLength={1000}
                handleChange={handleChangeDescription}
            />
            
            <SE2DateInput
                titleStartDate="Date de début"
                titleEndDate="Date de fin"
                hideEndDate={hideEndDate}
                showContinueBtn={true}
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
                sendFormattedDateResultToParent={handleDates}
                validated={!showError || isStartDateValid || isEndDateValid}
                isStartDateValid={!showError || isStartDateValid}
                setIsStartDateValid={setIsStartDateValid}
                isButtonClicked={isButtonClicked}
                setIsButtonClicked={setIsButtonClicked}
                isEndDateValid={!showError || hideEndDate || isEndDateValid}
                setIsEndDateValid={setIsEndDateValid}
            />

            <FormControlLabel
                sx={{ margin: '-25px 0 20px -7px' }}
                control={
                    <Checkbox 
                        checked={hideEndDate} 
                        onChange={handleChangeCheckbox} 
                        sx={{ color: '#acbac8', borderWidth: '1px' }} 
                    />
                }
                label="J'occupe actuellement ce poste"
            />

            {showContinueBtn && (
                <div className="FieldView DaisyFieldView field-default SelectField VEH_USA_KILOM" 
                     style={{ marginTop: '-35px' }}>
                    <ButtonLarge 
                        name="Continuer" 
                        handleContinue={handleContinue}
                        uniqueId="WorkExperienceDetails-continue-btn"
                    />
                </div>
            )}
        </div>
    );
};

export default WorkExperienceDetails;
