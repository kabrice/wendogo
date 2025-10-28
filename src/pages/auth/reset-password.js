// src/pages/auth/reset-password.js
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Lock, Eye, EyeOff, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import Link from 'next/link';
import bcrypt from 'bcryptjs';
import { useTranslation } from 'next-i18next';

const ResetPassword = () => {
  const router = useRouter();
  const { t } = useTranslation(['common', 'authModal']);
  const { token, email } = router.query;
  const [status, setStatus] = useState('loading'); // 'loading', 'valid', 'invalid', 'success', 'error'
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Vérifier le token au chargement
  useEffect(() => {
    if (!token || !email) {
      setStatus('invalid');
      return;
    }

    const verifyToken = async () => {
      try {
        const response = await fetch('/api/auth/verify-reset-token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            token: token,
            email: decodeURIComponent(email)
          })
        });

        if (response.ok) {
          setStatus('valid');
        } else {
          setStatus('invalid');
        }
      } catch (error) {
        setStatus('invalid');
      }
    };

    verifyToken();
  }, [token, email]);

  const validatePasswords = () => {
    const newErrors = {};

    if (!password) {
      newErrors.password = t('resetPassword.errors.passwordRequired');
    } else if (password.length < 6) {
      newErrors.password = t('resetPassword.errors.passwordTooShort');
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = t('resetPassword.errors.confirmRequired');
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = t('resetPassword.errors.passwordMismatch');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validatePasswords()) return;

    setIsLoading(true);
    setErrors({});

    try {
      // Hasher le mot de passe côté client
      const hashedPassword = await bcrypt.hash(password, 12);

      const response = await fetch('/api/auth/reset-password-confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token: token,
          email: decodeURIComponent(email),
          new_password: hashedPassword
        })
      });

      if (response.ok) {
        setStatus('success');
        setTimeout(() => {
          router.push('/?password-reset=true');
        }, 3000);
      } else {
        const data = await response.json();
        setErrors({ submit: data.error || t('resetPassword.errors.resetError') });
      }
    } catch (error) {
      setErrors({ submit: t('resetPassword.errors.connectionError') });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <NavBar variant="simple" languageSelectorVariant="light" />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-16">
          
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
            
            {status === 'loading' && (
              <div className="text-center">
                <Loader2 className="w-8 h-8 text-orange-600 animate-spin mx-auto mb-4" />
                <h1 className="text-xl font-bold text-gray-900 mb-2">{t('resetPassword.loading.title')}</h1>
                <p className="text-gray-600">{t('resetPassword.loading.description')}</p>
              </div>
            )}

            {status === 'invalid' && (
              <div className="text-center">
                <XCircle className="w-16 h-16 text-red-600 mx-auto mb-4" />
                <h1 className="text-2xl font-bold text-gray-900 mb-4">{t('resetPassword.invalid.title')}</h1>
                <p className="text-red-600 mb-6">
                  {t('resetPassword.invalid.description')}
                </p>
                <Link 
                  href="/?show-auth=true"
                  className="inline-flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                >
                  {t('resetPassword.invalid.requestNewLink')}
                </Link>
              </div>
            )}

            {status === 'success' && (
              <div className="text-center">
                <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                <h1 className="text-2xl font-bold text-gray-900 mb-4">
                  {t('resetPassword.success.title')}
                </h1>
                <p className="text-gray-600 mb-6">
                  {t('resetPassword.success.description')}
                </p>
                <p className="text-sm text-gray-500">
                  {t('resetPassword.success.redirect')}
                </p>
              </div>
            )}

            {status === 'valid' && (
              <>
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Lock className="w-8 h-8 text-orange-600" />
                  </div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    {t('resetPassword.form.title')}
                  </h1>
                  <p className="text-gray-600">
                    {t('resetPassword.form.description')}
                  </p>
                </div>

                {errors.submit && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-700 text-sm">{errors.submit}</p>
                  </div>
                )}

                <div onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('resetPassword.form.newPassword')}
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={`w-full pl-10 pr-10 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                          errors.password ? 'border-red-300' : 'border-gray-300'
                        }`}
                        placeholder={t('resetPassword.form.newPasswordPlaceholder')}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="mt-1 text-xs text-red-600">{errors.password}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('resetPassword.form.confirmPassword')}
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className={`w-full pl-10 pr-10 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                          errors.confirmPassword ? 'border-red-300' : 'border-gray-300'
                        }`}
                        placeholder={t('resetPassword.form.confirmPasswordPlaceholder')}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="mt-1 text-xs text-red-600">{errors.confirmPassword}</p>
                    )}
                  </div>

                  <button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700 transition-colors disabled:opacity-50"
                  >
                    {isLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Lock className="w-4 h-4" />
                    )}
                    {t('resetPassword.form.submitButton')}
                  </button>
                </div>
              </>
            )}
            
          </div>
          
        </div>
      </div>
      
      <Footer />
    </>
  );
};
export async function getStaticProps({ locale }) {
  const { serverSideTranslations } = await import('next-i18next/serverSideTranslations');
  
  return {
    props: {
      ...(await serverSideTranslations(locale, ['authModal', 'common'])),
    },
  };
}
export default ResetPassword;
