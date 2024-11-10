import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCountriesQuery } from '../../store/apis/userApi';
import { useGetSpokenLanguagesQuery } from '../../store/apis/spokenLanguageApi'; 
import { useGetSchoolYearsQuery } from '../../store/apis/schoolYearApi'; 
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

const honourTypes = [
    { id: 1, name: 'None', validated: false },
    { id: 2, name: 'Mention très bien', validated: false },
    { id: 3, name: 'Mention bien', validated: false },
    { id: 4, name: 'Mention assez bien', validated: false }
];

const AwardDetails = () => {

    let user = helper.getLocalStorageWithExpiration('wendogouser');
    const dispatch = useDispatch();

    const [showError, setShowError] = useState(false);
    const simulationStepGlobal = useSelector((state) => state.simulationStep);
    const showContinueBtn = simulationStepGlobal === SIMULATION_ENGINE_STEPS.AWARD_DETAILS;
    
    // State variables
    const [countries, setCountries] = useState(null);
    const [cities, setCities] = useState(null);
    const [selectedCountry, setSelectedCountry] = useState(user?.academicYearHeadDetails3?.country || user?.award?.country || user?.selectedCountry || { name: '',  validated: false });
    const [collapseCountryOption, setCollapseCountryOption] = useState(true);
    const [selectedCity, setSelectedCity] = useState(user?.academicYearHeadDetails3?.city || user?.award?.city || { name: '', validated: false });
    const [collapseCityOption, setCollapseCityOption] = useState(true);  
    const [selectedSpokenLanguage, setSelectedSpokenLanguage] = useState(user?.academicYearHeadDetails3?.spokenLanguage || user?.award?.spokenLanguage || { name: '', validated: false });
    const [selectedHonourType, setSelectedHonourType] = useState(user?.award?.honourType || { id: 1, name: 'None', validated: false });
    const [collapseHonourTypeOption, setCollapseHonourTypeOption] = useState(true);
    const [awardName, setAwardName] = useState(user?.award?.awardName || '');
    const [rankValue, setRankValue] = useState(user?.award?.rank || ''); 
    const [award, setAward] = useState(user?.award || {});
    const [selectedAwardYear, setSelectedAwardYear] = useState(user?.award?.year ||  {name : (user?.selectedSchoolYear3?.name-2).toString(), validated: false});
    const [collapseAwardYearOption, setCollapseAwardYearOption] = useState(true);
    const [collapseSpokenLanguageOption, setCollapseSpokenLanguageOption] = useState(true);

    const newRefCountry = useRef(null);
    const newRefCity = useRef(null);
    const newRefSpokenLanguage = useRef(null);
    const newRefAwardYear = useRef(null);
    const newRefHonourType = useRef(null); 
 
    // Queries 
    const { data, error, isLoading } = useCountriesQuery(selectedCountry.iso2);
    const { data: spokenLanguages, error: spokenLanguagesError, isLoading: spokenLanguagesIsLoading } = useGetSpokenLanguagesQuery();
    const { data: awardYears, error: awardYearsError, isLoading: awardYearsIsLoading } = useGetSchoolYearsQuery(); 

    const doesAwardNameIsValid = (awardName) => {
        return awardName !== undefined && awardName && awardName.trim().length >= 10 && /[a-zA-Z].*[a-zA-Z]/.test(awardName);
    }
      
    const [validAwardName, setValidAwardName] = useState(doesAwardNameIsValid(awardName) || awardName === '');

    const doesRankIsValid = () => {
        const rank = parseInt(rankValue, 10);
        return (rankValue === '' || (rankValue !== '' && rank >= 1 && rank <= 1000));
    }
      
    const [validRank, setValidRank] = useState(doesRankIsValid());

    const updateSelectedAwardYear = (item) => {
        setSelectedAwardYear({ ...item, validated: true });
        setCollapseAwardYearOption(true); 
        setAward({ ...award, year: { ...item, validated: true } })
        updateWendogouser(SIMULATION_ENGINE_STEPS.AWARD_DETAILS, award)
    };

    const updateSelectedCountry = (item) => {
        setSelectedCountry({ ...item, validated: true });
        setCollapseCountryOption(true);   
        setAward({ ...award, country: { ...item, validated: true } })
        updateWendogouser(SIMULATION_ENGINE_STEPS.AWARD_DETAILS, award)
    };

    const updateSelectedCity = (item) => {
        setSelectedCity({ ...item, validated: true });
        setCollapseCityOption(true);   
        setAward({ ...award, city: { ...item, validated: true } }) 
        updateWendogouser(SIMULATION_ENGINE_STEPS.AWARD_DETAILS, award)
    };

    const updateSelectedSpokenLanguage = (item) => {
        setSelectedSpokenLanguage({ ...item, validated: true });
        setCollapseSpokenLanguageOption(true);  
        //award.spokenLanguage = { ...item, validated: true };
        setAward({ ...award, spokenLanguage: { ...item, validated: true } })
        updateWendogouser(SIMULATION_ENGINE_STEPS.AWARD_DETAILS, award)
    }; 

    const handleChangeAwardName = (e) => {
        const inputValue = e.target.value
        setAwardName(inputValue); 
        //console.log('handleChangeAwardName', award)
        //award.AwardName = inputValue;
        setAward({ ...award, awardName: inputValue })
        updateWendogouser(SIMULATION_ENGINE_STEPS.AWARD_DETAILS, award)
        
    };

    const handleChangeRank = (e) => {
        const inputValue = e.target.value
        setRankValue(inputValue);
        //console.log('handleChangeRank', award)
        //award.rank = inputValue;
        setAward({ ...award, rank: inputValue })
        updateWendogouser(SIMULATION_ENGINE_STEPS.AWARD_DETAILS, award)
    };

    const updateSelectedHonourType = (item) => {
        setSelectedHonourType({ ...item, validated: true });
        setCollapseHonourTypeOption(true);
        //award.honourType = { ...item, validated: true };
        setAward({ ...award, honourType: { ...item, validated: true } })
        updateWendogouser(SIMULATION_ENGINE_STEPS.AWARD_DETAILS, award)
    };

    useEffect(() => {
        
        if (isLoading || spokenLanguagesIsLoading || awardYearsIsLoading) {
            dispatch(activateSpinner());
        }

        if (error || spokenLanguagesError || awardYearsError) { 
            console.error('🛑 error', error)
            dispatch(deactivateSpinner()) 
            dispatch(activateErrorPage())
        }
        //console.log('IN AwardDetails useEffect');
        if (data) {
            dispatch(deactivateSpinner()) 
            dispatch(deactivateErrorPage())
            const sortedCountries = data.countries.map((item) => ({ ...item })).sort((a, b) => a.name.localeCompare(b.name));
            setCountries(sortedCountries);
            //console.log('IN sortedCountries useEffect', sortedCountries);
            const sortedCities = data.cities_new.map((item) => ({ ...item })).sort((a, b) => a.name.localeCompare(b.name));
            setCities(sortedCities);
            //console.log('IN sortedCities setSelectedCity', selectedCity.name);
            sortedCities.forEach((item) => {
                if (item.default && !selectedCity.validated) {
                    setSelectedCity(item);
                }
            });
        }
       
        if(spokenLanguages){
            const selectedCountrySpokenLanguage = spokenLanguages.find(language => language.id === selectedCountry.most_popular_spoken_language_id);
            if (selectedCountrySpokenLanguage) {
                setSelectedSpokenLanguage({ name: selectedCountrySpokenLanguage.name, id: selectedCountrySpokenLanguage.id });
            }  
        }
        if(!showContinueBtn){
            helper.addOutsideClick(handleOutsideClick);
            return;
        }

        if (awardYears) {
            const selectedAwardYearInit = awardYears.find(year => year.name === (user.selectedSchoolYear3.name-2).toString());
            setSelectedAwardYear({ ...selectedAwardYearInit, validated: true }); 
            updateSelectedAwardYear(selectedAwardYearInit);
        }


        if (spokenLanguages || awardYears) { 
            dispatch(deactivateSpinner());
        }

        helper.addOutsideClick(handleOutsideClick);

        
    }, [data, error, isLoading, 
        spokenLanguages, spokenLanguagesError, spokenLanguagesIsLoading, 
        awardYears, awardYearsError, awardYearsIsLoading,]);

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


    const updateWendogouser = (simulationStep, award) => {
        dispatch(setStep(simulationStep));
        let updatedUser = { ...user, simulationStep, award, date: new Date().toISOString() };
        helper.setLocalStorageWithExpiration('wendogouser', updatedUser);
    };

    const handleContinue = () => {
        const newAward = { ...award, year : selectedAwardYear, country: selectedCountry, city: selectedCity, 
                            spokenLanguage: selectedSpokenLanguage, honourType: selectedHonourType, awardName: awardName, rank: rankValue };
        updateWendogouser(SIMULATION_ENGINE_STEPS.HAS_WORK_EXPERIENCE, newAward)
    } 

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
                                    <ButtonLarge name="Continuer" handleContinue={(validRank && validAwardName) ? handleContinue : voidFunction}/>
                                </div>}

        </div>
    );
};

export default AwardDetails;
