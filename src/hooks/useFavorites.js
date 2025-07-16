
// ═══════════════════════════════════════════════════════════
// 📁 3. HOOK POUR LES FAVORIS
// ═══════════════════════════════════════════════════════════

// 📁 hooks/useFavorites.js
import { useState, useEffect, useCallback } from 'react';
import { useAuth } from './useAuth';

export const useFavorites = () => {
  const { user, isAuthenticated, requireAuth } = useAuth();
  const [favorites, setFavorites] = useState(new Set());
  const [isLoading, setIsLoading] = useState(false);

  // 📥 CHARGER les favoris au login
  useEffect(() => {
    if (isAuthenticated && user) {
      loadFavorites();
    } else {
      setFavorites(new Set());
    }
  }, [isAuthenticated, user]);

  const loadFavorites = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/user/favorites', {
        headers: {
          'Authorization': `Bearer ${user.accessToken}`,
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        setFavorites(new Set(data.program_ids));
      }
    } catch (error) {
      console.error('Erreur lors du chargement des favoris:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // ❤️ TOGGLE favori avec vérification auth
  const toggleFavorite = useCallback((programId) => {
    requireAuth(async () => {
      const isFavorite = favorites.has(programId);
      
      // Optimistic update
      const newFavorites = new Set(favorites);
      if (isFavorite) {
        newFavorites.delete(programId);
      } else {
        newFavorites.add(programId);
      }
      setFavorites(newFavorites);

      try {
        const response = await fetch('/api/user/favorites', {
          method: isFavorite ? 'DELETE' : 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.accessToken}`,
          },
          body: JSON.stringify({ program_id: programId }),
        });

        if (!response.ok) {
          // Rollback en cas d'erreur
          setFavorites(favorites);
          throw new Error('Erreur lors de la sauvegarde');
        }
      } catch (error) {
        console.error('Erreur toggle favori:', error);
        // Rollback
        setFavorites(favorites);
      }
    });
  }, [favorites, requireAuth, user]);

  return {
    favorites,
    isLoading,
    toggleFavorite,
    loadFavorites,
  };
};
