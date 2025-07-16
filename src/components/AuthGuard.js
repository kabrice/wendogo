import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState, startTransition } from 'react';
import ClientOnly from './ClientOnly';

const AuthGuard = ({ children, requireAuth = false, fallback = null }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    if (status === 'loading') return; // Still loading

    if (requireAuth && !session) {
      startTransition(() => {
        setIsNavigating(true);
        router.push('/').finally(() => setIsNavigating(false));
      });
    }
  }, [session, status, requireAuth, router]);

  // Loading state
  if (status === 'loading' || isNavigating) {
    return fallback || (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Not authenticated but auth required
  if (requireAuth && !session) {
    return null; // Will redirect
  }

  return (
    <ClientOnly fallback={fallback}>
      {children}
    </ClientOnly>
  );
};

export default AuthGuard;
