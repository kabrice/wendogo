import React, { useState, useRef, useEffect } from 'react';
import helper from '../../utils/Helper';
import ButtonLarge from "../ButtonLarge";
import { set } from 'lodash';

const SETextInput = (props) => {

  const { title, handleChange, value, inputLength, handleContinue, showContinueBtn, tip, isPartOfInputGroup, 
          inputGroupBlockTitle, valid, setValid, type, onClickOutside, id, autoComplete} = props;


  const [focused, setFocused] = useState(true);
  const newRef = useRef(null)

  const handleFocus = () => {
    setFocused(true);
    setValid(true);
  };
  // const handleOutsideClick = (e) => {
  //   if (newRef.current && !newRef.current.contains(e.target) && !helper.isTargetContainsIgnoreClass(e.target)) {
  //     console.log('Outside click SETextInput')
  //     setFocused(false);
  //     setValid(doesValueValid);
  //   }
  // };

  useEffect(() => {
    // Function to handle click events
    const handleClickOutside = (event) => {
      console.log('OUF 😱 TextInput  '+newRef.current, !newRef.current.contains(event.target), !helper.isTargetContainsIgnoreClass(event.target), onClickOutside);   
      if (newRef.current && !newRef.current.contains(event.target) && !helper.isTargetContainsIgnoreClass(event.target) && onClickOutside) {      
        //alert('OUF 😱 TextInput  '+focused);   
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

  const voidFunction = () => {
    return null;
  }
  const emailSVG = <svg width="32px" height="24px" viewBox="0 0 32 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                      <title>noun-envelope-74343</title>
                      <g id="Page-1" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                        <g id="noun-envelope-74343" fill={(valid || focused) ? "#0154C0" : '#ff3535'}  fillRule="nonzero">
                          <path d="M28.6666667,24 L3.33333333,24 C1.496,24 0,22.504 0,20.6666667 L0,3.33333333 C0,1.496 1.496,0 3.33333333,0 L28.6666667,0 C30.504,0 32,1.496 32,3.33333333 L32,20.6666667 C32,22.504 30.504,24 28.6666667,24 Z M3.33333333,1.33333333 C2.23066667,1.33333333 1.33333333,2.23066667 1.33333333,3.33333333 L1.33333333,20.6666667 C1.33333333,21.7693333 2.23066667,22.6666667 3.33333333,22.6666667 L28.6666667,22.6666667 C29.7693333,22.6666667 30.6666667,21.7693333 30.6666667,20.6666667 L30.6666667,3.33333333 C30.6666667,2.23066667 29.7693333,1.33333333 28.6666667,1.33333333 L3.33333333,1.33333333 Z" id="Shape" />
                          <path d="M16,16.04 C14.648,16.04 13.384,15.4733333 12.44,14.4493333 L1.032,1.976 C0.784,1.704 0.802666667,1.28266667 1.07466667,1.03333333 C1.34533333,0.785333333 1.768,0.804 2.01733333,1.076 L13.424,13.548 C14.7973333,15.0413333 17.2026667,15.0426667 18.5786667,13.5466667 L29.928,1.12933333 C30.1786667,0.856 30.5986667,0.84 30.8706667,1.08666667 C31.144,1.336 31.1626667,1.756 30.9146667,2.02933333 L19.5626667,14.4466667 C18.616,15.4733333 17.352,16.04 16,16.04 Z" id="Path" />
                          <path d="M1.49066667,23.1773333 C1.31066667,23.1773333 1.12933333,23.104 0.998666667,22.96 C0.749333333,22.688 0.769333333,22.2653333 1.04133333,22.0173333 L11.484,12.4813333 C11.756,12.2333333 12.1786667,12.2506667 12.4266667,12.524 C12.676,12.796 12.656,13.2186667 12.384,13.4653333 L1.94133333,23.0013333 C1.812,23.1186667 1.65066667,23.1773333 1.49066667,23.1773333 Z" id="Path" />
                          <path d="M30.456,23.1226667 C30.2946667,23.1226667 30.136,23.0653333 30.0066667,22.948 L19.6186667,13.4666667 C19.3466667,13.2186667 19.3266667,12.7973333 19.576,12.5253333 C19.8266667,12.252 20.248,12.2333333 20.5186667,12.4826667 L30.9066667,21.964 C31.1773333,22.2146667 31.1986667,22.6346667 30.948,22.9053333 C30.8146667,23.0493333 30.636,23.1226667 30.456,23.1226667 Z" id="Path" />
                        </g>
                      </g>
                    </svg>
     
     const getIconForType = (type) => {
      switch (type) {
        case 'email':
          return emailSVG; 
        default:
          return null; // Return null or a default icon if needed
       }
      }

      const getInputType = (type) => {
        switch (type) {
          case 'email':
            return 'email'; 
          case 'number':
            return 'number';
          default:
            return 'text'; // Return null or a default icon if needed
        }
      }     
  return (
    <div className={`FieldWrapper TextField ${focused ? 'focused' : ''} ${valid ? 'field-valid' : (focused ? '' : 'field-error')} fade-animation fade-slow-enter-done`}>
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
            <div className={`Input textField ${focused ? 'focused' : ''} ${valid ? 'field-valid' : (focused ? '' : 'field-error')}`}  ref={newRef}>
              <input
                type={getInputType(type)}
                autoComplete={autoComplete}
                id={getInputType(type)+ id}
                name={getInputType(type)}
                maxLength={inputLength}
                value={value}
                onChange={handleChange}
                onFocus={handleFocus}
                placeholder={inputGroupBlockTitle ? inputGroupBlockTitle : 'Entrez le texte ici'}
              />
              {type && (
                      <span className="Input-symbol">
                        <span className="Icon icon-lesfurets icon-system-mail">
                          {getIconForType(type)}
                        </span>
                      </span>
                    )}
            </div>
          </div>
        </div>
        {/* <h2>{'Input= '+valid+' === '+focused}</h2> */}
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
