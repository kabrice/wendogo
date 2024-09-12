import React, { useState } from 'react';
import DateInput from './SEDateInput'; // Assuming the DateInput component is in the same directory
import ButtonLarge from '../ButtonLarge';
import { set } from 'lodash';

const SE2DateInput = (props) => {
    const {
        title, showContinueBtn, tip,
        startDay, setStartDay, startMonth, setStartMonth, startYear, setStartYear,
        endDay, setEndDay, endMonth, setEndMonth, endYear, setEndYear,
        sendFormattedDateResultToParent, validated
    } = props;

    const [isStartDateValid, setIsStartDateValid] = useState(false || validated);
    const [isEndDateValid, setIsEndDateValid] = useState(false || validated);
    const [isButtonClicked, setIsButtonClicked] = useState(false);
    const [startDate] = useState(`${startYear}-${startMonth?.padStart(2, '0')}-${startDay?.padStart(2, '0')}`);
    const [endDate] = useState(`${endYear}-${endMonth?.padStart(2, '0')}-${endDay?.padStart(2, '0')}`);

    const isDateInRange = (day, month, year, minDate, maxDate) => {
        const date = new Date(year, month - 1, day);
        const isDateInRange = date >= minDate && date <= maxDate;
        setIsStartDateValid(true);
            setIsEndDateValid(true);
        if(!isDateInRange) {
            setIsStartDateValid(false);
            setIsEndDateValid(false);
        }
        return isDateInRange;
    };

    const [isStartDateInRange] = useState(isDateInRange(startDay, startMonth, startYear, new Date('1970-01-01'), new Date()));
    const [isEndDateInRange] = useState(isDateInRange(endDay, endMonth, endYear, new Date('1970-01-01'), new Date()));
    const handleButtonClick = () => { 

        if (isStartDateValid || isEndDateValid) {
            const formattedStartDate = `${startDay.padStart(2, '0')}/${startMonth.padStart(2, '0')}/${startYear}`;
            const formattedEndDate = `${endDay.padStart(2, '0')}/${endMonth.padStart(2, '0')}/${endYear}`;
            sendFormattedDateResultToParent({ startDate: isStartDateValid ? formattedStartDate : null, endDate:  isEndDateValid ? formattedEndDate : null, validated: true });
        } else {
            console.error('Dates are out of range or invalid.');
        }
    };

    const voidFunction = () => {
        return null;
    };

    return (
        <div id="PRI_DON_NAISS-wrapper" className="FieldWrapper DateInputField PRI_DON_NAISS">
            <div className="FieldView DaisyFieldView DateInputField PRI_DON_NAISS">
                <div className="FieldView-flex-container">
                    <label className="Label">{title}</label>
                </div>
                <div className="Tip">
                    <div>{tip}</div>
                </div>
                <div className="app-row app-field" style={{ display: 'flex' }}>
                    <div className="app-col-xs-12 app-col-sm-12 app-col-md-12 Field">
                        {'depart '+endDay+' '+endMonth+' '+endYear}
                        <DateInput
                            label="Date de départ"
                            day={endDay}
                            setDay={setEndDay}
                            month={endMonth}
                            setMonth={setEndMonth}
                            year={endYear}
                            setYear={setEndYear}
                            setIsButtonClicked={setIsButtonClicked}
                            isButtonClicked={isButtonClicked}
                            validated={validated}
                            onValidChange={setIsEndDateValid}
                        />
                    </div>
                    <div className="app-col-xs-12 app-col-sm-12 app-col-md-12 Field">
                        {'arrivée '+startDay+' '+startMonth+' '+startYear}
                        <DateInput
                            label="Date d'arrivée"
                            day={startDay}
                            setDay={setStartDay}
                            month={startMonth}
                            setMonth={setStartMonth}
                            year={startYear}
                            setYear={setStartYear}
                            setIsButtonClicked={setIsButtonClicked}
                            isButtonClicked={isButtonClicked}
                            validated={validated}
                            onValidChange={setIsStartDateValid}
                        />
                    </div>
                </div>
                {' == '+isStartDateValid+' == '+isEndDateValid+' == '+isButtonClicked}
                {((!isStartDateValid || !isEndDateValid )   && isButtonClicked) && (
                    <div className="Error">
                        <span className="Icon error-icon icon-lesfurets icon-system-alert" /> Veuillez entrer des dates valides.
                    </div>
                )}
                {showContinueBtn && (
                    <ButtonLarge
                        name="Continuer"
                        handleContinue={() => {
                            setIsButtonClicked(true);
                            if (isStartDateValid && isEndDateValid) {
                                handleButtonClick();
                            } else {
                                voidFunction();
                            }
                        }}
                    />
                )}
            </div>
        </div>
    );
};

export default SE2DateInput;
