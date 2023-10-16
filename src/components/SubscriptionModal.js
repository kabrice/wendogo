
import { React, useState, useRef, useEffect }  from 'react';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import fr from 'react-phone-number-input/locale/fr'
import { useSelector, useDispatch } from 'react-redux'
import {close} from '../redux/modalslice'

const SubscriptionModal = () => {

    const [value, setValue] = useState()  

    const openModal = useSelector((state) => state.subsModal.open)
    const dispatch = useDispatch()
    
    const newRef = useRef(null)

    const handleOutsideClick = (e) => {
        if (newRef.current && !newRef.current.contains(e.target)) {
            dispatch(close())
        }
      };

    useEffect(() => {
        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
          document.removeEventListener("mousedown", handleOutsideClick);
        }
      })

    return (
        <div ref={newRef} className={"container containerModal midContainer noTopMargin padding40-top padding40-bottom padding40H noBorder borderSolid border3px cornersAll radius10 shadow0 bounce bgCover101 emptySection displayImportantTimed "+(openModal ? '' : 'hideSM')} style={{ marginTop: 100, paddingTop: 40, paddingBottom: 40, outline: "none", backgroundColor: "rgb(255, 255, 255)", position: "absolute", opacity: 1, top: 0, display: "block", color: 'black' }} data-trigger="none" data-animate="top" data-delay={0}>
            <div className="containerInner ui-sortable">
                <div className="row bgCover noBorder borderSolid border3px cornersAll radius0 shadow0 P0-top P0-bottom P0H noTopMargin" id="row--91171" data-trigger="none" data-animate="fade" data-delay={500} data-title="1 column row" style={{ paddingTop: 20, paddingBottom: 20, margin: "0px auto", outline: "none", width: "75%", maxWidth: "100%" }}>
                <div id="col-full-121" className="col-md-12 innerContent col_left" data-col="full" data-trigger="none" data-animate="fade" data-delay={500} data-title="1st column" style={{ outline: "none" }}>
                    <div className="col-inner bgCover  noBorder borderSolid border3px cornersAll radius0 shadow0 P0-top P0-bottom P0H noTopMargin" style={{ padding: "0 10px" }}>
                    <div className="de elHeadlineWrapper ui-droppable de-editable" id="tmp_headline1-38238" data-de-type="headline" data-de-editing="false" data-title="headline" data-ce="true" data-trigger="none" data-animate="fade" data-delay={500} style={{ marginTop: 0, outline: "none", cursor: "pointer", fontFamily: "Abel, Helvetica, sans-serif !important" }} data-google-font="Abel">
                        <h1 className="ne elHeadline hsSize3 lh4 elMargin0 elBGStyle0 hsTextShadow0 mfs_22" style={{ textAlign: "center", fontSize: 32, color: "rgb(96, 96, 96)" }} data-bold="inherit" data-gramm="false">
                        LANCEMENT DE <b style={{color:'#0154c0', fontFamily: '"Pensum Pro", sans-serif'}}>WENDOGO</b>
                        </h1>
                    </div>
                    <div className="de elHeadlineWrapper ui-droppable de-editable" id="tmp_subheadline-22378" data-de-type="headline" data-de-editing="false" data-title="sub-headline" data-ce="true" data-trigger="none" data-animate="fade" data-delay={500} data-gramm="false" style={{ marginTop: 0, outline: "none", cursor: "pointer" }}>
                        <h2 className="ne elHeadline hsSize2 lh3 elMargin0 elBGStyle0 hsTextShadow0 mfs_20 denormalnone22" style={{ textAlign: "center", fontSize: 22, wordBreak: "break-word", position: "relative", zIndex: 0 }} data-bold="inherit" data-gramm="false" spellCheck="false">
                        <b>Mercredi 6 Septembre à 20h30&nbsp;</b>
                        <div>(Heure de Yaoundé)</div>
                        </h2>
                    </div>
                    <div className="de elSeperator elMargin0 ui-droppable de-editable" id="tmp_divider-53315" data-de-type="divider" data-de-editing="false" data-title="Divider" data-ce="false" data-trigger="none" data-animate="fade" data-delay={500} style={{ marginTop: 5, outline: "none", cursor: "pointer" }}>
                        <div className="elDivider elDividerStyle1 padding10-top padding10-bottom">
                        <div className="elDividerInner" data-width-border={25} data-align="center" style={{ borderColor: "#0154c0" }} />
                        </div>
                    </div>
                    <div className="de elHeadlineWrapper ui-droppable de-editable" id="tmp_paragraph-41339" data-de-type="headline" data-de-editing="false" data-title="Paragraph" data-ce="true" data-trigger="none" data-animate="fade" data-delay={500} style={{ marginTop: 30, outline: "none", cursor: "pointer" }}>
                        <div className="ne elHeadline hsSize1 lh5 elMargin0 elBGStyle0 hsTextShadow0" data-bold="inherit" style={{ textAlign: "center", fontSize: 20 }} data-gramm="false"> Entrez votre prénom, nom et numéro whatsapp pour vous inscrire à la waitinglist. </div>
                    </div>
                    <div className="de elInputWrapper de-input-block elAlign_center elMargin0 ui-droppable de-editable" id="tmp_input-88080" data-de-type="input" data-de-editing="false" data-title="input" data-ce="false" data-trigger="none" data-animate="fade" data-delay={500} type="name" style={{ marginTop: 30, outline: "none", cursor: "pointer" }} data-element-theme="customized">
                        <input type="name" placeholder="Votre Prénom" name="firstname" className="elInput elInput100 elAlign_left elInputMid elInputStyl0 elInputBG1 elInputI0 elInputIBlack elInputIRight cleanSqueeze required0 elInputBR0 garlic-auto-save" data-type="extra" style={{ fontSize: 22, borderColor: "#0154c0", borderWidth: 3 }} />
                    </div>
                    <div className="de elInputWrapper de-input-block elAlign_center elMargin0 ui-droppable de-editable" id="tmp_input-88080" data-de-type="input" data-de-editing="false" data-title="input" data-ce="false" data-trigger="none" data-animate="fade" data-delay={500} type="name" style={{ marginTop: 30, outline: "none", cursor: "pointer" }} data-element-theme="customized">
                        <input type="name" placeholder="Votre Nom" name="lastname" className="elInput elInput100 elAlign_left elInputMid elInputStyl0 elInputBG1 elInputI0 elInputIBlack elInputIRight cleanSqueeze required0 elInputBR0 garlic-auto-save" data-type="extra" style={{ fontSize: 22, borderColor: "#0154c0", borderWidth: 3 }} />
                    </div>
                    {/* <div className="de elInputWrapper de-input-block elAlign_center elMargin0 ui-droppable de-editable" id="input-73382" data-de-type="input" data-de-editing="false" data-title="input" data-ce="false" data-trigger="none" data-animate="fade" data-delay={500} type="email" style={{ marginTop: 20, outline: "none", cursor: "pointer" }} data-element-theme="customized">
                        <input type="tel" placeholder="Votre Numéro Whatsapp" name="number" className="elInput elInput100 elAlign_left elInputMid elInputStyl0 elInputBG1 elInputI0 elInputIBlack elInputIRight cleanSqueeze elInputBR0 required1 garlic-auto-save" data-type="extra" style={{ fontSize: 22, borderColor: "#0154c0", borderWidth: 3 }} />
                    </div> */}
                    <div className="de elInputWrapper de-input-block elAlign_center elMargin0 ui-droppable de-editable" id="input-73382" data-de-type="input" data-de-editing="false" data-title="input" data-ce="false" data-trigger="none" data-animate="fade" data-delay={500} type="email" style={{ marginTop: 20, outline: "none", cursor: "pointer" }} data-element-theme="customized">
                        <PhoneInput labels={fr}  defaultCountry="CM" international countryCallingCodeEditable={false} placeholder="Votre Numéro Whatsapp" value={value} onChange={setValue}/>
                    </div>
                    <div className="de elBTN elAlign_center elMargin0 ui-droppable de-editable" id="tmp_button-29527" data-de-type="button" data-de-editing="false" data-title="button" data-ce="false" data-trigger="none" data-animate="fade" data-delay={500} style={{ marginTop: 20, outline: "none", cursor: "pointer" }} data-elbuttontype={1}>
                        <a href="javascript:void(0)" className="elButton elButtonSize1 elButtonColor1 elButtonRounded elButtonPadding2 elBtnVP_10 elButtonShadowN1 elButtonTxtColor1 elButtonCorner15 elBTN_b_none elButtonFull elBtnHP_10 mfs_20" style={{ color: "rgb(255, 255, 255)", fontWeight: 600, backgroundColor: "rgb(42, 74, 228)", fontSize: 26 }} rel="noopener noreferrer" data-previous-content=' 
                                        <span class="elButtonMain">
                                            <i class="fa fa_prepended fas fa-check"></i> JE RÉSERVE MA PLACE
                                        </span>
                                        <span class="elButtonSub"></span> ' data-href-original="#submit-form"> Je me pré-inscris </a>
                    </div>
                    </div>
                    <mci-extension data-role="overlay" id="overlay-root" />
                </div>
                </div>
            </div>
            <div className="closeLPModal" onClick={() => dispatch(close())}>
                <img src="https://assets.clickfunnels.com/images/closemodal.png" alt="" />
            </div>
    </div>
    )
}
export default SubscriptionModal;
