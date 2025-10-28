// Version améliorée de votre AuthModal avec mot de passe oublié et limitation

import React, { useState, useEffect } from 'react';
import { X, Heart, Loader2, User, Mail, Lock, Eye, EyeOff, Phone, Calendar, Check, CheckCircle, AlertCircle, Shield, RefreshCw } from 'lucide-react';
import { signIn } from 'next-auth/react';
import { useFavorites } from '../contexts/FavoritesContext';
import { parsePhoneNumberWithError } from 'libphonenumber-js';
import { IPINFO_URL } from '../utils/Constants';
import { trackUserSignup } from '../lib/gtag';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useRouter } from 'next/router';

const PasswordInput = ({ value, onChange, errors, isSignUp = false }) => {
  const { t } = useTranslation('authModal');
  const [showPassword, setShowPassword] = useState(false);
  const [showRequirements, setShowRequirements] = useState(false);
  // useEffect(() => {
  //   console.log('🌍 Current language:', i18n.language);
  //   console.log('📦 Loaded namespaces:', i18n.options.ns);
  //   console.log('🔑 Test translation:', t('form.emailPlaceholder'));
  // }, [i18n, t]);
  // Critères de validation du mot de passe
  const passwordRequirements = [
    {
      id: 'length',
      label: t('passwordInput.requirements.length'),
      test: (password) => password.length >= 8
    },
    {
      id: 'uppercase',
      label: t('passwordInput.requirements.uppercase'),
      test: (password) => /[A-Z]/.test(password)
    },
    {
      id: 'lowercase',
      label: t('passwordInput.requirements.lowercase'),
      test: (password) => /[a-z]/.test(password)
    },
    {
      id: 'number',
      label: t('passwordInput.requirements.number'),
      test: (password) => /\d/.test(password)
    },
    {
      id: 'special',
      label: t('passwordInput.requirements.special'),
      test: (password) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
    }
  ];

  // Calculer la force du mot de passe
  const getPasswordStrength = (password) => {
    const validRequirements = passwordRequirements.filter(req => req.test(password));
    return validRequirements.length;
  };

  const getStrengthColor = (strength) => {
    if (strength < 2) return 'bg-red-500';
    if (strength < 4) return 'bg-yellow-500';
    if (strength < 5) return 'bg-blue-500';
    return 'bg-green-500';
  };

  const getStrengthLabel = (strength) => {
    if (strength < 2) return t('passwordInput.strength.veryWeak');
    if (strength < 4) return t('passwordInput.strength.weak');
    if (strength < 5) return t('passwordInput.strength.medium');
    return t('passwordInput.strength.strong');
  };

  const strength = getPasswordStrength(value);
  const isPasswordValid = strength >= 4; // Au moins 4 critères sur 5

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        <Lock className="w-4 h-4 inline mr-2" />
        {t('passwordInput.label')} {isSignUp && <span className="text-red-500">*</span>}
      </label>
      
      <div className="relative">
        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder={t('passwordInput.placeholder')}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => isSignUp && setShowRequirements(true)}
          onBlur={() => !value && setShowRequirements(false)}
          className={`w-full pl-10 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            errors ? 'border-red-300' : value && isSignUp ? (isPasswordValid ? 'border-green-300' : 'border-yellow-300') : 'border-gray-300'
          }`}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      </div>

      {/* Indicateur de force du mot de passe */}
      {isSignUp && value && (
        <div className="mt-2">
          <div className="flex items-center gap-2 mb-2">
            <div className="flex-1 bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-300 ${getStrengthColor(strength)}`}
                style={{ width: `${(strength / 5) * 100}%` }}
              />
            </div>
            <span className={`text-xs font-medium ${
              strength < 2 ? 'text-red-600' : 
              strength < 4 ? 'text-yellow-600' : 
              strength < 5 ? 'text-blue-600' : 'text-green-600'
            }`}>
              {getStrengthLabel(strength)}
            </span>
          </div>
        </div>
      )}

      {/* Exigences du mot de passe */}
      {isSignUp && (showRequirements || value) && (
        <div className="mt-2 p-3 bg-gray-50 rounded-lg border">
          <p className="text-xs font-medium text-gray-700 mb-2">
            {t('passwordInput.mustContain')}
          </p>
          <div className="space-y-1">
            {passwordRequirements.map((requirement) => {
              const isValid = requirement.test(value);
              return (
                <div key={requirement.id} className="flex items-center gap-2">
                  {isValid ? (
                    <Check className="w-3 h-3 text-green-600" />
                  ) : (
                    <X className="w-3 h-3 text-gray-400" />
                  )}
                  <span className={`text-xs ${
                    isValid ? 'text-green-600' : 'text-gray-600'
                  }`}>
                    {requirement.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {errors && (
        <p className="mt-1 text-xs text-red-600">{errors}</p>
      )}
    </div>
  );
};

// ✅ FONCTION DE VALIDATION DU MOT DE PASSE
export const validatePassword = (password, t) => {
  const requirements = [
    {
      test: (pwd) => pwd.length >= 8,
      message: t('validation.password.minLength')
    },
    {
      test: (pwd) => /[A-Z]/.test(pwd),
      message: t('validation.password.uppercase')
    },
    {
      test: (pwd) => /[a-z]/.test(pwd),
      message: t('validation.password.lowercase')
    },
    {
      test: (pwd) => /\d/.test(pwd),
      message: t('validation.password.number')
    },
    {
      test: (pwd) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pwd),
      message: t('validation.password.special')
    }
  ];

  const failedRequirements = requirements.filter(req => !req.test(password));
  
  if (failedRequirements.length === 0) {
    return { isValid: true, message: '' };
  }

  return {
    isValid: false,
    message: failedRequirements[0].message
  };
};

const AuthModal = () => {
  const { t } = useTranslation('authModal');
  const router = useRouter();
  const currentLocale = router.locale || 'fr';
  const { showAuthModal, setShowAuthModal } = useFavorites();
  const [isLoading, setIsLoading] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showVerificationScreen, setShowVerificationScreen] = useState(false);
  const [showResendButton, setShowResendButton] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false); // ✅ NOUVEAU
  const [loginAttempts, setLoginAttempts] = useState(0); // ✅ NOUVEAU
  const [isBlocked, setIsBlocked] = useState(false); // ✅ NOUVEAU
  const [blockTimeLeft, setBlockTimeLeft] = useState(0); // ✅ NOUVEAU
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstname: '',
    lastname: '',
    phone: '',
    birthdate: '',
    countryIso2: ''
  });
  const [errors, setErrors] = useState({});
  const [isDetectingCountry, setIsDetectingCountry] = useState(true);

  // ✅ NOUVEAU: Gestion du blocage temporaire
  useEffect(() => {
    let interval;
    if (isBlocked && blockTimeLeft > 0) {
      interval = setInterval(() => {
        setBlockTimeLeft(prev => {
          if (prev <= 1) {
            setIsBlocked(false);
            setLoginAttempts(0);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isBlocked, blockTimeLeft]);

  // ✅ NOUVEAU: Fonction mot de passe oublié
  const handleForgotPassword = async () => {
    if (!formData.email) {
      setErrors({ email: t('validation.email.enterEmail') });
      return;
    }

    setIsLoading('forgot');
    setErrors({});

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, locale: currentLocale }),
      });

      const data = await response.json();

      if (response.ok) {
        setErrors({
          success: t('success.resetSent')
        });
        setShowForgotPassword(false);
      } else {
        setErrors({ submit: data.error || t('errors.sendError') });
      }
    } catch (error) {
      setErrors({ submit: t('errors.connectionError') });
    } finally {
      setIsLoading('');
    }
  };

  // Détection automatique du pays (votre code existant)
  useEffect(() => {
    const detectCountry = async () => {
      try {
        setIsDetectingCountry(true);
        const response = await fetch(IPINFO_URL);
        const data = await response.json();
        
        if (data.country) {
          setFormData(prev => ({ ...prev, countryIso2: data.country }));
        } else {
          setFormData(prev => ({ ...prev, countryIso2: 'CM' }));
        }
      } catch (error) {
        console.warn('Erreur détection pays:', error);
        setFormData(prev => ({ ...prev, countryIso2: 'CM' }));
      } finally {
        // setIsDetectingCountry(false); // Commenté comme dans votre version
      }
    };

    if (isSignUp && !formData.countryIso2) {
      detectCountry();
    }
  }, [isSignUp, formData.countryIso2]);

  // Validation du numéro de téléphone (votre code existant)
  const validatePhoneNumber = (phone, countryCode) => {
    if (!phone || !countryCode) return false;
    
    try {
      const phoneNumberObj = parsePhoneNumberWithError(phone, countryCode);
      return phoneNumberObj.isValid();
    } catch (error) {
      console.warn('Erreur validation téléphone:', error);
      return false;
    }
  };

  const formatPhoneNumber = (phone, countryCode) => {
    if (!phone || !countryCode) return phone;
    
    try {
      const phoneNumberObj = parsePhoneNumberWithError(phone, countryCode);
      return phoneNumberObj.isValid() ? phoneNumberObj.number : phone;
    } catch (error) {
      return phone;
    }
  };

  if (!showAuthModal) return null;

  const handleOAuthLogin = async (provider) => {
    if (isBlocked) return;
    
    setIsLoading(provider);
    setErrors({});
    
    try {
      trackUserSignup(provider);
      await signIn(provider, { callbackUrl: window.location.href });
      setShowAuthModal(false);
    } catch (error) {
      console.error('Erreur OAuth:', error);
      setErrors({ oauth: t('errors.oauthError') });
    } finally {
      setIsLoading('');
    }
    
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = t('validation.email.required');
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('validation.email.invalid');
    }
    
    if (!formData.password) {
      newErrors.password = t('validation.password.minLength');
    } else {
      const passwordValidation = validatePassword(formData.password, t);
      if (!passwordValidation.isValid) {
        newErrors.password = passwordValidation.message;
      }
    }
    
    if (isSignUp) {
      if (!formData.firstname) {
        newErrors.firstname = t('validation.firstname.required');
      }
      if (!formData.lastname) {
        newErrors.lastname = t('validation.lastname.required');
      }
      
      if (!formData.phone) {
        newErrors.phone = t('validation.phone.required');
      } else if (!validatePhoneNumber(formData.phone, formData.countryIso2)) {
        newErrors.phone = t('validation.phone.invalid');
      }
      
      if (!formData.birthdate) {
        newErrors.birthdate = t('validation.birthdate.required');
      } else {
        const birthDate = new Date(formData.birthdate);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        
        if (age < 13) {
          newErrors.birthdate = t('validation.birthdate.minAge');
        } else if (age > 120) {
          newErrors.birthdate = t('validation.birthdate.invalid');
        }
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    
    if (isBlocked) {
      setErrors({ 
        submit: t('errors.tooManyAttempts', { minutes: Math.ceil(blockTimeLeft / 60) })
      });
      return;
    }
    
    if (!validateForm()) return;
    
    setIsLoading('email');
    setErrors({});
    
    try {
      if (isSignUp) {
        // Code d'inscription (votre version existante)
        const formattedPhone = formatPhoneNumber(formData.phone, formData.countryIso2);
        trackUserSignup('email');
        const registrationData = {
          ...formData,
          phone: formattedPhone,
          country: formData.countryIso2,
          locale: currentLocale
        };
        
        const response = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(registrationData),
        });
        
        const data = await response.json();
        
        if (response.ok) {
          setErrors({ 
            success: t('success.accountCreated')
          });
          
          const verificationResponse = await fetch('/api/auth/send-verification', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: formData.email,
              firstname: formData.firstname
            })
          });
          
          if (verificationResponse.ok) {
            setShowVerificationScreen(true);
            setErrors({ 
              success: t('success.verificationSent', { email: formData.email })
            });
          } else {
            setErrors({ 
              success: t('success.accountCreatedNoEmail')
            });
            setIsSignUp(false);
          }
        } else {
          setErrors({ submit: data.error || t('errors.registrationError') });
        }
      } else {
        // ✅ CONNEXION améliorée avec limitation
        const result = await signIn('credentials', {
          email: formData.email,
          password: formData.password,
          redirect: false,
        });
        
        if (result?.ok) {
          // Réinitialiser les tentatives en cas de succès
          setLoginAttempts(0);
          setShowAuthModal(false);
          window.location.reload();
        } else {
          // ✅ Incrémenter les tentatives
          const newAttempts = loginAttempts + 1;
          setLoginAttempts(newAttempts);
          
          if (result?.error === 'EmailNotVerified') {
            setErrors({ 
              submit: t('errors.emailNotVerified')
            });
            setShowResendButton(true);
          } else if (result?.error === 'CredentialsSignin') {
            setErrors({ 
              submit: t('errors.incorrectCredentials', { attempts: newAttempts })
            });
            
            // ✅ Bloquer après 5 tentatives
            if (newAttempts >= 5) {
              setIsBlocked(true);
              setBlockTimeLeft(300); // 5 minutes
              setErrors({ 
                submit: t('errors.accountBlocked')
              });
            }
          } else {
            setErrors({ submit: t('errors.connectionError') });
          }
        }
      }
    } catch (error) {
      console.error('Erreur auth:', error);
      setErrors({ submit: t('errors.connectionError') });
    } finally {
      setIsLoading('');
    }
  };

  const handleResendVerification = async () => {
    setIsLoading('resend');
    setErrors({});
    
    try {
      const response = await fetch('/api/auth/send-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          firstname: formData.firstname || t('form.defaultUser')
        })
      });
      
      if (response.ok) {
        setErrors({ 
          success: t('success.verificationResent')
        });
        setShowResendButton(false);
      } else {
        setErrors({ submit: t('errors.emailSendError') });
      }
    } catch (error) {
      setErrors({ submit: t('errors.emailSendError') });
    } finally {
      setIsLoading('');
    }
  };

  const handleClose = () => {
    setShowAuthModal(false);
    setFormData({ 
      email: '', 
      password: '', 
      firstname: '', 
      lastname: '', 
      phone: '', 
      birthdate: '', 
      countryIso2: '' 
    });
    setErrors({});
    setIsSignUp(false);
    setShowForgotPassword(false);
    setShowVerificationScreen(false);
    setShowResendButton(false);
    setIsDetectingCountry(false);
  };

  const successMessagesHideForm = [
    t('success.accountCreated'),
    t('success.resetSent'),
    t('success.verificationResent'),
    'Email de vérification envoyé'
  ];  

  // Vérifier si on doit masquer le formulaire
  const shouldHideForm = errors.success && successMessagesHideForm.some(msg => 
    errors.success.includes('📧') || errors.success.includes('✅')
  );

  // ✅ NOUVEAU: Écran mot de passe oublié
  if (showForgotPassword) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-100 p-4">
        <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 relative">
          <button onClick={handleClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors">
            <X className="w-5 h-5" />
          </button>

          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <RefreshCw className="w-8 h-8 text-orange-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{t('forgotPassword.title')}</h3>
            <p className="text-gray-600">{t('forgotPassword.subtitle')}</p>
          </div>

          {(errors.submit || errors.success) && (
            <div className={`mb-4 p-3 border rounded-lg ${
              errors.success 
                ? 'bg-green-50 border-green-200 text-green-800' 
                : 'bg-red-50 border-red-200 text-red-700'
            }`}>
              <p className="text-sm font-medium">{errors.success || errors.submit}</p>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="email"
                  placeholder={t('forgotPassword.emailPlaceholder')}
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.email ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
              </div>
              {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
            </div>

            <button
              onClick={handleForgotPassword}
              disabled={isLoading === 'forgot'}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700 transition-colors disabled:opacity-50"
            >
              {isLoading === 'forgot' ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
              {t('forgotPassword.sendButton')}
            </button>

            <button
              onClick={() => setShowForgotPassword(false)}
              className="w-full px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              {t('forgotPassword.backButton')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-100 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 relative max-h-[90vh] overflow-y-auto">
        <button onClick={handleClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors">
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
            {shouldHideForm ? (
              <CheckCircle className="w-8 h-8 text-white" />
            ) : (
              <User className="w-8 h-8 text-white" />
            )}
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            {shouldHideForm ? t('main.verificationInProgress') : (isSignUp ? t('main.createAccount') : t('main.login'))}
          </h3>
          <p className="text-gray-600">
            {shouldHideForm 
              ? t('main.checkEmail')
              : (isSignUp 
                ? t('main.signupSubtitle')
                : t('main.loginSubtitle')
              )
            }
          </p>
        </div>

        {/* Messages d'erreur et de succès */}
        {(errors.oauth || errors.submit || errors.success) && (
          <div className={`mb-4 p-3 border rounded-lg ${
            errors.success 
              ? 'bg-green-50 border-green-200 text-green-800' 
              : 'bg-red-50 border-red-200 text-red-700'
          }`}>
            <p className="text-sm font-medium">
              {errors.success || errors.oauth || errors.submit}
            </p>
          </div>
        )}

        {/* Affichage conditionnel du formulaire */}
        {!shouldHideForm && (
          <div className="space-y-4">
            {/* Boutons OAuth */}
            <button
              onClick={() => handleOAuthLogin('google')}
              disabled={isLoading || isBlocked}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading === 'google' ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
              )}
              <span className="font-medium">{t('main.continueWithGoogle')}</span>
            </button>

            <button
              onClick={() => handleOAuthLogin('facebook')}
              disabled={isLoading || isBlocked}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-[#1877F2] text-white rounded-lg hover:bg-[#166FE5] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading === 'facebook' ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              )}
              <span className="font-medium">{t('main.continueWithFacebook')}</span>
            </button>

            {/* Séparateur */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">{t('main.orWithEmail')}</span>
              </div>
            </div>

            {/* Formulaire email/password */}
            <form onSubmit={handleEmailAuth} className="space-y-4">
              {isSignUp && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="text"
                        placeholder={t('form.firstnamePlaceholder')}
                        value={formData.firstname}
                        onChange={(e) => setFormData({...formData, firstname: e.target.value})}
                        className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.firstname ? 'border-red-300' : 'border-gray-300'
                        }`}
                      />
                    </div>
                    {errors.firstname && (
                      <p className="mt-1 text-xs text-red-600">{errors.firstname}</p>
                    )}
                  </div>
                  
                  <div>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="text"
                        placeholder={t('form.lastnamePlaceholder')}
                        value={formData.lastname}
                        onChange={(e) => setFormData({...formData, lastname: e.target.value})}
                        className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.lastname ? 'border-red-300' : 'border-gray-300'
                        }`}
                      />
                    </div>
                    {errors.lastname && (
                      <p className="mt-1 text-xs text-red-600">{errors.lastname}</p>
                    )}
                  </div>
                </div>
              )}
              
              {isSignUp && isDetectingCountry && (
                <>
                  {/* Téléphone */}
                  <div>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="tel"
                        placeholder={`${t('form.phonePlaceholder')} ${formData.countryIso2 ? `(${formData.countryIso2})` : ''}`}
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.phone ? 'border-red-300' : 'border-gray-300'
                        }`}
                      />
                    </div>
                    {errors.phone && (
                      <p className="mt-1 text-xs text-red-600">{errors.phone}</p>
                    )}
                  </div>
                  
                  {/* Date de naissance */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Calendar className="w-4 h-4 inline mr-2" />
                      {t('form.birthdateLabel')}
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="date"
                        value={formData.birthdate}
                        onChange={(e) => setFormData({...formData, birthdate: e.target.value})}
                        max={new Date(new Date().setFullYear(new Date().getFullYear() - 13)).toISOString().split('T')[0]}
                        className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.birthdate ? 'border-red-300' : 'border-gray-300'
                        }`}
                        aria-label={t('form.birthdateAriaLabel')}
                      />
                    </div>
                    {errors.birthdate && (
                      <p className="mt-1 text-xs text-red-600">{errors.birthdate}</p>
                    )}
                    <p className="mt-1 text-xs text-gray-500">
                      {t('form.birthdateHelper')}
                    </p>
                  </div>
                </>
              )}
              
              <div>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="email"
                    placeholder={t('form.emailPlaceholder')}
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.email ? 'border-red-300' : 'border-gray-300'
                    }`}
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-xs text-red-600">{errors.email}</p>
                )}
              </div>
              
              <PasswordInput
                value={formData.password}
                onChange={(value) => setFormData({...formData, password: value})}
                errors={errors.password}
                isSignUp={isSignUp}
              />
              
              {/* ✅ NOUVEAU: Lien mot de passe oublié */}
              {!isSignUp && (
                <div className="text-right">
                  <button
                    type="button"
                    onClick={() => setShowForgotPassword(true)}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    {t('forgotPassword.linkText')}
                  </button>
                </div>
              )}
              
              <button
                type="submit"
                disabled={isLoading === 'email' || isBlocked}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading === 'email' ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : null}
                {isSignUp ? t('form.createAccountButton') : t('form.loginButton')}
              </button>
            </form>

            {/* Toggle Sign Up / Sign In */}
            <div className="text-center">
              <button
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setErrors({});
                  setShowResendButton(false);
                }}
                className="text-blue-600 hover:text-blue-700 font-medium text-sm"
              >
                {isSignUp ? t('form.alreadyHaveAccount') : t('form.createNewAccount')}
              </button>
            </div>

            {/* Bouton pour renvoyer email si nécessaire */}
            {showResendButton && !isSignUp && (
              <div className="mt-4 text-center">
                <button
                  onClick={handleResendVerification}
                  disabled={isLoading === 'resend'}
                  className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center justify-center gap-1 mx-auto"
                >
                  {isLoading === 'resend' ? (
                    <Loader2 className="w-3 h-3 animate-spin" />
                  ) : (
                    <Mail className="w-3 h-3" />
                  )}
                  {t('form.resendVerification')}
                </button>
              </div>
            )}
          </div>
        )}

        {/* Actions spéciales lors des messages de succès */}
        {shouldHideForm && (
          <div className="space-y-4">
            <div className="text-center">
              <div className="animate-pulse">
                <Mail className="w-16 h-16 text-blue-500 mx-auto mb-4" />
              </div>
              <p className="text-gray-600 mb-6">
                {t('emailSent.message')}
              </p>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={handleClose}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                {t('emailSent.closeButton')}
              </button>
              {!isSignUp && (
                <button
                  onClick={handleResendVerification}
                  disabled={isLoading === 'resend'}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {isLoading === 'resend' ? t('emailSent.sendingButton') : t('emailSent.resendButton')}
                </button>
              )}
            </div>
          </div>
        )}

        {/* CGU et politique */}
        {!shouldHideForm && (
          <p className="text-xs text-gray-500 text-center mt-6">
            {t('legal.prefix')}{' '}
            <Link href="/cgu" className="text-blue-600 hover:underline">
              {t('legal.termsLink')}
            </Link>{' '}
            {t('legal.and')}{' '}
            <Link href="/privacy" className="text-blue-600 hover:underline">
              {t('legal.privacyLink')}
            </Link>
            .
          </p>
        )}
      </div>
    </div>
  );
};

export default AuthModal;
