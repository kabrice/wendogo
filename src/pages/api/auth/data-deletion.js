// src/pages/api/auth/data-deletion.js - VERSION DEBUG TEMPORAIRE

import crypto from 'crypto';

export default async function handler(req, res) {
  
  // ✅ TEMPORAIRE : Accepter GET pour les tests de développement
  if (req.method === 'GET') {
    return res.status(200).json({
      message: "✅ Endpoint is working!",
      method: "GET",
      note: "This endpoint normally accepts only POST requests from Facebook",
      test_url: "Use POST with user_id in body to test properly",
      environment: process.env.NODE_ENV
    });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // 1. Vérifier la signature Facebook (sécurité)
    const signature = req.headers['x-hub-signature-256'];
    const body = JSON.stringify(req.body);
    
    // En mode développement, permettre une signature de test
    if (process.env.NODE_ENV === 'development' && signature === 'sha256=test') {
      console.log('🧪 Development mode: Using test signature');
    } else {
      // Production: vérifier la vraie signature
      const expectedSignature = 'sha256=' + 
        crypto.createHmac('sha256', process.env.FACEBOOK_CLIENT_SECRET)
              .update(body)
              .digest('hex');

      if (!signature || !crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))) {
        console.error('Invalid signature from Facebook');
        return res.status(401).json({ error: 'Unauthorized' });
      }
    }

    // 2. Extraire les données de la requête Facebook
    const { user_id } = req.body;
    
    if (!user_id) {
      return res.status(400).json({ error: 'user_id is required' });
    }

    console.log(`Data deletion request received for Facebook user: ${user_id}`);

    // 3. En mode développement, simuler la suppression
    if (process.env.NODE_ENV === 'development') {
      console.log('🧪 Development mode: Simulating data deletion');
      
      // Simuler un délai
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const confirmationCode = crypto.randomBytes(16).toString('hex');
      
      return res.status(200).json({
        url: `https://www.wendogo.com/data-deletion-status?code=${confirmationCode}`,
        confirmation_code: confirmationCode,
        message: "✅ Test successful - Data deletion simulated",
        user_id: user_id
      });
    }

    // 4. Production: Supprimer les données via l'API Flask
    try {
      const deleteResponse = await fetch(`${process.env.FLASK_API_URL}/auth/delete-user-data`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': process.env.INTERNAL_API_KEY || 'your-internal-secret-key'
        },
        body: JSON.stringify({
          facebook_id: user_id,
          deletion_type: 'facebook_request'
        })
      });

      if (!deleteResponse.ok) {
        throw new Error(`Flask API error: ${deleteResponse.status}`);
      }

      const result = await deleteResponse.json();
      console.log('User data deletion result:', result);

    } catch (flaskError) {
      console.error('Error calling Flask API for data deletion:', flaskError);
    }

    // 5. Générer un ID de confirmation unique
    const confirmationCode = crypto.randomBytes(16).toString('hex');
    
    // 6. Répondre à Facebook avec le format requis
    return res.status(200).json({
      url: `https://wendogo.com/data-deletion-status?code=${confirmationCode}`,
      confirmation_code: confirmationCode
    });

  } catch (error) {
    console.error('Error processing data deletion request:', error);
    
    const fallbackCode = crypto.randomBytes(16).toString('hex');
    
    return res.status(200).json({
      url: `https://wendogo.com/data-deletion-status?code=${fallbackCode}`,
      confirmation_code: fallbackCode,
      error_handled: true
    });
  }
}
