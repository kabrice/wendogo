// src/pages/favorites.js - Version améliorée

import React, { useState, useEffect, startTransition } from 'react';
import { useSession } from 'next-auth/react';
import { Search, Heart, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import NavBar from '../components/NavBar';
import FavoriteButton from '../components/FavoriteButton';
import { REST_API_PARAMS } from '../utils/Constants';
import OptimizedImage from '../components/OptimizedImage';
import FooterSingleRow from '../components/FooterSingleRow';
import { useRouter } from 'next/router';

const ITEMS_PER_PAGE = 12;

const FavoritesPage = () => {
  const { data: session, status } = useSession();
  const [programs, setPrograms] = useState([]);
  const [filteredPrograms, setFilteredPrograms] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const router = useRouter();

  // ✅ AJOUTER ce useEffect :
  useEffect(() => {
    if (status === 'loading') return;
    
    if (!session) {
      startTransition(() => {
        router.push('/');
      });
    }
  }, [session, status, router]);


  useEffect(() => {
    if (session?.user) {
      loadFavoritePrograms();
    }
  }, [session]);

  useEffect(() => {
    filterPrograms();
  }, [programs, searchQuery, currentPage]);

  const loadFavoritePrograms = async () => {
    try {
      const response = await fetch(`${REST_API_PARAMS.baseUrl}/api/user/favorites/programs`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.accessToken}`,
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
          'Access-Control-Request-Method': 'GET, POST, DELETE, PUT, OPTIONS'
          }
      });
    
      if (response.ok) {
        const data = await response.json();
      
        setPrograms(data.programs || []);
      }
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterPrograms = () => {
    let filtered = [...programs];
    
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(program => 
        (program.title || program.name || '').toLowerCase().includes(query) ||
        (program.school_name || '').toLowerCase().includes(query) ||
        (program.grade || '').toLowerCase().includes(query)
      );
    }
    
    setFilteredPrograms(filtered);
  };

  // Pagination
  const totalPages = Math.ceil(filteredPrograms.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentPrograms = filteredPrograms.slice(startIndex, endIndex);

  const goToPage = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Connexion requise</h1>
          <p>Veuillez vous connecter pour voir vos favoris.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      
      <div className="container mx-auto px-4 py-8">
        {/* En-tête */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Mes formations favorites
          </h1>
          <p className="text-gray-600">
            {filteredPrograms.length} formation{filteredPrograms.length !== 1 ? 's' : ''} 
            {searchQuery && ` trouvée${filteredPrograms.length !== 1 ? 's' : ''} pour "${searchQuery}"`}
          </p>
        </div>

        {/* Barre de recherche */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Rechercher dans vos favoris..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Liste des programmes */}
        {currentPrograms.length === 0 ? (
          <div className="text-center py-12">
            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {searchQuery ? 'Aucun résultat trouvé' : 'Aucune formation favorite'}
            </h3>
            <p className="text-gray-600 mb-6">
              {searchQuery 
                ? 'Essayez avec d\'autres mots-clés'
                : 'Commencez à ajouter des formations à vos favoris pour les retrouver ici'
              }
            </p>
            {!searchQuery && (
              <a 
                href="/"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Découvrir les formations
              </a>
            )}
          </div>
        ) : (
          <>
            {/* Grille des programmes */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {currentPrograms.map((program) => (
                <div key={program.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-200">
                  {/* Header avec logo école */}
                  <div className="p-6 pb-4">
                    <div className="flex items-start gap-4 mb-4">
                      {/* Logo de l'école */}
                      <div className="flex-shrink-0">
                        {program.school?.logo_path ? (
                          <OptimizedImage 
                            src={'/images/schools/logos/'+program.school.logo_path} 
                            alt={program.school_name}
                            className="w-12 h-12 object-contain rounded-lg border border-gray-200"
                          />
                        ) : (
                          <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                            <span className="text-gray-400 text-xs font-semibold">
                              {program.school_name?.charAt(0) || 'E'}
                            </span>
                          </div>
                        )}
                      </div>
                      
                      {/* Titre et école */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-gray-900 text-lg line-clamp-2 mb-1">
                          {program.title || program.name}
                        </h3>
                        <p className="text-gray-600 text-sm font-medium">
                          {program.school_name}
                        </p>
                      </div>
                      
                      {/* Bouton favori */}
                      <FavoriteButton 
                        programId={program.id} 
                        size="w-5 h-5"
                        className="flex-shrink-0"
                      />
                    </div>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {program.grade && (
                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                          {program.grade}
                        </span>
                      )}
                      {program.fi_school_duration && (
                        <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                          {program.fi_school_duration}
                        </span>
                      )}
                      {program.alternance_possible && (
                        <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
                          Alternance
                        </span>
                      )}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <span className="text-sm text-gray-500">
                        Ajouté le {new Date(program.favorited_at).toLocaleDateString('fr-FR')}
                      </span>
                      <a 
                        href={`/schools/${program.school?.slug}/programs/${program.slug}`}
                        className="inline-flex items-center gap-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                      >
                        <span>Voir</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-700">
                  Affichage de {startIndex + 1} à {Math.min(endIndex, filteredPrograms.length)} sur {filteredPrograms.length} résultats
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="flex items-center gap-1 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Précédent
                  </button>
                  
                  <div className="flex items-center gap-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      const page = i + 1;
                      return (
                        <button
                          key={page}
                          onClick={() => goToPage(page)}
                          className={`px-3 py-2 rounded-lg ${
                            currentPage === page
                              ? 'bg-blue-600 text-white'
                              : 'border border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          {page}
                        </button>
                      );
                    })}
                  </div>
                  
                  <button
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="flex items-center gap-1 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Suivant
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
      <FooterSingleRow />
    </div>
  );
};

export default FavoritesPage;
