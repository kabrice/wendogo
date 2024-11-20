'use client';

import React from 'react'; 
import Footer from '../../components/Footer';
import HeaderMenuBarOnlyWithLogo from '../../components/HeaderMenuBarOnlyWithLogo';
import FormGroup from '@mui/material/FormGroup';
import LocationIcon from '../../assets/location-353.svg';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox'; 
import helper from '../../utils/Helper';
import { useEffect, useState, useCallback, useMemo, useRef} from 'react'; 
import _, { set } from 'lodash'
import { useGetSchoolDetailsFromSchoolIdsMutation } from '../../store/apis/schoolApi';
import { useGetMajorDetailsFromMajorIdsMutation } from '../../store/apis/majorApi';
import {useUpdateAndGetStudentSimulationResultMutation} from '../../store/apis/userApi';
import { activateSpinner, deactivateSpinner } from '../../redux/spinnerslice';
import { setUser } from '../../redux/userSlice';
import { useDispatch, useSelector } from 'react-redux'
import OptimizedImage from '../../components/OptimizedImage'; 
import SimulationResultWaiting from '../../components/SimulationResultWaiting'; 
import ServicePricingCard from '../../components/ServicePricingCard';
import ContactModal from '../../components/ContactModal'; 
import Link from 'next/link';
import { Loader2 } from "lucide-react";
import Image from 'next/image';

const SessionExpiredAlert = () => {

  
    return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
        <div style={{ maxWidth: '450px', width: '100%', backgroundColor: 'white', borderRadius: '8px', padding: '2rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', border: '1px solid #fee2e2', }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', textAlign: 'center' }}> {/* Logout Icon */}
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" y1="12" x2="9" y2="12" /> </svg>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#ef4444', margin: '0' }}> Votre session a expiré </h2>
                <div style={{ color: '#666', fontSize: '1rem', marginBottom: '1.5rem' }}>
                    <p> Pour votre sécurité, votre session a été déconnectée en raison d'une période d'inactivité. </p>
                    <p style={{ marginTop: '0.5rem' }}> Veuillez recommencer pour continuer à utiliser l'application. </p>
                </div>
                <Link href='/simulation/home' style={{ width: '100%', padding: '0.75rem 1rem', backgroundColor: '#0154c0', color: 'white', border: 'none', borderRadius: '6px', fontSize: '1rem', fontWeight: '500', cursor: 'pointer', transition: 'background-color 0.2s', }} onMouseOver={(e)=> e.target.style.backgroundColor = '#0143a0'} onMouseOut={(e) => e.target.style.backgroundColor = '#0154c0'} > 
                    Recommencer </Link>
            </div>
        </div>
    </div>
    );
  };

  const useInitialDataLoad = () => {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [evaluationResults, setEvaluationResults] = useState(null);
    const [displayValidCourses, setDisplayValidCourses] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [displayMonOrientation, setDisplayMonOrientation] = useState(false);
    const [isSessionExpired, setIsSessionExpired] = useState(false);
    const [getStudentSimulationResult] = useUpdateAndGetStudentSimulationResultMutation();
  
    useEffect(() => {
      let mounted = true;

      const initializeData = async () => {
        try {
          // Get localStorage data first
          
          
          // Only proceed if component is still mounted
          if (!mounted) return;

          if (!user) {
            setIsSessionExpired(true);
            setIsLoading(false);
            return;
          }

          // Set user data
          

          let simulationResults;
          
          // Check for existing simulation results
          if (user?.simulationResults) {
            simulationResults = user.simulationResults;
          } else {
            // Fetch new simulation results if none exist
            console.log('userxx NN', user)
            simulationResults = await getStudentSimulationResult(user).unwrap();
            console.log('userxx NNN', user)
            // Save results to localStorage
           // if (simulationResults) {
            const newUser = {
                                ...user, 
                                'userId': simulationResults?.user_id,
                                'simulationResults': simulationResults, 
                                date: new Date().toISOString()
                            };
            dispatch(setUser(newUser));
            helper.setLocalStorageWithExpiration('wendogouser', newUser)  
            //}
          }

          // Only update state if component is still mounted
          if (mounted) {
            setEvaluationResults(simulationResults);
            setDisplayValidCourses(simulationResults?.valid_courses?.length > 0);
          }

        } catch (error) {
          console.error('Error initializing data:', error);
          if (mounted) {
            setIsError(true);
          }
        } finally {
          if (mounted) {
            setIsLoading(false);
          }
        }
      };

      initializeData();

      // Cleanup function to prevent memory leaks
      return () => {
        mounted = false;
      };
    }, []); // Empty dependency array for single execution
  
    return {
      user,
      evaluationResults,
      isLoading,
      isError,
      isSessionExpired,
      displayValidCourses,
      setDisplayValidCourses,
      displayMonOrientation,
      setDisplayMonOrientation
    };
};

const SimulationResult = () => {

    const { user, evaluationResults, isLoading, isError,isSessionExpired,  displayValidCourses, setDisplayValidCourses, displayMonOrientation, setDisplayMonOrientation } = useInitialDataLoad();

    const dispatch = useDispatch()
    const [deviceType, setDeviceType] = useState('lg')
    const [browserWidth, setBrowserWidth] = useState(0)
    const [isSpecialDeviceType, setIsSpecialDeviceType] = useState(false)
   
    const [isErrorPage, setIsErrorPage] = useState(false);
    //const [newMajorDetails, setNewMajorDetails] = useState([]) 


    const [invalidSchoolIds, setInvalidSchoolIds] = useState([]);
    const [invalidMajorIds, setInvalidMajorIds] = useState([]);
    const [globalSchoolIds, setGlobalSchoolIds] = useState([]);
    const [globalMajorIds, setGlobalMajorIds] = useState([]);
    
    const [getSchoolDetailsFromSchoolIds] = useGetSchoolDetailsFromSchoolIdsMutation();
    const [getMajorDetailsFromMajorIds] = useGetMajorDetailsFromMajorIdsMutation(); 

    const [schoolDetails, setSchoolDetails] = useState(null || user?.schoolDetails);
    const [majorDetails, setMajorDetails] = useState(null || user?.majorDetails);
    const [finalMajorDetails, setFinalMajorDetails] = useState(majorDetails);

    const [selectedDomainId, setSelectedDomainId] = useState(null);
    const [selectedSubdomainId, setSelectedSubdomainId] = useState(null);
    const [revealChildren, setRevealChildren] = useState(false);

    // Function to render valid or invalid courses
    //console.log('evaluationResults length', evaluationResults?.valid_courses?.length )
    const [coursesToDisplay, setCoursesToDisplay] = useState(displayValidCourses ? evaluationResults?.valid_courses : evaluationResults?.invalid_courses?.flatMap(item => item.courses || []));
    const [finalCoursesToDisplay, setFinalCoursesToDisplay] = useState(coursesToDisplay);
    const [checkSubdomain, setCheckSubdomain] = useState(false);
    const [warningMessage, setWarningMessage] = useState([]);

    const [activeWaitingPage, setActiveWaitingPage] = useState(false);

    const isDataReady = user && evaluationResults;


    const exonerationTypes = [
        {"id": "exo0001", "name": "Totale"},
        {"id": "exo0002", "name": "Partielle"},
        {"id": "exo0003", "name": "Non applicable"}
    ]
    // Helper function to get exoneration name from exoneration_id
    const getExonerationName = (exonerationId) => {
        //console.log('exonerationId', exonerationId)
        const exoneration = exonerationTypes.find(ex => ex.id === exonerationId);
        return exoneration.name;
    };

    const newRefModal = useRef(null)
    const newRefContactModal = useRef(null)
    const [isModalOpened, setIsModalOpened] = useState(false)
    const [openContactModal, setOpenContactModal] = useState(false)
    
    const handleClickOutsideOfModal = (e) => { 
        if (newRefModal.current && !newRefModal.current.contains(e.target)) { 
            setIsModalOpened(false)
        }
    }
    const handleClickOutsideOfContactModal = (e) => {
        if (newRefContactModal.current && !newRefContactModal.current.contains(e.target)) {
            setDisplayEmailButton(true)
            setDisplayWhatsappButton(true)
            setOpenContactModal(false)
        }
    }
    const transformMajorDetails = (oldMajorDetails) => {
        const newMajorDetails = [];

        oldMajorDetails?.forEach((major) => {
          // Check if the domain already exists in the newMajorDetails array
          let domain = newMajorDetails?.find(d => d.domain_id === major.domain_id);
      
          // If the domain does not exist, create a new domain object
          if (!domain) {
            domain = {
              domain_id: major.domain_id,
              domain_name: major.domain_name,
              children: []
            };
            newMajorDetails?.push(domain);
          }
      
          // Check if the subdomain already exists under this domain
          let subdomain = domain.children.find(s => s.subdomain_id === major.subdomain_id);
      
          // If the subdomain does not exist, create a new subdomain object
          if (!subdomain) {
            subdomain = {
              subdomain_id: major.subdomain_id,
              subdomain_name: major.subdomain_name,
              major_ids: []
            };
            domain.children.push(subdomain);
          }
      
          // Add the major_id to the subdomain's major_ids array
          if (!subdomain.major_ids.includes(major.major_id)) {
            subdomain.major_ids.push(major.major_id);
          }
        });
      
        return newMajorDetails;
    };
     // This useEffect handles invalid and valid school/major IDs calculations
     useEffect(() => {
        if (!isDataReady) return;
        helper.addOutsideClick(handleClickOutsideOfModal)
        helper.addOutsideClick(handleClickOutsideOfContactModal)
        // Invalid school and major IDs
        const invalidCourses = _.get(evaluationResults, 'invalid_courses', []);
        //console.log('invalidCourses', evaluationResults)
        const invalidSchoolIdsTemp = new Set(
            _.chain(invalidCourses).map('courses').flatten().map('school_id').filter(Boolean).value()
        );
        const invalidMajorIdsTemp = new Set(
            _.chain(invalidCourses).map('courses').flatten().map('major_id').filter(Boolean).value()
        );

        // Valid school and major IDs
        const validCourses = _.get(evaluationResults, 'valid_courses', []);
        const validSchoolIdsTemp = new Set(
            _.chain(validCourses).map('school_id').filter(Boolean).value()
        );
        const validMajorIdsTemp = new Set(
            _.chain(validCourses).map('major_id').filter(Boolean).value()
        );
        getScoreMessages();
        // Merging invalid and valid IDs into global lists
        setGlobalSchoolIds([...invalidSchoolIdsTemp, ...validSchoolIdsTemp]);
        //console.log('globalSchoolIds', globalSchoolIds, invalidSchoolIdsTemp, validSchoolIdsTemp)
        setGlobalMajorIds([...invalidMajorIdsTemp, ...validMajorIdsTemp]);
        //console.log('globalMajorIds', globalMajorIds, invalidMajorIdsTemp, validMajorIdsTemp)

    }, [isDataReady]); // Only run this effect when evaluationResults change   

    async function fetchSchoolAndMajorDetails() {
        try {
            dispatch(activateSpinner());
            // Only fetch if schoolDetails or majorDetails are not already set
            console.log('schoolDetails jjj ', schoolDetails)
            // console.log of current local time
            console.log('++++++local time+++++++', new Date().toLocaleTimeString())
            let transformedMajorDetails = [];
            let fetchedSchoolDetails = [];
            if (!majorDetails) {
                const fetchedMajorDetails = await getMajorDetailsFromMajorIds({ "major_ids": Array.from(globalMajorIds) }).unwrap();
                transformedMajorDetails = transformMajorDetails(fetchedMajorDetails);
            }

            if (!schoolDetails) {
                fetchedSchoolDetails = await getSchoolDetailsFromSchoolIds({ "school_ids": Array.from(globalSchoolIds) }).unwrap();
            }
            if (transformedMajorDetails?.length>0 && fetchedSchoolDetails.length>0) {
                const user = helper.getLocalStorageWithExpiration('wendogouser')
                const newUser = {...user, 'schoolDetails': fetchedSchoolDetails, 'majorDetails': transformedMajorDetails, date: new Date().toISOString() }
                dispatch(setUser(newUser));
                helper.setLocalStorageWithExpiration('wendogouser', newUser);      
                setSchoolDetails(fetchedSchoolDetails);
                setMajorDetails(transformedMajorDetails);              
            }


            //   console.log('schoolDetails', schoolDetails)
            //     console.log('majorDetails', majorDetails)
            dispatch(deactivateSpinner());
            } catch (error) {
            console.error('Error fetching school and major details:', error);
            dispatch(deactivateSpinner());
            setIsErrorPage(true);
            }
      }

    // Function to render Mon Orientation
    async function renderMonOrientation(isMonOrientation) {
        window.location.hash = isMonOrientation ? "view/MON_ORIENTATION_PERSONNALISEE" : "view/SCORE_DETAILLE"; 
        setDisplayMonOrientation(isMonOrientation);
        if (isMonOrientation && (!schoolDetails || !majorDetails)) { 
            await fetchSchoolAndMajorDetails();
        } 
    } 

    useEffect(() => {
        if (!isDataReady) return;
        if (displayMonOrientation) {
        renderMonOrientation(true);
        }
    }, [displayMonOrientation, isDataReady]);        

    useEffect(() => {
        if (!isDataReady) return;
    
        const handleResize = () => {
            const browserWidth = document.documentElement.clientWidth;
            //console.log('browserWidth', browserWidth)
            if(browserWidth>=1300) {
                setDeviceType('lg+');
                setIsModalOpened(false)
            }
            if (browserWidth>1100 && browserWidth <= 1300) {
                setDeviceType('lg');
                setIsModalOpened(false)
            }
            if (browserWidth>991 && browserWidth <= 1100) {
                setDeviceType('md');
            } 
            if (browserWidth>764 && browserWidth <= 991) {
                setDeviceType('sm');
            } 
            if (browserWidth>480 && browserWidth <= 764) {
                setDeviceType('xs');
            } 
            if(browserWidth <= 670) {
                setIsSpecialDeviceType(true)
            }
            if (browserWidth <= 480) {
                setDeviceType('xss');
            } 
        };
    
        // Call handleResize immediately to set initial device type
        handleResize();
        
        // Then add the event listener for subsequent resizes
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
        
    }, [browserWidth, isDataReady]);


    const convertNoteToPercentage = (note) => {
        return ((note / 5) * 100).toFixed(1);
    }; 


    const toggleCourses = () => {
      setDisplayValidCourses((prevState) => !prevState);
    };

    const getScoreMessages = () => {
        const warnings = [];
         //console.log('user oooo ', user)

        //Example : user?.selectedSchoolYear3.name =2023
        // if user?.selectedSchoolYear3?.name<todayYear-1, push a message to the warning array
        const todayYear = new Date().getFullYear();
        if (user?.selectedSchoolYear3?.name < todayYear -1) {
            warnings.push("Votre dernier niveau d'études est antérieur à "+todayYear+". Pour renforcer votre candidature, il serait utile d'expliquer votre occupation pendant cette période.");
        }
        // Check passport expiration
        if (isPassportExpiringSoon(user)) {
            warnings.push("Votre passeport arrive à expiration dans les 6 prochains mois. Pour éviter tout problème, nous vous conseillons de le renouveler dès maintenant.");
        }
     
        // Check French level requirements 
        if (needsFrenchTest(user)) {
            warnings.push("Il est fortement recommandé de passer un test de français pour valider votre dossier. C'est une étape importante qui permettra de confirmer votre niveau.");
        }
        
        // Check academic gaps
        if (user?.blankYearRepetitionNumber > 0) {
            const yearText = user?.blankYearRepetitionNumber > 1 ? 'années' : 'année';
            warnings.push(`Nous avons remarqué ${user?.blankYearRepetitionNumber} ${yearText} d'interruption dans votre parcours. Pour renforcer votre dossier, nous vous recommandons de joindre une lettre expliquant cette période.`);
        }
     
        // Check failed years
        if (user?.classRepetitionNumber > 0) {
            const yearText = user?.classRepetitionNumber > 1 ? 'redoublements' : 'redoublement';
            warnings.push(`Votre dossier contient ${user?.classRepetitionNumber} ${yearText}. Il est important de justifier ces redoublements pour rassurer les écoles.`);
        }
     
        setWarningMessage(warnings);
     };
     
     // Helper functions for cleaner code
     const isPassportExpiringSoon = (user) => {
        if (!user?.hasPassport) return false;
        
        const today = new Date();
        const sixMonthsFromNow = new Date(today.setMonth(today.getMonth() + 6));
        const passportEndDate = new Date(user?.passportDetails.endDate);
        
        return passportEndDate < sixMonthsFromNow;
     };
     
     const needsFrenchTest = (user) => {
        const hasSufficientFrenchLevel = user?.selectedFrenchLevel === 80;
        console.log('hasSufficientFrenchLevel xxxx ', hasSufficientFrenchLevel)
        const needsTestBasedOnOrigin = (
            (!user?.isFrancophoneCountry && !user?.isFrancophone) ||
            (user?.isFrancophoneCountry && !user?.isFrancophone) ||
            (user?.isFrancophone && !user?.isFrancophoneCountry)
        );
       // console.log('needsTestBasedOnOrigin xxxx ', needsTestBasedOnOrigin, user, user?.isFrancophoneCountry, user?.isFrancophone, user?.selectedFrenchLevel)
        return needsTestBasedOnOrigin || !hasSufficientFrenchLevel;
     }; 

    const renderScoreEvaluation = () => {
        const hasBestConditions = Object.keys(evaluationResults?.best_conditions || {}).length > 0;
        const hasWorstConditions = Object.keys(evaluationResults?.worst_conditions || {}).length > 0;
        const isEligible = hasBestConditions || hasWorstConditions;

        return (
            <div className="score-evaluation">
                {isEligible ? (
                    <>
                        <h1 className="styles__BaseTypo-sc-198xhmk-0 dEWLNu styles__Title-sc-1wzyvpr-10" style={{color: '#0154c0'}}>
                            {convertNoteToPercentage(evaluationResults.visa_evaluation)}%
                        </h1>
                        <p className="styles__BaseTypo-sc-198xhmk-0 styles__Content-sc-1qjc0o4-1 cLBZMY styles__Description-sc-1wzyvpr-2" style={{color: '#0154c0', fontSize: '24px'}}>
                            Votre score
                        </p>
                    </>
                ) : (
                    <h1 className="styles__BaseTypo-sc-198xhmk-0 dEWLNu styles__Title-sc-1wzyvpr-10" style={{color: 'rgb(255, 30, 60)', fontSize: 32}}>
                        Vous êtes inéligible
                    </h1>
                )}
            </div>
        );
    };

    const renderStrengths = () => {
        const conditions = evaluationResults?.best_conditions;
        if (!conditions || Object.keys(conditions).length === 0) return null;

        return (
            <div className="strengths">
                <h2>Quelques de vos points forts</h2>
                <ul>
                    {Object.values(conditions).map(condition => (
                        <li key={condition.id}>{condition.description}</li>
                    ))}
                </ul>
            </div>
        );
    };

    const renderWeaknessesOrIneligibility = () => {
        const hasWeaknesses = Object.keys(evaluationResults?.worst_conditions || {}).length > 0;
        const hasIneligibilityReasons = evaluationResults?.inegible_reasons?.length > 0;
        
        if (!hasWeaknesses && !hasIneligibilityReasons) return null;

        const className = evaluationResults?.inegible_reasons ? "ineligible" : "weaknesses";
        const title = evaluationResults?.worst_conditions 
            ? 'Quelques de vos points faibles'
            : <span style={{color: 'rgb(255, 30, 60)'}}>Raison</span>;

        const items = Object.values(
            evaluationResults?.worst_conditions || evaluationResults?.inegible_reasons || []
        );

        return (
            <div className={className}>
                <h2>{title}</h2>
                <ul>
                    {items.map(item => (
                        <li key={item?.id}>{item?.description || item?.reason}</li>
                    ))}
                </ul>
            </div>
        );
    };

    const renderWarnings = () => {
        if (!warningMessage.length || evaluationResults?.inegible_reasons) return null;

        return (
            <div className="warning">
                <h2>Quelques points de vigilance</h2>
                <ul>
                    {warningMessage.map((message, index) => (
                        <li key={index}>{message}</li>
                    ))}
                </ul>
            </div>
        );
    };

    const FooterScore = () => (
        <div className="Stack-child" style={{paddingTop: 0}}>
            <div className="theme-daisy">
                <footer id="Footer" className="FunnelFooter ProgressBarActive" style={{background: 'none'}}>
                    <div className="FunnelFooter-ctas">
                        <h4>Note Importante sur l'Évaluation Académique</h4>
                        <p>Cette évaluation approfondie est basée sur une analyse détaillée de votre parcours académique, prenant en compte :</p>
                      
                            <p>Vos performances académiques sur les dernières années</p>
                            <p>L'évolution de vos moyennes générales</p>
                            <p>La progression de vos résultats dans le temps</p>
                            <p>La cohérence de votre parcours</p>
                            <p>Vos compétences spécifiques par matière</p>
                            <p>Cette évaluation se base sur les informations extraites des critères d'admission établis par les établissements ainsi que des données publiées dans leurs rapports d'activité 2023.</p>
                            <p>Elles offrent un aperçu pertinent du contexte éducatif à cette période. 
                                Il est important de noter que les données scolaires étant dynamique, 
                                ces chiffres peuvent ne pas refléter la situation actuelle ou en temps réel, mais ils constituent une base solide pour l'analyse des tendances passées.</p>
                            
                        
                        <p>Cette analyse vise à vous orienter vers les formations les plus adaptées à votre profil.</p>
                    </div>
                    <div className="FunnelFooter-content">
                        <p> Wendogo utilise des cookies pour optimiser votre expérience en ligne. En continuant la navigation sur notre site, vous acceptez l'utilisation des cookies. Pour en savoir plus, consultez la{" "} <span className="CTA link  medium      " title="" data-trackingprefix=""> Politique des cookies </span> . </p>
                        <p> Nous prenons soin de vos données personnelles, consultez la{" "} <span className="CTA link  medium      " title="" data-trackingprefix=""> Charte de protection des données personnelles </span> . </p>
                        <p> <span className="CTA link  medium      " title="" data-trackingprefix=""> En savoir plus sur les Conditions Générales d’Utilisation </span>et <span className="CTA link  medium      " title="" data-trackingprefix="">les mentions légales</span> </p>
                        <p style={{height: 200}}></p>
                    </div>
                </footer>
            </div>
        </div>
    );

    let renderScroredetails = () => {
        return (
            <div>
            <div className="styles__Grid-sc-10gqksz-1 iuHviD styles__Grid-sc-1wzyvpr-3"  style={{marginTop: 50}} id="view/SCORE_DETAILLE">
            <div className="styles__Main-sc-1wzyvpr-6 gnYFPc1">
                <div className="styles__BaseTypo-sc-198xhmk-0 djwbck styles__Content-sc-1qjc0o4-1 cLBZMY styles__Description-sc-1wzyvpr-2">
                    <div className="strengths-weaknesses fade-animation">
                        {renderScoreEvaluation()}
                        {renderStrengths()}
                        {renderWeaknessesOrIneligibility()}
                        {renderWarnings()}
                    </div>
                </div>
                <FooterScore />
            </div>
        </div>
        </div>
        );}


    // Function to render valid or invalid courses
    // Reusable CourseCard component
    const CourseCard = useMemo(() => React.memo(({ course, invalid, school, schoolName }) => (
        <div className="Box course-card" style={{ padding: "30px 0px 0px", borderWidth: "initial", borderStyle: "none", borderColor: "initial", cursor: 'pointer' }} key={course.id} onClick={ () => window.open(course.url, '_blank').focus()}>
        <div>
            <div className="OfferLayout">
            <div className="Card" style={invalid ? {backgroundColor: '#fffdfd', boxShadow : '0 4px 8px 0 rgb(224 21 21 / 60%), 0 6px 20px 0 rgb(187 47 47 / 10%)'} : {}}>
                <div className="AutoOfferBottomLayout smallPadding">
                <div className="Stack stackRow" style={{ flexDirection: "row", padding: 0, alignItems: "center" }}>
                    <div className="Stack-child" style={{ paddingLeft: 30 }}>
                    <div className="Rating">
                        <div className="Stack stackRow fullHeight" style={{ flexFlow: "wrap", padding: 0, alignItems: "center", gap: 5 }}>
                        <div className="Stack-child" style={{ paddingLeft: 15 }}>
                            <div className="Tag" style={{ fontWeight: 400, height: "100%", margin: 0, backgroundColor: "#c7f6fc", color: "#006a6f", borderRadius: '5px'}}>
                            <p>Public {/*course.major_id*/}</p>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                    {course.exoneration_id && <div className="Stack-child" style={{ paddingLeft: 30 }}>
                    <div className="Rating">
                        <div className="Stack stackRow fullHeight" style={{ flexFlow: "wrap", padding: 0, alignItems: "center", gap: 5 }}>
                        <div className="Stack-child" style={{ paddingLeft: 15 }}>
                            <div className="Tag" style={{ fontWeight: 400, height: "100%", margin: 0, backgroundColor: "#c7f6fc", color: "#006a6f" , borderRadius: '5px'}}>
                            <p className='exoneration'>Exonération : {getExonerationName(course.exoneration_id)}</p>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>}
                </div>
                </div>
                <div className="Box" style={{ padding: "0px 30px 20px", borderWidth: "initial", borderStyle: "none", borderColor: "initial" }}>
                <div className="Stack stackRow" style={{ flexDirection: "row", padding: 0, alignItems: "stretch" }}>
                    <div className="Stack-child Stack-grow-item" style={{ paddingLeft: 0 }}>
                    <div className="Stack stackRow" style={{ flexDirection: "row", padding: 0, alignItems: "center", justifyContent: "space-between" }}>
                        <div className="Stack-child" style={{ paddingLeft: 15 }}>
                        <div className="Stack stackColumn" style={{ flexDirection: "column", padding: 0, alignItems: "stretch" }}>
                            <div className="Stack-child" style={{ paddingTop: 30 }}>
                            <div className="Logo border small" style={{ width: 150, height: 150, padding:  7 }}>
                            <div style={{ position: 'relative', width: '100%', height: '300px' }}>
  <Image 
    fill
    style={{ objectFit: 'contain' }}
    src={`${process.env.NEXT_PUBLIC_PUBLIC_URL || ''}/school_logos/${school?.logo_path || school?.university?.logo_path || 'default-logo.jpeg'}`}
    alt={schoolName}
  />
</div>                            </div> 
                            </div>
                        </div>
                        </div>
                        <div className="Stack-child Stack-grow-item" style={{ paddingLeft: 15 }}>
                        <div className="Box" style={{ padding: 0, borderWidth: "initial", borderStyle: "none", borderColor: "initial" }}>
                            <p className='course-title'><b>{course.title}</b></p>
                            <p className='course-school'>{schoolName}</p>
                            <p className='course-location'><LocationIcon/>{` ${school?.base_city}`}</p>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
                <div className="AutoOfferBottomLayout smallPadding">
                <div className="Stack stackRow" style={{ flexDirection: "row", padding: 0, alignItems: "center" }}>
                    {course.number_of_students > 0 && (
                    <div className="Stack-child student-number" style={{ paddingLeft: 30 }}>
                        <div className="Rating">
                        <div className="Stack stackRow fullHeight" style={{ flexFlow: "wrap", padding: 0, alignItems: "center", gap: 5 }}>
                            <div className="Stack-child" style={{ paddingLeft: 15 }}>
                            <div className="Tag" style={{ fontWeight: 400, height: "100%", margin: 0 , borderRadius: '5px'}}>
                                <p>Nombre d'étudiants : <strong>{course.number_of_students}</strong></p>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    )}
                    {course.access_rate > 0 && (
                    <div className="Stack-child access-rate" style={{ paddingLeft: 30 }}>
                        <div className="Rating">
                        <div className="Stack stackRow fullHeight" style={{ flexFlow: "wrap", padding: 0, alignItems: "center", gap: 5 }}>
                            <div className="Stack-child" style={{ paddingLeft: 15 }}>
                            <div className="Tag" style={{ fontWeight: 400, height: "100%", margin: 0 , borderRadius: '5px'}}>
                                <p>Taux d'accès : <strong>{course.access_rate}%</strong></p>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    )}
                    {course.professional_integration_rate > 0 && (
                    <div className="Stack-child integration-rate" style={{ paddingLeft: 30 }}>
                        <div className="Rating">
                        <div className="Stack stackRow fullHeight" style={{ flexFlow: "wrap", padding: 0, alignItems: "center", gap: 5 }}>
                            <div className="Stack-child" style={{ paddingLeft: 15 }}>
                            <div className="Tag" style={{ fontWeight: 400, height: "100%", margin: 0 , borderRadius: '5px'}}>
                                <p>Taux d'emploi : <strong>{course.professional_integration_rate}%</strong></p>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    )}
                    {course.annual_tuition > 0 && (
                    <div className="Stack-child tuition" style={{ paddingLeft: 30 }}>
                        <div className="Rating">
                        <div className="Stack stackRow fullHeight" style={{ flexFlow: "wrap", padding: 0, alignItems: "center", gap: 5 }}>
                            <div className="Stack-child" style={{ paddingLeft: 15 }}>
                            <div className="Tag" style={{ fontWeight: 400, height: "100%", margin: 0 , borderRadius: '5px'}}>
                                <p>Frais de scolarité : <strong>{course.annual_tuition}€</strong></p>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    )}
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    )), []);

    const getSchoolName = (school) => {
        let finalSchoolName = '';
        let finalUniversityName = '';
    
        // List of keywords to check
        const excludedPrefixes = [
            "Unité de formation", "PIKTURA", "IUT", "ISAE", "Institute", 
            "Institut", "DECCID", "Departement", "Ecole", "ENS", 
            "Groupement", "IAE"
        ];
    
        // Helper function to check if string starts with vowel or 'h'
        const startsWithVowelOrH = (str) => {
            return /^[aeiouàáâäãéèêëíìîïóòôöõúùûühaeiouAEIOUÀÁÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜH]/i.test(str);
        };
    
        // Helper function to check if first word ends with 's'
        const firstWordEndsWithS = (str) => {
            const firstWord = str.split(' ')[0];
            return firstWord.endsWith('s');
        };
    
        // Process school name
        if (school?.name && school?.name.trim() !== '') {
            // Check if name starts with any excluded prefix
            const startsWithExcludedPrefix = excludedPrefixes.some(prefix => 
                school?.name.toUpperCase().startsWith(prefix.toUpperCase())
            );
    
            if (!startsWithExcludedPrefix) {
                if (startsWithVowelOrH(school?.name)) {
                    finalSchoolName = firstWordEndsWithS(school?.name) 
                        ? `Faculté des ${school?.name}`
                        : `Faculté d'${school?.name}`;
                } else {
                    finalSchoolName = firstWordEndsWithS(school?.name)
                        ? `Faculté des ${school?.name}`
                        : `Faculté de ${school?.name}`;
                }
            } else {
                finalSchoolName = school?.name;
            }
        }
    
        // Process university name
        if (school?.university?.name?.trim()) {
            const universityName = school?.university.name.trim().toUpperCase();
            
            if (universityName.startsWith('CY')) {
                finalUniversityName = school?.university.name;
            } else if (universityName.startsWith('POLYTÉCHNIQUE')) {
                finalUniversityName = school?.university.name;
            } else if (universityName.startsWith('H')) {
                finalUniversityName = `Université du ${school?.university.name}`;
            } else {
                finalUniversityName = startsWithVowelOrH(school?.university.name)
                    ? `Université d'${school?.university.name}`
                    : `Université de ${school?.university.name}`;
            }
        }
        
    
        // Combine the names
        if (finalSchoolName && finalUniversityName) {
            return `${finalSchoolName} - ${finalUniversityName}`;
        } else if (finalSchoolName) {
            return finalSchoolName;
        } else if (finalUniversityName) {
            return finalUniversityName;
        }
        return '';
    }


    // Memoize the courses render function
    const renderCourses = useMemo(() => {
        
        if (!finalCoursesToDisplay || finalCoursesToDisplay.length === 0) {
            
            return (
              <p style={{width: 340}}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 200"> 
                    <circle cx={120} cy={100} r={70} fill="#f5f5f5" />  
                    <g stroke="#333" fill="none" strokeWidth={2}> 
                        <path d="M80 110 L160 110 L160 95 L80 95 Z" />
                        <path d="M80 95 C100 92, 140 92, 160 95" strokeWidth={1} />  
                        <path d="M85 95 L165 95 L165 80 L85 80 Z" />
                        <path d="M85 80 C105 77, 145 77, 165 80" strokeWidth={1} /> 
                        <path d="M75 80 L155 80 L155 65 L75 65 Z" />
                        <path d="M75 65 C95 62, 135 62, 155 65" strokeWidth={1} /> </g> 
                    <circle cx={140} cy={100} r={25} stroke="#333" fill="none" strokeWidth={2} />  
                    <line x1={158} y1={118} x2={170} y2={130} stroke="#333" strokeWidth={3} strokeLinecap="round" />  
                    <line x1={125} y1={85} x2={155} y2={115} stroke="#333" strokeWidth={2} /> {/* Text */}
                    <text x={120} y={160} textAnchor="middle" fontFamily="Arial" fontSize={14} fill="#333"> Aucune formation trouvée </text>
                </svg>
            </p>
            );
        }

        if (displayValidCourses) {
            return finalCoursesToDisplay.map(item => {
                const school = schoolDetails?.find(school => school?.id === item.school_id);
                return <CourseCard 
                                    key={item.id} 
                                    course={item} 
                                    invalid={false} 
                                    school={school} 
                                    schoolName={getSchoolName(school)} 
                                />;
            });
        } else {
            // For invalid courses, we need to group them by reason
            const coursesByReason = {};
            evaluationResults.invalid_courses.forEach(group => {
                coursesByReason[group.reason] = finalCoursesToDisplay.filter(course => 
                    group.courses.some(gc => gc.id === course.id)
                );
            });
    
            return Object.entries(coursesByReason).map(([reason, courses]) => (
                <div key={reason}>
                    {courses.length>0 && <h4 className="invalid-reason">Raison : {reason}</h4>}
                    {courses.map(course => {
                        const school = schoolDetails?.find(school => school?.id === course.school_id);
                        return <CourseCard 
                            key={course.id} 
                            course={course} 
                            invalid={true} 
                            school={school} 
                            schoolName={getSchoolName(school)}
                        />;
                    })}
                </div>
            ));
        }
    }, [finalCoursesToDisplay, displayValidCourses, schoolDetails]);
 
    // Reset expanded domains when switching valid/invalid courses
    useEffect(() => {
        if (!isDataReady) return;
        setExpandedDomainsMap(new Map());
    }, [displayValidCourses, isDataReady]);

    const [expandedDomains, setExpandedDomains] = useState(new Set());
    const [expandedDomainsMap, setExpandedDomainsMap] = useState(new Map());


    // Optimize the domain click handler
    const clickToDisplaySubdomains = useCallback((domain_id) => {
        setExpandedDomainsMap(prevMap => {
            const newMap = new Map(prevMap);
            newMap.set(domain_id, !newMap.get(domain_id));
            return newMap;
        });
    }, []);
    
    const [checkedSubdomains, setCheckedSubdomains] = useState(new Set());
    const [displayWhatsappButton, setDisplayWhatsappButton] = useState(true);    
    const [displayEmailButton, setDisplayEmailButton] = useState(true);

    // Optimize the subdomain click handler
    const clickToDisplayCoursesFromMajor = useCallback((major_ids, subdomain_id) => {
        const newCheckedSubdomains = new Set(checkedSubdomains);
        if (checkedSubdomains.has(subdomain_id)) {
            newCheckedSubdomains.delete(subdomain_id);
        } else {
            newCheckedSubdomains.add(subdomain_id);
        }
        setCheckedSubdomains(newCheckedSubdomains);

        const baseCourses = displayValidCourses 
            ? evaluationResults?.valid_courses 
            : evaluationResults?.invalid_courses?.flatMap(item => item.courses || []);

        if (newCheckedSubdomains.size === 0) {
            setFinalCoursesToDisplay(baseCourses);
        } else {
            const checkedMajorIds = new Set();
            majorDetails?.forEach(domain => {
                domain.children.forEach(subdomain => {
                    if (newCheckedSubdomains.has(subdomain.subdomain_id)) {
                        subdomain.major_ids.forEach(id => checkedMajorIds.add(id));
                    }
                });
            });

            const filteredCourses = baseCourses.filter(course => 
                checkedMajorIds.has(course.major_id)
            );
            setFinalCoursesToDisplay(filteredCourses);
        }
    }, [checkedSubdomains, displayValidCourses, majorDetails]);   
    

    const filterMajorDetails = (majorDetails, myMajorIds) => {
        return majorDetails?.map(domain => {
          // Filter children based on whether their major_ids intersect with myMajorIds
          const filteredChildren = domain.children.map(subdomain => {
            const filteredMajorIds = subdomain.major_ids.filter(majorId => myMajorIds.includes(majorId));
      
            // Return subdomain only if it has matching major_ids
            if (filteredMajorIds.length > 0) {
              return {
                ...subdomain,
                major_ids: filteredMajorIds
              };
            }
            return null; // Return null to remove subdomains with no matching major_ids
          }).filter(Boolean); // Remove null values
      
          // Return the domain only if it has filtered children
          if (filteredChildren.length > 0) {
            return {
              ...domain,
              children: filteredChildren
            };
          }
          return null; // Return null to remove domains with no matching children
        }).filter(Boolean); // Remove null values
      };
    useEffect(() => {
        if (!isDataReady) return;
        const newCourses = displayValidCourses 
            ? evaluationResults?.valid_courses 
            : evaluationResults?.invalid_courses?.flatMap(item => item.courses || []);
        setCoursesToDisplay(newCourses);
        setFinalCoursesToDisplay(newCourses); // Reset filtered courses too
        setCheckedSubdomains(new Set()); // Reset checkboxes
    }, [displayValidCourses, isDataReady]);
    
    // Memoize the domain filtering render function
    const renderDomainFiltering = useCallback((myCourses) => {

        // Retrieve all majordIds in finalCoursesToDisplay and put the in majorIds as set
        let majorIds = new Set();
        myCourses?.forEach(course => { majorIds.add(course.major_id)});
        majorIds = Array.from(majorIds);
        //console.log('coursesToDisplay xxx', majorIds)
        //setFinalMajorDetails(filterMajorDetails(majorDetails, majorIds));

        let filteredMajorDetails = filterMajorDetails(majorDetails, majorIds);
        //console.log('filteredMajorDetails xxx', filteredMajorDetails)

        filteredMajorDetails = filteredMajorDetails?.sort((a, b) => a.domain_name.localeCompare(b.domain_name));
        return (filteredMajorDetails && filteredMajorDetails?.map((domain) => (
          <div className="Stack-child" style={{ paddingTop: 15, cursor: 'pointer' }} key={domain.domain_id} >
            <div className="Accordion">
              <div className="Stack pushLastItem stackRow " style={{ flexDirection: "row", padding: 0, alignItems: "center" }} onClick={() => clickToDisplaySubdomains(domain.domain_id)}>
                <div className="Stack-child" style={{ paddingLeft: 0 }}>
                  <div className="Stack  stackRow " style={{ flexDirection: "row", padding: 0, alignItems: "stretch" }}>
                    <div className="Stack-child" style={{ paddingLeft: 0 }}>
                      <div className="Checkbox FilterCheckbox after  no-margin" data-testid="filter-checkbox-assistance_accident">
                        <span htmlFor={domain.domain_name} className=""><b> {domain.domain_name} </b></span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="Stack-child" style={{ paddingLeft: 0 }}> 
                  <div className="icon-wrapper" style={{ color: "rgb(172, 186, 200)", marginBottom:10, transform: `scale(${expandedDomainsMap.get(domain.domain_id) ? -1 : 1})` }}>
                    <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" width="30px" height="30px">
                      <path d="M27.785 15.75l-.562-.53a.829.829 0 00-1.123 0l-6.592 6.226-6.59-6.226a.823.823 0 00-1.124 0l-.561.53a.721.721 0 000 1.061l7.714 7.286c.149.141.35.22.561.22a.82.82 0 00.563-.22l7.714-7.286a.73.73 0 00.233-.531.73.73 0 00-.233-.53" fillRule="evenodd" /> 
                    </svg>
                  </div>
                </div>
              </div>
            {/* Display children (subdomains) if the selected domain matches */}  
                {expandedDomainsMap.get(domain.domain_id) && domain.children.map((subdomain) => (
                    //  <> {subdomain.major_ids.join(', ')}
                    <FormGroup 
                        style={{ marginLeft: 10 }} 
                        key={subdomain.subdomain_id}
                        onClick={(e) => e.stopPropagation()} >
                        <FormControlLabel
                            control={
                                <Checkbox 
                                    checked={checkedSubdomains.has(subdomain.subdomain_id)}
                                    onChange={() => clickToDisplayCoursesFromMajor(subdomain.major_ids, subdomain.subdomain_id)}
                                />
                            }
                            label={subdomain.subdomain_name} />
                    </FormGroup> 
                ))}
            </div>
          </div>
        )));
        }, [majorDetails, expandedDomainsMap, checkedSubdomains, clickToDisplaySubdomains, clickToDisplayCoursesFromMajor]);

    if (isLoading) {
        return <>
                <HeaderMenuBarOnlyWithLogo 
                    isMobile={['xss'].includes(deviceType)} 
                    displayButton={false}/>
                <SimulationResultWaiting /></>; }    
    if (isSessionExpired) {
        return             <>
        <HeaderMenuBarOnlyWithLogo 
            isMobile={['xss'].includes(deviceType)} 
            displayButton={false}
        />
        <SessionExpiredAlert />
        <Footer />
        </>
    }
    if (isError || isErrorPage) {
        return (
            <>
            <HeaderMenuBarOnlyWithLogo 
                isMobile={['xss'].includes(deviceType)} 
                displayButton={false}
            />
            <main className="styles__Main-sc-kz84w6-0 gEFmYD" style={{ paddingTop: 280 }}>
                    <div className="styles__Wrapper-sc-gk465i-0 fiWVzr">
                        <div className="styles__Hero-sc-s3dlnp-0 gMynSv">
                            <div className="styles__Title-sc-s3dlnp-2 eWHDTF">
                                <h1 size="large" className="styles__HeadingBridge-sc-6txi54-0 hzNvHf">
                                    Désolé, une erreur s'est produite. Veuillez réessayer plus tard ou nous contacter.
                                </h1>
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '10px' }}>
                                    <button
                                        onClick={() => window.location.reload()}
                                        style={{ width: '15.3%', height: 20, margin: '10px' }}
                                        className="CTA button primary xlarge userValidation"
                                        title=""
                                        data-trackingprefix=""
                                        data-testid="DaisyFieldView-continuer-VEH_DTL_POSSESSION"
                                    >
                                        Recharger
                                    </button>
                                    <button
                                        onClick={() => window.location.href = 'mailto:hello@wendogo.com'}
                                        style={{ width: '21.7%', height: 20, margin: '10px' }}
                                        className="CTA button primary xlarge userValidation"
                                        title=""
                                        data-trackingprefix=""
                                        data-testid="DaisyFieldView-continuer-VEH_DTL_POSSESSION"
                                    >
                                        Nous contacter
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
            </main>
            <Footer />
            </>
        );
    }   
    const onClose = () => {
        console.log('close')
    }
    if(isDataReady) {

        return (
            <>
                <HeaderMenuBarOnlyWithLogo isMobile={['xss'].includes(deviceType)} displayButton={true}/> 
                
                <ContactModal  isOpen={openContactModal}  setDisplayEmailButton={setDisplayEmailButton} setDisplayWhatsappButton={setDisplayWhatsappButton} 
                                displayEmailButton={displayEmailButton} displayWhatsappButton={displayWhatsappButton} setIsErrorPage={setIsErrorPage}
                                                    setOpenContactModal={setOpenContactModal} newRefContactModal={newRefContactModal}/>
                <div className="styles__Main-sc-kz84w6-0 gEFmYD" style={{paddingTop: 80}}>
                    <div className="widget-container widget-funnel-auto">
                        <div className="theme-wrapper theme-daisy">
                            <div className="funnel AutoTunnel">
                                <div className="app-container">
                                    <div className="app-lg">
                                        <div className="styles__Hero-sc-s3dlnp-0 gMynSv" style={{ top: '80px', display: 'flex', flexDirection: 'row', marginLeft: 'auto', marginRight: 'auto', }}>
                                            
                                            <div className="styles__Title-sc-s3dlnp-2 iUyMl">
                                                <h1 size="large" className="styles__HeadingBridge-sc-6txi54-0 hzNvHf" style={{color: 'rgb(42, 55, 117)' }}>Compte rendu de la simulation</h1>
                                                <nav className="styles__Grid-sc-10gqksz-1 iuHviD1 styles__Nav-sc-b6pzbt-9">
                                                    <div className="styles__Container-sc-b6pzbt-0 gnYFPc">
                                                        <ul className="styles__List-sc-b6pzbt-1 Nbkao">
                                                            <li className={ "styles__BaseTypo-sc-198xhmk-0 styles__ListItem-sc-b6pzbt-2 "+(displayMonOrientation ? 'bQzhkc1' : ' fdQKqN1')}>
                                                                <button aria-current="page" className="styles__ListItemLink-sc-b6pzbt-8 jmsNjc" onClick={()=> renderMonOrientation(false)} style={{ cursor: 'pointer' }}>
                                                                    <p size="large" className="styles__HeadingBridge-sc-6txi54-0 hzNvHf" style={{color: displayMonOrientation ? 'rgb(98, 122, 147)' : 'rgb(42, 55, 117)', fontSize: '20px', letterSpacing: '0', marginTop: '20px' }}>Score détaillé </p>
                                                                </button>
                                                            </li>
                                                            <li className={ "styles__BaseTypo-sc-198xhmk-0 styles__ListItem-sc-b6pzbt-2 "+(displayMonOrientation ? 'fdQKqN1' : ' bQzhkc1')}>
                                                                <button className="styles__ListItemLink-sc-b6pzbt-8 jmsNjc" onClick={()=> renderMonOrientation(true)} style={{ cursor: 'pointer' }}>
                                                                    <p size="large" className="styles__HeadingBridge-sc-6txi54-0 hzNvHf" style={{color: displayMonOrientation ? 'rgb(42, 55, 117)' : 'rgb(98, 122, 147)',fontSize: '20px', letterSpacing: '0', marginTop: '20px' }}> Mon orientation personnalisée </p>
                                                                </button>
                                                            </li>
                                                        </ul>
                                                        <button disabled="" className="styles__ListItemButton-sc-b6pzbt-3 styles__ListItemButtonRight-sc-b6pzbt-6 bnJCXg cqfNya"> <span className="styles__ListItemButtonMask-sc-b6pzbt-4 hatcES">
                                                                <svg height={16} viewBox="0 0 16 16" width={16}
                                                                    xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="styles__ListItemButtonChevron-sc-b6pzbt-7 zUUMP">
                                                                    <path d="M6.3,2.5,5,3.8,9.28,8,5,12.2l1.3,1.3L11.88,8Z" />
                                                                </svg>
                                                                <svg height={16} viewBox="0 0 16 16" width={16}
                                                                    xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="styles__ListItemButtonChevron-sc-b6pzbt-7 zUUMP">
                                                                    <path d="M6.3,2.5,5,3.8,9.28,8,5,12.2l1.3,1.3L11.88,8Z" />
                                                                </svg>
                                                            </span> </button>
                                                    </div>
                                                </nav>
                                            </div>
                                        </div>
                                        <div> {!['lg+','lg','md' ].includes(deviceType) && displayMonOrientation &&
                                            <>
                                                <div className="Pps " style={{padding : '0 10%'}} id="view/MON_ORIENTATION_PERSONNALISEE">
                                                    <div className={ "Result"+([ 'lg+','lg','md'].includes(deviceType) ? 'Desktop' : 'Mobile')+ "-offersBlock"} style={{marginTop: 70}}>
                                                        <div className="Stack pushLastItem stackColumn " style={{ flexDirection: "column", padding: 0, alignItems: "stretch" }}>
                                                            <div className="Stack-child" style={{ paddingTop: 0 }}>
                                                                <div className="FadeInOrderedAnimation" data-testid="AutoOffersList">
                                                                    <div className="Box   " style={{ padding: "30px 0px 0px", borderWidth: "initial", borderStyle: "none", borderColor: "initial" }}>
                                                                        <div>
                                                                            <div className="OfferLayout">
                                                                                <div className="Card   " style={{paddingTop:0}}>
                                                                                    <div className="Box   " style={{display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100px' }}>
                                                                                        <div data-testid="AutoGarantiesOptionnelles">
                                                                                            <div className="Stack  stackColumn " style={{ flexDirection: "column", padding: 0, alignItems: "stretch" }}>
                                                                                                <div className="Stack-child" style={{ paddingTop: 15 }}>
                                                                                                    <div className="Stack  stackColumn " style={{ flexDirection: "column", padding: 0, alignItems: "stretch" }}>
                                                                                                        <div className="Stack-child" style={{ paddingTop: 20, }}>
                                                                                                            <button type="button" className="PpsButton colored color-3 small hasBeforeIcon" onClick={() => setIsModalOpened(true)}>
                                                                                                                <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                                                                                                                    <path d="M14.5 25.907c1.382 0 2.576.811 3.145 1.99H30.74c.696 0 1.26.668 1.26 1.492 0 .765-.486 1.396-1.113 1.482l-.147.01H17.705A3.5 3.5 0 0114.5 33a3.5 3.5 0 01-3.205-2.118H9.26c-.696 0-1.26-.669-1.26-1.493 0-.765.486-1.396 1.113-1.482l.147-.01h2.095a3.497 3.497 0 013.145-1.99zm11-8.953c1.396 0 2.601.813 3.163 1.989h2.077c.696 0 1.26.668 1.26 1.493 0 .765-.486 1.396-1.113 1.482l-.147.01h-2.077a3.502 3.502 0 01-3.163 1.99 3.502 3.502 0 01-3.163-1.99H9.26c-.696 0-1.26-.668-1.26-1.492 0-.766.486-1.397 1.113-1.483l.147-.01h13.077a3.502 3.502 0 013.163-1.99zM15.5 8c1.396 0 2.601.813 3.163 1.99H30.74c.696 0 1.26.668 1.26 1.492 0 .765-.486 1.396-1.113 1.482l-.147.01H18.663a3.502 3.502 0 01-3.163 1.99 3.502 3.502 0 01-3.163-1.99H9.26c-.696 0-1.26-.668-1.26-1.492 0-.765.486-1.396 1.113-1.482l.147-.01h3.077A3.502 3.502 0 0115.5 8z" fillRule="evenodd" /> </svg> {['xss'].includes(deviceType) ?
                                                                                                                <div className="PpsButton-children ">FILTRER</div> :
                                                                                                                <div className="PpsButton-children " style={{fontWeight: 900}}>FILTRER PAR DOMAINE</div>} </button>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {isModalOpened && <div className="ModalCore fade-animation fade-fast-enter-done" style={{ zIndex: 131 }}>
                                                    <div className="ModalCore-content " style={{ transition: "transform 300ms ease-in-out", transform: "scale(1, 1)" }}>
                                                        <div className="ProgressBarMobile-popin">
                                                            <div className="Card   ProgressBarMobile-popin-card" ref={newRefModal}>
                                                                <div className="ProgressBarMobile-popin-right">
                                                                    <svg viewBox="0 0 34 34" xmlns="http://www.w3.org/2000/svg" width={30} className="ProgressBarMobile-popin-close" onClick={()=> setIsModalOpened(false)}>
                                                                        <path d="M17 0c9.389 0 17 7.611 17 17s-7.611 17-17 17S0 26.389 0 17 7.611 0 17 0zm0 1C8.163 1 1 8.163 1 17s7.163 16 16 16 16-7.163 16-16S25.837 1 17 1zm5.588 10.415c.47.47.545 1.194.19 1.764l-.083.12-.107.12-3.584 3.584 3.584 3.584c.436.436.532 1.091.26 1.64l-.07.124-.083.12-.107.12c-.47.47-1.194.545-1.764.19l-.12-.083-.12-.107L17 19.007l-3.584 3.584a1.414 1.414 0 01-1.64.26l-.124-.07-.12-.083-.12-.107a1.419 1.419 0 01-.19-1.764l.083-.12.107-.12 3.584-3.584-3.584-3.584a1.414 1.414 0 01-.26-1.64l.07-.124.083-.12.107-.12a1.419 1.419 0 011.764-.19l.12.083.12.107L17 15l3.584-3.584a1.417 1.417 0 012.004 0z" fill="#7F94A9" fillRule="nonzero" /> 
                                                                    </svg>
                                                                </div>
                                                                <div className="Stack-child" style={{ paddingTop: 15 }}>
                                                                    <div>
                                                                        <div className=" SchoolFilters AutoSchoolFilters" data-testid="AutoSchoolFilters" style={{marginTop:0, position: 'inherit', border:'none', boxShadow: 'none', width: ['xs', 'xss' ].includes(deviceType) ? 'inherit' : 340 }}>
                                                                            <div data-testid="AutoGarantiesOptionnelles">
                                                                                <div className="Stack  stackColumn " style={{ flexDirection: "column", padding: 0, alignItems: "stretch" }}> 
                                                                                    <div className="Stack-child" style={{ paddingTop: 15 }}>
                                                                                        <div className="Stack  stackColumn " style={{ flexDirection: "column", padding: 0, alignItems: "stretch" }}> 
                                                                                            {renderDomainFiltering(  displayValidCourses ? evaluationResults?.valid_courses : evaluationResults?.invalid_courses?.flatMap(item => item.courses || []))}
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>}
                                            </>
                                            } {/* === Desktop */} {displayMonOrientation ?
                                            <div className="Pps ResultDesktop" id="view/MON_ORIENTATION_PERSONNALISEE"> {['lg+','lg','md' ].includes(deviceType) &&
                                                <div>
                                                    <div className=" SchoolFilters AutoSchoolFilters" data-testid="AutoSchoolFilters">
                                                        <div data-testid="AutoGarantiesOptionnelles">
                                                            <div className="Stack  stackColumn " style={{ flexDirection: "column", padding: 0, alignItems: "stretch" }}>
                                                                <div className="Stack-child" style={{ paddingTop: 15 }}>
                                                                    <div className="Box   " style={{ padding: "10px 0px 0px", borderWidth: "initial", borderStyle: "none", borderColor: "initial" }}>
                                                                        <div className="Title " style={{ color: "rgb(42, 55, 117)", textAlign: "left", fontSize: "1rem", fontWeight: 500, lineHeight: "inherit", fontWeight: 900 }}> FILTRER PAR DOMAINE</div>
                                                                    </div>
                                                                </div>
                                                                <div className="Stack-child" style={{ paddingTop: 15 }}>
                                                                    <div className="Stack  stackColumn " style={{ flexDirection: "column", padding: 0, alignItems: "stretch" }}> 
                                                                        {renderDomainFiltering(  displayValidCourses ? evaluationResults?.valid_courses : evaluationResults?.invalid_courses?.flatMap(item => item.courses || []))}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>}
                                                <div className={ "Result"+([ 'lg+','lg','md'].includes(deviceType) ? 'Desktop' : 'Mobile')+ "-offersBlock"} style={{marginTop: [ 'lg+','lg','md'].includes(deviceType) ? 70 : 0}}>
                                                    <div className="Stack pushLastItem stackColumn " style={{ flexDirection: "column", padding: 0, alignItems: "stretch" }}>
                                                        <div className="Stack-child" style={{ paddingTop: 0 }}>
                                                            <div className="RevampedPpsHeader">
                                                                <div className="RevampedIntroduction">
                                                                    <div className="Box   " style={{ padding: "25px 0px 0px", borderWidth: "initial", borderStyle: "none", borderColor: "initial" }}>
                                                                        <div className="Stack pushLastItem stackRow " style={{ flexDirection: "row", padding: 0, alignItems: "flex-start" }}>
                                                                            <div className="Stack-child" style={{ paddingLeft: 0 }}>
                                                                                <div className="course-switch-wrapper">
                                                                                    <div className="course-switch-container">
                                                                                        <div className="course-switch"> <span className={`status-text ${displayValidCourses ? 'valid' : 'invalid'}`} style={{fontWeight: 900, fontSize: '20px'}}>
                                                                                                            {displayValidCourses ? 'Formations favorisées par vos points forts' : 'Formations impactées par vos points faibles'}
                                                                                                            </span>
                                                                                            <button onClick={toggleCourses} className={`switch ${displayValidCourses ? 'switch-on' : 'switch-off'}`}> <span className={`switch-circle ${displayValidCourses ? 'circle-on' : 'circle-off'}`} /> </button>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="Title " style={{ color: "rgb(42, 55, 117)", textAlign: "left", fontSize: "1.25rem", fontWeight: 500, lineHeight: "inherit" }}> <p>{user?.firstname}, 
                                                                                            en lien avec votre {`“${user?.degreeExactNameValue}”`}, nous avons identifié ces formations qui correspondent à votre parcours.</p>
                                                                                                        <p className="fade-animation">{displayValidCourses ? ' Voici une sélection adaptée à vos points forts.' : ' Voici celles qui pourraient être impactées par vos points faibles.'} </p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="Box   " style={{ padding: "0", borderWidth: "initial", borderStyle: "none", borderColor: "initial" }}>
                                                                    <div className="LegalStatement"> Liste non exhaustive et sans référencement sponsorisé. </div>
                                                                    <div className="LegalStatement">(Seules les formations de niveau Licence, Master et Ingénierie ont été considérées.)</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                        <div className="Stack-child  " style={{ paddingTop: 0 }}>
                                            <div className="FadeInOrderedAnimation" data-testid="AutoOffersList"> 
                                            {renderCourses}
                                            </div>
                                        </div>
                                                    </div>
                                                    <div className="Stack-child courses" style={{ paddingTop: 0 }}>
                                                        <div className="Box   " style={{ padding: "10px 0px 0px", borderWidth: "initial", borderStyle: "none", borderColor: "initial" }}>
                                                            <div className="Stack  stackColumn " style={{ flexDirection: "column", padding: 0, alignItems: "stretch" }}>
                                                                <div className="Stack-child" style={{ paddingTop: 10 }}>
                                                                    <p style={{ color: "rgb(127, 148, 169)", fontSize: "1rem", margin: "0px 0px 5px", padding: 0, textAlign: "left", fontWeight: 400, lineHeight: "inherit" }}> Les données affichées ici sont issues d'une étude InserSup de 2021 pour le taux d'emploi et des rapports annuels publiés par les établissements en 2023. Elles offrent un aperçu pertinent du contexte éducatif à cette période. Il est important de noter que les données scolaires étant dynamique, ces chiffres peuvent ne pas refléter la situation actuelle ou en temps réel, mais ils constituent une base solide pour l'analyse des tendances passées. </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="Stack-child" style={{ paddingTop: 0 }} />
                                                    <div className="Stack-child" style={{ paddingTop: 0 }}>
                                                        <div className="theme-daisy">
                                                            <footer id="Footer" className="FunnelFooter ProgressBarActive">
                                                                <div className="FunnelFooter-ctas"></div>
                                                                <div className="FunnelFooter-content">
                                                                    <p> Wendogo utilise des cookies pour optimiser votre expérience en ligne. En continuant la navigation sur notre site, vous acceptez l'utilisation des cookies. Pour en savoir plus, consultez la{" "} <span className="CTA link  medium      " title="" data-trackingprefix=""> Politique des cookies </span> . </p>
                                                                    <p> Nous prenons soin de vos données personnelles, consultez la{" "} <span className="CTA link  medium      " title="" data-trackingprefix=""> Charte de protection des données personnelles </span> . </p>
                                                                    <p> <span className="CTA link  medium      " title="" data-trackingprefix=""> En savoir plus sur les Conditions Générales d’Utilisation </span>et <span className="CTA link  medium      " title="" data-trackingprefix="">les mentions légales</span> </p>
                                                                    <p style={{height: 200}}></p>
                                                                </div>
                                                            </footer>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div> :renderScroredetails()} 
                                            <ServicePricingCard deviceType={deviceType} setOpenContactModal={setOpenContactModal} openContactModal={openContactModal} isSpecialDeviceType={isSpecialDeviceType}/> 
                                            </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
};

export default SimulationResult;
