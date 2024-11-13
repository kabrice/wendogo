import React from 'react';
import { useEffect, useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarCheck } from '@fortawesome/free-solid-svg-icons';
import { FloatingWhatsApp } from 'react-floating-whatsapp'
import SocialMediaLogo from '../assets/social_media_logo.png'
import Reminder from '../assets/twenty-seven.png'
import Question from '../assets/question.png'
import Computer from '../assets/laptop.png'
import { useRouter } from 'next/router'
import Confetti from 'react-confetti'
import useWindowSize from 'react-use/lib/useWindowSize'
import FooterSingleRow from '../components/FooterSingleRow';

const Congratulation = () => {
    const router = useRouter()

    const goToHomePage= () => {
    router.push('/')
    }
    const { width, height } = useWindowSize()
    const [opacityStyle, setOpacityStyle] = useState({ opacity: 0 })

    useEffect(() => {
        const interval = setInterval(() => {
            setOpacityStyle(prevStyle => {
                const newOpacity = prevStyle.opacity + 0.1;
                if (newOpacity >= 1) {
                    clearInterval(interval);
                }
                return { opacity: newOpacity, transition: 'opacity 1s ease-out' };
            });
        }, 100);

        return () => {
            clearInterval(interval);
        };
    }, []);   

    return (
        <>
        
        <div className="containerWrapper"><Confetti recycle={false}  width={width} height={height}/>
        <div className=" fullContainer noTopMargin padding20-top padding20-bottom padding40H noBorder borderSolid border3px cornersAll radius0 shadow0 bgNoRepeat emptySection" id="section--30146-131" data-title="Section - Clone" data-block-color="0074C7" style={{ paddingTop: 10, paddingBottom: 10, outline: "none", backgroundColor: "#0154c0", marginTop: 0 }} data-trigger="none" data-animate="fade" data-delay={500} data-hide-on="desktop">
            <div className="containerInner ui-sortable">
            <div className="row bgCover noBorder borderSolid border3px cornersAll radius0 shadow0 P0-top P0-bottom P0H noTopMargin" id="row-177-121" data-trigger="none" data-animate="fade" data-delay={500} data-title="1 column row" style={{ paddingTop: 0, paddingBottom: 0, margin: 0, outline: "none" }}>
                <div id="col-full-144-108-188" className="col-md-12 innerContent col_left" data-col="full" data-trigger="none" data-animate="fade" data-delay={500} data-title="1st column" style={{ outline: "none" }}>
                <div className="col-inner bgCover  noBorder borderSolid border3px cornersAll radius0 shadow0 P0-top P0-bottom P0H noTopMargin" style={{ padding: "0 10px" }}>
                    <div className="de elHeadlineWrapper ui-droppable de-editable" id="tmp_headline1-40033-131-170" data-de-type="headline" data-de-editing="false" data-title="headline" data-ce="true" data-trigger="none" data-animate="fade" data-delay={500} style={{ marginTop: 0, outline: "none", cursor: "pointer", fontFamily: "Montserrat, Helvetica, sans-serif !important" }} data-google-font="Montserrat" aria-disabled="false">
                    <div className="Card__Text-sc-1qqjegm-5 iOmyQf" style={{ textAlign: "center", fontSize: 18, color: "white", borderColor: "rgb(214, 187, 135)", wordBreak: "break-word", position: "relative", zIndex: 0 }} data-bold="inherit" data-gramm="false" spellCheck="false" data-mci-spellchecked="true"> 
                    Félicitations ! Vous êtes enregistré à la waitinglist, et votre inscription à la conférence est confirmée <p> POUR CE <b>SAMEDI 27 AVRIL À 20H30</b> (HEURE DE YAOUNDE). </p>
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
                            <b>SAMEDI 27 AVRIL À 20H30</b>&nbsp;
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
        <div dir="ltr" style={opacityStyle}>
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
                        <div className=" css-16jt5za-text_body" data-ppui-info="body-text_6.5.1"> Sous 24 heures, vous recevrez par e-mail ou WhatsApp votre lien personnel vous permettant de vous connecter à la conférence. </div>
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
                            <div className="col-inner bgCover noBorder borderSolid border3px cornersAll shadow0 P0-top P0-bottom P0H noTopMargin radius10" style={{ padding: 0, backgroundColor: "#d6d6d6", width: "auto", marginLeft: 0, marginRight: 0 }}>
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
                                <a href="https://calendar.google.com/calendar/event?action=TEMPLATE&tmeid=M2U3MzJkNGlvZTZvOTdjNmNmdTFza21pOXQgaGVsbG8ud2VuZG9nb0Bt&tmsrc=hello.wendogo%40gmail.com" className="elButton elButtonSize1 elButtonColor1 elButtonPadding2 elBtnVP_10 elButtonCorner60 elButtonFluid elButtonTxtColor1 elBTN_b_none elButtonShadowFlatHighlight elBTNone elButtonBlock elBtnHP_15" style={{ color: "white", background: "#0154c0", fontSize: 16 }} rel="noopener noreferrer" target="_blank" id="undefined-610">
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
                            <div className="col-inner bgCover noBorder borderSolid border3px cornersAll shadow0 P0-top P0-bottom P0H noTopMargin radius10" style={{ padding: 0, backgroundColor: "#d6d6d6" }}>
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
                            <div className="col-inner bgCover noBorder borderSolid border3px cornersAll shadow0 P0-top P0-bottom P0H noTopMargin radius10" style={{ padding: 0, backgroundColor: "#d6d6d6" }}>
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
                <div className="componentVisible" style={{marginTop: 75}}>
                <FooterSingleRow/>
                </div>
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
                </span>
                <div id="cookie-banner-script-wrapper" />
            </div>
            </div>
        </div>
        </div>
        <FloatingWhatsApp phoneNumber="330745493086" accountName="Wendogo" avatar={SocialMediaLogo} statusMessage="Répond en général dans l'heure" 
                            chatMessage={'Salut toi 🤝 \nSi tu as une question, suis ces étapes pour obtenir une assistance rapide :\n1. Présente toi\n2. Indique l\'objet de ton message \n3. Décris clairement ton problème 😉'}
                            placeholder={"Racontes nous ce qui te préoccupe"} chatboxHeight={500} CSSProperties={{color:'#001435'}}/>
        </>
        )
}

export default Congratulation;
