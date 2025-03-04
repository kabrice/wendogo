'use client';

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setStep } from '../../redux/simulationStepSlice';
import { setProgress } from "../../redux/progressBarStepSlice";
import helper from '../../utils/Helper';
import { setUser } from '../../redux/userSlice';
import ButtonLarge from '../../components/ButtonLarge';
import SEReportCard from '../../components/SimulationEngine/SEReportCard';
import SEMarkInput from '../../components/SimulationEngine/SEMarkInput';
import SESmallAlertMessage from '../../components/SimulationEngine/SESmallAlertMessage';
import { SIMULATION_ENGINE_STEPS, PROGRESS_BAR_STEPS } from '../../utils/Constants';
import { Loader2 } from "lucide-react";
import _ from 'lodash';
import SvgConstant from '../../utils/SvgConstant';

const ReportCard2 = () => {
    const dispatch = useDispatch();
    const [isInitializing, setIsInitializing] = useState(true);
    const user = useSelector((state) => state.user);
    const [periodNumber, setPeriodNumber] = useState(0);
    const simulationStepGlobal = useSelector(state => state.simulationStep);
    const isInPremiereClassGlobal = useSelector(state => state.premiereClass.active);
    const progressBarStep = useSelector(state => state.progressBarStep);

    // Initialize state
    const [continueButtonClicked, setContinueButtonClicked] = useState(false);
    const [subjectStates, setSubjectStates] = useState([]);
    const [subjectLists, setSubjectLists] = useState([]);
    const [referenceIncs, setReferenceIncs] = useState([]);
    const [isReadModes, setIsReadModes] = useState([]);
    const [isCancelModes, setIsCancelModes] = useState([]);
    const [displayReportCardList, setDisplayReportCardList] = useState([]);
    const [showError, setShowError] = useState(false);
    const [hasEnterBaccalaureatMarksWhenMandatory, setHasEnterBaccalaureatMarksWhenMandatory] = useState(true);
    const [applyingForMaster, setApplyingForMaster] = useState(false);
    const [isBaccalaureatMarkMandatory, setIsBaccalaureatMarkMandatory] = useState(false);
    const [titleMarkInput, setTitleMarkInput] = useState('');

    // Initialize user data and states
    useEffect(() => {
        const initializeData = () => {
            
            if (!user) return;

            const periods = user.academicYearHeadDetails2?.academicYearOrganization?.name === 'Trimestre' ? 4 : 3;
            setPeriodNumber(periods);

            // Initialize all state arrays based on period number
            const initialSubjectState = {
                reference: 0,
                isBaccalaureat: false,
                isPracticalWork: false,
                label: { value: '', validated: true },
                weight: { value: '', validated: true },
                mark: { value: '', validated: true },
                rank: { value: '', validated: true }
            };

            setSubjectStates(Array(periods).fill(initialSubjectState));
            setSubjectLists((user?.reportCard2?.length === periods ? user?.reportCard2 : Array(periods).fill([])) || Array(periods).fill([]));
            //setSubjectLists(user.reportCard2 || Array(periods).fill([]));
            setReferenceIncs(Array(periods).fill(0));
            setIsReadModes(Array(periods).fill(true));
            setIsCancelModes(Array(periods).fill(false));
            setDisplayReportCardList(Array(periods).fill(true));

            // Calculate bac-related values
            const mostRecentBacId = helper.getMostRecentBacId(user);
            const bacId = `bac0000${parseInt(mostRecentBacId?.slice(-1)) - 1}`;
            const isBacMandatory = (bacId === 'bac00004') || (mostRecentBacId === 'bac00004');
            setIsBaccalaureatMarkMandatory(isBacMandatory);

            // Set other state values
            setApplyingForMaster(user.applyingForMaster);
            setTitleMarkInput(`Veuillez renseigner une nouvelle matière, le ${
                isBacMandatory ? 'coefficient' : user.academicYearHeadDetails2.subjectWeightSystem?.name?.toLowerCase()
            }, la note et le rang obtenu `);

            
            setIsInitializing(false);
        };

        initializeData();
    }, []);

    const showContinueBtn = user && (
        ((!user.isResult3Available && !user.mainSubjects) || user.isResult3Available) && 
        ((simulationStepGlobal === SIMULATION_ENGINE_STEPS.REPORT_CARD2) || 
        (progressBarStep === PROGRESS_BAR_STEPS.BULLETIN_N_1)) &&
        ![SIMULATION_ENGINE_STEPS.PROGRAM_DOMAIN, 
          SIMULATION_ENGINE_STEPS.PROGRAM_DOMAIN_BAC_N_1, 
          SIMULATION_ENGINE_STEPS.PROGRAM_DOMAIN_BAC_N_2,
          SIMULATION_ENGINE_STEPS.MAIN_SUBJECTS_BAC_N_1,
          SIMULATION_ENGINE_STEPS.MAIN_SUBJECTS_BAC_N_2,
          SIMULATION_ENGINE_STEPS.MAIN_SUBJECTS].includes(simulationStepGlobal 
            
          )
    );
    
    const handleContinue = () => {
        const reportCard = user?.reportCard2;
        const isReportCardsValid = reportCard && subjectLists && !_.every(reportCard.slice(0, -1), _.isEmpty);
        const hasBaccalaureatMarks = reportCard && (!isBaccalaureatMarkMandatory || reportCard[periodNumber - 1]?.length > 0);
        
        setHasEnterBaccalaureatMarksWhenMandatory(hasBaccalaureatMarks);
        setContinueButtonClicked(true);

        if (isReportCardsValid && hasBaccalaureatMarks) {
            let nextProgressBarStep = isInPremiereClassGlobal ? 
                PROGRESS_BAR_STEPS.PARCOURS_ACADEMIQUE_ET_PROFESSIONNEL : 
                PROGRESS_BAR_STEPS.BULLETIN_N_2;
            setShowError(false);

            let nextStep = SIMULATION_ENGINE_STEPS.IS_YEAR_1_RESULTS_AVAILABLE;

            const processedSubjectLists = subjectLists.map((periodSubjects, periodIndex) => {
                // Determine the mark system for this period
                let effectiveMarkSystem = user.academicYearHeadDetails2.markSystem.name;
                const isBacReportCard = (periodIndex === subjectLists.length - 1 && isBaccalaureatMarkMandatory);
                
                if (isBacReportCard) {
                    effectiveMarkSystem = 'Sur 20';
                }
    
                // Process each subject in the period
                return periodSubjects.map(subject => {
                    const currentValue = subject.mark.value;
                    let valueIn20 = subject?.mark?.valueIn20;
    
                    // If valueIn20 is not set, try to convert it
                    if (valueIn20 === null || valueIn20 === undefined) {
                        valueIn20 = helper.convertToSur20(currentValue, effectiveMarkSystem);
                    }
    
                    return {
                        ...subject,
                        mark: {
                            ...subject.mark,
                            valueIn20
                        }
                    };
                });
            });

                    // Check if any marks couldn't be converted
            const hasInvalidMarks = processedSubjectLists.some(periodSubjects =>
                periodSubjects.some(subject => 
                    subject.mark.value && subject.mark.valueIn20 === null
                )
            );

            if (hasInvalidMarks) {
                setShowError(true);
                console.log("Certaines notes n'ont pas pu être converties sur 20. Veuillez vérifier vos notes.");
                return;
            }
            setShowError(false);
            
            if (!user.isResult3Available) {
                const isApplyingForMaster = helper.isApplyingForMaster(user, processedSubjectLists, 1);
                setApplyingForMaster(isApplyingForMaster);
                nextStep = isApplyingForMaster ? 
                    SIMULATION_ENGINE_STEPS.PROGRAM_DOMAIN_BAC_N_1 : 
                    SIMULATION_ENGINE_STEPS.MAIN_SUBJECTS_BAC_N_1;
                nextProgressBarStep = progressBarStep;
            } else {
                window.location.hash = "";
                window.location.hash = isInPremiereClassGlobal ? 
                    "form/PARCOURS_ACADEMIQUE_ET_PROFESSIONNEL" : 
                    "form/BULLETIN_N_2";
            }

            updateWendogouser(
                isInPremiereClassGlobal ? SIMULATION_ENGINE_STEPS.HAS_WON_AWARD : nextStep,
                processedSubjectLists,
                nextProgressBarStep
            );
        } else {
            setShowError(true);
        }
    };

    const updateWendogouser = (simulationStep, reportCard2, progressBarStep = PROGRESS_BAR_STEPS.BULLETIN_N_1) => {
        dispatch(setStep(simulationStep));
        dispatch(setProgress(progressBarStep));
        const updatedUser = {
            ...user,
            simulationStep,
            reportCard2,
            progressBarStep,
            applyingForMaster,
            date: new Date().toISOString()
        };
        //alert('mainSubjects '+user?.mainSubjectStep + ' '+(SIMULATION_ENGINE_STEPS.MAIN_SUBJECTS_BAC_N_1+1))
        if(user?.mainSubjectStep === (SIMULATION_ENGINE_STEPS.MAIN_SUBJECTS_BAC_N_1+1)){
            updatedUser.mainSubjects = null;
        }
        // console.log('KKK ReportCard2', user)
        helper.setLocalStorageWithExpiration('wendogouser', updatedUser);
        dispatch(setUser(updatedUser));
    };

    useEffect(() => {
        console.log('dddxx ', simulationStepGlobal, SIMULATION_ENGINE_STEPS.REPORT_CARD2)
        if ((continueButtonClicked || isReadModes.some(mode => !mode) || isCancelModes.some(mode => mode) || subjectLists.length > 0)
            && (simulationStepGlobal  <= SIMULATION_ENGINE_STEPS.REPORT_CARD2)) {
       //console.log('ddd ', simulationStepGlobal, SIMULATION_ENGINE_STEPS.PROGRAM_DOMAIN_BAC_N_1, SIMULATION_ENGINE_STEPS.MAIN_SUBJECTS_BAC_N_1)
            updateWendogouser(SIMULATION_ENGINE_STEPS.REPORT_CARD2, subjectLists);
            setIsCancelModes(Array(periodNumber).fill(false));
            setShowError(false);
        }
    }, [subjectLists, isReadModes.some(mode => !mode), isCancelModes.some(mode => mode)]);

    if (isInitializing) {
        return (
            <div className="flex items-center justify-center min-h-[200px]">
                <Loader2 className="w-8 h-8 animate-spin" />
            </div>
        );
    }

    const renderSEReportCards = () => (
        subjectLists.map((list, index) => (
            isReadModes[index] && (
                <SEReportCard
                    key={`report2${index}`}
                    svgConstantName="YEAR_N_1"
                    period={2}
                    disPlayBacTitle={index === (subjectLists.length-1) && isBaccalaureatMarkMandatory}
                    header={index < (subjectLists.length-1) ?
                        `${user.selectedSchoolYear2?.name} - ${user.academicYearHeadDetails2?.academicYearOrganization?.name} N°${index + 1} - ${user.academicYearHeadDetails2.schoolName}` :
                        (isBaccalaureatMarkMandatory ? 'Notes du Baccalauréat' : 'Autre Session')}
                    user={user}
                    subjectList={list}
                    subjectWeightSystem={index === (subjectLists.length-1) && isBaccalaureatMarkMandatory ? 'Coefficient' : user.academicYearHeadDetails2.subjectWeightSystem.name}
                    setSubject={newSubject => {
                        setSubjectStates(prev => {
                            const updated = [...prev];
                            updated[index] = newSubject;
                            return updated;
                        });
                    }}
                    setIsReadMode={newMode => {
                        setIsReadModes(prev => {
                            const updated = [...prev];
                            updated[index] = newMode;
                            return updated;
                        });
                    }}
                    setIsCancelModes={newMode => {
                        setIsCancelModes(prev => {
                            const updated = [...prev];
                            updated[index] = newMode;
                            return updated;
                        });
                    }}
                    displayReportCardList={displayReportCardList[index]}
                    setDisplayReportCardList={newDisplay => {
                        setDisplayReportCardList(prev => {
                            const updated = [...prev];
                            updated[index] = newDisplay;
                            return updated;
                        });
                    }}
                    setSubjectList={newList => {
                        setSubjectLists(prev => {
                            const updated = [...prev];
                            updated[index] = newList(prev[index]);
                            return updated;
                        });
                    }}
                />
            )
        ))
    );

    const renderSEMarkInputs = () => (
        subjectLists.map((_, index) => (
            !isReadModes[index] && (
                <SEMarkInput
                    key={`SEMarkInput${index}`}
                    svgConstantName="YEAR_N_1"
                    id={`SEMarkInput${index}`}
                    isBacReportCard={index === (subjectLists.length-1) && isBaccalaureatMarkMandatory}
                    title={`${titleMarkInput}pour ${
                        index < (subjectLists.length-1) ?
                        `le ${user.academicYearHeadDetails2?.academicYearOrganization.name.toLowerCase()} n°${index + 1} de l'année ${user.selectedSchoolYear2.name}.` :
                        (isBaccalaureatMarkMandatory ? 'votre Baccalauréat' : 'Autre Session')
                    }`}
                    tip="Le rang est facultatif. Si inexistant, laissez un vide."
                    subjectWeightSystem={index === (subjectLists.length-1) && isBaccalaureatMarkMandatory ? 'Coefficient' : user.academicYearHeadDetails2.subjectWeightSystem.name}
                    markSystem={user.academicYearHeadDetails2.markSystem.name}
                    setIsReadMode={newMode => {
                        setIsReadModes(prev => {
                            const updated = [...prev];
                            updated[index] = newMode;
                            return updated;
                        });
                    }}
                    urlFragment='/subjectmatches/search/'
                    subject={subjectStates[index]}
                    setSubject={newSubject => {
                        setSubjectStates(prev => {
                            const updated = [...prev];
                            updated[index] = newSubject;
                            return updated;
                        });
                    }}
                    onSubjectUpdate={(updatedSubject) => {
                        updateWendogouser(SIMULATION_ENGINE_STEPS.REPORT_CARD2, subjectLists);
                    }}
                    showContinueBtn={1}
                    setReferenceInc={newInc => {
                        setReferenceIncs(prev => {
                            const updated = [...prev];
                            updated[index] = newInc(prev[index]);
                            return updated;
                        });
                    }}
                    referenceInc={referenceIncs[index]}
                    subjectList={subjectLists[index]}
                    setSubjectList={newList => {
                        setSubjectLists(prev => {
                            const updated = [...prev];
                            updated[index] = newList(prev[index]);
                            return updated;
                        });
                    }}
                />
            )
        ))
    );
    
    return (
        <>
            {isReadModes.every(mode => mode) && (
                <div className="FieldWrapper">
                    <div className="FieldView field-valid">
                        <div className="FieldView-flex-container">
                            <label className="Label">{SvgConstant.getSvg('YEAR_N_1')} {` Veuillez renseigner toutes les matières par ${user.academicYearHeadDetails2?.academicYearOrganization?.name?.toLowerCase()} pour l'année ${user.selectedSchoolYear2.name}.`}</label>
                        </div>
                        <div className="Tip" style={{marginBottom:'-5px'}}>
                            <span>Gagnez du temps : dupliquez                                 <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"  viewBox="0 0 90.7659 97.9493" version="1.1" className='Navbarstyles__MenuItemArrow'>
                                    <title>Shape</title>
                                    <g id="Page-1" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                                        <g id="noun-duplicate-7205800" fill="currentcolor" fillRule="nonzero">
                                            <path d="M21.2227,23.5081 L21.2227,11.8711 C21.2227,8.6055 22.5586,5.6328 24.7071,3.4844 C26.8594,1.3321 29.8282,0 33.0938,0 L78.8948,0 C82.1604,0 85.1331,1.3359 87.2815,3.4844 C89.4338,5.6367 90.7659,8.6055 90.7659,11.8711 L90.7659,62.5701 C90.7659,65.8357 89.43,68.8084 87.2815,70.9568 C85.1292,73.1091 82.1604,74.4412 78.8948,74.4412 L69.5432,74.4412 L69.5432,86.0782 C69.5432,89.3438 68.2073,92.3165 66.0588,94.4649 C63.9065,96.6172 60.9377,97.9493 57.6721,97.9493 L11.8711,97.9493 C8.6055,97.9493 5.6328,96.6134 3.4844,94.4649 C1.3321,92.3126 0,89.3438 0,86.0782 L0,35.3792 C0,32.1136 1.3359,29.1409 3.4844,26.9925 C5.6367,24.8402 8.6055,23.5081 11.8711,23.5081 L21.2227,23.5081 Z M69.5467,69.8521 L78.8983,69.8521 C80.8983,69.8521 82.7186,69.03179 84.0389,67.7115 C85.3592,66.3912 86.1795,64.5709 86.1795,62.5709 L86.1795,11.8719 C86.1795,9.8719 85.35919,8.0516 84.0389,6.7313 C82.7186,5.411 80.8983,4.5907 78.8983,4.5907 L33.0973,4.5907 C31.0973,4.5907 29.277,5.41101 27.9567,6.7313 C26.6325,8.0516 25.8161,9.8719 25.8161,11.8719 L25.8161,23.5089 L57.6751,23.5089 C60.9407,23.5089 63.9134,24.8448 66.0618,26.9933 C68.2141,29.1456 69.5462,32.1105 69.5462,35.38 L69.5467,69.8521 Z" id="Shape" /> </g>
                                    </g>
                                </svg> et modifiez les bulletins pour les {user.academicYearHeadDetails2?.academicYearOrganization?.name?.toLowerCase()+'s'} similaires.</span>
                        </div>
                        <div className="DrawerAnimation" />
                        {renderSEReportCards()}
                        
                    </div>
                </div>
            )}
            {/* {'hasEnterBaccalaureatMarksWhenMandatory '+ hasEnterBaccalaureatMarksWhenMandatory} */}
            {/* {'xxx '+isReadModes.every(mode => mode) + ' '+ showContinueBtn + ' '+ showError + ' '+ hasEnterBaccalaureatMarksWhenMandatory} */}
            {isReadModes.every(mode => mode) && showContinueBtn && 
                 <>{showError && <SESmallAlertMessage type="error" content={hasEnterBaccalaureatMarksWhenMandatory ? "Vous n'avez saisi aucune note de "+user.academicYearHeadDetails2?.academicYearOrganization.name.toLowerCase()+"." : "Vous n'avez pas saisi de note pour votre Baccalauréat."} />}
                <div className="FieldView field-valid">
                            <ButtonLarge name="Continuer" handleContinue={handleContinue}/></div></>}
            {renderSEMarkInputs()}
            
        </>
    );
};

export default ReportCard2;
