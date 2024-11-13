
import WendogoLogoIcon from '../assets/wendogo_logo_paperplane_blue.svg'
import  DropDownIcon from '../assets/dropdown_icon.svg'
import ButtonLarge from './ButtonLarge';


import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';

function HeaderMenuBarOnlyWithLogo(props){


   const {isMobile, displayButton} = props
 
    // const goBackToSimulationEngine = () => {
    //     window.location.href = '/simulation/engine?country=FR#form/COORDONNEES';
    // }
    return (
            <nav className={"dWKCRV kebTzo"} style={{top : 0, color: 'inherit', backgroundColor : 'white', borderBottom: '1px solid rgb(225, 219, 209)', boxShadow: 'none'}}>
              <div className={"Navbarstyles__Navigation2 jigKlE"}>
                <div className="Navbarstyles__Navigation3">
                    <Link href="/" className="Logostyles__LogoLink-sc-10zpnfr-0">
                      <WendogoLogoIcon/>
                  </Link>
                  {displayButton && <div className={"Navbarstyles__Overlay "} style={{ background: 'transparent', height: 'auto', overflow: 'visible', position: 'static', left: 'auto', top: 'auto', transition: 'none 0s ease 0s', width: 'auto', zIndex: 0, }}>
                    <ul role="menu" className={"Navbarstyles__Menu "} style={{ alignItems: 'center', background: 'transparent', flexDirection: 'row', gap: '16px', height: '80px', left: 'auto', overflowY: 'visible', position: 'static', top: 'auto', transform: 'translateX(0px)', width: 'auto', }}> 
                      <li className="Navbarstyles__MenuButtonItems-sc-mi7mu3-6 eonXWL" style={isMobile ? {padding:0}: {}}>
                      <div className="CommonNavBar">
                        <Link type="button" className="PpsButton colored color-2 tiny hasBeforeIcon" href="/simulation/engine?country=FR#form/COORDONNEES">
                          <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                            <path d="M31.832 11.327l-1.507 1.494-3.056-3.148 1.507-1.494a.89.89 0 011.267.012l1.801 1.854a.917.917 0 01-.012 1.282zm-18.12 17.97l-3.056-3.147 12.606-12.503c.004.003.004.008.008.012l3.046 3.137-12.604 12.5zm-4.838 1.815l.824-3.21 2.287 2.358-3.111.852zM25.913 11.02l3.056 3.147-1.297 1.286-3.046-3.139-.011-.008 1.298-1.286zM33.2 8.7l-1.8-1.854A2.797 2.797 0 0029.404 6c-.739 0-1.433.287-1.959.808L8.643 25.455a1.92 1.92 0 00-.509.89l-1.1 4.285c-.083.325-.078.66.005.974l-.755.75a.97.97 0 00-.013 1.358.948.948 0 001.345.013l.77-.764c.16.043.321.073.488.073.166 0 .333-.022.498-.067l4.155-1.138c.314-.087.601-.253.834-.484l18.802-18.647a2.852 2.852 0 00.038-3.998z" fill="#ACBAC8" fillRule="evenodd" /> 
                            </svg>
                          <div className="PpsButton-children ">Modifier mes infos</div>
                        </Link>
                      </div>
                        {/* <button  className="ButtonNavbar__Button" style={isMobile ? {padding:'8px 14px', fontSize: '12px'}: {}}>
                          <span className="ButtonNavbar__Label"> Être contacté</span>
                          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="ButtonNavbar__Arrow">
                            <path d="M15.3,11.17l-2.51-2.49,1.18-1.18,4.53,4.5-4.53,4.5-1.18-1.18,2.51-2.49H5.5v-1.66H15.3Z" />
                          </svg>
                        </button> */}
                      </li>
                    </ul>
                  </div>}
                  
                </div>
              </div>
            </nav>
    )
};

export default HeaderMenuBarOnlyWithLogo;
