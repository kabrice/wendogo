// src/utils/apiMessages.js

export const API_MESSAGES = {
  en: {
    // Common
    METHOD_NOT_ALLOWED: 'Method not allowed',
    SERVER_ERROR: 'Server error',
    
    // Auth - Register
    ALL_FIELDS_REQUIRED: 'All fields are required',
    PASSWORD_TOO_SHORT: 'Password must be at least 6 characters',
    INVALID_PHONE: 'Invalid phone number',
    INVALID_PHONE_COUNTRY: 'Invalid phone number for this country',
    MIN_AGE: 'You must be at least 13 years old',
    INVALID_BIRTHDATE: 'Invalid birth date',
    EMAIL_EXISTS: 'This email is already in use',
    ACCOUNT_CREATED: 'Account created successfully',
    ERROR_CREATING_ACCOUNT: 'Error creating account',
    REGISTRATION_ERROR: 'Server error during registration',
    
    // Auth - Login
    EMAIL_REQUIRED: 'Email is required',
    INVALID_CREDENTIALS: 'Invalid email or password',
    EMAIL_NOT_VERIFIED: 'Please verify your email address before logging in',
    CONNECTION_ERROR: 'Connection error',
    
    // Auth - Forgot Password
    EMAIL_NOT_FOUND: 'If this email exists, you will receive a reset link',
    TOKEN_GENERATION_ERROR: 'Error generating reset token',
    TOKEN_SAVE_ERROR: 'Error saving reset token',
    EMAIL_SEND_ERROR: 'Error sending email',
    RESET_INSTRUCTIONS_SENT: 'Reset instructions sent by email',
    RESET_SEND_ERROR: 'Error sending reset instructions',
    
    // Auth - Reset Password
    TOKEN_EMAIL_REQUIRED: 'Token and email are required',
    NEW_PASSWORD_REQUIRED: 'All fields are required',
    PASSWORD_RESET_SUCCESS: 'Password reset successfully',
    RESET_ERROR: 'Error resetting password',
    INVALID_TOKEN: 'Invalid or expired token',
    
    // Auth - Verification
    TOKEN_REQUIRED: 'Token and email required',
    VERIFICATION_TOKEN_SAVE_ERROR: 'Error saving verification token',
    VERIFICATION_EMAIL_SENT: 'Verification email sent',
    VERIFICATION_EMAIL_ERROR: 'Error sending verification email',
    EMAIL_VERIFIED: 'Email verified successfully',
    VERIFICATION_ERROR: 'Invalid or expired token',
    VERIFICATION_INTERNAL_ERROR: 'Internal error during verification',
  },
  
  fr: {
    // Common
    METHOD_NOT_ALLOWED: 'Méthode non autorisée',
    SERVER_ERROR: 'Erreur serveur',
    
    // Auth - Register
    ALL_FIELDS_REQUIRED: 'Tous les champs sont requis',
    PASSWORD_TOO_SHORT: 'Le mot de passe doit contenir au moins 6 caractères',
    INVALID_PHONE: 'Numéro de téléphone invalide',
    INVALID_PHONE_COUNTRY: 'Numéro de téléphone invalide pour ce pays',
    MIN_AGE: 'Vous devez avoir au moins 13 ans',
    INVALID_BIRTHDATE: 'Date de naissance invalide',
    EMAIL_EXISTS: 'Cet email est déjà utilisé',
    ACCOUNT_CREATED: 'Compte créé avec succès',
    ERROR_CREATING_ACCOUNT: 'Erreur lors de la création du compte',
    REGISTRATION_ERROR: 'Erreur serveur lors de l\'inscription',
    
    // Auth - Login
    EMAIL_REQUIRED: 'Email requis',
    INVALID_CREDENTIALS: 'Email ou mot de passe invalide',
    EMAIL_NOT_VERIFIED: 'Veuillez vérifier votre adresse email avant de vous connecter',
    CONNECTION_ERROR: 'Erreur de connexion',
    
    // Auth - Forgot Password
    EMAIL_NOT_FOUND: 'Si cet email existe, vous recevrez un lien de réinitialisation',
    TOKEN_GENERATION_ERROR: 'Erreur lors de la génération du token',
    TOKEN_SAVE_ERROR: 'Erreur lors de la sauvegarde du token',
    EMAIL_SEND_ERROR: 'Erreur lors de l\'envoi de l\'email',
    RESET_INSTRUCTIONS_SENT: 'Instructions de réinitialisation envoyées par email',
    RESET_SEND_ERROR: 'Erreur lors de l\'envoi des instructions',
    
    // Auth - Reset Password
    TOKEN_EMAIL_REQUIRED: 'Token et email requis',
    NEW_PASSWORD_REQUIRED: 'Tous les champs sont requis',
    PASSWORD_RESET_SUCCESS: 'Mot de passe réinitialisé avec succès',
    RESET_ERROR: 'Erreur lors de la réinitialisation',
    INVALID_TOKEN: 'Token invalide ou expiré',
    
    // Auth - Verification
    TOKEN_REQUIRED: 'Token et email requis',
    VERIFICATION_TOKEN_SAVE_ERROR: 'Erreur lors de la sauvegarde du token',
    VERIFICATION_EMAIL_SENT: 'Email de vérification envoyé',
    VERIFICATION_EMAIL_ERROR: 'Erreur lors de l\'envoi de l\'email de vérification',
    EMAIL_VERIFIED: 'Email vérifié avec succès',
    VERIFICATION_ERROR: 'Token invalide ou expiré',
    VERIFICATION_INTERNAL_ERROR: 'Erreur interne lors de la vérification',
  }
};

/**
 * Récupère un message traduit
 * @param {string} key - Clé du message
 * @param {string} locale - Langue (en, fr)
 * @returns {string} Message traduit
 */
export const getApiMessage = (key, locale = 'fr') => {
  const messages = API_MESSAGES[locale] || API_MESSAGES.fr;
  return messages[key] || key;
};

/**
 * Récupère tous les messages pour une locale
 * @param {string} locale - Langue (en, fr)
 * @returns {object} Objet contenant tous les messages
 */
export const getApiMessages = (locale = 'fr') => {
  return API_MESSAGES[locale] || API_MESSAGES.fr;
};
