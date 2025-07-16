// src/pages/api/auth/reset-password-confirm.js
import { REST_API_PARAMS } from '../../../utils/Constants';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { token, email, new_password } = req.body;

    if (!token || !email || !new_password) {
      return res.status(400).json({ 
        success: false, 
        error: 'Tous les champs sont requis' 
      });
    }

    console.log('🔄 Réinitialisation mot de passe pour:', email);

    // Appeler Flask pour réinitialiser le mot de passe
    const resetResponse = await fetch(`${REST_API_PARAMS.baseUrl}/auth/reset-password`, {
      method: 'POST',
      headers: REST_API_PARAMS.headers,
      body: JSON.stringify({
        token: token,
        email: email,
        new_password: new_password
      })
    });

    const result = await resetResponse.json();

    if (resetResponse.ok && result.success) {
      console.log('✅ Mot de passe réinitialisé avec succès pour:', email);
      return res.status(200).json({
        success: true,
        message: 'Mot de passe réinitialisé avec succès'
      });
    } else {
      console.log('❌ Erreur lors de la réinitialisation:', result.error);
      return res.status(400).json({
        success: false,
        error: result.error || 'Erreur lors de la réinitialisation'
      });
    }

  } catch (error) {
    console.error('❌ Erreur reset password confirm:', error);
    return res.status(500).json({ 
      success: false,
      error: 'Erreur serveur lors de la réinitialisation' 
    });
  }
}

// src/pages/api/auth/verify-reset-token.js
export async function verifyResetTokenHandler(req, res) {
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

    // Vérifier le token via Flask
    const verifyResponse = await fetch(`${REST_API_PARAMS.baseUrl}/auth/verify-reset-token`, {
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
