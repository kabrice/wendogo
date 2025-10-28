// src/components/ActiveFiltersBar.js
// ✅ VERSION CORRIGÉE - Tous les problèmes résolus

import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { X, ChevronDown, ChevronRight, Filter } from 'lucide-react';
import DomainApi from '../store/apis/domainApi';
import { getDomainNameSync } from '../utils/apiUtils';
import { useTranslation } from 'next-i18next';

const ActiveFiltersBar = ({
  showResults,
  selectedSubdomainFilters,
  subdomains,
  selectedDomain,
  domains,
  setSelectedSubdomainFilters,
  setSelectedSubdomains,
  setShowResults,
  setSelectedDomain,
  handleSearch,
  toSlug,
  selectedDomainFilters, // ✅ AJOUT : Nouvelle prop
  setSelectedDomainFilters // ✅ AJOUT : Nouvelle prop (optionnelle mais recommandée)
}) => {
  const router = useRouter();
  const { t } = useTranslation('common');
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Ne rien afficher si pas de résultats ou pas de sous-domaines sélectionnés
  if (!showResults || selectedSubdomainFilters.size === 0) return null;
  
  // Récupérer les données des sous-domaines sélectionnés
  const selectedSubdomainsData = [...selectedSubdomainFilters]
    .map(id => subdomains.find(s => s.id === id))
    .filter(Boolean);
  
  // ✅ CORRECTION PROBLÈME 1 : Récupérer le domaine depuis selectedDomainFilters ou selectedDomain
  // Priorité : selectedDomain > premier domaine dans selectedDomainFilters
  const activeDomainId = selectedDomain || 
    (selectedDomainFilters && selectedDomainFilters.size > 0 
      ? [...selectedDomainFilters][0] 
      : null);
  
  const domainName = activeDomainId ? getDomainNameSync(activeDomainId, domains) : null;
  const domainIcon = domainName ? DomainApi.getIconForDomain(domainName) : null;
  
  // Gestion de l'affichage plié/déplié
  const visibleCount = 3;
  const hasMore = selectedSubdomainsData.length > visibleCount;
  const displayedSubdomains = isExpanded 
    ? selectedSubdomainsData 
    : selectedSubdomainsData.slice(0, visibleCount);
  
  // Fonction pour retirer un sous-domaine
  const handleRemoveSubdomain = (subdomainId) => {
    const newSelected = new Set(selectedSubdomainFilters);
    newSelected.delete(subdomainId);
    setSelectedSubdomainFilters(newSelected);
    setSelectedSubdomains([...newSelected]);
    
    // ✅ AMÉLIORATION : Aussi mettre à jour selectedDomainFilters si fourni
    if (setSelectedDomainFilters && newSelected.size === 0) {
      setSelectedDomainFilters(new Set());
    }
    
    // Relancer la recherche avec les nouveaux filtres
    if (newSelected.size === 0) {
      setShowResults(false);
      setSelectedDomain(null);
      router.push('/?tab=search', undefined, { shallow: true });
    } else {
      handleSearch(null, true);
    }
  };
  
  // ✅ CORRECTION PROBLÈME 2 : Fonction pour modifier les filtres
  const handleModifyFilters = () => {
    console.log('🔧 Modifier les filtres - activeDomainId:', activeDomainId);
    
    // ✅ S'assurer que selectedDomain est défini pour afficher la bonne page
    if (activeDomainId && !selectedDomain) {
      console.log('✅ Définir selectedDomain:', activeDomainId);
      setSelectedDomain(activeDomainId);
    }
    
    // Masquer les résultats pour afficher le sélecteur de sous-domaines
    setShowResults(false);
    
    // Construire l'URL avec le domaine et les sous-domaines
    if (activeDomainId && domainName) {
      const domainSlug = toSlug(domainName);
      const subdomainSlugs = selectedSubdomainsData.map(sd => toSlug(sd.name)).join(',');
      
      console.log('🔗 Navigation vers:', `/?tab=search&domain=${domainSlug}&subdomains=${subdomainSlugs}`);
      
      router.push(
        `/?tab=search&domain=${domainSlug}&subdomains=${subdomainSlugs}`,
        undefined,
        { shallow: true }
      );
    } else {
      console.warn('⚠️ Impossible de modifier les filtres : domaine non trouvé');
    }
  };
  
  return (
    <div className="mb-6 bg-white rounded-xl shadow-md border border-gray-100 p-4">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div className="flex-1 min-w-0">
          {/* ✅ Domaine - Maintenant il s'affiche correctement */}
          {domainName && (
            <div className="mb-3">
              <span className="text-sm text-gray-500 font-medium">{t('filters.domains')}:</span>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xl">{domainIcon}</span>
                <span className="font-semibold text-gray-900">{domainName}</span>
              </div>
            </div>
          )}
          
          {/* Sous-domaines */}
          {selectedSubdomainsData.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm text-gray-500 font-medium">
                  {t('filters.specializations_count', { count: selectedSubdomainsData.length })}:
                </span>
                {hasMore && (
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 transition-colors"
                  >
                    {isExpanded ? (
                      <>
                        <ChevronDown className="w-3 h-3" />
                        {t('filters.viewLess')}
                      </>
                    ) : (
                      <>
                        <ChevronRight className="w-3 h-3" />
                        {t('filters.viewMore', { count: selectedSubdomainsData.length - visibleCount })}
                      </>
                    )}
                  </button>
                )}
              </div>
              
              <div className="flex flex-wrap gap-2">
                {displayedSubdomains.map((subdomain) => (
                  <span 
                    key={subdomain.id}
                    className="inline-flex items-center gap-1.5 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 px-3 py-1.5 rounded-full text-sm border border-blue-200 hover:border-blue-300 transition-colors"
                  >
                    <span className="font-medium">{subdomain.name}</span>
                    <button
                      onClick={() => handleRemoveSubdomain(subdomain.id)}
                      className="hover:bg-blue-200 rounded-full p-0.5 transition-colors"
                      title={t('filters.removeFilter')}
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
                
                {hasMore && !isExpanded && (
                  <span className="inline-flex items-center text-gray-500 text-sm py-1.5 px-2">
                    +{selectedSubdomainsData.length - visibleCount} {t('filters.more')}...
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
        
        {/* ✅ Bouton pour modifier les filtres - Maintenant il redirige correctement */}
        <button
          onClick={handleModifyFilters}
          className="flex-shrink-0 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 whitespace-nowrap"
        >
          <Filter className="w-4 h-4" />
          {t('filters.modify')}
        </button>
      </div>
    </div>
  );
};

export default ActiveFiltersBar;
