'use client';

import React, { useEffect, useState } from 'react';

const SimulationResultWaiting = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const STEPS = [
    {
      id: 'data-collect',
      title: 'Collecte et Vérification des Données',
      svg: <svg id="icon-monthly-blue" viewBox="0 0 120 120">
      <g transform="translate(15 10)" fill="rgb(98,122,147)" fontSize={65} fontFamily="Fira Sans Condensed" fontStyle="normal" fontWeight={400}>  
          <path className="sr-data-collect-draw-path" d="M18.5.9l.41.002C28.437.974 36.1 3.583 36.1 7.5c0 .258-.033.511-.098.758L36 15.009l.1.001-.005.178a3.34 3.34 0 01-.093.628L36 21.999l.1.001-.005.178a3.34 3.34 0 01-.093.628L36 29.999l.1.001-.005.178a3.34 3.34 0 01-.093.628L36 36.999l.1.001-.005.178a3.34 3.34 0 01-.093.628L36 43.999l.1.001-.005.178a3.34 3.34 0 01-.093.628L36 51.999l.1.001-.005.178a3.34 3.34 0 01-.093.628L36 59h.1l-.005.178a3.34 3.34 0 01-.093.628L36 66.999l.1.001-.005.178a3.34 3.34 0 01-.093.628L36 73.9h.1l-.005.178a3.34 3.34 0 01-.093.628L36 80.999l.1.001-.005.178a3.34 3.34 0 01-.093.628L36 87.999l.1.001-.005.178a3.34 3.34 0 01-.093.628L36 94.999l.2.001-.005.178c-.218 4.127-8.04 6.922-17.595 6.922l-.408-.002C9.469 102.025 2.277 99.616 1.152 96H1v-7.19A3.34 3.34 0 01.9 88l.1-.001v-6.19a3.341 3.341 0 01-.095-.631L.9 81l.1-.001v-6.29a3.341 3.341 0 01-.095-.631L.9 73.9H1v-6.09a3.341 3.341 0 01-.095-.632L.9 67l.1-.001v-7.19a3.341 3.341 0 01-.095-.631L.9 59H1v-6.19a3.341 3.341 0 01-.095-.632L.9 52l.1-.001v-7.19a3.341 3.341 0 01-.095-.631L.9 44l.1-.001v-6.19a3.341 3.341 0 01-.095-.631L.9 37l.1-.001v-6.19a3.341 3.341 0 01-.095-.631L.9 30l.1-.001v-7.19a3.341 3.341 0 01-.095-.631L.9 22l.1-.001v-6.18a3.341 3.341 0 01-.095-.631L.9 15.01l.1-.001V8.262a2.963 2.963 0 01-.095-.595L.9 7.5C.9 3.528 8.783.9 18.5.9z" fill="#7f94a9" stroke="#7f94a9" strokeWidth={2} />
          <path className="sr-data-collect-draw-path sr-data-collect-draw-delay1" d="M63.5 62.9l.41.002c9.528.072 17.19 2.681 17.19 6.598 0 .258-.033.511-.098.758L81 75.45h.1l-.005.178a3.34 3.34 0 01-.093.628L81 81.9h.1l-.005.178a3.34 3.34 0 01-.093.628L81 88.9h.1l-.005.178a3.34 3.34 0 01-.093.628L81 94.9h.1l-.005.178a3.34 3.34 0 01-.093.628L81 96h-.086c-1.243 3.616-8.59 6-17.414 6l-.408-.002c-8.642-.072-15.782-2.438-17.006-5.997L46 96v-.29a3.34 3.34 0 01-.1-.81h.1v-5.19a3.341 3.341 0 01-.095-.632L45.9 88.9h.1v-6.19a3.341 3.341 0 01-.095-.632L45.9 81.9h.1v-5.64a3.341 3.341 0 01-.095-.632l-.005-.178h.1v-5.188a2.963 2.963 0 01-.095-.595L45.9 69.5c0-3.972 7.883-6.6 17.6-6.6z" fill="#7f94a9" stroke="#7f94a9" strokeWidth={2} /> 
          <path className="sr-data-collect-draw-path sr-data-collect-draw-delay2" d="M97.168 69.142a1 1 0 01-.596 1.188l-.111.036-7.995 2.142a1 1 0 01-.628-1.895l.11-.036 7.995-2.142a1 1 0 011.225.707zM87.41 52.779a1 1 0 01.243 1.3l-.071.104-5.098 6.52a1 1 0 01-1.647-1.128l.071-.103 5.098-6.52a1 1 0 011.404-.173z" fill="#0154c0" stroke="#0154c0" strokeWidth={2} /> 
          <path className="sr-data-collect-draw-delay3" d="M63.75 27.5a1.5 1.5 0 011.493 1.356l.007.144v19.952l4.774-4.09a1.5 1.5 0 012.064 2.171l-.112.106-7 6c-.046.04-.095.077-.145.11l-.071.045-.1.053-.127.055-.141.046-.138.03-.072.011-.108.01h-.149l-.107-.01-.1-.016-.11-.025-.1-.03-.13-.053-.138-.072-.118-.076-.098-.078-7-6a1.5 1.5 0 011.83-2.372l.122.094 4.274 3.663V29a1.5 1.5 0 011.5-1.5zm0-11a1.5 1.5 0 011.493 1.356l.007.144v5a1.5 1.5 0 01-2.993.144L62.25 23v-5a1.5 1.5 0 011.5-1.5z" fill="#0154c0" stroke="#0154c0" strokeWidth={2} />
          <ellipse className="sr-data-collect-draw-path sr-data-collect-draw-delay2" cx={64} cy="69.5" rx={16} ry="5.5" fill="#0154c0" stroke="#0154c0" strokeWidth={2} /> </g>
  </svg>
    },
    {
      id: 'academic-analysis',
      title: 'Analyse Académique et Administrative',
      svg: <svg viewBox="0 0 120 120">
      <g transform="translate(20 8)">  
          <path className="sr-academic-fill-fade" d="M16.153 80.389a4.483 4.483 0 014.476 4.49c0 2.479-2.005 4.488-4.476 4.488a4.483 4.483 0 01-4.478-4.489c0-2.48 2.005-4.49 4.478-4.49zm18.96 0a4.482 4.482 0 014.477 4.49c0 2.479-2.003 4.488-4.476 4.488a4.483 4.483 0 01-4.477-4.489c0-2.48 2.004-4.49 4.477-4.49zm18.962 0a4.483 4.483 0 014.477 4.49c0 2.479-2.004 4.488-4.477 4.488a4.483 4.483 0 01-4.477-4.489c0-2.48 2.004-4.49 4.477-4.49z" fill="#0154c0" />  
          <path className="sr-academic-path-draw sr-academic-fill-fade" d="M35.021 11.646c7.956 0 14.406 6.468 14.406 14.445 0 7.979-6.45 14.445-14.406 14.445-7.957 0-14.406-6.466-14.406-14.445 0-7.977 6.449-14.445 14.406-14.445zm5.081 9.459l-6.85 6.868-3.658-3.668-2.257 2.262 5.915 5.932 9.107-9.132-2.257-2.262z" fill="#0154c0" stroke="#0154c0" strokeWidth={1} /> 
          <path className="sr-academic-path-draw" d="M59.08 17.614c5.844 0 10.673 4.32 10.673 9.676v65.945c0 5.357-4.829 9.677-10.673 9.677H11.676c-5.846 0-10.677-4.32-10.677-9.677V50.842c0-.661.535-1.198 1.195-1.198s1.194.537 1.194 1.198v42.393c0 3.97 3.704 7.281 8.288 7.281H59.08c4.582 0 8.284-3.312 8.284-7.28V27.29c0-3.969-3.702-7.28-8.284-7.28h-8.4c-.66 0-1.194-.537-1.194-1.198 0-.662.534-1.198 1.194-1.198h8.4zM56.928 69.01c.657 0 1.19.536 1.19 1.197 0 .662-.533 1.198-1.19 1.198H12.724c-.657 0-1.19-.536-1.19-1.198 0-.661.533-1.197 1.19-1.197h44.204zm.034-7.194c.65 0 1.176.536 1.176 1.198 0 .661-.526 1.197-1.176 1.197h-8.398c-.65 0-1.176-.536-1.176-1.197 0-.662.527-1.198 1.176-1.198h8.398zm-14.38 0a1.2 1.2 0 011.202 1.198 1.2 1.2 0 01-1.203 1.197H12.737a1.2 1.2 0 01-1.203-1.197 1.2 1.2 0 011.203-1.198h29.844zM36.69 50.254c.982 0 1.778.805 1.778 1.797 0 .992-.796 1.796-1.778 1.796H13.967a1.787 1.787 0 01-1.777-1.796c0-.992.796-1.797 1.777-1.797H36.69zm-18.173-32.64c.66 0 1.195.536 1.195 1.198 0 .661-.535 1.197-1.195 1.197h-6.842c-4.583 0-8.286 3.312-8.286 7.281v13.19c0 .66-.535 1.197-1.195 1.197S1 41.14 1 40.479V27.29c0-5.356 4.83-9.676 10.675-9.676h6.842zM57.69 24.8c3.164 0 5.8 2.357 5.8 5.316 0 .662-.534 1.198-1.194 1.198-.66 0-1.194-.536-1.194-1.198 0-1.57-1.51-2.921-3.412-2.921-.66 0-1.195-.536-1.195-1.198 0-.661.535-1.197 1.195-1.197z" fill="none" stroke="#617994" strokeWidth={2} />  
          <path className="sr-academic-path-draw" d="M86.138 24.788l-8.81 2.366M74.52 4.784l-5.617 7.203m-14.382-2.81L53.825.057" fill="none" stroke="#0154c0" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /> </g>
  </svg>
    },
    {
      id: 'criteria-check',
      title: 'Vérification des Critères d\'Admission',
      svg: <svg viewBox="0 0 120 120">  
      <g transform="translate(1.205266, 1.200000)"> 
          <path className="sr-verif-accent-main-circle" d="M47.863,15.208 C64.356,16.594 76.603,31.088 75.216,47.582 C74.7252688,53.5345381 72.4591664,59.2027553 68.711,63.853 C68.1498787,64.5499833 67.1299834,64.6601212 66.433,64.0989999 C65.7360167,63.5378787 65.6258787,62.5179834 66.187,61.821 C69.5296981,57.6742491 71.5502695,52.6193369 71.987,47.311 C73.225,32.601 62.302,19.672 47.591,18.437 C32.881,17.198 19.953,28.121 18.715,42.831 C17.478,57.541 28.401,70.471 43.113,71.709 C47.656,72.089 52.128,71.319 56.203,69.505 C57.0203814,69.1410444 57.9780443,69.5086186 58.3419999,70.326 C58.7059555,71.1433814 58.3383814,72.1010443 57.521,72.465 C52.9147347,74.5147952 47.8645424,75.3652091 42.841,74.937 C26.346,73.55 14.1,59.053 15.487,42.56 C16.874,26.067 31.37,13.82 47.863,15.208" />
          <path className="sr-verif-accent-details" d="M27.747,50.508 C27.994,51.243 28.289,51.962 28.629,52.665 C28.8872719,53.1867112 28.8457635,53.8068841 28.5202699,54.2895236 C28.1947764,54.7721631 27.6353506,55.043051 27.0548717,54.999106 C26.4743928,54.955161 25.9621241,54.6031407 25.713,54.077 C25.313,53.252 24.967,52.407 24.676,51.542 C24.3907449,50.6939668 24.8469668,49.7752551 25.695,49.49 C26.5430332,49.2047449 27.4617449,49.6609668 27.747,50.509" />
          <path className="sr-verif-accent-details" d="M49.751,23.777 C50.3198181,23.9005762 50.7786109,24.319823 50.9528212,24.875229 C51.1270314,25.4306351 50.989875,26.0368089 50.5935359,26.4631192 C50.1971968,26.8894294 49.6026106,27.0703325 49.036,26.937 C39.218,24.716 29.46,30.874 27.239,40.691 C27.1154238,41.2598181 26.696177,41.7186109 26.140771,41.8928212 C25.5853649,42.0670314 24.9791911,41.929875 24.5528808,41.5335359 C24.1265706,41.1371968 23.9456675,40.5426106 24.079,39.976 C26.695,28.413 38.188,21.161 49.751,23.777" />
          <path className="sr-verif-accent-search-handle" d="M86.784,96.686 C84.9389738,97.9464182 82.422427,97.4804572 81.151,95.643 L62.288,72.892 C61.027856,71.0476836 61.4928453,68.5320069 63.329,67.26 C65.1738891,65.9999581 67.6899356,66.4653798 68.962,68.302 L87.825,91.053 C89.0858222,92.8975078 88.6207759,95.4139402 86.784,96.686" />
          <path className="sr-verif-accents sr-verif-accent1" d="M0,26.452 L8.441,28.857" />
          <path className="sr-verif-accents sr-verif-accent2" d="M40.397,0 L40.397,8.417" />
          <path className="sr-verif-accents sr-verif-accent3" d="M14.471,8.417 L19.294,14.429" /></g>
  </svg>
    },
    {
      id: 'report-generation',
      title: 'Génération du Rapport d\'Éligibilité',
      svg: <svg viewBox="0 0 120 120">
      <g transform="translate(8 17)">
          <path className="sr-report-axis" d="M5.548 77.47h73.449" />
          <path className="sr-report-axis-arrow" d="M77 72.75l4.567 4.422L76 82.47" />
          <path className="sr-report-axis" d="M5.548 37.539v39.931" />
          <path className="sr-report-gray-bars" d="M48.072 37.539c2.5 0 4.548 2.046 4.548 4.548v26.15a4.562 4.562 0 01-4.548 4.548h-8.945a4.561 4.561 0 01-4.548-4.547V42.087a4.561 4.561 0 014.548-4.548zm22.284 11.37a4.561 4.561 0 014.548 4.548v14.78a4.561 4.561 0 01-4.548 4.548h-8.943a4.561 4.561 0 01-4.548-4.547V53.457a4.561 4.561 0 014.548-4.548z" />
          <path className="sr-report-blue-bar" d="M24.725 72.785H15.78a4.561 4.561 0 01-4.548-4.547V27.306a4.561 4.561 0 014.548-4.548h8.944a4.561 4.561 0 014.548 4.548v40.932a4.561 4.561 0 01-4.548 4.547" />
          <path className="sr-report-accents" d="M102.202 38.4l-7.994 2.143m-1.413-17.976l-5.098 6.52m-13.054-3.68l-.63-8.254" /> </g>
  </svg>
    }
  ];

  const AnimatedStep = ({ isActive, step }) => (
        <div className={`sr-svg-anim ${step.id}`} style={{ transition: 'opacity 1s ease-in-out', opacity: isActive ? 1 : 0 }}>
            <div className="Box" style={{ padding: 0, width: 390, height: 390 }}>
                <div role="button" aria-label="animation" tabIndex={0} style={{ width: '100%', height: '100%', overflow: 'hidden', margin: 'auto', outline: 'none' }}> {step.svg} </div>
            </div>
            <div className="phrase-accroche-footer" style={{ opacity: isActive ? 1 : 0, 
                                                            transform: `translateY(${isActive ? 0 : 20}px)`, 
                                                            transition: 'opacity 1s ease-in-out',
                                                            //  animation: 'fadeInOut 3s infinite',
                                                             marginTop: '20px' }}> {step.title} </div>
        </div>
  );

  useEffect(() => {
    const totalSteps = 4;
    let stepInterval;

    if (currentStep < totalSteps - 1) {
      stepInterval = setInterval(() => {
        setCurrentStep((prevStep) => prevStep + 1);
      }, 3000);
    }

    return () => clearInterval(stepInterval);
  }, [currentStep]);

  return (
    <div className="Body-container container-fluid p-0" style={{ paddingTop: 80 }}>
      <div className="widget-container widget-funnel-mrh">
        <div className="theme-wrapper theme-daisy">
          <div className="funnel MrhTunnel">
            <div className="app-container">
              <div className="app-md">
                <div className="WaitingReassurance">
                  <div className="WaitingReassurance-loader">
                    <div className="Box" style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'column',
                      padding: '100px 0px',
                      transition: 'opacity 1s ease-in-out',
                      opacity: 1,
                    }}>
                      <div className="phrase-accroche">
                        Nous trouvons la meilleure combinaison parmi 500+ formations et 100+ critères
                      </div>
                      
                      <div style={{ position: 'relative', height: '450px' }}>
                        {STEPS.map((step, index) => (
                          currentStep === index && (
                            <AnimatedStep 
                              key={step.id}
                              step={step}
                              isActive={currentStep === index}
                            />
                          )
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="theme-daisy">
                    <footer id="Footer" className="FunnelFooter ProgressBarActive">
                        <div className="FunnelFooter-ctas"> <span className="CTA link  medium      " title="" data-trackingprefix=""> En savoir plus sur notre service de comparaison </span> <span id="FunnelFooter-toggle" className="CTA link  medium   icon-lesfurets   after icon-arrow-up  " title="" data-trackingprefix=""> Afficher les mentions légales </span> </div>
                        <div className="FunnelFooter-content">
                            <p> Wendogo.com utilise des cookies pour optimiser votre expérience en ligne. En continuant la navigation sur notre site, vous acceptez l'utilisation des cookies. Pour en savoir plus, consultez la{" "} <span className="CTA link  medium      " title="" data-trackingprefix=""> Politique des cookies </span> . </p>
                            <p> Nous prenons soin de vos données personnelles, consultez la{" "} <span className="CTA link  medium      " title="" data-trackingprefix=""> Charte de protection des données personnelles </span> . </p>
                            <p> La position de n°1 des comparateurs indépendants du site Wendogo.comse justifie en raison du nombre de partenaires assureurs et courtiers présents sur notre outil de comparaison. </p>
                            <p> <span className="CTA link  medium      " title="" data-trackingprefix=""> En savoir plus sur les Conditions Générales d’Utilisation </span> </p>
                        </div>
                    </footer>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimulationResultWaiting;
