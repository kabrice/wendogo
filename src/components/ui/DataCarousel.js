import React, { useState, useEffect } from "react";
import { School, GraduationCap, Users, Globe } from "lucide-react";

const DataCarousel = () => {
    const [currentStep, setCurrentStep] = useState(0);
    
    const steps = [
      { icon: School, text: "Chargement des écoles", color: "text-blue-600" },
      { icon: GraduationCap, text: "Analyse des programmes", color: "text-purple-600" },
      { icon: Users, text: "Calcul des statistiques", color: "text-green-600" },
      { icon: Globe, text: "Finalisation", color: "text-orange-600" }
    ];

    useEffect(() => {
      const timer = setInterval(() => {
        setCurrentStep(prev => (prev + 1) % steps.length);
      }, 800);
      return () => clearInterval(timer);
    }, [steps.length]);

    return (
      <div className="text-center">
        <div className="relative mb-6">
          <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4 animate-pulse">
            {React.createElement(steps[currentStep].icon, { 
              className: "w-10 h-10 text-white" 
            })}
          </div>
          <div className="absolute -inset-2 border-4 border-blue-200 rounded-full animate-spin opacity-30"></div>
        </div>
        <p className={`text-lg font-medium ${steps[currentStep].color} transition-colors duration-300`}>
          {steps[currentStep].text}
        </p>
        <div className="flex justify-center gap-2 mt-4">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentStep ? 'bg-blue-600 w-6' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    );
  };

export default DataCarousel;
