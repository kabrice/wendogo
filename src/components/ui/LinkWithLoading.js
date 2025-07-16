import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const LinkWithLoading = ({ 
  href, 
  children, 
  className = "", 
  showLoadingText = true,
  loadingText = "Chargement...",
  ...props 
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = (e) => {
    // Seulement pour les liens internes
    if (href.startsWith('/')) {
      setIsLoading(true);
    }
  };

  const handleMouseEnter = () => {
    // ✅ PRÉCHARGER au hover pour les liens internes
    if (href.startsWith('/schools/') || href.startsWith('/programs/')) {
      router.prefetch(href);
    }
  };
  
  useEffect(() => {
    const handleRouteChangeComplete = () => setIsLoading(false);
    const handleRouteChangeError = () => setIsLoading(false);

    router.events.on('routeChangeComplete', handleRouteChangeComplete);
    router.events.on('routeChangeError', handleRouteChangeError);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
      router.events.off('routeChangeError', handleRouteChangeError);
    };
  }, [router]);

  return (
    <Link href={href} {...props}>
      <div onClick={handleClick} className={`relative ${className}`} onMouseEnter={handleMouseEnter}>
        {isLoading && (
          <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-10 rounded-lg">
            <div className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
              {showLoadingText && (
                <span className="text-sm text-gray-600">{loadingText}</span>
              )}
            </div>
          </div>
        )}
        {children}
      </div>
    </Link>
  );
};

export default LinkWithLoading;
