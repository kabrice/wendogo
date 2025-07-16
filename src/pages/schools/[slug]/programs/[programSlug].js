// src/pages/schools/[slug]/programs/[programSlug].js - Page programme avec nouvelle structure d'URL
import React, { startTransition } from 'react';
import { useRouter } from 'next/router';
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

// Génération statique des paths
export async function getStaticPaths() {
  try {
    // Récupérer tous les programmes
    const programsResponse = await ProgramApi.getAllPrograms();
    if (!programsResponse.success) {
      return { paths: [], fallback: 'blocking' }; // ✅ CHANGER en 'blocking'
    }

    // Récupérer toutes les écoles une seule fois
    const schoolsResponse = await PrivateSchoolApi.getAllSchools();
    if (!schoolsResponse.success) {
      return { paths: [], fallback: true };
    }

    // Créer un map pour une recherche rapide des écoles
    const schoolsMap = new Map();
    schoolsResponse.data.forEach(school => {
      schoolsMap.set(school.id, school.slug);
    });

    // Créer les paths avec la nouvelle structure
    const paths = programsResponse.data
      .slice(0, 50) // ✅ AJOUTER cette limite
      .map((program) => {
        const schoolSlug = schoolsMap.get(program.school_id);
        if (schoolSlug) {
          return {
            params: { 
              slug: schoolSlug, 
              programSlug: program.slug 
            }
          };
        }
        return null;
      })
      .filter(Boolean);

    console.log('Generated paths:', paths); // Debug

    return {
      paths,
      fallback: 'blocking'
    };
  } catch (error) {
    console.error('Erreur lors de la génération des paths:', error);
    return {
      paths: [],
      fallback: true
    };
  }
}

export async function getStaticProps({ params }) {
  try {
    const { slug, programSlug } = params;

    console.log('getStaticProps called with:', { slug, programSlug });

    // ✅ WRAPPER dans startTransition
    return new Promise((resolve) => {
      startTransition(async () => {
        try {
          const programResponse = await ProgramApi.getProgramBySlug(programSlug);
          
          if (!programResponse.success) {
            console.log('Program not found:', programSlug);
            resolve({ notFound: true });
            return;
          }

          const program = programResponse.data;
          const schoolResponse = await PrivateSchoolApi.getSchoolById(program.school_id);
          
          if (!schoolResponse.success || !schoolResponse.data) {
            console.log('School not found for ID:', program.school_id);
            resolve({ notFound: true });
            return;
          }

          const school = schoolResponse.data;

          if (school.slug !== slug) {
            console.log('School slug mismatch:', { expected: slug, actual: school.slug });
            resolve({ notFound: true });
            return;
          }

          const similarProgramsResponse = await ProgramApi.getSimilarPrograms(program.id, 3);
          const similarPrograms = similarProgramsResponse.success ? similarProgramsResponse.data : [];

          resolve({
            props: {
              program,
              school,
              similarPrograms
            },
            revalidate: 86400 // ✅ AUGMENTER à 24h
          });
        } catch (error) {
          console.error('Erreur dans getStaticProps:', error);
          resolve({
            props: {
              error: 'Erreur lors du chargement des données'
            },
            revalidate: 60
          });
        }
      });
    });
  } catch (error) {
    console.error('Erreur critique:', error);
    return {
      props: {
        error: 'Erreur lors du chargement des données'
      },
      revalidate: 60
    };
  }
}

export default SchoolProgramPage;
