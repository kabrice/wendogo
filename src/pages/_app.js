// pages/_app.js - VERSION FINALE
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { SessionProvider } from 'next-auth/react';
import { useRouter } from 'next/router';
import { getStore } from '../redux/store';
import { FavoritesProvider } from '../contexts/FavoritesContext';
import Spinner from '../components/Spinner';
import '../index.css';
import { appWithTranslation } from 'next-i18next';
import { Analytics } from '@vercel/analytics/next';
import AuthModal from '../components/AuthModal';
import * as gtag from '../lib/gtag';


const MyApp = ({ Component, pageProps: { session, ...pageProps } }) => {
  const store = getStore();
  const router = useRouter();
  
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    router.events.on('hashChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
      router.events.off('hashChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <Provider store={store}>
      <SessionProvider session={session}>
        {/* ❌ SUPPRIMER LocaleProvider */}
        <FavoritesProvider>
          <Spinner />
          <Component {...pageProps} />
          <Analytics />
          <AuthModal />
        </FavoritesProvider>
      </SessionProvider>
    </Provider>
  );
};

export default appWithTranslation(MyApp);
