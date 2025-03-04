'use client';


// Import img 
import backgroundImg2 from '../assets/optimized/1000_F_534931774_iiLVveToIVDuO89bZdeLs770iR7Lnm2a.webp'; 
import WorldNoBorders from '../assets/optimized/AdobeStock_559662042_Preview.webp'
import BlockCourtier1 from '../assets/group-portrait-five-african-business-colleagues-standing-row-office_484651-18709.avif'
import BlockCourtier2 from '../assets/optimized/240_F_271683964_RV5TD7e4GN67UBFhvBvtltNO4hJ5aTQs.webp'
import BlockCourtier3 from '../assets/beautiful-woman-standing-front-colleagues-group-african-american-business-people-working-office-together_146671-45002.avif'
import FighterProgramLogo from '../assets/companies_that_trust_us/fighters_program_logo.png'
import GlobalVisaFlair from '../assets/companies_that_trust_us/global_visa_flair.jpeg'
import StationF from '../assets/companies_that_trust_us/station_F_Logo.png'
import RefusEcole0 from '../assets/refus/Refus_ecole.webp'
import RefusEcole1 from '../assets/refus/Refus_ecole_1.webp'
import RefusEcole2 from '../assets/refus/Refus_ecole_2.webp'
import RefusEcole3 from '../assets/refus/Refus_ecole_3.webp'
import RefusVisa from '../assets/refus/Refus_visa.webp'
import ScanningDoc from '../assets/Homepage_pics/dcouments-ligne-scanning.jpg'
import CVOptimization from '../assets/Homepage_pics/cv_lm_ai.jpg'
import VisaOnHand from '../assets/Homepage_pics/visa_on_hand.webp'
import ConferenceCall from '../assets/Homepage_pics/conference call.jpg'

// Import svg
import WendogoLogo from '../assets/wendogo_logo.svg'
import  DropDownIcon from '../assets/dropdown_icon.svg' 


import Image from 'next/image';
import Head from 'next/head';  

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
// import Head from 'next/head'
 
import { FloatingWhatsApp } from 'react-floating-whatsapp';
import Footer from '../components/Footer'; 

function HomePage(){
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Array of all image sources
  const images = [RefusEcole0, RefusEcole1, RefusEcole2, RefusEcole3, RefusVisa];
  
  // Titles for each slide
  const titles = [
    "Niveau insuffisant pour la formation", 
    "Niveau insuffisant au regard d'autres candidatures", 
    "Compétences déjà acquises",
    "Capacité d'accueil atteinte",
    "Motif du refus de Visa"
  ];
  
  // Descriptions for each slide
  const descriptions = [
    "Grâce à notre simulateur doté d’algorithmes puissants,  nous analysons tes bulletins via IA pour te recommander des formations les plus adaptées à ton profil académique évitant ainsi des choix inappropriés",
    "Nous t'aidons à renforcer ton dossier (CV, lettres de motivation, certifications) pour te démarquer des autres candidats",
    "L’IA de Wendogo t'oriente  vers des formations plus avancées ou complémentaires pour éviter ce motif de refus",
    "Nous optimisons ta stratégie de candidature en ciblant des établissements avec une meilleure disponibilité et en diversifiant les options",
    "Nous t'accompagnons pour un dossier solide et complet (justificatifs, preuve de ressources, lettre de motivation optimisée) afin d’éviter les incohérences et d’augmenter les chances d’acceptation"
  ];
  
  // Handle navigation
  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };
  
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };
   
  
  // Update browser width on resize
  useEffect(() => {
    const handleResize = () => {
      setBrowserWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
    const [countdown, setCountdown] = useState(0)
    const [bannerAnimationClassList, updateBannerAnimationClassList] = useState(["bEueds", "egKQIA"])
    //const [progressBarClass, setProgressBarClass] = useState('lahlbf')
    const [browserWidth, setBrowserWidth] = useState(0) 
    const [displayOverlayMenu, setDisplayOverlayMenu] = useState(false)
    const handleClickBurgerButton = () => {
      setDisplayOverlayMenu(!displayOverlayMenu)
    }
    const [displaySubMenu1, setDisplaySubMenu1] = useState(false)
    const [displaySubMenu2, setDisplaySubMenu2] = useState(false)
    const [displaySubMenu3, setDisplaySubMenu3] = useState(false)
    const toggleNavSubMenu1 = () => {
      setDisplaySubMenu1(!displaySubMenu1)
      setDisplaySubMenu2(false)
      setDisplaySubMenu3(false)
    }
    const toggleNavSubMenu2 = () => {
      setDisplaySubMenu2(!displaySubMenu2)
      setDisplaySubMenu1(false)
      setDisplaySubMenu3(false)
    }
    const toggleNavSubMenu3 = () => {
      setDisplaySubMenu3(!displaySubMenu3)
      setDisplaySubMenu1(false)
      setDisplaySubMenu2(false)
    }
    useEffect(() => {
      function handleResize() {
        setBrowserWidth(window.innerWidth)
      }
      
      window.addEventListener("resize", handleResize)
      
      handleResize()
      
      return () => { 
        window.removeEventListener("resize", handleResize)
      }
    }, [])

    useEffect(() => {
      let timeout;
      if(browserWidth>768){

        setTimeout(() => { 
          console.log('HEHE')
          if((countdown >= 0 && countdown<5) ){
            updateBannerAnimationClassList(["bEueds", "egKQIA"])
            //setProgressBarClass('dctgrL')
          }
          if(countdown >= 5 && countdown<10){
            updateBannerAnimationClassList(["ckXPUg", "egKQIA"])
          }
          if(countdown >= 10 && countdown<15){
            updateBannerAnimationClassList(["PWeEw", "egKQIA"])
          }
          if (countdown >= 15) {
            setCountdown(0)         
          }else{
            setCountdown(countdown + 1)
          }
        }, 1000) 
      }else{
        setCountdown(0)  
      }
      if(browserWidth>1024){
        setDisplaySubMenu1(false)
        setDisplaySubMenu2(false)
        setDisplaySubMenu3(false)        
      }
      return () => clearTimeout(timeout)
    }, [countdown, browserWidth])
 
    const [scrollTop, setScrollTop] = useState(0)
    const myElementRef = useRef(null)
    const [positionLeft, setPositionLeft] = useState(0)

    const [widthBanner, setWidthBanner] = useState(0)
  
    // useLayoutEffect(() => {
    //   setWidthBanner(myElementRef.current.offsetWidth)
    // }, [])
    const logoContainerStyle = {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '30px',
      margin: '20px auto',
      maxWidth: '1200px'
    };
    
    const logoImageStyle = {
      objectFit: 'contain',
      maxHeight: '80px',
      width: 'auto'
    };
    const logoImageStyle1 = {
      objectFit: 'contain',
      maxHeight: '180px',
      width: 'auto'
    };
    useEffect(() => {
      
      const handleScroll = () => {
        setScrollTop(window.scrollY)
        const el = myElementRef.current;
        if(el){
          setPositionLeft(el.scrollLeft)
          setWidthBanner(el.offsetWidth)
        }
      }
      //console.log('positionLeft ', positionLeft, browserWidth, countdown, widthBanner)
      
      window.addEventListener('scroll', () => handleScroll())
      const element = myElementRef.current;
      element.addEventListener("scroll", () => handleScroll())  
      console.log('aaaa ', window.pageYOffset)
      if(browserWidth<=768){

          if((positionLeft >= widthBanner/2) && (positionLeft < widthBanner)){
            console.log('2')
            setCountdown(5)
            updateBannerAnimationClassList(["ckXPUg", "egKQIA"])
          }else if( positionLeft>=widthBanner){
            console.log('3')
            setCountdown(10)
            updateBannerAnimationClassList(["PWeEw", "egKQIA"])
          }else{
            console.log('1')
            setCountdown(0)
            updateBannerAnimationClassList(["bEueds", "egKQIA"])
          }

      }

      return () => {
        window.removeEventListener('scroll', () => handleScroll())
      }
    }, [browserWidth, widthBanner, positionLeft,countdown])    

    //const router = useRouter()
    // const goToWaitingList = () => {
    //   router.push('/waitinglist', { replace: true })
    // }

    return (
      <>
      <Head>
        <title>Wendogo - Expert en ligne pour organiser vos voyages à l'étranger</title>
        <meta
          name="description"
          content="Wendogo, votre expert en ligne pour simplifier vos démarches de mobilité internationale."
        />
        <meta property="og:title" content="Wendogo - Spécialiste en Mobilité Internationale" />
        <meta
          property="og:description"
          content="Expert pour organiser vos voyages à l'étranger."
        />
        <meta
          property="og:image"
          content="https://wendogo.com/static/media/wendogo_jeu_concours.webp"
        />
      </Head>
        <div >
            <nav className={"Navbarstyles__Navigation1 "+(scrollTop>900 ? "fBUtVg" : "kebTzo")}>
              <div className={"Navbarstyles__Navigation2 "+(scrollTop>900 ? "jBwgPO" : "jigKlE")}>
                <div className="Navbarstyles__Navigation3">
                  <a aria-current="page" aria-label="Aller à l'accueil" className="Navbarstyles__LogoLink" href="/" >
                  {/* <Image src={WendogoLogo}  className={scrollTop>900 ? "WendogoLogoText" : ""} alt='WendogoLogo'/> */}
                    <WendogoLogo className={scrollTop>900 ? "WendogoLogoText" : ""} alt='WendogoLogo'/>
                  </a>
                  <button aria-label="Ouvrir le menu" tabIndex={0} type="button" className="Navbarstyles__BurgerButton" onClick={() => handleClickBurgerButton()}>
                    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className="Navbarstyles__BurgerButtonIcon">
                      <path d="M4.5,7c0-.28,.22-.5,.5-.5H27c.28,0,.5,.22,.5,.5v2c0,.28-.22,.5-.5,.5H5c-.28,0-.5-.22-.5-.5v-2Zm0,8c0-.28,.22-.5,.5-.5H27c.28,0,.5,.22,.5,.5v2c0,.28-.22,.5-.5,.5H5c-.28,0-.5-.22-.5-.5v-2Zm.5,7.5c-.28,0-.5,.22-.5,.5v2c0,.28,.22,.5,.5,.5H27c.28,0,.5-.22,.5-.5v-2c0-.28-.22-.5-.5-.5H5Z" />
                    </svg>
                  </button>
                  <div className={"Navbarstyles__Overlay "+(displayOverlayMenu ? 'fuelvv' : '')}>
                    <ul role="menu" className={"Navbarstyles__Menu "+ (displayOverlayMenu ? 'kmMdJe' : '')}>
                      <li role="none" className="Navbarstyles__MenuTitle-sc-mi7mu3-13 hIKZgg">
                        <span>Menu</span>
                        <button type="button" className="Navbarstyles__MenuClose-sc-mi7mu3-11 amWv" onClick={() => handleClickBurgerButton()}>
                          <svg height={16} viewBox="0 0 16 16" width={16} xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="Navbarstyles__MenuCloseIcon-sc-mi7mu3-12 fdSdbf">
                            <path d="M13.5,12.16,9.29,8l4.17-4.2L12.16,2.5,8,6.71,3.79,2.54,2.5,3.83,6.71,8,2.54,12.21,3.83,13.5,8,9.29l4.2,4.17Z" />
                          </svg>
                        </button>
                      </li>
                      <li aria-expanded="false" role="menuitem" tabIndex={0} className="Navbarstyles__MenuItem Navbarstyles__MenuItem-common">
                        <span className="Navbarstyles__MenuItemLabel" onClick={() => toggleNavSubMenu1()}>
                          <span>Je me lance</span> 
                          <DropDownIcon className={`Navbarstyles__MenuItemArrow menu-arrow ${displaySubMenu1 ? 'menu-arrow-rotated' : ''}`} />
                        </span>
                        <ul className={"Navbarstyles__SubMenu "+(displaySubMenu1 ? 'lowcCT subMenu1' : '')} >
                          <li className="Navbarstyles__SubMenuFirstItem">
                            <a tabIndex={0} className="LinkLabel__Link" href="/simulation/home">
                              <span href='/simulation/home' className="LinkLabel__Label">Visa pour la France</span>
                            </a>
                          </li>
                          <li>
                            <a tabIndex={0} className="LinkLabel__Link" href="/simulation/home">
                            <span href='/simulation/home' className="LinkLabel__Label">Visa pour le Canada </span>
                            </a>
                          </li>
                        </ul>
                      </li>
                      <li aria-expanded="false" aria-controls="7d517232" role="menuitem" tabIndex={0} className="Navbarstyles__MenuItem Navbarstyles__MenuItem-common">
                        <span className="Navbarstyles__MenuItemLabel" onClick={() => toggleNavSubMenu2()}>
                          <span>Ressources</span>
                          {/* <Image src={DropDownIcon} style={{transform : (displaySubMenu2 ? "rotate(180deg)" : '')}} alt='DropDownIcon'/> */}
                          <DropDownIcon className={`Navbarstyles__MenuItemArrow menu-arrow ${displaySubMenu2 ? 'menu-arrow-rotated' : ''}`} />
                        </span>
                        <ul id="7d517232" className={"Navbarstyles__SubMenu "+(displaySubMenu2 ? 'lowcCT subMenu2' : '')}>
                          <li className="Navbarstyles__SubMenuFirstItem">
                            <a tabIndex={0} className="LinkLabel__Link" href="/work-permit-steps">
                              <span className="LinkLabel__Label">Permis de travail - Canada</span>
                            </a>
                          </li>
                          <li>
                            <a tabIndex={0} className="LinkLabel__Link" href="/scholarship-program-canada">
                              <span className="LinkLabel__Label"> Programme de bourse d'étude </span>
                            </a>
                          </li>
                          <li>
                            <a tabIndex={0} className="LinkLabel__Link" href="/immigrate-to-canada">
                              <span className="LinkLabel__Label"> Comment immigrer au Canada ?</span>
                            </a>
                          </li>
                          <li>
                            <a tabIndex={0} className="LinkLabel__Link" href="/study-in-france">
                              <span className="LinkLabel__Label"> Etudier en France </span>
                            </a>
                          </li>
                        </ul>
                      </li>
                      <li aria-expanded="false" aria-controls="e75b56b9" role="menuitem" tabIndex={0} className="Navbarstyles__MenuItem Navbarstyles__MenuItem-common">
                          <span className="Navbarstyles__MenuItemLabel" onClick={() => toggleNavSubMenu3()}>
                            <span>À propos</span>
                            {/* <Image src={DropDownIcon} style={{transform : (displaySubMenu3 ? "rotate(180deg)" : '')}}  alt='DropDownIcon'/> */}
                            <DropDownIcon className={`Navbarstyles__MenuItemArrow menu-arrow ${displaySubMenu3 ? 'menu-arrow-rotated' : ''}`} />
                            {/* <DropDownIcon /> */}
                          </span>
                          <ul id="e75b56b9" className={"Navbarstyles__SubMenu "+(displaySubMenu3 ? 'lowcCT subMenu3' : '')}>
                          <li>
                            <a tabIndex={0} className="LinkLabel__Link" href="/wendogo-mission">
                              <span className="LinkLabel__Label"> Pourquoi passer par Wendogo ? </span>
                            </a>
                          </li>
                          <li>
                            <a tabIndex={0} className="LinkLabel__Link" href="/about-us">
                              <span className="LinkLabel__Label"> Qui sommes nous ? </span>
                            </a>
                          </li>
                        </ul>
                      </li>
                      <li className="Navbarstyles__MenuButtonItems-sc-mi7mu3-6 eonXWL">
                        {/* <Link href='/waitinglist' className="ButtonLogin__Button"> Se connecter </Link> */}
                        <a href='/simulation/home' className="ButtonNavbar__Button">
                          <span className="ButtonNavbar__Label"> Je me lance </span>
                          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="ButtonNavbar__Arrow">
                            <path d="M15.3,11.17l-2.51-2.49,1.18-1.18,4.53,4.5-4.53,4.5-1.18-1.18,2.51-2.49H5.5v-1.66H15.3Z" />
                          </svg>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </nav>
            <Head>
                {/* Essential Meta Tags */}
                <title>Wendogo - Expert en orientation pour études en France</title>
                <meta name="description" content="Évaluez vos chances d'admission et simplifiez vos démarches d'études en France avec Wendogo, votre plateforme d'orientation intelligente." />
                <meta name="keywords" content="études France, orientation études, visa étudiant, admission université France, études supérieures France, Campus France" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                
                {/* Open Graph / Facebook */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://wendogo.com/" />
                <meta property="og:title" content="Wendogo - Votre avenir étudiant en France commence ici" />
                <meta property="og:description" content="Évaluez vos chances d'admission et simplifiez vos démarches d'études en France avec Wendogo, votre plateforme d'orientation intelligente." />
                <meta property="og:image" content={backgroundImg2} />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta property="og:locale" content="fr_FR" />
                <meta property="og:site_name" content="Wendogo" />

                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:url" content="https://wendogo.com/" />
                <meta name="twitter:title" content="Wendogo - Votre avenir étudiant en France commence ici" />
                <meta name="twitter:description" content="Évaluez vos chances d'admission et simplifiez vos démarches d'études en France avec Wendogo." />
                <meta name="twitter:image" content="https://wendogo.com/twitter-image.jpg" />

                {/* Other Important Meta Tags */}
                <meta name="robots" content="index, follow" />
                <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                <meta name="language" content="French" />
                <meta name="author" content="Wendogo" />

                {/* Favicon */}
                <link rel="icon" href="/favicon.ico" />
                <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

                {/* Canonical URL */}
                <link rel="canonical" href="https://wendogo.com/" />
            </Head> 
            
<div className="HeroPictureRatestyles__HeroPictureRateContainer-sc-s8xhxd-0 fCWUzd" style={{background: '#333'}}>
	<div className="HeroPictureRatestyles__LeftSection-sc-s8xhxd-1 dGQEox" style={{marginTop: '100px'}}>
		<h1 className="HeroLeft__Title-sc-1axg5uv-3 jDYqud" style={{color:'white'}}> Préparez ses études pour la France n'a jamais été aussi simple </h1>
		<div className="main-screen__content-subscribe"  style={{color:'white'}}> Avec notre IA experte et plus de 50 000 formations recensées, prépare ton projet d'étude en France plus vite et plus efficacement. </div>
		<div className="HeroPictureRatestyles__CTAContainer-sc-s8xhxd-4 geqbtd">
    <button className="PrimaryButton__Container-sc-1vkvp7q-0 iroZSn HeroLeft__PrimaryButton-sc-1axg5uv-6 jJuKZd">
                      <span className="PrimaryButton__Overlay-sc-1vkvp7q-3 sSEIO">
                        <span className="PrimaryButton__OverlayBackground-sc-1vkvp7q-4 kxNCsz">
                          <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className="PrimaryButton__Arrow-sc-1vkvp7q-1 crhpBB">
                            <path d="M20.7454 14.8908L17.1664 11.3187L18.7381 9.75L25 16L18.7381 22.25L17.1664 20.6813L20.7454 17.1092H7V14.8908H20.7454Z" />
                          </svg>
                        </span>
                      </span>
                      <Link href='/simulation/home' >
                        <span className="PrimaryButton__Label-sc-1vkvp7q-2 kVCvkJ"> Je me lance </span>
                      </Link>
                    </button>
		</div>
		<div className="HeroPictureRatestyles__Checks-sc-s8xhxd-8 kNXFIj" /> </div>
	<div className="HeroPictureRatestyles__RightSection-sc-s8xhxd-9 jbJlkC" style={{marginTop: '100px'}}>
		<div className="HeroPictureRatestyles__Wrapper-sc-s8xhxd-10 jUWPqd">
			<div className="HeroPictureRatestyles__ImageWrapper-sc-s8xhxd-11 hqZtQD">
        <video autoPlay loop muted playsInline>
          <source src={process.env.NEXT_PUBLIC_PUBLIC_URL+'/wendogo_homepage_full.mp4'} type="video/mp4"/>
          Votre navigateur ne supporte pas la lecture des vidéos.
        </video>
				</div>
			 
		</div>
	</div>
</div>
            <div className="content" id="content" style={{paddingTop: '50px'}}>
              <section className="styles__Main-sc-kz84w6-0">
                <h2 className="h2" style={{ textAlign: 'center' }}>
                  Ils nous font confiance <br />
                </h2>
                <div style={logoContainerStyle}>
                  <Image src={StationF} alt="" style={logoImageStyle} />
                  <Image src={FighterProgramLogo} alt="" style={logoImageStyle} />
                  <Image src={GlobalVisaFlair} alt="" style={logoImageStyle1} />
                </div>
              </section>   
              <section>
                  <main className="styles__Main-sc-kz84w6-0 gEFmYD"> 
                      <div className="styles__Grid-sc-10gqksz-1 iuHviD BlocOutils__Container-sc-10c9hjh-0 fGvXyl">
                        <div className="BlocOutils__Content-sc-10c9hjh-1 jQpxOw"> 
                          <h2 className="BlocOutils__Title-sc-10c9hjh-3 wniqW"> Nous minimisons au maximum ces types de refus.</h2>
                          <p className="BlocOutils__Description-sc-10c9hjh-4 eQpKZn">   </p>
                          
                        </div>
                        {browserWidth > 1024 ? (
        <div className="Laptop__Container-sc-1henh52-0 ebnCSa">
          <div className="Sliderstyles__ImageContainer-sc-jd0rgd-6 isxeYt">
            {images.map((img, index) => (
              <picture key={index}>
                <Image 
                  className={`Sliderstyles__Image-sc-jd0rgd-7 ${index === currentIndex ? "kCpYFv" : "CtOpC"}`} 
                  src={img} 
                  alt="" 
                />
              </picture>
            ))}
          </div>
          <div className="Laptop__Content-sc-1henh52-2 bwEaWU">
            <h3 className="Sliderstyles__Title-sc-jd0rgd-0 kQjOWu">
              {titles[currentIndex]}
            </h3>
            <p className="Sliderstyles__Description-sc-jd0rgd-1 Laptop__Text-sc-1henh52-1 dzJZez hCTNwG">
              {descriptions[currentIndex]}
            </p>
            <div className="Sliderstyles__SlideContainer-sc-jd0rgd-4 exfKJT">
              {images.map((_, index) => (
                <hr 
                  key={index}
                  className={`Divider-sc-1qii385-0 Sliderstyles__Slide-sc-jd0rgd-5 iyJAir ${index === currentIndex ? "LACWn" : "jaXoBy"}`} 
                />
              ))}
            </div>
            <div className="Laptop__ArrowContainer-sc-1henh52-3 lgqkPS">
              <button 
                aria-label="Précédent" 
                type="button" 
                onClick={handlePrevious} 
                className="ArrowButton__Container-sc-11aiclo-3 hRnQwB Sliderstyles__Previous-sc-jd0rgd-2 ENyIs"
              >
                <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className="ArrowButton__Arrow-sc-11aiclo-0 ArrowButton__Arrow1-sc-11aiclo-1 fhLDeK">
                  <path d="M20.7454 14.8908L17.1664 11.3187L18.7381 9.75L25 16L18.7381 22.25L17.1664 20.6813L20.7454 17.1092H7V14.8908H20.7454Z" />
                </svg>
                <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className="ArrowButton__Arrow-sc-11aiclo-0 ArrowButton__Arrow2-sc-11aiclo-2 fhLDeK">
                  <path d="M20.7454 14.8908L17.1664 11.3187L18.7381 9.75L25 16L18.7381 22.25L17.1664 20.6813L20.7454 17.1092H7V14.8908H20.7454Z" />
                </svg>
              </button>
              <button 
                aria-label="Suivant" 
                type="button" 
                onClick={handleNext}
                className="ArrowButton__Container-sc-11aiclo-3 doTHWK Sliderstyles__Next-sc-jd0rgd-3 jZecqw"
              >
                <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className="ArrowButton__Arrow-sc-11aiclo-0 ArrowButton__Arrow1-sc-11aiclo-1 bJwJPy">
                  <path d="M20.7454 14.8908L17.1664 11.3187L18.7381 9.75L25 16L18.7381 22.25L17.1664 20.6813L20.7454 17.1092H7V14.8908H20.7454Z" />
                </svg>
                <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className="ArrowButton__Arrow-sc-11aiclo-0 ArrowButton__Arrow2-sc-11aiclo-2 bJwJPy">
                  <path d="M20.7454 14.8908L17.1664 11.3187L18.7381 9.75L25 16L18.7381 22.25L17.1664 20.6813L20.7454 17.1092H7V14.8908H20.7454Z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      ) : browserWidth < 1024 && browserWidth > 768 ? (
        <div className="Tablet__Container-sc-2ocpeo-0 UcQSe">
          <div className="Tablet__Content-sc-2ocpeo-1 eyLBfp">
            <h3 className="Sliderstyles__Title-sc-jd0rgd-0 kQjOWu">
              {titles[currentIndex]}
            </h3>
            <p className="Sliderstyles__Description-sc-jd0rgd-1 dzJZez">
              {descriptions[currentIndex]}
            </p>
            <div className="Sliderstyles__SlideContainer-sc-jd0rgd-4 exfKJT">
              {images.map((_, index) => (
                <hr 
                  key={index}
                  className={`Divider-sc-1qii385-0 Sliderstyles__Slide-sc-jd0rgd-5 iyJAir ${index === currentIndex ? "LACWn" : "jaXoBy"}`} 
                />
              ))}
            </div>
          </div>
          <div className="Tablet__ImageController-sc-2ocpeo-2 qqeks">
            <button 
              aria-label="Précédent" 
              type="button" 
              onClick={handlePrevious}
              className="ArrowButton__Container-sc-11aiclo-3 hRnQwB Sliderstyles__Previous-sc-jd0rgd-2 ENyIs"
            >
              <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className="ArrowButton__Arrow-sc-11aiclo-0 ArrowButton__Arrow1-sc-11aiclo-1 fhLDeK">
                <path d="M20.7454 14.8908L17.1664 11.3187L18.7381 9.75L25 16L18.7381 22.25L17.1664 20.6813L20.7454 17.1092H7V14.8908H20.7454Z" />
              </svg>
              <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className="ArrowButton__Arrow-sc-11aiclo-0 ArrowButton__Arrow2-sc-11aiclo-2 fhLDeK">
                <path d="M20.7454 14.8908L17.1664 11.3187L18.7381 9.75L25 16L18.7381 22.25L17.1664 20.6813L20.7454 17.1092H7V14.8908H20.7454Z" />
              </svg>
            </button>
            <div className="Sliderstyles__ImageContainer-sc-jd0rgd-6 isxeYt">
              {images.map((img, index) => (
                <picture key={index}>
                  <Image 
                    className={`Sliderstyles__Image-sc-jd0rgd-7 ${index === currentIndex ? "kCpYFv" : "CtOpC"}`} 
                    src={img} 
                    alt="" 
                  />
                </picture>
              ))}
            </div>
            <button 
              aria-label="Suivant" 
              type="button" 
              onClick={handleNext}
              className="ArrowButton__Container-sc-11aiclo-3 doTHWK Sliderstyles__Next-sc-jd0rgd-3 jZecqw"
            >
              <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className="ArrowButton__Arrow-sc-11aiclo-0 ArrowButton__Arrow1-sc-11aiclo-1 bJwJPy">
                <path d="M20.7454 14.8908L17.1664 11.3187L18.7381 9.75L25 16L18.7381 22.25L17.1664 20.6813L20.7454 17.1092H7V14.8908H20.7454Z" />
              </svg>
              <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className="ArrowButton__Arrow-sc-11aiclo-0 ArrowButton__Arrow2-sc-11aiclo-2 bJwJPy">
                <path d="M20.7454 14.8908L17.1664 11.3187L18.7381 9.75L25 16L18.7381 22.25L17.1664 20.6813L20.7454 17.1092H7V14.8908H20.7454Z" />
              </svg>
            </button>
          </div>
        </div>
      ) : (
        <div className="Mobile__Container-sc-fyrimv-0 jERalJ">
          <h3 className="Sliderstyles__Title-sc-jd0rgd-0 kQjOWu">
            {titles[currentIndex]}
          </h3>
          <p className="Sliderstyles__Description-sc-jd0rgd-1 dzJZez">
            {descriptions[currentIndex]}
          </p>
          <div className="Mobile__Navbar-sc-fyrimv-1 kHmjuy">
            <button 
              aria-label="Précédent" 
              type="button" 
              onClick={handlePrevious}
              className="ArrowButton__Container-sc-11aiclo-3 hRnQwB Sliderstyles__Previous-sc-jd0rgd-2 ENyIs"
            >
              <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className="ArrowButton__Arrow-sc-11aiclo-0 ArrowButton__Arrow1-sc-11aiclo-1 fhLDeK">
                <path d="M20.7454 14.8908L17.1664 11.3187L18.7381 9.75L25 16L18.7381 22.25L17.1664 20.6813L20.7454 17.1092H7V14.8908H20.7454Z" />
              </svg>
              <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className="ArrowButton__Arrow-sc-11aiclo-0 ArrowButton__Arrow2-sc-11aiclo-2 fhLDeK">
                <path d="M20.7454 14.8908L17.1664 11.3187L18.7381 9.75L25 16L18.7381 22.25L17.1664 20.6813L20.7454 17.1092H7V14.8908H20.7454Z" />
              </svg>
            </button>
            <div className="Sliderstyles__SlideContainer-sc-jd0rgd-4 exfKJT">
              {images.map((_, index) => (
                <hr 
                  key={index}
                  className={`Divider-sc-1qii385-0 Sliderstyles__Slide-sc-jd0rgd-5 iyJAir ${index === currentIndex ? "LACWn" : "jaXoBy"}`} 
                />
              ))}
            </div>
            <button 
              aria-label="Suivant" 
              type="button" 
              onClick={handleNext}
              className="ArrowButton__Container-sc-11aiclo-3 doTHWK Sliderstyles__Next-sc-jd0rgd-3 jZecqw"
            >
              <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className="ArrowButton__Arrow-sc-11aiclo-0 ArrowButton__Arrow1-sc-11aiclo-1 bJwJPy">
                <path d="M20.7454 14.8908L17.1664 11.3187L18.7381 9.75L25 16L18.7381 22.25L17.1664 20.6813L20.7454 17.1092H7V14.8908H20.7454Z" />
              </svg>
              <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className="ArrowButton__Arrow-sc-11aiclo-0 ArrowButton__Arrow2-sc-11aiclo-2 bJwJPy">
                <path d="M20.7454 14.8908L17.1664 11.3187L18.7381 9.75L25 16L18.7381 22.25L17.1664 20.6813L20.7454 17.1092H7V14.8908H20.7454Z" />
              </svg>
            </button>
          </div>
          <div className="Sliderstyles__ImageContainer-sc-jd0rgd-6 isxeYt">
            {images.map((img, index) => (
              <picture key={index}>
                <Image 
                  className={`Sliderstyles__Image-sc-jd0rgd-7 ${index === currentIndex ? "kCpYFv" : "CtOpC"}`} 
                  src={img} 
                  alt="" 
                />
              </picture>
            ))}
          </div>
        </div>
      )}


                      </div>
                      <div className="ConnectSection-styles__ConnectSectionWrapper-sc-b6er0l-0 cEJUfy">
	<section className="CommonComponents-styles__Section-sc-1bkhv27-4 kSYCBF">
		<div style={{ maxWidth: 920, fontFamily: "Uivo, Helvetica, sans-serif" }} className="HomeTitle-styles__StyledTitle-sc-3v9hrw-0 FqeUK">
			<h3 style={{ margin: 0, textAlign: "center", fontWeight: 600 }} className="BlocOutils__Title-sc-10c9hjh-3 wniqW">
      Boostez vos chances d’admission avec notre IA et nos experts dédiés.
      </h3> </div>
	</section>
	<div className="PageSection-styled__StyledPageSection-sc-bo1t4i-0 dbQXcz">
		<div className="CommonComponents-styles__Container-sc-1bkhv27-1 ireHjh">
			<section className="CommonComponents-styles__Section-sc-1bkhv27-4 TextWithImage-styles__TextWithImageContainer-sc-1h6e103-0 kSYCBF JEoJV">
				<div className="TextWithImage-styles__TextWithImageColLeft-sc-1h6e103-1 hFREee">
					<div className="TextWithImage-styles__TextWithImageText-sc-1h6e103-3 gUPPGB">
						<div style={{ maxWidth: 800, fontFamily: "Uivo, Helvetica, sans-serif" }} className="HomeTitle-styles__StyledTitle-sc-3v9hrw-0 iIqquG">
							<h3 style={{ margin: 0, textAlign: "left", fontWeight: 700 }} className="Card__Title-sc-1qqjegm-4 bqicpW">
              Analyse automatique de tes relevés pour des recommandations précises

              
              </h3> </div> <span className="Card__Text-sc-1qqjegm-5 iOmyQf">
              Prends en photo ton relevé de notes  et laisse notre IA analyser instantanément ton profil. Plus besoin de remplir manuellement des formulaires ! Nous trouvons les formations les plus adaptées en fonction de tes résultats et aspirations. </span>
					</div>
					<div className="TextWithImage-styles__TextWithImageLinkMobile-sc-1h6e103-8 TroxI">
						<a color="#7E7C91" className="LinkWithArrow-styles__StyledLinkWithArrow-sc-gshyp2-0 iMAHuj" href="/product/interactive-guides"> <span>
                <span
                  style={{ fontWeight: 500 }}
                  className="Text-styles__StyledText-sc-1lbfrxz-0 eIHzDT"
                >
                  En savoir plus sur guides{/* */}&nbsp;
                  <span className="LinkWithArrow-styles__Arrow-sc-gshyp2-3 jyLUtt">
                    <div
                      color="#ED216F"
                      className="AnimatedArrow-styles__StyledAnimatedArrow-sc-1k9se9d-0 biFsGA"
                    >
                      <svg
                        width={18}
                        height={12}
                        viewBox="0 0 18 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M 0 7.1136 v -2.1136 H 9.7206 C 11.0995 4.9108 13.8946 5.282 15.5293 5.5132 C 14.4499 5.0264 12.8714 4.2292 12.0541 3.432 L 10.1948 1.6187 L 11.8544 0 L 18 6 L 11.8544 12 L 10.1948 10.3813 L 12.0541 8.5679 C 12.8901 7.7525 14.3688 6.9919 15.4295 6.5051 C 13.7698 6.7363 11.0745 7.1075 9.7206 7.1075 H 2.332 Z"
                          fill="#ED216F"
                        />
                      </svg>
                    </div>
                  </span> </span>
							</span>
						</a>
					</div>
				</div>
				<div className="TextWithImage-styles__TextWithImageColRight-sc-1h6e103-2 dKdAlx">
					<div className="TextWithImage-styles__TextWithImageWrapper-sc-1h6e103-4 bITtIs">
						<div>
							<div className="TextWithImage-styles__TextWithImageImg-sc-1h6e103-6 ZtLxi">
								<div className="LottieFile-styles__Canvas-sc-t4ls67-0 cOaUIN">
									 <Image src={ScanningDoc} alt="ScanningDoc" />
								</div>
							</div>
						</div>
						<div>
							<div className="TextWithImage-styles__TextWithImageImg-sc-1h6e103-6 kcKwQf"> <img src="https://cdn.stonly.com/website/6b52e978/images/platform-tours.png" alt="tours" /> </div>
						</div>
						<div>
							<div className="TextWithImage-styles__TextWithImageImg-sc-1h6e103-6 kcKwQf"> <img src="https://cdn.stonly.com/website/6b52e978/images/platform-checklists.png" alt="checklist" /> </div>
						</div>
						<div>
							<div className="TextWithImage-styles__TextWithImageImg-sc-1h6e103-6 kcKwQf">
								<div className="LottieFile-styles__Canvas-sc-t4ls67-0 cOaUIN">
									 <Image src={CVOptimization} alt="CVOptimization" />
								</div>
							</div>
						</div> <img src="https://cdn.stonly.com/website/6b52e978/images/image-placeholder.png" alt="" className="TextWithImage-styles__TextWithImagePlaceholder-sc-1h6e103-5 HZYXD" /> </div>
					<div className="TextWithImage-styles__TextWithImageLink-sc-1h6e103-7 gERARq">
						<a color="#7E7C91" className="LinkWithArrow-styles__StyledLinkWithArrow-sc-gshyp2-0 iMAHuj" href="/product/interactive-guides"> <span>
                <span
                  style={{ fontWeight: 500 }}
                  className="Text-styles__StyledText-sc-1lbfrxz-0 eIHzDT"
                >
                  En savoir plus sur l'analyse des relevés de notes{/* */}&nbsp;
                  <span className="LinkWithArrow-styles__Arrow-sc-gshyp2-3 jyLUtt">
                    <div
                      color="#ED216F"
                      className="AnimatedArrow-styles__StyledAnimatedArrow-sc-1k9se9d-0 biFsGA"
                    >
                      <svg
                        width={18}
                        height={12}
                        viewBox="0 0 18 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M 0 7.1136 v -2.1136 H 9.7206 C 11.0995 4.9108 13.8946 5.282 15.5293 5.5132 C 14.4499 5.0264 12.8714 4.2292 12.0541 3.432 L 10.1948 1.6187 L 11.8544 0 L 18 6 L 11.8544 12 L 10.1948 10.3813 L 12.0541 8.5679 C 12.8901 7.7525 14.3688 6.9919 15.4295 6.5051 C 13.7698 6.7363 11.0745 7.1075 9.7206 7.1075 H 2.332 Z"
                          fill="#ED216F"
                        />
                      </svg>
                    </div>
                  </span> </span>
							</span>
						</a>
					</div>
				</div>
			</section>
		</div>
	</div>
	<div className="PageSection-styled__StyledPageSection-sc-bo1t4i-0 bYoQmX">
		<div className="CommonComponents-styles__Container-sc-1bkhv27-1 ireHjh">
			<section reversed="" className="CommonComponents-styles__Section-sc-1bkhv27-4 TextWithImage-styles__TextWithImageContainer-sc-1h6e103-0 kSYCBF gLyNk">
				<div className="TextWithImage-styles__TextWithImageColLeft-sc-1h6e103-1 hFREee">
					<div className="TextWithImage-styles__TextWithImageText-sc-1h6e103-3 gUPPGB">
						<div style={{ maxWidth: 800, fontFamily: "Uivo, Helvetica, sans-serif" }} className="HomeTitle-styles__StyledTitle-sc-3v9hrw-0 iIqquG">
							<h4 style={{ margin: 0, textAlign: "left", fontWeight: 700 }} className="Card__Title-sc-1qqjegm-4 bqicpW">
              Booste ton CV et tes lettres de motivation avec notre expertise
              </h4> </div> <span className="Card__Text-sc-1qqjegm-5 iOmyQf">
              Ton dossier est la clé pour convaincre les écoles ! Wendogo optimise ton CV et tes lettres de motivation pour les rendre plus percutants et adaptés aux attentes des recruteurs académiques. Notre IA analyse les meilleures pratiques et nos experts t’aident à valoriser ton parcours. </span>
					</div>
					<div className="TextWithImage-styles__TextWithImageLinkMobile-sc-1h6e103-8 TroxI">
						<a color="#7E7C91" className="LinkWithArrow-styles__StyledLinkWithArrow-sc-gshyp2-0 iMAHuj" href="/solutions/contact-centers"> <span>
                <span
                  style={{ fontWeight: 500 }}
                  className="Text-styles__StyledText-sc-1lbfrxz-0 eIHzDT"
                >
                  En savoir plus sur agents{/* */}&nbsp;
                  <span className="LinkWithArrow-styles__Arrow-sc-gshyp2-3 jyLUtt">
                    <div
                      color="#ED216F"
                      className="AnimatedArrow-styles__StyledAnimatedArrow-sc-1k9se9d-0 biFsGA"
                    >
                      <svg
                        width={18}
                        height={12}
                        viewBox="0 0 18 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M 0 7.1136 v -2.1136 H 9.7206 C 11.0995 4.9108 13.8946 5.282 15.5293 5.5132 C 14.4499 5.0264 12.8714 4.2292 12.0541 3.432 L 10.1948 1.6187 L 11.8544 0 L 18 6 L 11.8544 12 L 10.1948 10.3813 L 12.0541 8.5679 C 12.8901 7.7525 14.3688 6.9919 15.4295 6.5051 C 13.7698 6.7363 11.0745 7.1075 9.7206 7.1075 H 2.332 Z"
                          fill="#ED216F"
                        />
                      </svg>
                    </div>
                  </span> </span>
							</span>
						</a>
					</div>
				</div>
				<div className="TextWithImage-styles__TextWithImageColRight-sc-1h6e103-2 dKdAlx">
					<div className="TextWithImage-styles__TextWithImageWrapper-sc-1h6e103-4 bITtIs"> 
						<div> 
						</div> <Image src={CVOptimization} alt="CVOptimization" /> </div>
					<div className="TextWithImage-styles__TextWithImageLink-sc-1h6e103-7 gERARq">
						<a color="#7E7C91" className="LinkWithArrow-styles__StyledLinkWithArrow-sc-gshyp2-0 iMAHuj" href="/solutions/contact-centers"> <span>
                <span
                  style={{ fontWeight: 500 }}
                  className="Text-styles__StyledText-sc-1lbfrxz-0 eIHzDT"
                >
                  En savoir plus sur accompagnement des agents{/* */}&nbsp;
                  <span className="LinkWithArrow-styles__Arrow-sc-gshyp2-3 jyLUtt">
                    <div
                      color="#ED216F"
                      className="AnimatedArrow-styles__StyledAnimatedArrow-sc-1k9se9d-0 biFsGA"
                    >
                      <svg
                        width={18}
                        height={12}
                        viewBox="0 0 18 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M 0 7.1136 v -2.1136 H 9.7206 C 11.0995 4.9108 13.8946 5.282 15.5293 5.5132 C 14.4499 5.0264 12.8714 4.2292 12.0541 3.432 L 10.1948 1.6187 L 11.8544 0 L 18 6 L 11.8544 12 L 10.1948 10.3813 L 12.0541 8.5679 C 12.8901 7.7525 14.3688 6.9919 15.4295 6.5051 C 13.7698 6.7363 11.0745 7.1075 9.7206 7.1075 H 2.332 Z"
                          fill="#ED216F"
                        />
                      </svg>
                    </div>
                  </span> </span>
							</span>
						</a>
					</div>
				</div>
			</section>
		</div>
	</div>
	<section className="CommonComponents-styles__Section-sc-1bkhv27-4 LeftRightBlock-styles__LRSection-sc-1y8s2op-0 kSYCBF fZoBWR">
		<div className="CommonComponents-styles__Container-sc-1bkhv27-1 LeftRightBlock-styles__LRContainer-sc-1y8s2op-1 ireHjh cPfAmK">
			<div className="LeftRightBlock-styles__LRTextCol-sc-1y8s2op-3 kFAOQK">
				<div style={{ maxWidth: 800, fontFamily: "Uivo, Helvetica, sans-serif" }} className="HomeTitle-styles__StyledTitle-sc-3v9hrw-0 iIqquG">
					<h3 style={{ margin: 0, textAlign: "left",   fontWeight: 700 }} className="Card__Title-sc-1qqjegm-4 bqicpW">
          Prépare ton dossier visa en toute sérénité
          </h3> </div> <span className="Card__Text-sc-1qqjegm-5 iOmyQf">
          L’accompagnement Wendogo ne s’arrête pas aux admissions ! Nous t’aidons à monter un dossier visa solide : attestation d’hébergement, preuve de financement, lettres explicatives… Notre IA t’indique les pièces manquantes, et nos experts te conseillent pour maximiser tes chances d’approbation. </span></div>
			<div className="LeftRightBlock-styles__LRImageCol-sc-1y8s2op-2 fmIcFR">
				<div className="LottieFile-styles__Canvas-sc-t4ls67-0 cOaUIN LeftRightBlock-styles__StyledLottieFile-sc-1y8s2op-4 duaIKc">
					 <Image src={VisaOnHand} alt="VisaOnHand" />
				</div>
			</div>
		</div>
	</section>
	<section className="CommonComponents-styles__Section-sc-1bkhv27-4 LeftRightBlock-styles__LRSection-sc-1y8s2op-0 kSYCBF fZoBWR">
		<div className="CommonComponents-styles__Container-sc-1bkhv27-1 LeftRightBlock-styles__LRContainer-sc-1y8s2op-1 ireHjh fMwJxX">
			<div className="LeftRightBlock-styles__LRTextCol-sc-1y8s2op-3 gWrhJJ">
				<div style={{ maxWidth: 800, fontFamily: "Uivo, Helvetica, sans-serif" }} className="HomeTitle-styles__StyledTitle-sc-3v9hrw-0 iIqquG">
					<h3 style={{ margin: 0, textAlign: "left", fontWeight: 700 }} className="Card__Title-sc-1qqjegm-4 bqicpW">
          Un coaching personnalisé pour tes entretiens
          </h3> </div> <span className="Card__Text-sc-1qqjegm-5 iOmyQf">
          Derrière Wendogo, il y a aussi des experts dédiés ! Nous te préparons aux entretiens Campus France, aux appels des écoles et aux démarches post-arrivée. Un accompagnement 360° pour réussir ton projet d’études. </span> </div>
			<div className="LeftRightBlock-styles__LRImageCol-sc-1y8s2op-2 kpuSbv"> 
        <Image src={ConferenceCall} alt="ConferenceCall" />
         </div>
		</div>
	</section>
	<section className="CommonComponents-styles__Section-sc-1bkhv27-4 ConnectSection-styles__BottomConnectSection-sc-b6er0l-6 kSYCBF cYJtCL">
		<section className="CommonComponents-styles__Section-sc-1bkhv27-4 ConnectSection-styles__ConnectSectionTitle-sc-b6er0l-1 kSYCBF cTwPiO">
			<div style={{ maxWidth: 800, fontFamily: "Uivo, Helvetica, sans-serif" }} className="HomeTitle-styles__StyledTitle-sc-3v9hrw-0 FqeUK">
				<h3 style={{ margin: 0, textAlign: "center", fontWeight: 600 }} className="BlocOutils__Title-sc-10c9hjh-3 wniqW">
          Une plateforme unique pour ton projet d'études en France
        </h3> </div>
		</section>
		<div className="CommonComponents-styles__Container-sc-1bkhv27-1 ConnectSection-styles__ConnectSectionContainer-sc-b6er0l-2 ireHjh bTmQVT">
			<div className="ConnectSection-styles__ConnectSectionCol-sc-b6er0l-3 bcqcVy">
				<div className="ConnectSection-styles__ConnectSectionImg-sc-b6er0l-4 enPBZY"> <img src="https://cdn.stonly.com/website/6b52e978/images/connect-bottom-1.png" alt="Resolve customer questions instantly with AI-powered self-service" /> </div>
				<div className="ConnectSection-styles__ConnectSectionText-sc-b6er0l-5 jqucOt">
					<div style={{ maxWidth: 800, fontFamily: "Uivo, Helvetica, sans-serif" }} className="HomeTitle-styles__StyledTitle-sc-3v9hrw-0 iIqquG">
						<h3 style={{ margin: 0, textAlign: "left", fontWeight: 700 }} className="h3">
            Notre IA t’aide à remplir tes dossiers en un clic et optimise tes candidatures pour maximiser tes chances d’admission.
            </h3> </div>
					 
				</div>
			</div>
			<div className="ConnectSection-styles__ConnectSectionCol-sc-b6er0l-3 cqqNLU">
				<div className="ConnectSection-styles__ConnectSectionImg-sc-b6er0l-4 enPBZY"> 
          
          <img src="https://cdn.stonly.com/website/6b52e978/images/connect-bottom-2.png" alt="Améliorez le temps et la qualité de la prise en charge avec des arbres de décision pour vos agents." /> 
          </div>
				<div className="ConnectSection-styles__ConnectSectionText-sc-b6er0l-5 jqucOt">
					<div style={{ maxWidth: 800, fontFamily: "Uivo, Helvetica, sans-serif" }} className="HomeTitle-styles__StyledTitle-sc-3v9hrw-0 iIqquG">
						<h3 style={{ margin: 0, textAlign: "left", fontWeight: 700 }} className="h3">
            Nos conseillers t'assistent sur tous les aspects de ton projet d'études en France : admissions, entretien, visa, logement, vie étudiante…
            </h3> </div>
					 
				</div>
			</div>
		</div>
	</section>
</div>
                        <section className="Courtier__Bloc-sc-431mxx-0 lciTAJ">
                      <div className="Banner__Content-sc-krte25-0 kIwpz">
                        <p className="Content__Catchphrase-sc-hd6o8b-0 fCnjcm"> Des conseillers pas comme les autres&nbsp;: </p>
                        <h2 className="Content__Title-sc-hd6o8b-1 erjsGF"> Leur priorité c’est vous&nbsp;! </h2>
                        <p className="Content__Description-sc-hd6o8b-2 hhQjSJ"> Un conseiller, c’est bien. Un conseiller expert et pédagogue qui vous comprend, c’est mieux. 
                                                                                Les conseillers Wendogo vous accompagnent dans votre projet de voyage avec implication et réactivité. </p>
                        <button className="PrimaryButton__Container-sc-1vkvp7q-0 iroZSn">
                          <span className="PrimaryButton__Overlay-sc-1vkvp7q-3 sSEIO">
                            <span className="PrimaryButton__OverlayBackground-sc-1vkvp7q-4 kxNCsz">
                              <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className="PrimaryButton__Arrow-sc-1vkvp7q-1 crhpBB">
                                <path d="M20.7454 14.8908L17.1664 11.3187L18.7381 9.75L25 16L18.7381 22.25L17.1664 20.6813L20.7454 17.1092H7V14.8908H20.7454Z" />
                              </svg>
                            </span>
                          </span>
                          <a href='/simulation/home' >
                            <span className="PrimaryButton__Label-sc-1vkvp7q-2 kVCvkJ"> Je me lance </span>
                          </a>
                        </button>
                        {/* <h1>{countdown}</h1>
                        <h1>dd {positionLeft} - {browserWidth}</h1>
                        <h1> widthBanner {widthBanner}</h1> */}
                      </div>
                      <div className={"Images__Container-sc-2gr022-0 Banner__Images-sc-krte25-1 fCdAKA "+bannerAnimationClassList[0]} ref={myElementRef}>
                        <div className="Images__BaseImage-sc-2gr022-2 Images__Image1-sc-2gr022-3 ioovUp llLrAK">
                          {/* <picture>
                            <source type="image/webp" srcSet="https://res.cloudinary.com/wendogo-fr/image/upload/q_auto,f_webp,w_320/v1677667256/website/page/home/BlocCourtier-1.webp 320w, https://res.cloudinary.com/wendogo-fr/image/upload/q_auto,f_webp,w_375/v1677667256/website/page/home/BlocCourtier-1.webp 375w, https://res.cloudinary.com/wendogo-fr/image/upload/q_auto,f_webp,w_425/v1677667256/website/page/home/BlocCourtier-1.webp 425w, https://res.cloudinary.com/wendogo-fr/image/upload/q_auto,f_webp,w_768/v1677667256/website/page/home/BlocCourtier-1.webp 768w, https://res.cloudinary.com/wendogo-fr/image/upload/q_auto,f_webp,w_1024/v1677667256/website/page/home/BlocCourtier-1.webp 1024w, https://res.cloudinary.com/wendogo-fr/image/upload/q_auto,f_webp,w_1240/v1677667256/website/page/home/BlocCourtier-1.webp 1240w" />
                            <source srcSet="https://res.cloudinary.com/wendogo-fr/image/upload/q_auto,w_320/v1677667256/website/page/home/BlocCourtier-1.webp 320w, https://res.cloudinary.com/wendogo-fr/image/upload/q_auto,w_375/v1677667256/website/page/home/BlocCourtier-1.webp 375w, https://res.cloudinary.com/wendogo-fr/image/upload/q_auto,w_425/v1677667256/website/page/home/BlocCourtier-1.webp 425w, https://res.cloudinary.com/wendogo-fr/image/upload/q_auto,w_768/v1677667256/website/page/home/BlocCourtier-1.webp 768w, https://res.cloudinary.com/wendogo-fr/image/upload/q_auto,w_1024/v1677667256/website/page/home/BlocCourtier-1.webp 1024w, https://res.cloudinary.com/wendogo-fr/image/upload/q_auto,w_1240/v1677667256/website/page/home/BlocCourtier-1.webp 1240w" />
                            <Image alt="" size="(min-width: 1024px) 50vw, 100vw" loading="lazy" src="https://res.cloudinary.com/wendogo-fr/image/upload/q_auto/v1677667256/website/page/home/BlocCourtier-1.webp" className={"Images__Image-sc-2gr022-1 "+((countdown<5 || countdown===15) ? bannerAnimationClassList[1] : "eXDVgd")} />
                          </picture> */}
                          <picture>
                            {/* <source type="image/webp" srcSet={BlockCourtier1} />
                            <source srcSet={BlockCourtier1} /> */}
                            <Image className={"Images__Image-sc-2gr022-1 "+((countdown<5 || countdown===15) ? bannerAnimationClassList[1] : "eXDVgd")} src={BlockCourtier1} alt="" size="(min-width: 1024px) 50vw, 100vw" loading="lazy"  />
                            {/* <Image alt="v1677658638/website/page/home/Re%CC%81sultat.webp" className="Sliderstyles__Image-sc-jd0rgd-7 kCpYFv" loading="lazy" src="https://res.cloudinary.com/wendogo-fr/image/upload/q_auto/v1677658638/website/page/home/Re%CC%81sultat.webp" /> */}
                          </picture>
                        </div>
                        <div className="Images__BaseImage-sc-2gr022-2 Images__Image2-sc-2gr022-4 ioovUp kUUMLx">
                          <picture>
                            {/* <source type="image/webp" srcSet={BlockCourtier2} />
                            <source srcSet={BlockCourtier2} /> */}
                            <Image  className={"Images__Image-sc-2gr022-1 "+((countdown >= 5 && countdown<10) ? bannerAnimationClassList[1] : "eXDVgd")} src={BlockCourtier2} alt="" size="(min-width: 1024px) 50vw, 100vw" loading="lazy"  />
                            {/* <Image alt="v1677658638/website/page/home/Re%CC%81sultat.webp" className="Sliderstyles__Image-sc-jd0rgd-7 kCpYFv" loading="lazy" src="https://res.cloudinary.com/wendogo-fr/image/upload/q_auto/v1677658638/website/page/home/Re%CC%81sultat.webp" /> */}
                          </picture>
                          {/* <picture>
                            <source type="image/webp" srcSet="https://res.cloudinary.com/wendogo-fr/image/upload/q_auto,f_webp,w_320/v1677668879/website/page/home/BlocCourtier-2.webp 320w, https://res.cloudinary.com/wendogo-fr/image/upload/q_auto,f_webp,w_375/v1677668879/website/page/home/BlocCourtier-2.webp 375w, https://res.cloudinary.com/wendogo-fr/image/upload/q_auto,f_webp,w_425/v1677668879/website/page/home/BlocCourtier-2.webp 425w, https://res.cloudinary.com/wendogo-fr/image/upload/q_auto,f_webp,w_768/v1677668879/website/page/home/BlocCourtier-2.webp 768w, https://res.cloudinary.com/wendogo-fr/image/upload/q_auto,f_webp,w_1024/v1677668879/website/page/home/BlocCourtier-2.webp 1024w, https://res.cloudinary.com/wendogo-fr/image/upload/q_auto,f_webp,w_1240/v1677668879/website/page/home/BlocCourtier-2.webp 1240w" />
                            <source srcSet="https://res.cloudinary.com/wendogo-fr/image/upload/q_auto,w_320/v1677668879/website/page/home/BlocCourtier-2.webp 320w, https://res.cloudinary.com/wendogo-fr/image/upload/q_auto,w_375/v1677668879/website/page/home/BlocCourtier-2.webp 375w, https://res.cloudinary.com/wendogo-fr/image/upload/q_auto,w_425/v1677668879/website/page/home/BlocCourtier-2.webp 425w, https://res.cloudinary.com/wendogo-fr/image/upload/q_auto,w_768/v1677668879/website/page/home/BlocCourtier-2.webp 768w, https://res.cloudinary.com/wendogo-fr/image/upload/q_auto,w_1024/v1677668879/website/page/home/BlocCourtier-2.webp 1024w, https://res.cloudinary.com/wendogo-fr/image/upload/q_auto,w_1240/v1677668879/website/page/home/BlocCourtier-2.webp 1240w" />
                            <Image alt="" size="(min-width: 1024px) 50vw, 100vw" loading="lazy" src="https://res.cloudinary.com/wendogo-fr/image/upload/q_auto/v1677668879/website/page/home/BlocCourtier-2.webp" />
                          </picture> */}
                        </div>
                        <div className="Images__BaseImage-sc-2gr022-2 Images__Image3-sc-2gr022-5 ioovUp gaxwmL">
                          <picture>
                            {/* <source type="image/webp" srcSet={BlockCourtier3} />
                            <source srcSet={BlockCourtier3} /> */}
                            <Image className={"Images__Image-sc-2gr022-1 "+((countdown >= 10 && countdown<15) ? bannerAnimationClassList[1] : "eXDVgd")} src={BlockCourtier3} alt="" size="(min-width: 1024px) 50vw, 100vw" loading="lazy"  />
                            {/* <Image alt="v1677658638/website/page/home/Re%CC%81sultat.webp" className="Sliderstyles__Image-sc-jd0rgd-7 kCpYFv" loading="lazy" src="https://res.cloudinary.com/wendogo-fr/image/upload/q_auto/v1677658638/website/page/home/Re%CC%81sultat.webp" /> */}
                          </picture>
                          {/* <picture>
                            <source type="image/webp" srcSet="https://res.cloudinary.com/wendogo-fr/image/upload/q_auto,f_webp,w_320/v1677668879/website/page/home/BlocCourtier-3.webp 320w, https://res.cloudinary.com/wendogo-fr/image/upload/q_auto,f_webp,w_375/v1677668879/website/page/home/BlocCourtier-3.webp 375w, https://res.cloudinary.com/wendogo-fr/image/upload/q_auto,f_webp,w_425/v1677668879/website/page/home/BlocCourtier-3.webp 425w, https://res.cloudinary.com/wendogo-fr/image/upload/q_auto,f_webp,w_768/v1677668879/website/page/home/BlocCourtier-3.webp 768w, https://res.cloudinary.com/wendogo-fr/image/upload/q_auto,f_webp,w_1024/v1677668879/website/page/home/BlocCourtier-3.webp 1024w, https://res.cloudinary.com/wendogo-fr/image/upload/q_auto,f_webp,w_1240/v1677668879/website/page/home/BlocCourtier-3.webp 1240w" />
                            <source srcSet="https://res.cloudinary.com/wendogo-fr/image/upload/q_auto,w_320/v1677668879/website/page/home/BlocCourtier-3.webp 320w, https://res.cloudinary.com/wendogo-fr/image/upload/q_auto,w_375/v1677668879/website/page/home/BlocCourtier-3.webp 375w, https://res.cloudinary.com/wendogo-fr/image/upload/q_auto,w_425/v1677668879/website/page/home/BlocCourtier-3.webp 425w, https://res.cloudinary.com/wendogo-fr/image/upload/q_auto,w_768/v1677668879/website/page/home/BlocCourtier-3.webp 768w, https://res.cloudinary.com/wendogo-fr/image/upload/q_auto,w_1024/v1677668879/website/page/home/BlocCourtier-3.webp 1024w, https://res.cloudinary.com/wendogo-fr/image/upload/q_auto,w_1240/v1677668879/website/page/home/BlocCourtier-3.webp 1240w" />
                            <Image alt="" size="(min-width: 1024px) 50vw, 100vw" loading="lazy" src="https://res.cloudinary.com/wendogo-fr/image/upload/q_auto/v1677668879/website/page/home/BlocCourtier-3.webp" className={"Images__Image-sc-2gr022-1 "+((countdown<15 && countdown>=10) ? bannerAnimationClassList[1] : "eXDVgd")} />
                          </picture> */}
                        </div>
                      </div>
                      <div className="Rtb__Container-sc-cimcdw-0 JbuWp Courtier__Rtb-sc-431mxx-1 iXwtOb">
                        <nav className="Rtb__Progress-sc-cimcdw-2 eSCnlS">
                          <span className={"Rtb__ProgressBar-sc-cimcdw-3 "+((countdown<5 || countdown===15) ? 'dctgrL' : 'dJqKes')}>
                            {(countdown<5 || countdown===15) ? <span className="Rtb__ProgressBarProgress-sc-cimcdw-4 gwheai" /> : null}
                          </span>
                          <span className={"Rtb__ProgressBar-sc-cimcdw-3 "+((countdown<10 && countdown>=5) ? 'dctgrL' : ((countdown<15 && countdown>=10) ? 'dJqKes' : 'lahlbf'))}>
                            {(countdown<10 && countdown>=5) ? <span className="Rtb__ProgressBarProgress-sc-cimcdw-4 gwheai" /> : null}
                          </span>
                          <span className={"Rtb__ProgressBar-sc-cimcdw-3 "+((countdown<15 && countdown>=10)? 'dctgrL' : 'lahlbf')}>
                            {(countdown<15 && countdown>=10) ? <span className="Rtb__ProgressBarProgress-sc-cimcdw-4 gwheai" /> : null}
                          </span>
                        </nav>
                        <div className="Rtb__Blocs-sc-cimcdw-1 bEvzQi">
                          <div className={"Bloc__Container-sc-abnssq-0 Rtb__Bloc-sc-cimcdw-5 kFnMN "+((countdown<5 || countdown===15) ? 'hCSAAW' : 'KNmFf')}>
                            {((countdown<5 || countdown===15) || browserWidth>=1024) ?   <><div className="Bloc__CheckContainer-sc-abnssq-1 hlJPnb">
                              <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" fill="currentColor" className="Bloc__Check-sc-abnssq-2 ycIsS">
                                <path d="M5.8,11.6l8-8.29,1.44,1.38L5.88,14.4.32,9.23,1.68,7.77Z" fillRule="evenodd" />
                              </svg>
                            </div>
                            <p className="Bloc__Description-sc-abnssq-3 iYfojT"> Des conseillers régulièrement formés aux dernières réglementations en vigueur et spécialisés par type de projet. </p>
                            </> : null}
                          </div>
                          <div className={"Bloc__Container-sc-abnssq-0 Rtb__Bloc-sc-cimcdw-5 kFnMN "+((countdown<10 && countdown>=5) ? 'hCSAAW' : ((countdown<15 && countdown>=10) ? 'KNmFf' : 'cSHAph'))}>
                            {((countdown<10 && countdown>=5) || browserWidth>=1024) ?   <><div className={"Bloc__CheckContainer-sc-abnssq-1 "+((countdown<10 && countdown>=5) || (countdown<15 && countdown>=10)? 'hlJPnb' : 'kPeKBa')}>
                              <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" fill="currentColor" className="Bloc__Check-sc-abnssq-2 ycIsS">
                                <path d="M5.8,11.6l8-8.29,1.44,1.38L5.88,14.4.32,9.23,1.68,7.77Z" fillRule="evenodd" />
                              </svg>
                            </div>
                            <p className="Bloc__Description-sc-abnssq-3 iYfojT"> Derrière votre expert attitré, des outils puissants et toute une équipe qui œuvre pour votre projet. </p>
                            </> : null}
                          </div>
                          <div className={"Bloc__Container-sc-abnssq-0 Rtb__Bloc-sc-cimcdw-5 kFnMN "+((countdown<15 && countdown>=10)? 'hCSAAW' : 'cSHAph')}>
                            {((countdown<15 && countdown>=10) || browserWidth>=1024) ?   <><div className={"Bloc__CheckContainer-sc-abnssq-1 "+((countdown<15 && countdown>=10)? 'hlJPnb' : 'kPeKBa')}>
                              <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" fill="currentColor" className="Bloc__Check-sc-abnssq-2 ycIsS">
                                <path d="M5.8,11.6l8-8.29,1.44,1.38L5.88,14.4.32,9.23,1.68,7.77Z" fillRule="evenodd" />
                              </svg>
                            </div>
                            <p className="Bloc__Description-sc-abnssq-3 iYfojT"> Nos conseillers engagés sont à votre écoute et toujours joignables (SMS, email et téléphone). </p>
                            </> : null}
                          </div>
                        </div>
                      </div>
                    </section>
                    <div className="Footer__Container-sc-1adny8q-0 fThLJG styles__Footer-sc-kz84w6-4 icxpqI ehfzoi">
                        <div className="Banner__Container-sc-yqcec5-0 TiNYc Footer__Header-sc-1adny8q-1 BGhzp">
                          <div className="Banner__ImageContainer-sc-yqcec5-1 dwrjaK">
                          <picture>
                            {/* <source type="image/webp" sizes="(min-width: 1240px) 288px, (min-width: 1024px) 25vw, (min-width: 768px) 37.5vw, 100vw" srcSet={WorldNoBorders} />
                            <source sizes="(min-width: 1240px) 288px, (min-width: 1024px) 25vw, (min-width: 768px) 37.5vw, 100vw"  srcSet={WorldNoBorders} /> */}
                            <Image className="Banner__Image-sc-yqcec5-2 kHAXoZ" alt="v1677669144/website/page/home/BlocFooter.webp" loading="lazy" src={WorldNoBorders}/>
                          </picture>
                        </div>
                        <div className="Banner__Content-sc-yqcec5-3 hKeCKQ">
                          <div className="Banner__Title-sc-yqcec5-4 zDQmH"> Notre objectif - Créer un monde sans frontières ! <br/>
                          <span className="BlocOutils__Transparency-sc-10c9hjh-2 jXRqut">Chacun mérite de se sentir libre et de voyager où il veut !</span>
                          </div>
                          <div className="Banner__ButtonContainer-sc-yqcec5-5 dGDyrc">
                            <button className="PrimaryButton__Container-sc-1vkvp7q-0 iroZSn Banner__Cta-sc-yqcec5-6 EFrbM">
                              <span className="PrimaryButton__Overlay-sc-1vkvp7q-3 sSEIO">
                                <span className="PrimaryButton__OverlayBackground-sc-1vkvp7q-4 kxNCsz">
                                  <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className="PrimaryButton__Arrow-sc-1vkvp7q-1 crhpBB">
                                    <path d="M20.7454 14.8908L17.1664 11.3187L18.7381 9.75L25 16L18.7381 22.25L17.1664 20.6813L20.7454 17.1092H7V14.8908H20.7454Z" />
                                  </svg>
                                </span>
                              </span>
                              <a href='/simulation/home' >
                                <span className="PrimaryButton__Label-sc-1vkvp7q-2 kVCvkJ"> Je me lance </span>
                              </a>
                            </button>
                            <p className="Banner__Caption-sc-yqcec5-7 elCGHz"> En 3 minutes, sans inscription&nbsp;! </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </main>
                  <FloatingWhatsApp phoneNumber="330668156073" accountName="Wendogo" avatar="/social_media_logo.webp" statusMessage="Répond en général dans l'heure" 
                        chatMessage={'Salut toi 🤝 \nPour une assistance rapide, suis ces étapes simples :\n1. Présente-toi brièvement.\n2. Indique l\'objet de ton message \n3. Décris ton problème de manière claire et détaillée 😉.'}
                        placeholder={"Racontes nous ce qui te préoccupe"} chatboxHeight={500} CSSProperties={{color:'#001435'}}/>
                  <Footer/>
                </section>
            </div>           
          </div> </>
  )

}

export default HomePage
