'use client';

import React, { useState } from 'react';
import { Image, ImageOff, School, GraduationCap } from 'lucide-react';

const OptimizedImage = ({ 
  src, 
  alt, 
  className = '', 
  style,
  width,
  height,
  fallbackType = 'default', // 'default', 'school', 'program', 'avatar'
  showIcon = true
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  // Fonction pour obtenir l'icône selon le type
  const getFallbackIcon = () => {
    if (!showIcon) return null;
    
    switch (fallbackType) {
      case 'school':
        return <School className="w-8 h-8 text-slate-400" />;
      case 'program':
        return <GraduationCap className="w-8 h-8 text-slate-400" />;
      case 'avatar':
        return <div className="w-8 h-8 bg-slate-300 rounded-full flex items-center justify-center text-slate-500 font-semibold text-sm">
          {alt ? alt.charAt(0).toUpperCase() : '?'}
        </div>;
      default:
        return hasError ? <ImageOff className="w-8 h-8 text-slate-400" /> : <Image className="w-8 h-8 text-slate-400" />;
    }
  };

  // Fonction pour obtenir les couleurs selon le type
  const getFallbackColors = () => {
    switch (fallbackType) {
      case 'school':
        return 'bg-blue-50 border-blue-200';
      case 'program':
        return 'bg-green-50 border-green-200';
      case 'avatar':
        return 'bg-purple-50 border-purple-200';
      default:
        return 'bg-slate-50 border-slate-200';
    }
  };

  const containerStyle = {
    // ...style,
    // ...(width && { width }),
    // ...(height && { height })
  };

  return (
    <div className={`relative overflow-hidden ${className}`} style={containerStyle}>
      {/* Loading skeleton */}
      {isLoading && !hasError && (
        <div className={`absolute inset-0 ${getFallbackColors()} border animate-pulse flex items-center justify-center`}>
          <div className="flex flex-col items-center gap-2">
            {getFallbackIcon()}
            {showIcon && (
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Error fallback */}
      {hasError && (
        <div className={`absolute inset-0 ${getFallbackColors()} border flex items-center justify-center`}>
          <div className="flex flex-col items-center gap-2 text-center p-4">
            {getFallbackIcon()}
            {showIcon && (
              <div className="text-xs text-slate-500 max-w-full">
                {fallbackType === 'school' && 'Logo école'}
                {fallbackType === 'program' && 'Image programme'}
                {fallbackType === 'avatar' && 'Avatar'}
                {fallbackType === 'default' && 'Image indisponible'}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Actual image */}
      {src && !hasError && (
        <img
          src={src}
          alt={alt}
          title={alt}
          width={width}
          height={height}
          loading="lazy"
          decoding="async"
          onLoad={handleLoad}
          onError={handleError}
          className={`transition-opacity duration-300 ${className} ${
            isLoading ? 'opacity-0' : 'opacity-100'
          }`}
        />
      )}
    </div>
  );
};

// Version avec présets pour différents cas d'usage
export const SchoolLogo = ({ src, alt, className = '' }) => (
  <OptimizedImage
    src={src}
    alt={alt}
    className={`rounded-lg ${className}`}
    fallbackType="school"
    width={120}
    height={80}
  />
);

export const ProgramImage = ({ src, alt, className = '' }) => (
  <OptimizedImage
    src={src}
    alt={alt}
    className={`rounded-xl ${className}`}
    fallbackType="program"
    width={400}
    height={250}
  />
);

export const CoverImage = ({ src, alt, className = '' }) => (
  <OptimizedImage
    src={src}
    alt={alt}
    className={`rounded-2xl ${className}`}
    fallbackType="default"
  />
);

export const Avatar = ({ src, alt, className = '' }) => (
  <OptimizedImage
    src={src}
    alt={alt}
    className={`rounded-full ${className}`}
    fallbackType="avatar"
    width={40}
    height={40}
  />
);

export default OptimizedImage;
