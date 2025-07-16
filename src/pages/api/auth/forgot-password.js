// src/pages/api/auth/forgot-password.js - VERSION CORRIGÉE
import crypto from 'crypto';
import { use, useEffect } from 'react';
import { REST_API_PARAMS } from '../../../utils/Constants';
import { trackSchoolView } from '../../../lib/gtag';

export default async function handler(req, res) {

  // ✅ NOUVEAU : Tracking de la vue de la page
  // Note: useEffect cannot be used in API routes. If you need to track this event, do it client-side or use server-side analytics.

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ 
        success: false, 
        error: 'Email requis' 
      });
    }

    console.log('🔄 Demande de réinitialisation pour:', email);

    // Vérifier que l'utilisateur existe
    const checkUserResponse = await fetch(`${REST_API_PARAMS.baseUrl}/auth/check-email`, {
      method: 'POST',
      headers: REST_API_PARAMS.headers,
      body: JSON.stringify({ email })
    });

    if (checkUserResponse.ok) {
      const userData = await checkUserResponse.json();
      if (!userData.exists) {
        // Pour la sécurité, on ne révèle pas si l'email existe ou non
        return res.status(200).json({
          success: true,
          message: 'Si cet email existe, vous recevrez un lien de réinitialisation'
        });
      }
    }

    // Générer un token de réinitialisation
    const resetToken = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 heure

    console.log('🔑 Token généré:', resetToken.substring(0, 10) + '...');

    // Sauvegarder le token via Flask
    const saveTokenResponse = await fetch(`${REST_API_PARAMS.baseUrl}/auth/save-reset-token`, {
      method: 'POST',
      headers: REST_API_PARAMS.headers,
      body: JSON.stringify({
        email,
        token: resetToken,
        expires_at: expiresAt.toISOString()
      })
    });

    console.log('💾 Sauvegarde token - Status:', saveTokenResponse.status);

    if (!saveTokenResponse.ok) {
      const errorData = await saveTokenResponse.json();
      console.error('❌ Erreur sauvegarde token:', errorData);
      throw new Error('Erreur lors de la sauvegarde du token');
    }

    // Construire l'URL de réinitialisation
    const baseUrl = process.env.NEXTAUTH_URL || 'https://www.wendogo.com';
    const resetUrl = `${baseUrl}/auth/reset-password?token=${resetToken}&email=${encodeURIComponent(email)}`;

    console.log('🔗 URL de reset généré:', resetUrl.substring(0, 50) + '...');

    // Envoyer l'email de réinitialisation
    const emailData = {
      to: email,
      subject: 'Réinitialisation de votre mot de passe Wendogo',
      template: 'reset-password',
      data: {
        resetUrl,
        expiresIn: '1 heure'
      }
    };

    const sendEmailResponse = await fetch(`${REST_API_PARAMS.baseUrl}/auth/send-reset-email`, {
      method: 'POST',
      headers: REST_API_PARAMS.headers,
      body: JSON.stringify(emailData)
    });

    console.log('📧 Envoi email - Status:', sendEmailResponse.status);

    if (sendEmailResponse.ok) {
      console.log('✅ Email de réinitialisation envoyé à:', email);
      return res.status(200).json({
        success: true,
        message: 'Instructions de réinitialisation envoyées par email'
      });
    } else {
      const emailError = await sendEmailResponse.json();
      console.error('❌ Erreur envoi email:', emailError);
      throw new Error(`Erreur lors de l'envoi de l'email: ${emailError.error}`);
    }

  } catch (error) {
    console.error('❌ Erreur mot de passe oublié:', error);
    return res.status(500).json({ 
      success: false,
      error: 'Erreur lors de l\'envoi des instructions',
      details: error.message
    });
  }
}
