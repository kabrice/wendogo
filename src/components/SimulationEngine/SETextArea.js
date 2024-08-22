import React, { useState, useRef, useEffect } from 'react';
import helper from '../../utils/Helper';
import ButtonLarge from "../ButtonLarge";
import { set } from 'lodash';

const SETextArea = (props) => {

  const { title, showTip, handleChange, value, placeholderText, handleContinue, showContinueBtn, tip, isPartOfInputGroup, inputGroupBlockTitle,
        doesValueValid, valid, setValid
   } = props;


  const [focused, setFocused] = useState(false);
  const newRef = useRef(null)

  const handleFocus = () => {
    console.log('handleFocus')
    setFocused(true);
    setValid(true);
  };
  
  const handleOutsideClick = (e) => {
    if (newRef.current && !newRef.current.contains(e.target) && !helper.isTargetContainsIgnoreClass(e.target)) {
      console.log('outside click SETextArea')
      setFocused(false);
      console.log('xxx ', value);
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
    <div className={`FieldWrapper TextAreaField MESSAGE field-default ${focused ? 'focused' : ''} ${valid ? 'field-valid' : 'field-error'}`}>
      <div className={`FieldView DaisyFieldView undefined field-default TextAreaField MESSAGE`} style={isPartOfInputGroup && {margin: 0}}>
      {!isPartOfInputGroup               
                && <>
                    <div className="FieldView-flex-container">
                        <label className="Label">{title}</label>
                    </div>
                    <div className="Tip">
                        {showTip && <div>{tip}</div>}
                    </div>
                </>}
        <div className="app-row app-field">
          <div className="app-col-xs-12 app-col-sm-8 app-col-md-8 Field ignore-outside-click">
            <div className={`Textarea textField ${focused ? 'focused' : ''} ${valid ? 'field-valid' : 'field-error'}`} ref={newRef}>
                <textarea placeholder={placeholderText}
                            id="MESSAGE" name="MESSAGE" 
                            tabIndex={6} maxLength={1000} 
                            value={value}
                            onChange={handleChange} 
                            onFocus={() => handleFocus()} onBlur={() => setFocused(false)} />
            </div>
          </div>
        </div>
        {(!valid && !focused) && (
          <div className="Error">
            <span className="Icon error-icon icon-lesfurets icon-system-alert" /> Veuillez entrer un texte valide
          </div>
        )}
        {!isPartOfInputGroup && showContinueBtn && <ButtonLarge name="Continuer" handleContinue={handleContinue} />}
      </div>
    </div>
    
  );
};

export default SETextArea;
