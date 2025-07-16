import React, { useState, useEffect } from "react";
import { Heart } from "lucide-react"; // Make sure you have lucide-react installed, or replace with your own Heart component

const MotivationalLoader = () => {
    const [messageIndex, setMessageIndex] = useState(0);
    
    const messages = [
      "🎓 Préparation de votre avenir académique...",
      "✨ Découverte des meilleures formations...",
      "🌟 Analyse de 2200+ programmes...", 
      "🚀 Votre formation idéale arrive..."
    ];

    useEffect(() => {
      const timer = setInterval(() => {
        setMessageIndex(prev => (prev + 1) % messages.length);
      }, 1200);
      return () => clearInterval(timer);
    }, [messages.length]);

    return (
      <div className="text-center">
        <div className="relative mb-6">
          <div className="w-16 h-16 mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full animate-ping"></div>
            <div className="relative w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
              <Heart className="w-8 h-8 text-white animate-bounce" />
            </div>
          </div>
        </div>
        <p className="text-lg font-medium text-gray-700 animate-pulse">
          {messages[messageIndex]}
        </p>
        <div className="mt-4 flex justify-center">
          <div className="flex space-x-1">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  };

export default MotivationalLoader;
