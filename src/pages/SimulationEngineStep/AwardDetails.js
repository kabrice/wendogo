'use client';

import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCountriesQuery } from '../../store/apis/userApi'; 
import { activateSpinner, deactivateSpinner } from '../../redux/spinnerslice';
import { activateErrorPage, deactivateErrorPage } from '../../redux/errorPageSlice';
import { setStep } from '../../redux/simulationStepSlice';
import helper from '../../utils/Helper';
import SELabel from '../../components/SimulationEngine/SELabel';
import SEDropDownList from '../../components/SimulationEngine/SEDropDownList'; 
import ButtonLarge from '../../components/ButtonLarge'; 
import SETextInput from '../../components/SimulationEngine/SETextInput';
import { SIMULATION_ENGINE_STEPS } from '../../utils/Constants';  
import SETextArea from '../../components/SimulationEngine/SETextArea';
import _ from 'lodash';
import { Loader2 } from "lucide-react";
import { setUser } from '../../redux/userSlice';


const honourTypes = [
    { id: 1, name: 'None', validated: false },
    { id: 2, name: 'Mention très bien', validated: false },
    { id: 3, name: 'Mention bien', validated: false },
    { id: 4, name: 'Mention assez bien', validated: false }
];
const AwardDetails = ({ spokenLanguages, schoolYears, isErrorPage }) => {

    const [isLoading, setIsLoading] = useState(true);
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const simulationStepGlobal = useSelector((state) => state.simulationStep);

    // State variables
    const [countries, setCountries] = useState(null);
    const [cities, setCities] = useState(null);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);
    const [selectedSpokenLanguage, setSelectedSpokenLanguage] = useState(null);
    const [selectedHonourType, setSelectedHonourType] = useState(null);
    const [selectedAwardYear, setSelectedAwardYear] = useState(null);
    const [awardName, setAwardName] = useState('');
    const [rankValue, setRankValue] = useState('');
    const [award, setAward] = useState(null);

    // Collapse states
    const [collapseCountryOption, setCollapseCountryOption] = useState(true);
    const [collapseCityOption, setCollapseCityOption] = useState(true);
    const [collapseSpokenLanguageOption, setCollapseSpokenLanguageOption] = useState(true);
    const [collapseHonourTypeOption, setCollapseHonourTypeOption] = useState(true);
    const [collapseAwardYearOption, setCollapseAwardYearOption] = useState(true);

    // Validation states
    const [validAwardName, setValidAwardName] = useState(true);
    const [validRank, setValidRank] = useState(true);

    // Refs
    const newRefCountry = useRef(null);
    const newRefCity = useRef(null);
    const newRefSpokenLanguage = useRef(null);
    const newRefAwardYear = useRef(null);
    const newRefHonourType = useRef(null);

    // Query
    const { data, error, isLoading: isCountriesLoading } = useCountriesQuery(selectedCountry?.iso2);

    useEffect(() => {
        const loadUserData = () => {
            
            if (user) {
                
                
                // Initialize states from user
                setSelectedCountry(user?.academicYearHeadDetails3?.country || user?.award?.country || user?.selectedCountry || { name: '', validated: false });
                setSelectedCity(user?.academicYearHeadDetails3?.city || user?.award?.city || { name: '', validated: false });
                setSelectedSpokenLanguage(user?.academicYearHeadDetails3?.spokenLanguage || user?.award?.spokenLanguage || { name: '', validated: false });
                setSelectedHonourType(user?.award?.honourType || { id: 1, name: 'None', validated: false });
                setAwardName(user?.award?.awardName || '');
                setRankValue(user?.award?.rank || '');
                setAward(user?.award || {});

                // Initialize award year
                if (user?.selectedSchoolYear3?.name) {
                    const initialAwardYear = {
                        name: (user.selectedSchoolYear3.name - 2).toString(),
                        validated: false
                    };
                    setSelectedAwardYear(user?.award?.year || initialAwardYear);
                }
            }
            setIsLoading(false);
        };

        loadUserData();
    }, []);

    // Queries 
    //const { data, error, isLoading } = useCountriesQuery(selectedCountry.iso2); 
    const awardYears = schoolYears;

    useEffect(() => {
        if (isCountriesLoading) {
            dispatch(activateSpinner());
        }

        if (error || isErrorPage) {
            dispatch(deactivateSpinner());
            dispatch(activateErrorPage());
        }

        if (data) {
            dispatch(deactivateSpinner());
            dispatch(deactivateErrorPage());
            
            const sortedCountries = [...data.countries].sort((a, b) => a.name.localeCompare(b.name));
            const sortedCities = [...data.cities_new].sort((a, b) => a.name.localeCompare(b.name));
            
            setCountries(sortedCountries);
            setCities(sortedCities);

            // Set default city if needed
            if (!selectedCity?.validated) {
                const defaultCity = sortedCities.find(city => city.default);
                if (defaultCity) {
                    setSelectedCity(defaultCity);
                }
            }
        }

        // Set spoken language based on country
        if (spokenLanguages && selectedCountry?.most_popular_spoken_language_id) {
            const countryLanguage = spokenLanguages.find(
                lang => lang.id === selectedCountry.most_popular_spoken_language_id
            );
            if (countryLanguage) {
                setSelectedSpokenLanguage({
                    name: countryLanguage.name,
                    id: countryLanguage.id
                });
            }
        }

        // Set initial award year if available
        if (isLoading || !awardYears || !user?.selectedSchoolYear3?.name) return;

        const selectedAwardYearInit = awardYears.find(
            year => year.name === (user.selectedSchoolYear3.name - 2).toString()
        );
        if (selectedAwardYearInit && !selectedAwardYear?.validated) {
            setSelectedAwardYear({ ...selectedAwardYearInit, validated: true });
            // Only set the state here, avoid calling updateSelectedAwardYear directly
            setAward(prev => ({ ...prev, year: { ...selectedAwardYearInit, validated: true } }));
        }

        if (spokenLanguages || awardYears) {
            dispatch(deactivateSpinner());
        }
    }, [data, error, isCountriesLoading, spokenLanguages, isErrorPage, awardYears, selectedCountry, user?.selectedSchoolYear3?.name, isLoading]);
    
    const doesAwardNameIsValid = (awardName) => {
        return awardName !== undefined && 
               awardName && 
               awardName.trim().length >= 10 && 
               /[a-zA-Z].*[a-zA-Z]/.test(awardName);
    };
      
    //const [validAwardName, setValidAwardName] = useState(doesAwardNameIsValid(awardName) || awardName === '');

    const doesRankIsValid = () => {
        const rank = parseInt(rankValue, 10);
        return (rankValue === '' || (rankValue !== '' && rank >= 1 && rank <= 1000));
    };
      
    const updateWendogouser = (simulationStep, award) => {
        if (!user) return;

        dispatch(setStep(simulationStep));
        const updatedUser = { 
            ...user, 
            simulationStep, 
            award, 
            date: new Date().toISOString() 
        };
        helper.setLocalStorageWithExpiration('wendogouser', updatedUser);
        dispatch(setUser(updatedUser));
    };
    // Click handlers
    useEffect(() => {
        if (!isLoading) {
            return helper.addOutsideClick(handleOutsideClick);
        }
    }, [isLoading]);    

    const updateSelectedAwardYear = (item) => {
        console.log('updateSelectedAwardYear1', item)
        setSelectedAwardYear({ ...item, validated: true, id: item.id });
        setCollapseAwardYearOption(true);
        setAward(prev => ({ ...prev, year: { ...item, validated: true } }));
        updateWendogouser(SIMULATION_ENGINE_STEPS.AWARD_DETAILS, { ...award, year: { ...item, validated: true } });
    };
    

    const updateSelectedCountry = (item) => {
        setSelectedCountry({ ...item, validated: true });
        setCollapseCountryOption(true);   
        setAward({ ...award, country: { ...item, validated: true } })
                console.log('updateSelectedAwardYear2', award)
        updateWendogouser(SIMULATION_ENGINE_STEPS.AWARD_DETAILS, award)
    };

    const updateSelectedCity = (item) => {
        setSelectedCity({ ...item, validated: true });
        setCollapseCityOption(true);   
        setAward({ ...award, city: { ...item, validated: true } }) 
                console.log('updateSelectedAwardYear3', award)
        updateWendogouser(SIMULATION_ENGINE_STEPS.AWARD_DETAILS, award)
    };

    const updateSelectedSpokenLanguage = (item) => {
        setSelectedSpokenLanguage({ ...item, validated: true });
        setCollapseSpokenLanguageOption(true);  
        //award.spokenLanguage = { ...item, validated: true };
        setAward({ ...award, spokenLanguage: { ...item, validated: true } })
                console.log('updateSelectedAwardYear4', award)
        updateWendogouser(SIMULATION_ENGINE_STEPS.AWARD_DETAILS, award)
    }; 

    const handleChangeAwardName = (e) => {
        const inputValue = e.target.value
        setAwardName(inputValue); 
        //console.log('handleChangeAwardName', award)
        //award.AwardName = inputValue;
        setAward({ ...award, awardName: inputValue })
                console.log('updateSelectedAwardYear5', award)
        updateWendogouser(SIMULATION_ENGINE_STEPS.AWARD_DETAILS, award)
        
    };

    const handleChangeRank = (e) => {
        const inputValue = e.target.value
        setRankValue(inputValue);
        //console.log('handleChangeRank', award)
        //award.rank = inputValue;
        setAward({ ...award, rank: inputValue })
                console.log('updateSelectedAwardYear6', award)
        updateWendogouser(SIMULATION_ENGINE_STEPS.AWARD_DETAILS, award)
    };

    const updateSelectedHonourType = (item) => {
        setSelectedHonourType({ ...item, validated: true });
        setCollapseHonourTypeOption(true);
        //award.honourType = { ...item, validated: true };
        setAward({ ...award, honourType: { ...item, validated: true } })
                console.log('updateSelectedAwardYear7', award)
        updateWendogouser(SIMULATION_ENGINE_STEPS.AWARD_DETAILS, award)
    };

    const handleOutsideClick = (e) => {
        if(newRefAwardYear.current && !newRefAwardYear.current.contains(e.target) && !helper.isTargetContainsIgnoreClass(e.target)){
            setCollapseAwardYearOption(true);
        }
        if (newRefCountry.current && !newRefCountry.current.contains(e.target) && !helper.isTargetContainsIgnoreClass(e.target)) {
            setCollapseCountryOption(true); 
        }
        if (newRefCity.current && !newRefCity.current.contains(e.target) && !helper.isTargetContainsIgnoreClass(e.target)) {
            setCollapseCityOption(true); 
        }
        if (newRefSpokenLanguage.current && !newRefSpokenLanguage.current.contains(e.target) && !helper.isTargetContainsIgnoreClass(e.target)) {
            setCollapseSpokenLanguageOption(true); 
        }
        if (newRefHonourType.current && !newRefHonourType.current.contains(e.target) && !helper.isTargetContainsIgnoreClass(e.target)) {
            setCollapseHonourTypeOption(true); 
        }
    };

    // Toggle functions for dropdowns
    const toggleHonourTypeDropdown = () => setCollapseHonourTypeOption(!collapseHonourTypeOption);
    const toggleSpokenLanguageDropdown = () => setCollapseSpokenLanguageOption(!collapseSpokenLanguageOption);
    const toggleCountryDropdown = () => setCollapseCountryOption(!collapseCountryOption);
    const toggleCityDropdown = () => setCollapseCityOption(!collapseCityOption);
    const toggleAwardYearDropdown = () => setCollapseAwardYearOption(!collapseAwardYearOption);

    const handleContinue = () => {
        const newAward = { ...award, year : selectedAwardYear, country: selectedCountry, city: selectedCity, 
                            spokenLanguage: selectedSpokenLanguage, honourType: selectedHonourType, awardName: awardName, rank: rankValue };
        updateWendogouser(SIMULATION_ENGINE_STEPS.HAS_WORK_EXPERIENCE, newAward)
    } 

    if (isLoading) {
        return <div className="flex items-center justify-center min-h-[200px]">
                    <Loader2 className="w-8 h-8 animate-spin" />
               </div>; 
    }

    if (!user) {
        return <div className="flex items-center justify-center min-h-[200px]">
                    <Loader2 className="w-8 h-8 animate-spin" />
               </div>; 
    }

    const showContinueBtn = simulationStepGlobal === SIMULATION_ENGINE_STEPS.AWARD_DETAILS;
    const voidFunction = () => { return null;}
    return (
        <div style={{margin: '0 0 35px'}}>
            <SELabel title={'Veuillez fournir tous les caractéristiques relatifs à cette distinction.'}  />

            {awardYears && (
                <SEDropDownList
                    newRef={newRefAwardYear}
                    collapseOption={collapseAwardYearOption}
                    items={(_.cloneDeep(awardYears)).reverse()}
                    itemSelected={selectedAwardYear}
                    toggleDropdown={toggleAwardYearDropdown}
                    updateSelected={updateSelectedAwardYear}
                    isPartOfInputGroup={true}
                    inputGroupBlockTitle={`Année d'obtention`}/>
            )}

            {countries && (
                <SEDropDownList
                    newRef={newRefCountry}
                    collapseOption={collapseCountryOption}
                    items={countries}
                    itemSelected={selectedCountry}
                    toggleDropdown={toggleCountryDropdown}
                    updateSelected={updateSelectedCountry}
                    isPartOfInputGroup={true}
                    inputGroupBlockTitle={`Dans quel pays avez-vous reçu ce prix ?`}/>
            )}

            {cities && (
                <SEDropDownList
                    newRef={newRefCity}
                    collapseOption={collapseCityOption}
                    items={cities}
                    itemSelected={selectedCity}
                    toggleDropdown={toggleCityDropdown}
                    updateSelected={updateSelectedCity}
                    isPartOfInputGroup={true}
                    inputGroupBlockTitle={`Dans quelle ville avez-vous reçu ce prix ?`}/>
            )}
            {spokenLanguages && (
                <SEDropDownList
                    newRef={newRefSpokenLanguage}
                    collapseOption={collapseSpokenLanguageOption}
                    items={spokenLanguages}
                    itemSelected={selectedSpokenLanguage}
                    toggleDropdown={toggleSpokenLanguageDropdown}
                    updateSelected={updateSelectedSpokenLanguage}
                    isPartOfInputGroup={true}
                    inputGroupBlockTitle={`Langue appliquée`}/>
            )}
            <SEDropDownList
                    newRef={newRefHonourType}
                    collapseOption={collapseHonourTypeOption}
                    items={honourTypes}
                    itemSelected={selectedHonourType}
                    toggleDropdown={toggleHonourTypeDropdown}
                    updateSelected={updateSelectedHonourType}
                    isPartOfInputGroup={true}
                    inputGroupBlockTitle={`Mention attribuée, si applicable`}/>

            <SETextArea
                placeholderText="Veuillez indiquer la dénomination officielle de cette distinction."
                id="AWARD_NAME"
                isPartOfInputGroup={true}
                value={awardName}
                valid={validAwardName} 
                setValid={setValidAwardName}
                onClickOutside={doesAwardNameIsValid}
                //doesValueValid={doesAwardNameIsValid}
                handleChange={handleChangeAwardName}/>
    
            <SETextInput 
                handleChange={handleChangeRank} 
                autoComplete="on"
                type="number"
                id="RANK"
                value={rankValue} 
                valid={validRank}
                setValid={setValidRank}
                doesValueValid={doesRankIsValid}
                inputLength={255} 
                isPartOfInputGroup={true}
                inputGroupBlockTitle={`Saisissez votre classement, si applicable.`}/>

            {/* {showError && <SESmallAlertMessage type="error" content="Vous n'avez saisi aucune valeur." />} */}
            {showContinueBtn &&            
                                <div className="FieldView DaisyFieldView field-default SelectField VEH_USA_KILOM" style={{ margin: 0 }}>
                                    <ButtonLarge name="Continuer" handleContinue={(validRank && validAwardName) ? handleContinue : voidFunction} uniqueId={`Award-continue-btn`}/>
                                </div>}

        </div>
    );
};

export default AwardDetails;
