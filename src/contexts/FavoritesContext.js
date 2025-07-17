// src/contexts/FavoritesContext.js - VERSION SIMPLIFIÉE
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { REST_API_PARAMS } from '../utils/Constants';


const FavoritesContext = createContext();

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

export const FavoritesProvider = ({ children }) => {
  const { data: session, status } = useSession();
  const [favorites, setFavorites] = useState(new Set());
  const [isLoading, setIsLoading] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    if (session?.user) {
      loadFavorites();
    } else {
      setFavorites(new Set());
    }
  }, [session]);

  const loadFavorites = async () => {
    if (!session?.user) return;
    setIsLoading(true);
    
    try {
      console.log('🔍 Chargement des favoris...', session.accessToken);
      
      const response = await fetch(`${REST_API_PARAMS.baseUrl}/api/user/favorites`, {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.accessToken}`
        }, 
        credentials: 'include', // ✅ IMPORTANT: Inclure les cookies
      });
      
      console.log('📡 Réponse:', response.status, response.statusText);
      
      if (response.ok) {
        const data = await response.json();
        console.log('✅ Favoris chargés:', data.program_ids);
        setFavorites(new Set(data.program_ids));
      } else {
        console.error('❌ Erreur chargement favoris:', response.status);
      }
    } catch (error) {
      console.error('❌ Erreur lors du chargement des favoris:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleFavorite = async (programId) => {
    if (!session?.user) {
      setShowAuthModal(true);
      return;
    }

    const isFavorite = favorites.has(programId);
    const newFavorites = new Set(favorites);
    if (isFavorite) {
      newFavorites.delete(programId);
    } else {
      newFavorites.add(programId);
    }
    setFavorites(newFavorites);

    try {
      console.log(`🔍 ${isFavorite ? 'Suppression' : 'Ajout'} favori:`, programId, 'session.accessToken', session.accessToken);
      
      const response = await fetch(`${REST_API_PARAMS.baseUrl}/api/user/favorites`, {
        method: isFavorite ? 'DELETE' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.accessToken}`
          // 'Access-Control-Allow-Origin': '*',
          // 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
          // 'Access-Control-Request-Method': 'GET, POST, DELETE, PUT, OPTIONS'
        },
        credentials: 'include', // ✅ IMPORTANT: Inclure les cookies
        body: JSON.stringify({ program_id: programId }),
      });

      console.log('📡 Réponse toggle:', response.status, response.statusText);

      if (!response.ok) {
        setFavorites(favorites); // Rollback
        throw new Error('Erreur lors de la sauvegarde');
      }

      console.log('✅', isFavorite ? 'Retiré des favoris' : 'Ajouté aux favoris');

    } catch (error) {
      console.error('❌ Erreur toggle favori:', error);
      setFavorites(favorites); // Rollback
    }
  };

  const value = {
    favorites,
    isLoading,
    toggleFavorite,
    loadFavorites,
    showAuthModal,
    setShowAuthModal,
    isAuthenticated: !!session?.user,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};
