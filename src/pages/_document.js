import { Html, Head, Main, NextScript } from 'next/document'; 

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Meta tags */}
        <meta charSet="utf-8" />
        {/* <meta name="viewport" content="width=device-width, initial-scale=1" /> */}
        <meta name="theme-color" content="#000000" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />

        {/* Open Graph Metadata */}
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
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
