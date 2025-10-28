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
import Image from 'next/image';
import Link from 'next/link';

function Temoignages() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [filterCountry, setFilterCountry] = useState('all');
  const [filterDomain, setFilterDomain] = useState('all');

  useEffect(() => {
    trackPageView('temoignages_page');
  }, []);

  const stats = [
    { number: '2,100+', label: 'Étudiants accompagnés', icon: Users },
    { number: '95%', label: 'Taux de réussite', icon: TrendingUp },
    { number: '4.9/5', label: 'Note moyenne', icon: Star },
    { number: '50+', label: 'Pays représentés', icon: Globe }
  ];

  const testimonials = [
    {
      id: 1,
      name: 'Achraf M.',
      country: 'Maroc',
      flag: '🇲🇦',
      city: 'Casablanca',
      university: 'Université d\'Orléans',
      program: 'Master Sciences Physiques',
      year: '2024',
      rating: 5,
      domain: 'Sciences',
      photo: '/images/student-placeholder.jpg',
      testimonial: "J'ai obtenu mon bac sciences physiques option française (BIOF) en 2019. Au début, je ne savais rien des démarches Campus France et visa. L'équipe Wendogo m'a accompagné de A à Z. Edgar m'a aidé à choisir entre Orléans et Angers - finalement Orléans était parfait pour mes études en sciences pures. Le plus rassurant ? Je ne payais qu'une fois mon visa obtenu !",
      journey: [
        "Bac sciences physiques BIOF obtenu",
        "Découverte des démarches Campus France",
        "Accompagnement personnalisé Wendogo",
        "Choix entre Orléans et Angers",
        "Visa obtenu avec succès"
      ],
      advice: "Faites confiance à Wendogo, ils connaissent parfaitement les démarches. N'hésitez pas à poser toutes vos questions, même les plus basiques."
    },
    {
      id: 2,
      name: 'Marie K.',
      country: 'Cameroun',
      flag: '🇨🇲',
      city: 'Yaoundé',
      university: 'Université Claude Bernard Lyon 1',
      program: 'Master Sciences de la Santé',
      year: '2024',
      rating: 5,
      domain: 'Santé',
      photo: '/images/student-placeholder.jpg',
      testimonial: "Les formations en santé sont très encadrées en France, je ne trouvais pas d'école privée. Edgar m'a expliqué que tout passe par Campus France et m'a orientée vers Paris-Saclay en parallèle. Ses conseils pour l'entretien Campus France ont été précieux. Résultat : acceptée à Lyon 1 ! Je suis reconnaissante pour cet accompagnement.",
      journey: [
        "Recherche infructueuse d'écoles privées",
        "Explication des voies officielles",
        "Candidature Paris-Saclay parallèle",
        "Préparation entretien Campus France",
        "Acceptation Lyon 1 obtenue"
      ],
      advice: "Pour les formations en santé, restez sur les voies officielles. L'entretien Campus France est crucial - préparez-vous bien !"
    },
    {
      id: 3,
      name: 'Ahmed B.',
      country: 'Algérie',
      flag: '🇩🇿',
      city: 'Alger',
      university: 'ESSEC Business School',
      program: 'Master Management',
      year: '2024',
      rating: 5,
      domain: 'Business',
      photo: '/images/student-placeholder.jpg',
      testimonial: "Après mon diplôme d'ingénieur en Algérie, je voulais me reconvertir en management. L'équipe Wendogo m'a aidé à cibler les bonnes écoles de commerce et à préparer un dossier solide. Leur connaissance des spécificités algériennes m'a fait gagner des mois. Maintenant à l'ESSEC, je recommande vivement !",
      journey: [
        "Diplôme ingénieur en Algérie",
        "Projet reconversion management",
        "Ciblage écoles de commerce",
        "Dossier optimisé par Wendogo",
        "Admission ESSEC réussie"
      ],
      advice: "N'hésitez pas à changer de voie - Wendogo vous aidera à valoriser votre parcours antérieur."
    },
    {
      id: 4,
      name: 'Fatima S.',
      country: 'Sénégal',
      flag: '🇸🇳',
      city: 'Dakar',
      university: 'Université Sorbonne Paris Nord',
      program: 'Master Informatique',
      year: '2024',
      rating: 4,
      domain: 'Informatique',
      photo: '/images/student-placeholder.jpg',
      testimonial: "En tant que femme dans la tech au Sénégal, je voulais me spécialiser en France. Wendogo m'a non seulement aidée pour Campus France mais aussi pour trouver un logement étudiant à Paris. Leur accompagnement va au-delà des démarches administratives - ils pensent à tout !",
      journey: [
        "Ingénieure informatique au Sénégal",
        "Projet spécialisation France",
        "Accompagnement Campus France",
        "Aide recherche logement Paris",
        "Installation réussie Sorbonne"
      ],
      advice: "Wendogo pense à tous les aspects de votre projet - pas seulement les démarches officielles."
    },
    {
    id: 5,
    name: 'Mariama S.',
    country: 'Côte d\'Ivoire',
    flag: '🇨🇮',
    city: 'Abidjan',
    university: 'ESG Finance',
    program: 'Master Audit et Contrôle de Gestion',
    year: '2025',
    rating: 5,
    domain: 'Comptabilité / Gestion',
    photo: '/images/student-placeholder.jpg',
    testimonial: "J'avais obtenu ma licence en comptabilité, contrôle et audit en 2017, puis j'ai travaillé comme assistante comptable. En 2024, j'ai décidé de reprendre mes études en France. Grâce à Wendogo, j'ai été parfaitement accompagnée pour préparer le concours d'entrée à ESG Finance. J'ai finalement été admise ! Leur soutien m’a aussi aidée à mieux comprendre les questions bancaires liées à ma demande de visa. Merci infiniment !",
    journey: [
        "Licence obtenue en 2017",
        "Expérience pro en comptabilité",
        "Préparation au concours ESG Finance avec Wendogo",
        "Admission réussie en 2025",
        "Assistance visa et soutien bancaire"
    ],
    advice: "Même si vous avez quitté l’école depuis longtemps, il n’est jamais trop tard. Wendogo vous accompagne avec sérieux et bienveillance à chaque étape."
    },
    {
      id: 6,
      name: 'Amina L.',
      country: 'Maroc',
      flag: '🇲🇦',
      city: 'Rabat',
      university: 'Sciences Po Bordeaux',
      program: 'Master Relations Internationales',
      year: '2024',
      rating: 5,
      domain: 'Sciences Po',
      photo: '/images/student-placeholder.jpg',
      testimonial: "Sciences Po, c'était mon rêve ! Mais les procédures d'admission sont complexes. Wendogo m'a guidée dans le processus spécifique aux IEP, m'a aidée à préparer le concours d'entrée et les entretiens. Leur expertise des grandes écoles françaises fait la différence.",
      journey: [
        "Rêve d'intégrer Sciences Po",
        "Procédures IEP complexes",
        "Accompagnement spécialisé",
        "Préparation concours et entretiens",
        "Admission Sciences Po Bordeaux"
      ],
      advice: "Pour les grandes écoles, l'expertise spécialisée est indispensable. Wendogo connaît tous les codes."
    }
  ];

  const countries = [
    { value: 'all', label: 'Tous les pays', count: testimonials.length },
    { value: 'Maroc', label: 'Maroc 🇲🇦', count: testimonials.filter(t => t.country === 'Maroc').length },
    { value: 'Cameroun', label: 'Cameroun 🇨🇲', count: testimonials.filter(t => t.country === 'Cameroun').length },
    { value: 'Algérie', label: 'Algérie 🇩🇿', count: testimonials.filter(t => t.country === 'Algérie').length },
    { value: 'Sénégal', label: 'Sénégal 🇸🇳', count: testimonials.filter(t => t.country === 'Sénégal').length },
    { value: 'Côte d\'Ivoire', label: 'Côte d\'Ivoire 🇨🇮', count: testimonials.filter(t => t.country === 'Côte d\'Ivoire').length }
  ];

  const domains = [
    { value: 'all', label: 'Tous les domaines', count: testimonials.length },
    { value: 'Sciences', label: 'Sciences', count: testimonials.filter(t => t.domain === 'Sciences').length },
    { value: 'Santé', label: 'Santé', count: testimonials.filter(t => t.domain === 'Santé').length },
    { value: 'Business', label: 'Business', count: testimonials.filter(t => t.domain === 'Business').length },
    { value: 'Ingénierie', label: 'Ingénierie', count: testimonials.filter(t => t.domain === 'Ingénierie').length },
    { value: 'Informatique', label: 'Informatique', count: testimonials.filter(t => t.domain === 'Informatique').length }
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
        <title>Témoignages d'étudiants - Wendogo a transformé leur parcours</title>
        <meta name="description" content="Découvrez les témoignages authentiques d'étudiants accompagnés par Wendogo. Plus de 2100 étudiants ont réalisé leur rêve d'étudier en France grâce à notre accompagnement personnalisé." />
        <meta name="keywords" content="témoignages étudiants Wendogo, avis Campus France, réussite études France, accompagnement étudiant international" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        
        <meta property="og:title" content="Témoignages d'étudiants - Wendogo a transformé leur parcours" />
        <meta property="og:description" content="Plus de 2100 étudiants ont réalisé leur rêve d'étudier en France avec Wendogo. Découvrez leurs histoires inspirantes." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://wendogo.com/temoignages" />
        <meta property="og:image" content="https://wendogo.com/images/temoignages-hero.jpg" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Témoignages d'étudiants - Wendogo" />
        <meta name="twitter:description" content="Découvrez comment Wendogo a transformé le parcours de plus de 2100 étudiants" />
        
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
              Ils ont réalisé leur rêve d'étudier en France
            </h1>
            <p className="text-lg sm:text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              Découvrez les témoignages authentiques de plus de 2100 étudiants qui ont 
              transformé leur parcours grâce à l'accompagnement personnalisé Wendogo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/?tab=accompany#accompany-section" className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Accompagnez-moi
              </Link>
              {/* <Link href="/contact" className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                Parler à un conseiller
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
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Filtrer par pays :</h3>
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
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Filtrer par domaine :</h3>
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
                Témoignage mis en avant
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Découvrez l'histoire inspirante de nos étudiants qui ont réussi leur projet d'études en France.
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
                        <span className="text-sm font-medium text-gray-900">Formation</span>
                      </div>
                      <p className="text-sm text-gray-600">{filteredTestimonials[activeTestimonial].program}</p>
                    </div>
                    <div>
                      <div className="flex items-center mb-2">
                        <MapPin className="w-4 h-4 text-purple-600 mr-2" />
                        <span className="text-sm font-medium text-gray-900">Université</span>
                      </div>
                      <p className="text-sm text-gray-600">{filteredTestimonials[activeTestimonial].university}</p>
                    </div>
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="font-semibold text-green-900 mb-2">Son conseil :</h4>
                    <p className="text-sm text-green-800 italic">
                      "{filteredTestimonials[activeTestimonial].advice}"
                    </p>
                  </div>
                </div>

                {/* Journey Section */}
                <div className="bg-gradient-to-br from-gray-50 to-blue-50 p-8 lg:p-12">
                  <h4 className="text-xl font-semibold text-gray-900 mb-6">
                    Son parcours avec Wendogo
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
                      <span className="font-semibold text-gray-900">Résultat</span>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Admission réussie et installation en France avec l'accompagnement complet Wendogo.
                    </p>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>Accompagnement : {filteredTestimonials[activeTestimonial].year}</span>
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
                  Précédent
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
                  Suivant
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
              Tous les témoignages
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Parcourez l'ensemble des témoignages de nos étudiants accompagnés avec succès.
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
                    setActiveTestimonial(filteredTestimonials.findIndex(t => t.id === testimonial.id));
                    document.querySelector('.bg-gradient-to-r.from-purple-50').scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
                >
                  Lire l'histoire complète
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            ))}
          </div>

          {filteredTestimonials.length === 0 && (
            <div className="text-center py-12">
              <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Aucun témoignage trouvé
              </h3>
              <p className="text-gray-600">
                Essayez de modifier vos filtres pour voir plus de témoignages.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Prêt à écrire votre propre histoire de réussite ?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Rejoignez plus de 2100 étudiants qui ont réalisé leur rêve d'étudier en France 
            grâce à l'accompagnement personnalisé Wendogo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/?tab=accompany#accompany-section" className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Accompagnez-moi
            </Link>
            {/* <Link href="/contact" className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              Nous contacter
            </Link> */}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Temoignages;
