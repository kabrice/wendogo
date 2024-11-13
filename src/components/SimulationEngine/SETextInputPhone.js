import React, { useState, useRef, useEffect } from 'react';
import helper from '../../utils/Helper';
import ButtonLarge from "../ButtonLarge"; 
import { COUNTRY_CODES } from '../../utils/CountryCodes';
import 'flag-icons/css/flag-icons.min.css'
// Utility Functions
function extractDialCode(dialCode) {
  const match = dialCode.match(/^[^\d\+]+(\+\d+)/);
  return match ? match[1] : '';
}

//remove Emoji
function removeEmoji(dialCode) {
  return dialCode.replace(/[\u{1F600}-\u{1F64F}]/gu, '');
}

// function getCountryFlag(dialCode='') {
//   const match = dialCode.match(/^([^\d\+]+)/);
//   return match ? match[0] : '';
// }

function getCountryFlag({ countryCode = '' }) {
  console.log('dialCodesszsxx ', countryCode);
  if (!countryCode) return null; // Return null if countryCode is not provided
  console.log('countryCodexx ', countryCode);
  return <span className={`fi fi-${countryCode.toLowerCase()}`} style={{fontSize: 16}}></span>;
}

function getCountryDetails(countryCodeName, countryCodeList) {
  const lowerCaseCodeName = countryCodeName.toLowerCase();
  const country = countryCodeList.find(item => item.code.toLowerCase() === lowerCaseCodeName);

  if (country) {
    return {
      ...country,
      validated: true,
      flag: getCountryFlag({ countryCode: country.code }),
      dialCodeNumber: extractDialCode(country.dialCode),
    };
  }
  return null;
}

// Component
const SETextInputPhone = (props) => {
  const {
    title,
    id,
    handleChange,
    value, // Initial phone number value
    inputLength,
    handleContinue,
    showContinueBtn,
    tip,
    isPartOfInputGroup,
    inputGroupBlockTitle,
    valid,
    setValid,
    type,
    onClickOutside,
    countryCodeName,
    setCountryIso2,
  } = props;
  //console.log('valueddd', value);
  const [focused, setFocused] = useState(true);
  const newRef = useRef(null);
  const [collapseOption, setCollapseOption] = useState(true);
  const [itemSelected, setItemSelected] = useState(
    getCountryDetails(countryCodeName, COUNTRY_CODES) || { validated: false, flag: null, dialCodeNumber: '' }
  );
  
  console.log('valuexx', value);
  // Initialize inputValue with dial code and value from props
  const [inputValue, setInputValue] = useState(`${value || itemSelected?.dialCode || ''}`);

  useEffect(() => {
    // Handle clicks outside the component
    const handleClickOutside = (event) => {
        if (newRef.current && 
            !newRef.current.contains(event.target) && 
            !helper.isTargetContainsIgnoreClass(event.target)) {
            
            setCollapseOption(true);
            setFocused(false);

            // Add safety checks for onClickOutside
            if (typeof onClickOutside === 'function') {
                const validationResult = onClickOutside(inputValue);
                // Ensure we only set valid state if we got a boolean result
                if (typeof validationResult === 'boolean') {
                    setValid(validationResult);
                }
            }
        }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
        document.removeEventListener('mousedown', handleClickOutside);
    };
}, [onClickOutside, inputValue, valid, setValid]);

  const toggleDropdown = () => {
    setCollapseOption(!collapseOption);
  };

  const updateSelected = (item) => {
    const updatedItem = {
      ...item,
      validated: true,
      flag: getCountryFlag({ countryCode: item.code }),
      dialCodeNumber: item.dialCode,
    };
    setItemSelected(updatedItem);
  
    const currentValue = inputValue.replace(itemSelected.dialCodeNumber || '', '');
    setInputValue(`${updatedItem.dialCodeNumber}${currentValue}`);
    setCountryIso2(updatedItem.code);
    setCollapseOption(true);
  };
  

  const handleInputChange = (e) => {
    const currentValue = e.target.value;

    // Ensure only numbers are inputted
    const numericValue = currentValue.replace(/[^\d+]/g, '');

    // Prevent the user from deleting the dial code
    if (!numericValue.startsWith(itemSelected.dialCodeNumber)) {
      setInputValue(itemSelected.dialCodeNumber);
    } else {
      setInputValue(numericValue);
      handleChange({ ...e, target: { ...e.target, value: numericValue.replace(itemSelected.dialCodeNumber, '') } });
    }
  };

  const handleFocus = () => {
    setFocused(true);
    setValid(true);
  };

  const handleKeyDown = (e) => {
    // Prevent non-numeric input
    if (!/[\d+]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'ArrowLeft' && e.key !== 'ArrowRight' && e.key !== 'Tab') {
      e.preventDefault();
    }
  };

  const whatsappSVG = <svg width="29.2354423px" height="30px" viewBox="0 0 29.2354423 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                    <title>Group</title>
                    <g id="Page-1" stroke="none" strokeWidth="{1}" fill="none" fillRule="evenodd">
                      <g id="Group" fill={(valid || focused) ? "#0154C0" : '#ff3535'} fillRule="nonzero">
                        <path d="M22.5455623,16.8158246 L19.9140613,14.891095 C19.5140021,14.5977182 19.0250407,14.4821455 18.5360794,14.5577123 C18.0471181,14.633279 17.6203882,14.8955401 17.3270114,15.2955993 L16.5135576,16.4113202 C16.5046674,16.4246555 16.4957772,16.4379908 16.4868869,16.4513261 C16.3624241,16.4691065 15.7045488,16.4824418 14.1309824,15.2289228 L13.9620685,15.108905 C12.3173804,14.0154097 12.130686,13.3886502 12.1084605,13.2597422 C12.1173507,13.2464069 12.130686,13.2330716 12.1395762,13.2197363 L12.9530301,12.1040154 C13.553119,11.2816714 13.3753149,10.1214995 12.5485257,9.51696548 L9.86812861,7.56112017 C9.04578456,6.95658616 7.88561268,7.13883538 7.28107868,7.96562454 L6.45873463,9.09468069 C5.66306119,10.188176 5.45414135,11.6239443 5.90309676,12.9352497 C6.55652689,14.8333086 8.19676989,16.8380501 10.79271,18.9005779 C10.8371611,18.9539191 10.8905023,18.9983701 10.9482886,19.0428212 C11.0105201,19.0872722 11.0771966,19.1317232 11.1394281,19.1761742 C11.2016595,19.2250704 11.2638909,19.2695214 11.3261224,19.3184175 C11.3839087,19.3628686 11.4461402,19.3984294 11.5083716,19.4251 C14.2643355,21.2653726 16.6735813,22.2210698 18.6827678,22.2610757 C18.7094384,22.2610757 18.7405542,22.2610757 18.7672248,22.2610757 C20.0785302,22.2610757 21.3320492,21.6165358 22.1232775,20.5274856 L22.9456216,19.3984294 C23.2389984,18.9983701 23.354571,18.5094088 23.2790043,18.0204475 C23.2078826,17.5359312 22.9456216,17.1047563 22.5455623,16.8158246 Z M21.5142984,18.3538302 L20.6919544,19.4828864 C20.2207734,20.1274263 19.4651059,20.4963698 18.7227737,20.4830345 C17.5225959,20.4563639 15.4245073,19.9585124 12.1973626,17.740406 C9.0991258,15.3400504 7.98340495,13.4953326 7.59223589,12.3618314 C7.33441991,11.610609 7.44999259,10.7615943 7.89894799,10.1481701 L8.72129204,9.01911394 C8.74351756,8.98799822 8.78796859,8.97910802 8.82352941,9.00133353 L11.5039265,10.9571788 C11.5350422,10.9794044 11.5439324,11.0283005 11.5217069,11.0594162 L10.7438139,12.1217958 C10.5082234,12.3796118 10.2993036,12.8152319 10.3348644,13.3708698 C10.4059861,14.3976885 11.268336,15.451178 12.948585,16.5668988 L13.0508223,16.6424656 C14.6555045,17.9226552 15.9223589,18.4249518 16.922507,18.1804712 C17.4603645,18.0471181 17.8115276,17.7137354 17.9848866,17.4114684 L18.7627797,16.3490888 C18.7850052,16.3224181 18.8383464,16.3135279 18.865017,16.3313083 L21.5009631,18.2560379 C21.5276337,18.2693732 21.5320788,18.3227145 21.5142984,18.3538302 Z" id="Shape" />
                        <path d="M14.6199437,0 C6.560972,0 0,6.55652689 0,14.6199437 C0,18.0160024 1.17795229,21.2875982 3.32493703,23.9013187 L0.857904875,28.706475 C0.693436065,29.0220773 0.737887094,29.4043562 0.964587346,29.6799526 C1.13794636,29.8844273 1.38687213,30 1.6491332,30 C1.73359016,30 1.81804712,29.9866647 1.90250407,29.9644392 L8.63683509,27.9641428 C10.5215587,28.8131575 12.5307453,29.2398874 14.6154986,29.2398874 C22.6744703,29.2398874 29.2354423,22.6833605 29.2354423,14.6199437 C29.2354423,6.55652689 22.6789154,0 14.6199437,0 Z M14.6199437,27.4574011 C12.6863239,27.4574011 10.8238258,27.0395614 9.09468069,26.2083272 C8.89465106,26.11498 8.66795081,26.0971996 8.45903097,26.159431 L3.39605868,27.6663209 L5.18299007,24.1813602 C5.35190399,23.8524226 5.29856275,23.4568084 5.05408209,23.181212 C2.94265817,20.8253075 1.77804119,17.7804119 1.77804119,14.6199437 C1.77804119,7.53889465 7.53889465,1.77804119 14.6199437,1.77804119 C21.7009927,1.77804119 27.4574011,7.53889465 27.4574011,14.6199437 C27.4574011,21.7009927 21.7009927,27.4574011 14.6199437,27.4574011 Z" id="Shape" />
                      </g>
                    </g>
                  </svg>

  const voidFunction = () => {
    return null;
  };

  return (
<div className={`FieldWrapper TextField ${focused ? 'focused' : ''} ${valid ? 'field-valid' : (focused ? '' : 'field-error')} fade-animation fade-slow-enter-done`}>
	<div className={`FieldView DaisyFieldView field-default SelectField VEH_USA_KILOM ${focused ? 'focused' : ''}`} style={isPartOfInputGroup && { margin: 0 }}> {!isPartOfInputGroup && (
		<>
			<div className="FieldView-flex-container">
				<label className="Label">{title}</label>
			</div>
			<div className="Tip"> {tip?.length > 0 &&
				<div>{tip}</div>} </div>
			</> )}
			<div className="app-row app-field">
				<div className="app-col-xs-12 app-col-sm-8 app-col-md-8 Field ignore-outside-click" style={{ display: 'flex' }} ref={newRef}>
					<div className={`Select select-phone-whatsapp isBordered VEH_USA_KILOM icon-lesfurets after icon-system-arrow-more field-${itemSelected.validated ? "valid" : "default"} ${collapseOption ? "arrowNotToggled up" : "focused arrowToggled up"}`} style={{ width: '30%', marginRight: '5%', padding: '0 10px' }}>
						{/* <div className="Select-text" style={{ color: itemSelected.validated ? '#0154c0' : '#4e6174', fontSize: '15px', padding: '0 0 0 30px', margin: '10px 0 -10px 0', display: isPartOfInputGroup ? 'none' : 'none' }}> {inputGroupBlockTitle} </div> */}
						<div className="Select-text phone-padding" tabIndex={8} onClick={toggleDropdown}> <span className="Select-text-placeholder">{itemSelected.flag || 'none'}</span> </div> {!collapseOption && (
						<>
							<div className="Select-separator up" />
							<div className="slide-animation slide-fast-enter-done">
								<div className="Select-elements List-elements not-empty up"> {COUNTRY_CODES.map((item) => (
									<div key={item.code} 
                    className={`Select-element List-element icon-lesfurets icon-arrow-right after SuggestionLabel ${itemSelected.dialCode===item.dialCode ? "selected" : ""}`}
                     onClick={()=> updateSelected(item)} style={{ padding: '20px', display: 'flex', flexDirection: 'row', alignItems: 'center' }} > 
                              {getCountryFlag({ countryCode: item.code })}
                              <span>{item.dialCode}</span>
                            </div> ))} 
                    </div>
							</div>
							</> )} </div>
					<div className={`Input textField ${focused ? 'focused' : ''} ${valid ? 'field-valid' : (focused ? '' : 'field-error')}`} style={{ width: '70%' }}>
						<input id={id ? id : 'phone'} type="tel" autoComplete="on" name="phone" maxLength={inputLength} value={inputValue} onChange={handleInputChange} onFocus={handleFocus} onKeyDown={handleKeyDown} placeholder={inputGroupBlockTitle ? inputGroupBlockTitle : 'Entrez le texte ici'} /> 
                {type && ( <span className="Input-symbol" style={{ paddingLeft: 0 }}>
                  <span className="Icon icon-lesfurets icon-system-mail">
                    {whatsappSVG}
                  </span> </span> )} </div>
				</div>
			</div>
      {/* <h2>{'Input= '+valid+' === '+focused}</h2> */}

       {(!valid && !focused) && (
			<div className="Error"> <span className="Icon error-icon icon-lesfurets icon-system-alert" /> Veuillez entrer un numéro whatsapp valide. </div> )} {showContinueBtn &&
			<ButtonLarge name="Continuer" handleContinue={valid ? handleContinue : voidFunction} uniqueId={`${id}-continue-btn`}/>} </div>
</div>
  );
};

export default SETextInputPhone;
