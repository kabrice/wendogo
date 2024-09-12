import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import { setStep } from '../../redux/simulationStepSlice';
import helper from '../../utils/Helper';
import SELabel from '../../components/SimulationEngine/SELabel'; 
import ButtonLarge from '../../components/ButtonLarge'; 
import SE2DateInput from '../../components/SimulationEngine/SE2DateInput';
import { SIMULATION_ENGINE_STEPS } from '../../utils/Constants';  
import SETextArea from '../../components/SimulationEngine/SETextArea'; 
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const WorkExperienceDetails = () => {
    const dispatch = useDispatch(); 
    const simulationStepGlobal = useSelector(state => state.simulationStep);
    const showContinueBtn = simulationStepGlobal === SIMULATION_ENGINE_STEPS.WORK_EXPERIENCE_DETAILS;
    
    const user = helper.getLocalStorageWithExpiration('wendogouser');
    const initialWorkExperience = user?.workExperience || {};
    
    // State variables  
    const [description, setDescription] = useState(initialWorkExperience.description || ''); 
    const [workExperience, setWorkExperience] = useState(initialWorkExperience);
    const [startDay, setStartDay] = useState(initialWorkExperience.startDate?.split('/')[0] || '');
    const [startMonth, setStartMonth] = useState(initialWorkExperience.startDate?.split('/')[1] || '');
    const [startYear, setStartYear] = useState(initialWorkExperience.startDate?.split('/')[2] || '');
    const [endDay, setEndDay] = useState(initialWorkExperience.endDate?.split('/')[0] || '');
    const [endMonth, setEndMonth] = useState(initialWorkExperience.endDate?.split('/')[1] || '');
    const [endYear, setEndYear] = useState(initialWorkExperience.endDate?.split('/')[2] || '');
    const [hideEndDate, setHideEndDate] = useState(initialWorkExperience.hideEndDate ||false);
    const [isStartDateValid, setIsStartDateValid] = useState(initialWorkExperience.validated);
    const [isEndDateValid, setIsEndDateValid] = useState(initialWorkExperience.validated);
    const [showError, setShowError] = useState(false);
    const [validDescription, setValidDescription] = useState(description !== '');
    const [isButtonClicked, setIsButtonClicked] = useState(false);

    useEffect(() => {
        if (showError) {
            setShowError(false);
        }
        if(isButtonClicked && (startDay || startMonth || startYear || endDay || endMonth || endYear)) {
            handleDates();
        }
    }, [startDay, startMonth, startYear, endDay, endMonth, endYear]);

    const doesDescriptionIsValid = (description) => {
        return description.trim().length >= 10 && /[a-zA-Z].*[a-zA-Z]/.test(description);
    };

    const handleChangeDescription = (e) => {
        const inputValue = e.target.value;
        setDescription(inputValue);  
        setWorkExperience(prev => ({ ...prev, description: inputValue }));
        updateWendogouser(SIMULATION_ENGINE_STEPS.WORK_EXPERIENCE_DETAILS, { ...workExperience, description: inputValue });
    };

    const handleChangeCheckbox = (e) => {
        setHideEndDate(e.target.checked);
        if (e.target.checked) {
            setEndDay('');
            setEndMonth('');
            setEndYear(''); 
            setWorkExperience(prev => ({ ...prev, endDate: null, hideEndDate: true }));
            updateWendogouser(SIMULATION_ENGINE_STEPS.WORK_EXPERIENCE_DETAILS, { ...workExperience, endDate: null });
        }else{
            setWorkExperience(prev => ({ ...prev, hideEndDate: false }));
            updateWendogouser(SIMULATION_ENGINE_STEPS.WORK_EXPERIENCE_DETAILS, { ...workExperience, hideEndDate: false });
        } 

    };
    
    const updateWendogouser = (simulationStep, workExperience) => {
        dispatch(setStep(simulationStep));
        const updatedUser = { ...user, simulationStep, workExperience, date: new Date().toISOString() };
        helper.setLocalStorageWithExpiration('wendogouser', updatedUser, false);
    };

    const handleContinue = () => {
        const isDescriptionValid = doesDescriptionIsValid(description);
        setValidDescription(isDescriptionValid);

        if (!isDescriptionValid || !isStartDateValid || (!isEndDateValid && !hideEndDate)) {
            setShowError(true);
        }

        if (isStartDateValid && (isEndDateValid || hideEndDate) && isDescriptionValid) {
            const start = `${startDay.padStart(2, '0')}/${startMonth.padStart(2, '0')}/${startYear}`;
            const end = hideEndDate ? null : `${endDay.padStart(2, '0')}/${endMonth.padStart(2, '0')}/${endYear}`;
            
            updateWendogouser(SIMULATION_ENGINE_STEPS.CAN_PROVE_WORK_EXPERIENCE, { 
                ...workExperience, 
                startDate: start, 
                endDate: end, 
                description, 
                hideEndDate,
                validated: true 
            });
        }
    };


    const handleDates = () => {
        const start = `${startYear}-${startMonth.padStart(2, '0')}-${startDay.padStart(2, '0')}`;
        const end = `${endYear}-${endMonth.padStart(2, '0')}-${endDay.padStart(2, '0')}`;
        setWorkExperience(prev => ({ ...prev, startDate: start, endDate: end }));
        updateWendogouser(SIMULATION_ENGINE_STEPS.WORK_EXPERIENCE_DETAILS, { ...workExperience, startDate: start, endDate: end });
    };

    return (
        <div style={{ margin: '0 0 35px' }}>
            <SELabel title="Donnez quelques renseignements sur cette expérience professionnelle" />
            <SETextArea
                placeholderText="Résumé succinct de cette expérience professionnelle."
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
                control={<Checkbox checked={hideEndDate} onChange={handleChangeCheckbox} sx={{ color: '#acbac8', borderWidth: '1px' }} />}
                label="J'occupe actuellement ce poste"
            />
            {showContinueBtn && (
                <div className="FieldView DaisyFieldView field-default SelectField VEH_USA_KILOM" style={{ marginTop: '-35px' }}>
                    <ButtonLarge name="Continuer" handleContinue={handleContinue} />
                </div>
            )}
        </div>
    );
};

export default WorkExperienceDetails;
