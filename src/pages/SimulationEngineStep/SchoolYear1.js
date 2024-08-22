import { useState, useEffect, useRef} from 'react';
import { useGetSchoolYearsQuery } from '../../store/apis/schoolYearApi';
import { activateSpinner, deactivateSpinner } from '../../redux/spinnerslice'
import helper from '../../utils/Helper';
import _ from 'lodash'
import SEDropDownList from '../../components/SimulationEngine/SEDropDownList';
import { useDispatch, useSelector } from 'react-redux'
import {setStep} from '../../redux/simulationStepSlice';
import {SIMULATION_ENGINE_STEPS} from '../../utils/Constants'

const SchoolYear1 = () => {

    let user = helper.getLocalStorageWithExpiration('wendogouser')
    const dispatch = useDispatch()
    const { data, error, isLoading } = useGetSchoolYearsQuery();
    const [schoolYears1, setSchoolYears1] = useState([])
    const [selectedSchoolYear1, setSelectedSchoolYear1] = useState(user?.selectedSchoolYear1 ||  {name : (user.selectedSchoolYear3.name-2).toString(), validated: false})
    const newRef = useRef(null)
    const [collapseYearOption, setCollapseYearOption] = useState(true)
    const [fieldDefault, setFieldDefault] = useState(true)
    const simulationStepGlobal = useSelector((state) => state.simulationStep);

    const handleOutsideClick = (e) => {
        if (newRef.current && !newRef.current.contains(e.target) && !helper.isTargetContainsIgnoreClass(e.target)) {
          setCollapseYearOption(true) 
        }
      };

    const toggleYearDropdown= () => {
        setCollapseYearOption(!collapseYearOption)
    }
    const updateSelectedYear = (item) => {
        setSelectedSchoolYear1({ ...item, validated: true })
        setCollapseYearOption(true)
        setFieldDefault(false)
        updateWendogouser(SIMULATION_ENGINE_STEPS.ACADEMIC_YEAR_HEAD_DETAILS1, {...item, validated: true})
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
            dispatch(deactivateSpinner())
            setSchoolYears1(data)
        }

        helper.addOutsideClick(handleOutsideClick)

    }, [data, error, isLoading ])

    const handleContinue = () => {
        updateWendogouser(SIMULATION_ENGINE_STEPS.ACADEMIC_YEAR_HEAD_DETAILS1, {...selectedSchoolYear1, validated: true})
    }

    const updateWendogouser = (simulationStep, selectedSchoolYear1) => {
        dispatch(setStep(simulationStep)) 
        let updatedUser = {...user, simulationStep, selectedSchoolYear1, date: new Date().toISOString()}
        helper.setLocalStorageWithExpiration('wendogouser', updatedUser, false)         
    }

  return (
         <SEDropDownList title={`Votre ${helper.updateBAC(user.universityLevelSelected.name, 2)} correspond à quelle année scolaire ?`} newRef={newRef} collapseOption={collapseYearOption} fieldDefault={fieldDefault} items={schoolYears1} 
                         itemSelected={selectedSchoolYear1} toggleDropdown={toggleYearDropdown} updateSelected={updateSelectedYear}
                         handleContinue={handleContinue} showContinueBtn={simulationStepGlobal === SIMULATION_ENGINE_STEPS.SCHOOL_YEAR1}
                          />    
  );
}

export default SchoolYear1;
