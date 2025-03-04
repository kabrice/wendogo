'use client'; 
import { useState, useRef, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import NnamAi2 from "../../assets/nnam_ai/nnam_ai_2.webp";
import Image from 'next/image';
import {uploadToDriveApi, useDeleteFileMutation} from '../../store/apis/uploadToDriveApi';
import { useSelector } from 'react-redux'
import SEDropDownList from '../../components/SimulationEngine/SEDropDownList'; 
import ButtonLarge from '../../components/ButtonLarge';
import imageCompression from 'browser-image-compression';
import { PDFDocument } from 'pdf-lib';
import SESmallAlertMessage from '../../components/SimulationEngine/SESmallAlertMessage';
import { Loader2 } from "lucide-react"; 
import DocumentScannerOverlay from './DocumentScannerOverlay';
import MobileAwareFilePreview from './MobileAwareFilePreview';



const DOCUMENTS_TO_UPLOAD = [
    { id: '0', name: 'Relevé de notes le plus récent'},
    { id: '1', name: 'Relevé de notes de l\'année N-1'},
    { id: '2', name: 'Relevé de notes de l\'année N-2'},
    { id: '3', name: 'Relevé de notes du Baccalauréat'}
];

const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(false);
    
    useEffect(() => {
      const checkMobile = () => {
        const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        );
        setIsMobile(mobile);
      };
      
      checkMobile();
      window.addEventListener('resize', checkMobile);
      
      return () => {
        window.removeEventListener('resize', checkMobile);
      };
    }, []);
    
    return isMobile;
  };

  
const LoadFilesModal = ({ type, isOpen, onClose }) => {
    
    const user = useSelector((state) => state.user);
    const [isExpanded, setIsExpanded] = useState(false);
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const fileInputRef = useRef(null);
    const [uploadFile] = uploadToDriveApi.useUploadFileMutation();
    const [deleteFile] = useDeleteFileMutation();
    const DEFAULT_LANGUAGE = { id: '0', name: 'Relevé de notes le plus récent'};
    const newRef = useRef(null);
    const [selectedBulletin, setSelectedBulletin] = useState(DEFAULT_LANGUAGE);
    const [collapseBulletinOption, setCollapseBulletinOption] = useState(true);
    const [fieldDefault, setFieldDefault] = useState(true);
    const [showError, setShowError] = useState(false);
    const selectedBulletinRef = useRef(selectedBulletin);
    const [isUploading, setIsUploading] = useState(false);

    const isMobile = useIsMobile();
    const [cameraActive, setCameraActive] = useState(false);
    const cameraInputRef = useRef(null);
    const [showRessource, setShowRessource] = useState(true);
    const [previewFile, setPreviewFile] = useState(null);
    const [previewModalOpen, setPreviewModalOpen] = useState(false);
    

    // 2. In your LoadFilesModal, add state for document scanning
    const [scannerVisible, setScannerVisible] = useState(false);
    //if (!isOpen) return null;
    const handleCloseModal = () => {
        onClose();
    };

    // 3. Add methods to handle scanner
    const openDocumentScanner = () => {
        // Make sure a document type is selected before opening the scanner
        console.log('openDocumentScanner', selectedBulletin)
        if (!selectedBulletin || !selectedBulletin.id) {
          setShowError(true);
          setTimeout(() => setShowError(false), 3000);
          return;
        }
        
        setScannerVisible(true);
      };

    const closeDocumentScanner = () => {
    setScannerVisible(false);
    };

    // Update your handleDocumentCapture to use the enhancement
    const handleDocumentCapture = async (file, documentTypeId = null) => {
        try {
          // Get correct document type ID
          const docTypeId = documentTypeId || selectedBulletinRef.current?.id || 0;
          
          // Check if this document type is already uploaded
          const isFileAlreadyUploaded = uploadedFiles.some(file => file.id === docTypeId);
          
          if (isFileAlreadyUploaded) {
            // Show the same error as on desktop
            setShowError(true);
            setTimeout(() => setShowError(false), 3000);
            return;
          }
          
          // Show loading state
          setIsUploading(true);
          
          // Process the file
          handleFileUpload(file, docTypeId);
        } catch (error) {
          console.error('Error processing document:', error);
        } finally {
          setScannerVisible(false);
        }
      };

    const handleShowRessource = (isShown) => {
        setShowRessource(isShown);
    };

    // Function to handle camera capture
    const handleCameraCapture = (event) => {
        if (event.target.files && event.target.files[0]) {
        const file = event.target.files[0];
        
        // Process the captured image like any other uploaded file
        handleFileUpload(file, selectedBulletinRef.current?.id || 0);
        
        // Reset the input to allow capturing again
        event.target.value = '';
        }
    };

    const openCamera = () => {
        if (cameraInputRef.current) {
          cameraInputRef.current.click();
        }
      };

  // New mobile-friendly UI for the document upload area
  const renderMobileUploadUI = () => (
        <div className="flex flex-col items-center">
        <div className="mb-4 text-center">
            <p className="font-medium text-lg mb-2 text-center" >Ajoute tes documents</p>
            <p className="text-sm text-gray-500">Prends une photo ou importe un fichier</p>
        </div>
        
        <div className="flex flex-row gap-4 w-full justify-center mb-6">
            {/* Camera button */}
            <button
            onClick={openDocumentScanner} // Changed from openCamera
            className="flex flex-col items-center justify-center w-32 h-32 rounded-xl bg-blue-50 border-2 border-blue-200"
            >
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500 mb-2">
                <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"></path>
                <circle cx="12" cy="13" r="3"></circle>
            </svg>
            <span className="text-sm font-medium">Scanner un document</span>
            </button>

            
            {/* File upload button */}
            {/* <button 
            onClick={() => fileInputRef.current?.click()}
            className="flex flex-col items-center justify-center w-32 h-32 rounded-xl bg-blue-50 border-2 border-blue-200"
            >
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500 mb-2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="17 8 12 3 7 8"></polyline>
                <line x1="12" y1="3" x2="12" y2="15"></line>
            </svg>
            <span className="text-sm font-medium">Galerie</span>
            </button> */}
        </div>
        
        {/* Hidden camera input */}
        <input
            ref={cameraInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={handleCameraCapture}
        />
        
        {/* Standard file input (already in your code) */}
        <input 
            ref={fileInputRef}
            type="file"
            accept="application/pdf,image/jpeg,image/jpg,image/png"
            className="hidden"
            onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
                handleFileUpload(e.target.files[0], selectedBulletinRef.current?.id || 0);
                e.target.value = '';
            }
            }}
        />
        </div>
    );      

    const updateSelectedBulletin = (item) => {
        console.log('😅 Updating selectedBulletin with:', item);
        const isFileAlreadyUploaded = uploadedFiles.some(file => file.id === item.id);
    
        if (isFileAlreadyUploaded) {
            setShowError(true);
            setTimeout(() => setShowError(false), 3000);
            return;
        }
    
        setSelectedBulletin({ ...item, validated: true });
        //setSelectedBulletin((prev) => ({ ...prev, item }));
        selectedBulletinRef.current = { ...item, validated: true };
        console.log('🥶 selectedBulletin ', selectedBulletin, { ...item, validated: true })
        setCollapseBulletinOption(true);
        setFieldDefault(false);
    };
    

    useEffect(() => {
        console.log("🔥 selectedBulletin updated: ", selectedBulletin);
    }, [selectedBulletin]); // This runs whenever selectedBulletin changes

    
    const toggleReadMore = () => {
        setIsExpanded(!isExpanded);
    };

    const getFileLabel = (index) => {
        //console.log('😤 ', index, type)
        if (type === 'bulletin') {
            //console.log('xxx 😤 ', index, type)
            switch (parseInt(index)) {
                case 0: return 'N';
                case 1: return 'N-1';
                case 2: return 'N-2';
                case 3: return 'BAC';
                default: return `DOC`;
            }
        }else{
            return `DOC`;
        }
        //r
    };
 

    
    // 2. Helper function for generating smaller preview thumbnails
    const generateThumbnail = async (file) => {
        if (!file.type.startsWith('image/')) {
        // For non-images, return a placeholder or icon
        return null;
        }
        
        try {
        const options = {
            maxSizeMB: 0.05, // 50KB max
            maxWidthOrHeight: 200,
            useWebWorker: true,
            fileType: 'image/jpeg',
            initialQuality: 0.5
        };
        
        return await imageCompression(file, options);
        } catch (error) {
        console.error('Thumbnail generation error:', error);
        return null;
        }
    };

    const compressFile = async (file) => {
        const MAX_SIZE_KB = 2000;
        const fileType = file.type;
        const fileName = file.name;
        const fileExt = fileName.split('.').pop().toLowerCase();
        
        try {
          // For images
          if (fileType.startsWith('image/')) {
            const options = {
              maxSizeMB: MAX_SIZE_KB / 1024,
              maxWidthOrHeight: 1200,
              useWebWorker: true,
              fileType: fileType 
            };
            
            const compressedFile = await imageCompression(file, options);
            
            if (compressedFile.size > MAX_SIZE_KB * 1024) {
              throw new Error('Still exceeds 500KB after compression');
            }
            
            return new File([compressedFile], fileName, { type: fileType });
          }
          
          // For PDFs
          else if (fileType === 'application/pdf') {
            const arrayBuffer = await file.arrayBuffer();
            const pdfDoc = await PDFDocument.load(arrayBuffer);
            
            // Try different compression levels
            let compressedPdf;
            const compressionOptions = [
              { quality: 0.5 },
              { quality: 0.3 },
              { quality: 0.1 }
            ];
            
            for (const options of compressionOptions) {
              compressedPdf = await pdfDoc.save(options);
              if (compressedPdf.byteLength <= MAX_SIZE_KB * 1024) {
                break;
              }
            }
            console.log('😘 xxx', compressedPdf.byteLength, MAX_SIZE_KB * 1024 )
            if (compressedPdf.byteLength > MAX_SIZE_KB * 1024) {
              throw new Error('PDF still exceeds 500KB after compression');
            }
            
            return new File([compressedPdf], file.name, { type: 'application/pdf' });
          }
          
          // Unsupported file types
          else {
            throw new Error(`Cannot compress files of type ${fileType}`);
          }
        } catch (error) {
          console.error('Compression error:', error);
          throw new Error('Unable to compress file to 500KB. Please provide a smaller file.');
        }
      };
  
    const handleDeleteFile = async (fileId, fileIndex) => {
        try {
            // Show loading indicator if needed
            setIsUploading(true);
            console.log('😅 fileId ', fileId, fileIndex);
            const response = await deleteFile({
            file_id: fileId,
            user_id: user?.userId || '0',
            file_index: fileIndex
            });
            
            if (response.data?.success) {
            // Remove file from uploadedFiles state
            setUploadedFiles(prev => prev.filter(file => file.id !== fileIndex));
            
            // Show success message if needed
            console.log('File marked as deleted successfully');
            } else {
            console.error('Error deleting file', response.error);
            }
        } catch (error) {
            console.error('Delete error:', error);
        } finally {
            setIsUploading(false);
        }
    };      
    // Modify handleFileUpload to handle authentication
    const handleFileUpload = async (file, index) => {

        
        const isFileAlreadyUploaded = uploadedFiles.some(myFile => myFile.id ===  selectedBulletinRef.current.id);
        console.log('😅 selectedBulletin ', selectedBulletin)
        console.log('😅 selectedBulletinRef.current ', selectedBulletinRef.current)
        if (isFileAlreadyUploaded) {
            console.log('😅 😅😅 ' )
            setShowError(true);
            setTimeout(() => setShowError(false), 3000); // Hide error after 3 seconds
            return;
        }

        if (!file) return;
        //xconsole.log('😍 user ', user);
        // File validation
        const maxSize = 5 * 1024 * 1024; // 5MB
        const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
        
        if (!allowedTypes.includes(file.type)) {
            alert('Type de fichier non supporté. Veuillez utiliser PDF, JPG, JPEG ou PNG.');
            return;
        }
    
        if (file.size > maxSize) {
            alert('Le fichier est trop volumineux. Taille maximum: 5Mo');
            return;
        }
        console.log('uploadedFiles ', uploadedFiles, file)
        if (type === 'bulletin' && uploadedFiles.length >= 4) {
            alert('Vous ne pouvez pas télécharger plus de 4 documents');
            return;
        }
        const compressedFile = await compressFile(file);
        const formData = new FormData();
        formData.append('file', compressedFile);
        formData.append('user_id', user?.userId || '0');  // Send User ID
        formData.append('file_index', selectedBulletinRef.current?.id || index); ;  // Send file type index
    
        try {
            setUploadProgress(0);
            const xhr = new XMLHttpRequest();
            
            // Add timeout
            xhr.timeout = 120000;
            setIsUploading(true);
                 // Force progress tracking
        xhr.upload.addEventListener("progress", function(event) {
            console.log("Progress event:", event);
            if (event.lengthComputable) {
                const percentComplete = Math.round((event.loaded / event.total) * 100);
                console.log(`Upload progress: ${percentComplete}%`);
                setUploadProgress(percentComplete);
            } else {
                // Fallback for when lengthComputable is false
                console.log("Progress not computable");
                // Simulate progress based on time
                const startTime = Date.now();
                const interval = setInterval(() => {
                    const elapsed = Date.now() - startTime;
                    const simulatedProgress = Math.min(95, Math.round(elapsed / 100));
                    setUploadProgress(simulatedProgress);
                    if (simulatedProgress >= 95) clearInterval(interval);
                }, 100);
            }
        });
        
        xhr.onload = async function() {
            if (this.status === 200) {
                const response = JSON.parse(xhr.responseText);

                // Generate thumbnail if it's an image
                let thumbnail = null;
                if (file.type.startsWith('image/')) {
                    try {
                        thumbnail = await generateThumbnail(file);
                    } catch (error) {
                        console.error('Failed to generate thumbnail:', error);
                    }
                }

                setUploadedFiles(prev => [...prev, { 
                    name: response.name, 
                    id: response.file_type_index,
                    file_id: response.file_id ,
                    thumbnail: thumbnail ? URL.createObjectURL(thumbnail) : null
                }]);
                setUploadProgress(100);
                setTimeout(() => setUploadProgress(0), 1000);
                setIsUploading(false);
            } else {
                console.error("Upload failed with status:", this.status);
                setUploadProgress(0);
            }
        };
        
        xhr.onerror = function() {
            console.error("Network error during upload");
            setUploadProgress(0);
        };
        //phone : http://192.168.1.191:5000
        //pc : http://localhost:5000
        xhr.open("POST", "http://192.168.1.191:5000/api/upload-to-drive");
        xhr.withCredentials = true;
        
        // Create and send form data
        const formData = new FormData();
        formData.append('file', await compressFile(file));
        formData.append('user_id', user?.userId || '0');
        formData.append('file_index', selectedBulletinRef.current?.id || index);
        
        xhr.send(formData);
        } catch (error) {
            console.error('Upload error:', error);
            setUploadProgress(0);
        }
    };

    const toggleBulletinDropdown = useCallback(() => {
        setCollapseBulletinOption(prev => !prev);
    }, []);


    const onDrop = useCallback((acceptedFiles) => {
        if (acceptedFiles?.length) {
            const file = acceptedFiles[0]; // Only allow one file at a time
    
            // Get the index based on the number of uploaded files
            const index = uploadedFiles.length; // 0 for first file, 1 for second, etc.
            console.log('uploadedFiles', uploadedFiles)
            handleFileUpload(file, index); // Pass both file and index
        }
    }, [uploadedFiles]);
    

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: {
            'application/pdf': ['.pdf'],
            'image/jpeg': ['.jpg', '.jpeg'],
            'image/png': ['.png']
        },
        multiple: false
    });
 
    // 6. Add image enhancement utility (optional but helpful for document scans)
    const enhanceDocumentImage = async (file) => {
        return new Promise((resolve) => {
          // Use window.Image instead of Image to avoid Next.js Image component conflict
          const img = new window.Image();
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          
          img.onload = () => {
            // Set canvas size to match image
            canvas.width = img.width;
            canvas.height = img.height;
            
            // Draw original image
            ctx.drawImage(img, 0, 0);
            
            // Get image data for processing
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;
            
            // Simple document enhancement:
            // 1. Increase contrast
            // 2. Adjust brightness
            // 3. Desaturate slightly to improve text readability
            for (let i = 0; i < data.length; i += 4) {
              // Apply contrast and brightness adjustment
              const contrast = 1.3; // Increase contrast
              const brightnessAdjust = -0.1; // Slightly darker
              
              // Apply contrast
              data[i] = Math.max(0, Math.min(255, ((data[i] / 255 - 0.5) * contrast + 0.5 + brightnessAdjust) * 255));
              data[i + 1] = Math.max(0, Math.min(255, ((data[i + 1] / 255 - 0.5) * contrast + 0.5 + brightnessAdjust) * 255));
              data[i + 2] = Math.max(0, Math.min(255, ((data[i + 2] / 255 - 0.5) * contrast + 0.5 + brightnessAdjust) * 255));
            }
            
            // Put the modified data back
            ctx.putImageData(imageData, 0, 0);
            
            // Convert to file
            canvas.toBlob((blob) => {
              if (blob) {
                const enhancedFile = new File([blob], file.name, { type: 'image/jpeg' });
                resolve(enhancedFile);
              } else {
                resolve(file); // Fallback to original if enhancement fails
              }
            }, 'image/jpeg', 0.85);
          };
          
          img.onerror = () => {
            resolve(file); // Return original file if there's an error
          };
          
          // Load the image from the file
          const reader = new FileReader();
          reader.onload = (e) => {
            img.src = e.target.result;
          };
          reader.readAsDataURL(file);
        });
      };
      
    const handlePreviewFile = (fileId, fileName) => {
    setPreviewFile({
        id: fileId,
        name: fileName,
        url: `http://192.168.1.191:5000/api/preview-file/${fileId}`
    });
    setPreviewModalOpen(true);
    };

    return (
            <div className="wmf_FS2jCc1rkHzMTvdV qF3rOWTFx0tveHrt7oem">
                <div className="RUxnLrT4LB6KEAxyxIoE Dialog-sc-nb18w0-0 ipWxWu occFPVx0kmZ9ufkhr4G7" tabIndex={-1} role="dialog" aria-label="" aria-modal="true">
                    <div role="presentation" tabIndex={0}>
                        <div className="Content-sc-1rmn41a-2 cTjinj">
                            {/* <div className="DragZone-sc-1rmn41a-6 cYsRQM 1318fc9c">
                                <div className="DragZoneContent-sc-1rmn41a-7 jpIrjT">
                                    <svg xmlns="http://www.w3.org/2000/svg" width={64} height={64} viewBox="0 0 64 64">
                                        <defs>
                                            <path id="25acdc0" d="M0,1.36C0,.61,.61,0,1.36,0H22.72c.32,0,.63,.11,.88,.32l3.16,2.67h0s3.36,2.89,3.36,2.89c.3,.26,.48,.64,.48,1.04v30.32c0,.75-.61,1.36-1.36,1.36H1.36c-.75,0-1.36-.61-1.36-1.36V1.36Z" className="Sheet-sc-21s4i0-1 KCzgY" /> </defs>
                                        <g className="Docs-sc-21s4i0-3 kveyCN">
                                            <use xlinkHref="#25acdc0" />
                                            <path d="M22.93,10.69h-3.19l-1.41-2.44c-.07-.15-.22-.15-.3-.15h-4.15c-.15,0-.3,.07-.3,.15l-1.41,2.44h-3.19c-1.11,0-2,.89-2,2v7.78c0,1.11,.89,2,2,2h14c1.11,0,2-.89,2-2v-7.85c-.07-1.04-.96-1.93-2.07-1.93Zm-6.96,9.41c-2.15,0-3.85-1.7-3.85-3.85s1.7-3.85,3.85-3.85,3.85,1.7,3.85,3.85-1.7,3.85-3.85,3.85Z" className="Marker-sc-21s4i0-0 hkPMPk" />
                                            <path d="M10.37,32.99h-1.41v-1.06h1.41c.19,0,.35-.03,.47-.1,.12-.07,.21-.16,.26-.27,.06-.12,.09-.25,.09-.39,0-.16-.03-.3-.09-.43-.05-.13-.14-.24-.26-.32-.12-.08-.28-.12-.47-.12h-.9v4.63h-1.37v-5.69h2.27c.46,0,.85,.08,1.18,.25,.33,.17,.58,.4,.76,.69,.18,.29,.27,.62,.27,.99s-.09,.69-.27,.96c-.18,.27-.43,.49-.76,.64-.33,.15-.72,.23-1.18,.23Zm7.85-3.76v5.69h-1.37l-2.01-3.54v3.54h-1.37v-5.69h1.37l2.01,3.54v-3.54h1.37Zm5.68,2.65v2.34c-.1,.11-.24,.22-.45,.34-.2,.12-.45,.22-.75,.31-.3,.09-.66,.13-1.07,.13-.38,0-.72-.06-1.03-.18-.31-.12-.57-.3-.79-.54-.22-.24-.39-.53-.51-.87-.12-.34-.18-.74-.18-1.18v-.32c0-.44,.06-.84,.18-1.18,.12-.34,.29-.63,.5-.87,.22-.24,.48-.42,.77-.54,.3-.12,.62-.18,.98-.18,.52,0,.95,.08,1.28,.25,.33,.16,.58,.39,.75,.68,.17,.29,.27,.62,.31,1h-1.32c-.03-.19-.08-.35-.15-.48-.07-.13-.17-.23-.3-.3-.13-.07-.3-.11-.52-.11-.16,0-.31,.04-.45,.11-.13,.07-.25,.18-.34,.32-.09,.14-.17,.32-.22,.53-.05,.21-.07,.46-.07,.75v.32c0,.28,.02,.53,.07,.75,.05,.21,.12,.39,.22,.54,.1,.14,.22,.25,.38,.32,.15,.07,.33,.11,.54,.11,.15,0,.27-.01,.38-.04,.1-.03,.19-.06,.26-.09,.07-.04,.12-.08,.16-.11v-.88h-.95v-.94h2.32Z" className="Title-sc-21s4i0-2 fPcuGZ" /> </g>
                                        <g className="Jpg-sc-21s4i0-4 jtaKXs">
                                            <use xlinkHref="#25acdc0" />
                                            <path d="M6.92,18.9l-2.72,5.26c-.18,.35,.07,.76,.46,.76H25.96c.39,0,.64-.42,.46-.76l-7.29-14.08c-.19-.37-.71-.38-.92-.02l-7.09,12.31c-.19,.33-.67,.35-.89,.03l-2.42-3.55c-.22-.33-.71-.3-.9,.05Zm3.68-10.98c0,1.88-1.52,3.4-3.4,3.4-1.88,0-3.4-1.52-3.4-3.4,0-1.88,1.52-3.4,3.4-3.4,1.88,0,3.4,1.52,3.4,3.4Z" className="Marker-sc-21s4i0-0 hkPMPk" />
                                            <path d="M10.36,32.43v-3.9s1.37,0,1.37,0v3.9c0,.38-.09,.71-.26,.99-.17,.28-.41,.49-.7,.65-.29,.15-.62,.23-.99,.23-.38,0-.72-.06-1.02-.19-.29-.13-.53-.32-.7-.59-.17-.27-.25-.6-.25-1.02h1.38c0,.19,.02,.34,.07,.45,.04,.11,.11,.18,.2,.23,.09,.04,.2,.06,.32,.06,.12,0,.23-.03,.32-.09,.09-.07,.16-.16,.2-.28,.05-.12,.07-.27,.07-.44Zm6.61-2.96c-.18-.29-.43-.52-.77-.69-.32-.17-.72-.25-1.17-.25h-2.27v5.69h1.37v-1.93h.9c.45,0,.85-.08,1.17-.23,.34-.15,.59-.37,.77-.64,.17-.27,.26-.59,.26-.96s-.09-.7-.26-.99Zm-1.21,1.39c-.06,.12-.14,.21-.26,.27-.12,.07-.28,.1-.47,.1h-.9v-1.64h.9c.19,0,.35,.04,.47,.12s.2,.19,.26,.32c.06,.14,.08,.28,.08,.44,0,.14-.02,.27-.08,.39Zm7.02,.32v2.34c-.1,.11-.24,.22-.45,.34-.2,.12-.45,.22-.75,.31-.3,.09-.66,.13-1.07,.13-.38,0-.72-.06-1.03-.18-.31-.12-.57-.3-.79-.54-.22-.24-.39-.53-.51-.87-.12-.34-.18-.74-.18-1.18v-.32c0-.44,.06-.84,.18-1.18,.12-.34,.29-.63,.5-.87,.22-.24,.48-.42,.77-.54,.3-.12,.62-.18,.98-.18,.52,0,.95,.08,1.28,.25,.33,.16,.58,.39,.75,.68,.17,.29,.27,.62,.31,1h-1.32c-.03-.19-.08-.35-.15-.48-.07-.13-.17-.23-.3-.3-.13-.07-.3-.11-.52-.11-.16,0-.31,.04-.45,.11-.13,.07-.25,.18-.34,.32-.09,.14-.17,.32-.22,.53-.05,.21-.07,.46-.07,.75v.32c0,.28,.02,.53,.07,.75,.05,.21,.12,.39,.22,.54,.1,.14,.22,.25,.38,.32,.15,.07,.33,.11,.54,.11,.15,0,.27-.01,.38-.04,.1-.03,.19-.06,.26-.09,.07-.04,.12-.08,.16-.11v-.88h-.95v-.94h2.32Z" className="Title-sc-21s4i0-2 fPcuGZ" /> </g>
                                        <g className="Pdf-sc-21s4i0-5 kNenGc">
                                            <use xlinkHref="#25acdc0" />
                                     t       <path d="M25.61,16.57c-1.62-1.68-6.03-.99-7.08-.87-1.55-1.49-2.61-3.29-2.98-3.91,.56-1.68,.93-3.36,.99-5.16,0-1.55-.62-3.23-2.36-3.23-.62,0-1.18,.37-1.49,.87-.75,1.3-.43,3.91,.75,6.59-.68,1.93-1.3,3.79-3.04,7.08-1.8,.75-5.59,2.49-5.9,4.35-.12,.56,.06,1.12,.5,1.55,.43,.37,.99,.56,1.55,.56,2.3,0,4.54-3.17,6.09-5.84,1.3-.43,3.36-1.06,5.41-1.43,2.42,2.11,4.54,2.42,5.65,2.42,1.49,0,2.05-.62,2.24-1.18,.31-.62,.12-1.3-.31-1.8Zm-1.55,1.06c-.06,.43-.62,.87-1.62,.62-1.18-.31-2.24-.87-3.17-1.62,.81-.12,2.61-.31,3.91-.06,.5,.12,.99,.44,.87,1.06ZM13.68,4.83c.12-.19,.31-.31,.5-.31,.56,0,.68,.68,.68,1.24-.06,1.3-.31,2.61-.75,3.85-.93-2.49-.75-4.22-.43-4.78Zm-.12,12.05c.5-.99,1.18-2.73,1.43-3.48,.56,.93,1.49,2.05,1.99,2.55,0,.06-1.93,.43-3.42,.93Zm-3.67,2.49c-1.43,2.36-2.92,3.85-3.73,3.85-.12,0-.25-.06-.37-.12-.19-.12-.25-.31-.19-.56,.19-.87,1.8-2.05,4.29-3.17Z" className="Marker-sc-21s4i0-0 hkPMPk" />
                                            <path d="M11.75,29.55c-.18-.3-.43-.53-.76-.69-.33-.17-.72-.25-1.18-.25h-2.27v5.69h1.37v-1.93h.9c.46,0,.85-.08,1.18-.23s.58-.37,.76-.64c.17-.27,.26-.59,.26-.96s-.09-.71-.26-.99Zm-1.21,1.39c-.05,.11-.14,.2-.26,.27-.12,.06-.28,.1-.47,.1h-.9v-1.64h.9c.19,0,.35,.04,.47,.12,.12,.08,.21,.19,.26,.32,.06,.13,.09,.28,.09,.44,0,.14-.03,.27-.09,.39Zm6.64-.71c-.13-.33-.31-.62-.55-.86-.23-.24-.51-.43-.83-.56-.32-.14-.68-.2-1.06-.2h-1.83v5.69h1.85c.38,0,.73-.07,1.05-.2s.59-.32,.83-.56c.23-.24,.41-.53,.54-.87,.13-.33,.2-.7,.2-1.1v-.24c0-.4-.07-.77-.2-1.1Zm-1.2,1.34c0,.37-.05,.67-.15,.92-.09,.25-.23,.44-.41,.56-.18,.13-.4,.19-.66,.19h-.48v-3.57h.46c.2,0,.38,.03,.53,.1,.16,.07,.29,.18,.39,.32,.11,.14,.18,.31,.24,.52,.05,.2,.08,.44,.08,.72v.24Zm3.64-1.9v1.31h2.21v1.05h-2.21v2.27h-1.37v-5.69h3.81v1.06h-2.44Z" className="Title-sc-21s4i0-2 fPcuGZ" /> </g>
                                    </svg>
                                    <p>Glissez vos documents ici</p>
                                </div>
                            </div> */} 
                            <header className="Header-sc-1rmn41a-12 hYmEIh">
                                <div>
                                    <button type="button" className="ButtonClose-sc-1rmn41a-1 ewKyut" onClick={handleCloseModal}> Fermer </button>
                                    <div className="Title-sc-1rmn41a-18 fmqeSR"> Tes derniers relevés de notes </div>
                                </div>
                                {/* <p>Ton relevé de notes le plus récent.</p> */}
                                
                                {/* {'selectedBulletin ' + selectedBulletin.id} */}
                                <SEDropDownList  
                                        newRef={newRef}
                                        forModal= {true}
                                        tip="Choisis un relevé de notes à ajouter."
                                        showTip = {true} 
                                        collapseOption={collapseBulletinOption}
                                        fieldDefault={fieldDefault}
                                        items={DOCUMENTS_TO_UPLOAD}
                                        itemSelected={selectedBulletin}
                                        toggleDropdown={toggleBulletinDropdown}
                                        updateSelected={updateSelectedBulletin}
                                        inputGroupBlockTitle = {true}
                                    />
                                    {showError && <SESmallAlertMessage 
                                                        width='68%'
                                                        type="error" 
                                                        content={"Document déjà ajouté. Veuillez en choisir un autre relevé."} />}
                                    <div className="MoreTitle-sc-1rmn41a-17 kcaXaV">
                                    <span> Ajoute tes notes et laisse Wendy AI s'occuper du reste. </span> 
                                    <span>
                                        <button type="button" className="MoreButton-sc-1rmn41a-14 lncohh" onClick={toggleReadMore}> 
                                            {isExpanded ? ' Lire moins' : ' Lire plus'}
                                            <svg 
                                                height={16} 
                                                viewBox="0 0 16 16" 
                                                width={16} 
                                                xmlns="http://www.w3.org/2000/svg" 
                                                fill="currentColor" 
                                                className="MoreButtonArrow-sc-1rmn41a-15 eqOlwj"
                                                style={{ transform: isExpanded ? 'rotate(0deg)' : 'rotate(180deg)', transition: 'transform 0.3s ease' }}
                                            >
                                                <path d="M1.94,10.14l1.29,1.3L7.44,7.16l4.2,4.28,1.3-1.3L7.44,4.56Z" /> 
                                            </svg>
                                        </button>
                                    </span>
                                </div>
                                <div 
                                    className="MegaTip MegaTip-onboarding"
                                    style={{
                                        opacity: isExpanded ? 1 : 0,
                                        backgroundColor: '#e4f4ff',
                                        maxHeight: isExpanded ? '500px' : '0', 
                                        overflow: 'hidden',
                                        marginTop: isExpanded ? 'inherit' : '-60px',
                                        transition: 'all 0.3s ease-in-out',
                                        transform: isExpanded ? 'translateY(0)' : 'translateY(-20px)',
                                    }} >
                                    <div className="MegaTip-icon">
                                        <Image alt="NnamAi2" loading="lazy" src={NnamAi2} width={100} height={'auto'}/>
                                    </div>
                                    <div className="MegaTip-content">
                                        <div className="Stack  stackColumn " style={{ flexDirection: "column", padding: 0, alignItems: "stretch", justifyContent: "center" }}>
                                        <div className="Stack-child  " style={{ paddingTop: 8 }}>
                                            <div className="Heading s isWeak  MegaTip-title">
                                            <div className="Stack  stackColumn " style={{ flexDirection: "column", padding: 0, alignItems: "stretch" }}>
                                                <div className="Stack-child  " style={{ paddingTop: 8 }}>Gagne un temps fou avec Wendy AI :</div>
                                            </div>
                                            </div>
                                        </div>
                                        <div className="Stack-child  " style={{ paddingTop: 8 }}>
                                            <div className="MegaTip-text">
                                            <ul style={{ margin: 0, paddingLeft: 25, color: "rgb(127, 148, 169)" }}>
                                                <li>✓ Une fois tes relevés de notes ajoutés, elle préremplira tout.  </li>
                                                <li>✓ Il ne te restera qu'à vérifier.</li>
                                                <li>✓ Elle te permettra donc d'optimiser tes résultats en un clin d'oeil.</li>
                                            </ul>
                                            {/* <p>Les dates de candidatures 2024 pour Campus France debutent en Novembre...</p> */}
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </header>
                            {uploadedFiles.length === 0 && (isUploading ?
                                 <div className="flex items-center justify-center min-h-[200px]">
                                 <Loader2 className="w-8 h-8 animate-spin" />
                             </div> : (isMobile ? ( renderMobileUploadUI() ) :
                            <div className={`Area-sc-rou6nh-0 bLPMBS 1318fc9c ${isDragging ? 'border-blue-500 bg-blue-50' : ''}`} {...getRootProps()}>
                                <svg xmlns="http://www.w3.org/2000/svg" width={64} height={64} viewBox="0 0 64 64" className="DocumentIcon-sc-rou6nh-3 hzTQZo">
                                    <defs>
                                        <path id="d84bea4a" d="M0,1.36C0,.61,.61,0,1.36,0H22.72c.32,0,.63,.11,.88,.32l3.16,2.67h0s3.36,2.89,3.36,2.89c.3,.26,.48,.64,.48,1.04v30.32c0,.75-.61,1.36-1.36,1.36H1.36c-.75,0-1.36-.61-1.36-1.36V1.36Z" className="Sheet-sc-21s4i0-1 KCzgY" /> </defs>
                                    <g className="Docs-sc-21s4i0-3 kveyCN">
                                        <use xlinkHref="#d84bea4a" />
                                        <path d="M22.93,10.69h-3.19l-1.41-2.44c-.07-.15-.22-.15-.3-.15h-4.15c-.15,0-.3,.07-.3,.15l-1.41,2.44h-3.19c-1.11,0-2,.89-2,2v7.78c0,1.11,.89,2,2,2h14c1.11,0,2-.89,2-2v-7.85c-.07-1.04-.96-1.93-2.07-1.93Zm-6.96,9.41c-2.15,0-3.85-1.7-3.85-3.85s1.7-3.85,3.85-3.85,3.85,1.7,3.85,3.85-1.7,3.85-3.85,3.85Z" className="Marker-sc-21s4i0-0 hkPMPk" />
                                        <path d="M10.37,32.99h-1.41v-1.06h1.41c.19,0,.35-.03,.47-.1,.12-.07,.21-.16,.26-.27,.06-.12,.09-.25,.09-.39,0-.16-.03-.3-.09-.43-.05-.13-.14-.24-.26-.32-.12-.08-.28-.12-.47-.12h-.9v4.63h-1.37v-5.69h2.27c.46,0,.85,.08,1.18,.25,.33,.17,.58,.4,.76,.69,.18,.29,.27,.62,.27,.99s-.09,.69-.27,.96c-.18,.27-.43,.49-.76,.64-.33,.15-.72,.23-1.18,.23Zm7.85-3.76v5.69h-1.37l-2.01-3.54v3.54h-1.37v-5.69h1.37l2.01,3.54v-3.54h1.37Zm5.68,2.65v2.34c-.1,.11-.24,.22-.45,.34-.2,.12-.45,.22-.75,.31-.3,.09-.66,.13-1.07,.13-.38,0-.72-.06-1.03-.18-.31-.12-.57-.3-.79-.54-.22-.24-.39-.53-.51-.87-.12-.34-.18-.74-.18-1.18v-.32c0-.44,.06-.84,.18-1.18,.12-.34,.29-.63,.5-.87,.22-.24,.48-.42,.77-.54,.3-.12,.62-.18,.98-.18,.52,0,.95,.08,1.28,.25,.33,.16,.58,.39,.75,.68,.17,.29,.27,.62,.31,1h-1.32c-.03-.19-.08-.35-.15-.48-.07-.13-.17-.23-.3-.3-.13-.07-.3-.11-.52-.11-.16,0-.31,.04-.45,.11-.13,.07-.25,.18-.34,.32-.09,.14-.17,.32-.22,.53-.05,.21-.07,.46-.07,.75v.32c0,.28,.02,.53,.07,.75,.05,.21,.12,.39,.22,.54,.1,.14,.22,.25,.38,.32,.15,.07,.33,.11,.54,.11,.15,0,.27-.01,.38-.04,.1-.03,.19-.06,.26-.09,.07-.04,.12-.08,.16-.11v-.88h-.95v-.94h2.32Z" className="Title-sc-21s4i0-2 fPcuGZ" /> </g>
                                    <g className="Jpg-sc-21s4i0-4 jtaKXs">
                                        <use xlinkHref="#d84bea4a" />
                                        <path d="M6.92,18.9l-2.72,5.26c-.18,.35,.07,.76,.46,.76H25.96c.39,0,.64-.42,.46-.76l-7.29-14.08c-.19-.37-.71-.38-.92-.02l-7.09,12.31c-.19,.33-.67,.35-.89,.03l-2.42-3.55c-.22-.33-.71-.3-.9,.05Zm3.68-10.98c0,1.88-1.52,3.4-3.4,3.4-1.88,0-3.4-1.52-3.4-3.4,0-1.88,1.52-3.4,3.4-3.4,1.88,0,3.4,1.52,3.4,3.4Z" className="Marker-sc-21s4i0-0 hkPMPk" />
                                        <path d="M10.36,32.43v-3.9s1.37,0,1.37,0v3.9c0,.38-.09,.71-.26,.99-.17,.28-.41,.49-.7,.65-.29,.15-.62,.23-.99,.23-.38,0-.72-.06-1.02-.19-.29-.13-.53-.32-.7-.59-.17-.27-.25-.6-.25-1.02h1.38c0,.19,.02,.34,.07,.45,.04,.11,.11,.18,.2,.23,.09,.04,.2,.06,.32,.06,.12,0,.23-.03,.32-.09,.09-.07,.16-.16,.2-.28,.05-.12,.07-.27,.07-.44Zm6.61-2.96c-.18-.29-.43-.52-.77-.69-.32-.17-.72-.25-1.17-.25h-2.27v5.69h1.37v-1.93h.9c.45,0,.85-.08,1.17-.23,.34-.15,.59-.37,.77-.64,.17-.27,.26-.59,.26-.96s-.09-.7-.26-.99Zm-1.21,1.39c-.06,.12-.14,.21-.26,.27-.12,.07-.28,.1-.47,.1h-.9v-1.64h.9c.19,0,.35,.04,.47,.12s.2,.19,.26,.32c.06,.14,.08,.28,.08,.44,0,.14-.02,.27-.08,.39Zm7.02,.32v2.34c-.1,.11-.24,.22-.45,.34-.2,.12-.45,.22-.75,.31-.3,.09-.66,.13-1.07,.13-.38,0-.72-.06-1.03-.18-.31-.12-.57-.3-.79-.54-.22-.24-.39-.53-.51-.87-.12-.34-.18-.74-.18-1.18v-.32c0-.44,.06-.84,.18-1.18,.12-.34,.29-.63,.5-.87,.22-.24,.48-.42,.77-.54,.3-.12,.62-.18,.98-.18,.52,0,.95,.08,1.28,.25,.33,.16,.58,.39,.75,.68,.17,.29,.27,.62,.31,1h-1.32c-.03-.19-.08-.35-.15-.48-.07-.13-.17-.23-.3-.3-.13-.07-.3-.11-.52-.11-.16,0-.31,.04-.45,.11-.13,.07-.25,.18-.34,.32-.09,.14-.17,.32-.22,.53-.05,.21-.07,.46-.07,.75v.32c0,.28,.02,.53,.07,.75,.05,.21,.12,.39,.22,.54,.1,.14,.22,.25,.38,.32,.15,.07,.33,.11,.54,.11,.15,0,.27-.01,.38-.04,.1-.03,.19-.06,.26-.09,.07-.04,.12-.08,.16-.11v-.88h-.95v-.94h2.32Z" className="Title-sc-21s4i0-2 fPcuGZ" /> </g>
                                    <g className="Pdf-sc-21s4i0-5 kNenGc">
                                        <use xlinkHref="#d84bea4a" />
                                        <path d="M25.61,16.57c-1.62-1.68-6.03-.99-7.08-.87-1.55-1.49-2.61-3.29-2.98-3.91,.56-1.68,.93-3.36,.99-5.16,0-1.55-.62-3.23-2.36-3.23-.62,0-1.18,.37-1.49,.87-.75,1.3-.43,3.91,.75,6.59-.68,1.93-1.3,3.79-3.04,7.08-1.8,.75-5.59,2.49-5.9,4.35-.12,.56,.06,1.12,.5,1.55,.43,.37,.99,.56,1.55,.56,2.3,0,4.54-3.17,6.09-5.84,1.3-.43,3.36-1.06,5.41-1.43,2.42,2.11,4.54,2.42,5.65,2.42,1.49,0,2.05-.62,2.24-1.18,.31-.62,.12-1.3-.31-1.8Zm-1.55,1.06c-.06,.43-.62,.87-1.62,.62-1.18-.31-2.24-.87-3.17-1.62,.81-.12,2.61-.31,3.91-.06,.5,.12,.99,.44,.87,1.06ZM13.68,4.83c.12-.19,.31-.31,.5-.31,.56,0,.68,.68,.68,1.24-.06,1.3-.31,2.61-.75,3.85-.93-2.49-.75-4.22-.43-4.78Zm-.12,12.05c.5-.99,1.18-2.73,1.43-3.48,.56,.93,1.49,2.05,1.99,2.55,0,.06-1.93,.43-3.42,.93Zm-3.67,2.49c-1.43,2.36-2.92,3.85-3.73,3.85-.12,0-.25-.06-.37-.12-.19-.12-.25-.31-.19-.56,.19-.87,1.8-2.05,4.29-3.17Z" className="Marker-sc-21s4i0-0 hkPMPk" />
                                        <path d="M11.75,29.55c-.18-.3-.43-.53-.76-.69-.33-.17-.72-.25-1.18-.25h-2.27v5.69h1.37v-1.93h.9c.46,0,.85-.08,1.18-.23s.58-.37,.76-.64c.17-.27,.26-.59,.26-.96s-.09-.71-.26-.99Zm-1.21,1.39c-.05,.11-.14,.2-.26,.27-.12,.06-.28,.1-.47,.1h-.9v-1.64h.9c.19,0,.35,.04,.47,.12,.12,.08,.21,.19,.26,.32,.06,.13,.09,.28,.09,.44,0,.14-.03,.27-.09,.39Zm6.64-.71c-.13-.33-.31-.62-.55-.86-.23-.24-.51-.43-.83-.56-.32-.14-.68-.2-1.06-.2h-1.83v5.69h1.85c.38,0,.73-.07,1.05-.2s.59-.32,.83-.56c.23-.24,.41-.53,.54-.87,.13-.33,.2-.7,.2-1.1v-.24c0-.4-.07-.77-.2-1.1Zm-1.2,1.34c0,.37-.05,.67-.15,.92-.09,.25-.23,.44-.41,.56-.18,.13-.4,.19-.66,.19h-.48v-3.57h.46c.2,0,.38,.03,.53,.1,.16,.07,.29,.18,.39,.32,.11,.14,.18,.31,.24,.52,.05,.2,.08,.44,.08,.72v.24Zm3.64-1.9v1.31h2.21v1.05h-2.21v2.27h-1.37v-5.69h3.81v1.06h-2.44Z" className="Title-sc-21s4i0-2 fPcuGZ" /> </g>
                                </svg>
                                <input  {...getInputProps()} className="Input-sc-rou6nh-4 FmBHl" />
                                <div className="Content-sc-rou6nh-1 lfwYfG">
                                    <p className="Title-sc-rou6nh-5 kbIxcS"> <strong>Glisse</strong> ton document ici ou{" "} <em>clique pour choisir</em>. </p>
                                    <p className="Description-sc-rou6nh-2 iDNclM"> Fichiers acceptés&nbsp;: PDF, JPG, JPEG et PNG.
                                        <br /> Taille maximale 5&nbsp;Mo </p>
                                </div>
                            </div>))}
                            {uploadedFiles.length > 0 && (isUploading ?
                                 <div className="flex items-center justify-center min-h-[200px]">
                                 <Loader2 className="w-8 h-8 animate-spin" />
                             </div> : (isMobile ?  (
        <div className="flex justify-center my-4">
            <button
            onClick={openDocumentScanner} 
            className="mr-4 flex items-center justify-center px-4 py-2 rounded-lg bg-blue-50 border border-blue-200"
            >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500 mr-2">
                <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"></path>
                <circle cx="12" cy="13" r="3"></circle>
            </svg>
            <span>Photo</span>
            </button>
            {/* <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center justify-center px-4 py-2 rounded-lg bg-blue-50 border border-blue-200"
            >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500 mr-2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="17 8 12 3 7 8"></polyline>
                <line x1="12" y1="3" x2="12" y2="15"></line>
            </svg>
            <span>Fichier</span>
            </button> */}
        </div>
        )  :
                           <div className={`Area-sc-rou6nh-0 fHIYMd f8ab1031 ${isDragging ? 'border-blue-500 bg-blue-50' : ''}`} {...getRootProps()}>
                                <svg xmlns="http://www.w3.org/2000/svg" width={64} height={64} viewBox="0 0 64 64" className="DocumentIcon-sc-rou6nh-3 hzTQZo">
                                    <defs>
                                        <path id="fa20ae54" d="M0,1.36C0,.61,.61,0,1.36,0H22.72c.32,0,.63,.11,.88,.32l3.16,2.67h0s3.36,2.89,3.36,2.89c.3,.26,.48,.64,.48,1.04v30.32c0,.75-.61,1.36-1.36,1.36H1.36c-.75,0-1.36-.61-1.36-1.36V1.36Z" className="Sheet-sc-21s4i0-1 KCzgY" /> </defs>
                                    <g className="Docs-sc-21s4i0-3 kveyCN">
                                        <use xlinkHref="#fa20ae54" />
                                        <path d="M22.93,10.69h-3.19l-1.41-2.44c-.07-.15-.22-.15-.3-.15h-4.15c-.15,0-.3,.07-.3,.15l-1.41,2.44h-3.19c-1.11,0-2,.89-2,2v7.78c0,1.11,.89,2,2,2h14c1.11,0,2-.89,2-2v-7.85c-.07-1.04-.96-1.93-2.07-1.93Zm-6.96,9.41c-2.15,0-3.85-1.7-3.85-3.85s1.7-3.85,3.85-3.85,3.85,1.7,3.85,3.85-1.7,3.85-3.85,3.85Z" className="Marker-sc-21s4i0-0 hkPMPk" />
                                        <path d="M10.37,32.99h-1.41v-1.06h1.41c.19,0,.35-.03,.47-.1,.12-.07,.21-.16,.26-.27,.06-.12,.09-.25,.09-.39,0-.16-.03-.3-.09-.43-.05-.13-.14-.24-.26-.32-.12-.08-.28-.12-.47-.12h-.9v4.63h-1.37v-5.69h2.27c.46,0,.85,.08,1.18,.25,.33,.17,.58,.4,.76,.69,.18,.29,.27,.62,.27,.99s-.09,.69-.27,.96c-.18,.27-.43,.49-.76,.64-.33,.15-.72,.23-1.18,.23Zm7.85-3.76v5.69h-1.37l-2.01-3.54v3.54h-1.37v-5.69h1.37l2.01,3.54v-3.54h1.37Zm5.68,2.65v2.34c-.1,.11-.24,.22-.45,.34-.2,.12-.45,.22-.75,.31-.3,.09-.66,.13-1.07,.13-.38,0-.72-.06-1.03-.18-.31-.12-.57-.3-.79-.54-.22-.24-.39-.53-.51-.87-.12-.34-.18-.74-.18-1.18v-.32c0-.44,.06-.84,.18-1.18,.12-.34,.29-.63,.5-.87,.22-.24,.48-.42,.77-.54,.3-.12,.62-.18,.98-.18,.52,0,.95,.08,1.28,.25,.33,.16,.58,.39,.75,.68,.17,.29,.27,.62,.31,1h-1.32c-.03-.19-.08-.35-.15-.48-.07-.13-.17-.23-.3-.3-.13-.07-.3-.11-.52-.11-.16,0-.31,.04-.45,.11-.13,.07-.25,.18-.34,.32-.09,.14-.17,.32-.22,.53-.05,.21-.07,.46-.07,.75v.32c0,.28,.02,.53,.07,.75,.05,.21,.12,.39,.22,.54,.1,.14,.22,.25,.38,.32,.15,.07,.33,.11,.54,.11,.15,0,.27-.01,.38-.04,.1-.03,.19-.06,.26-.09,.07-.04,.12-.08,.16-.11v-.88h-.95v-.94h2.32Z" className="Title-sc-21s4i0-2 fPcuGZ" /> </g>
                                    <g className="Jpg-sc-21s4i0-4 jtaKXs">
                                        <use xlinkHref="#fa20ae54" />
                                        <path d="M6.92,18.9l-2.72,5.26c-.18,.35,.07,.76,.46,.76H25.96c.39,0,.64-.42,.46-.76l-7.29-14.08c-.19-.37-.71-.38-.92-.02l-7.09,12.31c-.19,.33-.67,.35-.89,.03l-2.42-3.55c-.22-.33-.71-.3-.9,.05Zm3.68-10.98c0,1.88-1.52,3.4-3.4,3.4-1.88,0-3.4-1.52-3.4-3.4,0-1.88,1.52-3.4,3.4-3.4,1.88,0,3.4,1.52,3.4,3.4Z" className="Marker-sc-21s4i0-0 hkPMPk" />
                                        <path d="M10.36,32.43v-3.9s1.37,0,1.37,0v3.9c0,.38-.09,.71-.26,.99-.17,.28-.41,.49-.7,.65-.29,.15-.62,.23-.99,.23-.38,0-.72-.06-1.02-.19-.29-.13-.53-.32-.7-.59-.17-.27-.25-.6-.25-1.02h1.38c0,.19,.02,.34,.07,.45,.04,.11,.11,.18,.2,.23,.09,.04,.2,.06,.32,.06,.12,0,.23-.03,.32-.09,.09-.07,.16-.16,.2-.28,.05-.12,.07-.27,.07-.44Zm6.61-2.96c-.18-.29-.43-.52-.77-.69-.32-.17-.72-.25-1.17-.25h-2.27v5.69h1.37v-1.93h.9c.45,0,.85-.08,1.17-.23,.34-.15,.59-.37,.77-.64,.17-.27,.26-.59,.26-.96s-.09-.7-.26-.99Zm-1.21,1.39c-.06,.12-.14,.21-.26,.27-.12,.07-.28,.1-.47,.1h-.9v-1.64h.9c.19,0,.35,.04,.47,.12s.2,.19,.26,.32c.06,.14,.08,.28,.08,.44,0,.14-.02,.27-.08,.39Zm7.02,.32v2.34c-.1,.11-.24,.22-.45,.34-.2,.12-.45,.22-.75,.31-.3,.09-.66,.13-1.07,.13-.38,0-.72-.06-1.03-.18-.31-.12-.57-.3-.79-.54-.22-.24-.39-.53-.51-.87-.12-.34-.18-.74-.18-1.18v-.32c0-.44,.06-.84,.18-1.18,.12-.34,.29-.63,.5-.87,.22-.24,.48-.42,.77-.54,.3-.12,.62-.18,.98-.18,.52,0,.95,.08,1.28,.25,.33,.16,.58,.39,.75,.68,.17,.29,.27,.62,.31,1h-1.32c-.03-.19-.08-.35-.15-.48-.07-.13-.17-.23-.3-.3-.13-.07-.3-.11-.52-.11-.16,0-.31,.04-.45,.11-.13,.07-.25,.18-.34,.32-.09,.14-.17,.32-.22,.53-.05,.21-.07,.46-.07,.75v.32c0,.28,.02,.53,.07,.75,.05,.21,.12,.39,.22,.54,.1,.14,.22,.25,.38,.32,.15,.07,.33,.11,.54,.11,.15,0,.27-.01,.38-.04,.1-.03,.19-.06,.26-.09,.07-.04,.12-.08,.16-.11v-.88h-.95v-.94h2.32Z" className="Title-sc-21s4i0-2 fPcuGZ" /> </g>
                                    <g className="Pdf-sc-21s4i0-5 kNenGc">
                                        <use xlinkHref="#fa20ae54" />
                                        <path d="M25.61,16.57c-1.62-1.68-6.03-.99-7.08-.87-1.55-1.49-2.61-3.29-2.98-3.91,.56-1.68,.93-3.36,.99-5.16,0-1.55-.62-3.23-2.36-3.23-.62,0-1.18,.37-1.49,.87-.75,1.3-.43,3.91,.75,6.59-.68,1.93-1.3,3.79-3.04,7.08-1.8,.75-5.59,2.49-5.9,4.35-.12,.56,.06,1.12,.5,1.55,.43,.37,.99,.56,1.55,.56,2.3,0,4.54-3.17,6.09-5.84,1.3-.43,3.36-1.06,5.41-1.43,2.42,2.11,4.54,2.42,5.65,2.42,1.49,0,2.05-.62,2.24-1.18,.31-.62,.12-1.3-.31-1.8Zm-1.55,1.06c-.06,.43-.62,.87-1.62,.62-1.18-.31-2.24-.87-3.17-1.62,.81-.12,2.61-.31,3.91-.06,.5,.12,.99,.44,.87,1.06ZM13.68,4.83c.12-.19,.31-.31,.5-.31,.56,0,.68,.68,.68,1.24-.06,1.3-.31,2.61-.75,3.85-.93-2.49-.75-4.22-.43-4.78Zm-.12,12.05c.5-.99,1.18-2.73,1.43-3.48,.56,.93,1.49,2.05,1.99,2.55,0,.06-1.93,.43-3.42,.93Zm-3.67,2.49c-1.43,2.36-2.92,3.85-3.73,3.85-.12,0-.25-.06-.37-.12-.19-.12-.25-.31-.19-.56,.19-.87,1.8-2.05,4.29-3.17Z" className="Marker-sc-21s4i0-0 hkPMPk" />
                                        <path d="M11.75,29.55c-.18-.3-.43-.53-.76-.69-.33-.17-.72-.25-1.18-.25h-2.27v5.69h1.37v-1.93h.9c.46,0,.85-.08,1.18-.23s.58-.37,.76-.64c.17-.27,.26-.59,.26-.96s-.09-.71-.26-.99Zm-1.21,1.39c-.05,.11-.14,.2-.26,.27-.12,.06-.28,.1-.47,.1h-.9v-1.64h.9c.19,0,.35,.04,.47,.12,.12,.08,.21,.19,.26,.32,.06,.13,.09,.28,.09,.44,0,.14-.03,.27-.09,.39Zm6.64-.71c-.13-.33-.31-.62-.55-.86-.23-.24-.51-.43-.83-.56-.32-.14-.68-.2-1.06-.2h-1.83v5.69h1.85c.38,0,.73-.07,1.05-.2s.59-.32,.83-.56c.23-.24,.41-.53,.54-.87,.13-.33,.2-.7,.2-1.1v-.24c0-.4-.07-.77-.2-1.1Zm-1.2,1.34c0,.37-.05,.67-.15,.92-.09,.25-.23,.44-.41,.56-.18,.13-.4,.19-.66,.19h-.48v-3.57h.46c.2,0,.38,.03,.53,.1,.16,.07,.29,.18,.39,.32,.11,.14,.18,.31,.24,.52,.05,.2,.08,.44,.08,.72v.24Zm3.64-1.9v1.31h2.21v1.05h-2.21v2.27h-1.37v-5.69h3.81v1.06h-2.44Z" className="Title-sc-21s4i0-2 fPcuGZ" /> </g>
                                </svg>
                                <input {...getInputProps()}  className="Input-sc-rou6nh-4 FmBHl" />
                                <div className="Content-sc-rou6nh-1 lfwYfG">
                                    <p className="Title-sc-rou6nh-5 kbIxcS"> <strong>Ajouter un document</strong> </p>
                                </div>
                            </div> ))}

                {/* Upload Progress */} 
                
                {(uploadProgress > 0 && uploadProgress < 100) && (
                    <div className="mt-4">
                        <div className="w-full bg-gray-200 rounded h-2">
                            <div 
                                className="bg-blue-600 h-2 rounded transition-all duration-300"
                                style={{ width: `${uploadProgress}%` }}
                            />
                        </div>
                        <p className="text-sm text-blue-600 text-center mt-1">{uploadProgress}%</p>
                    </div>
                )}
                {/* Documents envoyés */} 

                {/* Uploaded Files List */}
                {uploadedFiles.length > 0 && (
                    <div className="mt-4"> 
                            <div className="Files-sc-1rmn41a-8 hfWQZI">
                            <div className="FilesTitle-sc-1rmn41a-9 eOelTc"> Documents à envoyer </div>
                            {uploadedFiles.map((file, index) => (
                            <div  key={index}  className="Component-sc-1vlh4op-0 dXzalO"> 
                                   {/* {file.thumbnail ? (
            <div className="w-10 h-10 mr-2 overflow-hidden rounded">
                <img 
                    src={file.thumbnail} 
                    alt={file.name} 
                    className="w-full h-full object-cover"
                />
            </div>
        ) : ( */}
            <span className="Icon-sc-1c6zsnj-0 bqEvVP FileIcon-sc-1vlh4op-3 cMnYuJ">
                {getFileLabel(file.id)}
            </span>
        {/* )} */}
                                <div className="Content-sc-1vlh4op-1 eJmTkO"> <span title="AnyScanner_10_24_2024.pdf" className="FileName-sc-1vlh4op-2 gfBwfD">
                                         {file.name}
                                      </span> <span className="LabelIdle-sc-a2bx00-0 cuHHBj">
                                        Relevé de notes {file.id < 4 ? "de l'année " + getFileLabel(file.id) : "du " + getFileLabel(file.id)}
                                      </span> </div> 
                                      <button 
    aria-label="Prévisualiser" 
    type="button" 
    className="p-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100"
    onClick={() => handlePreviewFile(file.file_id, file.name)}
  >
    <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
      <circle cx="12" cy="12" r="3"></circle>
    </svg>
  </button>
                                       <button aria-label="Supprimer" type="button" className="ButtonDelete-sc-ic6yx5-0 eRghmt" onClick={() => handleDeleteFile(file.file_id, file.id)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" fill="currentColor">
                                        <path className="fe888163-7f93-4aef-8e29-c21bf087d597" d="M8,0a8,8,0,1,0,8,8A8,8,0,0,0,8,0Zm3.06,12L8,8.94,5,12,4,11.06,7.06,8,4,5,4.94,4,8,7.06,11,4l.94.94L8.94,8,12,11Z" fillRule="evenodd" /> </svg>
                                </button>
                            </div> ))}
                        </div>
                       
                    </div>
                )}

                                {!showRessource && <div >
                                    <span> Wendogo recense plus de 50 000 formations couvrant 90 % des écoles françaises.</span> 
                                        <span>
                                            <button type="button" className="MoreButton-sc-1rmn41a-14 lncohh" onClick={() => handleShowRessource(true)}> 
                                               Voir plus
                                            </button>
                                        </span>
                                    </div>}
                                    {showRessource && 
                                    <div  className="MegaTip MegaTip-onboarding" style={{backgroundColor: '#e4f4ff'}} >
                                    <div className="MegaTip-icon">
                                    <svg id="icon-info-megatip-blue" viewBox="0 0 66 69" width="100" height="auto">
                                        <rect width={66} height="68.106" rx={4} fill="#E4F4FF"  />
                                        <g clipPath="url(#clip0_1239_20536)">
                                            <path d="M60.618 31.938l-45.923-6.927a.869.869 0 00-.989.729L4.326 87.9a.869.869 0 00.73.989l45.923 6.928a.869.869 0 00.989-.73l9.38-62.16a.869.869 0 00-.73-.989z" fill="#fff" />
                                            <path d="M36.276 33.183l-19.042-2.588a.835.835 0 10-.225 1.656l19.041 2.587a.835.835 0 00.226-1.655zM35.787 36.77l-19.041-2.587a.835.835 0 10-.225 1.656l19.041 2.587a.835.835 0 00.225-1.655zM54.08 51.06l-38.635-5.25a.835.835 0 10-.225 1.655l38.635 5.25a.835.835 0 10.225-1.655z" fill="#C0E9FD" />
                                            <path d="M11.534 74.51l3.227-23.74 38.646 5.251-3.227 23.74-38.646-5.25z" fill="#C0E9FD" stroke="#C0E9FD" strokeWidth="1.66" strokeMiterlimit={10} />
                                            <path d="M57.567 59.097l-5.465-3.155a1.728 1.728 0 00-1.728 2.992l5.465 3.155a1.728 1.728 0 001.728-2.992z" fill="#FECECF" />
                                            <path d="M59.932 67.822l2.013-10.815a2.973 2.973 0 00-2.377-3.468l-1.26-.237-2.71 14.52h4.334zM14.895 56.306l-7.499 2.937a1.944 1.944 0 101.418 3.62l7.499-2.937a1.944 1.944 0 10-1.418-3.62z" fill="#FECECF" />
                                            <path d="M7.482 67.822l2.12-14.76c-2.318-.385-4.343 1.175-4.728 3.5L3 67.821h4.482z" fill="#FECECF" /> </g>
                                        <circle cx="45.5" cy="19.5" r="13.5" fill="#0154c0" />
                                        <path fillRule="evenodd" clipRule="evenodd" d="M46.942 24.312l.132.124c.39.403.586.923.586 1.542 0 .622-.197 1.14-.587 1.543-.399.41-.921.619-1.555.619-.63 0-1.157-.205-1.565-.61-.407-.403-.613-.925-.613-1.552 0-.625.206-1.148.613-1.553.773-.769 2.17-.804 2.99-.113zM45.475 10.32c.744 0 1.301.12 1.674.36.373.239.54.535.507.885l-.863 9.988c-.067.431-.49.647-1.268.647-.81 0-1.25-.216-1.318-.647l-.863-9.988c-.034-.35.135-.646.507-.886s.913-.36 1.624-.36z" fill="#fff" />
                                        <defs>
                                            <clipPath id="clip0_1239_20536">
                                                <path fill="#fff" transform="translate(3 25)" d="M0 0h59v43H0z" /> </clipPath>
                                        </defs>
                                    </svg>
                                    </div>
                                    <div className="MegaTip-content" >
                                        <div className="Stack  stackColumn " style={{ flexDirection: "column", padding: 0, alignItems: "stretch", justifyContent: "center" }}>
                                        <div className="Stack-child  " style={{ paddingTop: 8 }}>
                                            <div className="Heading s isWeak  MegaTip-title">
                                            <div className="Stack  stackColumn " style={{ flexDirection: "column", padding: 0, alignItems: "stretch" }}>
                                            <div className="Stack-child flex-container1">
                                <div className="text-left1">Clique ici pour ouvrir la ressource</div>
                                <div className="svg-container1 " onClick={() => handleShowRessource(false)}>
                                    <svg width="30" height="61.066px" viewBox="0 0 90.509 61.066" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                                                <title>Group</title>
                                                <g id="Page-1" stroke="#2a3775" strokeWidth={1} fill="none" fillRule="evenodd">
                                                    <g id="noun-hide-302876" fill="#000000" fillRule="nonzero">
                                                        <g id="Group">
                                                            <path d="M13.704,2.565 L23.229,12.089 C15.396,15.937 7.633,21.879 0,29.911 L0.064,29.973 L0,30.035 C14.368,45.153 29.199,52.922 44.081,53.121 C44.279,53.124 44.474,53.125 44.671,53.125 C50.139,53.125 55.652,52.084 61.192,50.053 L72.206,61.066 L74.772,58.5 L16.271,0 L13.704,2.565 Z M44.669,49.495 C44.49,49.495 44.309,49.494 44.13,49.491 C31.071,49.315 17.93,42.75 5.028,29.975 C11.951,23.122 18.944,18.063 25.956,14.816 L32.812,21.672 C31.18,24.026 30.207,26.865 30.207,29.942 C30.207,38.004 36.766,44.562 44.827,44.562 C47.903,44.562 50.743,43.587 53.097,41.957 L58.333,47.193 C53.738,48.71 49.179,49.495 44.669,49.495 Z M50.488,39.349 C48.834,40.351 46.898,40.931 44.826,40.931 C38.766,40.931 33.836,36.001 33.836,29.942 C33.836,27.87 34.416,25.934 35.419,24.28 L50.488,39.349 Z" id="Shape" />
                                                            <path d="M58.378,35.401 C59.062,33.712 59.446,31.873 59.446,29.942 C59.446,21.88 52.887,15.322 44.826,15.322 C42.896,15.322 41.055,15.707 39.367,16.389 L42.248,19.27 C43.077,19.069 43.937,18.952 44.827,18.952 C50.887,18.952 55.817,23.882 55.817,29.942 C55.817,30.832 55.699,31.692 55.499,32.52 L58.378,35.401 Z" id="Path" />
                                                            <path d="M90.508,29.878 C74.964,14.376 59.364,6.649 44.081,6.825 C39.957,6.88 35.837,7.539 31.73,8.752 L34.687,11.709 C37.836,10.929 40.986,10.497 44.13,10.454 C44.309,10.453 44.488,10.451 44.669,10.451 C57.929,10.451 71.612,17.017 85.386,29.973 C79.112,35.872 72.857,40.441 66.651,43.672 L69.33,46.352 C76.379,42.527 83.452,37.107 90.509,30.069 L90.413,29.973 L90.508,29.878 Z" id="Path" />
                                                        </g>
                                                    </g>
                                                </g>
                                            </svg>
                                        </div>
                                    </div>
                                            </div>
                                            </div>
                                        </div><div/>
                                        <div className="Stack-child  " >
                                            <div className="MegaTip-text">
                                            <span style={{ margin: 0, color: "rgb(127, 148, 169)" }}>
                                            Wendogo recense plus de 50 000 formations couvrant 90 % des écoles françaises.
                                            Découvre comment ces écoles sélectionnent leurs candidats selon des critères comme :
                                            </span>
                                            <ul style={{ margin: 0, paddingLeft: 25, color: "rgb(127, 148, 169)" }}>
                                                <li>✓ Tes moyennes des trois dernières années.  </li>
                                                <li>✓ Tes notes dans les matières clés.</li>
                                                <li>✓ L'évolution de tes résultats.</li>
                                                <li>✓ Et bien d'autres...</li>
                                            </ul>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                </div>}
                                    <button className="Buttonstyles__Button-sc-vsowxm-1 cnoACk styles__StyledButton-sc-reeitb-3 bVQYWs" >
                                        <span className="Buttonstyles__Label-sc-vsowxm-2 kGIufm"> Charger mes documents </span>
                                  </button>
                              
                        </div>
                    </div>
                </div>
                {/* Add the DocumentScannerOverlay right here, just before the final closing div */}
                {scannerVisible && (
                                <DocumentScannerOverlay 
                                    isVisible={scannerVisible}
                                    onCancel={closeDocumentScanner}
                                    onCapture={handleDocumentCapture}
                                    selectedDocumentType={selectedBulletin}
                                    uploadedFiles={uploadedFiles}
                                    setShowError={(show) => {
                                    setShowError(show);
                                    if (show) setTimeout(() => setShowError(false), 3000);
                                    }}
                                />
                )}
                {previewModalOpen && (
                        <MobileAwareFilePreview
                            isVisible={previewModalOpen}
                            onClose={() => setPreviewModalOpen(false)}
                            file={previewFile}
                        />
                        )}
            </div>
    );
};

export default LoadFilesModal;
