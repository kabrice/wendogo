import { useState, useEffect, useRef} from 'react';
import { activateSpinner, deactivateSpinner } from '../../redux/spinnerslice'
import { activateErrorPage, deactivateErrorPage } from '../../redux/errorPageSlice';
import { useGetCountriesQuery } from '../../store/apis/countryApi';
import helper from '../../utils/Helper';
import _ from 'lodash'
import SEDropDownList from '../../components/SimulationEngine/SEDropDownList';
import useGeoLocation from "react-ipgeolocation"
import {FRANCOPHONE_COUNTRIES} from '../../utils/Constants'
import { useDispatch, useSelector } from 'react-redux'
import {setStep} from '../../redux/simulationStepSlice';
import {SIMULATION_ENGINE_STEPS} from '../../utils/Constants'

const ResidentCountry = () => {
    let user = helper.getLocalStorageWithExpiration('wendogouser')

    const location = useGeoLocation();
    const networkCountry = location.country

    const dispatch = useDispatch()
    const { data, error, isLoading } = useGetCountriesQuery(networkCountry);
    const [countries, setCountries] = useState(null)
    //console.log('user', user)
    const [selectedCountry, setSelectedCountry] = useState(user?.selectedCountry || {name : '', validated: false})
    const newRef = useRef(null)
    const [collapseCountryOption, setCollapseCountryOption] = useState(true)
    const [fieldDefault, setFieldDefault] = useState(true)
    const [isFrancophoneCountry, setIsFrancophoneCountry] = useState(user?.isFrancophoneCountry)
    const simulationStepGlobal = useSelector((state) => state.simulationStep);

    const handleOutsideClick = (e) => {
        if (newRef.current && !newRef.current.contains(e.target) && !helper.isTargetContainsIgnoreClass(e.target)) {
          setCollapseCountryOption(true)
          //console.log('Outside click ResidentCountry')
        }
    };

    const toggleCountryDropdown= () => {
        setCollapseCountryOption(!collapseCountryOption)
    }
    const updateSelectedCountry = (item) => {
        console.log('item', item)  
        setSelectedCountry({ ...item,  validated: true })
        setCollapseCountryOption(true)
        setFieldDefault(false)
        let isFrancophoneCountryVal = FRANCOPHONE_COUNTRIES.some(country => country.code_iso2 === item.iso2)

        setIsFrancophoneCountry(isFrancophoneCountryVal)
        updateWendogouser(SIMULATION_ENGINE_STEPS.RESIDENT_COUNTRY, { ...item, validated: true }, isFrancophoneCountryVal)
        console.log('selectedCountry', selectedCountry)
    }

    useEffect(() => {
        if(isLoading){
            dispatch(activateSpinner())
        }
        if(error){
            console.error('🛑 error', error)
            dispatch(deactivateSpinner()) 
            dispatch(activateErrorPage())
        }
        if (data) {
            //console.log('country data', data)
            dispatch(deactivateSpinner())
            dispatch(deactivateErrorPage())
            let clonedCountryArray = [...data]
            clonedCountryArray = clonedCountryArray.map((item) => ({ ...item }));
            const sortedClonedCountryArray = clonedCountryArray.sort((a, b) => a.name.localeCompare(b.name));

            setCountries(sortedClonedCountryArray)
            
            _.forEach(data, (item) => {
                if(item.default === true && !user?.selectedCountry){
                    setSelectedCountry({ ...item });
                    setIsFrancophoneCountry(FRANCOPHONE_COUNTRIES.some(country => country.code_iso2 === item.iso2))
                }
            });
        }

        helper.addOutsideClick(handleOutsideClick)

    }, [data, error, isLoading ])

    const handleContinue = () => {
        console.log('selectedCountry', selectedCountry)
        let nextStep = SIMULATION_ENGINE_STEPS.HIGH_SCHOOL_IN_FRENCH
        let isIneligibleForCampusFrance = false
        if(selectedCountry.iso2 === 'SN' ){
            if( (["bac00005"].includes(user.universityLevelSelected.id) && ["deg00008", "deg00011", "deg00012"].user.degreeSelected.id) || 
                ["bac00004", "bac00007"].includes(user.universityLevelSelected.id)){
            console.log('isIneligibleForCampusFrance', selectedCountry)
                nextStep = SIMULATION_ENGINE_STEPS.CAMPUS_FRANCE_INELIGIBILITY         
                isIneligibleForCampusFrance = true   
            } 
        }
        updateWendogouser(nextStep, {...selectedCountry, validated : true}, isIneligibleForCampusFrance, isFrancophoneCountry)
    }

    const updateWendogouser = (simulationStep, selectedCountry, isIneligibleForCampusFrance, isFrancophone) => {
        dispatch(setStep(simulationStep)) 
        let updatedUser = {...user, simulationStep, selectedCountry, isFrancophone, isIneligibleForCampusFrance, isFrancophoneCountry:isFrancophone, date: new Date().toISOString()}
        helper.setLocalStorageWithExpiration('wendogouser', updatedUser)         
    }

  return (<>{countries  && 
        <SEDropDownList title="Dans quel pays résidez-vous ?" newRef={newRef} collapseOption={collapseCountryOption} 
                        fieldDefault={fieldDefault} items={countries} itemSelected={selectedCountry} 
                        toggleDropdown={toggleCountryDropdown} updateSelected={updateSelectedCountry} 
                        handleContinue={handleContinue} showContinueBtn={simulationStepGlobal === SIMULATION_ENGINE_STEPS.RESIDENT_COUNTRY}/>}</>
  );
}

export default ResidentCountry;
