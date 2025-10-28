// src/components/LanguageSelector.js - VERSION CORRIGÉE POUR NEXT.JS i18n
import React from 'react';
import { useRouter } from 'next/router';
import { Globe } from 'lucide-react';
import { cacheUtils } from '../utils/cacheUtils';

const LanguageSelector = ({ 
  isMobile = false, 
  variant = 'default' // 'default' | 'light' | 'dark' | 'transparent'
}) => {
  const router = useRouter();
  const { locale, pathname, asPath, query } = router;

  // ✅ SOLUTION : Utiliser l'API Next.js au lieu de manipuler les URLs manuellement
  const changeLanguage = async (newLocale) => {
    if (locale === newLocale) return;
    
    console.log('🌐 Changing language from', locale, 'to', newLocale);
    
    // Nettoyer le cache de l'ancienne locale
    cacheUtils.clearPattern(locale);
    
    // ✅ MÉTHODE 1 (Recommandée) : Utiliser router.push avec locale
    // Next.js gère automatiquement le préfixe de locale
    router.push(
      {
        pathname: pathname, // Chemin actuel sans locale
        query: query        // Query params actuels
      },
      undefined,            // asPath (Next.js le calcule automatiquement)
      { 
        locale: newLocale,  // ✅ Next.js ajoute automatiquement le préfixe
        scroll: false       // Garder la position de scroll
      }
    ).then(() => {
      // Forcer un reload complet pour actualiser toutes les traductions
      window.location.reload();
    });
  };

  // ✅ DÉFINITION DES VARIANTS
  const variants = {
    // Version par défaut (fond blanc semi-transparent sur fond coloré)
    default: {
      container: 'bg-white/10 backdrop-blur-sm',
      activeButton: 'bg-white text-blue-600 shadow-sm',
      inactiveButton: 'text-white/80 hover:text-white hover:bg-white/10'
    },
    
    // Version claire (pour navbar blanches ou claires)
    light: {
      container: 'bg-gray-100',
      activeButton: 'bg-blue-600 text-white shadow-sm',
      inactiveButton: 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
    },
    
    // Version sombre (pour navbar sombres)
    dark: {
      container: 'bg-gray-800',
      activeButton: 'bg-blue-500 text-white shadow-sm',
      inactiveButton: 'text-gray-300 hover:text-white hover:bg-gray-700'
    },
    
    // Version transparente avec bordure (pour tout type de fond)
    transparent: {
      container: 'bg-transparent border border-gray-300',
      activeButton: 'bg-blue-600 text-white shadow-sm',
      inactiveButton: 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
    },
    
    // Version outline (bordure uniquement)
    outline: {
      container: 'bg-transparent',
      activeButton: 'bg-blue-600 text-white shadow-sm border border-blue-600',
      inactiveButton: 'text-gray-700 hover:text-blue-600 hover:border-blue-600 border border-gray-300'
    }
  };

  const currentVariant = variants[variant] || variants.default;

  // ✅ VERSION MOBILE
  if (isMobile) {
    const mobileVariants = {
      default: {
        container: 'bg-gray-50',
        activeButton: 'bg-blue-600 text-white shadow-sm',
        inactiveButton: 'bg-white text-gray-600 hover:bg-gray-100'
      },
      light: {
        container: 'bg-gray-50',
        activeButton: 'bg-blue-600 text-white shadow-sm',
        inactiveButton: 'bg-white text-gray-600 hover:bg-gray-100'
      },
      dark: {
        container: 'bg-gray-800',
        activeButton: 'bg-blue-500 text-white shadow-sm',
        inactiveButton: 'bg-gray-700 text-gray-300 hover:bg-gray-600'
      },
      transparent: {
        container: 'bg-transparent border border-gray-300',
        activeButton: 'bg-blue-600 text-white shadow-sm',
        inactiveButton: 'bg-white text-gray-600 hover:bg-gray-100'
      },
      outline: {
        container: 'bg-white border border-gray-200',
        activeButton: 'bg-blue-600 text-white shadow-sm border border-blue-600',
        inactiveButton: 'bg-white text-gray-600 hover:border-blue-600 border border-gray-300'
      }
    };

    const currentMobileVariant = mobileVariants[variant] || mobileVariants.default;

    return (
      <div className={`flex items-center justify-between px-3 py-2 rounded-lg ${currentMobileVariant.container}`}>
        <div className="flex items-center gap-2 text-gray-700">
          <Globe className="w-4 h-4" />
          <span className="font-medium text-sm">Langue</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => changeLanguage('fr')}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
              locale === 'fr'
                ? currentMobileVariant.activeButton
                : currentMobileVariant.inactiveButton
            }`}
          >
            FR
          </button>
          <button
            onClick={() => changeLanguage('en')}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
              locale === 'en'
                ? currentMobileVariant.activeButton
                : currentMobileVariant.inactiveButton
            }`}
          >
            EN
          </button>
        </div>
      </div>
    );
  }

  // ✅ VERSION DESKTOP
  return (
    <div className={`flex items-center gap-1 rounded-lg p-1 ${currentVariant.container}`}>
      <button
        onClick={() => changeLanguage('fr')}
        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
          locale === 'fr'
            ? currentVariant.activeButton
            : currentVariant.inactiveButton
        }`}
        title="Français"
      >
        FR
      </button>
      <button
        onClick={() => changeLanguage('en')}
        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
          locale === 'en'
            ? currentVariant.activeButton
            : currentVariant.inactiveButton
        }`}
        title="English"
      >
        EN
      </button>
    </div>
  );
};

export default LanguageSelector;
