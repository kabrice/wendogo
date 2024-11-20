'use client';

import { useState} from 'react';
import Link from 'next/link';
import FlightSimilution from '../../../assets/simulation_icons/aeroplane_simulation.png'
import Footer from '../../../components/Footer';
import HeaderMenuLoginBar from '../../../components/HeaderMenuLoginBar';
import Marseille from '../../../assets/partner_logos/logo-marseille.png'
import Toulouse from '../../../assets/partner_logos/logo-toulouse.jpeg'
import AmbassadeFrance from '../../../assets/partner_logos/logo-ambassade_de_France_au_Brésil.svg'
import ParisSclay from '../../../assets/partner_logos/logo-paris-saclay.svg'
import CampusFrance from '../../../assets/partner_logos/logo-campus-france.png'
import Sorbonne from '../../../assets/partner_logos/logo-sorbonne.svg'
import UPHF from '../../../assets/partner_logos/logo-uphf.svg'
import Quebec from '../../../assets/partner_logos/logo-Québec.png'
import USB from '../../../assets/partner_logos/logo-USB-site-parallel.png'
import Ottawa from '../../../assets/partner_logos/logo-université_ottawa.svg'
import Montreal from '../../../assets/partner_logos/logo-Universite_de_Montreal.svg'
import AmbassadeCanada from '../../../assets/partner_logos/logo-ambassade_canada.svg'
import helper from '../../../utils/Helper';
import {useUpdateUserMutation} from '../../../store/apis/userApi'
import { activateSpinner, deactivateSpinner } from '../../../redux/spinnerslice'
import { setUser } from '../../../redux/userSlice';
import { useDispatch, useSelector } from 'react-redux'
import Image from 'next/image';
import { useEffect } from 'react';
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic';
import { Loader2 } from "lucide-react";
const KeepInTouch = dynamic(() => import('../../ressources/KeepInTouch'), {
  loading: () => <div className="flex items-center justify-center min-h-[200px]">
                  <Loader2 className="w-8 h-8 animate-spin" />
                </div>
});


function SimulationCountrySelection(){
  
    const user = useSelector((state) => state.user); 
    const [isLoaded, setIsLoaded] = useState(false);
    const [isKeepInTouch, setIsKeepInTouch] = useState(false);
    const [isErrorPage, setIsErrorPage] = useState(false);
    const router = useRouter();
    const dispatch = useDispatch();
    const [updateUser] = useUpdateUserMutation();

    useEffect(() => {
      console.log('Current user state:', user);
      console.log('Current subscription_step:', user?.subscription_step);
      setIsLoaded(true);
      // Remove the redirection check from here
    }, []);
    

    // Don't render anything until client-side data is loaded
    if (!isLoaded) {
      return null; // or a loading spinner
    }

    async function handleCountrySelection(event, countryIso2) {
      event.preventDefault();
      
      if (countryIso2 === 'CA') {
        setIsKeepInTouch(true);
        return;
      }
    
      try {
        dispatch(activateSpinner());
        
        // First update the user data
        const updatedUser = {
          ...user,
          subscription_step: '/simulation/engine?country=' + countryIso2
        };
    
        // Update Redux and localStorage before making the API call
        dispatch(setUser(updatedUser));
        helper.setLocalStorageWithExpiration('wendogouser', updatedUser);
    
        // Make the API call
        await updateUser(updatedUser);
        
        // Only redirect after everything is successful
        dispatch(deactivateSpinner());
        router.push('/simulation/engine?country=' + countryIso2);
        
      } catch (error) {
        dispatch(deactivateSpinner());
        helper.triggerToastError(error);
        
        // Optionally reset the user state if the API call fails
        const originalUser = { ...user };
        dispatch(setUser(originalUser));
        helper.setLocalStorageWithExpiration('wendogouser', originalUser);
      }
    }

    return  <>{helper.redirectionAtInit(router, user, '/simulation/country/selection', '/simulation/home') && <div>     
              <HeaderMenuLoginBar/>
              {isErrorPage ?
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
                    </main> :
                    (isKeepInTouch ? <KeepInTouch setIsError={setIsErrorPage}  
                                             setIsKeepInTouch={setIsKeepInTouch}
                                             title = "Simulateur visa Canada - Bientôt disponible | Inscrivez-vous à la liste prioritaire et soyez informé(e) en avant-première de son lancement"
                                             typeRequest="VISA_CANADA"
                                             /> :
              <div className="" id="AppWrapper">
                <div className="MuiBox-root css-0" data-testid="hpTopLayer">
                  <div className="MuiBox-root css-0" style={{ background: "#0154c0" }}>
                    <div className="MuiContainer-root MuiContainer-maxWidthLg css-1qsxih2">
                      <div className="MuiGrid2-root MuiGrid2-container MuiGrid2-direction-xs-row css-18ua6wv">
                        <div className="MuiGrid2-root MuiGrid2-direction-xs-row MuiGrid2-grid-lg-7 css-l6nsnf">
                          <div className="MuiBox-root css-5jeyyy" style={{color: 'white'}}>
                            <div className="MuiBox-root css-154cqt3" data-testid="Toplayer-text">
                              <svg width={25} height={27} fill="none" xmlns="http://www.w3.org/2000/svg" className="css-jmoym6">
                                <path fillRule="evenodd" clipRule="evenodd" d="M16.668.465c.686 4.268 2.91 6.43 6.997 6.8a.55.55 0 0 1 .493.55.55.55 0 0 1-.485.555c-4.142.443-6.361 2.6-6.983 6.79a.545.545 0 0 1-.534.472h-.001a.545.545 0 0 1-.533-.474c-.578-4.032-2.686-6.184-6.633-6.772a.55.55 0 0 1-.463-.548.55.55 0 0 1 .46-.55c3.965-.613 6.067-2.777 6.615-6.81a.537.537 0 0 1 1.067-.014ZM6.662 14.59c.56 3.492 2.38 5.26 5.725 5.564a.45.45 0 0 1 .402.45.45.45 0 0 1-.396.454c-3.389.362-5.205 2.127-5.714 5.555a.446.446 0 0 1-.436.386h-.001a.446.446 0 0 1-.436-.388c-.473-3.298-2.198-5.059-5.428-5.54A.45.45 0 0 1 0 20.624a.45.45 0 0 1 .376-.45c3.245-.502 4.965-2.273 5.412-5.572a.44.44 0 0 1 .873-.011Z" fill="white" />
                              </svg>
                              <div className="BlocOutils__Title-sc-10c9hjh-3 wniqW" id="avec-lesfurets-comparer-cest-gagner"> Avec Wendogo, simuler, c'est gagner. </div>
                              <p>Où voulez-vous voyager?</p>
                            </div>
                            <div className="MuiStack-root css-j7qwjs">
                              <div className="MuiGrid2-root MuiGrid2-container MuiGrid2-direction-xs-row css-sljwc1">
                                <div className="MuiGrid2-root MuiGrid2-direction-xs-row MuiGrid2-grid-xs-1 css-1vad3iu" >
                                  <div className="MuiTypography-root MuiTypography-inherit MuiLink-root MuiLink-underlineNone ButtonProduct css-1av9as7" style={{textDecoration:'none'}} title="Simulez une demande de visa pour la France" data-testid="hpTopLayerButtonProduct-emprunteur"   onClick={(e) => {
                                          e.preventDefault(); // Prevent immediate navigation
                                          handleCountrySelection(e, 'FR');
                                        }}>
                                    <div className="MuiStack-root css-2gjs0d">
                                      <div className="MuiStack-root css-w1kzse">
                                        <div className="MuiBox-root css-68zbsl">
                                        <svg width="170px" height="122.777778px" viewBox="0 0 170 122.777778" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                                          <title>flag-for-flag-france-svgrepo-com</title>
                                          <g id="Page-1" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                                          <g id="flag-for-flag-france-svgrepo-com" fillRule="nonzero">
                                                    <path d="M170,103.888889 C170,114.320934 161.543156,122.777778 151.111111,122.777778 L113.333333,122.777778 L113.333333,0 L151.111111,0 C161.543156,0 170,8.45684361 170,18.8888889 L170,103.888889 Z" id="Path" fill="#ED2939"></path>
                                                    <path d="M18.8888889,0 C8.45684361,0 0,8.45684361 0,18.8888889 L0,103.888889 C0,114.320934 8.45684361,122.777778 18.8888889,122.777778 L56.6666667,122.777778 L56.6666667,0 L18.8888889,0 Z" id="Path" fill="#002495"></path>
                                                    <polygon id="Path" fill="#EEEEEE" points="56.6666667 0 113.333333 0 113.333333 122.777778 56.6666667 122.777778"></polygon>
                                            </g>
                                          </g>
                                        </svg>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="MuiGrid2-root MuiGrid2-direction-xs-row MuiGrid2-grid-xs-1 css-1vad3iu">
                                  <span className="MuiTypography-root MuiTypography-inherit MuiLink-root MuiLink-underlineNone ButtonProduct css-1av9as7" title="Simulez une demande de visa pour le Canada" style={{textDecoration:'none'}} data-testid="hpTopLayerButtonProduct-energie" onClick={(e)=>handleCountrySelection(e, 'CA')}>
                                    <div className="MuiStack-root css-2gjs0d">
                                      <div className="MuiStack-root css-w1kzse">
                                        <div className="MuiBox-root css-68zbsl">
                                        <svg width="170px" height="122.777778px" viewBox="0 0 170 122.777778" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                                          <title>flag-for-flag-canada-svgrepo-com</title>
                                          <g id="Page-1" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                                            <g id="flag-for-flag-canada-svgrepo-com" fillRule="nonzero">
                                              <path d="M18.8888889,0 C8.45684361,0 0,8.45684361 0,18.8888889 L0,103.888889 C0,114.320934 8.45684361,122.777778 18.8888889,122.777778 L47.2222222,122.777778 L47.2222222,0 L18.8888889,0 Z M151.111111,0 L122.777778,0 L122.777778,122.777778 L151.111111,122.777778 C161.543156,122.777778 170,114.320934 170,103.888889 L170,18.8888889 C170,8.45684361 161.543156,0 151.111111,0 Z" id="Shape" fill="#D52B1E" />
                                              <polygon id="Path" fill="#EEEEEE" points="47.2222222 0 122.777778 0 122.777778 122.777778 47.2222222 122.777778" />
                                              <path d="M87.9041667,80.8113889 C93.5613889,81.4677778 98.6330556,82.0580556 104.285556,82.705 L102.845278,77.9733333 C102.628802,77.1415134 102.923164,76.2602782 103.596111,75.7255556 L120.024722,62.3427778 L116.624722,60.7419444 C115.127778,60.2083333 115.538611,59.3630556 116.081667,57.3325 L118.589167,48.1902778 L109.045556,50.2066667 C108.115278,50.3483333 107.496667,49.7580556 107.355,49.1913889 L106.1225,44.8894444 L98.5763889,53.3611111 C97.5044444,54.7211111 95.3322222,54.7211111 96.0075,51.5855556 L99.2327778,34.425 L94.9025,36.6680556 C93.6888889,37.3480556 92.4752778,37.4613889 91.8,36.2477778 L85.8263889,25.075 L85.8263889,25.3536111 L85.8263889,25.075 L79.8527778,36.2477778 C79.1727778,37.4613889 77.9591667,37.3480556 76.7455556,36.6680556 L72.42,34.425 L75.6452778,51.5855556 C76.3252778,54.7211111 74.1483333,54.7211111 73.0763889,53.3611111 L65.5302778,44.8941667 L64.3025,49.1961111 C64.1608333,49.7627778 63.5375,50.3530556 62.6072222,50.2113889 L53.0636111,48.195 L55.5711111,57.3372222 C56.1047222,59.3677778 56.5202778,60.2130556 55.0233333,60.7466667 L51.6233333,62.3475 L68.0519444,75.7302778 C68.7036111,76.2355556 69.0341667,77.1469444 68.7980556,77.9780556 L67.3577778,82.7097222 L83.7438889,80.8161111 C84.2444444,80.8161111 84.575,81.0947222 84.5702778,81.6708333 L83.5597222,99.1619444 L88.0741667,99.1619444 L87.0683333,81.6708333 C87.0777778,81.09 87.4036111,80.8113889 87.9041667,80.8113889 L87.9041667,80.8113889 Z" id="Path" fill="#D52B1E" />
                                            </g>
                                          </g>
                                        </svg>
                                        </div>
                                      </div>
                                    </div>
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="MuiGrid2-root MuiGrid2-direction-xs-row MuiGrid2-grid-lg-5 css-b3qpfd">
                          <div className="MuiStack-root css-qfdd9t">
                            <div className="MuiBox-root css-jodbou">
                              <Image alt="Hervé et François" data-testid="image" fetchpriority="high" width={1012} height={800} decoding="async" data-nimg={1} src={FlightSimilution} style={{ color: "transparent", maxWidth: "100%", height: "auto" }} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <section className="MuiBox-root css-1l2p5s5">
                  <div className="MuiContainer-root MuiContainer-maxWidthLg css-mqwbo7">
                    <div className="MuiBox-root css-1elugxe">
                      <div className="MuiGrid2-root MuiGrid2-container MuiGrid2-direction-xs-row css-dqwxtq" data-testid="ResponsiveColumns-defaultId">
                        <div className="MuiGrid2-root MuiGrid2-direction-xs-row MuiGrid2-grid-xs-1 css-1ybtui8">
                          <div className="MuiStack-root css-1pnbe7o">
                            <div className="MuiStack-root css-1atgupc">
                              <div className="MuiBox-root css-1djk9xt">
                                <div className="MuiTypography-root MuiTypography-h3 MuiTypography-gutterBottom css-194x3sx" id="">
                                <svg viewBox="0 0 52.4 50.1">
                                  <path d="M51.5 10.6L26.8.1c-.4-.1-.8-.1-1.2 0L.9 10.6c-.7.3-1 1-.9 1.7.1.7.8 1.2 1.5 1.2h2.8V17c0 .8.7 1.5 1.5 1.5h8.9v18.8h-3.9V22.2c0-.8-.7-1.5-1.5-1.5s-1.5.7-1.5 1.5v15.1h-2c-.8 0-1.5.7-1.5 1.5v1.4c0 .8.7 1.5 1.5 1.5s1.4-.6 1.5-1.4h37.8v2H43c-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5h5.1v1.8H4.4v-1.8h31.8c.8 0 1.5-.7 1.5-1.5s-.7-1.5-1.5-1.5H2.9c-.8 0-1.5.7-1.5 1.5v4.8c0 .8.7 1.5 1.5 1.5h46.7c.8 0 1.5-.7 1.5-1.5v-4.8c0-.8-.7-1.5-1.5-1.5h-1.5v-3.5c0-.8-.7-1.5-1.5-1.5H38V18.5h4v14.7c0 .8.7 1.5 1.5 1.5S45 34 45 33.2V18.5h1.7c.8 0 1.5-.7 1.5-1.5v-1.4c0-.8-.7-1.5-1.5-1.5s-1.4.6-1.5 1.4H7.3v-2h43.5c.7 0 1.3-.5 1.5-1.2.2-.8-.2-1.5-.8-1.7zm-33.8 7.9H25v18.8h-7.2V18.5zm17.4 18.8H28V18.5h7.1v18.8zM8.9 10.4l17.3-7.3 17.3 7.3H8.9z" />
                                </svg>
                                </div>
                              </div>
                              <p className="MuiTypography-root MuiTypography-body1 MuiTypography-paragraph css-1889afe"> Simulation basée sur <b>600+</b> tokens</p>
                            </div>
                          </div>
                        </div>
                        <div className="MuiGrid2-root MuiGrid2-direction-xs-row MuiGrid2-grid-xs-1 css-1ybtui8">
                          <div className="MuiStack-root css-1pnbe7o">
                            <div className="MuiStack-root css-1atgupc">
                              <div className="MuiBox-root css-1djk9xt">
                                <div className="MuiTypography-root MuiTypography-h3 MuiTypography-gutterBottom css-194x3sx" id="">
                                <svg viewBox="0 0 35 34.7">
                                  <path className="ic_time_left_svg__st0" d="M21 31.7c-.3.1-.6.1-.9.2-.8.1-1.3.9-1.1 1.6.1.8.9 1.3 1.6 1.1.3-.1.7-.1 1-.2.7-.2 1.2-1 1-1.7-.1-.7-.8-1.1-1.6-1zM31.4 12.9c.3.7 1.1 1.1 1.8.9.7-.3 1.1-1 .9-1.7-.1-.3-.2-.7-.4-1-.3-.7-1.1-1.1-1.8-.8s-1.1 1.1-.8 1.8c.1.2.2.5.3.8zM25.6 29.7c-.2.2-.5.3-.8.5-.7.4-1 1.2-.6 1.9s1.2 1 1.9.6c0 0 .1 0 .1-.1l.9-.6c.6-.4.8-1.3.4-2-.4-.5-1.3-.7-1.9-.3zM35 16.8c0-.8-.7-1.4-1.5-1.3-.8 0-1.4.7-1.4 1.5v.9c0 .8.6 1.4 1.4 1.5.8 0 1.4-.6 1.5-1.4v-1.2zM31.2 26c-.6-.5-1.5-.3-2 .3-.2.2-.4.5-.6.7-.5.6-.4 1.5.2 2l.1.1c.6.4 1.4.3 1.9-.2.2-.3.5-.6.7-.8.4-.7.3-1.6-.3-2.1zM33.3 20.9c-.7-.2-1.5.2-1.8.9-.1.3-.2.6-.3.8-.3.7.1 1.5.9 1.8.7.2 1.5-.1 1.8-.8.1-.3.2-.7.3-1 .2-.6-.2-1.4-.9-1.7zM14.9 31.9a15 15 0 01-3.6-1.1c-.3-.1-.5-.3-.8-.4L9 29.5C2.4 24.8.8 15.7 5.5 9c1-1.4 2.2-2.6 3.6-3.6h.1C14.1 2 20.6 2 25.6 5.3l-1.1 1.6c-.3.4-.1.8.4.7l4.8-.4c.4 0 .8-.4.7-.8v-.2l-1.3-4.6c-.1-.6-.5-.7-.8-.2L27.2 3C23.5.5 18.9-.5 14.5.3c-.4.1-.9.2-1.3.3h-.1C9.3 1.5 5.9 3.8 3.5 7l-.1.1c0 .1-.1.2-.2.3-.1.2-.2.4-.4.6v.1c-2 3-2.9 6.6-2.8 10.2 0 .4 0 .7.1 1.1v.1c0 .4.1.7.2 1.1.6 3.6 2.3 6.9 4.9 9.4.7.7 1.4 1.3 2.2 1.9 2.1 1.5 4.5 2.5 7 2.9.8.1 1.5-.4 1.6-1.2.1-.8-.4-1.5-1.1-1.7z"></path><path className="ic_time_left_svg__st0" d="M16.6 6.1c-.6 0-1.1.5-1.1 1.1v11.3L25.8 24c.6.3 1.2.1 1.5-.5s.1-1.2-.5-1.5l-9.1-4.7v-10c.1-.7-.5-1.2-1.1-1.2z"></path>
                                </svg>
                                </div>
                              </div>
                              <p className="MuiTypography-root MuiTypography-body1 MuiTypography-paragraph css-1889afe"> Moins de <b>10 minutes</b> </p>
                            </div>
                          </div>
                        </div>
                        <div className="MuiGrid2-root MuiGrid2-direction-xs-row MuiGrid2-grid-xs-1 css-1ybtui8">
                          <div className="MuiStack-root css-1pnbe7o">
                            <div className="MuiStack-root css-1atgupc">
                              <div className="MuiBox-root css-1djk9xt">
                                <div className="MuiTypography-root MuiTypography-h3 MuiTypography-gutterBottom css-194x3sx" id="-de-100-marques"> 
                                  <svg viewBox="0 0 48.032 51.889">
                                    <path d="M42.409 6.33h-.383v2.669h.381a2.963 2.963 0 012.955 2.953v20.111H2.672V11.952a2.963 2.963 0 012.955-2.955h.382V6.328h-.382A5.64 5.64 0 000 11.952v24.78a5.639 5.639 0 005.624 5.62h11.427l-1.373 6.865h-4.623a1.336 1.336 0 000 2.672h26.686a1.336 1.336 0 000-2.672h-4.625l-1.374-6.865h10.667a5.637 5.637 0 005.622-5.623V11.952a5.638 5.638 0 00-5.622-5.622zM18.401 49.218l1.377-6.866h9.246l1.374 6.861zm26.961-14.485v2a2.962 2.962 0 01-2.954 2.952H5.624a2.964 2.964 0 01-2.952-2.951v-2z"></path><path d="M9.52 30.799l.4.024V4.23a1.635 1.635 0 011.633-1.634h25.374a1.361 1.361 0 011.36 1.36v26.941l.375.007c.607.011 1.215.031 1.822.058l.4.018V3.956A3.96 3.96 0 0036.928 0h-25.37a4.234 4.234 0 00-4.23 4.23v26.537l.392-.011a20.5 20.5 0 011.8.043z"></path><path d="M14.439 9.603h9.962a1.3 1.3 0 000-2.6h-9.962a1.3 1.3 0 000 2.6zM27.059 16.995a1.248 1.248 0 00-1.188-1.3H14.439a1.3 1.3 0 000 2.6h11.434a1.249 1.249 0 001.186-1.3zM14.439 24.657a1.3 1.3 0 000 2.6h8.384a1.3 1.3 0 000-2.6zM35.039 5.601a1.328 1.328 0 00-1.835 0L31.27 7.534l-.329-.338a1.292 1.292 0 00-.916-.392 1.4 1.4 0 00-.919.368 1.3 1.3 0 00-.024 1.835l1.247 1.28a1.31 1.31 0 00.93.392 1.289 1.289 0 00.918-.38l2.863-2.863a1.3 1.3 0 00-.001-1.835zM35.039 13.753a1.328 1.328 0 00-1.835 0l-1.934 1.933-.329-.338a1.3 1.3 0 00-1.86 1.811l1.247 1.28a1.31 1.31 0 00.93.392 1.292 1.292 0 00.918-.38l2.863-2.863a1.3 1.3 0 000-1.835zM33.203 22.735l-1.933 1.933-.329-.338a1.3 1.3 0 00-1.86 1.812l1.247 1.28a1.313 1.313 0 00.93.392 1.292 1.292 0 00.918-.38l2.863-2.863a1.3 1.3 0 000-1.836 1.329 1.329 0 00-1.836 0z"></path>
                                    <circle cx="1.729" cy="1.729" r="1.729" transform="translate(22.523 35.544)"></circle>
                                  </svg>
                                </div>
                              </div>
                              <p className="MuiTypography-root MuiTypography-body1 MuiTypography-paragraph css-1889afe"> 100% <b>en ligne</b> et <b>sécurisé</b> </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
                <div className="slider">
                <div className="slide-track">
                <div className="slide">
                  <Image src={Marseille} height="150" width="150" alt="Marseille" />
                  </div>
                  <div className="slide">
                  <Image src={Toulouse} height="150" width="150" alt="Toulouse" />
                  </div>
                  <div className="slide">
                    <AmbassadeFrance height="150" width="150"/>
                  {/* <Image src={AmbassadeFrance} height="150" width="150" alt="AmbassadeFrance" /> */}
                  </div>
                  <div className="slide">
                    <ParisSclay height="150" width="150"/>
                  {/* <Image src={ParisSclay} height="150" width="150" alt="ParisSclay" /> */}
                  </div>
                  <div className="slide">
                  <Image src={CampusFrance} height="150" width="150" alt="CampusFrance" />
                  </div>
                  <div className="slide">
                  {/* <Image src={Sorbonne} height="150" width="150" alt="Sorbonne" /> */}
                  <Sorbonne height="150" width="150"/>
                  </div>
                  <div className="slide">
                    <UPHF height="150" width="150"/>
                  {/* <Image src={UPHF} height="150" width="150" alt="UPHF" /> */}
                  </div>
                  <div className="slide">
                  <Image src={Quebec} height="150" width="150" alt="Quebec" />
                  </div>
                  <div className="slide">
                  <Image src={USB} height="150" width="150" alt="USB" />
                  </div>
                  <div className="slide">
                    <Ottawa height="150" width="150"/>
                  {/* <Image src={Ottawa} height="150" width="150" alt="Ottawa" /> */}
                  </div>
                  <div className="slide">
                    <Montreal height="150" width="150"/>
                  {/* <Image src={Montreal} height="150" width="150" alt="Montreal" /> */}
                  </div>
                  <div className="slide">
                  <AmbassadeCanada height="150" width="150"/>
                  {/* <Image src={AmbassadeCanada} height="150" width="150" alt="AmbassadeCanada" /> */}
                  </div>
                  <div className="slide">
                  <Image src={Marseille} height="150" width="150" alt="Marseille" />
                  </div>
                  <div className="slide">
                    <AmbassadeFrance height="150" width="150"/>
                  {/* <Image src={AmbassadeFrance} height="150" width="150" alt="AmbassadeFrance" /> */}
                  </div>
                </div>
              </div>
              </div>)}
              <Footer/>                    
          </div>}</>

}

export default SimulationCountrySelection
