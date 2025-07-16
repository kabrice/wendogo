import { Html, Head, Main, NextScript } from 'next/document';
import { GA_MEASUREMENT_ID } from '../lib/gtag';

export default function Document() {
  return (
    <Html lang="fr">
      <Head>
        {/* Meta tags existants */}
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#000000" />
        <link rel="icon" href="/favicon.ico" />
        
        {/* Open Graph Metadata existants */}
        <meta property="fb:app_id" content="1711396672460430" />
        <meta property="og:url" content="https://wendogo.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Wendogo" />
        <meta property="og:description" content="Spécialiste en ligne pour vos projets d'études et de mobilité internationale." />
        <meta property="og:image" content="/social_media_logo.webp"/>

        {/* Apple Touch Icon */}
        <link rel="apple-touch-icon" href="/social_media_logo.webp" />

        {/* CSS for Flag Icons */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/lipis/flag-icons@6.11.0/css/flag-icons.min.css"
        />

        {/* Manifest for Progressive Web App */}
        <link rel="manifest" href="/manifest.json" />

        {/* ✅ NOUVEAU : Google Analytics */}
        {GA_MEASUREMENT_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA_MEASUREMENT_ID}', {
                    page_path: window.location.pathname,
                  });
                `,
              }}
            />
          </>
        )}

        {/* Debug en développement */}
        {process.env.NODE_ENV === 'development' && (
          <>
            <script src="//cdn.jsdelivr.net/npm/eruda"></script>
            <script dangerouslySetInnerHTML={{ __html: 'eruda.init();' }} />
          </>
        )}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
