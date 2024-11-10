import { useState, useEffect, useRef} from 'react';
import { useGetNationalitiesQuery } from '../../store/apis/nationalityApi';
import { activateSpinner, deactivateSpinner } from '../../redux/spinnerslice'
import { activateErrorPage, deactivateErrorPage } from '../../redux/errorPageSlice';
import helper from '../../utils/Helper';
import _ from 'lodash'
import SEDropDownList from '../../components/SimulationEngine/SEDropDownList';
import { useDispatch, useSelector } from 'react-redux'
import {setStep} from '../../redux/simulationStepSlice';
import {SIMULATION_ENGINE_STEPS} from '../../utils/Constants'

const Nationality = () => {

    let user = helper.getLocalStorageWithExpiration('wendogouser')

    const dispatch = useDispatch()
    const { data, error, isLoading } = useGetNationalitiesQuery();
    const [nationalities, setNationalities] = useState([])
    const [nationalitySelected, setNationalitySelected] = useState(user?.nationality || {country_id: 38, id: 'nat0038', name: 'Camerounaise', validated: false})
    const newRef = useRef(null)
    const [collapseNationalityOption, setCollapseNationalityOption] = useState(true)
    const [fieldDefault, setFieldDefault] = useState(true)
    const simulationStepGlobal = useSelector((state) => state.simulationStep);

    const handleOutsideClick = (e) => {
        if (newRef.current && !newRef.current.contains(e.target) && !helper.isTargetContainsIgnoreClass(e.target)) {
          setCollapseNationalityOption(true) 
        }
      };

    const toggleNationalityDropdown= () => {
        setCollapseNationalityOption(!collapseNationalityOption)
    }
    const updateSelectedNationality = (item) => {
        console.log('item', item)
        setNationalitySelected({name : item.name, id: item.id, country_id: item.country_id, validated: true})
        setCollapseNationalityOption(true)
        setFieldDefault(false)
        updateWendogouser(SIMULATION_ENGINE_STEPS.DISABLE, {name : item.name, id: item.id, country_id: item.country_id, validated: true})
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
            //console.log('data nationality', data)
            dispatch(deactivateSpinner()) 
            dispatch(deactivateErrorPage())
            let clonedNationalityArray = [...data]
            clonedNationalityArray = clonedNationalityArray.map((item) => ({ ...item }));
            const sortedClonedNationalityArray = clonedNationalityArray.sort((a, b) => a.name.localeCompare(b.name));

            let initialNationality = _.find(sortedClonedNationalityArray, { country_id: user?.selectedCountry?.id });

            if (initialNationality) {
                initialNationality = { ...initialNationality, validated: true };
            } 
            setNationalitySelected(user?.nationality || initialNationality)
            setNationalities(sortedClonedNationalityArray);
        }

        helper.addOutsideClick(handleOutsideClick)

    }, [data, error, isLoading ])

    const handleContinue = () => {
        updateWendogouser(SIMULATION_ENGINE_STEPS.DISABLE, {...nationalitySelected, validated: true})
    }

    const updateWendogouser = (simulationStep, nationality) => {
        dispatch(setStep(simulationStep)) 
        let updatedUser = {...user, simulationStep, nationality, date: new Date().toISOString()}
        helper.setLocalStorageWithExpiration('wendogouser', updatedUser)         
    }

  return (
         <SEDropDownList title="Quelle est votre nationalité ?" 
                         newRef={newRef} collapseOption={collapseNationalityOption} fieldDefault={fieldDefault} items={nationalities} 
                         itemSelected={nationalitySelected} toggleDropdown={toggleNationalityDropdown} updateSelected={updateSelectedNationality} 
                         handleContinue={handleContinue} showContinueBtn={simulationStepGlobal === SIMULATION_ENGINE_STEPS.NATIONALITY}/>  
  );
}

export default Nationality;
