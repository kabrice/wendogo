import React, { useState } from "react";
import SEDateInput from "../../components/SimulationEngine/SEDateInput";

const BirthDate = () => {

    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [formatedDate, setFormattedDate] = useState('');
    
    const handleDayChange = (e) => {
        const value = e.target.value.replace(/[^0-9]/g, ); 
        if (value <= 31 && value >= 0) {
            setDay(value);
        }
    };

    const handleMonthChange = (e) => {
        const value = e.target.value.replace(/[^0-9]/g, ); 
        if (/^\d{0,2}$/.test(value) && value >= 0) {
            
            setMonth(value);
        }
    };
    let todayYear = new Date().getFullYear();
    const handleYearChange = (e) => {
        const value = e.target.value.replace(/[^0-9]/g, ); 
       // console.log('valuexxx', value)
        if ( value <= todayYear){
            //console.log('handleYearChange value', value)
            setYear(value);
        }
    };

    const receiveFormattedDateFromSEDateInput = (item) => {
        //console.log('item', item)
        setFormattedDate(item);
        //console.log('formattedDate', formatedDate)
    };
    return (<SEDateInput title="Quelle est votre date de naissance ?" day={day} month={month} year={year} setDay={setDay} setMonth={setMonth} setYear={setYear}
                         handleDayChange={handleDayChange} handleMonthChange={handleMonthChange} handleYearChange={handleYearChange} showContinueBtn={true}
                         sendFormattedDateResultToParent={receiveFormattedDateFromSEDateInput} />);
}

export default BirthDate;
