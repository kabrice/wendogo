import { useState, useEffect } from 'react'; 
import helper from '../../utils/Helper';
import SELabel from '../../components/SimulationEngine/SELabel';
import SETextArea from '../../components/SimulationEngine/SETextArea';
import SETextInput from '../../components/SimulationEngine/SETextInput';
import ButtonLarge from '../../components/ButtonLarge';
import { parsePhoneNumberWithError } from 'libphonenumber-js';
import useGeoLocation from "react-ipgeolocation" 
import SETextInputPhone from '../../components/SimulationEngine/SETextInputPhone'; 
import FormSuccess from './FormSuccess';
import { useUpdateCreateUserMutation } from '../../store/apis/userApi';
import { useRef } from 'react';
import { activateSpinner, deactivateSpinner } from '../../redux/spinnerslice';
import { setUser } from '../../redux/userSlice';
import { useDispatch, useSelector } from 'react-redux'
import { Loader2 } from "lucide-react";

const KeepInTouch = (props) => {
    const user = useSelector((state) => state.user);
    const { title, tip, setIsError, setIsKeepInTouch, typeRequest } = props;
    const dispatch = useDispatch();
    const location = useGeoLocation();
    const isInitialized = useRef(false);

    // Core states
    const [isLoading, setIsLoading] = useState(true);
    //const user = useSelector((state) => state.user);
    const [deviceType, setDeviceType] = useState('lg');
    const [browserWidth, setBrowserWidth] = useState(
        typeof window !== 'undefined' ? window.innerWidth : 1200
    );

    // Form states
    const [countryIso2, setCountryIso2] = useState(null);
    const [isLoadingCountry, setIsLoadingCountry] = useState(true);
    const [situationDescription, setSituationDescription] = useState('');
    const [validSituationDescription, setValidSituationDescription] = useState(false);
    const [firstname, setFirstname] = useState('');
    const [validFirstName, setValidFirstName] = useState(false);
    const [lastname, setLastname] = useState('');
    const [validLastname, setValidLastname] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [phoneNumberFormatted, setPhoneNumberFormatted] = useState({ name: '', validated: false });
    const [validPhone, setValidPhone] = useState(false);
    const [isDataSent, setIsDataSent] = useState(false);
    const [errorMessageSituationDescription, setErrorMessageSituationDescription] = useState('');

    // API hooks
    const [updateCreateUser] = useUpdateCreateUserMutation();

    useEffect(() => {
        const initializeData = () => { 
            if (!user) return false;

            //

            // Initialize form data from user
            let description = '';
            if (typeRequest === 'FLIGHT') description = user?.situationDescription;
            else if (typeRequest === 'VISA_CANDA') description = user?.visaCanadaDescription;
            else if (typeRequest === 'TOURISM') description = user?.tourismDescription;
            else if (typeRequest === 'FAMILY') description = user?.familyDescription;

            setSituationDescription(description || '');
            setFirstname(user?.firstname || '');
            setLastname(user?.lastname !== 'guest' ? user?.lastname : '' || '');
            setPhoneNumber(user?.phoneNumberFormatted?.name || '');
            setPhoneNumberFormatted(user?.phoneNumberFormatted || { name: '', validated: false });
            setCountryIso2(user?.country || null);

            return true;
        };

        const success = initializeData();
        setIsLoading(!success);
    }, [typeRequest]);
    
    useEffect(() => {
        // Only run country detection if not initialized
        if (!isInitialized.current) {
            const getCountry = async () => {
                try {
                    // Set initial loading state
                    setIsLoadingCountry(true);

                    // Priority chain for country detection
                    if (user?.country) {
                        setCountryIso2(user.country);
                    } else if (!location.isLoading && location.country) {
                        setCountryIso2(location.country);
                    } else {
                        try {
                            const response = await fetch('https://ipinfo.io/json?token=3089ed2a513bd9');
                            const data = await response.json();
                            if (data.country) {
                                setCountryIso2(data.country);
                            }
                        } catch (error) {
                            console.warn('Failed to get country from IP:', error);
                            // Fallback to CM is already handled by initial state
                        }
                    }
                } catch (error) {
                    console.error('Error in country detection:', error);
                    // Keep CM as fallback
                } finally {
                    setIsLoadingCountry(false);
                    isInitialized.current = true;
                }
            };

            getCountry();
        }
    }, [location.isLoading, location.country, user?.country]);

    useEffect(() => {
        //helper.addOutsideClick(handleOutsideClick)
        
        setValidSituationDescription(validateSituationDescription()); 
        const handleResize = () => {
            const browserWidth = window.innerWidth;
            //console.log('browserWidth', browserWidth)
            if (browserWidth>1200) {
                setDeviceType('lg'); 
            }
            if (browserWidth>991 && browserWidth <= 1200) {
                setDeviceType('md'); 
            } 
            if (browserWidth>765 && browserWidth <= 990) {
                setDeviceType('sm');
            }  
            if (browserWidth <= 764) {
                setDeviceType('xs');
            } 
        };
        
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };


    }, [browserWidth, situationDescription]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[200px]">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    const handleChangeSituationDescription = (e) => {
        setSituationDescription(e.target.value);
    }
 
    
    const validateSituationDescription = () => {
        const rules = [
            { 
                // Updated regex with proper escaping and all French characters
                regex: /^[a-zA-ZÀ-ÿœŒàáâãäåçèéêëìíîïðòóôõöùúûüýÿ0-9\s,'.;'''’\-«»""„‹›]+$/,
                error: "Seules les lettres, les chiffres et les espaces sont autorisés." 
            },
            { 
                regex: /^.{10,2500}$/,
                error: "Le contenu doit être compris entre 10 et 2500 caractères." 
            },
            { 
                regex: /^(?!.*[^\S\n]{2,}).*$/,
                error: "Aucun espace consécutif n'est autorisé." 
            },
        ];
    
        // If empty or only whitespace
        if (!situationDescription?.trim()) {
            setErrorMessageSituationDescription("Le contenu ne peut pas être vide.");
            return false;
        }
    
        const trimmedDescription = situationDescription.trim();
        const normalizedText = trimmedDescription.normalize('NFKC');
    
        // Debug logging
        console.log('Normalized text:', normalizedText);
        
        // Test each character against the allowed set
        const invalidChars = [...normalizedText].filter(char => 
            !/[a-zA-ZÀ-ÿœŒàáâãäåçèéêëìíîïðòóôõöùúûüýÿ0-9\s,'.;'''\-«»""„‹›]/.test(char)
        );
        if (invalidChars.length > 0) {
            console.log('Invalid characters found:', invalidChars);
        }
    
        return rules.every(rule => {
            const isValid = rule.regex.test(normalizedText);
            if (!isValid) {
                setErrorMessageSituationDescription(rule.error);
                console.log('Failed rule:', rule.regex);
            }
            return isValid;
        });
    };
 

    const handleChangeFirstname = (e) => {
        const firstname = e.target.value;
        setFirstname(firstname); 
    }

    const doesValidName = (name) => {
        return name !== undefined && name.trim().length >= 3 && /[a-zA-Z].*[a-zA-Z]/.test(name);
      }

    const doesValidFistname = () => { 
        return doesValidName(firstname);
    } 
 

    const handleChangeLastname = (e) => {
        setLastname(e.target.value);
    }

    const doesValidLastname = () => {
        return doesValidName(lastname);
    } 
 
    const doesValidPhone = (phoneNumber) => {
        console.log('phoneNumber', phoneNumber)
        if (phoneNumber.trim() === '') {
            return false; // Consider empty input as valid
        }

        try { 
            const phoneNumberObj = parsePhoneNumberWithError(phoneNumber, countryIso2);
            console.log('phoneNumberObj keep in touch',countryIso2, phoneNumberObj, phoneNumberObj.isValid());
            let phoneNumberFormatted = {name: phoneNumberObj.number, validated: phoneNumberObj.isValid()};
            setPhoneNumberFormatted(phoneNumberFormatted);
            //setValid(phoneNumberObj.isValid());
            return phoneNumberObj.isValid();
        } catch (error) {
            console.error('Error validating phone number:', error);
            return false;
        }
    }

    const handleChangePhone = (e) => {
        const phoneNumber = e.target.value;
        setPhoneNumber(phoneNumber);
        setValidPhone(doesValidPhone(phoneNumber));
        console.log('phoneNumber', phoneNumber, phoneNumberFormatted); 
    };
  
    const handleContinue = async () => {
        // Validation checks
        const isValid = {
            description: validateSituationDescription(),
            firstname: doesValidFistname(),
            lastname: doesValidLastname(),
            phone: doesValidPhone(phoneNumber)
        };
    
        const allFieldsValid = Object.values(isValid).every(Boolean);
        console.log('allFieldsValid', validateSituationDescription(), doesValidFistname(), doesValidLastname(), doesValidPhone(phoneNumber), phoneNumber);
        if (!allFieldsValid) {
            //setIsError(true);
            return;
        }
    
        // Prepare user data
        const user = {
            userId: user?.userId,
            firstname,
            lastname,
            typeRequest,
            phone: phoneNumberFormatted.name,
            situationDescription,
            countryIso2: countryIso2
        };
        //console.log('user', user);
        try {
            dispatch(activateSpinner());
    
            // Update/Create user
            const response = await updateCreateUser(user).unwrap();
            console.log('User updated/created successfully:', response);
    
            // Update local storage
            const updatedUser = {
                ...user,
                userId: response.id,
                firstname,
                lastname,
                phone: phoneNumberFormatted.name,
                country: countryIso2,
                phoneNumberFormatted,
                date: new Date().toISOString()
            };

            
            if (typeRequest === 'FLIGHT') {
                updatedUser.situationDescription = situationDescription;
            } else if (typeRequest === 'VISA_CANDA') {
                updatedUser.visaCanadaDescription = situationDescription;
            } else if (typeRequest === 'TOURISM') {
                updatedUser.tourismDescription = situationDescription;
            } else if (typeRequest === 'FAMILY') {
                updatedUser.familyDescription = situationDescription;
            }
            dispatch(setUser(updatedUser));
            helper.setLocalStorageWithExpiration('wendogouser', updatedUser);
            setIsDataSent(true);
    
        } catch (error) {
            console.error('Failed to update/create user:', error);
            setIsError(true);
        } finally {
            dispatch(deactivateSpinner());
        }
    };
 

    return ( <>
{/* <FormSuccess/> */}
<div className="theme-wrapper theme-daisy">
	<div className="funnel AutoTunnel">
		<div className="app-container">
			<div className={ "app-"+deviceType}>
				<div className="FunnelView DaisyFormView">
					<div id="scr_vehicule" className="ScreenView DaisyScreenView SCR_VEHICULE">
						<div id="blk_ma_demande" className="BlockView DaisyBlockView block-doing BLK_MA_DEMANDE block-doing block-active hasFunnelSideBar">
							<div className="BlockView-container DaisyBlockView-container" style={{margin: 'auto', paddingTop:60}}>
								<div className="css-4x6az7 eu4oa1w0">
									<div className="css-kr67x6 eu4oa1w0"> <a title='Retour' role="link" aria-label="Retour" data-tn-element="back-btn" data-tn-variant="element" data-tn-action-click="true" className="css-101rujo e8ju0x50" onClick={()=> setIsKeepInTouch(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" focusable="false" role="img" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" className="css-1f4rn1b eac13zx0">
                            <path d="M20.8957 11.897c0-.5523-.4477-1-1-1H6.5173l3.245-3.245c.3906-.3906.3906-1.0238 0-1.4143-.3905-.3905-1.0237-.3905-1.4142 0l-4.9517 4.9517a.9958.9958 0 00-.2868.5964.9982.9982 0 00.2868.818l4.9515 4.9515c.3905.3905 1.0237.3905 1.4142 0 .3905-.3906.3905-1.0237 0-1.4143l-3.244-3.244h13.3776c.5523 0 1-.4477 1-1z" />
                        </svg>  
                    </a> </div>
								</div>
                                {
                                    isDataSent ? <FormSuccess/> :
                                <>
                                <SELabel title={title} tip={tip}/>
                                <SETextInput inputGroupBlockTitle="Quel est votre prénom ?" 
                                        id={"FIRSTNAME_KIT_"+typeRequest} autoComplete="on" 
                                        isPartOfInputGroup={true}
                                        handleChange={handleChangeFirstname} 
                                        value={firstname} inputLength={64} 
                                        valid={validFirstName} 
                                        setValid={setValidFirstName} onClickOutside={doesValidFistname}
                                        showContinueBtn={false}/>
                                <SETextInput 
                                    inputGroupBlockTitle="Quel est votre nom ?"
                                    id={"LASTNAME_KIT_"+typeRequest} autoComplete="on" 
                                    isPartOfInputGroup={true}
                                    handleChange={handleChangeLastname} 
                                    value={lastname} inputLength={64} 
                                    valid={validLastname} 
                                    setValid={setValidLastname} 
                                    onClickOutside={doesValidLastname}
                                    showContinueBtn={false}/> 
                            {countryIso2 && <SETextInputPhone 
                                                setCountryIso2={setCountryIso2}
                                                autoComplete="on"
                                                id={"WHATSAPP_NUMBER_KIT_"+typeRequest}
                                                type="whatsapp"
                                                isPartOfInputGroup={true}
                                                inputGroupBlockTitle="Téléphone WhatsApp"
                                                handleChange={handleChangePhone}
                                                value={phoneNumber}
                                                onClickOutside={doesValidPhone}
                                                inputLength={15} // Adjust according to your needs
                                                valid={validPhone} 
                                                setValid={setValidPhone}  
                                                countryCodeName={countryIso2}/>  }
                                <SETextArea
                                    placeholderText="Décrivez brièvement votre demande ou votre situation"
                                    id={"SITUATION_DESCRIPTION_KIT_"+typeRequest}
                                    isPartOfInputGroup={true}
                                    value={situationDescription}
                                    valid={validSituationDescription}
                                    setValid={setValidSituationDescription}
                                    errorMessage={errorMessageSituationDescription}
                                    onClickOutside={validateSituationDescription}
                                    maxLength={2500} 
                                    handleChange={handleChangeSituationDescription}/>   
                    
                                <div className="FieldView DaisyFieldView field-default SelectField VEH_USA_KILOM" style={{ margin: 0 }}>
                                    <ButtonLarge name="Valider" handleContinue={handleContinue}/>
                                </div>
                                </>}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div></>
    );
};

export default KeepInTouch;
