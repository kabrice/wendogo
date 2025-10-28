// src/pages/schools/[slug]/programs/[programSlug].js
import React from 'react';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import ProgramApi from '../../../../store/apis/programApi';
import PrivateSchoolApi from '../../../../store/apis/privateSchoolApi';
import ProgramPage from '../../../programs/[slug]';

const SchoolProgramPage = (props) => {
  const router = useRouter();
  if (router.isFallback) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  return <ProgramPage {...props} />;
};

// ✅ Fonction utilitaire pour nettoyer les données
const sanitizeData = (obj) => {
  if (obj === null || obj === undefined) return null;
  if (Array.isArray(obj)) return obj.map(sanitizeData);
  if (typeof obj !== 'object') return obj;
  
  const cleaned = {};
  for (const key in obj) {
    const value = obj[key];
    if (value === undefined) {
      cleaned[key] = null; // ✅ Remplacer undefined par null
    } else if (value && typeof value === 'object') {
      cleaned[key] = sanitizeData(value);
    } else {
      cleaned[key] = value;
    }
  }
  return cleaned;
};

export async function getStaticPaths() {
  try {
    // const router = useRouter();
    // const locale = router.locale;
    const programsResponse = await ProgramApi.getAllPrograms();
    if (!programsResponse.success) {
      return { paths: [], fallback: 'blocking' };
    }

    const schoolsResponse = await PrivateSchoolApi.getAllSchools();
    if (!schoolsResponse.success) {
      return { paths: [], fallback: 'blocking' };
    }

    const schoolsMap = new Map();
    schoolsResponse.data.forEach(school => {
      schoolsMap.set(school.id, school.slug);
    });

    // ✅ Générer les paths pour toutes les locales
    const locales = ['fr', 'en'];
    const paths = [];

    programsResponse.data
      .slice(0, 50)
      .forEach((program) => {
        const schoolSlug = schoolsMap.get(program.school_id);
        if (schoolSlug) {
          locales.forEach((locale) => {
            paths.push({
              params: { 
                slug: schoolSlug, 
                programSlug: program.slug 
              },
              locale, // ✅ Ajouter la locale
            });
          });
        }
      });

    return {
      paths,
      fallback: 'blocking'
    };
  } catch (error) {
    console.error('Erreur lors de la génération des paths:', error);
    return {
      paths: [],
      fallback: 'blocking'
    };
  }
}

export async function getStaticProps({ params, locale = 'fr' }) { // ✅ Ajouter locale
  try {
    const { slug, programSlug } = params;

    console.log('getStaticProps called with:', { slug, programSlug, locale });

    const programResponse = await ProgramApi.getProgramBySlug(programSlug, locale);
    
    if (!programResponse.success) {
      console.log('Program not found:', programSlug);
      return { notFound: true };
    }
    console.log('Program data retrieved:', programResponse);
    const program = programResponse.data;
    const schoolResponse = await PrivateSchoolApi.getSchoolById(program.school_id, locale);
    
    if (!schoolResponse.success || !schoolResponse.data) {
      console.log('School not found for ID:', program.school_id);
      return { notFound: true };
    }

    const school = schoolResponse.data;

    if (school.slug !== slug) {
      console.log('School slug mismatch:', { expected: slug, actual: school.slug });
      return { notFound: true };
    }

    const similarProgramsResponse = await ProgramApi.getSimilarPrograms(program.id, 3, locale);
    const similarPrograms = similarProgramsResponse.success ? similarProgramsResponse.data : [];

    // ✅ NETTOYER TOUTES LES DONNÉES avant sérialisation
    const cleanedProgram = sanitizeData(program);
    const cleanedSchool = sanitizeData(school);
    const cleanedSimilarPrograms = sanitizeData(similarPrograms);

    return {
      props: {
        program: cleanedProgram,
        school: cleanedSchool,
        similarPrograms: cleanedSimilarPrograms,
        ...(await serverSideTranslations(locale, ['authModal', 'common', 'programs'])), // ✅ Ajouter les traductions
      },
      revalidate: 86400
    };
  } catch (error) {
    console.error('Erreur dans getStaticProps:', error);
    return {
      props: {
        error: 'Erreur lors du chargement des données',
        ...(await serverSideTranslations(locale, ['authModal', 'common', 'programs'])),
      },
      revalidate: 60
    };
  }
}

export default SchoolProgramPage;
