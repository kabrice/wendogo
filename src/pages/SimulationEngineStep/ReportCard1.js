import React, { useState, useEffect } from 'react';
import SEReportCard from '../../components/SimulationEngine/SEReportCard';
import SEMarkInput from '../../components/SimulationEngine/SEMarkInput'; 
import { useDispatch, useSelector } from 'react-redux';
import { setStep } from '../../redux/simulationStepSlice';
import {setProgress} from "../../redux/progressBarStepSlice";
import helper from '../../utils/Helper';
import ButtonLarge from '../../components/ButtonLarge';
import {SIMULATION_ENGINE_STEPS, PROGRESS_BAR_STEPS} from '../../utils/Constants'
import SESmallAlertMessage from '../../components/SimulationEngine/SESmallAlertMessage';
import _ from 'lodash';

const ReportCard1 = () => {
    const dispatch = useDispatch();
    const user = helper.getLocalStorageWithExpiration('wendogouser'); 
    const periodNumber = user.academicYearHeadDetails1.academicYearOrganization?.name === 'Trimestre' ? 4 : 3;

    const simulationStepGlobal = useSelector(state => state.simulationStep);
    const progressBarStep = useSelector((state) => state.progressBarStep); 
    const showContinueBtn = (simulationStepGlobal === SIMULATION_ENGINE_STEPS.REPORT_CARD1) || (progressBarStep === PROGRESS_BAR_STEPS.BULLETIN_N_2) 
    const [continueButtonClicked, setContinueButtonClicked] = useState(false); 

    const [subjectStates, setSubjectStates] = useState(Array(periodNumber).fill().map(() => ({ reference: 0, label: { value: '', validated: true }, weight: { value: '', validated: true }, mark: { value: '', validated: true }, rank: { value: '', validated: true } })));
    const [subjectLists, setSubjectLists] = useState( user.reportCard1 ? 
                                                      user.reportCard1 :
                                                      Array(periodNumber).fill([]));
    const [referenceIncs, setReferenceIncs] = useState(Array(periodNumber).fill(0));
    const [isReadModes, setIsReadModes] = useState(Array(periodNumber).fill(true));
    const [isCancelModes, setIsCancelModes] = useState(Array(periodNumber).fill(false));
    const [showError, setShowError] = useState(false);
    const titleMarkInput = `Veuillez renseigner une nouvelle matière, le ${user.academicYearHeadDetails1.subjectWeightSystem?.name?.toLowerCase()}, la note et le rang obtenu `;

    const handleContinue = () => { 
        const reportCardExistsAndNotEmpty =  subjectLists && !_.every(user.reportCard1, _.isEmpty);
        setContinueButtonClicked(true);
        if ( reportCardExistsAndNotEmpty) {
            setShowError(false);
            console.log('🥳 XXXX', subjectLists)
            updateWendogouser(SIMULATION_ENGINE_STEPS.HAS_WON_AWARD, subjectLists, PROGRESS_BAR_STEPS.PARCOURS_ACADEMIQUE_ET_PROFESSIONNEL)   
            window.location.hash = ""
            window.location.hash = "form/PARCOURS_ACADEMIQUE_ET_PROFESSIONNEL";
        } else{
            setShowError(true);
        }
       
    }

    const updateWendogouser = (simulationStep, reportCard1, progressBarStep=PROGRESS_BAR_STEPS.BULLETIN_N_2) => {
        dispatch(setStep(simulationStep)) 
        dispatch(setProgress(progressBarStep)) 
        let updatedUser = {...user, simulationStep, reportCard1, progressBarStep, date: new Date().toISOString()}
        helper.setLocalStorageWithExpiration('wendogouser', updatedUser, false)         
    }

    const renderSEReportCards = () => (
        subjectLists.map((list, index) => (
            isReadModes[index] && ( 
                <SEReportCard
                    key={index}
                    header={ index < (subjectLists.length-1)  ?
                        `${user.selectedSchoolYear1?.name} - ${user.academicYearHeadDetails1.academicYearOrganization?.name} N°${index + 1} - ${user.academicYearHeadDetails1.schoolName}` :
                        'Autre Session'}
                    // subheader={index < (subjectLists.length-1)  ? `${user.degreeSelected?.name} en ${user.degreeExactNameValue}` : ''}
                    subjectList={list} 
                    setSubject={newSubject => {
                        const updatedSubjects = [...subjectStates];
                        updatedSubjects[index] = newSubject;
                        setSubjectStates(updatedSubjects);
                    }}
                    setIsReadMode={newMode => {
                        const updatedModes = [...isReadModes];
                        updatedModes[index] = newMode;
                        setIsReadModes(updatedModes);
                    }}
                    setIsCancelModes={newMode => {
                        const updatedModes = [...isCancelModes];
                        updatedModes[index] = newMode;
                        setIsCancelModes(updatedModes);
                    }}
                    setSubjectList={newList => {
                        const updatedLists = [...subjectLists];
                        updatedLists[index] = newList(subjectLists[index]) // cause at this point, newList is a function-
                        setSubjectLists(updatedLists);
                    }}
                /> 
            )
        ))
    );

    const renderSEMarkInputs = () => (
        subjectLists.map((_, index) => (
            (!isReadModes[index]) && (
                <SEMarkInput
                    key={index}
                    id={'SEMarkInput'+index}
                    title={titleMarkInput+ `pour `+
                        (index < (subjectLists.length-1)  ?
                        `le ${user.academicYearHeadDetails1.academicYearOrganization.name.toLowerCase()} n°${index + 1} de l'année ${user.selectedSchoolYear1.name}.` :
                        'une Autre Session')}
                    tip="Le rang est facultatif. Si inexistant, laissez un vide."
                    subjectWeightSystem={user.academicYearHeadDetails1.subjectWeightSystem.name}
                    markSystem={user.academicYearHeadDetails1.markSystem.name}
                    setIsReadMode={newMode => {
                        const updatedModes = [...isReadModes];
                        updatedModes[index] = newMode;
                        setIsReadModes(updatedModes);
                    }}
                    urlFragment='/levelvalue/search/'
                    subject={subjectStates[index]}
                    setSubject={newSubject => {
                        const updatedSubjects = [...subjectStates];
                        updatedSubjects[index] = newSubject;
                        //console.log('🥳 newSubject', updatedSubjects);
                        setSubjectStates(updatedSubjects);
                    }}
                    showContinueBtn={1}
                    setReferenceInc={newInc => {
                        const updatedIncs = [...referenceIncs];
                        updatedIncs[index] = newInc(referenceIncs[index]);
                        setReferenceIncs(updatedIncs);
                    }}
                    referenceInc={referenceIncs[index]}
                    subjectList={subjectLists[index]}
                    setSubjectList={newList => {
                        const updatedLists = [...subjectLists];
                        updatedLists[index] = newList(subjectLists[index]) // cause at this point, newList is a function-
                        setSubjectLists(updatedLists);
                    }}
                />
            )
        ))
    );
 
    useEffect(() => {
        if(continueButtonClicked  || isReadModes.some(mode => mode === false) || isCancelModes.some(mode => mode === true)){
            updateWendogouser(SIMULATION_ENGINE_STEPS.REPORT_CARD1, subjectLists);
            setIsCancelModes(Array(periodNumber).fill(false));
            setShowError(false);
        }
    }, [subjectLists, isReadModes])
    
    return (
        <>
            {isReadModes.every(mode => mode) && (
                <div className="FieldWrapper">
                    <div className="FieldView field-valid">
                        <div className="FieldView-flex-container">
                            <label className="Label">{`Veuillez renseigner toutes les matières par ${user.academicYearHeadDetails1.academicYearOrganization?.name?.toLowerCase()} pour l'année ${user.selectedSchoolYear1.name}.`}</label>
                        </div>
                        <div className="DrawerAnimation" />
                        {renderSEReportCards()}
                        
                    </div>
                </div>
            )}
            
            {isReadModes.every(mode => mode) && showContinueBtn && 
                 <>{showError && <SESmallAlertMessage type="error" content="Vous n'avez saisi aucune note." />}
                <div className="FieldView field-valid">
                            <ButtonLarge name="Continuer" handleContinue={handleContinue}/></div></>}
            {renderSEMarkInputs()}
            
        </>
    );
};

export default ReportCard1;
