import React, { useState, useEffect, useRef } from 'react';
import Footer from '../components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { faCalendarCheck } from '@fortawesome/free-solid-svg-icons';
import alarmClock from '../assets/wired-gradient-236-alarm-clock.gif'
import { FloatingWhatsApp } from 'react-floating-whatsapp'
import SocialMediaLocgo from '../assets/social_media_logo.png'
import { ToastContainer, toast } from 'react-toastify'
import ImportantIcon from '../assets/panneau-davertissement.png'
import NextStep from '../assets/etape.png'
import Reminder from '../assets/twenty-four.png'
import Question from '../assets/question.png'
import Computer from '../assets/laptop.png'
import { useNavigate } from "react-router-dom"

const Congratulation = () => {
    const navigate = useNavigate()

    const goToHomePage= () => {
    navigate('/')
    }

return (
    <>
    
    <div className="containerWrapper">
    <div className=" fullContainer noTopMargin padding20-top padding20-bottom padding40H noBorder borderSolid border3px cornersAll radius0 shadow0 bgNoRepeat emptySection" id="section--30146-131" data-title="Section - Clone" data-block-color="0074C7" style={{ paddingTop: 10, paddingBottom: 10, outline: "none", backgroundColor: "#0154c0", marginTop: 0 }} data-trigger="none" data-animate="fade" data-delay={500} data-hide-on="desktop">
        <div className="containerInner ui-sortable">
        <div className="row bgCover noBorder borderSolid border3px cornersAll radius0 shadow0 P0-top P0-bottom P0H noTopMargin" id="row-177-121" data-trigger="none" data-animate="fade" data-delay={500} data-title="1 column row" style={{ paddingTop: 0, paddingBottom: 0, margin: 0, outline: "none" }}>
            <div id="col-full-144-108-188" className="col-md-12 innerContent col_left" data-col="full" data-trigger="none" data-animate="fade" data-delay={500} data-title="1st column" style={{ outline: "none" }}>
            <div className="col-inner bgCover  noBorder borderSolid border3px cornersAll radius0 shadow0 P0-top P0-bottom P0H noTopMargin" style={{ padding: "0 10px" }}>
                <div className="de elHeadlineWrapper ui-droppable de-editable" id="tmp_headline1-40033-131-170" data-de-type="headline" data-de-editing="false" data-title="headline" data-ce="true" data-trigger="none" data-animate="fade" data-delay={500} style={{ marginTop: 0, outline: "none", cursor: "pointer", fontFamily: "Montserrat, Helvetica, sans-serif !important" }} data-google-font="Montserrat" aria-disabled="false">
                <div className="Card__Text-sc-1qqjegm-5 iOmyQf" style={{ textAlign: "center", fontSize: 18, color: "white", borderColor: "rgb(214, 187, 135)", wordBreak: "break-word", position: "relative", zIndex: 0 }} data-bold="inherit" data-gramm="false" spellCheck="false" data-mci-spellchecked="true"> 
                Félicitations ! Vous êtes enregistré à la waitinglist, et votre inscription à la conférence est confirmée <p> POUR CE <b>DIMANCHE 5 NOVEMBRE À 20H30</b> (HEURE DE PARIS). </p>
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    </div>
    <div className="dropZoneForSections ui-droppable" style={{ display: "none" }}>
        <div className="dropIconr">
        <i className="fa fa-plus" />
        </div>
    </div>
    <div className=" fullContainer noTopMargin padding20-top padding20-bottom padding40H noBorder borderSolid border3px cornersAll radius0 shadow0 bgNoRepeat emptySection" id="section--30146-131-187" data-title="Section - Clone - Clone" data-block-color="0074C7" style={{ paddingTop: 10, paddingBottom: 10, outline: "none", backgroundColor: "#0154c0", marginTop: 0 }} data-trigger="none" data-animate="fade" data-delay={500} data-hide-on="mobile">
        <div className="containerInner ui-sortable">
        <div className=" bgCover noBorder borderSolid border3px cornersAll radius0 shadow0 P0-top P0-bottom P0H noTopMargin" id="row-177-121-103" data-trigger="none" data-animate="fade" data-delay={500} data-title="1 column row" style={{ paddingTop: 0, paddingBottom: 0, margin: 0, outline: "none" }}>
            <div id="col-full-144-108-188-178" className="col-md-12 innerContent col_left" data-col="full" data-trigger="none" data-animate="fade" data-delay={500} data-title="1st column" style={{ outline: "none" }}>
            <div className="col-inner bgCover  noBorder borderSolid border3px cornersAll radius0 shadow0 P0-top P0-bottom P0H noTopMargin" style={{ padding: "0 10px" }}>
                <div className="de elHeadlineWrapper ui-droppable de-editable" id="tmp_headline1-40033-131-170-187" data-de-type="headline" data-de-editing="false" data-title="headline" data-ce="true" data-trigger="none" data-animate="fade" data-delay={500} style={{ marginTop: 0, outline: "none", cursor: "pointer", fontFamily: "Montserrat, Helvetica, sans-serif !important" }} data-google-font="Montserrat" aria-disabled="false">
                <h1 className="ne elHeadline hsSize3 lh4 elMargin0 elBGStyle0 hsTextShadow0 mfs_16" style={{ textAlign: "center", fontSize: 18, color: "white", borderColor: "rgb(214, 187, 135)", wordBreak: "break-word", position: "relative", zIndex: 0 }} data-bold="inherit" data-gramm="false" spellCheck="false"> 
                FÉLICITATIONS !&nbsp; <div> VOTRE INSCRIPTION EST CONFIRMÉE <div>
                        <b>DIMANCHE 5 NOVEMBRE À 20H30</b>&nbsp;
                    </div>
                    </div>
                </h1>
                </div>
            </div>
            <mci-extension data-role="overlay" id="overlay-root" />
            </div>
        </div>
        </div>
    </div>
   
    
    </div>
    <div id="app-element-mountpoint">
    <div dir="ltr">
        <div>
        <div className="backgroundColor" style={{marginTop : 80}}>
            <main className="vx_container signup clear">
            <div className="seller_main css-1gyuotj-grid_container" data-ppui-info="grid_3.2.9" aria-label="Seller Tools Page">
                {/* <div className="st_pictogramDiv">
                    <img src={ImportantIcon} alt="accept-cards" className="st_pictogram" />
                </div> */}
                <div className="st__titleSection css-s8u2ug-row" data-ppui-info="grid_3.2.9">
                    <div className="css-1nhh7rf-col" data-ppui="true">
                    <h1 className="css-1aq3bmv-text_heading_lg" data-ppui-info="heading-text_6.5.1"> IMPORTANT ! </h1>
                    <div className=" css-16jt5za-text_body" data-ppui-info="body-text_6.5.1"> Vous allez recevoir dans quelques minutes par e-mail ou WhatsApp votre lien personnel pour vous connecter à la conférence. </div>
                    </div>
                </div>
            </div>
            <div className="seller_main css-1gyuotj-grid_container" data-ppui-info="grid_3.2.9" aria-label="Seller Tools Page">
                {/* <div className="st_pictogramDiv">
                    <img src={NextStep} alt="accept-cards" className="st_pictogram" />
                </div> */}
                <div className="st__titleSection css-s8u2ug-row" data-ppui-info="grid_3.2.9">
                    <div className="css-1nhh7rf-col" data-ppui="true">
                    <h1 className="css-1aq3bmv-text_heading_lg" data-ppui-info="heading-text_6.5.1"> PROCHAINES ÉTAPES  </h1>
                    <div className=" css-16jt5za-text_body" data-ppui-info="body-text_6.5.1"> Voilà ce que vous devez faire maintenant pour être sûr de ne rien manquer :</div>
                    </div>
                </div>
            </div>  
            <div className='fullContainer'>
                <div className='containerInner'>
                    <div className="row bgCover noBorder borderSolid border3px cornersAll radius0 shadow0 P0-top P0-bottom P0H noTopMargin" id="row--37489" data-trigger="none" data-animate="fade" data-delay={500} data-title="3 column row" style={{ padding: "20px 100px 25px", margin: "0px auto", outline: "none", backgroundColor: "rgba(255, 255, 255, 0)", width: "100%", maxWidth: "100%" }} data-hide-on="">
                        <div id="col-left-142-129" className="col-md-4 innerContent col_left ui-resizable" data-col="left" data-trigger="none" data-animate="fade" data-delay={500} data-title="1st column" style={{ outline: "none" }}>
                        <div className="col-inner bgCover noBorder borderSolid border3px cornersAll shadow0 P0-top P0-bottom P0H noTopMargin radius10" style={{ padding: 0, backgroundColor: "#faf8f5", width: "auto", marginLeft: 0, marginRight: 0 }}>
                            <div className="de elImageWrapper de-image-block elAlign_center elMargin0 ui-droppable de-editable" id="img-20239" data-de-type="img" data-de-editing="false" data-title="image" data-ce="false" data-trigger="none" data-animate="fade" data-delay={500} style={{ marginTop: 20, outline: "none", cursor: "pointer" }} data-hide-on="" aria-disabled="false">
                            {/* <img src={alarmClock} className="elIMG ximg" alt="" height={120} data-lazy-loading="false" tabIndex={0} /> */}
                            <img src={Reminder} className="elIMG ximg" alt="" height={120} data-lazy-loading="false" tabIndex={0} />
                            </div>
                            <div className="de elHeadlineWrapper ui-droppable de-editable" id="headline-70542" data-de-type="headline" data-de-editing="false" data-title="headline" data-ce="true" data-trigger="none" data-animate="fade" data-delay={500} style={{ marginTop: 0, outline: "none", cursor: "pointer", fontFamily: '"Open Sans", Helvetica, sans-serif !important' }} aria-disabled="false" data-google-font="Open+Sans" data-htype="content">
                            <h1 className="ne elHeadline hsSize3 lh4 elMargin0 elBGStyle0 hsTextShadow0 padding0" style={{ textAlign: "center", fontSize: 24, color: "#001435" }} data-bold="inherit" data-gramm="false">
                                <b>RAPPEL</b>
                            </h1>
                            </div>
                            <div className="de elHeadlineWrapper ui-droppable de-editable" id="tmp_paragraph-70078-182" data-de-type="headline" data-de-editing="false" data-title="Paragraph" data-ce="true" data-trigger="none" data-animate="fade" data-delay={500} style={{ marginTop: 5, outline: "none", cursor: "pointer", fontFamily: '"Open Sans", Helvetica, sans-serif !important' }} aria-disabled="false" data-google-font="Open+Sans">
                            <div className="ne elHeadline hsSize1 lh5 elMargin0 elBGStyle0 hsTextShadow0 padding15" data-bold="inherit" style={{ textAlign: "center", color: "#001435", fontSize: 20 }} data-gramm="false"> Ajoutez un rappel dans votre agenda. </div>
                            </div>
                            <div className="de elBTN elAlign_center elMargin0 ui-droppable de-editable" id="button-34906" data-de-type="button" data-de-editing="false" data-title="button" data-ce="false" data-trigger="none" data-animate="fade" data-delay={500} style={{ marginTop: 20, outline: "none", cursor: "pointer", fontFamily: '"Open Sans", Helvetica, sans-serif !important' }} aria-disabled="false" data-element-theme="customized" data-google-font="Open+Sans">
                            <a href="https://calendar.google.com/calendar/render?action=TEMPLATE&dates=20231105T193000Z%2F20231105T213000Z&details=D%C3%A9couvrez%20comment%20lancer%20votre%20business%20gr%C3%A2ce%20%C3%A0%20l%27intelligence%20artificielle.%0A%0A-%20Pourquoi%20l%E2%80%99intelligence%20artificielle%20peut%20aujourd%27hui%20permettre%20%C3%A0%20n%27importe%20qui%20de%20lancer%20un%20business%20%C3%A0%20succ%C3%A8s.%0A-%20Comment%20exploiter%20cette%20opportunit%C3%A9%20pour%20vous%20lancer%20en%20tant%20que%20freelance%2C%20coach%20ou%20cr%C3%A9er%20votre%20agence.%0A-%20Les%20outils%20d%E2%80%99IA%20%C3%A0%20conna%C3%AEtre%20imp%C3%A9rativement%20pour%20d%C3%A9cupler%20votre%20productivit%C3%A9.%0A%0ARendez-vous%20%C3%A0%2020h30%20sur%20ce%20lien%20%F0%9F%91%89%20https%3A%2F%2Fgo.mindeo.com%2Fconference-business-nov23-prelive&location=https%3A%2F%2Fgo.mindeo.com%2Fconference-business-nov23-prelive&text=Conf%C3%A9rence%20Business%3A%20Comment%20Lancer%20votre%20Business%20gr%C3%A2ce%20%C3%A0%20l%27intelligence%20artificielle" className="elButton elButtonSize1 elButtonColor1 elButtonPadding2 elBtnVP_10 elButtonCorner60 elButtonFluid elButtonTxtColor1 elBTN_b_none elButtonShadowFlatHighlight elBTNone elButtonBlock elBtnHP_15" style={{ color: "white", background: "#0154c0", fontSize: 16 }} rel="noopener noreferrer" target="_blank" id="undefined-610">
                            <span className="elButtonMain">
                                <FontAwesomeIcon icon={faCalendarCheck} />
                                {/* <i className="fa_prepended far fa-calendar-check" /> */}
                                <span> AJOUTER AU CALENDRIER</span> </span>
                                <span className="elButtonSub" />
                            </a>
                            </div>
                            <div className="de elSeperator elMargin0 ui-droppable de-editable" id="divider-75344" data-de-type="divider" data-de-editing="false" data-title="Divider" data-ce="false" data-trigger="none" data-animate="fade" data-delay={500} style={{ marginTop: 0, outline: "none", cursor: "pointer" }} aria-disabled="false">
                            <div className="elDivider elDividerStyle1 elDividerShadow0 padding20-top padding0-bottom">
                                <div className="elDividerInner" data-width-border={10} data-height-border={1} style={{ borderColor: "#001435" }} data-align="center" />
                            </div>
                            </div>
                        </div>
                        </div>
                        <div id="col-center-137-184" className="col-md-4 innerContent col_right ui-resizable" data-col="center" data-trigger="none" data-animate="fade" data-delay={500} data-title="2nd column" style={{ outline: "none" }}>
                        <div className="col-inner bgCover noBorder borderSolid border3px cornersAll shadow0 P0-top P0-bottom P0H noTopMargin radius10" style={{ padding: 0, backgroundColor: "#faf8f5" }}>
                            <div className="de elImageWrapper de-image-block elAlign_center elMargin0 ui-droppable de-editable" id="img-13766" data-de-type="img" data-de-editing="false" data-title="image" data-ce="false" data-trigger="none" data-animate="fade" data-delay={500} style={{ marginTop: 20, outline: "none", cursor: "pointer" }} data-hide-on="" aria-disabled="false">
                            <img src={Question} className="elIMG ximg" alt="" height={120} data-lazy-loading="false" tabIndex={0} />
                            </div>
                            <div className="de elHeadlineWrapper ui-droppable de-editable" id="headline-41235" data-de-type="headline" data-de-editing="false" data-title="headline" data-ce="true" data-trigger="none" data-animate="fade" data-delay={500} style={{ marginTop: 0, outline: "none", cursor: "pointer", fontFamily: '"Open Sans", Helvetica, sans-serif !important' }} aria-disabled="false" data-google-font="Open+Sans">
                            <h1 className="ne elHeadline hsSize3 lh4 elMargin0 elBGStyle0 hsTextShadow0" style={{ textAlign: "center", fontSize: 24, color: "#001435" }} data-bold="inherit" data-gramm="false">
                                <b>QUESTIONS</b>
                            </h1>
                            </div>
                            {/* <div className="de elImageWrapper de-image-block elAlign_center elMargin0 ui-droppable de-editable" id="img-38343" data-de-type="img" data-de-editing="false" data-title="image" data-ce="false" data-trigger="none" data-animate="fade" data-delay={500} style={{ marginTop: 25, outline: "none", cursor: "pointer" }} data-hide-on="mobile" aria-disabled="false">
                            <img src="https://go.mindeo.com/hosted/images/87/0c46e9d40c4d8188369e1a18420da7/Add-Email-to-Contacts.gif" className="elIMG ximg" alt="" height={120} data-lazy-loading="false" tabIndex={0} />
                            </div> */}
                            <div className="de elHeadlineWrapper ui-droppable de-editable" id="headline-94483-152" data-de-type="headline" data-de-editing="false" data-title="Paragraph" data-ce="true" data-trigger="none" data-animate="fade" data-delay={500} style={{ marginTop: 5, outline: "none", cursor: "pointer", fontFamily: '"Open Sans", Helvetica, sans-serif !important' }} aria-disabled="false" data-google-font="Open+Sans">
                            <div className="ne elHeadline hsSize1 lh5 elMargin0 elBGStyle0 hsTextShadow0 padding15" data-bold="inherit" style={{ textAlign: "center", color: "#001435", fontSize: 20 }} data-gramm="false"> Préparez une liste de questions que vous pourrez me poser le Jour J pendant la foire aux questions. </div>
                            </div>
                            <div className="de elSeperator elMargin0 ui-droppable de-editable" id="divider-91222-179" data-de-type="divider" data-de-editing="false" data-title="Divider" data-ce="false" data-trigger="none" data-animate="fade" data-delay={500} style={{ marginTop: 0, outline: "none", cursor: "pointer" }} aria-disabled="false">
                            <div className="elDivider elDividerStyle1 elDividerShadow0 padding20-top padding0-bottom">
                                <div className="elDividerInner" data-width-border={10} data-height-border={1} style={{ borderColor: "#001435" }} data-align="center" />
                            </div>
                            </div>
                        </div>
                        </div>
                        <div id="col-right-131-129" className="col-md-4 innerContent col_right ui-resizable" data-col="right" data-trigger="none" data-animate="fade" data-delay={500} data-title="3rd Column" style={{ outline: "none" }}>
                        <div className="col-inner bgCover noBorder borderSolid border3px cornersAll shadow0 P0-top P0-bottom P0H noTopMargin radius10" style={{ padding: 0, backgroundColor: "#faf8f5" }}>
                            <div className="de elImageWrapper de-image-block elAlign_center elMargin0 ui-droppable de-editable" id="img-22828" data-de-type="img" data-de-editing="false" data-title="image" data-ce="false" data-trigger="none" data-animate="fade" data-delay={500} style={{ marginTop: 20, outline: "none", cursor: "pointer" }} data-hide-on="" aria-disabled="false">
                            <img src={Computer} className="elIMG ximg" alt="" height="" data-lazy-loading="false" width={120} tabIndex={0} />
                            </div>
                            <div className="de elHeadlineWrapper ui-droppable de-editable" id="tmp_headline1-27838" data-de-type="headline" data-de-editing="false" data-title="headline" data-ce="true" data-trigger="none" data-animate="fade" data-delay={500} style={{ marginTop: 0, outline: "none", cursor: "pointer", fontFamily: '"Open Sans", Helvetica, sans-serif !important' }} aria-disabled="false" data-google-font="Open+Sans">
                            <h1 className="ne elHeadline hsSize3 lh4 elMargin0 elBGStyle0 hsTextShadow0" style={{ textAlign: "center", fontSize: 24, color: "#001435" }} data-bold="inherit" data-gramm="false">
                                <b>ORDINATEUR</b>
                            </h1>
                            </div>
                            {/* <div className="de elImageWrapper de-image-block elAlign_center elMargin0 ui-droppable de-editable" id="img-85242" data-de-type="img" data-de-editing="false" data-title="image" data-ce="false" data-trigger="none" data-animate="fade" data-delay={500} style={{ marginTop: 25, outline: "none", cursor: "pointer" }} data-hide-on="mobile" aria-disabled="false">
                            <img src="https://go.mindeo.com/hosted/images/d4/8374e27b304c459fc2909ee59917d2/visio-julien-diop_low.jpg" className="elIMG ximg" alt="" height={120} data-lazy-loading="false" tabIndex={0} />
                            </div> */}
                            <div className="de elHeadlineWrapper ui-droppable de-editable" id="headline-89959-146" data-de-type="headline" data-de-editing="false" data-title="Paragraph" data-ce="true" data-trigger="none" data-animate="fade" data-delay={500} style={{ marginTop: 5, outline: "none", cursor: "pointer", fontFamily: '"Open Sans", Helvetica, sans-serif !important' }} aria-disabled="false" data-google-font="Open+Sans">
                            <div className="ne elHeadline hsSize1 lh5 elMargin0 elBGStyle0 hsTextShadow0 padding15" data-bold="inherit" style={{ textAlign: "center", color: "#001435", fontSize: 20 }} data-gramm="false"> Connectez-vous avec un ordinateur pour bénéficier pleinement de la conférence et du chat. </div>
                            </div>
                            <div className="de elSeperator elMargin0 ui-droppable de-editable" id="divider-30800-110" data-de-type="divider" data-de-editing="false" data-title="Divider" data-ce="false" data-trigger="none" data-animate="fade" data-delay={500} style={{ marginTop: 0, outline: "none", cursor: "pointer" }} aria-disabled="false">
                            <div className="elDivider elDividerStyle1 elDividerShadow0 padding20-top padding0-bottom">
                                <div className="elDividerInner" data-width-border={10} data-height-border={1} style={{ borderColor: "#001435" }} data-align="center" />
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>   
                </div>   
            </div>     
            <div>
                <div >
                <noscript> &lt;div style="margin-bottom:1rem"&gt;&lt;div role="alert" class="pp-cons-invj57-alert_base-text_body-error-no_close_btn" data-ppui-info="alert_3.1.19"&gt;&lt;span class="pp-cons-6gus2s-svg-size_sm-svg_icon-error_icon" data-ppui-info="icons_8.13.0" role="img" aria-label="error" data-ppui="true"&gt;&lt;svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" width="1em" height="1em" data-ppui="true"&gt;&lt;path fill-rule="evenodd" d="M11.105 3.554a1 1 0 0 1 1.79 0l7.498 14.998a1 1 0 0 1-.895 1.447H4.502a1 1 0 0 1-.895-1.447l7.498-14.998zm.384 10.96h1.02c.168 0 .276-.096.288-.264.018-.428.042-.85.067-1.28.055-.98.113-2.002.113-3.244v-.948c0-.18-.096-.276-.276-.276h-1.404c-.18 0-.277.096-.277.276v.948c0 1.242.058 2.264.114 3.243.024.43.048.853.066 1.281.013.168.12.264.289.264zm.51 3.486A1 1 0 1 0 12 16a1 1 0 0 0 0 2z" clip-rule="evenodd" data-ppui="true"&gt;&lt;/path&gt;&lt;/svg&gt;&lt;/span&gt;&lt;span class="inherit_stylesV2 globalNotification" data-automation-id="global_notification_error"&gt;Vous devez activer JavaScript et les cookies pour accéder à la plupart des nouvelles fonctionnalités PayPal. Rendez-vous dans les paramètres de votre navigateur Internet.&lt;/span&gt;&lt;/div&gt;&lt;/div&gt; </noscript>
                <div className="componentVisible">
                    <div >
                    <form id="PageMainForm"  method="POST">
                        <fieldset style={{ border: "none", margin: 0, padding: 0 }}>
                        <div>
                            <div className=" pp-cons-1jdwb3y-container_form" data-ppui-info="grid_3.2.9">
                            <div className="pp-cons-1v26bvb-row-justify_content_center" data-ppui-info="grid_3.2.9">
                                <div className=" pp-cons-1aqxtsc-col_form_full" align="center" data-ppui="true">
                                <div>
                                    {/* 
                                    <div className="rowContainerStyle pp-cons-s8u2ug-row" data-ppui-info="grid_3.2.9">
                                    <div className="styleNoPadding pp-cons-1nhh7rf-col" data-ppui="true">
                                        <div className="styleNoPadding pp-cons-1djyuxb-container_fluid" data-ppui-info="grid_3.2.9">
                                        <div className="rowStyle pp-cons-s8u2ug-row" data-ppui-info="grid_3.2.9" style={{ marginTop: "0.5rem" }}>
                                            <div className="containerColStyle pp-cons-16univs-col_8" data-ppui="true">
                                            <div className="pp-cons-s8u2ug-row" data-ppui-info="grid_3.2.9">
                                                <div className="rowTitleStyle pp-cons-1yo2lxy-text_body_strong" data-ppui-info="body-text_6.5.1">
                                                    <span className="inherit_stylesV2"> Paiement ultra-rapide </span>
                                                </div>
                                                <div className="rowDescriptionStyle pp-cons-151vsl0-text_caption" data-ppui-info="caption-text_6.5.1">
                                                <span className="inherit_stylesV2"> Vous pouvez ignorer les formulaires et payer en quelques secondes. </span>
                                                </div>
                                            </div>
                                            </div>
                                            <div className="colNoPaddingRight pp-cons-1ydkznc-col_4" data-ppui="true">
                                            <span style={{ backgroundImage: 'url("https://www.paypalobjects.com/paypal-ui/pictograms/multicolored/svg//basket-checkmark.svg")', height: "8rem", width: "8rem" }} className="imageStyle" />
                                            </div>
                                        </div>
                                        <div className="rowStyle pp-cons-s8u2ug-row" data-ppui-info="grid_3.2.9" style={{ marginTop: "0.75rem" }}>
                                            <div className="containerColStyle pp-cons-16univs-col_8" data-ppui="true">
                                            <div className="pp-cons-s8u2ug-row" data-ppui-info="grid_3.2.9">
                                                <div className="rowTitleStyle pp-cons-1yo2lxy-text_body_strong" data-ppui-info="body-text_6.5.1">
                                                <span className="inherit_stylesV2"> Payez plus tard </span>
                                                </div>
                                                <div className="rowDescriptionStyle pp-cons-151vsl0-text_caption" data-ppui-info="caption-text_6.5.1">
                                                <span className="inherit_stylesV2"> Plus de temps pour payer vos achats sans frais grâce à PayPal Pay in 4. </span>
                                                <a className="btn vx_btn vx_btn-secondary vx_btn-medium pp-cons-bi6b71-links_base-text_body_strong" data-ppui-info="links_4.3.3" style={{ fontSize: "1.125rem", lineHeight: "1.25rem", letterSpacing: "0em", textAlign: "left", color: "#1072EB" }} align="start" id="" target="_self" aria-label="" href="#" pa-marked={1}> {" "} En savoir plus </a>
                                                </div>
                                            </div>
                                            </div>
                                            <div className="colNoPaddingRight pp-cons-1ydkznc-col_4" data-ppui="true">
                                            <span style={{ backgroundImage: 'url("https://www.paypalobjects.com/paypal-ui/pictograms/multicolored/svg//installments.svg")', height: "8rem", width: "8rem" }} className="imageStyle" />
                                            </div>
                                        </div>
                                        <div className="rowStyle pp-cons-s8u2ug-row" data-ppui-info="grid_3.2.9" style={{ marginTop: "0.75rem" }}>
                                            <div className="containerColStyle pp-cons-16univs-col_8" data-ppui="true">
                                            <div className="pp-cons-s8u2ug-row" data-ppui-info="grid_3.2.9">
                                                <div className="rowTitleStyle pp-cons-1yo2lxy-text_body_strong" data-ppui-info="body-text_6.5.1">
                                                <span className="inherit_stylesV2"> Achetez avec une protection </span>
                                                </div>
                                                <div className="rowDescriptionStyle pp-cons-151vsl0-text_caption" data-ppui-info="caption-text_6.5.1">
                                                <span className="inherit_stylesV2"> Obtenez un remboursement intégral si un achat éligible ne correspond pas à ce que vous avez payé.{" "} <sup style={{ fontSize: "75%", lineHeight: 0, position: "relative", verticalAlign: "baseline", top: "-0.5em" }}> * </sup>
                                                </span>
                                                <a className="btn vx_btn vx_btn-secondary vx_btn-medium pp-cons-bi6b71-links_base-text_body_strong" data-ppui-info="links_4.3.3" style={{ fontSize: "1.125rem", lineHeight: "1.25rem", letterSpacing: "0em", textAlign: "left", color: "#1072EB" }} align="start" id="" target="_self" aria-label="" href="#" pa-marked={1}> {" "} En savoir plus </a>
                                                </div>
                                            </div>
                                            </div>
                                            <div className="colNoPaddingRight pp-cons-1ydkznc-col_4" data-ppui="true">
                                            <span style={{ backgroundImage: 'url("https://www.paypalobjects.com/paypal-ui/pictograms/multicolored/svg//purchase-protection.svg")', height: "8rem", width: "8rem" }} className="imageStyle" />
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                    </div> */}
                                    <div>
                                    <div className="pp-cons-s8u2ug-row" data-ppui-info="grid_3.2.9">
                                        <div className="pp-cons-13xeeyi-col_12" style={{ paddingLeft: "3rem", paddingRight: "3rem", marginTop: "-0.5rem" }} data-ppui="true">
                                        <button onClick={() => goToHomePage()}  className="pp-cons-ylhy9c-button_base-text_button_lg-btn_full_width" data-ppui-info="buttons_7.5.4" id="paypalUpgradeData_submitBtn" data-automation-id="go-to-home" style={{ minWidth: "18rem", marginTop: "1.5rem" }} type="button" pa-marked={1}> Continuer vers l'Accueil </button>
                                        
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        <input type="hidden" name="_csrf" defaultValue="sRzOg0XimA5o12vA/dH6trN7b5nNB1cbsOUIs=" />
                        </fieldset>
                    </form>
                    </div>
                </div>
                <div id="injectedUnifiedLogin" style={{ height: 0, width: 0, visibility: "hidden", overFlow: "hidden" }} />
                </div>
            </div>
            </main>
            <div className="componentVisible">
            <footer className="footerSingleRow undefined pp-cons-1djyuxb-container_fluid" data-ppui-info="grid_3.2.9">
                <div className="pp-cons-1v26bvb-row-justify_content_center" data-ppui-info="grid_3.2.9" style={{ alignItems: "center" }}>
                <div className="pp-cons-e1de2j-col_sm_12" align="center" style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center" }} data-ppui="true">
                    <span className="pp-cons-151vsl0-text_caption" data-ppui-info="caption-text_6.5.1" style={{ color: "#545d68", marginRight: "0.25rem" }}> © 2023 PayPal </span>
                    <a className="pp-cons-19otlvw-links_base-text_body_strong-secondary-text_body_strong" data-ppui-info="links_4.3.3" href="/privacy-center" target="_blank" style={{ color: "#000000", padding: "0 0.15rem", margin: "0 0.15rem" }} rel="noreferrer noopener" pa-marked={1}>
                    <span className="pp-cons-1dky7y7-text_caption_strong" data-ppui-info="caption-text_6.5.1" style={{ lineHeight: "1.5rem" }}> Respect de la vie privée </span>
                    </a>
                    <a className="pp-cons-19otlvw-links_base-text_body_strong-secondary-text_body_strong" data-ppui-info="links_4.3.3" href="/myaccount/privacy/cookiePrefs" target="_blank" style={{ color: "#000000", padding: "0 0.15rem", margin: "0 0.15rem" }} rel="noreferrer noopener" pa-marked={1}>
                    <span className="pp-cons-1dky7y7-text_caption_strong" data-ppui-info="caption-text_6.5.1" style={{ lineHeight: "1.5rem" }}> Cookies </span>
                    </a>
                    <a className="pp-cons-19otlvw-links_base-text_body_strong-secondary-text_body_strong" data-ppui-info="links_4.3.3" href="/webapps/mpp/ua/legalhub-full" target="_blank" style={{ color: "#000000", padding: "0 0.15rem", margin: "0 0.15rem" }} rel="noreferrer noopener" pa-marked={1}>
                    <span className="pp-cons-1dky7y7-text_caption_strong" data-ppui-info="caption-text_6.5.1" style={{ lineHeight: "1.5rem" }}> Contrats d'utilisation </span>
                    </a>
                    <a className="pp-cons-19otlvw-links_base-text_body_strong-secondary-text_body_strong" data-ppui-info="links_4.3.3" href="/webapps/helpcenter/helphub/home" target="_blank" style={{ color: "#000000", padding: "0 0.15rem", margin: "0 0.15rem" }} rel="noreferrer noopener" pa-marked={1}>
                    <span className="pp-cons-1dky7y7-text_caption_strong" data-ppui-info="caption-text_6.5.1" style={{ lineHeight: "1.5rem" }}> Contact </span>
                    </a>
                </div>
                </div>
            </footer>
            </div>
            <noscript> &lt;img src="https://c.paypal.com/v1/r/d/b/ns?f=c9eaa5f0821011eea5b4a98a5c51d0df&amp;s=t_s&amp;js=0&amp;r=1"/&gt; </noscript>
            <noscript> &lt;img src=https://t.paypal.com/ts?nojs=1&amp;pgst=Unknown&amp;calc=f593972e444ee&amp;nsid=1EMLwW_wGc9amFnm8RzsfsKO2zsoGmDv&amp;rsta=fr_FR&amp;pgtf=Nodejs&amp;env=live&amp;s=ci&amp;ccpg=fr&amp;csci=e41fdcda603e44bbbee43bc46802470b&amp;comp=progressivenodeweb&amp;tsrce=ppme&amp;cu=0&amp;ef_policy=gdpr_v2.1&amp;c_prefs=T%3D0%2CP%3D0%2CF%3D0%2Ctype%3Dinitial&amp;cust=W6DM6LRRUK882&amp;party_id=W6DM6LRRUK882&amp;acnt=premier&amp;aver=unverified&amp;rstr=unrestricted&amp;cnac=FR&amp;product=onboarding&amp;intent=&amp;event_props=event_name%2Cxe%2Cxt%2Cccpg%2Cpros%2Caccount_country%2Cintent%2Cbrowser_type%2Cevent_source%2Ceccd%2Csheet_type%2Ctax_residency%2Cweblls_optin_elg%2Cweblls_optin_inelg_reason%2Cflow_name%2Cintegration_identifier%2Cemail_confirmed%2Cfield_name&amp;pros=0&amp;pgld=Unknown&amp;bzsr=main&amp;bchn=mktg&amp;pgsf=personal&amp;lgin=in&amp;shir=main_mktg_personal_&amp;lgcook=0 alt="" height="1" width="1"/&gt; </noscript>
        </div>
        <div>
            <span className="inherit_stylesV2">
            <div id="gdprCookieBanner" className="gdprCookieBanner_container" style={{ display: "none" }}>
                <div id="gdprCookieContent_wrapper" className="gdprCookieBanner_content-container" style={{ display: "none" }}>
                <p className="gdprCookieBanner_content"> Si vous acceptez les cookies, nous les utiliserons pour améliorer votre expérience et permettre à nos partenaires de vous présenter des publicités PayPal personnalisées lorsque vous visitez d'autres sites.{" "} <a id="manageCookiesLink" href="https://www.paypal.com/myaccount/privacy/cookiePrefs?locale=fr_FR" pagename="Ouvrir un compte Particulier ou Professionnel PayPal|managecookies" pa-marked={1}> En savoir plus et gérer les cookies </a>
                </p>
                </div>
                <div className="gdprCookieBanner_content-separator" />
                <div className="gdprCookieBanner_buttonGroup">
                <button id="acceptAllButton" className="gdprCookieBanner_button" pagename="Ouvrir un compte Particulier ou Professionnel PayPal|acceptcookies" pa-marked={1}> Accepter </button>
                <div className="gdprCookieBanner_button-separator" />
                <button id="bannerDeclineButton" className="gdprCookieBanner_button gdprCookieBanner_decline-button" pa-marked={1}> Refuser </button>
                </div>
            </div>
            <style nonce="" dangerouslySetInnerHTML={{ __html: "@font-face { font-family: \"PayPalSansBig-Regular\"; font-style: normal; font-display: swap; src: url('https://www.paypalobjects.com/paypal-ui/fonts/PayPalSansBig-Regular.woff2') format('woff2'), url('https://www.paypalobjects.com/paypal-ui/fonts/PayPalSansBig-Regular.woff') format('woff'), url('https://www.paypalobjects.com/paypal-ui/fonts/PayPalSansBig-Regular.eot?#iefix') format('embedded-opentype'), url('https://www.paypalobjects.com/paypal-ui/fonts/PayPalSansBig-Regular.svg') format('svg'); } #gdprCookieBanner { font-family: PayPalSansBig-Regular, sans-serif; } @keyframes slideInFromBottom { 0% { transform: translateY(100%); opacity: 0; } 100% { transform: translateY(0); opacity: 1; } } #gdprCookieBanner.gdprCookieBanner_container { box-sizing: border-box; animation: 1s ease-in 0s 1 slideInFromBottom; max-width: 84%; position: fixed; top: auto; bottom: 2rem; left: 0; right: 0; margin: 0 auto; background-color: #FFFFFF; z-index: 1051; display: flex; align-items: center; justify-content: space-between; box-shadow: 0px 12px 28px rgb(0 0 0 / 16%); border-radius: 12px; padding: 1rem 5rem; } #gdprCookieBanner.gdprCookieBanner_container * { box-sizing: border-box; } #gdprCookieBanner.gdprCookieBanner_rtl { direction: rtl; } #gdprCookieBanner .gdprCookieBanner_content { color: #000000; font-family: 'PayPalSansBig-Regular'; font-size: 14px; line-height: 20px; margin: 0; padding: 0; } #gdprCookieBanner .gdprCookieBanner_content a { text-decoration: underline; color: #0070ba; font-family: PayPalSansBig-Regular; font-weight: 500; } #gdprCookieBanner .gdprCookieBanner_buttonGroup { display: flex; flex-direction: column; } #gdprCookieBanner .gdprCookieBanner_content a:focus, #gdprCookieBanner .gdprCookieBanner_buttonGroup button:focus { border: 1px solid #0070BA; } #gdprCookieBanner button.gdprCookieBanner_button { font-size: 14px; line-height: 24px; font-weight: 600; color: #0070BA; background: #FFFFFF; border: 1px solid #0070BA; border-radius: 24px; min-width: 6rem; min-height: 2rem; cursor: pointer; padding: 0px 1.5rem; } #gdprCookieBanner .gdprCookieBanner_content-separator { margin: 0 2rem; } #gdprCookieBanner .gdprCookieBanner_button-separator { margin: 0.25rem 0rem; } #gdprCookieBanner .gdprCookieBanner-acceptedAll { height: auto; padding-bottom: 8em; } @media only screen and (max-width: 768px) { #gdprCookieBanner.gdprCookieBanner_container{ max-width: 92%; flex-direction: column; bottom: 1rem; padding: 0.75rem 1.25rem; } #gdprCookieBanner .gdprCookieBanner_content-separator { margin: 0.375rem 0; } #gdprCookieBanner .gdprCookieBanner_button-separator { margin: 0 0.625rem; } #gdprCookieBanner .gdprCookieBanner_buttonGroup { justify-content: center; flex-direction: row-reverse; } #gdprCookieBanner button.gdprCookieBanner_button { min-width: 8.375rem; } } @media only screen and (max-width: 600px) { #gdprCookieBanner .gdprCookieBanner-acceptedAll { height: auto; padding-bottom: 12em; } } @media only screen and (max-width: 575.98px) { #gdprCookieBanner .gdprHideCookieBannerMobile { display:none; } }" }} />
            </span>
            <div id="cookie-banner-script-wrapper" />
        </div>
        </div>
    </div>
    </div>
    <FloatingWhatsApp phoneNumber="330755097584" accountName="Wendogo" avatar={SocialMediaLocgo} statusMessage="Répond en général dans les 24h" 
                        chatMessage={'Salut toi 🤝 \nUne question ? \nPour mieux t\'aider et pour une prompte réponse, fait ceci \n1. Présentes toi\n2. Donnes l\'objet de ton message \n3. Décris clairement ton problème 😉'}
                        placeholder={"Racontes nous ce qui te préoccupe"} chatboxHeight={500} CSSProperties={{color:'#001435'}}/>
    </>
    )
}

export default Congratulation;
