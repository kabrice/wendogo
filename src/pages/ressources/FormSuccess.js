import { useState, useEffect } from 'react'; 
import helper from '../../utils/Helper';
import SELabel from '../../components/SimulationEngine/SELabel';
import SETextArea from '../../components/SimulationEngine/SETextArea';
import SETextInput from '../../components/SimulationEngine/SETextInput';
import ButtonLarge from '../../components/ButtonLarge';
import { parsePhoneNumber } from 'libphonenumber-js';
import useGeoLocation from "react-ipgeolocation"
import SESmallAlertMessage from '../../components/SimulationEngine/SESmallAlertMessage';
import Firstname from '../SimulationEngineStep/Firstname'
import Lastname from '../SimulationEngineStep/Lastname'
import PhoneNumber from '../SimulationEngineStep/PhoneNumber'
import Email from '../SimulationEngineStep/Email'
import SETextInputPhone from '../../components/SimulationEngine/SETextInputPhone';
import { set } from 'lodash';
import {ReactComponent as Hostess}  from '../../assets/simulation_icons/hostess.svg'; 

const FormSuccess = (props) => {

    let user = helper.getLocalStorageWithExpiration('wendogouser')   
    const [deviceType, setDeviceType] = useState('lg');
    const [browserWidth, setBrowserWidth] = useState(window.innerWidth); 

    //console.log('currentSimulationStep 🥳', currentSimulationStep)
    useEffect(() => {
        //helper.addOutsideClick(handleOutsideClick)
         
        const handleResize = () => {
            const browserWidth = window.innerWidth;
            //console.log('browserWidth', browserWidth)
            if (browserWidth>1200) {
                setDeviceType('lg'); 
            }
            if (browserWidth>991 && browserWidth <= 1200) {
                setDeviceType('md'); 
            } 
            if (browserWidth>765 && browserWidth <= 990) {
                setDeviceType('sm');
            }  
            if (browserWidth <= 764) {
                setDeviceType('xs');
            } 
        };
        
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };


    }, [browserWidth]);

   

    return ( 

<div className="theme-wrapper theme-daisy">
	<div className="funnel AutoTunnel">
		<div className="app-container">
			<div className={ "app-"+deviceType}>
				<div className="FunnelView DaisyFormView">
					<div id="scr_vehicule" className="ScreenView DaisyScreenView SCR_VEHICULE">
						<div id="blk_ma_demande" className="BlockView DaisyBlockView block-doing BLK_MA_DEMANDE block-doing block-active hasFunnelSideBar">
							<div className="BlockView-container DaisyBlockView-container" style={{margin: 'auto' }}>
								 
                                <div className=" inset-0 bg-black bg-opacity-50 z-[1001] flex items-center justify-center">
            
            <div className=" relative w-full max-w-2xl mx-4">
                <div style={{padding:10}}  > 
                    <div >
                        <div className="Stack-child  " style={{ paddingTop: 0 }}> 
                            <div className="Box   " style={{   borderWidth: "initial", borderStyle: "none", borderColor: "initial", borderRadius: '15px 15px 0 0' }}>
                                <div className="Stack  stackColumn " style={{ flexDirection: "column", padding: 0, alignItems: "stretch" }}>
                                    <div className="Stack-child  " style={{ paddingTop: 0 }}>
                                        <div className="Stack  stackRow " style={{ flexDirection: "column", padding: 0, alignItems: "center" }}>
                                            
                                            <div className="Stack-child  " style={{ paddingLeft: 0 }}>
                                                <div className="Box   " style={{ padding: "30px 30px 0px", maxWidth: 500, marginLeft: "auto", marginRight: "auto", borderWidth: "initial", borderStyle: "none", borderColor: "initial" }}>
                                                    <div className="Heading s isWeak  " style={{lineHeight: '2rem'}}> 

                                                    <h1 size="large" className="styles__HeadingBridge-sc-6txi54-0 hzNvHf" style={{color: 'rgb(42, 55, 117)', textAlign: 'center' }}>À bientôt {user.firstname}!</h1>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="stack-child" style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                        <div className="box"> 
                                            <Hostess/>
                                        </div>
                                    </div>
                                </div>
                                <div className="Box   " style={{ padding: " 30px", maxWidth: 500, marginLeft: "auto", marginRight: "auto", borderWidth: "initial", borderStyle: "none", borderColor: "initial" }}>
                                    <div className="Heading s isWeak "  >
                                        <p className="Paragraph  " style={{  fontSize: "1.275rem", margin: "8px 0px 0px", color: 'rgb(42, 55, 117)', textAlign:'center', padding: 0, fontWeight: 400, lineHeight: "initial" }}> Nos équipes s'occupent de vous. </p>
                                    </div>

                                <div style={{  padding: " 10px",  marginLeft: "auto", marginRight: "auto", borderWidth: "initial", borderStyle: "none", borderColor: "initial"  }}>
                                    <span>En attendant, un like et un abonnement à nos réseaux sociaux nous feraient grand plaisir 
                                        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="24px"viewBox="0 0 84 84" version="1.1" style={{marginLeft: 5}}>
                                            <title>noun-pleading-face-6024878</title>
                                            <g id="Page-1" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                                                <g id="noun-pleading-face-6024878" fillRule="nonzero">
                                                    <path d="M42,0 C18.84,0 0,18.84 0,42 C0,65.16 18.84,84 42,84 C65.16,84 84,65.16 84,42 C84,18.84 65.16,0 42,0 Z M42,82 C19.94,82 2,64.06 2,42 C2,19.94 19.94,2 42,2 C64.06,2 82,19.94 82,42 C82,64.06 64.06,82 42,82 Z" id="Shape" fill="#4E6174" />
                                                    <g id="Group-6" transform="translate(14.000000, 29.000000)">
                                                        <path d="M12.5360229,1 C19.4380056,1.02161378 25.0215512,6.63399167 25,13.5359917 C24.9783237,20.4379917 19.3659599,26.0215512 12.4639771,26 C5.56199437,25.9783237 -0.0215511864,20.3659458 0,13.4639458 C0.0432899878,6.56915033 5.64124469,1.00720459 12.5360229,1" id="Path" fill="#FFFFFF" />
                                                        <circle id="Oval" fill="#0154C0" cx={12} cy={11} r={11} />
                                                        <g id="Group" transform="translate(0.989771, 0.009821)" fill="#FFFFFF">
                                                            <ellipse id="Oval" transform="translate(15.000158, 15.878649) rotate(-40.010253) translate(-15.000158, -15.878649) " cx="15.0001579" cy="15.8786493" rx="1.86725728" ry="1.73486499" />
                                                            <ellipse id="Oval" transform="translate(8.331808, 8.093601) rotate(-36.661346) translate(-8.331808, -8.093601) " cx="8.33180806" cy="8.09360098" rx="6.45003342" ry="5.28858329" />
                                                            <path d="M41.7787832,0.52637769 C48.5520005,0.548392449 54.0313778,6.26489147 54.0102287,13.2949378 C53.9889568,20.3249841 48.4812989,26.0121301 41.7080815,25.990179 C34.9348642,25.9681006 29.4554869,20.2516015 29.476636,13.2215552 C29.5191184,6.1988472 35.012636,0.533715943 41.7787832,0.52637769" id="Path" /> </g>
                                                        <circle id="Oval" fill="#0154C0" cx={42} cy={11} r={11} />
                                                        <ellipse id="Oval" fill="#FFFFFF" transform="translate(46.570388, 15.454138) rotate(-40.010253) translate(-46.570388, -15.454138) " cx="46.5703878" cy="15.4541375" rx="1.84558233" ry="1.70361446" />
                                                        <ellipse id="Oval" fill="#FFFFFF" transform="translate(39.826172, 7.971774) rotate(-36.661346) translate(-39.826172, -7.971774) " cx="39.8261716" cy="7.97177362" rx="6.38896958" ry="5.18216421" /> </g>
                                                    <path d="M70.16,29.01 C64.64,28.09 59.84,24.41 57.92,19.63 C57.71,19.12 57.13,18.87 56.62,19.07 C56.11,19.28 55.86,19.86 56.06,20.37 C58.23,25.79 63.63,29.95 69.82,30.99 C71.09,31.23 71.44,29.21 70.15,29.02 L70.16,29.01 Z" id="Path" fill="#627A93" />
                                                    <path d="M27.93,20.37 C28.14,19.86 27.89,19.28 27.37,19.07 C26.86,18.86 26.28,19.11 26.07,19.63 C24.16,24.41 19.36,28.09 13.83,29.01 C12.54,29.21 12.89,31.22 14.16,30.98 C20.36,29.95 25.76,25.78 27.92,20.36 L27.93,20.37 Z" id="Path" fill="#627A93" />
                                                    <path d="M42,65 C38.64,65 36,66.76 36,69 C36,69.55 36.45,70 37,70 C37.55,70 38,69.55 38,69 C38,68.06 39.71,67 42,67 C44.29,67 46,68.06 46,69 C46,69.55 46.45,70 47,70 C47.55,70 48,69.55 48,69 C48,66.76 45.36,65 42,65 Z" id="Path" fill="#627A93" /> </g>
                                            </g>
                                        </svg>
                                    </span>
                                    <span>
                                        <ul style={{ display: 'flex', alignItems: 'center', gap: '10px', listStyle: 'none', padding: 0, marginLeft: '-15px' }}>
                                            <li>
                                                <a aria-label="Wendogo sur Instagram" href="https://www.instagram.com/WendogoHQ/" rel="noreferrer noopener" target="_blank" className="LegalSocial__SocialLink-sc-v4d14j-3 GeNZR2">
                                                <svg height={88} viewBox="0 0 46 46" width={88} xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="LegalSocial__Picto-sc-v4d14j-0 llOyxT">
                                                    <path d="M23,16.44c2.14,0,2.39,0,3.23,0a4.09,4.09,0,0,1,1.49.28,2.56,2.56,0,0,1,1.51,1.51,4.32,4.32,0,0,1,.28,1.49c0,.84,0,1.09,0,3.23s0,2.39,0,3.23a4,4,0,0,1-.28,1.49,2.42,2.42,0,0,1-.59.92,2.57,2.57,0,0,1-.92.6,4.39,4.39,0,0,1-1.49.27c-.84,0-1.09,0-3.23,0s-2.39,0-3.23,0a4.28,4.28,0,0,1-1.49-.27,2.67,2.67,0,0,1-1.52-1.52,4.28,4.28,0,0,1-.27-1.49c0-.84,0-1.09,0-3.23s0-2.39,0-3.23a4.39,4.39,0,0,1,.27-1.49,2.57,2.57,0,0,1,.6-.92,2.42,2.42,0,0,1,.92-.59,4.21,4.21,0,0,1,1.49-.28C20.61,16.45,20.86,16.44,23,16.44ZM23,15c-2.17,0-2.45,0-3.3.05a5.85,5.85,0,0,0-1.94.37,3.94,3.94,0,0,0-1.42.92,4.17,4.17,0,0,0-.92,1.42,5.85,5.85,0,0,0-.37,1.94c0,.85-.05,1.13-.05,3.3s0,2.44.05,3.3a5.85,5.85,0,0,0,.37,1.94,3.94,3.94,0,0,0,.92,1.42,4.17,4.17,0,0,0,1.42.92A5.85,5.85,0,0,0,19.7,31c.86,0,1.13.05,3.3.05s2.45,0,3.3-.05a5.85,5.85,0,0,0,1.94-.37,3.86,3.86,0,0,0,1.42-.92,4,4,0,0,0,.92-1.42A5.82,5.82,0,0,0,31,26.3c0-.86,0-1.13,0-3.3s0-2.45,0-3.3a5.82,5.82,0,0,0-.38-1.94,4,4,0,0,0-2.34-2.34A5.77,5.77,0,0,0,26.3,15C25.44,15,25.17,15,23,15Z" />
                                                    <path d="M23,18.89A4.11,4.11,0,1,0,27.11,23,4.11,4.11,0,0,0,23,18.89Zm0,6.78A2.67,2.67,0,1,1,25.67,23,2.68,2.68,0,0,1,23,25.67Z" />
                                                    <path d="M27.27,19.69a1,1,0,1,0-1-1A1,1,0,0,0,27.27,19.69Z" />
                                                </svg>
                                                </a>
                                            </li>
                                            <li>
                                                <a aria-label="Wendogo sur Facebook" href="https://www.facebook.com/wendogoHQ/" rel="noreferrer noopener" target="_blank" className="LegalSocial__SocialLink-sc-v4d14j-3 GeNZR2" >
                                                <svg height={88} viewBox="0 0 46 46" width={88} xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="LegalSocial__Picto-sc-v4d14j-0 llOyxT" style={{marginLeft:'-15px'}}>
                                                    <path d="M23.05,15a8,8,0,0,1,1.26,16V25.38h1.87l.36-2.33H24.31V21.54a1.17,1.17,0,0,1,1.3-1.26h1v-2a12.14,12.14,0,0,0-1.8-.16h0a2.84,2.84,0,0,0-3,3.14v1.77h-2v2.33h2V31a8,8,0,0,1,1.26-16Z" />
                                                </svg>
                                                </a>
                                            </li>
                                            <li>
                                                <a aria-label="Wendogo sur Tiktok" href="https://www.tiktok.com/@WendogoHQ/" rel="noreferrer noopener" target="_blank" className="LegalSocial__SocialLink-sc-v4d14j-3 GeNZR2" >
                                                <svg height={32} viewBox="0 0 46 46" width={46} xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="LegalSocial__Picto-sc-v4d14j-0 llOyxT">
                                                    <path d="M40.2715758,9.83775879 C39.9133631,9.67729534 39.5646438,9.5013895 39.2267272,9.31070178 C38.2440792,8.74766606 37.3431304,8.08424036 36.5432905,7.33471711 C34.542046,5.35010787 33.7946199,3.33675006 33.5193106,1.92711211 L33.5303671,1.92711211 C33.3003899,0.757045533 33.3954766,0 33.4098502,0 L24.2947896,0 L24.2947896,30.5482247 C24.2947896,30.9583709 24.2947896,31.3637257 24.2748878,31.764289 C24.2748878,31.8141198 24.2693595,31.8601175 24.2660425,31.9137815 C24.2660425,31.9358221 24.2660425,31.9588209 24.2605142,31.9818198 C24.2605142,31.9875695 24.2605142,31.9933192 24.2605142,31.9990689 C24.0654057,34.2248215 22.605661,36.2206495 20.3663799,37.3233031 C19.2170949,37.8899902 17.9172283,38.1872478 16.5949738,38.18576 C12.3481339,38.18576 8.90621453,35.1844099 8.90621453,31.4777616 C8.90621453,27.7711134 12.3481339,24.7697632 16.5949738,24.7697632 C17.3988805,24.7691165 18.1978387,24.8787594 18.9621917,25.094622 L18.9732483,17.0507736 C14.2821103,16.5255773 9.5513622,17.7250543 5.92646098,20.3587751 C4.35539052,21.5418752 3.03458517,22.9535222 2.02348138,24.5301919 C1.63871172,25.1051631 0.186980214,27.4155895 0.0111802824,31.1653606 C-0.099385712,33.2937126 0.638089471,35.4987275 0.989689333,36.410057 L0.989689333,36.4292227 C1.21082132,36.9658626 2.06770778,38.7971462 3.46415629,40.3409441 C4.5902012,41.5793024 5.92058651,42.6671347 7.41246795,43.5694079 L7.41246795,43.5502422 L7.43458115,43.5694079 C11.84727,46.1682781 16.7398152,45.9977033 16.7398152,45.9977033 C17.5867508,45.9679965 20.4238742,45.9977033 23.6457672,44.674311 C27.2192602,43.207176 29.2536745,41.0213268 29.2536745,41.0213268 C30.5533638,39.7152599 31.5868296,38.2268318 32.3097186,36.6199215 C33.1345409,34.7407237 33.4098502,32.4868362 33.4098502,31.5860479 L33.4098502,15.3795238 C33.5204162,15.4370209 34.9931553,16.2812704 34.9931553,16.2812704 C34.9931553,16.2812704 37.1149167,17.4599615 40.4252626,18.2275482 C42.8002201,18.7737709 46,18.8887652 46,18.8887652 L46,11.0461568 C44.8788608,11.1515682 42.602307,10.8449168 40.2715758,9.83775879 Z" />
                                                </svg>
                                                </a>
                                            </li>
                                            <li>
                                                <a aria-label="Wendogo sur YouTube" href="https://www.youtube.com/@WendogoHQ" rel="noreferrer noopener" target="_blank" className="LegalSocial__SocialLink-sc-v4d14j-3 GeNZR2">
                                                <svg height={88} viewBox="0 0 46 46" width={88} xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="LegalSocial__Picto-sc-v4d14j-0 llOyxT">
                                                    <path d="M31.63,18.88A2.19,2.19,0,0,0,30,17.37,54.83,54.83,0,0,0,23,17a57.93,57.93,0,0,0-7,.35,2.25,2.25,0,0,0-1.59,1.53A21.58,21.58,0,0,0,14,23a21.47,21.47,0,0,0,.37,4.12A2.19,2.19,0,0,0,16,28.63,54.91,54.91,0,0,0,23,29a57.93,57.93,0,0,0,7-.35,2.23,2.23,0,0,0,1.59-1.51A21.67,21.67,0,0,0,32,23,20.83,20.83,0,0,0,31.63,18.88ZM21.21,25.57V20.43L25.89,23Z" />
                                                </svg>
                                                </a>
                                            </li>
                                            </ul>
                                    </span>
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
				</div>
			</div>
		</div>
	</div>
</div>
    );
};

export default FormSuccess;
