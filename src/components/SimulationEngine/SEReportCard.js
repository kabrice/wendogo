import React, { useState } from 'react';
import ButtonLarge from "../ButtonLarge";
import SESmallAlertMessage from './SESmallAlertMessage';
import  DropDownIcon from '../../assets/dropdown_icon.svg'
import { get, set } from 'lodash';
import helper from '../../utils/Helper';

const SEReportCard = (props) => {

    const {  header, subheader, subjectList,  setSubject, setIsReadMode, setIsCancelModes, setSubjectList, disPlayBacTitle, subjectWeightSystem, user, period, displayReportCardList, setDisplayReportCardList } = props;
    const [subjectsToDeleteReference, setSubjectsToDeleteReference] = useState([]);
    const [deleteTimers, setDeleteTimers] = useState({}); // Track timers for each subject
    const [subjectListReachLimit, setSubjectListReachLimit] = useState(false);
    //console.log('subjectList 🤣', subjectList)
    const handleConfirmDeleteSubject = (index) => {
        setSubjectsToDeleteReference([...subjectsToDeleteReference, index]);

        // Set a timer of 5 seconds for the subject
        const timerId = setTimeout(() => {
            deleteSubject(index);
            setSubjectsToDeleteReference((prev) => prev.filter((item) => item !== index));
        }, 1500);

        // Save the timer ID in the state
        setDeleteTimers((prev) => ({ ...prev, [index]: timerId }));
    };

    const cancelDeleteSubject = (index) => {
        setSubjectsToDeleteReference(subjectsToDeleteReference.filter((item) => item !== index));

        // Clear the timer if the deletion is canceled
        clearTimeout(deleteTimers[index]);
        setDeleteTimers((prev) => {
            const newTimers = { ...prev };
            delete newTimers[index];
            return newTimers;
        });
    }; 
    
    const addSubject = () => {       
        //console.log('subjectList.length 🥶', subjectList.length)
        if(subjectList.length < 15){
            setSubject({reference: 0, label: {value: '', validated: true}, weight: {value: '', validated: true}, mark: {value: '', validated: true}, rank: {value: '', validated: true}}) 
            setIsReadMode(false);

        }else{
            //alert('Vous ne pouvez pas ajouter plus de 15 matières')
            setSubjectListReachLimit(true);
            setTimeout(() => {
                setSubjectListReachLimit(false);
            }, 15000);
            setIsReadMode(true); 
        }
    }

    const editSubject = (reference) => {
        const subject = subjectList.find(subject => subject.reference === reference);
        console.log('subject  🥶', subject)
        setSubject(subject);
        //setOpeningMarkInput(true)
        //console.log('subject', subject)
        setIsReadMode(false);
    }

    const deleteSubject = (reference) => {
        if(setSubjectListReachLimit){
            setSubjectListReachLimit(false)
        }
        setIsCancelModes(true)
        setSubjectList(prevList => prevList.filter(subject => subject.reference !== reference));
    }

    const toggleReportCard = () => {
        setDisplayReportCardList(!displayReportCardList)
    }

    const duplicateReportTermFromLastOne = () => {
        //const lastReportCard = subjectList[subjectList.length - 2];
        const lastReportCard = helper.getRecentReportCard(user, period)
        console.log('lastReportCard', lastReportCard)
        console.log('sub', subjectList)
        // update setSubjectList with lastReportCard data
        if(lastReportCard.length > 0){
            setSubjectList(prevList => [...prevList, ...lastReportCard])
        }
    } 
    
    const checkIfReportCardExist = (user, period) => { 
        // Check if the report card for the period and period above exists and at least one of them is not empty
        // for example, if period is 1, check if reportCard1, reportCard2, reportCard3 exists and at least one of them is not empty. If all doesn't exist, return false or if all exists and all are empty, return false
        // for example, if period is 2, check if reportCard2 and reportCard3 exists  and at least one of them is not empty. If all doesn't exist, return false or if all exists and all are empty, return false
        // for example, if period is 3, check if reportCard3 exists and  is not empty. If it doesn't exist, return false or if it exists and is empty, return false
        
        let reportCard = helper.getRecentReportCard(user, period)
        console.log('reportCardxx', reportCard, period)
        if(reportCard.length > 0){
            return true
        }
        return false

    }

    return (
        <div className="app-col-xs-12 app-col-sm-8 app-col-md-8 Field fade-animation fade-slow-enter-done" style={{ padding: '15px 0 0 0'}}>
             {disPlayBacTitle &&   
                    <div className="FieldView-flex-container">
                        <label className="Label">Notes du baccalauréat sur 20</label>
                    </div>       
             }
        <div className="css-1g9mw2i">
            <span className="css-8u2krs">
                <div className="css-u74ql7" />
            </span>
            {/* <h1>{(subjectList.length===0)+ ' ^^^^ '+(disPlayBacTitle)}</h1> */}
            <div className="css-ztuk2b">
                <div className="css-1nr05dw">
                    <div tabIndex={-1} className="css-sfm6zc">
                     <div className="title-container" style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                        <div className='title-rc'>{header}</div>
                        <div className="svg-group-rc" style={{ display: 'flex', alignItems: 'center', marginLeft: 'auto' }}>
                            
                            {((subjectList.length===0) && !disPlayBacTitle && checkIfReportCardExist(user, period))&& <div   className='duplicate-report-card' onClick={() => duplicateReportTermFromLastOne()}>
                                <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"  viewBox="0 0 90.7659 97.9493" version="1.1" className='Navbarstyles__MenuItemArrow'>
                                    <title>Shape</title>
                                    <g id="Page-1" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                                        <g id="noun-duplicate-7205800" fill="currentcolor" fillRule="nonzero">
                                            <path d="M21.2227,23.5081 L21.2227,11.8711 C21.2227,8.6055 22.5586,5.6328 24.7071,3.4844 C26.8594,1.3321 29.8282,0 33.0938,0 L78.8948,0 C82.1604,0 85.1331,1.3359 87.2815,3.4844 C89.4338,5.6367 90.7659,8.6055 90.7659,11.8711 L90.7659,62.5701 C90.7659,65.8357 89.43,68.8084 87.2815,70.9568 C85.1292,73.1091 82.1604,74.4412 78.8948,74.4412 L69.5432,74.4412 L69.5432,86.0782 C69.5432,89.3438 68.2073,92.3165 66.0588,94.4649 C63.9065,96.6172 60.9377,97.9493 57.6721,97.9493 L11.8711,97.9493 C8.6055,97.9493 5.6328,96.6134 3.4844,94.4649 C1.3321,92.3126 0,89.3438 0,86.0782 L0,35.3792 C0,32.1136 1.3359,29.1409 3.4844,26.9925 C5.6367,24.8402 8.6055,23.5081 11.8711,23.5081 L21.2227,23.5081 Z M69.5467,69.8521 L78.8983,69.8521 C80.8983,69.8521 82.7186,69.03179 84.0389,67.7115 C85.3592,66.3912 86.1795,64.5709 86.1795,62.5709 L86.1795,11.8719 C86.1795,9.8719 85.35919,8.0516 84.0389,6.7313 C82.7186,5.411 80.8983,4.5907 78.8983,4.5907 L33.0973,4.5907 C31.0973,4.5907 29.277,5.41101 27.9567,6.7313 C26.6325,8.0516 25.8161,9.8719 25.8161,11.8719 L25.8161,23.5089 L57.6751,23.5089 C60.9407,23.5089 63.9134,24.8448 66.0618,26.9933 C68.2141,29.1456 69.5462,32.1105 69.5462,35.38 L69.5467,69.8521 Z" id="Shape" /> </g>
                                    </g>
                                </svg>
                            </div>}
                            <div className={`arrow-report-card${displayReportCardList ? '' : '-bg'} `} onClick={() => toggleReportCard()}>
                                <DropDownIcon style={{width : '25px', height : '25px', transform : (displayReportCardList ? "rotate(180deg)" : '')}} />
                            </div>
                        </div>
                       </div>
                       <div className='subtitle-rc'>{subheader}</div>
                    </div>
                </div>
                {displayReportCardList && subjectList.map((subject) => (
                    <div key={subject.reference} className='fade-animation'>
                        {!subjectsToDeleteReference.includes(subject.reference) && <div className="container-rc" >
                            <div className="horizontal-block-rc">
                                <div className="block-text-left-rc"><span className=''>{subject.label.value}</span></div>
                                <div className="block-icons-right-rc ">
                                    <button className="css-1g0wg2x e8ju0x50" onClick={() => editSubject(subject.reference)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
                                            <path d="M13.9379 6.182l3.889 3.8892-9.7075 9.7075-.0041-.0041-4.4738 1.2104c-.3724.1019-.7224-.2472-.6215-.6199l1.2117-4.4741-.0014-.0014 9.7076-9.7075zM16.1189 4.0008c.781-.781 2.0473-.781 2.8284 0l1.0607 1.0607c.781.781.781 2.0474 0 2.8284l-1.1202 1.1202-3.8891-3.889 1.1202-1.1203z" />
                                        </svg>
                                    </button>
                                    <button className="css-1g0wg2x e8ju0x50" onClick={() => handleConfirmDeleteSubject(subject.reference)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
                                            <path d="M9.5262 2.1204A.5.5 0 019.8516 2h4.2968a.5003.5003 0 01.3254.1204L15.5 3H19c.5523 0 1 .4477 1 1s-.4477 1-1 1H5c-.5523 0-1-.4477-1-1s.4477-1 1-1h3.5l1.0262-.8796z" />
                                            <path fillRule="evenodd" d="M5.0332 6.5312A.5.5 0 015.5322 6h12.9356a.5.5 0 01.499.5312l-.8496 13.5936c-.0659 1.054-.94 1.8752-1.9961 1.8752H7.8789c-1.0561 0-1.9302-.8212-1.996-1.8752L5.0331 6.5312zM10 11c-.5523 0-1 .4477-1 1v5c0 .5523.4477 1 1 1s1-.4477 1-1v-5c0-.5523-.4477-1-1-1zm4 0c-.5523 0-1 .4477-1 1v5c0 .5523.4477 1 1 1s1-.4477 1-1v-5c0-.5523-.4477-1-1-1z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <div className="second-block-rc">
                            {/*Reference: <b>{subject.reference} </b>- */}{subjectWeightSystem}: <b>{subject.weight.value} </b>- Moyenne: <b>{subject.mark.value} </b>{subject.rank.value && ( <> - Rang: <b>{subject.rank.value}</b> </> )}{/* - Max:<b>15 </b>- MG:<b>7 </b>*/}
                            </div>
                        </div>}
                {/* When Deleting a subject */}
                {subjectsToDeleteReference.includes(subject.reference) && <div className="css-1f1q1js ecydgvn1"> 
                    <div data-tn-component="saved-skill-item" data-tn-variant="component" className="css-u74ql7 eu4oa1w0">
                        <div role="group" className="css-bdkx4w eu4oa1w0">
                        <div className="css-brv7kd eu4oa1w0">
                            <div className="css-1rp1mvz eu4oa1w0">
                            <span name="skillsHeader"  id="Ee9ZHv0s_o2V0KVakPNDIw-skillsHeader" className="css-13ba2k0 e1wnkr790">
                                <h3 className="css-a5qgt3 e1tiznh50">
                                <span>
                                    <span className="css-8d8zcg e1wnkr790">Matière </span>{subject.label.value}<span className="css-8d8zcg e1wnkr790"> retirée</span>. </span>
                                </h3>
                            </span>
                            </div>
                        </div>
                        <div className="css-u74ql7 eu4oa1w0">
                            <button aria-label="Restaurer l'élément supprimé, Mathématique et informatique appliquées aux sciences humaines et sociales" data-tn-element="undo-btn" data-tn-variant="element" data-tn-action-click="true" className="css-mo1f0d e8ju0x50"
                                    onClick={() => cancelDeleteSubject(subject.reference)}>
                            <span>Annuler</span>
                            </button>
                        </div>
                        </div>
                    </div>
                </div> }
            </div>
                ))}            
                {subjectListReachLimit && <SESmallAlertMessage type="error" content="Vous ne pouvez pas ajouter plus de 15 matières" width="100%"/>}
                <fieldset className="css-abl2o8">  
                    <div role="list" className="css-1yd1eap"> 
                        <div role="listitem" style={{ display: "flex", height: "auto", opacity: 1 }}>
                            <button id="Connaissance" type="button" aria-label="Ajouter une compétence" 
                                    className="css-1wizw6m" onClick={() => addSubject()}>
                                <svg xmlns="http://www.w3.org/2000/svg" focusable="false" role="img" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" className="css-7289sc">
                                    <path d="M12 4c-.5523 0-1 .4477-1 1v6H5c-.5523 0-1 .4477-1 1s.4477 1 1 1h6v6c0 .5523.4477 1 1 1s1-.4477 1-1v-6h6c.5523 0 1-.4477 1-1s-.4477-1-1-1h-6V5c0-.5523-.4477-1-1-1z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </fieldset>
            </div>
        </div>
    </div>
    );
};

export default SEReportCard;
