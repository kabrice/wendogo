import React, { useState, useEffect } from "react";
import SEAlertMessage from "../../components/SimulationEngine/SEAlertMessage";
import SadEmoticonSvg from './../../assets/simulation_icons/sad_emoticon.svg';
import helper from '../../utils/Helper';
import { useDispatch, useSelector } from 'react-redux';

const CampusFranceInegibilityAlert = () => {
  const user = useSelector((state) => state.user); 
  const [isLoading, setIsLoading] = useState(true);
  const [isIneligibleForCampusFrance, setIsIneligibleForCampusFrance] = useState(false);

  // Load user data on component mount
  useEffect(() => {
    const loadUserData = () => {
      
      if (user) {
        setIsIneligibleForCampusFrance(user?.isIneligibleForCampusFrance || false);
      }
      setIsLoading(false);
    };

    loadUserData();
  }, []);

  if (isLoading) {
    return null; // Or a loading spinner if preferred
  }

  if (!isIneligibleForCampusFrance) {
    return null;
  }

  return (
    <SEAlertMessage 
      title="Notre simulateur ne pourra pas vous assister."
      icon={<SadEmoticonSvg />}
      subtitles={[
        "Votre profil ne répond pas aux critères d'éligibilité fixés par Campus France."
      ]}
      isError={true}
      showContinueBtn={false}
    />
  );
};

export default CampusFranceInegibilityAlert;
