// Installation recommandée :
// npm install react-country-flag country-list

// src/components/CountrySelector.js - Composant réutilisable

import React, { useState, useRef, useEffect } from 'react';
import ReactCountryFlag from 'react-country-flag';
import { countries } from 'country-list';
import { ChevronDown, Search, Globe } from 'lucide-react';

// Liste des pays prioritaires - Pays francophones et partenaires
const PRIORITY_COUNTRIES = [
  'BF', 'BI', 'CM', 'CA', 'CF', 'TD', 'KM', 'CD', 'CG', 'CI', 
  'DJ', 'FR', 'GA', 'GN', 'GW', 'HT', 'LU', 'MG', 'ML', 'MC', 
  'NE', 'RW', 'SN', 'SC', 'CH', 'TG'
];

const CountrySelector = ({ 
  value, 
  onChange, 
  placeholder = "Sélectionnez un pays",
  className = "",
  error = false 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);

  // Fermer le dropdown lors du clic extérieur
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focus sur la recherche quand le dropdown s'ouvre
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  // Obtenir tous les pays avec données complètes
  const getAllCountries = () => {
    try {
      // Utiliser country-list pour avoir les noms en français
      const countryData = require('country-list/data.json');
      
      // Mapper vers notre format avec priorités
      const allCountries = countryData.map(country => ({
        code: country.code,
        name: country.name,
        isPriority: PRIORITY_COUNTRIES.includes(country.code)
      }));

      // Trier : pays prioritaires en premier, puis alphabétique
      return allCountries.sort((a, b) => {
        if (a.isPriority && !b.isPriority) return -1;
        if (!a.isPriority && b.isPriority) return 1;
        return a.name.localeCompare(b.name, 'fr');
      });
    } catch (error) {
      console.error('Erreur loading countries:', error);
      return [];
    }
  };

  const allCountries = getAllCountries();

  // Filtrer les pays selon la recherche
  const filteredCountries = allCountries.filter(country =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    country.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Obtenir le pays sélectionné
  const selectedCountry = allCountries.find(country => country.code === value);

  const handleSelect = (countryCode) => {
    onChange(countryCode);
    setIsOpen(false);
    setSearchTerm('');
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bouton de sélection */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
          error ? 'border-red-300' : 'border-gray-300 hover:border-gray-400'
        } ${className}`}
      >
        <div className="flex items-center gap-3">
          {selectedCountry ? (
            <>
              <ReactCountryFlag
                countryCode={selectedCountry.code}
                svg
                style={{ width: '20px', height: '15px' }}
                title={selectedCountry.name}
              />
              <span className="text-gray-900">{selectedCountry.name}</span>
            </>
          ) : (
            <>
              <Globe className="w-5 h-5 text-gray-400" />
              <span className="text-gray-500">{placeholder}</span>
            </>
          )}
        </div>
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${
          isOpen ? 'rotate-180' : ''
        }`} />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50 max-h-60 overflow-hidden">
          {/* Barre de recherche */}
          <div className="p-3 border-b border-gray-100">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Rechercher un pays..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>
          </div>

          {/* Liste des pays */}
          <div className="overflow-y-auto max-h-40">
            {filteredCountries.length === 0 ? (
              <div className="p-3 text-center text-gray-500 text-sm">
                Aucun pays trouvé
              </div>
            ) : (
              <>
                {/* Pays prioritaires */}
                {filteredCountries.some(c => c.isPriority) && (
                  <div>
                    <div className="px-3 py-2 bg-gray-50 border-b border-gray-100">
                      <span className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                        Pays fréquents
                      </span>
                    </div>
                    {filteredCountries
                      .filter(country => country.isPriority)
                      .map(country => (
                        <button
                          key={country.code}
                          onClick={() => handleSelect(country.code)}
                          className="w-full flex items-center gap-3 px-3 py-2 hover:bg-blue-50 hover:text-blue-700 transition-colors text-left"
                        >
                          <ReactCountryFlag
                            countryCode={country.code}
                            svg
                            style={{ width: '20px', height: '15px' }}
                            title={country.name}
                          />
                          <span className="text-sm">{country.name}</span>
                          {country.code === value && (
                            <div className="ml-auto w-2 h-2 bg-blue-600 rounded-full" />
                          )}
                        </button>
                      ))}
                  </div>
                )}

                {/* Autres pays */}
                {filteredCountries.some(c => !c.isPriority) && (
                  <div>
                    {filteredCountries.some(c => c.isPriority) && (
                      <div className="px-3 py-2 bg-gray-50 border-b border-gray-100">
                        <span className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                          Autres pays
                        </span>
                      </div>
                    )}
                    {filteredCountries
                      .filter(country => !country.isPriority)
                      .map(country => (
                        <button
                          key={country.code}
                          onClick={() => handleSelect(country.code)}
                          className="w-full flex items-center gap-3 px-3 py-2 hover:bg-blue-50 hover:text-blue-700 transition-colors text-left"
                        >
                          <ReactCountryFlag
                            countryCode={country.code}
                            svg
                            style={{ width: '20px', height: '15px' }}
                            title={country.name}
                          />
                          <span className="text-sm">{country.name}</span>
                          {country.code === value && (
                            <div className="ml-auto w-2 h-2 bg-blue-600 rounded-full" />
                          )}
                        </button>
                      ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CountrySelector;
