// This approach uses the browser's built-in PDF viewer

import React, { useState, useEffect } from 'react';

const BrowserPdfViewer = ({ fileUrl, fileName }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasNativePdfSupport, setHasNativePdfSupport] = useState(false);

  // Check if browser has native PDF support
  useEffect(() => {
    // Most modern browsers support PDF natively
    // but we can't detect it 100% reliably
    const isChrome = navigator.userAgent.indexOf('Chrome') !== -1;
    const isFirefox = navigator.userAgent.indexOf('Firefox') !== -1;
    const isSafari = navigator.userAgent.indexOf('Safari') !== -1 && navigator.userAgent.indexOf('Chrome') === -1;
    
    setHasNativePdfSupport(isChrome || isFirefox || isSafari);
  }, []);

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  const handleIframeError = () => {
    setError('Impossible de charger ce PDF. Veuillez essayer de le télécharger.');
    setIsLoading(false);
  };

  // Add a specific header to the URL to force the browser to display it inline
  const getEmbedUrl = () => {
    // Add a cache-busting parameter to prevent caching issues
    const cacheBuster = `cache=${Date.now()}`;
    const separator = fileUrl.includes('?') ? '&' : '?';
    
    return `${fileUrl}${separator}${cacheBuster}`;
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-lg overflow-hidden shadow-lg">
      {/* Header */}
      <div className="bg-gray-100 p-3 border-b">
        <h3 className="text-lg font-medium truncate">{fileName}</h3>
      </div>

      {/* Viewer */}
      <div className="flex-1 relative">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent"></div>
            <span className="ml-2">Chargement du document...</span>
          </div>
        )}
        
        {error ? (
          <div className="flex flex-col items-center justify-center p-8 h-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <p className="text-center text-gray-800 mb-4">{error}</p>
            <p className="text-center text-gray-600 mb-4">
              Essayez d'ouvrir le PDF dans un nouvel onglet ou de le télécharger.
            </p>
            <div className="flex space-x-4">
              <a 
                href={fileUrl} 
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Ouvrir dans un nouvel onglet
              </a>
              <a 
                href={fileUrl} 
                download={fileName}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Télécharger
              </a>
            </div>
          </div>
        ) : hasNativePdfSupport ? (
          // For browsers with native PDF support, use an iframe with the PDF URL
          <iframe
            src={getEmbedUrl()}
            title={fileName}
            className="w-full h-full border-0"
            onLoad={handleIframeLoad}
            onError={handleIframeError}
          />
        ) : (
          // Fallback for browsers without native PDF support
          <div className="flex flex-col items-center justify-center p-8 h-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-center text-gray-800 mb-2">
              Ce navigateur ne prend pas en charge l'affichage des PDF.
            </p>
            <p className="text-center text-gray-600 mb-4">
              Vous pouvez télécharger le document pour le visualiser.
            </p>
            <a 
              href={fileUrl} 
              download={fileName}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Télécharger le PDF
            </a>
          </div>
        )}
      </div>

      {/* Footer with download button */}
      <div className="bg-gray-100 p-3 border-t flex justify-between items-center">
        <div>
          <button 
            onClick={() => window.open(fileUrl, '_blank')}
            className="text-blue-600 hover:text-blue-800"
          >
            Ouvrir dans un nouvel onglet
          </button>
        </div>
        <a 
          href={fileUrl} 
          download={fileName}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Télécharger
        </a>
      </div>
    </div>
  );
};

export default BrowserPdfViewer;
