'use client';


import WendogoLogoIcon from '../assets/wendogo_logo_paperplane_blue.svg'
import  DropDownIcon from '../assets/dropdown_icon.svg'


import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';

function HeaderMenuBar(){

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
 
      if(browserWidth>1024){
        setDisplaySubMenu1(false)
        setDisplaySubMenu2(false)
        setDisplaySubMenu3(false)        
      }
    }, [])
 

    return (
<nav className={"dWKCRV kebTzo"} style={{top : 0, color: 'inherit', backgroundColor : 'white'}}>
              <div className={"Navbarstyles__Navigation2 jigKlE"}>
                <div className="Navbarstyles__Navigation3">
                    <Link href="/" className="Logostyles__LogoLink-sc-10zpnfr-0 jJHAoQ">
                      <WendogoLogoIcon/>
                  </Link>
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
                          <DropDownIcon style={displaySubMenu1 ? {transform : "rotate(180deg)"} : {}}/>
                        </span>
                        <ul className={"Navbarstyles__SubMenu "+(displaySubMenu1 ? 'lowcCT subMenu1' : '')} style={{backgroundColor : 'white'}}>
                          <li className="Navbarstyles__SubMenuFirstItem">
                            <a tabIndex={0} className="LinkLabel__Link" href="/simulation/home">
                              <span className="LinkLabel__Label">Visa pour la France</span>
                            </a>
                          </li>
                          <li>
                            <a tabIndex={0} className="LinkLabel__Link" href="/simulation/home">
                              <span className="LinkLabel__Label">Visa pour le Canada</span>
                            </a>
                          </li>
                        </ul>
                      </li>
                      <li aria-expanded="false" aria-controls="7d517232" role="menuitem" tabIndex={0} className="Navbarstyles__MenuItem Navbarstyles__MenuItem-common">
                        <span className="Navbarstyles__MenuItemLabel" onClick={() => toggleNavSubMenu2()}>
                          <span>Ressources</span>
                          <DropDownIcon style={displaySubMenu2 ? {transform : "rotate(180deg)"} : {}}/>
                        </span>
                        <ul id="7d517232" className={"Navbarstyles__SubMenu "+(displaySubMenu2 ? 'lowcCT subMenu2' : '')} style={{backgroundColor : 'white'}}>
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
                            <DropDownIcon style={displaySubMenu3 ? {transform : "rotate(180deg)"} : {}}/>
                          </span>
                          <ul id="e75b56b9" className={"Navbarstyles__SubMenu "+(displaySubMenu3 ? 'lowcCT subMenu3' : '')} style={{backgroundColor : 'white'}}>
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
                        <Link href='/simulation/home' className="ButtonNavbar__Button">
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
    )
};

export default HeaderMenuBar;
