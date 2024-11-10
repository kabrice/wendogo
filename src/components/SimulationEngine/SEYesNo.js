import ButtonLarge from "../ButtonLarge";
import {React, useState} from "react";
import Modal from "../Modal";
import SvgConstant from "../../utils/SvgConstant";

const SEYesNo = (props) => {

    const {yes, handleYes, title, handleContinue, showContinueBtn, tip, modalTitle, modalFirstParagraphs, 
            modalParagraphs, modalIcon, modalIsLiTag, displayQuestionTooltip, specialTextModal, id, svgConstantName } = props;
    const [showModal, setShowModal] = useState(false)

    const hideShowModal = (show) => {
    document.body.style.overflow = show ? 'hidden' : 'auto';
    setShowModal(show)
    }

    return <div  id={id} className="FieldWrapper RadioField PRI_DON_AUTRE_VEH field-valid fade-animation fade-slow-enter-done" 
    style={{ transitionTimingFunction: 'ease-out',
        transitionProperty: 'width',
        transitionuration: '2s', 
        transitionDelay: '1s',
        transition: 'opacity 3s',
        opacity: 1,
    }}>
                <div className="FieldView DaisyFieldView undefined field-valid RadioField PRI_DON_AUTRE_VEH ">
                <div className="FieldView-flex-container">
                    <label className="Label ">{svgConstantName && SvgConstant.getSvg(svgConstantName)} {title}</label>
                    {displayQuestionTooltip && 
                                    <div id="daisy-tooltip-PRI_HIS_NBR_SIN" className="PopinTooltip">
                                        <button type="button" className="PopinTooltip-button-open" onClick={() => hideShowModal(true)}>
                                            <div className="Tooltip-picto">?</div>
                                        </button>
                                        {showModal && <Modal title={modalTitle} paragraphs={modalParagraphs} icon={modalIcon} hideShowModal={hideShowModal} isLiTag={modalIsLiTag} 
                                                            specialText={specialTextModal} firstParagraphs={modalFirstParagraphs} />}
                                    </div>}
                </div>
                <div className="Tip">
                <div>{tip} </div>
                </div>
                <div className="DrawerAnimation" style={{ height: 0 }}>
                    <div />
                </div>
                <div className="app-row app-field">
                    <div className="app-col-xs-12 app-col-sm-12 app-col-md-12 Field">
                        <div className="ButtonField ">
                            <div className="ButtonField-Block button-field-true-PRI_DON_AUTRE_VEH app-col-xs-6 app-col-sm-4 app-col-md-4" onClick={()=>handleYes(true)}>
                            <input type="radio" id={id} name={id} className="checkbox-field" tabIndex={4} defaultValue="true" style={{ display: "none" }} />
                            <div className={"Button ButtonField-Block-Button ButtonField-value-true noIcon field-valid "+(yes ? "isActive" : "")} tabIndex={0}>    
                                <label className="Button-label"> Oui </label>
                                {!yes  && <div className="radio-tick icon-lesfurets " />}
                                {yes  && <div className="radio-tick icon-lesfurets icon-system-check">
                                    <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path d="M12.098 20.161a1.5 1.5 0 00-2.196 2.045l4.953 5.316a1.5 1.5 0 002.176.02l13.048-13.5a1.5 1.5 0 00-2.158-2.084L15.972 24.32l-3.874-4.16z" fillRule="evenodd" fill='#ffffff'></path></svg>
                                </div>}
                            </div>
                            </div>
                            <div className="ButtonField-Block button-field-false-PRI_DON_AUTRE_VEH app-col-xs-6 app-col-sm-4 app-col-md-4"onClick={()=>handleYes(false)}>
                            <input type="radio" id={id} name={id} className="checkbox-field" tabIndex={5} defaultValue="false" defaultChecked="" style={{ display: "none" }} />
                            <div className={"Button ButtonField-Block-Button ButtonField-value-false noIcon field-valid "+(!yes ? "isActive" : "")} tabIndex={0}>
                                <label className="Button-label" > Non </label>
                                {yes  && <div className="radio-tick icon-lesfurets " />}
                                {!yes  && <div className="radio-tick icon-lesfurets icon-system-check">
                                    <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path d="M12.098 20.161a1.5 1.5 0 00-2.196 2.045l4.953 5.316a1.5 1.5 0 002.176.02l13.048-13.5a1.5 1.5 0 00-2.158-2.084L15.972 24.32l-3.874-4.16z" fillRule="evenodd" fill='#ffffff'></path></svg>
                                </div>}
                            </div>
                            </div>
                        </div>
                    </div>
                    {showContinueBtn && <ButtonLarge name="Continuer" handleContinue={handleContinue} />}
                </div>
                </div>
            </div>
}

export default SEYesNo;
