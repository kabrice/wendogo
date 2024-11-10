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

const SchoolYear3 = () => {

    let user = helper.getLocalStorageWithExpiration('wendogouser')
    const currentYear = new Date().getFullYear();
    const isInUniversityGlobal = useSelector((state) => state.university.active)
    //const isInUniversity = user.hasOwnProperty("schoolLevelSelected") ? (user.schoolLevelSelected === 'Supérieur') : isInUniversityGlobal

    const dispatch = useDispatch()
    const { data, error, isLoading } = useGetSchoolYearsQuery();
    const [schoolYears3, setSchoolYears3] = useState([])
    const [selectedSchoolYear3, setSelectedSchoolYear3] = useState(user?.selectedSchoolYear3 || {name : currentYear.toString(), validated: false})
    const newRef = useRef(null)
    const [collapseYearOption, setCollapseYearOption] = useState(true)
    const [fieldDefault, setFieldDefault] = useState(true)
    const simulationStepGlobal = useSelector((state) => state.simulationStep);

    const handleOutsideClick = (e) => {
        if (newRef.current && !newRef.current.contains(e.target) && !helper.isTargetContainsIgnoreClass(e.target)) {
          setCollapseYearOption(true)
          //console.log('Outside click SchoolYear3')
        }
      };

    const toggleYearDropdown= () => {
        //console.log('ddd')
        setCollapseYearOption(!collapseYearOption)
    }
    const updateSelectedYear = (item) => {
        console.log('item', item)  
        setSelectedSchoolYear3({ ...item, validated: true })
        setCollapseYearOption(true)
        setFieldDefault(false)
        updateWendogouser(isInUniversityGlobal ? SIMULATION_ENGINE_STEPS.RECENT_DEGREE : SIMULATION_ENGINE_STEPS.DEGREE_EXACT_NAME, {...item, validated: true}) // Quand on fait 1ère ou Terminale, pas besoin d'être redirigé vers la page de sélection de diplôme (RecentDegree)
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
            let clonedData = _.cloneDeep(data);
            setSchoolYears3(clonedData.reverse());
        }

        helper.addOutsideClick(handleOutsideClick)

    }, [data, error, isLoading ])

    const handleContinue = () => { 
        
       updateWendogouser(isInUniversityGlobal ? SIMULATION_ENGINE_STEPS.RECENT_DEGREE : SIMULATION_ENGINE_STEPS.DEGREE_EXACT_NAME, {...selectedSchoolYear3, validated: true})
    }

    const updateWendogouser = (simulationStep, selectedSchoolYear3) => {
        dispatch(setStep(simulationStep)) 
        if (!selectedSchoolYear3.id) {
            const foundYear = _.find(schoolYears3, { name: selectedSchoolYear3.name });
            if (foundYear) {
                selectedSchoolYear3.id = foundYear.id;
            }
        }
        let updatedUser = {...user, simulationStep, selectedSchoolYear3, date: new Date().toISOString()}
        helper.setLocalStorageWithExpiration('wendogouser', updatedUser)         
    }

  return (
         <SEDropDownList title="Cela correspond à quelle année scolaire ?" newRef={newRef} collapseOption={collapseYearOption} fieldDefault={fieldDefault} items={schoolYears3} 
                         itemSelected={selectedSchoolYear3} toggleDropdown={toggleYearDropdown} updateSelected={updateSelectedYear}
                         handleContinue={handleContinue} showContinueBtn={simulationStepGlobal === SIMULATION_ENGINE_STEPS.SCHOOL_YEAR3}
                          />    
  );
}

export default SchoolYear3;
