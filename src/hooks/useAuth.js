// ═══════════════════════════════════════════════════════════
// 📁 2. HOOK D'AUTHENTIFICATION RÉUTILISABLE
// ═══════════════════════════════════════════════════════════

// 📁 hooks/useAuth.js
import { useSession, signIn, signOut } from 'next-auth/react';
import { useState, useCallback } from 'react';

export const useAuth = () => {
  const { data: session, status } = useSession();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const user = session?.user;
  const isAuthenticated = !!user;
  const isLoading = status === 'loading';

  const requireAuth = useCallback((callback) => {
    if (isAuthenticated) {
      callback();
    } else {
      setShowAuthModal(true);
    }
  }, [isAuthenticated]);

  const loginWithGoogle = () => signIn('google');
  const loginWithFacebook = () => signIn('facebook');
  const loginWithEmail = (email, password) => signIn('credentials', { email, password });
  const logout = () => signOut();

  return {
    user,
    isAuthenticated,
    isLoading,
    requireAuth,
    showAuthModal,
    setShowAuthModal,
    loginWithGoogle,
    loginWithFacebook,
    loginWithEmail,
    logout,
  };
};
