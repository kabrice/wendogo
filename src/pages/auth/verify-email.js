// src/pages/auth/verify-email.js
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { CheckCircle, XCircle, Loader2, Mail, ArrowRight } from 'lucide-react';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import Link from 'next/link';

const VerifyEmail = () => {
  const router = useRouter();
  const { token, email } = router.query;
  const [status, setStatus] = useState('verifying'); // 'verifying', 'success', 'error'
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!token || !email) return;

    const verifyEmail = async () => {
      try {
        setStatus('verifying');
        
        const response = await fetch('/api/auth/verify-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            token: token,
            email: decodeURIComponent(email)
          })
        });

        const data = await response.json();

        if (response.ok && data.success) {
          setStatus('success');
          setMessage('Votre email a été vérifié avec succès ! Vous pouvez maintenant vous connecter.');
          
          // Rediriger vers la page d'accueil après 10 secondes
          setTimeout(() => {
            router.push('/?verified=true');
          }, 10000);
        } else {
          setStatus('error');
          setMessage(data.error || 'Erreur lors de la vérification de l\'email.');
        }
      } catch (error) {
        console.error('Erreur vérification:', error);
        setStatus('error');
        setMessage('Erreur de connexion lors de la vérification.');
      }
    };

    verifyEmail();
  }, [token, email, router]);

  return (
    <>
      <NavBar variant="simple" languageSelectorVariant="light" />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-16">
          
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 text-center">
            
            {status === 'verifying' && (
              <>
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-4">
                  Vérification en cours...
                </h1>
                <p className="text-gray-600">
                  Nous vérifions votre email. Veuillez patienter.
                </p>
              </>
            )}

            {status === 'success' && (
              <>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-4">
                  🎉 Email vérifié !
                </h1>
                <p className="text-gray-600 mb-6">
                  {message}
                </p>
                
                <div className="space-y-3">
                  <Link href="/">
                    <div className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium cursor-pointer">
                      Découvrir Wendogo
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </Link>
                  
                  <p className="text-sm text-gray-500">
                    Redirection automatique dans 10 secondes...
                  </p>
                </div>
              </>
            )}

            {status === 'error' && (
              <>
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <XCircle className="w-8 h-8 text-red-600" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-4">
                  Erreur de vérification
                </h1>
                <p className="text-red-600 mb-6">
                  {message}
                </p>
                
                <div className="space-y-3">
                  <Link href="/">
                    <div className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium cursor-pointer">
                      Retour à l'accueil
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </Link>
                  
                  <button
                    onClick={() => router.push('/?show-auth=true')}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium"
                  >
                    <Mail className="w-4 h-4" />
                    Demander un nouveau lien
                  </button>
                </div>
              </>
            )}
            
          </div>
          
          {/* Informations supplémentaires */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              Des questions ? Contactez-nous à{' '}
              <a href="mailto:support@wendogo.com" className="text-blue-600 hover:underline">
                support@wendogo.com
              </a>
            </p>
          </div>
          
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default VerifyEmail;
