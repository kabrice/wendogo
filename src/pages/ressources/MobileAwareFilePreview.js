'use client';
import React, { useState, useEffect, useRef } from 'react';

// Optimized for mobile devices
const MobileAwareFilePreview = ({ isVisible, onClose, file }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [cachedUrl, setCachedUrl] = useState(null);
  
  // Determine file type from name
  const fileExtension = file.name.split('.').pop().toLowerCase();
  const isImage = ['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension);
  const isPdf = fileExtension === 'pdf';
  // Detect if device is mobile
  useEffect(() => {
    setIsMobile(/Android|iPhone|iPad|iPod/i.test(navigator.userAgent));
  }, []);
  
  // Attempt to pre-cache the file content
  useEffect(() => {
    if (isVisible && file && isMobile) {
      const cacheFile = async () => {
        try {
          // Only try to cache images (PDFs could be too large)
          const fileExtension = file.name.split('.').pop().toLowerCase();
          const isImage = ['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension);
          
          if (isImage) {
            setIsDownloading(true);
            const response = await fetch(file.url);
            const blob = await response.blob();
            const objectUrl = URL.createObjectURL(blob);
            setCachedUrl(objectUrl);
            setIsDownloading(false);
          }
        } catch (error) {
          console.error('Error caching file:', error);
          // Continue with the original URL
          setIsDownloading(false);
        }
      };
      
      cacheFile();
      
      // Clean up the cached URL when component unmounts
      return () => {
        if (cachedUrl) {
          URL.revokeObjectURL(cachedUrl);
        }
      };
    }
  }, [isVisible, file, isMobile]);
  
  const pdfObjectRef = useRef(null);

  useEffect(() => {
    if (isPdf && pdfObjectRef.current) {
      const pdfObject = pdfObjectRef.current;
      
      // Function to handle when PDF is loaded
      const handlePdfLoad = () => {
        setIsLoading(false);
        setIsDownloading(false);
      };
      
      // Set a timeout as fallback in case the load event doesn't fire
      const timeoutId = setTimeout(() => {
        setIsLoading(false);
        setIsDownloading(false);
      }, 3000);
      
      pdfObject.addEventListener('load', handlePdfLoad);
      
      return () => {
        pdfObject.removeEventListener('load', handlePdfLoad);
        clearTimeout(timeoutId);
      };
    }
  }, [isPdf]);
  if (!isVisible || !file) return null;
  
  // Get the effective URL (cached or original)
  const effectiveUrl = cachedUrl || file.url;
  

  
  const handleLoad = () => {
    setIsLoading(false);
  };
  
  const handleError = () => {
    setIsLoading(false);
    setError("Impossible de charger le document. Veuillez réessayer.");
  };
  
  // Function to download and save the file on mobile
  const downloadFile = async () => {
    try {
      setIsDownloading(true);
      
      if (isMobile) {
        // For mobile, we need to fetch and create a download link
        const response = await fetch(file.url);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        
        // Create an invisible link and click it
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = file.name;
        document.body.appendChild(a);
        a.click();
        
        // Clean up
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } else {
        // For desktop, we can use a simple link
        window.open(file.url, '_blank');
      }
    } catch (error) {
      console.error('Download error:', error);
      setError('Erreur lors du téléchargement. Veuillez réessayer.');
    } finally {
      setIsDownloading(false);
    }
  };
  
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-2 sm:p-4">
      <div className="bg-white rounded-lg w-full max-w-lg sm:max-w-3xl max-h-[95vh] flex flex-col overflow-hidden">
        <div className="flex items-center justify-between p-3 sm:p-4 border-b">
          <h3 className="font-medium text-base sm:text-lg truncate max-w-[calc(100%-40px)]">
            {file.name}
          </h3>
          <button 
            onClick={onClose}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        
        <div className="flex-1 overflow-auto p-2 sm:p-4 bg-gray-100 relative">
          {(isLoading || isDownloading) && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 bg-opacity-80 z-10">
              <div className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-t-blue-500 border-gray-200 rounded-full animate-spin mb-2"></div>
              <p className="text-sm text-gray-700">
                {isDownloading ? 'Téléchargement...' : 'Chargement...'}
              </p>
            </div>
          )}
          
          {error ? (
            <div className="text-center p-4 sm:p-8 bg-red-50 text-red-600 rounded-lg">
              <p>{error}</p>
              <button 
                onClick={() => window.open(file.url, '_blank')}
                className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-md"
              >
                Essayer dans un nouvel onglet
              </button>
            </div>
          ) : isImage ? (
            <div className="flex items-center justify-center min-h-[50vh]">
              <img 
                src={effectiveUrl} 
                alt={file.name}
                onLoad={handleLoad}
                onError={handleError}
                className="max-w-full max-h-[70vh] mx-auto object-contain"
              />
            </div>
          ) : isPdf ? (
            <object
            data={file.url}
            ref={pdfObjectRef}
            type="application/pdf"
            className="w-full h-[70vh] border-0"
          >
            <p>Impossible de charger le PDF. <a href={file.url} className="text-blue-600 underline">Télécharger pour consulter</a></p>
          </object>
          ) : (
            <div className="text-center p-4 sm:p-8 bg-gray-50 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 sm:h-16 sm:w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-gray-600 mb-4">Ce type de fichier ne peut pas être prévisualisé directement.</p>
              <button 
                onClick={downloadFile}
                className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md"
                disabled={isDownloading}
              >
                {isDownloading ? 'Téléchargement...' : 'Télécharger le fichier'}
              </button>
            </div>
          )}
        </div>
        
        <div className="p-3 sm:p-4 border-t flex justify-between items-center">
          <button 
            onClick={downloadFile}
            className="text-blue-600 hover:text-blue-800 flex items-center text-sm sm:text-base"
            disabled={isDownloading}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Télécharger
          </button>
          <button
            onClick={onClose}
            className="px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base rounded-md bg-gray-200 hover:bg-gray-300"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileAwareFilePreview;
