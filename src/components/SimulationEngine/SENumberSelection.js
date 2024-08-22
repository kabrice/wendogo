import ButtonLarge from "../ButtonLarge";
import {React, useState} from "react";
import Modal from "../Modal";

function SENumberSelection(props) {

    const { number, handleIncrement, handleDecrement, title1, title2, handleContinue, showContinueBtn, 
            modalTitle, modalParagraphs, modalIcon, modalIsLiTag, displayQuestionTooltip, specialTextModal
          } = props;
    const [showModal, setShowModal] = useState(false)

    const hideShowModal = (show) => {
        document.body.style.overflow = show ? 'hidden' : 'auto';
        setShowModal(show)
    }

    return         <div id="PRI_HIS_NBR_SIN-wrapper" className="FieldWrapper StepperField PRI_HIS_NBR_SIN field-valid fade-animation fade-slow-enter-done">
                        <div className="FieldView DaisyFieldView undefined field-valid StepperField PRI_HIS_NBR_SIN ">
                            <div className="FieldView-flex-container">
                                <label className="Label "> {title1}</label> 
                                {displayQuestionTooltip && 
                                    <div id="daisy-tooltip-PRI_HIS_NBR_SIN" className="PopinTooltip">
                                        <button type="button" className="PopinTooltip-button-open" onClick={() => hideShowModal(true)}>
                                            <div className="Tooltip-picto">?</div>
                                        </button>
                                        {showModal && <Modal title={modalTitle} paragraphs={modalParagraphs} icon={modalIcon} hideShowModal={hideShowModal} isLiTag={modalIsLiTag} 
                                                            specialText={specialTextModal} />}
                                    </div>}
                            </div>
                            <div className="DrawerAnimation" style={{ height: 0 }}><div />
                            </div>
                            <div className="app-row app-field">
                                <div className="app-col-xs-12 app-col-sm-8 app-col-md-8 Field ignore-outside-click">
                                    <div id="PRI_HIS_NBR_SIN" className="Stepper field-valid" tabIndex={8}>
                                        <div className="Stepper-label">{title2}</div>
                                        <div className="Stepper-actions">
                                            <div className="Stepper-button minus" onClick={handleDecrement}>-</div>
                                            <div className="Stepper-value">{number}</div>
                                            <div className="Stepper-button plus" onClick={handleIncrement}>+</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {showContinueBtn && <ButtonLarge name="Continuer" handleContinue={handleContinue} />}
                        </div>
                    </div>
}

export default SENumberSelection;
