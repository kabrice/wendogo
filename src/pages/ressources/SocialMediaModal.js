'use client';
import { useEffect, useState } from 'react';

const SocialMediaModal = ({ isOpen, onClose }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
        } else {
            setTimeout(() => setIsVisible(false), 300); // Match animation duration
        }
    }, [isOpen]);

    if (!isOpen && !isVisible) return null;

    const socialMediaLinks = [
        {
            platform: "Facebook",
            url: "https://www.facebook.com/wendogoHQ/",
            icon: (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.77,7.46H14.5v-1.9c0-.9.6-1.1,1-1.1h3V.5h-4.33C10.24.5,9.5,3.44,9.5,5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4Z"/>
                </svg>
            ),
            color: "#1877F2",
            hoverClass: "hover:bg-[#1877F2] group-hover:text-[#1877F2]",
        },
        {
            platform: "Instagram",
            url: "https://www.instagram.com/WendogoHQ/",
            icon: (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12,2.162c3.204,0,3.584.012,4.849.07,1.308.06,2.655.358,3.608,1.311.95.95,1.251,2.297,1.311,3.608.058,1.265.07,1.645.07,4.849s-.012,3.584-.07,4.849c-.06,1.308-.358,2.655-1.311,3.608-.95.95-2.297,1.251-3.608,1.311-1.265.058-1.645.07-4.849.07s-3.584-.012-4.849-.07c-1.308-.06-2.655-.358-3.608-1.311-.95-.95-1.251-2.297-1.311-3.608-.058-1.265-.07-1.645-.07-4.849s.012-3.584.07-4.849c.06-1.308.358-2.655,1.311-3.608.95-.95,2.297-1.251,3.608-1.311,1.265-.058,1.645-.07,4.849-.07M12,0C8.741,0,8.332.014,7.052.072,5.197.157,3.355.673,2.014,2.014.673,3.355.157,5.197.072,7.052.014,8.332,0,8.741,0,12c0,3.259.014,3.668.072,4.948.085,1.855.601,3.697,1.942,5.038,1.341,1.341,3.183,1.857,5.038,1.942,1.28.058,1.689.072,4.948.072,3.259,0,3.668-.014,4.948-.072,1.855-.085,3.697-.601,5.038-1.942,1.341-1.341,1.857-3.183,1.942-5.038.058-1.28.072-1.689.072-4.948,0-3.259-.014-3.668-.072-4.948-.085-1.855-.601-3.697-1.942-5.038C20.697.673,18.855.157,17,.072,15.72.014,15.311,0,12,0Z"/>
                    <path d="M12,5.838A6.162,6.162,0,1,0,18.162,12,6.162,6.162,0,0,0,12,5.838ZM12,16a4,4,0,1,1,4-4A4,4,0,0,1,12,16Z"/>
                    <circle cx="18.406" cy="5.594" r="1.44"/>
                </svg>
            ),
            color: "#E1306C",
            hoverClass: "hover:bg-[#E1306C] group-hover:text-[#E1306C]",
        },
        {
            platform: "TikTok",
            url: "https://www.tiktok.com/@wendogohq",
            icon: (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.59,6.69a4.83,4.83,0,0,1-3.77-4.25V2h-3.45V13.67a2.89,2.89,0,0,1-5.2,1.74,2.89,2.89,0,0,1,2.31-4.64,2.93,2.93,0,0,1,.88.13V7.28a6.84,6.84,0,0,0-1-.05A6.33,6.33,0,0,0,5,20.1a6.34,6.34,0,0,0,10.86-4.43v-7a8.16,8.16,0,0,0,4.77,1.52v-3.4a4.85,4.85,0,0,1-1-.1Z"/>
                </svg>
            ),
            color: "#000000",
            hoverClass: "hover:bg-black group-hover:text-black",
        },
        {
            platform: "YouTube",
            url: "https://www.youtube.com/@WendogoHQ",
            icon: (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498,6.186a3.016,3.016,0,0,0-2.122-2.136C19.505,3.545,12,3.545,12,3.545s-7.505,0-9.377.505A3.017,3.017,0,0,0,.5,6.186C0,8.07,0,12,0,12s0,3.93.5,5.814a3.016,3.016,0,0,0,2.122,2.136c1.871.505,9.376.505,9.376.505s7.505,0,9.377-.505a3.015,3.015,0,0,0,2.122-2.136C24,15.93,24,12,24,12S24,8.07,23.498,6.186ZM9.545,15.568V8.432L15.818,12Z"/>
                </svg>
            ),
            color: "#FF0000",
            hoverClass: "hover:bg-[#FF0000] group-hover:text-[#FF0000]",
        },
    ];

    return (
        <div className={`fixed inset-0 z-1001 flex items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
                        isOpen ? "opacity-100" : "opacity-0"}`}>
            <div    className={`bg-white rounded-2xl p-8 max-w-md w-[90%] relative shadow-2xl transition-transform duration-300 ${
                                isOpen ? "translate-y-0 scale-100" : "translate-y-10 scale-95"}`}>
                <button 
                    onClick={onClose} 
                    className="absolute -top-4 -right-4 bg-white w-8 h-8 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                
                <div className="text-center">
                    <h3 className="text-3xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Rejoignez la communauté !
                    </h3>
                    <p className="mb-8 text-gray-600 text-lg">
                    Encouragez-nous à continuer en nous suivant sur les réseaux sociaux ! Chaque abonné compte, on a besoin de vous ! 🚀💪                    </p>                   
                    <div className="space-y-4 mb-8">
                        {socialMediaLinks.map((social) => (
                            <div key={social.platform} className="group relative">
                                <a
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`flex items-center gap-4 w-full p-4 rounded-xl border-2 transition-all duration-300 ${social.hoverClass} hover:text-white group overflow-hidden`}
                                    style={{ borderColor: social.color }}
                                >
                                    <span className="relative z-10">
                                        <div className="p-2 rounded-lg bg-gray-100 group-hover:bg-white/20 transition-colors">
                                            {social.icon}
                                        </div>
                                    </span>
                                    <span className="relative z-10 font-semibold text-lg transition-colors" style={{ color: social.color }}>
                                        Suivre sur {social.platform}
                                    </span>
                                </a>
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={onClose}
                        style={{ textAlign: "center" }}
                        className="w-full py-3 px-6 rounded-xl text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors text-lg font-medium"
                    >
                        Peut-être plus tard
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SocialMediaModal;
