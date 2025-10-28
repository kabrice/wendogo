// src/pages/temoignages.js
'use client';

import { useEffect, useState } from 'react';
import { trackPageView } from '../lib/gtag';
import Head from 'next/head';
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';
import { 
  Star, 
  Quote, 
  User, 
  MapPin, 
  GraduationCap, 
  Heart,
  CheckCircle,
  ArrowRight,
  Calendar,
  Flag,
  Award,
  Users,
  Globe,
  TrendingUp,
  MessageSquare,
  Play,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';

function Temoignages() {
  const { t } = useTranslation(['common', 'temoignages']);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [filterCountry, setFilterCountry] = useState('all');
  const [filterDomain, setFilterDomain] = useState('all');

  useEffect(() => {
    trackPageView('temoignages_page');
  }, []);

  const stats = [
    { number: t('temoignages:stats.studentsHelped.number'), label: t('temoignages:stats.studentsHelped.label'), icon: Users },
    { number: t('temoignages:stats.successRate.number'), label: t('temoignages:stats.successRate.label'), icon: TrendingUp },
    { number: t('temoignages:stats.averageRating.number'), label: t('temoignages:stats.averageRating.label'), icon: Star },
    { number: t('temoignages:stats.countriesRepresented.number'), label: t('temoignages:stats.countriesRepresented.label'), icon: Globe }
  ];

  const testimonials = [
    {
      id: 1,
      name: t('temoignages:testimonials.1.name'),
      country: t('temoignages:testimonials.1.country'),
      flag: t('temoignages:testimonials.1.flag'),
      city: t('temoignages:testimonials.1.city'),
      university: t('temoignages:testimonials.1.university'),
      program: t('temoignages:testimonials.1.program'),
      year: t('temoignages:testimonials.1.year'),
      rating: 5,
      domain: t('temoignages:filters.domain.sciences'),
      photo: '/images/student-placeholder.jpg',
      testimonial: t('temoignages:testimonials.1.testimonial'),
      journey: [
        t('temoignages:testimonials.1.journey.0'),
        t('temoignages:testimonials.1.journey.1'),
        t('temoignages:testimonials.1.journey.2'),
        t('temoignages:testimonials.1.journey.3'),
        t('temoignages:testimonials.1.journey.4')
      ],
      advice: t('temoignages:testimonials.1.advice')
    },
    {
      id: 2,
      name: t('temoignages:testimonials.2.name'),
      country: t('temoignages:testimonials.2.country'),
      flag: t('temoignages:testimonials.2.flag'),
      city: t('temoignages:testimonials.2.city'),
      university: t('temoignages:testimonials.2.university'),
      program: t('temoignages:testimonials.2.program'),
      year: t('temoignages:testimonials.2.year'),
      rating: 5,
      domain: t('temoignages:filters.domain.health'),
      photo: '/images/student-placeholder.jpg',
      testimonial: t('temoignages:testimonials.2.testimonial'),
      journey: [
        t('temoignages:testimonials.2.journey.0'),
        t('temoignages:testimonials.2.journey.1'),
        t('temoignages:testimonials.2.journey.2'),
        t('temoignages:testimonials.2.journey.3'),
        t('temoignages:testimonials.2.journey.4')
      ],
      advice: t('temoignages:testimonials.2.advice')
    },
    {
      id: 3,
      name: t('temoignages:testimonials.3.name'),
      country: t('temoignages:testimonials.3.country'),
      flag: t('temoignages:testimonials.3.flag'),
      city: t('temoignages:testimonials.3.city'),
      university: t('temoignages:testimonials.3.university'),
      program: t('temoignages:testimonials.3.program'),
      year: t('temoignages:testimonials.3.year'),
      rating: 5,
      domain: t('temoignages:filters.domain.business'),
      photo: '/images/student-placeholder.jpg',
      testimonial: t('temoignages:testimonials.3.testimonial'),
      journey: [
        t('temoignages:testimonials.3.journey.0'),
        t('temoignages:testimonials.3.journey.1'),
        t('temoignages:testimonials.3.journey.2'),
        t('temoignages:testimonials.3.journey.3'),
        t('temoignages:testimonials.3.journey.4')
      ],
      advice: t('temoignages:testimonials.3.advice')
    },
    {
      id: 4,
      name: t('temoignages:testimonials.4.name'),
      country: t('temoignages:testimonials.4.country'),
      flag: t('temoignages:testimonials.4.flag'),
      city: t('temoignages:testimonials.4.city'),
      university: t('temoignages:testimonials.4.university'),
      program: t('temoignages:testimonials.4.program'),
      year: t('temoignages:testimonials.4.year'),
      rating: 4,
      domain: t('temoignages:filters.domain.computerScience'),
      photo: '/images/student-placeholder.jpg',
      testimonial: t('temoignages:testimonials.4.testimonial'),
      journey: [
        t('temoignages:testimonials.4.journey.0'),
        t('temoignages:testimonials.4.journey.1'),
        t('temoignages:testimonials.4.journey.2'),
        t('temoignages:testimonials.4.journey.3'),
        t('temoignages:testimonials.4.journey.4')
      ],
      advice: t('temoignages:testimonials.4.advice')
    },
    {
    id: 5,
    name: t('temoignages:testimonials.5.name'),
    country: t('temoignages:testimonials.5.country'),
    flag: t('temoignages:testimonials.5.flag'),
    city: t('temoignages:testimonials.5.city'),
    university: t('temoignages:testimonials.5.university'),
    program: t('temoignages:testimonials.5.program'),
    year: t('temoignages:testimonials.5.year'),
    rating: 5,
    domain: t('temoignages:filters.domain.accountingManagement'),
    photo: '/images/student-placeholder.jpg',
    testimonial: t('temoignages:testimonials.5.testimonial'),
    journey: [
        t('temoignages:testimonials.5.journey.0'),
        t('temoignages:testimonials.5.journey.1'),
        t('temoignages:testimonials.5.journey.2'),
        t('temoignages:testimonials.5.journey.3'),
        t('temoignages:testimonials.5.journey.4')
    ],
    advice: t('temoignages:testimonials.5.advice')
    },
    {
      id: 6,
      name: t('temoignages:testimonials.6.name'),
      country: t('temoignages:testimonials.6.country'),
      flag: t('temoignages:testimonials.6.flag'),
      city: t('temoignages:testimonials.6.city'),
      university: t('temoignages:testimonials.6.university'),
      program: t('temoignages:testimonials.6.program'),
      year: t('temoignages:testimonials.6.year'),
      rating: 5,
      domain: t('temoignages:filters.domain.sciencesPo'),
      photo: '/images/student-placeholder.jpg',
      testimonial: t('temoignages:testimonials.6.testimonial'),
      journey: [
        t('temoignages:testimonials.6.journey.0'),
        t('temoignages:testimonials.6.journey.1'),
        t('temoignages:testimonials.6.journey.2'),
        t('temoignages:testimonials.6.journey.3'),
        t('temoignages:testimonials.6.journey.4')
      ],
      advice: t('temoignages:testimonials.6.advice')
    }
  ];

  const countries = [
    { value: 'all', label: t('temoignages:filters.country.all'), count: testimonials.length },
    { value: t('temoignages:testimonials.1.country'), label: t('temoignages:filters.country.morocco'), count: testimonials.filter(tes => tes.country === testimonials[0].country).length },
    { value: t('temoignages:testimonials.2.country'), label: t('temoignages:filters.country.cameroon'), count: testimonials.filter(tes => tes.country === testimonials[1].country).length },
    { value: t('temoignages:testimonials.3.country'), label: t('temoignages:filters.country.algeria'), count: testimonials.filter(tes => tes.country === testimonials[2].country).length },
    { value: t('temoignages:testimonials.4.country'), label: t('temoignages:filters.country.senegal'), count: testimonials.filter(tes => tes.country === testimonials[3].country).length },
    { value: t('temoignages:testimonials.5.country'), label: t('temoignages:filters.country.ivoryCoast'), count: testimonials.filter(tes => tes.country === testimonials[4].country).length }
  ];

  const domains = [
    { value: 'all', label: t('temoignages:filters.domain.all'), count: testimonials.length },
    { value: t('temoignages:filters.domain.sciences'), label: t('temoignages:filters.domain.sciences'), count: testimonials.filter(tes => tes.domain === t('temoignages:filters.domain.sciences')).length },
    { value: t('temoignages:filters.domain.health'), label: t('temoignages:filters.domain.health'), count: testimonials.filter(tes => tes.domain === t('temoignages:filters.domain.health')).length },
    { value: t('temoignages:filters.domain.business'), label: t('temoignages:filters.domain.business'), count: testimonials.filter(tes => tes.domain === t('temoignages:filters.domain.business')).length },
    { value: t('temoignages:filters.domain.engineering'), label: t('temoignages:filters.domain.engineering'), count: testimonials.filter(tes => tes.domain === t('temoignages:filters.domain.engineering')).length },
    { value: t('temoignages:filters.domain.computerScience'), label: t('temoignages:filters.domain.computerScience'), count: testimonials.filter(tes => tes.domain === t('temoignages:filters.domain.computerScience')).length }
  ];

  const filteredTestimonials = testimonials.filter(testimonial => {
    const countryMatch = filterCountry === 'all' || testimonial.country === filterCountry;
    const domainMatch = filterDomain === 'all' || testimonial.domain === filterDomain;
    return countryMatch && domainMatch;
  });

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % filteredTestimonials.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + filteredTestimonials.length) % filteredTestimonials.length);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>{t('temoignages:meta.title')}</title>
        <meta name="description" content={t('temoignages:meta.description')} />
        <meta name="keywords" content={t('temoignages:meta.keywords')} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        
        <meta property="og:title" content={t('temoignages:meta.ogTitle')} />
        <meta property="og:description" content={t('temoignages:meta.ogDescription')} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://wendogo.com/temoignages" />
        <meta property="og:image" content="https://wendogo.com/images/temoignages-hero.jpg" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t('temoignages:meta.twitterTitle')} />
        <meta name="twitter:description" content={t('temoignages:meta.twitterDescription')} />
        
        <link rel="canonical" href="https://wendogo.com/temoignages" />
        
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Wendogo",
            "url": "https://wendogo.com",
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "reviewCount": "2100",
              "bestRating": "5",
              "worstRating": "1"
            },
            "review": testimonials.map(testimonial => ({
              "@type": "Review",
              "author": {
                "@type": "Person",
                "name": testimonial.name
              },
              "reviewRating": {
                "@type": "Rating",
                "ratingValue": testimonial.rating,
                "bestRating": "5"
              },
              "reviewBody": testimonial.testimonial
            }))
          })
        }} />
      </Head>

      <NavBar variant="simple" languageSelectorVariant="light" />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-full p-4">
                <Heart className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              {t('temoignages:hero.title')}
            </h1>
            <p className="text-lg sm:text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              {t('temoignages:hero.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/?tab=accompany#accompany-section" className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                {t('temoignages:hero.ctaPrimary')}
              </Link>
              {/* <Link href="/contact" className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                {t('temoignages:hero.ctaSecondary')}
              </Link> */}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="bg-blue-100 w-12 h-12 lg:w-16 lg:h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                  <stat.icon className="w-6 h-6 lg:w-8 lg:h-8 text-blue-600" />
                </div>
                <div className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1">{stat.number}</div>
                <div className="text-sm lg:text-base text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('temoignages:filters.country.title')}</h3>
              <div className="flex flex-wrap gap-2">
                {countries.map(country => (
                  <button
                    key={country.value}
                    onClick={() => setFilterCountry(country.value)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      filterCountry === country.value
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {country.label} ({country.count})
                  </button>
                ))}
              </div>
            </div>
            
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('temoignages:filters.domain.title')}</h3>
              <div className="flex flex-wrap gap-2">
                {domains.map(domain => (
                  <button
                    key={domain.value}
                    onClick={() => setFilterDomain(domain.value)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      filterDomain === domain.value
                        ? 'bg-purple-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {domain.label} ({domain.count})
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Featured Testimonial */}
      {filteredTestimonials.length > 0 && (
        <section className="py-16 bg-gradient-to-r from-purple-50 to-indigo-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {t('temoignages:featuredTestimonial.title')}
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {t('temoignages:featuredTestimonial.subtitle')}
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Story Section */}
                <div className="p-8 lg:p-12">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                      {filteredTestimonials[activeTestimonial].name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">
                        {filteredTestimonials[activeTestimonial].name}
                      </h3>
                      <div className="flex items-center text-gray-600 text-sm">
                        <span className="mr-2">{filteredTestimonials[activeTestimonial].flag}</span>
                        <span>{filteredTestimonials[activeTestimonial].city}, {filteredTestimonials[activeTestimonial].country}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center mb-4">
                    <div className="flex mr-3">
                      {renderStars(filteredTestimonials[activeTestimonial].rating)}
                    </div>
                    <span className="text-sm text-gray-500">
                      {filteredTestimonials[activeTestimonial].year}
                    </span>
                  </div>

                  <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
                    <Quote className="w-8 h-8 text-blue-600 mb-2" />
                    <p className="text-gray-800 italic leading-relaxed">
                      {filteredTestimonials[activeTestimonial].testimonial}
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <div className="flex items-center mb-2">
                        <GraduationCap className="w-4 h-4 text-purple-600 mr-2" />
                        <span className="text-sm font-medium text-gray-900">{t('temoignages:featuredTestimonial.labels.program')}</span>
                      </div>
                      <p className="text-sm text-gray-600">{filteredTestimonials[activeTestimonial].program}</p>
                    </div>
                    <div>
                      <div className="flex items-center mb-2">
                        <MapPin className="w-4 h-4 text-purple-600 mr-2" />
                        <span className="text-sm font-medium text-gray-900">{t('temoignages:featuredTestimonial.labels.university')}</span>
                      </div>
                      <p className="text-sm text-gray-600">{filteredTestimonials[activeTestimonial].university}</p>
                    </div>
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="font-semibold text-green-900 mb-2">{t('temoignages:featuredTestimonial.labels.advice')}</h4>
                    <p className="text-sm text-green-800 italic">
                      "{filteredTestimonials[activeTestimonial].advice}"
                    </p>
                  </div>
                </div>

                {/* Journey Section */}
                <div className="bg-gradient-to-br from-gray-50 to-blue-50 p-8 lg:p-12">
                  <h4 className="text-xl font-semibold text-gray-900 mb-6">
                    {t('temoignages:featuredTestimonial.labels.journey')}
                  </h4>
                  <div className="space-y-4">
                    {filteredTestimonials[activeTestimonial].journey.map((step, index) => (
                      <div key={index} className="flex items-start">
                        <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-1">
                          {index + 1}
                        </div>
                        <p className="text-gray-700">{step}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 p-6 bg-white rounded-xl shadow-sm">
                    <div className="flex items-center mb-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                      <span className="font-semibold text-gray-900">{t('temoignages:featuredTestimonial.labels.result')}</span>
                    </div>
                    <p className="text-gray-700 mb-4">
                      {t('temoignages:featuredTestimonial.labels.resultDescription')}
                    </p>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>{t('temoignages:featuredTestimonial.labels.accompanied')} {filteredTestimonials[activeTestimonial].year}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between p-6 bg-gray-50 border-t">
                <button
                  onClick={prevTestimonial}
                  className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  {t('temoignages:featuredTestimonial.navigation.previous')}
                </button>
                
                <div className="flex space-x-2">
                  {filteredTestimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveTestimonial(index)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === activeTestimonial ? 'bg-blue-600' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
                
                <button
                  onClick={nextTestimonial}
                  className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  {t('temoignages:featuredTestimonial.navigation.next')}
                  <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* All Testimonials Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t('temoignages:allTestimonials.title')}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('temoignages:allTestimonials.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTestimonials.map((testimonial, index) => (
              <div key={testimonial.id} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold mr-3">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                    <div className="flex items-center text-gray-600 text-sm">
                      <span className="mr-1">{testimonial.flag}</span>
                      <span>{testimonial.country}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center mb-3">
                  <div className="flex mr-2">
                    {renderStars(testimonial.rating)}
                  </div>
                  <span className="text-sm text-gray-500">({testimonial.year})</span>
                </div>

                <div className="mb-4">
                  <div className="flex items-center mb-2">
                    <GraduationCap className="w-4 h-4 text-blue-600 mr-2" />
                    <span className="text-sm font-medium text-gray-900">{testimonial.program}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 text-gray-500 mr-2" />
                    <span className="text-sm text-gray-600">{testimonial.university}</span>
                  </div>
                </div>

                <p className="text-gray-700 text-sm leading-relaxed mb-4 line-clamp-4">
                  {testimonial.testimonial}
                </p>

                <button
                  onClick={() => {
                    setActiveTestimonial(filteredTestimonials.findIndex(tes => tes.id === testimonial.id));
                    document.querySelector('.bg-gradient-to-r.from-purple-50').scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
                >
                  {t('temoignages:allTestimonials.readFullStory')}
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            ))}
          </div>

          {filteredTestimonials.length === 0 && (
            <div className="text-center py-12">
              <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {t('temoignages:allTestimonials.noResults.title')}
              </h3>
              <p className="text-gray-600">
                {t('temoignages:allTestimonials.noResults.description')}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">
            {t('temoignages:cta.title')}
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            {t('temoignages:cta.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/?tab=accompany#accompany-section" className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              {t('temoignages:cta.primaryButton')}
            </Link>
            {/* <Link href="/contact" className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              {t('temoignages:cta.secondaryButton')}
            </Link> */}
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
      ...(await serverSideTranslations(locale, ['authModal', 'common', 'temoignages'])),
    },
  };
}
export default Temoignages;
