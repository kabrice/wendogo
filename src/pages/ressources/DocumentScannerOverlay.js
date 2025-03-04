'use client';
import React, { useState, useEffect } from 'react';
import imageCompression from 'browser-image-compression';

const DocumentScannerOverlay = ({ 
  isVisible, 
  onCancel, 
  onCapture, 
  selectedDocumentType, 
  uploadedFiles,
  setShowError // New prop to handle error display
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState('');
  const [internalError, setInternalError] = useState(null);
  const [deviceInfo, setDeviceInfo] = useState({
    type: 'unknown',
    model: 'unknown'
  });

  // Detect device information on component mount
  useEffect(() => {
    detectDeviceInfo();
  }, []);

  // Function to detect device information
  const detectDeviceInfo = () => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    let deviceType = 'unknown';
    let deviceModel = 'unknown';

    // Detect if iPhone
    if (/iPhone/.test(userAgent)) {
      deviceType = 'iphone';
      
      // Try to determine iPhone model
      const matches = userAgent.match(/iPhone(\s*[^\s]+)/);
      if (matches && matches[1]) {
        deviceModel = matches[1].trim().toLowerCase().replace(/[,;]/g, '');
      } else {
        // Generic iPhone model if specific model can't be determined
        deviceModel = 'model';
      }
    } 
    // Detect if Android
    else if (/android/i.test(userAgent)) {
      deviceType = 'android';
      
      // Try to extract Android device model (e.g. "SM-G955U", "Pixel", etc.)
      let modelMatches = userAgent.match(/Android[^;]+;\s*([^;]+)/i);
      if (modelMatches && modelMatches[1]) {
        deviceModel = modelMatches[1].trim().toLowerCase().replace(/[,;]/g, '').replace(/\s+/g, '');
      } else {
        deviceModel = 'model';
      }
    }
    
    setDeviceInfo({
      type: deviceType,
      model: deviceModel
    });
    
    console.log('Device detected:', { deviceType, deviceModel });
  };

  // Check if document type is already uploaded
  const isDocumentTypeAlreadyUploaded = () => {
    if (!selectedDocumentType || !uploadedFiles) return false;
    
    return uploadedFiles.some(file => file.id === selectedDocumentType.id);
  };

  // Generate a device-specific filename with HHMMSS format
  const generateFilename = (originalFile) => {
    const fileExtension = originalFile.name.split('.').pop().toLowerCase();
    const { type, model } = deviceInfo;
    
    // Get the proper device identifier
    let deviceIdentifier = 'device';
    if (type === 'iphone') {
      deviceIdentifier = `iphone${model !== 'model' ? model : ''}`;
    } else if (type === 'android') {
      deviceIdentifier = model !== 'model' ? model : 'android';
    }
    
    // Clean up identifier - remove non-alphanumeric characters
    deviceIdentifier = deviceIdentifier.replace(/[^a-z0-9]/gi, '');
    
    // Format current time as HHMMSS
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const timeString = `${hours}${minutes}${seconds}`;
    
    return `image_${deviceIdentifier}_${timeString}.${fileExtension}`;
  };
  
  // Function to process and optimize the image
  const processImage = async (file) => {
    try {
      // Check if this document type is already uploaded
      if (isDocumentTypeAlreadyUploaded()) {
        // Use the parent component's error display mechanism
        if (setShowError) {
          setShowError(true);
        }
        
        // Also set internal error for display within the scanner
        setInternalError("Document déjà ajouté. Veuillez en choisir un autre relevé.");
        setStatusMessage("Erreur: Type de document déjà utilisé");
        return null; // Return null to indicate error
      }
      
      setStatusMessage('Traitement de l\'image...');
      
      // 1. Check if it's an HEIC/HEIF file (common on iPhones)
      const isHeic = file.name.toLowerCase().endsWith('.heic') || 
                     file.name.toLowerCase().endsWith('.heif') ||
                     file.type === 'image/heic' || 
                     file.type === 'image/heif';
      
      let processedFile = file;
      
      // 2. Handle HEIC conversion if needed
      if (isHeic) {
        setStatusMessage('Conversion du format HEIC...');
        // We need to dynamically import heic2any only when needed
        try {
          const heic2any = (await import('heic2any')).default;
          const jpegBlob = await heic2any({
            blob: file,
            toType: 'image/jpeg',
            quality: 0.8
          });
          
          // Create a new file from the converted blob
          processedFile = new File(
            [jpegBlob], 
            file.name.replace(/\.heic$/i, '.jpg').replace(/\.heif$/i, '.jpg'), 
            { type: 'image/jpeg' }
          );
          
          setStatusMessage('Conversion HEIC terminée');
        } catch (heicError) {
          console.error('HEIC conversion failed:', heicError);
          setStatusMessage('Erreur de conversion HEIC. Utilisation du fichier original...');
          // Continue with the original file if conversion fails
        }
      }
      
      // 3. Compress the image regardless of original format
      setStatusMessage('Compression de l\'image...');
      
      // Compression options
      const options = {
        maxSizeMB: 1, // Max 1MB file size
        maxWidthOrHeight: 1600, // Max dimension
        useWebWorker: true,
        fileType: 'image/jpeg',
        initialQuality: 0.7,
        onProgress: (progress) => {
          setProgress(Math.round(progress * 100));
        },
      };
      
      const compressedFile = await imageCompression(processedFile, options);
      
      // 4. Rename the file with device-specific name and HHMMSS format
      const newFilename = generateFilename(compressedFile);
      const renamedFile = new File(
        [compressedFile], 
        newFilename, 
        { type: compressedFile.type }
      );
      
      setStatusMessage('Compression terminée');
      
      // Return the optimized and renamed file
      return renamedFile;
      
    } catch (error) {
      console.error('Image processing error:', error);
      setStatusMessage('Erreur lors du traitement. Utilisation du fichier original...');
      return file; // Return original as fallback
    }
  };
  
  // Handle file selection
  const handleFileInput = async (e) => {
    if (!e.target.files || !e.target.files[0]) return;
    
    setIsUploading(true);
    setProgress(0);
    setStatusMessage('Préparation...');
    setInternalError(null);
    
    try {
      if (!selectedDocumentType) {
        setInternalError("Veuillez sélectionner un type de document.");
        setIsUploading(false);
        return;
      }
      
      const file = e.target.files[0];
      
      // Check if this document type is already uploaded before processing
      if (isDocumentTypeAlreadyUploaded()) {
        // Show error in both places - in the scanner and the parent component
        setInternalError("Document déjà ajouté. Veuillez en choisir un autre relevé.");
        if (setShowError) {
          setShowError(true);
        }
        setIsUploading(false);
        
        // Close the scanner after a delay
        setTimeout(() => {
          onCancel();
        }, 2000);
        return;
      }
      
      // Log initial file details
      console.log('Original file:', {
        name: file.name,
        type: file.type,
        size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`
      });
      
      // Process and optimize the image
      const optimizedFile = await processImage(file);
      
      // If null returned, it means there was an error
      if (!optimizedFile) {
        setIsUploading(false);
        return;
      }
      
      // Log optimized file details
      console.log('Optimized file:', {
        name: optimizedFile.name,
        type: optimizedFile.type,
        size: `${(optimizedFile.size / (1024 * 1024)).toFixed(2)} MB`
      });
      
      // Pass it back to the parent
      setStatusMessage('Envoi du document...');
      onCapture(optimizedFile, selectedDocumentType.id);
      
    } catch (error) {
      console.error('File handling error:', error);
      setStatusMessage('Une erreur s\'est produite');
      setInternalError('Une erreur s\'est produite lors du traitement du fichier.');
    } finally {
      // Close after a short delay if no error occurred
      if (!internalError) {
        setTimeout(() => {
          setIsUploading(false);
          onCancel();
        }, 1000);
      } else {
        setIsUploading(false);
      }
    }
  };
  
  if (!isVisible) return null;
  
  return (
    <div className="fixed inset-0 z-50 bg-gray-900 bg-opacity-95 flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <h2 className="text-white text-lg font-medium" style={{ color: 'black', textAlign: 'center' }}>
           {selectedDocumentType ? selectedDocumentType.name : "un document"}
        </h2>
        <button 
          onClick={onCancel}
          className="p-2 rounded-full bg-gray-800 text-white"
          disabled={isUploading}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
      
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        {isUploading ? (
          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 mb-4 relative">
              <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
              <div 
                className="absolute inset-0 rounded-full border-4 border-t-blue-500 border-r-transparent border-b-transparent border-l-transparent"
                style={{ 
                  transform: `rotate(${progress * 3.6}deg)`,
                  transition: 'transform 0.3s ease'
                }}
              ></div>
              <div className="absolute inset-0 flex items-center justify-center text-white font-bold">
                {progress}%
              </div>
            </div>
            <p className="text-white font-medium mb-2">{statusMessage}</p>
            <p className="text-gray-400 text-sm">Veuillez patienter pendant le traitement de votre document</p>
          </div>
        ) : (
          <div className="text-center max-w-md">
            {internalError && (
              <div className="mb-4 bg-red-900 bg-opacity-50 p-4 rounded-lg">
                <p className="text-red-300">{internalError}</p>
              </div>
            )}
            
            <div className="mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-24 w-24 text-blue-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <h3 className="text-white text-xl font-bold mb-2">Photographie le document</h3>
              {/* <p className="text-gray-300 mb-2">L'image sera automatiquement optimisée pour réduire le temps d'envoi</p> */}
            </div>
            
            <label className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg cursor-pointer hover:bg-blue-700 transition-colors w-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Prendre une photo
              <input 
                type="file" 
                accept="image/*"
                capture="environment"
                className="hidden"
                onChange={handleFileInput} 
              />
            </label>
            
            <div className="mt-4">
              <label className="inline-flex items-center justify-center px-6 py-3 bg-gray-700 text-white font-medium rounded-lg cursor-pointer hover:bg-gray-600 transition-colors w-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                Choisir une image existante
                <input 
                  type="file" 
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileInput} 
                />
              </label>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentScannerOverlay;
