
// Import img
import backgroundImg3 from '../assets/générique-chateau.jpg';
import backgroundImg2 from '../assets/1000_F_534931774_iiLVveToIVDuO89bZdeLs770iR7Lnm2a.png';
import backgroundImg1 from '../assets/flightwallpaper.webp';
import SliderstylesImage1 from '../assets/Sliderstyles__Image1.png'
import SliderstylesImage2 from '../assets/Sliderstyles__Image2.png'
import PasseportVisa from '../assets/1000_F_154951378_oyz1BvKKnOVw92VJ05vNIk4l72WxkZaP.jpg'
import WorldNoBorders from '../assets/AdobeStock_559662042_Preview.jpeg'
import BlockCourtier1 from '../assets/group-portrait-five-african-business-colleagues-standing-row-office_484651-18709.avif'
import BlockCourtier2 from '../assets/240_F_271683964_RV5TD7e4GN67UBFhvBvtltNO4hJ5aTQs.jpg'
import BlockCourtier3 from '../assets/beautiful-woman-standing-front-colleagues-group-african-american-business-people-working-office-together_146671-45002.avif'
import SocialMediaLogo from '../assets/social_media_logo.png'
// Import svg
import {ReactComponent as WendogoLogo} from '../assets/wendogo_logo.svg'
import  {ReactComponent as DropDownIcon} from '../assets/dropdown_icon.svg'
import {ReactComponent as FeatureDistance} from '../assets/features-distance-1.svg'
import {ReactComponent as FeatureImplication} from '../assets/features-implication-4.svg'
import {ReactComponent as FeatureNoStress} from '../assets/features-no-stress-4.svg'
import {ReactComponent as FeaturePrice} from '../assets/features-price-2.svg'
import {ReactComponent as FeatureProfessional} from '../assets/features-professional-4.svg'
import {ReactComponent as FeatureTransparence} from '../assets/features-transparence-4.svg'
import { Helmet } from 'react-helmet';
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

// import required modules
import { Pagination, Autoplay } from "swiper";
import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';

import Footer from '../components/Footer';
// import { Link } from "react-router-dom";
// import Nav from "./Nav";
function HomePage(){

    const [isLeftArrow, setIsLeftArrow] = useState(true)

    const handleClickArrow = (isLeftArrow) => {
      setIsLeftArrow(isLeftArrow)
    }

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

    //const navigate = useNavigate()
    // const goToWaitingList = () => {
    //   navigate('/waitinglist', { replace: true })
    // }

    return <div >
            <nav className={"Navbarstyles__Navigation1 "+(scrollTop>900 ? "fBUtVg" : "kebTzo")}>
              <div className={"Navbarstyles__Navigation2 "+(scrollTop>900 ? "jBwgPO" : "jigKlE")}>
                <div className="Navbarstyles__Navigation3">
                  <a aria-current="page" aria-label="Aller à l'accueil" className="Navbarstyles__LogoLink" href="/" >
                    <WendogoLogo className={scrollTop>900 ? "WendogoLogoText" : ""}/>
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
                          <span>Simuler mon visa</span>
                          <DropDownIcon style={{transform : (displaySubMenu1 ? "rotate(180deg)" : '')}}/>
                        </span>
                        <ul className={"Navbarstyles__SubMenu "+(displaySubMenu1 ? 'lowcCT subMenu1' : '')} >
                          <li className="Navbarstyles__SubMenuFirstItem">
                            <a tabIndex={0} className="LinkLabel__Link" href="/waitinglist">
                              <span to='/waitinglist' className="LinkLabel__Label">Visa pour la France</span>
                            </a>
                          </li>
                          <li>
                            <a tabIndex={0} className="LinkLabel__Link" href="/waitinglist">
                            <span to='/waitinglist' className="LinkLabel__Label">Visa pour le Canada </span>
                            </a>
                          </li>
                        </ul>
                      </li>
                      <li aria-expanded="false" aria-controls="7d517232" role="menuitem" tabIndex={0} className="Navbarstyles__MenuItem Navbarstyles__MenuItem-common">
                        <span className="Navbarstyles__MenuItemLabel" onClick={() => toggleNavSubMenu2()}>
                          <span>Ressources</span>
                          <DropDownIcon style={{transform : (displaySubMenu2 ? "rotate(180deg)" : '')}}/>
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
                            <DropDownIcon style={{transform : (displaySubMenu3 ? "rotate(180deg)" : '')}}/>
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
                        <Link to='/waitinglist' className="ButtonLogin__Button"> Se connecter </Link>
                        <Link to='/simulation/home' className="ButtonNavbar__Button">
                          <span className="ButtonNavbar__Label"> Simuler mon visa </span>
                          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="ButtonNavbar__Arrow">
                            <path d="M15.3,11.17l-2.51-2.49,1.18-1.18,4.53,4.5-4.53,4.5-1.18-1.18,2.51-2.49H5.5v-1.66H15.3Z" />
                          </svg>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </nav>
            <Helmet>
              <meta property="og:url"           content="https://wendogo.com/" />
              <meta property="og:type"          content="website" />
              <meta property="og:title"         content="Wendogo" />
              <meta property="og:description"   content="Expert en ligne pour vos demandes de visa" />
              <meta property="og:image"         content={'https://wendogo.com/'+SocialMediaLogo} /> 
              <title>Wendogo</title>
              <meta name="description"          content="Expert en ligne pour vos demandes de visa"/>
            </Helmet>
            <div className="main" style={{background: 'black'}}> 
              <Swiper className="mySwiper swiper-h" spaceBetween={50} pagination={{ clickable: true, }} modules={[Pagination, Autoplay]} speed={1000}
                    loop={true} autoplay={{delay: 2000,  disableOnInteraction: false, pauseOnMouseEnter: true}}>   
                <SwiperSlide><img src={backgroundImg1} alt="" /></SwiperSlide>
                <SwiperSlide><img src={backgroundImg2} alt="" /></SwiperSlide>
                <SwiperSlide><img src={backgroundImg3} alt="" /></SwiperSlide>
                <div className="main-screen__row">
                   <div className="main-screen__content">
                    <h1 className="HeroLeft__Title-sc-1axg5uv-3 jDYqud">Demandez un visa pour la France ou le Canada plus simplement.</h1>
                    <div className="main-screen__content-subscribe"> C’est trop beau parce que c’est vrai&nbsp;: transparence, expertise et implication.  Wendogo, c’est l'agence de visa en ligne qui vous accompagne de A à Z pour préparer au mieux votre demande de visa </div>
                    <button className="PrimaryButton__Container-sc-1vkvp7q-0 iroZSn HeroLeft__PrimaryButton-sc-1axg5uv-6 jJuKZd">
                      <span className="PrimaryButton__Overlay-sc-1vkvp7q-3 sSEIO">
                        <span className="PrimaryButton__OverlayBackground-sc-1vkvp7q-4 kxNCsz">
                          <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className="PrimaryButton__Arrow-sc-1vkvp7q-1 crhpBB">
                            <path d="M20.7454 14.8908L17.1664 11.3187L18.7381 9.75L25 16L18.7381 22.25L17.1664 20.6813L20.7454 17.1092H7V14.8908H20.7454Z" />
                          </svg>
                        </span>
                      </span>
                      <Link to='/simulation/home'>
                        <span className="PrimaryButton__Label-sc-1vkvp7q-2 kVCvkJ"> Simuler mon visa </span>
                      </Link>
                    </button>
                  </div> 
                </div>  
              </Swiper>

            </div>
            <div className="content" id="content">
              <section className="styles__Main-sc-kz84w6-0 ≈">
                <main className="styles__Main-sc-kz84w6-0 gEFmYD">
                  <section className="BlocRTB__Bloc-sc-15u9ccm-0 lgCmtM" style={{margin : 0}}>
                    <div className="BlocRTB__Container-sc-15u9ccm-1 kSXqSI">
                      <h2 className="h2"> Nous vous aidons au  <br />
                        <span>maximum à obtenir votre visa</span>
                      </h2>
                    </div>
                  </section>
                </main>
              </section>
              <section>
                  <main className="styles__Main-sc-kz84w6-0 gEFmYD">
                    <section className="BlocRTB__Bloc-sc-15u9ccm-0 lgCmtM">
                      <div className="BlocRTB__Container-sc-15u9ccm-1 kSXqSI">
                        <div className="Card__Container-sc-1qqjegm-0 bSzjhs">
                          <div className="Card__CheckContainer-sc-1qqjegm-1 ffwQEH">
                            <FeatureDistance/>
                          </div>
                          <div className="Card__TextContainer-sc-1qqjegm-3 ezVybs">
                            <div className="Card__Title-sc-1qqjegm-4 bqicpW">Nous travaillons à distance</div>
                            <p className="Card__Text-sc-1qqjegm-5 iOmyQf"> Profitez d'une assistance personnalisée depuis le confort de votre canapé. </p>
                          </div>
                        </div>
                        <div className="Card__Container-sc-1qqjegm-0 bSzjhs">
                          <div className="Card__CheckContainer-sc-1qqjegm-1 ffwQEH">
                           <FeaturePrice/>
                          </div>
                          <div className="Card__TextContainer-sc-1qqjegm-3 ezVybs">
                            <div className="Card__Title-sc-1qqjegm-4 bqicpW">Tarifs</div>
                            <p className="Card__Text-sc-1qqjegm-5 iOmyQf"> Outils et conseils gratuits. Nous n'encaissons le paiement qu’au succès. </p>
                          </div>
                        </div>
                        <div className="Card__Container-sc-1qqjegm-0 bSzjhs">
                          <div className="Card__CheckContainer-sc-1qqjegm-1 ffwQEH">
                            <FeatureNoStress/>
                          </div>
                          <div className="Card__TextContainer-sc-1qqjegm-3 ezVybs">
                            <div className="Card__Title-sc-1qqjegm-4 bqicpW">No Stress</div>
                            <p className="Card__Text-sc-1qqjegm-5 iOmyQf"> Évitez toute démarche fastidieuse, et tout risque d’erreur de procédure visa. </p>
                          </div>
                        </div>
                      </div>
                    </section>
                    <section className="BlocRTB__Bloc-sc-15u9ccm-0 lgCmtM" style={{paddingBottom: 90}}>
                      <div className="BlocRTB__Container-sc-15u9ccm-1 kSXqSI">
                        <div className="Card__Container-sc-1qqjegm-0 bSzjhs mkxwco">
                          <div className="Card__CheckContainer-sc-1qqjegm-1 ffwQEH">
                            <FeatureTransparence/>
                          </div>
                          <div className="Card__TextContainer-sc-1qqjegm-3 ezVybs">
                            <div className="Card__Title-sc-1qqjegm-4 bqicpW">Transparence</div>
                            <p className="Card__Text-sc-1qqjegm-5 iOmyQf"> Nos conseillers vous disent tout et défendent vos intérêts. </p>
                          </div>
                        </div>
                        <div className="Card__Container-sc-1qqjegm-0 bSzjhs">
                          <div className="Card__CheckContainer-sc-1qqjegm-1 ffwQEH">
                            <FeatureProfessional/>
                          </div>
                          <div className="Card__TextContainer-sc-1qqjegm-3 ezVybs">
                            <div className="Card__Title-sc-1qqjegm-4 bqicpW">Expertise</div>
                            <p className="Card__Text-sc-1qqjegm-5 iOmyQf">Nous traitons tous les types de visa (Immigration, visiteur, famille, étudiant, bourse, affaire...). </p>
                          </div>
                        </div>
                        <div className="Card__Container-sc-1qqjegm-0 bSzjhs">
                          <div className="Card__CheckContainer-sc-1qqjegm-1 ffwQEH">
                            <FeatureImplication/>
                          </div>
                          <div className="Card__TextContainer-sc-1qqjegm-3 ezVybs">
                            <div className="Card__Title-sc-1qqjegm-4 bqicpW">Implication</div>
                            <p className="Card__Text-sc-1qqjegm-5 iOmyQf">Restez en contact avec votre expert (visio, sms, téléphone). </p>
                          </div>
                        </div>
                      </div>
                    </section>
                      <div className="styles__Grid-sc-10gqksz-1 iuHviD BlocOutils__Container-sc-10c9hjh-0 fGvXyl">
                        <div className="BlocOutils__Content-sc-10c9hjh-1 jQpxOw">
                          <p className="BlocOutils__Transparency-sc-10c9hjh-2 jXRqut"> La transparence selon Wendogo </p>
                          <h2 className="BlocOutils__Title-sc-10c9hjh-3 wniqW"> Tout ce qu’on sait, vous le savez. </h2>
                          <p className="BlocOutils__Description-sc-10c9hjh-4 eQpKZn"> Nous partageons toutes les informations en notre possession afin de garantir une relation de confiance et des décisions éclairées. </p>
                          <button className="PrimaryButton__Container-sc-1vkvp7q-0 iroZSn BlocOutils__Simulate-sc-10c9hjh-5 cWIQGA">
                            <span className="PrimaryButton__Overlay-sc-1vkvp7q-3 sSEIO">
                              <span className="PrimaryButton__OverlayBackground-sc-1vkvp7q-4 kxNCsz">
                                <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className="PrimaryButton__Arrow-sc-1vkvp7q-1 crhpBB">
                                  <path d="M20.7454 14.8908L17.1664 11.3187L18.7381 9.75L25 16L18.7381 22.25L17.1664 20.6813L20.7454 17.1092H7V14.8908H20.7454Z" />
                                </svg>
                              </span>
                            </span>
                            <Link to='/simulation/home'>
                              <span className="PrimaryButton__Label-sc-1vkvp7q-2 kVCvkJ"> Simuler mon visa </span>
                            </Link>
                          </button>
                        </div>
                        {browserWidth>1024 ?
                        <div className="Laptop__Container-sc-1henh52-0 ebnCSa ">
                          <div className="Sliderstyles__ImageContainer-sc-jd0rgd-6 isxeYt">
                            <picture>
                              <source type="image/webp" srcSet={SliderstylesImage1} />
                              <source srcSet={SliderstylesImage1} />
                              <img className={"Sliderstyles__Image-sc-jd0rgd-7 "+ (isLeftArrow ? "kCpYFv" : "CtOpC") } src={SliderstylesImage1} alt="" />
                            </picture>
                            <picture>
                              <source type="image/webp" srcSet={SliderstylesImage2} />
                              <source srcSet={SliderstylesImage2} />
                              <img className={"Sliderstyles__Image-sc-jd0rgd-7 "+ (!isLeftArrow ? "kCpYFv" : "CtOpC") } src={SliderstylesImage2} alt="" />
                            </picture>
                          </div>
                          <div className="Laptop__Content-sc-1henh52-2 bwEaWU">
                            <h3 className="Sliderstyles__Title-sc-jd0rgd-0 kQjOWu">  {(isLeftArrow ? "Notre simulateur" : "Suivez votre dossier en temps réel")}</h3>
                            <p className="Sliderstyles__Description-sc-jd0rgd-1 Laptop__Text-sc-1henh52-1 dzJZez hCTNwG"> 
                                {(isLeftArrow ? "Soyez sûr avant de vous engager : notre simulateur doté d’algorithmes puissants vous donne gratuitement un indice de confiance sur vos chances d'obtenir votre visa." 
                                              : "Vous nous confiez votre projet, vous devez savoir où il en est : RDV à l'ambassade, décision d'une école ... Bénéficiez d’un espace en ligne sécurisé pour suivre l’avancée de votre dossier en toute autonomie.") }
                                
                            </p>
                            <div className="Sliderstyles__SlideContainer-sc-jd0rgd-4 exfKJT">
                              <hr className={"Divider-sc-1qii385-0 Sliderstyles__Slide-sc-jd0rgd-5 iyJAir "+ (isLeftArrow ? "LACWn" : "jaXoBy") } />
                              <hr className={"Divider-sc-1qii385-0 Sliderstyles__Slide-sc-jd0rgd-5 iyJAir "+ (!isLeftArrow ? "LACWn" : "jaXoBy")} />
                            </div>
                            <div className="Laptop__ArrowContainer-sc-1henh52-3 lgqkPS">
                              <button aria-label="Précédent" type="button" onClick={() => handleClickArrow(true)} className="ArrowButton__Container-sc-11aiclo-3 hRnQwB Sliderstyles__Previous-sc-jd0rgd-2 ENyIs" disabled={isLeftArrow}>
                                <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className="ArrowButton__Arrow-sc-11aiclo-0 ArrowButton__Arrow1-sc-11aiclo-1 fhLDeK">
                                  <path d="M20.7454 14.8908L17.1664 11.3187L18.7381 9.75L25 16L18.7381 22.25L17.1664 20.6813L20.7454 17.1092H7V14.8908H20.7454Z" />
                                </svg>
                                <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className="ArrowButton__Arrow-sc-11aiclo-0 ArrowButton__Arrow2-sc-11aiclo-2 fhLDeK">
                                  <path d="M20.7454 14.8908L17.1664 11.3187L18.7381 9.75L25 16L18.7381 22.25L17.1664 20.6813L20.7454 17.1092H7V14.8908H20.7454Z" />
                                </svg>
                              </button>
                              <button aria-label="Suivant" type="button" onClick={() => handleClickArrow(false)} className="ArrowButton__Container-sc-11aiclo-3 doTHWK Sliderstyles__Next-sc-jd0rgd-3 jZecqw" disabled={!isLeftArrow}>
                                <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className="ArrowButton__Arrow-sc-11aiclo-0 ArrowButton__Arrow1-sc-11aiclo-1 bJwJPy">
                                  <path d="M20.7454 14.8908L17.1664 11.3187L18.7381 9.75L25 16L18.7381 22.25L17.1664 20.6813L20.7454 17.1092H7V14.8908H20.7454Z" />
                                </svg>
                                <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className="ArrowButton__Arrow-sc-11aiclo-0 ArrowButton__Arrow2-sc-11aiclo-2 bJwJPy">
                                  <path d="M20.7454 14.8908L17.1664 11.3187L18.7381 9.75L25 16L18.7381 22.25L17.1664 20.6813L20.7454 17.1092H7V14.8908H20.7454Z" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div> : (  (browserWidth<1024 && browserWidth>768) ?                   
                        <div className="Tablet__Container-sc-2ocpeo-0 UcQSe">
                          <div className="Tablet__Content-sc-2ocpeo-1 eyLBfp">
                          <h3 className="Sliderstyles__Title-sc-jd0rgd-0 kQjOWu">  {(isLeftArrow ? "Notre simulateur" : "Suivez votre dossier en temps réel")}</h3>
                            <p className="Sliderstyles__Description-sc-jd0rgd-1 dzJZez"> 
                                    {(isLeftArrow ? "Soyez sûr avant de vous engager : notre simulateur doté d’algorithmes puissants vous donne un indice de confiance sur vos chances d'obtenir votre visa." 
                                              : "Vous nous confiez votre projet, vous devez savoir où il en est. RDV à l'ambassade, décision d'une école ... Bénéficiez d’un espace en ligne sécurisé pour suivre l’avancée de votre dossier en toute autonomie.") } </p>
                            <div className="Sliderstyles__SlideContainer-sc-jd0rgd-4 exfKJT">
                              <hr className={"Divider-sc-1qii385-0 Sliderstyles__Slide-sc-jd0rgd-5 iyJAir "+ (isLeftArrow ? "LACWn" : "jaXoBy") } />
                              <hr className={"Divider-sc-1qii385-0 Sliderstyles__Slide-sc-jd0rgd-5 iyJAir "+ (!isLeftArrow ? "LACWn" : "jaXoBy")} />
                            </div>
                          </div>
                          <div className="Tablet__ImageController-sc-2ocpeo-2 qqeks">
                            <button aria-label="Précédent" type="button" onClick={() => handleClickArrow(true)} className="ArrowButton__Container-sc-11aiclo-3 hRnQwB Sliderstyles__Previous-sc-jd0rgd-2 ENyIs" disabled={isLeftArrow}>
                              <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className="ArrowButton__Arrow-sc-11aiclo-0 ArrowButton__Arrow1-sc-11aiclo-1 fhLDeK">
                                <path d="M20.7454 14.8908L17.1664 11.3187L18.7381 9.75L25 16L18.7381 22.25L17.1664 20.6813L20.7454 17.1092H7V14.8908H20.7454Z" />
                              </svg>
                              <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className="ArrowButton__Arrow-sc-11aiclo-0 ArrowButton__Arrow2-sc-11aiclo-2 fhLDeK">
                                <path d="M20.7454 14.8908L17.1664 11.3187L18.7381 9.75L25 16L18.7381 22.25L17.1664 20.6813L20.7454 17.1092H7V14.8908H20.7454Z" />
                              </svg>
                            </button>
                            <div className="Sliderstyles__ImageContainer-sc-jd0rgd-6 isxeYt">
                            <picture>
                              <source type="image/webp" srcSet={SliderstylesImage1} />
                              <source srcSet={SliderstylesImage1} />
                              <img className={"Sliderstyles__Image-sc-jd0rgd-7 "+ (isLeftArrow ? "kCpYFv" : "CtOpC") } src={SliderstylesImage1} alt="" />
                            </picture>
                            <picture>
                              <source type="image/webp" srcSet={SliderstylesImage2} />
                              <source srcSet={SliderstylesImage2} />
                              <img className={"Sliderstyles__Image-sc-jd0rgd-7 "+ (!isLeftArrow ? "kCpYFv" : "CtOpC") } src={SliderstylesImage2} alt="" />
                            </picture>
                          </div>
                            <button aria-label="Suivant" type="button" onClick={() => handleClickArrow(false)} className="ArrowButton__Container-sc-11aiclo-3 doTHWK Sliderstyles__Next-sc-jd0rgd-3 jZecqw" disabled={!isLeftArrow}>
                              <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className="ArrowButton__Arrow-sc-11aiclo-0 ArrowButton__Arrow1-sc-11aiclo-1 bJwJPy">
                                <path d="M20.7454 14.8908L17.1664 11.3187L18.7381 9.75L25 16L18.7381 22.25L17.1664 20.6813L20.7454 17.1092H7V14.8908H20.7454Z" />
                              </svg>
                              <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className="ArrowButton__Arrow-sc-11aiclo-0 ArrowButton__Arrow2-sc-11aiclo-2 bJwJPy">
                                <path d="M20.7454 14.8908L17.1664 11.3187L18.7381 9.75L25 16L18.7381 22.25L17.1664 20.6813L20.7454 17.1092H7V14.8908H20.7454Z" />
                              </svg>
                            </button>
                          </div>
                        </div> : <div className="Mobile__Container-sc-fyrimv-0 jERalJ">
                                  <h3 className="Sliderstyles__Title-sc-jd0rgd-0 kQjOWu">  {(isLeftArrow ? "Notre simulateur" : "Suivez votre dossier en temps réel")}</h3>
                                  <p className="Sliderstyles__Description-sc-jd0rgd-1 dzJZez"> 
                                        {(isLeftArrow ? "Soyez sûr avant de vous engager : notre simulateur doté d’algorithmes puissants vous donne un indice de confiance sur vos chances d'obtenir votre visa." 
                                              : "Vous nous confiez votre projet, vous devez savoir où il en est. RDV à l'ambassade, décision d'une école ... Bénéficiez d’un espace en ligne sécurisé pour suivre l’avancée de votre dossier en toute autonomie.") }
                                  </p>
                                  <div className="Mobile__Navbar-sc-fyrimv-1 kHmjuy">
                                    <button aria-label="Précédent" type="button" onClick={() => handleClickArrow(true)} className="ArrowButton__Container-sc-11aiclo-3 hRnQwB Sliderstyles__Previous-sc-jd0rgd-2 ENyIs" disabled={isLeftArrow}>
                                      <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className="ArrowButton__Arrow-sc-11aiclo-0 ArrowButton__Arrow1-sc-11aiclo-1 fhLDeK">
                                        <path d="M20.7454 14.8908L17.1664 11.3187L18.7381 9.75L25 16L18.7381 22.25L17.1664 20.6813L20.7454 17.1092H7V14.8908H20.7454Z" />
                                      </svg>
                                      <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className="ArrowButton__Arrow-sc-11aiclo-0 ArrowButton__Arrow2-sc-11aiclo-2 fhLDeK">
                                        <path d="M20.7454 14.8908L17.1664 11.3187L18.7381 9.75L25 16L18.7381 22.25L17.1664 20.6813L20.7454 17.1092H7V14.8908H20.7454Z" />
                                      </svg>
                                    </button>
                                    <div className="Sliderstyles__SlideContainer-sc-jd0rgd-4 exfKJT">
                                      <hr className={"Divider-sc-1qii385-0 Sliderstyles__Slide-sc-jd0rgd-5 iyJAir "+ (isLeftArrow ? "LACWn" : "jaXoBy") } />
                                      <hr className={"Divider-sc-1qii385-0 Sliderstyles__Slide-sc-jd0rgd-5 iyJAir "+ (!isLeftArrow ? "LACWn" : "jaXoBy")} />
                                    </div>
                                    <button aria-label="Suivant" type="button" onClick={() => handleClickArrow(false)} className="ArrowButton__Container-sc-11aiclo-3 doTHWK Sliderstyles__Next-sc-jd0rgd-3 jZecqw" disabled={!isLeftArrow}>
                                      <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className="ArrowButton__Arrow-sc-11aiclo-0 ArrowButton__Arrow1-sc-11aiclo-1 bJwJPy">
                                        <path d="M20.7454 14.8908L17.1664 11.3187L18.7381 9.75L25 16L18.7381 22.25L17.1664 20.6813L20.7454 17.1092H7V14.8908H20.7454Z" />
                                      </svg>
                                      <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className="ArrowButton__Arrow-sc-11aiclo-0 ArrowButton__Arrow2-sc-11aiclo-2 bJwJPy">
                                        <path d="M20.7454 14.8908L17.1664 11.3187L18.7381 9.75L25 16L18.7381 22.25L17.1664 20.6813L20.7454 17.1092H7V14.8908H20.7454Z" />
                                      </svg>
                                    </button>
                                  </div>
                                  <div className="Sliderstyles__ImageContainer-sc-jd0rgd-6 isxeYt">
                                    <picture>
                                      <source type="image/webp" srcSet={SliderstylesImage1} />
                                      <source srcSet={SliderstylesImage1} />
                                      <img className={"Sliderstyles__Image-sc-jd0rgd-7 "+ (isLeftArrow ? "kCpYFv" : "CtOpC") } src={SliderstylesImage1} alt="" />
                                    </picture>
                                    <picture>
                                      <source type="image/webp" srcSet={SliderstylesImage2} />
                                      <source srcSet={SliderstylesImage2} />
                                      <img className={"Sliderstyles__Image-sc-jd0rgd-7 "+ (!isLeftArrow ? "kCpYFv" : "CtOpC") } src={SliderstylesImage2} alt="" />
                                    </picture>
                                  </div>
                                </div>)}


                      </div>
                      <div className="section-2 section-9 wf-section">
                        <div className="pre-title">Comment ça marche</div>
                        <h1 className="center-text center-text1">Votre visa en 6 étapes</h1>
                        <div className="columns-6 w-row">
                          <div className="w-col w-col-6 w-col-stack">
                            {/* <img src="https://uploads-ssl.webflow.com/61d984790bdf2970837c8d96/62bafa7838ff242093f9d9b5_iollo-kit%402x.png" loading="lazy" width={750} sizes="(max-width: 991px) 100vw, (max-width: 1439px) 48vw, 621px" srcSet="https://uploads-ssl.webflow.com/61d984790bdf2970837c8d96/62bafa7838ff242093f9d9b5_iollo-kit%402x-p-500.png  500w,https://uploads-ssl.webflow.com/61d984790bdf2970837c8d96/62bafa7838ff242093f9d9b5_iollo-kit%402x-p-800.png  800w,https://uploads-ssl.webflow.com/61d984790bdf2970837c8d96/62bafa7838ff242093f9d9b5_iollo-kit%402x-p-1080.png  1080w,https://uploads-ssl.webflow.com/61d984790bdf2970837c8d96/62bafa7838ff242093f9d9b5_iollo-kit%402x.png  1500w" alt="" className="image-5" /> */}
                            <img src={PasseportVisa} loading="lazy" width={750} sizes="(max-width: 991px) 100vw, (max-width: 1439px) 48vw, 621px" alt="" className="image-5" />
                          </div>
                          <div className="column-19 w-col w-col-6 w-col-stack">
                            <div className="div-block-2">
                              <div className="work__item-num">1</div>
                              <h2 className="steps">Test de chances de voyager</h2>
                              <p className="paragraph-2"> Grâce à notre puissant simulateur, nous évaluons vos chances d'obtenir un visa. Nous déterminons ainsi si vous devriez déposer votre demande immédiatement ou suivre nos recommandations personnalisées afin d'optimiser vos chances et ainsi commencer vos démarches.
                                  <br />
                                  <button className="PrimaryButton__Container-sc-1vkvp7q-0 iroZSn">
                                    <span className="PrimaryButton__Overlay-sc-1vkvp7q-3 sSEIO">
                                      <span className="PrimaryButton__OverlayBackground-sc-1vkvp7q-4 kxNCsz">
                                        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className="PrimaryButton__Arrow-sc-1vkvp7q-1 crhpBB">
                                          <path d="M20.7454 14.8908L17.1664 11.3187L18.7381 9.75L25 16L18.7381 22.25L17.1664 20.6813L20.7454 17.1092H7V14.8908H20.7454Z" />
                                        </svg>
                                      </span>
                                    </span>
                                    <Link to='/simulation/home'>
                                      <span className="PrimaryButton__Label-sc-1vkvp7q-2 kVCvkJ"> Simuler mon visa </span>
                                    </Link>
                                  </button>
                              </p>
                            </div>
                            <div className="div-block-3">
                              <div className="work__item-num">2</div>
                              <h2 className="steps">Contrat d'accompagnement</h2>
                              <p className="paragraph-2"> En cas d'éligibilité, la souscription à nos services s'effectuer à distance par la signature d’un contrat. Vous profiterez ainsi d'un suivi personnalisé tout au long de votre projet, et au-delà. </p>
                            </div>
                            <div className="div-block-4">
                              <div className="work__item-num">3</div>
                              <h2 className="steps">Paiement</h2>
                              <p className="paragraph-2"> Ensemble, nous établissons un devis prévisionnel, intégrant nos commissions à hauteur de 10%, exposant le coût global du projet. Après acceptation du devis, 
                              un acompte équivalent à 30% du montant estimé doit être versé, lequel sera consigné dans un compte bloqué. En cas de réussite, le règlement du solde est exigé avant la délivrance de votre visa.
                              En cas de refus, le remboursement intégral des fonds est effectué ; bien que les refus chez nous soient rares! </p>
                            </div>
                            <div className="div-block-7">
                              <div className="work__item-num">4</div>
                              <h2 className="steps">Dossier de candidature</h2>
                              <p className="paragraph-2"> Nos experts ré-examinent avec vous vos documents et préparent votre dossier de candidature en vue d'une démarche efficace. </p>
                            </div>
                            <div className="div-block-7">
                              <div className="work__item-num">5</div>
                              <h2 className="steps">Suivi des démarches</h2>
                              <p className="paragraph-2"> 
                                Nous vous accompagnons à chaque étape de votre demande de visa, offrant une assistance complète pour l'obtention des documents gouvernementaux nécessaires. </p>
                            </div>
                            <div className="div-block-7">
                              <div className="work__item-num">6</div>
                              <h2 className="steps">Decision finale</h2>
                              <p className="paragraph-2"> Après réception de la réponse de l'ambassade, nous effectuons une évaluation globale et vous prodiguons les derniers conseils pour la suite de la procédure.</p>
                            </div>
                            <img src={PasseportVisa} loading="lazy" width={750} sizes="(max-width: 479px) 320px, (max-width: 991px) 96vw, 100vw" alt="" className="image-17" />
                          </div>
                        </div>
                      </div>
                    {/* <div className="styles__Grid-sc-10gqksz-1 iuHviD BlocOutils__Container-sc-10c9hjh-0 fGvXyl">
                      <div className="BlocOutils__Content-sc-10c9hjh-1 jQpxOw">
                        <p className="BlocOutils__Transparency-sc-10c9hjh-2 jXRqut"> Notre objectif </p>
                        <h2 className="BlocOutils__Title-sc-10c9hjh-3 wniqW">  Notre objectif - Créer un monde sans frontières ! </h2>
                        <p className="BlocOutils__Description-sc-10c9hjh-4 eQpKZn"> Chacun mérite de se sentir libre et de voyager où il veut ! </p>
                        <button className="PrimaryButton__Container-sc-1vkvp7q-0 iroZSn BlocOutils__Simulate-sc-10c9hjh-5 cWIQGA">
                          <span className="PrimaryButton__Overlay-sc-1vkvp7q-3 sSEIO">
                            <span className="PrimaryButton__OverlayBackground-sc-1vkvp7q-4 kxNCsz">
                              <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className="PrimaryButton__Arrow-sc-1vkvp7q-1 crhpBB">
                                <path d="M20.7454 14.8908L17.1664 11.3187L18.7381 9.75L25 16L18.7381 22.25L17.1664 20.6813L20.7454 17.1092H7V14.8908H20.7454Z" />
                              </svg>
                            </span>
                          </span>
                          <span className="PrimaryButton__Label-sc-1vkvp7q-2 kVCvkJ"> Simuler mon visa </span>
                        </button>
                      </div> 
                    </div>
                    <section className="BlocParole__Bloc-sc-43i1q4-0 iRbylv">
                    <div className="BlocOutils__Content-sc-10c9hjh-1 jQpxOw">
                        <p className="BlocOutils__Transparency-sc-10c9hjh-2 jXRqut"> Notre objectif </p>
                        <h2 className="BlocOutils__Title-sc-10c9hjh-3 wniqW"> Notre objectif - Créer un monde sans frontières ! </h2>
                      </div>
                      <div className="BlocParole__List-sc-43i1q4-7 hGqDyH">
                        <p className="BlocParole__ListItemTitleDescription-sc-43i1q4-11 gLpqe"> Chacun mérite de se sentir libre et de voyager où il veut !</p>
                      </div>
                      <div className="BlocParole__ImageContainer-sc-43i1q4-4 gzOqSu">
                        <picture>
                            <source type="image/webp" srcSet={WorldNoBorders} />
                            <source srcSet={WorldNoBorders} />
                            <img className="BlocParole__Image-sc-43i1q4-5 gXGJBg" src={SliderstylesImage1} alt="" loading="lazy" size="(min-width: 1024px) 50vw, (min-width: 768px) 75vw, 100vw"/>
                        </picture>
                      </div>
                    </section>*/}
                        <section className="Courtier__Bloc-sc-431mxx-0 lciTAJ">
                      <div className="Banner__Content-sc-krte25-0 kIwpz">
                        <p className="Content__Catchphrase-sc-hd6o8b-0 fCnjcm"> Des conseillers pas comme les autres&nbsp;: </p>
                        <h2 className="Content__Title-sc-hd6o8b-1 erjsGF"> Leur priorité c’est vous&nbsp;! </h2>
                        <p className="Content__Description-sc-hd6o8b-2 hhQjSJ"> Un conseiller, c’est bien. Un conseiller expert et pédagogue qui vous comprend, c’est mieux. 
                                                                                Les conseillers Wendogo vous accompagnent dans votre projet de demande de visa avec implication et réactivité. </p>
                        <button className="PrimaryButton__Container-sc-1vkvp7q-0 iroZSn">
                          <span className="PrimaryButton__Overlay-sc-1vkvp7q-3 sSEIO">
                            <span className="PrimaryButton__OverlayBackground-sc-1vkvp7q-4 kxNCsz">
                              <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className="PrimaryButton__Arrow-sc-1vkvp7q-1 crhpBB">
                                <path d="M20.7454 14.8908L17.1664 11.3187L18.7381 9.75L25 16L18.7381 22.25L17.1664 20.6813L20.7454 17.1092H7V14.8908H20.7454Z" />
                              </svg>
                            </span>
                          </span>
                          <Link to='/simulation/home'>
                            <span className="PrimaryButton__Label-sc-1vkvp7q-2 kVCvkJ"> Simuler mon visa </span>
                          </Link>
                        </button>
                        {/* <h1>{countdown}</h1>
                        <h1>dd {positionLeft} - {browserWidth}</h1>
                        <h1> widthBanner {widthBanner}</h1> */}
                      </div>
                      <div className={"Images__Container-sc-2gr022-0 Banner__Images-sc-krte25-1 fCdAKA "+bannerAnimationClassList[0]} ref={myElementRef}>
                        <div className="Images__BaseImage-sc-2gr022-2 Images__Image1-sc-2gr022-3 ioovUp llLrAK">
                          {/* <picture>
                            <source type="image/webp" srcSet="https://res.cloudinary.com/wendogo-fr/image/upload/q_auto,f_webp,w_320/v1677667256/website/page/home/BlocCourtier-1.jpg 320w, https://res.cloudinary.com/wendogo-fr/image/upload/q_auto,f_webp,w_375/v1677667256/website/page/home/BlocCourtier-1.jpg 375w, https://res.cloudinary.com/wendogo-fr/image/upload/q_auto,f_webp,w_425/v1677667256/website/page/home/BlocCourtier-1.jpg 425w, https://res.cloudinary.com/wendogo-fr/image/upload/q_auto,f_webp,w_768/v1677667256/website/page/home/BlocCourtier-1.jpg 768w, https://res.cloudinary.com/wendogo-fr/image/upload/q_auto,f_webp,w_1024/v1677667256/website/page/home/BlocCourtier-1.jpg 1024w, https://res.cloudinary.com/wendogo-fr/image/upload/q_auto,f_webp,w_1240/v1677667256/website/page/home/BlocCourtier-1.jpg 1240w" />
                            <source srcSet="https://res.cloudinary.com/wendogo-fr/image/upload/q_auto,w_320/v1677667256/website/page/home/BlocCourtier-1.jpg 320w, https://res.cloudinary.com/wendogo-fr/image/upload/q_auto,w_375/v1677667256/website/page/home/BlocCourtier-1.jpg 375w, https://res.cloudinary.com/wendogo-fr/image/upload/q_auto,w_425/v1677667256/website/page/home/BlocCourtier-1.jpg 425w, https://res.cloudinary.com/wendogo-fr/image/upload/q_auto,w_768/v1677667256/website/page/home/BlocCourtier-1.jpg 768w, https://res.cloudinary.com/wendogo-fr/image/upload/q_auto,w_1024/v1677667256/website/page/home/BlocCourtier-1.jpg 1024w, https://res.cloudinary.com/wendogo-fr/image/upload/q_auto,w_1240/v1677667256/website/page/home/BlocCourtier-1.jpg 1240w" />
                            <img alt="" size="(min-width: 1024px) 50vw, 100vw" loading="lazy" src="https://res.cloudinary.com/wendogo-fr/image/upload/q_auto/v1677667256/website/page/home/BlocCourtier-1.jpg" className={"Images__Image-sc-2gr022-1 "+((countdown<5 || countdown===15) ? bannerAnimationClassList[1] : "eXDVgd")} />
                          </picture> */}
                          <picture>
                            <source type="image/webp" srcSet={BlockCourtier1} />
                            <source srcSet={BlockCourtier1} />
                            <img className={"Images__Image-sc-2gr022-1 "+((countdown<5 || countdown===15) ? bannerAnimationClassList[1] : "eXDVgd")} src={BlockCourtier1} alt="" size="(min-width: 1024px) 50vw, 100vw" loading="lazy"  />
                            {/* <img alt="v1677658638/website/page/home/Re%CC%81sultat.png" className="Sliderstyles__Image-sc-jd0rgd-7 kCpYFv" loading="lazy" src="https://res.cloudinary.com/wendogo-fr/image/upload/q_auto/v1677658638/website/page/home/Re%CC%81sultat.png" /> */}
                          </picture>
                        </div>
                        <div className="Images__BaseImage-sc-2gr022-2 Images__Image2-sc-2gr022-4 ioovUp kUUMLx">
                          <picture>
                            <source type="image/webp" srcSet={BlockCourtier2} />
                            <source srcSet={BlockCourtier2} />
                            <img  className={"Images__Image-sc-2gr022-1 "+((countdown >= 5 && countdown<10) ? bannerAnimationClassList[1] : "eXDVgd")} src={BlockCourtier2} alt="" size="(min-width: 1024px) 50vw, 100vw" loading="lazy"  />
                            {/* <img alt="v1677658638/website/page/home/Re%CC%81sultat.png" className="Sliderstyles__Image-sc-jd0rgd-7 kCpYFv" loading="lazy" src="https://res.cloudinary.com/wendogo-fr/image/upload/q_auto/v1677658638/website/page/home/Re%CC%81sultat.png" /> */}
                          </picture>
                          {/* <picture>
                            <source type="image/webp" srcSet="https://res.cloudinary.com/wendogo-fr/image/upload/q_auto,f_webp,w_320/v1677668879/website/page/home/BlocCourtier-2.jpg 320w, https://res.cloudinary.com/wendogo-fr/image/upload/q_auto,f_webp,w_375/v1677668879/website/page/home/BlocCourtier-2.jpg 375w, https://res.cloudinary.com/wendogo-fr/image/upload/q_auto,f_webp,w_425/v1677668879/website/page/home/BlocCourtier-2.jpg 425w, https://res.cloudinary.com/wendogo-fr/image/upload/q_auto,f_webp,w_768/v1677668879/website/page/home/BlocCourtier-2.jpg 768w, https://res.cloudinary.com/wendogo-fr/image/upload/q_auto,f_webp,w_1024/v1677668879/website/page/home/BlocCourtier-2.jpg 1024w, https://res.cloudinary.com/wendogo-fr/image/upload/q_auto,f_webp,w_1240/v1677668879/website/page/home/BlocCourtier-2.jpg 1240w" />
                            <source srcSet="https://res.cloudinary.com/wendogo-fr/image/upload/q_auto,w_320/v1677668879/website/page/home/BlocCourtier-2.jpg 320w, https://res.cloudinary.com/wendogo-fr/image/upload/q_auto,w_375/v1677668879/website/page/home/BlocCourtier-2.jpg 375w, https://res.cloudinary.com/wendogo-fr/image/upload/q_auto,w_425/v1677668879/website/page/home/BlocCourtier-2.jpg 425w, https://res.cloudinary.com/wendogo-fr/image/upload/q_auto,w_768/v1677668879/website/page/home/BlocCourtier-2.jpg 768w, https://res.cloudinary.com/wendogo-fr/image/upload/q_auto,w_1024/v1677668879/website/page/home/BlocCourtier-2.jpg 1024w, https://res.cloudinary.com/wendogo-fr/image/upload/q_auto,w_1240/v1677668879/website/page/home/BlocCourtier-2.jpg 1240w" />
                            <img alt="" size="(min-width: 1024px) 50vw, 100vw" loading="lazy" src="https://res.cloudinary.com/wendogo-fr/image/upload/q_auto/v1677668879/website/page/home/BlocCourtier-2.jpg" />
                          </picture> */}
                        </div>
                        <div className="Images__BaseImage-sc-2gr022-2 Images__Image3-sc-2gr022-5 ioovUp gaxwmL">
                          <picture>
                            <source type="image/webp" srcSet={BlockCourtier3} />
                            <source srcSet={BlockCourtier3} />
                            <img className={"Images__Image-sc-2gr022-1 "+((countdown >= 10 && countdown<15) ? bannerAnimationClassList[1] : "eXDVgd")} src={BlockCourtier3} alt="" size="(min-width: 1024px) 50vw, 100vw" loading="lazy"  />
                            {/* <img alt="v1677658638/website/page/home/Re%CC%81sultat.png" className="Sliderstyles__Image-sc-jd0rgd-7 kCpYFv" loading="lazy" src="https://res.cloudinary.com/wendogo-fr/image/upload/q_auto/v1677658638/website/page/home/Re%CC%81sultat.png" /> */}
                          </picture>
                          {/* <picture>
                            <source type="image/webp" srcSet="https://res.cloudinary.com/wendogo-fr/image/upload/q_auto,f_webp,w_320/v1677668879/website/page/home/BlocCourtier-3.jpg 320w, https://res.cloudinary.com/wendogo-fr/image/upload/q_auto,f_webp,w_375/v1677668879/website/page/home/BlocCourtier-3.jpg 375w, https://res.cloudinary.com/wendogo-fr/image/upload/q_auto,f_webp,w_425/v1677668879/website/page/home/BlocCourtier-3.jpg 425w, https://res.cloudinary.com/wendogo-fr/image/upload/q_auto,f_webp,w_768/v1677668879/website/page/home/BlocCourtier-3.jpg 768w, https://res.cloudinary.com/wendogo-fr/image/upload/q_auto,f_webp,w_1024/v1677668879/website/page/home/BlocCourtier-3.jpg 1024w, https://res.cloudinary.com/wendogo-fr/image/upload/q_auto,f_webp,w_1240/v1677668879/website/page/home/BlocCourtier-3.jpg 1240w" />
                            <source srcSet="https://res.cloudinary.com/wendogo-fr/image/upload/q_auto,w_320/v1677668879/website/page/home/BlocCourtier-3.jpg 320w, https://res.cloudinary.com/wendogo-fr/image/upload/q_auto,w_375/v1677668879/website/page/home/BlocCourtier-3.jpg 375w, https://res.cloudinary.com/wendogo-fr/image/upload/q_auto,w_425/v1677668879/website/page/home/BlocCourtier-3.jpg 425w, https://res.cloudinary.com/wendogo-fr/image/upload/q_auto,w_768/v1677668879/website/page/home/BlocCourtier-3.jpg 768w, https://res.cloudinary.com/wendogo-fr/image/upload/q_auto,w_1024/v1677668879/website/page/home/BlocCourtier-3.jpg 1024w, https://res.cloudinary.com/wendogo-fr/image/upload/q_auto,w_1240/v1677668879/website/page/home/BlocCourtier-3.jpg 1240w" />
                            <img alt="" size="(min-width: 1024px) 50vw, 100vw" loading="lazy" src="https://res.cloudinary.com/wendogo-fr/image/upload/q_auto/v1677668879/website/page/home/BlocCourtier-3.jpg" className={"Images__Image-sc-2gr022-1 "+((countdown<15 && countdown>=10) ? bannerAnimationClassList[1] : "eXDVgd")} />
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
                            <source type="image/webp" sizes="(min-width: 1240px) 288px, (min-width: 1024px) 25vw, (min-width: 768px) 37.5vw, 100vw" srcSet={WorldNoBorders} />
                            <source sizes="(min-width: 1240px) 288px, (min-width: 1024px) 25vw, (min-width: 768px) 37.5vw, 100vw"  srcSet={WorldNoBorders} />
                            <img className="Banner__Image-sc-yqcec5-2 kHAXoZ" alt="v1677669144/website/page/home/BlocFooter.jpg" loading="lazy" src={SliderstylesImage1}/>
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
                              <Link to='/simulation/home'>
                                <span className="PrimaryButton__Label-sc-1vkvp7q-2 kVCvkJ"> Simuler mon visa </span>
                              </Link>
                            </button>
                            <p className="Banner__Caption-sc-yqcec5-7 elCGHz"> En 3 minutes, sans inscription&nbsp;! </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </main>
                  <Footer/>
                </section>
            </div>           
          </div>

}

export default HomePage
