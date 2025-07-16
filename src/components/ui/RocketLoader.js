import { GraduationCap, School, BookOpen, Users, Globe, Search, Zap, Star, Heart, Coffee } from 'lucide-react';


 const RocketLoader = () => {
    return (
      <div className="text-center">
        <div className="mb-6 relative">
          <div className="animate-bounce">
            <div className="w-16 h-20 mx-auto bg-gradient-to-t from-blue-600 to-blue-400 rounded-full relative">
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                <div className="w-8 h-6 bg-orange-500 rounded-full animate-pulse"></div>
                <div className="w-6 h-4 bg-red-500 rounded-full mx-auto animate-ping"></div>
              </div>
              <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white rounded-full"></div>
            </div>
          </div>
          
          {/* Étoiles */}
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className="absolute w-4 h-4 text-yellow-400 animate-twinkle"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.5}s`
              }}
            />
          ))}
        </div>
        
        <p className="text-lg font-medium text-gray-700">
          🚀 Décollage vers votre avenir !
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Exploration de l'univers des formations...
        </p>
      </div>
    );
  };

export default RocketLoader;
