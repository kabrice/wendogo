import bcrypt from 'bcryptjs';
import { parsePhoneNumberWithError } from 'libphonenumber-js';
import { REST_API_PARAMS } from '../../../utils/Constants';
import { getApiMessages } from '../../../utils/apiMessages';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { 
      email, 
      password, 
      firstname, 
      lastname, 
      phone, 
      birthdate, 
      country,
      locale = 'fr' // 🔥 Recevoir la locale
    } = req.body;

    // 🔥 Obtenir les messages dans la bonne langue
    const messages = getApiMessages(locale);

    // Validation
    if (!email || !password || !firstname || !lastname || !phone || !birthdate || !country) {
      return res.status(400).json({ error: messages.ALL_FIELDS_REQUIRED });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: messages.PASSWORD_TOO_SHORT });
    }

    // Validation du téléphone
    try {
      const phoneNumberObj = parsePhoneNumberWithError(phone, country);
      if (!phoneNumberObj.isValid()) {
        return res.status(400).json({ error: messages.INVALID_PHONE });
      }
    } catch (error) {
      return res.status(400).json({ error: messages.INVALID_PHONE_COUNTRY });
    }

    // Validation de l'âge
    const birthDate = new Date(birthdate);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    
    if (age < 13) {
      return res.status(400).json({ error: messages.MIN_AGE });
    }
    
    if (age > 120 || birthDate > today) {
      return res.status(400).json({ error: messages.INVALID_BIRTHDATE });
    }

    // Vérifier si l'email existe
    const checkUserResponse = await fetch(`${REST_API_PARAMS.baseUrl}/auth/check-email?locale=${locale}`, {
      method: 'POST',
      headers: REST_API_PARAMS.headers,
      body: JSON.stringify({ email })
    });

    if (checkUserResponse.ok) {
      const userData = await checkUserResponse.json();
      if (userData.exists) {
        return res.status(400).json({ error: messages.EMAIL_EXISTS });
      }
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 12);
    const formattedBirthdate = new Date(birthdate).toISOString().split('T')[0];

    // Créer l'utilisateur
    const createUserResponse = await fetch(`${REST_API_PARAMS.baseUrl}/auth/register?locale=${locale}`, {
      method: 'POST',
      headers: REST_API_PARAMS.headers,
      body: JSON.stringify({
        email,
        password: hashedPassword,
        firstname,
        lastname,
        phone,
        birthdate: formattedBirthdate,
        country,
        locale // 🔥 Passer la locale au backend Flask
      })
    });

    if (createUserResponse.ok) {
      const newUser = await createUserResponse.json();
      return res.status(201).json({
        success: true,
        message: messages.ACCOUNT_CREATED,
        user: {
          id: newUser.id,
          email: newUser.email,
          firstname: newUser.firstname,
          lastname: newUser.lastname
        }
      });
    } else {
      const error = await createUserResponse.json();
      return res.status(400).json({ 
        error: error.message || messages.ERROR_CREATING_ACCOUNT 
      });
    }

  } catch (error) {
    console.error('Erreur inscription:', error);
    const locale = req.body?.locale || 'fr';
    const messages = getApiMessages(locale);
    return res.status(500).json({ error: messages.SERVER_ERROR });
  }
}
