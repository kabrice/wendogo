
// Import img
import backgroundImg3 from '../assets/flag-canada-toronto-hd-wallpaper-preview.jpg';
import backgroundImg2 from '../assets/1000_F_534931774_iiLVveToIVDuO89bZdeLs770iR7Lnm2a.png';
import backgroundImg1 from '../assets/flightwallpaper.webp';
import SliderstylesImage1 from '../assets/Sliderstyles__Image1.png'
import SliderstylesImage2 from '../assets/Sliderstyles__Image2.png'
import PasseportVisa from '../assets/1000_F_154951378_oyz1BvKKnOVw92VJ05vNIk4l72WxkZaP.jpg'
import WorldNoBorders from '../assets/AdobeStock_559662042_Preview.jpeg'
import ParisCity from '../assets/AdobeStock_70798474_Preview.jpeg'
import BlockCourtier1 from '../assets/group-portrait-five-african-business-colleagues-standing-row-office_484651-18709.avif'
import BlockCourtier2 from '../assets/240_F_271683964_RV5TD7e4GN67UBFhvBvtltNO4hJ5aTQs.jpg'
import BlockCourtier3 from '../assets/beautiful-woman-standing-front-colleagues-group-african-american-business-people-working-office-together_146671-45002.avif'

// Import svg
import  {ReactComponent as WendogoLogo} from '../assets/wendogo_logo.svg'
import  {ReactComponent as DropDownIcon} from '../assets/dropdown_icon.svg'
import {ReactComponent as FeatureDistance} from '../assets/features-distance-1.svg'
import {ReactComponent as FeatureImplication} from '../assets/features-implication-4.svg'
import {ReactComponent as FeatureNoStress} from '../assets/features-no-stress-4.svg'
import {ReactComponent as FeaturePrice} from '../assets/features-price-2.svg'
import {ReactComponent as FeatureProfessional} from '../assets/features-professional-4.svg'
import {ReactComponent as FeatureTransparence} from '../assets/features-transparence-4.svg'

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

// import required modules
import { Pagination, Autoplay } from "swiper";
import { useEffect, useState, useRef, useCallback } from 'react';

function HomePage(){

    const [isLeftArrow, setIsLeftArrow] = useState(true)

    const handleClickArrow = (isLeftArrow) => {
      setIsLeftArrow(isLeftArrow)
    }

    const [countdown, setCountdown] = useState(0);
    const [bannerAnimationClassList, updateBannerAnimationClassList] = useState(["bEueds", "egKQIA"]);
    //const [progressBarClass, setProgressBarClass] = useState('lahlbf');
    const [browserWidth, setBrowserWidth] = useState(0) 
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
            setCountdown(countdown + 1);
          }
        }, 1000); 
      }else{
        setCountdown(0)  
      }

      return () => clearTimeout(timeout);
    }, [countdown, browserWidth]);
 
    const [scrollTop, setScrollTop] = useState(0);
    const myElementRef = useRef(null);
    const [positionLeft, setPositionLeft] = useState(0);

    const [widthBanner, setWidthBanner] = useState(0);
  
    // useLayoutEffect(() => {
    //   setWidthBanner(myElementRef.current.offsetWidth);
    // }, []);


    useEffect(() => {
      
      const handleScroll = () => {
        setScrollTop(window.scrollY);
        const el = myElementRef.current;
        setPositionLeft(el.scrollLeft);
        setWidthBanner(el.offsetWidth);
      };
      console.log('positionLeft ', positionLeft, browserWidth)
      
      window.addEventListener('scroll', () => handleScroll());
      const element = myElementRef.current;
      element.addEventListener("scroll", () => handleScroll());  
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
        window.removeEventListener('scroll', () => handleScroll());
      };
    }, [browserWidth, widthBanner, positionLeft,countdown]);    


    return <div >
            <nav className={"Navbarstyles__Navigation1 "+(scrollTop>900 ? "fBUtVg" : "kebTzo")}>
              <div className={"Navbarstyles__Navigation2 "+(scrollTop>900 ? "jBwgPO" : "jigKlE")}>
                <div className="Navbarstyles__Navigation3">
                  <a aria-current="page" aria-label="Aller à l'accueil" className="Navbarstyles__LogoLink" href="/">
                    <WendogoLogo className={scrollTop>900 ? "WendogoLogoText" : ""}/>
                  </a>
                  <button aria-label="Ouvrir le menu" tabIndex={0} type="button" className="Navbarstyles__BurgerButton">
                    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className="Navbarstyles__BurgerButtonIcon">
                      <path d="M4.5,7c0-.28,.22-.5,.5-.5H27c.28,0,.5,.22,.5,.5v2c0,.28-.22,.5-.5,.5H5c-.28,0-.5-.22-.5-.5v-2Zm0,8c0-.28,.22-.5,.5-.5H27c.28,0,.5,.22,.5,.5v2c0,.28-.22,.5-.5,.5H5c-.28,0-.5-.22-.5-.5v-2Zm.5,7.5c-.28,0-.5,.22-.5,.5v2c0,.28,.22,.5,.5,.5H27c.28,0,.5-.22,.5-.5v-2c0-.28-.22-.5-.5-.5H5Z" />
                    </svg>
                  </button>
                  <div className="Navbarstyles__Overlay">
                    <ul role="menu" className="Navbarstyles__Menu">
                      <li aria-expanded="false" role="menuitem" tabIndex={0} className="Navbarstyles__MenuItem Navbarstyles__MenuItem-common">
                        <span className="Navbarstyles__MenuItemLabel">
                          <span>Simuler mon visa</span>
                          <DropDownIcon/>
                        </span>
                        <ul className="Navbarstyles__SubMenu">
                          <li className="Navbarstyles__SubMenuFirstItem">
                            <a tabIndex={0} className="LinkLabel__Link" href="/simulation-pret-immobilier/capacite-demprunt/">
                              <span className="LinkLabel__Label">Visas pour la France</span>
                            </a>
                          </li>
                          <li>
                            <a tabIndex={0} className="LinkLabel__Link" href="/simulation-pret-immobilier/">
                              <span className="LinkLabel__Label">Visa pour le Canada </span>
                            </a>
                          </li>
                        </ul>
                      </li>
                      <li aria-expanded="false" aria-controls="7d517232" role="menuitem" tabIndex={0} className="Navbarstyles__MenuItem Navbarstyles__MenuItem-common">
                        <span className="Navbarstyles__MenuItemLabel">
                          <span>Ressources</span>
                          <DropDownIcon/>
                        </span>
                        <ul id="7d517232" className="Navbarstyles__SubMenu">
                          <li className="Navbarstyles__SubMenuFirstItem">
                            <a tabIndex={0} className="LinkLabel__Link" href="/recherche-immobiliere/">
                              <span className="LinkLabel__Label"> Combien de temps prendra le traitement de ma demande de visa par Visas Express ?</span>
                            </a>
                          </li>
                          <li>
                            <a tabIndex={0} className="LinkLabel__Link" href="/pret-immobilier/">
                              <span className="LinkLabel__Label"> Les étapes d'une demande de visa </span>
                            </a>
                          </li>
                          <li>
                            <a tabIndex={0} className="LinkLabel__Link" href="/courtier-credit/">
                              <span className="LinkLabel__Label"> Pourquoi passer par un Wendogo&nbsp;? </span>
                            </a>
                          </li>
                          <li>
                            <a tabIndex={0} className="LinkLabel__Link" href="/temoignages-clients/">
                              <span className="LinkLabel__Label"> Témoignages clients </span>
                            </a>
                          </li>
                          <li>
                            <a tabIndex={0} className="LinkLabel__Link" href="https://faq.pretto.fr/fr/" rel="noreferrer noopener" target="_blank">
                              <span className="LinkLabel__Label"> FAQ </span>
                            </a>
                          </li>
                        </ul>
                      </li>
                      <li aria-expanded="false" aria-controls="e75b56b9" role="menuitem" tabIndex={0} className="Navbarstyles__MenuItem Navbarstyles__MenuItem-common">
                        <span className="Navbarstyles__MenuItemLabel">
                          <span>À propos</span>
                          <DropDownIcon/>
                        </span>
                        <ul id="e75b56b9" className="Navbarstyles__SubMenu">
                          <li className="Navbarstyles__SubMenuFirstItem">
                            <a tabIndex={0} className="LinkLabel__Link" href="/notre-service/cest-quoi-pretto/">
                              <span className="LinkLabel__Label"> Pourquoi passer par Pretto </span>
                            </a>
                          </li>
                          <li>
                            <a tabIndex={0} className="LinkLabel__Link" href="/notre-service/charte-qualite/">
                              <span className="LinkLabel__Label"> Notre charte qualité </span>
                            </a>
                          </li>
                          <li>
                            <a tabIndex={0} className="LinkLabel__Link" href="/courtier-credit/courtier-immobilier-comment-ca-marche/qui-sont-nos-courtiers/">
                              <span className="LinkLabel__Label"> Qui sommes nous ? </span>
                            </a>
                          </li>
                        </ul>
                      </li>
                      <li className="Navbarstyles__MenuButtonItems-sc-mi7mu3-6 eonXWL">
                        <a href="https://app.pretto.fr/login/" className="ButtonLogin__Button"> Se connecter </a>
                        <a href="https://app.pretto.fr/" className="ButtonNavbar__Button">
                          <span className="ButtonNavbar__Label"> Simuler mon visa </span>
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
            <div className="main"> 
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
                      <span className="PrimaryButton__Label-sc-1vkvp7q-2 kVCvkJ"> Simuler mon visa </span>
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
                            <p className="Card__Text-sc-1qqjegm-5 iOmyQf"> Profitez d'une assistance personnalisée via le confort de votre canapé. </p>
                          </div>
                        </div>
                        <div className="Card__Container-sc-1qqjegm-0 bSzjhs">
                          <div className="Card__CheckContainer-sc-1qqjegm-1 ffwQEH">
                           <FeaturePrice/>
                          </div>
                          <div className="Card__TextContainer-sc-1qqjegm-3 ezVybs">
                            <div className="Card__Title-sc-1qqjegm-4 bqicpW">Tarifs</div>
                            <p className="Card__Text-sc-1qqjegm-5 iOmyQf"> Outils et conseils gratuits, nous encaissons le paiement qu’au succès. </p>
                          </div>
                        </div>
                        <div className="Card__Container-sc-1qqjegm-0 bSzjhs">
                          <div className="Card__CheckContainer-sc-1qqjegm-1 ffwQEH">
                            <FeatureNoStress/>
                          </div>
                          <div className="Card__TextContainer-sc-1qqjegm-3 ezVybs">
                            <div className="Card__Title-sc-1qqjegm-4 bqicpW">No Stress</div>
                            <p className="Card__Text-sc-1qqjegm-5 iOmyQf"> Évitez toute démarche fastidieuse, et tout risque d’erreur de visa. </p>
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
                          <span className="PrimaryButton__Label-sc-1vkvp7q-2 kVCvkJ"> Simuler mon visa </span>
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
                              {(isLeftArrow ? "Soyez sûr avant de vous engager : notre simulateur doté d’algorithmes puissants vous donne un indice de confiance sur vos chances d'obtenir votre visa." 
                                            : "Vous nous confiez votre projet, vous devez savoir où il en est. RDV à l'ambassade, décision d'une école ... Bénéficiez d’un espace en ligne sécurisé pour suivre l’avancée de votre dossier en toute autonomie.") }
                               
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
                      <h1 className="center-text">Votre voyage en 6 étapes</h1>
                      <div className="columns-6 w-row">
                        <div className="w-col w-col-6 w-col-stack">
                          {/* <img src="https://uploads-ssl.webflow.com/61d984790bdf2970837c8d96/62bafa7838ff242093f9d9b5_iollo-kit%402x.png" loading="lazy" width={750} sizes="(max-width: 991px) 100vw, (max-width: 1439px) 48vw, 621px" srcSet="https://uploads-ssl.webflow.com/61d984790bdf2970837c8d96/62bafa7838ff242093f9d9b5_iollo-kit%402x-p-500.png  500w,https://uploads-ssl.webflow.com/61d984790bdf2970837c8d96/62bafa7838ff242093f9d9b5_iollo-kit%402x-p-800.png  800w,https://uploads-ssl.webflow.com/61d984790bdf2970837c8d96/62bafa7838ff242093f9d9b5_iollo-kit%402x-p-1080.png  1080w,https://uploads-ssl.webflow.com/61d984790bdf2970837c8d96/62bafa7838ff242093f9d9b5_iollo-kit%402x.png  1500w" alt="" className="image-5" /> */}
                          <img src={PasseportVisa} loading="lazy" width={750} sizes="(max-width: 991px) 100vw, (max-width: 1439px) 48vw, 621px" alt="" className="image-5" />
                        </div>
                        <div className="column-19 w-col w-col-6 w-col-stack">
                          <div className="div-block-2">
                            <div className="work__item-num">1</div>
                            <h2 className="steps">Test de chances de voyager</h2>
                            <p className="paragraph-2"> Grâce à notre puissant simulateur, nous évaluons vos chances d'obtenir un visa en évaluant si vous devez postuler à ce moment-là 
                                                        ou compléter nos recommandations personnelles pour augmenter vos chances et postuler plus tard.<a href="/plans">
                                <br />
                                <button className="PrimaryButton__Container-sc-1vkvp7q-0 iroZSn">
                                  <span className="PrimaryButton__Overlay-sc-1vkvp7q-3 sSEIO">
                                    <span className="PrimaryButton__OverlayBackground-sc-1vkvp7q-4 kxNCsz">
                                      <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className="PrimaryButton__Arrow-sc-1vkvp7q-1 crhpBB">
                                        <path d="M20.7454 14.8908L17.1664 11.3187L18.7381 9.75L25 16L18.7381 22.25L17.1664 20.6813L20.7454 17.1092H7V14.8908H20.7454Z" />
                                      </svg>
                                    </span>
                                  </span>
                                  <span className="PrimaryButton__Label-sc-1vkvp7q-2 kVCvkJ"> Simuler mon visa </span>
                                </button>
                              </a>
                            </p>
                          </div>
                          <div className="div-block-3">
                            <div className="work__item-num">2</div>
                            <h2 className="steps">Contrat d'accompagnement</h2>
                            <p className="paragraph-2"> Si vous êtes éligible, vous pouvez signer l'accord pour nos services qui se fait à distance. 
                                                        Vous bénéficierez alors d'un accompagnement personnalisé du début à la fin de votre projet, et même bien plus. </p>
                          </div>
                          <div className="div-block-4">
                            <div className="work__item-num">3</div>
                            <h2 className="steps">Paiement</h2>
                            <p className="paragraph-2"> Nous définissons ensemble le coût approximatif de votre projet. De cela sera déduit nos commissions prévisionnelles correspondant à 10% du coût total. 
                                                        La moitié de cette somme est placée dans un compte bloqué au début et le reste vers la fin des démarches. 
                                                        Nous encaissons la totalité des fonds qu'en cas de succès. Les commissions vous sont totalement remboursées s'il y'a échec, ce qui est rare! </p>
                          </div>
                          <div className="div-block-7">
                            <div className="work__item-num">4</div>
                            <h2 className="steps">Dossier de candidature</h2>
                            <p className="paragraph-2"> Nos experts ré-examinent avec vous vos documents et préparent votre dossier de candidature pour une suite efficace. </p>
                          </div>
                          <div className="div-block-7">
                            <div className="work__item-num">5</div>
                            <h2 className="steps">Suivi des démarches</h2>
                            <p className="paragraph-2"> Accompagnement a chaque étape de votre demande de visa, incluant une assistance pour obtenir les documents gouvernementaux requis. </p>
                          </div>
                          <div className="div-block-7">
                            <div className="work__item-num">6</div>
                            <h2 className="steps">Decision finale</h2>
                            <p className="paragraph-2"> Une fois la réponse de l'ambassade tombée, nous faisons le bilan et vous donnons les derniers conseils pour la suite.</p>
                          </div>
                          <img src={PasseportVisa} loading="lazy" width={750} sizes="(max-width: 479px) 320px, (max-width: 991px) 96vw, 100vw" alt="" className="image-17" />
                        </div>
                      </div>
                    </div>
                    {/* <div className="styles__Grid-sc-10gqksz-1 iuHviD BlocOutils__Container-sc-10c9hjh-0 fGvXyl">
                      <div className="BlocOutils__Content-sc-10c9hjh-1 jQpxOw">
                        <p className="BlocOutils__Transparency-sc-10c9hjh-2 jXRqut"> Notre mission </p>
                        <h2 className="BlocOutils__Title-sc-10c9hjh-3 wniqW">  Notre mission - Créer un monde sans frontières ! </h2>
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
                        <p className="BlocOutils__Transparency-sc-10c9hjh-2 jXRqut"> Notre mission </p>
                        <h2 className="BlocOutils__Title-sc-10c9hjh-3 wniqW"> Notre mission - Créer un monde sans frontières ! </h2>
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
                        <p className="Content__Description-sc-hd6o8b-2 hhQjSJ"> Un conseiller expert, c’est bien. Un courtier expert et pédagogue qui vous comprend, c’est mieux. 
                                                                                Les conseillers Wendogo vous accompagnent dans votre recherche de crédit immobilier avec implication et réactivité. </p>
                        <button className="PrimaryButton__Container-sc-1vkvp7q-0 iroZSn">
                          <span className="PrimaryButton__Overlay-sc-1vkvp7q-3 sSEIO">
                            <span className="PrimaryButton__OverlayBackground-sc-1vkvp7q-4 kxNCsz">
                              <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className="PrimaryButton__Arrow-sc-1vkvp7q-1 crhpBB">
                                <path d="M20.7454 14.8908L17.1664 11.3187L18.7381 9.75L25 16L18.7381 22.25L17.1664 20.6813L20.7454 17.1092H7V14.8908H20.7454Z" />
                              </svg>
                            </span>
                          </span>
                          <span className="PrimaryButton__Label-sc-1vkvp7q-2 kVCvkJ"> Simuler mon visa </span>
                        </button>
                        {/* <h1>{countdown}</h1>
                        <h1>dd {positionLeft} - {browserWidth}</h1>
                        <h1> widthBanner {widthBanner}</h1> */}
                      </div>
                      <div className={"Images__Container-sc-2gr022-0 Banner__Images-sc-krte25-1 fCdAKA "+bannerAnimationClassList[0]} ref={myElementRef}>
                        <div className="Images__BaseImage-sc-2gr022-2 Images__Image1-sc-2gr022-3 ioovUp llLrAK">
                          {/* <picture>
                            <source type="image/webp" srcSet="https://res.cloudinary.com/pretto-fr/image/upload/q_auto,f_webp,w_320/v1677667256/website/page/home/BlocCourtier-1.jpg 320w, https://res.cloudinary.com/pretto-fr/image/upload/q_auto,f_webp,w_375/v1677667256/website/page/home/BlocCourtier-1.jpg 375w, https://res.cloudinary.com/pretto-fr/image/upload/q_auto,f_webp,w_425/v1677667256/website/page/home/BlocCourtier-1.jpg 425w, https://res.cloudinary.com/pretto-fr/image/upload/q_auto,f_webp,w_768/v1677667256/website/page/home/BlocCourtier-1.jpg 768w, https://res.cloudinary.com/pretto-fr/image/upload/q_auto,f_webp,w_1024/v1677667256/website/page/home/BlocCourtier-1.jpg 1024w, https://res.cloudinary.com/pretto-fr/image/upload/q_auto,f_webp,w_1240/v1677667256/website/page/home/BlocCourtier-1.jpg 1240w" />
                            <source srcSet="https://res.cloudinary.com/pretto-fr/image/upload/q_auto,w_320/v1677667256/website/page/home/BlocCourtier-1.jpg 320w, https://res.cloudinary.com/pretto-fr/image/upload/q_auto,w_375/v1677667256/website/page/home/BlocCourtier-1.jpg 375w, https://res.cloudinary.com/pretto-fr/image/upload/q_auto,w_425/v1677667256/website/page/home/BlocCourtier-1.jpg 425w, https://res.cloudinary.com/pretto-fr/image/upload/q_auto,w_768/v1677667256/website/page/home/BlocCourtier-1.jpg 768w, https://res.cloudinary.com/pretto-fr/image/upload/q_auto,w_1024/v1677667256/website/page/home/BlocCourtier-1.jpg 1024w, https://res.cloudinary.com/pretto-fr/image/upload/q_auto,w_1240/v1677667256/website/page/home/BlocCourtier-1.jpg 1240w" />
                            <img alt="" size="(min-width: 1024px) 50vw, 100vw" loading="lazy" src="https://res.cloudinary.com/pretto-fr/image/upload/q_auto/v1677667256/website/page/home/BlocCourtier-1.jpg" className={"Images__Image-sc-2gr022-1 "+((countdown<5 || countdown===15) ? bannerAnimationClassList[1] : "eXDVgd")} />
                          </picture> */}
                          <picture>
                            <source type="image/webp" srcSet={BlockCourtier1} />
                            <source srcSet={BlockCourtier1} />
                            <img className={"Images__Image-sc-2gr022-1 "+((countdown<5 || countdown===15) ? bannerAnimationClassList[1] : "eXDVgd")} src={BlockCourtier1} alt="" size="(min-width: 1024px) 50vw, 100vw" loading="lazy"  />
                            {/* <img alt="v1677658638/website/page/home/Re%CC%81sultat.png" className="Sliderstyles__Image-sc-jd0rgd-7 kCpYFv" loading="lazy" src="https://res.cloudinary.com/pretto-fr/image/upload/q_auto/v1677658638/website/page/home/Re%CC%81sultat.png" /> */}
                          </picture>
                        </div>
                        <div className="Images__BaseImage-sc-2gr022-2 Images__Image2-sc-2gr022-4 ioovUp kUUMLx">
                          <picture>
                            <source type="image/webp" srcSet={BlockCourtier2} />
                            <source srcSet={BlockCourtier2} />
                            <img  className={"Images__Image-sc-2gr022-1 "+((countdown >= 5 && countdown<10) ? bannerAnimationClassList[1] : "eXDVgd")} src={BlockCourtier2} alt="" size="(min-width: 1024px) 50vw, 100vw" loading="lazy"  />
                            {/* <img alt="v1677658638/website/page/home/Re%CC%81sultat.png" className="Sliderstyles__Image-sc-jd0rgd-7 kCpYFv" loading="lazy" src="https://res.cloudinary.com/pretto-fr/image/upload/q_auto/v1677658638/website/page/home/Re%CC%81sultat.png" /> */}
                          </picture>
                          {/* <picture>
                            <source type="image/webp" srcSet="https://res.cloudinary.com/pretto-fr/image/upload/q_auto,f_webp,w_320/v1677668879/website/page/home/BlocCourtier-2.jpg 320w, https://res.cloudinary.com/pretto-fr/image/upload/q_auto,f_webp,w_375/v1677668879/website/page/home/BlocCourtier-2.jpg 375w, https://res.cloudinary.com/pretto-fr/image/upload/q_auto,f_webp,w_425/v1677668879/website/page/home/BlocCourtier-2.jpg 425w, https://res.cloudinary.com/pretto-fr/image/upload/q_auto,f_webp,w_768/v1677668879/website/page/home/BlocCourtier-2.jpg 768w, https://res.cloudinary.com/pretto-fr/image/upload/q_auto,f_webp,w_1024/v1677668879/website/page/home/BlocCourtier-2.jpg 1024w, https://res.cloudinary.com/pretto-fr/image/upload/q_auto,f_webp,w_1240/v1677668879/website/page/home/BlocCourtier-2.jpg 1240w" />
                            <source srcSet="https://res.cloudinary.com/pretto-fr/image/upload/q_auto,w_320/v1677668879/website/page/home/BlocCourtier-2.jpg 320w, https://res.cloudinary.com/pretto-fr/image/upload/q_auto,w_375/v1677668879/website/page/home/BlocCourtier-2.jpg 375w, https://res.cloudinary.com/pretto-fr/image/upload/q_auto,w_425/v1677668879/website/page/home/BlocCourtier-2.jpg 425w, https://res.cloudinary.com/pretto-fr/image/upload/q_auto,w_768/v1677668879/website/page/home/BlocCourtier-2.jpg 768w, https://res.cloudinary.com/pretto-fr/image/upload/q_auto,w_1024/v1677668879/website/page/home/BlocCourtier-2.jpg 1024w, https://res.cloudinary.com/pretto-fr/image/upload/q_auto,w_1240/v1677668879/website/page/home/BlocCourtier-2.jpg 1240w" />
                            <img alt="" size="(min-width: 1024px) 50vw, 100vw" loading="lazy" src="https://res.cloudinary.com/pretto-fr/image/upload/q_auto/v1677668879/website/page/home/BlocCourtier-2.jpg" />
                          </picture> */}
                        </div>
                        <div className="Images__BaseImage-sc-2gr022-2 Images__Image3-sc-2gr022-5 ioovUp gaxwmL">
                          <picture>
                            <source type="image/webp" srcSet={BlockCourtier3} />
                            <source srcSet={BlockCourtier3} />
                            <img className={"Images__Image-sc-2gr022-1 "+((countdown >= 10 && countdown<15) ? bannerAnimationClassList[1] : "eXDVgd")} src={BlockCourtier3} alt="" size="(min-width: 1024px) 50vw, 100vw" loading="lazy"  />
                            {/* <img alt="v1677658638/website/page/home/Re%CC%81sultat.png" className="Sliderstyles__Image-sc-jd0rgd-7 kCpYFv" loading="lazy" src="https://res.cloudinary.com/pretto-fr/image/upload/q_auto/v1677658638/website/page/home/Re%CC%81sultat.png" /> */}
                          </picture>
                          {/* <picture>
                            <source type="image/webp" srcSet="https://res.cloudinary.com/pretto-fr/image/upload/q_auto,f_webp,w_320/v1677668879/website/page/home/BlocCourtier-3.jpg 320w, https://res.cloudinary.com/pretto-fr/image/upload/q_auto,f_webp,w_375/v1677668879/website/page/home/BlocCourtier-3.jpg 375w, https://res.cloudinary.com/pretto-fr/image/upload/q_auto,f_webp,w_425/v1677668879/website/page/home/BlocCourtier-3.jpg 425w, https://res.cloudinary.com/pretto-fr/image/upload/q_auto,f_webp,w_768/v1677668879/website/page/home/BlocCourtier-3.jpg 768w, https://res.cloudinary.com/pretto-fr/image/upload/q_auto,f_webp,w_1024/v1677668879/website/page/home/BlocCourtier-3.jpg 1024w, https://res.cloudinary.com/pretto-fr/image/upload/q_auto,f_webp,w_1240/v1677668879/website/page/home/BlocCourtier-3.jpg 1240w" />
                            <source srcSet="https://res.cloudinary.com/pretto-fr/image/upload/q_auto,w_320/v1677668879/website/page/home/BlocCourtier-3.jpg 320w, https://res.cloudinary.com/pretto-fr/image/upload/q_auto,w_375/v1677668879/website/page/home/BlocCourtier-3.jpg 375w, https://res.cloudinary.com/pretto-fr/image/upload/q_auto,w_425/v1677668879/website/page/home/BlocCourtier-3.jpg 425w, https://res.cloudinary.com/pretto-fr/image/upload/q_auto,w_768/v1677668879/website/page/home/BlocCourtier-3.jpg 768w, https://res.cloudinary.com/pretto-fr/image/upload/q_auto,w_1024/v1677668879/website/page/home/BlocCourtier-3.jpg 1024w, https://res.cloudinary.com/pretto-fr/image/upload/q_auto,w_1240/v1677668879/website/page/home/BlocCourtier-3.jpg 1240w" />
                            <img alt="" size="(min-width: 1024px) 50vw, 100vw" loading="lazy" src="https://res.cloudinary.com/pretto-fr/image/upload/q_auto/v1677668879/website/page/home/BlocCourtier-3.jpg" className={"Images__Image-sc-2gr022-1 "+((countdown<15 && countdown>=10) ? bannerAnimationClassList[1] : "eXDVgd")} />
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
                            {((countdown<5 || countdown===15)) ?   <><div className="Bloc__CheckContainer-sc-abnssq-1 hlJPnb">
                              <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" fill="currentColor" className="Bloc__Check-sc-abnssq-2 ycIsS">
                                <path d="M5.8,11.6l8-8.29,1.44,1.38L5.88,14.4.32,9.23,1.68,7.77Z" fillRule="evenodd" />
                              </svg>
                            </div>
                            <p className="Bloc__Description-sc-abnssq-3 iYfojT"> Des conseillers régulièrement formés aux dernières réglementations en vigueur et spécialisés par type de projet. </p>
                            </> : null}
                          </div>
                          <div className={"Bloc__Container-sc-abnssq-0 Rtb__Bloc-sc-cimcdw-5 kFnMN "+((countdown<10 && countdown>=5) ? 'hCSAAW' : ((countdown<15 && countdown>=10) ? 'KNmFf' : 'cSHAph'))}>
                            {((countdown<10 && countdown>=5)) ?   <><div className={"Bloc__CheckContainer-sc-abnssq-1 "+((countdown<10 && countdown>=5) || (countdown<15 && countdown>=10)? 'hlJPnb' : 'kPeKBa')}>
                              <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" fill="currentColor" className="Bloc__Check-sc-abnssq-2 ycIsS">
                                <path d="M5.8,11.6l8-8.29,1.44,1.38L5.88,14.4.32,9.23,1.68,7.77Z" fillRule="evenodd" />
                              </svg>
                            </div>
                            <p className="Bloc__Description-sc-abnssq-3 iYfojT"> Derrière votre expert attitré, des outils puissants et toute une équipe qui œuvre pour votre projet. </p>
                            </> : null}
                          </div>
                          <div className={"Bloc__Container-sc-abnssq-0 Rtb__Bloc-sc-cimcdw-5 kFnMN "+((countdown<15 && countdown>=10)? 'hCSAAW' : 'cSHAph')}>
                            {((countdown<15 && countdown>=10)) ?   <><div className={"Bloc__CheckContainer-sc-abnssq-1 "+((countdown<15 && countdown>=10)? 'hlJPnb' : 'kPeKBa')}>
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
                          <div className="Banner__Title-sc-yqcec5-4 zDQmH"> Notre mission - Créer un monde sans frontières ! <br/>
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
                              <span className="PrimaryButton__Label-sc-1vkvp7q-2 kVCvkJ"> Simuler mon visa </span>
                            </button>
                            <p className="Banner__Caption-sc-yqcec5-7 elCGHz"> En 3 minutes, sans inscription&nbsp;! </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </main>
                <div className="Footer__Container-sc-1adny8q-0 fThLJG styles__Footer-sc-kz84w6-4 icxpqI">
                  <img src={ParisCity} alt="" className="kldsmk" />
                  <hr className="Divider-sc-1qii385-0 Footer__Divider-sc-1adny8q-2 iyJAir jUFmLt" />
                  <div className="Footer__Legal-sc-1adny8q-3 AgRYh">
                    {/* <svg width={339} height={86} viewBox="0 0 339 86" fill="none" xmlns="http://www.w3.org/2000/svg" className="LogoPretto__Container-sc-1i91pxy-0 dYtNBD LegalSocial__Logo-sc-v4d14j-1 hsKfvw">
                      <path fillRule="evenodd" clipRule="evenodd" d="M0 82.4447V0.902588H35.3965C54.0324 0.902588 65.1671 11.3866 65.1671 30.0248C65.1671 48.663 54.0324 58.914 35.3965 58.914H22.5038V82.4447H0ZM22.5038 38.9944H33.0524C38.7955 38.9944 42.6633 35.8492 42.6633 29.6753C42.6633 23.7344 39.616 20.8222 33.404 20.8222H22.5038V38.9944Z" fill="black" />
                      <path d="M70.3269 82.4447V20.7057H91.0726V26.2971H91.307C94.5888 21.6376 99.9803 19.4243 105.723 19.4243C107.599 19.4243 109.943 19.6573 112.873 20.1232L110.295 40.2758C108.068 40.0428 106.192 39.9263 104.434 39.9263C96.4641 39.9263 92.2447 44.5859 92.2447 53.905V82.4447H70.3269Z" fill="black" />
                      <path fillRule="evenodd" clipRule="evenodd" d="M146.895 84.891C126.853 84.891 113.608 71.8443 113.608 51.6917C113.257 32.471 127.087 17.91 145.371 18.2594C164.007 18.2594 177.135 31.8886 177.135 51.5752V57.6326H134.94C135.409 64.389 139.394 67.7672 146.895 67.7672C152.052 67.7672 156.389 65.0879 160.96 59.8459L174.204 72.6597C166.234 80.9304 157.327 84.891 146.895 84.891ZM135.174 44.1199H156.858C156.272 38.0625 152.521 34.6843 145.958 34.6843C139.863 34.6843 135.995 38.0625 135.174 44.1199Z" fill="black" />
                      <path fillRule="evenodd" clipRule="evenodd" d="M305.669 84.891C286.565 84.891 272.969 71.1453 272.969 51.6917C272.969 32.1216 286.565 18.2594 305.669 18.2594C324.774 18.2594 338.605 32.1216 338.605 51.6917C338.605 71.1453 324.774 84.891 305.669 84.891ZM305.787 65.3209C312.702 65.3209 316.687 60.1954 316.687 51.6917C316.687 42.955 312.702 37.8295 305.787 37.8295C298.754 37.8295 294.886 42.8386 294.886 51.6917C294.886 60.1954 298.754 65.3209 305.787 65.3209Z" fill="black" />
                      <path d="M215.621 62.6417H222.653V82.4447H212.456C195.93 82.4447 188.194 74.7565 188.194 59.7294V37.946H176.825V20.7057H188.194V4.39726H210.112V20.7057H234.409V4.39726H256.326V20.7057H271.212V37.946H256.326V57.2832C256.326 61.0108 257.967 62.6417 261.835 62.6417H268.867V82.4447H258.67C242.144 82.4447 234.409 74.7565 234.409 59.7294V37.946H210.112V57.2832C210.112 61.0108 211.753 62.6417 215.621 62.6417Z" fill="black" />
                    </svg> */}
                    <WendogoLogo className="dssdsd"/>
                    <div data-nosnippet="true">
                      <p className="LegalSocial__Disclaimer-sc-v4d14j-4 kiQXRg"> Wendogo est une société par actions simplifiée, immatriculée au registre de l’ORIAS en tant que Courtier en opérations de banque et en services de paiement sous le numéro 17000916, dont le siège social est situé 42 Rue de Paradis, 75010 Paris. Un crédit vous engage et doit être remboursé. Vérifiez vos capacités de remboursement avant de vous engager. </p>
                    </div>
                    <ul className="LegalSocial__SocialLinks-sc-v4d14j-2 bwSQCq">
                      <li>
                        <a aria-label="Pretto sur Instagram" href="https://www.instagram.com/prettofr/" rel="noreferrer noopener" target="_blank" className="LegalSocial__SocialLink-sc-v4d14j-3 GeNZR">
                          <svg height={46} viewBox="0 0 46 46" width={46} xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="LegalSocial__Picto-sc-v4d14j-0 llOyxT">
                            <path d="M23,16.44c2.14,0,2.39,0,3.23,0a4.09,4.09,0,0,1,1.49.28,2.56,2.56,0,0,1,1.51,1.51,4.32,4.32,0,0,1,.28,1.49c0,.84,0,1.09,0,3.23s0,2.39,0,3.23a4,4,0,0,1-.28,1.49,2.42,2.42,0,0,1-.59.92,2.57,2.57,0,0,1-.92.6,4.39,4.39,0,0,1-1.49.27c-.84,0-1.09,0-3.23,0s-2.39,0-3.23,0a4.28,4.28,0,0,1-1.49-.27,2.67,2.67,0,0,1-1.52-1.52,4.28,4.28,0,0,1-.27-1.49c0-.84,0-1.09,0-3.23s0-2.39,0-3.23a4.39,4.39,0,0,1,.27-1.49,2.57,2.57,0,0,1,.6-.92,2.42,2.42,0,0,1,.92-.59,4.21,4.21,0,0,1,1.49-.28C20.61,16.45,20.86,16.44,23,16.44ZM23,15c-2.17,0-2.45,0-3.3.05a5.85,5.85,0,0,0-1.94.37,3.94,3.94,0,0,0-1.42.92,4.17,4.17,0,0,0-.92,1.42,5.85,5.85,0,0,0-.37,1.94c0,.85-.05,1.13-.05,3.3s0,2.44.05,3.3a5.85,5.85,0,0,0,.37,1.94,3.94,3.94,0,0,0,.92,1.42,4.17,4.17,0,0,0,1.42.92A5.85,5.85,0,0,0,19.7,31c.86,0,1.13.05,3.3.05s2.45,0,3.3-.05a5.85,5.85,0,0,0,1.94-.37,3.86,3.86,0,0,0,1.42-.92,4,4,0,0,0,.92-1.42A5.82,5.82,0,0,0,31,26.3c0-.86,0-1.13,0-3.3s0-2.45,0-3.3a5.82,5.82,0,0,0-.38-1.94,4,4,0,0,0-2.34-2.34A5.77,5.77,0,0,0,26.3,15C25.44,15,25.17,15,23,15Z" />
                            <path d="M23,18.89A4.11,4.11,0,1,0,27.11,23,4.11,4.11,0,0,0,23,18.89Zm0,6.78A2.67,2.67,0,1,1,25.67,23,2.68,2.68,0,0,1,23,25.67Z" />
                            <path d="M27.27,19.69a1,1,0,1,0-1-1A1,1,0,0,0,27.27,19.69Z" />
                          </svg>
                        </a>
                      </li>
                      <li>
                        <a aria-label="Pretto sur Facebook" href="https://www.facebook.com/prettofr/" rel="noreferrer noopener" target="_blank" className="LegalSocial__SocialLink-sc-v4d14j-3 GeNZR">
                          <svg height={46} viewBox="0 0 46 46" width={46} xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="LegalSocial__Picto-sc-v4d14j-0 llOyxT">
                            <path d="M23.05,15a8,8,0,0,1,1.26,16V25.38h1.87l.36-2.33H24.31V21.54a1.17,1.17,0,0,1,1.3-1.26h1v-2a12.14,12.14,0,0,0-1.8-.16h0a2.84,2.84,0,0,0-3,3.14v1.77h-2v2.33h2V31a8,8,0,0,1,1.26-16Z" />
                          </svg>
                        </a>
                      </li>
                      <li>
                        <a aria-label="Pretto sur Twitter" href="https://twitter.com/pretto?lang=fr" rel="noreferrer noopener" target="_blank" className="LegalSocial__SocialLink-sc-v4d14j-3 GeNZR">
                          <svg height={46} viewBox="0 0 46 46" width={46} xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="LegalSocial__Picto-sc-v4d14j-0 llOyxT">
                            <path d="M32,16.78a8,8,0,0,1-2.24.59,3.86,3.86,0,0,0,1.72-2.09A8.12,8.12,0,0,1,29,16.2,3.93,3.93,0,0,0,26.15,15a3.82,3.82,0,0,0-3.79,4.65,11.22,11.22,0,0,1-8-4,3.73,3.73,0,0,0,1.21,5.06,4.05,4.05,0,0,1-1.77-.47A3.83,3.83,0,0,0,16.89,24a4.15,4.15,0,0,1-1.76.06,3.89,3.89,0,0,0,3.64,2.63A8,8,0,0,1,13,28.3,11.32,11.32,0,0,0,19,30,10.84,10.84,0,0,0,30.05,18.74,7.89,7.89,0,0,0,32,16.78Z" />
                          </svg>
                        </a>
                      </li>
                      <li>
                        <a aria-label="Pretto sur YouTube" href="https://www.youtube.com/channel/UChCPFwdusUcxzj-f0t2m4UA" rel="noreferrer noopener" target="_blank" className="LegalSocial__SocialLink-sc-v4d14j-3 GeNZR">
                          <svg height={46} viewBox="0 0 46 46" width={46} xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="LegalSocial__Picto-sc-v4d14j-0 llOyxT">
                            <path d="M31.63,18.88A2.19,2.19,0,0,0,30,17.37,54.83,54.83,0,0,0,23,17a57.93,57.93,0,0,0-7,.35,2.25,2.25,0,0,0-1.59,1.53A21.58,21.58,0,0,0,14,23a21.47,21.47,0,0,0,.37,4.12A2.19,2.19,0,0,0,16,28.63,54.91,54.91,0,0,0,23,29a57.93,57.93,0,0,0,7-.35,2.23,2.23,0,0,0,1.59-1.51A21.67,21.67,0,0,0,32,23,20.83,20.83,0,0,0,31.63,18.88ZM21.21,25.57V20.43L25.89,23Z" />
                          </svg>
                        </a>
                      </li>
                    </ul>
                  </div>
                  <ul className="Menus__Container-sc-1cdqyiq-0 kLPxq Footer__FooterMenus-sc-1adny8q-4 mlIQG">
                    <div className="Menus__MenuContainer-sc-1cdqyiq-1 dawptZ">
                      <div className="Menus__MenuTitle-sc-1cdqyiq-2 ekhzHX"> À propos de Pretto </div>
                      <ul className="Menus__MenuItems-sc-1cdqyiq-3 jdtBKN">
                        <li className="Menus__MenuItem-sc-1cdqyiq-4 iXcfDl">
                          <span tabIndex={0} className="Bridge__Component-sc-18zyewx-0 fvmjWl Menus__MenuItemLink-sc-1cdqyiq-5 dDJQzT"> Contact </span>
                        </li>
                        <li className="Menus__MenuItem-sc-1cdqyiq-4 iXcfDl">
                          <span tabIndex={0} className="Bridge__Component-sc-18zyewx-0 fvmjWl Menus__MenuItemLink-sc-1cdqyiq-5 dDJQzT"> Parrainer </span>
                        </li>
                        <li className="Menus__MenuItem-sc-1cdqyiq-4 iXcfDl">
                          <a href="https://partner.pretto.fr/devenir-partenaire/" rel="noreferrer noopener" target="_blank" className="Menus__MenuItemLink-sc-1cdqyiq-5 dDJQzT"> Devenir partenaire </a>
                        </li>
                        {/* <li className="Menus__MenuItem-sc-1cdqyiq-4 iXcfDl">
                          <a href="/presse/" className="Menus__MenuItemLink-sc-1cdqyiq-5 dDJQzT"> Espace presse </a>
                        </li> */}
                        <li className="Menus__MenuItem-sc-1cdqyiq-4 iXcfDl">
                          <button type="button" className="Menus__MenuItemCookies-sc-1cdqyiq-6 jUmchj"> Cookies </button>
                        </li>
                        <li className="Menus__MenuItem-sc-1cdqyiq-4 iXcfDl">
                          <a href="/contenu-partenaire/" className="Menus__MenuItemLink-sc-1cdqyiq-5 dDJQzT"> Contenu Partenaire </a>
                        </li>
                        <li className="Menus__MenuItem-sc-1cdqyiq-4 iXcfDl">
                          <a href="https://faq.pretto.fr/fr/" rel="noreferrer noopener" target="_blank" className="Menus__MenuItemLink-sc-1cdqyiq-5 dDJQzT"> FAQ </a>
                        </li>
                      </ul>
                    </div>
                    <div className="Menus__MenuContainer-sc-1cdqyiq-1 dawptZ">
                      <div className="Menus__MenuTitle-sc-1cdqyiq-2 ekhzHX">Fondamentaux</div>
                      <ul className="Menus__MenuItems-sc-1cdqyiq-3 jdtBKN">
                        <li className="Menus__MenuItem-sc-1cdqyiq-4 iXcfDl">
                          <a href="/privacy/" className="Menus__MenuItemLink-sc-1cdqyiq-5 dDJQzT"> Respect de la vie privée </a>
                        </li>
                        <li className="Menus__MenuItem-sc-1cdqyiq-4 iXcfDl">
                          <a href="/mentions-legales/" className="Menus__MenuItemLink-sc-1cdqyiq-5 dDJQzT"> Mentions légales </a>
                        </li>
                        <li className="Menus__MenuItem-sc-1cdqyiq-4 iXcfDl">
                          <a href="/cgu/" className="Menus__MenuItemLink-sc-1cdqyiq-5 dDJQzT"> CGU / CGV </a>
                        </li>
                      </ul>
                    </div>
                    <div className="Menus__MenuContainer-sc-1cdqyiq-1 dawptZ">
                      <div className="Menus__MenuTitle-sc-1cdqyiq-2 ekhzHX"> Les ressources Pretto </div>
                      <ul className="Menus__MenuItems-sc-1cdqyiq-3 jdtBKN">
                        {/* <li className="Menus__MenuItem-sc-1cdqyiq-4 iXcfDl">
                          <a href="/guide/" className="Menus__MenuItemLink-sc-1cdqyiq-5 dDJQzT"> Guide de l'acheteur en immobilier </a>
                        </li>
                        <li className="Menus__MenuItem-sc-1cdqyiq-4 iXcfDl">
                          <a href="/notre-service/app-mobile/" className="Menus__MenuItemLink-sc-1cdqyiq-5 dDJQzT"> Pretto Search : l'appli de recherche immobilière </a>
                        </li>
                        <li className="Menus__MenuItem-sc-1cdqyiq-4 iXcfDl">
                          <span tabIndex={0} className="Bridge__Component-sc-18zyewx-0 fvmjWl Menus__MenuItemLink-sc-1cdqyiq-5 dDJQzT"> Notre newsletter </span>
                        </li>
                        <li className="Menus__MenuItem-sc-1cdqyiq-4 iXcfDl">
                          <a href="/ressources/ebook/" className="Menus__MenuItemLink-sc-1cdqyiq-5 dDJQzT"> Notre Ebook gratuit </a>
                        </li>
                        <li className="Menus__MenuItem-sc-1cdqyiq-4 iXcfDl">
                          <a href="/podcast-pret-immobilier/" className="Menus__MenuItemLink-sc-1cdqyiq-5 dDJQzT"> Notre Podcast </a>
                        </li>
                        <li className="Menus__MenuItem-sc-1cdqyiq-4 iXcfDl">
                          <a href="/actualites/" className="Menus__MenuItemLink-sc-1cdqyiq-5 dDJQzT"> Actualités </a>
                        </li>
                        <li className="Menus__MenuItem-sc-1cdqyiq-4 iXcfDl">
                          <a href="/contenu-partenaire/" className="Menus__MenuItemLink-sc-1cdqyiq-5 dDJQzT"> Contenu Partenaire </a>
                        </li> */}
 
                      </ul>
                    </div>
                  </ul>
                </div>
                </section>
            </div>           
          </div>

}

export default HomePage
