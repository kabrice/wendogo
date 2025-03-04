'use client';

import ButtonLarge from "../ButtonLarge";
import React from "react";


const SEDualSelection = (props) => {
    const { title, valueSelected, tip, handleValueSelected, handleContinue, icons, showContinueBtn, displayIAAutoFill, openIAAutoFill } = props;


    return (
        <div className="FieldWrapper RadioField VEH_DTL_POSSESSION field-valid fade-animation fade-slow-enter-done ">
                                            <div className="FieldView DaisyFieldView undefined field-valid RadioField VEH_DTL_POSSESSION ">
                <div id="PRI_INF_SEXE-wrapper" className="FieldWrapper RadioField PRI_INF_SEXE field-valid  ">
                <div className="FieldView DaisyFieldView undefined field-valid RadioField PRI_INF_SEXE " style={{marginBottom: 0}}>
                    <div className="FieldView-flex-container">
                    <label className="Label ">{title}</label>
                    </div>
                    {tip && <div className="Tip  ">
                        <div> {tip} </div>
                    </div> }
                    <div className="DrawerAnimation" style={{ height: 0 }}>
                    <div />
                    </div>
                    <div className="app-row app-field">
                    <div className="app-col-xs-12 app-col-sm-12 app-col-md-12 Field">
                        <div className="ButtonField always-flex-direction-row">
                        {icons.map((icon, index) => (
                            
                            <div key={index} className="ButtonField-Block button-field-femme-PRI_INF_SEXE app-col-xs-6 app-col-sm-4 app-col-md-4" onClick={()=>handleValueSelected(icon.label)}>
                                <input type="radio" id={"PRI_INF_SEXE_"+icon.label} name="PRI_INF_SEXE" className="checkbox-field" tabIndex={1} defaultValue="femme" style={{ display: "none" }} />
                                <div className={"Button ButtonField-Block-Button ButtonField-value-femme hasIcon field-valid "+(valueSelected===icon.label ? "isActive" : "")} tabIndex={0}>
                                {icon.svg}
                                <label className="Button-label" htmlFor={"PRI_INF_SEXE_"+icon.label}> {icon.label} </label>
                                {(valueSelected!==icon.label) && <div className="radio-tick icon-lesfurets " />}
                                {(valueSelected===icon.label) && <div className="radio-tick icon-lesfurets icon-system-check">
                                                <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path d="M12.098 20.161a1.5 1.5 0 00-2.196 2.045l4.953 5.316a1.5 1.5 0 002.176.02l13.048-13.5a1.5 1.5 0 00-2.158-2.084L15.972 24.32l-3.874-4.16z" fillRule="evenodd" fill='#ffffff'></path></svg>
                                            </div>} 
                                </div>
                            </div>
                        )
                                                )}
            
                        </div>
                    </div>
                    </div>
                </div>
                </div>
                {showContinueBtn && <ButtonLarge name="Continuer sans IA" handleContinue={handleContinue} uniqueId={`${title}-continue-btn`}/>}
                {displayIAAutoFill &&  <button className="wendyIA-btn cnoACk styles__StyledButton-sc-reeitb-3 bVQYWs" 
                                               style={{ height: "78px", borderRadius: "15px", marginLeft: "15px" }} onClick={openIAAutoFill}>
                                        <span className="Buttonstyles__Label-sc-vsowxm-2 kGIufm"> Continuer avec WendyIA </span>
                                  </button>}
                </div>
            </div>
      );
}

export default SEDualSelection;
