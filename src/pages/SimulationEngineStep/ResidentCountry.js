import { useState, useEffect, useRef} from 'react';
import { activateSpinner, deactivateSpinner } from '../../redux/spinnerslice'
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
          console.log('outside click ResidentCountry')
        }
    };

    const toggleCountryDropdown= () => {
        setCollapseCountryOption(!collapseCountryOption)
    }
    const updateSelectedCountry = (item) => {
        console.log('item', item)  
        setSelectedCountry({ ...item, id: undefined, validated: true })
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
            console.log('error', error)
            document.location.href='/error'
        }
        if (data) {
            //console.log('country data', data)
            dispatch(deactivateSpinner())
            let clonedCountryArray = [...data]
            clonedCountryArray = clonedCountryArray.map((item) => ({ ...item }));
            const sortedClonedCountryArray = clonedCountryArray.sort((a, b) => a.name.localeCompare(b.name));

            setCountries(sortedClonedCountryArray)
            
            _.forEach(data, (item) => {
                if(item.default === true && !user?.selectedCountry){
                    setSelectedCountry({ ...item, id: undefined });
                    setIsFrancophoneCountry(FRANCOPHONE_COUNTRIES.some(country => country.code_iso2 === item.iso2))
                }
            });
        }

        helper.addOutsideClick(handleOutsideClick)

    }, [data, error, isLoading ])

    const handleContinue = () => {
        updateWendogouser(SIMULATION_ENGINE_STEPS.HIGH_SCHOOL_IN_FRENCH, {...selectedCountry, validated : true}, isFrancophoneCountry)
    }

    const updateWendogouser = (simulationStep, selectedCountry, isFrancophone) => {
        dispatch(setStep(simulationStep)) 
        let updatedUser = {...user, simulationStep, selectedCountry, isFrancophone, isFrancophoneCountry:isFrancophone, date: new Date().toISOString()}
        helper.setLocalStorageWithExpiration('wendogouser', updatedUser, false)         
    }

  return (<>{countries  && 
        <SEDropDownList title="Dans quel pays résidez-vous ?" newRef={newRef} collapseOption={collapseCountryOption} 
                        fieldDefault={fieldDefault} items={countries} itemSelected={selectedCountry} 
                        toggleDropdown={toggleCountryDropdown} updateSelected={updateSelectedCountry} 
                        handleContinue={handleContinue} showContinueBtn={simulationStepGlobal === SIMULATION_ENGINE_STEPS.RESIDENT_COUNTRY}/>}</>
  );
}

export default ResidentCountry;
