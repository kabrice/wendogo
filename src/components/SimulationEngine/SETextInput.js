import React, { useState, useRef, useEffect } from 'react';
import helper from '../../utils/Helper';
import ButtonLarge from "../ButtonLarge";
import { set } from 'lodash';

const SETextInput = (props) => {

  const { title, handleChange, value, inputLength, handleContinue, showContinueBtn, tip, isPartOfInputGroup, inputGroupBlockTitle } = props;

  const doesValueValid = () => {
    return value !== undefined && value.trim().length >= 3 && /[a-zA-Z].*[a-zA-Z]/.test(value);
  }
  
  const [valid, setValid] = useState(doesValueValid());
  const [focused, setFocused] = useState(true);
  const newRef = useRef(null)

  const handleFocus = () => {
    setFocused(true);
    setValid(true);
  };
  const handleOutsideClick = (e) => {
    if (newRef.current && !newRef.current.contains(e.target) && !helper.isTargetContainsIgnoreClass(e.target)) {
      console.log('outside click SETextInput')
      setFocused(false);
      setValid(doesValueValid());
    }
  };

  useEffect(() => {
    helper.addOutsideClick(handleOutsideClick)
    //console.log('value', value)
    })

  const voidFunction = () => {
    return null;
  }
  return (
    <div className={`FieldWrapper TextField ${focused ? 'focused' : ''} ${valid ? 'field-valid' : 'field-error'}`}>
      <div className={`FieldView DaisyFieldView  field-default SelectField VEH_USA_KILOM ${focused ? 'focused' : ''}`} style={isPartOfInputGroup && {margin: 0}} >
                {!isPartOfInputGroup               
                && <>
                    <div className="FieldView-flex-container">
                        <label className="Label">{title}</label>
                    </div>
                    <div className="Tip">
                        {tip?.length>0 && <div>{tip}</div>}
                    </div>
                </>} 
        <div className="app-row app-field">
          <div className="app-col-xs-12 app-col-sm-8 app-col-md-8 Field ignore-outside-click">
            <div className={`Input textField ${focused ? 'focused' : ''} ${valid ? 'field-valid' : 'focused'}`}  ref={newRef}>
              <input
                type="text"
                autoComplete="on"
                id="COORD_PRE"
                name="COORD_PRE"
                maxLength={inputLength}
                value={value}
                onChange={handleChange}
                onFocus={handleFocus}
                placeholder="Entrez le texte ici"
              />
            </div>
          </div>
        </div>
        {(!valid && !focused) && (
          <div className="Error">
            <span className="Icon error-icon icon-lesfurets icon-system-alert" /> Veuillez entrer un texte valide
          </div>
        )}
        {showContinueBtn && <ButtonLarge name="Continuer" handleContinue={valid ? handleContinue : voidFunction} />}
      </div>
    </div>
  );
};

export default SETextInput;
