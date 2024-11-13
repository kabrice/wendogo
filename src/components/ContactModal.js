import React, { useState, useEffect } from 'react';
import SETextArea from './SimulationEngine/SETextArea';
import helper from '../utils/Helper';
import Link from 'next/link';
import Hostess  from '../assets/simulation_icons/hostess.svg'; 
import { useUpdateClicksAndProjectMessageByUserIdMutation } from '../store/apis/leadApi';
import { activateSpinner, deactivateSpinner } from '../redux/spinnerslice';
import { useDispatch, useSelector } from 'react-redux'
import { Loader2 } from "lucide-react";
import { setUser } from '../redux/userSlice';

const ContactModal = ({ 
  isOpen,  
  setOpenContactModal,
  newRefContactModal,
    setDisplayEmailButton,
    setDisplayWhatsappButton,
    displayEmailButton,
    displayWhatsappButton,
    setIsErrorPage
}) => {

  const user = useSelector((state) => state.user); 
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(true); 
  const [message, setMessage] = useState('');
  const [displayEmailOption, setDisplayEmailOption] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [valid, setValid] = useState(true);  

  useEffect(() => {
    const initializeUserData = () => {
      try {
        if (user) {
          //
          setMessage(user.projectMessage || '');
          setDisplayEmailOption(!!user.email);
        }
      } catch (error) {
        console.error('Error loading user data:', error);
        setIsErrorPage(true);
      } finally {
        setIsLoading(false);
      }
    };

    if (isOpen) {
      initializeUserData();
    }
  }, [isOpen, setIsErrorPage]);
  
  //let user = helper.getLocalStorageWithExpiration('wendogouser');  
  //const [message, setMessage] = useState(user?.projectMessage || '');
  //const [displayEmailOption, setDisplayEmailOption] = useState(user?.email ? true : false);
  const whatsappMessage = encodeURIComponent(`${message}`);
  const wendogoNumber = '+33668156073';
  const whatsappUrl = `https://wa.me/${wendogoNumber.replace('+', '')}?text=${whatsappMessage}`;
  const emailSubject = encodeURIComponent("Informations sur le programme Wendogo");
  const emailBody = encodeURIComponent(message);
  const emailUrl = `mailto:contact@example.com?subject=${emailSubject}&body=${emailBody}`;

  //const [errorMessage, setErrorMessage] = useState('');
  //const [valid, setValid] = useState(true);
  
  
  const [updateClicksAndProjectMessageByUserId] = useUpdateClicksAndProjectMessageByUserIdMutation();

    // const goBackToSimulationEngine = () => {
    //     window.location.href = '/simulation/engine?country=FR#form/COORDONNEES';
    // }
    const sendWhatsappMessage = async () => {
    if (valid) {
        setDisplayWhatsappButton(false); 
        window.open(whatsappUrl, '_blank');
        dispatch(activateSpinner());
        await updateClicksNumberProjectMessageByUserId();
        dispatch(deactivateSpinner());
    }
  };

  const updateClicksNumberProjectMessageByUserId = async () => {

    try {
        const response = await updateClicksAndProjectMessageByUserId({userId: user?.userId, projectMessage: message});
        if (response.data) {
            console.log('updateClicksNumberProjectMessageByUserId', response.data);
        }
    }
    catch (error) {
        console.log('updateClicksNumberProjectMessageByUserId', error);
        setIsErrorPage(true);
    }
     

 };

  const sendEmail = async () => {
    if(valid) {
        try {
            setDisplayEmailButton(false); 
            window.open(emailUrl, '_blank');
            dispatch(activateSpinner());
            await updateClicksNumberProjectMessageByUserId();
            dispatch(deactivateSpinner());
        }
        catch (error) {
            console.log('sendEmail', error);
            setIsErrorPage(true);
        } 
    }
};

  const validateMessage = (message) => {
    console.log('messagexx' , message);
    const rules = [
        { regex: /^[a-zA-ZÀ-ÿœŒàáâãäåçèéêëìíîïðòóôõöùúûüýÿ0-9\s,'.;'''‛«»„"""-]+$/gm, error: "Seules les lettres, les chiffres et les espaces sont autorisés." },
        { regex: /^[\s\S]{10,36000}$/, error: "Le contenu doit être compris entre 10 et 36000 caractères." },
        { regex: /^(?!.*[^\S\n]{2,})[\s\S]*$/, error: "Aucun espace consécutif n'est autorisé." },
        // Add more rules as needed
    ];
    //console.log('message', message);
    for (let rule of rules) {
        if (!rule.regex.test(message)) {
            setErrorMessage(rule.error);
            return false;
        }
    }
    setErrorMessage('');
    return true;
    };

  useEffect(() => {
    setValid(validateMessage(message));
  }, [message]);

  const handleChange = (e) => {
    const message = e.target.value;
    setMessage(message);
    updateWendogouser(message);
   };
    // const updateWendogouser = (projectMessage) => {
    //     let updatedUser = { ...user, projectMessage, date: new Date().toISOString() };
    //     helper.setLocalStorageWithExpiration('wendogouser', updatedUser);
    // };
    const updateWendogouser = (projectMessage) => {
        if (user) {
            const updatedUser = { 
            ...user, 
            projectMessage, 
            date: new Date().toISOString() 
            };
            dispatch(setUser(updatedUser));
            helper.setLocalStorageWithExpiration('wendogouser', updatedUser);
            //dispatch(setUser(updatedUser));
        }
        };

   // Show nothing if modal is not open
   if (!isOpen) return null;

   // Show loading state
   if (isLoading) {
    
     return (
        <div className="flex items-center justify-center min-h-[200px]">
            <Loader2 className="w-8 h-8 animate-spin" />
        </div>
     );
   }  


  const handleCloseButton = () => {
    setOpenContactModal(false);
    setDisplayEmailButton(true);
    setDisplayWhatsappButton(true);
    };
  const renderContactFirstStep = () => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[1001] flex items-center justify-center">
            <div className="Card relative w-full max-w-2xl mx-4">
                <div style={{padding:10}} ref={newRefContactModal}> 
                    <div style={{height: '70vh', overflowY: 'auto'}}>
                        <div className="Stack-child  " style={{ paddingTop: 0 }}>
                            <div className="closeLPModal" onClick={()=> handleCloseButton()} style={{right:'-10px', top: '-15px'}} > 
                                <svg id="icon-chatbot-cta-croix" viewBox="0 0 22 22" width={24}>
                                    <mask id="path-1-inside-1_995_60133" fill="#fff">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M11 0c6.075 0 11 4.925 11 11s-4.925 11-11 11S0 17.075 0 11 4.925 0 11 0z" /> </mask>
                                    <path fillRule="evenodd" clipRule="evenodd" d="M11 0c6.075 0 11 4.925 11 11s-4.925 11-11 11S0 17.075 0 11 4.925 0 11 0z" fill="#7F94A9" />
                                    <path d="M11 2a9 9 0 019 9h4c0-7.18-5.82-13-13-13v4zm9 9a9 9 0 01-9 9v4c7.18 0 13-5.82 13-13h-4zm-9 9a9 9 0 01-9-9h-4c0 7.18 5.82 13 13 13v-4zm-9-9a9 9 0 019-9v-4C3.82-2-2 3.82-2 11h4z" fill="#fff" mask="url(#path-1-inside-1_995_60133)" />
                                    <path d="M13.39 7.277a.945.945 0 011.335 0 .945.945 0 01.127 1.175l-.056.08-.07.08-2.39 2.389 2.39 2.389c.29.29.354.727.172 1.092l-.046.083-.056.08-.07.08a.946.946 0 01-1.177.127l-.08-.055-.08-.072L11 12.337l-2.39 2.388a.943.943 0 01-1.092.173l-.083-.046-.08-.055-.08-.072a.945.945 0 01-.127-1.175l.056-.08.07-.08L9.665 11l-2.39-2.389a.942.942 0 01-.172-1.092l.046-.083.056-.08.07-.08a.946.946 0 011.177-.127l.08.056.08.07L11 9.667l2.39-2.39z" fill="#fff" /> 
                                </svg>
                                </div>
                            <div className="Box   " style={{ padding: '0 0 10px', backgroundColor: "#0154c0", borderWidth: "initial", borderStyle: "none", borderColor: "initial", borderRadius: '15px 15px 0 0' }}>
                                <div className="Stack  stackColumn " style={{ flexDirection: "column", padding: 0, alignItems: "stretch" }}>
                                    <div className="Stack-child  " style={{ paddingTop: 0 }}>
                                        <div className="Stack  stackRow " style={{ flexDirection: "row", padding: 0, alignItems: "stretch" }}>
                                            <div className="Stack-child  " style={{ paddingLeft: 0 }}>
                                                <div className="Box   " style={{ padding: 20, borderWidth: "initial", borderStyle: "none", borderColor: "initial" }}>
                                                    <div className="icon-wrapper " style={{ color: "white" }}>
                                                        <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" height="50px" width="50px">
                                                            <path d="M12.098 20.161a1.5 1.5 0 00-2.196 2.045l4.953 5.316a1.5 1.5 0 002.176.02l13.048-13.5a1.5 1.5 0 00-2.158-2.084L15.972 24.32l-3.874-4.16z" fillRule="evenodd" /> </svg>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="Stack-child  " style={{ paddingLeft: 0 }}>
                                                <div className="Box   " style={{ padding: "30px 30px 0px", maxWidth: 500, marginLeft: "auto", marginRight: "auto", borderWidth: "initial", borderStyle: "none", borderColor: "initial" }}>
                                                    <div className="Heading s isWeak  white" style={{lineHeight: '2.5rem',}}> Merci {user?.firstname}, Wendogo s'engage à vous contacter <span> au <span data-cs-mask="true"> {user?.phoneNumberFormatted.name} {displayEmailOption && `ou par e-mail à ${user?.email}`}</span> </span>
                                                        <Link type="button" style={{marginLeft: 10}}  href="/simulation/engine?country=FR#form/COORDONNEES">
                                                            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="25px" height="24.9987469px" viewBox="0 0 25 24.9987469" version="1.1">
                                                                <title>Group</title>
                                                                <g id="Page-1" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd" >
                                                                    <g id="Group" fill="#FFFFFF">
                                                                        <path d="M23.0642768,4.75627689 L21.7187334,6.090213 L18.9901466,3.27948283 L20.3356899,1.94554671 C20.4864363,1.79563297 20.6909681,1.71237592 20.9035582,1.71435371 C21.1161482,1.71640288 21.3190665,1.80351897 21.4669463,1.95626106 L23.0749911,3.61162756 C23.3830458,3.93270159 23.3782877,4.44102563 23.0642768,4.75627689 L23.0642768,4.75627689 Z M6.88561387,20.8010105 L4.15702702,17.9911731 L15.4124478,6.82771717 C15.4160192,6.83039576 15.4160192,6.83486007 15.4195907,6.83843152 L18.1392489,9.63934021 L6.88561387,20.8001176 L6.88561387,20.8010105 Z M2.5659466,22.4215553 L3.30166504,19.5554677 L5.34364087,21.6608367 L2.5659466,22.4215553 Z M17.7794255,4.4821682 L20.5080123,7.29200551 L19.3499701,8.44022629 L16.6303118,5.63753187 L16.6204903,5.63038897 L17.7794255,4.4821682 L17.7794255,4.4821682 Z M24.2857122,2.41072791 L22.6785603,0.755361413 C22.2102093,0.274234132 21.5678478,0.00197071684 20.8964074,0 C20.2365822,0 19.6169359,0.256251449 19.1472903,0.72143265 L2.35969543,17.3706339 C2.13897659,17.5894245 1.98188649,17.8641007 1.90522858,18.1652813 L0.923080166,21.9911958 C0.848972604,22.281376 0.853436915,22.5804848 0.927544477,22.8608435 L0.253433523,23.5304902 C-0.0799102441,23.8640895 -0.0850699215,24.4030773 0.241826314,24.742997 C0.399166706,24.9044642 0.614421692,24.9964901 0.839861052,24.9987087 C1.06530041,25.0008481 1.28229396,24.913 1.44272596,24.7546042 L2.13022985,24.0724575 C2.2730878,24.1108506 2.41683861,24.1376365 2.5659466,24.1376365 C2.71416172,24.1376365 2.86326971,24.1179935 3.01059197,24.0778147 L6.72043437,23.0617375 C7.0007931,22.9840585 7.25704455,22.8358434 7.46508144,22.6295922 L24.2526763,5.98039095 C25.2357509,4.99893823 25.2508468,3.41068939 24.2866051,2.41072791 L24.2857122,2.41072791 Z" id="Shape" /> </g>
                                                                </g>
                                                            </svg>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="stack-child" style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                        <div className="box">
                                            <svg width={200} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Слой_1" x="0px" y="0px" viewBox="0 0 259.38 229.74" style={{ enableBackground: "new 0 0 259.38 229.74" }} xmlSpace="preserve">
                                                <style type="text/css" dangerouslySetInnerHTML={{ __html: "\n\t.st0{fill:#C18E6B;}\n\t.st1{fill:#D5A581;}\n\t.st2{opacity:0.93;fill:#C99C7D;}\n\t.st3{fill:#fff;}\n\t.st4{fill:#AF7C5A;}\n\t.st5{fill:#D5A285;}\n\t.st6{fill:#B78462;}\n\t.st7{fill:#BC8A68;}\n\t.st8{fill:#E5B99D;}\n" }} />
                                                <g>
                                                    <path className="st0" d="M134.43,125.07c0.85,3.34,1.6,6.65,1.5,10.12c-0.11,3.49-0.57,6.99-0.95,10.46   c-0.75,6.96-1.4,13.86-3.44,20.57c-2,6.59-1.46,13.54-1.05,20.32c0.41,6.95,1.22,13.9,2.86,20.68c1.77,7.32,4.76,14.64,4.15,22.32   c12.31,0,24.62,0,36.94,0c1.78,0,3.56,0,5.33,0c-0.78-5.65-1.62-11.14-3.04-16.67c-1.42-5.53-2.89-11.05-4.18-16.61   c-1.24-5.35-2.08-10.74-2.94-16.16c-0.3-1.91-0.41-3.28,1.07-4.67c1.36-1.28,3.14-2,4.6-3.15c3.75-2.96,6.39-7.86,8.61-11.99   c1.27-2.37,2.47-4.87,4.04-7.06c1.5-2.09,3.82-3.48,5.85-5c2.07-1.55,4.11-3.14,6.21-4.64c2.45-1.75,4.58-1.77,7.35-2.6   c4.42-1.33,7.92-4.69,5.33-9.43c-1.2-2.19-3.39-4.56-5.49-5.91c-2.29-1.47-5.15-1.18-7.68-0.61c-6.16,1.37-11.94,4.16-17.56,6.95   c3.98-13.14,7.64-26.43,12.2-39.39c1.09-3.1,2.29-6.15,3.45-9.22c1.07-2.83,2.4-5.79,2.85-8.81c0.39-2.67-0.44-5.14-2.97-6.37   c-2.84-1.38-6.07-0.56-8.95,0.22c2.48-3.31,2.78-8.53-0.33-11.56c-2.92-2.85-7.25-2.71-10.13,0.01c-0.45-4.84-6.16-7.36-10.21-5.1   c-4.74,2.64-8.64,7.94-11.26,12.57c-1.24-2.46-5.01-1.91-7.11-1.28c-2.86,0.87-5.35,2.69-7.33,4.9c-4.2,4.69-6.67,11.08-8.83,16.91   c-2.22,6.01-4.86,13.01-3.96,19.5C130.32,111.33,132.69,118.27,134.43,125.07z" />
                                                    <path className="st1" d="M69.58,151.35c1.67,2.92,2.74,6.14,4.43,9.06c1.62,2.79,3.52,5.41,5.67,7.81c2.15,2.4,4.54,4.59,7.12,6.51   c1.29,0.96,2.64,1.85,4.02,2.68c0.65,0.38,1.3,0.75,1.97,1.1c0.51,0.27,2,0.69,2.31,1.14c0.35,0.5-0.02,2.69-0.03,3.33   c-0.01,0.83-0.02,1.66-0.03,2.5c-0.03,2.22-0.06,4.44-0.1,6.65c-0.08,4.16-0.17,8.32-0.3,12.47c-0.24,8.31-0.58,16.63-1.01,24.93   c14.86,0,29.72,0,44.58,0c2.1,0,4.21,0,6.31,0c-0.67-6.72-0.27-13.52-0.68-20.26c-0.39-6.53-1.19-13.05-2.5-19.47   c-0.31-1.49-0.64-2.98-1.01-4.46c-0.21-0.85-0.43-1.7-0.67-2.55c-0.31-1.12-0.12-1.37,0.51-2.33c1.7-2.61,3.41-5.22,4.97-7.92   c3.28-5.69,5.24-11.52,5.57-18.11c0.31-6.25-0.18-13.08-2.5-18.91c-2.41-6.07-4.05-12.46-6.63-18.45c-1.25-2.9-2.47-5.8-3.86-8.64   c-1.4-2.87-2.29-5.9-3.46-8.87c-2.37-6.04-5.03-11.97-8.06-17.71c-2.99-5.67-5.92-11.64-10.33-16.38   c-2.06-2.21-4.68-4.57-7.63-5.47c-2.37-0.72-7,0.65-5.66,4.04c-3.38-4.08-9.29-9.88-15.18-9.13c-2.02,0.26-3.33,1.51-3.19,3.62   c0.09,1.37,0.73,2.46,1.37,3.63c0.2,0.36,0.78,1.18,0.27,1.55c-0.53,0.39-1.45-1.11-1.74-1.4c-3.92-4-15.89-6.03-14.03,2.73   c0.31,1.46,0.76,2.92,1.25,4.33c0.21,0.6,2.18,4.07,1.93,4.37c-0.51,0.61-1.9-0.99-2.27-1.28c-1.11-0.87-2.33-1.5-3.7-1.91   c-2.67-0.79-6.02-0.36-6.35,2.99c-0.39,3.94,1.66,8.11,2.75,11.79c2.39,8.13,5.36,16,8.27,23.95c1.46,3.98,2.87,7.98,4.13,12.03   c1.23,3.96,1.88,8.06,3.07,12.02c0.3,1,2.01,4.32,0.55,4.85c-0.98,0.36-3.36-1.77-4.06-2.29c-1.43-1.08-2.79-2.27-4.38-3.12   c-3.85-2.04-8.53-3.86-12.95-3.63c-3.5,0.18-8.66,2.47-7.3,6.89c0.55,1.8,3.21,2.03,4.77,2.88c1.82,1,3.48,2.24,5.13,3.49   C64.26,144.92,67.49,147.7,69.58,151.35z" />
                                                    <path className="st2" d="M113.54,68.73c2.66,3.41,4.74,7.23,6.77,11.03c2.7,5.02,4.99,10.1,7.34,15.28c2.24,4.95,3.77,10.18,6.15,15.05   c2.43,4.98,4.39,10.12,6.18,15.36c0.92,2.69,1.91,5.35,2.86,8.03c0.87,2.43,2.05,4.81,2.64,7.32c0.63,2.65,0.64,5.68,0.89,8.4   c0.26,2.83,0.22,5.69-0.07,8.51c-0.56,5.61-2.44,10.62-5.21,15.5c-1.36,2.39-2.84,4.69-4.34,6.99c-0.34,0.52-0.68,1.04-1.02,1.57   c-0.52,0.79-0.47,0.75-0.41,1.66c0.1,1.42,0.79,2.98,1.12,4.38c1.29,5.5,2.15,11.1,2.7,16.71c0.64,6.5,0.66,12.99,0.79,19.52   c0.03,1.62,0.09,3.24,0.21,4.86c0.02,0.22,0.02,0.4,0.02,0.56h4.71c-0.67-6.2-0.32-12.48-0.62-18.7   c-0.31-6.53-1.02-13.05-2.24-19.48c-0.58-3.08-1.71-6.17-2.15-9.25c-0.19-1.39,1.05-2.64,1.83-3.85c0.88-1.36,1.76-2.73,2.6-4.11   c3.31-5.44,5.8-10.98,6.5-17.37c0.35-3.22,0.36-6.47,0.03-9.69c-0.32-3.08-0.29-6.32-1.3-9.26c-2.09-6.09-4.33-12.17-6.51-18.24   c-2.06-5.75-5.18-11.07-7.15-16.84c-2-5.87-4.52-11.89-7.37-17.39c-3.06-5.91-5.99-12.09-10.02-17.42   c-2.48-3.29-10.81-12.51-15.06-7C107.54,61.79,111.06,65.55,113.54,68.73z" />
                                                    <path className="st3" d="M183.11,35.06c3.26-5.47,6.52-10.93,9.78-16.4c0.93-1.55,3.77-4.6,2.82-6.55c-0.85-1.75-2.9-1.53-3.97-0.24   c-1.91,2.29-3.26,5.46-4.79,8.02c-1.6,2.67-3.19,5.35-4.79,8.02c-0.97,1.62-3.99,4.91-3.03,6.9   C179.91,36.39,182.21,36.58,183.11,35.06z" />
                                                    <path className="st3" d="M218.11,67.55c5.09-3.82,10.18-7.64,15.27-11.46c1.54-1.15,5.15-2.8,5.18-5.04c0.02-1.9-1.63-2.81-3.2-1.99   c-2.63,1.37-5.09,3.82-7.47,5.61c-2.49,1.87-4.98,3.74-7.47,5.61c-1.61,1.21-5.46,2.98-5.5,5.28   C214.88,67.24,216.59,68.68,218.11,67.55z" />
                                                    <path className="st3" d="M232.97,109.38c6.74-0.65,13.48-1.3,20.22-1.96c1.88-0.18,5.27,0.28,6.04-2c0.53-1.58-0.42-2.81-2-2.86   c-3.16-0.1-6.56,0.63-9.71,0.94c-3.5,0.34-7.01,0.68-10.51,1.02c-1.82,0.18-5.12-0.26-5.99,1.84   C230.43,107.8,231.27,109.55,232.97,109.38z" />
                                                    <path className="st3" d="M219.89,158.12c5.65,2.93,11.31,5.85,16.96,8.78c1.66,0.86,4.79,3.45,6.75,2.45c1.72-0.88,1.58-2.85,0.2-3.87   c-2.39-1.77-5.65-2.92-8.3-4.3c-2.77-1.43-5.53-2.86-8.3-4.3c-1.73-0.9-5.1-3.66-7.11-2.63   C218.56,155.03,218.27,157.28,219.89,158.12z" />
                                                    <path className="st3" d="M192.1,189.57c4.7,4.29,9.41,8.58,14.11,12.86c1.38,1.26,3.73,4.57,5.88,4.1c1.89-0.41,2.24-2.36,1.18-3.7   c-1.85-2.33-4.7-4.29-6.91-6.3c-2.3-2.1-4.6-4.2-6.91-6.3c-1.44-1.31-3.98-4.86-6.18-4.38   C191.59,186.23,190.75,188.34,192.1,189.57z" />
                                                    <path className="st4" d="M153.65,143.59c3.04-3.22,5.47-7.64,9.71-9.27c2.55-0.98,5.08-0.49,7.67,0.01c2.86,0.55,5.36,0.52,7.99-0.91   c0.79-0.43,5.39-2.91,2.84-4.16c-0.92-0.45-2.14,0.84-2.9,1.28c-1.04,0.6-2.13,1.12-3.3,1.38c-2.63,0.59-5.19-0.3-7.81-0.53   c-2.73-0.24-5.34,0.34-7.67,1.88c-2.38,1.56-4.18,3.86-6.01,6.05c-0.67,0.8-2.31,2.07-2.5,3.12   C151.48,143.56,152.83,144.46,153.65,143.59z" />
                                                    <path className="st5" d="M149.13,63.15c-5.51,4.19-9.01,9.37-12.35,15.34c-1.7,3.04-2.66,6-3.7,9.29c-0.3,0.95-1.67,3.02-1.47,3.94   c0.2,0.92,1.26,1.33,2.03,0.8c1.04-0.71,1.48-3.25,1.79-4.36c0.47-1.68,0.96-3.3,1.69-4.9c1.39-3.04,3.11-6.02,4.92-8.82   c1.65-2.54,3.54-4.91,5.76-6.98c0.79-0.74,2.78-1.77,3.05-2.85C151.1,63.62,150.14,62.38,149.13,63.15z" />
                                                    <path className="st5" d="M168.94,52.34c-5.56,4.02-9.37,9.84-12.69,15.73c-3.62,6.43-6.96,13.29-9.18,20.35   c-0.36,1.15-2.72,8.15,0.29,7.39c1.3-0.33,1.02-2.01,1.18-3.04c0.31-1.99,0.93-3.92,1.63-5.8c2.61-6.94,5.82-13.64,9.58-20.03   c1.96-3.33,4.13-6.57,6.84-9.34c0.63-0.65,1.3-1.27,1.99-1.86c0.56-0.47,1.56-0.94,1.93-1.58   C171.09,53.16,170.14,51.47,168.94,52.34z" />
                                                    <path className="st5" d="M183.16,55.38c-2.76,0.74-4.33,3.63-5.71,5.89c-1.93,3.17-4.04,6.23-5.96,9.41   c-2.06,3.43-3.83,6.91-5.39,10.59c-1.51,3.54-3.42,6.88-4.88,10.44c-0.45,1.11-3.93,7.32-0.84,7.28c1.29-0.02,1.31-1.85,1.66-2.77   c0.64-1.68,1.37-3.36,2.09-5.01c3.16-7.2,6.46-14.43,10.63-21.1c2.07-3.31,4.15-6.63,6.33-9.87c0.46-0.68,0.96-1.39,1.63-1.89   c0.47-0.35,1.39-0.5,1.73-0.98C185.11,56.47,184.31,55.07,183.16,55.38z" />
                                                    <path className="st5" d="M192.59,68.37c-6.01,4.35-9.78,11.5-12.97,18.01c-1.72,3.51-3.19,7.13-4.4,10.84   c-0.37,1.13-1.79,3.89-1.28,5.04c0.38,0.85,1.43,1.02,2.09,0.41c0.92-0.85,1.18-3.6,1.57-4.8c0.61-1.87,1.28-3.71,2.02-5.53   c1.46-3.59,3.25-6.99,5.15-10.36c1.75-3.11,3.59-6.21,6.06-8.81c0.84-0.89,3.2-2.17,3.5-3.33C194.6,68.84,193.6,67.64,192.59,68.37   z" />
                                                    <path className="st6" d="M199.91,70.46c-0.83-1.52-2.45-2.44-4.1-2.81c-0.73-0.16-2.77-0.52-3.41-0.08c-1.31,0.89,0.14,2.11,0.5,3.07   c0.67,1.8,0.05,3.99-0.03,5.85c-0.11,2.63-0.35,5.08-1.06,7.63c-1.33,4.78-3.32,9.37-4.79,14.11c-1.46,4.69-2.65,9.47-3.57,14.3   c-0.89,4.65-1.56,9.35-2.3,14.03c-0.14,0.85-0.7,2.35-0.4,3.21c0.33,0.95,0.06,0.63,0.6,0.34c0.72-0.39,1.36-2.25,1.72-2.96   c1.8-3.55,2.9-7.36,3.9-11.21c1.28-4.89,2.73-9.73,4.25-14.55c1.68-5.33,3.52-10.59,5.52-15.81c1.02-2.67,2.06-5.34,2.94-8.07   C200.39,75.28,201.1,72.65,199.91,70.46z" />
                                                    <path className="st6" d="M163.67,188.32c1.91,10.42,5.49,20.48,7.4,30.88c0.47,2.55,0.75,5.14,1.1,7.7c0.22,1.64-0.25,2.62,1.42,2.62   c2.06,0,4.12,0,6.17,0c-0.68-4.98-1.3-9.9-2.56-14.77c-1.25-4.86-2.52-9.72-3.73-14.59c-1.25-5.05-2.4-10.14-3.16-15.29   c-0.5-3.37-2.19-7.43,0.87-9.9c1.15-0.93,2.5-1.58,3.7-2.44c1.68-1.21,2.95-2.97,4.19-4.6c2.92-3.8,4.88-8.12,7.28-12.24   c1.12-1.93,2.23-3.57,4.01-4.94c2.04-1.58,4.14-3.09,6.2-4.64c1.76-1.32,3.51-2.87,5.49-3.85c2.01-0.99,4.38-0.89,6.48-1.71   c4.63-1.82,6.47-5.78,3.41-10.09c-1.32-1.86-3.31-4.1-5.36-5.14c-2.17-1.1-4.76-0.82-7.05-0.3c3.89,2.19,9.38,8.76,5.26,13.04   c-1.93,2-5.1,2.64-7.71,3.06c-3.14,0.51-5.65,2.95-8.11,4.79c-2.4,1.8-5.19,3.46-7.31,5.59c-2.16,2.18-3.49,5.34-4.92,8.01   c-2.65,4.96-5.71,10.43-10.57,13.5c-1.85,1.17-4.08,2.32-4.09,4.77c-0.01,1.44,0.43,2.9,0.63,4.32   C163.01,184.18,163.3,186.26,163.67,188.32z" />
                                                    <path className="st5" d="M209.11,128.28c-8.11-6.91-19.6-0.37-26.62,4.94c-1.25,0.95-4.01,2.39-3.5,4.28c0.69,2.57,3.27,1.58,4.66,0.46   c4.37-3.52,9.94-7.08,15.57-8.01c1.35-0.22,2.77-0.26,4.1,0.1c1.31,0.36,2.2,1.47,3.43,1.84   C208.82,132.52,210.99,129.88,209.11,128.28z" />
                                                    <path className="st7" d="M71.58,76.39c4.12,4.14,6.33,10.19,8.6,15.64c1.29,3.1,2.46,6.26,3.35,9.53c0.25,0.92,0.29,2.97,1.24,3.4   c0.75,0.34,1.46-0.41,1.57-1.16c0.2-1.36-0.8-3.75-1.15-5.02c-0.41-1.51-0.88-3-1.45-4.46c-1.24-3.16-2.71-6.26-4.08-9.35   c-1.23-2.76-2.62-5.46-4.39-7.86c-0.54-0.73-1.95-2.98-2.95-2.91C71.37,74.28,70.82,75.63,71.58,76.39z" />
                                                    <path className="st7" d="M84.04,64.83c4.37,7.23,8.11,15.19,11.29,23.01c0.76,1.87,1.55,3.74,2.24,5.64c0.34,0.94,0.66,1.9,0.87,2.88   c0.18,0.82,0.02,2.32,0.42,3.05c0.59,1.08,2.48,0.91,2.91-0.25c0.59-1.59-1.15-1.75-2.14-1.42c0.54,0.38,1.07,0.77,1.61,1.15   c-0.05-3.61-1.65-7.02-2.95-10.31c-1.47-3.7-3.14-7.29-4.83-10.89c-1.66-3.53-3.34-7.05-5.2-10.48c-0.54-0.99-1.56-3.88-2.73-4.21   C84.47,62.7,83.43,63.83,84.04,64.83z" />
                                                    <path className="st7" d="M101.47,64.93c3.34,6.82,7.06,13.57,9.79,20.66c1.33,3.44,2.43,6.96,3.54,10.48c0.3,0.95,0.44,2.38,1.7,2.36   c1.21-0.02,1.24-0.99,1.05-1.88c-1.46-6.89-4.62-13.78-7.67-20.08c-1.61-3.33-3.25-6.63-4.88-9.95c-0.48-0.97-1.07-3.37-2.3-3.47   C101.74,62.96,101.07,64.1,101.47,64.93z" />
                                                    <path className="st8" d="M97.54,229.53c1.46,0,3.76,0.47,5.12,0c1.42-0.49,1.76-2.43,1.86-3.76c0.2-2.77,0.3-5.55,0.44-8.32   c0.47-8.89,0.95-17.79,1.42-26.68c0.1-1.91,0.32-3.85,0.31-5.77c-0.05-5.92-8.17-5.79-8.69-0.07c-0.65,7.2-0.77,14.49-1.16,21.71   c-0.25,4.72-0.5,9.44-0.75,14.16C95.94,223.55,95,227.61,97.54,229.53z" />
                                                    <path className="st8" d="M55.37,135.06c4.16-3.74,11.04,0.96,14.37,3.77c2.45,2.06,4.68,4.21,7.74,5.37c1.96,0.74,5.01,1.8,6.19-0.64   c1.04-2.14-0.61-3-2.38-3.43c-2.67-0.65-4.93-2.16-7.07-3.83c-4.43-3.46-8.86-7.12-14.77-7.37c-2.53-0.11-6.97,0.76-8.17,3.39   C50.19,134.69,53.53,136.71,55.37,135.06z" />
                                                    <path className="st8" d="M61.14,74.37c6.47,18.06,12.94,36.13,19.41,54.19c0.75,2.1,1.34,4.37,2.29,6.39c0.42,0.9,2,2.05,2.56,0.45   c0.45-1.28-1.25-4.12-1.7-5.38c-0.83-2.32-1.66-4.65-2.5-6.97c-3.24-9.04-6.47-18.07-9.71-27.11c-1.85-5.16-3.69-10.31-5.54-15.47   c-0.45-1.25-0.9-2.5-1.35-3.76c-0.32-0.9-0.61-2.66-1.27-3.36C62.53,72.48,60.63,72.96,61.14,74.37z" />
                                                    <path className="st8" d="M71.35,63.42c3.47,7.81,6.94,15.62,10.41,23.43c1.68,3.78,3.36,7.56,5.04,11.34c0.43,0.97,1.11,3.95,2.21,4.35   c1.26,0.45,1.76-0.87,1.61-1.82c-0.3-1.93-1.89-4.25-2.69-6.05c-0.78-1.76-1.57-3.53-2.35-5.29c-1.68-3.78-3.36-7.56-5.04-11.34   c-1.68-3.78-3.36-7.56-5.04-11.34c-0.47-1.07-1.39-4.7-2.55-5.1C71.9,61.22,70.91,62.42,71.35,63.42z" />
                                                    <path className="st8" d="M85.46,60.33c7.05,10.91,13.01,22.59,17.06,34.95c0.32,0.98,0.48,3.04,1.46,3.57   c0.64,0.35,1.55,0.08,1.83-0.62c0.38-0.98-0.7-3.01-1.01-3.96c-0.51-1.54-1.05-3.07-1.61-4.59c-2.3-6.19-5.06-12.21-8.17-18.04   c-1.7-3.19-3.51-6.33-5.41-9.4c-0.59-0.95-1.51-3.31-2.64-3.68C85.93,58.23,84.83,59.34,85.46,60.33z" />
                                                    <path className="st8" d="M103.36,63.2c4.25,6.3,7.34,13.28,10.07,20.35c1.41,3.66,2.73,7.35,4.09,11.03c0.35,0.96,0.71,3.11,1.79,3.51   c1.12,0.41,1.71-0.47,1.62-1.42c-0.16-1.73-1.43-3.85-2.03-5.49c-0.59-1.61-1.17-3.22-1.77-4.82c-1.36-3.66-2.77-7.31-4.34-10.89   c-1.47-3.35-3.09-6.63-4.94-9.79c-0.61-1.04-1.75-3.89-2.99-4.23C103.83,61.16,102.67,62.18,103.36,63.2z" />
                                                    <path className="st3" d="M45.63,204.56c4.77-4.21,9.55-8.42,14.32-12.63c1.31-1.16,5.02-3.25,4.64-5.34c-0.34-1.92-2.47-2.19-3.84-1.31   c-2.51,1.61-4.76,4.2-7.01,6.18c-2.34,2.06-4.67,4.12-7.01,6.18c-1.37,1.21-5.33,3.47-4.95,5.61   C42.1,204.98,44.35,205.69,45.63,204.56z" />
                                                    <path className="st3" d="M12.06,160.52c6.52-1.26,13.03-2.52,19.55-3.78c1.71-0.33,5.73-0.18,5.99-2.55c0.18-1.69-1.27-2.71-2.79-2.6   c-3.16,0.23-6.46,1.25-9.57,1.85c-3.19,0.62-6.38,1.24-9.57,1.85c-1.68,0.33-5.75,0.22-6.33,2.3   C8.88,159.22,10.43,160.83,12.06,160.52z" />
                                                    <path className="st3" d="M2.16,110.5c6.74,0.63,13.48,1.26,20.23,1.88c1.7,0.16,5.21,1.34,6.05-0.85c0.6-1.57-0.53-2.92-2-3.24   c-3.1-0.67-6.55-0.61-9.71-0.9c-3.51-0.33-7.01-0.65-10.52-0.98c-1.65-0.15-5.04-1.28-5.99,0.7C-0.48,108.56,0.6,110.35,2.16,110.5   z" />
                                                    <path className="st3" d="M39.19,55.4c-4.87-4.1-9.74-8.19-14.62-12.29c-1.45-1.22-3.91-4.41-6.07-3.89c-1.86,0.45-2.28,2.32-1.13,3.65   c1.94,2.25,4.87,4.1,7.15,6.01c2.38,2,4.77,4.01,7.15,6.01c1.52,1.28,4.16,4.67,6.38,4.15C39.71,58.66,40.62,56.6,39.19,55.4z" />
                                                    <path className="st3" d="M80.19,29.11c-2.62-5.8-5.24-11.6-7.86-17.4c-0.7-1.55-1.63-5.78-3.71-5.97c-1.94-0.18-2.75,1.88-2.32,3.41   c0.81,2.88,2.61,5.79,3.85,8.52c1.28,2.84,2.56,5.68,3.85,8.52c0.73,1.63,1.76,6.14,3.88,6.34C79.63,32.68,80.88,30.63,80.19,29.11   z" />
                                                    <path className="st3" d="M127.64,26.49c0.48-6.75,0.95-13.51,1.43-20.26c0.12-1.72,1.21-5.23-0.99-6.06c-1.58-0.59-2.9,0.52-3.19,2.01   c-0.61,3.11-0.46,6.56-0.69,9.73c-0.25,3.51-0.5,7.02-0.74,10.54c-0.12,1.67-1.16,5.06,0.83,6.01   C125.75,29.13,127.53,28.07,127.64,26.49z" />
                                                    <path className="st4" d="M154.57,64.37c-3.69,5.52-6.8,11.42-9.28,17.57c-1.19,2.97-2.24,5.99-3.13,9.06c-0.26,0.89-1.04,2.32-0.4,3.18   c0.53,0.71,1.53,0.61,2.04-0.01c0.79-0.96,0.93-3.12,1.29-4.29c0.48-1.53,1-3.05,1.55-4.55c1.11-3,2.38-5.94,3.79-8.81   c1.41-2.88,2.97-5.68,4.67-8.4c0.53-0.85,2.22-2.48,1.71-3.6C156.41,63.64,155.09,63.6,154.57,64.37z" />
                                                    <path className="st4" d="M178.89,55.36c-2.85,0.6-4.91,5.01-6.39,7.18c-2.14,3.14-4.18,6.35-6.09,9.64c-3.82,6.56-7.14,13.4-9.91,20.47   c-0.49,1.24-1.78,3.4-1.73,4.74c0.04,0.94,0.82,1.63,1.79,1.13c1.11-0.57,1.48-3.16,1.9-4.26c0.68-1.79,1.4-3.56,2.15-5.31   c3.1-7.24,6.88-14.18,11.1-20.82c1.82-2.86,3.61-5.93,5.67-8.62c0.42-0.54,0.88-1.13,1.47-1.5c0.39-0.25,1.01-0.27,1.3-0.65   C180.86,56.47,179.97,55.13,178.89,55.36z" />
                                                    <path className="st4" d="M188.65,67.4c-5.83,5.04-9.12,12.12-12.08,19.07c-1.57,3.67-3.54,7.15-5.13,10.8   c-0.49,1.12-1.75,3.58-1.12,4.79c0.41,0.8,1.44,1.07,2.07,0.41c0.4-0.42,0.37-1.4,0.51-1.93c0.25-0.92,0.6-1.8,0.98-2.67   c0.79-1.76,1.77-3.43,2.61-5.17c1.74-3.63,3.14-7.41,4.9-11.02c1.57-3.23,3.39-6.37,5.7-9.14c0.58-0.69,1.18-1.36,1.81-2   c0.47-0.48,1.56-1.12,1.79-1.76C191.14,67.59,189.63,66.56,188.65,67.4z" /> </g>
                                            </svg>
                                        </div>
                                    </div>
                                </div>  
                            </div>
                        </div>
                        <div className="theme-wrapper theme-daisy" style={{ padding:24}}>
                            <SETextArea maxLength={36000} 
                                        title={`Un dernier message ? ${displayEmailOption && 'WhatsApp et/ou e-mail, à vous de choisir !'}`} 
                                        id="PR" 
                                        showTip={displayEmailOption} 
                                        tip=" WhatsApp pour un échange rapide, l'e-mail pour plus de détails (Vous pouvez utiliser les deux options)" placeholderText="• L'objectif précis de votre projet
• Les étapes déjà réalisées
• Vos interrogations sur la procédure visa
• Les informations complémentaires utile" value={message} valid={valid} rows={displayEmailOption ? 7 : 10} setValid={setValid} errorMessage={errorMessage} onClickOutside={()=> validateMessage(message)} handleChange={handleChange}/> 
        </div>
                    </div>
                    <div className="flex gap-4" style={{marginTop: '-50px', padding: 24}}>
                        <button onClick={()=> sendWhatsappMessage()} target="_blank" rel="noopener noreferrer" className={`CTA button primary1 xlarge flex-1 bg-green-500 hover:bg-green-600 ${displayWhatsappButton ? '' :'disabled-button'}`} style={{ height: 'auto', padding: '12px' }}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="mr-2">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /> 
                            </svg> 
                            <span style={{fontWeight: 900}}> WhatsApp</span> 
                        </button>
                        {displayEmailOption && <button onClick={()=> sendEmail()} className={`CTA button primary xlarge flex-1 bg-green-500 hover:bg-green-600 ${displayEmailButton ? '' :'disabled-button'}`} style={{ height: 'auto', padding: '12px' }}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="mr-2">
                                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" /> 
                            </svg> 
                            <span style={{fontWeight: 900}}>Email</span> 
                        </button>}
                    </div>
                </div>  
            </div>
        </div>
    )};

  const RenderContactFinalStep = () => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[1001] flex items-center justify-center">
            
            <div className="Card relative w-full max-w-2xl mx-4">
                <div style={{padding:10}} ref={newRefContactModal}> 
                    <div >
                        <div className="Stack-child  " style={{ paddingTop: 0 }}>
                            <div className="closeLPModal" onClick={()=> handleCloseButton()} style={{right:'-10px', top: '-15px'}} > 
                                <svg id="icon-chatbot-cta-croix" viewBox="0 0 22 22" width={24}>
                                    <mask id="path-1-inside-1_995_60133" fill="#fff">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M11 0c6.075 0 11 4.925 11 11s-4.925 11-11 11S0 17.075 0 11 4.925 0 11 0z" /> </mask>
                                    <path fillRule="evenodd" clipRule="evenodd" d="M11 0c6.075 0 11 4.925 11 11s-4.925 11-11 11S0 17.075 0 11 4.925 0 11 0z" fill="#7F94A9" />
                                    <path d="M11 2a9 9 0 019 9h4c0-7.18-5.82-13-13-13v4zm9 9a9 9 0 01-9 9v4c7.18 0 13-5.82 13-13h-4zm-9 9a9 9 0 01-9-9h-4c0 7.18 5.82 13 13 13v-4zm-9-9a9 9 0 019-9v-4C3.82-2-2 3.82-2 11h4z" fill="#fff" mask="url(#path-1-inside-1_995_60133)" />
                                    <path d="M13.39 7.277a.945.945 0 011.335 0 .945.945 0 01.127 1.175l-.056.08-.07.08-2.39 2.389 2.39 2.389c.29.29.354.727.172 1.092l-.046.083-.056.08-.07.08a.946.946 0 01-1.177.127l-.08-.055-.08-.072L11 12.337l-2.39 2.388a.943.943 0 01-1.092.173l-.083-.046-.08-.055-.08-.072a.945.945 0 01-.127-1.175l.056-.08.07-.08L9.665 11l-2.39-2.389a.942.942 0 01-.172-1.092l.046-.083.056-.08.07-.08a.946.946 0 011.177-.127l.08.056.08.07L11 9.667l2.39-2.39z" fill="#fff" /> 
                                </svg>
                                </div>
                            <div className="Box   " style={{   borderWidth: "initial", borderStyle: "none", borderColor: "initial", borderRadius: '15px 15px 0 0' }}>
                                <div className="Stack  stackColumn " style={{ flexDirection: "column", padding: 0, alignItems: "stretch" }}>
                                    <div className="Stack-child  " style={{ paddingTop: 0 }}>
                                        <div className="Stack  stackRow " style={{ flexDirection: "column", padding: 0, alignItems: "center" }}>
                                            
                                            <div className="Stack-child  " style={{ paddingLeft: 0 }}>
                                                <div className="Box   " style={{ padding: "30px 30px 0px", maxWidth: 500, marginLeft: "auto", marginRight: "auto", borderWidth: "initial", borderStyle: "none", borderColor: "initial" }}>
                                                    <div className="Heading s isWeak  " style={{lineHeight: '2rem'}}> 

                                                    <h1 size="large" className="styles__HeadingBridge-sc-6txi54-0 hzNvHf" style={{color: 'rgb(42, 55, 117)', textAlign: 'center' }}>À bientôt {user?.firstname}!</h1>

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
                                        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="28px"viewBox="0 0 84 84" version="1.1" style={{marginLeft: 5}}>
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
    );}

    
  if (!isOpen) return null;

  return ( (displayEmailButton || displayWhatsappButton) ? renderContactFirstStep(): RenderContactFinalStep()
  );
};

export default ContactModal;
