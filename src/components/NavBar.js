// src/components/NavBar.js - Version avec authentification intégrée

import React, { useState, useEffect, useRef, startTransition, useCallback } from 'react';
import { ChevronDown, Search, User, Menu, X, Globe, GraduationCap, MapPin, FileText, Heart, Users, ArrowRight, LogOut, BarChart3, MessageSquare } from 'lucide-react';
import { useSession, signOut } from 'next-auth/react';
import { useFavorites } from '../contexts/FavoritesContext';
// import AuthModal from './AuthModal';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import LanguageSelector from './LanguageSelector';

const NavBar = ({ 
  variant = 'default', // 'default' | 'transparent' | 'simple'
  languageSelectorVariant = 'default', // 'default' | 'light' | 'dark' | 'transparent'
  showDropdowns = true,
  showAllMenuItems = true,
  backgroundColor = null,
  textColor = null
}) => {
  const [isNavigating, setIsNavigating] = useState(false); 
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const dropdownRefs = useRef({});
  const userDropdownRef = useRef(null);
  const router = useRouter();
  const { t } = useTranslation('common');
  const locale = router.locale || 'fr';
  // Hooks d'authentification
  const { data: session, status } = useSession();
  const { showAuthModal, setShowAuthModal } = useFavorites();

  const ogLocale = locale === 'fr' ? 'fr_FR' : 'en_US';
  const baseUrl = 'https://wendogo.com';
  const canonicalUrl = `${baseUrl}${router.asPath}`;
  
  // Fonction de déconnexion améliorée
  const handleLogout = useCallback(async () => {
    try {
      setIsNavigating(true);
      await signOut({ redirect: false });
      
      startTransition(() => {
        const protectedPages = ['/favorites', '/dashboard', '/account'];
        if (protectedPages.includes(router.pathname)) {
          router.push('/').finally(() => setIsNavigating(false));
        } else {
          setIsNavigating(false);
          window.location.reload();
        }
      });
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
      setIsNavigating(false);
      startTransition(() => {
        router.push('/');
      });
    }
  }, [router]);

  const handleNavigation = useCallback((path) => {
    if (router.pathname === path) return;
    
    setIsNavigating(true);
    startTransition(() => {
      router.push(path).finally(() => {
        setIsNavigating(false);
      });
    });
  }, [router]); 


  // Détection de la taille d'écran
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1050);
    };

    if (typeof window !== 'undefined') {
      handleResize();
    }
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Fermeture des dropdowns lors du clic extérieur
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (activeDropdown && 
          dropdownRefs.current[activeDropdown] && 
          !dropdownRefs.current[activeDropdown].contains(event.target)) {
        setActiveDropdown(null);
      }
      
      if (showUserDropdown && 
          userDropdownRef.current && 
          !userDropdownRef.current.contains(event.target)) {
        setShowUserDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [activeDropdown, showUserDropdown]);
  
  if (isNavigating) {
    return (
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b border-gray-200"
          style={{
            height: '80px',
            width: '100%',
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 100%)',
            justifyContent: 'center',
            minHeight: '80px',
            position: 'sticky',
            top: 0,
            zIndex: 888
          }}>
        <div className="w-full px-16">
          <div className="flex items-center justify-center h-20">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </nav>
    );
  }
  // Configuration des variantes (existant)
  const getVariantStyles = () => {
    switch (variant) {
      case 'transparent':
        return {
          navStyle: 'border-b border-gray-200/50',
          customStyle: {
            backgroundColor: '#f1ebe280',
            WebkitBackdropFilter: 'blur(24px)',
            backdropFilter: 'blur(24px)'
          },
          textStyle: 'text-gray-800',
          logoStyle: 'text-gray-900',
          hoverStyle: 'hover:text-blue-600',
          buttonStyle: 'bg-blue-600 text-white hover:bg-blue-700'
        };
      
      case 'simple':
        return {
          navStyle: 'bg-white/90 backdrop-blur-md shadow-md',
          textStyle: 'text-gray-700',
          logoStyle: 'text-gray-900',
          hoverStyle: 'hover:text-blue-600',
          buttonStyle: 'bg-blue-600 text-white hover:bg-blue-700'
        };
      
      default:
        return {
          navStyle: 'bg-gradient-to-r from-gray-900 to-blue-900',
          textStyle: 'text-white',
          logoStyle: 'text-white',
          hoverStyle: 'hover:text-gray-200',
          buttonStyle: 'bg-blue-600 text-white hover:bg-blue-700'
        };
    }
  };

  const styles = getVariantStyles();

  // Items de navigation (existant)
  const getNavigationItems = () => {
    // if (!showAllMenuItems) {
    //   return [
    //     {
    //       title: 'Formations',
    //       href: '/',
    //       hasDropdown: false,
    //       icon: <Search className="w-4 h-4" />
    //     }
    //   ];
    // }

    return [
      {
        title: t('nav.forum'),
        hasDropdown: false,
        href: '/forum',
        icon: <MessageSquare className="w-4 h-4" />
      },
      {
        title: t('nav.orientation'),
        hasDropdown: true,
        icon: <GraduationCap className="w-4 h-4" />,
        submenu: [
          {
            title: t('nav.studyInFrance'),
            description: t('nav.studyInFranceDesc'),
            href: '/guides/etudier-en-france',
            icon: <Globe className="w-5 h-5 text-blue-600" />
          },
          {
            title: t('nav.studentVisa'),
            description: t('nav.studentVisaDesc'),
            href: '/guides/visa-etudiant',
            icon: <FileText className="w-5 h-5 text-green-600" />
          },
          {
            title: t('nav.housing'),
            description: t('nav.housingDesc'),
            href: '/guides/logement',
            icon: <MapPin className="w-5 h-5 text-orange-600" />
          },
          {
            title: t('nav.campusFrance'),
            description: t('nav.campusFranceDesc'),
            href: '/guides/campus-france',
            icon: <GraduationCap className="w-5 h-5 text-purple-600" />
          }
        ]
      },
      {
        title: t('nav.about'),
        hasDropdown: true,
        icon: <Users className="w-4 h-4" />,
        submenu: [
          {
            title: t('nav.whyWendogo'),
            description: t('nav.whyWendogoDesc'),
            href: '/mission',
            icon: <Heart className="w-5 h-5 text-red-600" />
          },
          {
            title: t('nav.whoWeAre'),
            description: t('nav.whoWeAreDesc'),
            href: '/about-us',
            icon: <Users className="w-5 h-5 text-indigo-600" />
          },
          {
            title: t('nav.testimonials'),
            description: t('nav.testimonialsDesc'),
            href: '/temoignages',
            icon: <Heart className="w-5 h-5 text-pink-600" />
          }
        ]
      }
    ];
  };

  const navigationItems = getNavigationItems();

  // Composant Logo (existant)
  const WendogoLogo = () => (
    <svg width="170px" height="100px" viewBox="0 0 497 100" xmlns="http://www.w3.org/2000/svg" className="h-10">
      <text 
        x="0" 
        y="76" 
        fontFamily="AvenirNext-Heavy, Avenir Next" 
        fontSize="100" 
        fontWeight="600" 
        letterSpacing="-1" 
        fill="currentColor"
        className={styles.logoStyle}
      >
        Wendogo
      </text>
    </svg>
  );

  // Composant Dropdown Menu (existant)
  const DropdownMenu = ({ item, isActive }) => (
    <div 
      ref={el => dropdownRefs.current[item.title] = el}
      onMouseEnter={() => setActiveDropdown(item.title)}
      onMouseLeave={() => setActiveDropdown(null)}
      className={`absolute top-full left-0 mt-0 w-80 bg-white border border-gray-200 rounded-lg shadow-xl z-50 transition-all duration-200 ${
        isActive ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
      }`}
    >
      <div className="p-4">
        <div className="grid gap-1">
          {item.submenu.map((subItem, index) => (
            <Link
              key={index}
              href={subItem.href}
              className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
            >
              <div className="flex-shrink-0 mt-0.5">
                {subItem.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                  {subItem.title}
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  {subItem.description}
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );

  // ✅ NOUVEAU : Composant User Dropdown
  const UserDropdown = ({ user }) => (
    <div 
      ref={userDropdownRef}
      className={`absolute top-full right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-xl z-50 transition-all duration-200 ${
        showUserDropdown ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
      }`}
    >
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
            {user.image ? (
              <img 
                src={user.image} 
                alt="Avatar" 
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <User className="w-5 h-5 text-white" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-medium text-gray-900 truncate">
              {user.name || `${user.firstname} ${user.lastname}`}
            </div>
            <div className="text-sm text-gray-500 truncate">
              {user.email}
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-2">
        <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors">
            <BarChart3 className="w-4 h-4" />
            <span>{t('nav.dashboard')}</span>
        </Link>
        
        <Link href="/favorites" className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors">
            <Heart className="w-4 h-4" />
            <span>{t('nav.myFavorites')}</span>
        </Link>
        <Link href="/account" className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors">
          <User className="w-4 h-4" />
          <span>{t('nav.myAccount')}</span>
        </Link>
        
        <hr className="my-2 border-gray-200" />
        
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>{t('nav.logout')}</span>
        </button>
      </div>
    </div>
  );

  // ✅ NOUVEAU : Composant Auth Buttons
  const AuthButtons = () => {
    if (status === 'loading') {
      return (
        <div className="flex items-center">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-current"></div>
        </div>
      );
    }

    if (session?.user) {
      return (
        <div className="relative">
          <button
            onClick={() => setShowUserDropdown(!showUserDropdown)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
              {session.user.image ? (
                <img 
                  src={session.user.image} 
                  alt="Avatar" 
                  className="w-6 h-6 rounded-full object-cover"
                />
              ) : (
                <User className="w-3 h-3 text-white" />
              )}
            </div>
            <span className={`${styles.textStyle} font-medium text-sm sm:inline`}>
              {session.user.name?.split(' ')[0] || session.user.firstname || 'Utilisateur'}
            </span>
            <ChevronDown className="w-3 h-3 text-current" />
          </button>
          
          <UserDropdown user={session.user} />
        </div>
      );
    }

    return (
      <div className="flex items-center space-x-2">
        <button
          onClick={() => setShowAuthModal(true)}
          className={`flex items-center gap-1 px-4 py-2 ${styles.buttonStyle} rounded-lg font-medium transition-colors duration-200 text-sm whitespace-nowrap`}
        >
          <User className="w-3 h-3" />
          <span>{t('nav.login')}</span>
        </button>
      </div>
    );
  };

  return (
    <>
      {/* HEAD seulement pour la page d'accueil */}
      {variant === 'default' && (
        <Head>
          <title>{t('seo.home.title')}</title>
          <meta name="description" content={t('seo.home.description')} />
          <meta name="keywords" content={t('seo.home.keywords')} />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          
          {/* Open Graph */}
          <meta property="og:type" content="website" />
          <meta property="og:url" content={canonicalUrl} />
          <meta property="og:title" content={t('seo.home.ogTitle')} />
          <meta property="og:description" content={t('seo.home.ogDescription')} />
          <meta property="og:image" content={`${baseUrl}/og-search-image.jpg`} />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta property="og:locale" content={ogLocale} />
          <meta property="og:site_name" content="Wendogo" />
          
          {/* Twitter Card */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:url" content={canonicalUrl} />
          <meta name="twitter:title" content={t('seo.home.twitterTitle')} />
          <meta name="twitter:description" content={t('seo.home.twitterDescription')} />
          <meta name="twitter:image" content={`${baseUrl}/twitter-search-image.jpg`} />
          
          {/* Other meta tags */}
          <meta name="robots" content="index, follow" />
          <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
          <meta name="language" content={locale === 'fr' ? 'French' : 'English'} />
          <meta name="author" content="Wendogo" />
          
          {/* Links */}
          <link rel="icon" href="/favicon.ico" />
          <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
          <link rel="canonical" href={canonicalUrl} />
          
          {/* Alternate language versions */}
          <link rel="alternate" hrefLang="fr" href={`${baseUrl}/fr${router.asPath}`} />
          <link rel="alternate" hrefLang="en" href={`${baseUrl}/en${router.asPath}`} />
          <link rel="alternate" hrefLang="x-default" href={`${baseUrl}/fr${router.asPath}`} />
          
          {/* JSON-LD Schema */}
          <script type="application/ld+json" dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Wendogo",
              "description": t('seo.home.schemaDescription'),
              "url": baseUrl,
              "inLanguage": locale,
              "potentialAction": {
                "@type": "SearchAction",
                "target": `${baseUrl}/search?q={search_term_string}`,
                "query-input": "required name=search_term_string"
              }
            })
          }} />
        </Head>
      )}

      <nav className={`fixed top-0 left-0 right-0 z-50 ${styles.navStyle} shadow-lg transition-all duration-300`}
            style={{
                height: '80px',
                width: '100%',
                marginBottom: '-80px',
                display: 'grid',
                gridTemplateColumns: 'minmax(0, 100%)',
                justifyContent: 'center',
                minHeight: '80px',
                position: 'sticky',
                top: 0,
                zIndex: 888,
                ...styles.customStyle
            }}>
        <div className="w-full px-16">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className={`flex items-center ${styles.logoStyle} ${styles.hoverStyle} transition-colors`}>
                <WendogoLogo />
              </Link>
            </div>
            {/* Conteneur pour les éléments de droite */}
            <div className="flex items-center gap-2">
              {/* Navigation Desktop */}
              {!isMobile && (
                <div className="flex items-center space-x-2">
                  <LanguageSelector variant={languageSelectorVariant} />
                  {navigationItems.map((item, index) => (
                    <div key={index} className="relative group">
                      {item.hasDropdown && showDropdowns ? (
                        <>
                          <button
                            onMouseEnter={() => setActiveDropdown(item.title)}
                            className={`flex items-center gap-1 px-2 py-2 ${styles.textStyle} ${styles.hoverStyle} font-medium transition-colors duration-200 text-sm whitespace-nowrap`}
                          >
                            <span>{item.title}</span>
                            <ChevronDown className="w-3 h-3" />
                          </button>
                          <DropdownMenu item={item} isActive={activeDropdown === item.title} />
                        </>
                      ) : (
                        <Link
                          href={item.href}
                          className={`flex items-center gap-1 px-2 py-2 ${styles.textStyle} ${styles.hoverStyle} font-medium transition-colors duration-200 text-sm whitespace-nowrap`}
                        >
                          <span>{item.title}</span>
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* ✅ NOUVEAU : Boutons d'authentification */}
              {!isMobile && <AuthButtons />}
            </div>

            {/* Bouton Menu Mobile */}
            {isMobile && (
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`p-2 ${styles.textStyle} ${styles.hoverStyle} transition-colors duration-200 ml-auto`}
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            )}
          </div>
        </div>

        {/* Menu Mobile */}
        {isMobile && (
          <div className={`transition-all duration-300 ${
            isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
          }`}>
            <div className="bg-white border-t border-gray-200 shadow-lg">
              <div className="px-4 py-6 space-y-4">
                <LanguageSelector isMobile={true} variant={languageSelectorVariant} />
                {navigationItems.map((item, index) => (
                  <div key={index}>
                    {item.hasDropdown && showDropdowns ? (
                      <div>
                        <button
                          onClick={() => setActiveDropdown(activeDropdown === item.title ? null : item.title)}
                          className="flex items-center justify-between w-full px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <div className="flex items-center gap-2">
                            {item.icon}
                            <span className="font-medium">{item.title}</span>
                          </div>
                          <ChevronDown className={`w-4 h-4 transition-transform ${
                            activeDropdown === item.title ? 'rotate-180' : ''
                          }`} />
                        </button>
                        {activeDropdown === item.title && (
                          <div className="mt-2 ml-6 space-y-2">
                            {item.submenu.map((subItem, subIndex) => (
                              <Link
                                key={subIndex}
                                href={subItem.href}
                                className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              >
                                {subItem.icon}
                                <span>{subItem.title}</span>
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium"
                      >
                        {item.icon}
                        <span>{item.title}</span>
                      </Link>
                    )}
                  </div>
                ))}
                
                {/* ✅ NOUVEAU : Auth Mobile */}
                <div className="pt-4 border-t border-gray-200 space-y-3">
                  {session?.user ? (
                    <>
                      <div className="flex items-center gap-3 px-3 py-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                          {session.user.image ? (
                            <img 
                              src={session.user.image} 
                              alt="Avatar" 
                              className="w-8 h-8 rounded-full object-cover"
                            />
                          ) : (
                            <User className="w-4 h-4 text-white" />
                          )}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">
                            {session.user.name || `${session.user.firstname} ${session.user.lastname}`}
                          </div>
                          <div className="text-sm text-gray-500">
                            {session.user.email}
                          </div>
                        </div>
                      </div>
                      
                      <button
                        onClick={() => handleNavigation('/dashboard')}
                        disabled={isNavigating}
                        className="w-full flex items-center gap-2 px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium disabled:opacity-50"
                      >
                        <BarChart3 className="w-4 h-4" />
                        <span>Dashboard</span>
                      </button>
                      
                      <button
                        onClick={() => handleNavigation('/favorites')}
                        disabled={isNavigating}
                        className="w-full flex items-center gap-2 px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium disabled:opacity-50"
                      >
                        <Heart className="w-4 h-4" />
                        <span>Mes favoris</span>
                      </button>
                      
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-3 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors font-medium"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Se déconnecter</span>
                      </button>
                    </>
                  ) : (
                    <> 
                      <button
                        onClick={() => setShowAuthModal(true)}
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg"
                      >
                        <User className="w-4 h-4" />
                        <span>Se connecter</span>
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Spacer */}
      <div className="h-20"></div>
      
      {/* ✅ NOUVEAU : AuthModal */}
      {/* <AuthModal /> */}
    </>
  );
};

export default NavBar;
