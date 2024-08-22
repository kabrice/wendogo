import { useState, useEffect, useRef} from 'react';
import { useGetSchoolYearsQuery } from '../../store/apis/schoolYearApi';
import { activateSpinner, deactivateSpinner } from '../../redux/spinnerslice'
import helper from '../../utils/Helper';
import _ from 'lodash'
import SEDropDownList from '../../components/SimulationEngine/SEDropDownList';
import { useDispatch, useSelector } from 'react-redux'
import {setStep} from '../../redux/simulationStepSlice';
import {SIMULATION_ENGINE_STEPS} from '../../utils/Constants'

const SchoolYear2 = () => {

    let user = helper.getLocalStorageWithExpiration('wendogouser')
    const dispatch = useDispatch()
    const { data, error, isLoading } = useGetSchoolYearsQuery();
    const [schoolYears2, setSchoolYears2] = useState([])
    const [selectedSchoolYear2, setSelectedSchoolYear2] = useState(user?.selectedSchoolYear2 || {name : (user.selectedSchoolYear3.name-1).toString(), validated: false})
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
        setSelectedSchoolYear2({ ...item, validated: true })
        setCollapseYearOption(true)
        setFieldDefault(false)
        updateWendogouser(SIMULATION_ENGINE_STEPS.ACADEMIC_YEAR_HEAD_DETAILS2, {...item, validated: true})
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
            setSchoolYears2(data)
        }

        helper.addOutsideClick(handleOutsideClick)

    }, [data, error, isLoading ])

    const handleContinue = () => {
        updateWendogouser(SIMULATION_ENGINE_STEPS.ACADEMIC_YEAR_HEAD_DETAILS2, {...selectedSchoolYear2, validated: true})
    }

    const updateWendogouser = (simulationStep, selectedSchoolYear2) => {
        dispatch(setStep(simulationStep)) 
        let updatedUser = {...user, simulationStep, selectedSchoolYear2, date: new Date().toISOString()}
        helper.setLocalStorageWithExpiration('wendogouser', updatedUser, false)         
    }

  return (
         <SEDropDownList title={`Votre ${helper.updateBAC(user.universityLevelSelected.name, 1)} correspond à quelle année scolaire ?`} newRef={newRef} collapseOption={collapseYearOption} fieldDefault={fieldDefault} items={schoolYears2} 
                         itemSelected={selectedSchoolYear2} toggleDropdown={toggleYearDropdown} updateSelected={updateSelectedYear}
                         handleContinue={handleContinue} showContinueBtn={simulationStepGlobal === SIMULATION_ENGINE_STEPS.SCHOOL_YEAR2}
                          />    
  );
}

export default SchoolYear2;
