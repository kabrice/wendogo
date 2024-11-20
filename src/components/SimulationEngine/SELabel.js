'use client';

import React  from 'react'; 
import SvgConstant from "../../utils/SvgConstant";
const SELabel = (props) => {

  const { title, tip, svgConstantName } = props;

   
 
  return (
    <div className={`FieldWrapper TextField fade-animation fade-slow-enter-done`}>
      <div className={`FieldView DaisyFieldView TextField COORD_PRE`} style={{margin : 0}}>
        <div className="FieldView-flex-container">
          <label className="Label">{svgConstantName && SvgConstant.getSvg(svgConstantName)} {title}</label>
        </div>
        <div className="Tip  ">
        <div dangerouslySetInnerHTML={{ __html: tip }} />
        </div> 
      </div>
    </div>
  );
};

export default SELabel;
