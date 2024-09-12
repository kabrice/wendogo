import React, { useState } from 'react';
import ButtonLarge from "../ButtonLarge";
const SEReportCard = (props) => {

    const {  header, subheader, subjectList,  setSubject, setIsReadMode, setIsCancelModes, setSubjectList } = props;
    const [subjectsToDeleteReference, setSubjectsToDeleteReference] = useState([]);
    const [deleteTimers, setDeleteTimers] = useState({}); // Track timers for each subject
    //console.log('subjectList 🤣', subjectList)
    const handleConfirmDeleteSubject = (index) => {
        setSubjectsToDeleteReference([...subjectsToDeleteReference, index]);

        // Set a timer of 5 seconds for the subject
        const timerId = setTimeout(() => {
            deleteSubject(index);
            setSubjectsToDeleteReference((prev) => prev.filter((item) => item !== index));
        }, 500);

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
        setSubject({reference: 0, label: {value: '', validated: true}, weight: {value: '', validated: true}, mark: {value: '', validated: true}, rank: {value: '', validated: true}}) 
        setIsReadMode(false);
    }

    const editSubject = (reference) => {
        const subject = subjectList.find(subject => subject.reference === reference);
        setSubject(subject);
        //console.log('subject', subject)
        setIsReadMode(false);
    }

    const deleteSubject = (reference) => {
        setIsCancelModes(true)
        setSubjectList(prevList => prevList.filter(subject => subject.reference !== reference));
    }
    return (
        <div className="app-col-xs-12 app-col-sm-8 app-col-md-8 Field fade-animation fade-slow-enter-done" style={{ padding: '15px 0 0 0'}}>
        <div className="css-1g9mw2i">
            <span className="css-8u2krs">
                <div className="css-u74ql7" />
            </span>
            <div className="css-ztuk2b">
                <div className="css-1nr05dw">
                    <span tabIndex={-1} className="css-sfm6zc">
                       <div className='title-rc'>{header}</div>
                       <div className='subtitle-rc'>{subheader}</div>
                    </span>
                </div>
                {subjectList.map((subject) => (
                    <div key={subject.reference}>
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
                            {/* Reference: <b>{subject.reference} </b>-*/}Credit: <b>{subject.weight.value} </b>- Moyenne: <b>{subject.mark.value} </b>- Rang: <b>{subject.rank.value} </b>{/* - Max:<b>15 </b>- MG:<b>7 </b>*/}
                            </div>
                        </div>}
                {/* When Deleting a subject */}
                {subjectsToDeleteReference.includes(subject.reference) && <div className="css-1f1q1js ecydgvn1"> 
                    <div data-tn-component="saved-skill-item" data-tn-variant="component" className="css-u74ql7 eu4oa1w0">
                        <div role="group" className="css-bdkx4w eu4oa1w0">
                        <div className="css-brv7kd eu4oa1w0">
                            <div className="css-1rp1mvz eu4oa1w0">
                            <span name="skillsHeader" error="[object Object]" i18nlabels="[object Object]" id="Ee9ZHv0s_o2V0KVakPNDIw-skillsHeader" value="[object Object]" className="css-13ba2k0 e1wnkr790">
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
          
                
                <fieldset className="css-abl2o8"> 
                    <div role="list" className="css-1yd1eap"> 
                        <div role="listitem" style={{ display: "flex", height: "auto", opacity: 1 }}>
                            <button id="Connaissanced'Android" type="button" aria-label="Ajouter une compétence, Connaissance d'Android" 
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
