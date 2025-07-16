import React, { useState, useEffect } from "react";
import { Search } from "lucide-react"; // or update the import path if Search is a local component

const ProgressLoader = () => {
    const [progress, setProgress] = useState(0);
    
    useEffect(() => {
      const timer = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) return 0;
          return prev + Math.random() * 15;
        });
      }, 300);
      return () => clearInterval(timer);
    }, []);

    const getStatusText = () => {
      if (progress < 25) return "🔍 Exploration des formations...";
      if (progress < 50) return "📊 Analyse des données...";
      if (progress < 75) return "🎯 Optimisation des résultats...";
      return "✅ Finalisation...";
    };

    return (
      <div className="text-center max-w-md mx-auto">
        <div className="mb-6">
          <Search className="w-12 h-12 mx-auto text-blue-600 animate-spin" />
        </div>
        <p className="text-lg font-medium text-gray-700 mb-4">
          {getStatusText()}
        </p>
        <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
          <div 
            className="bg-gradient-to-r from-blue-600 to-purple-600 h-3 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
        <p className="text-sm text-gray-500">{Math.round(progress)}% complété</p>
      </div>
    );
  };

export default ProgressLoader;
