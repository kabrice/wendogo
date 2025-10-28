// src/components/ProgramCard.js
import React from 'react';
import { MapPin, Clock, Euro, Calendar, Award, Briefcase, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';

const ProgramCard = ({ program, locale = 'fr' }) => {
  const { t } = useTranslation();

  // Obtenir les valeurs selon la locale
  const getLocalizedValue = (frValue, enValue) => {
    return locale === 'en' && enValue ? enValue : frValue;
  };

  const title = getLocalizedValue(program.title, program.name_en);
  const description = getLocalizedValue(program.description, program.description_en);
  const skillsAcquired = getLocalizedValue(program.skills_acquired, program.skills_acquired_en);
  const careers = getLocalizedValue(program.careers, program.careers_en);

  // Formater la durée
  const formatDuration = (duration) => {
    if (!duration) return '';
    const num = parseInt(duration);
    if (locale === 'en') {
      return num > 1 ? `${num} years` : `${num} year`;
    }
    return num > 1 ? `${num} ans` : `${num} an`;
  };

  // Badge d'exonération
  const getExonerationBadge = () => {
    if (program.exoneration_totale) {
      return (
        <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">
          {t('program.exoneration.total')}
        </span>
      );
    }
    if (program.exoneration_partielle) {
      return (
        <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800">
          {t('program.exoneration.partial')}
        </span>
      );
    }
    return null;
  };

  return (
    <Link href={`/program/${program.id}`}>
      <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer h-full flex flex-col">
        {/* Header */}
        <div className="p-6 flex-1">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h3 className="font-semibold text-lg text-gray-900 mb-1 line-clamp-2">
                {title}
              </h3>
              <p className="text-sm text-gray-600 flex items-center gap-1">
                <Globe className="w-4 h-4" />
                {program.school_name}
              </p>
            </div>
          </div>

          {/* Description */}
          {description && (
            <p className="text-sm text-gray-600 line-clamp-3 mb-4">
              {description}
            </p>
          )}

          {/* Badges */}
          <div className="flex flex-wrap gap-2 mb-4">
            {program.grade && (
              <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-purple-100 text-purple-800">
                <Award className="w-3 h-3 mr-1" />
                {locale === 'en' && program.state_certification_type_en 
                  ? program.state_certification_type_en 
                  : program.grade}
              </span>
            )}
            {program.alternance_disponible && (
              <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800">
                <Briefcase className="w-3 h-3 mr-1" />
                {t('program.alternance')}
              </span>
            )}
            {getExonerationBadge()}
          </div>

          {/* Info Grid */}
          <div className="space-y-2 text-sm">
            {program.city && (
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                <span>{program.city}</span>
              </div>
            )}
            
            {program.duration && (
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="w-4 h-4 flex-shrink-0" />
                <span>
                  {t('program.duration')}: {formatDuration(program.duration)}
                </span>
              </div>
            )}

            {program.annual_tuition_fees && (
              <div className="flex items-center gap-2 text-gray-600">
                <Euro className="w-4 h-4 flex-shrink-0" />
                <span>
                  {new Intl.NumberFormat('fr-FR', {
                    style: 'currency',
                    currency: 'EUR',
                    maximumFractionDigits: 0
                  }).format(program.annual_tuition_fees)}/an
                </span>
              </div>
            )}

            {program.intake && (
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="w-4 h-4 flex-shrink-0" />
                <span>
                  {t('program.intake')}: {program.intake}
                </span>
              </div>
            )}

            {program.required_deposit && (
              <div className="flex items-center gap-2 text-gray-600">
                <Euro className="w-4 h-4 flex-shrink-0" />
                <span>
                  {t('program.deposit')}: {new Intl.NumberFormat('fr-FR', {
                    style: 'currency',
                    currency: 'EUR',
                    maximumFractionDigits: 0
                  }).format(program.required_deposit)}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
          <button className="w-full text-center text-blue-600 font-medium text-sm hover:text-blue-700 transition-colors">
            {t('program.viewProgram')} →
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProgramCard;
