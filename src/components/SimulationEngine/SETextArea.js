import React, { useState, useRef, useEffect } from 'react';
import helper from '../../utils/Helper';
import ButtonLarge from "../ButtonLarge";

const SETextArea = (props) => {
  const { 
    title, showTip, handleChange, value, placeholderText, handleContinue, 
    showContinueBtn, tip, isPartOfInputGroup, id,
    errorMessage, valid, setValid, maxLength, onClickOutside 
  } = props;

  const [focused, setFocused] = useState(true);
  const [charCount, setCharCount] = useState(value.length || 0); // Initialize char count based on initial value
  //const maxLength = 1000; // Maximum character limit
  const newRef = useRef(null);

  const handleFocus = () => { 
    setFocused(true);
    setValid(true);
  };

  // const handleOutsideClick = (e) => {
  //   if (newRef.current && !newRef.current.contains(e.target) && !helper.isTargetContainsIgnoreClass(e.target) && doesValueValid) {
  //     console.log('outside click', doesValueValid());
  //     setFocused(false); 
  //     setValid(doesValueValid());
  //   }
  // };

  // useEffect(() => {
  //   helper.addOutsideClick(handleOutsideClick); 
  // }, []);
  useEffect(() => {
    // Function to handle click events
    const handleClickOutside = (event) => {
      if (newRef.current && !newRef.current.contains(event.target) && !helper.isTargetContainsIgnoreClass(event.target) && onClickOutside) {
        console.log('outside click' );
        setFocused(false); 
        setValid( onClickOutside(value));
      }
    };

    // Add event listener for clicks
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClickOutside]);

  const handleTextChange = (e) => {
    const text = e.target.value;
    if (text.length <= (maxLength || 255)) {
      handleChange(e); // Update the parent state
      setCharCount(text.length); // Update the character count
    }
  };

  const voidFunction = () => {};

  return (
    <div className={`FieldWrapper TextAreaField MESSAGE field-default ${focused ? 'focused' : ''} ${valid ? 'field-valid' : (focused ? '' : 'field-error')} fade-animation fade-slow-enter-done`}>
      <div className={`FieldView DaisyFieldView undefined field-default TextAreaField MESSAGE`} style={isPartOfInputGroup ? {margin: 0} : {}}>
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
            <div className={`Textarea textField ${focused ? 'focused' : ''} ${valid ? 'field-valid' : (focused ? '' : 'field-error')}`} ref={newRef}>
              <textarea 
                placeholder={placeholderText}
                autoComplete='off'
                aria-autocomplete='none'
                id={id}
                name={id}
                tabIndex={6} 
                maxLength={maxLength} 
                value={value}
                onChange={handleTextChange} 
                onFocus={handleFocus} 
                onBlur={() => setFocused(false)} 
              />
            </div>
            <div className="char-counter" style={{paddingLeft: '9px'}}>{`${charCount}/${maxLength || 255}`}</div>
          </div>
        </div>
        {(!valid && !focused) && (
          <div className="Error">
            <span className="Icon error-icon icon-lesfurets icon-system-alert" /> {errorMessage ? errorMessage : "Veuillez entrer un texte valide"}
          </div>
        )}
        {!isPartOfInputGroup && showContinueBtn && <ButtonLarge name="Continuer" handleContinue={valid ? handleContinue : voidFunction} />}
      </div>
    </div>
  );
};

export default SETextArea;
