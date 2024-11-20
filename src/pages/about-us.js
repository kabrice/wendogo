'use client';

import { useState} from 'react';
import EdgarHead from '../assets/optimized/edgar_head.webp'
import QuestionsOnTopic from '../components/QuestionsOnTopic';
//import ExpertMan} from '../assets/optimized/ExpertMan1.svg'
import OptimizedImage from '../components/OptimizedImage';

import Link from 'next/link';

import Footer from '../components/Footer';
import HeaderMenuBar from '../components/HeaderMenuBar';
import ExpertMan from '../assets/optimized/superhero.webp'
//import WendogoTeam from '../assets/optimized/wendogo_team-removebg.png'
import WendogoTeam from '../assets/optimized/wendogo_team.webp'
import SocialMediaLogo from '../assets/optimized/wendogo_jeu_concours.webp'
import Head from 'next/head';
import Image from 'next/image';

function AboutUs(){
    const whatsapp =  <svg className="ButtonLinkstyles__Picto-sc-1s2ygn0-1 hkJOZg" width="24px" height="24.6350302px" viewBox="0 0 24 24.6350302" version="1.1" xmlns="http://www.w3.org/2000/svg">
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
    const facebook = <svg className="ButtonLinkstyles__Picto-sc-1s2ygn0-1 hkJOZg"  width="24px" height="24px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg">
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
        await navigator.clipboard.writeText("https://wendogo.com/work-permit-steps")
        setIsCopied1(linkNum === 1)
        setIsCopied2(linkNum === 2)
      } catch (error) {
        console.log('error copyTextToClipboard', error)
      }
    }  

    
    return <div >
            <Head>
              <meta property="og:url"           content="https://wendogo.com/about-us" />
              <meta property="og:type"          content="article" />
              <meta property="og:title"         content="Qui sont vos conseillers ? - Wendogo" />
              <meta property="og:description"   content="Vous avez besoin de demander un visa mais vous hésitez à passer par une agence ? Wendogo vous donne les bonnes raisons de passer par l'un de ses conseillers." />
              <meta property="og:image"         content={'https://wendogo.com'+SocialMediaLogo} /> 
              <title>Qui sont vos conseillers ? - Wendogo</title>
              <meta name="description"          content="Vous avez besoin de demander un visa mais vous hésitez à passer par une agence ? Wendogo vous donne les bonnes raisons de passer par l'un de ses conseillers."/>
            </Head>         
            <HeaderMenuBar/>
            <main className="styles__Main-sc-kz84w6-0 gEFmYD " style={{paddingTop: 80}}>
                <div className="Blocsstyles__Page-sc-1q5awhx-1 dVmdSL"> 
                    <div className="styles__Container-sc-1wzyvpr-1 bQAQqz Row-sc-13qiped-0 eUxnX"  style={{paddingBottom : 0}}>
                    <div className="styles__Grid-sc-10gqksz-1 iuHviD styles__Grid-sc-1wzyvpr-3 kLhHpn">
                        <div className="styles__Main-sc-1wzyvpr-6 bgJTPL">
                        <h1 className="styles__BaseTypo-sc-198xhmk-0 dEWLNu styles__Title-sc-1wzyvpr-10 fGJAqT"> Qui sont vos conseillers ?</h1>
                        <div className="styles__BaseTypo-sc-198xhmk-0 djwbck styles__Content-sc-1qjc0o4-1 cLBZMY styles__Description-sc-1wzyvpr-2 kkxsWA">
                            <p className="styles__Block-sc-1qjc0o4-0 styles__Paragraph-sc-1qjc0o4-2 ktDrhZ bbNzRf"> 
                      Les conseillers Wendogo, tout aussi passionnés que compétents, vous guident de manière optimale à chaque étape de votre demande de visa avec implication et détermination.</p>
                        </div> 
                        </div>
                        <div className="styles__ImageContainer-sc-1wzyvpr-5 fWJBuN">
                        <picture>
                            <Image alt={ExpertMan}  loading="lazy" src={ExpertMan} className="styles__Image-sc-1wzyvpr-4 dJhJuV" style={{width : 260, height : 'auto'}} />
                            {/* <Image alt={ExpertMan}  className="styles__Image-sc-1wzyvpr-4 dJhJuV" loading="lazy" src={ExpertMan} style={{width : 260, height : 'auto'}} /> */}
                        </picture>
                        </div>
                        <div className="styles__Container-sc-1fi1lc5-0 hJzdEq styles__ReasonToBelieve-sc-1wzyvpr-9 flTAYH">
                        <div className="styles__CurrentPromise-sc-1fi1lc5-1 cNjmnK">
                            <svg height={24} viewBox="0 0 24 24" width={24} xmlns="http://www.w3.org/2000/svg" className="styles__Picto-sc-1fi1lc5-2 ePzDkp">
                            <use href="#p_14TK4O" />
                            </svg>
                            <div className="styles__BaseTypo-sc-198xhmk-0 jyPDDf styles__Title-sc-1fi1lc5-4 fPSpNh"> Transparence </div>
                            <p className="styles__BaseTypo-sc-198xhmk-0 beQjJB styles__Description-sc-1fi1lc5-3 kgMJSQ"> Nos conseillers vous disent tout et défendent vos intérêts. </p>
                        </div>
                        <div className="styles__CurrentPromise-sc-1fi1lc5-1 cNjmnK">
                            <svg height={24} viewBox="0 0 24 24" width={24} xmlns="http://www.w3.org/2000/svg" className="styles__Picto-sc-1fi1lc5-2 ePzDkp">
                            <use href="#p_14TK4O" />
                            </svg>
                            <div className="styles__BaseTypo-sc-198xhmk-0 jyPDDf styles__Title-sc-1fi1lc5-4 fPSpNh"> Expertise </div>
                            <p className="styles__BaseTypo-sc-198xhmk-0 beQjJB styles__Description-sc-1fi1lc5-3 kgMJSQ"> Nous traitons tous les types de visa (Immigration, visiteur, famille, étudiant, bourse, affaire...). </p>
                        </div>
                        <div className="styles__CurrentPromise-sc-1fi1lc5-1 cNjmnK">
                            <svg height={24} viewBox="0 0 24 24" width={24} xmlns="http://www.w3.org/2000/svg" className="styles__Picto-sc-1fi1lc5-2 ePzDkp">
                            <use href="#p_14TK4O" />
                            </svg>
                            <div className="styles__BaseTypo-sc-198xhmk-0 jyPDDf styles__Title-sc-1fi1lc5-4 fPSpNh"> Implication </div>
                            <p className="styles__BaseTypo-sc-198xhmk-0 beQjJB styles__Description-sc-1fi1lc5-3 kgMJSQ"> Restez en contact avec votre expert (visio, sms, téléphone) </p>
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
                                <div className="RowCarouselstyles__Title-sc-sn9bq-3 dMQEOm"> Vos conseillers Wendogo seront vos meilleurs alliés </div>
                              </div>
                              <picture>
                                <Image alt="Programme de bourses d'étude : comment déterminer votre projet ?" loading="lazy" src={WendogoTeam} className="styles__Image-sc-s3dlnp-1 oBito" />
                                {/* <Image alt="Programme de bourses d'étude : comment déterminer votre projet ?" loading="lazy" src={WendogoTeam} className="styles__Image-sc-s3dlnp-1 oBito" /> */}
                              </picture>
                            </div>
                          </div>
                          <div className="RowCarouselstyles__ContentWrapper-sc-sn9bq-1 cLSjNN">
                           
                            <div className="BlockquoteItem__BlockquoteItemContainer-sc-1vut18p-0 fOqLqQ RowCarouselstyles__BlockquoteItem-sc-sn9bq-4 hFyJGz">
                              <div className="BlockquoteItem__EntryPicto-sc-1vut18p-1 fXwFFQ">
                                <svg height={24} viewBox="0 0 24 24" width={24} xmlns="http://www.w3.org/2000/svg" className="BlockquoteItem__Picto-sc-1vut18p-2 driHUc" xmlnsXlink="http://www.w3.org/1999/xlink">
                                  <use href="#p_Z1BE88O" />
                                </svg>
                              </div>
                              <div>
                                <div className="BlockquoteItem__EntryTitle-sc-1vut18p-3 dtrzsL"> Nos conseillers prennent la mesure de votre projet. </div>
                                <div className="styles__BaseTypo-sc-198xhmk-0 djwbck styles__Content-sc-1qjc0o4-1 cLBZMY BlockquoteItem__EntryText-sc-1vut18p-4 gtHqOe">
                                  <p className="styles__Block-sc-1qjc0o4-0 styles__Paragraph-sc-1qjc0o4-2 ktDrhZ bbNzRf"> Véritables partenaires impliqués dans votre projet, ils savent combien ce visa compte pour vous, et vous accompagnent depuis l'initialisation de vos démarches jusqu’à l'obtention de votre visa.</p>
                                </div>
                              </div>
                            </div>
                            <div className="BlockquoteItem__BlockquoteItemContainer-sc-1vut18p-0 fOqLqQ RowCarouselstyles__BlockquoteItem-sc-sn9bq-4 hFyJGz">
                              <div className="BlockquoteItem__EntryPicto-sc-1vut18p-1 fXwFFQ">
                                <svg height={24} viewBox="0 0 24 24" width={24} xmlns="http://www.w3.org/2000/svg" className="BlockquoteItem__Picto-sc-1vut18p-2 driHUc" xmlnsXlink="http://www.w3.org/1999/xlink">
                                  <use href="#p_9Dt7" />
                                </svg>
                              </div>
                              <div>
                                <div className="BlockquoteItem__EntryTitle-sc-1vut18p-3 dtrzsL"> Nos conseillers ne vous proposeront jamais le projet de M. et Mme tout le monde.</div>
                                <div className="styles__BaseTypo-sc-198xhmk-0 djwbck styles__Content-sc-1qjc0o4-1 cLBZMY BlockquoteItem__EntryText-sc-1vut18p-4 gtHqOe">
                                  <p className="styles__Block-sc-1qjc0o4-0 styles__Paragraph-sc-1qjc0o4-2 ktDrhZ bbNzRf"> Alliant une méthode optimale à une adaptation personnalisée, leur mission consiste à perfectionner votre dossier en fonction de votre profil et de votre projet. Une expertise sur mesure car votre projet est unique, et mérite toute notre attention. </p>
                                </div>
                              </div>
                            </div>
                            <div className="BlockquoteItem__BlockquoteItemContainer-sc-1vut18p-0 fOqLqQ RowCarouselstyles__BlockquoteItem-sc-sn9bq-4 hFyJGz">
                              <div className="BlockquoteItem__EntryPicto-sc-1vut18p-1 fXwFFQ">
                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" className="BlockquoteItem__Picto-sc-1vut18p-2 driHUc" xmlnsXlink="http://www.w3.org/1999/xlink">
                                  <use href="#p_4HCzW" />
                                </svg>
                              </div>
                              <div>
                                <div className="BlockquoteItem__EntryTitle-sc-1vut18p-3 dtrzsL"> Nos conseillers sont vos copilotes. </div>
                                <div className="styles__BaseTypo-sc-198xhmk-0 djwbck styles__Content-sc-1qjc0o4-1 cLBZMY BlockquoteItem__EntryText-sc-1vut18p-4 gtHqOe">
                                  <p className="styles__Block-sc-1qjc0o4-0 styles__Paragraph-sc-1qjc0o4-2 ktDrhZ bbNzRf"> Un projet de demande de visa étant aussi excitant que stressant, nous mettons un point d’honneur à l’accompagnement.  Transparent et à l’écoute, votre Expert immigration veille à vous impliquer dans chacune des étapes du dossier. Il vous épaule tel un copilote, dans votre prise de décision.</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </main>
                    <div className="styles__Grid-sc-10gqksz-1 iuHviD">
                    <div className="Blocsstyles__Content-sc-1q5awhx-0 kQmFpu">
                        <div id="main">
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
                                          <picture>
                                            <Image alt="avatar" height={46} loading="lazy" src={EdgarHead} width={46} className="Avatarstyles__Image-sc-168giry-1 gNAMaq" />
                                             {/* <Image alt="avatar" height={46} loading="lazy" src={EdgarHead} width={46} className="Avatarstyles__Image-sc-168giry-1 gNAMaq" /> */}
                                          </picture>
                                        </div>
                                      </div>
                                      <div className="AuthorInfosstyles__AuthorInformation-sc-1v2nwgf-2 gPPLmh">
                                        <div className="AuthorInfosstyles__Title-sc-1v2nwgf-3 hpWifG"> Edgar Kamdem </div>
                                        <div className="AuthorInfosstyles__SubTitle-sc-1v2nwgf-4 gdZZXb"> Co-fondateur & CEO </div>
                                      </div>
                                    </div>
                                    <div className="SharingLinksstyles__SharingLinks-sc-13jf7g7-0 cuaEfY">
                                      <div className="SharingLinksstyles__SharingLinksDesktop-sc-13jf7g7-2 dAIRMX">
                                        <div className="SharingLinksstyles__Title-sc-13jf7g7-3 eZpqGZ"> Partager : </div>
                                        <div className="Tooltipstyles__TooltipContainer-sc-ynyslw-0 iMhBNO SharingLinksstyles__Tooltip-sc-13jf7g7-4 eUmNLd">
                                          <button className="ButtonLinkstyles__ButtonLink-sc-1s2ygn0-0 iPwlpd">
                                            {whatsapp}
                                            <div className="ButtonLinkstyles__Anchor-sc-1s2ygn0-2 kuldYh"> <a href="https://api.whatsapp.com/send/?text=https://wendogo.com/work-permit-steps" > WhatsApp </a> </div>
                                          </button>
                                          <div role="tooltip" className="Tooltipstyles__Tooltip-sc-ynyslw-1 hrixxN"> Partager par WhatsApp </div>
                                        </div>
                                        <div className="Tooltipstyles__TooltipContainer-sc-ynyslw-0 iMhBNO SharingLinksstyles__Tooltip-sc-13jf7g7-4 eUmNLd">
                                          <button className="ButtonLinkstyles__ButtonLink-sc-1s2ygn0-0 iPwlpd">
                                            {facebook}
                                            <div className="ButtonLinkstyles__Anchor-sc-1s2ygn0-2 kuldYh"> 
                                            <Link target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https://wendogo.com/work-permit-steps" className="fb-xfbml-parse-ignore" rel="noreferrer">Facebook</Link>
                                            </div>
                                          </button>
                                          <div role="tooltip" className="Tooltipstyles__Tooltip-sc-ynyslw-1 hrixxN"> Partager sur Facebook </div>
                                        </div>
                                        <div className="Tooltipstyles__TooltipContainer-sc-ynyslw-0 iMhBNO SharingLinksstyles__Tooltip-sc-13jf7g7-4 eUmNLd" onClick={() => copyTextToClipboard(2)}>
                                          <button className="ButtonLinkstyles__ButtonLink-sc-1s2ygn0-0 iPwlpd">
                                            <svg height={24} viewBox="0 0 24 24" width={24} xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="ButtonLinkstyles__Picto-sc-1s2ygn0-1 hkJOZg">
                                              <path d="M14.85,11.92a4.06,4.06,0,0,0-1-1.75,4,4,0,0,0-5.66,0l-5,5a4,4,0,0,0,5.66,5.66L12.67,17H13a5.86,5.86,0,0,0,1.19-.12L9.53,21.54a5,5,0,0,1-7.07-7.07l5-5a5,5,0,0,1,7.07,0,4.93,4.93,0,0,1,1.11,1.67Zm-5.7.15a4.1,4.1,0,0,0,1,1.76,4,4,0,0,0,5.66,0l5-5a4,4,0,1,0-5.66-5.66L11.33,7H11a5.86,5.86,0,0,0-1.19.12l4.66-4.66a5,5,0,0,1,7.07,7.07l-5,5a5,5,0,0,1-7.07,0,4.74,4.74,0,0,1-1.11-1.68Z" />
                                            </svg>
                                            <div className="ButtonLinkstyles__Anchor-sc-1s2ygn0-2 kuldYh"> Lien </div>
                                          </button>
                                          <div role="tooltip" className="Tooltipstyles__Tooltip-sc-ynyslw-1 hrixxN"> 
                                          
                                          {isCopied2 ? 'Lien copié' : 'Copier le lien'} </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="BlocAuthorEndstyles__Text-sc-1vpghvk-3 dxlmwf"> Edgar est le co-fondateur de Wendogo. Ingénieur de formation il possède une vaste expérience dans les processus applicatifs liés au web, 
                                  il a créé Wendogo après avoir eu lui-même beaucoup de mal à faire voyager ses proches au travers de certains organismes en place. </div>
                                </div>
                              </div>
                            </div>
                           <QuestionsOnTopic/>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </main>   
            <svg style={{ display: "none" }} xmlns="http://www.w3.org/2000/svg">
              <symbol viewBox="0 0 24 24" fill="currentColor" id="p_95qQ">
                <path d="M24,19H0V18H24Zm0-6H0V12H24Zm0-6H0V6H24Z" />
              </symbol>
              <symbol viewBox="0 0 16 16" fill="currentColor" id="p_126jrr">
                <path d="M1.94,5.86l1.29-1.3L7.44,8.84l4.2-4.28,1.3,1.3-5.5,5.58Z" />
              </symbol>
              <symbol viewBox="0 0 24 24" fill="currentColor" id="p_Z1o37oq">
                <path d="M12,0A12,12,0,1,1,0,12,12,12,0,0,1,12,0Zm8.13,19.41a2.6,2.6,0,0,0-1.63-.85c-3.85-.91-4.09-1.5-4.35-2.06a2.18,2.18,0,0,1,.21-2c1.72-3.25,2.09-6,1-7.79A3.74,3.74,0,0,0,12,5,3.79,3.79,0,0,0,8.59,6.76c-1.06,1.79-.69,4.55,1.05,7.76a2.16,2.16,0,0,1,.22,2c-.26.59-.61,1.19-4.37,2.07a2.54,2.54,0,0,0-1.62.85,11,11,0,0,0,16.26,0Zm.65-.78a11,11,0,1,0-17.56,0,3.82,3.82,0,0,1,2-1.05c2-.46,3.38-.83,3.68-1.5A1.24,1.24,0,0,0,8.76,15c-1.92-3.54-2.28-6.65-1-8.75A4.79,4.79,0,0,1,12,4a4.77,4.77,0,0,1,4.24,2.22c1.25,2.08.9,5.19-1,8.77a1.27,1.27,0,0,0-.18,1.1c.31.66,1.64,1,3.67,1.49A3.82,3.82,0,0,1,20.78,18.63Z" />
              </symbol>
              <symbol viewBox="0 0 24 24" fill="currentColor" id="p_Z2vlwxL">
                <path d="M15.8,16.6A9.26,9.26,0,0,1,9.1,19a9.45,9.45,0,0,1-6.5-3A9.21,9.21,0,0,1,0,9.4,9.24,9.24,0,0,1,2.8,2.8,9.07,9.07,0,0,1,9.4,0a9.71,9.71,0,0,1,6.7,2.6,9.43,9.43,0,0,1,.6,13.2l7.4,7.4-.8.8ZM14.2,2.4A8.63,8.63,0,0,0,9.5,1,8.54,8.54,0,0,0,1,9.5a8.63,8.63,0,0,0,1.4,4.7,8.21,8.21,0,0,0,3.8,3.1,9.2,9.2,0,0,0,4.9.5,8.54,8.54,0,0,0,4.4-2.3,8.18,8.18,0,0,0,2.3-4.4,8.23,8.23,0,0,0-.5-4.9A8.74,8.74,0,0,0,14.2,2.4Z" />
              </symbol>
              <symbol viewBox="0 0 24 24" fill="currentColor" id="p_14TK4O">
                <path d="M18.63,4.23c-.16-.16-.41-.32-.57-.16-.56.56-1.49.58-1.92,1.35v0c-.57.67-1.38,1.08-1.63,2a.35.35,0,0,0,.08,0l-.08,0c-.15.08-.16.23-.16.38l0,0a11.4,11.4,0,0,1-.89,1.08h0c-.08.15-.15.24-.23.37l-.09,0c-.23.41-.55.76-.8,1.17h0a10.34,10.34,0,0,1-.53,1l-.2.2a1.54,1.54,0,0,0-.05.17,2.6,2.6,0,0,0-.62,1.39l0,.05c-.09.07-.16.23-.25.32l0,.06a3.05,3.05,0,0,0-.7.88.18.18,0,0,0-.07.05.73.73,0,0,0-.16.41.06.06,0,0,0,0,0,4.53,4.53,0,0,0-.79,1.11l.08.08-.06,0c-.25.07-.09.67-.57.57l-.14-.09c-.23-.38-.44-.81-.66-1.27a.43.43,0,0,1,0-.11v-.12h0a.08.08,0,0,0,0,0,.3.3,0,0,1,0-.13c-.07-.22-.18-.47-.27-.72l-.09-.28A2.18,2.18,0,0,1,7,13.46a1.89,1.89,0,0,0-.8-1l0,0a.81.81,0,0,0-1.07-.24c-.39.25-.16.67.09.92a0,0,0,0,1,0,0,.91.91,0,0,0,.15.38h0A19.54,19.54,0,0,0,7,18.09a1,1,0,0,0,.07-.15,1,1,0,0,1,0,.17,1.15,1.15,0,0,0,.23.55l0,0H7.29c.51.67,1.08,1.17,2.05.76v0a1.26,1.26,0,0,0,.68-.78l.12-.1c0-.25.09-.41.09-.57.74-.48.9-1.31,1.31-2.07A6,6,0,0,1,12,15a3.86,3.86,0,0,0,.8-2.12l-.08,0,0,0c.07,0,.08-.07.09-.11l0,0c.48-.07.48-.51.57-.83l-.12.08.12-.17.16-.16v0l0,0a9.67,9.67,0,0,0,2.11-3,.56.56,0,0,1,.05-.08s0,.06,0,.08c.32-.41,1.06-.64.64-1.4h0c.9-.25,1.22-1,1.7-1.59h0c.07-.16.16-.25.23-.41h0c.09-.09.25-.16.34-.25V5C19,4.78,18.87,4.47,18.63,4.23ZM16.2,6l0,0-.11,0ZM7.54,16.87h0l-.08.06Zm-.13.34s0,0,0,.05h0S7.4,17.23,7.41,17.21Z" />
              </symbol>
              <symbol viewBox="0 0 24 24" fill="currentColor" id="p_Z1BE88O">
                <path d="M12,2h2V4h2V7.7l7,2.62V23h1v1H0V23H1V12H7V4H9V2h2V0h1Zm3,3H8V23H9V21h5v2h1ZM13,22H10v1h3Zm8,1h1V11L16,8.77V23h1V21h4ZM7,13H2V23H3V21H6v2H7ZM5,22H4v1H5Zm15,0H18v1h2ZM4,17v2H3V17Zm2,0v2H5V17ZM11,7V19H10V7ZM21,18v1H17V18ZM13,7V19H12V7Zm8,9v1H17V16ZM4,14v2H3V14Zm2,0v2H5V14Zm15,0v1H17V14Zm0-2v1H17V12ZM13,3H10V4h3Z" />
              </symbol>
              <symbol viewBox="0 0 24 24" fill="currentColor" id="p_9Dt7">
                <path d="M22,24H2V0H16l6,6ZM15,1H3V23H21V7H15Zm3,15v1H6V16Zm0-3v1H6V13Zm0-3v1H6V10ZM16,6h4.59L16,1.41Z" />
              </symbol>
              <symbol viewBox="0 0 24 24" fill="currentColor" id="p_4HCzW">
                <path d="M16.87,14.63l1,.14A3.45,3.45,0,0,1,14.19,18a3.82,3.82,0,0,1-3.92-3.12H9V14h1.17c0-.16,0-.32,0-.48s0-.27,0-.41H9v-.9h1.3A3.87,3.87,0,0,1,14.19,9a3.49,3.49,0,0,1,3.68,3l-1,.16a2.54,2.54,0,0,0-2.69-2.23,2.84,2.84,0,0,0-2.89,2.25h3.61v.9H11.15c0,.14,0,.27,0,.41s0,.32,0,.48H14v.9H11.31a2.83,2.83,0,0,0,2.88,2.18A2.49,2.49,0,0,0,16.87,14.63ZM24,13.5A10.43,10.43,0,0,1,4.93,19.42h0A10.48,10.48,0,1,1,19.08,4.59,10.51,10.51,0,0,1,24,13.5ZM3.79,17.24h0A10.73,10.73,0,0,1,3.1,13.5,10.49,10.49,0,0,1,13.55,3a10.26,10.26,0,0,1,3.34.55A9.48,9.48,0,0,0,3.79,17.24ZM23,13.5A9.46,9.46,0,1,0,13.55,23,9.49,9.49,0,0,0,23,13.5Z" fillRule="evenodd" />
              </symbol>
              <symbol viewBox="0 0 24 24" fill="currentColor" id="p_boiV">
                <path d="M15.67,8.63,24,9.78l-6.07,5.88L19.42,24,12,20,4.58,24l1.48-8.34L0,9.78,8.33,8.63,12,1ZM9,9.55l-6.82.95,5,4.81L5.93,22.13,12,18.86l6.07,3.27-1.21-6.82,5-4.81L15,9.55,12,3.31Z" />
              </symbol>
              <symbol viewBox="0 0 24 24" fill="currentColor" id="p_4HYwO">
                <path d="M11,2H21l3,3V7H19v5h1v3a7.86,7.86,0,0,0-2.08,0A2.21,2.21,0,0,0,16,17a2,2,0,0,0,3.68,1.09.51.51,0,1,1,.88.51A3.06,3.06,0,0,1,18,20a3,3,0,0,1-1-5.83V12h1V7H11V24H5V7H4V9H0V2H5V0h6ZM10,7H6V23h4ZM9,20,7,21v1l2-1Zm0-3L7,18v1l2-1Zm0-3L7,15v1l2-1Zm10-1H18v1h1ZM9,11,7,12v1l2-1ZM9,8,7,9v1L9,9Zm1-7H6V3H1V8H3V6H23V5.41L20.59,3H10Z" fillRule="evenodd" />
              </symbol>
              <symbol viewBox="0 0 46 46" fill="currentColor" id="p_2oO7Uf">
                <path d="M23,16.44c2.14,0,2.39,0,3.23,0a4.09,4.09,0,0,1,1.49.28,2.56,2.56,0,0,1,1.51,1.51,4.32,4.32,0,0,1,.28,1.49c0,.84,0,1.09,0,3.23s0,2.39,0,3.23a4,4,0,0,1-.28,1.49,2.42,2.42,0,0,1-.59.92,2.57,2.57,0,0,1-.92.6,4.39,4.39,0,0,1-1.49.27c-.84,0-1.09,0-3.23,0s-2.39,0-3.23,0a4.28,4.28,0,0,1-1.49-.27,2.67,2.67,0,0,1-1.52-1.52,4.28,4.28,0,0,1-.27-1.49c0-.84,0-1.09,0-3.23s0-2.39,0-3.23a4.39,4.39,0,0,1,.27-1.49,2.57,2.57,0,0,1,.6-.92,2.42,2.42,0,0,1,.92-.59,4.21,4.21,0,0,1,1.49-.28C20.61,16.45,20.86,16.44,23,16.44ZM23,15c-2.17,0-2.45,0-3.3.05a5.85,5.85,0,0,0-1.94.37,3.94,3.94,0,0,0-1.42.92,4.17,4.17,0,0,0-.92,1.42,5.85,5.85,0,0,0-.37,1.94c0,.85-.05,1.13-.05,3.3s0,2.44.05,3.3a5.85,5.85,0,0,0,.37,1.94,3.94,3.94,0,0,0,.92,1.42,4.17,4.17,0,0,0,1.42.92A5.85,5.85,0,0,0,19.7,31c.86,0,1.13.05,3.3.05s2.45,0,3.3-.05a5.85,5.85,0,0,0,1.94-.37,3.86,3.86,0,0,0,1.42-.92,4,4,0,0,0,.92-1.42A5.82,5.82,0,0,0,31,26.3c0-.86,0-1.13,0-3.3s0-2.45,0-3.3a5.82,5.82,0,0,0-.38-1.94,4,4,0,0,0-2.34-2.34A5.77,5.77,0,0,0,26.3,15C25.44,15,25.17,15,23,15Z" />
                <path d="M23,18.89A4.11,4.11,0,1,0,27.11,23,4.11,4.11,0,0,0,23,18.89Zm0,6.78A2.67,2.67,0,1,1,25.67,23,2.68,2.68,0,0,1,23,25.67Z" />
                <path d="M27.27,19.69a1,1,0,1,0-1-1A1,1,0,0,0,27.27,19.69Z" />
              </symbol>
              <symbol viewBox="0 0 46 46" fill="currentColor" id="p_EyY0U">
                <path d="M23.05,15a8,8,0,0,1,1.26,16V25.38h1.87l.36-2.33H24.31V21.54a1.17,1.17,0,0,1,1.3-1.26h1v-2a12.14,12.14,0,0,0-1.8-.16h0a2.84,2.84,0,0,0-3,3.14v1.77h-2v2.33h2V31a8,8,0,0,1,1.26-16Z" />
              </symbol>
              <symbol viewBox="0 0 46 46" fill="currentColor" id="p_S2LJj">
                <path d="M32,16.78a8,8,0,0,1-2.24.59,3.86,3.86,0,0,0,1.72-2.09A8.12,8.12,0,0,1,29,16.2,3.93,3.93,0,0,0,26.15,15a3.82,3.82,0,0,0-3.79,4.65,11.22,11.22,0,0,1-8-4,3.73,3.73,0,0,0,1.21,5.06,4.05,4.05,0,0,1-1.77-.47A3.83,3.83,0,0,0,16.89,24a4.15,4.15,0,0,1-1.76.06,3.89,3.89,0,0,0,3.64,2.63A8,8,0,0,1,13,28.3,11.32,11.32,0,0,0,19,30,10.84,10.84,0,0,0,30.05,18.74,7.89,7.89,0,0,0,32,16.78Z" />
              </symbol>
              <symbol viewBox="0 0 46 46" fill="currentColor" id="p_MAADg">
                <path d="M31.63,18.88A2.19,2.19,0,0,0,30,17.37,54.83,54.83,0,0,0,23,17a57.93,57.93,0,0,0-7,.35,2.25,2.25,0,0,0-1.59,1.53A21.58,21.58,0,0,0,14,23a21.47,21.47,0,0,0,.37,4.12A2.19,2.19,0,0,0,16,28.63,54.91,54.91,0,0,0,23,29a57.93,57.93,0,0,0,7-.35,2.23,2.23,0,0,0,1.59-1.51A21.67,21.67,0,0,0,32,23,20.83,20.83,0,0,0,31.63,18.88ZM21.21,25.57V20.43L25.89,23Z" />
              </symbol>
              <symbol viewBox="0 0 16 16" fill="currentColor" id="p_2qB9uD">
                <path d="M13.5,12.16,9.29,8l4.17-4.2L12.16,2.5,8,6.71,3.79,2.54,2.5,3.83,6.71,8,2.54,12.21,3.83,13.5,8,9.29l4.2,4.17Z" />
              </symbol>
              <symbol viewBox="0 0 32 32" fill="currentColor" id="p_2ijCln">
                <path d="m7,25.98V6.1c0-.88.98-1.4,1.71-.91l14.82,9.94c.65.44.65,1.39,0,1.83l-14.82,9.94c-.73.49-1.71-.03-1.71-.91Z" />
              </symbol>
              <symbol viewBox="0 0 32 32" fill="currentColor" id="p_ZPJARB">
                <path d="m13.59,6.72l3.97,3.97,1.14-1.14-1.99-1.99c4.86.36,8.69,4.41,8.69,9.36s-4.2,9.39-9.39,9.39-9.39-4.2-9.39-9.39c0-2.38.89-4.55,2.35-6.21.26-.29.54-.57.83-.83l-1.07-1.21c-.34.3-.67.63-.97.97-1.71,1.94-2.75,4.49-2.75,7.28,0,6.08,4.92,11,11,11s11-4.92,11-11-4.57-10.64-10.34-10.98l2.04-2.04-1.14-1.14-3.97,3.97Zm.15,3.97l-3.97-3.97,3.97-3.97,1.14,1.14-2.83,2.83,2.83,2.83-1.14,1.14Zm.21,2.34v7.92h-1.44v-6.25l-1.91.63v-1.16l3.18-1.15h.16Zm7.31,3.29v1.33c0,.61-.06,1.13-.18,1.56-.12.43-.3.78-.53,1.06-.23.27-.51.47-.83.6-.32.13-.68.19-1.07.19-.31,0-.61-.04-.88-.12-.27-.08-.52-.21-.73-.38-.21-.17-.4-.39-.55-.66-.15-.27-.27-.59-.35-.96-.08-.37-.12-.8-.12-1.29v-1.33c0-.61.06-1.13.18-1.55.13-.43.31-.78.54-1.05.23-.27.51-.47.83-.59.32-.13.68-.19,1.07-.19.32,0,.61.04.88.12.27.08.51.2.73.37.22.17.4.38.55.65.15.26.27.58.35.96.08.37.12.8.12,1.28Zm-1.43,1.53v-1.73c0-.3-.02-.57-.05-.79-.03-.23-.08-.42-.15-.58-.07-.16-.15-.29-.24-.39-.1-.1-.21-.18-.34-.22-.13-.05-.27-.07-.42-.07-.19,0-.36.04-.5.11-.15.07-.27.19-.37.35-.1.16-.18.37-.23.64-.05.26-.08.58-.08.96v1.73c0,.3.02.57.05.8.04.23.09.42.15.59.07.16.15.3.24.4.1.1.21.18.34.23.13.05.27.07.42.07.19,0,.36-.04.5-.11.15-.08.27-.2.37-.36.1-.17.18-.38.23-.65.05-.27.08-.59.08-.97Z" />
              </symbol>
              <symbol viewBox="0 0 32 32" fill="currentColor" id="p_lK2Ji">
                <path d="m13.94,13.03v7.92h-1.44v-6.25l-1.9.63v-1.16l3.18-1.15h.16Zm7.31,3.29v1.33c0,.61-.06,1.13-.18,1.56-.12.43-.3.78-.53,1.06-.23.27-.51.47-.83.6-.32.13-.68.19-1.07.19-.31,0-.61-.04-.88-.12-.27-.08-.52-.21-.73-.38-.21-.17-.4-.39-.55-.66-.15-.27-.27-.59-.35-.96-.08-.37-.12-.8-.12-1.29v-1.33c0-.61.06-1.13.18-1.55.13-.43.31-.78.54-1.05.23-.27.51-.47.83-.59.32-.13.68-.19,1.07-.19.32,0,.61.04.88.12.27.08.51.2.73.37.22.17.4.38.55.65.15.26.27.58.35.96.08.37.12.8.12,1.28Zm-1.43,1.53v-1.73c0-.3-.02-.57-.05-.79-.03-.23-.08-.42-.15-.58-.07-.16-.15-.29-.24-.39-.1-.1-.21-.18-.34-.22-.13-.05-.27-.07-.42-.07-.19,0-.36.04-.5.11-.15.07-.27.19-.37.35-.1.16-.18.37-.23.63-.05.26-.08.58-.08.96v1.73c0,.3.02.57.05.8.04.23.09.42.15.59.07.16.15.3.24.4.1.1.21.18.34.23.13.05.27.07.42.07.19,0,.36-.04.5-.11.15-.08.27-.2.37-.36.1-.17.18-.38.23-.65.05-.27.08-.59.08-.97Zm-1.4-11.13l-3.97,3.97-1.14-1.14,1.99-1.99c-4.86.36-8.69,4.41-8.69,9.36s4.2,9.39,9.39,9.39,9.39-4.2,9.39-9.39c0-2.38-.89-4.55-2.35-6.21-.26-.29-.54-.57-.83-.83l1.07-1.21c.34.3.67.63.97.97,1.71,1.94,2.75,4.49,2.75,7.28,0,6.08-4.92,11-11,11s-11-4.92-11-11S9.57,6.27,15.34,5.93l-2.04-2.04,1.14-1.14,3.97,3.97Zm-.15,3.97l3.97-3.97-3.97-3.97-1.14,1.14,2.83,2.83-2.83,2.83,1.14,1.14Z" />
              </symbol>
              <symbol viewBox="0 0 16 16" fill="currentColor" id="p_Z2eHEHd">
                <path d="M5.8,11.6l8-8.29,1.44,1.38L5.88,14.4.32,9.23,1.68,7.77Z" fillRule="evenodd" />
              </symbol>
              <symbol viewBox="0 0 24 24" fill="currentColor" id="p_4HgaE">
                <path d="M18.5,20H5.5a4.5,4.5,0,0,1-.8-8.92l.78-.14,0-.79a6.49,6.49,0,0,1,13,0l0,.79.78.14A4.5,4.5,0,0,1,18.5,20Zm1-9.91a7.49,7.49,0,0,0-15,0A5.5,5.5,0,0,0,5.5,21h13a5.5,5.5,0,0,0,1-10.91Z" />
              </symbol>
              <symbol viewBox="0 0 24 24" fill="currentColor" id="p_1W7mmN">
                <path d="M13,9h9L8,24l3-9H2L16,0ZM4.3,14h8.09l-2,6,9.3-10H11.61l2-6Z" />
              </symbol>
              <symbol viewBox="0 0 24 24" fill="currentColor" id="p_51CrD">
                <path d="M12,21.59C6.37,16.05,1,11.3,1,7.19A5.06,5.06,0,0,1,6.28,2c1.31,0,4.15.5,5.72,4.46C13.59,2.49,16.46,2,17.73,2A5,5,0,0,1,23,7.19C23,11.26,17.86,15.82,12,21.59ZM17.73,1A6.53,6.53,0,0,0,12,4.25,6.51,6.51,0,0,0,6.28,1,6,6,0,0,0,0,7.19C0,11.85,5.57,16.62,12,23c6.43-6.38,12-11.15,12-15.81A6,6,0,0,0,17.73,1Z" />
              </symbol>
            </svg>
            <Footer/>                    
          </div>

}

export default AboutUs
