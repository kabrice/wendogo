// pages/test-i18n.js
import { useTranslation } from 'next-i18next';
import { getI18nProps } from '../lib/i18n';
import { useEffect } from 'react';

export default function TestI18n() {
  const { t, i18n } = useTranslation(['programs']);

  useEffect(() => {
    console.log('🔍 CLIENT:', {
      locale: i18n.language,
      loadedNamespaces: Object.keys(i18n.store?.data?.[i18n.language] || {}),
    });
  }, [i18n]);

  return (
    <div style={{ padding: '2rem', fontFamily: 'monospace' }}>
      <h1>Test i18n</h1>
      <div style={{ background: '#f0f0f0', padding: '1rem', marginBottom: '1rem' }}>
        <p><strong>Namespaces chargés :</strong> {Object.keys(i18n.store?.data?.[i18n.language] || {}).join(', ')}</p>
      </div>
      <div style={{ background: '#e8f5e9', padding: '1rem' }}>
        <p><strong>error.notFound :</strong> "{t('error.notFound')}"</p>
        <p><strong>financial.campusFrance.title :</strong> "{t('financial.campusFrance.title')}"</p>
      </div>
    </div>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await getI18nProps(locale, ['programs'])), // ✅ Utiliser le wrapper
    },
  };
}
