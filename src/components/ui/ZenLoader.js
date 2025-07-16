import { GraduationCap, School, BookOpen, Users, Globe, Search, Zap, Star, Heart, Coffee } from 'lucide-react';


 const ZenLoader = () => {
    return (
      <div className="text-center">
        <div className="mb-6 relative">
          <div className="w-32 h-32 mx-auto relative">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="absolute inset-0 border-2 border-blue-300 rounded-full animate-ping"
                style={{
                  animationDelay: `${i * 0.5}s`,
                  animationDuration: '2s',
                  margin: `${i * 8}px`
                }}
              />
            ))}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>
        
        <p className="text-lg font-medium text-gray-700">
          ⚡ Synchronisation en cours...
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Harmonie parfaite entre vos attentes et nos formations
        </p>
      </div>
    );
  };

export default ZenLoader;
