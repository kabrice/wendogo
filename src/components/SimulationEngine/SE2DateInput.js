'use client';

import React, { useState, useEffect } from 'react';
import DateInput from './DateInput';
import ButtonLarge from '../ButtonLarge';

const SE2DateInput = (props) => {
    const {
        title, showContinueBtn, tip, hideEndDate,
        startDay, setStartDay, startMonth, setStartMonth, startYear, setStartYear,
        endDay, setEndDay, endMonth, setEndMonth, endYear, setEndYear,
        sendFormattedDateResultToParent, validated, titleStartDate, titleEndDate,
        isStartDateValid, setIsStartDateValid, isEndDateValid, setIsEndDateValid,
        isButtonClicked, setIsButtonClicked, lastPossibleDate
    } = props;

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const minDate = new Date('1970-01-01');
    const maxDate = lastPossibleDate ? lastPossibleDate : new Date();
    
    useEffect(() => {
        const start = `${startYear}-${startMonth.padStart(2, '0')}-${startDay.padStart(2, '0')}`;
        const end = `${endYear}-${endMonth.padStart(2, '0')}-${endDay.padStart(2, '0')}`;
    
        setStartDate(start);
        setEndDate(end);
    
        const isStartDateInRange = isDateInRange(startDay, startMonth, startYear, minDate, maxDate);
        const isEndDateInRange = hideEndDate ? true : isDateInRange(endDay, endMonth, endYear, minDate, maxDate);
    
        const isStartDateValid = isStartDateInRange && (!hideEndDate ? start < end : true);
        const isEndDateValid = hideEndDate || (isEndDateInRange && start < end);
    
        setIsStartDateValid(isStartDateValid);
        setIsEndDateValid(isEndDateValid);
        //console.log('== Debugging ==', { start, end, isStartDateInRange, isEndDateInRange, isStartDateValid, isEndDateValid });
    }, [startDay, startMonth, startYear, endDay, endMonth, endYear, hideEndDate, maxDate, minDate]);
    
    const isDateInRange = (day, month, year, minDate, maxDate) => {
        const date = new Date(year, month - 1, day); 
        return date >= minDate && date <= maxDate;
    };

    const handleButtonClick = () => { 
        const start = `${startYear}-${startMonth.padStart(2, '0')}-${startDay.padStart(2, '0')}`;
        const end = `${endYear}-${endMonth.padStart(2, '0')}-${endDay.padStart(2, '0')}`;
    
        const isStartDateInRange = isDateInRange(startDay, startMonth, startYear, minDate, maxDate);
        const isEndDateInRange = hideEndDate ? true : isDateInRange(endDay, endMonth, endYear, minDate, maxDate);
        
        const isStartDateValid = isStartDateInRange && (!hideEndDate ? start < end : true);
        const isEndDateValid = hideEndDate || (isEndDateInRange && start < end);
    
        setIsStartDateValid(isStartDateValid);
        setIsEndDateValid(isEndDateValid);
    
        if (isStartDateValid && isEndDateValid) {
            const formattedStartDate = `${startDay.padStart(2, '0')}/${startMonth.padStart(2, '0')}/${startYear}`;
            const formattedEndDate = hideEndDate 
                ? null 
                : `${endDay.padStart(2, '0')}/${endMonth.padStart(2, '0')}/${endYear}`;
            
            sendFormattedDateResultToParent({ 
                startDate: formattedStartDate, 
                endDate: formattedEndDate, 
                validated: true 
            });
        } else {
            sendFormattedDateResultToParent(null);
            console.error('Dates are out of range or invalid.');
        }
    };
    
    return (
        <div id="PRI_DON_NAISS-wrapper" className="FieldWrapper DateInputField PRI_DON_NAISS fade-in">
            <div className="FieldView DaisyFieldView DateInputField PRI_DON_NAISS" >
                {title?.length > 0 && (
                    <div className="FieldView-flex-container">
                        <label className="Label">{title}</label>
                    </div>
                )}
                {tip?.length > 0 && (
                    <div className="Tip">
                        <div>{tip}</div>
                    </div>
                )}
                <div className="app-row app-field" style={{ display: 'flex' }}>
                    <div className="app-col-xs-12 app-col-sm-12 app-col-md-12 Field" >
                        <div className="ButtonField">
                            <DateInput
                                label={titleStartDate || "Date de départ"}
                                day={startDay}
                                setDay={setStartDay}
                                month={startMonth}
                                setMonth={setStartMonth}
                                year={startYear}
                                setYear={setStartYear}
                                setIsButtonClicked={setIsButtonClicked}
                                isButtonClicked={isButtonClicked}
                                validated={validated}
                                is2Date={true}
                                onValidChange={setIsStartDateValid}
                            />
                            {!hideEndDate && (
                                <DateInput
                                    label={titleEndDate || "Date d'arrivée"}
                                    day={endDay}
                                    setDay={setEndDay}
                                    month={endMonth}
                                    setMonth={setEndMonth}
                                    year={endYear}
                                    setYear={setEndYear}
                                    setIsButtonClicked={setIsButtonClicked}
                                    isButtonClicked={isButtonClicked}
                                    validated={validated}
                                    is2Date={true}
                                    onValidChange={setIsEndDateValid}
                                />
                            )}
                        </div> 
                    </div>
                </div>
                {((!isStartDateValid || !isEndDateValid) && (isButtonClicked || !title)) && (
                    <div className="Error">
                        <span className="Icon error-icon icon-lesfurets icon-system-alert" /> {`Veusillez entrer ${!hideEndDate ? 'des dates valides' : 'une date valide'}.`}
                    </div>
                )}
                {showContinueBtn && title?.length > 0 && (
                    <ButtonLarge
                        name="Continuer"
                        handleContinue={() => {
                            setIsButtonClicked(true);
                            if (isStartDateValid && isEndDateValid) {
                                handleButtonClick();
                            }
                        }}
                    />
                )}
            </div>
        </div>
    );
};

export default SE2DateInput;
