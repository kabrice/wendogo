import React, { useState, useEffect, useRef } from 'react';
import { useUserQuery } from '../store/apis/userApi';
import { useSelector, useDispatch } from 'react-redux'
import  { useForm, Controller }  from  "react-hook-form"
import {useSendCodeForVerificationMutation} from '../store/apis/userApi'
import { useNavigate } from "react-router-dom"
import { activateSpinner, deactivateSpinner } from '../redux/spinnerslice'
import helper from '../utils/Helper';
import {  ToastContainer } from 'react-toastify';
import {useSendVerificationAndAddUserMutation} from '../store/apis/userApi'
import { setUser } from '../redux/userslice';
import FooterSingleRow from '../components/FooterSingleRow';

const VerificationWhatsapp = () => {
    const length = 6
    const [code, setCode] = useState([...Array(length)].map(() => ""));
    const inputs = useRef([]);
    const [loading, setLoading] = useState(false);
    const spinnerIsActive = useSelector((state) => state.spinner.activateSpinner)
    //const user = useSelector((state) => state.user.user)
    const user = JSON.parse(localStorage.getItem('wendgouser'))
    const dispatch = useDispatch()
    const [sendVerificationCode] = useSendVerificationAndAddUserMutation()

    //const {data, error, isLoading, isSuccess} = useUsersQuery()
    const navigate = useNavigate()

    const userPhone= (user.phone).slice(0, 5) + (user.phone).slice(5).replace(/.(?=..)/g, '*')
    const country = user.country
    const d1 = new Date ()
    const d2 = new Date ( d1 );

    d2.setMinutes ( d1.getMinutes() + 10 );
    let aDate = (d2.toTimeString().split(' ')[0])
    aDate = aDate.substring(0, aDate.lastIndexOf(':')); 

   
    //console.log('userPhone',replaced)
    const processInput = (e, slot) => {
        const num = e.target.value;
        if (/[^0-9]/.test(num)) return;
        const newCode = [...code];
        newCode[slot] = num;
        setCode(newCode);
        if (slot !== length - 1) {
          inputs.current[slot + 1].focus();
        }
        if (newCode.every(num => num !== "")) {
          //onComplete(newCode.join(""));
          //console.log('code', newCode)
        }
      };

    const onKeyUp = (e, slot) => {
        if (e.keyCode === 8 && !code[slot] && slot !== 0) {
        const newCode = [...code];
        console.log('code', newCode)
        //newCode[slot - 1] = "";
        setCode(newCode);
        inputs.current[slot - 1].focus();
        
        }
    };
    const [sendCodeForVerification] = useSendCodeForVerificationMutation()
    const {handleSubmit, formState: { errors }, control } = useForm()
    async function onSubmitUserVerificationCode (data) {
        let verificationCode = Object.values(data).flat().join('')
        console.log('verificationCode',  verificationCode, {phone : user.phone, code: verificationCode})
        try {
            dispatch(activateSpinner())
            console.log('data', data);
            const result = await sendCodeForVerification({phone : user.phone, code: verificationCode}).unwrap();
       
            dispatch(deactivateSpinner())

            if(result.success){   
                console.log('👍👍', result)     
                navigate('/credentialstart')
            }else if (result.errorId){
                const msgToast = () => (
                    <div>
                      <p>Une erreur est survenue. Nous en sommes désolé. Veuillez nous soumettre le problème 
                        <a href="https://m.me/wendogoHQ" style={{color: "rgb(1, 84, 192)"}}><b> ici.</b></a></p>
                      <p>Code Erreur : {result.errorId} </p>
                    </div>
                  )
                  helper.toastError(msgToast)             
            }
            //console.log('eeee', result);

          } catch (error) {
            dispatch(deactivateSpinner())
            console.log('error',error);
          }        
    }
    const wasCalled = useRef(false);

    useEffect(() => {
        if(wasCalled.current) return;
        wasCalled.current = true;
        helper.toastInfo('Vous devez vérifier votre numéro whatsapp pour continuer')
      }, [])

    const getInputError = (isError) => {
        return (<p className='input-code-error'><span className='input-code-error1'><svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" width="1em" height="1em"><path d="M21.64 17.34L14.05 4.2c-.92-1.59-3.22-1.59-4.14 0L2.32 17.34c-.92 1.59.23 3.59 2.07 3.59h15.18c1.84 0 2.99-2 2.07-3.59zM11.26 7.91h1.45c.26 0 .47.25.45.53l-.5 5.53c-.01.15-.13.27-.27.27h-.78c-.14 0-.26-.12-.27-.27l-.53-5.52c-.02-.29.18-.54.45-.54zm.73 10.19c-.64 0-1.17-.52-1.17-1.17 0-.64.53-1.17 1.17-1.17.65 0 1.17.53 1.17 1.17 0 .65-.52 1.17-1.17 1.17z"></path></svg></span> 
        <span className='input-code-error2'>Obligatoire</span></p>)
    }
    let countError = 0

    let msgToast
    let errorText = <p>Une erreur est survenue. Nous en sommes désolé. Veuillez nous soumettre le problème 
                         <a href="https://m.me/wendogoHQ" style={{color: "rgb(1, 84, 192)"}}><b> ici.</b></a>
                       </p>
    async function resendVerificationCode(){
        try {

            //data.country = location.country
            dispatch(activateSpinner())
            
            const result = await sendVerificationCode(user).unwrap();
       
            dispatch(deactivateSpinner())
            console.log('result😁😁', result);
            if(result.success){          
                dispatch(setUser(result.user))

                if(result.user.has_whatsapp){
                    helper.toastSuccess('Un code de vérification vous a été renvoyé')
                    const d1 = new Date ()
                    const d2 = new Date ( d1 );
                
                    d2.setMinutes ( d1.getMinutes() + 10 );
                    aDate = (d2.toTimeString().split(' ')[0])
                    aDate = aDate.substring(0, aDate.lastIndexOf(':')); 
                }

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
                    {errorText}
                  )                
            }
            helper.toastError(msgToast)  
          }
    }
return (
    <div>
        <ToastContainer/>
        <div className="contentContainer" id="content">
            <div data-nemo="challengePage">
            <header>
                <div className="wendogo-logo" />
            </header>
            <div data-nemo="smsChallengePage" className="smsChallenge">
                <div className="ppvx_text--heading-sm___5-8-2 ppvx--v2___5-8-2"> Entrez votre code </div>
                <div className="ppvx_text--body___5-8-2 top15 description ppvx--v2___5-8-2" data-nemo="smsChallengeDescription"> Votre code a été envoyé sur votre compte WhatsApp {userPhone}. 
                            Ce code expirera à {aDate} (Heure {country}) </div>
            </div>
            <form method="post" noValidate="" className="top15" onSubmit={handleSubmit(onSubmitUserVerificationCode)}>
                <div>
                <div>
                    <div className="codeInput">
                    <div className="codeInput-resend" id="code-resend"> {" "} <div className="resend-link">
                        <a onClick={() => resendVerificationCode()} className="ppvx_link___3-9-8 ppvx--v2___3-9-8 resend" href="#"> Renvoyer </a>
                        </div>{" "} </div>
                    <div>
                        <div className="ppvx_code-input___1-4-10 codeInput-wrapper" id="otpCode">
                        <div className="ppvx_code-input__input-wrapper___1-4-10">
                        {code.map((num, idx) => {
                            
                            if(errors['number'+idx]){
                                countError++
                            }
                            //setCountError(countError+1)
                            return (
                                <div key={idx} className="ppvx_text-input___3-14-9 ppvx_text-input--nolabel___3-14-9 ppvx--v2___3-14-9 ppvx_code-input__text-input___1-4-10">
                        <Controller name={'number'+idx}
                                    control={control}
                                    defaultValue=""
                                    rules={{ required: true}}
                                    render={({ field}) => (
                                        <input className="ppvx_text-input__control___3-14-9 ppvx_code-input__input___1-4-10 hasHelp" 
                                                style={{border : errors['number'+idx] && '2px solid red'}}
                                                name={'number'+idx}                         
                                                type="text"
                                                inputMode="numeric"
                                                maxLength={1}
                                                value={num}
                                                autoFocus={!code[0].length && idx === 0}
                                                readOnly={loading}
                                                onChange={e => {processInput(e, idx); field.onChange(e)}}
                                                onKeyUp={e => onKeyUp(e, idx)}
                                                ref={ref => inputs.current.push(ref)}/>)}/>
                                   
                                    {countError === 1 && errors['number'+idx] && getInputError()}
                                </div>
                                );
                                })}
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
                <button disabled={spinnerIsActive}  className="ppvx_btn___5-11-8 ppvx--v2___5-11-8 scTrack:security_code_continue_button button" type="submit" id="securityCodeSubmit" name="submitSecurityCode" data-nemo="securityCodeSubmit"> Continuer</button>
            </form>
            <div className="top40">
                <div className="contactUsSection">
                <div className="ppvx_text--caption___5-8-2 ppvx--v2___5-8-2"> {" "}Besoin d'un coup de main?&nbsp; <a href="https://m.me/wendogoHQ" className="ppvx_link___3-9-8 ppvx_link--caption___3-9-8 ppvx--v2___3-9-8 contactUs scTrack:contactUs_link" target="_blank" rel="noreferrer noopener"> Nous sommes là. </a>
                </div>
                </div>
            </div>
            </div>
        </div>
        <div className="force_FooterSingleRow_to_bottom">
          <FooterSingleRow/>
        </div>
        
    </div>
    )
}

export default VerificationWhatsapp;
