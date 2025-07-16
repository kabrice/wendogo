// src/pages/test-auth.js
import React, { useState } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useFavorites } from '../contexts/FavoritesContext';
import Head from 'next/head';

const TestAuthPage = () => {
  const { data: session, status } = useSession();
  const { favorites, toggleFavorite, loadFavorites } = useFavorites();
  const [testResults, setTestResults] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Test 1: Vérifier la session NextAuth
  const testSession = () => {
    const result = {
      status: status,
      isConnected: !!session,
      email: session?.user?.email || 'N/A',
      accessToken: session?.accessToken ? 'Présent' : 'Absent',
      tokenPreview: session?.accessToken ? session.accessToken.substring(0, 30) + '...' : 'N/A'
    };
    
    setTestResults(prev => ({ ...prev, session: result }));
    console.log('🔍 Test Session:', result);
  };

  // Test 2: Appel direct à l'API Flask pour les favoris
  const testFlaskAPI = async () => {
    setIsLoading(true);
    
    try {
      console.log('🔍 Test API Flask - Token:', session?.accessToken);
      
      const response = await fetch('http://127.0.0.1:5000/api/user/favorites', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.accessToken}`,
        },
        credentials: 'include',
      });

      const responseText = await response.text();
      let data;
      
      try {
        data = JSON.parse(responseText);
      } catch {
        data = { raw: responseText };
      }

      const result = {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok,
        headers: Object.fromEntries(response.headers.entries()),
        data: data
      };

      setTestResults(prev => ({ ...prev, flaskAPI: result }));
      console.log('📡 Test Flask API:', result);
      
    } catch (error) {
      const result = {
        error: error.message,
        stack: error.stack
      };
      
      setTestResults(prev => ({ ...prev, flaskAPI: result }));
      console.error('❌ Erreur Test Flask API:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Test 3: Test du contexte Favoris
  const testFavoritesContext = async () => {
    try {
      console.log('🔍 Test Contexte Favoris');
      
      // Test de chargement des favoris
      await loadFavorites();
      
      const result = {
        favoritesCount: favorites.size,
        favoritesList: Array.from(favorites),
        contextAvailable: true
      };

      setTestResults(prev => ({ ...prev, favoritesContext: result }));
      console.log('❤️ Test Contexte Favoris:', result);
      
    } catch (error) {
      const result = {
        error: error.message,
        contextAvailable: false
      };
      
      setTestResults(prev => ({ ...prev, favoritesContext: result }));
      console.error('❌ Erreur Test Contexte:', error);
    }
  };

  // Test 4: Test d'ajout/suppression de favori
  const testToggleFavorite = async () => {
    const testProgramId = 'prog001557'; // ID de test
    
    try {
      console.log('🔍 Test Toggle Favori pour:', testProgramId);
      
      const wasInFavorites = favorites.has(testProgramId);
      await toggleFavorite(testProgramId);
      
      // Attendre un peu pour voir le changement
      setTimeout(() => {
        const nowInFavorites = favorites.has(testProgramId);
        
        const result = {
          programId: testProgramId,
          wasInFavorites: wasInFavorites,
          nowInFavorites: nowInFavorites,
          actionPerformed: wasInFavorites ? 'remove' : 'add',
          success: wasInFavorites !== nowInFavorites
        };

        setTestResults(prev => ({ ...prev, toggleFavorite: result }));
        console.log('🔄 Test Toggle Favori:', result);
      }, 1000);
      
    } catch (error) {
      const result = {
        error: error.message,
        programId: testProgramId
      };
      
      setTestResults(prev => ({ ...prev, toggleFavorite: result }));
      console.error('❌ Erreur Test Toggle:', error);
    }
  };

  // Test 5: Connexion/Déconnexion
  const testAuth = async (provider) => {
    try {
      if (provider === 'logout') {
        console.log('🔍 Test Déconnexion');
        await signOut();
      } else {
        console.log('🔍 Test Connexion:', provider);
        await signIn(provider);
      }
    } catch (error) {
      console.error('❌ Erreur Test Auth:', error);
    }
  };

  // Exécuter tous les tests
  const runAllTests = async () => {
    console.log('🚀 Lancement de tous les tests...');
    setTestResults({});
    
    testSession();
    
    if (session?.accessToken) {
      await testFlaskAPI();
      await testFavoritesContext();
      // await testToggleFavorite(); // Commenté pour éviter d'ajouter/supprimer en boucle
    }
  };
  const forceReauth = async () => {
  console.log('🔄 Force reauth - Déconnexion...');
  await signOut({ redirect: false });
  
  // Attendre un peu
  setTimeout(async () => {
    console.log('🔄 Force reauth - Reconnexion Google...');
    await signIn('google');
  }, 1000);
    };


  return (
    <>
      <Head>
        <title>Test Authentification - Debug</title>
      </Head>
      
      <div style={{ padding: '20px', fontFamily: 'monospace', maxWidth: '1000px', margin: '0 auto' }}>
        <h1>🔧 Page de Test Authentification</h1>
        
        {/* Section Session */}
        <div style={{ background: '#f0f8ff', padding: '15px', margin: '10px 0', borderRadius: '5px', border: '1px solid #ccc' }}>
          <h2>📋 Informations Session</h2>
          <p><strong>Status:</strong> {status}</p>
          <p><strong>Connecté:</strong> {session ? '✅ Oui' : '❌ Non'}</p>
          <p><strong>Email:</strong> {session?.user?.email || 'N/A'}</p>
          <p><strong>Nom:</strong> {session?.user?.name || 'N/A'}</p>
          <p><strong>Access Token:</strong> {session?.accessToken ? '✅ Présent' : '❌ Absent'}</p>
          {session?.accessToken && (
            <p><strong>Token preview:</strong> <code>{session.accessToken.substring(0, 40)}...</code></p>
          )}
        </div>

        {/* Boutons de test */}
        <div style={{ background: '#fff5ee', padding: '15px', margin: '10px 0', borderRadius: '5px', border: '1px solid #ccc' }}>
          <h2>🎯 Tests Individuels</h2>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '10px' }}>
            <button onClick={testSession} style={buttonStyle}>
              📋 Test Session
            </button>
            <button onClick={testFlaskAPI} disabled={!session?.accessToken || isLoading} style={buttonStyle}>
              📡 Test API Flask
            </button>
            <button onClick={testFavoritesContext} disabled={!session} style={buttonStyle}>
              ❤️ Test Contexte Favoris
            </button>
            <button onClick={testToggleFavorite} disabled={!session} style={buttonStyle}>
              🔄 Test Toggle Favori
            </button>
          </div>
          
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button onClick={runAllTests} disabled={isLoading} style={{ ...buttonStyle, background: '#4CAF50' }}>
              🚀 Lancer Tous Les Tests
            </button>
            {!session && (
              <>
                <button onClick={() => testAuth('credentials')} style={buttonStyle}>
                  🔑 Connexion Email
                </button>
                <button onClick={() => testAuth('google')} style={buttonStyle}>
                  🔑 Connexion Google
                </button>
              </>
            )}
            {session && (
              <>
                <button onClick={() => testAuth('logout')} style={{ ...buttonStyle, background: '#f44336' }}>
                    🚪 Déconnexion
                </button>
                <button onClick={forceReauth} style={buttonStyle}>🔄 Force Re-auth Google</button>
              </>
            )}
          </div>
        </div>

        {/* Résultats des tests */}
        <div style={{ background: '#f5f5f5', padding: '15px', margin: '10px 0', borderRadius: '5px', border: '1px solid #ccc' }}>
          <h2>📊 Résultats des Tests</h2>
          {Object.keys(testResults).length === 0 ? (
            <p><em>Aucun test exécuté</em></p>
          ) : (
            Object.entries(testResults).map(([testName, result]) => (
              <div key={testName} style={{ marginBottom: '15px' }}>
                <h3 style={{ color: '#333', borderBottom: '1px solid #ddd' }}>
                  {testName.toUpperCase()}
                </h3>
                <pre style={{ 
                  background: '#fff', 
                  padding: '10px', 
                  border: '1px solid #ddd', 
                  borderRadius: '3px',
                  overflow: 'auto',
                  fontSize: '12px',
                  maxHeight: '200px'
                }}>
                  {JSON.stringify(result, null, 2)}
                </pre>
              </div>
            ))
          )}
        </div>

        {/* Instructions */}
        <div style={{ background: '#fff9c4', padding: '15px', margin: '10px 0', borderRadius: '5px', border: '1px solid #ccc' }}>
          <h2>📝 Instructions</h2>
          <ol>
            <li><strong>Connectez-vous</strong> avec vos identifiants</li>
            <li><strong>Vérifiez</strong> que l'Access Token est présent</li>
            <li><strong>Testez l'API Flask</strong> pour voir si l'authentification fonctionne</li>
            <li><strong>Testez le contexte Favoris</strong> pour vérifier l'intégration</li>
            <li><strong>Regardez la console</strong> pour plus de détails sur les erreurs</li>
          </ol>
        </div>

        {/* Logs en temps réel */}
        <div style={{ background: '#f0f0f0', padding: '15px', margin: '10px 0', borderRadius: '5px', border: '1px solid #ccc' }}>
          <h2>📝 Logs Console</h2>
          <p><em>Ouvrez la console de votre navigateur (F12) pour voir les logs détaillés en temps réel.</em></p>
        </div>
      </div>
    </>
  );
};

const buttonStyle = {
  padding: '8px 16px',
  background: '#2196F3',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '14px'
};

export default TestAuthPage;
