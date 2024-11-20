'use client';

import React, { useState } from 'react';

const OptimizedImage = ({ src, alt, className = '', style }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {/* Skeleton placeholder */}
      {isLoading && (
        <div 
          className="absolute inset-0 bg-gray-200 animate-pulse"
          aria-hidden="true"
        />
      )}
      
      <img
        src={src}
        alt={alt}
        title={alt}
        style={style}
        loading="lazy"
        decoding="async"
        onLoad={() => setIsLoading(false)}
        className={`transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        } ${className}`}
      />
    </>
  );
};

export default OptimizedImage;
