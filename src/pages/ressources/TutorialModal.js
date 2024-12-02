
'use client';

const TutorialModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const handleTutorialClick = () => {
        // Open the tutorial in a new tab
        window.open("https://www.youtube.com/watch?v=wUrgx3WLURI", "_blank");
        // Close the modal
        onClose();
    };
    
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 max-w-2xl w-[90%] relative">
                <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> </svg>
                </button>
                <div className="text-center">
                    <h3 className="text-xl font-semibold mb-4">Bienvenue sur Wendogo!</h3>
                    <p className="mb-6"> Pour mieux comprendre comment utiliser notre plateforme, nous vous recommandons de regarder notre tutoriel vidéo. </p> {/* Thumbnail Container */}
                    <div className="relative mb-6 group cursor-pointer"> <a href="https://www.youtube.com/watch?v=wUrgx3WLURI" target="_blank" rel="noopener noreferrer">
                                    {/* Video Thumbnail */}
                                    <img 
                                        src="https://img.youtube.com/vi/wUrgx3WLURI/maxresdefault.jpg" 
                                        alt="Tutoriel Wendogo"
                                        className="w-full rounded-lg shadow-lg"
                                    />
                                    
                                    {/* Play Button Overlay */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div 
                                            className="w-16 h-16 rounded-full flex items-center justify-center transition-colors"
                                            style={{
                                                backgroundColor: "#0154c0", // Main button color
                                                transition: "background-color 0.2s ease-in-out",
                                            }}
                                            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#013d90")} // Hover color
                                            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#0154c0")} // Default color
                                        >
                                            <div 
                                                className="play-icon"
                                                style={{
                                                    width: 0,
                                                    height: 0,
                                                    borderLeft: "12px solid white",
                                                    borderTop: "8px solid transparent",
                                                    borderBottom: "8px solid transparent",
                                                    marginLeft: "4px",
                                                }}
                                            ></div>
                                        </div>
                                    </div>
                                </a> </div>
                    <div className="flex justify-center gap-4">
                        <button onClick={handleTutorialClick} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"> Voir le tutoriel </button>
                        <button onClick={onClose} className="border border-gray-300 px-6 py-2 rounded-lg hover:bg-gray-100"> Plus tard </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TutorialModal;
