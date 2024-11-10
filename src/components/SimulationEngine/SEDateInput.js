import React, { useState, useRef, useEffect } from 'react';
import helper from '../../utils/Helper';
import ButtonLarge from "../ButtonLarge";

const SEDateInput = (props) => {

    const { title, handleDayChange, handleMonthChange, handleYearChange, showContinueBtn, id,
            tip, day, setDay, month, setMonth, year, setYear, sendFormattedDateResultToParent, validated } = props;

    const [valid, setValid] = useState(validated);
    const [focused, setFocused] = useState(true);

    const newRef = useRef(null);

    const handleFocus = () => {
        setFocused(true);
        setValid(true);
    };
    const handleBlur = (e) => {
        const { name, value } = e.target;
        let newDay = day;
        let newMonth = month;
        let newYear = year;

        if (name.includes('day')) {
            newDay = value.padStart(2, '0');
            if (['0', '00'].includes(newDay)) newDay = '';
            setDay(newDay);
        } else if (name.includes('month')) {
            newMonth = value.padStart(2, '0');
            if (['0', '00'].includes(newMonth)) newMonth = '';
            setMonth(newMonth);
        } else if (name.includes('year')) {
            newYear = value;
            if (newYear.length === 2) {
                newYear = parseInt(newYear) >= 20 ? `19${newYear}` : `20${newYear}`;
            } else if (newYear.length === 1) {
                newYear = `200${newYear}`;
            }
            setYear(newYear);
        }

        // Validate the date with the updated values
        if(newDay && newMonth && newYear){
            validateDate(newDay, newMonth, newYear);
        }
    };

    // const validateDate = (day, month, year) => {
    //     const inputDate = new Date(`${year}-${month}-${day}`);
    //     const minDate = new Date('1970-01-01');
    //     const currentDate = new Date();
    //     const maxDate = new Date(currentDate.getFullYear() - 14, currentDate.getMonth(), currentDate.getDate());
    //     console.log('data', {inputDate, minDate, maxDate});
    //     if (inputDate >= minDate && inputDate <= maxDate) {
    //         console.log('valid');
    //         setValid(true);
    //     } else {
    //         console.log('invalid');
    //         setValid(false);
    //     }
    // };
    const validateDate = (day, month, year) => {
        const inputDate = new Date(`${year}-${month}-${day}`);
        const minDate = new Date('1970-01-01');
        const currentDate = new Date();
        const maxDate = new Date(currentDate.getFullYear() - 14, currentDate.getMonth(), currentDate.getDate());
        
        // Check if inputDate is valid (not NaN)
        if (isNaN(inputDate.getTime())) {
            setValid(false);
            return;
        }
        
        if (inputDate >= minDate && inputDate <= maxDate) {
            console.log('valid');
            setValid(true);
        } else {
            console.log('invalid');
            setValid(false);
        }
    };

    const handleButtonClick = () => {
        if (day && month && year) {
            const formattedDay = day.padStart(2, '0');
            const formattedMonth = month.padStart(2, '0');
            const formattedYear = year.length === 2 ? (parseInt(year) >= 20 ? `19${year}` : `20${year}`) : year;
            const date = `${formattedDay}/${formattedMonth}/${formattedYear}`;
            
            validateDate(formattedDay, formattedMonth, formattedYear);

            if (valid) {
                sendFormattedDateResultToParent(date);
                console.log(date);
            }
        } else {
            setValid(false);
        }
    };

    const handleOutsideClick = (e) => {
        if (newRef.current && !newRef.current.contains(e.target) && !helper.isTargetContainsIgnoreClass(e.target)) {
            setFocused(false);
            console.log('😍 outside click', day, month, year);
            
            // If any field is empty
            if (!day || !month || !year) {
                setValid(false);
                return;
            }
            
            // If all fields are filled, validate the date
            const formattedDay = day.padStart(2, '0');
            const formattedMonth = month.padStart(2, '0');
            const formattedYear = year.length === 2 ? 
                (parseInt(year) >= 20 ? `19${year}` : `20${year}`) : 
                year;
                
            validateDate(formattedDay, formattedMonth, formattedYear);
        }
    };

    // const handleOutsideClick = (e) => {
    //     if (newRef.current && !newRef.current.contains(e.target) && !helper.isTargetContainsIgnoreClass(e.target)) {
    //         setFocused(false);
    //         console.log('😍 outside click', day, month, year);
    //         if (day && month && year) {
    //             setValid(true);
    //         } else {
    //             setValid(false);
    //         }
    //     }
    // };
      
    useEffect(() => {
        helper.addOutsideClick(handleOutsideClick);
    }, [setValid, setFocused, day, month, year]);

    const voidFunction = () => {
        return null;
    };

    return (
        <div id={`${id}-wrapper`} className={`FieldWrapper DateInputField PRI_DON_NAISS ${focused ? 'focused' : ''} ${valid ? 'field-valid' : 'field-error'} fade-animation fade-slow-enter-done`}>
            <div className={`FieldView DaisyFieldView DateInputField PRI_DON_NAISS ${focused ? 'focused' : ''}`}>
                <div className="FieldView-flex-container">
                    <label className="Label">{title}</label>
                </div>
                <div className="Tip">
                    <div>{tip}</div>
                </div>
                <div className="DrawerAnimation" style={{ height: 0 }}/> 
                <div className="app-row app-field">
                    <div className="app-col-xs-12 app-col-sm-12 app-col-md-12 Field">
                        <div id={`${id}`} className="Date">
                            <div className={`Date-labels ${focused ? 'focused' : ''} ${valid ? 'field-valid' : 'field-error'}`}>
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
                                    id={`${id}-day`}
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
                                    id={`${id}-month`}
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
                                    id={`${id}-year`}
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
                {/* <h1>{'+++ '+valid +' +++ '+focused}</h1> */}
                {(!valid && !focused) && (
                    <div className="Error">
                        <span className="Icon error-icon icon-lesfurets icon-system-alert" /> Veuillez entrer une date valide
                    </div>
                )}
                {/* {' '+valid} */}
                {showContinueBtn && <ButtonLarge name="Continuer" handleContinue={valid ? handleButtonClick : voidFunction} />}
            </div>
        </div>
    );
}

export default SEDateInput;
