'use client';

import React, { useState, useEffect } from "react";
import {useSelector } from 'react-redux';
import SEAlertMessage from "../../components/SimulationEngine/SEAlertMessage";
import IconEconomy from './../../assets/simulation_icons/icon_economy.svg';
import { Loader2 } from "lucide-react";

const CouldPayTuitionWarningAlert = () => {
    const [isLoading, setIsLoading] = useState(true);
    const user = useSelector((state) => state.user);
    const [couldPayTuition, setCouldPayTuition] = useState(null);

    // Load user data on component mount
    useEffect(() => {
        const loadUserData = () => {
            
            if (user) {
                setCouldPayTuition(user?.couldPayTuition);
            }
            setIsLoading(false);
        };

        loadUserData();
    }, []);

    const warningMessage = `Des ressources financières suffisantes sont cruciales pour étudier en France. Elles permettent de couvrir les frais 
        de scolarité, le coût de la vie, l'hébergement, les assurances, et autres dépenses essentielles. 
        Un financement adéquat est requis pour obtenir un visa étudiant et prouve que l'étudiant peut subvenir 
        à ses besoins pendant toute la durée de ses études.`;

    if (isLoading) {
      return <div className="flex items-center justify-center min-h-[200px]">
                <Loader2 className="w-8 h-8 animate-spin" />
            </div>;       
    }

    // Only show the alert if couldPayTuition is explicitly false
    if (couldPayTuition || couldPayTuition === null) {
      return <div className="flex items-center justify-center min-h-[200px]">
                <Loader2 className="w-8 h-8 animate-spin" />
            </div>;   
    }

    return (
        <SEAlertMessage 
            title="Notre simulateur ne pourra pas vous assister."
            icon={<IconEconomy />}
            subtitles={[warningMessage]}
            isError={true}
            showContinueBtn={false}
        />
    );
};

export default CouldPayTuitionWarningAlert;
