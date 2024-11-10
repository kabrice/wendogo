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
    // user?.isResult2Available pour verifier si on afficher le bouton continuer quand le mainsubject doit s'afficher ou pas
    
    const showContinueBtn = ((!user?.isResult3Available &&!user?.isResult2Available && !user?.mainSubjects) || (user?.isResult3Available || user?.isResult2Available))  && ((simulationStepGlobal === SIMULATION_ENGINE_STEPS.REPORT_CARD1) || (progressBarStep === PROGRESS_BAR_STEPS.BULLETIN_N_2)) 
    const [continueButtonClicked, setContinueButtonClicked] = useState(false); 

    const [subjectStates, setSubjectStates] = useState(Array(periodNumber).fill().map(() => ({ reference: 0, isBaccalaureat: false, isPracticalWork: false, label: { value: '', validated: true }, weight: { value: '', validated: true }, mark: { value: '', validated: true }, rank: { value: '', validated: true } })));
    const [subjectLists, setSubjectLists] = useState( user.reportCard1 ? 
                                                      user.reportCard1 :
                                                      Array(periodNumber).fill([]));
    const [referenceIncs, setReferenceIncs] = useState(Array(periodNumber).fill(0));
    const [isReadModes, setIsReadModes] = useState(Array(periodNumber).fill(true));
    const [isCancelModes, setIsCancelModes] = useState(Array(periodNumber).fill(false));
    const [displayReportCardList, setDisplayReportCardList] = useState(Array(periodNumber).fill(true))
    const [showError, setShowError] = useState(false);

    const mostRecentBacId = helper.getMostRecentBacId(user);
    let bac_year = parseInt(mostRecentBacId.slice(-1))
    //console.log('🥳 mostRecentBacId', mostRecentBacId, bac_year)
    const isBaccalaureatMarkMandatory = bac_year > 5  
    const titleMarkInput = `Veuillez renseigner une nouvelle matière, le ${isBaccalaureatMarkMandatory ? 'coefficient' :user.academicYearHeadDetails1.subjectWeightSystem?.name?.toLowerCase()}, la note et le rang obtenu `;
    const [hasEnterBaccalaureatMarksWhenMandatory, setHasEnterBaccalaureatMarksWhenMandatory] = useState(true);
    const [mainSubjects, setMainSubjects] = useState(user?.mainSubjects);
    const [applyingForMaster, setApplyingForMaster] = useState(user?.applyingForMaster);
    
    const handleContinue = () => { 
        const reportCard = user?.reportCard1;
        const isReportCardsValid = reportCard && subjectLists && !_.every(reportCard.slice(0, -1), _.isEmpty);
        const hasBaccalaureatMarks = reportCard && (!isBaccalaureatMarkMandatory || reportCard[periodNumber - 1]?.length > 0);
        setHasEnterBaccalaureatMarksWhenMandatory(hasBaccalaureatMarks); 
        setContinueButtonClicked(true);
        if ( isReportCardsValid && hasBaccalaureatMarks) {
            setShowError(false);
            let NEXT_EFFECTIVE_STEP = SIMULATION_ENGINE_STEPS.HAS_WON_AWARD
            let nextProgressBarStep = PROGRESS_BAR_STEPS.PARCOURS_ACADEMIQUE_ET_PROFESSIONNEL
            if (!user.isResult2Available && !user.isResult1Available) { 
                setMainSubjects(null)
                const isApplyingForMaster = helper.isApplyingForMaster(user, subjectLists, 2)
                setApplyingForMaster(isApplyingForMaster)
                NEXT_EFFECTIVE_STEP = isApplyingForMaster ? SIMULATION_ENGINE_STEPS.PROGRAM_DOMAIN_BAC_N_2 : SIMULATION_ENGINE_STEPS.MAIN_SUBJECTS_BAC_N_2
                nextProgressBarStep = progressBarStep
            }else{
                window.location.hash = ""
                window.location.hash = "form/PARCOURS_ACADEMIQUE_ET_PROFESSIONNEL";
            }
            updateWendogouser(NEXT_EFFECTIVE_STEP, subjectLists, nextProgressBarStep);      
        } else{
            setShowError(true);
        }
       
    }

    const updateWendogouser = (simulationStep, reportCard1, progressBarStep=PROGRESS_BAR_STEPS.BULLETIN_N_2) => {
        dispatch(setStep(simulationStep)) 
        dispatch(setProgress(progressBarStep))  
        let updatedUser = {...user, simulationStep, reportCard1, progressBarStep, mainSubjects, applyingForMaster, date: new Date().toISOString()}
        helper.setLocalStorageWithExpiration('wendogouser', updatedUser)         
    }

    const renderSEReportCards = () => (
        subjectLists.map((list, index) => (
            isReadModes[index] && ( 
                <SEReportCard
                    period={1}
                    disPlayBacTitle={index === (subjectLists.length-1) && isBaccalaureatMarkMandatory}
                    key={'report1'+index} 
                    header={ index < (subjectLists.length-1)  ?
                        `${user.selectedSchoolYear1?.name} - ${user.academicYearHeadDetails1.academicYearOrganization?.name} N°${index + 1} - ${user.academicYearHeadDetails1.schoolName}` :
                        (isBaccalaureatMarkMandatory ? 'Notes du Baccalauréat' : 'Autre Session')}
                    // subheader={index < (subjectLists.length-1)  ? `${user.degreeSelected?.name} en ${user.degreeExactNameValue}` : ''}
                    subjectList={list} 
                    userData={user}
                    subjectWeightSystem={index === (subjectLists.length-1) && isBaccalaureatMarkMandatory ? 'Coefficient' : user.academicYearHeadDetails1.subjectWeightSystem.name}
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
                    displayReportCardList={displayReportCardList[index]}
                    setDisplayReportCardList={newDisplay => {
                        const updatedDisplay = [...displayReportCardList];
                        updatedDisplay[index] = newDisplay;
                        setDisplayReportCardList(updatedDisplay);
                    }  }
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
                <> 
                <SEMarkInput
                    key={index}
                    id={'SEMarkInput'+index}
                    isBacReportCard={index === (subjectLists.length-1) && isBaccalaureatMarkMandatory}
                    title={titleMarkInput+ `pour `+
                        (index < (subjectLists.length-1)  ?
                        `le ${user.academicYearHeadDetails1.academicYearOrganization.name.toLowerCase()} n°${index + 1} de l'année ${user.selectedSchoolYear1.name}.` :
                        (isBaccalaureatMarkMandatory ? 'votre Baccalauréat' : 'Autre Session'))}
                    tip="Le rang est facultatif. Si inexistant, laissez un vide." 
                    subjectWeightSystem={index === (subjectLists.length-1) && isBaccalaureatMarkMandatory ? 'Coefficient' : user.academicYearHeadDetails1.subjectWeightSystem.name}
                    markSystem={user.academicYearHeadDetails1.markSystem.name}
                    setIsReadMode={newMode => {
                        const updatedModes = [...isReadModes];
                        updatedModes[index] = newMode;
                        setIsReadModes(updatedModes);
                    }} 
                    urlFragment='/subjectmatches/search/'
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
                /></>
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
                        <div className="Tip" style={{marginBottom:'-5px'}}>
                            <span>Gagnez du temps : dupliquez                                 <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"  viewBox="0 0 90.7659 97.9493" version="1.1" className='Navbarstyles__MenuItemArrow'>
                                    <title>Shape</title>
                                    <g id="Page-1" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                                        <g id="noun-duplicate-7205800" fill="currentcolor" fillRule="nonzero">
                                            <path d="M21.2227,23.5081 L21.2227,11.8711 C21.2227,8.6055 22.5586,5.6328 24.7071,3.4844 C26.8594,1.3321 29.8282,0 33.0938,0 L78.8948,0 C82.1604,0 85.1331,1.3359 87.2815,3.4844 C89.4338,5.6367 90.7659,8.6055 90.7659,11.8711 L90.7659,62.5701 C90.7659,65.8357 89.43,68.8084 87.2815,70.9568 C85.1292,73.1091 82.1604,74.4412 78.8948,74.4412 L69.5432,74.4412 L69.5432,86.0782 C69.5432,89.3438 68.2073,92.3165 66.0588,94.4649 C63.9065,96.6172 60.9377,97.9493 57.6721,97.9493 L11.8711,97.9493 C8.6055,97.9493 5.6328,96.6134 3.4844,94.4649 C1.3321,92.3126 0,89.3438 0,86.0782 L0,35.3792 C0,32.1136 1.3359,29.1409 3.4844,26.9925 C5.6367,24.8402 8.6055,23.5081 11.8711,23.5081 L21.2227,23.5081 Z M69.5467,69.8521 L78.8983,69.8521 C80.8983,69.8521 82.7186,69.03179 84.0389,67.7115 C85.3592,66.3912 86.1795,64.5709 86.1795,62.5709 L86.1795,11.8719 C86.1795,9.8719 85.35919,8.0516 84.0389,6.7313 C82.7186,5.411 80.8983,4.5907 78.8983,4.5907 L33.0973,4.5907 C31.0973,4.5907 29.277,5.41101 27.9567,6.7313 C26.6325,8.0516 25.8161,9.8719 25.8161,11.8719 L25.8161,23.5089 L57.6751,23.5089 C60.9407,23.5089 63.9134,24.8448 66.0618,26.9933 C68.2141,29.1456 69.5462,32.1105 69.5462,35.38 L69.5467,69.8521 Z" id="Shape" /> </g>
                                    </g>
                                </svg> et modifiez les bulletins pour les {user.academicYearHeadDetails1.academicYearOrganization?.name?.toLowerCase()+'s'} similaires.</span>
                        </div>
                        <div className="DrawerAnimation" />
                        {renderSEReportCards()}
                        
                    </div>
                </div>
            )}
            {/* <h1>{' KK '+isReadModes.every(mode => mode)+ ' '+showContinueBtn}</h1> */}
            {isReadModes.every(mode => mode) && showContinueBtn && 
                 <>{showError && <SESmallAlertMessage type="error" content={hasEnterBaccalaureatMarksWhenMandatory ? "Vous n'avez saisi aucune note de "+user.academicYearHeadDetails1.academicYearOrganization.name.toLowerCase()+"." : "Vous n'avez pas saisi de note pour votre Baccalauréat."} />}
                <div className="FieldView field-valid">
                            <ButtonLarge name="Continuer" handleContinue={handleContinue}/></div></>}
            {renderSEMarkInputs()}
            
        </>
    );
};

export default ReportCard1;
