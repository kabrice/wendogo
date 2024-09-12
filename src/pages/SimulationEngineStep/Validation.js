import React, { useState, useEffect } from 'react';
import SECheckBox from '../../components/SimulationEngine/SECheckBox';
import ButtonLarge from '../../components/ButtonLarge';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const Validation = () => {

    const [isCheck, setIsCheck] = useState(false);

    const handleCheck = () => {
        setIsCheck(!isCheck);
    }

    const handleContinue = () => {
        console.log('Continue')
    }

    const goToCGU = () => { 
        window.open('/cgu', '_blank'); 
    }

    const goToPrivacy = () => {
        window.open('/wendogo-privacy', '_blank');
    }

    return (
        <div className="ScreenView DaisyScreenView SCR_ASSURANCE">
            <div className="BlockView-container DaisyBlockView-container">
            <div id="GRP_CGU_COMMERCIAL_VALIDATION-wrapper" className="FieldView DaisyFieldView DateInputField PRI_DON_NAISS   " style={{margin:0}}>
                <div className="FieldView DaisyFieldView undefined field-default GroupField GRP_CGU_COMMERCIAL_VALIDATION ">
                <div className="FieldView-flex-container" />
                <div className="app-row app-field">
                    <div className="app-col-xs-12 app-col-sm-12 app-col-md-12 Field">
                    <div id="COORD_CGU_VALIDATION-wrapper" className="FieldWrapper CheckboxBooleanField COORD_CGU_VALIDATION field-valid  ">
                        <div className="FieldView DaisyFieldView undefined field-valid CheckboxBooleanField COORD_CGU_VALIDATION ">
                        <div className="FieldView-flex-container" />
                        <div className="DrawerAnimation" style={{ height: 0 }}>
                            <div />
                        </div>
                        <div className="app-row app-field">
                            <div className="app-col-xs-12 app-col-sm-12 app-col-md-12 Field">
                            <div className="Stack  stackRow " style={{ flexDirection: "row", padding: 0, alignItems: "stretch" }}>
                                <div className="Stack-child  " style={{ paddingLeft: 0 }}>
                                <div className="Checkbox  after field-valid " data-testid="">
                                    <input type="checkbox" name="COORD_CGU_VALIDATION" id="COORD_CGU_VALIDATION" tabIndex={7} defaultValue="COORD_CGU_VALIDATION" />
                                    <button type="button" role="checkbox" aria-checked="true" onClick={() => handleCheck()} 
                                            className={`Checkbox-tick icon-lesfurets icon-system-check ${isCheck && 'ticked'} active `}>
                                        {isCheck && <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" height="20" width="20">
                                            <path d="M12.098 20.161a1.5 1.5 0 00-2.196 2.045l4.953 5.316a1.5 1.5 0 002.176.02l13.048-13.5a1.5 1.5 0 00-2.158-2.084L15.972 24.32l-3.874-4.16z" fillRule="evenodd" fill='#ffffff'></path>
                                        </svg>}
                                    </button>
                                    <label htmlFor="COORD_CGU_VALIDATION" className="Checkbox-label  active">
                                    <div>
                                        <div id="cgu" className="Text ">
                                        <div> J'accepte les&nbsp; <span className="toggle-modal" onClick={() => goToCGU()}> Conditions Générales d'Utilisation </span> &nbsp;et d'être contacté par nos partenaires Assurance Auto&nbsp;si je demande à être mis en relation pour faire des économies et protéger ma voiture. </div>
                                        </div>
                                    </div>
                                    </label>
                                    <div className="CguModal-wrapper" />
                                </div>
                                </div>
                            </div>
                            </div> 
                            
                            {/* <SECheckBox title={`J'accepte les&nbsp; <span className="toggle-modal"> Conditions Générales d'Utilisation </span> &nbsp;et d'être contacté par nos partenaires Assurance Auto&nbsp;si je demande à être mis en relation pour faire des économies et protéger ma voiture. `} />
                         */}
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            <div className="BlockView-consentementCommercial DaisyBlockView-consentementCommercial">
                <div>
                <div id="ConsentementCommercialModal" className="Text ConsentementCommercialModal"> Wendogo traite les données personnelles recueillies dans ce questionnaire pour proposer des offres correspondant au profil du navigateur, réaliser des opérations d’analyse et de statistiques, pour assurer la relation commerciale avec les clients et réaliser de la prospection commerciale par courrier électronique. Vous disposez de différents droits (notamment le droit d’opposition, d’accès, de rectification, d’effacement). Pour en savoir plus, consultez notre&nbsp; <span className="toggle-modal" onClick={() => goToPrivacy()}> Charte de protection des données personnelles </span> . </div>
                </div>
            </div>
            <div className="FieldView DaisyFieldView field-default SelectField VEH_USA_KILOM" >
                    <ButtonLarge name="Evaluer mes chances" handleContinue={handleContinue} />
                </div>
            </div>
</div>
    );
};

export default Validation;
