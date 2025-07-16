import { GraduationCap, School, BookOpen, Users, Globe, Search, Zap, Star, Heart, Coffee } from 'lucide-react';

const ParticleLoader = () => {
    return (
      <div className="text-center relative">
        <div className="relative mb-6">
          {/* Particules flottantes */}
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-3 h-3 bg-blue-500 rounded-full animate-bounce opacity-60"
              style={{
                left: `${20 + i * 12}%`,
                animationDelay: `${i * 0.3}s`,
                animationDuration: '2s'
              }}
            />
          ))}
          
          <div className="w-20 h-20 mx-auto bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center relative z-10">
            <BookOpen className="w-10 h-10 text-white animate-pulse" />
          </div>
        </div>
        
        <p className="text-lg font-medium bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Magie en cours... ✨
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Préparation de votre expérience personnalisée
        </p>
      </div>
    );
  };

export default ParticleLoader;
