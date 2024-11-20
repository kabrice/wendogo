'use client';

import { React, useEffect, useState, useRef } from 'react';
import WendogoLogoIcon from '../assets/wendogo_logo_paperplane.svg'
import Birthday from '../components/Birthday'
import TravelPic from '../assets/travel_pic.svg'
import Facebook from '../assets/social media/facebook.png'
import Instagram from '../assets/social media/instagram.png'
import YouTube from '../assets/social media/youtube.png'
import TikTok from '../assets/social media/tiktok.png'
import SocialMediaLogo from '../assets/social_media_logo.png'
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'
import Footer from '../components/Footer';
import BorisBrice from '../assets/PXL_20230513_173650916.NIGHT-removebg (2).png'
import { FloatingWhatsApp } from 'react-floating-whatsapp'
import Link from 'next/link';
import SubscriptionModal from '../components/SubscriptionModal'
import { useSelector, useDispatch } from 'react-redux'
import {open} from '../redux/modalslice'
import Head from 'next/head';
import helper from '../utils/Helper';

function WaitingList() {

  const openModal = useSelector((state) => state.subsModal.open)
  const dispatch = useDispatch()

  // const location = useLocation()
  const { width } = useWindowSize()
  const myElementRef = useRef(null)
  const [contestDivTop, setContestDivTop] = useState(-1);
  const [displayContestDigit, setDisplayContestDigit] = useState(null);

  const [isShowMore, setIShowMore] = useState(false)
  const [isBoris, setBoris] = useState(false)
  const [browserWidth, setBrowserWidth] = useState(0) 

  const handleClickShowMore = (isShowMore, isBoris) => {
    setBoris(isBoris)
    setIShowMore(isShowMore)
  }

  useEffect(() => {
    helper.loadFacebookSDK()
    const handleScroll = () => { 
      const el = myElementRef.current;
      if(el){
        setContestDivTop(el.getBoundingClientRect().top)
        
        if(-620 < contestDivTop && contestDivTop < -600){
          //console.log('totototp', contestDivTop, displayContestDigit)  
          setDisplayContestDigit(<Confetti recycle={false}  width={width} height={1400}/>)
        }
      }
    }
    window.addEventListener('scroll', () => handleScroll())
       
    return () => {
      window.removeEventListener('scroll', () => handleScroll())
    }
  }, [contestDivTop, displayContestDigit])

  useEffect(() => {
    function handleResize() {
      console.log('😊', window.innerWidth)
      setBrowserWidth(window.innerWidth)
    }
    
    window.addEventListener("resize", handleResize)
    
    handleResize()
    
    return () => { 
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
  <>
    <Head>
      <meta property="og:url"           content="https://wendogo.com/waitinglist" />
      <meta property="og:type"          content="website" />
      <meta property="og:title"         content="Wendogo" />
      <meta property="og:description"   content="Jeu concours - Préinscription au webinar" />
      <meta property="og:image"         content="https://wendogo.com/static/media/wendogo_jeu_concours.png?" /> 
      <title>Wendogo</title>
      <meta name="description"          content="Jeu concours - Préinscription au webinar"/>
    </Head>
    <div className="section-21 wf-section" ref={myElementRef}>
      <div className="MenuStickystyles__StickyHeader-sc-ngpxs4-0 dWKCRV">
          <div className="MenuStickystyles__StickyContainer-sc-ngpxs4-1 evdTmz">
              <Link href="/" className="Logostyles__LogoLink-sc-10zpnfr-0 jJHAoQ">
                  <WendogoLogoIcon/>
              </Link>
              <button type="button" className="MenuStickystyles__StickyMenuButton-sc-ngpxs4-2 jspYCr">
              <svg height={24} viewBox="0 0 24 24" width={24} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" className="MenuStickystyles__MenuPicto-sc-ngpxs4-3 gMGCqw">
                  <use xlinkHref="#p_95qQ" />
              </svg>
              </button>
              <button onClick={() => dispatch(open())} className="styles__BaseTypo-sc-198xhmk-0 aPHVI styles__Button-sc-wveu9u-1 fvtwMS MenuStickystyles__ButtonSimulation-sc-ngpxs4-4 epsuFN deldde" style={{fontSize: 'inherit'}} >
                  <span className="styles__Label-sc-wveu9u-2 hhrLkB"> Pré-inscription </span>
                  <svg height="16" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="styles__Arrow-sc-wveu9u-0 jXLObB">
                    <path d="M6.3,2.5,5,3.8,9.28,8,5,12.2l1.3,1.3L11.88,8Z"></path>
                  </svg>
              </button>
          </div>
      </div>
      <div className="container-24 w-container">
        <div className="w-layout-grid grid-9">

          <div id="w-node-_86446a7b-4a26-be4d-ff64-4aef4b8a7f77-59ce9515">
            <Birthday/>
            <h2 className="h2" style={{'color': 'white'}}>Le simulateur Wendogo arrive sur vos écrans le 27 Avril</h2>
            <p style={{'color': 'white'}} className="BlocOutils__Description-sc-10c9hjh-4 eQpKZn">En attendant, enregistrez-vous sur notre waitinglist et soyez les premiers à être 
                          notifiés de son lancement.</p>
              <Link href='/waitinglist' className="ButtonNavbar__Button"  onClick={() => dispatch(open())}>
                  <span className="ButtonNavbar__Label"> Pré-inscription </span>
              </Link>             
          </div>
          <div id="w-node-_4f7e79ed-2e33-7951-4dfc-71bf1fda6abb-59ce9515">
            <div className="flex-horizontal">
              <div className="marquee">
                <div className="marquee-vertical-css w-embed" />
                <div className="marquee-cover" />
                <div className="track-vertical-alt">
                  <div className="flex-vertical marquee-fix">
                    <div className="icon-container a" />
                    <div className="spacer-30 _15-xsvp" />
                    <div className="icon-container b" />
                    <div className="spacer-30 _15-xsvp" />
                    <div className="icon-container c" />
                    <div className="spacer-30 _15-xsvp" />
                    <div className="icon-container d" />
                    <div className="spacer-30 _15-xsvp" />
                    <div className="icon-container e" />
                    <div className="spacer-30 _15-xsvp" />
                    <div className="icon-container" />
                  </div>
                </div>
              </div>
              <div className="marquee">
                <div className="marquee-cover" />
                <div className="track-vertical">
                  <div className="flex-vertical marquee-fix">
                    <div className="icon-container e" />
                    <div className="spacer-30 _15-xsvp" />
                    <div className="icon-container b field-label-2" />
                    <div className="spacer-30 _15-xsvp" />
                    <div className="icon-container x" />
                    <div className="spacer-30 _15-xsvp" />
                    <div className="icon-container y" />
                    <div className="spacer-30 _15-xsvp" />
                    <div className="icon-container e" />
                    <div className="spacer-30 _15-xsvp" />
                    <div className="icon-container" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> 
    <div className="prkozs" >
      
      <div className="HeroHome__Hero-sc-12xal5z-2 kzjjkU">
    
        {displayContestDigit}
        <div className="HeroLeft__Container-sc-1axg5uv-1 iUeQnz HeroHome__HeroLeft-sc-12xal5z-3 gqHeYA">

          <div className='countdown-wrapper-sm' style={{justifyContent: "center"}} >
            
                <div className='sm-box'>
                  <h2 className="BlocOutils__Title-sc-10c9hjh-3 wniqW hdeuos" >JEU CONCOURS  🎉 </h2>
                </div>
          </div>
          <div className="HeroLeft__AbsoluteContainer-sc-1axg5uv-0 jXAqEP">
            <div className="HeroLeft__LocationContainer-sc-1axg5uv-2 jdouVU">
              <div className="sqdklm">
                <p className="BlocOutils__Transparency-sc-10c9hjh-2 jXRqut"> En 3 étapes, fait partir des 3 gagnants pour </p>
                <h2 className="sldmqs"> Un accompagnement GRATUIT par un expert pour un VISA / BOURSE pour le Canada <span>🇨🇦 </span> ou la France <span>🇫🇷</span>  </h2>
                <p className="HeroLeft__Text-sc-1axg5uv-4 jIotQW">Voici les règles:</p>
              </div>
              <div className="flex-container">
                <div className='giveaway_round1'>
                  <div>
                    <h2 className="Card__Title-sc-1qqjegm-4 bqicpW">Follow</h2>
                    <p>Follow nous et abonnes-toi à nos réseaux sociaux.</p>
                  </div>
                </div>      
                <div  className='giveaway_round2'>
                  <div>
                    <h2 className="Card__Title-sc-1qqjegm-4 bqicpW">Like</h2>
                    <p>Like nos pages, nos chaines et differents contenus.</p>
                  </div>
                </div>
                <div  className='giveaway_round3'>
                  <div>
                    <h2 className="Card__Title-sc-1qqjegm-4 bqicpW">Partage</h2>
                    <div>
                      <div className="fb-share-button" data-href="https://wendogo.com/waitinglist" data-width="200" data-type="button_count">
                        <Link target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fwendogo.com%2Fwaitinglist&amp;src=sdkpreparse" className="fb-xfbml-parse-ignore" rel="noreferrer">Partager</Link>
                      </div> 
                      <p> ce jeu concours en nous tagguant.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className='countdown-wrapper-sm'>
                <div className='sm-box'>
                  <a aria-label="Wendogo sur Facebook" href="https://www.facebook.com/WendogoHQ/" rel="noreferrer noopener" target="_blank" className="LegalSocial__SocialLink-sc-v4d14j-3 GeNZR1">
                    <img alt="" className='socialmediaicon'  src={Facebook}/>
                    <span className='legend1'>@WendogoHQ</span>
                  </a>
                </div>
                <div className='sm-box'>
                  <a aria-label="Wendogo sur Instagram" href="https://www.instagram.com/WendogoHQ/" rel="noreferrer noopener" target="_blank" className="LegalSocial__SocialLink-sc-v4d14j-3 GeNZR1">
                    <img alt="" className='socialmediaicon' src={Instagram}/>
                    <span className='legend1'>@WendogoHQ</span>
                  </a>
                </div>
                <div className='sm-box'>
                  <a aria-label="Wendogo sur YouTube" href="https://www.youtube.com/@WendogoHQ/" rel="noreferrer noopener" target="_blank" className="LegalSocial__SocialLink-sc-v4d14j-3 GeNZR1">
                    <img alt="" className='socialmediaicon' src={YouTube}/>
                    <span className='legend1'>@WendogoHQ</span>
                  </a>
                </div>
                <div className='sm-box'>
                  <a aria-label="Wendogo sur TikTok" href="https://www.tiktok.com/@WendogoHQ/" rel="noreferrer noopener" target="_blank" className="LegalSocial__SocialLink-sc-v4d14j-3 GeNZR1">
                    <img alt="" className='socialmediaicon' src={TikTok}/>
                    <span className='legend1'>@WendogoHQ</span>
                  </a>
                </div>
                <p className="styles__BaseTypo-sc-198xhmk-0 czksA-D styles__Title-sc-stsnxu-9 kKfUkn" style={{'color': 'white'}}><b>Clique sur nos réseaux sociaux ci-dessus. Puis abonnes toi, like et partage ☝️☝️ </b> </p>
              </div>
            </div>
          </div>
        </div>
        <div className="HeroHome__HeroRight-sc-12xal5z-4 jQdQfQ jQdQfs">
        
          <div className="Overlaystyles__Overlay-sc-18rcd8b-1 kvXygG HeroHome__HeroOverlay-sc-12xal5z-5 ebnoaB" aria-disabled="false" aria-label="Jouer la vidéo" role="button" tabIndex={0}>
            <picture>
              <source type="image/webp" srcSet={TravelPic} />
              <source srcSet={TravelPic} />
              <img alt="" size="(min-width: 1024px) 50vw, 100vw" className="Overlaystyles__Image-sc-18rcd8b-0 LXFTH" loading="lazy" src={TravelPic} />
            </picture>
          </div>
        </div>
      </div>
      
      <div className="BlocOutils__Content-sc-10c9hjh-1 jQpxOw mdsmede" style={{paddingTop:'0'}}>
        <h2 className="BlocOutils__Title-sc-10c9hjh-3 wniqW" style={{color:'white'}}>Bonne chance !</h2>
      </div>  
      <div className="BlocOutils__Content-sc-10c9hjh-1 jQpxOw" style={{paddingTop:'15px', height: '200px'}}>
        <h3 style={{color:'white', fontSize: '22px'}}>Les gagnants seront annoncés le </h3>
        <h2 className="nvidsoe">
          <p>
            <span>Samedi 27 Avril 2024 à 21h30</span>
            <span>, lors du webinar 👇 (il faut s'inscrire 😉)</span>
          </p>
        </h2>
      </div>  
    </div>
    <div className="conf-container " id="section-1852710000" data-title="sales copy & optin" data-block-color="0074C7" >
      <div className="containerInner ui-sortable">
        <div className=" bgCover noBorder borderSolid border3px cornersAll radius0 shadow0 P0-top P0-bottom P0H noTopMargin kdjeid" id="row--26856" data-trigger="none" data-animate="fade" data-delay={500} data-title="1 column row">
          <div id="col-full-180" className="col-md-12 innerContent col_left" data-col="full" data-trigger="none" data-animate="fade" data-delay={500} data-title="full column" style={{ outline: "none" }}>
            <div className="col-inner bgCover  noBorder borderSolid border3px cornersAll radius0 shadow0 P0-top P0-bottom P0H noTopMargin">
              <div className="de elHeadlineWrapper ui-droppable de-editable" id="tmp_subheadline-87108" data-de-type="headline" data-de-editing="false" data-title="sub-headline" data-ce="true" data-trigger="none" data-animate="fade" data-delay={500} data-gramm="false" style={{ marginTop: 15, outline: "none", cursor: "pointer" }} aria-disabled="false">
                <h2 className="ne elHeadline hsSize2 lh3 elMargin0 elBGStyle0 hsTextShadow0 deCapitalize" data-bold="inherit" data-gramm="false"  spellCheck="false"> Participez En Ligne À Notre <b>Conférence de lancement de votre App</b>  <div>
                    <u>
                      <b>Samedi 27 avril À 20h30 (Yaoundé)</b>
                    </u> .
                  </div>
                </h2>
              </div>
              <div className="de elHeadlineWrapper ui-droppable de-editable" id="headline-85770" data-de-type="headline" data-de-editing="false" data-title="headline" data-ce="true" data-trigger="none" data-animate="fade" data-delay={500} style={{ marginTop: 20, cursor: "pointer", outline: "none" }} aria-disabled="false" data-google-font="Abel">
                <div className="ne elHeadline hsSize3 elMargin0 elBGStyle0 hsTextShadow0 deUppercase lh4 mfs_26" style={{ textAlign: "center", fontSize: 44, color: "rgb(255, 255, 255)", wordBreak: "break-word", position: "relative", zIndex: 0 }} data-bold="inherit"  spellCheck="false"> <span style={{color:'#0154c0', fontFamily: '"Pensum Pro", sans-serif'}}>Wendogo</span> : Une façon simple et revolutionnaire de demander un visa 🇨🇦🇫🇷&nbsp; </div>
              </div>
            </div>
          </div>
        </div>
        <div className=" bgCover noBorder borderSolid border3px cornersAll radius0 shadow0 P0-top P0-bottom P0H noTopMargin" id="row--62042" data-trigger="none" data-animate="fade" data-delay={500} data-title="1 column row" style={{ paddingTop: 0, paddingBottom: 0, margin: "0px auto", outline: "none" }}>
          <div id="col-full-129" className="col-md-12 innerContent col_left" data-col="full" data-trigger="none" data-animate="fade" data-delay={500} data-title="1st column" style={{ outline: "none" }}>
            <div className="col-inner bgCover  noBorder borderSolid border3px cornersAll radius0 shadow0 P0-top P0-bottom P0H noTopMargin">
              <div className="de elBTN elAlign_center elMargin0 ui-droppable de-editable" id="tmp_button-75082" data-de-type="button" data-de-editing="false" data-title="button" data-ce="false" data-trigger="none" data-animate="fade" data-delay={500} style={{ outline: "none", cursor: "pointer" }} data-elbuttontype={1} aria-disabled="false">
                <a onClick={() => dispatch(open())} href="#open-popup" className="styles__BaseTypo-sc-198xhmk-0 aPHVI styles__Button-sc-wveu9u-1 fvtwMS MenuStickystyles__ButtonSimulation-sc-ngpxs4-4 epsuFN" style={{ }} rel="noopener noreferrer">
                  <span className="elButtonMain">JE RÉSERVE MA PLACE</span>
                </a>
              </div>
              <div className="de elBTN elAlign_center elMargin0 ui-droppable de-editable" id="tmp_button-75082" data-de-type="button" data-de-editing="false" data-title="button" data-ce="false" data-trigger="none" data-animate="fade" data-delay={500} style={{  outline: "none", cursor: "pointer" }} data-elbuttontype={1} aria-disabled="false">
              <div id="col-center-left-131" className="innerContent col_right ui-resizable col-md-3" data-col="center" data-trigger="none" data-animate="fade" data-delay={500} data-title="2nd column" style={{ outline: "none" }}>
                <div className="col-inner bgCover  noBorder borderSolid border3px cornersAll radius0 shadow0 P0-top P0-bottom P0H noTopMargin xckdde" style={{ padding: "0 5px", color: 'white' }}>
                  <div className="de elImageWrapper de-image-block elMargin0 ui-droppable elAlign_center de-editable" id="tmp_image-48583-109" data-de-type="img" data-de-editing="false" data-title="image" data-ce="false" data-trigger="none" data-animate="fade" data-delay={500} style={{ marginTop: 5, outline: "none", cursor: "pointer" }} aria-disabled="false">
                    <img src="https://go.mindeo.com/hosted/images/75/97772042ac4937a25aab9fde3d50e8/ezgif.com-gif-maker-50-.gif" className="elIMG ximg imgOpacity1" alt="" width={80} tabIndex={0} style={{display: 'inline', borderRadius: "10px"}} />
                  </div>
                  <div className="de elHeadlineWrapper ui-droppable de-editable" id="tmp_headline1-75536-155" data-de-type="headline" data-de-editing="false" data-title="headline" data-ce="true" data-trigger="none" data-animate="fade" data-delay={500} style={{ marginTop: 5, outline: "none", cursor: "pointer", fontFamily: "Abel, Helvetica, sans-serif !important" }} data-google-font="Abel" aria-disabled="false">
                    <h1 className="Card__Title-sc-1qqjegm-4 bqicpW">
                      Mercredi 27 avril
                    </h1>
                  </div>
                  <div className="de elHeadlineWrapper ui-droppable de-editable" id="tmp_subheadline-28019-185" data-de-type="headline" data-de-editing="false" data-title="sub-headline" data-ce="true" data-trigger="none" data-animate="fade" data-delay={500} data-gramm="false" style={{ marginTop: 0, outline: "none", cursor: "pointer" }} aria-disabled="false">
                    <h2 className="Card__Text-sc-1qqjegm-5 iOmyQf"> à 20h30 (heure de Yaoundé) </h2>
                  </div>

                </div>
                <div>
                  <div className="HeroHome__Hero-sc-12xal5z-2  cnvfro" >   
                    <div className=" gqHeYA" style={{marginTop: 50,  color: 'white', textAlign: 'left', gridColumn : '2 / auto'}}>
                        <div className='ldmksf'>
                        <h1 className="Banner__Title-sc-yqcec5-4 zDQmH" style={{textAlign: 'inherit'}}>AU PROGRAMME</h1>
                          <div className="column-19 w-col w-col-6 w-col-stack" style={{width: '100%'}}>
                            <div className="div-block-2">
                              <div className="work__item-num">1</div>
                              <h2 className="steps">Pourquoi Wendogo ?</h2>
                            </div>
                            <div className="div-block-3">
                              <div className="work__item-num">2</div>
                              <h2 className="steps">Démo de l'Application</h2>
                            </div>
                            <div className="div-block-4">
                              <div className="work__item-num">3</div>
                              <h2 className="steps">FAQ (Foir aux questions)</h2> 
                            </div>
                            <div className="div-block-7">
                              <div className="de elBTN elMargin0 ui-droppable de-editable" id="tmp_button-75082" data-de-type="button" data-de-editing="false" data-title="button" data-ce="false" data-trigger="none" data-animate="fade" data-delay={500} style={{ marginTop: 25, outline: "none", cursor: "pointer" }} data-elbuttontype={1} aria-disabled="false">
                                <a onClick={() => dispatch(open())} href="#open-popup" className="styles__BaseTypo-sc-198xhmk-0 aPHVI styles__Button-sc-wveu9u-1 fvtwMS MenuStickystyles__ButtonSimulation-sc-ngpxs4-4 epsuFN" rel="noopener noreferrer">
                                  <span className="elButtonMain">JE RÉSERVE MA PLACE</span>
                                </a>
                              </div>
                            </div>
                            
                          </div>
                        </div>
                    </div>
                    <div className='mdpoeds'>
                      <h1>Avec</h1>
                    </div>
                    <div className="HeroHome__HeroRight-sc-12xal5z-4 jQdQfQ azkvnx">
                      <div className='emedep'><img src={BorisBrice}/></div>
                      <div className={(browserWidth<670 || browserWidth>960)? 'kpdiem' : 'kpdien'}>
                        <div className={'topldmq '+((isShowMore && isBoris) ? "" : 'kpdiem-p-top') }>
                          <p className="ekhdHX">Boris GUIFFOT</p>
                          <p className='iMIwlL'>Co-fondateur et Responsable Advisor </p>
                          <p className='idewlL'><span>Ingénieur en cybersécurité à Zürich, il est arrivé en Europe par la France en 2008. </span>
                            <span className={(isShowMore && isBoris) ? "show" : "hide" } >Il a aidé sa mère à obtenir un visa pour la France en 2012, ainsi que son petit frère en 2014. 
                              Plus tard, il a assisté avec succès ses 6 frères pour le Canada et la France. En 2022, environ 30 personnes ont obtenu leur visa grâce à son service. Aujourd'hui, il aspire à partager 
                              son expertise avec un public plus large. 
                            </span>
                            <span><Link className={"link-opacity-100 "+ ((isShowMore && isBoris) ? "hide" : "show") }  onClick={() => handleClickShowMore(true, true)}>...Voir Plus</Link></span>
                            <span><Link className={"link-opacity-100 "+ ((isShowMore && isBoris) ? "show" : "hide") }  onClick={() => handleClickShowMore(false, true)}> Voir Moins</Link></span>
                          </p>
                        </div>
                        <div className={'ifhetys '+((isShowMore && !isBoris) ? "" : 'kpdiem-p-top') }>
                          <p className="ekhdHX">Edgar KAMDEM</p>
                          <p className='iMIwlL'>Co-fondateur et Responsable Technique</p>
                          <p className='idewlL'>Ingénieur web à Paris, il possède une vaste expérience dans les processus applicatifs liés au web. 
                            <span className={(isShowMore && !isBoris) ? "show" : "hide" } > Depuis 2014 qu'il accompagne avec succès des personnes dans leur demande de visa, il a toujours été frustré par 
                            une chose : l'opacité et le manque de transparence de plusieurs organismes de demande de visa. Il décide alors avec Boris de créer une solution qui propose un
                              service d'accompagnement simple, transparent, rapide et moins cher.
                            </span>
                            <span><Link className={"link-opacity-100 "+ ((isShowMore && !isBoris) ? "hide" : "show") }  onClick={() => handleClickShowMore(true,false)}>...Voir Plus</Link></span>
                            <span><Link className={"link-opacity-100 "+ ((isShowMore && !isBoris) ? "show" : "hide") }  onClick={() => handleClickShowMore(false,false)}> Voir Moins</Link></span>
                          </p>
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
      <SubscriptionModal/> 
      <FloatingWhatsApp phoneNumber="330745493086" accountName="Wendogo" avatar={SocialMediaLogo} statusMessage="Répond en général dans l'heure" 
                        chatMessage={'Salut toi 🤝 \nSi tu as une question, suis ces étapes pour obtenir une assistance rapide :\n1. Présente toi\n2. Indique l\'objet de ton message \n3. Décris clairement ton problème 😉'}
                        placeholder={"Racontes nous ce qui te préoccupe"} chatboxHeight={500} CSSProperties={{color:'#001435'}}/>
    </div>
    <Footer/>
  </>
  )
}
export default WaitingList
