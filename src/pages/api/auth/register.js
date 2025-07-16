// src/pages/api/auth/register.js - Route d'inscription Next.js CORRIGÉE

import bcrypt from 'bcryptjs';
import { parsePhoneNumberWithError } from 'libphonenumber-js';
import { REST_API_PARAMS } from '../../../utils/Constants';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, password, firstname, lastname, phone, birthdate, country } = req.body;

    // Validation des données obligatoires
    if (!email || !password || !firstname || !lastname || !phone || !birthdate || !country) {
      return res.status(400).json({ error: 'Tous les champs sont requis' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Le mot de passe doit contenir au moins 6 caractères' });
    }

    // Validation du numéro de téléphone
    try {
      const phoneNumberObj = parsePhoneNumberWithError(phone, country);
      if (!phoneNumberObj.isValid()) {
        return res.status(400).json({ error: 'Numéro de téléphone invalide' });
      }
    } catch (error) {
      return res.status(400).json({ error: 'Numéro de téléphone invalide pour ce pays' });
    }

    // Validation de la date de naissance
    const birthDate = new Date(birthdate);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    
    if (age < 13) {
      return res.status(400).json({ error: 'Vous devez avoir au moins 13 ans' });
    }
    
    if (age > 120 || birthDate > today) {
      return res.status(400).json({ error: 'Date de naissance invalide' });
    }

    // Vérifier si l'email existe déjà via l'API Flask
    const checkUserResponse = await fetch(`${REST_API_PARAMS.baseUrl}/auth/check-email`, {
      method: 'POST',
      headers: REST_API_PARAMS.headers,
      body: JSON.stringify({ email })
    });

    if (checkUserResponse.ok) {
      const userData = await checkUserResponse.json();
      if (userData.exists) {
        return res.status(400).json({ error: 'Cet email est déjà utilisé' });
      }
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 12);

    // Formater la date de naissance pour MySQL (YYYY-MM-DD)
    const formattedBirthdate = new Date(birthdate).toISOString().split('T')[0];

    // Créer l'utilisateur via l'API Flask
    const createUserResponse = await fetch(`${REST_API_PARAMS.baseUrl}/auth/register`, {
      method: 'POST',
      headers: REST_API_PARAMS.headers,
      body: JSON.stringify({
        email,
        password: hashedPassword,
        firstname,
        lastname,
        phone,
        birthdate: formattedBirthdate,
        country
      })
    });

    if (createUserResponse.ok) {
      const newUser = await createUserResponse.json();
      return res.status(201).json({
        success: true,
        message: 'Compte créé avec succès',
        user: {
          id: newUser.id,
          email: newUser.email,
          firstname: newUser.firstname,
          lastname: newUser.lastname,
          phone: newUser.phone,
          birthdate: newUser.birthdate,
          country: newUser.country
        }
      });
    } else {
      const error = await createUserResponse.json();
      return res.status(400).json({ error: error.message || 'Erreur lors de la création du compte' });
    }

  } catch (error) {
    console.error('Erreur inscription:', error);
    return res.status(500).json({ error: 'Erreur serveur lors de l\'inscription' });
  }
}
