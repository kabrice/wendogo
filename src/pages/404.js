// src/pages/404.js - Version redesignée et traduite
'use client';

import { useEffect } from 'react';
import { trackPageView } from '../lib/gtag';
import { Home, Search, MessageCircle, RefreshCw, ArrowLeft } from 'lucide-react';
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

function Error404() {
  const router = useRouter();
  const { t } = useTranslation(['common', 'error404']);
  
  useEffect(() => {
    trackPageView('404_page');
  }, []);

  const handleRefresh = () => {
    window.location.reload();
  };

  const quickLinks = [
    {
      title: t('error404:quick_link_search_title'),
      description: t('error404:quick_link_search_description'),
      href: '/',
      icon: Search,
      color: 'blue'
    },
    {
      title: t('error404:quick_link_contact_title'),
      description: t('error404:quick_link_contact_description'),
      href: '/contact',
      icon: MessageCircle,
      color: 'green'
    },
    {
      title: t('error404:quick_link_mission_title'),
      description: t('error404:quick_link_mission_description'),
      href: '/mission',
      icon: Home,
      color: 'purple'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar variant="simple" languageSelectorVariant="light" />
      
      <main className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center">
          {/* 404 Visual */}
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full mb-6">
              <span className="text-6xl font-bold text-blue-600">404</span>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {t('error404:page_title')}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              {t('error404:page_description')}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button
              onClick={() => window.history.back()}
              className="flex items-center justify-center px-6 py-3 bg-gray-600 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              {t('error404:button_back')}
            </button>
            
            <Link
              href="/"
              className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-colors"
            >
              <Home className="w-5 h-5 mr-2" />
              {t('error404:button_home')}
            </Link>
            
            <button
              onClick={handleRefresh}
              className="flex items-center justify-center px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:border-gray-400 hover:bg-gray-50 transition-colors"
            >
              <RefreshCw className="w-5 h-5 mr-2" />
              {t('error404:button_refresh')}
            </button>
          </div>

          {/* Quick Links */}
          <div className="mb-16">
            <h2 className="text-2xl font-semibold text-gray-900 mb-8">
              {t('error404:continue_navigation')}
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {quickLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-shadow border border-gray-200 group"
                >
                  <div className={`bg-${link.color}-100 w-12 h-12 rounded-full flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform`}>
                    <link.icon className={`w-6 h-6 text-${link.color}-600`} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {link.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {link.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>

          {/* Help Section */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {t('error404:help_title')}
            </h2>
            <p className="text-gray-700 mb-6">
              {t('error404:help_description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                {t('error404:help_contact_us')}
              </Link>
              <a
                href="https://wa.me/33668156073"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
              >
                {t('error404:help_whatsapp')}
              </a>
              <a
                href="mailto:hello@wendogo.com"
                className="border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors"
              >
                {t('error404:help_email')}
              </a>
            </div>
          </div>

          {/* Search Suggestion */}
          <div className="mt-16 max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              {t('error404:search_suggestion_title')}
            </h3>
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder={t('error404:search_placeholder')}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  onKeyUp={(e) => {
                    if (e.key === 'Enter') {
                      window.location.href = `/?q=${encodeURIComponent(e.target.value)}`;
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export async function getStaticProps({ locale }) {
  const { serverSideTranslations } = await import('next-i18next/serverSideTranslations');
  
  return {
    props: {
      ...(await serverSideTranslations(locale, ['authModal', 'common', 'error404'])),
    },
  };
}

export default Error404;
