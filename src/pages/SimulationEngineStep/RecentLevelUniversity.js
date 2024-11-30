'use client';
import { setUser } from '../../redux/userSlice';
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import { setStep } from '../../redux/simulationStepSlice';
import { SIMULATION_ENGINE_STEPS } from '../../utils/Constants';
import SEDropDownList from '../../components/SimulationEngine/SEDropDownList';
import helper from '../../utils/Helper'; 
const RecentLevelUniversity = ({ universityLevels, isErrorPage }) => {
    
  const [isClient, setIsClient] = useState(false);
  ///const [user, setUser] = useState(null);
  const [universityLevelSelected, setUniversityLevelSelected] = useState(null);
  const [collapseBacOption, setCollapseBacOption] = useState(true);
  const [fieldDefault, setFieldDefault] = useState(true);
  
  const dispatch = useDispatch();
  const newRef = useRef(null);
  const simulationStepGlobal = useSelector((state) => state.simulationStep);
  const user = useSelector((state) => state.user);
  // Initialize client-side data
  useEffect(() => {
    setIsClient(true);
    // const user = helper.getLocalStorageWithExpiration('wendogouser');
    // setUser(user);
    setUniversityLevelSelected(
      user?.universityLevelSelected || 
      { id: 'bac00006', name: 'BAC+3', validated: false }
    );
  }, []);

  const handleOutsideClick = (e) => {
    if (newRef.current && !newRef.current.contains(e.target) && !helper.isTargetContainsIgnoreClass(e.target)) {
      setCollapseBacOption(true);
    }
  };

  const toggleBacDropdown = () => {
    setCollapseBacOption(!collapseBacOption);
  };

  const updateSelectedBac = (item) => {
    setUniversityLevelSelected({ id: item.id, name: item.name, validated: true });
    setCollapseBacOption(true);
    setFieldDefault(false);
    updateWendogouser(SIMULATION_ENGINE_STEPS.SCHOOL_YEAR3, { id: item.id, name: item.name, validated: true });
  };

  const updateWendogouser = (simulationStep, universityLevelSelected) => {
    dispatch(setStep(simulationStep));
    
    let updatedUser = {
      ...user,
      simulationStep,
      universityLevelSelected,
      hsLevelSelected: null,
      degreeSelected: null,
      date: new Date().toISOString()
    };

    const reportCards = ['reportCard3', 'reportCard2', 'reportCard1'];
    for (const reportCard of reportCards) {
      if (user?.[reportCard]?.length > 0) {
        // user[reportCard][user[reportCard].length - 1] = [];
        // Create a new array to avoid direct mutation
        const updatedReportCard = [...user[reportCard]];
        updatedReportCard[updatedReportCard.length - 1] = []; // Replace the last item

        // Update the user object with the new array
        updatedUser = {
          ...updatedUser,
          [reportCard]: updatedReportCard,
        };
        break;
      }
    }
    dispatch(setUser(updatedUser));
    helper.setLocalStorageWithExpiration('wendogouser', updatedUser);
    //setUser(updatedUser);
  };

  useEffect(() => { 

    return helper.addOutsideClick(handleOutsideClick);
  }, [isErrorPage, dispatch]);

  const handleContinue = () => {
    updateWendogouser(SIMULATION_ENGINE_STEPS.SCHOOL_YEAR3, { ...universityLevelSelected, validated: true });
  };

  // Don't render anything until client-side initialization is complete
  if (!isClient) {
    return null;
  }

  return (
    <SEDropDownList 
      title="Vous avez quel niveau dans le supérieur ?" 
      tip="Cela signifie que vous venez d'obtenir votre baccalauréat ou que vous êtes en première année d'études supérieures."
      showTip={universityLevelSelected?.name === 'BAC+1'}
      newRef={newRef}
      collapseOption={collapseBacOption}
      fieldDefault={fieldDefault}
      items={universityLevels}
      itemSelected={universityLevelSelected}
      toggleDropdown={toggleBacDropdown}
      updateSelected={updateSelectedBac}
      handleContinue={handleContinue}
      showContinueBtn={simulationStepGlobal === SIMULATION_ENGINE_STEPS.RECENT_CLASS_LEVEL}
    />
  );
};

export default RecentLevelUniversity;
