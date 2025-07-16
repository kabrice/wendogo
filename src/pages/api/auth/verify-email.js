// src/pages/api/auth/verify-email.js - CONTENU CORRECT POUR L'API ROUTE
import { REST_API_PARAMS } from '../../../utils/Constants';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { token, email } = req.body;

    if (!token || !email) {
      return res.status(400).json({ 
        success: false, 
        error: 'Token et email requis' 
      });
    }

    console.log('🔍 Vérification email:', { email, token: token.substring(0, 10) + '...' });

    // Vérifier le token via l'API Flask
    const verifyResponse = await fetch(`${REST_API_PARAMS.baseUrl}/auth/verify-token`, {
      method: 'POST',
      headers: REST_API_PARAMS.headers,
      body: JSON.stringify({ 
        token: token, 
        email: email 
      })
    });

    const result = await verifyResponse.json();
    
    console.log('📥 Réponse Flask:', { 
      status: verifyResponse.status, 
      success: result.success,
      message: result.message 
    });

    if (verifyResponse.ok && result.success) {
      return res.status(200).json({
        success: true,
        message: result.message || 'Email vérifié avec succès'
      });
    } else {
      return res.status(400).json({
        success: false,
        error: result.error || 'Token invalide ou expiré'
      });
    }

  } catch (error) {
    console.error('❌ Erreur vérification email:', error);
    return res.status(500).json({ 
      success: false,
      error: 'Erreur interne lors de la vérification' 
    });
  }
}
