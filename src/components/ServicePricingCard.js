'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import SvgConstant from '../utils/SvgConstant';
 
const ServiceSection = ({ title, svg, items }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="border-b border-gray-200 fade-in" >
      <button onClick={() => setIsOpen(!isOpen)} className="w-full flex items-center justify-between " style={{paddingTop: '1rem', transition: 'all 0.4s ease'}}>
        <h3 className="text-lg font-semibold text-[#2a3775]" style={{ alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>{svg} <span style={{ marginLeft: '10px' }}>{title}</span></div>
          </h3>
        {isOpen ? <ChevronUp className="w-4 h-4" style={{color: 'rgb(42, 55, 117)'}}/> : <ChevronDown className="w-4 h-4" style={{color: 'rgb(42, 55, 117)'}}/>}
      </button>
      {isOpen && (
        <div className="p-4 fade-in">
          {items.map((item, index) => (
            <div key={index} className="mb-3 service-item">
              <h4 className="font-medium text-[#2a3775]" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>{item?.svg} {item.title}</h4>
              <p className="text-sm text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const ServicePricingCard = ({deviceType, setOpenContactModal, openContactModal, isSpecialDeviceType, outSideOfResult=false }) => {
  
  
    const [isExpanded, setIsExpanded] = useState(false);

    const handleContactClick = () => {
      if (outSideOfResult) {
        // Pre-built message for WhatsApp
        const message = encodeURIComponent("Bonjour, je souhaite avoir plus d'informations sur vos services d'accompagnement pour étudier en France.");
        // WhatsApp URL with French phone number format and message
        window.open(`https://wa.me/33668156073?text=${message}`, '_blank');
      } else {
        // Toggle the contact modal when outSideOfResult is false
        setOpenContactModal(prev => !prev);
      }
    };
  
    // Define servicesData
    const servicesData = [
      {
        title: " Conseil Stratégique et Orientation Personnalisée",
        svg: SvgConstant.getSvg('CONSEIL_STRATEGIQUE_ET_ORIENTATION_PERSONNALISEE'),
        items: [
          {
            title: "Analyse de votre projet d'études",
            svg: SvgConstant.getSvg('ANALYSE_DE_VOTRE_PROJET_D_ETUDES'),
            description: "Une évaluation complète de votre parcours académique et professionnel pour identifier vos atouts et domaines d'amélioration."
          },
          {
            title: "Conseils sur mesure",
            svg: SvgConstant.getSvg('CONSEILS_SUR_MESURE'),
            description: "Des recommandations adaptées sur les formations et établissements les plus alignés avec vos objectifs."
          },
          {
            title: "Guide des démarches administratives et formalités de visa",
            svg: SvgConstant.getSvg('GUIDE_DES_DEMARCHES_ADMINISTRATIVES_ET_FORMALITES_DE_VISA'),
            description: "Bénéficiez de notre expertise pour naviguer sereinement les démarches de visa."
          },
          {
            title: "Orientation financière",
            svg: SvgConstant.getSvg('ORIENTATION_FINANCIERE'),
            description: "Accédez à des conseils sur les aides financières et solutions de financement pour soutenir votre projet."
          }
        ]
      },
      {
        title: "Préparation Optimale des Dossiers et Entretiens",
        svg : SvgConstant.getSvg('PREPARATION_OPTIMALE_DES_DOSSIERS_ET_ENTRETIENS'),
        items: [
          {
            title: "Accompagnement pour Études en France",
            svg: SvgConstant.getSvg('ACCOMPAGNEMENT_POUR_ETUDES_EN_FRANCE'),
            description: "Assistance complète pour la création et le remplissage de votre dossier électronique."
          },
          {
            title: "Sélection des établissements",
            svg: SvgConstant.getSvg('SELECTION_DES_ETABLISSEMENTS'),
            description: "Aide au choix des universités et écoles en parfaite adéquation avec votre profil et votre projet professionnel."
          },
          {
            title: "Projet académique et professionnel structuré",
            svg: SvgConstant.getSvg('PROJET_ACADEMIQUE_ET_PROFESSIONNEL_STRUCTURE'),
            description: "Soutien pour concevoir un projet d'études clair, cohérent et convaincant. Aide pour justifier les années blanches ou de redoublement."
          },
          {
            title: "Rédaction de lettres de motivation et CV percutants",
            svg: SvgConstant.getSvg('REDACTION_DE_LETTRES_DE_MOTIVATION_ET_CV_PERCUTANTS'),
            description: "Des conseils professionnels pour des lettres et CV qui retiennent l’attention."
          },
          {
            title: "Préparation à l’entretien Campus France",
            svg: SvgConstant.getSvg('PREPARATION_A_L_ENTRETIEN_CAMPUS_FRANCE'),
            description: "Coaching intensif pour réussir l'entretien et convaincre les recruteurs académiques."
          },
          {
            title: "Prise de rendez-vous Campus France",
            svg : SvgConstant.getSvg('PRISE_DE_RENDEZ_VOUS_CAMPUS_FRANCE'),
            description: "Nous nous occupons de l’organisation des rendez-vous pour votre tranquillité d’esprit."
          }
        ]
      },
      {
        title: "Assistance complète pour obtenir Votre Visa Étudiant",
        svg: SvgConstant.getSvg('ASSISTANCE_COMPLETE_POUR_OBTENIR_VOTRE_VISA_ETUDIANT'),
        items: [
          {
            title: "Montage de dossier de visa longue durée",
            svg: SvgConstant.getSvg('MONTAGE_DE_DOSSIER_DE_VISA_LONGUE_DUREE'),
            description: "Assistance pour constituer un dossier de demande de visa complet et solide."
          },
          {
            title: "Préparation à l'interview consulaire",
            svg: SvgConstant.getSvg('PREPARATION_A_L_INTERVIEW_CONSULAIRE'),
            description: "Coaching pour aborder l'entretien consulaire avec confiance."
          }, 
          {
            title: "Aide en cas de refus de visa",
            svg: SvgConstant.getSvg('AIDE_EN_CAS_DE_REFUS_DE_VISA'),
            description: "Des stratégies et solutions pour répondre à un éventuel refus de visa."
          },
          {
            title: "Conseil financier pour étudiant",
            svg: SvgConstant.getSvg('CONSEIL_FINANCIER_POUR_ETUDIANT'),
            description: "Solutions sur mesure pour obtenir le soutien financier nécessaire (compte bloqué, garant, etc.)."
          },
          {
            title: "Assistance pour le logement étudiant",
            svg: SvgConstant.getSvg('ASSISTANCE_POUR_LE_LOGEMENT_ETUDIANT'),
            description: "Recherche et accompagnement pour trouver un logement adapté à votre budget et vos besoins."
          },
          {
            title: "Préparation des documents de voyage",
            svg: SvgConstant.getSvg('PREPARATION_DES_DOCUMENTS_DE_VOYAGE'),
            description: "Aide pour réunir tous les documents nécessaires (assurance, billet d'avion, etc.) pour un départ en toute sérénité."
          }
        ]
      },
      {
        title: "Soutien à l'arrivée et à l'intégration en France",
        svg: SvgConstant.getSvg('SOUTIEN_A_L_ARRIVEE_ET_A_L_INTEGRATION_EN_FRANCE'),
        items: [
          {
            title: "Aide à l'ouverture d’un compte bancaire",
            svg: SvgConstant.getSvg('AIDE_A_L_OUVERTURE_D_UN_COMPTE_BANCAIRE'),
            description: "Assistance pour constituer le dossier et faciliter vos démarches bancaires en France."
          },
          {
            title: "Inscription universitaire simplifiée",
            svg: SvgConstant.getSvg('INSCRIPTION_UNIVERSITAIRE_SIMPLIFIEE'),
            description: "Accompagnement pour l’inscription dans votre établissement d’accueil."
          }, 
          {
            title: "Inscription à la sécurité sociale et mutuelle",
            svg: SvgConstant.getSvg('INSCRIPTION_A_LA_SECURITE_SOCIALE_ET_MUTUELLE'),
            description: "Préparation des documents pour bénéficier de la couverture santé."
          },
          {
            title: "Aide pour les démarches d’installation",
            svg: SvgConstant.getSvg('AIDE_POUR_LES_DEMARCHES_D_INSTALLATION'),
            description: "Support pour obtenir vos cartes de réduction, accès aux bibliothèques et autres avantages étudiants."
          },
          {
            title: "Aide à la régularisation de votre titre de séjour",
            svg: SvgConstant.getSvg('AIDE_A_LA_REGULARISATION_DE_VOTRE_TITRE_DE_SEJOUR'),
            description: "Conseils pour sécuriser votre titre de séjour et vous intégrer durablement en France."
          },
          {
            title: "Coaching d’intégration dans la vie étudiante",
            svg: SvgConstant.getSvg('COACHING_D_INTEGRATION_DANS_LA_VIE_ETUDIANTE'),
            description: "Des sessions pour vous guider dans la recherche de jobs, de stages et dans les autres aspects pratiques de la vie étudiante en France."
          }
        ]
      }
    ];
  
    const commitmentsData = [
      {
        title: "NOS POINTS FORTS",
        svg: SvgConstant.getSvg('NOS_POINTS_FORTS'),
        items: [
          {
            title: "Accompagnement 100% personnalisé",
            svg: SvgConstant.getSvg('ACCOMPAGNEMENT_100_PERSONNALISE'),
            description: "Une prise en charge 100% personnalisée à chaque étape de votre projet."
          },
          {
            title: "Suivi VIP de votre dossier",
            svg: SvgConstant.getSvg('SUIVI_VIP_DE_VOTRE_DOSSIER'),
            description: "Votre demande est notre priorité absolue."
          },
          {
            title: "Experts dédiés à votre réussite",
            svg: SvgConstant.getSvg('EXPERTS_DEDIES_A_VOTRE_REUSSITE'), 
            description: "Des conseillers spécialisés à votre service."
          },
          {
            title: "Taux de réussite élevé",
            svg: SvgConstant.getSvg('TAUX_DE_REUSSITE_ELEVE'),
            description: "Rejoignez ceux qui ont déjà concrétisé leur rêve !"
          },
          {
            title: "Assistance multilingue",
            svg: SvgConstant.getSvg('ASSISTANCE_MULTILINGUE'),
            description: "Pour vous servir, quelle que soit votre langue."
          },
          {
            title: "Disponibilité totale, 7j/7",
            svg: SvgConstant.getSvg('DISPONIBILITE_TOTALE_7J7'),
            description: "Nous sommes là, quand vous avez besoin de nous."
          },
          {
            title: "Garantie satisfaction",
            svg: SvgConstant.getSvg('GARANTIE_SATISFACTION'),
            description: "Notre succès repose sur le vôtre."
          }
        ]
      },
      {
        title: "NOS ENGAGEMENTS",
        svg: SvgConstant.getSvg('NOS_ENGAGEMENTS'),
        items: [
          {
            title: "Excellence inégalée",
            svg: SvgConstant.getSvg('EXCELLENCE_INEGALEE'),
            description: "Un service premium à chaque interaction."
          },
          {
            title: "Transparence garantie",
            svg: SvgConstant.getSvg('TRANSPARENCE_GARANTIE'),
            description: "Clarté et honnêteté tout au long de votre parcours."
          },
          {
            title: "Délais maîtrisés",
            svg: SvgConstant.getSvg('DELAIS_MAITRISES'),
            description: "Nous agissons rapidement pour des résultats optimaux."
          },
          {
            title: "Confidentialité absolue",
            svg: SvgConstant.getSvg('CONFIDENTIALITE_ABSOLUE'),
            description: "Vos données sont entre de bonnes mains."
          }
        ]
      }
    ];

  
    const actionStyle1Lg = {whiteSpace: 'nowrap', fontSize: 20, paddingRight: 5, marginLeft: -5}
    const actionStyle1NotLg = {whiteSpace: 'nowrap', fontSize: 15, paddingRight: 5, marginLeft: 0}

    const [offerActionClicked, setOfferActionClicked] = useState(true);



  const renderLargeCard = () => {
    return (
    <div className="Stack-child" style={{ position: 'fixed', bottom: 0, left: 0, width: '100%', height: 'auto', zIndex: 1000, overflow: 'hidden', padding: '20px '+([ 'lg+','lg' ].includes(deviceType) ? '17%' : '9%')+ ' 0', transition: 'all 0.4s ease'}}>
 
      <div className="Affiliation" style={{paddingBottom: 15, color: "rgb(0, 20, 53)", transition: 'all 0.4s ease'}}>
        
          <div className="Affiliation-card withTag" style={{borderRadius: 15, backgroundColor: 'aliceblue', boxShadow: "0 4px 8px 0 rgba(172, 186, 200, 1), 0 6px 20px 0 rgba(172, 186, 200, 1)"}}>
            {isExpanded && <div className='service-pricing-section' style={offerActionClicked ? {} : {maxWidth: 550}}>
              {(offerActionClicked ? servicesData : commitmentsData).map((service, index) => (
                <ServiceSection
                  key={index}
                  svg={service.svg}
                  title={service.title}
                  items={service.items}
                />
              ))}</div>}
              <div className="content" style={{padding: "0 20px 0 20px"}}>
                  {isExpanded && <div className='shadow-separator'  />}
                  <div className="AffiliationCard  affiliationsocietegenerale-affiliation_sg1 " style={{borderRadius: 15}}>
                      <div className="center">
                          <div className="Box   " style={{ padding: 0, marginLeft: "auto", marginRight: "auto", borderWidth: "initial", borderStyle: "none", borderColor: "initial" }}>
                              <div className="Stack  stackColumn " style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', margin: 'auto' }}>
                                  <div className="stack-item"  style={isExpanded? {transition: 'all 0.4s ease', marginRight:[ 'sm'].includes(deviceType) ? 15 :([ 'lg'].includes(deviceType)? 10: 50)} :{ }}>
                                      <div className="AffiliationCard-logo">
                                          <div className=" large  " style={{ padding: 20, color: '#2a3775' }}>
                                              <div style={[ 'sm'].includes(deviceType) ? { fontSize:12} : {}}>Accompagnement dès</div>
                                              <div className="o-card__footer o-vflow--xs">
                                                  <div className="c-price--mention"> <s>399,00€</s> <span className="c-chip c-chip--rounded c-chip--ventePrive" style={{ background: "#ff1e3c", borderRadius: 50, fontFamily: '"Hind Madurai"', fontSize: [ 'sm'].includes(deviceType) ? 12 : 16}}>
                                                                      <em className="c-chip__label">-40%</em>
                                                                  </span> </div>
                                                  <div className="o-card__priceWrapper">
                                                      <div className="o-card__price o-card__price--inline"> <span className="c-price c-price--promo c-price--l" style={{ fontSize: [ 'sm'].includes(deviceType) ? 32 : 48 }}> 159 
                                                                          <sup>
                                                                              <span itemProp="priceCurrency">€00</span> </sup>
                                                          </span>
                                                      </div>
                                                  </div> <span className="c-price__mention">Frais de dossier inclus</span> </div>
                                          </div>
                                      </div>
                                  </div>
                                  <div className="stack-item" style={{ paddingTop: 0, }}>
                                    {isExpanded ?
                                      <div className="Box   " style={{ padding: 0, width: 190, borderWidth: "initial", borderStyle: "none", borderColor: "initial", marginLeft: [ 'lg+'].includes(deviceType) ? 5: ([ 'lg'].includes(deviceType) ? -5 :-30) }}>
                                          <div className="MerButton" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', width: '150px' }}>
                                              <button type="button" className="CTA button primary xlarge" data-testid="mer-button-affiliation_sg1" onClick={()=> setOfferActionClicked(true)}
                                              style={{padding: [ 'lg'].includes(deviceType) ? 3 : 5, margin: 'auto', height:'auto', ...(offerActionClicked ? {} : { background: 'none' } ),  ...(offerActionClicked ? {}: {border:'2px solid #0154c0'}), color: offerActionClicked ? '#fff':'#0154c0', minWidth: 'fit-content',}}>
                                                  <svg id="icon-promo-blue" viewBox="0 0 120 120" height={[ 'lg+'].includes(deviceType) ? 64 : ([ 'sm'].includes(deviceType) ? 40 :([ 'lg'].includes(deviceType) ? 54 :52))} >
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M56.859 20.31c.09.01.18.01.27 0a1.56 1.56 0 001.53-1.31l1.63-9.14a1.56 1.56 0 10-3.07-.54l-1.63 9.19a1.56 1.56 0 001.27 1.8zm-13.58 1.42c.29.294.687.46 1.1.46a1.6 1.6 0 001.1-.46 1.57 1.57 0 000-2.21l-6.61-6.58a1.56 1.56 0 10-2.2 2.21l6.61 6.58zM38.6 35.52c-.116.009-.233.009-.35 0l-9.09-2.15a1.56 1.56 0 11.7-3L39 32.44a1.56 1.56 0 01-.35 3.08h-.05zM63.94 78.6a2.32 2.32 0 00.12-1.55 1.45 1.45 0 00-.84-.95 2.298 2.298 0 00-.75-.19 3.995 3.995 0 00-.94.1c-.816.17-1.646.264-2.48.28a5 5 0 01-1.83-.35 3.37 3.37 0 01-1.92-1.79 5.74 5.74 0 01-.14-3.21l3.54 1.47c.381.16.81.16 1.19 0a1.45 1.45 0 00.84-.84 1.49 1.49 0 000-1.19 1.56 1.56 0 00-.86-.83l-3.84-1.6.39-.95.4-1 3.88 1.58c.385.16.817.16 1.2 0a1.58 1.58 0 00.84-2 1.53 1.53 0 00-.86-.83l-3.53-1.47a5.6 5.6 0 012.36-2.13 3.36 3.36 0 012.63.1 5.069 5.069 0 011.54 1.06 10.508 10.508 0 011.53 1.95c.167.269.365.517.59.74.206.146.432.26.67.34a1.45 1.45 0 001.32-.11c.461-.27.815-.69 1-1.19a2.16 2.16 0 00.2-1 2.63 2.63 0 00-.34-1 10.72 10.72 0 00-5.19-4.76 8 8 0 00-6-.25 10.44 10.44 0 00-5 4.24l-1.69-.7a1.57 1.57 0 00-1.22 0 1.46 1.46 0 00-.85.82 1.45 1.45 0 000 1.17c.163.39.477.697.87.85l1.35.57c-.16.305-.303.619-.43.94a9.63 9.63 0 00-.36 1l-1.35-.56a1.57 1.57 0 00-1.22 0 1.47 1.47 0 00-.83 2c.163.39.477.697.87.85l1.69.71A10.61 10.61 0 0051 75.5a7.93 7.93 0 004.42 4.08 10.2 10.2 0 007 .34 2.41 2.41 0 00.93-.48c.261-.23.463-.517.59-.84z" fill={offerActionClicked? "#fff" : "#0154c0"} />
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M94.32 44.57l-4.38-3.83a13.079 13.079 0 002.4-3.91 13.22 13.22 0 10-24.6-9.67c-.315.794-.55 1.618-.7 2.46l-13.32 1a7.41 7.41 0 00-6.27 4.51L24.59 88.92a7.45 7.45 0 003.94 9.76l30.5 13c.92.396 1.91.6 2.91.6a7.48 7.48 0 002.78-.54 7.392 7.392 0 004.06-4l6.41 1.55a6.89 6.89 0 008.34-5.09l12.82-52.92a7 7 0 00-2.03-6.71zM70.001 28a10.84 10.84 0 1118.2 11.15l-8.72-7.63a.638.638 0 00-.18-.1 7.44 7.44 0 00-6-2.32l-3.76.3c.123-.476.276-.944.46-1.4zm-6.12 81.46a5.004 5.004 0 01-3.87 0l-30.5-13a5.07 5.07 0 01-2.68-6.64l2.23-5.32 1.7.76c.201.086.42.13.64.13a1.55 1.55 0 001.43-.93 1.57 1.57 0 00-.83-2.07l-1.76-.78 19.4-45.52A5 5 0 0153.9 33l12.93-1c.01 1.445.25 2.88.71 4.25a5.91 5.91 0 001.17 10.26A5.89 5.89 0 0071 47a5.94 5.94 0 10-1.3-11.73 11.113 11.113 0 01-.5-3.44l4.24-.33a5 5 0 014.4 2l11 14.35a5 5 0 01.64 5.06L69.8 99.25l-1.8-.81a1.57 1.57 0 00-1.28 2.86l1.86.83-2 4.65a5 5 0 01-2.75 2.71l.05-.03zm4.71-71a14.12 14.12 0 001.16 1.73 13.222 13.222 0 003.32 3c.188.118.407.18.63.18h.08a3.56 3.56 0 11-5.19-4.86v-.05zm5.999 2.94a1.2 1.2 0 00-.28-.27 10.83 10.83 0 01-2.72-2.42 11.264 11.264 0 01-.84-1.24h.31a3.56 3.56 0 013.53 4v-.07zm19.61 9.36l-12.81 52.91a4.72 4.72 0 01-5.68 3.47l-6.06-1.47L91.7 53.81a7.45 7.45 0 00-.94-7.44l-4.62-6 6.7 5.86a4.71 4.71 0 011.36 4.53z" fill={offerActionClicked? "#fff" : "#627A93"} />
                                                    <path d="M41.84 86.77l-3.26-1.46a1.57 1.57 0 10-1.28 2.86l3.27 1.46c.197.094.413.142.63.14a1.57 1.57 0 00.64-3zM51.65 91.15l-3.27-1.46a1.57 1.57 0 00-1.28 2.86L50.37 94c.203.086.421.13.64.13a1.56 1.56 0 00.64-3v.02zM61.45 95.52l-3.27-1.46a1.57 1.57 0 10-1.27 2.87l3.27 1.45c.196.095.412.142.63.14a1.57 1.57 0 00.64-3z" fill={offerActionClicked? "#fff" : "#627A93"} /> 
                                                  </svg>
                                                  <div className="PpsButton-children " style={[ 'lg+','lg'].includes(deviceType) ? actionStyle1Lg :actionStyle1NotLg}> Notre Offre</div>
                                              </button>
                                          </div>
                                      </div> :
                                      <div className="AffiliationArgumentaire">
                                          <div className="Stack  stackRow " style={{ flexDirection: "row", alignItems: "center" }}>
                                              <div className="Stack-child" style={{ paddingLeft: 0 }}>
                                                  <div className="">
                                                      {SvgConstant.getSvg('GLASS')}
                                                  </div>
                                              </div>
                                              <div className="Stack-child stack-item-text " style={[ 'sm'].includes(deviceType) ? { fontSize:12} : {}}>
                                                  <div> Analyse approfondie de votre projet et conseils pédagogiques sur mesure. </div>
                                              </div>
                                          </div>
                                      </div>}
                                  </div>
                                  <div className="stack-item" style={{ paddingTop: 0 }}>
                                    {isExpanded ?
                                      <div className="Box   " style={{ padding: 0, width: 190, borderWidth: "initial", borderStyle: "none", borderColor: "initial",   marginLeft: [ 'lg+'].includes(deviceType) ? 15: ([ 'sm'].includes(deviceType) ? -42 :([ 'lg'].includes(deviceType) ? -18 : -30))  }}>
                                          <div className="MerButton" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', width: '150px' }}>
                                              <button type="button" className="CTA button primary xlarge" data-testid="mer-button-affiliation_sg1" 
                                              style={{padding: [ 'lg'].includes(deviceType) ? 3 : 5, margin: 'auto', height:'auto', ...(offerActionClicked ? {background:'none'} : {}), ...(offerActionClicked ? {border:'2px solid #0154c0'} : {}), color: offerActionClicked ? '#0154c0' : "#fff", minWidth: 'fit-content'}} onClick={() => setOfferActionClicked(false)}>
                                                      <svg id="icon-protect-blue" viewBox="0 0 120 120"  height={[ 'lg+'].includes(deviceType) ? 64 : ([ 'sm'].includes(deviceType) ? 40 :([ 'lg'].includes(deviceType) ? 54 :52))}  >
                                                        <g id="icon/large/protect/icon-protect-blue" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                                                          <g id="icon/large/protect/blue" transform="translate(24 12)">
                                                            <path d="M39.212 18.665c3.851 2.889 9.737 5.563 16.36 7.35 3.966 1.07 7.882 1.736 11.461 1.97 2.373.154 4.21 2.161 4.21 4.564v22.797c0 14.95-7.072 29.005-19.043 37.847l-1.907 1.408a23.737 23.737 0 01-28.087.112l-2.107-1.53C7.953 84.36.758 70.198.758 55.117V32.608c0-2.442 1.897-4.459 4.316-4.569 3.811-.171 8.069-.858 12.396-2.025 6.623-1.787 12.51-4.46 16.36-7.348a4.464 4.464 0 015.382 0zm-4.024 1.837c-4.099 3.075-10.246 5.867-17.13 7.724-4.482 1.209-8.903 1.922-12.882 2.1-1.2.055-2.144 1.06-2.144 2.282v22.509c0 14.345 6.844 27.815 18.397 36.21l2.107 1.53a21.476 21.476 0 0025.413-.102l1.907-1.408c11.386-8.41 18.113-21.78 18.113-36.001V32.549c0-1.204-.915-2.204-2.083-2.28-3.732-.243-7.795-.934-11.903-2.043-6.883-1.857-13.028-4.649-17.13-7.724a2.203 2.203 0 00-2.665 0zm3.436 7.068c2.923 2.191 7.404 4.226 12.45 5.588 3 .81 5.96 1.315 8.67 1.497 1.963.132 3.54 1.793 3.54 3.77v17.478c0 11.547-5.462 22.402-14.706 29.23l-1.017.754a19.22 19.22 0 01-22.74.09l-1.168-.849a1.15 1.15 0 01-.256-1.598 1.132 1.132 0 011.587-.259l1.167.848a16.96 16.96 0 0020.064-.079l1.017-.752C55.894 76.89 61.01 66.721 61.01 55.903V38.425c0-.76-.638-1.433-1.418-1.485-2.86-.192-5.967-.723-9.106-1.57-5.307-1.432-10.047-3.585-13.221-5.964a1.439 1.439 0 00-1.732 0c-3.172 2.379-7.912 4.531-13.219 5.963-3.459.934-6.877 1.485-9.957 1.622a1.14 1.14 0 01-1.186-1.094 1.142 1.142 0 011.086-1.194c2.91-.129 6.165-.653 9.469-1.545 5.046-1.362 9.527-3.397 12.449-5.588a3.7 3.7 0 014.449 0zM12.996 67.267a34.27 34.27 0 002.049 4.608 33.842 33.842 0 002.707 4.253 1.15 1.15 0 01-.225 1.604 1.132 1.132 0 01-1.592-.227 36.136 36.136 0 01-2.891-4.542 36.57 36.57 0 01-2.187-4.918 1.147 1.147 0 01.683-1.466 1.135 1.135 0 011.456.688z" id="Combined-Shape" fill={offerActionClicked? "#627A93" : "#fff"}  />
                                                            <path d="M46.093 48.442a3.394 3.394 0 014.823 0 3.452 3.452 0 010 4.857l-14.775 14.88a3.394 3.394 0 01-4.823 0l-7.892-7.947a3.452 3.452 0 010-4.857 3.394 3.394 0 014.823 0l5.48 5.519 12.364-12.452z" id="Stroke-7" fill={offerActionClicked? "#0154c0" : "#fff"}/>
                                                            <path d="M36.43 0v7.798V0zM9 7.611L14.18 14 9 7.611zm56 0L59.82 14 65 7.611z" id="Shape"  stroke={offerActionClicked? "#0154c0" : "#fff"}  strokeWidth="2.28" strokeLinecap="round" strokeLinejoin="round" /> </g>
                                                        </g>
                                                      </svg>
                                                  <div className="PpsButton-children " style={[ 'lg+','lg'].includes(deviceType) ? actionStyle1Lg :actionStyle1NotLg}> Notre Plus</div>
                                              </button>
                                          </div>
                                      </div>  :
                                      <div className="AffiliationArgumentaire">
                                          <div className="Stack  stackRow " style={{ flexDirection: "row", alignItems: "center" }}>
                                              <div className="Stack-child" style={{ paddingLeft: 0 }}>
                                                  <div className="">
                                                    {SvgConstant.getSvg('QUICK_CLOCK')}
                                                  </div>
                                              </div>
                                              <div className="stack-item-text" style={[ 'sm'].includes(deviceType) ? { fontSize:12} : {}}>
                                                  <div> Découvrez notre gamme complète de services adaptés à vous ! </div>
                                              </div>
                                          </div>
                                      </div>}
                                  </div>
                                  {isExpanded &&
                                  <div className="stack-item" style={{ paddingTop: 0, marginLeft: 25 }}>
                                    <div className="Box   " style={{ padding: 0, width: 190, borderWidth: "initial", borderStyle: "none", borderColor: "initial",   marginLeft: [ 'lg+'].includes(deviceType) ? 15: ([ 'sm'].includes(deviceType) ? -57 :([ 'lg'].includes(deviceType) ? -15 : -30))  }}>
                                        <div className="MerButton" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', width: '150px' }}>
                                            <button type="button" className="CTA button primary xlarge" data-testid="mer-button-affiliation_sg1" onClick={handleContactClick}
                                            style={{padding: [ 'lg'].includes(deviceType) ? 3 : 5, margin: 'auto', height:'auto', ...(openContactModal ? {} : { background: 'none' } ),  ...(openContactModal ? {}: {border:'2px solid #0154c0'}), color: openContactModal ? '#fff':'#0154c0', minWidth: 'fit-content',}}>
                                                <svg id="icon-system-phone" viewBox="0 0 40 40"  height={[ 'lg+'].includes(deviceType) ? 64 : ([ 'sm'].includes(deviceType) ? 40 :([ 'lg'].includes(deviceType) ? 54 :52))} >
                                                  <g id="icon/medium-40px/field/phone" stroke="none" strokeWidth={1} fillRule="evenodd">
                                                    <path d="M24.025 25.616l1.996-1.99c.28-.277.577-.425.86-.425.375 0 .677.264.827.426l3.22 3.203c.573.57.566 1.167-.021 1.776-.23.246-.474.482-.705.7l-.065.065c-.356.345-.725.7-1.055 1.096-.583.625-1.271.916-2.17.916-.074 0-.153-.005-.267-.01-1.724-.11-3.332-.783-4.54-1.357-3.307-1.595-6.2-3.854-8.597-6.712-1.98-2.375-3.31-4.583-4.189-6.948-.536-1.426-.748-2.581-.662-3.635a2.65 2.65 0 01.8-1.706L11.44 9.04c.543-.525 1.164-.546 1.716.01.312.289.609.59.921.908l2.277 2.282c.301.298.454.593.454.877 0 .285-.153.579-.455.877l-.612.62c-.454.457-.88.887-1.349 1.3l-.035.033c-.508.508-.418 1.014-.308 1.343.005.016.01.03.023.062.425 1.016 1.01 1.963 1.896 3.076 1.608 1.977 3.304 3.516 5.185 4.705.201.13.408.234.607.335l.114.058c.195.097.4.2.572.31l.072.04c.524.27 1.068.18 1.507-.26zm8.06.043l-3.206-3.195c-.576-.595-1.266-.91-1.998-.91-.725 0-1.424.312-2.018.903l-1.822 1.817a13.687 13.687 0 00-.426-.22 6.509 6.509 0 01-.573-.31c-1.72-1.09-3.288-2.51-4.79-4.346-.732-.923-1.218-1.686-1.564-2.453.48-.437.927-.888 1.344-1.316.13-.131.26-.261.39-.394l.1-.098c.611-.609.934-1.31.934-2.03 0-.726-.323-1.43-.934-2.033l-1.59-1.586c-.187-.185-.361-.365-.543-.55a28.589 28.589 0 00-1.085-1.073C13.723 7.299 13.034 7 12.309 7c-.72 0-1.416.3-2.02.872L8.295 9.86a4.265 4.265 0 00-1.27 2.721c-.104 1.298.136 2.672.752 4.325.941 2.549 2.36 4.91 4.463 7.427h.001c2.551 3.038 5.627 5.439 9.147 7.139 1.35.638 3.158 1.388 5.151 1.517l.067.002c.101.005.2.008.302.008 1.377 0 2.486-.474 3.393-1.457l.038-.044v-.004c.275-.326.584-.626.91-.942l.092-.088c.253-.242.51-.493.758-.75 1.207-1.253 1.203-2.846-.013-4.056z" id="phone" fill={openContactModal? "#fff" : "#627A93"}/> </g>
                                                </svg> 
                                                <div className="PpsButton-children " style={[ 'lg+','lg'].includes(deviceType) ? actionStyle1Lg :actionStyle1NotLg}> Être contacté </div>
                                            </button>
                                        </div>
                                    </div>
                                  </div>}
                              </div>
                          </div>
                      </div>
                  </div>
                  {!isExpanded &&
                  <div className="Box   " style={{ padding: 0, width: 190, borderWidth: "initial", borderStyle: "none", borderColor: "initial" }}>
                      <div className="MerButton" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', width: '150px' }}>
                          <button type="button" className="CTA button primary xlarge" data-testid="mer-button-affiliation_sg1" onClick={handleContactClick}
                          style={ {padding: 0, margin: 'auto', width: [ 'sm'].includes(deviceType) ? 120 : 'inherit', fontSize: [ 'sm'].includes(deviceType) ? '0.83rem' : 'inherit', height: 'auto'}}>        
                              <div className="PpsButton-children " > Être contacté </div>
                          </button>
                      </div>
                  </div>}
                  <div className="bottom-line">
                      <button className="ToggleExpand" style={{backgroundColor: "aliceblue", color: "rgb(42, 55, 117)", /*fontSize: [ 'sm'].includes(deviceType) ? '0.83rem' : 'inherit'*/}} onClick={() => setIsExpanded(prev => !prev)}> {isExpanded ? 'Moins' : 'Plus'} de détails
                          {SvgConstant.getSvg('TOGGLING_ARROW', {transform: `scale(${isExpanded ? -1 : 1})`})}
                      </button>
                  </div>
              </div> 
          </div>
      </div>
    </div>)
    }

  // Mobile and Tablet
  const isXSS = deviceType === 'xss';
  const isXS = deviceType === 'xs';

  const getSizing = () => ({
    container: {
      padding: isXSS ? '20px 15px' : '20px 20px',
      maxWidth: '100%'
    },
    button: {
      height: isXSS ? '40px' : '48px',
      padding: isXSS ? '6px 12px' : '8px 16px',
      fontSize: isXSS ? '12px' : '14px',
      iconSize: isXSS ? 28 : 52,
      minWidth: isXSS ? '100px' : '120px'
    },
    price: {
      titleSize: isXSS ? '11px' : '12px',
      mainPrice: isXSS ? '28px' : '32px',
      discountSize: isXSS ? '10px' : '12px',
      footerSize: isXSS ? '10px' : '12px'
    },
    spacing: {
      gap: isXSS ? '8px' : '10px',
      margin: isXSS ? '8px' : '10px'
    }
  });

  const sizing = getSizing();

  const styles = {
    container: {
      ...sizing.container,
      position: 'fixed',
      bottom: 0,
      left: 0,
      width: '100%',
      // zIndex: 1000,
    },
    
    card: {
      borderRadius: '15px',
      backgroundColor: 'aliceblue',
      boxShadow: "0 4px 8px 0 rgba(172, 186, 200, 1), 0 6px 20px 0 rgba(172, 186, 200, 1)",
    },

    content: {
      padding: '20px 15px',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      position: 'relative',
      paddingTop: '30px'
    },

    gridContainer: {
      display: 'flex',
      flexDirection: (isXSS && isExpanded) ? 'column' : 'row',
      flexWrap: (isXSS || !isExpanded) ? 'nowrap' : 'wrap',
      gap: isExpanded ? sizing.spacing.gap : 0,
      width: '100%',
      maxWidth: (isXSS && isExpanded) ? '300px' : '100%',
      justifyContent: 'center',
      alignItems: 'stretch'
    },

    gridItem: {
      flex: isXSS ? '1 0 100%' : '0 1 calc(50% - 10px)',
      minWidth: isXSS ? 'auto' : 'calc(50% - 10px)',
      maxWidth: isXSS ? '100%' : 'calc(50% - 10px)',
      display: 'flex',
      justifyContent: 'center'
    },

    priceSection: {
      textAlign: 'center',
      color: '#2a3775',
      padding: sizing.spacing.margin,
      width: '100%',
      flex: isXSS ? (isExpanded?'1 0 100%': '1 70%') : '1 0 calc(50% - 10px)',
      maxWidth: isXSS ? '100%' : 'calc(50% - 10px)'
    },

    button: (isActive) => ({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: isXS ? '100%':sizing.button.height,
      padding: sizing.button.padding,
      borderRadius: '15px',
      fontSize: isXS ? '18px' : sizing.button.fontSize,
      minWidth: sizing.button.minWidth,
      background: isActive ? 'linear-gradient(120deg, #0154c0 0%, #165ab2 51%, #0070e0 100%)' : 'none',
      border: isActive ? 'none' : '2px solid #0154c0',
      color: isActive ? '#fff' : '#0154c0',
      cursor: 'pointer',
      transition: 'all 0.4s ease'
    }),
 
  };

  const renderSmallOffer= () => {
    return (
      <div style={styles.gridItem}>
                                        <button style={styles.button(offerActionClicked)} onClick={()=> setOfferActionClicked(true)} >
                                          <svg id="icon-promo-blue" viewBox="0 0 120 120" height={sizing.button.iconSize}>
                                            <path fillRule="evenodd" clipRule="evenodd" d="M56.859 20.31c.09.01.18.01.27 0a1.56 1.56 0 001.53-1.31l1.63-9.14a1.56 1.56 0 10-3.07-.54l-1.63 9.19a1.56 1.56 0 001.27 1.8zm-13.58 1.42c.29.294.687.46 1.1.46a1.6 1.6 0 001.1-.46 1.57 1.57 0 000-2.21l-6.61-6.58a1.56 1.56 0 10-2.2 2.21l6.61 6.58zM38.6 35.52c-.116.009-.233.009-.35 0l-9.09-2.15a1.56 1.56 0 11.7-3L39 32.44a1.56 1.56 0 01-.35 3.08h-.05zM63.94 78.6a2.32 2.32 0 00.12-1.55 1.45 1.45 0 00-.84-.95 2.298 2.298 0 00-.75-.19 3.995 3.995 0 00-.94.1c-.816.17-1.646.264-2.48.28a5 5 0 01-1.83-.35 3.37 3.37 0 01-1.92-1.79 5.74 5.74 0 01-.14-3.21l3.54 1.47c.381.16.81.16 1.19 0a1.45 1.45 0 00.84-.84 1.49 1.49 0 000-1.19 1.56 1.56 0 00-.86-.83l-3.84-1.6.39-.95.4-1 3.88 1.58c.385.16.817.16 1.2 0a1.58 1.58 0 00.84-2 1.53 1.53 0 00-.86-.83l-3.53-1.47a5.6 5.6 0 012.36-2.13 3.36 3.36 0 012.63.1 5.069 5.069 0 011.54 1.06 10.508 10.508 0 011.53 1.95c.167.269.365.517.59.74.206.146.432.26.67.34a1.45 1.45 0 001.32-.11c.461-.27.815-.69 1-1.19a2.16 2.16 0 00.2-1 2.63 2.63 0 00-.34-1 10.72 10.72 0 00-5.19-4.76 8 8 0 00-6-.25 10.44 10.44 0 00-5 4.24l-1.69-.7a1.57 1.57 0 00-1.22 0 1.46 1.46 0 00-.85.82 1.45 1.45 0 000 1.17c.163.39.477.697.87.85l1.35.57c-.16.305-.303.619-.43.94a9.63 9.63 0 00-.36 1l-1.35-.56a1.57 1.57 0 00-1.22 0 1.47 1.47 0 00-.83 2c.163.39.477.697.87.85l1.69.71A10.61 10.61 0 0051 75.5a7.93 7.93 0 004.42 4.08 10.2 10.2 0 007 .34 2.41 2.41 0 00.93-.48c.261-.23.463-.517.59-.84z" fill={offerActionClicked ? "#fff" : '#0154c0'} />
                                            <path fillRule="evenodd" clipRule="evenodd" d="M94.32 44.57l-4.38-3.83a13.079 13.079 0 002.4-3.91 13.22 13.22 0 10-24.6-9.67c-.315.794-.55 1.618-.7 2.46l-13.32 1a7.41 7.41 0 00-6.27 4.51L24.59 88.92a7.45 7.45 0 003.94 9.76l30.5 13c.92.396 1.91.6 2.91.6a7.48 7.48 0 002.78-.54 7.392 7.392 0 004.06-4l6.41 1.55a6.89 6.89 0 008.34-5.09l12.82-52.92a7 7 0 00-2.03-6.71zM70.001 28a10.84 10.84 0 1118.2 11.15l-8.72-7.63a.638.638 0 00-.18-.1 7.44 7.44 0 00-6-2.32l-3.76.3c.123-.476.276-.944.46-1.4zm-6.12 81.46a5.004 5.004 0 01-3.87 0l-30.5-13a5.07 5.07 0 01-2.68-6.64l2.23-5.32 1.7.76c.201.086.42.13.64.13a1.55 1.55 0 001.43-.93 1.57 1.57 0 00-.83-2.07l-1.76-.78 19.4-45.52A5 5 0 0153.9 33l12.93-1c.01 1.445.25 2.88.71 4.25a5.91 5.91 0 001.17 10.26A5.89 5.89 0 0071 47a5.94 5.94 0 10-1.3-11.73 11.113 11.113 0 01-.5-3.44l4.24-.33a5 5 0 014.4 2l11 14.35a5 5 0 01.64 5.06L69.8 99.25l-1.8-.81a1.57 1.57 0 00-1.28 2.86l1.86.83-2 4.65a5 5 0 01-2.75 2.71l.05-.03zm4.71-71a14.12 14.12 0 001.16 1.73 13.222 13.222 0 003.32 3c.188.118.407.18.63.18h.08a3.56 3.56 0 11-5.19-4.86v-.05zm5.999 2.94a1.2 1.2 0 00-.28-.27 10.83 10.83 0 01-2.72-2.42 11.264 11.264 0 01-.84-1.24h.31a3.56 3.56 0 013.53 4v-.07zm19.61 9.36l-12.81 52.91a4.72 4.72 0 01-5.68 3.47l-6.06-1.47L91.7 53.81a7.45 7.45 0 00-.94-7.44l-4.62-6 6.7 5.86a4.71 4.71 0 011.36 4.53z"  fill={offerActionClicked ? "#fff" : '#7f94a9'} />
                                            <path d="M41.84 86.77l-3.26-1.46a1.57 1.57 0 10-1.28 2.86l3.27 1.46c.197.094.413.142.63.14a1.57 1.57 0 00.64-3zM51.65 91.15l-3.27-1.46a1.57 1.57 0 00-1.28 2.86L50.37 94c.203.086.421.13.64.13a1.56 1.56 0 00.64-3v.02zM61.45 95.52l-3.27-1.46a1.57 1.57 0 10-1.27 2.87l3.27 1.45c.196.095.412.142.63.14a1.57 1.57 0 00.64-3z" fill={offerActionClicked ? "#fff" : '#7f94a9'} /> </svg> <span style={{ marginLeft: '8px', whiteSpace: 'nowrap', fontWeight:900 }}>Notre Offre</span> </button>
                                      </div>)
  }

  const renderSmallCommitment = () => {
    return (
      <div style={styles.gridItem}>
                        <button style={styles.button(!offerActionClicked)} onClick={()=> setOfferActionClicked(false)} >
                          <svg id="icon-protect-blue" viewBox="0 0 120 120" height={sizing.button.iconSize}>
                            <g id="icon/large/protect/icon-protect-blue" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                              <g id="icon/large/protect/blue" transform="translate(24 12)">
                                <path d="M39.212 18.665c3.851 2.889 9.737 5.563 16.36 7.35 3.966 1.07 7.882 1.736 11.461 1.97 2.373.154 4.21 2.161 4.21 4.564v22.797c0 14.95-7.072 29.005-19.043 37.847l-1.907 1.408a23.737 23.737 0 01-28.087.112l-2.107-1.53C7.953 84.36.758 70.198.758 55.117V32.608c0-2.442 1.897-4.459 4.316-4.569 3.811-.171 8.069-.858 12.396-2.025 6.623-1.787 12.51-4.46 16.36-7.348a4.464 4.464 0 015.382 0zm-4.024 1.837c-4.099 3.075-10.246 5.867-17.13 7.724-4.482 1.209-8.903 1.922-12.882 2.1-1.2.055-2.144 1.06-2.144 2.282v22.509c0 14.345 6.844 27.815 18.397 36.21l2.107 1.53a21.476 21.476 0 0025.413-.102l1.907-1.408c11.386-8.41 18.113-21.78 18.113-36.001V32.549c0-1.204-.915-2.204-2.083-2.28-3.732-.243-7.795-.934-11.903-2.043-6.883-1.857-13.028-4.649-17.13-7.724a2.203 2.203 0 00-2.665 0zm3.436 7.068c2.923 2.191 7.404 4.226 12.45 5.588 3 .81 5.96 1.315 8.67 1.497 1.963.132 3.54 1.793 3.54 3.77v17.478c0 11.547-5.462 22.402-14.706 29.23l-1.017.754a19.22 19.22 0 01-22.74.09l-1.168-.849a1.15 1.15 0 01-.256-1.598 1.132 1.132 0 011.587-.259l1.167.848a16.96 16.96 0 0020.064-.079l1.017-.752C55.894 76.89 61.01 66.721 61.01 55.903V38.425c0-.76-.638-1.433-1.418-1.485-2.86-.192-5.967-.723-9.106-1.57-5.307-1.432-10.047-3.585-13.221-5.964a1.439 1.439 0 00-1.732 0c-3.172 2.379-7.912 4.531-13.219 5.963-3.459.934-6.877 1.485-9.957 1.622a1.14 1.14 0 01-1.186-1.094 1.142 1.142 0 011.086-1.194c2.91-.129 6.165-.653 9.469-1.545 5.046-1.362 9.527-3.397 12.449-5.588a3.7 3.7 0 014.449 0zM12.996 67.267a34.27 34.27 0 002.049 4.608 33.842 33.842 0 002.707 4.253 1.15 1.15 0 01-.225 1.604 1.132 1.132 0 01-1.592-.227 36.136 36.136 0 01-2.891-4.542 36.57 36.57 0 01-2.187-4.918 1.147 1.147 0 01.683-1.466 1.135 1.135 0 011.456.688z" id="Combined-Shape" fill={offerActionClicked? "#627A93":"#fff"} />
                                <path d="M46.093 48.442a3.394 3.394 0 014.823 0 3.452 3.452 0 010 4.857l-14.775 14.88a3.394 3.394 0 01-4.823 0l-7.892-7.947a3.452 3.452 0 010-4.857 3.394 3.394 0 014.823 0l5.48 5.519 12.364-12.452z" id="Stroke-7" fill={offerActionClicked? "#0154c0":"#fff"} />
                                <path d="M36.43 0v7.798V0zM9 7.611L14.18 14 9 7.611zm56 0L59.82 14 65 7.611z" id="Shape" stroke={offerActionClicked? "#0154c0":"#fff"}  strokeWidth="2.28" strokeLinecap="round" strokeLinejoin="round" />{" "} </g>
                            </g>
                          </svg> <span style={{ marginLeft: '8px', whiteSpace: 'nowrap', fontWeight:900 }}>Notre Plus</span> </button>
                      </div>)}
                            
  const renderSmallCall = () => {
    return (
      <div style={styles.gridItem}>
        <button style={styles.button(openContactModal)} onClick={handleContactClick} >
          <svg id="icon-system-phone" viewBox="0 0 40 40" height={sizing.button.iconSize}>
            <g id="icon/medium-40px/field/phone" stroke="none" strokeWidth={1} fillRule="evenodd">
              <path d="M24.025 25.616l1.996-1.99c.28-.277.577-.425.86-.425.375 0 .677.264.827.426l3.22 3.203c.573.57.566 1.167-.021 1.776-.23.246-.474.482-.705.7l-.065.065c-.356.345-.725.7-1.055 1.096-.583.625-1.271.916-2.17.916-.074 0-.153-.005-.267-.01-1.724-.11-3.332-.783-4.54-1.357-3.307-1.595-6.2-3.854-8.597-6.712-1.98-2.375-3.31-4.583-4.189-6.948-.536-1.426-.748-2.581-.662-3.635a2.65 2.65 0 01.8-1.706L11.44 9.04c.543-.525 1.164-.546 1.716.01.312.289.609.59.921.908l2.277 2.282c.301.298.454.593.454.877 0 .285-.153.579-.455.877l-.612.62c-.454.457-.88.887-1.349 1.3l-.035.033c-.508.508-.418 1.014-.308 1.343.005.016.01.03.023.062.425 1.016 1.01 1.963 1.896 3.076 1.608 1.977 3.304 3.516 5.185 4.705.201.13.408.234.607.335l.114.058c.195.097.4.2.572.31l.072.04c.524.27 1.068.18 1.507-.26zm8.06.043l-3.206-3.195c-.576-.595-1.266-.91-1.998-.91-.725 0-1.424.312-2.018.903l-1.822 1.817a13.687 13.687 0 00-.426-.22 6.509 6.509 0 01-.573-.31c-1.72-1.09-3.288-2.51-4.79-4.346-.732-.923-1.218-1.686-1.564-2.453.48-.437.927-.888 1.344-1.316.13-.131.26-.261.39-.394l.1-.098c.611-.609.934-1.31.934-2.03 0-.726-.323-1.43-.934-2.033l-1.59-1.586c-.187-.185-.361-.365-.543-.55a28.589 28.589 0 00-1.085-1.073C13.723 7.299 13.034 7 12.309 7c-.72 0-1.416.3-2.02.872L8.295 9.86a4.265 4.265 0 00-1.27 2.721c-.104 1.298.136 2.672.752 4.325.941 2.549 2.36 4.91 4.463 7.427h.001c2.551 3.038 5.627 5.439 9.147 7.139 1.35.638 3.158 1.388 5.151 1.517l.067.002c.101.005.2.008.302.008 1.377 0 2.486-.474 3.393-1.457l.038-.044v-.004c.275-.326.584-.626.91-.942l.092-.088c.253-.242.51-.493.758-.75 1.207-1.253 1.203-2.846-.013-4.056z" id="phone" fill={openContactModal? "#fff" : "#627A93"} /> </g>
          </svg> <span style={{ marginLeft: '8px', whiteSpace: 'nowrap', fontWeight:900 }}>Être contacté</span> </button>
      </div>)}                        
  const renderSmallCard = (isSpecialDeviceType) => { 
          return (
                    <div className="Stack-child" style={{ position: 'fixed', bottom: 0, left: 0, width: '100%', height: 'auto', zIndex: 1000, overflow: 'hidden', padding: '20px '+([ 'lg+', 'lg' ].includes(deviceType) ? '17%' : '9%')+ ' 0'}}>
                      <div className="Affiliation" style={{paddingBottom: 15, color: "rgb(0, 20, 53)"}}>
                        <div className="Affiliation-card withTag" style={{borderRadius: 15, backgroundColor: 'aliceblue', boxShadow: "0 4px 8px 0 rgba(172, 186, 200, 1), 0 6px 20px 0 rgba(172, 186, 200, 1)"}}>
                          <div className="content" style={{padding: "0 20px 0 20px"}}>
                            <div style={styles.container}>
                              <div style={styles.card}> {isExpanded &&
                                <div className='service-pricing-section'> {(offerActionClicked ? servicesData : commitmentsData).map((service, index) => (
                                  <ServiceSection key={index} svg={service.svg} title={service.title} items={service.items} /> ))}
                                </div>}
                                <div style={styles.content} className="button-pricing-section"  >
                               {isExpanded && <div className='shadow-separator'  />}
                                  <div style={styles.gridContainer}>
                                    <div style={styles.priceSection}>
                                      <div style={{ fontSize: sizing.price.titleSize }}>Accompagnement dès</div>
                                      <div> <s>399,00€</s> <span style={{ background: "#ff1e3c", borderRadius: '50px', fontFamily: '"Hind Madurai"', fontSize: sizing.price.discountSize, padding: '2px 8px', color: 'white', marginLeft: '8px', display: 'inline-block' }}>-40%</span> </div>
                                      <div style={{ fontSize: sizing.price.mainPrice, fontWeight: 'bold', margin: `${sizing.spacing.margin} 0` }}> 159<sup style={{ fontSize: '50%' }}>€00</sup> </div>
                                      <div style={{ fontSize: sizing.price.footerSize }}> Frais de dossier inclus </div>
                                    </div> {!isExpanded &&
                                    <div style={{display: 'flex', justifyContent: 'space-evenly',alignItems: (isSpecialDeviceType ? 'flex-start' : 'center'), margin: 'auto', flexDirection : isSpecialDeviceType ? 'column' : 'inherit'}}>
                                      <div className="stack-item" style={{ paddingTop: 0 }}>
                                        <div className="AffiliationArgumentaire">
                                          <div className="Stack  stackRow " style={{ flexDirection: "row", alignItems: "center" }}> {![ 'xss' ].includes(deviceType) &&
                                            <div className="Stack-child" style={{ paddingLeft: 0 }}>
                                              <div> {SvgConstant.getSvg('GLASS')} </div>
                                            </div>}
                                            <div className="Stack-child stack-item-text " style={[ 'xs', 'xss'].includes(deviceType) ? { fontSize:12, width : isXSS ? 'auto' : 'revert-layer'} : {}}>
                                              <div> Analyse approfondie de votre projet et conseils pédagogiques sur mesure. </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div> {![ 'xss' ].includes(deviceType) &&
                                      <div className="stack-item" style={{ paddingTop: 0 }}>
                                        <div className="AffiliationArgumentaire">
                                          <div className="Stack  stackRow " style={{ flexDirection: "row", alignItems: "center" }}>
                                            <div className="Stack-child" style={{ paddingLeft: 0 }}>
                                              <div>
                                                <div className="Box   " style={{ padding: 0, width: 190, borderWidth: "initial", borderStyle: "none", borderColor: "initial" }}>
                                                  <div className="MerButton">
                                                    <button onClick={()=> setOpenContactModal(true)} type="button" className="CTA button primary xlarge" data-testid="mer-button-affiliation_sg1" style={{padding: 0, margin: 'auto', width: [ 'xs', 'xss'].includes(deviceType) ? 120 : 'inherit', fontSize: [ 'xs', 'xss'].includes(deviceType) ? '0.83rem' : 'inherit', height: 'auto'}}>
                                                      <div className="PpsButton-children "> Être contacté </div>
                                                    </button>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>} </div>} {isExpanded ?
                                    <>
                                    {isXS ? <>
                                      {renderSmallCall()} 
                                      {renderSmallOffer()}
                                      {renderSmallCommitment()}
                                      </> : <>
                                      {renderSmallOffer()}
                                      {renderSmallCommitment()}
                                      {renderSmallCall()} </>} 
                                      
                                      </>:
                                      <>
                                        </> } </div>
                                </div>
                              </div>
                            </div>
                            <div className="bottom-line">
                              <button className="ToggleExpand" style={{backgroundColor: "aliceblue", color: "rgb(42, 55, 117)", /*fontSize: [ 'xs', 'xss'].includes(deviceType) ? '12px' : 'inherit'*/}} onClick={()=> setIsExpanded(prev => !prev)}> {isExpanded ? 'Moins' : 'Plus'} de détails {SvgConstant.getSvg('TOGGLING_ARROW', {transform: `scale(${isExpanded ? -1 : 1})`})} </button>
                            </div>
                          </div>
                          <div className="AffiliationDetails">
                            <div className="DrawerAnimation" style={{ height: 0 }}>
                              <div /></div>
                          </div>
                        </div>
                      </div>
                    </div>
          )
  } 
  console.log('deviceType xx ', deviceType)
  if([ 'xs', 'xss' ].includes(deviceType)){
     return renderSmallCard(isSpecialDeviceType)
  }else if([ 'lg+','lg', 'md', 'sm' ].includes(deviceType)){
     return renderLargeCard()
  }else{
     return null
  }
   
};

export default ServicePricingCard;
