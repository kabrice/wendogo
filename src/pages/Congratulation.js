import React, { useState, useEffect, useRef } from 'react';
import Footer from '../components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { faCalendarCheck } from '@fortawesome/free-solid-svg-icons';
import alarmClock from '../assets/wired-gradient-236-alarm-clock.gif'
import { FloatingWhatsApp } from 'react-floating-whatsapp'
import SocialMediaLocgo from '../assets/social_media_logo.png'
import { ToastContainer, toast } from 'react-toastify'

const Congratulation = () => {
    const wasCalled = useRef(false);
    useEffect(() => {
        if(wasCalled.current) return;
        wasCalled.current = true;
        toast.info('Votre inscription est déjà confirmée', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            })    
      }, [])

return (
    <>
    
    <div className="containerWrapper">
    <div className=" fullContainer noTopMargin padding20-top padding20-bottom padding40H noBorder borderSolid border3px cornersAll radius0 shadow0 bgNoRepeat emptySection" id="section--30146-131" data-title="Section - Clone" data-block-color="0074C7" style={{ paddingTop: 10, paddingBottom: 10, outline: "none", backgroundColor: "#0154c0", marginTop: 0 }} data-trigger="none" data-animate="fade" data-delay={500} data-hide-on="desktop">
        <div className="containerInner ui-sortable">
        <div className="row bgCover noBorder borderSolid border3px cornersAll radius0 shadow0 P0-top P0-bottom P0H noTopMargin" id="row-177-121" data-trigger="none" data-animate="fade" data-delay={500} data-title="1 column row" style={{ paddingTop: 0, paddingBottom: 0, margin: 0, outline: "none" }}>
            <div id="col-full-144-108-188" className="col-md-12 innerContent col_left" data-col="full" data-trigger="none" data-animate="fade" data-delay={500} data-title="1st column" style={{ outline: "none" }}>
            <div className="col-inner bgCover  noBorder borderSolid border3px cornersAll radius0 shadow0 P0-top P0-bottom P0H noTopMargin" style={{ padding: "0 10px" }}>
                <div className="de elHeadlineWrapper ui-droppable de-editable" id="tmp_headline1-40033-131-170" data-de-type="headline" data-de-editing="false" data-title="headline" data-ce="true" data-trigger="none" data-animate="fade" data-delay={500} style={{ marginTop: 0, outline: "none", cursor: "pointer", fontFamily: "Montserrat, Helvetica, sans-serif !important" }} data-google-font="Montserrat" aria-disabled="false">
                <div className="Card__Text-sc-1qqjegm-5 iOmyQf" style={{ textAlign: "center", fontSize: 18, color: "rgb(255, 255, 255)", borderColor: "rgb(214, 187, 135)", wordBreak: "break-word", position: "relative", zIndex: 0 }} data-bold="inherit" data-gramm="false" spellCheck="false" data-mci-spellchecked="true"> 
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
                <h1 className="ne elHeadline hsSize3 lh4 elMargin0 elBGStyle0 hsTextShadow0 mfs_16" style={{ textAlign: "center", fontSize: 18, color: "rgb(255, 255, 255)", borderColor: "rgb(214, 187, 135)", wordBreak: "break-word", position: "relative", zIndex: 0 }} data-bold="inherit" data-gramm="false" spellCheck="false"> 
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
    <div className=" noTopMargin padding40-top padding40-bottom padding40H noBorder borderSolid border3px cornersAll radius0 shadow0 activeSection_topBorder activeSection_bottomBorder activeSection_topBorder0 activeSection_bottomBorder0 emptySection fullContainer bgCover100" id="section--18196" data-title="sales copy & optin" data-block-color="0074C7" style={{ paddingTop: 20, paddingBottom: 30, outline: "none", backgroundColor: "rgb(2, 1, 39)" }} data-trigger="none" data-animate="fade" data-delay={500} data-hide-on="desktop">
        <div className="containerInner ui-sortable">
        <div className="row bgCover noBorder borderSolid border3px cornersAll radius0 shadow0 P0-top P0-bottom P0H noTopMargin" id="row-138" data-trigger="none" data-animate="fade" data-delay={500} data-title="1 column row" style={{margin: 0, outline: "none" }}>
            <div id="col-full-154-187-185" className="col-md-12 innerContent col_left" data-col="full" data-trigger="none" data-animate="fade" data-delay={500} data-title="1st column" style={{ outline: "none" }}>
            <div className="col-inner bgCover  noBorder borderSolid border3px cornersAll radius0 shadow0 P0-top P0-bottom P0H noTopMargin" style={{ padding: "0 10px" }}>
                <div className="de elHeadlineWrapper ui-droppable de-editable" id="headline-90420" data-de-type="headline" data-de-editing="false" data-title="headline" data-ce="true" data-trigger="none" data-animate="fade" data-delay={500} style={{ marginTop: 30, outline: "none", cursor: "pointer", fontFamily: '"Open Sans", Helvetica, sans-serif !important' }} data-google-font="Open+Sans" aria-disabled="false">
                <h1 className="ne elHeadline hsSize3 lh4 elMargin0 elBGStyle0 hsTextShadow0 mfs_20" style={{ textAlign: "center", fontSize: 42, color: "rgb(255, 255, 255)", borderColor: "rgb(214, 187, 135)" }} data-bold="inherit" data-gramm="false">
                    <b>IMPORTANT !</b>
                </h1>
                </div>
                <div className="de elHeadlineWrapper ui-droppable de-editable" id="headline-59879" data-de-type="headline" data-de-editing="false" data-title="headline" data-ce="true" data-trigger="none" data-animate="fade" data-delay={500} style={{ marginTop: 15, outline: "none", cursor: "pointer", fontFamily: "Abel, Helvetica, sans-serif !important" }} data-google-font="Abel" aria-disabled="false" data-hide-on="mobile">
                <h1 className="ne elHeadline hsSize3 lh4 elMargin0 elBGStyle0 hsTextShadow0 mfs_17" style={{ textAlign: "center", fontSize: 42, color: "rgb(255, 255, 255)", borderColor: "rgb(214, 187, 135)" }} data-bold="inherit" data-gramm="false">
                    <b>VOICI QUOI FAIRE MAINTENANT :</b>
                </h1>
                </div>
                <div className="de elSeperator elMargin0 ui-droppable de-editable" id="tmp_divider-37593-100" data-de-type="divider" data-de-editing="false" data-title="Divider" data-ce="false" data-trigger="none" data-animate="fade" data-delay={500} style={{ marginTop: 15, outline: "none", cursor: "pointer" }} aria-disabled="false">
                <div className="elDivider elDividerStyle1 padding10-top padding10-bottom elDividerShadow0">
                    <div className="elDividerInner" data-width-border={10} data-height-border={1} style={{ borderColor: "rgb(255, 255, 255)" }} data-align="center" />
                </div>
                </div>
                <div className="de elHeadlineWrapper ui-droppable de-editable" id="tmp_paragraph-36258" data-de-type="headline" data-de-editing="false" data-title="Paragraph" data-ce="true" data-trigger="none" data-animate="fade" data-delay={500} style={{ marginTop: 10, outline: "none", cursor: "pointer" }} data-hide-on="mobile" aria-disabled="false">
                <div className="ne elHeadline hsSize1 lh5 elMargin0 elBGStyle0 hsTextShadow0 mfs_21" data-bold="inherit" style={{ textAlign: "center", color: "rgb(255, 255, 255)" }} data-gramm="false"> Vous allez recevoir dans quelques minutes par e-mail ou WhatsApp <b>votre lien personnel</b> pour vous{" "} <b>connecter à la conférence.</b>
                </div>
                </div>
                <div className="de elHeadlineWrapper ui-droppable de-editable" id="headline-15828" data-de-type="headline" data-de-editing="false" data-title="headline" data-ce="true" data-trigger="none" data-animate="fade" data-delay={500} style={{ marginTop: 5, outline: "none", cursor: "pointer", fontFamily: "Montserrat, Helvetica, sans-serif !important" }} data-google-font="Montserrat" aria-disabled="false" data-hide-on="">
                <h1 className="ne elHeadline hsSize3 lh4 elMargin0 elBGStyle0 hsTextShadow0 mfs_16" style={{ textAlign: "center", fontSize: 24, color: "rgb(255, 255, 255)", borderColor: "rgb(214, 187, 135)", wordBreak: "break-word", position: "relative", zIndex: 0 }} data-bold="inherit" data-gramm="false" spellCheck="false" data-mci-spellchecked="true"> Vous allez recevoir dans quelques minutes par e-mail ou WhatsApp <b>votre lien personnel</b>&nbsp; <div> pour vous <b>connecter à la conférence</b>. </div>
                </h1>
                </div>
            </div>
            <mci-extension data-role="overlay" id="overlay-root" />
            </div>
        </div>
        <div className="row bgCover noBorder borderSolid border3px cornersAll radius0 shadow0 P0-top P0-bottom P0H noTopMargin" id="row--62619" data-trigger="none" data-animate="fade" data-delay={500} data-title="1 column row" style={{ paddingTop: 20, paddingBottom: 20, margin: "20px 0px 0px", outline: "none" }}>
            <div id="col-full-179" className="col-md-12 innerContent col_left" data-col="full" data-trigger="none" data-animate="fade" data-delay={500} data-title="1st column" style={{ outline: "none" }}>
            <div className="col-inner bgCover  noBorder borderSolid border3px cornersAll radius0 shadow0 P0-top P0-bottom P0H noTopMargin" style={{ padding: "0 10px" }}>
                <div className="de elSeperator elMargin0 ui-droppable de-editable" id="divider-48727" data-de-type="divider" data-de-editing="false" data-title="Divider" data-ce="false" data-trigger="none" data-animate="fade" data-delay={500} style={{ marginTop: 15, outline: "none", cursor: "pointer" }} aria-disabled="false">
                <div className="elDivider elDividerStyle1 padding10-top elDividerShadow0 padding25-bottom">
                    <div className="elDividerInner" data-width-border={10} data-height-border={1} style={{ borderColor: "rgb(255, 255, 255)" }} data-align="center" />
                </div>
                </div>
                <div className="de elHeadlineWrapper ui-droppable de-editable" id="headline-76374" data-de-type="headline" data-de-editing="false" data-title="headline" data-ce="true" data-trigger="none" data-animate="fade" data-delay={500} style={{ marginTop: 0, outline: "none", cursor: "pointer", fontFamily: '"Open Sans", Helvetica, sans-serif !important' }} aria-disabled="false" data-google-font="Open+Sans">
                <h1 className="ne elHeadline hsSize3 lh4 elMargin0 elBGStyle0 hsTextShadow0" style={{ textAlign: "center", fontSize: 36, color: "rgb(255, 255, 255)" }} data-bold="inherit" data-gramm="false">
                    <b>PROCHAINES ÉTAPES</b>
                </h1>
                </div>
                <div className="de elHeadlineWrapper ui-droppable de-editable" id="headline-71835" data-de-type="headline" data-de-editing="false" data-title="headline" data-ce="true" data-trigger="none" data-animate="fade" data-delay={500} style={{ marginTop: 5, outline: "none", cursor: "pointer", fontFamily: "Montserrat, Helvetica, sans-serif !important" }} data-google-font="Montserrat" aria-disabled="false">
                <h1 className="ne elHeadline hsSize3 lh4 elMargin0 elBGStyle0 hsTextShadow0 mfs_16" style={{ textAlign: "center", fontSize: 24, color: "rgb(255, 255, 255)", borderColor: "rgb(214, 187, 135)", wordBreak: "break-word", position: "relative", zIndex: 0 }} data-bold="inherit" data-gramm="false" spellCheck="false" data-mci-spellchecked="true"> Voilà ce que vous devez faire maintenant pour être sûr de ne rien manquer : </h1>
                </div>
                <div className="de elSeperator elMargin0 ui-droppable de-editable" id="divider-79438-130" data-de-type="divider" data-de-editing="false" data-title="Divider" data-ce="false" data-trigger="none" data-animate="fade" data-delay={500} style={{ marginTop: 15, outline: "none", cursor: "pointer" }} aria-disabled="false">
                <div className="elDivider elDividerStyle1 padding10-top padding10-bottom elDividerShadow0">
                    <div className="elDividerInner" data-width-border={10} data-height-border={1} style={{ borderColor: "rgb(255, 255, 255)" }} data-align="center" />
                </div>
                </div>
            </div>
            </div>
        </div>
        <div className="row bgCover noBorder borderSolid border3px cornersAll radius0 shadow0 P0-top P0-bottom P0H noTopMargin" id="row--37489" data-trigger="none" data-animate="fade" data-delay={500} data-title="3 column row" style={{ padding: "20px 100px 25px", margin: "0px auto", outline: "none", backgroundColor: "rgba(255, 255, 255, 0)", width: "100%", maxWidth: "100%" }} data-hide-on="">
            <div id="col-left-142-129" className="col-md-4 innerContent col_left ui-resizable" data-col="left" data-trigger="none" data-animate="fade" data-delay={500} data-title="1st column" style={{ outline: "none" }}>
            <div className="col-inner bgCover noBorder borderSolid border3px cornersAll shadow0 P0-top P0-bottom P0H noTopMargin radius10" style={{ padding: 0, backgroundColor: "#18184d", width: "auto", marginLeft: 0, marginRight: 0 }}>
                <div className="de elImageWrapper de-image-block elAlign_center elMargin0 ui-droppable de-editable" id="img-20239" data-de-type="img" data-de-editing="false" data-title="image" data-ce="false" data-trigger="none" data-animate="fade" data-delay={500} style={{ marginTop: 20, outline: "none", cursor: "pointer" }} data-hide-on="" aria-disabled="false">
                {/* <img src={alarmClock} className="elIMG ximg" alt="" height={120} data-lazy-loading="false" tabIndex={0} /> */}
                <img src="https://go.mindeo.com/hosted/images/c6/54e0994b9a4e94a8f49d6ffba3a132/wired-gradient-23-smartphone-ring.gif" className="elIMG ximg" alt="" height={120} data-lazy-loading="false" tabIndex={0} />
                </div>
                <div className="de elHeadlineWrapper ui-droppable de-editable" id="headline-70542" data-de-type="headline" data-de-editing="false" data-title="headline" data-ce="true" data-trigger="none" data-animate="fade" data-delay={500} style={{ marginTop: 0, outline: "none", cursor: "pointer", fontFamily: '"Open Sans", Helvetica, sans-serif !important' }} aria-disabled="false" data-google-font="Open+Sans" data-htype="content">
                <h1 className="ne elHeadline hsSize3 lh4 elMargin0 elBGStyle0 hsTextShadow0 padding0" style={{ textAlign: "center", fontSize: 24, color: "rgb(255, 255, 255)" }} data-bold="inherit" data-gramm="false">
                    <b>RAPPEL</b>
                </h1>
                </div>
                <div className="de elHeadlineWrapper ui-droppable de-editable" id="tmp_paragraph-70078-182" data-de-type="headline" data-de-editing="false" data-title="Paragraph" data-ce="true" data-trigger="none" data-animate="fade" data-delay={500} style={{ marginTop: 5, outline: "none", cursor: "pointer", fontFamily: '"Open Sans", Helvetica, sans-serif !important' }} aria-disabled="false" data-google-font="Open+Sans">
                <div className="ne elHeadline hsSize1 lh5 elMargin0 elBGStyle0 hsTextShadow0 padding15" data-bold="inherit" style={{ textAlign: "center", color: "rgb(255, 255, 255)", fontSize: 20 }} data-gramm="false"> Ajoutez un rappel dans votre agenda. </div>
                </div>
                <div className="de elBTN elAlign_center elMargin0 ui-droppable de-editable" id="button-34906" data-de-type="button" data-de-editing="false" data-title="button" data-ce="false" data-trigger="none" data-animate="fade" data-delay={500} style={{ marginTop: 20, outline: "none", cursor: "pointer", fontFamily: '"Open Sans", Helvetica, sans-serif !important' }} aria-disabled="false" data-element-theme="customized" data-google-font="Open+Sans">
                <a href="https://calendar.google.com/calendar/render?action=TEMPLATE&dates=20231105T193000Z%2F20231105T213000Z&details=D%C3%A9couvrez%20comment%20lancer%20votre%20business%20gr%C3%A2ce%20%C3%A0%20l%27intelligence%20artificielle.%0A%0A-%20Pourquoi%20l%E2%80%99intelligence%20artificielle%20peut%20aujourd%27hui%20permettre%20%C3%A0%20n%27importe%20qui%20de%20lancer%20un%20business%20%C3%A0%20succ%C3%A8s.%0A-%20Comment%20exploiter%20cette%20opportunit%C3%A9%20pour%20vous%20lancer%20en%20tant%20que%20freelance%2C%20coach%20ou%20cr%C3%A9er%20votre%20agence.%0A-%20Les%20outils%20d%E2%80%99IA%20%C3%A0%20conna%C3%AEtre%20imp%C3%A9rativement%20pour%20d%C3%A9cupler%20votre%20productivit%C3%A9.%0A%0ARendez-vous%20%C3%A0%2020h30%20sur%20ce%20lien%20%F0%9F%91%89%20https%3A%2F%2Fgo.mindeo.com%2Fconference-business-nov23-prelive&location=https%3A%2F%2Fgo.mindeo.com%2Fconference-business-nov23-prelive&text=Conf%C3%A9rence%20Business%3A%20Comment%20Lancer%20votre%20Business%20gr%C3%A2ce%20%C3%A0%20l%27intelligence%20artificielle" className="elButton elButtonSize1 elButtonColor1 elButtonPadding2 elBtnVP_10 elButtonCorner60 elButtonFluid elButtonTxtColor1 elBTN_b_none elButtonShadowFlatHighlight elBTNone elButtonBlock elBtnHP_15" style={{ color: "rgb(255, 255, 255)", background: "#0154c0", fontSize: 16 }} rel="noopener noreferrer" target="_blank" id="undefined-610">
                <span className="elButtonMain">
                    <FontAwesomeIcon icon={faCalendarCheck} />
                    {/* <i className="fa_prepended far fa-calendar-check" /> */}
                    <span> AJOUTER AU CALENDRIER</span> </span>
                    <span className="elButtonSub" />
                </a>
                </div>
                <div className="de elSeperator elMargin0 ui-droppable de-editable" id="divider-75344" data-de-type="divider" data-de-editing="false" data-title="Divider" data-ce="false" data-trigger="none" data-animate="fade" data-delay={500} style={{ marginTop: 0, outline: "none", cursor: "pointer" }} aria-disabled="false">
                <div className="elDivider elDividerStyle1 elDividerShadow0 padding20-top padding0-bottom">
                    <div className="elDividerInner" data-width-border={10} data-height-border={1} style={{ borderColor: "rgb(255, 255, 255)" }} data-align="center" />
                </div>
                </div>
            </div>
            </div>
            <div id="col-center-137-184" className="col-md-4 innerContent col_right ui-resizable" data-col="center" data-trigger="none" data-animate="fade" data-delay={500} data-title="2nd column" style={{ outline: "none" }}>
            <div className="col-inner bgCover noBorder borderSolid border3px cornersAll shadow0 P0-top P0-bottom P0H noTopMargin radius10" style={{ padding: 0, backgroundColor: "#18184d" }}>
                <div className="de elImageWrapper de-image-block elAlign_center elMargin0 ui-droppable de-editable" id="img-13766" data-de-type="img" data-de-editing="false" data-title="image" data-ce="false" data-trigger="none" data-animate="fade" data-delay={500} style={{ marginTop: 20, outline: "none", cursor: "pointer" }} data-hide-on="" aria-disabled="false">
                <img src="https://go.mindeo.com/hosted/images/54/25f986bedd4a09be1b3da8f5ce8d4a/wired-gradient-958-faq-frequent-ask-questions.gif" className="elIMG ximg" alt="" height={120} data-lazy-loading="false" tabIndex={0} />
                </div>
                <div className="de elHeadlineWrapper ui-droppable de-editable" id="headline-41235" data-de-type="headline" data-de-editing="false" data-title="headline" data-ce="true" data-trigger="none" data-animate="fade" data-delay={500} style={{ marginTop: 0, outline: "none", cursor: "pointer", fontFamily: '"Open Sans", Helvetica, sans-serif !important' }} aria-disabled="false" data-google-font="Open+Sans">
                <h1 className="ne elHeadline hsSize3 lh4 elMargin0 elBGStyle0 hsTextShadow0" style={{ textAlign: "center", fontSize: 24, color: "rgb(255, 255, 255)" }} data-bold="inherit" data-gramm="false">
                    <b>QUESTIONS</b>
                </h1>
                </div>
                <div className="de elImageWrapper de-image-block elAlign_center elMargin0 ui-droppable de-editable" id="img-38343" data-de-type="img" data-de-editing="false" data-title="image" data-ce="false" data-trigger="none" data-animate="fade" data-delay={500} style={{ marginTop: 25, outline: "none", cursor: "pointer" }} data-hide-on="mobile" aria-disabled="false">
                <img src="https://go.mindeo.com/hosted/images/87/0c46e9d40c4d8188369e1a18420da7/Add-Email-to-Contacts.gif" className="elIMG ximg" alt="" height={120} data-lazy-loading="false" tabIndex={0} />
                </div>
                <div className="de elHeadlineWrapper ui-droppable de-editable" id="headline-94483-152" data-de-type="headline" data-de-editing="false" data-title="Paragraph" data-ce="true" data-trigger="none" data-animate="fade" data-delay={500} style={{ marginTop: 5, outline: "none", cursor: "pointer", fontFamily: '"Open Sans", Helvetica, sans-serif !important' }} aria-disabled="false" data-google-font="Open+Sans">
                <div className="ne elHeadline hsSize1 lh5 elMargin0 elBGStyle0 hsTextShadow0 padding15" data-bold="inherit" style={{ textAlign: "center", color: "rgb(255, 255, 255)", fontSize: 20 }} data-gramm="false"> Préparez une liste de questions que vous pourrez me poser le Jour J pendant la foire aux questions. </div>
                </div>
                <div className="de elSeperator elMargin0 ui-droppable de-editable" id="divider-91222-179" data-de-type="divider" data-de-editing="false" data-title="Divider" data-ce="false" data-trigger="none" data-animate="fade" data-delay={500} style={{ marginTop: 0, outline: "none", cursor: "pointer" }} aria-disabled="false">
                <div className="elDivider elDividerStyle1 elDividerShadow0 padding20-top padding0-bottom">
                    <div className="elDividerInner" data-width-border={10} data-height-border={1} style={{ borderColor: "rgb(255, 255, 255)" }} data-align="center" />
                </div>
                </div>
            </div>
            </div>
            <div id="col-right-131-129" className="col-md-4 innerContent col_right ui-resizable" data-col="right" data-trigger="none" data-animate="fade" data-delay={500} data-title="3rd Column" style={{ outline: "none" }}>
            <div className="col-inner bgCover noBorder borderSolid border3px cornersAll shadow0 P0-top P0-bottom P0H noTopMargin radius10" style={{ padding: 0, backgroundColor: "#18184d" }}>
                <div className="de elImageWrapper de-image-block elAlign_center elMargin0 ui-droppable de-editable" id="img-22828" data-de-type="img" data-de-editing="false" data-title="image" data-ce="false" data-trigger="none" data-animate="fade" data-delay={500} style={{ marginTop: 20, outline: "none", cursor: "pointer" }} data-hide-on="" aria-disabled="false">
                <img src="https://go.mindeo.com/hosted/images/6d/edbf2e2d194a22800047dfc4b510b4/wired-gradient-479-computer-laptop-notebook.gif" className="elIMG ximg" alt="" height="" data-lazy-loading="false" width={120} tabIndex={0} />
                </div>
                <div className="de elHeadlineWrapper ui-droppable de-editable" id="tmp_headline1-27838" data-de-type="headline" data-de-editing="false" data-title="headline" data-ce="true" data-trigger="none" data-animate="fade" data-delay={500} style={{ marginTop: 0, outline: "none", cursor: "pointer", fontFamily: '"Open Sans", Helvetica, sans-serif !important' }} aria-disabled="false" data-google-font="Open+Sans">
                <h1 className="ne elHeadline hsSize3 lh4 elMargin0 elBGStyle0 hsTextShadow0" style={{ textAlign: "center", fontSize: 24, color: "rgb(255, 255, 255)" }} data-bold="inherit" data-gramm="false">
                    <b>ORDINATEUR</b>
                </h1>
                </div>
                <div className="de elImageWrapper de-image-block elAlign_center elMargin0 ui-droppable de-editable" id="img-85242" data-de-type="img" data-de-editing="false" data-title="image" data-ce="false" data-trigger="none" data-animate="fade" data-delay={500} style={{ marginTop: 25, outline: "none", cursor: "pointer" }} data-hide-on="mobile" aria-disabled="false">
                <img src="https://go.mindeo.com/hosted/images/d4/8374e27b304c459fc2909ee59917d2/visio-julien-diop_low.jpg" className="elIMG ximg" alt="" height={120} data-lazy-loading="false" tabIndex={0} />
                </div>
                <div className="de elHeadlineWrapper ui-droppable de-editable" id="headline-89959-146" data-de-type="headline" data-de-editing="false" data-title="Paragraph" data-ce="true" data-trigger="none" data-animate="fade" data-delay={500} style={{ marginTop: 5, outline: "none", cursor: "pointer", fontFamily: '"Open Sans", Helvetica, sans-serif !important' }} aria-disabled="false" data-google-font="Open+Sans">
                <div className="ne elHeadline hsSize1 lh5 elMargin0 elBGStyle0 hsTextShadow0 padding15" data-bold="inherit" style={{ textAlign: "center", color: "rgb(255, 255, 255)", fontSize: 20 }} data-gramm="false"> Connectez-vous avec un ordinateur pour bénéficier pleinement de la conférence et du chat. </div>
                </div>
                <div className="de elSeperator elMargin0 ui-droppable de-editable" id="divider-30800-110" data-de-type="divider" data-de-editing="false" data-title="Divider" data-ce="false" data-trigger="none" data-animate="fade" data-delay={500} style={{ marginTop: 0, outline: "none", cursor: "pointer" }} aria-disabled="false">
                <div className="elDivider elDividerStyle1 elDividerShadow0 padding20-top padding0-bottom">
                    <div className="elDividerInner" data-width-border={10} data-height-border={1} style={{ borderColor: "rgb(255, 255, 255)" }} data-align="center" />
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    </div>
    {/* <div className="dropZoneForSections ui-droppable" style={{ display: "none" }}>
        <div className="dropIconr">
        <i className="fa fa-plus" />
        </div>
    </div>
   
    <div className="dropZoneForSections ui-droppable" style={{ display: "none" }}>
        <div className="dropIconr">
        <i className="fa fa-plus" />
        </div>
    </div> */}
    <div className=" noTopMargin padding40-top padding40-bottom padding40H noBorder borderSolid border3px cornersAll radius0 shadow0 activeSection_topBorder activeSection_bottomBorder activeSection_topBorder0 activeSection_bottomBorder0 emptySection fullContainer bgCover activeSection innerToolsTop" id="section--18196-124" data-title="sales copy & optin - Clone" data-block-color="0074C7" style={{ paddingTop: 20, paddingBottom: 30, outline: "none", backgroundColor: "rgb(2, 1, 39)"}} data-trigger="none" data-animate="fade" data-delay={500} data-hide-on="mobile">
        <div className="containerInner ui-sortable">
        <div className="row bgCover noBorder borderSolid border3px cornersAll radius0 shadow0 P0-top P0-bottom P0H noTopMargin" id="row-138-182" data-trigger="none" data-animate="fade" data-delay={500} data-title="1 column row" style={{ padding: "0px 100px 20px", margin: 0, outline: "none" }}>
            <div id="col-full-154-187-185-136" className="col-md-12 innerContent col_left" data-col="full" data-trigger="none" data-animate="fade" data-delay={500} data-title="1st column" style={{ outline: "none" }}>
            <div className="col-inner bgCover  noBorder borderSolid border3px cornersAll radius0 shadow0 P0-top P0-bottom P0H noTopMargin" style={{ padding: "0 10px" }}>
                <div className="de elHeadlineWrapper ui-droppable de-editable" id="headline-90420-128" data-de-type="headline" data-de-editing="false" data-title="headline" data-ce="true" data-trigger="none" data-animate="fade" data-delay={500} style={{ marginTop: 30, outline: "none", cursor: "pointer", fontFamily: '"Open Sans", Helvetica, sans-serif !important' }} data-google-font="Open+Sans" aria-disabled="false">
                <h1 className="ne elHeadline hsSize3 lh4 elMargin0 elBGStyle0 hsTextShadow0 mfs_26" style={{ textAlign: "center", fontSize: 20, color: "rgb(255, 255, 255)", borderColor: "rgb(214, 187, 135)" }} data-bold="inherit" data-gramm="false">
                    <b>IMPORTANT !</b>
                </h1>
                </div>
                <div className="de elSeperator elMargin0 ui-droppable de-editable" id="tmp_divider-37593-100-175" data-de-type="divider" data-de-editing="false" data-title="Divider" data-ce="false" data-trigger="none" data-animate="fade" data-delay={500} style={{ marginTop: 15, outline: "none", cursor: "pointer" }} aria-disabled="false">
                <div className="elDivider elDividerStyle1 padding10-top padding10-bottom elDividerShadow0">
                    <div className="elDividerInner" data-width-border={10} data-height-border={1} style={{ borderColor: "rgb(255, 255, 255)" }} data-align="center" />
                </div>
                </div>
                <div className="de elHeadlineWrapper ui-droppable de-editable" id="headline-15828-125" data-de-type="headline" data-de-editing="false" data-title="headline" data-ce="true" data-trigger="none" data-animate="fade" data-delay={500} style={{ marginTop: 5, outline: "none", cursor: "pointer", fontFamily: '"Open Sans", Helvetica, sans-serif !important' }} data-google-font="Open+Sans" aria-disabled="false" data-hide-on="">
                <h1 className="ne elHeadline hsSize3 lh4 elMargin0 elBGStyle0 hsTextShadow0 mfs_16" style={{ textAlign: "center", fontSize: 24, color: "rgb(255, 255, 255)", borderColor: "rgb(214, 187, 135)", wordBreak: "break-word", position: "relative", zIndex: 0 }} data-bold="inherit" data-gramm="false" spellCheck="false" data-mci-spellchecked="true"> Vous allez recevoir dans quelques minutes par e-mail ou WhatsApp <b>votre lien personnel</b>&nbsp; <div> pour vous <b>connecter à la conférence</b>. </div>
                </h1>
                </div>
            </div>
            <mci-extension data-role="overlay" id="overlay-root" />
            </div>
        </div>
        <div className="row bgCover noBorder borderSolid border3px cornersAll radius0 shadow0 P0-top P0-bottom P0H noTopMargin" id="row--62619-113" data-trigger="none" data-animate="fade" data-delay={500} data-title="1 column row" style={{ paddingTop: 20, paddingBottom: 20, margin: "20px 0px 0px", outline: "none" }}>
            <div id="col-full-179-184" className="col-md-12 innerContent col_left" data-col="full" data-trigger="none" data-animate="fade" data-delay={500} data-title="1st column" style={{ outline: "none" }}>
            <div className="col-inner bgCover  noBorder borderSolid border3px cornersAll radius0 shadow0 P0-top P0-bottom P0H noTopMargin" style={{ padding: "0 10px" }}>
                <div className="de elSeperator elMargin0 ui-droppable de-editable" id="divider-48727-146" data-de-type="divider" data-de-editing="false" data-title="Divider" data-ce="false" data-trigger="none" data-animate="fade" data-delay={500} style={{ marginTop: 15, outline: "none", cursor: "pointer" }} aria-disabled="false">
                <div className="elDivider elDividerStyle1 padding10-top elDividerShadow0 padding25-bottom">
                    <div className="elDividerInner" data-width-border={10} data-height-border={1} style={{ borderColor: "rgb(255, 255, 255)" }} data-align="center" />
                </div>
                </div>
                <div className="de elHeadlineWrapper ui-droppable de-editable" id="headline-76374-153" data-de-type="headline" data-de-editing="false" data-title="headline" data-ce="true" data-trigger="none" data-animate="fade" data-delay={500} style={{ marginTop: 0, outline: "none", cursor: "pointer", fontFamily: '"Open Sans", Helvetica, sans-serif !important' }} aria-disabled="false" data-google-font="Open+Sans">
                <h1 className="ne elHeadline hsSize3 lh4 elMargin0 elBGStyle0 hsTextShadow0 mfs_30" style={{ textAlign: "center", fontSize: 36, color: "rgb(255, 255, 255)" }} data-bold="inherit" data-gramm="false">
                    <b>PROCHAINES ÉTAPES</b>
                </h1>
                </div>
                <div className="de elHeadlineWrapper ui-droppable de-editable" id="headline-71835-172" data-de-type="headline" data-de-editing="false" data-title="headline" data-ce="true" data-trigger="none" data-animate="fade" data-delay={500} style={{ marginTop: 15, outline: "none", cursor: "pointer", fontFamily: '"Open Sans", Helvetica, sans-serif !important' }} data-google-font="Open+Sans" aria-disabled="false">
                <h1 className="ne elHeadline hsSize3 lh4 elMargin0 elBGStyle0 hsTextShadow0 mfs_18" style={{ textAlign: "center", fontSize: 24, color: "rgb(255, 255, 255)", borderColor: "rgb(214, 187, 135)", wordBreak: "break-word", position: "relative", zIndex: 0 }} data-bold="inherit" data-gramm="false" spellCheck="false" data-mci-spellchecked="true"> Voilà ce que vous devez faire maintenant pour être sûr de ne rien manquer : </h1>
                </div>
                <div className="de elSeperator elMargin0 ui-droppable de-editable" id="divider-79438-130-158" data-de-type="divider" data-de-editing="false" data-title="Divider" data-ce="false" data-trigger="none" data-animate="fade" data-delay={500} style={{ marginTop: 15, outline: "none", cursor: "pointer" }} aria-disabled="false">
                <div className="elDivider elDividerStyle1 padding10-top padding10-bottom elDividerShadow0">
                    <div className="elDividerInner" data-width-border={10} data-height-border={1} style={{ borderColor: "rgb(255, 255, 255)" }} data-align="center" />
                </div>
                </div>
            </div>
            </div>
        </div>
        <div className="row bgCover noBorder borderSolid border3px cornersAll radius0 shadow0 P0-top P0-bottom P0H noTopMargin" id="row--37489-146" data-trigger="none" data-animate="fade" data-delay={500} data-title="3 column row" style={{ padding: "20px 100px 25px", margin: "0px auto", outline: "none", backgroundColor: "rgba(255, 255, 255, 0)", width: "100%", maxWidth: "100%" }} data-hide-on="">
            <div id="col-left-142-129-186" className="col-md-4 innerContent col_left ui-resizable" data-col="left" data-trigger="none" data-animate="fade" data-delay={500} data-title="1st column" style={{ outline: "none" }}>
            <div className="col-inner bgCover noBorder borderSolid border3px cornersAll shadow0 P0-top P0-bottom P0H noTopMargin radius10" style={{ padding: 0, backgroundColor: "#18184d", width: "auto", marginLeft: 0, marginRight: 0 }}>
                <div className="de elImageWrapper de-image-block elAlign_center elMargin0 ui-droppable de-editable" id="img-20239-107" data-de-type="img" data-de-editing="false" data-title="image" data-ce="false" data-trigger="none" data-animate="fade" data-delay={500} style={{ marginTop: 20, outline: "none", cursor: "pointer" }} data-hide-on="" aria-disabled="false">
                <img src="https://go.mindeo.com/hosted/images/c6/54e0994b9a4e94a8f49d6ffba3a132/wired-gradient-23-smartphone-ring.gif" className="elIMG ximg" alt="" height={120} data-lazy-loading="false" tabIndex={0} />
                </div>
                <div className="de elHeadlineWrapper ui-droppable de-editable" id="headline-70542-162" data-de-type="headline" data-de-editing="false" data-title="headline" data-ce="true" data-trigger="none" data-animate="fade" data-delay={500} style={{ marginTop: 0, outline: "none", cursor: "pointer", fontFamily: '"Open Sans", Helvetica, sans-serif !important' }} aria-disabled="false" data-google-font="Open+Sans" data-htype="content">
                <h1 className="ne elHeadline hsSize3 lh4 elMargin0 elBGStyle0 hsTextShadow0 padding0" style={{ textAlign: "center", fontSize: 24, color: "rgb(255, 255, 255)" }} data-bold="inherit" data-gramm="false">
                    <b>RAPPEL</b>
                </h1>
                </div>
                <div className="de elHeadlineWrapper ui-droppable de-editable" id="tmp_paragraph-70078-182-115" data-de-type="headline" data-de-editing="false" data-title="Paragraph" data-ce="true" data-trigger="none" data-animate="fade" data-delay={500} style={{ marginTop: 5, outline: "none", cursor: "pointer", fontFamily: '"Open Sans", Helvetica, sans-serif !important' }} aria-disabled="false" data-google-font="Open+Sans">
                <div className="ne elHeadline hsSize1 lh5 elMargin0 elBGStyle0 hsTextShadow0 padding15 mfs_20" data-bold="inherit" style={{ textAlign: "center", color: "rgb(255, 255, 255)", fontSize: 22 }} data-gramm="false"> Ajoutez un rappel dans votre agenda pour ne pas manquer la conférence. </div>
                </div>
                <div className="de elBTN elAlign_center elMargin0 ui-droppable de-editable" id="button-34906-131" data-de-type="button" data-de-editing="false" data-title="button" data-ce="false" data-trigger="none" data-animate="fade" data-delay={500} style={{ marginTop: 30, outline: "none", cursor: "pointer", fontFamily: '"Open Sans", Helvetica, sans-serif !important' }} aria-disabled="false" data-element-theme="customized" data-google-font="Open+Sans">
                <a href="https://calendar.google.com/calendar/render?action=TEMPLATE&dates=20231105T193000Z%2F20231105T213000Z&details=D%C3%A9couvrez%20comment%20lancer%20votre%20business%20gr%C3%A2ce%20%C3%A0%20l%27intelligence%20artificielle.%0A%0A-%20Pourquoi%20l%E2%80%99intelligence%20artificielle%20peut%20aujourd%27hui%20permettre%20%C3%A0%20n%27importe%20qui%20de%20lancer%20un%20business%20%C3%A0%20succ%C3%A8s.%0A-%20Comment%20exploiter%20cette%20opportunit%C3%A9%20pour%20vous%20lancer%20en%20tant%20que%20freelance%2C%20coach%20ou%20cr%C3%A9er%20votre%20agence.%0A-%20Les%20outils%20d%E2%80%99IA%20%C3%A0%20conna%C3%AEtre%20imp%C3%A9rativement%20pour%20d%C3%A9cupler%20votre%20productivit%C3%A9.%0A%0ARendez-vous%20%C3%A0%2020h30%20sur%20ce%20lien%20%F0%9F%91%89%20https%3A%2F%2Fgo.mindeo.com%2Fconference-business-nov23-prelive&location=https%3A%2F%2Fgo.mindeo.com%2Fconference-business-nov23-prelive&text=Conf%C3%A9rence%20Business%3A%20Comment%20Lancer%20votre%20Business%20gr%C3%A2ce%20%C3%A0%20l%27intelligence%20artificielle" className="elButton elButtonSize1 elButtonColor1 elButtonPadding2 elBtnVP_10 elButtonCorner60 elButtonFluid elBtnHP_25 elButtonTxtColor1 elBTN_b_none elButtonShadowFlatHighlight elBTNone elButtonBlock" style={{ color: "rgb(255, 255, 255)", background: "#0154c0", fontSize: 16 }} rel="noopener noreferrer" target="_blank" id="undefined-610-2">
                    <span className="elButtonMain">
                    <FontAwesomeIcon icon={faCalendarCheck} />
                    {/* <i className="fa_prepended far fa-calendar-check" /> */}
                     AJOUTER AU CALENDRIER </span>
                    <span className="elButtonSub" />
                </a>
                </div>
                <div className="de elSeperator elMargin0 ui-droppable de-editable" id="divider-75344-131" data-de-type="divider" data-de-editing="false" data-title="Divider" data-ce="false" data-trigger="none" data-animate="fade" data-delay={500} style={{ marginTop: 0, outline: "none", cursor: "pointer" }} aria-disabled="false">
                <div className="elDivider elDividerStyle1 elDividerShadow0 padding20-top padding0-bottom">
                    <div className="elDividerInner" data-width-border={10} data-height-border={1} style={{ borderColor: "rgb(255, 255, 255)" }} data-align="center" />
                </div>
                </div>
            </div>
            </div>
            <div id="col-center-137-184-138" className="col-md-4 innerContent col_right ui-resizable" data-col="center" data-trigger="none" data-animate="fade" data-delay={500} data-title="2nd column" style={{ outline: "none" }}>
            <div className="col-inner bgCover noBorder borderSolid border3px cornersAll shadow0 P0-top P0-bottom P0H noTopMargin radius10" style={{ padding: 0, backgroundColor: "#18184d" }}>
                <div className="de elImageWrapper de-image-block elAlign_center elMargin0 ui-droppable de-editable" id="img-13766-148" data-de-type="img" data-de-editing="false" data-title="image" data-ce="false" data-trigger="none" data-animate="fade" data-delay={500} style={{ marginTop: 20, outline: "none", cursor: "pointer" }} data-hide-on="" aria-disabled="false">
                <img src="https://go.mindeo.com/hosted/images/54/25f986bedd4a09be1b3da8f5ce8d4a/wired-gradient-958-faq-frequent-ask-questions.gif" className="elIMG ximg" alt="" height={120} data-lazy-loading="false" tabIndex={0} />
                </div>
                <div className="de elHeadlineWrapper ui-droppable de-editable" id="headline-41235-118" data-de-type="headline" data-de-editing="false" data-title="headline" data-ce="true" data-trigger="none" data-animate="fade" data-delay={500} style={{ marginTop: 0, outline: "none", cursor: "pointer", fontFamily: '"Open Sans", Helvetica, sans-serif !important' }} aria-disabled="false" data-google-font="Open+Sans">
                <h1 className="ne elHeadline hsSize3 lh4 elMargin0 elBGStyle0 hsTextShadow0" style={{ textAlign: "center", fontSize: 24, color: "rgb(255, 255, 255)" }} data-bold="inherit" data-gramm="false">
                    <b>QUESTIONS</b>
                </h1>
                </div>
                <div className="de elHeadlineWrapper ui-droppable de-editable" id="headline-94483-152-154" data-de-type="headline" data-de-editing="false" data-title="Paragraph" data-ce="true" data-trigger="none" data-animate="fade" data-delay={500} style={{ marginTop: 5, outline: "none", cursor: "pointer", fontFamily: '"Open Sans", Helvetica, sans-serif !important' }} aria-disabled="false" data-google-font="Open+Sans">
                <div className="ne elHeadline hsSize1 lh5 elMargin0 elBGStyle0 hsTextShadow0 padding15 mfs_20" data-bold="inherit" style={{ textAlign: "center", color: "rgb(255, 255, 255)", fontSize: 22 }} data-gramm="false"> Préparez une liste de questions que vous pourrez me poser le Jour J pendant la foire aux questions. </div>
                </div>
                <div className="de elSeperator elMargin0 ui-droppable de-editable" id="divider-91222-179-178" data-de-type="divider" data-de-editing="false" data-title="Divider" data-ce="false" data-trigger="none" data-animate="fade" data-delay={500} style={{ marginTop: 0, outline: "none", cursor: "pointer" }} aria-disabled="false">
                <div className="elDivider elDividerStyle1 elDividerShadow0 padding20-top padding0-bottom">
                    <div className="elDividerInner" data-width-border={10} data-height-border={1} style={{ borderColor: "rgb(255, 255, 255)" }} data-align="center" />
                </div>
                </div>
            </div>
            </div>
            <div id="col-right-131-129-122" className="col-md-4 innerContent col_right ui-resizable" data-col="right" data-trigger="none" data-animate="fade" data-delay={500} data-title="3rd Column" style={{ outline: "none" }}>
            <div className="col-inner bgCover noBorder borderSolid border3px cornersAll shadow0 P0-top P0-bottom P0H noTopMargin radius10" style={{ padding: 0, backgroundColor: "#18184d" }}>
                <div className="de elImageWrapper de-image-block elAlign_center elMargin0 ui-droppable de-editable" id="img-22828-100" data-de-type="img" data-de-editing="false" data-title="image" data-ce="false" data-trigger="none" data-animate="fade" data-delay={500} style={{ marginTop: 20, outline: "none", cursor: "pointer" }} data-hide-on="" aria-disabled="false">
                <img src="https://go.mindeo.com/hosted/images/6d/edbf2e2d194a22800047dfc4b510b4/wired-gradient-479-computer-laptop-notebook.gif" className="elIMG ximg" alt="" height="" data-lazy-loading="false" width={120} tabIndex={0} />
                </div>
                <div className="de elHeadlineWrapper ui-droppable de-editable" id="tmp_headline1-27838-155" data-de-type="headline" data-de-editing="false" data-title="headline" data-ce="true" data-trigger="none" data-animate="fade" data-delay={500} style={{ marginTop: 0, outline: "none", cursor: "pointer", fontFamily: '"Open Sans", Helvetica, sans-serif !important' }} aria-disabled="false" data-google-font="Open+Sans">
                <h1 className="ne elHeadline hsSize3 lh4 elMargin0 elBGStyle0 hsTextShadow0" style={{ textAlign: "center", fontSize: 24, color: "rgb(255, 255, 255)" }} data-bold="inherit" data-gramm="false">
                    <b>ORDINATEUR</b>
                </h1>
                </div>
                <div className="de elHeadlineWrapper ui-droppable de-editable" id="headline-89959-146-130" data-de-type="headline" data-de-editing="false" data-title="Paragraph" data-ce="true" data-trigger="none" data-animate="fade" data-delay={500} style={{ marginTop: 5, outline: "none", cursor: "pointer", fontFamily: '"Open Sans", Helvetica, sans-serif !important' }} aria-disabled="false" data-google-font="Open+Sans">
                <div className="ne elHeadline hsSize1 lh5 elMargin0 elBGStyle0 hsTextShadow0 padding15 mfs_20" data-bold="inherit" style={{ textAlign: "center", color: "rgb(255, 255, 255)", fontSize: 22 }} data-gramm="false"> Connectez-vous avec un ordinateur pour bénéficier pleinement de la conférence et du chat. </div>
                </div>
                <div className="de elSeperator elMargin0 ui-droppable de-editable" id="divider-30800-110-142" data-de-type="divider" data-de-editing="false" data-title="Divider" data-ce="false" data-trigger="none" data-animate="fade" data-delay={500} style={{ marginTop: 0, outline: "none", cursor: "pointer" }} aria-disabled="false">
                <div className="elDivider elDividerStyle1 elDividerShadow0 padding20-top padding0-bottom">
                    <div className="elDividerInner" data-width-border={10} data-height-border={1} style={{ borderColor: "rgb(255, 255, 255)" }} data-align="center" />
                </div>
                </div>
            </div>
            </div>
        </div>
        <div className="row bgCover noBorder borderSolid border3px cornersAll radius0 shadow0 P0-top P0-bottom P0H noTopMargin" id="row-184-132" data-trigger="none" data-animate="fade" data-delay={500} data-title="3 column row" style={{ paddingTop: 15, paddingBottom: 20, margin: "0px 80px", outline: "none", width: "auto" }}>
            <div id="col-left-148-186-136" className="col-md-4 innerContent col_left ui-resizable" data-col="left" data-trigger="none" data-animate="fade" data-delay={500} data-title="1st column" style={{ outline: "none" }}>
            <div className="col-inner bgCover  noBorder borderSolid border3px cornersAll radius0 shadow0 P0-top P0-bottom P0H noTopMargin" style={{ padding: "0 10px" }} />
            </div>
            <div id="col-center-155-159-129" className="col-md-4 innerContent col_right ui-resizable" data-col="center" data-trigger="none" data-animate="fade" data-delay={500} data-title="2nd column" style={{ outline: "none" }}>
            <div className="col-inner bgCover  noBorder borderSolid border3px cornersAll radius0 shadow0 P0-top P0-bottom P0H noTopMargin" style={{ padding: "0 10px" }}>
                <div className="de elImageWrapper de-image-block elAlign_center elMargin0 ui-droppable de-editable" id="img-76332-180-154" data-de-type="img" data-de-editing="false" data-title="image" data-ce="false" data-trigger="none" data-animate="fade" data-delay={500} style={{ marginTop: 30, outline: "none", cursor: "pointer" }} aria-disabled="false">
                <img src="https://go.mindeo.com/hosted/images/11/5fd43a2fb848a5afb1d9da8dceba05/Mindeo_Logotype_Blanc.png" className="elIMG ximg" alt="" width={150} tabIndex={0} />
                </div>
                <div className="de elHeadlineWrapper ui-droppable de-editable" id="tmp_paragraph-94256-176-104" data-de-type="headline" data-de-editing="false" data-title="Paragraph" data-ce="true" data-trigger="none" data-animate="fade" data-delay={500} style={{ marginTop: 30, outline: "none", cursor: "pointer", fontFamily: '"Open Sans", Helvetica, sans-serif !important' }} aria-disabled="false" data-google-font="Open+Sans">
                <div className="ne elHeadline hsSize1 lh5 elMargin0 elBGStyle0 hsTextShadow0" data-bold="inherit" style={{ textAlign: "center", color: "rgb(255, 255, 255)", fontSize: 12 }} data-gramm="false"> Ce site ne fait pas partie du site YouTube™, Google™, Facebook™, Google Inc. ou Facebook Inc. De plus, ce site n’est PAS approuvé par YouTube™, Google™ ou Facebook™ en aucune façon. FACEBOOK™ est une marque de commerce de FACEBOOK, Inc. GOOGLE™ et YOUTUBE™ sont des marques de commerce de GOOGLE Inc. </div>
                </div>
                <div className="de elHeadlineWrapper ui-droppable de-editable" id="tmp_paragraph-46173-113-118" data-de-type="headline" data-de-editing="false" data-title="Paragraph" data-ce="true" data-trigger="none" data-animate="fade" data-delay={500} style={{ marginTop: 30, outline: "none", cursor: "pointer", fontFamily: '"Open Sans", Helvetica, sans-serif !important' }} aria-disabled="false" data-hide-on="" data-google-font="Open+Sans">
                <div className="ne elHeadline hsSize1 lh5 elMargin0 elBGStyle0 hsTextShadow0" data-bold="inherit" style={{ textAlign: "center", color: "rgb(255, 255, 255)" }} data-gramm="false">
                    <a href="https://www.mindeo.com/mentions-legales" id="link-12560-427" className="" target="_blank" rel="noopener noreferrer" style={{ color: "rgb(255, 255, 255)" }}> Mentions légales </a> &nbsp;|&nbsp;{" "} <a href="https://www.mindeo.com/politique-de-confidentialite" id="link-74229-688" className="" target="_parent" rel="noopener noreferrer" style={{ color: "rgb(255, 255, 255)" }}> Politique de confidentialité </a>{" "} |{" "} <a href="https://www.mindeo.com/termes-et-conditions-de-vente" id="link-56051-205" className="" target="_parent" rel="noopener noreferrer" style={{ color: "rgb(255, 255, 255)" }}> CGV </a>
                </div>
                </div>
                <div className="de elHeadlineWrapper ui-droppable de-editable" id="headline-12060-125-120-119" data-de-type="headline" data-de-editing="false" data-title="Paragraph" data-ce="true" data-trigger="none" data-animate="fade" data-delay={500} style={{ marginTop: 30, outline: "none", cursor: "pointer", fontFamily: '"Open Sans", Helvetica, sans-serif !important' }} aria-disabled="false" data-google-font="Open+Sans">
                <div className="ne elHeadline hsSize1 lh5 elMargin0 elBGStyle0 hsTextShadow0 deNormalLS lh4" data-bold="inherit" style={{ textAlign: "center", color: "rgb(255, 255, 255)", wordBreak: "break-word", position: "relative", zIndex: 0, fontSize: 12 }} data-gramm="false" spellCheck="false" data-mci-spellchecked="true"> © Mindeo 2023 - <b>Tous droits réservés</b>
                </div>
                </div>
            </div>
            </div>
            <div id="col-right-167-181-185" className="col-md-4 innerContent col_right ui-resizable" data-col="right" data-trigger="none" data-animate="fade" data-delay={500} data-title="3rd Column" style={{ outline: "none" }}>
            <div className="col-inner bgCover  noBorder borderSolid border3px cornersAll radius0 shadow0 P0-top P0-bottom P0H noTopMargin" style={{ padding: "0 10px" }} />
            </div>
        </div>
        </div>
    </div>
    </div><Footer/>
    <FloatingWhatsApp phoneNumber="330755097584" accountName="Wendogo" avatar={SocialMediaLocgo} statusMessage="Répond en général dans les 24h" 
                        chatMessage={'Salut toi 🤝 \nUne question ? \nPour mieux t\'aider et pour une prompte réponse, fait ceci \n1. Présentes toi\n2. Donnes l\'objet de ton message \n3. Décris clairement ton problème 😉'}
                        placeholder={"Racontes nous ce qui te préoccupe"} chatboxHeight={500} CSSProperties={{color:'black'}}/>
    </>
    )
}

export default Congratulation;
