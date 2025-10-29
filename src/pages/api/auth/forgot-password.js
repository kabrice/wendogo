// src/pages/api/auth/forgot-password.js - VERSION CORRIGÉE
import crypto from 'crypto';
import { REST_API_PARAMS } from '../../../utils/Constants';
import { getApiMessages } from '../../../utils/apiMessages';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, locale = 'fr' } = req.body;
    const messages = getApiMessages(locale);
    console.log('🔐 Mot de passe oublié pour:', email, 'Locale:', locale, 'message:', messages);
    if (!email) {
      return res.status(400).json({ 
        success: false, 
        error: messages.EMAIL_REQUIRED
      });
    }

    // Vérifier que l'utilisateur existe
    const checkUserResponse = await fetch(`${REST_API_PARAMS.baseUrl}/auth/check-email`, {
      method: 'POST',
      headers: REST_API_PARAMS.headers,
      body: JSON.stringify({ email })
    });

    if (checkUserResponse.ok) {
      const userData = await checkUserResponse.json();
      if (!userData.exists) {
        return res.status(200).json({
          success: true,
          message: messages.EMAIL_NOT_FOUND
        });
      }
    }

    // Générer le token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

    // Sauvegarder le token
    const saveTokenResponse = await fetch(`${REST_API_PARAMS.baseUrl}/auth/save-reset-token?locale=${locale}`, {
      method: 'POST',
      headers: REST_API_PARAMS.headers,
      body: JSON.stringify({
        email,
        token: resetToken,
        expires_at: expiresAt.toISOString()
      })
    });

    if (!saveTokenResponse.ok) {
      throw new Error(messages.TOKEN_SAVE_ERROR);
    }

    // Construire l'URL
    const baseUrl = process.env.NEXTAUTH_URL || 'https://www.wendogo.com';
    const resetUrl = `${baseUrl}/${locale}/auth/reset-password?locale=${locale}&token=${resetToken}&email=${encodeURIComponent(email)}`;

    // Envoyer l'email
    const emailData = {
      to: email,
      subject: locale === 'en' 
        ? 'Reset your Wendogo password' 
        : 'Réinitialisation de votre mot de passe Wendogo',
      template: 'reset-password',
      locale, // 🔥 Passer la locale
      data: {
        resetUrl,
        expiresIn: locale === 'en' ? '1 hour' : '1 heure'
      }
    };
    console.log('Envoi email avec les données:', emailData, messages);
    const sendEmailResponse = await fetch(`${REST_API_PARAMS.baseUrl}/auth/send-reset-email?locale=${locale}`, {
      method: 'POST',
      headers: REST_API_PARAMS.headers,
      body: JSON.stringify(emailData)
    });

    if (sendEmailResponse.ok) {
      return res.status(200).json({
        success: true,
        message: messages.RESET_INSTRUCTIONS_SENT
      });
    } else {
      throw new Error(messages.EMAIL_SEND_ERROR);
    }

  } catch (error) {
    console.error('Erreur mot de passe oublié:', error);
    const locale = req.body?.locale || 'fr';
    const messages = getApiMessages(locale);
    
    return res.status(500).json({ 
      success: false,
      error: messages.EMAIL_SEND_ERROR
    });
  }
}
