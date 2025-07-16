// src/hooks/useCurrencyConverter.js - Hook de conversion automatique

import { useState, useEffect } from 'react';
import { IPINFO_URL } from '../utils/Constants';

export const useCurrencyConverter = () => {
  const [rates, setRates] = useState({});
  const [userCountry, setUserCountry] = useState('FR');
  const [userCurrency, setUserCurrency] = useState('EUR');
  const [isLoading, setIsLoading] = useState(true);

  // Mapping pays -> devise (principales destinations)
  const currencyMap = {
    // Europe
    'FR': 'EUR', 'BE': 'EUR', 'LU': 'EUR', 'DE': 'EUR', 'IT': 'EUR', 'ES': 'EUR',
    'CH': 'CHF', 'GB': 'GBP', 'NO': 'NOK', 'SE': 'SEK', 'DK': 'DKK',
    
    // Afrique francophone
    'CM': 'XAF', 'SN': 'XOF', 'CI': 'XOF', 'TG': 'XOF', 'BJ': 'XOF', 
    'BF': 'XOF', 'ML': 'XOF', 'NE': 'XOF', 'TD': 'XAF', 'GA': 'XAF',
    'CG': 'XAF', 'CD': 'CDF', 'CF': 'XAF', 'GN': 'GNF', 'RW': 'RWF',
    'BI': 'BIF', 'DJ': 'DJF', 'KM': 'KMF', 'MG': 'MGA', 'SC': 'SCR',
    
    // Afrique du Nord
    'MA': 'MAD', 'TN': 'TND', 'DZ': 'DZD', 'EG': 'EGP',
    
    // Amériques
    'US': 'USD', 'CA': 'CAD', 'BR': 'BRL', 'AR': 'ARS', 'MX': 'MXN',
    'HT': 'HTG',
    
    // Asie
    'CN': 'CNY', 'JP': 'JPY', 'IN': 'INR', 'KR': 'KRW', 'TH': 'THB',
    'VN': 'VND', 'SG': 'SGD', 'MY': 'MYR', 'ID': 'IDR', 'PH': 'PHP',
    
    // Autres
    'AU': 'AUD', 'NZ': 'NZD', 'ZA': 'ZAR', 'RU': 'RUB', 'TR': 'TRY'
  };

  // Symboles des devises
  const currencySymbols = {
    'EUR': '€', 'USD': '$', 'GBP': '£', 'CHF': 'CHF', 'CAD': 'CAD$',
    'XAF': 'FCFA', 'XOF': 'FCFA', 'MAD': 'DH', 'TND': 'TND', 'DZD': 'DA',
    'CDF': 'FC', 'GNF': 'FG', 'RWF': 'RF', 'BIF': 'FBu', 'DJF': 'Fdj',
    'KMF': 'CF', 'MGA': 'Ar', 'SCR': 'SR', 'EGP': 'LE', 'HTG': 'G',
    'CNY': '¥', 'JPY': '¥', 'INR': '₹', 'KRW': '₩', 'BRL': 'R$',
    'AUD': 'A$', 'NZD': 'NZ$', 'ZAR': 'R', 'RUB': '₽'
  };

  useEffect(() => {
    const initializeCurrency = async () => {
      setIsLoading(true);
      
      try {
        // 1. Détecter le pays de l'utilisateur
        await fetchUserLocation();
        
        // 2. Récupérer les taux de change
        await fetchExchangeRates();
        
      } catch (error) {
        console.error('Erreur initialisation devise:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeCurrency();
  }, []);

  const fetchUserLocation = async () => {
    try {
      // Utiliser l'URL configurée dans Constants.js
      const response = await fetch(IPINFO_URL);
      const data = await response.json();
      console.log('🌍 Pays détecté:', data.country);
      setUserCountry(data.country);
      
      const detectedCurrency = currencyMap[data.country] || 'EUR';
      setUserCurrency(detectedCurrency);
      
      console.log('💰 Devise détectée:', detectedCurrency);
      
    } catch (error) {
      console.error('Erreur géolocalisation:', error);
      // Fallback : utiliser les préférences du navigateur
      try {
        const locale = navigator.language || navigator.languages[0];
        const countryCode = locale.split('-')[1]?.toUpperCase();
        
        if (countryCode && currencyMap[countryCode]) {
          setUserCountry(countryCode);
          setUserCurrency(currencyMap[countryCode]);
        }
      } catch (fallbackError) {
        console.error('Erreur fallback:', fallbackError);
        // Dernière option : EUR par défaut
        setUserCountry('FR');
        setUserCurrency('EUR');
      }
    }
  };

  const fetchExchangeRates = async () => {
    try {
      // Utiliser exchangerate-api.com (gratuit jusqu'à 1500 requêtes/mois)
      const response = await fetch('https://api.exchangerate-api.com/v4/latest/EUR');
      const data = await response.json();
      
      setRates(data.rates);
      console.log('📈 Taux de change mis à jour');
      
    } catch (error) {
      console.error('Erreur taux de change:', error);
      // Utiliser des taux de change par défaut si l'API échoue
      setRates({
        'EUR': 1, 'USD': 1.08, 'GBP': 0.86, 'CHF': 0.97, 'CAD': 1.47,
        'XAF': 655, 'XOF': 655, 'MAD': 10.8, 'TND': 3.35, 'DZD': 145,
        'CDF': 2500, 'GNF': 8600, 'RWF': 1300, 'HTG': 133
      });
    }
  };

  const convertPrice = (priceEUR, targetCurrency = null) => {
    const currency = targetCurrency || userCurrency;
    
    if (currency === 'EUR' || !rates[currency]) {
      return `${priceEUR}€`;
    }
    
    const rate = rates[currency];
    const convertedPrice = priceEUR * rate;
    
    // Fonction pour arrondir intelligemment avec des 0
    const roundToNiceNumber = (value) => {
      if (value < 100) {
        // Pour les petites valeurs, arrondir à 10
        return Math.round(value / 10) * 10;
      } else if (value < 1000) {
        // Pour les valeurs moyennes, arrondir à 50 ou 100
        if (value < 500) {
          return Math.round(value / 50) * 50;
        } else {
          return Math.round(value / 100) * 100;
        }
      } else if (value < 10000) {
        // Pour les grandes valeurs, arrondir à 500 ou 1000
        if (value < 5000) {
          return Math.round(value / 500) * 500;
        } else {
          return Math.round(value / 1000) * 1000;
        }
      } else {
        // Pour les très grandes valeurs, arrondir à 1000
        return Math.round(value / 1000) * 1000;
      }
    };
    
    const roundedPrice = roundToNiceNumber(convertedPrice);
    const symbol = currencySymbols[currency] || currency;
    
    // Formatage selon la devise
    if (['XAF', 'XOF', 'CDF', 'GNF', 'RWF', 'BIF'].includes(currency)) {
      // Devises sans décimales - FCFA et équivalents
      return `${roundedPrice.toLocaleString()} ${symbol}`;
    } else if (['JPY', 'KRW'].includes(currency)) {
      // Devises asiatiques sans décimales
      return `${symbol}${roundedPrice.toLocaleString()}`;
    } else if (['USD', 'GBP', 'CHF', 'CAD', 'AUD', 'NZD'].includes(currency)) {
      // Devises avec décimales - arrondir à 50 ou 100
      const nicePrice = currency === 'USD' || currency === 'CAD' ? 
        Math.round(roundedPrice / 50) * 50 : 
        Math.round(roundedPrice / 10) * 10;
      return `${symbol}${nicePrice}`;
    } else {
      // Autres devises
      return `${symbol}${roundedPrice}`;
    }
  };

  const getCountryName = (countryCode = userCountry) => {
    const countryNames = {
      'FR': 'France', 'CM': 'Cameroun', 'SN': 'Sénégal', 'CI': 'Côte d\'Ivoire',
      'MA': 'Maroc', 'TN': 'Tunisie', 'DZ': 'Algérie', 'US': 'États-Unis',
      'CA': 'Canada', 'GB': 'Royaume-Uni', 'CH': 'Suisse', 'BE': 'Belgique',
      'TG': 'Togo', 'BJ': 'Bénin', 'BF': 'Burkina Faso', 'ML': 'Mali',
      'NE': 'Niger', 'TD': 'Tchad', 'GA': 'Gabon', 'CG': 'Congo',
      'CD': 'RD Congo', 'CF': 'Centrafrique', 'GN': 'Guinée', 'RW': 'Rwanda'
    };
    
    return countryNames[countryCode] || countryCode;
  };

  const getCurrencyName = (currencyCode = userCurrency) => {
    const currencyNames = {
      'EUR': 'Euro', 'USD': 'Dollar US', 'GBP': 'Livre Sterling', 'CHF': 'Franc Suisse',
      'XAF': 'Franc CFA Central', 'XOF': 'Franc CFA Ouest', 'MAD': 'Dirham Marocain',
      'TND': 'Dinar Tunisien', 'DZD': 'Dinar Algérien', 'CAD': 'Dollar Canadien',
      'CDF': 'Franc Congolais', 'GNF': 'Franc Guinéen', 'RWF': 'Franc Rwandais'
    };
    
    return currencyNames[currencyCode] || currencyCode;
  };

  return {
    convertPrice,
    userCountry,
    userCurrency,
    isLoading,
    rates,
    getCountryName,
    getCurrencyName,
    currencySymbol: currencySymbols[userCurrency] || userCurrency
  };
};
