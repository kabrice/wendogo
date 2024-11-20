'use client';

import React, { useState } from 'react'; 

const DateInput = ({ label, day, setDay, month, setMonth, year, setYear, onValidChange, setIsButtonClicked, isButtonClicked, validated, is2Date }) => {
    const [focused, setFocused] = useState(false);
    const [valid, setValid] = useState(validated);  
    const handleFocus = () => {
        setFocused(true);
        setValid(true);
    }; 
    
    const isLeapYear = (year) => {
        return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    };

    const getDaysInMonth = (month, year) => {
        const daysInMonth = [31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        return daysInMonth[month - 1];
    };

    const handleBlur = () => {
        let newDay = day;
        let newMonth = month;
        let newYear = year;

        if (!day && !month && !year) {
            setFocused(true);
        } else {
            // Ensure day and month have exactly 2 digits
            if (day.length === 1) {
                newDay = day.padStart(2, '0');
                setDay(newDay);
            }
            if (month.length === 1) {
                newMonth = month.padStart(2, '0');
                setMonth(newMonth);
            }

            // Year handling: add century if only two digits are entered
            if (year.length === 2) {
                newYear = parseInt(year) >= 20 ? `19${year}` : `20${year}`;
                setYear(newYear);
            }
            if (year.length === 1) {
                newYear = `200${year}`;
                setYear(newYear);
            }
        }

        // Validate day based on the month and year
        const maxDays = getDaysInMonth(parseInt(newMonth), parseInt(newYear));
        const isValidDay = parseInt(newDay) >= 1 && parseInt(newDay) <= maxDays;

        const isValid = (newDay?.length === 2 || day.length === 2) && 
                        (newMonth?.length === 2 || month.length === 2) && 
                        (newYear?.length === 4 || year.length === 4) &&
                        isValidDay;

        setValid(isValid);
        onValidChange(isValid);
    };
    const handleDayChange = (e) => {
        const value = e.target.value;
        if (value.length <= 2) setDay(value);
        setIsButtonClicked(false);
    };

    const handleMonthChange = (e) => {
        const value = e.target.value;
        if (value.length <= 2) setMonth(value);
        setIsButtonClicked(false);
    };

    const handleYearChange = (e) => {
        const value = e.target.value;
        if (value.length <= 4) setYear(value);
        setIsButtonClicked(false);
    };

    return (
        <div className={`fade-animation fade-slow-enter-done ${is2Date ? 'ButtonField-Block button-field-true-PRI_DON_AUTRE_VEH app-col-xs-6 app-col-sm-4 app-col-md-4 ' : ' Date'} ${focused ? 'focused' : ''} ${valid ? 'field-valid' : 'field-error'}`}>
            <div className={`Date-labels ${focused ? 'focused' : ''}`} style={is2Date && {padding:'0 0 0 10px', float: 'left'}}>
            {is2Date ? <span>{label}</span> : <>
                                                <span style={{ width: "30%", textAlign: "center" }}>Jour</span>
                                                <span style={{ width: "30%", textAlign: "center" }}>Mois</span>
                                                <span style={{ width: "40%", textAlign: "center" }}>Année</span>
                                              </>}
            </div> 
            <div className={`Date-content ${focused ? 'focused' : ''} ${isButtonClicked && ((day && month && year) ? 'field-valid' : 'field-error')}`}>
                <input
                    className="DateElement DateElement-day"
                    type="number"
                    inputMode="numeric"
                    placeholder="JJ"
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
                    placeholder="MM"
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
                    placeholder="AAAA"
                    value={year}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onChange={handleYearChange}
                    style={{ width: "40%", textAlign: "center" }}
                />
            </div>
        </div>
    );
};

export default DateInput;
