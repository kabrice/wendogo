import { REST_API_PARAMS } from '../../../utils/Constants';
import { getApiMessages } from '../../../utils/apiMessages';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { token, email, locale = 'fr' } = req.body;
    const messages = getApiMessages(locale);

    if (!token || !email) {
      return res.status(400).json({ 
        success: false, 
        error: messages.TOKEN_REQUIRED
      });
    }

    // Vérifier le token via Flask
    const verifyResponse = await fetch(`${REST_API_PARAMS.baseUrl}/auth/verify-token`, {
      method: 'POST',
      headers: REST_API_PARAMS.headers,
      body: JSON.stringify({ 
        token, 
        email,
        locale
      })
    });

    const result = await verifyResponse.json();

    if (verifyResponse.ok && result.success) {
      return res.status(200).json({
        success: true,
        message: result.message || messages.EMAIL_VERIFIED
      });
    } else {
      return res.status(400).json({
        success: false,
        error: result.error || messages.VERIFICATION_ERROR
      });
    }

  } catch (error) {
    console.error('Erreur vérification email:', error);
    const locale = req.body?.locale || 'fr';
    const messages = getApiMessages(locale);
    
    return res.status(500).json({ 
      success: false,
      error: messages.VERIFICATION_ERROR
    });
  }
}
