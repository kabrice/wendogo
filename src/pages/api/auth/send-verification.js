import crypto from 'crypto';
import { REST_API_PARAMS } from '../../../utils/Constants';
import { getApiMessages } from '../../../utils/apiMessages';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, firstname, locale = 'fr' } = req.body;
    const messages = getApiMessages(locale);

    if (!email || !firstname) {
      return res.status(400).json({ 
        success: false, 
        error: messages.ALL_FIELDS_REQUIRED
      });
    }

    // Générer le token
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

    // Sauvegarder le token
    const saveTokenResponse = await fetch(`${REST_API_PARAMS.baseUrl}/auth/save-verification-token`, {
      method: 'POST',
      headers: REST_API_PARAMS.headers,
      body: JSON.stringify({
        email,
        token: verificationToken,
        expires_at: expiresAt.toISOString()
      })
    });

    if (!saveTokenResponse.ok) {
      throw new Error(messages.VERIFICATION_EMAIL_ERROR);
    }

    // Construire l'URL
    const baseUrl = process.env.NEXTAUTH_URL || 'https://www.wendogo.com';
    const verificationUrl = `${baseUrl}/${locale}/auth/verify-email?token=${verificationToken}&email=${encodeURIComponent(email)}`;

    // Envoyer l'email
    const emailData = {
      to: email,
      subject: locale === 'en' 
        ? 'Verify your Wendogo account' 
        : 'Vérifiez votre compte Wendogo',
      template: 'verification',
      locale, // 🔥 Passer la locale
      data: {
        firstname,
        verificationUrl,
        expiresIn: locale === 'en' ? '24 hours' : '24 heures'
      }
    };

    const sendEmailResponse = await fetch(`${REST_API_PARAMS.baseUrl}/auth/send-verification-email`, {
      method: 'POST',
      headers: REST_API_PARAMS.headers,
      body: JSON.stringify(emailData)
    });

    const emailResult = await sendEmailResponse.json();

    if (sendEmailResponse.ok && emailResult.success) {
      return res.status(200).json({
        success: true,
        message: messages.VERIFICATION_EMAIL_SENT
      });
    } else {
      throw new Error(messages.VERIFICATION_EMAIL_ERROR);
    }

  } catch (error) {
    console.error('Erreur envoi vérification:', error);
    const locale = req.body?.locale || 'fr';
    const messages = getApiMessages(locale);
    
    return res.status(500).json({ 
      success: false,
      error: messages.VERIFICATION_EMAIL_ERROR
    });
  }
}
