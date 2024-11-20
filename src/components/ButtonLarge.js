'use client';

import React, { useCallback } from 'react';

function ButtonLarge(props) {

  const {name, handleContinue, notStandard, uniqueId } = props;
  const onClickBtn = useCallback((e) => {
    e.preventDefault();
    //e.stopPropagation();
    handleContinue(e);
  }, [handleContinue]);
  return (

    <button onClick={onClickBtn} 
            id={uniqueId}
            style={notStandard ? {width: '65.3%', margin: 0} : {}}
            className="CTA button primary xlarge userValidation" title="" data-trackingprefix="" data-testid="DaisyFieldView-continuer-VEH_DTL_POSSESSION"> {name} </button>
  );
}

export default ButtonLarge;
