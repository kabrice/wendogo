import { GraduationCap, School, BookOpen, Users, Globe, Search, Zap, Star, Heart, Coffee } from 'lucide-react';

const CoffeeLoader = () => {
    return (
      <div className="text-center">
        <div className="mb-6">
          <div className="relative">
            <Coffee className="w-16 h-16 mx-auto text-yellow-600" />
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="w-1 h-3 bg-gray-400 rounded-full opacity-60 animate-bounce inline-block mx-0.5"
                  style={{ animationDelay: `${i * 0.3}s` }}
                />
              ))}
            </div>
          </div>
        </div>
        
        <p className="text-lg font-medium text-gray-700 mb-2">
          ☕ Le temps d'un café...
        </p>
        <p className="text-sm text-gray-500">
          On prépare quelque chose d'exceptionnel pour vous !
        </p>
      </div>
    );
  };

export default CoffeeLoader;
