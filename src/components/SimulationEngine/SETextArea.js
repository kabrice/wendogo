import React, { useState, useRef, useEffect } from 'react';
import helper from '../../utils/Helper';
import ButtonLarge from "../ButtonLarge";

const SETextArea = (props) => {
  const { 
    title, showTip, handleChange, value, placeholderText, handleContinue, 
    showContinueBtn, tip, isPartOfInputGroup, id, rows,
    errorMessage, valid, setValid, maxLength, onClickOutside 
  } = props;
  
  const [focused, setFocused] = useState(true);
  const [charCount, setCharCount] = useState(value?.length || 0);
  const textareaRef = useRef(null);

  const handleFocus = () => { 
    setFocused(true);
    setValid(true);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if click target is outside the entire textarea container
      if (textareaRef.current && 
          !textareaRef.current.contains(event.target) && 
          typeof onClickOutside === 'function' &&
          !helper.isTargetContainsIgnoreClass(event.target)) {
            
        console.log('Textarea clicked outside');
        setFocused(false);
        
        // Wrap in setTimeout to ensure state updates have completed
        setTimeout(() => {
          setValid(onClickOutside(value));
        }, 0);
      }
    };

    // Use capture phase to ensure event is caught before any stopPropagation
    document.addEventListener('mousedown', handleClickOutside, true);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside, true);
    };
  }, [onClickOutside, value, setValid]);

  const handleTextChange = (e) => {
    const text = e.target.value;
    if (text.length <= (maxLength || 255)) {
      handleChange(e);
      setCharCount(text.length);
    }
  };

  return (
    <div className={`FieldWrapper TextAreaField MESSAGE field-default ${focused ? 'focused' : ''} ${valid ? 'field-valid' : (focused ? '' : 'field-error')} fade-animation fade-slow-enter-done`}>
      <div 
        className={`FieldView DaisyFieldView undefined field-default TextAreaField MESSAGE`} 
        style={isPartOfInputGroup ? {margin: 0} : {}}
        ref={textareaRef}  // Move ref here to cover entire component
      >
        {!isPartOfInputGroup && (
          <>
            <div className="FieldView-flex-container">
              <label className="Label">{title}</label>
            </div>
            <div className="Tip">
              {showTip && <div>{tip}</div>}
            </div>
          </>
        )}
        <div className="app-row app-field">
          <div className="app-col-xs-12 app-col-sm-8 app-col-md-8 Field ignore-outside-click">
            <div className={`Textarea textField ${focused ? 'focused' : ''} ${valid ? 'field-valid' : (focused ? '' : 'field-error')}`}>
              <textarea 
                placeholder={placeholderText}
                autoComplete='off'
                aria-autocomplete='none'
                id={id}
                rows={rows}
                name={id}
                tabIndex={6} 
                maxLength={maxLength} 
                value={value || ''}
                onChange={handleTextChange} 
                onFocus={handleFocus}
              />
            </div>
            <div className="char-counter" style={{paddingLeft: '9px'}}>
              {`${charCount}/${maxLength || 255}`}
            </div>
          </div>
        </div>

        {(!valid && !focused) && (
          <div className="Error">
            <span className="Icon error-icon icon-lesfurets icon-system-alert" />
            {errorMessage || "Veuillez entrer un texte valide"}
          </div>
        )}

        {!isPartOfInputGroup && showContinueBtn && (
          <ButtonLarge 
            name="Continuer" 
            handleContinue={valid ? handleContinue : () => {}} 
          />
        )}
      </div>
    </div>
  );
};

export default SETextArea;
