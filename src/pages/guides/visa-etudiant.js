// src/pages/guides/visa-etudiant.js
'use client';

import { useEffect, useState } from 'react';
import { trackPageView } from '../../lib/gtag';
import Head from 'next/head';
import Footer from '../../components/Footer';
import NavBar from '../../components/NavBar';
import { useTranslation } from 'next-i18next';
import { 
  FileText, 
  Shield, 
  Calendar, 
  CreditCard, 
  MapPin, 
  Clock,
  CheckCircle, 
  AlertTriangle,
  User,
  Plane,
  Building,
  Heart,
  Euro,
  Phone,
  Mail,
  ExternalLink,
  Download,
  ChevronUp,
  ChevronDown,
  Target,
  Award,
  Globe
} from 'lucide-react';
import Link from 'next/link';

function VisaEtudiantGuide() {
  const { t } = useTranslation(['common', 'visaEtudiant']);
  const [activeTab, setActiveTab] = useState('types');
  const [expandedSection, setExpandedSection] = useState(null);

  useEffect(() => {
    trackPageView('guide_visa_etudiant');
  }, []);

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const quickStats = [
    { number: '99€', label: t('visaEtudiant:quickStats.visaFees'), icon: Euro },
    { number: '615€', label: t('visaEtudiant:quickStats.monthlyResources'), icon: CreditCard },
    { number: '2-8', label: t('visaEtudiant:quickStats.processingTime'), icon: Clock },
    { number: '1 an', label: t('visaEtudiant:quickStats.initialValidity'), icon: Calendar }
  ];

  const visaTypes = [
    {
      title: t('visaEtudiant:types.vls.title'),
      description: t('visaEtudiant:types.vls.description'),
      duration: t('visaEtudiant:types.vls.duration'),
      requirements: t('visaEtudiant:types.vls.requirements'),
      color: 'blue'
    },
    {
      title: t('visaEtudiant:types.short.title'),
      description: t('visaEtudiant:types.short.description'),
      duration: t('visaEtudiant:types.short.duration'),
      requirements: t('visaEtudiant:types.short.requirements'),
      color: 'green'
    },
    {
      title: t('visaEtudiant:types.concours.title'),
      description: t('visaEtudiant:types.concours.description'),
      duration: t('visaEtudiant:types.concours.duration'),
      requirements: t('visaEtudiant:types.concours.requirements'),
      color: 'purple'
    }
  ];

  const documentsRequis = [
    {
      category: t('visaEtudiant:documents.personal.category'),
      items: [
        { name: t('visaEtudiant:documents.personal.passport.name'), detail: t('visaEtudiant:documents.personal.passport.detail'), urgent: true },
        { name: t('visaEtudiant:documents.personal.photos.name'), detail: t('visaEtudiant:documents.personal.photos.detail'), urgent: true },
        { name: t('visaEtudiant:documents.personal.form.name'), detail: t('visaEtudiant:documents.personal.form.detail'), urgent: true },
        { name: t('visaEtudiant:documents.personal.birthCert.name'), detail: t('visaEtudiant:documents.personal.birthCert.detail'), urgent: false }
      ]
    },
    {
      category: t('visaEtudiant:documents.academic.category'),
      items: [
        { name: t('visaEtudiant:documents.academic.campusFrance.name'), detail: t('visaEtudiant:documents.academic.campusFrance.detail'), urgent: true },
        { name: t('visaEtudiant:documents.academic.admission.name'), detail: t('visaEtudiant:documents.academic.admission.detail'), urgent: true },
        { name: t('visaEtudiant:documents.academic.diplomas.name'), detail: t('visaEtudiant:documents.academic.diplomas.detail'), urgent: false },
        { name: t('visaEtudiant:documents.academic.transcripts.name'), detail: t('visaEtudiant:documents.academic.transcripts.detail'), urgent: false }
      ]
    },
    {
      category: t('visaEtudiant:documents.financial.category'),
      items: [
        { name: t('visaEtudiant:documents.financial.resources.name'), detail: t('visaEtudiant:documents.financial.resources.detail'), urgent: true },
        { name: t('visaEtudiant:documents.financial.bankStatements.name'), detail: t('visaEtudiant:documents.financial.bankStatements.detail'), urgent: true },
        { name: t('visaEtudiant:documents.financial.guarantor.name'), detail: t('visaEtudiant:documents.financial.guarantor.detail'), urgent: false },
        { name: t('visaEtudiant:documents.financial.scholarship.name'), detail: t('visaEtudiant:documents.financial.scholarship.detail'), urgent: false }
      ]
    },
    {
      category: t('visaEtudiant:documents.housing.category'),
      items: [
        { name: t('visaEtudiant:documents.housing.proof.name'), detail: t('visaEtudiant:documents.housing.proof.detail'), urgent: true },
        { name: t('visaEtudiant:documents.housing.contract.name'), detail: t('visaEtudiant:documents.housing.contract.detail'), urgent: false },
        { name: t('visaEtudiant:documents.housing.guarantorRental.name'), detail: t('visaEtudiant:documents.housing.guarantorRental.detail'), urgent: false }
      ]
    }
  ];

  const etapesProcedure = [
    {
      step: 1,
      title: t('visaEtudiant:procedure.step1.title'),
      description: t('visaEtudiant:procedure.step1.description'),
      details: [
        t('visaEtudiant:procedure.step1.detail1'),
        t('visaEtudiant:procedure.step1.detail2'),
        t('visaEtudiant:procedure.step1.detail3'),
        t('visaEtudiant:procedure.step1.detail4')
      ],
      duration: t('visaEtudiant:procedure.step1.duration')
    },
    {
      step: 2,
      title: t('visaEtudiant:procedure.step2.title'),
      description: t('visaEtudiant:procedure.step2.description'),
      details: [
        t('visaEtudiant:procedure.step2.detail1'),
        t('visaEtudiant:procedure.step2.detail2'),
        t('visaEtudiant:procedure.step2.detail3'),
        t('visaEtudiant:procedure.step2.detail4')
      ],
      duration: t('visaEtudiant:procedure.step2.duration')
    },
    {
      step: 3,
      title: t('visaEtudiant:procedure.step3.title'),
      description: t('visaEtudiant:procedure.step3.description'),
      details: [
        t('visaEtudiant:procedure.step3.detail1'),
        t('visaEtudiant:procedure.step3.detail2'),
        t('visaEtudiant:procedure.step3.detail3'),
        t('visaEtudiant:procedure.step3.detail4')
      ],
      duration: t('visaEtudiant:procedure.step3.duration')
    },
    {
      step: 4,
      title: t('visaEtudiant:procedure.step4.title'),
      description: t('visaEtudiant:procedure.step4.description'),
      details: [
        t('visaEtudiant:procedure.step4.detail1'),
        t('visaEtudiant:procedure.step4.detail2'),
        t('visaEtudiant:procedure.step4.detail3'),
        t('visaEtudiant:procedure.step4.detail4')
      ],
      duration: t('visaEtudiant:procedure.step4.duration')
    },
    {
      step: 5,
      title: t('visaEtudiant:procedure.step5.title'),
      description: t('visaEtudiant:procedure.step5.description'),
      details: [
        t('visaEtudiant:procedure.step5.detail1'),
        t('visaEtudiant:procedure.step5.detail2'),
        t('visaEtudiant:procedure.step5.detail3'),
        t('visaEtudiant:procedure.step5.detail4')
      ],
      duration: t('visaEtudiant:procedure.step5.duration')
    },
    {
      step: 6,
      title: t('visaEtudiant:procedure.step6.title'),
      description: t('visaEtudiant:procedure.step6.description'),
      details: [
        t('visaEtudiant:procedure.step6.detail1'),
        t('visaEtudiant:procedure.step6.detail2'),
        t('visaEtudiant:procedure.step6.detail3'),
        t('visaEtudiant:procedure.step6.detail4')
      ],
      duration: t('visaEtudiant:procedure.step6.duration')
    }
  ];

  const conseils = [
    {
      title: t('visaEtudiant:conseils.anticipation.title'),
      description: t('visaEtudiant:conseils.anticipation.description'),
      tips: [
        t('visaEtudiant:conseils.anticipation.tip1'),
        t('visaEtudiant:conseils.anticipation.tip2'),
        t('visaEtudiant:conseils.anticipation.tip3'),
        t('visaEtudiant:conseils.anticipation.tip4')
      ]
    },
    {
      title: t('visaEtudiant:conseils.quality.title'),
      description: t('visaEtudiant:conseils.quality.description'),
      tips: [
        t('visaEtudiant:conseils.quality.tip1'),
        t('visaEtudiant:conseils.quality.tip2'),
        t('visaEtudiant:conseils.quality.tip3'),
        t('visaEtudiant:conseils.quality.tip4')
      ]
    },
    {
      title: t('visaEtudiant:conseils.financial.title'),
      description: t('visaEtudiant:conseils.financial.description'),
      tips: [
        t('visaEtudiant:conseils.financial.tip1'),
        t('visaEtudiant:conseils.financial.tip2'),
        t('visaEtudiant:conseils.financial.tip3'),
        t('visaEtudiant:conseils.financial.tip4')
      ]
    },
    {
      title: t('visaEtudiant:conseils.interview.title'),
      description: t('visaEtudiant:conseils.interview.description'),
      tips: [
        t('visaEtudiant:conseils.interview.tip1'),
        t('visaEtudiant:conseils.interview.tip2'),
        t('visaEtudiant:conseils.interview.tip3'),
        t('visaEtudiant:conseils.interview.tip4')
      ]
    },
    {
      title: t('visaEtudiant:conseils.communication.title'),
      description: t('visaEtudiant:conseils.communication.description'),
      tips: [
        t('visaEtudiant:conseils.communication.tip1'),
        t('visaEtudiant:conseils.communication.tip2'),
        t('visaEtudiant:conseils.communication.tip3'),
        t('visaEtudiant:conseils.communication.tip4')
      ]
    },
    {
      title: t('visaEtudiant:conseils.backup.title'),
      description: t('visaEtudiant:conseils.backup.description'),
      tips: [
        t('visaEtudiant:conseils.backup.tip1'),
        t('visaEtudiant:conseils.backup.tip2'),
        t('visaEtudiant:conseils.backup.tip3'),
        t('visaEtudiant:conseils.backup.tip4')
      ]
    }
  ];

  const erreurs = [
    t('visaEtudiant:conseils.errors.error1'),
    t('visaEtudiant:conseils.errors.error2'),
    t('visaEtudiant:conseils.errors.error3'),
    t('visaEtudiant:conseils.errors.error4'),
    t('visaEtudiant:conseils.errors.error5'),
    t('visaEtudiant:conseils.errors.error6')
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>{t('visaEtudiant:meta.title')}</title>
        <meta name="description" content={t('visaEtudiant:meta.description')} />
      </Head>

      <NavBar />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Shield className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">{t('visaEtudiant:hero.badge')}</span>
            </div>
            <h1 className="text-3xl lg:text-5xl font-bold mb-6">
              {t('visaEtudiant:hero.title')}
            </h1>
            <p className="text-xl lg:text-2xl mb-4 text-blue-100">
              {t('visaEtudiant:hero.subtitle')}
            </p>
            <p className="text-lg text-blue-100 max-w-3xl mx-auto">
              {t('visaEtudiant:hero.description')}
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
            {quickStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                  <div className="bg-white/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="text-2xl font-bold mb-1">{stat.number}</div>
                  <div className="text-sm text-blue-100">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex overflow-x-auto">
            {[
              { id: 'types', label: t('visaEtudiant:tabs.types'), icon: FileText },
              { id: 'documents', label: t('visaEtudiant:tabs.documents'), icon: Shield },
              { id: 'procedure', label: t('visaEtudiant:tabs.procedure'), icon: Calendar },
              { id: 'conseils', label: t('visaEtudiant:tabs.conseils'), icon: Award }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-6 py-4 font-medium border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-5 h-5 mr-2" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Types de visa */}
          {activeTab === 'types' && (
            <div className="space-y-12">
              <div className="text-center">
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                  {t('visaEtudiant:types.title')}
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  {t('visaEtudiant:types.subtitle')}
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {visaTypes.map((visa, index) => (
                  <div key={index} className={`bg-white border-2 border-${visa.color}-200 rounded-xl p-6 hover:shadow-lg transition-shadow`}>
                    <div className={`bg-${visa.color}-100 w-12 h-12 rounded-full flex items-center justify-center mb-4`}>
                      <FileText className={`w-6 h-6 text-${visa.color}-600`} />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {visa.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{visa.description}</p>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm">
                        <Clock className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="text-gray-700">{visa.duration}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <CheckCircle className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="text-gray-700">{visa.requirements}</span>
                      </div>
                    </div>
                    <button className={`text-${visa.color}-600 font-semibold hover:underline flex items-center`}>
                      {t('visaEtudiant:types.moreInfo')}
                      <ExternalLink className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <div className="flex items-start">
                  <AlertTriangle className="w-6 h-6 text-blue-600 mr-3 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-blue-900 mb-2">
                      {t('visaEtudiant:types.infoBox.title')}
                    </h3>
                    <p className="text-blue-800">
                      {t('visaEtudiant:types.infoBox.description')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Documents requis */}
          {activeTab === 'documents' && (
            <div className="space-y-12">
              <div className="text-center">
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                  {t('visaEtudiant:documents.title')}
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  {t('visaEtudiant:documents.subtitle')}
                </p>
              </div>

              <div className="space-y-8">
                {documentsRequis.map((category, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                    <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {category.category}
                      </h3>
                    </div>
                    <div className="divide-y divide-gray-200">
                      {category.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="flex items-center">
                                <h4 className="font-medium text-gray-900">{item.name}</h4>
                                {item.urgent && (
                                  <span className="ml-2 bg-red-100 text-red-800 text-xs px-2 py-1 rounded">
                                    {t('visaEtudiant:documents.urgent')}
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-gray-600 mt-1">{item.detail}</p>
                            </div>
                            <CheckCircle className={`w-5 h-5 ml-4 ${item.urgent ? 'text-red-500' : 'text-gray-400'}`} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-amber-900 mb-3">
                  {t('visaEtudiant:documents.warningBox.title')}
                </h3>
                <ul className="space-y-2 text-amber-800">
                  <li>• {t('visaEtudiant:documents.warningBox.point1')}</li>
                  <li>• {t('visaEtudiant:documents.warningBox.point2')}</li>
                  <li>• {t('visaEtudiant:documents.warningBox.point3')}</li>
                  <li>• {t('visaEtudiant:documents.warningBox.point4')}</li>
                </ul>
              </div>
            </div>
          )}

          {/* Procédure */}
          {activeTab === 'procedure' && (
            <div className="space-y-12">
              <div className="text-center">
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                  {t('visaEtudiant:procedure.title')}
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  {t('visaEtudiant:procedure.subtitle')}
                </p>
              </div>

              <div className="space-y-8">
                {etapesProcedure.map((etape, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-start">
                      <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold mr-6 mt-1">
                        {etape.step}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-xl font-semibold text-gray-900">
                            {etape.title}
                          </h3>
                          <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
                            {etape.duration}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-4">{etape.description}</p>
                        <div className="grid md:grid-cols-2 gap-3">
                          {etape.details.map((detail, detailIndex) => (
                            <div key={detailIndex} className="flex items-center">
                              <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                              <span className="text-sm text-gray-700">{detail}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {t('visaEtudiant:procedure.timeline.title')}
                </h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Clock className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="text-2xl font-bold text-green-900">{t('visaEtudiant:procedure.timeline.normal.duration')}</div>
                    <div className="text-sm text-green-800">{t('visaEtudiant:procedure.timeline.normal.label')}</div>
                  </div>
                  <div className="text-center">
                    <div className="bg-amber-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                      <AlertTriangle className="w-6 h-6 text-amber-600" />
                    </div>
                    <div className="text-2xl font-bold text-amber-900">{t('visaEtudiant:procedure.timeline.high.duration')}</div>
                    <div className="text-sm text-amber-800">{t('visaEtudiant:procedure.timeline.high.label')}</div>
                  </div>
                  <div className="text-center">
                    <div className="bg-red-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Target className="w-6 h-6 text-red-600" />
                    </div>
                    <div className="text-2xl font-bold text-red-900">{t('visaEtudiant:procedure.timeline.start.duration')}</div>
                    <div className="text-sm text-red-800">{t('visaEtudiant:procedure.timeline.start.label')}</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Conseils */}
          {activeTab === 'conseils' && (
            <div className="space-y-12">
              <div className="text-center">
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                  {t('visaEtudiant:conseils.title')}
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  {t('visaEtudiant:conseils.subtitle')}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {conseils.map((conseil, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {conseil.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{conseil.description}</p>
                    <ul className="space-y-2">
                      {conseil.tips.map((tip, tipIndex) => (
                        <li key={tipIndex} className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                          <span className="text-sm text-gray-700">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <AlertTriangle className="w-6 h-6 text-red-600 mr-3" />
                  <h3 className="text-lg font-semibold text-red-900">
                    {t('visaEtudiant:conseils.errors.title')}
                  </h3>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {erreurs.map((erreur, index) => (
                    <div key={index} className="flex items-start">
                      <div className="bg-red-100 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">
                        <span className="text-red-600 text-sm font-bold">✗</span>
                      </div>
                      <span className="text-sm text-red-800">{erreur}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">
                  {t('visaEtudiant:conseils.checklist.title')}
                </h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-3">{t('visaEtudiant:conseils.checklist.documents.title')}</h4>
                    <ul className="space-y-2 text-blue-800 text-sm">
                      <li>☑️ {t('visaEtudiant:conseils.checklist.documents.item1')}</li>
                      <li>☑️ {t('visaEtudiant:conseils.checklist.documents.item2')}</li>
                      <li>☑️ {t('visaEtudiant:conseils.checklist.documents.item3')}</li>
                      <li>☑️ {t('visaEtudiant:conseils.checklist.documents.item4')}</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-3">{t('visaEtudiant:conseils.checklist.finances.title')}</h4>
                    <ul className="space-y-2 text-blue-800 text-sm">
                      <li>☑️ {t('visaEtudiant:conseils.checklist.finances.item1')}</li>
                      <li>☑️ {t('visaEtudiant:conseils.checklist.finances.item2')}</li>
                      <li>☑️ {t('visaEtudiant:conseils.checklist.finances.item3')}</li>
                      <li>☑️ {t('visaEtudiant:conseils.checklist.finances.item4')}</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-3">{t('visaEtudiant:conseils.checklist.housing.title')}</h4>
                    <ul className="space-y-2 text-blue-800 text-sm">
                      <li>☑️ {t('visaEtudiant:conseils.checklist.housing.item1')}</li>
                      <li>☑️ {t('visaEtudiant:conseils.checklist.housing.item2')}</li>
                      <li>☑️ {t('visaEtudiant:conseils.checklist.housing.item3')}</li>
                      <li>☑️ {t('visaEtudiant:conseils.checklist.housing.item4')}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold mb-6">
            {t('visaEtudiant:cta.title')}
          </h2>
          <p className="text-lg lg:text-xl mb-8 text-blue-100">
            {t('visaEtudiant:cta.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/?tab=accompany#accompany-section" className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              {t('visaEtudiant:cta.button1')}
            </Link>
            <Link href="/guides/campus-france" className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              {t('visaEtudiant:cta.button2')}
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export async function getStaticProps({ locale }) {
  const { serverSideTranslations } = await import('next-i18next/serverSideTranslations');
  
  return {
    props: {
      ...(await serverSideTranslations(locale, ['authModal', 'common', 'visaEtudiant'])),
    },
  };
}
export default VisaEtudiantGuide;
