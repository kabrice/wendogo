import { useState} from 'react';
import EdgarHead from '../assets/edgar_head.jpeg'
//import {ReactComponent as ExpertMan} from '../assets/ExpertMan1.svg'

import { Link } from 'react-router-dom';
import SocialMediaLogo from '../assets/social_media_logo.png'
import Footer from '../components/Footer';
import HeaderMenuBar from '../components/HeaderMenuBar';
import CoffeeCup from '../assets/coffeecup.jpeg'
import { FloatingWhatsApp } from 'react-floating-whatsapp';

function Contact(){
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
        await navigator.clipboard.writeText("http://localhost:3000/work-permit-steps")
        setIsCopied1(linkNum === 1)
        setIsCopied2(linkNum === 2)
      } catch (error) {
        console.log('error copyTextToClipboard', error)
      }
    }  

    
    return <div >
            <HeaderMenuBar/>
            <main className="styles__Main-sc-kz84w6-0 gEFmYD gEFmYD1" style={{paddingTop: 80}}>
                      <div className="styles__Wrapper-sc-gk465i-0 cddtql">
                        <header className="styles__Header-sc-1wbd6gj-1 ClCQj">
                          <div className="styles__Hero-sc-s3dlnp-0 gMynSv">
                            <div className="styles__Title-sc-s3dlnp-2 eWHDTF">
                              <h1 size="large" className="styles__HeadingBridge-sc-6txi54-0 hzNvHf"> Contactez l’équipe Wendogo </h1>
                            </div>
                          </div>
                        </header>
                      </div>
                      <div className="styles__Wrapper-sc-gk465i-0 fiWVzr">
                        <div className="styles__Content-sc-1wbd6gj-0 dbnlxV">
                          <picture>
                            <img alt="Contact" loading="lazy" src={CoffeeCup} width={320} className="styles__HeaderImage-sc-1wbd6gj-2 fqPObL" />
                          </picture>
                          <div className="styles__Information-sc-1wbd6gj-5 gJwSMu">
                            <p> Nous sommes disponibles :<br /> De lundi à dimanche 24h/24. </p>
                            <a href="mailto:hello@wendogo.com" rel="nofollow" target="blank">
                              <h3 size="large" format="default" className="styles__SubHeading-sc-xwwv8k-0 PVMuW">
                                <span className="styles__Title-sc-1wbd6gj-3 jatQYR">
                                  <span className="styles__Icon-sc-goa033-0 blmSsR" /> Par email </span>
                              </h3>
                              <p className="styles__Link-sc-1wbd6gj-4 hAcmtb">hello@wendogo.com</p>
                            </a>
                            <h3 size="large" format="default" className="styles__SubHeading-sc-xwwv8k-0 PVMuW">
                              <span className="styles__Title-sc-1wbd6gj-3 jatQYR">
                                <span className="styles__Icon-sc-goa033-0 blmRjo" /> Par chat </span>
                            </h3>
                            <p className="styles__Link-sc-1wbd6gj-4 hAcmtb"> <a href="https://m.me/wendogoHQ" >Écrivez nous, nous vous répondons en quelques minutes</a> </p>
                            <h3 format="default" size="medium" className="styles__SubHeading-sc-xwwv8k-0 cDPnHw">
                              <a href="https://wa.me/+33755097584" rel="nofollow">
                                <span className="styles__Title-sc-1wbd6gj-3 jatQYR">
                                  <span className="styles__Icon-sc-goa033-0 blniyO" /> WHATSAPP <br/>+33 7 45 49 30 86 </span>
                              </a>
                            </h3>
                          </div>
                        </div>
                      </div>
                      <FloatingWhatsApp phoneNumber="330755097584" accountName="Wendogo" avatar={SocialMediaLogo} statusMessage="Répond en général dans l'heure" 
                        chatMessage={'Salut toi 🤝 \nSi tu as une question, suis ces étapes pour obtenir une assistance rapide :\n1. Présente toi\n2. Indique l\'objet de ton message \n3. Décris clairement ton problème 😉'}
                        placeholder={"Racontes nous ce qui te préoccupe"} chatboxHeight={500} CSSProperties={{color:'#001435'}}/>
                    </main> 

            <Footer/>                    
          </div>

}

export default Contact
