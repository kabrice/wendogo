'use client';

import { useState, useEffect} from 'react';
import ImmigrateToCanadaImg from '../assets/optimized/immigrate_to_canada.webp'
import BorisHead from '../assets/optimized/Boris_head.webp'
import QuestionsOnTopic from '../components/QuestionsOnTopic';

import Link from 'next/link';

import Footer from '../components/Footer';
import HeaderMenuBar from '../components/HeaderMenuBar';
import Head from 'next/head';
// import Link from 'next/link';
// import Nav from "./Nav";
import helper from '../utils/Helper';
import Image from 'next/image';

function ImmigrateToCanada(){
    const whatsapp =  <svg className="ButtonLinkstyles__Picto-sc-1s2ygn0-1 hkJOZg" width="24px" height="24.6350302px" viewBox="0 0 24 24.6350302" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                        <title>whatsapp</title>
                        <g id="Page-1" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                          <g id="whatsapp" fill="#000000" fillRule="nonzero">
                            <g id="Group">
                              <path d="M19.0129422,14.1328732 L16.6488352,12.4072476 C16.3520276,12.1898188 15.986195,12.1000863 15.6203624,12.1587575 C15.2545298,12.2139776 14.9335634,12.4106989 14.7195858,12.7075065 L13.9879206,13.7083693 C13.9499569,13.7601381 13.9637619,13.7118205 13.9465056,13.7773943 C13.9430544,13.7842968 13.9016393,13.8395168 13.7704918,13.8602243 C13.5496117,13.8947368 12.8869715,13.8533218 11.4547023,12.7075065 L11.3166523,12.6074202 C9.80845557,11.6031061 9.56686799,10.9853322 9.53235548,10.7644521 C9.51509922,10.6505608 9.54270923,10.5953408 9.53925798,10.5918896 C9.5875755,10.5608283 9.57377049,10.5608283 9.61173425,10.5125108 L10.3433995,9.51164797 C10.5608283,9.21484038 10.6505608,8.84900777 10.5918896,8.48317515 C10.5332183,8.11734254 10.3399482,7.79637619 10.0431406,7.57894737 L7.63761864,5.82226057 C7.02329594,5.37359793 6.15703192,5.50819672 5.70836928,6.12251941 L4.96980155,7.13718723 C4.3175151,8.03106126 4.14150129,9.25280414 4.51078516,10.3295945 C5.08024159,11.9896462 6.53321829,13.7532355 8.83175151,15.5754961 C8.86281277,15.6134599 8.89732528,15.6445211 8.93874029,15.6755824 C8.99741156,15.7169974 9.05608283,15.7584124 9.1147541,15.7963762 C9.16997412,15.8412425 9.22864538,15.8826575 9.2838654,15.9275237 C9.32182916,15.958585 9.36669543,15.9827437 9.41156169,16 C11.848145,17.6324418 13.9706644,18.4779983 15.7273512,18.515962 C15.7515099,18.515962 15.7722174,18.515962 15.7963762,18.515962 C16.8869715,18.515962 17.9257981,17.9810181 18.5849871,17.0733391 L19.3235548,16.0586713 C19.5409836,15.7618637 19.6307161,15.3960311 19.5720449,15.0301984 C19.5133736,14.6643658 19.3097498,14.350302 19.0129422,14.1328732 Z M18.4779983,15.4512511 L17.7394305,16.4659189 C17.2631579,17.1182053 16.5142364,17.4943917 15.7377049,17.4805867 C14.6229508,17.456428 12.6798965,16.9974116 9.71527179,14.9611734 C6.87489215,12.7592752 5.84296808,11.0474547 5.48058671,9.99482312 C5.21829163,9.23554789 5.33908542,8.37273512 5.79810181,7.74805867 L6.54012079,6.73339085 C6.59534081,6.65746333 6.67471959,6.60914582 6.76445211,6.59534081 C6.85418464,6.58153581 6.94736842,6.60224331 7.02329594,6.65746333 L9.42881795,8.41415013 C9.50474547,8.46937015 9.55306299,8.54874892 9.56686799,8.63848145 C9.58067299,8.72821398 9.55996549,8.82139776 9.50474547,8.89732528 L8.797239,9.86712683 C8.63157895,10.0465919 8.4659189,10.3744607 8.4935289,10.7886109 C8.54874892,11.6203624 9.2838654,12.4935289 10.7264884,13.4529767 L10.8300259,13.525453 C12.1967213,14.6194996 13.2562554,15.0543572 14.0638481,14.8507334 C14.4676445,14.7506471 14.7299396,14.4952545 14.8507334,14.281277 L15.5582399,13.3114754 C15.6686799,13.1561691 15.8861087,13.1251079 16.041415,13.2355479 L18.405522,14.9611734 C18.4814495,15.0163934 18.529767,15.0957722 18.543572,15.1855047 C18.5539258,15.285591 18.5332183,15.3787748 18.4779983,15.4512511 Z" id="Shape" />
                              <path d="M12,-6.13065346e-16 C5.38395168,-6.13065346e-16 0,5.38395168 0,12 C0,14.8369284 1.00086281,17.5703192 2.82657463,19.7308024 L0.697152718,23.8826575 C0.603968939,24.0655738 0.628127696,24.2899051 0.759275237,24.4486626 C0.859361519,24.5694564 1.00776531,24.6350302 1.15616911,24.6350302 C1.20448663,24.6350302 1.25625539,24.6281277 1.30457291,24.6143227 L7.01639344,22.9163072 C8.58671268,23.6341674 10.2605695,23.9965487 12,23.9965487 C18.6160483,23.9965487 24,18.6125971 24,11.9965487 C24,5.38050043 18.6160483,-6.13065346e-16 12,-6.13065346e-16 Z M12,22.9611734 C10.350302,22.9611734 8.76272649,22.6022433 7.27868852,21.8947368 C7.16134599,21.8395168 7.03019845,21.8291631 6.90940466,21.8671268 L2.17083693,23.2752373 L3.90681622,19.88956 C4.00345125,19.6997412 3.97584124,19.4685073 3.8308887,19.3062985 C2.02933563,17.2942192 1.03537532,14.6954271 1.03537532,11.9965487 C1.03537532,5.94995686 5.95340811,1.03192407 12,1.03192407 C18.0465919,1.03192407 22.9646247,5.94995686 22.9646247,11.9965487 C22.9646247,18.0431406 18.0465919,22.9611734 12,22.9611734 Z" id="Shape" />
                            </g>
                          </g>
                        </g>
                      </svg>
    const facebook = <svg className="ButtonLinkstyles__Picto-sc-1s2ygn0-1 hkJOZg"  width="24px" height="24px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                      <title>svgviewer-output</title>
                      <g id="Page-1" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                        <g id="svgviewer-output" fill="#000000" fillRule="nonzero">
                          <path d="M17.76,0 L6.24,0 C2.79374316,0 0,2.79374316 0,6.24 L0,17.76 C0,21.2062568 2.79374316,24 6.24,24 L17.76,24 C21.2062568,24 24,21.2062568 24,17.76 L24,6.24 C24,2.79374316 21.2062568,0 17.76,0 L17.76,0 Z M12.48,23.04 L12.48,14.88 C12.48,14.6149033 12.2650967,14.4 12,14.4 L9.6,14.4 L9.6,11.52 L12,11.52 C12.2650967,11.52 12.48,11.3050967 12.48,11.04 L12.48,7.2 C12.48,5.8745166 13.5545166,4.8 14.88,4.8 L18.72,4.8 L18.72,7.68 L16.8,7.68 C16.00471,7.68 15.36,8.32470996 15.36,9.12 L15.36,11.04 C15.36,11.3050967 15.5749033,11.52 15.84,11.52 L18.72,11.52 L18.72,14.4 L15.84,14.4 C15.5749033,14.4 15.36,14.6149033 15.36,14.88 L15.36,23.04 L12.48,23.04 Z M23.04,17.76 C23.04,20.6760635 20.6760635,23.04 17.76,23.04 L16.32,23.04 L16.32,15.36 L19.2,15.36 C19.4650967,15.36 19.68,15.1450967 19.68,14.88 L19.68,11.04 C19.68,10.7749033 19.4650967,10.56 19.2,10.56 L16.32,10.56 L16.32,9.12 C16.32,8.85490332 16.5349033,8.64 16.8,8.64 L19.2,8.64 C19.4650967,8.64 19.68,8.42509668 19.68,8.16 L19.68,4.32 C19.68,4.05490332 19.4650967,3.84 19.2,3.84 L14.88,3.84 C13.0243232,3.84 11.52,5.34432324 11.52,7.2 L11.52,10.56 L9.12,10.56 C8.85490332,10.56 8.64,10.7749033 8.64,11.04 L8.64,14.88 C8.64,15.1450967 8.85490332,15.36 9.12,15.36 L11.52,15.36 L11.52,23.04 L6.24,23.04 C3.32393652,23.04 0.96,20.6760635 0.96,17.76 L0.96,6.24 C0.96,3.32393652 3.32393652,0.96 6.24,0.96 L17.76,0.96 C20.6760635,0.96 23.04,3.32393652 23.04,6.24 L23.04,17.76 Z" id="Shape" />
                        </g>
                      </g>
                    </svg>
    const [isCopied1, setIsCopied1] = useState(false);
    const [isCopied2, setIsCopied2] = useState(false);

    async function copyTextToClipboard(linkNum) {
      try {
        await navigator.clipboard.writeText("https://wendogo.com/immigrate-to-canada")
        setIsCopied1(linkNum === 1)
        setIsCopied2(linkNum === 2)
      } catch (error) {
        console.log('error copyTextToClipboard', error)
      }
    }  
    useEffect(() => {
      helper.loadFacebookSDK() }, [])
    return <div className="klmqdo">
            <Head>
              <meta property="og:url"           content="https://wendogo.com/immigrate-to-canada" />
              <meta property="og:type"          content="article" />
              <meta property="og:title"         content="9 façons d'immigrer au Canada en 2024" />
              <meta property="og:description"   content="Immigrer au Canada peut s'avérer compliqué. On vous presente les différents modes d'immigration afin de mieux vous préparer." />
              <meta property="og:image"         content={'https://wendogo.com'+ImmigrateToCanadaImg} /> 
              <title>9 façons d'immigrer au Canada en 2024</title>
              <meta name="description"          content="Immigrer au Canada peut s'avérer compliqué. On vous presente les différents modes d'immigration afin de mieux vous préparer."/>
            </Head>        
            <HeaderMenuBar/>
    
            <div className='container-24' style={{maxWidth: 'inherit'}}>
              <div style={{ outline: "none" }} tabIndex={-1} id="gatsby-focus-wrapper">
                <div>

                  <div className="styles__BreadcrumbContainer-sc-kz84w6-2 djdJxZ">
                    <div className="styles__Wrapper-sc-gk465i-0 fiWVzr styles__Wrapper-sc-kz84w6-1 jmYZrD">
                      <div className="styles__Breadcrumb-sc-kz84w6-3 iMqwwN">
                        <div>
                          <ol aria-label="Breadcrumb" className="styles__Breadcrumb-sc-k0ssrw-0 hoUFOh" style={{listStyle : 'none'}}>
                            <li className="styles__BaseTypo-sc-198xhmk-0 djwbck styles__Item-sc-k0ssrw-2 iNCHhD">
                              <a href="/" className="styles__BaseTypo-sc-198xhmk-0 djwbck styles__ItemLink-sc-k0ssrw-3 fleJZl"> Accueil </a>
                            </li>
                            <li className="styles__PictoContainer-sc-k0ssrw-5 ffQWyI">
                              <svg height={16} viewBox="0 0 16 16" width={16} xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="styles__Picto-sc-k0ssrw-6 hrBFSt">
                                <path d="M6.3,2.5,5,3.8,9.28,8,5,12.2l1.3,1.3L11.88,8Z" />
                              </svg>
                            </li>
                            <li className="styles__BaseTypo-sc-198xhmk-0 djwbck styles__Item-sc-k0ssrw-2 iNCHhD">
                              <div  className="styles__BaseTypo-sc-198xhmk-0 djwbck styles__Title-sc-k0ssrw-4 gwJOSc">9 façons d'immigrer au Canada en 2024</div>
                            </li>
                          </ol>
                          <ol aria-label="none" className="styles__Breadcrumb-sc-k0ssrw-0 styles__HiddenBreadcrumb-sc-k0ssrw-1 hoUFOh jKdNmR">
                            <li className="styles__BaseTypo-sc-198xhmk-0 djwbck styles__Item-sc-k0ssrw-2 iNCHhD">
                              <div className="styles__BaseTypo-sc-198xhmk-0 djwbck"> Accueil </div>
                            </li>
                            <li className="styles__PictoContainer-sc-k0ssrw-5 ffQWyI">
                              <svg height={16} viewBox="0 0 16 16" width={16} xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="styles__Picto-sc-k0ssrw-6 hrBFSt">
                                <path d="M6.3,2.5,5,3.8,9.28,8,5,12.2l1.3,1.3L11.88,8Z" />
                              </svg>
                            </li>
                            <li className="styles__BaseTypo-sc-198xhmk-0 djwbck styles__Item-sc-k0ssrw-2 iNCHhD">
                              <div className="styles__BaseTypo-sc-198xhmk-0 djwbck styles__Title-sc-k0ssrw-4 gwJOSc">9 façons d'immigrer au Canada en 2024</div>
                            </li>
                          </ol>
                        </div>
                      </div>
                    </div>
                  </div>
                  <main className="styles__Main-sc-kz84w6-0 gEFmYD">
                    <div className="Defautstyles__Page-sc-1tnudyr-2 kiMqjH">
                      <div className="Defautstyles__Main-sc-1tnudyr-1 fqCHqA">
                        <div className="Defautstyles__Header-sc-1tnudyr-0 hAkdZW">
                          <div className="styles__Hero-sc-s3dlnp-0 gMynSv">
                            <div className="styles__Title-sc-s3dlnp-2 iUyMl">
                              <h1 size="large" className="styles__HeadingBridge-sc-6txi54-0 hzNvHf"> 9 façons d'immigrer au Canada en 2024</h1>
                            </div>
                            {/* <div style={{float : 'right'}} className="ButtonLinkstyles__Anchor-sc-1s2ygn0-2 kuldYh kmzeo">
                             <Link>Cliquer ici pour la version 🇫🇷</Link>
                            </div>
                            <div style={{clear : 'both'}}></div> */}
                            <div className="styles__Wrapper-sc-s3dlnp-3 KKpTb">
                              <div className="BlocAuthorStartstyles__BlocAuthorStart-sc-176st2l-0 oTIGB">
                                <div className="AuthorInfosstyles__AuthorInfos-sc-1v2nwgf-0 kVLKSc">
                                  <div className="Avatarstyles__AvatarContainer-sc-168giry-2 glDTmS">
                                    <div className="Avatarstyles__Avatar-sc-168giry-0 eYtuGP AuthorInfosstyles__Avatar-sc-1v2nwgf-1 etCUXw">
                                      <picture><Image alt="avatar" height={46} loading="lazy" src={BorisHead} width={46} className="Avatarstyles__Image-sc-168giry-1 gNAMaq" />
                                      </picture>
                                    </div>
                                  </div>
                                  <div className="AuthorInfosstyles__AuthorInformation-sc-1v2nwgf-2 gPPLmh">
                                    <div className="AuthorInfosstyles__Title-sc-1v2nwgf-3 hpWifG"> Boris Guiffot </div>
                                    <div className="AuthorInfosstyles__SubTitle-sc-1v2nwgf-4 KkeWN"> Mis à jour le 15 jan. 2024 </div>
                                  </div>
                                </div>
                                <div className="SharingLinksstyles__SharingLinks-sc-13jf7g7-0 cuaEfY">
                                  <div className="SharingLinksstyles__SharingLinksDesktop-sc-13jf7g7-2 dAIRMX">
                                    <div className="SharingLinksstyles__Title-sc-13jf7g7-3 eZpqGZ"> Partager : </div>
                                    <div className="Tooltipstyles__TooltipContainer-sc-ynyslw-0 iMhBNO SharingLinksstyles__Tooltip-sc-13jf7g7-4 eUmNLd">
                                    <Link target="_blank" href="https://api.whatsapp.com/send/?text=https://wendogo.com/immigrate-to-canada" >
                                      <button className="ButtonLinkstyles__ButtonLink-sc-1s2ygn0-0 iPwlpd">
                                        {whatsapp}
                                        <div className="ButtonLinkstyles__Anchor-sc-1s2ygn0-2 kuldYh kmzeo"> 
                                           WhatsApp 
                                        </div>
                                      </button>
                                      </Link> 
                                      <div role="tooltip" className="Tooltipstyles__Tooltip-sc-ynyslw-1 hrixxN"> Partager sur WhatsApp </div>
                                    </div>
                                    <div className="Tooltipstyles__TooltipContainer-sc-ynyslw-0 iMhBNO SharingLinksstyles__Tooltip-sc-13jf7g7-4 eUmNLd">
                                    <div onClick={() => helper.openFacebookOnPopup('immigrate-to-canada')} className="fb-xfbml-parse-ignore" rel="noreferrer">
                                      <button className="ButtonLinkstyles__ButtonLink-sc-1s2ygn0-0 iPwlpd">
                                        {facebook}
                                        <div className="ButtonLinkstyles__Anchor-sc-1s2ygn0-2 kuldYh kmzeo"> 
                                        Facebook
                                         </div>
                                      </button>
                                      </div>
                                      <div role="tooltip" className="Tooltipstyles__Tooltip-sc-ynyslw-1 hrixxN"> Partager sur Facebook </div>
                                    </div>
                                    <div className="Tooltipstyles__TooltipContainer-sc-ynyslw-0 iMhBNO SharingLinksstyles__Tooltip-sc-13jf7g7-4 eUmNLd" onClick={() => copyTextToClipboard(1)}>
                                      <button className="ButtonLinkstyles__ButtonLink-sc-1s2ygn0-0 iPwlpd">
                                        <svg height={24} viewBox="0 0 24 24" width={24} xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="ButtonLinkstyles__Picto-sc-1s2ygn0-1 hkJOZg">
                                          <path d="M14.85,11.92a4.06,4.06,0,0,0-1-1.75,4,4,0,0,0-5.66,0l-5,5a4,4,0,0,0,5.66,5.66L12.67,17H13a5.86,5.86,0,0,0,1.19-.12L9.53,21.54a5,5,0,0,1-7.07-7.07l5-5a5,5,0,0,1,7.07,0,4.93,4.93,0,0,1,1.11,1.67Zm-5.7.15a4.1,4.1,0,0,0,1,1.76,4,4,0,0,0,5.66,0l5-5a4,4,0,1,0-5.66-5.66L11.33,7H11a5.86,5.86,0,0,0-1.19.12l4.66-4.66a5,5,0,0,1,7.07,7.07l-5,5a5,5,0,0,1-7.07,0,4.74,4.74,0,0,1-1.11-1.68Z" />
                                        </svg>
                                        <div className="ButtonLinkstyles__Anchor-sc-1s2ygn0-2 kuldYh kmzeo"> Lien </div>
                                      </button>
                                      <div role="tooltip" className="Tooltipstyles__Tooltip-sc-ynyslw-1 hrixxN"> 
                                      
                                      {isCopied1 ? 'Lien copié' : 'Copier le lien'} </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <picture>
                              <Image alt="Programme de bourses d'étude : comment déterminer votre projet ?" loading="lazy" src={ImmigrateToCanadaImg} className="styles__Image-sc-s3dlnp-1 oBito" />
                            </picture>
                          </div>
                        </div>
                        <div id="main">
                          <div className="styles__Content-sc-1b5sr4l-4 euNroP">
                            <div className="styles__Block-sc-1b5sr4l-5 lhYawK">
                              <p size="medium" variant="inherit" format="default" className="styles__Text-sc-1kfu7o1-0 kitxIv"> 
                              Le Canada a pour projet ambitieux d'accueillir un nombre record de 465 000 nouveaux immigrants en 2024, puisqu'il cherche à résoudre sa pénurie croissante sur le marché du travail.
                              Après avoir établi de nouveaux records annuels de résidents permanents en 2021 et 2022, il prévoit de battre à nouveau ces records au cours de chacune des trois prochaines années.
                              </p>
                            </div>
                            <div className="styles__Block-sc-1b5sr4l-5 lhYawK">
                              <p size="medium" variant="inherit" format="default" className="styles__Text-sc-1kfu7o1-0 kitxIv"> 
                              Cela signifie que le moment n'a jamais été aussi bien choisi pour envisager de commencer le processus d'immigration au Canada.
                              Vous trouverez ci-dessous une liste complète de 9 façons d'immigrer au Canada en 2024.
                              </p>
                            </div>
                            <div className="styles__Block-sc-1b5sr4l-5 styles__BlockHeading-sc-1b5sr4l-8 lhYawK lngqIb">
                              <h2 id="quel-type-de-logement-acheter-maison-ou-appartementnbsp" size="large" format="default" className="styles__SubHeading-sc-xwwv8k-0 PVMuW">RESIDENCE PERMANENTE (Programmes économiques)</h2>
                            </div>
                            <div className="styles__Block-sc-1b5sr4l-5 styles__BlockHeading-sc-1b5sr4l-8 lhYawK lngqIb">
                              <h2 id="quel-type-de-logement-acheter-maison-ou-appartementnbsp" size="large" format="default" className="styles__SubHeading-sc-xwwv8k-0 PVMuW">1 - Entrée express</h2>
                            </div>
                            <div className="styles__Block-sc-1b5sr4l-5 lhYawK">
                              <p size="medium" variant="inherit" format="default" className="styles__Text-sc-1kfu7o1-0 kitxIv">  
                                L'entrée express reste le principal moyen de déménager au Canada en 2024. Le système de sélection phare utilisé pour contrôler les candidatures aux principaux programmes fédéraux : Travailleurs qualifiés fédéraux , Catégorie de l'expérience canadienne et Métiers spécialisés fédéraux.
                              </p>
                            </div> 
                            <div className="styles__Block-sc-1b5sr4l-5 lhYawK">
                            <p size="medium" variant="inherit" format="default" className="styles__Text-sc-1kfu7o1-0 kitxIv"> 
                                Le Canada prévoit d'accueillir près de 109 000 immigrants fédéraux hautement qualifiés en 2024, selon le dernier Plan des niveaux d'immigration et 114 000 en 2025. 
                                </p>
                            </div>
                            <div className="styles__Block-sc-1b5sr4l-5 lhYawK">
                              <p size="medium" variant="inherit" format="default" className="styles__Text-sc-1kfu7o1-0 kitxIv"> 
                              Suite au lancement de la nouvelle Classification nationale des professions (CNP 2021), 16 nouvelles professions sont désormais admissibles à Entrée express via le Programme fédéral des travailleurs qualifiés. 
                              Des chauffeurs de camion aux infirmières et assistants d'enseignement en passant par les administrateurs de la paie, de nombreuses nouvelles professions sont désormais admissibles au flux d'immigration massive du Canada. 

                              </p>
                            </div>
                            <div className="styles__Block-sc-1b5sr4l-5 lhYawK">
                              <p size="medium" variant="inherit" format="default" className="styles__Text-sc-1kfu7o1-0 kitxIv"> 
                              <span>Pour les travailleurs qualifiés qui ont de l’expérience de travail à l’étranger, </span> 
                              <span className="styles__TextLink-sc-1b5sr4l-9 bpjhgG"><a target="_blank" href="https://www.canada.ca/fr/immigration-refugies-citoyennete/services/immigrer-canada/entree-express/admissibilite/travailleurs-qualifies-federal.html" rel="noreferrer">
                                il faut satisfaire les critères relatifs aux études et aux autres facteurs </a></span>                                  
                              </p>
                            </div>
                            <div className="styles__Block-sc-1b5sr4l-5 styles__BlockHeading-sc-1b5sr4l-8 lhYawK lngqIb">
                              <h2 id="quel-type-de-logement-acheter-maison-ou-appartementnbsp" size="large" format="default" className="styles__SubHeading-sc-xwwv8k-0 PVMuW">2 - Programme des candidats des provinces (Provincial Nominee Program - PNP)</h2>
                            </div>
                            <div className="styles__Block-sc-1b5sr4l-5 lhYawK">
                              <p size="medium" variant="inherit" format="default" className="styles__Text-sc-1kfu7o1-0 kitxIv">  
                              Le seul flux économique aussi important que l'Entrée express en 2024 est la force combinée des programmes de candidats des provinces du Canada.                                    </p>
                            </div> 
                            <div className="styles__Block-sc-1b5sr4l-5 lhYawK">
                            <p size="medium" variant="inherit" format="default" className="styles__Text-sc-1kfu7o1-0 kitxIv"> 
                            Le Canada prévoit d'accueillir plus de 105 000 nouveaux arrivants grâce aux neuf programmes d'immigration provinciaux (et deux territoriaux).                                      </p>
                            </div>
                            <div className="styles__Block-sc-1b5sr4l-5 lhYawK">
                              <p size="medium" variant="inherit" format="default" className="styles__Text-sc-1kfu7o1-0 kitxIv"> 
                              De la Colombie-Britannique à l'ouest, en passant par les provinces des Prairies de l'Alberta, de la Saskatchewan et du Manitoba, jusqu'à l'Ontario et les provinces du Canada atlantique de la Nouvelle-Écosse, du Nouveau-Brunswick, de Terre-Neuve-et-Labrador et de l'Île-du-Prince-Édouard, il existe des milliers de places pour l'immigration au Canada en 2024.                                    </p>
                            </div>
                            <div className="styles__Block-sc-1b5sr4l-5 lhYawK">
                              <p size="medium" variant="inherit" format="default" className="styles__Text-sc-1kfu7o1-0 kitxIv"> 
                              Certaines parties du PNP sont liées à l'Entrée express, ce qui signifie que chacun des programmes provinciaux mentionnés ci-dessus comporte des volets spécifiques pour le système de sélection géré par le gouvernement fédéral.                                    </p>
                            </div>
                            <div className="styles__Block-sc-1b5sr4l-5 lhYawK">
                              <p size="medium" variant="inherit" format="default" className="styles__Text-sc-1kfu7o1-0 kitxIv"> 
                              Les provinces sont prêtes à sélectionner des immigrants spécifiques à leurs besoins économiques. Les candidats devraient consulter les listes et les filières de professions cibles, car les priorités provinciales et fédérales diffèrent.                              </p>
                            </div>
                            <div className="styles__Block-sc-1b5sr4l-5 styles__BlockHeading-sc-1b5sr4l-8 lhYawK lngqIb">
                              <h2 id="quel-type-de-logement-acheter-maison-ou-appartementnbsp" size="large" format="default" className="styles__SubHeading-sc-xwwv8k-0 PVMuW">3 - Québec</h2>
                            </div>
                            <div className="styles__Block-sc-1b5sr4l-5 lhYawK">
                              <p size="medium" variant="inherit" format="default" className="styles__Text-sc-1kfu7o1-0 kitxIv">  
                              Le Québec est dans une catégorie à part puisqu’il contrôle totalement son immigration économique
                                                                  </p>
                            </div> 
                            <div className="styles__Block-sc-1b5sr4l-5 lhYawK">
                            <p size="medium" variant="inherit" format="default" className="styles__Text-sc-1kfu7o1-0 kitxIv"> 
                            On a beaucoup parlé des efforts déployés par le puissant gouvernement provincial du Québec pour garantir que tous les immigrants accueillis dans la province soient francophones.                                      </p>
                            </div>
                            <div className="styles__Block-sc-1b5sr4l-5 lhYawK">
                              <p size="medium" variant="inherit" format="default" className="styles__Text-sc-1kfu7o1-0 kitxIv"> 
                              François Legault, chef de la Coalition Avenir Québec, estime que la langue française est essentielle à la préservation de la culture québécoise et s'efforce de limiter le nombre de nouveaux arrivants dans la province à environ 50 000 au total, dont 33 000 grâce à des programmes économiques.
                                                                  </p>
                            </div>
                            <div className="styles__Block-sc-1b5sr4l-5 styles__BlockHeading-sc-1b5sr4l-8 lhYawK lngqIb">
                              <h2 id="quel-type-de-logement-acheter-maison-ou-appartementnbsp" size="large" format="default" className="styles__SubHeading-sc-xwwv8k-0 PVMuW">4 - Programmes pilotes pilotés par les employeurs </h2>
                            </div>
                            <div className="styles__Block-sc-1b5sr4l-5 lhYawK">
                              <p size="medium" variant="inherit" format="default" className="styles__Text-sc-1kfu7o1-0 kitxIv">  
                              8 500 nouveaux arrivants supplémentaires doivent être accueillis dans le cadre de trois autres volets : le projet pilote agroalimentaire , le projet pilote d'immigration rurale et du Nord et le projet de voies de mobilité économique.
                                                                  </p>
                            </div> 
                            <div className="styles__Block-sc-1b5sr4l-5 lhYawK">
                            <p size="medium" variant="inherit" format="default" className="styles__Text-sc-1kfu7o1-0 kitxIv"> 
                            Tous ces programmes sont dirigés par les employeurs, ce qui signifie qu'ils ne peuvent pas être appliqués directement. Un employeur identifie un besoin, trouve un immigrant pour répondre à ce besoin et utilise le programme pour amener ce candidat au Canada.                            </p>
                            </div>
                            <div className="styles__Block-sc-1b5sr4l-5 lhYawK">
                              <p size="medium" variant="inherit" format="default" className="styles__Text-sc-1kfu7o1-0 kitxIv"> 
                              François Legault, chef de la Coalition Avenir Québec, estime que la langue française est essentielle à la préservation de la culture québécoise et s'efforce de limiter le nombre de nouveaux arrivants dans la province à environ 50 000 au total, dont 33 000 grâce à des programmes économiques.
                                                                  </p>
                            </div>
                            <div className="styles__Block-sc-1b5sr4l-5 styles__BlockHeading-sc-1b5sr4l-8 lhYawK lngqIb">
                              <h2 id="quel-type-de-logement-acheter-maison-ou-appartementnbsp" size="large" format="default" className="styles__SubHeading-sc-xwwv8k-0 PVMuW">CLASSE FAMILIALE</h2>
                            </div>
                            <div className="styles__Block-sc-1b5sr4l-5 styles__BlockHeading-sc-1b5sr4l-8 lhYawK lngqIb">
                              <h2 id="quel-type-de-logement-acheter-maison-ou-appartementnbsp" size="large" format="default" className="styles__SubHeading-sc-xwwv8k-0 PVMuW">5 - Conjoints, partenaires et enfants</h2>
                            </div>
                            <div className="styles__Block-sc-1b5sr4l-5 lhYawK">
                              <p size="medium" variant="inherit" format="default" className="styles__Text-sc-1kfu7o1-0 kitxIv">  
                                Le Canada regroupe les conjoints, les partenaires et les enfants dans son Plan des niveaux d'immigration, dans le but d'accueillir 78 000 de ces nouveaux arrivants en 2024, constituant la majorité des 106 000 personnes de la catégorie du regroupement familial.                              
                              </p>
                            </div> 
                            <div className="styles__Block-sc-1b5sr4l-5 lhYawK">
                              <p size="medium" variant="inherit" format="default" className="styles__Text-sc-1kfu7o1-0 kitxIv">  
                              Les conjoints et partenaires peuvent être admissibles à un permis de travail en attendant que leur demande soit traitée.                             
                              </p>
                            </div> 
                            <div className="styles__Block-sc-1b5sr4l-5 lhYawK">
                              <p size="medium" variant="inherit" format="default" className="styles__Text-sc-1kfu7o1-0 kitxIv">  
                              Les enfants parrainés ont généralement moins de 22 ans et n'ont pas de conjoint ou de partenaire. Pour être admissibles après l'âge de 22 ans, 
                              ils doivent être incapables de subvenir à leurs besoins financièrement en raison d'un problème mental ou physique ou avoir dépendu du soutien financier de leurs parents avant l'âge de 22 ans.                             
                              </p>
                            </div> 
                            <div className="styles__Block-sc-1b5sr4l-5 lhYawK">
                              <p size="medium" variant="inherit" format="default" className="styles__Text-sc-1kfu7o1-0 kitxIv">  
                              Le Canada gère un volet distinct pour l'adoption à l'étranger.                            
                              </p>
                            </div> 
                            <div className="styles__Block-sc-1b5sr4l-5 styles__BlockHeading-sc-1b5sr4l-8 lhYawK lngqIb">
                              <h2 id="quel-type-de-logement-acheter-maison-ou-appartementnbsp" size="large" format="default" className="styles__SubHeading-sc-xwwv8k-0 PVMuW">6 - Parents et grands-parents</h2>
                            </div>
                            <div className="styles__Block-sc-1b5sr4l-5 lhYawK">
                              <p size="medium" variant="inherit" format="default" className="styles__Text-sc-1kfu7o1-0 kitxIv">  
                              Le Programme des parents et des grands-parents du Canada fonctionne selon un système de loterie, dans lequel les parrains déclarent leur intérêt pour un pool et sont tirés au sort et reçoivent une invitation à postuler.                              
                              </p>
                            </div> 
                            <div className="styles__Block-sc-1b5sr4l-5 lhYawK">
                              <p size="medium" variant="inherit" format="default" className="styles__Text-sc-1kfu7o1-0 kitxIv">  
                              Actuellement, le pool PGP n’a pas été ouvert à de nouveaux sponsors depuis 2020. Trois groupes de sponsors ont été invités à postuler depuis lors. Il est possible qu'Immigration, Réfugiés et Citoyenneté Canada (IRCC) ouvre une nouvelle fenêtre pour la soumission des formulaires d'intérêt pour les parrains en 2024.                            
                              </p>
                            </div> 
                            <div className="styles__Block-sc-1b5sr4l-5 lhYawK">
                              <p size="medium" variant="inherit" format="default" className="styles__Text-sc-1kfu7o1-0 kitxIv">  
                              Les parents et grands-parents non sélectionnés peuvent envisager le Super Visa.                            
                              </p>
                            </div> 
                            <div className="styles__Block-sc-1b5sr4l-5 styles__BlockHeading-sc-1b5sr4l-8 lhYawK lngqIb">
                              <h2 id="quel-type-de-logement-acheter-maison-ou-appartementnbsp" size="large" format="default" className="styles__SubHeading-sc-xwwv8k-0 PVMuW">7 - Super Visa</h2>
                            </div>
                            <div className="styles__Block-sc-1b5sr4l-5 lhYawK">
                              <p size="medium" variant="inherit" format="default" className="styles__Text-sc-1kfu7o1-0 kitxIv">  
                              Le super visa canadien est une option d'immigration unique et précieuse spécialement conçue pour faciliter les visites prolongées des parents et grands-parents de citoyens canadiens ou de résidents permanents.                              
                              </p>
                            </div> 
                            <div className="styles__Block-sc-1b5sr4l-5 lhYawK">
                              <p size="medium" variant="inherit" format="default" className="styles__Text-sc-1kfu7o1-0 kitxIv">  
                              Les parents et les grands-parents peuvent ainsi séjourner au Canada pendant une période prolongée. Les Super visas peuvent rester valides jusqu'à 10 ans.                              
                              </p>
                            </div> 
                            <div className="styles__Block-sc-1b5sr4l-5 styles__BlockHeading-sc-1b5sr4l-8 lhYawK lngqIb">
                              <h2 id="quel-type-de-logement-acheter-maison-ou-appartementnbsp" size="large" format="default" className="styles__SubHeading-sc-xwwv8k-0 PVMuW">RÉSIDENCE TEMPORAIREE</h2>
                            </div>
                            <div className="styles__Block-sc-1b5sr4l-5 styles__BlockHeading-sc-1b5sr4l-8 lhYawK lngqIb">
                              <h2 id="quel-type-de-logement-acheter-maison-ou-appartementnbsp" size="large" format="default" className="styles__SubHeading-sc-xwwv8k-0 PVMuW">8 - Permis d'études et permis de travail postdiplôme</h2>
                            </div>
                            <div className="styles__Block-sc-1b5sr4l-5 lhYawK">
                              <p size="medium" variant="inherit" format="default" className="styles__Text-sc-1kfu7o1-0 kitxIv">  
                              Le Canada dispose d'une voie établie vers la résidence permanente pour les étudiants internationaux, avec 750 000 personnes qui devraient étudier au Canada en 2024, ce qui en fait la plus grande catégorie de résidents temporaires.                              
                              </p>
                            </div> 
                            <div className="styles__Block-sc-1b5sr4l-5 lhYawK">
                              <p size="medium" variant="inherit" format="default" className="styles__Text-sc-1kfu7o1-0 kitxIv">  
                              Ils peuvent entrer avec un permis d'études, se qualifier pour un permis de travail post-diplôme , ce qui peut leur donner l'expérience nécessaire pour se qualifier pour l'immigration via Entrée express.                              
                              </p>
                            </div> 
                            <div className="styles__Block-sc-1b5sr4l-5 lhYawK">
                              <p size="medium" variant="inherit" format="default" className="styles__Text-sc-1kfu7o1-0 kitxIv">  
                              Cependant, même si cette voie existe, les candidats doivent être conscients qu’elle est très compétitive. Seule une fraction des 750 000 étudiants internationaux qui étudient au Canada deviendront des résidents permanents.                              
                              </p>
                            </div>
                            <div className="styles__Block-sc-1b5sr4l-5 lhYawK">
                              <p size="medium" variant="inherit" format="default" className="styles__Text-sc-1kfu7o1-0 kitxIv">  
                              De nombreux consultants en immigration et collèges et universités font la promotion du fait que les étudiants internationaux peuvent venir au Canada pour étudier et faire la transition vers la résidence permanente. Cependant, la réalité est que très peu d’entre eux y parviendront. 
                              Chez Wendogo nous pronons la transparence quant à la faisabilité de votre projet.                             
                              </p>
                            </div>
                            <div className="styles__Block-sc-1b5sr4l-5 styles__BlockHeading-sc-1b5sr4l-8 lhYawK lngqIb">
                              <h2 id="quel-type-de-logement-acheter-maison-ou-appartementnbsp" size="large" format="default" className="styles__SubHeading-sc-xwwv8k-0 PVMuW">9 - Travailleurs temporaires</h2>
                            </div>
                            <div className="styles__Block-sc-1b5sr4l-5 lhYawK">
                              <p size="medium" variant="inherit" format="default" className="styles__Text-sc-1kfu7o1-0 kitxIv">  
                              La cohorte canadienne de titulaires de permis de travail est peut-être derrière les titulaires de permis d'études en tant que plus grand groupe de résidents temporaires, mais ils représentent toujours un nombre important, soit 750 000.                             
                              </p>
                            </div> 
                            <div className="styles__Block-sc-1b5sr4l-5 lhYawK">
                              <p size="medium" variant="inherit" format="default" className="styles__Text-sc-1kfu7o1-0 kitxIv">  
                              Les travailleurs temporaires viennent au Canada via un certain nombre de canaux, y compris le Programme des travailleurs étrangers temporaires pour ceux qui ont besoin d'une étude d'impact sur le marché du travail et le Programme de mobilité internationale pour ceux qui n'en ont pas besoin.                             
                              </p>
                            </div> 
                            <div className="styles__Block-sc-1b5sr4l-5 lhYawK">
                              <p size="medium" variant="inherit" format="default" className="styles__Text-sc-1kfu7o1-0 kitxIv">  
                              Une étude d'impact sur le marché du travail (EIMT) positive confirme qu'il existe un besoin pour un travailleur étranger pour occuper le poste à pourvoir et qu'aucun travailleur canadien n'est disponible pour faire le travail.                             
                              </p>
                            </div> 
                            <div className="styles__Block-sc-1b5sr4l-5 lhYawK">
                              <p size="medium" variant="inherit" format="default" className="styles__Text-sc-1kfu7o1-0 kitxIv">  
                              Le PMI (Programme de mobilité internationale) permet aux employeurs canadiens d'embaucher des travailleurs étrangers sans avoir besoin d'une EIMT. Cela comprend les personnes mutées à l'intérieur d'une entreprise, celles qui entrent au Canada dans le cadre de traités commerciaux, tels que l'Accord Canada-États-Unis-Mexique (ACEUM) ou l'Accord économique et commercial global (AECG) et celles qui sont admissibles à un permis de travail ouvert .                            
                              </p>
                            </div> 
                            <div className="styles__Block-sc-1b5sr4l-5 lhYawK">
                              <p size="medium" variant="inherit" format="default" className="styles__Text-sc-1kfu7o1-0 kitxIv">  
                              Le PTET (Programme des travailleurs étrangers temporaires) est composé de quatre volets : les travailleurs hautement qualifiés, les travailleurs peu qualifiés, le Programme des travailleurs agricoles saisonniers et le Programme des aides familiaux résidants.                            
                              </p>
                            </div> 
                            <div className="styles__Block-sc-1b5sr4l-5 lhYawK">
                              <p size="medium" variant="inherit" format="default" className="styles__Text-sc-1kfu7o1-0 kitxIv">  
                              Le volet Talents mondiaux relève également du PTET, grâce auquel les employeurs peuvent accéder à un traitement de deux semaines pour une liste de professions technologiques.                            
                              </p>
                            </div> 
                            <div className="styles__Block-sc-1b5sr4l-5 lhYawK">
                              <p size="medium" variant="inherit" format="default" className="styles__Text-sc-1kfu7o1-0 kitxIv">  
                              Un certain nombre de programmes provinciaux gèrent également des programmes qui ciblent les professions technologiques, notamment le volet BC PNP Tech et Ontario Tech Draws via son volet Priorités en matière de capital humain.                            
                              </p>
                            </div>
                          </div>
                          <div className="styles__Footer-sc-ifmuzk-5 bBEUGj">
                            <div className="styles__FooterComponent-sc-ifmuzk-6 cbSMYG">
                              <div className="styles__FooterDivider-sc-ifmuzk-7 kJSAnk">
                                <div className="styles__Divider-sc-31h1xy-0 fAxSIQ" />
                              </div>
                              <div className="styles__Author-sc-ifmuzk-3 SbOJi">
                                <div className="BlocAuthorEndstyles__BlocAuthorEnd-sc-1vpghvk-0 GXTeA">
                                  <div className="BlocAuthorEndstyles__Update-sc-1vpghvk-1 ducFrV"> Mis à jour le 15 jan. 2024 </div>
                                  <div className="BlocAuthorEndstyles__Content-sc-1vpghvk-2 ejbaUW">
                                    <div className="AuthorInfosstyles__AuthorInfos-sc-1v2nwgf-0 kVLKSc">
                                      <div className="Avatarstyles__AvatarContainer-sc-168giry-2 glDTmS">
                                        <div className="Avatarstyles__Avatar-sc-168giry-0 eYtuGP AuthorInfosstyles__Avatar-sc-1v2nwgf-1 etCUXw">
                                          <picture> <Image alt="avatar" height={46} loading="lazy" src={BorisHead} width={46} className="Avatarstyles__Image-sc-168giry-1 gNAMaq" />
                                          </picture>
                                        </div>
                                      </div>
                                      <div className="AuthorInfosstyles__AuthorInformation-sc-1v2nwgf-2 gPPLmh">
                                        <div className="AuthorInfosstyles__Title-sc-1v2nwgf-3 hpWifG"> Boris Guiffot </div>
                                        <div className="AuthorInfosstyles__SubTitle-sc-1v2nwgf-4 gdZZXb"> Expert en immigration </div>
                                      </div>
                                    </div>
                                    <div className="SharingLinksstyles__SharingLinks-sc-13jf7g7-0 cuaEfY">
                                      <div className="SharingLinksstyles__SharingLinksDesktop-sc-13jf7g7-2 dAIRMX">
                                        <div className="SharingLinksstyles__Title-sc-13jf7g7-3 eZpqGZ"> Partager : </div>
                                        <div className="Tooltipstyles__TooltipContainer-sc-ynyslw-0 iMhBNO SharingLinksstyles__Tooltip-sc-13jf7g7-4 eUmNLd">
                                        <Link target="_blank" href="https://api.whatsapp.com/send/?text=https://wendogo.com/immigrate-to-canada" > 
                                          <button className="ButtonLinkstyles__ButtonLink-sc-1s2ygn0-0 iPwlpd">
                                           {whatsapp}
                                           <div className="ButtonLinkstyles__Anchor-sc-1s2ygn0-2 kuldYh kmzeo"> 
                                            WhatsApp 
                                          </div>
                                          </button>
                                          </Link> 
                                          <div role="tooltip" className="Tooltipstyles__Tooltip-sc-ynyslw-1 hrixxN"> Partager par WhatsApp </div>
                                        </div>
                                        <div className="Tooltipstyles__TooltipContainer-sc-ynyslw-0 iMhBNO SharingLinksstyles__Tooltip-sc-13jf7g7-4 eUmNLd">
                                          <div onClick={() => helper.openFacebookOnPopup('immigrate-to-canada')} className="fb-xfbml-parse-ignore" rel="noreferrer">
                                          <button className="ButtonLinkstyles__ButtonLink-sc-1s2ygn0-0 iPwlpd">
                                            {facebook}
                                            <div className="ButtonLinkstyles__Anchor-sc-1s2ygn0-2 kuldYh kmzeo"> 
                                            Facebook
                                            </div>
                                          </button>
                                          </div>
                                          <div role="tooltip" className="Tooltipstyles__Tooltip-sc-ynyslw-1 hrixxN"> Partager sur Facebook </div>
                                        </div>
                                        <div className="Tooltipstyles__TooltipContainer-sc-ynyslw-0 iMhBNO SharingLinksstyles__Tooltip-sc-13jf7g7-4 eUmNLd" onClick={() => copyTextToClipboard(2)}>
                                          <button className="ButtonLinkstyles__ButtonLink-sc-1s2ygn0-0 iPwlpd">
                                            <svg height={24} viewBox="0 0 24 24" width={24} xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="ButtonLinkstyles__Picto-sc-1s2ygn0-1 hkJOZg">
                                              <path d="M14.85,11.92a4.06,4.06,0,0,0-1-1.75,4,4,0,0,0-5.66,0l-5,5a4,4,0,0,0,5.66,5.66L12.67,17H13a5.86,5.86,0,0,0,1.19-.12L9.53,21.54a5,5,0,0,1-7.07-7.07l5-5a5,5,0,0,1,7.07,0,4.93,4.93,0,0,1,1.11,1.67Zm-5.7.15a4.1,4.1,0,0,0,1,1.76,4,4,0,0,0,5.66,0l5-5a4,4,0,1,0-5.66-5.66L11.33,7H11a5.86,5.86,0,0,0-1.19.12l4.66-4.66a5,5,0,0,1,7.07,7.07l-5,5a5,5,0,0,1-7.07,0,4.74,4.74,0,0,1-1.11-1.68Z" />
                                            </svg>
                                            <div className="ButtonLinkstyles__Anchor-sc-1s2ygn0-2 kuldYh kmzeo"> Lien </div>
                                          </button>
                                          <div role="tooltip" className="Tooltipstyles__Tooltip-sc-ynyslw-1 hrixxN"> 
                                          
                                          {isCopied2 ? 'Lien copié' : 'Copier le lien'} </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="BlocAuthorEndstyles__Text-sc-1vpghvk-3 dxlmwf"> Spécialisé dans les demandes de visa depuis quelques années, Boris Guiffot est aujourd'hui en charge d'une équipe d'experts en immigration. Il accompagne notamment des candidats dans leur demande visa pour la France et le Canada. </div>
                                </div>
                              </div>
                            </div>
                           <QuestionsOnTopic/>
                          </div>
                        </div>
                      </div>
                    </div>
                  </main>
                </div>
              </div>
              
            </div>
            <Footer/>                    
          </div>

}

export default ImmigrateToCanada
