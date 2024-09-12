import React from 'react'; 
import HeaderMenuBarOnlyWithLogo from '../components/HeaderMenuBarOnlyWithLogo';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Sorbonne from '../assets/partner_logos/logo-sorbonne.svg'
import helper from '../utils/Helper';
import { useEffect, useState} from 'react';

const SimulationResult = () => {

    const [deviceType, setDeviceType] = useState('lg')
    const [browserWidth, setBrowserWidth] = useState(0) 

    useEffect(() => { 
       // console.log('browserWidth', browserWidth)
        const handleResize = () => {
            const browserWidth = window.innerWidth;
            console.log('browserWidth', browserWidth)
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
        
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
        
    }, [browserWidth]);

    return (
        <>
        <HeaderMenuBarOnlyWithLogo/>

        <div className="styles__Main-sc-kz84w6-0 gEFmYD"  style={{paddingTop: 80}}>
            <div className="widget-container widget-funnel-auto">
                <div className="theme-wrapper theme-daisy">
                <div className="funnel AutoTunnel">
                    <div className="app-container">
                    <div className="app-lg">
                            <div className="styles__Hero-sc-s3dlnp-0 gMynSv" style={{ top: '80px', display: 'flex', flexDirection: 'row',  marginLeft: 'auto', marginRight: 'auto', }}>
                                <div className="styles__Title-sc-s3dlnp-2 iUyMl">
                                    <h1 size="large" className="styles__HeadingBridge-sc-6txi54-0 hzNvHf" style={{color: 'rgb(42, 55, 117)' }}> Compte rendu de la simulation</h1>
                                </div>
                            </div>   
                        {!['lg' ].includes(deviceType)  && <div className="Pps " style={{padding : '0 10%'}}>                                                
                            <div className={"Result"+(['lg'].includes(deviceType) ? 'Desktop' : 'Mobile')+"-offersBlock"} style={{marginTop: 70}}>
                                <div className="Stack pushLastItem stackColumn " style={{
                                    flexDirection: "column",
                                    padding: 0,
                                    alignItems: "stretch"
                                }}> 
                                <div className="Stack-child  " style={{ paddingTop: 0 }}>
                                    <div className="FadeInOrderedAnimation" data-testid="AutoOffersList"> 
                                    <div className="Box   " style={{
                                        padding: "30px 0px 0px",
                                        borderWidth: "initial",
                                        borderStyle: "none",
                                        borderColor: "initial"
                                        }}>
                                        <div>
                                        <div className="OfferLayout">
                                            <div className="Card   ">
                                            
                                            <div className="Box   " style={{
                                                padding: "0px 30px 20px",
                                                borderWidth: "initial",
                                                borderStyle: "none",
                                                borderColor: "initial"
                                                }}>
                                               <div data-testid="AutoGarantiesOptionnelles">
                                        <div className="Stack  stackColumn " style={{
                                            flexDirection: "column",
                                            padding: 0,
                                            alignItems: "stretch"
                                        }}>
                                        {/* <div className="Stack-child  " style={{ paddingTop: 15 }}>
                                            <div className="Box   " style={{
                                                padding: "10px 0px 0px",
                                                borderWidth: "initial",
                                                borderStyle: "none",
                                                borderColor: "initial"
                                            }}>
                                            <div className="Title " style={{
                                                color: "rgb(42, 55, 117)",
                                                textAlign: "left",
                                                fontSize: "1rem",
                                                fontWeight: 500,
                                                lineHeight: "inherit"
                                                }}> Recaptitulatif </div>
                                            </div>
                                        </div> */}
                                        <div className="Stack-child  " style={{ paddingTop: 15 }}>
                                            <div className="Stack  stackColumn " style={{
                                                flexDirection: "column",
                                                padding: 0,
                                                alignItems: "stretch"
                                            }}>
                                            <div className="Stack-child  " style={{ paddingTop: 15 }}>
                                                <div className="Accordion">
                                                <div className="Stack pushLastItem stackRow " style={{
                                                    flexDirection: "row",
                                                    padding: 0,
                                                    alignItems: "center"
                                                    }}>
                                                    <div className="Stack-child  " style={{ paddingLeft: 0 }}>
                                                    <div className="Stack  stackRow " style={{
                                                        flexDirection: "row",
                                                        padding: 0,
                                                        alignItems: "stretch"
                                                        }}>
                                                        <div className="Stack-child  " style={{ paddingLeft: 0 }}>
                                                        <div className="Checkbox FilterCheckbox after  no-margin" data-testid="filter-checkbox-bris_de_glace">
                                                            {/* <input type="checkbox" name="Administratif" id="Administratif" tabIndex={0} defaultValue="Administratif" />
                                                            <button type="button" role="checkbox" aria-checked="false" className="Checkbox-tick icon-lesfurets   " /> */}
                                                            <label htmlFor="Administratif" className="Checkbox-label  "> Administratif </label>
                                                            <div className="CguModal-wrapper" />
                                                        </div>
                                                        
                                                        </div>
                                                    </div>
                                                    </div>
                                                    <div className="Stack-child  " style={{ paddingLeft: 0 }}>
                                                    <div className="icon-wrapper" style={{ color: "rgb(172, 186, 200)" }}>
                                                        <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" width="30px" height="30px">
                                                        <path d="M27.785 15.75l-.562-.53a.829.829 0 00-1.123 0l-6.592 6.226-6.59-6.226a.823.823 0 00-1.124 0l-.561.53a.721.721 0 000 1.061l7.714 7.286c.149.141.35.22.561.22a.82.82 0 00.563-.22l7.714-7.286a.73.73 0 00.233-.531.73.73 0 00-.233-.53" fillRule="evenodd" />
                                                        </svg>
                                                    </div>
                                                    </div>
                                                </div>
                                                </div>
                                            </div>
                                            <div className="Stack-child  " style={{ paddingTop: 15 }}>
                                                <div className="Accordion">
                                                <div className="Stack pushLastItem stackRow " style={{
                                                    flexDirection: "row",
                                                    padding: 0,
                                                    alignItems: "center"
                                                    }}>
                                                    <div className="Stack-child  " style={{ paddingLeft: 0 }}>
                                                    <div className="Stack  stackRow " style={{
                                                        flexDirection: "row",
                                                        padding: 0,
                                                        alignItems: "stretch"
                                                        }}>
                                                        <div className="Stack-child  " style={{ paddingLeft: 0 }}>
                                                            <div className="Checkbox FilterCheckbox after  no-margin" data-testid="filter-checkbox-assistance_panne_0_km">
                                                                {/* <input type="checkbox" name="Financier" id="Financier" tabIndex={0} defaultValue="Financier" />
                                                                <button type="button" role="checkbox" aria-checked="false" className="Checkbox-tick icon-lesfurets   " /> */}
                                                                <label htmlFor="Financier" className="Checkbox-label  "> Financier </label>
                                                                {/* <div className="CguModal-wrapper" /> */}
                                                            </div>
                                                            
                                                        </div>
                                                    </div>
                                                    </div>
                                                    <div className="Stack-child  " style={{ paddingLeft: 0 }}>
                                                    <div className="icon-wrapper" style={{ color: "rgb(172, 186, 200)" }}>
                                                        <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" width="30px" height="30px">
                                                        <path d="M27.785 15.75l-.562-.53a.829.829 0 00-1.123 0l-6.592 6.226-6.59-6.226a.823.823 0 00-1.124 0l-.561.53a.721.721 0 000 1.061l7.714 7.286c.149.141.35.22.561.22a.82.82 0 00.563-.22l7.714-7.286a.73.73 0 00.233-.531.73.73 0 00-.233-.53" fillRule="evenodd" />
                                                        </svg>
                                                    </div>
                                                    </div>
                                                </div>
                                                </div>
                                            </div>
                                            {/* <div className="Stack-child  " style={{ paddingTop: 20, width: 280 }}>
                                                <button type="button" className="PpsButton colored color-3 small hasBeforeIcon   ">
                                                    <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M14.5 25.907c1.382 0 2.576.811 3.145 1.99H30.74c.696 0 1.26.668 1.26 1.492 0 .765-.486 1.396-1.113 1.482l-.147.01H17.705A3.5 3.5 0 0114.5 33a3.5 3.5 0 01-3.205-2.118H9.26c-.696 0-1.26-.669-1.26-1.493 0-.765.486-1.396 1.113-1.482l.147-.01h2.095a3.497 3.497 0 013.145-1.99zm11-8.953c1.396 0 2.601.813 3.163 1.989h2.077c.696 0 1.26.668 1.26 1.493 0 .765-.486 1.396-1.113 1.482l-.147.01h-2.077a3.502 3.502 0 01-3.163 1.99 3.502 3.502 0 01-3.163-1.99H9.26c-.696 0-1.26-.668-1.26-1.492 0-.766.486-1.397 1.113-1.483l.147-.01h13.077a3.502 3.502 0 013.163-1.99zM15.5 8c1.396 0 2.601.813 3.163 1.99H30.74c.696 0 1.26.668 1.26 1.492 0 .765-.486 1.396-1.113 1.482l-.147.01H18.663a3.502 3.502 0 01-3.163 1.99 3.502 3.502 0 01-3.163-1.99H9.26c-.696 0-1.26-.668-1.26-1.492 0-.765.486-1.396 1.113-1.482l.147-.01h3.077A3.502 3.502 0 0115.5 8z" fillRule="evenodd" />
                                                    </svg>
                                                    <div className="PpsButton-children ">Filtrer les établissements</div>
                                                </button>
                                            </div> */}
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
                        </div>}   
                        {/* === Desktop */}
                        <div className="Pps ResultDesktop">
                                                    
                            {['lg' ].includes(deviceType)  && <div>
                                <div className=" SchoolFilters AutoSchoolFilters" data-testid="AutoSchoolFilters">  
                                    <div data-testid="AutoGarantiesOptionnelles">
                                        <div className="Stack  stackColumn " style={{
                                            flexDirection: "column",
                                            padding: 0,
                                            alignItems: "stretch"
                                        }}>
                                        <div className="Stack-child  " style={{ paddingTop: 15 }}>
                                            <div className="Box   " style={{
                                                padding: "10px 0px 0px",
                                                borderWidth: "initial",
                                                borderStyle: "none",
                                                borderColor: "initial"
                                            }}>
                                            <div className="Title " style={{
                                                color: "rgb(42, 55, 117)",
                                                textAlign: "left",
                                                fontSize: "1rem",
                                                fontWeight: 500,
                                                lineHeight: "inherit"
                                                }}> Volet </div>
                                            </div>
                                        </div>
                                        <div className="Stack-child  " style={{ paddingTop: 15 }}>
                                            <div className="Stack  stackColumn " style={{
                                                flexDirection: "column",
                                                padding: 0,
                                                alignItems: "stretch"
                                            }}>
                                            <div className="Stack-child  " style={{ paddingTop: 15 }}>
                                                <div className="Accordion">
                                                <div className="Stack pushLastItem stackRow " style={{
                                                    flexDirection: "row",
                                                    padding: 0,
                                                    alignItems: "center"
                                                    }}>
                                                    <div className="Stack-child  " style={{ paddingLeft: 0 }}>
                                                    <div className="Stack  stackRow " style={{
                                                        flexDirection: "row",
                                                        padding: 0,
                                                        alignItems: "stretch"
                                                        }}>
                                                        <div className="Stack-child  " style={{ paddingLeft: 0 }}>
                                                        <div className="Checkbox FilterCheckbox after  no-margin" data-testid="filter-checkbox-bris_de_glace">
                                                            {/* <input type="checkbox" name="Administratif" id="Administratif" tabIndex={0} defaultValue="Administratif" />
                                                            <button type="button" role="checkbox" aria-checked="false" className="Checkbox-tick icon-lesfurets   " /> */}
                                                            <label htmlFor="Administratif" className="Checkbox-label  "> Administratif </label>
                                                            <div className="CguModal-wrapper" />
                                                        </div>
                                                        
                                                        </div>
                                                    </div>
                                                    </div>
                                                    <div className="Stack-child  " style={{ paddingLeft: 0 }}>
                                                    <div className="icon-wrapper" style={{ color: "rgb(172, 186, 200)" }}>
                                                        <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" width="30px" height="30px">
                                                        <path d="M27.785 15.75l-.562-.53a.829.829 0 00-1.123 0l-6.592 6.226-6.59-6.226a.823.823 0 00-1.124 0l-.561.53a.721.721 0 000 1.061l7.714 7.286c.149.141.35.22.561.22a.82.82 0 00.563-.22l7.714-7.286a.73.73 0 00.233-.531.73.73 0 00-.233-.53" fillRule="evenodd" />
                                                        </svg>
                                                    </div>
                                                    </div>
                                                </div>
                                                </div>
                                            </div>
                                            <div className="Stack-child  " style={{ paddingTop: 15 }}>
                                                <div className="Accordion">
                                                <div className="Stack pushLastItem stackRow " style={{
                                                    flexDirection: "row",
                                                    padding: 0,
                                                    alignItems: "center"
                                                    }}>
                                                    <div className="Stack-child  " style={{ paddingLeft: 0 }}>
                                                    <div className="Stack  stackRow " style={{
                                                        flexDirection: "row",
                                                        padding: 0,
                                                        alignItems: "stretch"
                                                        }}>
                                                        <div className="Stack-child  " style={{ paddingLeft: 0 }}>
                                                            <div className="Checkbox FilterCheckbox after  no-margin" data-testid="filter-checkbox-assistance_panne_0_km">
                                                                {/* <input type="checkbox" name="Financier" id="Financier" tabIndex={0} defaultValue="Financier" />
                                                                <button type="button" role="checkbox" aria-checked="false" className="Checkbox-tick icon-lesfurets   " /> */}
                                                                <label htmlFor="Financier" className="Checkbox-label  "> Financier </label>
                                                                {/* <div className="CguModal-wrapper" /> */}
                                                            </div>
                                                            
                                                        </div>
                                                    </div>
                                                    </div>
                                                    <div className="Stack-child  " style={{ paddingLeft: 0 }}>
                                                    <div className="icon-wrapper" style={{ color: "rgb(172, 186, 200)" }}>
                                                        <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" width="30px" height="30px">
                                                        <path d="M27.785 15.75l-.562-.53a.829.829 0 00-1.123 0l-6.592 6.226-6.59-6.226a.823.823 0 00-1.124 0l-.561.53a.721.721 0 000 1.061l7.714 7.286c.149.141.35.22.561.22a.82.82 0 00.563-.22l7.714-7.286a.73.73 0 00.233-.531.73.73 0 00-.233-.53" fillRule="evenodd" />
                                                        </svg>
                                                    </div>
                                                    </div>
                                                </div>
                                                </div>
                                            </div>
                                            <div className="Stack-child  " style={{ paddingTop: 15 }}>
                                                <div className="Accordion">
                                                <div className="Stack pushLastItem stackRow " style={{
                                                    flexDirection: "row",
                                                    padding: 0,
                                                    alignItems: "center"
                                                    }}>
                                                    <div className="Stack-child  " style={{ paddingLeft: 0 }}>
                                                    <div className="Stack  stackRow " style={{
                                                        flexDirection: "row",
                                                        padding: 0,
                                                        alignItems: "stretch"
                                                        }}>
                                                        <div className="Stack-child  " style={{ paddingLeft: 0 }}>
                                                            <div className="Checkbox FilterCheckbox after  no-margin" data-testid="filter-checkbox-assistance_accident">
                                                                {/* <input type="checkbox" name="Pédagogique" id="Pédagogique" tabIndex={0} defaultValue="Pédagogique" />
                                                                <button type="button" role="checkbox" aria-checked="false" className="Checkbox-tick icon-lesfurets   " /> */}
                                                                <label htmlFor="Pédagogique" className="Checkbox-label  "> Pédagogique </label>
                                                                {/* <div className="CguModal-wrapper" /> */}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    </div>
                                                    <div className="Stack-child  " style={{ paddingLeft: 0 }}>
                                                    <div className="icon-wrapper" style={{ color: "rgb(172, 186, 200)" }}>
                                                        <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" width="30px" height="30px">
                                                        <path d="M27.785 15.75l-.562-.53a.829.829 0 00-1.123 0l-6.592 6.226-6.59-6.226a.823.823 0 00-1.124 0l-.561.53a.721.721 0 000 1.061l7.714 7.286c.149.141.35.22.561.22a.82.82 0 00.563-.22l7.714-7.286a.73.73 0 00.233-.531.73.73 0 00-.233-.53" fillRule="evenodd" />
                                                        </svg>
                                                    </div>
                                                    </div>
                                                </div>
                                            
                                                <FormGroup style={{marginLeft: 10}}>
                                                    <FormControlLabel control={<Checkbox defaultChecked />} label="Label" />
                                                    <FormControlLabel required control={<Checkbox />} label="Required" />
                                                    <FormControlLabel disabled control={<Checkbox />} label="Disabled" />
                                                </FormGroup>
                                                </div>
                                            </div>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>}
                            <div className={"Result"+(['lg'].includes(deviceType) ? 'Desktop' : 'Mobile')+"-offersBlock"} style={{marginTop: ['lg'].includes(deviceType) ? 70 : 0}}>
                                <div className="Stack pushLastItem stackColumn " style={{
                                    flexDirection: "column",
                                    padding: 0,
                                    alignItems: "stretch"
                                }}>
                                <div className="Stack-child  " style={{ paddingTop: 0 }}>
                                    <div className="RevampedPpsHeader">
                                    <div className="RevampedIntroduction">
                                        <div className="Box   " style={{
                                            padding: "25px 0px 0px",
                                            borderWidth: "initial",
                                            borderStyle: "none",
                                            borderColor: "initial"
                                        }}>
                                        <div className="Stack pushLastItem stackRow " style={{
                                            flexDirection: "row",
                                            padding: 0,
                                            alignItems: "flex-start"
                                            }}>
                                            <div className="Stack-child  " style={{ paddingLeft: 0 }}>
                                            <div className="Title " style={{
                                                color: "rgb(42, 55, 117)",
                                                textAlign: "left",
                                                fontSize: "1.25rem",
                                                fontWeight: 500,
                                                lineHeight: "inherit"
                                                }}> Edgar, ces établissements sont susceptibles de vous accueillir sur la base de votre licence 2 de mathématiques.
                                            </div>
                                            </div> 
                                        </div>
                                        </div>
                                    </div>
                                    <div className="Box   " style={{
                                        padding: "30px 0px 0px",
                                        borderWidth: "initial",
                                        borderStyle: "none",
                                        borderColor: "initial"
                                        }}>
                                        <div className="LegalStatement"> Liste non exhaustive et sans référencement sponsorisé. </div>
                                    </div> 
                                    </div>
                                </div>
                                <div className="Stack-child  " style={{ paddingTop: 0 }}>
                                    <div className="FadeInOrderedAnimation" data-testid="AutoOffersList"> 
                                    <div className="Box   " style={{
                                        padding: "30px 0px 0px",
                                        borderWidth: "initial",
                                        borderStyle: "none",
                                        borderColor: "initial"
                                        }}>
                                        <div>
                                        <div className="OfferLayout">
                                            <div className="Card   ">
                                            <div className="AutoOfferBottomLayout smallPadding">
                                                <div className="Stack  stackRow " style={{
                                                    flexDirection: "row",
                                                    padding: 0,
                                                    alignItems: "center"
                                                }}>
                                                <div className="Stack-child  " style={{ paddingLeft: 30 }}>
                                                    <div className="Rating">
                                                    <div className="Stack  stackRow fullHeight" style={{flexFlow: "wrap",padding: 0,alignItems: "center",gap: 5 }}>
                                                        <div className="Stack-child  " style={{ paddingLeft: 15 }}>
                                                            <div className="Tag " style={{fontWeight: 400,height: "100%",margin: 0, backgroundColor:"#c7f6fc", color: "#006a6f"}}>
                                                                <p>Public </p>
                                                            </div>
                                                        </div> 
                                                    </div>
                                                    </div>
                                                </div>
                                                <div className="Stack-child  " style={{ paddingLeft: 30 }}>
                                                    <div className="Rating">
                                                    <div className="Stack  stackRow fullHeight" style={{flexFlow: "wrap",padding: 0,alignItems: "center",gap: 5 }}>
                                                        <div className="Stack-child  " style={{ paddingLeft: 15 }}>
                                                            <div className="Tag " style={{fontWeight: 400,height: "100%",margin: 0,  backgroundColor:"#c7f6fc", color: "#006a6f"}}>
                                                                <p>Exonération partielle </p>
                                                            </div>
                                                        </div> 
                                                    </div>
                                                    </div>
                                                </div> 
                                                </div>
                                            </div>
                                            <div className="Box   " style={{
                                                padding: "0px 30px 20px",
                                                borderWidth: "initial",
                                                borderStyle: "none",
                                                borderColor: "initial"
                                                }}>
                                                <div className="Stack  stackRow " style={{
                                                    flexDirection: "row",
                                                    padding: 0,
                                                    alignItems: "stretch"
                                                }}>
                                                <div className="Stack-child Stack-grow-item " style={{ paddingLeft: 0 }}>
                                                    <div className="Stack  stackRow " style={{
                                                        flexDirection: "row",
                                                        padding: 0,
                                                        alignItems: "center",
                                                        justifyContent: "space-between"
                                                    }}>
                                                    <div className="Stack-child  " style={{ paddingLeft: 15 }}>
                                                        <div className="Stack  stackColumn " style={{
                                                            flexDirection: "column",
                                                            padding: 0,
                                                            alignItems: "stretch"
                                                        }}>
                                                        <div className="Stack-child  " style={{ paddingTop: 30 }}>
                                                            <div className="Logo border small  " style={{
                                                                width: 90,
                                                                height: 90,
                                                                padding: 10
                                                            }}>
                                                            <img src={Sorbonne} style={{ maxHeight: 70 }} alt="Université de Paris Sorbonne" title="Université de Paris Sorbonne" />
                                                            </div>
                                                        </div>
                                                        </div>
                                                    </div>
                                                    <div className="Stack-child Stack-grow-item " style={{ paddingLeft: 15 }}>
                                                        <div className="Box   " style={{
                                                            padding: 0,
                                                            borderWidth: "initial",
                                                            borderStyle: "none",
                                                            borderColor: "initial"
                                                        }}>
                                                        <p><b>Master indifférencié (recherche et professionnel) Sciences, technologies, santé mention Agrosciences, environnement, territoires, paysage, forêt parcours Biologie intégrative et changement globaux (BICG)</b></p>
                                                        {/* <br/> */}
                                                        <p>Sorbonne Université - Sciences et Ingénierie</p>
                                                        </div>
                                                    </div> 
                                                    </div>
                                                </div>
                                                </div>
                                            </div>
                                            <div className="AutoOfferBottomLayout smallPadding">
                                                <div className="Stack  stackRow " style={{
                                                    flexDirection: "row",
                                                    padding: 0,
                                                    alignItems: "center"
                                                }}>
                                                <div className="Stack-child  " style={{ paddingLeft: 30 }}>
                                                    <div className="Rating">
                                                    <div className="Stack  stackRow fullHeight" style={{flexFlow: "wrap",padding: 0,alignItems: "center",gap: 5 }}>
                                                        <div className="Stack-child  " style={{ paddingLeft: 15 }}>
                                                            <div className="Tag " style={{fontWeight: 400,height: "100%",margin: 0}}>
                                                                <p>Nombre d'étudiant :  <strong>300</strong> </p>
                                                            </div>
                                                        </div> 
                                                    </div>
                                                    </div>
                                                </div>
                                                <div className="Stack-child  " style={{ paddingLeft: 30 }}>
                                                    <div className="Rating">
                                                    <div className="Stack  stackRow fullHeight" style={{flexFlow: "wrap",padding: 0,alignItems: "center",gap: 5 }}>
                                                        <div className="Stack-child  " style={{ paddingLeft: 15 }}>
                                                            <div className="Tag " style={{fontWeight: 400,height: "100%",margin: 0}}>
                                                                <p> Taux d'accès : <strong>100%</strong> </p>
                                                            </div>
                                                        </div> 
                                                    </div>
                                                    </div>
                                                </div>
                                                <div className="Stack-child  " style={{ paddingLeft: 30 }}>
                                                    <div className="Rating">
                                                    <div className="Stack  stackRow fullHeight" style={{flexFlow: "wrap",padding: 0,alignItems: "center",gap: 5 }}>
                                                        <div className="Stack-child  " style={{ paddingLeft: 15 }}>
                                                            <div className="Tag " style={{fontWeight: 400,height: "100%",margin: 0}}>
                                                                <p> Taux d'emploi : <strong>100%</strong> </p>
                                                            </div>
                                                        </div> 
                                                    </div>
                                                    </div>
                                                </div> 
                                                <div className="Stack-child  " style={{ paddingLeft: 30 }}>
                                                    <div className="Rating">
                                                    <div className="Stack  stackRow fullHeight" style={{flexFlow: "wrap",padding: 0,alignItems: "center",gap: 5 }}>
                                                        <div className="Stack-child  " style={{ paddingLeft: 15 }}>
                                                            <div className="Tag " style={{fontWeight: 400,height: "100%",margin: 0}}>
                                                                <p> Frais de scolarité : <strong>900€</strong> </p>
                                                            </div>
                                                        </div> 
                                                    </div>
                                                    </div>
                                                </div> 
                                                {/* <div className="Stack-child  " style={{ paddingLeft: 30 }}>
                                                    <button type="button" className="PopinTooltip-button-open"  >
                                                        <div className="Tooltip-picto">?</div>
                                                    </button>
                                                </div>  */}
                                                </div>
                                            </div>  
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                    <div className="Box   " style={{
                                        padding: "30px 0px 0px",
                                        borderWidth: "initial",
                                        borderStyle: "none",
                                        borderColor: "initial"
                                        }}>
                                        <div>
                                        <div className="OfferLayout">
                                            <div className="Card   ">
                                            <div className="AutoOfferBottomLayout smallPadding">
                                                <div className="Stack  stackRow " style={{
                                                    flexDirection: "row",
                                                    padding: 0,
                                                    alignItems: "center"
                                                }}>
                                                <div className="Stack-child  " style={{ paddingLeft: 30 }}>
                                                    <div className="Rating">
                                                    <div className="Stack  stackRow fullHeight" style={{flexFlow: "wrap",padding: 0,alignItems: "center",gap: 5 }}>
                                                        <div className="Stack-child  " style={{ paddingLeft: 15 }}>
                                                            <div className="Tag " style={{fontWeight: 400,height: "100%",margin: 0, backgroundColor:"#c7f6fc", color: "#006a6f"}}>
                                                                <p>Public </p>
                                                            </div>
                                                        </div> 
                                                    </div>
                                                    </div>
                                                </div>
                                                <div className="Stack-child  " style={{ paddingLeft: 30 }}>
                                                    <div className="Rating">
                                                    <div className="Stack  stackRow fullHeight" style={{flexFlow: "wrap",padding: 0,alignItems: "center",gap: 5 }}>
                                                        <div className="Stack-child  " style={{ paddingLeft: 15 }}>
                                                            <div className="Tag " style={{fontWeight: 400,height: "100%",margin: 0,  backgroundColor:"#c7f6fc", color: "#006a6f"}}>
                                                                <p>Exonération partielle </p>
                                                            </div>
                                                        </div> 
                                                    </div>
                                                    </div>
                                                </div> 
                                                </div>
                                            </div>
                                            <div className="Box   " style={{
                                                padding: "0px 30px 20px",
                                                borderWidth: "initial",
                                                borderStyle: "none",
                                                borderColor: "initial"
                                                }}>
                                                <div className="Stack  stackRow " style={{
                                                    flexDirection: "row",
                                                    padding: 0,
                                                    alignItems: "stretch"
                                                }}>
                                                <div className="Stack-child Stack-grow-item " style={{ paddingLeft: 0 }}>
                                                    <div className="Stack  stackRow " style={{
                                                        flexDirection: "row",
                                                        padding: 0,
                                                        alignItems: "center",
                                                        justifyContent: "space-between"
                                                    }}>
                                                    <div className="Stack-child  " style={{ paddingLeft: 15 }}>
                                                        <div className="Stack  stackColumn " style={{
                                                            flexDirection: "column",
                                                            padding: 0,
                                                            alignItems: "stretch"
                                                        }}>
                                                        <div className="Stack-child  " style={{ paddingTop: 30 }}>
                                                            <div className="Logo border small  " style={{
                                                                width: 90,
                                                                height: 90,
                                                                padding: 10
                                                            }}>
                                                            <img src={Sorbonne} style={{ maxHeight: 70 }} alt="Université de Paris Sorbonne" title="Université de Paris Sorbonne" />
                                                            </div>
                                                        </div>
                                                        </div>
                                                    </div>
                                                    <div className="Stack-child Stack-grow-item " style={{ paddingLeft: 15 }}>
                                                        <div className="Box   " style={{
                                                            padding: 0,
                                                            borderWidth: "initial",
                                                            borderStyle: "none",
                                                            borderColor: "initial"
                                                        }}>
                                                        <p><b>Master indifférencié (recherche et professionnel) Sciences, technologies, santé mention Agrosciences, environnement, territoires, paysage, forêt parcours Biologie intégrative et changement globaux (BICG)</b></p>
                                                        {/* <br/> */}
                                                        <p>Sorbonne Université - Sciences et Ingénierie</p>
                                                        </div>
                                                    </div> 
                                                    </div>
                                                </div>
                                                </div>
                                            </div>
                                            <div className="AutoOfferBottomLayout smallPadding">
                                                <div className="Stack  stackRow " style={{
                                                    flexDirection: "row",
                                                    padding: 0,
                                                    alignItems: "center"
                                                }}>
                                                <div className="Stack-child  " style={{ paddingLeft: 30 }}>
                                                    <div className="Rating">
                                                    <div className="Stack  stackRow fullHeight" style={{flexFlow: "wrap",padding: 0,alignItems: "center",gap: 5 }}>
                                                        <div className="Stack-child  " style={{ paddingLeft: 15 }}>
                                                            <div className="Tag " style={{fontWeight: 400,height: "100%",margin: 0}}>
                                                                <p>Nombre d'étudiant :  <strong>300</strong> </p>
                                                            </div>
                                                        </div> 
                                                    </div>
                                                    </div>
                                                </div>
                                                <div className="Stack-child  " style={{ paddingLeft: 30 }}>
                                                    <div className="Rating">
                                                    <div className="Stack  stackRow fullHeight" style={{flexFlow: "wrap",padding: 0,alignItems: "center",gap: 5 }}>
                                                        <div className="Stack-child  " style={{ paddingLeft: 15 }}>
                                                            <div className="Tag " style={{fontWeight: 400,height: "100%",margin: 0}}>
                                                                <p> Taux d'accès : <strong>100%</strong> </p>
                                                            </div>
                                                        </div> 
                                                    </div>
                                                    </div>
                                                </div>
                                                <div className="Stack-child  " style={{ paddingLeft: 30 }}>
                                                    <div className="Rating">
                                                    <div className="Stack  stackRow fullHeight" style={{flexFlow: "wrap",padding: 0,alignItems: "center",gap: 5 }}>
                                                        <div className="Stack-child  " style={{ paddingLeft: 15 }}>
                                                            <div className="Tag " style={{fontWeight: 400,height: "100%",margin: 0}}>
                                                                <p> Taux d'emploi : <strong>100%</strong> </p>
                                                            </div>
                                                        </div> 
                                                    </div>
                                                    </div>
                                                </div> 
                                                <div className="Stack-child  " style={{ paddingLeft: 30 }}>
                                                    <div className="Rating">
                                                    <div className="Stack  stackRow fullHeight" style={{flexFlow: "wrap",padding: 0,alignItems: "center",gap: 5 }}>
                                                        <div className="Stack-child  " style={{ paddingLeft: 15 }}>
                                                            <div className="Tag " style={{fontWeight: 400,height: "100%",margin: 0}}>
                                                                <p> Frais de scolarité : <strong>900€</strong> </p>
                                                            </div>
                                                        </div> 
                                                    </div>
                                                    </div>
                                                </div> 
                                                {/* <div className="Stack-child  " style={{ paddingLeft: 30 }}>
                                                    <button type="button" className="PopinTooltip-button-open"  >
                                                        <div className="Tooltip-picto">?</div>
                                                    </button>
                                                </div>  */}
                                                </div>
                                            </div>  
                                            </div>
                                        </div>
                                        </div>
                                    </div>   
                                    </div>
                                </div>  
                                <div className="Stack-child  " style={{ paddingTop: 0 }}>
                                    <div className="Box   " style={{
                                        padding: "10px 0px 0px",
                                        borderWidth: "initial",
                                        borderStyle: "none",
                                        borderColor: "initial"
                                    }}>
                                    <div className="Stack  stackColumn " style={{
                                        flexDirection: "column",
                                        padding: 0,
                                        alignItems: "stretch"
                                        }}>
                                        <div className="Stack-child  " style={{ paddingTop: 10 }}>
                                        <p style={{
                                            color: "rgb(127, 148, 169)",
                                            fontSize: "1rem",
                                            margin: "0px 0px 5px",
                                            padding: 0,
                                            textAlign: "left",
                                            fontWeight: 400,
                                            lineHeight: "inherit"
                                            }}>
                                            Les données présentées, issues d'une étude InserSup de 2021 pour le taux d'emploi et des rapports annuels publiés par les établissements en 2023. 
                                            Elles offrent un aperçu pertinent du contexte éducatif à cette période. Il est important de noter que les données scolaires étant dynamique, 
                                            ces chiffres peuvent ne pas refléter la situation actuelle en temps réel, mais ils constituent une base solide pour l'analyse des tendances passées.
                                        </p>
                                        </div>
                                    </div>
                                    </div>
                                </div> 
                                <div className="Stack-child  " style={{ paddingTop: 0 }} />
                                <div className="Stack-child  " style={{ paddingTop: 0 }}>
                                    <div className="theme-daisy">
                                    <footer id="Footer" className="FunnelFooter ProgressBarActive">
                                        <div className="FunnelFooter-ctas">
                                        </div>
                                        <div className="FunnelFooter-content">
                                        <p> Wendogo utilise des cookies pour optimiser votre expérience en ligne. En continuant la navigation sur notre site, vous acceptez l'utilisation des cookies. Pour en savoir plus, consultez la{" "} <span className="CTA link  medium      " title="" data-trackingprefix=""> Politique des cookies </span> . </p>
                                        <p> Nous prenons soin de vos données personnelles, consultez la{" "} <span className="CTA link  medium      " title="" data-trackingprefix=""> Charte de protection des données personnelles </span> . </p>
                                        <p>
                                            <span className="CTA link  medium      " title="" data-trackingprefix=""> En savoir plus sur les Conditions Générales d’Utilisation </span>et  <span className="CTA link  medium      " title="" data-trackingprefix="">les mentions légales</span>
                                        </p>
                                        <p style={{height: 200}}></p>
                                        </div>
                                    </footer>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
                        <div className="SidePanel" data-testid="StepFive-panel" style={{ zIndex: -132 }}>
                        <div className="SidePanel-container" style={{ right: "-705px", width: 705 }}>
                            <svg viewBox="0 0 34 34" xmlns="http://www.w3.org/2000/svg" data-testid="close-side-panel" className="CloseIcon white">
                            <path d="M17 0c9.389 0 17 7.611 17 17s-7.611 17-17 17S0 26.389 0 17 7.611 0 17 0zm0 1C8.163 1 1 8.163 1 17s7.163 16 16 16 16-7.163 16-16S25.837 1 17 1zm5.588 10.415c.47.47.545 1.194.19 1.764l-.083.12-.107.12-3.584 3.584 3.584 3.584c.436.436.532 1.091.26 1.64l-.07.124-.083.12-.107.12c-.47.47-1.194.545-1.764.19l-.12-.083-.12-.107L17 19.007l-3.584 3.584a1.414 1.414 0 01-1.64.26l-.124-.07-.12-.083-.12-.107a1.419 1.419 0 01-.19-1.764l.083-.12.107-.12 3.584-3.584-3.584-3.584a1.414 1.414 0 01-.26-1.64l.07-.124.083-.12.107-.12a1.419 1.419 0 011.764-.19l.12.083.12.107L17 15l3.584-3.584a1.417 1.417 0 012.004 0z" fill="#7F94A9" fillRule="nonzero" />
                            </svg>
                        </div>
                        </div>
                                <div className="Stack-child  " style={{ position: 'fixed', bottom: 0, left: 0, width: '100%', height: 'auto', 
                                                zIndex: 1000, overflow: 'hidden', padding: '20px '+(['lg' ].includes(deviceType) ? '17%' : '9%')+' 0'}}>
                                        <div className="Affiliation" style={{paddingBottom: 15, color: "rgb(0, 20, 53)"}}> 
                                        {/* <div className="CardTag" style={{
                                            backgroundColor: "rgb(255, 244, 231)",
                                            color: "rgb(255, 83, 29)",
                                            borderColor: "rgb(255, 215, 205)"
                                            }}>
                                            <strong>PROMO</strong> Jusqu’à 100€ remboursés jusqu’au 10/09/24 inclus (sous conditions).
                                        </div> */}
                                        <div className="Affiliation-card withTag" style={{borderRadius: 15, backgroundColor: 'aliceblue', boxShadow: "0 4px 8px 0 rgba(172, 186, 200, 1), 0 6px 20px 0 rgba(172, 186, 200, 1)"}}> 
                                            <div className="content" style={{padding: "0 20px 0 20px"}}>
                                            <div className="AffiliationCard  affiliationsocietegenerale-affiliation_sg1 "  style={{borderRadius: 15}}>
                                                
                                                <div className="center" >
                                                <div className="Box   " style={{
                                                    padding: 0,
                                                    // maxWidth: 340,
                                                    marginLeft: "auto",
                                                    marginRight: "auto",
                                                    borderWidth: "initial",
                                                    borderStyle: "none",
                                                    borderColor: "initial"
                                                    }}>
                                                    <div className="Stack  stackColumn " style={{
                                                        display: 'flex',
                                                        justifyContent: 'space-evenly',
                                                        alignItems: 'center',
                                                        margin: 'auto'
                                                        }}>
                                                    <div className="stack-item">
                                                    <div className="AffiliationCard-logo" style={{
                                                    // width: 250,
                                                    // height: 160,
                                                    // padding: 20,
                                                   // marginRight: 50
                                                }}>
                                                <div className=" large  " style={{
                                                    // width: 170,
                                                    // height: 160,
                                                    padding: 20,
                                                    color: '#2a3775'
                                                    }}><div className="">À seulement </div>
                                                    <div className="o-card__footer o-vflow--xs">
                                                        
                                                        <div className="c-price c-price--md c-price--mention">
                                                            <s>1332,00€</s>
                                                            {/* <span className="c-price__mention">Prix le + bas sur 30j</span> */}
                                                            <span className="c-chip c-chip--rounded c-chip--ventePrive" style={{ background: "#ff1e3c", borderRadius: 50, fontFamily: '"Hind Madurai"', fontSize: 16 }}>
                                                                    <em className="c-chip__label">-40%</em>
                                                                </span>
                                                        </div>
                                                        <div className="o-card__priceWrapper" style={{ fontSize: 32 }}>
                                                            <div className="o-card__price o-card__price--inline">
                                                            <span className="c-price c-price--promo c-price--l" style={{ fontSize: 48 }}> 799 <sup>
                                                                <span itemProp="priceCurrency">€00</span>
                                                                
                                                                </sup>
                                                            </span>
                                                            
                                                            </div>
                                                        </div>
                                                        <span className="c-price__mention">Frais de dossier inclus</span>
  {/* <div className="u-line-clamp--1" style={{ fontSize: 14, fontWeight: 800, alignItems: "center", display: "none" }}>
    <svg style={{ marginRight: 4 }} fill="none" viewBox="0 0 16 16" width={16} height={16} xmlns="http://www.w3.org/2000/svg">
      <path stroke="#293847" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" d="M 14 11.0813 V 4.91877 C 13.9995 4.82975 13.9756 4.74244 13.9306 4.66563 C 13.8856 4.58881 13.8212 4.52522 13.7437 4.48127 L 8.24375 1.38752 C 8.16964 1.34473 8.08557 1.3222 8 1.3222 C 7.91443 1.3222 7.83036 1.34473 7.75625 1.38752 L 2.25625 4.48127 C 2.17884 4.52522 2.1144 4.58881 2.06941 4.66563 C 2.02442 4.74244 2.00048 4.82975 2 4.91877 V 11.0813 C 2.00048 11.1703 2.02442 11.2576 2.06941 11.3344 C 2.1144 11.4112 2.17884 11.4748 2.25625 11.5188 L 7.75625 14.6125 C 7.83036 14.6553 7.91443 14.6778 8 14.6778 C 8.08557 14.6778 8.16964 14.6553 8.24375 14.6125 L 13.7437 11.5188 C 13.8212 11.4748 13.8856 11.4112 13.9306 11.3344 C 13.9756 11.2576 13.9995 11.1703 14 11.0813 V 11.0813 Z" />
      <path stroke="#293847" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" d="M 11.0625 9.53125 V 6.28125 L 5 2.9375" />
      <path stroke="#293847" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" d="M 13.9312 4.66254 L 8.05619 8.00004 L 2.0687 4.66254" />
      <path stroke="#293847" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" d="M 8.05625 8 L 8 14.675" />
    </svg>
  </div>
  <div className="c-price c-price--md c-price--mention" style={{ display: "none" }}>
    <span className="c-price__mention" />
  </div> */}
</div>
                                                </div>
                                                </div>
                                                    </div>
                                                    <div className="stack-item" style={{ paddingTop: 0 }}>
                                                        <div className="AffiliationArgumentaire">
                                                        <div className="Stack  stackRow " style={{
                                                            flexDirection: "row",
                                                            // padding: 20,
                                                            alignItems: "center"
                                                            }}>
                                                            <div className="Stack-child  " style={{ paddingLeft: 0 }}>
                                                            <div className="">
                                                                <svg id="icon-glasses-blue" viewBox="0 0 120 120" className='SvgIcon'>
                                                                    <g id="icon/large/glasses/icon-transfert-blue" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                                                                        <g id="icon/large/glasses/blue" transform="translate(2 10)">
                                                                        <path d="M58.5 47.372c1.86 0 3.645.408 5.274 1.14-.031.493-.074.985-.074 1.488 0 1.823.232 3.587.628 5.288a7.752 7.752 0 00-1.514-1.348A7.721 7.721 0 0058.5 52.63a7.792 7.792 0 00-5.842 2.667c.404-1.706.642-3.473.642-5.296l-.032-1.227c-.004-.087-.021-.174-.028-.26a12.81 12.81 0 015.26-1.141zm-48.75-.658c1.787 0 3.25 1.479 3.25 3.286s-1.463 3.286-3.25 3.286h-6.5C1.462 53.286 0 51.807 0 50s1.462-3.286 3.25-3.286h6.5zm104 0c1.787 0 3.25 1.479 3.25 3.286s-1.463 3.286-3.25 3.286h-6.5c-1.787 0-3.25-1.479-3.25-3.286s1.463-3.286 3.25-3.286h6.5z" id="Combined-Shape" fill="#0154c0" />
                                                                        <path d="M86.45 25.7c13.286 0 24.05 10.883 24.05 24.3 0 13.417-10.764 24.3-24.05 24.3C73.164 74.3 62.4 63.417 62.4 50c0-13.417 10.764-24.3 24.05-24.3zm-55.9 0C43.835 25.7 54.6 36.582 54.6 50c0 13.417-10.765 24.3-24.05 24.3C17.264 74.3 6.5 63.417 6.5 50c0-4.907 1.444-9.6 4.105-13.582a1.3 1.3 0 112.161 1.445A21.767 21.767 0 009.1 50c0 11.987 9.606 21.7 21.45 21.7C42.393 71.7 52 61.987 52 50c0-11.988-9.607-21.7-21.45-21.7-3.659 0-7.181.926-10.314 2.668a1.3 1.3 0 11-1.264-2.272A23.748 23.748 0 0130.55 25.7zm55.9 2.6C74.607 28.3 65 38.012 65 50s9.607 21.7 21.45 21.7S107.9 61.988 107.9 50s-9.607-21.7-21.45-21.7zM19.222 60.064a14.64 14.64 0 004.515 3.52 14.463 14.463 0 006.387 1.531 14.477 14.477 0 005.083-.88 1.3 1.3 0 11.89 2.442 17.083 17.083 0 01-5.991 1.038 17.039 17.039 0 01-10.508-3.705 17.411 17.411 0 01-2.342-2.244 1.3 1.3 0 111.966-1.702zm55.9 0a14.64 14.64 0 004.515 3.52 14.463 14.463 0 006.387 1.531 14.477 14.477 0 005.083-.88 1.3 1.3 0 11.89 2.442 17.083 17.083 0 01-5.991 1.038 17.039 17.039 0 01-10.508-3.705 17.411 17.411 0 01-2.342-2.244 1.3 1.3 0 111.966-1.702z" id="Combined-Shape" fill="#627A93" />
                                                                        <path d="M120.19 21.394l-7.168 4.138m-6.017-16.997l-3.236 7.618m-13.562-.178L87.46 8.167" id="Combined-Shape" stroke="#0154c0" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                                                                        </g>
                                                                    </g>
                                                                </svg>
                                                            </div>
                                                            </div>
                                                            <div className="Stack-child stack-item-text " >
                                                            <div> Analyse approfondie de votre projet et conseils pédagogiques sur mesure. </div>
                                                            </div>
                                                        </div>
                                                        </div>
                                                    </div>
                                                    <div className="stack-item" style={{ paddingTop: 0 }}>
                                                        <div className="AffiliationArgumentaire">
                                                        <div className="Stack  stackRow " style={{
                                                            flexDirection: "row",
                                                            //padding: 20,
                                                            alignItems: "center"
                                                            }}>
                                                            <div className="Stack-child  " style={{ paddingLeft: 0 }}>
                                                            <div className=""> 
                                                                <svg viewBox="0 0 120 120" className='SvgIcon' style={{marginRight: 10}}>
                                                                    <g id="02-Icons/large/chrono-fast/blue" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                                                                        <path d="M71.356 13.906h-22.86c-3.46 0-6.292 2.832-6.292 6.293 0 3.461 2.832 6.294 6.293 6.294h22.86c3.46 0 6.292-2.833 6.292-6.294 0-3.46-2.832-6.293-6.293-6.293" id="Fill-4" fill="#0154c0" />
                                                                        <path d="M59.926 32.946c-12.642 0-24.141 6.443-30.759 17.233a1.485 1.485 0 002.53 1.552c6.074-9.903 16.627-15.816 28.23-15.816 18.244 0 33.089 14.844 33.089 33.09 0 18.244-14.845 33.088-33.09 33.088-11.478 0-21.972-5.816-28.07-15.56a1.484 1.484 0 10-2.517 1.575c6.644 10.616 18.08 16.954 30.587 16.954 19.883 0 36.058-16.175 36.058-36.058 0-19.882-16.175-36.058-36.058-36.058zm3.175 48.172a1.486 1.486 0 011.841 1.008l2.645 9.036a1.483 1.483 0 11-2.85.834l-2.644-9.036a1.485 1.485 0 011.008-1.842zm8.316-7.341a1.485 1.485 0 011.93-.827l8.7 3.48a1.485 1.485 0 11-1.103 2.756l-8.7-3.479a1.486 1.486 0 01-.827-1.93zm8.963-17.331a1.483 1.483 0 012.027.543l.066.127c.314.688.06 1.514-.61 1.9l-9 5.194a1.485 1.485 0 01-1.484-2.571h.001zM63.446 46.064a1.485 1.485 0 012.878.732l-2.419 9.51a1.486 1.486 0 01-2.878-.733z" id="Shape" fill="#627A93" />
                                                                        <path d="M47.415 77.116a1.927 1.927 0 010 3.854h-28.78a1.927 1.927 0 010-3.854h28.78zm-7.707-10.039a1.927 1.927 0 010 3.854H10.927a1.927 1.927 0 010-3.854h28.78zm7.707-10.038a1.927 1.927 0 010 3.854h-28.78a1.927 1.927 0 010-3.854h28.78z" id="Combined-Shape" fill="#0154c0" />
                                                                    </g>
                                                                </svg>
                                                            </div>
                                                            </div>
                                                            <div className="stack-item-text">
                                                            <div>
                                                                {/* Préparation personnalisée et optimale de votre dossier de visa pour maximiser vos chances d'acceptation auprès de Campus France.  */}
                                                                Découvrez notre gamme complète de services adaptés à vous !
                                                            </div>
                                                            </div>
                                                        </div>
                                                        </div>
                                                    </div>
                                                    {/* <div className="stack-item" style={{ paddingTop: 0 }}>
                                                        <div className="AffiliationArgumentaire">
                                                        <div className="Stack  stackRow " style={{
                                                            flexDirection: "row",
                                                            //padding: 20,
                                                            alignItems: "center"
                                                            }}>
                                                            <div className="Stack-child  " style={{ paddingLeft: 0 }}>
                                                            <div className="">
                                                                <svg id="icon-glasses-blue" viewBox="0 0 120 120" className='SvgIcon'>
                                                                    <g id="icon/large/glasses/icon-transfert-blue" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                                                                        <g id="icon/large/glasses/blue" transform="translate(2 10)">
                                                                        <path d="M58.5 47.372c1.86 0 3.645.408 5.274 1.14-.031.493-.074.985-.074 1.488 0 1.823.232 3.587.628 5.288a7.752 7.752 0 00-1.514-1.348A7.721 7.721 0 0058.5 52.63a7.792 7.792 0 00-5.842 2.667c.404-1.706.642-3.473.642-5.296l-.032-1.227c-.004-.087-.021-.174-.028-.26a12.81 12.81 0 015.26-1.141zm-48.75-.658c1.787 0 3.25 1.479 3.25 3.286s-1.463 3.286-3.25 3.286h-6.5C1.462 53.286 0 51.807 0 50s1.462-3.286 3.25-3.286h6.5zm104 0c1.787 0 3.25 1.479 3.25 3.286s-1.463 3.286-3.25 3.286h-6.5c-1.787 0-3.25-1.479-3.25-3.286s1.463-3.286 3.25-3.286h6.5z" id="Combined-Shape" fill="#0154c0" />
                                                                        <path d="M86.45 25.7c13.286 0 24.05 10.883 24.05 24.3 0 13.417-10.764 24.3-24.05 24.3C73.164 74.3 62.4 63.417 62.4 50c0-13.417 10.764-24.3 24.05-24.3zm-55.9 0C43.835 25.7 54.6 36.582 54.6 50c0 13.417-10.765 24.3-24.05 24.3C17.264 74.3 6.5 63.417 6.5 50c0-4.907 1.444-9.6 4.105-13.582a1.3 1.3 0 112.161 1.445A21.767 21.767 0 009.1 50c0 11.987 9.606 21.7 21.45 21.7C42.393 71.7 52 61.987 52 50c0-11.988-9.607-21.7-21.45-21.7-3.659 0-7.181.926-10.314 2.668a1.3 1.3 0 11-1.264-2.272A23.748 23.748 0 0130.55 25.7zm55.9 2.6C74.607 28.3 65 38.012 65 50s9.607 21.7 21.45 21.7S107.9 61.988 107.9 50s-9.607-21.7-21.45-21.7zM19.222 60.064a14.64 14.64 0 004.515 3.52 14.463 14.463 0 006.387 1.531 14.477 14.477 0 005.083-.88 1.3 1.3 0 11.89 2.442 17.083 17.083 0 01-5.991 1.038 17.039 17.039 0 01-10.508-3.705 17.411 17.411 0 01-2.342-2.244 1.3 1.3 0 111.966-1.702zm55.9 0a14.64 14.64 0 004.515 3.52 14.463 14.463 0 006.387 1.531 14.477 14.477 0 005.083-.88 1.3 1.3 0 11.89 2.442 17.083 17.083 0 01-5.991 1.038 17.039 17.039 0 01-10.508-3.705 17.411 17.411 0 01-2.342-2.244 1.3 1.3 0 111.966-1.702z" id="Combined-Shape" fill="#627A93" />
                                                                        <path d="M120.19 21.394l-7.168 4.138m-6.017-16.997l-3.236 7.618m-13.562-.178L87.46 8.167" id="Combined-Shape" stroke="#0154c0" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                                                                        </g>
                                                                    </g>
                                                                </svg>
                                                            </div>
                                                            </div>
                                                            <div className="stack-item-text">
                                                            <div> Coaching pour l'entretien. Vous recevrez toutes les questions potentielles et des réponses  parfaitement élaborées pour briller lors du rendez-vous. </div>
                                                            </div>
                                                        </div>
                                                        </div>
                                                    </div> */}
                                                    </div>
                                                </div>
                                                </div>
                                            </div>
                                            <div className="Box   " style={{
                                                padding: 0,
                                                width: 190,
                                                borderWidth: "initial",
                                                borderStyle: "none",
                                                borderColor: "initial"
                                                }}>
                                                <div className="MerButton"> 
                                                <button type="button" className="CTA button primary xlarge userValidation" data-testid="mer-button-affiliation_sg1" style={{padding: 0}}>
                                                    <div className="PpsButton-children "> Être contacté </div>
                                                </button>
                                                </div>
                                            </div>
                                            <div className="bottom-line">
                                                <button className="ToggleExpand" style={{backgroundColor: "aliceblue", color: "rgb(42, 55, 117)"}}> Plus de détails <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M27.785 15.75l-.562-.53a.829.829 0 00-1.123 0l-6.592 6.226-6.59-6.226a.823.823 0 00-1.124 0l-.561.53a.721.721 0 000 1.061l7.714 7.286c.149.141.35.22.561.22a.82.82 0 00.563-.22l7.714-7.286a.73.73 0 00.233-.531.73.73 0 00-.233-.53" fillRule="evenodd" />
                                                </svg>
                                                </button>
                                            </div>
                                            </div>
                                            <div className="AffiliationDetails">
                                            <div className="DrawerAnimation" style={{ height: 0 }}>
                                                <div />
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
        </>
    );
};

export default SimulationResult;
