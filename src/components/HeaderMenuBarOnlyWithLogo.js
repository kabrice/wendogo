
import {ReactComponent as WendogoLogoIcon} from '../assets/wendogo_logo_paperplane_blue.svg'
import  {ReactComponent as DropDownIcon} from '../assets/dropdown_icon.svg'
import ButtonLarge from './ButtonLarge';


import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';

function HeaderMenuBarOnlyWithLogo(){

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
            <nav className={"dWKCRV kebTzo"} style={{top : 0, color: 'inherit', backgroundColor : 'white', borderBottom: '1px solid rgb(225, 219, 209)', boxShadow: 'none'}}>
              <div className={"Navbarstyles__Navigation2 jigKlE"}>
                <div className="Navbarstyles__Navigation3">
                    <Link to="/" className="Logostyles__LogoLink-sc-10zpnfr-0">
                      <WendogoLogoIcon/>
                  </Link>
                  <div className={"Navbarstyles__Overlay "} style={{ background: 'transparent', height: 'auto', overflow: 'visible', position: 'static', left: 'auto', top: 'auto', transition: 'none 0s ease 0s', width: 'auto', zIndex: 0, }}>
                    <ul role="menu" className={"Navbarstyles__Menu "} style={{ alignItems: 'center', background: 'transparent', flexDirection: 'row', gap: '16px', height: '80px', left: 'auto', overflowY: 'visible', position: 'static', top: 'auto', transform: 'translateX(0px)', width: 'auto', }}> 
                      <li className="Navbarstyles__MenuButtonItems-sc-mi7mu3-6 eonXWL">
                        {/* <Link to='/waitinglist' className="ButtonLogin__Button"> Se connecter </Link> */}
                        <Link to='/waitinglist' className="ButtonNavbar__Button">
                          <span className="ButtonNavbar__Label"> Être contacté</span>
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

export default HeaderMenuBarOnlyWithLogo;
