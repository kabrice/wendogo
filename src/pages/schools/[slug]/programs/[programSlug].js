// src/pages/schools/[slug]/programs/[programSlug].js - Page programme avec nouvelle structure d'URL

import React from 'react';
import { useRouter } from 'next/router';
import ProgramApi from '../../../../store/apis/programApi';
import PrivateSchoolApi from '../../../../store/apis/privateSchoolApi';
import ProgramPage from '../../../programs/[slug]';

const SchoolProgramPage = (props) => {
  return <ProgramPage {...props} />;
};

// Génération statique des paths
export async function getStaticPaths() {
  try {
    // Récupérer tous les programmes
    const programsResponse = await ProgramApi.getAllPrograms();
    
    if (!programsResponse.success) {
      return {
        paths: [],
        fallback: true
      };
    }

    // Créer les paths avec la nouvelle structure
    const paths = programsResponse.data.map((program) => ({
      params: { 
        slug: program.school_slug,
        programSlug: program.slug
      }
    }));

    return {
      paths,
      fallback: true
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
    
    // Récupérer le programme par son slug
    const programResponse = await ProgramApi.getProgramBySlug(programSlug);
    
    if (!programResponse.success) {
      return {
        notFound: true
      };
    }

    const program = programResponse.data;

    // Vérifier que le programme appartient bien à cette école
    if (program.school_slug !== slug) {
      return {
        notFound: true
      };
    }

    // Récupérer l'école
    const schoolResponse = await PrivateSchoolApi.getSchoolBySlug(slug);
    const school = schoolResponse.success ? schoolResponse.data : null;

    // Récupérer les programmes similaires
    const similarProgramsResponse = await ProgramApi.getSimilarPrograms(program.id, 3);
    const similarPrograms = similarProgramsResponse.success ? similarProgramsResponse.data : [];

    return {
      props: {
        program,
        school,
        similarPrograms
      },
      revalidate: 3600
    };
  } catch (error) {
    console.error('Erreur lors de la récupération des données:', error);
    return {
      props: {
        error: 'Erreur lors du chargement des données'
      },
      revalidate: 60
    };
  }
}

export default SchoolProgramPage;
