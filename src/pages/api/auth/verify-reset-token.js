// src/pages/api/auth/verify-reset-token.js
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

    const verifyResponse = await fetch(`${REST_API_PARAMS.baseUrl}/auth/verify-reset-token?locale=${locale}`, {
      method: 'POST',
      headers: REST_API_PARAMS.headers,
      body: JSON.stringify({ token, email })
    });

    const result = await verifyResponse.json();

    if (verifyResponse.ok && result.success) {
      return res.status(200).json({
        success: true,
        message: 'Token valide'
      });
    } else {
      return res.status(400).json({
        success: false,
        error: result.error || 'Token invalide'
      });
    }

  } catch (error) {
    console.error('❌ Erreur vérification token reset:', error);
    return res.status(500).json({ 
      success: false,
      error: 'Erreur lors de la vérification' 
    });
  }
}
