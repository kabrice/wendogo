
import { React, useState, useRef, useEffect }  from 'react';
import 'react-phone-number-input/style.css'
import PhoneInput,{ isPossiblePhoneNumber } from 'react-phone-number-input'
import fr from 'react-phone-number-input/locale/fr'
import { useSelector, useDispatch } from 'react-redux'
import {close} from '../redux/modalslice'
import { Link } from 'react-router-dom';
import {useSendVerificationAndAddUserMutation} from '../store/apis/userApi'
import useGeoLocation from "react-ipgeolocation"
import { useNavigate } from "react-router-dom"
import  { useForm, Controller }  from  "react-hook-form"
import { activateSpinner, deactivateSpinner } from '../redux/spinnerslice';
import { ToastContainer, toast } from 'react-toastify';
import helper from '../utils/Helper';
import 'react-toastify/dist/ReactToastify.css';
import { setUser } from '../redux/userslice';

const SubscriptionModal = () => {

   // const [sendVerificationHasError, setSendVerificationHasError] = useState(false)  

    const openModal = useSelector((state) => state.subsModal.open)
    const spinnerIsActive = useSelector((state) => state.spinner.activateSpinner)

    const dispatch = useDispatch()
    
    const newRef = useRef(null)

    const handleOutsideClick = (e) => {
        if (newRef.current && !newRef.current.contains(e.target)) {
            
            dispatch(close())
        }
      };
    const location = useGeoLocation();
    //console.log('eeee',location.country);
    const [sendVerificationAndAddUser] = useSendVerificationAndAddUserMutation()
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors }, control } = useForm({
        // use mode to specify the event that triggers each input field 
        mode: "onBlur"
      })
    let msgToast
    let errorText = <p>Une erreur est survenue. Nous en sommes désolé. Veuillez nous soumettre le problème 
                         <a href="https://m.me/wendogoHQ" style={{color: "rgb(1, 84, 192)"}}><b> ici.</b></a>
                       </p>

    async function onSubmitUserForVerification (data)  {
        //
        console.log('eeee',location.country);
        
      
        try {

            data.country = location.country
            dispatch(activateSpinner())
            
            const result = await sendVerificationAndAddUser(data).unwrap()
            dispatch(deactivateSpinner())
            console.log('result🖐🖐', result)
            if(result.success){          
                dispatch(setUser(result.user))
                //Set expiration date for verification (verification page)
                const d1 = new Date ()
                const d2 = new Date ( d1 );
            
                d2.setMinutes ( d1.getMinutes() + 10 );
                let expirationVerifDate = (d2.toTimeString().split(' ')[0])
                expirationVerifDate = expirationVerifDate.substring(0, expirationVerifDate.lastIndexOf(':')); 
                helper.setLocalStorageWithExpiration('wendogouser', result.user, 600000)
                helper.setLocalStorageWithExpiration('expirationVerifDate', expirationVerifDate, 600000)
                //localStorage.setItem('wendogouser', JSON.stringify(result.user));
                // if(result.user.has_whatsapp){
                //     console.log('Hey localStorage', localStorage.getItem('wendogouser'))
                //     navigate('/congratulation')
                //     //navigate('/verification')
                // }else{
                //     navigate('/verification')
                // }
                navigate(result.user.subscription_step)
            }else if (result.errorId){
                msgToast = () => (
                    <div>
                      {errorText}
                      <p>Code Erreur : {result.errorId} </p>
                    </div>
                  )
                helper.toastError(msgToast)              
            }
            //console.log('eeee', result);

          } catch (error) {
            dispatch(deactivateSpinner())
            console.log('error',error);
            
            if(error.status === 'FETCH_ERROR'){
                msgToast = () => (
                    <div>
                      <p>Veuillez verifier votre connexion internet. Ou contactez-nous  
                         <a href="https://m.me/wendogoHQ" style={{color: "rgb(1, 84, 192)"}}><b> ici.</b></a>
                       </p>
                    </div>
                  )
            }else{
                msgToast = () => (
                    <div>{errorText}</div>
                  )                
            }
            helper.toastError(msgToast)  
          }
   
        //
    }
    useEffect(() => {
        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
          document.removeEventListener("mousedown", handleOutsideClick);
        }

      })

    //const [ipAddress, setIPAddress] = useState('') 
    //   useEffect(() => {

    //     fetch('https://api.ipify.org?format=json')
    //       .then(response => response.json())
    //       .then(data => setIPAddress(data.ip))
    //       .catch(error => console.log(error))
    //   }, []);
      
    
    return (
        <div ref={newRef} className={"container containerModal midContainer noTopMargin padding40-top padding40-bottom padding40H noBorder borderSolid border3px cornersAll radius10 shadow0 bounce bgCover101 emptySection displayImportantTimed "+(openModal ? '' : 'hideSM')} style={{ marginTop: 100, paddingTop: 40, paddingBottom: 40, outline: "none", backgroundColor: "rgb(255, 255, 255)", position: "absolute", opacity: 1, top: 0, display: "block", color: 'black' }} data-trigger="none" data-animate="top" data-delay={0}>
            <ToastContainer/>
            <div className="containerInner ui-sortable">
                <div className="row bgCover noBorder borderSolid border3px cornersAll radius0 shadow0 P0-top P0-bottom P0H noTopMargin" id="row--91171" data-trigger="none" data-animate="fade" data-delay={500} data-title="1 column row" style={{ paddingTop: 20, paddingBottom: 20, margin: "0px auto", outline: "none", width: "75%", maxWidth: "100%" }}>
                <form onSubmit={handleSubmit(onSubmitUserForVerification)} id="col-full-121" className="col-md-12 innerContent col_left" data-col="full" data-trigger="none" data-animate="fade" data-delay={500} data-title="1st column" style={{ outline: "none" }}>
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
                    <div className="de elInputWrapper de-input-block elAlign_center elMargin0 ui-droppable de-editable" type="name" style={{ marginTop: 30, outline: "none", cursor: "pointer" }} data-element-theme="customized">
                        <input type="name" placeholder="Votre Prénom" name="firstname" {...register("firstname", { required: true, minLength: 3, maxLength:46,  pattern: /^[a-zA-ZÀ-ÿ-]+(?:\s(?:d[eu']|l[ea']|van\sder\s|de\s)?[a-zA-ZÀ-ÿ-]+)*$/  })} 
                                className="elInput elInput100 elAlign_left elInputMid elInputStyl0 elInputBG1 elInputI0 elInputIBlack elInputIRight cleanSqueeze required0 elInputBR0 garlic-auto-save" 
                                data-type="extra" 
                                style={{ fontSize: 22, borderColor: errors.firstname ? "red" : "#0154c0", borderWidth: 2 }} />
                        {errors.firstname && <p className='input-error'>Le prénom est requis et doit être valide</p>}
                    </div>
                    <div className="de elInputWrapper de-input-block elAlign_center elMargin0 ui-droppable de-editable" type="name" style={{ marginTop: 30, outline: "none", cursor: "pointer" }} data-element-theme="customized">
                        <input type="name" placeholder="Votre Nom" name="lastname" {...register("lastname", { required: true, minLength: 3,  maxLength:46, pattern: /^[a-zA-ZÀ-ÿ-]+(?:\s(?:d[eu']|l[ea']|van\sder\s|de\s)?[a-zA-ZÀ-ÿ-]+)*$/ })} className="elInput elInput100 elAlign_left elInputMid elInputStyl0 elInputBG1 elInputI0 elInputIBlack elInputIRight cleanSqueeze required0 elInputBR0 garlic-auto-save" data-type="extra" 
                        style={{ fontSize: 22, borderColor: errors.lastname ? "red" : "#0154c0", borderWidth: 2 }} />
                        {errors.lastname && <p className='input-error'>Le nom est requis et doit être valide</p>}
                    </div>
                    {/* <div className="de elInputWrapper de-input-block elAlign_center elMargin0 ui-droppable de-editable" id="input-73382" data-de-type="input" data-de-editing="false" data-title="input" data-ce="false" data-trigger="none" data-animate="fade" data-delay={500} type="email" style={{ marginTop: 20, outline: "none", cursor: "pointer" }} data-element-theme="customized">
                        <input type="tel" placeholder="Votre Numéro Whatsapp" name="number" className="elInput elInput100 elAlign_left elInputMid elInputStyl0 elInputBG1 elInputI0 elInputIBlack elInputIRight cleanSqueeze elInputBR0 required1 garlic-auto-save" data-type="extra" style={{ fontSize: 22, borderColor: "#0154c0", borderWidth: 3 }} />
                    </div> */}
                    <div className="de elInputWrapper de-input-block elAlign_center elMargin0 ui-droppable de-editable" id="input-73382" data-de-type="input" data-de-editing="false" data-title="input" data-ce="false" data-trigger="none" data-animate="fade" data-delay={500} type="email" style={{ marginTop: 20, outline: "none", cursor: "pointer" }} data-element-theme="customized">
                        <Controller name="phone"
                                    control={control}
                                    defaultValue=""
                                    rules={{validate: (value) => isPossiblePhoneNumber(`${value}`)}}
                                    render={({ field: { onChange, value } }) => (
                                                <PhoneInput labels={fr}  
                                                            style={{color: "green"}}
                                                            id="phone"
                                                            defaultCountry="FR" 
                                                            international 
                                                            countryCallingCodeEditable={false} 
                                                            placeholder="Votre Numéro Whatsapp" 
                                                            value={value} 
                                                            className={errors["phone"] ? 'subscription-phone-ko' : 'subscription-phone-ok'}
                                                            onChange={onChange}
                                                            />
                                                            )}/>
                        {errors["phone"]  && <p className='input-error'>Le numéro de téléphone doit être valide</p>}
                    </div>
                    <div className="de elBTN elAlign_center elMargin0 ui-droppable de-editable" id="tmp_button-29527" data-de-type="button" data-de-editing="false" data-title="button" data-ce="false" data-trigger="none" data-animate="fade" data-delay={500} style={{ marginTop: 20, outline: "none", cursor: "pointer" }} data-elbuttontype={1}>
                        {/* <a href="javascript:void(0)" rel="noopener noreferrer"  data-href-original="#submit-form">  </a> */}
                        <button disabled={spinnerIsActive}  type="submit" className="elButton elButtonSize1 elButtonColor1 elButtonRounded elButtonPadding2 elBtnVP_10 elButtonShadowN1 elButtonTxtColor1 elButtonCorner15 elBTN_b_none elButtonFull elBtnHP_10 mfs_20" style={{ color: "rgb(255, 255, 255)", fontWeight: 600, backgroundColor: "rgb(42, 74, 228)", fontSize: 26 , fontFamily: 'inherit'}} >
                            Je me pré-inscris
                        </button> 
                        {/*<button onClick={() => onSubmitUserForVerification()}>SEND</button>   
                         <>
                        <h1>Your IP Address is: {ipAddress}</h1>
                        </>             */}
                    </div>
                    </div>
                    <mci-extension data-role="overlay" id="overlay-root" />
                </form>
                </div>
            </div>
            <div className="closeLPModal" onClick={() => dispatch(close())}>
                <img src="https://assets.clickfunnels.com/images/closemodal.png" alt="" />
            </div>
            
    </div>
    )
}
export default SubscriptionModal;
