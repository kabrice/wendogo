'use client';

import React from 'react';

const Countdown = ({ countdownData, name }) => {
  if (!countdownData.isItBday) {
    return (
      <div>
        {/* <h1 className='heading'>
          Countdown to <span className='highlight'>{name}'s</span> Birthday
        </h1> */}
        <div className='countdown-wrapper'>
          <div className='countdown-box'>
            {countdownData.days}
            <span className='legend'>Jours</span>
          </div>
          <div className='countdown-box'>
            {countdownData.hours}
            <span className='legend'>Heures</span>
          </div>
          <div className='countdown-box'>
            {countdownData.minutes}
            <span className='legend'>Minutes</span>
          </div>
          <div className='countdown-box'>
            {countdownData.seconds}
            <span className='legend'>Secondes</span>
          </div>
        </div>
      </div>
    );
  } else {
    return <div>Wish</div>;
  }
};

export default Countdown;
