// ═══════════════════════════════════════════════════════════
// 📁 components/FavoriteButton.js - VERSION FINALE
// ═══════════════════════════════════════════════════════════

import React from 'react';
import { Heart } from 'lucide-react';
import { useFavorites } from '../contexts/FavoritesContext';
// import AuthModal from './AuthModal';

const FavoriteButton = ({ programId, className = "", size = "w-5 h-5" }) => {
  const { favorites, toggleFavorite } = useFavorites();
  
  const isFavorite = favorites.has(programId);

  return (
    <>
      <button
        onClick={() => toggleFavorite(programId)}
        className={`p-2 rounded-full transition-all duration-200 flex-shrink-0 ${
          isFavorite 
            ? 'text-yellow-500 bg-yellow-50 hover:bg-yellow-100' 
            : 'text-gray-400 hover:text-yellow-500 hover:bg-yellow-50'
        } ${className}`}
        title={isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
      >
        <Heart className={`${size} ${isFavorite ? 'fill-current' : ''}`} />
      </button>

      {/* <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      /> */}
    </>
  );
};

export default FavoriteButton;
