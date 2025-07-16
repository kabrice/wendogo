// src/pages/api/auth/send-verification.js - VERSION CORRIGÉE
import crypto from 'crypto';
import { REST_API_PARAMS } from '../../../utils/Constants';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, firstname } = req.body;

    if (!email || !firstname) {
      return res.status(400).json({ 
        success: false, 
        error: 'Email et prénom requis' 
      });
    }

    console.log('📧 Envoi email vérification pour:', email);

    // Générer un token de vérification unique
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24h

    // Sauvegarder le token dans la DB via Flask
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
      const tokenError = await saveTokenResponse.json();
      console.error('❌ Erreur sauvegarde token:', tokenError);
      throw new Error('Erreur lors de la sauvegarde du token');
    }

    console.log('✅ Token sauvegardé:', verificationToken.substring(0, 10) + '...');

    // Construire l'URL de vérification
    const baseUrl = process.env.NEXTAUTH_URL || 'https://www.wendogo.com';
    const verificationUrl = `${baseUrl}/auth/verify-email?token=${verificationToken}&email=${encodeURIComponent(email)}`;

    // Préparer l'email
    const emailData = {
      to: email,
      subject: 'Vérifiez votre compte Wendogo',
      template: 'verification',
      data: {
        firstname,
        verificationUrl,
        expiresIn: '24 heures'
      }
    };

    // Envoyer l'email via Flask
    const sendEmailResponse = await fetch(`${REST_API_PARAMS.baseUrl}/auth/send-verification-email`, {
      method: 'POST',
      headers: REST_API_PARAMS.headers,
      body: JSON.stringify(emailData)
    });

    const emailResult = await sendEmailResponse.json();

    if (sendEmailResponse.ok && emailResult.success) {
      console.log('✅ Email envoyé avec succès à:', email);
      return res.status(200).json({
        success: true,
        message: 'Email de vérification envoyé'
      });
    } else {
      console.error('❌ Erreur envoi email:', emailResult);
      throw new Error(emailResult.error || 'Erreur lors de l\'envoi de l\'email');
    }

  } catch (error) {
    console.error('❌ Erreur envoi vérification:', error);
    return res.status(500).json({ 
      success: false,
      error: 'Erreur lors de l\'envoi de l\'email de vérification' 
    });
  }
}
