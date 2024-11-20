'use client';

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setStep } from '../../redux/simulationStepSlice';
import helper from '../../utils/Helper';
import { setUser } from '../../redux/userSlice';
import ButtonLarge from '../../components/ButtonLarge';
import SEReportCard from '../../components/SimulationEngine/SEReportCard';
import SEMarkInput from '../../components/SimulationEngine/SEMarkInput';
import SESmallAlertMessage from '../../components/SimulationEngine/SESmallAlertMessage';
import { SIMULATION_ENGINE_STEPS } from '../../utils/Constants';
import { Loader2 } from "lucide-react";
import _ from 'lodash';
import SvgConstant from '../../utils/SvgConstant';

const ReportCard3 = () => {
    const dispatch = useDispatch();
    const [isInitializing, setIsInitializing] = useState(true);
    const user = useSelector((state) => state.user);
    const [periodNumber, setPeriodNumber] = useState(0);
    const simulationStepGlobal = useSelector(state => state.simulationStep);
    const isInUniversityGlobal = useSelector(state => state.university.active);

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
    const [mainSubjects, setMainSubjects] = useState(null);
    const [applyingForMaster, setApplyingForMaster] = useState(false);
    const [isBaccalaureatMarkMandatory, setIsBaccalaureatMarkMandatory] = useState(false);
    const [titleMarkInput, setTitleMarkInput] = useState('');

    // Initialize user data and states
    useEffect(() => {
        const initializeData = () => {
            
            if (!user) return;

            const periods = user?.academicYearHeadDetails3?.academicYearOrganization?.name === 'Trimestre' ? 4 : 3;
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
            setSubjectLists(user?.reportCard3 || Array(periods).fill([]));
            setReferenceIncs(Array(periods).fill(0));
            setIsReadModes(Array(periods).fill(true));
            setIsCancelModes(Array(periods).fill(false));
            setDisplayReportCardList(Array(periods).fill(true));

            // Calculate bac-related values
            const mostRecentBacId = helper.getMostRecentBacId(user);
            const isBacMandatory = mostRecentBacId === 'bac00004';
            setIsBaccalaureatMarkMandatory(isBacMandatory);

            // Set other state values
            setMainSubjects(user?.mainSubjects);
            setApplyingForMaster(
                user?.applyingForMaster || 
                helper?.isApplyingForMaster(user, user?.reportCard3 || Array(periods).fill([]), 0) || 
                false
            );

            setTitleMarkInput(`Veuillez renseigner une nouvelle matière, le ${
                isBacMandatory ? 'coefficient' : user?.academicYearHeadDetails3?.subjectWeightSystem?.name?.toLowerCase()
            }, la note et le rang obtenu `);

            
            setIsInitializing(false);
        };

        initializeData();
    }, []);

    const showContinueBtn = simulationStepGlobal === SIMULATION_ENGINE_STEPS.REPORT_CARD3;

    const handleContinue = () => {
        const reportCard = user?.reportCard3;
        const isReportCardsValid = reportCard && subjectLists && !_.every(reportCard.slice(0, -1), _.isEmpty);
        const hasBaccalaureatMarks = reportCard && (!isBaccalaureatMarkMandatory || reportCard[periodNumber - 1]?.length > 0);

        setHasEnterBaccalaureatMarksWhenMandatory(hasBaccalaureatMarks);
        setContinueButtonClicked(true);

        if (isReportCardsValid && hasBaccalaureatMarks) {
            setShowError(false);
            setMainSubjects(null);
            const isApplyingForMaster = helper.isApplyingForMaster(user, subjectLists, 0);
            setApplyingForMaster(isApplyingForMaster);
            const nextStep = isInUniversityGlobal ? 
                SIMULATION_ENGINE_STEPS.PROGRAM_DOMAIN : 
                SIMULATION_ENGINE_STEPS.MAIN_SUBJECTS;
            updateWendogouser(nextStep, subjectLists);
        } else {
            setShowError(true);
        }
    };

    const updateWendogouser = (simulationStep, reportCard3) => {
        console.log('ReportCard3 updateWendogouser AAA ', reportCard3);
        dispatch(setStep(simulationStep));
        const updatedUser = {
            ...user,
            simulationStep,
            reportCard3,
            applyingForMaster,
            mainSubjects,
            date: new Date().toISOString()
        };
        helper.setLocalStorageWithExpiration('wendogouser', updatedUser);
        dispatch(setUser(updatedUser));
    };

    useEffect(() => {
        // console.log('ReportCard3 useEffect AAA ', subjectLists);
        // console.log('ReportCard3 useEffect2 AAA ', continueButtonClicked, isReadModes , isCancelModes.some(mode => mode));
        if (continueButtonClicked || isReadModes.some(mode => !mode) || isCancelModes.some(mode => mode) || subjectLists.length > 0 ) {
            updateWendogouser(SIMULATION_ENGINE_STEPS.REPORT_CARD3, subjectLists);
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
                    key={`report3${index}`}
                    svgConstantName="YEAR_N"
                    period={3}
                    disPlayBacTitle={index === (subjectLists.length-1) && isBaccalaureatMarkMandatory}
                    header={index < (subjectLists.length-1) ?
                        `${user?.selectedSchoolYear3?.name} - ${user?.academicYearHeadDetails3.academicYearOrganization?.name} N°${index + 1} - ${user?.academicYearHeadDetails3.schoolName}` :
                        (isBaccalaureatMarkMandatory ? 'Notes du Baccalauréat' : 'Autre Session')}
                    subheader={index < (subjectLists.length-1) ? 
                        `${user?.degreeSelected?.name} en ${user?.degreeExactNameValue}` : ''}
                    subjectWeightSystem={index === (subjectLists.length-1) && isBaccalaureatMarkMandatory ? 
                        'Coefficient' : user?.academicYearHeadDetails3?.subjectWeightSystem.name}
                    user={user}
                    subjectList={list}
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
                    svgConstantName="YEAR_N"
                    id={`SEMarkInput${index}`}
                    isBacReportCard={index === (subjectLists.length-1) && isBaccalaureatMarkMandatory}
                    title={`${titleMarkInput}pour ${
                        index < (subjectLists.length-1) ?
                        `le ${user?.academicYearHeadDetails3.academicYearOrganization.name.toLowerCase()} n°${index + 1} de l'année ${user?.selectedSchoolYear3.name}.` :
                        (isBaccalaureatMarkMandatory ? 'votre Baccalauréat' : 'Autre Session')
                    }`}
                    tip="Le rang est facultatif. Si inexistant, laissez un vide."
                    subjectWeightSystem={index === (subjectLists.length-1) && isBaccalaureatMarkMandatory ? 
                        'Coefficient' : user?.academicYearHeadDetails3?.subjectWeightSystem.name}
                    markSystem={user?.academicYearHeadDetails3.markSystem.name}
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
                            <label className="Label">{SvgConstant.getSvg('YEAR_N')} 
                                {` Veuillez renseigner toutes les matières par ${user?.academicYearHeadDetails3.academicYearOrganization?.name?.toLowerCase()} pour l'année ${user?.selectedSchoolYear3.name}.`}
                            </label>
                        </div>
                        <div className="Tip" style={{marginBottom:'-5px'}}>
                            <span>
                                Gagnez du temps : dupliquez
                                {/* Duplicate icon SVG */}
                                <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 90.7659 97.9493" version="1.1" className='Navbarstyles__MenuItemArrow'>
                                    {/* SVG path content */}
                                </svg>
                                 et modifiez les bulletins pour les {user?.academicYearHeadDetails3.academicYearOrganization?.name?.toLowerCase()+'s'} similaires.
                            </span>
                        </div>
                        <div className="DrawerAnimation" />
                        {renderSEReportCards()}
                    </div>
                </div>
            )}
            
            {isReadModes.every(mode => mode) && showContinueBtn && (
                <>
                    {showError && (
                        <SESmallAlertMessage 
                            type="error" 
                            content={hasEnterBaccalaureatMarksWhenMandatory ? 
                                `Vous n'avez saisi aucune note de ${user?.academicYearHeadDetails3.academicYearOrganization.name.toLowerCase()}.` : 
                                "Vous n'avez pas saisi de note pour votre Baccalauréat."
                            } 
                        />
                    )}
                    <div className="FieldView field-valid">
                        <ButtonLarge 
                            name="Continuer" 
                            handleContinue={handleContinue} 
                            uniqueId="ReportCard3-continue-btn"
                        />
                    </div>
                </>
            )}
            
            {renderSEMarkInputs()}
        </>
    );
};

export default ReportCard3;
