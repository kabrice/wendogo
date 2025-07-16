'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ButtonLarge from '../../components/ButtonLarge';
import SESmallAlertMessage from '../../components/SimulationEngine/SESmallAlertMessage';
import helper from '../../utils/Helper';
import { setUser } from '../../redux/userSlice';
import Link from 'next/link';
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from 'react-redux';
import { activateSpinner, deactivateSpinner } from '../../redux/spinnerslice';

const Validation = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    // Core states
    const [isInitializing, setIsInitializing] = useState(true);
    const user = useSelector((state) => state.user);
    const [isCheck, setIsCheck] = useState(false);
    const [isAlert, setIsAlert] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);


    // Initialize user data
    useEffect(() => {
        const initializeData = () => {
            
            if (!user) {
                router.push('/simulation/home');
                return;
            }
            
            
            setIsInitializing(false);
        };

        initializeData();
    }, [router]);

    const handleCheck = () => setIsCheck(prev => !prev);

    const handleContinue = () => {
        if (isSubmitting) return; // Prevent multiple submissions
        console.log('handleContinue VVVV', user); 

        if (!isCheck) {
            setIsAlert(true);
            return;
        }
        try {
            setIsSubmitting(true);
            dispatch(activateSpinner());
            
            const updatedUser = {
                ...user,
                simulationResults: null,
                schoolDetails: null,
                majorDetails: null,
                date: new Date().toISOString()
            };
            
            dispatch(setUser(updatedUser));
            helper.setLocalStorageWithExpiration('wendogouser', updatedUser);
            router.push('/simulation/result#view/SCORE_DETAILLE');
            
        } catch (error) {
            console.error('Navigation error:', error);
        } finally {
            dispatch(deactivateSpinner());
            // Note: We don't reset isSubmitting since we want the button to stay disabled
        }
    };

    const goToCGU = () => window.open('/cgu', '_blank');
    const goToPrivacy = () => window.open('/privacy', '_blank');

    if (isInitializing) {
        return (
            <div className="flex items-center justify-center min-h-[200px]">
                <Loader2 className="w-8 h-8 animate-spin" />
            </div>
        );
    }

    return (
        <div className="ScreenView DaisyScreenView SCR_ASSURANCE">
            <div className="BlockView-container DaisyBlockView-container">
                <div id="GRP_CGU_COMMERCIAL_VALIDATION-wrapper" className="FieldView DaisyFieldView DateInputField PRI_DON_NAISS" style={{ margin: 0 }}>
                    <div className="FieldView DaisyFieldView undefined field-default GroupField GRP_CGU_COMMERCIAL_VALIDATION">
                        <div className="FieldView-flex-container" />
                        <div className="app-row app-field">
                            <div className="app-col-xs-12 app-col-sm-12 app-col-md-12 Field">
                                <div id="COORD_CGU_VALIDATION-wrapper" className="FieldWrapper CheckboxBooleanField COORD_CGU_VALIDATION field-valid">
                                    <div className="FieldView DaisyFieldView undefined field-valid CheckboxBooleanField COORD_CGU_VALIDATION">
                                        <div className="FieldView-flex-container" />
                                        <div className="DrawerAnimation" style={{ height: 0 }}>
                                            <div />
                                        </div>
                                        <div className="app-row app-field">
                                            <div className="app-col-xs-12 app-col-sm-12 app-col-md-12 Field">
                                                <div className="Stack stackRow" style={{ flexDirection: "row", padding: 0, alignItems: "stretch" }}>
                                                    <div className="Stack-child" style={{ paddingLeft: 0 }}>
                                                        <div className="Checkbox after field-valid" data-testid="">
                                                            <input 
                                                                type="checkbox"
                                                                name="COORD_CGU_VALIDATION"
                                                                id="COORD_CGU_VALIDATION"
                                                                tabIndex={7}
                                                                defaultValue="COORD_CGU_VALIDATION"
                                                            />
                                                            <Link
                                                                href="#"
                                                                role="checkbox"
                                                                aria-checked={isCheck}
                                                                onClick={(e) => {
                                                                    e.preventDefault();
                                                                    handleCheck();
                                                                }}
                                                                className={`Checkbox-tick icon-lesfurets icon-system-check ${isCheck ? 'ticked' : ''} active`}
                                                            >
                                                                {isCheck && (
                                                                    <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" height="20" width="20">
                                                                        <path 
                                                                            d="M12.098 20.161a1.5 1.5 0 00-2.196 2.045l4.953 5.316a1.5 1.5 0 002.176.02l13.048-13.5a1.5 1.5 0 00-2.158-2.084L15.972 24.32l-3.874-4.16z" 
                                                                            fillRule="evenodd" 
                                                                            fill="#ffffff"
                                                                        />
                                                                    </svg>
                                                                )}
                                                            </Link>
                                                            <label htmlFor="COORD_CGU_VALIDATION" className="Checkbox-label active">
                                                                <div>
                                                                    <div id="cgu" className="Text">
                                                                        <div>
                                                                        En cochant cette case, j'accepte les&nbsp;
                                                                            <span className="toggle-modal" onClick={goToCGU}>
                                                                                Conditions Générales d'Utilisation
                                                                            </span>
                                                                            &nbsp;de Wendogo et je consens à être contacté(e) par les conseillers concernant mon projet d'étude en France.
                                                                        </div>
                                                                    </div>
                                                                    <div style={{ marginTop: 10 }}>
                                                                        {isAlert && (
                                                                            <SESmallAlertMessage 
                                                                                type="error" 
                                                                                content="Veuillez accepter les conditions générales d'utilisation" 
                                                                            />
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="BlockView-consentementCommercial DaisyBlockView-consentementCommercial">
                    <div>
                        <div id="ConsentementCommercialModal" className="Text ConsentementCommercialModal">
                            Wendogo traite les données personnelles recueillies dans ce questionnaire pour proposer des offres correspondant au profil du navigateur, réaliser des opérations d'analyse et de statistiques, pour assurer la relation commerciale avec les clients et réaliser de la prospection commerciale par courrier électronique. Vous disposez de différents droits (notamment le droit d'opposition, d'accès, de rectification, d'effacement). Pour en savoir plus, consultez notre&nbsp;
                            <span className="toggle-modal" onClick={goToPrivacy}>
                                Charte de protection des données personnelles
                            </span>
                            .
                        </div>
                    </div>
                </div>
                <div className="FieldView DaisyFieldView field-default SelectField VEH_USA_KILOM">
                    <ButtonLarge name="Je me lance" handleContinue={handleContinue} isSubmitting={isSubmitting} />
                </div>
            </div>
        </div>
    );
};

export default Validation;
