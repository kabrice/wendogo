// next-i18next.config.js
const path = require('path');

module.exports = {
  i18n: {
    defaultLocale: 'fr',
    locales: ['fr', 'en'],
    localeDetection: false,
  },
  defaultNS: 'common',
  ns: ['common', 'programs', 'authModal', 'schools'], // ✅ ajoute ton namespace ici
  localePath: path.resolve('./public/locales'),
  reloadOnPrerender: process.env.NODE_ENV === 'development',
  react: { useSuspense: false },
};
