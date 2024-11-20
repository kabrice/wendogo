'use client';

import React, { useState, useEffect } from "react";
import SEAlertMessage from "../../components/SimulationEngine/SEAlertMessage";
import SadEmoticonSvg from './../../assets/simulation_icons/sad_emoticon.svg';
import {useSelector } from 'react-redux';
import { Loader2 } from "lucide-react";

const ClassRepetitionWarningAlert = () => {
  const user = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(true);
  const [classRepetitionNumber, setClassRepetitionNumber] = useState(null);

  // Load user data on component mount
  useEffect(() => {
    const loadUserData = () => {
      
      if (user) {
        setClassRepetitionNumber(user?.classRepetitionNumber);
      }
      setIsLoading(false);
    };

    loadUserData();
  }, []);

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-[200px]">
              <Loader2 className="w-8 h-8 animate-spin" />
          </div>; 
  }

  if (!classRepetitionNumber || classRepetitionNumber <= 2) {
    return <div className="flex items-center justify-center min-h-[200px]">
              <Loader2 className="w-8 h-8 animate-spin" />
          </div>; 
  }

  return (
    <SEAlertMessage 
      title="Notre simulateur ne pourra pas vous assister. Campus France rend le traitement de ce cas très difficile."
      icon={<SadEmoticonSvg />}
      subtitles={[
        "Ne sont pas éligibles pour la procédure Campus France les candidats ayant redoublé au moins deux années dans un même cycle."
      ]}
      isError={true}
      showContinueBtn={false}
    />
  );
};

export default ClassRepetitionWarningAlert;
