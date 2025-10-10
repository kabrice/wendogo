import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { X, ChevronDown, ChevronRight, Filter } from 'lucide-react';
import DomainApi from '../store/apis/domainApi';
import { getDomainNameSync } from '../utils/apiUtils';

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
  toSlug
}) => {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Ne rien afficher si pas de résultats ou pas de sous-domaines sélectionnés
  if (!showResults || selectedSubdomainFilters.size === 0) return null;
  
  // Récupérer les données des sous-domaines sélectionnés
  const selectedSubdomainsData = [...selectedSubdomainFilters]
    .map(id => subdomains.find(s => s.id === id))
    .filter(Boolean);
  
  // Récupérer le nom et l'icône du domaine
  const domainName = selectedDomain ? getDomainNameSync(selectedDomain, domains) : null;
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
    
    // Relancer la recherche avec les nouveaux filtres
    if (newSelected.size === 0) {
      setShowResults(false);
      setSelectedDomain(null);
      router.push('/?tab=search', undefined, { shallow: true });
    } else {
      handleSearch(null, true);
    }
  };
  
  // Fonction pour modifier les filtres
  const handleModifyFilters = () => {
    setShowResults(false);
    const domainSlug = toSlug(domainName);
    const subdomainSlugs = selectedSubdomainsData.map(sd => toSlug(sd.name)).join(',');
    router.push(
      `/?tab=search&domain=${domainSlug}&subdomains=${subdomainSlugs}`,
      undefined,
      { shallow: true }
    );
  };
  
  return (
    <div className="mb-6 bg-white rounded-xl shadow-md border border-gray-100 p-4">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div className="flex-1 min-w-0">
          {/* Domaine */}
          {domainName && (
            <div className="mb-3">
              <span className="text-sm text-gray-500 font-medium">Domaine :</span>
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
                  Spécialisations ({selectedSubdomainsData.length}) :
                </span>
                {hasMore && (
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 transition-colors"
                  >
                    {isExpanded ? (
                      <>
                        <ChevronDown className="w-3 h-3" />
                        Voir moins
                      </>
                    ) : (
                      <>
                        <ChevronRight className="w-3 h-3" />
                        Voir tout ({selectedSubdomainsData.length - visibleCount} de plus)
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
                      title="Retirer ce filtre"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
                
                {hasMore && !isExpanded && (
                  <span className="inline-flex items-center text-gray-500 text-sm py-1.5 px-2">
                    +{selectedSubdomainsData.length - visibleCount} autres...
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
        
        {/* Bouton pour modifier les filtres */}
        <button
          onClick={handleModifyFilters}
          className="flex-shrink-0 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 whitespace-nowrap"
        >
          <Filter className="w-4 h-4" />
          Modifier les filtres
        </button>
      </div>
    </div>
  );
};

export default ActiveFiltersBar;
