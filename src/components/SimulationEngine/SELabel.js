import React, { useState, useRef, useEffect } from 'react';
import helper from '../../utils/Helper';
import ButtonLarge from "../ButtonLarge";

const SELabel = (props) => {

  const { title, tip } = props;

   
 
  return (
    <div className={`FieldWrapper TextField fade-animation fade-slow-enter-done`}>
      <div className={`FieldView DaisyFieldView TextField COORD_PRE`} style={{margin : 0}}>
        <div className="FieldView-flex-container">
          <label className="Label">{title}</label>
        </div>
        <div className="Tip  ">
        <div dangerouslySetInnerHTML={{ __html: tip }} />
        </div> 
      </div>
    </div>
  );
};

export default SELabel;
