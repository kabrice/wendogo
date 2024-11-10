import { useState, useEffect, useRef} from 'react';
import { useGetSchoolYearsQuery } from '../../store/apis/schoolYearApi';
import { activateSpinner, deactivateSpinner } from '../../redux/spinnerslice'
import { activateErrorPage, deactivateErrorPage } from '../../redux/errorPageSlice';
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
    const isInUniversityGlobal = useSelector((state) => state.university.active)

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
            console.error('🛑 error', error)
            dispatch(deactivateSpinner()) 
            dispatch(activateErrorPage())
        }
        if (data) {
            dispatch(deactivateSpinner())
            dispatch(deactivateErrorPage())
            let clonedData = _.cloneDeep(data); // Clone the data to avoid mutation
    
            if (user?.selectedSchoolYear2 && user?.selectedSchoolYear2 !== null) {
                // If selectedSchoolYear2 exists and is not null
                clonedData = _.dropRightWhile(clonedData, (item) => parseInt(item.name, 10) >= parseInt(user?.selectedSchoolYear2.name, 10)); // Compare using the year in `name`
            } else if (!user?.selectedSchoolYear2 && user?.selectedSchoolYear3 && user?.selectedSchoolYear3 !== null) {
                // If selectedSchoolYear2 is null but selectedSchoolYear3 exists and is not null
                const yearBeforeSelected3 = (parseInt(user?.selectedSchoolYear3.name, 10) - 2).toString(); // Get the year before selectedSchoolYear3
                clonedData = _.filter(clonedData, (item) => parseInt(item.name, 10) <= parseInt(yearBeforeSelected3, 10)); // Keep only the years up to (selectedSchoolYear3 - 1)
            } 
        
            setSchoolYears1(clonedData.reverse()); // Set the filtered school years
                // If selectedSchoolYear1 is not set, set it to the most recent year from clonedData
            if (!user?.selectedSchoolYear1 && clonedData.length > 0) {
                const mostRecentYear = _.maxBy(clonedData, (item) => parseInt(item.name, 10)); // Get the most recent year
                setSelectedSchoolYear1({ ...mostRecentYear, validated: false }); // Set selectedSchoolYear1 with the most recent year
            }
    
            setSchoolYears1(clonedData);
        }

        helper.addOutsideClick(handleOutsideClick)


    }, [data, isLoading, error]);
    

    const handleContinue = () => {
        updateWendogouser(SIMULATION_ENGINE_STEPS.ACADEMIC_YEAR_HEAD_DETAILS1, {...selectedSchoolYear1, validated: true})
    }

    const updateWendogouser = (simulationStep, selectedSchoolYear1) => {
        dispatch(setStep(simulationStep)) 
        let updatedUser = {...user, simulationStep, selectedSchoolYear1, date: new Date().toISOString()}
        helper.setLocalStorageWithExpiration('wendogouser', updatedUser)         
    }

  return (
         <SEDropDownList title={`Votre ${helper.updateBAC(isInUniversityGlobal, user, 2)} correspond à quelle année scolaire ?`} newRef={newRef} collapseOption={collapseYearOption} fieldDefault={fieldDefault} items={schoolYears1} 
                         itemSelected={selectedSchoolYear1} toggleDropdown={toggleYearDropdown} updateSelected={updateSelectedYear}
                         handleContinue={handleContinue} showContinueBtn={simulationStepGlobal === SIMULATION_ENGINE_STEPS.SCHOOL_YEAR1}
                          />    
  );
}

export default SchoolYear1;
