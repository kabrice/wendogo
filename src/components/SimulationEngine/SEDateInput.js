import React, { useState, useRef, useEffect } from 'react';
import helper from '../../utils/Helper';
import ButtonLarge from "../ButtonLarge";

const SEDateInput = (props) => {

    const { title, handleDayChange, handleMonthChange, handleYearChange, showContinueBtn, 
            tip, day, setDay, month, setMonth, year, setYear, sendFormattedDateResultToParent } = props;

 
    const [valid, setValid] = useState(false);
    const [focused, setFocused] = useState(true);

    const newRef = useRef(null);
    console.log('validxxx', valid)
    const handleFocus = () => {
        setFocused(true);
        setValid(false);
    };

    const handleBlur = () => {
        if (!day && !month && !year) {
            setFocused(true);
        } else{
            // Add leading zeros to day and month if necessary
            setDay(day.padStart(2, '0'));
            setMonth(month.padStart(2, '0'));
            console.log('day00', day)
            if(['0', '00'].includes(day)){
                setDay('');
                setValid(false);
            }
            if(['0', '00'].includes(month)){
                setMonth('');
                setValid(false);
            }
            // Prefix year based on its value
            if (year.length === 2) {
                if (parseInt(year) >= 20) {
                    setYear(`19${year}`);
                } else {
                    setYear(`20${year}`);
                }
            }
            if (year.length === 1) {
                setYear(`200${year}`);
            }
        }
    };


    const handleButtonClick = () => {
        if (day && month && year) {
            const formattedDay = day.padStart(2, '0');
            const formattedMonth = month.padStart(2, '0');
            const formattedYear = year.length === 2 ? (parseInt(year) >= 20 ? `19${year}` : `20${year}`) : year;
            const date = `${formattedDay}/${formattedMonth}/${formattedYear}`;
            sendFormattedDateResultToParent(date)
            console.log(date);
        } else {
            setValid(false);
        }
    };

    const handleOutsideClick = (e) => {
        if (newRef.current && !newRef.current.contains(e.target) && !helper.isTargetContainsIgnoreClass(e.target)) {
            setFocused(false);
        if (day && month && year) {
            setValid(true);
          } else {
            setValid(false);
          }
          console.log('outside click SEDateInput')
        }
      };
      
    useEffect(() => {
    helper.addOutsideClick(handleOutsideClick)
    })

    const voidFunction = () => {
        return null;
        }

    return (
        <div id="PRI_DON_NAISS-wrapper" className={`FieldWrapper DateInputField PRI_DON_NAISS ${focused ? 'focused' : ''} ${valid ? 'field-valid' : 'field-error'}`}>
            <div className={`FieldView DaisyFieldView DateInputField PRI_DON_NAISS ${focused ? 'focused' : ''}`}>
                <div className="FieldView-flex-container">
                    <label className="Label">{title}</label>
                </div>
                <div className="Tip  ">
                    <div>{tip} </div>
                </div>
                <div className="DrawerAnimation" style={{ height: 0 }}>
                    <div />
                </div>
                <div className="app-row app-field">
                    <div className="app-col-xs-12 app-col-sm-12 app-col-md-12 Field">
                        <div id="PRI_DON_NAISS" className="Date">
                            <div className={` Date-labels ${focused ? 'focused' : ''} ${valid ? 'field-valid' : 'field-error'}`}>
                                <span style={{ width: "30%", textAlign: "center" }}>Jour</span>
                                <span style={{ width: "30%", textAlign: "center" }}>Mois</span>
                                <span style={{ width: "40%", textAlign: "center" }}>Année</span>
                            </div>
                            <div className={`Date-content ${focused ? 'focused' : ''} ${valid ? 'field-valid' : 'field-error'}`} ref={newRef}>
                                <input
                                    className="DateElement DateElement-day"
                                    type="number"
                                    inputMode="numeric"
                                    pattern="[0-9]*"
                                    name="PRI_DON_NAISS-day"
                                    placeholder="JJ"
                                    id="PRI_DON_NAISS-day"
                                    maxLength={2}
                                    size={2}
                                    min="1"
                                    tabIndex={2}
                                    value={day}
                                    onFocus={handleFocus}
                                    onBlur={handleBlur}
                                    onChange={handleDayChange}
                                    style={{ width: "30%", textAlign: "center" }}
                                />
                                <span className="DateInput-separator">/</span>
                                <input
                                    className="DateElement DateElement-month"
                                    type="number"
                                    inputMode="numeric"
                                    pattern="[0-9]*"
                                    name="PRI_DON_NAISS-month"
                                    placeholder="MM"
                                    id="PRI_DON_NAISS-month"
                                    maxLength={2}
                                    min="1"
                                    size={2}
                                    tabIndex={2}
                                    value={month}
                                    onFocus={handleFocus}
                                    onBlur={handleBlur}
                                    onChange={handleMonthChange}
                                    style={{ width: "30%", textAlign: "center" }}
                                />
                                <span className="DateInput-separator">/</span>
                                <input
                                    className="DateElement DateElement-year"
                                    type="number"
                                    inputMode="numeric"
                                    pattern="[0-9]*"
                                    name="PRI_DON_NAISS-year"
                                    placeholder="AAAA"
                                    id="PRI_DON_NAISS-year"
                                    maxLength={4}
                                    min="1"
                                    size={4}
                                    tabIndex={2}
                                    value={year}
                                    onFocus={handleFocus}
                                    onBlur={handleBlur}
                                    onChange={handleYearChange}
                                    style={{ width: "40%", textAlign: "center" }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                {(!valid && !focused)  && (
                    <div className="Error">
                        <span className="Icon error-icon icon-lesfurets icon-system-alert" /> Veuillez entrer une date valide
                    </div>
                )}
                {showContinueBtn && <ButtonLarge name="Continuer" handleContinue={valid ? handleButtonClick : voidFunction} />}
            </div>
        </div>
    );
}

export default SEDateInput;
